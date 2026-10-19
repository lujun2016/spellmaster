"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

/** 侧边导航：用 usePathname 高亮当前页，最长前缀优先匹配 */
const NAV: Array<{ href: string; label: string; icon: string; group: string }> = [
  { href: "/cet6", label: "今日", icon: "◎", group: "学习" },
  { href: "/cet6/vocab", label: "词汇复习", icon: "A", group: "学习" },
  { href: "/cet6/vocab/spell", label: "拼写听写", icon: "⌨", group: "学习" },
  { href: "/cet6/daily", label: "每日精读", icon: "☀", group: "学习" },
  { href: "/cet6/listening", label: "听力精听", icon: "♪", group: "专项" },
  { href: "/cet6/translation", label: "翻译练习", icon: "⇄", group: "专项" },
  { href: "/cet6/writing", label: "写作模板", icon: "✎", group: "专项" },
  { href: "/cet6/papers", label: "真题练习", icon: "▤", group: "专项" },
  { href: "/cet6/notebook", label: "错题本", icon: "★", group: "回顾" },
  { href: "/cet6/vocab/list", label: "全词库", icon: "☰", group: "回顾" },
  { href: "/cet6/stats", label: "统计", icon: "▦", group: "回顾" },
  { href: "/cet6/settings", label: "设置", icon: "⚙", group: "回顾" },
]

const GROUPS = ["学习", "专项", "回顾"] as const

export function Cet6Nav() {
  const pathname = usePathname()

  // 精确匹配优先，否则取能匹配上的最长前缀（避免 /cet6/vocab 抢了 /cet6/vocab/spell 的高亮）
  const active = NAV.filter((n) => pathname === n.href || pathname.startsWith(n.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href

  return (
    <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
      {GROUPS.map((group) => (
        <div key={group} className="md:mb-3 flex md:block gap-1">
          <div className="hidden md:block px-3 py-1 text-[11px] font-medium tracking-wider text-slate-400 uppercase">
            {group}
          </div>
          {NAV.filter((n) => n.group === group).map((item) => {
            const isActive = active === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-indigo-50 font-medium text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")}
              >
                <span className="w-4 text-center text-xs opacity-70">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
