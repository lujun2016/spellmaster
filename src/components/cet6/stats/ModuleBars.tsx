import type { ModuleSlice } from "@/lib/cet6/stats"

/** 每个模块一个色，和词汇/听力/写作这些模块本身的气质对上，方便形成记忆 */
const KIND_CLS: Record<string, string> = {
  vocab: "bg-indigo-500",
  spelling: "bg-violet-500",
  listening: "bg-sky-500",
  reading: "bg-emerald-500",
  writing: "bg-fuchsia-500",
  translation: "bg-amber-500",
  daily: "bg-teal-500",
}

/**
 * 各模块时长分布（近 30 天）。
 *
 * 用横向条形而不是饼图：模块名是中文短词，横向条能直接写名字，
 * 也不需要在圆里做角度换算——手写 div 宽度百分比就够了。
 * 条长按「最长的那一项」归一化，否则 5 分钟的模块会被 300 分钟的压成一条看不见的线。
 */
export function ModuleBars({
  slices,
  totalMinutes,
  sessions,
}: {
  slices: ModuleSlice[]
  totalMinutes: number
  sessions: number
}) {
  const max = Math.max(1, ...slices.map((s) => s.minutes))

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-900">各模块时长分布（近 30 天）</h2>
        <span className="text-xs text-slate-400">
          共 {totalMinutes} 分钟 · {sessions} 次会话
        </span>
      </div>

      {!slices.length && (
        <p className="py-6 text-center text-sm text-slate-400">
          近 30 天没有学习会话记录。用首页的番茄钟计时，或在真题/听力页完成后自动记录。
        </p>
      )}

      <div className="space-y-2.5">
        {slices.map((s) => (
          <div key={s.kind} className="flex items-center gap-3 text-sm">
            <span className="w-20 shrink-0 text-xs text-slate-600">{s.label}</span>
            <div className="h-4 min-w-0 flex-1 overflow-hidden rounded bg-slate-100">
              <div
                className={["h-full rounded", KIND_CLS[s.kind] ?? "bg-slate-400"].join(" ")}
                style={{ width: `${Math.max(2, Math.round((s.minutes / max) * 100))}%` }}
              />
            </div>
            <span className="w-28 shrink-0 text-right text-xs tabular-nums text-slate-500">
              {s.minutes} 分 · {s.share}% · {s.sessions} 次
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
