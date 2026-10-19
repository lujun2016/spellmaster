"use client"

import { useEffect, useState } from "react"
import { PRESETS, remainingMs, setPreset, startFocus, stopFocus, totalMs, usePomodoro } from "@/lib/cet6/pomodoro-store"

/**
 * 首页的番茄钟卡片。
 *
 * 极简设计：不再让用户选「学习类型」，点预设时长 → 开始专注即可。
 * 计时状态在全局 store 里，切页/刷新都不断，右下角有胶囊。
 */
export function Pomodoro() {
  const state = usePomodoro()
  const [, tick] = useState(0)

  useEffect(() => {
    if (state.phase === "idle") return
    const t = setInterval(() => tick((n) => n + 1), 500)
    return () => clearInterval(t)
  }, [state.phase])

  const preset = PRESETS[state.presetIndex] ?? PRESETS[0]
  const running = state.phase !== "idle"
  const left = remainingMs(state)
  const total = totalMs(state)
  const progress = total ? 1 - left / total : 0
  const mm = String(Math.floor(Math.ceil(left / 1000) / 60)).padStart(2, "0")
  const ss = String(Math.ceil(left / 1000) % 60).padStart(2, "0")

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">
          番茄钟
          {state.phase === "focus" && <span className="ml-2 text-xs font-normal text-teal-600">专注中</span>}
          {state.phase === "rest" && <span className="ml-2 text-xs font-normal text-emerald-600">休息中</span>}
        </h3>
        <span className="text-xs text-slate-400">{running ? "计时中，切页不中断" : "点开始后可以切到别的页面"}</span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => {
              if (!running) setPreset(i)
            }}
            disabled={running}
            className={[
              "rounded-lg px-3 py-1.5 text-sm transition-colors",
              i === state.presetIndex ? "bg-teal-50 font-medium text-teal-700" : "text-slate-500 hover:bg-slate-100",
              running ? "cursor-not-allowed opacity-50" : "",
            ].join(" ")}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mb-3 flex items-baseline gap-2">
        <span className="font-mono text-3xl font-semibold tabular-nums text-slate-900">
          {mm}:{ss}
        </span>
        <span className="text-xs text-slate-400">{state.phase === "rest" ? "休息" : `${preset.focus} 分钟`}</span>
      </div>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={["h-full rounded-full transition-all", state.phase === "rest" ? "bg-emerald-400" : "bg-teal-500"].join(" ")}
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {state.phase === "idle" ? (
        <button
          onClick={() => startFocus(state.presetIndex, "focus")}
          className="w-full rounded-lg bg-teal-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-teal-700"
        >
          开始专注
        </button>
      ) : (
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg bg-slate-50 px-3 py-2 text-center text-xs text-slate-500">
            {state.phase === "focus" ? "到点会提示并自动进入休息" : "休息结束后自动结束"}
          </div>
          <button
            onClick={stopFocus}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            放弃
          </button>
        </div>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
        专注结束会计入今日学习时长；「放弃」不计入。离开首页后计时继续，右下角有胶囊看剩余时间。
      </p>
    </div>
  )
}
