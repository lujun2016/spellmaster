/**
 * 统计页的聚合查询层。
 *
 * 页面只负责画图，所有 group by / 求和 / 补零都收在这里，免得 JSX 里混进 SQL 味儿的代码。
 * 时间窗口一律按「本地日期」对齐：这块数据只在本机自己看，跟 DailyStat 的主键规则保持一致，
 * 不用去纠结 UTC 偏移，否则热力图的格子会对不上当天。
 */
import { db } from "./db"
import { localDateKey } from "./service"
import { INTERVALS_MS, MAX_STAGE } from "./srs"

// ==================== 标签表 ====================

/** StudySession.kind → 中文名（统计页的模块分布用） */
export const SESSION_KIND_LABEL: Record<string, string> = {
  vocab: "词汇复习",
  spelling: "拼写听写",
  listening: "听力精听",
  reading: "阅读理解",
  writing: "写作",
  translation: "翻译",
  daily: "每日精读",
}

/** PaperAttempt.section → 中文名 */
export const SECTION_LABEL: Record<string, string> = {
  listening: "听力",
  cloze: "选词填空",
  matching: "段落匹配",
  reading: "仔细阅读",
  writing: "写作",
  translation: "翻译",
  vocab: "词汇",
}

export const NOTEBOOK_KIND_LABEL: Record<string, string> = {
  word: "生词",
  mistake: "错题",
  sentence: "句子",
  phrase: "短语",
}

/** 取不到映射时直接显示原始值，好过显示 undefined */
export function labelOf(map: Record<string, string>, key: string): string {
  return map[key] ?? key
}

function daysBefore(now: Date, n: number): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - n)
}

/** 连续 N 天的本地日期列表（含今天），用来给图表补空位 */
export function dateKeys(days: number, now = new Date()): string[] {
  const out: string[] = []
  for (let i = days - 1; i >= 0; i--) {
    out.push(localDateKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)))
  }
  return out
}

// ==================== 日历热力图 ====================

export type HeatCell = {
  date: string
  minutes: number
  newWords: number
  reviews: number
  pomodoros: number
  /** 有没有学习记录，用来区分「没学」和「学了但计时为 0」 */
  active: boolean
}

/**
 * 近 N 天（默认 12 周 = 84 天）的每日学习量。
 * 没有记录的日期也要返回，否则热力图会缺格、列宽乱掉。
 */
export async function getHeatmapCells(days = 84, now = new Date()): Promise<HeatCell[]> {
  const keys = dateKeys(days, now)
  const rows = await db.dailyStat.findMany({
    where: { date: { gte: keys[0] } },
    orderBy: { date: "asc" },
  })
  const byDate = new Map(rows.map((r) => [r.date, r]))
  return keys.map((date) => {
    const r = byDate.get(date)
    return {
      date,
      minutes: r?.minutes ?? 0,
      newWords: r?.newWords ?? 0,
      reviews: r?.reviews ?? 0,
      pomodoros: r?.pomodoros ?? 0,
      active: Boolean(r && (r.minutes > 0 || r.newWords > 0 || r.reviews > 0)),
    }
  })
}

// ==================== 各模块时长分布 ====================

export type ModuleSlice = {
  kind: string
  label: string
  minutes: number
  sessions: number
  /** 占总时长的百分比，0–100 */
  share: number
}

/**
 * 近 N 天各模块时长。数据源是 StudySession 而不是 DailyStat，
 * 因为 DailyStat 只记了总时长，看不出时间花在哪个模块上。
 */
export async function getModuleMinutes(
  days = 30,
  now = new Date(),
): Promise<{ slices: ModuleSlice[]; totalMinutes: number; totalSessions: number }> {
  const since = daysBefore(now, days - 1)
  const rows = await db.studySession.groupBy({
    by: ["kind"],
    where: { startedAt: { gte: since } },
    _sum: { minutes: true },
    _count: { _all: true },
  })

  const raw = rows
    .map((r) => ({
      kind: r.kind,
      label: labelOf(SESSION_KIND_LABEL, r.kind),
      minutes: r._sum.minutes ?? 0,
      sessions: r._count._all,
    }))
    .sort((a, b) => b.minutes - a.minutes)

  const totalMinutes = raw.reduce((s, r) => s + r.minutes, 0)
  const totalSessions = raw.reduce((s, r) => s + r.sessions, 0)

  return {
    slices: raw.map((r) => ({
      ...r,
      share: totalMinutes ? Math.round((r.minutes / totalMinutes) * 100) : 0,
    })),
    totalMinutes,
    totalSessions,
  }
}

// ==================== 正确率趋势 ====================

export type AccuracyPoint = {
  date: string
  /** 图上显示的短标签，如 9/24 */
  label: string
  total: number
  correct: number
  /** 当天没答题时为 null，图上留空而不是画成 0% */
  accuracy: number | null
}

export async function getAccuracyTrend(days = 30, now = new Date()): Promise<AccuracyPoint[]> {
  const keys = dateKeys(days, now)
  const rows = await db.dailyStat.findMany({ where: { date: { gte: keys[0] } }, orderBy: { date: "asc" } })
  const byDate = new Map(rows.map((r) => [r.date, r]))
  return keys.map((date) => {
    const r = byDate.get(date)
    const total = (r?.correct ?? 0) + (r?.wrong ?? 0)
    return {
      date,
      label: `${Number(date.slice(5, 7))}/${Number(date.slice(8, 10))}`,
      total,
      correct: r?.correct ?? 0,
      accuracy: total ? Math.round(((r?.correct ?? 0) / total) * 100) : null,
    }
  })
}

