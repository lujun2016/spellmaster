import { db } from "@/lib/cet6/db"
import { localDateKey } from "@/lib/cet6/service"

export const dynamic = "force-dynamic"

/**
 * 学习数据全量导出（JSON）。
 *
 * 为什么是 JSON 而不是直接下 db 文件：这个库只有自己在用，但「导出」和「备份」是两件事——
 * 备份要的是能原样搬回去的整个文件（界面上给了路径），导出要的是能在别处读、
 * 能 diff、能自己写脚本分析的数据。所以这里导出的是五张学习相关的表，不含词库和真题
 * （那两张表是灌进去的资产，重灌比搬文件省事）。
 */
export async function GET() {
  const now = new Date()
  const [notebook, wordProgress, sessions, dailyStats, attempts, words] = await Promise.all([
    db.notebookItem.findMany({ orderBy: { createdAt: "asc" } }),
    db.wordProgress.findMany({ orderBy: { dueAt: "asc" } }),
    db.studySession.findMany({ orderBy: { startedAt: "asc" } }),
    db.dailyStat.findMany({ orderBy: { date: "asc" } }),
    db.paperAttempt.findMany({ orderBy: { createdAt: "asc" }, include: { paper: { select: { slug: true, label: true, set: true } } } }),
    // WordProgress 里只有 wordId，导出时把单词原文拼上，否则这份 JSON 离开本机就没法读
    db.word.findMany({ select: { id: true, text: true } }),
  ])

  const wordText = new Map(words.map((w) => [w.id, w.text]))
  const payload = {
    meta: {
      exportedAt: now.toISOString(),
      app: "cet6-review",
      note: "词库(Word)与真题(Paper)未包含在内，它们属于可重灌的静态数据",
      counts: {
        notebookItem: notebook.length,
        wordProgress: wordProgress.length,
        studySession: sessions.length,
        dailyStat: dailyStats.length,
        paperAttempt: attempts.length,
      },
    },
    notebookItem: notebook,
    wordProgress: wordProgress.map((p) => ({ ...p, word: wordText.get(p.wordId) ?? null })),
    studySession: sessions,
    dailyStat: dailyStats,
    paperAttempt: attempts,
  }

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="cet6-data-${localDateKey(now)}.json"`,
      "Cache-Control": "no-store",
    },
  })
}
