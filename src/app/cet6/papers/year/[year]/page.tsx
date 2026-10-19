import Link from "next/link"
import { notFound } from "next/navigation"
import { getPaperList } from "@/lib/cet6/paper"
import { PART_META, type PartKey } from "@/lib/cet6/paper-shared"

export const dynamic = "force-dynamic"

const PART_ORDER: PartKey[] = ["listening", "cloze", "matching", "reading"]

/**
 * 某一年份下的试卷列表，按月份分组。
 */
export default async function PaperYearPage({
  params,
  searchParams,
}: {
  params: Promise<{ year: string }>
  searchParams: Promise<{ audio?: string; done?: string }>
}) {
  const { year } = await params
  const y = Number(year)
  const sp = await searchParams
  const audioOnly = sp.audio === "1"
  const doneOnly = sp.done === "1"

  const { papers } = await getPaperList()
  const items = papers
    .filter((p) => p.year === y)
    .filter((p) => (!audioOnly || p.hasAudio) && (!doneOnly || p.percent > 0))
  if (!papers.some((p) => p.year === y)) notFound()

  const months = [...new Set(items.map((p) => p.month))].sort((a, b) => b - a)

  return (
    <div className="space-y-5">
      <div>
        <Link href="/cet6/papers" className="text-xs text-slate-400 hover:text-slate-600">
          ← 全部年份
        </Link>
        <h1 className="mt-1 text-xl font-semibold text-slate-900">{y} 年真题</h1>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Link
          href={audioOnly ? `/cet6/papers/year/${y}` : `/cet6/papers/year/${y}?audio=1`}
          className={[
            "rounded-lg px-2.5 py-1.5",
            audioOnly ? "bg-teal-50 font-medium text-teal-700" : "text-slate-500 hover:bg-slate-100",
          ].join(" ")}
        >
          ♪ 只看有音频
        </Link>
        <Link
          href={doneOnly ? `/cet6/papers/year/${y}` : `/cet6/papers/year/${y}?done=1`}
          className={[
            "rounded-lg px-2.5 py-1.5",
            doneOnly ? "bg-teal-50 font-medium text-teal-700" : "text-slate-500 hover:bg-slate-100",
          ].join(" ")}
        >
          只看做过的
        </Link>
      </div>

      {months.map((m) => {
        const list = items.filter((p) => p.month === m)
        if (!list.length) return null
        return (
          <section key={m} className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-700">
              {m} 月 <span className="font-normal text-slate-400">· {list.length} 套</span>
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <Link
                  key={p.slug}
                  href={`/cet6/papers/${p.slug}`}
                  className="rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-teal-300 hover:bg-teal-50/40"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-slate-900">{p.set}</span>
                    {p.score ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        得分 {p.score}
                      </span>
                    ) : p.percent > 0 ? (
                      <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-700 tabular-nums">
                        {p.percent}%
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-400">未开始</span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                    <span className="text-slate-600">共 {p.questionCount} 题</span>
                    {PART_ORDER.filter((k) => p.byPart[k]).map((k) => (
                      <span key={k}>
                        {PART_META[k].short} {p.byPart[k]}
                      </span>
                    ))}
                    <span className={p.hasAudio ? "text-teal-600" : "text-slate-400"}>
                      {p.hasAudio ? "♪ 有音频" : "无音频"}
                    </span>
                  </div>
                  {p.attempt && (
                    <div className="mt-2 border-t border-slate-100 pt-2 text-[11px] text-slate-500">
                      最高{" "}
                      <b className={p.attempt.bestTotal && p.attempt.bestCorrect / p.attempt.bestTotal >= 0.8 ? "text-emerald-600" : "text-slate-900"}>
                        {p.attempt.bestTotal ? Math.round((p.attempt.bestCorrect / p.attempt.bestTotal) * 100) : 0}%
                      </b>
                      <span className="text-slate-300"> · </span>
                      上次 {p.attempt.lastCorrect}/{p.attempt.lastTotal}
                      <span className="text-slate-300"> · </span>
                      {p.attempt.count} 次
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      {!months.length && <p className="text-sm text-slate-400">没有符合条件的试卷</p>}
    </div>
  )
}
