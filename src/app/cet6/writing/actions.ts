"use server"

/**
 * 写作模板模块的 server actions。
 * 客户端组件只调这里，不直接碰数据库（跟 vocab/actions.ts 的分工一致）。
 */
import { revalidatePath } from "next/cache"
import { recordTemplatePractice, setTemplateStarred } from "@/lib/cet6/writing"

/** 收藏 / 取消收藏。收藏置顶由列表页的排序负责，这里只落库并刷新受影响的路由 */
export async function toggleTemplateStarAction(id: string, starred: boolean) {
  await setTemplateStarred(id, starred)
  revalidatePath("/cet6/writing")
  revalidatePath(`/cet6/writing/${id}`)
  return { ok: true, starred }
}

export type PracticePayload = {
  templateId: string
  title: string
  category: string
  round: number
  correct: number
  wrong: number
  minutes: number
  /** 没写出来的句式原文，用于复盘与进错题本 */
  missed: string[]
}

/**
 * 交卷：把这次挖空练习的得失写进 StudySession + DailyStat。
 * 返回 nextRound 让前端知道下一轮该挖哪组空（服务端算的练习次数）。
 */
export async function submitTemplatePracticeAction(payload: PracticePayload) {
  const result = await recordTemplatePractice(payload)
  revalidatePath("/cet6/writing")
  revalidatePath(`/cet6/writing/${payload.templateId}`)
  revalidatePath("/cet6")
  revalidatePath("/cet6/stats")
  revalidatePath("/cet6/notebook")
  return { ok: true, nextRound: result.nextRound }
}
