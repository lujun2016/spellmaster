"use client"

import { useState } from "react"
import { saveWordToNotebookAction } from "@/app/cet6/notebook/actions"

/** 全词库列表里的「收藏」小按钮：点了变已收藏，不跳页 */
export function SaveWordButton({ wordId, source = "词库" }: { wordId: string; source?: string }) {
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle")

  async function onClick() {
    if (state !== "idle") return
    setState("saving")
    const res = await saveWordToNotebookAction(wordId, source)
    setState(res.ok ? "saved" : "idle")
  }

  return (
    <button
      onClick={onClick}
      disabled={state !== "idle"}
      title="加入生词本"
      className={[
        "rounded px-1.5 py-0.5 text-xs transition-colors",
        state === "saved" ? "text-amber-600" : "text-slate-300 hover:text-amber-500",
      ].join(" ")}
    >
      {state === "saved" ? "★" : "☆"}
    </button>
  )
}
