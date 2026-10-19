/**
 * 六级复习核心服务：今日队列、评级落库、打卡统计、设置读写。
 *
 * 约定：
 *  - 所有数据库访问都收敛在这里，页面/组件不要直接 import db。
 *  - 日期一律用「本地日期字符串」YYYY-MM-DD 作为 DailyStat 的主键（不用 Date 做主键，
 *    SQLite + 时区会把人绕晕）。
 *  - 服务端组件直接 await 这里的函数；客户端交互走 actions.ts 里包一层的 server action。
 */
import { Prisma } from "@/generated/cet6"
import { db } from "./db"
import {
  readExam,
  readPhrases,
  readRelWords,
  readSents,
  readSynos,
  readTrans,
  toJson,
  type ExamSentence,
  type Phrase,
  type RelWord,
  type Sentence,
  type Syno,
  type Trans,
} from "./json"
import { applyGrade, initialProgress, isDue, planDailyNewWords, type Grade, type Skill } from "./srs"

// ==================== 日期与设置 ====================

export function localDateKey(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function daysUntil(dateStr: string, now = new Date()): number {
  const target = new Date(`${dateStr}T00:00:00`)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((target.getTime() - today.getTime()) / (24 * 60 * 60 * 1000))
}

export type Settings = {
  examDate: string
  dailyNewWords: number
  dailyMaxReviews: number
  /** 到期欠账超过这个数就进"清账模式"：暂停新词、把欠账摊到几天里消化 */
  backlogLimit: number
  /** 报名开始日（YYYY-MM-DD，空串=没设置） */
  regStartDate: string
  /** 报名截止日（YYYY-MM-DD，空串=没设置） */
  regEndDate: string
  autoPlan: boolean
  ttsVoice: string
  ttsRate: number
  llmProvider: string
  llmModel: string
}

export async function getSettings(): Promise<Settings> {
  const rows = await db.setting.findMany()
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]))
  return {
    examDate: map.examDate || process.env.NEXT_PUBLIC_EXAM_DATE || "2026-12-12",
    dailyNewWords: Number(map.dailyNewWords ?? 40),
    dailyMaxReviews: Number(map.dailyMaxReviews ?? 150),
    backlogLimit: Number(map.backlogLimit ?? 120),
    regStartDate: map.regStartDate || "",
    regEndDate: map.regEndDate || "",
    autoPlan: (map.autoPlan ?? "1") === "1",
    ttsVoice: map.ttsVoice || "en-US",
    ttsRate: Number(map.ttsRate ?? 1),
    llmProvider: map.llmProvider || process.env.LLM_PROVIDER || "",
    llmModel: map.llmModel || process.env.LLM_MODEL || "",
  }
}

export async function setSetting(key: string, value: string) {
  await db.setting.upsert({ where: { key }, create: { key, value }, update: { value } })
}

// ==================== 词条 DTO ====================

export type WordDTO = {
  id: string
  text: string
  rank: number
  freq: number
  ukPhone: string | null
  usPhone: string | null
  trans: Trans[]
  defEn: string | null
  phrases: Phrase[]
  sents: Sentence[]
  exam: ExamSentence[]
  synos: Syno[]
  relWords: RelWord[]
  mnemonic: string | null
  /** 是否从未学过 */
  isNew: boolean
  stage: number
  spellLv: number
  recallLv: number
  dueAt: string | null
}

/**
 * 词条行的类型：必须带上 progress 关系（查询处统一用 include: { progress: true }），
 * 否则 row.progress 不在类型里。
 */
type WordRow = Prisma.WordGetPayload<{ include: { progress: true } }>

export function toWordDTO(row: WordRow, isNew: boolean): WordDTO {
  return {
    id: row.id,
    text: row.text,
    rank: row.rank,
    freq: row.freq,
    ukPhone: row.ukPhone,
    usPhone: row.usPhone,
    trans: readTrans(row.trans),
    defEn: row.defEn,
    phrases: readPhrases(row.phrases),
    sents: readSents(row.sents),
    exam: readExam(row.exam),
    synos: readSynos(row.synos),
    relWords: readRelWords(row.relWords),
    mnemonic: row.mnemonic,
    isNew,
    stage: row.progress?.stage ?? 0,
    spellLv: row.progress?.spellLv ?? 0,
    recallLv: row.progress?.recallLv ?? 0,
    dueAt: row.progress?.dueAt.toISOString() ?? null,
  }
}

