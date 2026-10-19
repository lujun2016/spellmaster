/**
 * 每日范文生成。
 *
 * 设计（访谈定稿）：
 *  - 「固定模板」= 按题型自动选一套骨架，结构固定、措辞可灵活；
 *  - 有 LLM key → 让 AI 按骨架写一篇新范文（结构遵循骨架，用词自己发挥）；
 *  - 没有 key / 调用失败 → 回退到库里某套真题的官方范文 + 对应骨架，页面标明"库内范文"；
 *  - 范文后面附「挖空骨架」：每个空标注作用，引导想清楚这句话在回应题目的哪个部分。
 */
import { db } from "./db"
import { toJson, parseJson, type Skeleton } from "./json"
import { chatJson } from "./llm"
import { localDateKey } from "./service"

export type TopicType = "议论文-观点对比" | "议论文-现象分析" | "图表" | "应用文"

/** 各题型的挖空骨架：结构固定，空白处是要填的内容，label 说明这句话的作用 */
export const SKELETONS: Record<TopicType, Skeleton[]> = {
  "议论文-观点对比": [
    { label: "引出话题", en: "It is widely acknowledged that ______ has become a heated topic among ______.", hint: "填现象 + 涉及人群" },
    { label: "一方观点", en: "Some people firmly believe that ______.", hint: "填观点 A 及理由" },
    { label: "另一方观点", en: "Others, however, argue that ______.", hint: "填观点 B 及理由" },
    { label: "你的立场", en: "As far as I am concerned, ______.", hint: "填你的选择 + 一句话理由" },
    { label: "总结回扣", en: "Only in this way can we ______.", hint: "填期望的结果" },
  ],
  "议论文-现象分析": [
    { label: "引出话题", en: "In recent years, ______ has been gaining increasing popularity.", hint: "填现象主题" },
    { label: "分析原因", en: "Several factors account for this phenomenon, the most important being ______.", hint: "填核心原因" },
    { label: "正反影响", en: "Its influence is twofold: on the one hand, ______; on the other, ______.", hint: "分别填积极与消极影响" },
    { label: "你的态度", en: "In my view, we should ______.", hint: "填建议或理性态度" },
    { label: "结论展望", en: "Thus, ______.", hint: "填一句收束的话" },
  ],
  图表: [
    { label: "描述图表", en: "As is vividly shown in the chart, ______ rose/fell from ______ to ______.", hint: "填对象 + 起止数值" },
    { label: "对比补充", en: "By contrast, ______.", hint: "填另一组数据的对比" },
    { label: "归因", en: "The change can be attributed to ______.", hint: "填 1-2 个原因" },
    { label: "预测趋势", en: "It is reasonable to predict that ______.", hint: "填趋势判断" },
    { label: "建议", en: "Therefore, we are supposed to ______.", hint: "填建议" },
  ],
  应用文: [
    { label: "称呼与目的", en: "Dear ______, I am writing to ______.", hint: "填称呼 + 写信目的" },
    { label: "主体一", en: "In the first place, ______.", hint: "填第一条内容" },
    { label: "主体二", en: "Besides, ______.", hint: "填第二条内容" },
    { label: "期待回应", en: "I would appreciate it if you could ______.", hint: "填希望对方做的事" },
    { label: "署名", en: "Yours sincerely, ______.", hint: "填署名" },
  ],
}

/** 依据作文题干里的关键词判断题型（回退库内范文时用） */
export function classifyTopic(prompt: string): TopicType {
  if (/(chart|graph|table|diagram|picture|bar|pie|statistics)/i.test(prompt)) return "图表"
  if (/(letter|notice|announcement|proposal|email|invitation|resume)/i.test(prompt)) return "应用文"
  if (/(some people|others|argue|which one|your opinion|agree|disagree|debate|choose)/i.test(prompt)) return "议论文-观点对比"
  return "议论文-现象分析"
}

/** 从库里挑一篇还没生成过的真题写作题（按年份从新到旧轮换） */
async function pickBankTopic() {
  const used = new Set(
    (await db.writingGen.findMany({ select: { refId: true } }))
      .map((g) => g.refId)
      .filter((x): x is string => Boolean(x)),
  )
  const rows = await db.paper.findMany({
    where: { writing: { not: null }, writingModel: { not: null } },
    orderBy: [{ year: "desc" }, { month: "desc" }],
    select: { id: true, slug: true, writing: true, writingModel: true },
  })
  return rows.find((r) => !used.has(r.id)) ?? rows[0] ?? null
}

export type TodayWriting = {
  id: string
  date: string
  topicType: TopicType
  prompt: string
  essay: string
  skeleton: Skeleton[]
  source: "llm" | "bank"
  refSlug: string | null
}

export async function getTodayWriting(date = localDateKey()): Promise<TodayWriting | null> {
  const row = await db.writingGen.findUnique({ where: { date } })
  if (!row) return null
  return {
    id: row.id,
    date: row.date,
    topicType: row.topicType as TopicType,
    prompt: row.prompt,
    essay: row.essay,
    skeleton: parseJson<Skeleton[]>(row.skeleton, SKELETONS[row.topicType as TopicType] ?? []),
    source: (row.source === "llm" ? "llm" : "bank") as "llm" | "bank",
    refSlug: row.refId ?? null,
  }
}

export async function listWritingHistory(limit = 30) {
  return db.writingGen.findMany({ orderBy: { date: "desc" }, take: limit })
}

/** 生成（或重新生成）今天的范文。一天一篇，重复生成会覆盖今天这篇。 */
export async function generateTodayWriting(now = new Date()) {
  const date = localDateKey(now)
  const bank = await pickBankTopic()
  if (!bank || !bank.writing) throw new Error("库里没有可用的真题写作题")

  const topicType = classifyTopic(bank.writing)
  const skeleton = SKELETONS[topicType]

  // 先试 LLM（有 key 时）
  let essay: string | null = null
  let source: "llm" | "bank" = "bank"
  const llm = await chatJson<{ essay?: string }>(
    [
      {
        role: "system",
        content:
          "你是大学英语六级写作老师。只输出 JSON：{\"essay\": \"英文范文正文\"}。不要输出代码块以外的任何文字，不要解释。",
      },
      {
        role: "user",
        content: `题型：${topicType}\n题目：${bank.writing}\n\n请写一篇 150-200 词的英文范文，结构必须严格遵循下面的骨架（共 ${skeleton.length} 步，每段对应一步）：\n${skeleton.map((s, i) => `${i + 1}. ${s.label}: ${s.en}`).join("\n")}\n\n要求：句式多样、有连接词、用词可灵活替换骨架里的措辞，但段落顺序和每段作用必须一一对应。`,
      },
    ],
    { maxTokens: 1200, timeoutMs: 60000 },
  )
  if (llm?.essay && llm.essay.trim().length > 200) {
    essay = llm.essay.trim()
    source = "llm"
  }

  if (!essay) {
    essay = bank.writingModel ?? ""
    source = "bank"
  }
  if (!essay || essay.length < 100) {
    throw new Error("范文内容为空，无法生成")
  }

  const saved = await db.writingGen.upsert({
    where: { date },
    create: {
      date,
      topicType,
      prompt: bank.writing,
      essay,
      skeleton: toJson(skeleton),
      source,
      refId: source === "bank" ? bank.id : null,
    },
    update: {
      topicType,
      prompt: bank.writing,
      essay,
      skeleton: toJson(skeleton),
      source,
      refId: source === "bank" ? bank.id : null,
    },
  })
  return saved
}
