/**
 * 真题模块的「纯函数 + 类型」层。
 *
 * 为什么单独拆一个文件而不是全塞进 paper.ts：paper.ts 要 import node:fs 和 db，
 * 一旦被 "use client" 组件引入就会把服务端依赖打进浏览器包（直接编译失败）。
 * 所以凡是页面和客户端组件都要用的东西（类型、材料清洗、判分）都放这里，
 * paper.ts 只放数据库和文件读取。
 *
 * 另一件事是「材料清洗」：题库源数据里的短文尾部混进了不少 PDF 抽取残留——
 * 选词填空的词库被粘在短文后面、信息匹配的题干列表被粘在最后一段后面、
 * 仔细阅读的选项被粘在短文末尾。这些内容题目里本来就有，留着只会干扰阅读，
 * 所以在读取时统一剥掉（见 cleanClozePassage / cleanMatchingPassage / cleanReadingPassage）。
 */
import { parseJson, type AttemptDetail } from "./json"

// ==================== 类型 ====================

export type PartKey = "listening" | "cloze" | "matching" | "reading"

export type PaperQuestion = {
  no: number
  part: string
  partName?: string
  stem: string
  stemZh?: string
  /** 正确答案字母；matching 是段落号（A–O） */
  answer: string
  answerText?: string
  type?: string
  /** 中文解析，字段名各题型不同：听力/阅读是 定位/信号/替换/排除，选词填空是 词性槽/依据/竞争词 */
  explain?: Record<string, string> | null
  /** 听力（英文选项）。选词填空这里是整个词库，格式是 "A) alienating" */
  options?: string[] | null
  /** 听力选项的中文（部分题目源数据缺失，值为 null） */
  optionsZh?: string[] | null
  /** 选词填空：字母 → 单词 */
  wordBank?: Record<string, string> | null
  /** 信息匹配：可选段落号 */
  paraOptions?: string[] | null
  /** 信息匹配：题干中文提要 */
  anchor?: string
  /** 所属材料：reading-1 / reading-2（仔细阅读）或 cloze / matching */
  pref?: string
  passageNo?: number
}

export type AudioPiece = { label: string; start: number; end: number }

export type Passages = {
  cloze?: string
  matching?: string
  "reading-1"?: string
  "reading-2"?: string
}

export type Paragraph = { letter: string; text: string }

/** 作文范文的逐段大纲 */
export type WritingOutline = { no: number; text: string }
/** 翻译的逐句拆解：主干 / 降级处理 / 语法点 / 参考译文 */
export type TranslationSentence = { trunk?: string; downgrade?: string; grammar?: string; target?: string }

/** Paper.subjective 的结构（作文 + 翻译的完整解析） */
export type Subjective = {
  writing?: { directions?: string; model?: string; modelZh?: string; outline?: WritingOutline[] }
  translation?: {
    directions?: string
    source?: string
    reference?: string
    sentences?: TranslationSentence[]
  }
}

export const readSubjective = (raw: string | null | undefined) => parseJson<Subjective>(raw, {})

/** 翻译逐句拆解的字段顺序 */
export const TRANSLATION_SENTENCE_FIELDS: Array<{ key: keyof TranslationSentence; label: string }> = [
  { key: "trunk", label: "主干" },
  { key: "downgrade", label: "降级处理" },
  { key: "grammar", label: "语法点" },
  { key: "target", label: "参考译文" },
]

/** 题型展示元数据：中文名 + 解析字段的展示顺序 */
export const PART_META: Record<PartKey, { name: string; short: string; explainOrder: string[] }> = {
  listening: { name: "听力理解", short: "听力", explainOrder: ["定位", "信号", "替换", "排除"] },
  cloze: { name: "选词填空", short: "选词填空", explainOrder: ["词性槽", "依据", "竞争词", "易错"] },
  matching: { name: "长篇阅读（信息匹配）", short: "段落匹配", explainOrder: ["定位", "改写", "辨邻"] },
  reading: {
    name: "仔细阅读",
    short: "仔细阅读",
    // 阅读的解析字段最多：先判题型、拆句子，再讲定位替换，最后逐项排除
    explainOrder: ["判型", "拆句", "选项", "定位", "信号", "替换", "排除"],
  },
}

export function isPartKey(v: string): v is PartKey {
  return v === "listening" || v === "cloze" || v === "matching" || v === "reading"
}

