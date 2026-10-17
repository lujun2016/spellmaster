import Link from "next/link"
import { ReviewSession } from "@/components/cet6/ReviewSession"
import { getTodayQueue } from "@/lib/cet6/service"

export const dynamic = "force-dynamic"

/**
 * 词汇复习：先还债（已到期），再借新债（新词）。
 * 两者合并成一串卡片，前端按顺序走完即可。
 */
export default async function VocabPage() {
  const queue = await getTodayQueue()
  const words = [...queue.due, ...queue.fresh]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">词汇复习</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            本轮 {words.length} 张：复习 {queue.due.length} · 新词 {queue.fresh.length}
            {queue.totalDue > words.length && `（还有 ${queue.totalDue - queue.due.length} 个到期词，本轮先做这些）`}
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          <Link
            href="/cet6/vocab/spell"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            换成拼写模式
          </Link>
          <Link
            href="/cet6/vocab/list"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            浏览全词库
          </Link>
        </div>
      </div>

      <ReviewSession words={words} skill="recall" />

      <p className="text-[11px] leading-relaxed text-slate-400">
        快捷键：<kbd className="rounded border px-1">空格</kbd> 显示答案 ·
        <kbd className="ml-1 rounded border px-1">1</kbd> 忘了 ·
        <kbd className="ml-1 rounded border px-1">2</kbd> 模糊 ·
        <kbd className="ml-1 rounded border px-1">3</kbd> 认得 ·
        <kbd className="ml-1 rounded border px-1">4</kbd> 太简单。
        「忘了」的词 5 分钟后会重新排进来。
      </p>
    </div>
  )
}
