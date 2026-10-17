"use client"

import { useState, useTransition } from "react"
import { generateTodayAction } from "@/app/cet6/daily/actions"

/** 生成今日内容：抓文章 + 本地分析 +（可选）LLM 增强，过程要几秒到几十秒 */
export function GenerateButton({ hasArticle }: { hasArticle: boolean }) {
  const [pending, start] = useTransition()
  const [message, setMessage] = useState<string | null>(null)

  function onClick() {
    setMessage(null)
    start(async () => {
      const res = await generateTodayAction()
      if (res.ok) {
        const r = res.result
        setMessage(`抓取完成：${r.paragraphCount} 段 · 生词 ${r.vocabCount} 个 · 题目 ${r.quizCount} 道（${r.generatedBy}）`)
        // 内容已经落库，刷新页面拿到新的服务端渲染结果
        window.location.reload()
      } else {
        setMessage(`生成失败：${res.message}`)
      }
    })
  }

  return (
    <div className="text-right">
      <button
        onClick={onClick}
        disabled={pending}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {pending ? "抓取中…（最多 1 分钟）" : hasArticle ? "换一篇（重新生成）" : "生成今日内容"}
      </button>
      {message && <p className="mt-2 max-w-md text-xs text-slate-500">{message}</p>}
    </div>
  )
}