// ==================== 读取器 ====================

export const readQuestions = (raw: string | null | undefined) => parseJson<PaperQuestion[]>(raw, [])
export const readByPart = (raw: string | null | undefined) => parseJson<Record<string, number>>(raw, {})
export const readAudioPieces = (raw: string | null | undefined) => parseJson<AudioPiece[]>(raw, [])

// ==================== 材料清洗 ====================

/** 选词填空短文：末尾粘着的 15 个词库（A) xxx B) yyy …）与卷面残留的题号串 */
export function cleanClozePassage(text: string): string {
  return text
    // 尾部词库：连续 4 个以上 "X) 单词" 才判定为词库，避免误伤正文里的 A) / B)
    .replace(/\s*(?:[A-O]\)\s*\S+\s*){4,}$/, "")
    // 卷面残留的裸题号串，例如 "…of diversity. 26 27 28 29 30 31 32 Census data…"
    .replace(/\s(?:\d{2}\s+){2,}\d{2}\s+/g, " ")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
}

/** 信息匹配短文：末尾粘着的 36–45 题题干列表 */
export function cleanMatchingPassage(text: string, questionNos: number[]): string {
  return stripLeakedExplanation(stripTrailingNumberedStems(stripScoringTable(text), questionNos)).trim()
}

/** 仔细阅读短文：末尾粘着的题号 + A) B) C) D) 选项，以及混进来的解析段落 */
export function cleanReadingPassage(text: string, questionNos: number[] = []): string {
  let out = stripScoringTable(text)
  // 1) 先摘掉末尾的题干列表（「51. What do we learn…」形式，题号就是阅读题号）
  out = stripTrailingNumberedStems(out, questionNos)
  // 2) 再摘掉题干后面跟着的选项块
  const tail = out.slice(-900)
  const marks = [...tail.matchAll(/(^|\s)([A-D])\)\s/g)]
  if (marks.length >= 2) {
    const letters = marks.map((m) => m[2])
    const ascending = letters.every((c, i) => i === 0 || c.charCodeAt(0) > letters[i - 1].charCodeAt(0))
    if (ascending && letters.includes("D")) out = out.slice(0, out.length - 900 + (marks[0].index ?? 0))
  }
  // 3) 最后逐段清理尾部：卷面会把解析当成 P8/P9/P10 段混进短文（2024-12-2 阅读一就是这样）。
  //    判据是「这一整段没有正文，只有选项标记或成片中文」，从后往前摘，摘到真正的正文段落为止。
  const paras = splitPassageParagraphs(out)
  let keep = paras.length
  while (keep > 0) {
    const body = paras[keep - 1].text.trim()
    const isJunk = !body || /(^|\s)[A-D]\)\s/.test(body) || (body.match(/[\u4e00-\u9fa5]/g) || []).length > 10
    if (!isJunk) break
    keep--
  }
  if (keep < paras.length) {
    out = paras
      .slice(0, keep)
      .map((p) => `${p.letter} ${p.text}`)
      .join("\n\n")
  }
  // 4) 尾部只剩一个光秃秃的段落标记时顺手去掉
  return stripLeakedExplanation(out.replace(/\s*P\d{1,2}\s*$/, "")).trim()
}

/**
 * 摘掉末尾粘着的题干列表。
 *
 * 题干是「题号. 句子」的形式，且题号就是真题里的题目编号，所以按编号去匹配特别准。
 * 只在结尾 2500 字符内找；题号前要求是空白，正文里的年份（in 1896. The）因此不会误伤。
 */
function stripTrailingNumberedStems(text: string, questionNos: number[]): string {
  if (!questionNos.length) return text
  const from = Math.max(0, text.length - 2500)
  const tail = text.slice(from)
  let cut = -1
  for (const no of questionNos) {
    const m = new RegExp(`\\s${no}\\.\\s+[A-Z]`).exec(tail)
    if (!m) continue
    const at = from + (m.index ?? 0)
    if (cut === -1 || at < cut) cut = at
  }
  return cut > 0 ? text.slice(0, cut) : text
}

