import type { AccuracyPoint } from "@/lib/cet6/stats"

/** 正确率配色：低于 50% 直接标红，考试前这条线是要盯的 */
function barClass(acc: number): string {
  if (acc >= 85) return "bg-emerald-500"
  if (acc >= 70) return "bg-indigo-500"
  if (acc >= 50) return "bg-amber-500"
  return "bg-rose-500"
}

/**
 * 近 30 天正确率趋势。
 *
 * 用小柱子手写：每天一根，高度就是当天正确率。
 * 当天没答题的日子留一根 2px 的灰色底桩——留空会让日期轴看起来断了，
 * 但也不能画成 0%（那会被误读成「全错」）。
 */
export function AccuracyTrend({ points }: { points: AccuracyPoint[] }) {
  const withData = points.filter((p) => p.accuracy !== null)
  const answers = withData.reduce((s, p) => s + p.total, 0)
  const correct = withData.reduce((s, p) => s + p.correct, 0)
  const avg = answers ? Math.round((correct / answers) * 100) : null

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-900">正确率趋势（近 30 天）</h2>
        <span className="text-xs text-slate-400">
          {withData.length} 天有答题 · 共 {answers} 题
          {avg !== null && (
            <>
              {" "}
              · 区间平均 <b className="text-slate-700">{avg}%</b>
            </>
          )}
        </span>
      </div>

      <div className="flex h-28 items-end gap-[3px]">
        {points.map((p) => (
          <div key={p.date} className="group flex h-full flex-1 flex-col justify-end" title={
            p.accuracy === null
              ? `${p.date} · 没有答题记录`
              : `${p.date} · 正确率 ${p.accuracy}% · 答 ${p.total} 题（对 ${p.correct}）`
          }>
            {p.accuracy === null ? (
              <div className="h-[2px] w-full rounded-sm bg-slate-100" />
            ) : (
              <div
                className={["w-full rounded-t", barClass(p.accuracy)].join(" ")}
                style={{ height: `${Math.max(3, p.accuracy)}%` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* 日期轴：每 5 天标一个，全标会糊成一片 */}
      <div className="mt-1 flex gap-[3px]">
        {points.map((p, i) => (
          <div key={p.date} className="flex-1 text-center text-[10px] text-slate-400">
            {i % 5 === 0 || i === points.length - 1 ? p.label : ""}
          </div>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />≥85%
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-indigo-500" />70–84%
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" />50–69%
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-rose-500" />&lt;50%
        </span>
        <span className="flex items-center gap-1">
          <span className="h-[2px] w-3 rounded bg-slate-200" />没答题
        </span>
      </div>
    </section>
  )
}
