"use server"

/**
 * 翻译模块的 server actions（落库都在这里，客户端组件不直接碰 db）。
 *
 * 练习记录用两个已有模型表达，没有新表：
 *  - StudySession(kind="translation")：一次练习一条，note 存真题 slug 或例句单词，
 *    既当练习历史也能按 note 统计"这套真题练过几次"。
 *  - NotebookItem(kind="sentence", source="翻译")：把原文/参考译文/我的译文留一份，
 *    之后能在错题本里回看。addNotebookItem 会按「同类型+同标题+同内容」去重，
 *    所以同一套真题反复练只会有一条，这里在去重后把 myAnswer 更新成最新一次。
 * 正确/错题数只在单句模式（有参考答案、用词汇命中率判定）才记；整段翻译没有客观答案，
 * 硬把规则检查的通过数当正确率是自欺欺人，所以整段模式只记时长与次数。
 */
import { revalidatePath } from "next/cache"
import { db } from "@/lib/cet6/db"
import { addNotebookItem, bumpDailyStat } from "@/lib/cet6/service"

export type TranslationAttemptPayload = {
  /** 记进错题本的标题，例如「2024年12月 第2套 翻译」 */
  title: string
  sourceZh: string
  userEn: string
  referenceEn?: string
  /** 规则检查摘要，存进 note 方便回看 */
  summary?: string
  minutes: number
  correct: number
  wrong: number
  /** 关联真题 id（单句模式为空） */
  refId?: string
  tags?: string
  /** 练习来源，用于 StudySession.note 与错题本 source */
  note?: string
}

export async function saveTranslationAttemptAction(payload: TranslationAttemptPayload) {
  const now = new Date()
  const minutes = Math.min(60, Math.max(1, Math.round(payload.minutes)))

  await db.studySession.create({
    data: {
      kind: "translation",
      minutes,
      pomodoros: 0,
      endedAt: now,
      note: (payload.note ?? payload.title).slice(0, 180),
    },
  })

  await bumpDailyStat(now, {
    minutes,
    // 一次练习记一次复习量；correct/wrong 见文件头说明
    reviews: 1,
    correct: payload.correct,
    wrong: payload.wrong,
  })

  const item = await addNotebookItem({
    kind: "sentence",
    source: "翻译",
    title: payload.title,
    content: payload.sourceZh.slice(0, 1200),
    answer: payload.referenceEn?.slice(0, 1200),
    myAnswer: payload.userEn.slice(0, 2000),
    note: payload.summary?.slice(0, 600),
    tags: payload.tags ?? "翻译",
    refId: payload.refId,
  })

  // 去重命中时补一次最新译文，否则错题本里永远是最早那一版
  if (item.myAnswer !== payload.userEn.slice(0, 2000)) {
    await db.notebookItem.update({
      where: { id: item.id },
      data: {
        myAnswer: payload.userEn.slice(0, 2000),
        note: payload.summary?.slice(0, 600) ?? item.note,
        answer: payload.referenceEn?.slice(0, 1200) ?? item.answer,
      },
    })
  }

  revalidatePath("/cet6")
  revalidatePath("/cet6/stats")
  revalidatePath("/cet6/notebook")
  revalidatePath("/cet6/translation")
  return { ok: true, notebookId: item.id, minutes }
}
