/**
 * 真题模块的数据库 / 文件访问层。
 *
 * 纯函数与类型在 paper-shared.ts（那里能安全地被客户端组件引用），
 * 这里只放必须待在服务端的东西：Prisma 查询、源数据文件读取、练习记录落库。
 *
 * 有一处需要说明的绕行：**短文正文不在数据库里**。
 * Paper 表没有放短文的字段（schema 里只存了 questions 一份），而 seed 时
 * 只写了 `questions` / `subjective`，源文件里的 `passages`（选词填空短文、
 * 信息匹配长文、两篇仔细阅读）被丢掉了。这些短文对本模块是必需品——
 * 没有文章就没法做阅读题——所以这里直接从 seed 的源数据
 * cet6-data/papers/quiz/<slug>.json 读 `passages`，按 slug 做模块级缓存。
 * 读不到时返回空对象，页面退化成「只显示题干 + 答案 + 解析」而不报错。
 */
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { db } from "./db"
import type { AttemptDetail } from "./json"
import {
  cleanClozePassage,
  cleanMatchingPassage,
  cleanReadingPassage,
  readAudioPieces,
  readByPart,
  readQuestions,
  readSubjective,
  splitLetterParagraphs,
  splitPassageParagraphs,
  tokenizeClozePassage,
  type AudioPiece,
  type PaperQuestion,
  type Paragraph,
  type PartKey,
  type Subjective,
} from "./paper-shared"
import { bumpDailyStat } from "./service"

/** seed 用的源数据目录，passages 只在这里有 */
const PASSAGE_DIR = join(process.cwd(), "cet6-data", "papers", "quiz")
const passageCache = new Map<string, Record<string, string>>()

/**
 * 读一套真题的短文。
 *
 * 优先用数据库里的 `Paper.passages`（seed 时已写入）；数据库里没有时回退读源文件，
 * 这样即使 cet6-data/ 目录被移走，页面也不会缺短文。
 * slug 会被拼进文件路径，所以先做格式校验挡住路径穿越。
 */
export async function getPaperPassages(slug: string, fromDb?: string | null): Promise<Record<string, string>> {
  if (!/^[0-9]{4}-[0-9]{2}-[0-9]$/.test(slug)) return {}
  const hit = passageCache.get(slug)
  if (hit) return hit

  let out: Record<string, string> = {}
  if (fromDb && fromDb !== "{}") {
    try {
      const parsed = JSON.parse(fromDb) as Record<string, string>
      passageCache.set(slug, parsed)
      return parsed
    } catch {
      // 落库的数据坏了就继续走文件回退
    }
  }
  const file = join(PASSAGE_DIR, `${slug}.json`)
  try {
    if (existsSync(file)) {
      const raw = JSON.parse(readFileSync(file, "utf8")) as { passages?: Record<string, string> }
      out = raw.passages ?? {}
    }
  } catch {
    // 源数据坏了不该让整页 500，退化成无短文模式
    out = {}
  }
  passageCache.set(slug, out)
  return out
}

// ==================== 列表页数据 ====================

export type AttemptSummary = {
  count: number
  /** 历史最高正确率对应的那次成绩 */
  bestCorrect: number
  bestTotal: number
  lastCorrect: number
  lastTotal: number
  lastAt: Date
}

export type PaperListItem = {
  slug: string
  year: number
  month: number
  set: string
  label: string
  questionCount: number
  byPart: Record<string, number>
  hasAudio: boolean
  passagesDone: number
  attempt: AttemptSummary | null
  /** 已作答客观题的完成度（0-100） */
  percent: number
  /** 完成度 100% 时显示原始得分，如 "48/55"；否则 null */
  score: string | null
}

/**
 * 每套真题的完成度：已作答的客观题题号（按 detail 去重）/ 总题数，
 * 以及各板块「最近一次」的得分汇总（用于 100% 时显示 48/55）。
 * detail 里的 n 是题号，同一题多次作答只算一次，所以重做不会把完成度刷过 100%。
 */
