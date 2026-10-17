/**
 * 真题翻译素材的清洗与逐句拆解（纯函数，服务端与客户端共用）。
 *
 * 库里 subjective.translation.sentences 的 target 字段有个稳定的数据缺陷：
 * 每一条都被追加了「下一句的编号 + 中文原文」，最后一条还会带上卷面页脚
 * （"英语六级 2025年12月·第1套 · 全卷构成 Part III"）。逐句对照要展示英文，
 * 所以这里统一剥掉，顺便把被追加的那句中文当作「下一句的原文」回收利用——
 * 这正是分析器切句的真实边界，比按「。」硬切准（它会把一个中文长句的多层信息算作一句）。
 */
import { parseJson } from "@/lib/cet6/json"

export type RawSentence = {
  trunk?: string
  downgrade?: string
  grammar?: string
  target?: string
}

export type Subjective = {
  writing?: {
    directions?: string
    model?: string
    modelZh?: string
    outline?: Array<{ no: number; text: string }>
  }
  translation?: {
    directions?: string
    source?: string
    reference?: string
    sentences?: RawSentence[]
  }
}

export type TranslationUnit = {
  no: number
  /** 这一句的中文原文（尽力还原，取不到就留空，界面只显示英文侧） */
  zh: string
  /** 这一句的目标句式 / 参考译文 */
  en: string
  trunk: string
  downgrade: string
  grammar: string
}

export type TranslationDoc = {
  directionsEn: string
  sourceZh: string
  referenceEn: string
  units: TranslationUnit[]
  /** 参考译文的句数（按句末标点切），用来判断拆解是否完整 */
  referenceSentenceCount: number
  /** 是否拿到了逐句解析 */
  hasAnalysis: boolean
}

const CJK = /[\u4e00-\u9fa5]/

/**
 * 「3. 中文……」这种被追加进 target 的下一句标记。
 * 故意用前瞻 (?=...) 而不是直接吃掉那个汉字——吃掉会让回收出来的中文原句少掉第一个字
 * （"这/部文学作品" 就是从这儿来的）。
 */
const POLLUTION = /\d+\.\s*(?=[\u4e00-\u9fa5])/

/** 取英文那一半：先切掉编号中文，再切掉页脚残留，最后修掉句末标点后的零碎 */
export function cleanTargetEn(raw: string): string {
  let s = raw ?? ""
  const m = POLLUTION.exec(s)
  if (m) s = s.slice(0, m.index)
  const cjk = s.search(CJK)
  if (cjk >= 0) s = s.slice(0, cjk)
  s = s.trim()
  const lastStop = Math.max(s.lastIndexOf("."), s.lastIndexOf("!"), s.lastIndexOf("?"))
  if (lastStop >= 0 && lastStop < s.length - 1 && /[^a-zA-Z0-9)"']/.test(s.slice(lastStop + 1))) {
    s = s.slice(0, lastStop + 1)
  }
  return s.trim()
}

/** 取被追加进来的那句中文（= 下一条拆解对应的原文），取不到返回空串 */
export function extractTailZh(raw: string): string {
  const m = POLLUTION.exec(raw ?? "")
  if (!m) return ""
  const tail = (raw ?? "").slice(m.index + m[0].length)
  const stop = tail.indexOf("。")
  return (stop >= 0 ? tail.slice(0, stop + 1) : tail).replace(/\s+/g, "").trim()
}

/** 在原文里做「忽略空白」的定位，用来把中文原句切回逐条拆解 */
function findLoose(haystack: string, needle: string): { start: number; end: number } | null {
  const target = needle.replace(/\s+/g, "")
  if (!target) return null
  let normalized = ""
  const indexMap: number[] = []
  for (let i = 0; i < haystack.length; i++) {
    if (!/\s/.test(haystack[i])) {
      normalized += haystack[i]
      indexMap.push(i)
    }
  }
  const at = normalized.indexOf(target)
  if (at < 0) return null
  return { start: indexMap[at], end: (indexMap[at + target.length - 1] ?? haystack.length - 1) + 1 }
}