// ==================== 真题练习记录 ====================

export type AttemptRow = {
  id: string
  /** 本地日期 + 时分，直接可读 */
  at: string
  paperLabel: string
  section: string
  total: number
  correct: number
  accuracy: number
  minutes: number
  wrongCount: number
}

export async function getRecentAttempts(limit = 20): Promise<AttemptRow[]> {
  const rows = await db.paperAttempt.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { paper: { select: { label: true, set: true, year: true, month: true } } },
  })
  return rows.map((r) => {
    const d = r.createdAt
    const hh = String(d.getHours()).padStart(2, "0")
    const mm = String(d.getMinutes()).padStart(2, "0")
    // label 为空的老数据用 year/month 兜一下，别显示成空白
    const label = r.paper?.label || (r.paper ? `${r.paper.year}年${r.paper.month}月` : "未知试卷")
    return {
      id: r.id,
      at: `${localDateKey(d)} ${hh}:${mm}`,
      paperLabel: r.paper?.set ? `${label} ${r.paper.set}` : label,
      section: labelOf(SECTION_LABEL, r.section),
      total: r.total,
      correct: r.correct,
      accuracy: r.total ? Math.round((r.correct / r.total) * 100) : 0,
      minutes: r.minutes,
      wrongCount: Math.max(0, r.total - r.correct),
    }
  })
}

// ==================== 词汇记忆阶段分布 ====================

export type StageBucket = {
  stage: number
  /** 该阶对应的复习间隔，如「7 天」 */
  interval: string
  count: number
  /** 这个阶段意味着什么 */
  note: string
}

/** 间隔毫秒 → 人话 */
function intervalLabel(ms: number): string {
  if (ms < 60 * 60 * 1000) return `${Math.round(ms / 60000)} 分钟`
  if (ms < 24 * 60 * 60 * 1000) return `${Math.round(ms / (60 * 60 * 1000))} 小时`
  const days = Math.round(ms / (24 * 60 * 60 * 1000))
  return days < 30 ? `${days} 天` : `${Math.round(days / 30)} 个月`
}

/** 把 0–8 阶粗分成四段，给「我现在背到哪一层了」一个说法 */
function stageNote(stage: number): string {
  if (stage <= 1) return "刚认识，随时会忘"
  if (stage <= 4) return "短期记忆，隔几天还能想起来"
  if (stage <= 6) return "中期记忆，两周左右见一次"
  return "长期记忆，考试前不用再操心"
}

export async function getStageDistribution(): Promise<{
  buckets: StageBucket[]
  total: number
  mastered: number
}> {
  const rows = await db.wordProgress.groupBy({ by: ["stage"], _count: { _all: true } })
  const byStage = new Map(rows.map((r) => [r.stage, r._count._all]))

  const buckets: StageBucket[] = []
  for (let stage = 0; stage <= MAX_STAGE; stage++) {
    buckets.push({
      stage,
      interval: intervalLabel(INTERVALS_MS[stage]),
      count: byStage.get(stage) ?? 0,
      note: stageNote(stage),
    })
  }
  // 理论上 stage 不会越界（applyGrade 收敛过），真出现了也别丢数据：并入最后一阶提示
  const extra = rows.filter((r) => r.stage > MAX_STAGE).reduce((s, r) => s + r._count._all, 0)
  if (extra > 0) buckets[buckets.length - 1].count += extra

  return { buckets, total: buckets.reduce((s, b) => s + b.count, 0), mastered: byStage.get(MAX_STAGE) ?? 0 }
}

// ==================== 累计总量 ====================

export type LifetimeTotals = {
  minutes: number
  sessions: number
  answers: number
  correct: number
  accuracy: number
  activeDays: number
}

/**
 * 累计学习时长/答题数。
 * 累计值用 DailyStat 求和（它是所有学习行为的汇总），不额外扫一遍 StudySession。
 */
export async function getLifetimeTotals(): Promise<LifetimeTotals> {
  const [agg, sessions, activeDays] = await Promise.all([
    db.dailyStat.aggregate({ _sum: { minutes: true, correct: true, wrong: true } }),
    db.studySession.count(),
    db.dailyStat.count({ where: { OR: [{ minutes: { gt: 0 } }, { newWords: { gt: 0 } }, { reviews: { gt: 0 } }] } }),
  ])
  const correct = agg._sum.correct ?? 0
  const wrong = agg._sum.wrong ?? 0
  const answers = correct + wrong
  return {
    minutes: agg._sum.minutes ?? 0,
    sessions,
    answers,
    correct,
    accuracy: answers ? Math.round((correct / answers) * 100) : 0,
    activeDays,
  }
}

// ==================== 错题本概览（统计页顶部小卡片） ====================

export async function getNotebookSummary(now = new Date()): Promise<{ total: number; due: number }> {
  const [total, due] = await Promise.all([
    db.notebookItem.count(),
    db.notebookItem.count({ where: { dueAt: { lte: now } } }),
  ])
  return { total, due }
}
