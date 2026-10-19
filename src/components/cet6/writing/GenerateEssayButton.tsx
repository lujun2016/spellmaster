"use client"

import { useState, useTransition } from "react"
import { generateWritingAction } from "@/app/cet6/writing/actions"

/** 生成今日范文：调 server action，成功后整页刷新让服务端渲染出新内容 */
export function GenerateEssayButton({ hasToday }: { hasToday: boolean }) {
  const [pending, start] = useTransition()
  const [message, setMessage] = useState<string | null>(null)

  function onClick() {
    setMessage(null)
    start(async () => {
      const res = await generateWritingAction()
      if (res.ok) {
        window.location.reload()
      } else {
        setMessage(res.message)
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
        {pending ? "生成中…" : hasToday ? "重新生成今日范文" : "生成今日范文"}
      </button>
      {message && <p className="mt-2 text-xs text-rose-600">{message}</p>}
    </div>
  )
}
