import type { HeatCell } from "@/lib/cet6/stats"

/**
 * 12 周日历热力图。
 *
 * 手工用 div 拼（项目里没有图表库，也不打算为此加依赖）：
 * 一列一周，一列里 7 格从周一排到周日，开头补空格让第一列对齐到周一，
 * 读法跟 GitHub 贡献图一致。颜色只按分钟数分档，一眼能看出哪天偷懒了。
 */
function heatClass(minutes: number): string {
  if (minutes <= 0) return "bg-slate-100"
  if (minutes < 15) return "bg-indigo-100"
  if (minutes < 30) return "bg-indigo-200"
  if (minutes < 60) return "bg-indigo-400"
  if (minutes < 120) return "bg-indigo-500"
  return "bg-indigo-700"
}

const LEVELS: Array<{ cls: string; label: string }> = [
  { cls: "bg-slate-100", label: "0" },
  { cls: "bg-indigo-100", label: "<15 分" },
  { cls: "bg-indigo-200", label: "15–30 分" },
  { cls: "bg-indigo-400", label: "30–60 分" },
  { cls: "bg-indigo-500", label: "1–2 小时" },
  { cls: "bg-indigo-700", label: ">2 小时" },
]

export function Heatmap({ cells }: { cells: HeatCell[] }) {
  // 首日对齐到周一：getDay() 周日是 0，转成「离本周一差几天」
  // 没数据就整块不渲染：下面的 cells[0].date 取不到会让整页白屏，不值得为一个组件赌
  if (!cells.length) return null

  const firstDow = new Date(`${cells[0].date}T00:00:00`).getDay()
  const pad = (firstDow + 6) % 7
  const filled: Array<HeatCell | null> = [...Array(pad).fill(null), ...cells]
  const cols = Math.ceil(filled.length / 7)

  const totalMinutes = cells.reduce((s, c) => s + c.minutes, 0)
  const activeDays = cells.filter((c) => c.active).length
  const totalNew = cells.reduce((s, c) => s + c.newWords, 0)
  const totalReviews = cells.reduce((s, c) => s + c.reviews, 0)

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-900">近 12 周学习热力图</h2>
        <span className="text-xs text-slate-400">
          {activeDays} 天有记录 · {Math.round(totalMinutes / 60)} 小时 · 新词 {totalNew} · 复习 {totalReviews}
        </span>
      </div>

      <div className="flex gap-2">
        {/* 左侧星期刻度，只标奇数行，免得挤成一团 */}
        <div className="grid grid-rows-7 gap-[3px] text-[10px] leading-3 text-slate-400">
          {["一", "", "三", "", "五", "", "日"].map((d, i) => (
            <div key={i} className="h-3">
              {d}
            </div>
          ))}
        </div>

        <div className="flex gap-[3px] overflow-x-auto pb-1">
          {Array.from({ length: cols }, (_, col) => (
            <div key={col} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }, (_, row) => {
                const cell = filled[col * 7 + row]
                // 补位格保留占位，否则列会错位
                if (!cell) return <div key={row} className="h-3 w-3 rounded-sm bg-transparent" />
                return (
                  <div
                    key={row}
                    title={`${cell.date} · ${cell.minutes} 分钟 · 新词 ${cell.newWords} / 复习 ${cell.reviews}`}
                    className={["h-3 w-3 rounded-sm", heatClass(cell.minutes)].join(" ")}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
        <span>少</span>
        {LEVELS.map((l) => (
          <span key={l.cls} className="flex items-center gap-1">
            <span className={["h-2.5 w-2.5 rounded-sm", l.cls].join(" ")} />
            {l.label}
          </span>
        ))}
        <span>多</span>
      </div>
    </section>
  )
}
