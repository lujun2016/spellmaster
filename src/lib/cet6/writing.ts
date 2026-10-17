/**
 * 写作模板模块的服务层。
 *
 * 这里只做「取模板 / 记练习次数 / 收藏」这些需要数据库的事；
 * 挖空与判分是纯逻辑，放在 components/cet6/writing/cloze.ts（客户端也要用，不能带上 Prisma）。
 *
 * 练习轮次的存法：StudySession 的 kind 固定写 "writing"，note 存模板 id。
 * 于是「这个模板练过几次」= 数一下 note 等于该 id 的 session 条数，
 * 这个数字直接当挖空的轮次偏移用——不用新建表，翻新轮次也有历史记录可查。
 */
import { db } from "./db"
import { readTemplatePhrases, type TemplatePhrase } from "./json"
import { addNotebookItem, bumpDailyStat } from "./service"

/** 模板的分类展示顺序：跟模板正文的学习路径一致（先议论文，最后万能句式） */
export const CATEGORY_ORDER = ["议论文", "图表", "应用文", "翻译技巧", "万能句式"] as const

/** 练习记录的 kind 取值，跟 StudySession.kind 的约定保持一致 */
const PRACTICE_KIND = "writing"

export type WritingTemplateDTO = {
  id: string
  category: string
  title: string
  summary: string
  body: string
  phrases: TemplatePhrase[]
  starred: boolean
  sort: number
  /** 已经练过几轮 */
  practiceCount: number
}

export type TemplateSection = {
  category: string
  items: WritingTemplateDTO[]
}

/**
 * 全部模板，按「固定分类顺序 + 分类内收藏优先 + sort」排好，供列表页直接渲染。
 * 收藏置顶只发生在分类内部：跨分类插队会让「议论文/图表/应用文」的结构散掉。
 */
export async function listTemplates(): Promise<{ sections: TemplateSection[]; total: number; starredCount: number }> {
  const [rows, counts] = await Promise.all([
    db.writingTemplate.findMany({ orderBy: [{ sort: "asc" }, { title: "asc" }] }),
    // 一次 groupBy 拿到所有模板的练习次数，别在循环里查库
    db.studySession.groupBy({ by: ["note"], where: { kind: PRACTICE_KIND }, _count: { _all: true } }),
  ])

  const countByNote = new Map(counts.map((c) => [c.note ?? "", c._count._all]))
  const items: WritingTemplateDTO[] = rows.map((r) => ({
    id: r.id,
    category: r.category,
    title: r.title,
    summary: r.summary,
    body: r.body,
    phrases: readTemplatePhrases(r.phrases),
    starred: r.starred,
    sort: r.sort,
    practiceCount: countByNote.get(r.id) ?? 0,
  }))

  const orderIndex = (c: string) => {
    const i = (CATEGORY_ORDER as readonly string[]).indexOf(c)
    return i < 0 ? CATEGORY_ORDER.length : i
  }
  const sections: TemplateSection[] = []
  for (const item of items) {
    const hit = sections.find((s) => s.category === item.category)
    if (hit) hit.items.push(item)
    else sections.push({ category: item.category, items: [item] })
  }
  sections.sort((a, b) => orderIndex(a.category) - orderIndex(b.category))
  for (const s of sections) {
    // 收藏置顶，其余保持 sort 顺序（Array.sort 稳定，不会打乱同档次的相对次序）
    s.items.sort((a, b) => Number(b.starred) - Number(a.starred))
  }

  return { sections, total: items.length, starredCount: items.filter((i) => i.starred).length }
}

export async function getTemplate(id: string): Promise<WritingTemplateDTO | null> {
  const row = await db.writingTemplate.findUnique({ where: { id } })
  if (!row) return null
  const practiceCount = await db.studySession.count({ where: { kind: PRACTICE_KIND, note: id } })
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    summary: row.summary,
    body: row.body,
    phrases: readTemplatePhrases(row.phrases),
    starred: row.starred,
    sort: row.sort,
    practiceCount,
  }
}

/** 收藏 / 取消收藏 */
export async function setTemplateStarred(id: string, starred: boolean) {
  return db.writingTemplate.update({ where: { id }, data: { starred } })
}

export type PracticeResult = {
  /** 下一轮该用哪个轮次偏移（= 累计练习次数） */
  nextRound: number
  sessionId: string
}

/**
 * 记录一次模板背诵练习。
 * 同时做三件事：写一条 StudySession（既是轮次计数器也是练习历史）、
 * 累计当日统计、把这次练习的模板标题记进错题本（方便回看"哪个模板还没背熟"）。
 * notebook 只在明显没背好（正确率低于 60%）时记，否则收藏夹会被刷屏。
 */
export async function recordTemplatePractice(params: {
  templateId: string
  title: string
  category: string
  round: number
  correct: number
  wrong: number
  minutes: number
  /** 抽出来看的那几个空，作为复盘线索 */
  missed: string[]
}): Promise<PracticeResult> {
  const now = new Date()
  const minutes = Math.min(30, Math.max(1, Math.round(params.minutes)))

  const session = await db.studySession.create({
    data: {
      kind: PRACTICE_KIND,
      minutes,
      pomodoros: 0,
      endedAt: now,
      note: params.templateId,
    },
  })

  await bumpDailyStat(now, {
    minutes,
    correct: params.correct,
    wrong: params.wrong,
  })

  const total = params.correct + params.wrong
  if (total > 0 && params.correct / total < 0.6) {
    const content = params.missed.length ? `没写出来的句式：${params.missed.join("；")}` : "本轮正确率偏低"
    const note = `最近一次正确率 ${Math.round((params.correct / total) * 100)}% · 分类 ${params.category}`
    // 标题不含轮次：同一个模板只留一条记录，反复练不会把错题本刷满，
    // 命中去重后再把内容更新成最近一次的失分点
    const item = await addNotebookItem({
      kind: "phrase",
      source: "写作",
      title: `${params.title}（挖空默写）`,
      content,
      note,
      tags: "写作,句式",
      refId: params.templateId,
    })
    if (item.content !== content) {
      await db.notebookItem.update({ where: { id: item.id }, data: { content, note } })
    }
  }

  return { nextRound: await db.studySession.count({ where: { kind: PRACTICE_KIND, note: params.templateId } }), sessionId: session.id }
}

/** 写作板块的累计练习概况，显示在列表页顶部 */
export async function getWritingOverview() {
  const [sessions, starred] = await Promise.all([
    db.studySession.findMany({
      where: { kind: PRACTICE_KIND },
      orderBy: { startedAt: "desc" },
      take: 200,
      select: { minutes: true, startedAt: true, note: true },
    }),
    db.writingTemplate.count({ where: { starred: true } }),
  ])
  return {
    practiceCount: sessions.length,
    minutes: sessions.reduce((s, x) => s + x.minutes, 0),
    lastAt: sessions[0]?.startedAt ?? null,
    starred,
  }
}
