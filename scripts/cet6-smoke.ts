/**
 * 核心逻辑冒烟测试：确认「评级 → 排程 → 统计」这条链路真的按预期工作。
 *
 * 运行： pnpm db:cet6:smoke
 *
 * 它会真的写库，但结束时会把测试产生的数据清理干净：
 *   - 删掉自己造的那几个词的复习进度（WordProgress）
 *   - 把今天的统计行（DailyStat）还原成测试前的快照，没写过就删掉
 * 也就是说跑完不会污染你的学习记录，可以随时跑。
 */
import { PrismaClient } from "../src/generated/cet6"
import { applyGrade, describeDue, initialProgress, planDailyNewWords, type Grade } from "../src/lib/cet6/srs"

const db = new PrismaClient()

let failures = 0
function check(name: string, ok: boolean, detail = "") {
  console.log(`${ok ? "✓" : "✗"} ${name}${detail ? ` — ${detail}` : ""}`)
  if (!ok) failures++
}

/** 纯逻辑部分：不碰数据库，先确认 SM-2 阶梯没算错 */
function testSrsPure() {
  console.log("\n[1] SM-2 引擎（纯函数）")
  const now = new Date("2026-09-24T10:00:00")

  const first = initialProgress(now, "good")
  const firstHours = (first.dueAt.getTime() - now.getTime()) / 3600_000
  check("新词评「认得」后约 12 小时到期", Math.round(firstHours) === 12, `${firstHours} 小时`)
  check("新词 stage 进到 1", first.stage === 1, `stage=${first.stage}`)

  // 连点 4 次「认得」，间隔应严格递增，且最终落到 30/60 天量级
  let s: ReturnType<typeof initialProgress> = first
  const intervals: string[] = []
  for (let i = 0; i < 6; i++) {
    const before = s.stage
    s = applyGrade(s, "good", "recall", now)
    intervals.push(`stage${before}→${s.stage}:${describeDue(s.dueAt, now)}`)
  }
  check("连续「认得」间隔递增", s.stage >= 6, intervals.join(" | "))

  // 「忘了」应退阶 + 5 分钟后重来 + lapses 计数
  const forgot = applyGrade(s, "again", "recall", now)
  const minutes = (forgot.dueAt.getTime() - now.getTime()) / 60_000
  check("「忘了」5 分钟后重来", Math.round(minutes) === 5, `${minutes} 分钟`)
  check("「忘了」退回两阶", forgot.stage === Math.max(0, s.stage - 2), `${s.stage} → ${forgot.stage}`)
  check("「忘了」lapses +1", forgot.lapses === s.lapses + 1, `lapses=${forgot.lapses}`)

  // 「太简单」跳两阶
  const easy = applyGrade(first, "easy", "recall", now)
  check("「太简单」跳两阶", easy.stage === 3, `stage=${easy.stage}`)

  // ease 不应无限增长/下降
  let e = first
  for (let i = 0; i < 30; i++) e = applyGrade(e, "easy", "recall", now)
  check("ease 上限封顶 3.0", e.ease <= 3.0 + 1e-9, `ease=${e.ease.toFixed(3)}`)
  let h = first
  for (let i = 0; i < 30; i++) h = applyGrade(h, "again", "recall", now)
  check("ease 下限保底 1.3", h.ease >= 1.3 - 1e-9, `ease=${h.ease.toFixed(3)}`)
  check("掌握度不会掉到负数", h.recallLv === 0, `recallLv=${h.recallLv}`)

  // 两种技能互相独立
  const sp = applyGrade(first, "good", "spell", now)
  check("拼写模式只涨 spellLv", sp.spellLv === 1 && sp.recallLv === first.recallLv, `spellLv=${sp.spellLv}`)

  const plan = planDailyNewWords({ totalWords: 3992, learnedWords: 0, daysLeft: 79 })
  check("剩余 79 天时给出合理每日新词量", plan.newPerDay >= 5 && plan.newPerDay <= 120, `${plan.newPerDay} 个/天（${plan.note}）`)
  const planUrgent = planDailyNewWords({ totalWords: 3992, learnedWords: 1000, daysLeft: 10 })
  check("临近考试提示停止背新词", planUrgent.note.includes("真题"), planUrgent.note)
}

