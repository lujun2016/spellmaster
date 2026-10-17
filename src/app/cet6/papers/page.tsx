import Link from "next/link"
import { getPaperList } from "@/lib/cet6/paper"
import { PART_META, type PartKey } from "@/lib/cet6/paper-shared"

export const dynamic = "force-dynamic"

/** 板块在列表里的展示顺序与短名 */
const PART_ORDER: PartKey[] = ["listening", "cloze", "matching", "reading"]

type Filters = { year: string; audio: boolean; done: "" | "yes" | "no" }

/** 拼查询串：切筛选时保留其他条件，都在默认值时就不带参数 */
function buildHref(cur: Filters, patch: Partial<Filters>) {
  const next = { ...cur, ...patch }
  const p = new URLSearchParams()
  if (next.year !== "all") p.set("year", next.year)
  if (next.audio) p.set("audio", "1")
  if (next.done) p.set("done", next.done)
  const s = p.toString()
  return `/cet6/papers${s ? `?${s}` : ""}`
}

/**
 * 真题列表。
 *
 * 库里 46 套，但只有 40 套真的有客观题：另外 6 套（2020-09-3、2022-06-3、2022-09-2、
 * 2022-09-3、2023-03-2、2023-03-3）源数据只有作文和翻译、没有选择题，
 * 所以按 questionCount > 0 过滤，只列能做的套；那 6 套在页脚说明里交代清楚，
 * 它们的写作/翻译素材仍可从 /cet6/writing 与 /cet6/translation 进入。
 */
/** 源数据里只有主观题、没有选择题的那几套（列表页会把它们排除，但在页脚说明） */
const EMPTY_SLUGS = ["2020-09-3", "2022-06-3", "2022-09-2", "2022-09-3", "2023-03-2", "2023-03-3"]

export default async function PapersPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; audio?: string; done?: string }>
}) {
  const sp = await searchParams
  const { papers, emptyCount } = await getPaperList()

  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a)
  const filters: Filters = {
    year: years.includes(Number(sp.year)) ? String(sp.year) : "all",
    audio: sp.audio === "1",
    done: sp.done === "yes" || sp.done === "no" ? sp.done : "",
  }

  const filtered = papers.filter((p) => {
    if (filters.year !== "all" && String(p.year) !== filters.year) return false
    if (filters.audio && !p.hasAudio) return false
    if (filters.done === "yes" && !p.attempt) return false
    if (filters.done === "no" && p.attempt) return false
    return true
  })

  const groups = years
    .map((y) => ({ year: y, items: filtered.filter((p) => p.year === y) }))
    .filter((g) => g.items.length)

  const doneCount = papers.filter((p) => p.attempt).length
  const audioCount = papers.filter((p) => p.hasAudio).length
  // 年份范围按库里实际有的算，别写死 —— 以后补了新年份/往年份，标题会自己跟着变
  const allYears = papers.map((p) => p.year)
  const yearRange: [number, number] | null = allYears.length
    ? [Math.max(...allYears), Math.min(...allYears)]
    : null

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">真题练习</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          共 {papers.length} 套可做（{yearRange ? `${yearRange[1]}–${yearRange[0]}` : "—"}）· {audioCount} 套带听力音频 · 已练过{" "}
          {doneCount} 套
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs">
        <span className="mr-1 text-slate-400">年份</span>
        <Link
          href={buildHref(filters, { year: "all" })}
          className={[
            "rounded-lg px-2.5 py-1.5",
            filters.year === "all" ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-500 hover:bg-slate-100",
          ].join(" ")}
        >
          全部
        </Link>
        {years.map((y) => (
          <Link
            key={y}
            href={buildHref(filters, { year: String(y) })}
            className={[
              "rounded-lg px-2.5 py-1.5",
              filters.year === String(y) ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-500 hover:bg-slate-100",
            ].join(" ")}
          >
            {y}
          </Link>
        ))}

        <span className="mx-1 h-4 w-px bg-slate-200" />

        <Link
          href={buildHref(filters, { audio: !filters.audio })}
          className={[
            "rounded-lg px-2.5 py-1.5",
            filters.audio ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-500 hover:bg-slate-100",
          ].join(" ")}
        >
          只看有音频
        </Link>

        <span className="mx-1 h-4 w-px bg-slate-200" />

        <span className="mr-1 text-slate-400">练习状态</span>
        {(
          [
            { key: "" as const, label: "全部" },
            { key: "yes" as const, label: "做过" },
            { key: "no" as const, label: "没做过" },
          ]
        ).map((o) => (
          <Link
            key={o.key || "all"}
            href={buildHref(filters, { done: o.key })}
            className={[
              "rounded-lg px-2.5 py-1.5",
              filters.done === o.key ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-500 hover:bg-slate-100",
            ].join(" ")}
          >
            {o.label}
          </Link>
        ))}
      </div>

      {groups.map((g) => (
        <section key={g.year} className="space-y-2">
          <h2 className="flex items-baseline gap-2 px-1 text-sm font-semibold text-slate-700">
            {g.year} 年
            <span className="text-xs font-normal text-slate-400">{g.items.length} 套</span>
          </h2>

          <div className="grid gap-2 sm:grid-cols-2">
            {g.items.map((p) => {
              const acc = p.attempt && p.attempt.bestTotal
                ? Math.round((p.attempt.bestCorrect / p.attempt.bestTotal) * 100)
                : null
              return (
                <Link
                  key={p.slug}
                  href={`/cet6/papers/${p.slug}`}
                  className="rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-indigo-300 hover:bg-indigo-50/30"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-slate-900">{p.label}</span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600">{p.set}</span>
                    </div>
                    {p.hasAudio ? (
                      <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] text-indigo-700">♪ 有音频</span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-400">无音频</span>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                    <span className="text-slate-600">共 {p.questionCount} 题</span>
                    {PART_ORDER.filter((k) => p.byPart[k]).map((k) => (
                      <span key={k}>
                        {PART_META[k].short} {p.byPart[k]}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2 border-t border-slate-100 pt-2 text-[11px]">
                    {p.attempt ? (
                      <span className="text-slate-500">
                        最高{" "}
                        <b className={acc !== null && acc >= 80 ? "text-emerald-600" : "text-slate-900"}>{acc}%</b>
                        <span className="text-slate-300"> · </span>
                        上次 {p.attempt.lastCorrect}/{p.attempt.lastTotal}
                        <span className="text-slate-300"> · </span>
                        {p.attempt.count} 次
                        <span className="text-slate-300"> · </span>
                        {p.attempt.lastAt.toLocaleDateString("zh-CN")}
                      </span>
                    ) : (
                      <span className="text-slate-400">还没练过</span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}

      {!groups.length && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
          当前筛选下没有真题
        </div>
      )}

      {emptyCount > 0 && (
        <p className="px-1 text-[11px] leading-relaxed text-slate-400">
          说明：题库里另有 {emptyCount} 套没有选择题的卷子（
          {EMPTY_SLUGS.join("、")}）—— 源数据里只给了作文和翻译，没有客观题。
          它们的写作范文与参考译文仍可用，从「写作模板」和「翻译专项」里进入。
        </p>
      )}
    </div>
  )
}
