"use server"

/**
 * 真题模块的 server actions：交卷落库 + 一键把错题收进错题本。
 *
 * 为什么不能复用 saveWordToNotebookAction：那个是给单词用的（它按 wordId 去查词条，
 * 再把释义写进生词本）。真题错题要存的是题干、正确答案、我的答案和中文解析，
 * 走的是 addNotebookItem 的 mistake 类型，所以单独开一个 action。
 */
import { revalidatePath } from "next/cache"
import { saveSectionAttempt } from "@/lib/cet6/paper"
import { PART_META, isPartKey, type PartKey } from "@/lib/cet6/paper-shared"
import type { AttemptDetail } from "@/lib/cet6/json"
import { addNotebookItem } from "@/lib/cet6/service"

export type SubmitSectionPayload = {
  paperId: string
  slug: string
  section: string
  total: number
  correct: number
  detail: AttemptDetail[]
  minutes: number
}

/**
 * 交一个板块的卷。
 *
 * 判分在客户端做（答案键就在页面里，先把分数显示出来体验更好），这里只做必要的
 * 范围校验再落库，防止明显的脏数据写进 PaperAttempt。
 */
export async function submitSectionAction(payload: SubmitSectionPayload) {
  if (!payload.paperId) return { ok: false as const, message: "缺少试卷 id" }
  if (!isPartKey(payload.section)) return { ok: false as const, message: "未知板块" }
  if (!Array.isArray(payload.detail)) return { ok: false as const, message: "作答明细格式不对" }

  const total = Math.max(0, Math.round(payload.total || 0))
  const correct = Math.min(total, Math.max(0, Math.round(payload.correct || 0)))

  const saved = await saveSectionAttempt({
    paperId: payload.paperId,
    section: payload.section as PartKey,
    total,
    correct,
    detail: payload.detail.slice(0, 100),
    minutes: payload.minutes,
  })

  revalidatePath(`/cet6/papers/${payload.slug}`)
  revalidatePath("/cet6/papers")
  revalidatePath("/cet6")
  return { ok: true as const, id: saved.id, total: saved.total, correct: saved.correct }
}

export type MistakeInput = {
  part: string
  no: number
  stem: string
  stemZh?: string
  /** 正确答案的可读文本 */
  answer: string
  /** 我的答案的可读文本 */
  myAnswer: string
  /** 中文解析摘要 */
  note?: string
}

/** 把一批真题错题收进错题本（重复的会被 addNotebookItem 自动去重） */
export async function addMistakesAction(input: {
  paperId: string
  paperLabel: string
  slug: string
  items: MistakeInput[]
}) {
  const items = (input.items ?? []).filter((it) => it && it.stem)
  if (!items.length) return { ok: false as const, message: "没有可收藏的错题" }

  const partShort = (part: string) => (isPartKey(part) ? PART_META[part].short : part)
  let added = 0
  for (const it of items) {
    const item = await addNotebookItem({
      kind: "mistake",
      source: "真题",
      title: `${input.paperLabel} · ${partShort(it.part)}第 ${it.no} 题`,
      content: it.stemZh ? `${it.stem}\n\n${it.stemZh}` : it.stem,
      answer: it.answer,
      myAnswer: it.myAnswer,
      note: it.note,
      tags: `真题,${partShort(it.part)}`,
      refId: input.paperId,
    })
    if (item) added++
  }

  revalidatePath("/cet6/notebook")
  return { ok: true as const, added, message: `已加入错题本 ${added} 题` }
}