/** 指令部分只留英文（库里把整段中文原文也拼在 directions 后面） */
export function cleanDirections(raw: string): string {
  const s = raw ?? ""
  const cjk = s.search(CJK)
  return (cjk >= 0 ? s.slice(0, cjk) : s).replace(/\s+/g, " ").trim()
}

/** 按句末标点切参考译文，用于显示「参考译文 N 句 / 拆解 M 条」的完整性提示 */
export function splitEnglishSentences(text: string): string[] {
  return (text ?? "")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * 把一套真题的翻译素材整理成可直接渲染的文档。
 *
 * 中文原句的还原分两步：
 *  1. 从每条 target 尾部回收「下一句的中文」，在整段原文里按顺序定位，得到若干已知锚点；
 *  2. 锚点之间的空档按位置切片补上——第一句就是「原文开头到第一个锚点」，
 *     最后一句是「最后一个锚点之后剩下的部分」（页脚污染那条正是靠这一步救回来）。
 * 之所以不按「。」硬切原文：分析器切句的边界跟「。」并不一一对应（一个中文长句
 * 常被拆成两组信息），硬切会让中文和英文对不上号。
 */
export function buildTranslationDoc(params: {
  subjective: string | null | undefined
  translation: string | null | undefined
  reference: string | null | undefined
}): TranslationDoc {
  const subj = parseJson<Subjective>(params.subjective, {})
  const tr = subj.translation ?? {}
  const rawSentences = Array.isArray(tr.sentences) ? tr.sentences : []
  const sourceZh = (tr.source || params.translation || "").replace(/\r\n/g, "\n").trim()
  const referenceEn = (tr.reference || params.reference || "").trim()

  const units: TranslationUnit[] = rawSentences.map((s, i) => ({
    no: i + 1,
    zh: "",
    en: cleanTargetEn(s.target ?? ""),
    trunk: (s.trunk ?? "").trim(),
    downgrade: (s.downgrade ?? "").trim(),
    grammar: (s.grammar ?? "").trim(),
  }))

  // 第一步：回收锚点。游标只往前走，避免同一句中文被定位到靠前的位置
  const spans: Array<{ start: number; end: number } | null> = new Array(units.length).fill(null)
  let cursor = 0
  for (let i = 1; i < units.length; i++) {
    const cand = extractTailZh(rawSentences[i - 1]?.target ?? "")
    if (!cand) continue
    const hit = findLoose(sourceZh.slice(cursor), cand)
    if (!hit) continue
    spans[i] = { start: cursor + hit.start, end: cursor + hit.end }
    cursor = cursor + hit.end
  }

  // 第二步：填缝。有锚点的直接切；没锚点的取它与相邻锚点之间的那段原文
  let fill = 0
  for (let i = 0; i < units.length; i++) {
    const span = spans[i]
    if (span) {
      units[i].zh = sourceZh.slice(span.start, span.end).replace(/\s+/g, "").trim()
      fill = span.end
      continue
    }
    let nextStart = sourceZh.length
    for (let j = i + 1; j < units.length; j++) {
      const next = spans[j]
      if (next) {
        nextStart = next.start
        break
      }
    }
    if (nextStart <= fill) continue // 这段原文已经被上一条补位用掉了
    units[i].zh = sourceZh.slice(fill, nextStart).replace(/\s+/g, "").trim()
    fill = nextStart
  }

  return {
    directionsEn: cleanDirections(tr.directions ?? ""),
    sourceZh,
    referenceEn,
    units,
    referenceSentenceCount: splitEnglishSentences(referenceEn).length,
    hasAnalysis: units.length > 0,
  }
}

/**
 * 一套真题的统一称呼，例如「2026年6月 第3套」。
 * 列表页、练习页标题、错题本标题、StudySession.note 全用这一个函数生成，
 * 不然「已练次数」按 note 统计时会因为标题写法不一致而对不上。
 */
export function paperTitle(label: string, set: string): string {
  return `${(label ?? "").trim()} ${(set ?? "").trim()}`.trim()
}
