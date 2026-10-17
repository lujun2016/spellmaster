/**
 * 每日精读：抓一篇中国日报双语文章，做成「读 + 听 + 词 + 题」的日常任务。
 *
 * 为什么选中国日报英语点津：
 *   1. 它本身就提供中英对照正文，不用自己翻译就能做双语精读；
 *   2. 国内直连，不像 VOA / BBC 那样被墙（实测超时）；
 *   3. 页面结构稳定，正文在一个 id="Content" 的容器里，好抽。
 *
 * 生成分两层：
 *   - 本地层（永远可用）：抽取段落 → 匹配词库做生词表 → 用规则出选词填空 + 翻译题
 *   - LLM 层（可选）：配了免费 key 就让模型补生词讲解和阅读理解题，失败就只保留本地层
 * 生成结果整体落到 DailyArticle，同一天重复点「重新生成」会覆盖当天那条。
 */
import { db } from "./db"
import { readArticleQuiz, readArticleVocab, readParagraphs, toJson, type ArticleParagraph, type ArticleQuiz, type ArticleVocab } from "./json"
import { chatJson } from "./llm"
import { bumpDailyStat, localDateKey } from "./service"

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

// 两个列表页都抓：首页面广、news_bilingual 是专门的双语新闻栏目（正文更长）
const LIST_URLS = [
  "https://language.chinadaily.com.cn/",
  "https://language.chinadaily.com.cn/news_bilingual",
]
// 页面里的文章链接是协议相对写法（//language.chinadaily.com.cn/a/...），所以 http(s) 前缀要可选
const ARTICLE_RE = /(?:https?:)?\/\/language\.chinadaily\.com\.cn\/a\/\d{6}\/\d{2}\/WS[0-9a-f]+\.html/g

export type FetchResult = {
  title: string
  url: string
  paragraphs: ArticleParagraph[]
}

function decodeEntities(s: string) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
}

function stripTags(html: string) {
  return decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim()
}

/** 含中日韩字符 → 判定为中文段落 */
function isChinese(text: string) {
  const cjk = (text.match(/[\u4e00-\u9fff]/g) ?? []).length
  return cjk / Math.max(1, text.length) > 0.15
}

/** 去掉页面上的噪音行：图片来源、编辑署名、版权、栏目导航等 */
function isNoise(text: string) {
  if (text.length < 12) return true
  return /^(Photo|Photos|Photo\/|Editor:|Copyright|By |Source:|Click here|Most Popular|Related|Tags?:|Video|Recommended|Special coverage|英文|中文)/i.test(
    text,
  )
}

/**
 * 从文章 HTML 里抽出「英文段落 + 对应中文译文」。
 * 页面排版是「中文导语 / 英文正文 / 中文译文」交替出现，所以策略是：
 * 遇到英文段落就作为主体，紧随其后的中文段落作为它的译文。
 */
export function extractParagraphs(html: string): ArticleParagraph[] {
  const region = html.match(/<div[^>]*id="Content"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i)?.[1] ?? html
  const blocks = [...region.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripTags(m[1]))
    .filter((t) => t && !isNoise(t))

  const out: ArticleParagraph[] = []
  // 导语：正文第一段之前的中文，单独留一句，便于页面展示"内容提要"
  let pendingCn: string | null = null

  for (const block of blocks) {
    if (isChinese(block)) {
      if (out.length && !out[out.length - 1].cn) {
        // 上一条英文还没配对译文，正好配上
        out[out.length - 1].cn = block
      } else {
        pendingCn = block
      }
      continue
    }
    // 英文段落：太短的（小标题、图注）跳过
    if (block.split(/\s+/).length < 8) continue
    out.push({ en: block, cn: "" })
    if (pendingCn) {
      // 英文出现在中文之后，说明这段中文是它的译文（少见的排版顺序）
      out[out.length - 1].cn = pendingCn
      pendingCn = null
    }
  }

  // 去掉没有被配对成"正文"的孤零零中文（一般已在 cn 字段里）
  return out.filter((p) => p.en.length > 40)
}

/**
 * 抓一篇双语文章。
 *
 * 注意：中国日报英语点津栏目更新很慢（实测首页最新到 2025-05，双语栏目到 2024-09），
 * 所以这里不假装"每天有新内容"，而是按日期从新到旧挑「还没读过的」那篇，
 * 读完自然往后翻。传 excludeUrls 就能跳过已读。
 */
