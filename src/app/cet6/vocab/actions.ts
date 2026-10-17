"use server"

/**
 * 词汇模块的 server actions。
 * 客户端组件只调这里的函数，不直接碰数据库。
 */
import { revalidatePath } from "next/cache"
import { gradeWord } from "@/lib/cet6/service"
import type { Grade, Skill } from "@/lib/cet6/srs"

export async function gradeWordAction(wordId: string, grade: Grade, skill: Skill = "recall") {
  const result = await gradeWord(wordId, grade, skill)
  // 首页的待复习数字、统计页都要跟着变
  revalidatePath("/cet6")
  return result
}

/** 结束本次复习后统一刷新一次，避免每张卡都触发整页重算 */
export async function finishReviewAction() {
  revalidatePath("/cet6")
  revalidatePath("/cet6/vocab")
  revalidatePath("/cet6/stats")
}
