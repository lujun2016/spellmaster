"use server"

/** 听力精听的 server actions */
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createDrill, getDrill, saveDictation, wrongWordsFrom, type DrillSource } from "@/lib/cet6/listening"
import { addNotebookItem, bumpDailyStat } from "@/lib/cet6/service"
import { synthesizeSpeech } from "@/lib/cet6/tts"
import { db } from "@/lib/cet6/db"
import { getVoaItem, runVoaFetch } from "@/lib/cet6/voa"

export async function createDrillAction(formData: FormData) {
  const source = (formData.get("source") as DrillSource) ?? "真题例句"
  const count = Number(formData.get("count") ?? 10)
  const text = (formData.get("text") as string) ?? ""
  const drill = await createDrill({ source, count, text })
  revalidatePath("/cet6/listening")
  redirect(`/cet6/listening/drill/${drill.id}`)
}

export async function submitDictationAction(id: string, results: Array<{ n: number; input: string; correct: boolean; accuracy: number }>, minutes: number) {
  const saved = await saveDictation(id, results, minutes)
  revalidatePath("/cet6/listening")
  return saved
}

/** 把听写里听错的词加进生词本；能匹配到词库的带上释义 */
export async function addWrongWordsAction(id: string, words: string[]) {
  const drill = await getDrill(id)
  if (!drill) return { ok: false, added: 0 }
  const results = drill.answers
  const wrong = words.length ? words : wrongWordsFrom(results, drill.sentences)
  let added = 0
  for (const w of wrong) {
    await addNotebookItem({
      kind: "word",
      source: "听力",
      title: w,
      content: "听写时漏掉/拼错的词",
      note: drill.title,
      tags: "听写错词",
    })
    added++
  }
  revalidatePath("/cet6/notebook")
  return { ok: true, added }
}

/**
 * 服务端合成一句音频（供听写界面兜底用：客户端直连 /api/cet6/tts 失败时再走这里）。
 * 正常路径是浏览器直接请求 /api/cet6/tts，不必经过 server action。
 */
export async function synthesizeSentenceAction(text: string, rate = 1) {
  try {
    const r = await synthesizeSpeech(text, { rate })
    return { ok: true, url: r.url }
  } catch (e) {
    return { ok: false, url: null, error: e instanceof Error ? e.message : String(e) }
  }
}

// ==================== VOA 每日英语 ====================

/**
 * 「立即抓取最近 N 条」。
 * 真正干活的是 cet6-data/fetch-voa.mjs（跟命令行手跑完全同一份逻辑），
 * 这里只是 spawn 它并读结果 —— 抓取规则改一处就够，不会两边跑偏。
 * 代理不通时脚本会打印中文提示并正常退出，我们把它转成 ok:false 的消息，页面照常渲染。
 */
export async function fetchVoaAction(limit = 12) {
  const result = await runVoaFetch({ limit })
  if (result.ok) revalidatePath("/cet6/listening")
  return result
}

/**
 * 精听完一篇：记一条 StudySession(kind="listening")，并把时长计入今日打卡。
 * note 存标题，方便统计页区分听的是什么。
 */
export async function finishVoaStudyAction(itemId: string, minutes: number) {
  const item = await getVoaItem(itemId)
  if (!item) return { ok: false, minutes: 0, message: "这条内容不存在" }
  const mins = Math.min(Math.max(Math.round(minutes) || 1, 1), 180)
  const now = new Date()
  await db.studySession.create({
    data: {
      kind: "listening",
      minutes: mins,
      pomodoros: 1,
      startedAt: new Date(now.getTime() - mins * 60_000),
      endedAt: now,
      note: `VOA · ${item.title}`.slice(0, 200),
    },
  })
  await bumpDailyStat(now, { minutes: mins })
  revalidatePath("/cet6/listening")
  revalidatePath("/cet6/stats")
  return { ok: true, minutes: mins, message: `已记入今日统计：听力精听 ${mins} 分钟` }
}
