/**
 * 听力精听：把「有文本的素材」变成逐句听写练习。
 *
 * 为什么不做真题听力的听写？因为真题听力只有音频没有原文（题库里没给 transcript），
 * 听写没有对照物。所以这里的策略是：
 *   - 真题听力 → 在 /cet6/papers 里做题（有答案和解析），播放器支持分篇循环
 *   - 逐句听写 → 用「有文本」的素材：真题例句、词库例句、自己的错题句子、临时粘贴的文本
 * 音频用免费 TTS（百度）按句合成，缓存在 .cet6-audio/tts/，同一句只合成一次。
 */
import { db } from "./db"
import { readDrillAnswers, readDrillSentences, toJson, type DrillAnswer, type DrillSentence } from "./json"
import { bumpDailyStat } from "./service"

export type DrillSource = "真题例句" | "词库例句" | "错题句子" | "自建文本"

export type CreateDrillInput = {
  source: DrillSource
  /** 句子条数（自建文本时忽略） */
  count?: number
  /** 自建文本 */
  text?: string
}

/** 按句子切分英文文本（保留句子边界，去掉过短的碎片） */
export function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 20 && /[a-zA-Z]{3}/.test(s))
}

/**
 * 建一个听写练习。
 * 句子优先挑「长度适中」的（12–28 词），太短没练头，太长一句听不下来。
 */
export async function createDrill(input: CreateDrillInput) {
  const want = Math.min(Math.max(input.count ?? 10, 3), 30)
  let sentences: DrillSentence[] = []

  if (input.source === "自建文本") {
    const text = (input.text ?? "").trim()
    if (!text) throw new Error("请粘贴要精听的英文文本")
    sentences = splitSentences(text).map((en) => ({ en, cn: "" }))
    if (!sentences.length) throw new Error("这段文本里没找到合适的英文句子")
  } else if (input.source === "错题句子") {
    const items = await db.notebookItem.findMany({
      where: { kind: { in: ["sentence", "mistake"] } },
      orderBy: { createdAt: "desc" },
      take: 200,
    })
    const pool = items.flatMap((it) => {
      const found = splitSentences(`${it.content} ${it.answer ?? ""}`)
      return found.map((en) => ({ en, cn: it.title }))
    })
    sentences = pickBalanced(pool, want)
    if (!sentences.length) throw new Error("错题本里还没有可用的句子")
  } else {
    // 词库里的句子：真题例句带中文时更好（可以对照理解），否则用普通例句
    const useExam = input.source === "真题例句"
    const words = await db.word.findMany({
      where: useExam ? { freq: { gt: 0 } } : {},
      select: { text: true, exam: true, sents: true },
      orderBy: { rank: "asc" },
      take: 900,
    })
    const pool: DrillSentence[] = []
    for (const w of words) {
      const list = useExam
        ? (JSON.parse(w.exam || "[]") as Array<{ en: string }>).map((e) => ({ en: e.en, cn: "" }))
        : (JSON.parse(w.sents || "[]") as Array<{ en: string; cn: string }>)
      for (const s of list) {
        // 词典例句里常有 "(= 解释)" 这类补充说明，听写时是噪音，去掉
        const en = s.en
          .replace(/^\.\.\.|\.\.\.$/g, "")
          .replace(/\s*\(=[^)]*\)/g, "")
          .replace(/\s*\([^)]{0,80}\)\s*$/g, "")
          .trim()
        if (!en) continue
        pool.push({ en, cn: ("cn" in s ? s.cn : "") || "" })
      }
    }
    // 每句都要包含目标词才有练习价值，这里只做长度筛选
    sentences = pickBalanced(pool, want)
  }

  if (!sentences.length) throw new Error("没有凑出可用的句子，换个素材再试")

  const drill = await db.listeningDrill.create({
    data: {
      title: `${input.source} · ${sentences.length} 句 · ${new Date().toLocaleDateString("zh-CN")}`,
      source: input.source,
      sentences: toJson(sentences),
    },
  })
  return drill
}

/** 从候选池里挑句子：优先 12–28 词的，且同一篇里句子来源尽量分散 */
function pickBalanced(pool: DrillSentence[], want: number): DrillSentence[] {
  const scored = pool
    .map((s) => ({ s, words: s.en.split(/\s+/).length }))
    .filter((x) => x.words >= 8 && x.words <= 32)
    // 真题例句是从原文里截的，常以 as/and/which 这类连接词开头，或结尾没标点 ——
    // 这种残片听写起来没头没尾，直接剔除，只留完整句。
    .filter((x) => /^[A-Z"'“]/.test(x.s.en) && /[.!?"'”]$/.test(x.s.en))
    .map((x) => ({ ...x, score: Math.abs(x.words - 18) }))
    .sort((a, b) => a.score - b.score)

  const out: DrillSentence[] = []
  const seen = new Set<string>()
  // 先取最接近理想长度的，再在全池里随机补齐，避免整篇都是同一类句子
  for (const x of scored) {
    if (out.length >= want) break
    const key = x.s.en.slice(0, 40)
    if (seen.has(key)) continue
    seen.add(key)
    out.push(x.s)
  }
  if (out.length < want) {
    for (const s of pool) {
      if (out.length >= want) break
      const key = s.en.slice(0, 40)
      if (seen.has(key)) continue
      seen.add(key)
      out.push(s)
    }
  }
  return out.slice(0, want)
}

export async function listDrills(limit = 30) {
  const rows = await db.listeningDrill.findMany({ orderBy: { createdAt: "desc" }, take: limit })
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    source: r.source,
    count: readDrillSentences(r.sentences).length,
    accuracy: r.accuracy,
    createdAt: r.createdAt,
  }))
}

export async function getDrill(id: string) {
  const row = await db.listeningDrill.findUnique({ where: { id } })
  if (!row) return null
  return {
    id: row.id,
    title: row.title,
    source: row.source,
    sentences: readDrillSentences(row.sentences),
    answers: readDrillAnswers(row.dictation),
    accuracy: row.accuracy,
    createdAt: row.createdAt,
  }
}

/** 保存听写结果，并把错的词汇总回去（供界面一键加入生词本） */
export async function saveDictation(id: string, results: DrillAnswer[], minutes = 0) {
  const total = results.length
  const correct = results.filter((r) => r.correct).length
  const accuracy = total ? correct / total : 0
  await db.listeningDrill.update({
    where: { id },
    data: { dictation: toJson(results), accuracy },
  })
  await bumpDailyStat(new Date(), {
    minutes,
    correct,
    wrong: total - correct,
  })
  return { accuracy, correct, total }
}

/** 从听写结果里挑出用户拼错的单词 */
export function wrongWordsFrom(results: DrillAnswer[], sentences: DrillSentence[]): string[] {
  const wrong = new Set<string>()
  for (const r of results) {
    if (r.correct) continue
    const target = sentences[r.n - 1]?.en ?? ""
    const typed = new Set(r.input.toLowerCase().match(/[a-z']+/g) ?? [])
    for (const w of target.toLowerCase().match(/[a-z']+/g) ?? []) {
      if (w.length >= 4 && !typed.has(w)) wrong.add(w)
    }
  }
  return [...wrong].slice(0, 30)
}
