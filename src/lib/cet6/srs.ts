/**
 * 复习排程引擎（简化版 SM-2 + 艾宾浩斯间隔阶梯）
 *
 * 设计要点：
 *  1. 间隔是固定阶梯（5分钟 → 60天），比纯 SM-2 更好预测，也方便向用户解释"下次什么时候复习"。
 *  2. ease（难度因子）只用来微调阶梯的落点，不让间隔失控爆炸。
 *  3. 「认得」和「拼得出」分开记（recallLv / spellLv）：六级翻译写作要拼得出，
 *     卡片翻面认出来不代表能拼写，所以两种模式的掌握度各自累积。
 *
 * 纯函数，不碰数据库，方便单测。
 */

/** 间隔阶梯，单位毫秒 */
export const INTERVALS_MS = [
  5 * 60 * 1000, // 0: 5 分钟
  12 * 60 * 60 * 1000, // 1: 12 小时
  24 * 60 * 60 * 1000, // 2: 1 天
  2 * 24 * 60 * 60 * 1000, // 3: 2 天
  4 * 24 * 60 * 60 * 1000, // 4: 4 天
  7 * 24 * 60 * 60 * 1000, // 5: 7 天
  15 * 24 * 60 * 60 * 1000, // 6: 15 天
  30 * 24 * 60 * 60 * 1000, // 7: 30 天
  60 * 24 * 60 * 60 * 1000, // 8: 60 天
] as const

export const MAX_STAGE = INTERVALS_MS.length - 1

/** 用户对一张卡的评级 */
export type Grade = "again" | "hard" | "good" | "easy"

/** 练习模式：影响哪一路掌握度增长 */
export type Skill = "recall" | "spell"

export const GRADE_LABEL: Record<Grade, string> = {
  again: "忘了",
  hard: "模糊",
  good: "认得",
  easy: "太简单",
}

export type ProgressState = {
  stage: number
  ease: number
  dueAt: Date
  reps: number
  lapses: number
  lastResult: Grade | null
  recallLv: number
  spellLv: number
}

export type NewProgress = Pick<ProgressState, "stage" | "ease" | "dueAt" | "reps" | "lapses" | "lastResult" | "recallLv" | "spellLv">

const DAY = 24 * 60 * 60 * 1000

/** 新词第一次学：立刻进入 12 小时后再复习 */
export function initialProgress(now = new Date(), grade: Grade = "good"): NewProgress {
  return applyGrade(
    {
      stage: 0,
      ease: 2.5,
      dueAt: now,
      reps: 0,
      lapses: 0,
      lastResult: null,
      recallLv: 0,
      spellLv: 0,
    },
    grade,
    "recall",
    now,
  )
}

/** 间隔阶梯取值，越界时收敛到两端 */
export function intervalAt(stage: number): number {
  const i = Math.max(0, Math.min(MAX_STAGE, Math.round(stage)))
  return INTERVALS_MS[i]
}

/**
 * 核心：根据评级算出新的排程状态。
 *
 * again（忘了）  ：退两阶，间隔回到 5 分钟，当天还会再见到它，lapses+1，ease 下降
 * hard （模糊）  ：原地踏步，间隔按当前阶梯的 60% 再压一压
 * good （认得）  ：进一阶
 * easy （太简单）：跳两阶，ease 上升
 */
export function applyGrade(
  prev: ProgressState | NewProgress,
  grade: Grade,
  skill: Skill = "recall",
  now = new Date(),
): NewProgress {
  const reps = prev.reps + 1
  let stage = prev.stage
  let ease = prev.ease
  let lapses = prev.lapses
  let dueMs: number

  switch (grade) {
    case "again":
      stage = Math.max(0, prev.stage - 2)
      lapses += 1
      ease = Math.max(1.3, ease - 0.2)
      dueMs = INTERVALS_MS[0]
      break
    case "hard":
      stage = prev.stage
      ease = Math.max(1.3, ease - 0.15)
      dueMs = Math.max(INTERVALS_MS[0], intervalAt(stage) * 0.6)
      break
    case "easy":
      stage = Math.min(MAX_STAGE, prev.stage + 2)
      ease = Math.min(3.0, ease + 0.15)
      dueMs = intervalAt(stage)
      break
    case "good":
    default:
      stage = Math.min(MAX_STAGE, prev.stage + 1)
      dueMs = intervalAt(stage)
      break
  }

  // ease 微调：越难记的词下次间隔略短，好记的略长
  if (grade === "good" || grade === "easy") dueMs *= ease / 2.5

  // 掌握度：认得出才算数；again 直接掉一级（下限 0）
  const bump = grade === "again" ? -1 : grade === "hard" ? 0 : grade === "easy" ? 2 : 1
  const recallLv = skill === "recall" ? clamp(Math.max(prev.recallLv, 0) + bump, 0, 5) : prev.recallLv
  const spellLv = skill === "spell" ? clamp(Math.max(prev.spellLv, 0) + bump, 0, 5) : prev.spellLv

  return {
    stage,
    ease,
    dueAt: new Date(now.getTime() + dueMs),
    reps,
    lapses,
    lastResult: grade,
    recallLv,
    spellLv,
  }
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

/** 下次复习时间的可读描述，用于卡片底部提示 */
export function describeDue(dueAt: Date, now = new Date()): string {
  const diff = dueAt.getTime() - now.getTime()
  if (diff <= 0) return "现在"
  if (diff < 60 * 60 * 1000) return `${Math.max(1, Math.round(diff / 60000))} 分钟后`
  if (diff < DAY) return `${Math.round(diff / (60 * 60 * 1000))} 小时后`
  const days = Math.round(diff / DAY)
  if (days < 30) return `${days} 天后`
  return `${Math.round(days / 30)} 个月后`
}

/** 是否已到期待复习 */
export function isDue(p: { dueAt: Date }, now = new Date()): boolean {
  return p.dueAt.getTime() <= now.getTime()
}

/**
 * 复习强度建议：按剩余天数算每天该背多少新词。
 * 用于首页给"今天该学多少个"一个明确答案，而不是拍脑袋。
 */
export function planDailyNewWords(params: {
  totalWords: number
  learnedWords: number
  daysLeft: number
  reviewLoadPerWord?: number
}): { newPerDay: number; remaining: number; note: string } {
  const { totalWords, learnedWords, daysLeft } = params
  const remaining = Math.max(0, totalWords - learnedWords)
  const days = Math.max(1, daysLeft)
  if (remaining === 0) {
    return { newPerDay: 0, remaining, note: "全部词都过了一遍，接下来只做复习" }
  }
  // 留出最后 3 周做真题冲刺，不在最后阶段塞新词
  const effectiveDays = Math.max(1, days - 21)
  const raw = remaining / effectiveDays
  const newPerDay = clamp(Math.ceil(raw / 5) * 5, 5, 120)
  const note =
    daysLeft < 21
      ? "距考试不足 3 周，建议停止背新词，专攻真题和错题"
      : `按剩余 ${remaining} 词 / 可用 ${effectiveDays} 天计算`
  return { newPerDay, remaining, note }
}
