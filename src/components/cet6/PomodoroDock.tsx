"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { finishPomodoroAction, startPomodoroAction } from "@/app/cet6/actions"
import { PRESETS, enterRest, remainingMs, setHidden, stopFocus, usePomodoro } from "@/lib/cet6/pomodoro-store"

function fmt(ms: number) {
  const s = Math.ceil(ms / 1000)
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`
}

/** 用 Web Audio 现场合成提示音，不依赖任何音频文件 */
function beep() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    ;[880, 1174].forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.18)
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + i * 0.18 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.18 + 0.22)
      osc.connect(gain).connect(ctx.destination)
      osc.start(ctx.currentTime + i * 0.18)
      osc.stop(ctx.currentTime + i * 0.18 + 0.24)
    })
    setTimeout(() => ctx.close(), 900)
  } catch {
    // 浏览器不给播就算了，动画仍然会提示
  }
}

/**
 * 番茄钟悬浮胶囊：在所有 /cet6 页面（除首页本身）显示。
 *
 * 计时状态来自全局 store（localStorage + 结束时间戳），所以切页、刷新都不会中断。
 * 专注结束时：抖动 + 提示音 + 一次性的番茄爆炸，然后自动进入休息。
 */
export function PomodoroDock() {
  const pathname = usePathname()
  const state = usePomodoro()
  const [, forceTick] = useState(0)
  const sessionRef = useRef<string | null>(null)
  const finishedRef = useRef<number | null>(null)

  // 只在需要显示时才每秒重绘
  useEffect(() => {
    if (state.phase === "idle") return
    const t = setInterval(() => forceTick((n) => n + 1), 500)
    return () => clearInterval(t)
  }, [state.phase])

  // 专注到点：记一次统计 + 提示音 + 进入休息
  useEffect(() => {
    if (state.phase !== "focus" || !state.endAt) return
    if (remainingMs(state) > 0) return
    if (finishedRef.current === state.endAt) return
    finishedRef.current = state.endAt
    const preset = PRESETS[state.presetIndex] ?? PRESETS[0]
    beep()
    void (async () => {
      await finishPomodoroAction(sessionRef.current, state.kind, preset.focus)
      sessionRef.current = null
      enterRest()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase, state.endAt])

  // 休息到点：静默结束
  useEffect(() => {
    if (state.phase !== "rest" || !state.endAt) return
    if (remainingMs(state) > 0) return
    const t = setTimeout(() => {
      import("@/lib/cet6/pomodoro-store").then((m) => m.endRest())
    }, 1200)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase, state.endAt])

  if (state.phase === "idle" || state.hidden) return null
  // 首页有自己的番茄卡片，不重复显示
  if (pathname === "/cet6") return null

  const left = remainingMs(state)
  const preset = PRESETS[state.presetIndex] ?? PRESETS[0]
  const isFocus = state.phase === "focus"

  return (
    <div className="fixed bottom-20 right-6 z-30 flex flex-col items-end gap-2">
      {/* 爆炸动画：只在 burst 变化后 1.2 秒内渲染 */}
      <Burst burst={state.burst} />
      <div
        key={state.burst}
        className={[
          "flex items-center gap-2 rounded-full border px-3 py-2 shadow-lg backdrop-blur",
          isFocus ? "border-indigo-200 bg-white/95 text-indigo-700" : "border-emerald-200 bg-white/95 text-emerald-700",
          // 到点时抖一下（用 CSS 动画类）
          left === 0 ? "animate-[cet6-shake_0.5s_ease-in-out]" : "",
        ].join(" ")}
        title={isFocus ? "专注中" : "休息中"}
      >
        <span className="text-sm">🍅</span>
        <span className="font-mono text-sm font-semibold tabular-nums">{fmt(left)}</span>
        <span className="hidden text-[11px] text-slate-500 sm:inline">{isFocus ? "专注" : "休息"}</span>
        {isFocus && (
          <button
            onClick={() => {
              sessionRef.current = null
              stopFocus()
            }}
            className="ml-1 rounded px-1.5 text-[11px] text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            title="放弃本次专注（不计入统计）"
          >
            放弃
          </button>
        )}
        <button
          onClick={() => setHidden(true)}
          className="rounded px-1.5 text-[11px] text-slate-300 hover:bg-slate-100 hover:text-slate-500"
          title="隐藏（计时继续，回到首页可见）"
        >
          ×
        </button>
      </div>
    </div>
  )
}

/** 一次性番茄爆炸：纯 CSS + emoji，不抢眼 */
function Burst({ burst }: { burst: number }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!burst) return
    setShow(true)
    const t = setTimeout(() => setShow(false), 1300)
    return () => clearTimeout(t)
  }, [burst])
  if (!show) return null
  return (
    <div className="pointer-events-none relative h-0 w-0" aria-hidden>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <span
          key={deg}
          className="absolute text-lg"
          style={{
            transform: `rotate(${deg}deg) translateY(-26px)`,
            animation: "cet6-burst 1.2s ease-out forwards",
          }}
        >
          ·
        </span>
      ))}
      <span
        className="absolute -left-4 -top-4 text-3xl"
        style={{ animation: "cet6-pop 1.2s ease-out forwards" }}
      >
        🍅
      </span>
    </div>
  )
}