export async function fetchDailyArticle(excludeUrls: string[] = []): Promise<FetchResult> {
  const found = new Set<string>()
  let listFailures = 0
  for (const listUrl of LIST_URLS) {
    try {
      const res = await fetch(listUrl, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) })
      if (!res.ok) {
        listFailures++
        continue
      }
      const html = await res.text()
      for (const u of html.match(ARTICLE_RE) ?? []) found.add(u.startsWith("//") ? `https:${u}` : u)
    } catch {
      listFailures++
    }
  }
  const urls = [...found]
  if (!urls.length) {
    throw new Error(`列表页里没找到文章链接（${listFailures}/${LIST_URLS.length} 个列表页抓取失败，页面结构可能变了）`)
  }

  // 按链接里的日期倒序（文件名前缀就是 YYYYMM/DD）
  urls.sort((a, b) => (a.match(/\/a\/(\d{6})\/(\d{2})\//)?.[0] ?? "").localeCompare(b.match(/\/a\/(\d{6})\/(\d{2})\//)?.[0] ?? ""))

  // 逐篇试：优先要「正文够长」的双语新闻（每日一词那类栏目太短，练不出精读的量），
  // 都不满足就退而取抽到段落最多的一篇，保证每天一定有内容可读。
  const used = new Set(excludeUrls)
  let best: FetchResult | null = null
  let bestLen = 0
  let fallback: FetchResult | null = null
  let fallbackLen = 0
  const tried: string[] = []

  // 已读过的排到最后，优先给没读过的
  const ordered = [...urls.slice(-40).reverse()].sort((a, b) => Number(used.has(a)) - Number(used.has(b)))

  for (const url of ordered) {
    tried.push(url)
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) })
      if (!res.ok) continue
      const html = await res.text()
      const title = decodeEntities(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "")
        .replace(/-\s*Chinadaily.*$/i, "")
        .trim()
      const paragraphs = extractParagraphs(html)
      const enLen = paragraphs.reduce((n, p) => n + p.en.length, 0)
      if (paragraphs.length >= 4 && enLen >= 1200) {
        return { title: title || "每日精读", url, paragraphs }
      }
      const candidate = { title: title || "每日精读", url, paragraphs }
      if (!used.has(url)) {
        if (paragraphs.length >= 3 && enLen > bestLen) {
          best = candidate
          bestLen = enLen
        }
      } else if (paragraphs.length >= 3 && enLen > fallbackLen) {
        // 全部读过时的兜底：允许重读，但取最长的那篇
        fallback = candidate
        fallbackLen = enLen
      }
    } catch {
      // 单篇失败不影响继续试下一篇
    }
  }

  if (best) return best
  if (fallback) return fallback
  throw new Error(`试了 ${tried.length} 篇都没抽到合适的双语正文`)
}