export async function getPaperProgress(): Promise<Map<string, { answered: number; correct: number; total: number }>> {
  const rows = await db.paperAttempt.findMany({
    select: { paperId: true, section: true, correct: true, total: true, detail: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  })
  const answered = new Map<string, Set<number>>()
  const latest = new Map<string, Map<string, { correct: number; total: number; at: Date }>>()

  for (const r of rows) {
    let set = answered.get(r.paperId)
    if (!set) {
      set = new Set<number>()
      answered.set(r.paperId, set)
    }
    try {
      const detail = JSON.parse(r.detail || "[]") as Array<{ n?: number }>
      for (const d of detail) if (typeof d.n === "number") set.add(d.n)
    } catch {
      // 坏数据就当没答过，不影响其他套
    }

    let per = latest.get(r.paperId)
    if (!per) {
      per = new Map()
      latest.set(r.paperId, per)
    }
    const cur = per.get(r.section)
    if (!cur || new Date(r.createdAt).getTime() >= cur.at.getTime()) {
      per.set(r.section, { correct: r.correct, total: r.total, at: new Date(r.createdAt) })
    }
  }

  const out = new Map<string, { answered: number; correct: number; total: number }>()
  for (const [paperId, set] of answered) {
    const per = latest.get(paperId)
    let correct = 0
    let total = 0
    if (per) for (const v of per.values()) {
      correct += v.correct
      total += v.total
    }
    out.set(paperId, { answered: set.size, correct, total })
  }
  return out
}

/** 一次把所有练习记录聚合成「每套的最好 / 最近成绩」，避免列表页 N+1 */
export async function getAttemptSummaries(): Promise<Map<string, AttemptSummary>> {
  const rows = await db.paperAttempt.findMany({
    select: { paperId: true, total: true, correct: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  })
  const map = new Map<string, AttemptSummary>()
  for (const r of rows) {
    const cur = map.get(r.paperId)
    if (!cur) {
      map.set(r.paperId, {
        count: 1,
        bestCorrect: r.correct,
        bestTotal: r.total,
        lastCorrect: r.correct,
        lastTotal: r.total,
        lastAt: r.createdAt,
      })
      continue
    }
    cur.count++
    cur.lastCorrect = r.correct
    cur.lastTotal = r.total
    cur.lastAt = r.createdAt
    // 正确率比较要按比例，不能直接比正确题数（各板块题量不同，见 gradeSection 的 total）
    const curRate = cur.bestTotal ? cur.bestCorrect / cur.bestTotal : 0
    const newRate = r.total ? r.correct / r.total : 0
    if (newRate > curRate) {
      cur.bestCorrect = r.correct
      cur.bestTotal = r.total
    }
  }
  return map
}

/**
 * 列表页数据。
 *
 * 只取 questionCount > 0 的套：库里除了 index.json 里那 46 套之外，还躺着 28 条
 * 早期 seed 留下的 . 分隔占位记录（2024.06_第1套 之类），它们没有任何题目。
 */
export async function getPaperList(): Promise<{ papers: PaperListItem[]; emptyCount: number }> {
  const [rows, summaries, progress] = await Promise.all([
    db.paper.findMany({
      where: { questionCount: { gt: 0 } },
      orderBy: [{ year: "desc" }, { month: "desc" }, { slug: "asc" }],
      select: {
        id: true,
        slug: true,
        year: true,
        month: true,
        set: true,
        label: true,
        questionCount: true,
        byPart: true,
        audioUrl: true,
        audioHls: true,
      },
    }),
    getAttemptSummaries(),
    getPaperProgress(),
  ])
  const emptyCount = await db.paper.count({ where: { questionCount: 0 } })

  const papers = rows.map((r) => ({
    slug: r.slug,
    year: r.year,
    month: r.month,
    set: r.set,
    label: r.label,
    questionCount: r.questionCount,
    byPart: readByPart(r.byPart),
    hasAudio: Boolean(r.audioUrl || r.audioHls),
    passagesDone: 0,
    ...(() => {
      const prog = progress.get(r.id)
      const percent = prog ? Math.min(100, Math.round((prog.answered / Math.max(1, r.questionCount)) * 100)) : 0
      return {
        percent,
        score: percent >= 100 && prog && prog.total > 0 ? `${prog.correct}/${prog.total}` : null,
      }
    })(),
    attempt: summaries.get(r.id) ?? null,
  }))
  return { papers, emptyCount }
}

// ==================== 详情页数据 ====================

export type PaperMaterial = {
  /** 清洗后的短文，没有则为空串 */
  cloze: string
  matching: string
  reading1: string
  reading2: string
  /** 信息匹配的段落（含真实段落号，用于渲染和答案校验） */
  matchingParagraphs: Paragraph[]
  readingParagraphs: Array<{ key: "reading-1" | "reading-2"; paragraphs: Paragraph[] }>
  /** 短文中真实出现的空位号；不在里面的选词填空题说明源数据缺了这一空 */
  clozeBlankNos: number[]
}

export type PaperDetail = {
  paper: {
    id: string
    slug: string
    year: number
    month: number
    set: string
    label: string
    questionCount: number
    byPart: Record<string, number>
    writing: string | null
    writingModel: string | null
    writingModelZh: string | null
    translation: string | null
    translationReference: string | null
    audioUrl: string | null
    audioHls: string | null
    audioPieces: AudioPiece[]
    hasAudio: boolean
    /** 数据来源说明（例如「扫描件OCR，个别答案可能有误」），空串表示没有额外说明 */
    source: string
  }
  questions: PaperQuestion[]
  material: PaperMaterial
  subjective: Subjective
  attempts: Array<{ id: string; section: string; total: number; correct: number; createdAt: Date }>
}

export async function getPaperDetail(slug: string): Promise<PaperDetail | null> {
  const row = await db.paper.findUnique({ where: { slug } })
  if (!row) return null

  const questions = readQuestions(row.questions)
  const passages = await getPaperPassages(slug, (row as { passages?: string | null }).passages ?? null)
  const matchingQs = questions.filter((q) => q.part === "matching")
  // 摘题干时传「全部阅读题号」而不是本篇的题号：源数据里偶尔把 Passage One 的题干
  // 粘到了 reading-2 字段后面（2025-06-2 就是这样），只按本篇题号会漏掉
  const readingNos = questions.filter((q) => q.part === "reading").map((q) => q.no)
  const cloze = passages.cloze ? cleanClozePassage(passages.cloze) : ""
  const matching = passages.matching
    ? cleanMatchingPassage(
        passages.matching,
        matchingQs.map((q) => q.no),
      )
    : ""
  const reading1 = passages["reading-1"] ? cleanReadingPassage(passages["reading-1"], readingNos) : ""
  const reading2 = passages["reading-2"] ? cleanReadingPassage(passages["reading-2"], readingNos) : ""

  const attempts = await db.paperAttempt.findMany({
    where: { paperId: row.id },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: { id: true, section: true, total: true, correct: true, createdAt: true },
  })

  return {
    paper: {
      id: row.id,
      slug: row.slug,
      year: row.year,
      month: row.month,
      set: row.set,
      label: row.label,
      questionCount: row.questionCount,
      byPart: readByPart(row.byPart),
      writing: row.writing,
      writingModel: row.writingModel,
      writingModelZh: row.writingModelZh,
      translation: row.translation,
      translationReference: row.translationReference,
      audioUrl: row.audioUrl,
      audioHls: row.audioHls,
      audioPieces: readAudioPieces(row.audioPieces),
      hasAudio: Boolean(row.audioUrl || row.audioHls),
      source: row.source ?? "",
    },
    questions,
    material: {
      cloze,
      matching,
      reading1,
      reading2,
      matchingParagraphs: matching ? splitLetterParagraphs(matching) : [],
      readingParagraphs: [
        { key: "reading-1" as const, paragraphs: reading1 ? splitPassageParagraphs(reading1) : [] },
        { key: "reading-2" as const, paragraphs: reading2 ? splitPassageParagraphs(reading2) : [] },
      ].filter((x) => x.paragraphs.length > 0),
      clozeBlankNos: tokenizeClozePassage(cloze)
        .filter((t) => t.kind === "blank")
        .map((t) => (t.kind === "blank" ? t.no : 0)),
    },
    subjective: readSubjective(row.subjective),
    attempts,
  }
}

// ==================== 练习记录落库 ====================

export type SectionAttemptInput = {
  paperId: string
  section: PartKey
  total: number
  correct: number
  detail: AttemptDetail[]
  minutes: number
}

/**
 * 写一次板块练习记录，并把答题数计入当日统计。
 *
 * minutes 由客户端按时长估算后传来（服务端不知道用户什么时候开始做的），
 * 兜底至少算 1 分钟，免得统计里出现 0 分钟的记录。
 */
export async function saveSectionAttempt(input: SectionAttemptInput) {
  const now = new Date()
  const minutes = Math.max(1, Math.round(input.minutes || 1))
  const total = Math.max(0, input.total)
  const correct = Math.min(total, Math.max(0, input.correct))

  const attempt = await db.paperAttempt.create({
    data: {
      paperId: input.paperId,
      section: input.section,
      total,
      correct,
      detail: JSON.stringify(input.detail ?? []),
      minutes,
    },
  })

  await bumpDailyStat(now, {
    minutes,
    reviews: total,
    correct,
    wrong: Math.max(0, total - correct),
  })

  return { id: attempt.id, total, correct, minutes }
}

/** 某套真题的历史成绩（详情页侧栏展示） */
export async function getPaperAttempts(paperId: string, limit = 8) {
  return db.paperAttempt.findMany({
    where: { paperId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { id: true, section: true, total: true, correct: true, minutes: true, createdAt: true },
  })
}
