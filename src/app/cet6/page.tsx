import Link from "next/link"
import { Pomodoro } from "@/components/cet6/Pomodoro"
import { effectiveDailyNew, getDashboardStats, getSettings, localDateKey } from "@/lib/cet6/service"

export const dynamic = "force-dynamic"

/** 学习时长 → 热力图颜色（5 档） */
function heatClass(minutes: number): string {
  if (minutes <= 0) return "bg-slate-100"
  if (minutes < 15) return "bg-indigo-100"
  if (minutes < 30) return "bg-indigo-200"
  if (minutes < 60) return "bg-indigo-400"
  if (minutes < 120) return "bg-indigo-500"
  return "bg-indigo-700"
}

/** 近 N 天热力图：按周分列，跟 GitHub 贡献图一个读法 */
function Heatmap({ recent }: { recent: Array<{ date: string; minutes: number }> }) {
  const byDate = new Map(recent.map((r) => [r.date, r.minutes]))
  const today = new Date()
  const days: Array<{ date: string; minutes: number }> = []
  for (let i = 62; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
    const key = localDateKey(d)
    days.push({ date: key, minutes: byDate.get(key) ?? 0 })
  }
  // 让第一列从周一开始对齐
  const firstDow = new Date(`${days[0].date}T00:00:00`).getDay()
  const pad = (firstDow + 6) % 7
  const cells: Array<{ date: string; minutes: number } | null> = [...Array(pad).fill(null), ...days]

  const totalMinutes = days.reduce((s, d) => s + d.minutes, 0)
  const activeDays = days.filter((d) => d.minutes > 0).length

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">近 9 周学习记录</h3>
        <span className="text-xs text-slate-400">
          {activeDays} 天有学习 · 共 {Math.round(totalMinutes / 60)} 小时
        </span>
      </div>
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {Array.from({ length: Math.ceil(cells.length / 7) }, (_, col) => (
          <div key={col} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }, (_, row) => {
              const cell = cells[col * 7 + row]
              if (!cell) return <div key={row} className="h-3 w-3 rounded-sm bg-transparent" />
              return (
                <div
                  key={row}
                  title={`${cell.date} · ${cell.minutes} 分钟`}
                  className={["h-3 w-3 rounded-sm", heatClass(cell.minutes)].join(" ")}
                />
              )
            })}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
        少
        <span className="h-2.5 w-2.5 rounded-sm bg-slate-100" />
        <span className="h-2.5 w-2.5 rounded-sm bg-indigo-100" />
        <span className="h-2.5 w-2.5 rounded-sm bg-indigo-200" />
        <span className="h-2.5 w-2.5 rounded-sm bg-indigo-400" />
        <span className="h-2.5 w-2.5 rounded-sm bg-indigo-500" />
        <span className="h-2.5 w-2.5 rounded-sm bg-indigo-700" />
        多
      </div>
    </div>
  )
}

function Stat({ label, value, hint }: { label: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-semibold tabular-nums text-slate-900">{value}</div>
      {hint && <div className="mt-0.5 text-[11px] text-slate-400">{hint}</div>}
    </div>
  )
}

