import type { Metadata } from "next"
import Link from "next/link"
import { BackToTop } from "@/components/cet6/BackToTop"
import { PomodoroDock } from "@/components/cet6/PomodoroDock"
import { Cet6Nav } from "@/components/cet6/Cet6Nav"
import { getDashboardStats } from "@/lib/cet6/service"

export const metadata: Metadata = {
  title: "六级复习台",
  description: "自用的英语六级复习工具：词汇、真题、听力、写作、翻译",
}

/**
 * 六级工具的外壳。
 * 这里刻意放在 /cet6 这个路由段下，与旧的小学背单词应用（/、/student、/admin）完全隔离，
 * 两边共用同一个 Next 应用但互不影响。
 */
export default async function Cet6Layout({ children }: { children: React.ReactNode }) {
  const stats = await getDashboardStats()
  const urgent = stats.daysLeft <= 30

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-indigo-800 bg-gradient-to-r from-indigo-700 to-indigo-600 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/cet6" className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-white">六级复习台</span>
            <span className="text-xs text-indigo-200">CET-6</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-indigo-100">
              待复习 <b className="text-white">{stats.totalDue}</b>
            </span>
            <span className="hidden sm:inline text-indigo-100">
              连续 <b className="text-white">{stats.streak}</b> 天
            </span>
            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-medium",
                urgent ? "bg-rose-500/90 text-white" : "bg-white/15 text-white",
              ].join(" ")}
            >
              距考试 {stats.daysLeft} 天
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row">
        <aside className="md:w-52 md:shrink-0">
          <Cet6Nav />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <BackToTop />
      <PomodoroDock />
    </div>
  )
}
