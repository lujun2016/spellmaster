"use client"

/**
 * VOA「立即抓取」按钮。
 * 抓取要连外网（走显式代理），可能几秒到几十秒，所以用 useTransition 做进行中状态，
 * 结果（成功条数 / 失败原因）就地显示，不跳页 —— 失败了页面也照常显示已入库的旧内容。
 */
import { useState, useTransition } from "react"
import { fetchVoaAction } from "@/app/cet6/listening/actions"

export function VoaFetchButton({ limit = 12 }: { limit?: number }) {
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  function run() {
    setMsg(null)
    start(async () => {
      try {
        const res = await fetchVoaAction(limit)
        if (res.ok) {
          const detail = res.items.length
            ? `：` + res.items.map((i) => `${i.title.slice(0, 26)}（${i.sentences} 句 · ${i.audio === "mp3" ? "真人音频" : i.audio === "tts" ? "TTS" : "无音频"}）`).join("；")
            : ""
          setMsg({ ok: true, text: `${res.message}${detail}` })
        } else {
          setMsg({ ok: false, text: res.message })
        }
      } catch (e) {
        setMsg({ ok: false, text: `抓取失败：${e instanceof Error ? e.message : String(e)}` })
      }
    })
  }

  return (
    <div className="space-y-2">
      <button
        onClick={run}
        disabled={pending}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {pending ? "抓取中…（要连 VOA，耐心等一下）" : `立即抓取最近 ${limit} 条`}
      </button>
      {msg && (
        <p className={["text-[11px] leading-relaxed", msg.ok ? "text-emerald-600" : "text-amber-600"].join(" ")}>
          {msg.ok ? "✅ " : "⚠️ "}
          {msg.text}
        </p>
      )}
    </div>
  )
}
