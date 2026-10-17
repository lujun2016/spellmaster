"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { addWrongWordsAction, submitDictationAction } from "@/app/cet6/listening/actions"
import { diffChars, wordAccuracy } from "@/lib/cet6/diff"
import { playUrl, speakSynth } from "@/lib/cet6/audio"
import type { DrillSentence } from "@/lib/cet6/json"

type Result = { n: number; input: string; correct: boolean; accuracy: number }

type Props = {
  drillId: string
  title: string
  sentences: DrillSentence[]
  /** 之前做过的结果（重做时用来预填） */
  previous: Result[]
}

/**
 * 逐句听写。
 *
 * 播放策略：优先用服务端免费 TTS（/api/cet6/tts，结果带缓存），失败就回落到浏览器朗读，
 * 保证「无论网络怎样都能练」。判分按单词级对齐算准确率，拼错的字符用 diff 标出来。
 */
export function DictationDrill({ drillId, title, sentences, previous }: Props) {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState("")
  const [checked, setChecked] = useState(false)
  const [results, setResults] = useState<Result[]>(previous)
  const [showCn, setShowCn] = useState(true)
  const [rate, setRate] = useState(1)
  const [audioState, setAudioState] = useState<"idle" | "loading" | "synth" | "error">("idle")
  const [saved, setSaved] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const audioCache = useRef<Map<string, string>>(new Map())
  const startedAt = useRef(Date.now())
  const inputRef = useRef<HTMLInputElement>(null)

  const sentence = sentences[index]
  const total = sentences.length
  const done = index >= total

  useEffect(() => {
    inputRef.current?.focus()
  }, [index, checked])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2000)
    return () => clearTimeout(t)
  }, [toast])

  /** 播一句：先查缓存 → 服务端 TTS → 浏览器朗读 */
  const play = useCallback(
    async (text: string) => {
      const cached = audioCache.current.get(text)
      if (cached) {
        try {
          await playUrl(cached)
          return
        } catch {
          audioCache.current.delete(text)
        }
      }
      setAudioState("loading")
      try {
        const res = await fetch(`/api/cet6/tts?text=${encodeURIComponent(text)}&rate=${rate}`)
        if (!res.ok) throw new Error(`TTS ${res.status}`)
        const data = (await res.json()) as { url?: string }
        if (!data.url) throw new Error("没有返回音频地址")
        audioCache.current.set(text, data.url)
        await playUrl(data.url)
        setAudioState("idle")
      } catch {
        // 服务端合成不通（离线/接口挂了）就用浏览器朗读兜底
        speakSynth(text, { rate })
        setAudioState("synth")
      }
    },
    [rate],
  )

  // 进入新句子时自动播一次，省得多点一下
  useEffect(() => {
    if (done || !sentence) return
    void play(sentence.en)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, done])

  function check() {
    if (!sentence || !input.trim()) return
    const acc = wordAccuracy(input, sentence.en)
    const correct = acc >= 0.98
    setChecked(true)
    setResults((prev) => [...prev.filter((r) => r.n !== index + 1), { n: index + 1, input, correct, accuracy: acc }])
  }

  function next() {
    setIndex((i) => i + 1)
    setInput("")
    setChecked(false)
    setAudioState("idle")
  }

  async function finish() {
    const minutes = Math.max(1, Math.round((Date.now() - startedAt.current) / 60000))
    const saved = await submitDictationAction(drillId, results, minutes)
    setSaved(true)
    setToast(`已保存：${saved.correct}/${saved.total}，准确率 ${Math.round(saved.accuracy * 100)}%`)
  }

  async function addWrong() {
    const wrong = results.filter((r) => !r.correct).map((r) => r.n)
    if (!wrong.length) {
      setToast("没有听错的句子")
      return
    }
    const res = await addWrongWordsAction(drillId, [])
    setToast(res.ok ? `已把 ${res.added} 个词加入生词本` : "加入失败")
  }

  if (!total) {
    return <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">这个练习没有句子。</p>
  }

  if (done) {
    const right = results.filter((r) => r.correct).length
    const avg = results.length ? results.reduce((s, r) => s + r.accuracy, 0) / results.length : 0
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">听写完成</h2>
        <p className="mt-1 text-sm text-slate-500">
          共 {total} 句 · 完全正确 {right} 句 · 单词级平均准确率 {Math.round(avg * 100)}%
        </p>
        <div className="mt-4 space-y-3">
          {sentences.map((s, i) => {
            const r = results.find((x) => x.n === i + 1)
            return (
              <div key={i} className="rounded-lg bg-slate-50 px-3 py-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-slate-800">{s.en}</p>
                  <span className={r?.correct ? "text-xs text-emerald-600" : "text-xs text-rose-600"}>
                    {r ? `${Math.round(r.accuracy * 100)}%` : "未做"}
                  </span>
                </div>
                {s.cn && <p className="mt-1 text-xs text-slate-400">{s.cn}</p>}
                {r && !r.correct && <p className="mt-1 font-mono text-xs text-rose-600">你写的：{r.input}</p>}
              </div>
            )
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {!saved && (
            <button
              onClick={finish}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              保存成绩并计入统计
            </button>
          )}
          <button onClick={addWrong} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            把听错的词加入生词本
          </button>
          <button
            onClick={() => {
              setIndex(0)
              setInput("")
              setChecked(false)
              setResults([])
              setSaved(false)
              startedAt.current = Date.now()
            }}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            重做一遍
          </button>
          <Link href="/cet6/listening" className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            返回听力首页
          </Link>
        </div>
        {toast && <p className="mt-2 text-xs text-slate-500">{toast}</p>}
      </div>
    )
  }

  const diff = checked ? diffChars(input.trim(), sentence.en) : []

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span className="tabular-nums">
          {title} · 第 {index + 1} / {total} 句
        </span>
        <div className="flex items-center gap-2">
          <span>语速</span>
          {[0.75, 1, 1.25].map((r) => (
            <button
              key={r}
              onClick={() => setRate(r)}
              className={["rounded px-2 py-0.5", rate === r ? "bg-indigo-50 font-medium text-indigo-700" : "hover:bg-slate-100"].join(" ")}
            >
              {r}x
            </button>
          ))}
          <button
            onClick={() => setShowCn((v) => !v)}
            className="rounded px-2 py-0.5 hover:bg-slate-100"
          >
            {showCn ? "隐藏中文" : "显示中文"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => void play(sentence.en)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {audioState === "loading" ? "合成中…" : "▶ 再听一遍"}
          </button>
          <button
            onClick={() => speakSynth(sentence.en, { rate: rate * 0.85 })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"
          >
            慢速（浏览器朗读）
          </button>
          {audioState === "synth" && (
            <span className="text-[11px] text-amber-600">服务端 TTS 不可用，已改用浏览器朗读</span>
          )}
        </div>

        {showCn && sentence.cn && <p className="mt-3 text-sm text-slate-500">{sentence.cn}</p>}

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              if (checked) next()
              else check()
            }
          }}
          disabled={checked}
          spellCheck={false}
          placeholder="把听到的句子写下来，回车提交"
          className="mt-4 w-full rounded-lg border border-slate-200 px-3 py-3 text-base outline-none focus:border-indigo-400 disabled:bg-slate-50"
        />

        {checked && (
          <div className="mt-3 space-y-2">
            <div className="text-sm">
              {results.find((r) => r.n === index + 1)?.correct ? (
                <span className="text-emerald-600">✓ 听对了</span>
              ) : (
                <span className="text-rose-600">
                  ✗ 准确率 {Math.round((results.find((r) => r.n === index + 1)?.accuracy ?? 0) * 100)}%，原文是：
                </span>
              )}
            </div>
            <p className="text-sm leading-relaxed text-slate-800">{sentence.en}</p>
            <div className="font-mono text-sm leading-relaxed">
              {diff.map((d, i) => (
                <span
                  key={i}
                  className={
                    d.kind === "same"
                      ? "text-slate-800"
                      : d.kind === "wrong"
                        ? "rounded bg-rose-100 text-rose-700 line-through"
                        : "rounded bg-emerald-100 text-emerald-700"
                  }
                >
                  {d.ch}
                </span>
              ))}
              <span className="ml-3 text-[11px] text-slate-400">（绿=漏写，红=写错）</span>
            </div>
          </div>
        )}
      </div>

      {!checked ? (
        <button
          onClick={check}
          disabled={!input.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          提交（回车）
        </button>
      ) : (
        <button
          onClick={next}
          className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700"
        >
          {index + 1 === total ? "完成本次听写" : "下一句（回车）"}
        </button>
      )}
    </div>
  )
}
