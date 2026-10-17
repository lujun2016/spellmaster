import Link from "next/link"
import { createDrillAction } from "./actions"
import { db } from "@/lib/cet6/db"
import { listDrills, type DrillSource } from "@/lib/cet6/listening"
import { readByPart } from "@/lib/cet6/paper-shared"
import { VoaFetchButton } from "@/components/cet6/VoaFetchButton"
import { countVoaItems, listVoaItems, type VoaItem } from "@/lib/cet6/voa"

export const dynamic = "force-dynamic"

const SOURCES: Array<{ value: DrillSource; hint: string }> = [
  { value: "真题例句", hint: "历年六级真题里出现的句子（有年份题型标注）" },
  { value: "词库例句", hint: "3992 词库里的中英对照例句" },
  { value: "错题句子", hint: "从错题本里抽句子，专治老毛病" },
  { value: "自建文本", hint: "粘贴任意英文段落，自己出题" },
]

/**
 * 听力精听入口。
 *
 * 三条路：
 *  1. 真题听力 → 去 /cet6/papers 做题（那边有音频、答案和逐题解析）
 *  2. VOA 每日英语 → 有真人音频 + 完整文字稿，适合盲听 + 逐句对照
 *  3. 逐句听写 → 在这里建练习（有文本才谈得上听写，所以用例句/自建文本）
 */
