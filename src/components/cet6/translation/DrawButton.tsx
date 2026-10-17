"use client"

import { useRouter } from "next/navigation"

/**
 * 「换一题」按钮。
 * 单句练习的题目由 URL 上的 ?i= 下标决定（服务端按 seed % 候选池大小取题），
 * 所以这里只需要换一个随机下标再跳转——题目本身仍然由服务端算，
 * 不用把题库搬到浏览器，也不会出现 SSR / 客户端选取结果不一致的问题。
 */
export function DrawButton({ basePath, label = "换一题" }: { basePath: string; label?: string }) {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => router.push(`${basePath}?i=${Math.floor(Math.random() * 1_000_000_000)}`)}
      className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
    >
      {label}
    </button>
  )
}
