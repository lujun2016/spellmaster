import type { AttemptRow } from "@/lib/cet6/stats"

/** 正确率配色跟趋势图统一，看到红色就知道这套卷子要重做 */
function accClass(acc: number): string {
  if (acc >= 85) return "bg-emerald-50 text-emerald-700"
  if (acc >= 70) return "bg-indigo-50 text-indigo-700"
  if (acc >= 50) return "bg-amber-50 text-amber-700"
  return "bg-rose-50 text-rose-700"
}

/**
 * 真题练习记录（最近 20 次）。
 *
 * 这是「刷了多少套、每套正确率多少」的流水账，不含主观题得分，
 * 只统计听力/选词填空/匹配/阅读这些能自动判对错的板块。
 */
export function AttemptTable({ rows }: { rows: AttemptRow[] }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-900">真题练习记录</h2>
        <span className="text-xs text-slate-400">最近 {rows.length} 次</span>
      </div>

      {!rows.length ? (
        <p className="py-6 text-center text-sm text-slate-400">
          还没有真题记录。去「真题练习」做一套，成绩会自动落到这里。
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-slate-500">
              <tr>
                <th className="px-2 py-2 font-medium">时间</th>
                <th className="px-2 py-2 font-medium">试卷</th>
                <th className="px-2 py-2 font-medium">板块</th>
                <th className="px-2 py-2 text-right font-medium">得分</th>
                <th className="px-2 py-2 text-right font-medium">正确率</th>
                <th className="hidden px-2 py-2 text-right font-medium sm:table-cell">用时</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="whitespace-nowrap px-2 py-2 text-xs text-slate-500">{r.at}</td>
                  <td className="px-2 py-2 text-slate-700">{r.paperLabel}</td>
                  <td className="px-2 py-2 text-slate-600">{r.section}</td>
                  <td className="px-2 py-2 text-right tabular-nums text-slate-700">
                    {r.correct} / {r.total}
                    {r.wrongCount > 0 && <span className="ml-1 text-[11px] text-rose-500">错 {r.wrongCount}</span>}
                  </td>
                  <td className="px-2 py-2 text-right">
                    <span className={["rounded px-2 py-0.5 text-xs tabular-nums", accClass(r.accuracy)].join(" ")}>
                      {r.accuracy}%
                    </span>
                  </td>
                  <td className="hidden px-2 py-2 text-right text-xs tabular-nums text-slate-500 sm:table-cell">
                    {r.minutes ? `${r.minutes} 分` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
