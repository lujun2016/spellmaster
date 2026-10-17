"use client"

import { useEffect, useRef, useState } from "react"
import { finishPomodoroAction, startPomodoroAction } from "@/app/cet6/actions"

/** 番茄钟预设：25/5 经典，45/10 适合刷真题 */
const PRESETS = [
  { label: "25 分钟", focus: 25, rest: 5 },
  { label: "45 分钟", focus: 45, rest: 10 },
  { label: "15 分钟", focus: 15, rest: 3 },
]

type Phase = "idle" | "focus" | "rest"

/**
 * 番茄钟。
 * 计时基于「目标结束时间戳」而不是每秒累加，这样标签页被浏览器降频后回来也不会走偏。
 */
export function Pomodoro({ defaultKind = "vocab" }: { defaultKind?: string }) {
  const [presetIndex, setPresetIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")
  const [remaining, setRemaining] = useState(PRESETS[0].focus * 60)
  const [completed, setCompleted] = useState(0)
  const [kind, setKind] = useState(defaultKind)

  const endAtRef = useRef<number | null>(null)
  const sessionIdRef = useRef<string | null>(null)
  const finishedRef = useRef(false)

  const preset = PRESETS[presetIndex]

  useEffect(() => {
    if (phase === "idle") return
    const tick = () => {
      if (!endAtRef.current) return
      const left = Math.max(0, Math.round((endAtRef.current - Date.now()) / 1000))
      setRemaining(left)
      if (left === 0 && !finishedRef.current) {
        finishedRef.current = true
        void onPhaseDone()
      }
    }
    tick()
    const timer = setInterval(tick, 500)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  async function onPhaseDone() {
    if (phase === "focus") {
      const minutes = preset.focus
      await finishPomodoroAction(sessionIdRef.current, kind, minutes)
      sessionIdRef.current = null
      setCompleted((c) => c + 1)
      // 自动进入休息，省得手动点
      setPhase("rest")
      endAtRef.current = Date.now() + preset.rest * 60 * 1000
      setRemaining(preset.rest * 60)
    } else {
      setPhase("idle")
      endAtRef.current = null
      setRemaining(preset.focus * 60)
    }
    finishedRef.current = false
  }

  async function start() {
    const { id } = await startPomodoroAction(kind)
    sessionIdRef.current = id
    finishedRef.current = false
    endAtRef.current = Date.now() + preset.focus * 60 * 1000
    setRemaining(preset.focus * 60)
    setPhase("focus")
  }

  function stop() {
    // 中途放弃：不计入统计，也不留半截 session
    sessionIdRef.current = null
    endAtRef.current = null
    finishedRef.current = false
    setPhase("idle")
    setRemaining(preset.focus * 60)
  }

  function skipToRest() {
    if (phase !== "focus") return
    finishedRef.current = true
    void onPhaseDone()
  }

  const total = phase === "focus" ? preset.focus * 60 : phase === "rest" ? preset.rest * 60 : preset.focus * 60
  const progress = total ? 1 - remaining / total : 0
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0")
  const ss = String(remaining % 60).padStart(2, "0")

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">
          番茄钟
          {phase === "focus" && <span className="ml-2 text-xs font-normal text-indigo-600">专注中</span>}
          {phase === "rest" && <span className="ml-2 text-xs font-normal text-emerald-600">休息中</span>}
        </h3>
        <span className="text-xs text-slate-400">今天完成 {completed} 个</span>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => {
              if (phase !== "idle") return
              setPresetIndex(i)
              setRemaining(p.focus * 60)
            }}
            disabled={phase !== "idle"}
            className={[
              "rounded-lg px-2.5 py-1 text-xs transition-colors",
              i === presetIndex
                ? "bg-indigo-50 font-medium text-indigo-700"
                : "text-slate-500 hover:bg-slate-100",
              phase !== "idle" ? "cursor-not-allowed opacity-60" : "",
            ].join(" ")}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mb-3">
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          disabled={phase !== "idle"}
          className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-600 disabled:bg-slate-50"
        >
          <option value="vocab">词汇复习</option>
          <option value="spelling">拼写听写</option>
          <option value="listening">听力精听</option>
          <option value="reading">真题阅读</option>
          <option value="writing">写作</option>
          <option value="translation">翻译</option>
          <option value="daily">每日精读</option>
        </select>
      </div>

      <div className="mb-3 flex items-baseline gap-2">
        <span className="font-mono text-3xl font-semibold tabular-nums text-slate-900">
          {mm}:{ss}
        </span>
        <span className="text-xs text-slate-400">{phase === "rest" ? "休息" : `${preset.focus} 分钟`}</span>
      </div>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={["h-full rounded-full transition-all", phase === "rest" ? "bg-emerald-400" : "bg-indigo-500"].join(" ")}
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <div className="flex gap-2">
        {phase === "idle" ? (
          <button
            onClick={start}
            className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            开始专注
          </button>
        ) : (
          <>
            {phase === "focus" && (
              <button
                onClick={skipToRest}
                className="flex-1 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                提前结束
              </button>
            )}
            <button
              onClick={stop}
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              放弃
            </button>
          </>
        )}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
        专注结束后自动计入今日学习时长；「放弃」不计入统计。
      </p>
    </div>
  )
}