/** 卷面得分表残留（"94% B2 100% C1 … Part I Part II Section A …"） */
function stripScoringTable(text: string): string {
  const matches = [...text.matchAll(/\b(?:Part\s+I{1,3}V?|Section\s+[A-C])\b/g)]
  if (matches.length >= 2) {
    const first = matches[0]
    // 只在这一串标记靠近结尾时才算残留，避免砍掉正文里的正常表述
    if ((first.index ?? 0) > text.length - 700) return text.slice(0, first.index)
  }
  return text
}

/**
 * 源数据里偶尔把解析段落混进了短文末尾（例如 2020-09-1 阅读二的结尾是一句中文解析）。
 * 判据：**最后一个**句末标点之后还夹着中文，那多半不是短文本身的内容。
 * 注意要取最后一个标点：取第一个会把整篇短文砍掉（正文里本来就有句号）。
 */
function stripLeakedExplanation(text: string): string {
  const t = text.trim()
  let last = -1
  for (const ch of [".", "?", "!", '"', "'", "”", "’", ")", "]"]) {
    const i = t.lastIndexOf(ch)
    if (i > last) last = i
  }
  if (last < 0 || last === t.length - 1) return t
  const tailText = t.slice(last + 1)
  return /[\u4e00-\u9fa5]/.test(tailText) ? t.slice(0, last + 1).trim() : t
}

// ==================== 段落切分 ====================

/** 把 "A) xxx\nB) yyy" 切成有序段落（信息匹配用） */
export function splitLetterParagraphs(text: string): Paragraph[] {
  // 段落标记是 "X)" 形式，但分隔符并不统一：多数的套用换行分隔，
  // 个别套（如 2021-12-3）从 N 段起变成空格分隔，所以不能靠 split("\n") 切。
  // 做法是先收所有候选标记，再只认「A、B、C… 依次递增」的那一串——
  // 正文里偶然出现的 "(I)" 之类因此不会被误判成新段落。
  const cands: Array<{ letter: string; at: number; bodyAt: number }> = []
  for (const m of text.matchAll(/(?:^|\s)([A-Z])\)\s/g)) {
    const base = m.index ?? 0
    cands.push({ letter: m[1], at: base + m[0].indexOf(m[1]), bodyAt: base + m[0].length })
  }
  const accepted: typeof cands = []
  let expected = 65 // "A"
  for (const c of cands) {
    if (c.letter.charCodeAt(0) === expected) {
      accepted.push(c)
      expected++
    }
  }
  if (!accepted.length) return text.trim() ? [{ letter: "", text: text.trim() }] : []
  return accepted.map((c, i) => ({
    letter: c.letter,
    text: text.slice(c.bodyAt, i + 1 < accepted.length ? accepted[i + 1].at : text.length).trim(),
  }))
}

/** 把 "P1 xxx P2 yyy" 切成有序段落（仔细阅读用），同样只认从 P1 开始递增的标记 */
export function splitPassageParagraphs(text: string): Paragraph[] {
  const cands: Array<{ no: number; at: number; bodyAt: number }> = []
  for (const m of text.matchAll(/(?:^|\s)P(\d{1,2})\s/g)) {
    const base = m.index ?? 0
    cands.push({ no: Number(m[1]), at: base + m[0].indexOf("P"), bodyAt: base + m[0].length })
  }
  const accepted: typeof cands = []
  let expected = 1
  for (const c of cands) {
    if (c.no === expected) {
      accepted.push(c)
      expected++
    }
  }
  if (!accepted.length) return text.trim() ? [{ letter: "", text: text.trim() }] : []
  return accepted.map((c, i) => ({
    letter: `P${c.no}`,
    text: text.slice(c.bodyAt, i + 1 < accepted.length ? accepted[i + 1].at : text.length).trim(),
  }))
}

/** 选词填空短文切成「正文片段 / 空位」两态，便于把空位高亮出来 */
export type ClozeToken = { kind: "text"; text: string } | { kind: "blank"; no: number }

export function tokenizeClozePassage(text: string): ClozeToken[] {
  const out: ClozeToken[] = []
  const re = /\((\d{1,2})\)\s*_{2,}/g
  let last = 0
  for (const m of text.matchAll(re)) {
    const at = m.index ?? 0
    if (at > last) out.push({ kind: "text", text: text.slice(last, at) })
    out.push({ kind: "blank", no: Number(m[1]) })
    last = at + m[0].length
  }
  if (last < text.length) out.push({ kind: "text", text: text.slice(last) })
  return out
}

