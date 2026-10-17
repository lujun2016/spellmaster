import Link from "next/link"
import { NotebookReview } from "@/components/cet6/notebook/NotebookReview"
import { toNotebookCard } from "@/components/cet6/notebook/types"
import { listNotebook } from "@/lib/cet6/service"

export const dynamic = "force-dynamic"

/** 一轮最多这么多张，避免一坐下就面对几百张卡 */
const SESSION_LIMIT = 50

/**
 * 错题本复习。
 * 默认只发「今天到期」的条目；带上 ?all=1 就是「不限到期，全部过一遍」（考前冲刺用）。
 */
export default async function NotebookReviewPage({ searchParams }: { searchParams: Promise<{ all?: string }> }) {
  const sp = await searchParams
  const all = sp.all === "1"

  const rows = await listNotebook({ dueOnly: !all })
  // 复习顺序按到期时间从早到晚：欠得最久的先还，跟词汇队列一个逻辑
  rows.sort((a, b) => (a.dueAt?.getTime() ?? Number.MAX_SAFE_INTEGER) - (b.dueAt?.getTime() ?? Number.MAX_SAFE_INTEGER))
  const items = rows.slice(0, SESSION_LIMIT).map((row) => toNotebookCard(row))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">错题本复习</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {all ? "不限到期" : "今天到期"} · 本轮 {items.length} 张
            {rows.length > items.length && `（到期共 ${rows.length} 张，本轮先做前 ${SESSION_LIMIT} 张）`}
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          <Link
            href={all ? "/cet6/notebook/review" : "/cet6/notebook/review?all=1"}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            {all ? "只看今天到期" : "不限到期，全部过一遍"}
          </Link>
          <Link
            href="/cet6/notebook"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            回错题本
          </Link>
        </div>
      </div>

      <NotebookReview items={items} title={all ? "错题本复习（不限到期）" : "错题本复习"} />

      <p className="text-[11px] leading-relaxed text-slate-400">
        快捷键：<kbd className="rounded border px-1">空格</kbd> 显示答案 ·
        <kbd className="ml-1 rounded border px-1">1</kbd> 忘了 ·
        <kbd className="ml-1 rounded border px-1">2</kbd> 模糊 ·
        <kbd className="ml-1 rounded border px-1">3</kbd> 认得。
        评级写的是同一套 SM-2 阶梯，和词汇复习共用统计口径。
      </p>
    </div>
  )
}
