import Link from "next/link"
import { SpellSession } from "@/components/cet6/SpellSession"
import { getTodayQueue } from "@/lib/cet6/service"

export const dynamic = "force-dynamic"

/** 拼写听写：和词汇复习同一批词，但要求拼出来，掌握度记在 spellLv 上 */
export default async function SpellPage() {
  const queue = await getTodayQueue()
  const words = [...queue.due, ...queue.fresh]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">拼写听写</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            给中文释义和发音，拼出英文。拼写掌握度和卡片模式分开记，六级翻译写作靠这一档。
          </p>
        </div>
        <Link
          href="/cet6/vocab"
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          回到卡片模式
        </Link>
      </div>

      <SpellSession words={words} />
    </div>
  )
}
