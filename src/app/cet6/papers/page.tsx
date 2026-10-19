import Link from "next/link"
import { getPaperList } from "@/lib/cet6/paper"

export const dynamic = "force-dynamic"

/**
 * 真题练习首页：先按年份选，进入年份后再选具体试卷。
 * （把 52 套一次性铺开太密，年份卡片更清爽，也符合"先定年份再定月份"的直觉。）
 */
export default async function PapersIndexPage() {
  const { papers } = await getPaperList()
  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">真题练习</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          共 {papers.length} 套（2018–2026）· 选一个年份进入
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {years.map((y) => {
          const items = papers.filter((p) => p.year === y)
          const audio = items.filter((p) => p.hasAudio).length
          const done = items.filter((p) => p.percent > 0).length
          const score = items.filter((p) => p.score).length
          return (
            <Link
              key={y}
              href={`/cet6/papers/year/${y}`}
              className="group rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-teal-300 hover:bg-teal-50/40"
            >
              <div className="text-3xl font-semibold text-slate-900">{y}</div>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span>{items.length} 套</span>
                <span className="text-teal-600">♪ 有音频 {audio}</span>
                <span>已做 {done}</span>
                {score > 0 && <span className="text-emerald-600">完成 {score}</span>}
              </div>
            </Link>
          )
        })}
        {!years.length && <p className="text-sm text-slate-400">库里还没有真题</p>}
      </div>
    </div>
  )
}