export default async function ListeningPage() {
  const [drills, audioPapers, voa, voaTotal] = await Promise.all([
    listDrills(20),
    db.paper.findMany({
      where: { OR: [{ audioUrl: { not: null } }, { audioHls: { not: null } }] },
      orderBy: [{ year: "desc" }, { month: "desc" }],
      select: { slug: true, label: true, set: true, byPart: true, audioUrl: true, listenedAt: true },
    }),
    // VOA 是外网内容：读库失败也不该把整页带崩，退回空列表（但要留日志，不然查不出原因）
    listVoaItems(12).catch((e): VoaItem[] => {
      console.error("[voa] 读取 VOA 列表失败：", e)
      return []
    }),
    countVoaItems().catch(() => 0),
  ])

  // 三个列表统一「没听过的排前面」：每天打开就知道该听哪个
  const notListenedFirst = <T,>(get: (x: T) => Date | null | undefined) => (a: T, b: T) =>
    Number(Boolean(get(a))) - Number(Boolean(get(b)))
  audioPapers.sort(notListenedFirst((p) => p.listenedAt))
  voa.sort(notListenedFirst((v) => v.listenedAt))
  drills.sort((a, b) => Number(a.accuracy !== null) - Number(b.accuracy !== null))

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">听力精听</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          真题听力有音频和答案，去「真题练习」做；VOA 每日英语有真人音频和完整文字稿，适合精听；想练逐句听写，在这里用有文本的素材生成练习。
        </p>
      </div>

      {/* VOA 每日英语：真人音频 + 逐句原文 */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-slate-900">
            VOA 每日英语（真人/合成音频 + 逐句原文）
            {voaTotal > 0 && <span className="ml-2 text-xs font-normal text-slate-400">库中 {voaTotal} 条，下面是最近 {voa.length} 条</span>}
          </h2>
          <p className="mt-0.5 text-[11px] text-slate-400">
            来自 VOA Learning English，源站自带完整文字稿。音频由本机中转（服务端走代理拉取并缓存到本地），首次播放稍慢，之后秒开。
          </p>
        </div>

        <VoaFetchButton limit={12} />

        {voa.length ? (
          <ul className="mt-4 divide-y divide-slate-100">
            {voa.map((v) => (
              <li key={v.id} className="flex items-center justify-between gap-3 py-2">
                <div className="min-w-0">
                  <Link href={`/cet6/listening/voa/${v.id}`} className="text-sm font-medium text-slate-800 hover:text-indigo-600">
                    {v.title}
                  </Link>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px] text-slate-400">
                    <span>{v.publishedAt ? v.publishedAt.toISOString().slice(0, 10) : "日期未知"}</span>
                    {v.listenedAt && <span className="text-emerald-600">· 已听过 ✓</span>}
                    {v.program && <span>· {v.program}</span>}
                    <span>· 原文 {v.sentenceCount} 句</span>
                    <span
                      className={
                        v.audioKind === "mp3" ? "text-emerald-600" : v.audioKind === "tts" ? "text-amber-600" : "text-rose-500"
                      }
                    >
                      · 音频：{v.audioKind === "mp3" ? "真人 MP3" : v.audioKind === "tts" ? "TTS 合成" : "无"}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/cet6/listening/voa/${v.id}`}
                  className="shrink-0 rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-indigo-600 hover:bg-indigo-50"
                >
                  精听
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-lg bg-slate-50 px-3 py-3 text-xs leading-relaxed text-slate-500">
            <p>还没有 VOA 内容。</p>
            <p className="mt-1">
              抓取需要梯子（VOA 在墙外，本机是显式代理{" "}
              <code className="rounded bg-white px-1">http://127.0.0.1:7892</code>）。命令行抓一次：
            </p>
            <pre className="mt-1 overflow-x-auto rounded bg-white px-2 py-1 text-[11px] text-slate-600">
              node cet6-data/fetch-voa.mjs --limit=12
            </pre>
            <p className="mt-1">代理不通时脚本只打印提示并正常退出，不会写坏数据；上面的「立即抓取」按钮走的是同一套逻辑。</p>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">新建逐句听写</h2>
        <form action={createDrillAction} className="mt-3 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs text-slate-500">素材来源</span>
              <select
                name="source"
                defaultValue="真题例句"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              >
                {SOURCES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.value} —— {s.hint}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-slate-500">句子条数（3–30）</span>
              <input
                type="number"
                name="count"
                defaultValue={10}
                min={3}
                max={30}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs text-slate-500">
              英文文本（只在选「自建文本」时需要，会按句号自动切句）
            </span>
            <textarea
              name="text"
              rows={4}
              placeholder="Paste any English passage here…"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
            />
          </label>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            生成听写练习
          </button>
          <p className="text-[11px] text-slate-400">
            音频用免费 TTS 逐句合成（百度接口，无需 key），第一次播放会合成并缓存到本地，之后秒开。
            合成不通时会自动回落到浏览器自带的朗读。
          </p>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">真题听力（{audioPapers.length} 套有音频）</h2>
          <Link href="/cet6/papers" className="text-xs text-indigo-600 hover:underline">
            去真题练习 →
          </Link>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {audioPapers.map((p) => {
            const listening = readByPart(p.byPart).listening ?? 0
            return (
              <Link
                key={p.slug}
                href={`/cet6/papers/${p.slug}?tab=listening`}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:border-indigo-200 hover:bg-indigo-50"
              >
                <div className="font-medium">
                  {p.label} {p.set}
                </div>
                <div className="text-[11px] text-slate-400">
                  {listening} 道听力题 · {p.audioUrl ? "MP3 直链" : "m3u8（首次播放会转码）"}
                  {p.listenedAt && <span className="ml-1 text-emerald-600">· 已听过 ✓</span>}
                </div>
              </Link>
            )
          })}
          {!audioPapers.length && <p className="text-sm text-slate-400">库里还没有带音频的真题</p>}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">我的听写记录</h2>
        {drills.length ? (
          <ul className="divide-y divide-slate-100">
            {drills.map((d) => (
              <li key={d.id} className="flex items-center justify-between py-2 text-sm">
                <div className="min-w-0">
                  <Link href={`/cet6/listening/drill/${d.id}`} className="font-medium text-slate-800 hover:text-indigo-600">
                    {d.title}
                  </Link>
                  <div className="text-[11px] text-slate-400">
                    {d.count} 句 · {new Date(d.createdAt).toLocaleString("zh-CN")}
                    {d.accuracy !== null && ` · 已听过 ✓ 准确率 ${Math.round(d.accuracy * 100)}%`}
                  </div>
                </div>
                <Link href={`/cet6/listening/drill/${d.id}`} className="shrink-0 text-xs text-indigo-600 hover:underline">
                  {d.accuracy === null ? "开始" : "重做"}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">还没有听写记录，上面生成一个试试。</p>
        )}
      </section>
    </div>
  )
}
