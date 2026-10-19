"use client"

/**
 * 番茄钟的全局状态（跨页面、跨刷新）。
 *
 * 为什么不用组件的 useState：一切换页面组件就卸载了，计时归零。
 * 这里把「结束时间戳」存进 localStorage，任何页面读同一个时间戳就能算出剩余时间；
 * 刷新、关标签再回来都能续上（已过期就直接判完成）。
 */
import { useSyncExternalStore } from "react"

export type Phase = "idle" | "focus" | "rest"

export type PomState = {
  phase: Phase
  kind: string
  presetIndex: number
  /** 本阶段结束的绝对时间戳（毫秒）；null = 未开始 */
  endAt: number | null
  /** 用户手动隐藏了胶囊 */
  hidden: boolean
  /** 每次完成专注 +1，用来触发一次性的爆炸动画 */
  burst: number
}

export const PRESETS = [
  { label: "25 分钟", focus: 25, rest: 5 },
  { label: "45 分钟", focus: 45, rest: 10 },
  { label: "15 分钟", focus: 15, rest: 3 },
] as const

export const KINDS = [
  ["vocab", "词汇复习"],
  ["spelling", "拼写听写"],
  ["listening", "听力精听"],
  ["reading", "真题阅读"],
  ["writing", "写作"],
  ["translation", "翻译"],
  ["daily", "每日精读"],
] as const

const KEY = "cet6:pomodoro:v1"

const initial: PomState = { phase: "idle", kind: "focus", presetIndex: 0, endAt: null, hidden: false, burst: 0 }

let state: PomState = initial
let loaded = false
const listeners = new Set<() => void>()

function readStorage(): PomState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return initial
    const parsed = JSON.parse(raw) as Partial<PomState>
    return {
      phase: parsed.phase === "focus" || parsed.phase === "rest" ? parsed.phase : "idle",
      kind: typeof parsed.kind === "string" ? parsed.kind : "focus",
      presetIndex: typeof parsed.presetIndex === "number" ? parsed.presetIndex : 0,
      endAt: typeof parsed.endAt === "number" ? parsed.endAt : null,
      hidden: Boolean(parsed.hidden),
      burst: typeof parsed.burst === "number" ? parsed.burst : 0,
    }
  } catch {
    return initial
  }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // 隐私模式写不了就算了，内存里照样能用
  }
}

function emit() {
  persist()
  listeners.forEach((l) => l())
}

function update(patch: Partial<PomState>) {
  state = { ...state, ...patch }
  emit()
}

export function subscribe(l: () => void) {
  if (!loaded && typeof window !== "undefined") {
    state = readStorage()
    loaded = true
  }
  listeners.add(l)
  return () => listeners.delete(l)
}

export function getSnapshot(): PomState {
  return state
}

/** 服务端渲染时给一个固定初值，避免水合不一致（客户端挂载后会立刻读 localStorage） */
const serverSnapshot: PomState = initial
export function getServerSnapshot(): PomState {
  return serverSnapshot
}

export function usePomodoro(): PomState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** 开始一个专注阶段 */
export function startFocus(presetIndex: number, kind: string) {
  const preset = PRESETS[presetIndex] ?? PRESETS[0]
  update({
    phase: "focus",
    kind,
    presetIndex,
    endAt: Date.now() + preset.focus * 60_000,
    hidden: false,
  })
}

/** 主动放弃（不计入统计） */
export function stopFocus() {
  update({ phase: "idle", endAt: null })
}

/** 专注结束：进入休息阶段，并触发一次爆炸动画 */
export function enterRest() {
  const preset = PRESETS[state.presetIndex] ?? PRESETS[0]
  update({ phase: "rest", endAt: Date.now() + preset.rest * 60_000, burst: state.burst + 1 })
}

/** 休息结束 */
export function endRest() {
  update({ phase: "idle", endAt: null })
}

export function setHidden(hidden: boolean) {
  update({ hidden })
}

export function setPreset(i: number) {
  update({ presetIndex: i })
}

export function setKind(kind: string) {
  update({ kind })
}

/** 剩余毫秒数（0 = 已到点） */
export function remainingMs(s: PomState): number {
  if (!s.endAt) return 0
  return Math.max(0, s.endAt - Date.now())
}

export function totalMs(s: PomState): number {
  const preset = PRESETS[s.presetIndex] ?? PRESETS[0]
  return (s.phase === "rest" ? preset.rest : preset.focus) * 60_000
}