export default async function Cet6Dashboard() {
  const [stats, settings] = await Promise.all([getDashboardStats(), getSettings()])
  // 与 /cet6/vocab 的队列用同一套算法，保证首页数字和实际发的卡数量一致
  const daily = effectiveDailyNew({
    settings,
    totalWords: stats.totalWords,
    learnedWords: stats.learnedWords,
    daysLeft: stats.daysLeft,
    dueCount: stats.totalDue,
  })
  // 欠账熔断：积压太多时给个明确提示，别让人以为是页面坏了
  const backlog = stats.totalDue > settings.backlogLimit
  const catchUp = backlog ? Math.max(60, Math.ceil(stats.totalDue / 3)) : null
  const todayTotal = stats.todayNew + stats.todayReviews
  const todayAccuracy = todayTotal ? Math.round((stats.todayCorrect / todayTotal) * 100) : 0

  return (
    <div className="space-y-5">
      {/* 顶部：倒计时 + 今日概览 */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-sm text-slate-500">
              {settings.examDate} 考试 · 还剩{" "}
              <b className={stats.daysLeft <= 30 ? "text-rose-600" : "text-slate-900"}>{stats.daysLeft}</b> 天
            </div>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              今天 {stats.totalDue > 0 ? `有 ${stats.totalDue} 个词要复习` : "复习任务已清空"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              连续打卡 {stats.streak} 天 · 已学 {stats.learnedWords}/{stats.totalWords} 词 · 掌握 {stats.masteredWords} 词
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/cet6/vocab"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              开始复习
            </Link>
            <Link
              href="/cet6/vocab/spell"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              拼写听写
            </Link>
          </div>
        </div>
      </section>

      {backlog && (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <b>清账模式</b>：到期 {stats.totalDue} 个词，超过了上限 {settings.backlogLimit} 个。
          今天先清 {catchUp} 个、暂停新词，剩下的几天慢慢还 —— 欠账越滚越大才是最危险的。
          想改阈值去 <a href="/cet6/settings" className="underline">设置</a>。
        </section>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="今日复习" value={stats.todayReviews} hint={`正确 ${stats.todayCorrect} / 错误 ${stats.todayWrong}`} />
        <Stat label="今日新学" value={stats.todayNew} hint={`每天目标 ${daily.value} 个`} />
        <Stat label="今日时长" value={`${stats.todayMinutes} 分`} hint={`${stats.todayPomodoros} 个番茄`} />
        <Stat label="今日正确率" value={todayTotal ? `${todayAccuracy}%` : "—"} hint={`答题 ${todayTotal} 次`} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {/* 今日任务清单 */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">今日任务</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-slate-700">
                  复习已到期词汇
                  <span className="ml-2 text-xs text-slate-400">忘得越快，出现得越勤</span>
                </span>
                <span className="flex items-center gap-3">
                  <b className="tabular-nums text-slate-900">{stats.totalDue}</b>
                  <Link href="/cet6/vocab" className="text-xs text-indigo-600 hover:underline">
                    去做
                  </Link>
                </span>
              </li>
              <li className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-slate-700">
                  学新词
                  <span className="ml-2 text-xs text-slate-400">{daily.note}</span>
                </span>
                <span className="flex items-center gap-3">
                  <b className="tabular-nums text-slate-900">{Math.min(daily.value, stats.totalNew)}</b>
                  <Link href="/cet6/vocab" className="text-xs text-indigo-600 hover:underline">
                    去做
                  </Link>
                </span>
              </li>
              <li className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-slate-700">
                  每日精读一篇
                  <span className="ml-2 text-xs text-slate-400">中国日报双语文章 · 生词 · 理解题</span>
                </span>
                <Link href="/cet6/daily" className="text-xs text-indigo-600 hover:underline">
                  去做
                </Link>
              </li>
              <li className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-slate-700">
                  真题 / 听力
                  <span className="ml-2 text-xs text-slate-400">共 {stats.dueSoon} 个词将在 24 小时内到期</span>
                </span>
                <span className="flex gap-3">
                  <Link href="/cet6/papers" className="text-xs text-indigo-600 hover:underline">
                    真题
                  </Link>
                  <Link href="/cet6/listening" className="text-xs text-indigo-600 hover:underline">
                    听力
                  </Link>
                </span>
              </li>
            </ul>
          </section>

          <Heatmap recent={stats.recent} />

          {/* 词汇进度条 */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">词汇总进度</h2>
            <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600"
                style={{ width: `${Math.round((stats.learnedWords / Math.max(1, stats.totalWords)) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>
                已学 {stats.learnedWords} / {stats.totalWords} 词（
                {Math.round((stats.learnedWords / Math.max(1, stats.totalWords)) * 100)}%）
              </span>
              <span>其中 {stats.masteredWords} 词已掌握</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-slate-50 py-2">
                <div className="font-semibold text-slate-900">{stats.totalNew}</div>
                <div className="text-slate-400">未学</div>
              </div>
              <div className="rounded-lg bg-slate-50 py-2">
                <div className="font-semibold text-slate-900">{stats.learnedWords - stats.masteredWords}</div>
                <div className="text-slate-400">学习中</div>
              </div>
              <div className="rounded-lg bg-slate-50 py-2">
                <div className="font-semibold text-slate-900">{stats.masteredWords}</div>
                <div className="text-slate-400">已掌握</div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <Pomodoro />
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">快捷入口</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { href: "/cet6/daily", label: "每日精读" },
                { href: "/cet6/listening", label: "听力精听" },
                { href: "/cet6/papers", label: "真题练习" },
                { href: "/cet6/translation", label: "翻译练习" },
                { href: "/cet6/writing", label: "写作模板" },
                { href: "/cet6/notebook", label: "错题本" },
                { href: "/cet6/vocab/list", label: "全词库" },
                { href: "/cet6/stats", label: "统计" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-center text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