// ==================== 答案键校验 ====================

/** 选项字母 A、B、C… */
export function letterAt(i: number): string {
  return String.fromCharCode(65 + i)
}

/**
 * 段落匹配的答案键存疑判定。
 *
 * 实测有 19 套真题的匹配题答案键出现了短文里根本不存在的段落号（短文只到 M 段，
 * 答案却写 N/O），这是上游题库的缺陷：照它判分会把选对段落的人判错。
 * 这里把这类题标出来，UI 上单独提示、并且不计入得分（见 gradeSection）。
 *
 * 注意判据要用**短文里真实存在的段落号**，不能用题目自带的 paraOptions：
 * paraOptions 本身也会漏（2021-12-3 短文有 P 段，paraOptions 只到 M）。
 */
export function matchAnswerSuspicious(q: PaperQuestion, paragraphLetters: string[]): boolean {
  if (!paragraphLetters.length) return false
  return !paragraphLetters.includes(String(q.answer ?? "").trim().toUpperCase())
}

/**
 * 答案键存疑时，试着用解析里的「定位」原文在短文里找出真正的段落号，只作为提示展示。
 * 找不到就返回 null —— 绝不猜。
 */
export function locateParagraphByExplain(q: PaperQuestion, paragraphs: Paragraph[]): string | null {
  const quote = (q.explain?.定位 ?? "").split(/[。．]/)[0].trim()
  if (quote.length < 24) return null
  const probe = quote.slice(0, 48)
  const hits = paragraphs.filter((p) => p.text.includes(probe))
  return hits.length === 1 ? hits[0].letter : null
}

// ==================== 解析字段排序 ====================

/** 按题型把 explain 排成有序数组，空值丢掉；未知字段追加在后面而不是丢弃 */
export function explainEntries(
  part: string,
  explain: Record<string, string> | null | undefined,
): Array<{ label: string; text: string }> {
  if (!explain) return []
  const order = isPartKey(part) ? PART_META[part].explainOrder : []
  const keys = Object.keys(explain).filter((k) => typeof explain[k] === "string" && explain[k].trim())
  const sorted = [...keys].sort((a, b) => {
    const ia = order.indexOf(a)
    const ib = order.indexOf(b)
    if (ia === -1 && ib === -1) return 0
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
  return sorted.map((k) => ({ label: k, text: explain[k].trim() }))
}

// ==================== 判分 ====================

export type SectionGrade = {
  /** 计入得分的题数（答案键存疑的题不计入） */
  total: number
  correct: number
  /** 全部题目的作答明细，存进 PaperAttempt.detail */
  detail: AttemptDetail[]
  /** 答案键存疑、未计入得分的题号 */
  suspicious: number[]
}

/**
 * 判分。
 *
 * 按题号取作答（不用下标，避免题目顺序变动后错位）。答案键存疑的题（suspiciousNos）
 * 仍会出现在 detail 里方便回看，但不进 total / correct——数据缺陷不该把分数带偏。
 */
export function gradeSection(
  questions: PaperQuestion[],
  answers: Record<number, string>,
  suspiciousNos: number[] = [],
): SectionGrade {
  const susp = new Set(suspiciousNos)
  const detail: AttemptDetail[] = []
  const suspicious: number[] = []
  let total = 0
  let correct = 0

  for (const q of questions) {
    const my = (answers[q.no] ?? "").trim().toUpperCase()
    const right = (q.answer ?? "").trim().toUpperCase()
    const isRight = my !== "" && my === right
    detail.push({ n: q.no, my, answer: right, right: isRight })
    if (susp.has(q.no)) {
      suspicious.push(q.no)
      continue
    }
    total++
    if (isRight) correct++
  }

  return { total, correct, detail, suspicious }
}

// ==================== 其它小工具 ====================

/** "Section A · 第 1 篇 · 1–4 题" → [1, 4]，用来把听力题目按音频分段归组 */
export function pieceQuestionRange(label: string): [number, number] | null {
  const m = /(\d+)\s*[–—~-]\s*(\d+)\s*题/.exec(label)
  if (!m) return null
  return [Number(m[1]), Number(m[2])]
}

export function accuracyText(correct: number, total: number): string {
  if (!total) return "—"
  return `${Math.round((correct / total) * 100)}%`
}
