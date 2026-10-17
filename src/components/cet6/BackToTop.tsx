"use client"

import { useEffect, useState } from "react"

/**
 * 回到顶部按钮（全局挂载在 /cet6 布局里，所有页面都有）。
 *
 * 只在滚动超过约一屏半之后出现 —— 页面顶部时它毫无用处，露面只会挡内容。
 * 用滚动事件 + 节流（requestAnimationFrame）而不是监听 scrollY 的 state，
 * 避免长列表页面滚动时不停重渲染。
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        // 一屏半：短页面不显示，长列表/长文章才显示
        setVisible(window.scrollY > window.innerHeight * 1.5)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="回到顶部"
      aria-label="回到顶部"
      className="fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-lg backdrop-blur transition-colors hover:bg-indigo-50 hover:text-indigo-700"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
