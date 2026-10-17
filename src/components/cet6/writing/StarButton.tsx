"use client"

import { useState, useTransition } from "react"
import { toggleTemplateStarAction } from "@/app/cet6/writing/actions"

/**
 * 收藏按钮。本地先翻转再等服务端确认，点下去立刻有反馈（收藏是个高频小动作）。
 * 失败就回滚，避免界面显示的和库里存的不一致。
 */
export function StarButton({ id, starred, size = "md" }: { id: string; starred: boolean; size?: "md" | "lg" }) {
  const [on, setOn] = useState(starred)
  const [pending, startTransition] = useTransition()

  function toggle() {
    const next = !on
    setOn(next)
    startTransition(async () => {
      try {
        await toggleTemplateStarAction(id, next)
      } catch {
        setOn(!next)
      }
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      title={on ? "取消收藏" : "收藏（会置顶到分类最前）"}
      aria-pressed={on}
      className={[
        "rounded-lg border px-2 py-1 text-xs transition-colors",
        on
          ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
          : "border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600",
        size === "lg" ? "px-3 py-1.5 text-sm" : "",
        pending ? "opacity-60" : "",
      ].join(" ")}
    >
      {on ? "★ 已收藏" : "☆ 收藏"}
    </button>
  )
}