// ==================== 今日队列 ====================

export type TodayQueue = {
  due: WordDTO[]
  fresh: WordDTO[]
  totalDue: number
  totalNew: number
  learnedWords: number
  totalWords: number
  daysLeft: number
  settings: Settings
  /** 今天实际取了多少个新词 */
  dailyNew: number
  /** 自动规划算出来的还是设置里手填的 */
  dailyNewFromPlan: boolean
  planNote: string
  /** 是否处于"清账模式"（到期积压超过 backlogLimit） */
  backlog: boolean
  /** 清账模式下今天打算发多少张卡 */
  catchUp: number | null
  /** 是否因欠账暂停了新词 */
  newPaused: boolean
}

/**
 * 每天实际该学多少新词。
 *
 * autoPlan 打开时按「剩余词数 / 可用天数」自动算（见 srs.planDailyNewWords），
 * 关掉就直接用用户设的 dailyNewWords。两者取较大值是为了不让自动规划
 * 把用户手动调大的量给压下去。
 */
export function effectiveDailyNew(params: {
  settings: Pick<Settings, "autoPlan" | "dailyNewWords" | "backlogLimit">
  totalWords: number
  learnedWords: number
  daysLeft: number
  /** 当前到期待复习数量：欠账太多时先别借新债 */
  dueCount?: number
}): { value: number; fromPlan: boolean; note: string } {
  // 欠账熔断：积压超过阈值就先不推新词，否则欠账滚雪球，最后人会直接放弃
  if (params.dueCount !== undefined && params.dueCount > params.settings.backlogLimit) {
    return {
      value: 0,
      fromPlan: true,
      note: `欠账 ${params.dueCount} 个已超过上限 ${params.settings.backlogLimit}，今天暂停新词，先清到期的`,
    }
  }
  const plan = planDailyNewWords({
    totalWords: params.totalWords,
    learnedWords: params.learnedWords,
    daysLeft: params.daysLeft,
  })
  if (!params.settings.autoPlan) {
    return { value: params.settings.dailyNewWords, fromPlan: false, note: "使用设置里的每日新词量" }
  }
  const value = Math.max(params.settings.dailyNewWords, plan.newPerDay)
  return { value, fromPlan: true, note: plan.note }
}

/**
 * 今日队列 = 已到期的复习词 + 未学过的新词。
 *
 * 排序上复习词优先（先还债再借新债），新词按 rank（真题频次）从高到低。
 * 两者合计受 dailyMaxReviews 限制，避免某天堆积 800 张卡直接把人劝退。
 */
export async function getTodayQueue(now = new Date()): Promise<TodayQueue> {
  const settings = await getSettings()

  // 先算总数，才能知道"按剩余天数每天该背多少"
  const [totalDue, totalNew, learnedWords, totalWords] = await Promise.all([
    db.wordProgress.count({ where: { dueAt: { lte: now } } }),
    db.word.count({ where: { progress: { is: null } } }),
    db.wordProgress.count(),
    db.word.count(),
  ])
  const daysLeft = daysUntil(settings.examDate, now)
  const dailyNew = effectiveDailyNew({ settings, totalWords, learnedWords, daysLeft, dueCount: totalDue })

  // 欠账熔断：积压太多时今天只发一部分（按 3 天摊平），剩下的几天慢慢还
  const backlog = totalDue > settings.backlogLimit
  const catchUp = backlog ? Math.max(60, Math.ceil(totalDue / 3)) : null
  const reviewTake = Math.min(settings.dailyMaxReviews, catchUp ?? settings.dailyMaxReviews)

  const dueRows = await db.word.findMany({
    where: { progress: { is: { dueAt: { lte: now } } } },
    include: { progress: true },
    // 难词插队：忘过次数多的先出现（同次数再按到期时间）
    orderBy: [{ progress: { lapses: "desc" } }, { progress: { dueAt: "asc" } }],
    take: reviewTake,
  })

  const freshRows = await db.word.findMany({
    where: { progress: { is: null } },
    orderBy: { rank: "asc" },
    take: backlog ? 0 : dailyNew.value,
    // 新词理论上没有 progress，但类型上要统一带上（toWordDTO 依赖它）
    include: { progress: true },
  })

  return {
    due: dueRows.map((r) => toWordDTO(r, false)),
    fresh: freshRows.map((r) => toWordDTO(r, true)),
    totalDue,
    totalNew,
    learnedWords,
    totalWords,
    daysLeft,
    settings,
    dailyNew: dailyNew.value,
    dailyNewFromPlan: dailyNew.fromPlan,
    planNote: dailyNew.note,
    backlog,
    catchUp,
    newPaused: backlog,
  }
}