/** 用词库匹配文章里的六级词，按真题频次排序取前 N 个 */
export async function matchVocab(paragraphs: ArticleParagraph[], limit = 12): Promise<ArticleVocab[]> {
  const text = paragraphs.map((p) => p.en).join(" ")
  const tokens = new Set(
    (text.toLowerCase().match(/[a-z][a-z'-]{2,}/g) ?? []).map((w) => w.replace(/^'+|'+$/g, "")),
  )
  if (!tokens.size) return []

  const rows = await db.word.findMany({
    where: { text: { in: [...tokens] } },
    orderBy: [{ freq: "desc" }, { rank: "asc" }],
    take: limit,
    select: { text: true, trans: true, freq: true },
  })

  return rows.map((r) => {
    const trans = JSON.parse(r.trans || "[]") as Array<{ pos?: string; cn?: string }>
    const first = trans[0]
    return {
      w: r.text,
      pos: first?.pos ?? "",
      cn: (first?.cn ?? "").slice(0, 40),
      freq: r.freq,
    }
  })
}

/**
 * 本地规则出题（不依赖任何外部服务）：
 *   1. 选词填空：从文章句子里挖掉一个生词，配 3 个同文章里的其他词做干扰项
 *   2. 翻译题：拿一段中文让用户翻成英文，参考译文就是文章对应的英文段落
 */
export function buildLocalQuiz(paragraphs: ArticleParagraph[], vocab: ArticleVocab[]): ArticleQuiz[] {
  const quiz: ArticleQuiz[] = []
  if (vocab.length >= 4) {
    const pool = vocab.map((v) => v.w)
    // 选 3 句含有生词的句子出题
    const candidates = paragraphs
      .map((p) => p.en)
      .flatMap((en) => en.split(/(?<=[.!?])\s+/))
      .filter((s) => {
        const words = s.split(/\s+/)
        return words.length >= 10 && words.length <= 32 && vocab.some((v) => new RegExp(`\\b${v.w}\\b`, "i").test(s))
      })

    const used = new Set<string>()
    for (const sentence of candidates) {
      if (quiz.length >= 3) break
      const hit = vocab.find((v) => new RegExp(`\\b${v.w}\\b`, "i").test(sentence) && !used.has(v.w))
      if (!hit) continue
      used.add(hit.w)
      const distractors = shuffle(pool.filter((w) => w !== hit.w)).slice(0, 3)
      if (distractors.length < 3) continue
      const options = shuffle([hit.w, ...distractors])
      quiz.push({
        q: `选词填空：${sentence.replace(new RegExp(`\\b${hit.w}\\b`, "i"), "______")}`,
        options,
        answer: options.indexOf(hit.w),
        explain: `${hit.w}${hit.pos ? ` (${hit.pos}.)` : ""} ${hit.cn}`,
      })
    }
  }

  // 翻译题：挑一段长度适中的中文（有对应英文译文的）
  const translatable = paragraphs.filter((p) => p.cn && p.cn.length >= 40 && p.en.split(/\s+/).length <= 60)
  if (translatable.length) {
    const pick = translatable[0]
    quiz.push({
      q: `翻译练习：把下面这段中文译成英文\n${pick.cn}`,
      options: [],
      answer: -1,
      explain: `参考译文：${pick.en}`,
    })
  }
  return quiz
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type LlmEnrich = {
  vocab?: Array<{ word: string; pos?: string; meaning?: string; note?: string }>
  quiz?: Array<{ q: string; options?: string[]; answer?: number; explain?: string }>
}

/** 让 LLM 补生词讲解和阅读理解题；没配 key 或失败时返回 null */
async function enrichWithLlm(article: FetchResult, vocab: ArticleVocab[]): Promise<{ vocab: ArticleVocab[]; quiz: ArticleQuiz[] } | null> {
  const body = article.paragraphs
    .slice(0, 8)
    .map((p) => p.en)
    .join("\n")
    .slice(0, 4000)

  const result = await chatJson<LlmEnrich>(
    [
      {
        role: "system",
        content:
          "你是英语六级备考助手。只输出 JSON，不要任何解释文字。中文字段用中文。",
      },
      {
        role: "user",
        content: `下面是今天的英语精读材料（中国日报双语新闻，英文部分）。请完成两件事，输出 JSON：
1. vocab: 从文中挑 10 个最值得六级考生记的词（优先文中出现的、难度中上的词），每项 {word, pos, meaning, note}，meaning 是中文释义（不超过 12 字），note 是一句话用法或搭配提示（不超过 30 字）。
2. quiz: 出 3 道英文阅读理解题（不要翻译题），每项 {q, options: [4 个英文选项], answer: 正确选项下标(0-3), explain: 中文解析（不超过 60 字）}。题目必须能仅凭下面材料作答。

已知候选词（可参考，也可另选）：${vocab.map((v) => v.w).join(", ") || "无"}

材料：
${body}`,
      },
    ],
    { maxTokens: 2000, timeoutMs: 60000 },
  )
  if (!result) return null

  const mergedVocab: ArticleVocab[] = (result.vocab ?? [])
    .filter((v) => v && typeof v.word === "string" && v.word.trim())
    .slice(0, 12)
    .map((v) => ({
      w: v.word.trim(),
      pos: v.pos?.trim() ?? "",
      cn: [v.meaning?.trim(), v.note?.trim()].filter(Boolean).join(" · ").slice(0, 60),
      freq: vocab.find((x) => x.w.toLowerCase() === v.word.trim().toLowerCase())?.freq ?? 0,
    }))

  const llmQuiz: ArticleQuiz[] = (result.quiz ?? [])
    .filter((q) => q && typeof q.q === "string" && Array.isArray(q.options) && q.options.length >= 2)
    .slice(0, 3)
    .map((q) => ({
      q: q.q.trim(),
      options: q.options!.map((o) => String(o).trim()),
      answer: typeof q.answer === "number" && q.answer >= 0 && q.answer < q.options!.length ? q.answer : 0,
      explain: q.explain?.trim() ?? "",
    }))

  if (!mergedVocab.length && !llmQuiz.length) return null
  return { vocab: mergedVocab.length ? mergedVocab : vocab, quiz: llmQuiz }
}

export type GenerateResult = {
  article: { id: string; title: string; url: string; date: string }
  paragraphCount: number
  vocabCount: number
  quizCount: number
  generatedBy: string
  llmError?: string
}

/**
 * 生成（或重新生成）今天的精读内容。
 * 同一天重复生成会覆盖，避免一天攒出好几篇。
 */
export async function generateDaily(now = new Date()): Promise<GenerateResult> {
  const date = localDateKey(now)
  // 跳过已经读过的文章（这个栏目更新慢，靠轮换来保证每天内容不重复）
  const read = await db.dailyArticle.findMany({ select: { sourceUrl: true, date: true } })
  const exclude = read.filter((r) => r.date !== date).map((r) => r.sourceUrl)
  const article = await fetchDailyArticle(exclude)
  const vocab = await matchVocab(article.paragraphs)
  const localQuiz = buildLocalQuiz(article.paragraphs, vocab)

  let finalVocab = vocab
  let finalQuiz = localQuiz
  let generatedBy = "local"
  let llmError: string | undefined

  const enriched = await enrichWithLlm(article, vocab)
  if (enriched) {
    finalVocab = enriched.vocab
    // LLM 的理解题在前，本地出的填空/翻译题在后，两类都留着
    finalQuiz = [...enriched.quiz, ...localQuiz]
    generatedBy = "llm"
  } else {
    const { getLlmConfig } = await import("./llm")
    const cfg = await getLlmConfig()
    if (cfg.ready) {
      llmError = "调用了模型但没拿到可用结果，已保留本地规则版内容（看服务端日志有具体原因）"
      generatedBy = "local（LLM 调用失败）"
    } else {
      llmError = "没有配置大模型 key，本次是纯本地规则版（生词表靠词库匹配，题目靠规则生成）"
    }
  }

  const saved = await db.dailyArticle.upsert({
    where: { date },
    create: {
      date,
      title: article.title,
      sourceUrl: article.url,
      paragraphs: toJson(article.paragraphs),
      vocab: toJson(finalVocab),
      quiz: toJson(finalQuiz),
      translation: article.paragraphs.find((p) => p.cn)?.cn ?? "",
      generatedBy,
    },
    update: {
      title: article.title,
      sourceUrl: article.url,
      paragraphs: toJson(article.paragraphs),
      vocab: toJson(finalVocab),
      quiz: toJson(finalQuiz),
      translation: article.paragraphs.find((p) => p.cn)?.cn ?? "",
      generatedBy,
    },
  })

  await bumpDailyStat(now, { minutes: 0 })
  return {
    article: { id: saved.id, title: saved.title, url: saved.sourceUrl, date },
    paragraphCount: article.paragraphs.length,
    vocabCount: finalVocab.length,
    quizCount: finalQuiz.length,
    generatedBy,
    llmError,
  }
}

export async function getArticleByDate(date: string) {
  const row = await db.dailyArticle.findUnique({ where: { date } })
  if (!row) return null
  return {
    id: row.id,
    date: row.date,
    title: row.title,
    sourceUrl: row.sourceUrl,
    paragraphs: readParagraphs(row.paragraphs),
    vocab: readArticleVocab(row.vocab),
    quiz: readArticleQuiz(row.quiz),
    translation: row.translation,
    generatedBy: row.generatedBy,
    audioPath: row.audioPath,
  }
}

export async function listArticles(limit = 30) {
  const rows = await db.dailyArticle.findMany({ orderBy: { date: "desc" }, take: limit })
  return rows.map((r) => ({
    date: r.date,
    title: r.title,
    vocabCount: readArticleVocab(r.vocab).length,
    quizCount: readArticleQuiz(r.quiz).length,
    generatedBy: r.generatedBy,
  }))
}
