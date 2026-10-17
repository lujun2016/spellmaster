"use server"

/** 每日精读的 server actions */
import { revalidatePath } from "next/cache"
import { generateDaily } from "@/lib/cet6/daily"
import { addNotebookItem, bumpDailyStat } from "@/lib/cet6/service"

/** 生成（或重新生成）今天的精读内容 */
export async function generateTodayAction() {
  try {
    const result = await generateDaily()
    revalidatePath("/cet6/daily")
    revalidatePath("/cet6")
    return { ok: true as const, result }
  } catch (e) {
    return { ok: false as const, message: e instanceof Error ? e.message : String(e) }
  }
}

/** 把文章里的生词加进生词本；能命中词库的带上音标和真题例句 */
export async function saveVocabAction(word: string, meaning: string) {
  const item = await addNotebookItem({
    kind: "word",
    source: "每日精读",
    title: word,
    content: meaning,
    tags: "精读生词",
  })
  revalidatePath("/cet6/notebook")
  return { ok: true, id: item.id }
}

/** 提交每日精读的答题结果，计入统计 */
export async function submitDailyQuizAction(results: Array<{ correct: boolean }>, minutes: number) {
  const correct = results.filter((r) => r.correct).length
  await bumpDailyStat(new Date(), {
    minutes,
    correct,
    wrong: results.length - correct,
  })
  revalidatePath("/cet6/daily")
  revalidatePath("/cet6/stats")
  return { ok: true, total: results.length, correct }
}
