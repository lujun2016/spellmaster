"use client"

import { useState, useTransition } from "react"
import { saveSettingsAction } from "@/app/cet6/settings/actions"
import { speak } from "@/lib/cet6/audio"

/** 语速档位：0.6 是最慢（听音辨音用），1.5 是快速跟读用 */
const RATES = [0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.5]

/**
 * 发音设置：音色（美音/英音）+ 语速。
 *
 * 试听刻意走浏览器合成发音（forceSynth）：有道那边是真人录音，语速改不了，
 * 用真人音去试听会让人以为语速设置没生效。
 */
export function TtsPanel({ ttsVoice, ttsRate }: { ttsVoice: string; ttsRate: number }) {
  const [voice, setVoice] = useState(ttsVoice === "en-GB" ? "en-GB" : "en-US")
  const [rate, setRate] = useState(String(ttsRate))
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  function save() {
    startTransition(async () => {
      const res = await saveSettingsAction({ ttsVoice: voice, ttsRate: rate })
      setMsg({ ok: res.ok, text: res.message })
    })
  }

  function preview() {
    const accent = voice === "en-GB" ? "uk" : "us"
    void speak("The quick brown fox jumps over the lazy dog.", {
      accent,
      rate: Number(rate) || 1,
      forceSynth: true,
    })
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">发音</h2>
      <p className="mt-0.5 text-xs text-slate-400">词汇卡片和句子朗读用这套参数</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-slate-500">
          音色
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          >
            <option value="en-US">美音 en-US</option>
            <option value="en-GB">英音 en-GB</option>
          </select>
          <span className="mt-1 block text-[11px] text-slate-400">
            单词优先用有道真人发音（美/英音各一套），长句自动回落浏览器合成音
          </span>
        </label>

        <label className="text-xs text-slate-500">
          语速 <span className="tabular-nums text-slate-700">{Number(rate).toFixed(2)}×</span>
          <select
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          >
            {RATES.map((r) => (
              <option key={r} value={String(r)}>
                {r.toFixed(2)}×
                {r === 1 ? "（正常）" : r < 1 ? "（慢速）" : "（快）"}
              </option>
            ))}
          </select>
          <span className="mt-1 block text-[11px] text-slate-400">0.6–1.5 之间；越慢越适合听音辨音</span>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={save}
          disabled={pending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? "保存中…" : "保存"}
        </button>
        <button
          onClick={preview}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          🔊 试听（用当前选择，不保存也会立刻生效）
        </button>
        {msg && <span className={msg.ok ? "text-xs text-emerald-600" : "text-xs text-rose-600"}>{msg.text}</span>}
      </div>
    </section>
  )
}
