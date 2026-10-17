"use server"

/** 错题本 / 生词本 server actions */
import { revalidatePath } from "next/cache"
import {
  addNotebookItem,
  addWordToNotebook,
  deleteNotebookItem,
  getWordById,
  gradeNotebookItem,
} from "@/lib/cet6/service"
import type { Grade } from "@/lib/cet6/srs"

/** 复习卡片上点「收藏」：把该词加进生词本（重复收藏会命中已有记录，不会产生重复项） */
export async function saveWordToNotebookAction(wordId: string, source = "词汇") {
  const word = await getWordById(wordId)
  if (!word) return { ok: false, message: "词条不存在" }
  const item = await addWordToNotebook(word, source)
  revalidatePath("/cet6/notebook")
  return { ok: true, id: item.id, message: "已加入生词本" }
}

/** 手工添加：错题、句子、短语都可以走这里 */
export async function createNotebookItemAction(input: {
  kind: "word" | "mistake" | "sentence" | "phrase"
  source?: string
  title: string
  content: string
  answer?: string
  myAnswer?: string
  note?: string
  tags?: string
}) {
  if (!input.title.trim() || !input.content.trim()) {
    return { ok: false, message: "标题和内容都要填" }
  }
  const item = await addNotebookItem(input)
  revalidatePath("/cet6/notebook")
  return { ok: true, id: item.id, message: "已保存" }
}

/**
 * 错题本自己的复习评级，复用同一套 SM-2 阶梯。
 * 除了 ok 还回传下次到期时间和新阶数：卡片上要立刻显示「下次复习：3 天后」，
 * 否则用户点完评级没有任何反馈，会怀疑是不是没生效。
 */
export async function gradeNotebookItemAction(id: string, grade: Grade) {
  const updated = await gradeNotebookItem(id, grade)
  revalidatePath("/cet6/notebook")
  return {
    ok: Boolean(updated),
    nextDueAt: updated?.dueAt ? updated.dueAt.toISOString() : null,
    stage: updated?.stage ?? null,
  }
}

export async function deleteNotebookItemAction(id: string) {
  await deleteNotebookItem(id)
  revalidatePath("/cet6/notebook")
  return { ok: true }
}
