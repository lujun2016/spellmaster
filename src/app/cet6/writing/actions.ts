"use server"

/** 写作模块 server actions（挖空背诵 + 收藏 + 每日范文生成） */
import { revalidatePath } from "next/cache"
import { recordTemplatePractice, setTemplateStarred } from "@/lib/cet6/writing"
import { generateTodayWriting } from "@/lib/cet6/writing-gen"

/** 交卷：落一次挖空背诵记录，并刷新统计与错题本 */
export async function submitTemplatePracticeAction(payload: {
  templateId: string
  title: string
  category: string
  round: number
  correct: number
  wrong: number
  minutes: number
  missed: string[]
}) {
  await recordTemplatePractice(payload)
  revalidatePath("/cet6/writing")
  revalidatePath("/cet6/stats")
  revalidatePath("/cet6/notebook")
  return { ok: true as const }
}

/** 收藏/取消收藏一个模板 */
export async function toggleTemplateStarAction(id: string, starred: boolean) {
  await setTemplateStarred(id, starred)
  revalidatePath("/cet6/writing")
  return { ok: true as const }
}

/** 生成（或重新生成）今日范文：有 key 用 AI 写，没 key 回退库内真题范文 */
export async function generateWritingAction() {
  try {
    await generateTodayWriting()
    revalidatePath("/cet6/writing")
    return { ok: true as const }
  } catch (e) {
    return { ok: false as const, message: e instanceof Error ? e.message : String(e) }
  }
}