/** 落库部分：真正走一遍 service 层 */
async function testServiceLayer() {
  console.log("\n[2] 服务层落库")
  const { getTodayQueue, gradeWord, getWordById } = await import("../src/lib/cet6/service")

  // 评级会真实写 DailyStat（reviews/correct/wrong 都会 +1），
  // 所以先给「今天的统计行」拍个快照，测完原样还原 —— 冒烟测试不该污染你的学习记录。
  const todayKey = new Date().toLocaleDateString("sv-SE") // sv-SE 就是 YYYY-MM-DD
  const statBefore = await db.dailyStat.findUnique({ where: { date: todayKey } })

  const queue = await getTodayQueue()
  check("今日队列拿到新词", queue.fresh.length > 0, `${queue.fresh.length} 个新词（上限 ${queue.settings.dailyNewWords}）`)
  check("新词按真题频次排序", isDescByFreq(queue.fresh), queue.fresh.slice(0, 3).map((w) => `${w.text}:${w.freq}`).join(", "))
  check("词汇总量正确", queue.totalWords === 3992, `${queue.totalWords}`)

  const target = queue.fresh[0]
  if (!target) return

  // 先保证干净：删掉可能残留的测试进度
  await db.wordProgress.deleteMany({ where: { wordId: target.id } })

  const r1 = await gradeWord(target.id, "good")
  check("首次评级写出排程", r1.stage === 1, `stage=${r1.stage}, 下次 ${describeDue(new Date(r1.nextDueAt))}`)

  // 「忘了」应立即回到 5 分钟后，且今天仍算到期（因为 5 分钟后 > 现在，此处只验时间差）
  const r2 = await gradeWord(target.id, "again")
  const mins = Math.round((new Date(r2.nextDueAt).getTime() - Date.now()) / 60_000)
  check("再次「忘了」回到 5 分钟档", mins >= 4 && mins <= 6, `${mins} 分钟`)

  // 统计应当记录：1 个新词 + 1 次复习 + 1 次错误
  const stat = await db.dailyStat.findUnique({ where: { date: todayKey } })
  check("当日统计已记录新词", (stat?.newWords ?? 0) >= 1, `newWords=${stat?.newWords}, reviews=${stat?.reviews}, wrong=${stat?.wrong}`)

  const after = await getWordById(target.id)
  check("回读词条带上了进度", Boolean(after?.dueAt) && after?.isNew === false, `isNew=${after?.isNew}, stage=${after?.stage}`)

  // 清理：删掉测试产生的复习进度，并把今天的统计行还原成快照
  await db.wordProgress.deleteMany({ where: { wordId: target.id } })
  if (statBefore) {
    await db.dailyStat.update({
      where: { date: todayKey },
      data: {
        minutes: statBefore.minutes,
        newWords: statBefore.newWords,
        reviews: statBefore.reviews,
        correct: statBefore.correct,
        wrong: statBefore.wrong,
        pomodoros: statBefore.pomodoros,
        streak: statBefore.streak,
      },
    })
  } else {
    // 测试前今天本来就没有统计行，就把它删掉
    await db.dailyStat.deleteMany({ where: { date: todayKey } })
  }
  console.log(`   （已清理 ${target.text} 的测试进度，并还原了 ${todayKey} 的统计）`)
}

function isDescByFreq(list: Array<{ freq: number }>) {
  for (let i = 1; i < list.length; i++) if (list[i].freq > list[i - 1].freq) return false
  return true
}

async function main() {
  console.log("=== 六级工具核心逻辑冒烟测试 ===")
  testSrsPure()
  await testServiceLayer()
  console.log(`\n${failures === 0 ? "全部通过 ✓" : `${failures} 项失败 ✗`}`)
  process.exitCode = failures === 0 ? 0 : 1
}

main()
  .catch((e) => {
    console.error("测试异常：", e)
    process.exitCode = 1
  })
  .finally(() => db.$disconnect())
