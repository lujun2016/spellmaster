import type { StageBucket } from "@/lib/cet6/stats"

/**
 * 词汇复习分布：WordProgress.stage 各阶有多少词。
 *
 * stage 就是间隔阶梯的下标（5 分钟 → 60 天），所以这张图回答的是
 * 「我现在有多少词在短期记忆里、多少词已经沉到长期记忆」——
 * 短期那几阶堆得越多，说明每天要还的复习债越重。
 */
export function StageBars({ buckets, total }: { buckets: StageBucket[]; total: number }) {
  const max = Math.max(1, ...buckets.map((b) => b.count))

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-900">词汇记忆阶段分布</h2>
        <span className="text-xs text-slate-400">已开始学的词 {total} 个 · 按 SM-2 间隔阶梯统计</span>
      </div>

      {total === 0 && (
        <p className="py-6 text-center text-sm text-slate-400">
          还没有开始背词。学过的词会按复习间隔自动落到 0–8 阶里。
        </p>
      )}

      <div className="space-y-1.5">
        {buckets.map((b) => (
          <div key={b.stage} className="flex items-center gap-3 text-sm">
            <span className="w-24 shrink-0 text-xs text-slate-500">
              第 {b.stage} 阶 · {b.interval}
            </span>
            <div className="h-3.5 min-w-0 flex-1 overflow-hidden rounded bg-slate-100">
              <div
                className="h-full rounded bg-gradient-to-r from-indigo-400 to-indigo-600"
                style={{ width: `${b.count > 0 ? Math.max(2, Math.round((b.count / max) * 100)) : 0}%` }}
              />
            </div>
            <span className="w-16 shrink-0 text-right text-xs tabular-nums text-slate-500">{b.count} 词</span>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-2 text-[11px] text-slate-500 sm:grid-cols-4">
        <div className="rounded-lg bg-slate-50 px-2 py-1.5">
          <b className="text-slate-700">0–1 阶</b> 刚认识，随时会忘
        </div>
        <div className="rounded-lg bg-slate-50 px-2 py-1.5">
          <b className="text-slate-700">2–4 阶</b> 短期记忆，几天一见面
        </div>
        <div className="rounded-lg bg-slate-50 px-2 py-1.5">
          <b className="text-slate-700">5–6 阶</b> 中期记忆，两周左右
        </div>
        <div className="rounded-lg bg-slate-50 px-2 py-1.5">
          <b className="text-slate-700">7–8 阶</b> 长期记忆，考前不用管
        </div>
      </div>
    </section>
  )
}
