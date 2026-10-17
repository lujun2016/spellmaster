import Link from "next/link"
import { AccuracyTrend } from "@/components/cet6/stats/AccuracyTrend"
import { AttemptTable } from "@/components/cet6/stats/AttemptTable"
import { Heatmap } from "@/components/cet6/stats/Heatmap"
import { ModuleBars } from "@/components/cet6/stats/ModuleBars"
import { StageBars } from "@/components/cet6/stats/StageBars"
import { getDashboardStats } from "@/lib/cet6/service"
import {
  getAccuracyTrend,
  getHeatmapCells,
  getLifetimeTotals,
  getModuleMinutes,
  getNotebookSummary,
  getRecentAttempts,
  getStageDistribution,
} from "@/lib/cet6/stats"

export const dynamic = "force-dynamic"

/** 分钟数转人话，超过一小时就别再报「415 分钟」了 */
function humanMinutes(min: number): string {
  if (min <= 0) return "0 分"
  if (min < 60) return `${min} 分`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h} 小时 ${m} 分` : `${h} 小时`
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

/**
 * 统计页。
 *
 * 数据源分工：
 *  - 今日/掌握度这类总览走 getDashboardStats()（和首页共用，口径必须一致）
 *  - 趋势/分布/真题记录走 lib/cet6/stats.ts 的聚合查询
 * 页面本身只做拼装，不写 SQL，也不在这里算百分比。
 */
export default async function StatsPage() {
  const [dash, heat, modules, accuracy, attempts, stages, lifetime, notebook] = await Promise.all([
    getDashboardStats(),
    getHeatmapCells(84),
    getModuleMinutes(30),
    getAccuracyTrend(30),
    getRecentAttempts(20),
    getStageDistribution(),
    getLifetimeTotals(),
    getNotebookSummary(),
  ])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">学习统计</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            累计 {lifetime.activeDays} 天有学习记录 · 词汇 {dash.learnedWords}/{dash.totalWords} 已学 · 错题本{" "}
            {notebook.total} 条（到期 {notebook.due}）
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          <Link
            href="/cet6/notebook"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            错题本
          </Link>
          <Link
            href="/cet6/vocab"
            className="rounded-lg bg-indigo-600 px-3 py-1.5 font-medium text-white hover:bg-indigo-700"
          >
            去复习
          </Link>
        </div>
      </div>

      {/* 关键数字 */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <Stat
          label="距考试"
          value={`${dash.daysLeft} 天`}
          hint={dash.daysLeft <= 30 ? "已进入冲刺期，建议停止背新词" : "还剩不少时间，稳住节奏"}
        />
        <Stat label="连续打卡" value={`${dash.streak} 天`} hint={`今日学习 ${humanMinutes(dash.todayMinutes)}`} />
        <Stat label="累计学习时长" value={humanMinutes(lifetime.minutes)} hint={`${lifetime.sessions} 次会话`} />
        <Stat
          label="累计答题数"
          value={lifetime.answers}
          hint={`对 ${lifetime.correct} · 错 ${lifetime.answers - lifetime.correct}`}
        />
        <Stat
          label="总正确率"
          value={lifetime.answers ? `${lifetime.accuracy}%` : "—"}
          hint="含词汇、错题本、真题的所有判定题"
        />
        <Stat
          label="已学 / 掌握"
          value={`${dash.learnedWords} / ${dash.masteredWords}`}
          hint={`词库共 ${dash.totalWords} 词，还有 ${dash.totalNew} 词没碰过`}
        />
      </div>

      <Heatmap cells={heat} />

      <div className="grid gap-5 lg:grid-cols-2">
        <ModuleBars slices={modules.slices} totalMinutes={modules.totalMinutes} sessions={modules.totalSessions} />
        <AccuracyTrend points={accuracy} />
      </div>

      <StageBars buckets={stages.buckets} total={stages.total} />

      <AttemptTable rows={attempts} />
    </div>
  )
}