/** 按 id 取单个词（拼写模式、错题回看用） */
export async function getWordById(id: string): Promise<WordDTO | null> {
  const row = await db.word.findUnique({ where: { id }, include: { progress: true } })
  if (!row) return null
  return toWordDTO(row, !row.progress)
}

// ==================== 评级落库 ====================

export type GradeResult = {
  ok: true
  wordId: string
  nextDueAt: string
  stage: number
  recallLv: number
  spellLv: number
}

/**
 * 记录一次评级：更新 SM-2 排程 + 当日统计。
 * 首次见到的词会先建 progress，再套用评级。
 */
export async function gradeWord(
  wordId: string,
  grade: Grade,
  skill: Skill = "recall",
  now = new Date(),
): Promise<GradeResult> {
  const existing = await db.wordProgress.findUnique({ where: { wordId } })

  const next = existing
    ? applyGrade(
        {
          stage: existing.stage,
          ease: existing.ease,
          dueAt: existing.dueAt,
          reps: existing.reps,
          lapses: existing.lapses,
          lastResult: (existing.lastResult as Grade | null) ?? null,
          recallLv: existing.recallLv,
          spellLv: existing.spellLv,
        },
        grade,
        skill,
        now,
      )
    : initialProgress(now, grade)

  const isFirstTime = !existing

  await db.wordProgress.upsert({
    where: { wordId },
    create: {
      wordId,
      stage: next.stage,
      ease: next.ease,
      dueAt: next.dueAt,
      reps: next.reps,
      lapses: next.lapses,
      lastResult: next.lastResult,
      recallLv: next.recallLv,
      spellLv: next.spellLv,
    },
    update: {
      stage: next.stage,
      ease: next.ease,
      dueAt: next.dueAt,
      reps: next.reps,
      lapses: next.lapses,
      lastResult: next.lastResult,
      recallLv: next.recallLv,
      spellLv: next.spellLv,
    },
  })

  await bumpDailyStat(now, {
    newWords: isFirstTime ? 1 : 0,
    reviews: isFirstTime ? 0 : 1,
    correct: grade === "again" ? 0 : 1,
    wrong: grade === "again" ? 1 : 0,
  })

  return {
    ok: true,
    wordId,
    nextDueAt: next.dueAt.toISOString(),
    stage: next.stage,
    recallLv: next.recallLv,
    spellLv: next.spellLv,
  }
}

// ==================== 打卡统计 ====================

export async function bumpDailyStat(
  now: Date,
  delta: { minutes?: number; newWords?: number; reviews?: number; correct?: number; wrong?: number; pomodoros?: number },
) {
  const date = localDateKey(now)
  const stat = await db.dailyStat.upsert({
    where: { date },
    create: {
      date,
      minutes: delta.minutes ?? 0,
      newWords: delta.newWords ?? 0,
      reviews: delta.reviews ?? 0,
      correct: delta.correct ?? 0,
      wrong: delta.wrong ?? 0,
      pomodoros: delta.pomodoros ?? 0,
    },
    update: {
      minutes: { increment: delta.minutes ?? 0 },
      newWords: { increment: delta.newWords ?? 0 },
      reviews: { increment: delta.reviews ?? 0 },
      correct: { increment: delta.correct ?? 0 },
      wrong: { increment: delta.wrong ?? 0 },
      pomodoros: { increment: delta.pomodoros ?? 0 },
    },
  })
  // 每次有学习行为就重算连续天数，保证首页数字即时正确
  const streak = await computeStreak(now)
  if (streak !== stat.streak) {
    await db.dailyStat.update({ where: { date }, data: { streak } })
  }
  return stat
}

