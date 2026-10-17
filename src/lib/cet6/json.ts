/**
 * SQLite 下的 JSON 字段读写助手。
 *
 * Prisma 的 SQLite 连接器不支持 Json 类型，所以词条的释义/例句/短语等数组字段
 * 都以 TEXT 存 JSON 字符串。这里统一封装，避免业务代码里到处手写 JSON.parse
 * 和 as 断言（解析失败时返回兜底值而不是抛错，坏数据不该让页面白屏）。
 */

export type Trans = { pos: string; cn: string }
export type Phrase = { en: string; cn: string }
export type Sentence = { en: string; cn: string }
export type ExamSentence = { en: string; y: string; p: string; t: string }
export type Syno = { pos: string; cn: string; words: string[] }
export type RelWord = { pos: string; w: string; cn: string }

export type ArticleParagraph = { en: string; cn: string }
export type ArticleVocab = { w: string; pos?: string; cn: string; freq?: number }
export type ArticleQuiz = { q: string; options: string[]; answer: number; explain?: string }
export type DrillSentence = { en: string; cn: string; audio?: string }
export type DrillAnswer = { n: number; input: string; correct: boolean; accuracy: number }
export type AttemptDetail = { n: number; my: string; answer: string; right: boolean }
export type TemplatePhrase = { en: string; cn: string }
/** 真题听力音频里各篇的时间区间（用于分篇跳转/循环精听） */
export type AudioPiece = { label: string; start: number; end: number }

/** 安全解析 JSON 字符串；失败或为空时返回兜底值 */
export function parseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback
  try {
    const v = JSON.parse(raw)
    return (v ?? fallback) as T
  } catch {
    return fallback
  }
}

/** 序列化：undefined/null 存成 "[]"，保证读取端始终能 parse */
export function toJson(value: unknown): string {
  if (value === undefined || value === null) return "[]"
  return JSON.stringify(value)
}

// ——— 语义化读取器：调用处不必记字段类型 ———

export const readTrans = (s: string | null | undefined) => parseJson<Trans[]>(s, [])
export const readPhrases = (s: string | null | undefined) => parseJson<Phrase[]>(s, [])
export const readSents = (s: string | null | undefined) => parseJson<Sentence[]>(s, [])
export const readExam = (s: string | null | undefined) => parseJson<ExamSentence[]>(s, [])
export const readSynos = (s: string | null | undefined) => parseJson<Syno[]>(s, [])
export const readRelWords = (s: string | null | undefined) => parseJson<RelWord[]>(s, [])
export const readParagraphs = (s: string | null | undefined) => parseJson<ArticleParagraph[]>(s, [])
export const readArticleVocab = (s: string | null | undefined) => parseJson<ArticleVocab[]>(s, [])
export const readArticleQuiz = (s: string | null | undefined) => parseJson<ArticleQuiz[]>(s, [])
export const readDrillSentences = (s: string | null | undefined) => parseJson<DrillSentence[]>(s, [])
export const readDrillAnswers = (s: string | null | undefined) => parseJson<DrillAnswer[]>(s, [])
export const readAttemptDetail = (s: string | null | undefined) => parseJson<AttemptDetail[]>(s, [])
export const readTemplatePhrases = (s: string | null | undefined) => parseJson<TemplatePhrase[]>(s, [])
export const readAudioPieces = (s: string | null | undefined) => parseJson<AudioPiece[]>(s, [])