/** 连续打卡天数：从今天往回数，遇到没有任何学习记录的日期就停 */
export async function computeStreak(now = new Date()): Promise<number> {
  const rows = await db.dailyStat.findMany({
    orderBy: { date: "desc" },
    take: 400,
    where: { OR: [{ minutes: { gt: 0 } }, { newWords: { gt: 0 } }, { reviews: { gt: 0 } }] },
  })
  if (!rows.length) return 0

  const set = new Set(rows.map((r) => r.date))
  let streak = 0
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  // 今天还没学也不该把昨天的连续记录清零，所以今天允许「缺席一次」
  if (!set.has(localDateKey(cursor))) cursor.setDate(cursor.getDate() - 1)
  while (set.has(localDateKey(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export type DashboardStats = {
  todayMinutes: number
  todayNew: number
  todayReviews: number
  todayCorrect: number
  todayWrong: number
  todayPomodoros: number
  streak: number
  totalDue: number
  totalNew: number
  totalWords: number
  learnedWords: number
  masteredWords: number
  dueSoon: number
  daysLeft: number
  accuracy: number
  recent: Array<{ date: string; minutes: number; newWords: number; reviews: number; correct: number; wrong: number; streak: number }>
}

export async function getDashboardStats(now = new Date()): Promise<DashboardStats> {
  const settings = await getSettings()
  const todayKey = localDateKey(now)
  const since = new Date(now.getTime() - 120 * 24 * 60 * 60 * 1000)

  const [today, recentRows, totalDue, totalNew, totalWords, learnedWords, masteredWords, dueSoon] = await Promise.all([
    db.dailyStat.findUnique({ where: { date: todayKey } }),
    db.dailyStat.findMany({ where: { date: { gte: localDateKey(since) } }, orderBy: { date: "asc" } }),
    db.wordProgress.count({ where: { dueAt: { lte: now } } }),
    db.word.count({ where: { progress: { is: null } } }),
    db.word.count(),
    db.wordProgress.count(),
    // 掌握 = 认得出（recallLv>=4）或拼得出（spellLv>=4）
    db.wordProgress.count({ where: { OR: [{ recallLv: { gte: 4 } }, { spellLv: { gte: 4 } }] } }),
    // 24 小时内到期
    db.wordProgress.count({ where: { dueAt: { gt: now, lte: new Date(now.getTime() + 24 * 60 * 60 * 1000) } } }),
  ])

  const totalAnswers = recentRows.reduce((s, r) => s + r.correct + r.wrong, 0)
  const totalCorrect = recentRows.reduce((s, r) => s + r.correct, 0)

  return {
    todayMinutes: today?.minutes ?? 0,
    todayNew: today?.newWords ?? 0,
    todayReviews: today?.reviews ?? 0,
    todayCorrect: today?.correct ?? 0,
    todayWrong: today?.wrong ?? 0,
    todayPomodoros: today?.pomodoros ?? 0,
    streak: today?.streak ?? 0,
    totalDue,
    totalNew,
    totalWords,
    learnedWords,
    masteredWords,
    dueSoon,
    daysLeft: daysUntil(settings.examDate, now),
    accuracy: totalAnswers ? Math.round((totalCorrect / totalAnswers) * 100) : 0,
    recent: recentRows.map((r) => ({
      date: r.date,
      minutes: r.minutes,
      newWords: r.newWords,
      reviews: r.reviews,
      correct: r.correct,
      wrong: r.wrong,
      streak: r.streak,
    })),
  }
}

// ==================== 错题本 / 生词本 ====================

export type NotebookInput = {
  kind: "word" | "mistake" | "sentence" | "phrase"
  source?: string
  title: string
  content: string
  answer?: string
  myAnswer?: string
  note?: string
  tags?: string
  refId?: string
}

export async function addNotebookItem(input: NotebookInput) {
  // 同类型 + 同标题 + 同内容视为重复收藏，直接返回已有的，避免刷出一堆重复
  const dup = await db.notebookItem.findFirst({
    where: { kind: input.kind, title: input.title, content: input.content },
  })
  if (dup) return dup

  const now = new Date()
  return db.notebookItem.create({
    data: {
      kind: input.kind,
      source: input.source ?? "手工",
      title: input.title,
      content: input.content,
      answer: input.answer ?? null,
      myAnswer: input.myAnswer ?? null,
      note: input.note ?? null,
      tags: input.tags ?? "",
      refId: input.refId ?? null,
      stage: 0,
      dueAt: new Date(now.getTime() + 12 * 60 * 60 * 1000), // 收藏后 12 小时进复习队列
    },
  })
}

/** 把词条一键加入生词本 */
export async function addWordToNotebook(word: WordDTO, source = "词汇") {
  const trans = word.trans.map((t) => `${t.pos ? t.pos + ". " : ""}${t.cn}`).join("；")
  return addNotebookItem({
    kind: "word",
    source,
    title: word.text,
    content: trans || word.text,
    note: word.exam[0]?.en ? `真题：${word.exam[0].en}` : undefined,
    tags: word.freq > 0 ? "真题词" : "",
    refId: word.id,
  })
}

export async function listNotebook(filter?: { kind?: string; source?: string; dueOnly?: boolean }) {
  const now = new Date()
  const items = await db.notebookItem.findMany({
    where: {
      ...(filter?.kind ? { kind: filter.kind } : {}),
      ...(filter?.source ? { source: filter.source } : {}),
      ...(filter?.dueOnly ? { dueAt: { lte: now } } : {}),
    },
    orderBy: [{ createdAt: "desc" }],
    take: 500,
  })
  return items
}

/** 错题本的复习评级：复用同一套 SM-2 阶梯 */
export async function gradeNotebookItem(id: string, grade: Grade, now = new Date()) {
  const item = await db.notebookItem.findUnique({ where: { id } })
  if (!item) return null
  const next = applyGrade(
    {
      stage: item.stage,
      ease: 2.5,
      dueAt: item.dueAt ?? now,
      reps: item.reps,
      lapses: item.lapses,
      lastResult: null,
      recallLv: 0,
      spellLv: 0,
    },
    grade,
    "recall",
    now,
  )
  const updated = await db.notebookItem.update({
    where: { id },
    data: {
      stage: next.stage,
      dueAt: next.dueAt,
      reps: next.reps,
      lapses: next.lapses,
    },
  })
  await bumpDailyStat(now, {
    reviews: 1,
    correct: grade === "again" ? 0 : 1,
    wrong: grade === "again" ? 1 : 0,
  })
  return updated
}

export async function deleteNotebookItem(id: string) {
  await db.notebookItem.delete({ where: { id } })
}

// ==================== 番茄钟 ====================

export async function startPomodoro(kind: string) {
  return db.studySession.create({ data: { kind, minutes: 0, pomodoros: 0, endedAt: null } })
}

export async function finishPomodoro(sessionId: string | null, kind: string, minutes: number, now = new Date()) {
  if (sessionId) {
    await db.studySession.update({
      where: { id: sessionId },
      data: { minutes, pomodoros: 1, endedAt: now },
    })
  } else {
    await db.studySession.create({ data: { kind, minutes, pomodoros: 1, endedAt: now } })
  }
  await bumpDailyStat(now, { minutes, pomodoros: 1 })
}

export async function getRecentSessions(limit = 30) {
  return db.studySession.findMany({ orderBy: { startedAt: "desc" }, take: limit })
}

export type { Grade, Skill }
export { isDue, toJson }
