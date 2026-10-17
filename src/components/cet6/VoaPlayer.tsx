"use client"

/**
 * VOA 每日英语的播放器 + 逐句原文 + 生词本。
 *
 * 音频来源（页面会如实标出来，不糊弄）：
 *   1. 首选本机中转 /api/cet6/voa/audio?id=… —— 服务端用带代理的 curl 把源站真人 MP3
 *      拉到 .cet6-audio/voa/ 再发过来。浏览器自己连不上 voa-audio.voanews.eu（代理是显式的，没 TUN）。
 *   2. 中转失败就退回源站直链试一次（万一浏览器配了全局代理就能通）。
 *   3. 两条都不行：不再假装有音频，提示「抓取需要梯子」，并给出「逐句 TTS 播放」兜底
 *      （用已有的 /api/cet6/tts 合成，免费且离线可用）。
 *
 * 逐句原文默认藏起来：先盲听，再点「显示原文」对照。
 * 我们没有逐句时间戳，所以不做「点某句跳到音频某处」这种假功能。
 */
import { useEffect, useMemo, useRef, useState, useTransition } from "react"
import { finishVoaStudyAction } from "@/app/cet6/listening/actions"
import { createNotebookItemAction } from "@/app/cet6/notebook/actions"
import { playUrl, speak } from "@/lib/cet6/audio"
import type { ArticleVocab } from "@/lib/cet6/json"

export type VoaPlayerItem = {
  id: string
  title: string
  pageUrl: string
  audioUrl: string
  audioKind: "mp3" | "tts" | "none"
  program: string
  summary: string
  publishedAt: string | null
  sentences: string[]
  vocab: ArticleVocab[]
}

const RATES = [0.75, 1, 1.25]

export function VoaPlayer({ item }: { item: VoaPlayerItem }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // 进页面时开始计时（渲染期间不能读时钟，所以放到 effect 里）
  const startedAt = useRef<number | null>(null)

  const [rate, setRate] = useState(1)
  const [showText, setShowText] = useState(false)
  const [srcMode, setSrcMode] = useState<"relay" | "direct" | "down">("relay")
  const [audioNote, setAudioNote] = useState<string | null>(null)
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [ttsPlaying, setTtsPlaying] = useState<number | null>(null)
  const [ttsBusy, setTtsBusy] = useState(false)
  const [studyMsg, setStudyMsg] = useState<string | null>(null)
  const [pending, start] = useTransition()

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const src = useMemo(() => {
    if (item.audioKind === "none") return null
    if (srcMode === "relay") return `/api/cet6/voa/audio?id=${encodeURIComponent(item.id)}`
    if (srcMode === "direct" && /^https?:\/\//i.test(item.audioUrl)) return item.audioUrl
    return null
  }, [item.id, item.audioUrl, item.audioKind, srcMode])

  // 换音源后把倍速重新贴上去（改 src 会重置 playbackRate）
  useEffect(() => {
    const el = audioRef.current
    if (el) el.playbackRate = rate
  }, [rate, src])

  /** 中转挂了 → 试直链；直链也挂 → 判定为「播不了」 */
  function handleAudioError() {
    if (srcMode === "relay") {
      setSrcMode("direct")
      setAudioNote("本机中转没拿到音频，正在试源站直链…")
      return
    }
    setSrcMode("down")
    setAudioNote("音频放不了：本机中转和源站直链都没通。请确认代理已开启（默认 http://127.0.0.1:7892），或者用下面的「逐句 TTS 播放」。")
  }

  /** 没有原始音频时的兜底：逐句调免费的百度 TTS 合成再播 */
  async function playSentencesFrom(startIndex = 0) {
    if (ttsBusy) return
    setTtsBusy(true)
    setAudioNote(null)
    try {
      for (let i = startIndex; i < item.sentences.length; i++) {
        const text = item.sentences[i]
        setTtsPlaying(i)
        try {
          const res = await fetch(`/api/cet6/tts?text=${encodeURIComponent(text.slice(0, 700))}&rate=${rate}`)
          if (!res.ok) throw new Error(String(res.status))
          const data = (await res.json()) as { url?: string }
          if (!data.url) throw new Error("no url")
          await playUrl(data.url)
        } catch {
          // 合成不通就退回浏览器朗读，至少别让用户卡住
          const synth = window.speechSynthesis
          if (!synth) break
          await new Promise<void>((resolve) => {
            const u = new SpeechSynthesisUtterance(text)
            u.lang = "en-US"
            u.rate = rate
            u.onend = () => resolve()
            u.onerror = () => resolve()
            synth.speak(u)
          })
        }
      }
    } finally {
      setTtsPlaying(null)
      setTtsBusy(false)
    }
  }

  async function saveVocab(v: ArticleVocab) {
    const res = await createNotebookItemAction({
      kind: "word",
      source: "VOA",
      title: v.w,
      content: `${v.pos ? `${v.pos}. ` : ""}${v.cn}`.trim() || v.w,
      note: item.title,
      tags: "VOA听力",
    })
    if (res.ok) setSaved((s) => new Set(s).add(`w:${v.w}`))
  }

  async function saveSentence(index: number) {
    const res = await createNotebookItemAction({
      kind: "sentence",
      source: "VOA",
      title: `VOA 例句（${item.title}）`.slice(0, 80),
      content: item.sentences[index],
      note: `第 ${index + 1} 句`,
      tags: "VOA听力",
    })
    if (res.ok) setSaved((s) => new Set(s).add(`s:${index}`))
  }

  /** 精听结束：按实际停留时长记一条 listening 学习记录（至少 1 分钟） */
  function finishStudy() {
    const elapsed = startedAt.current ? Date.now() - startedAt.current : 0
    const minutes = Math.max(1, Math.round(elapsed / 60_000))
    start(async () => {
      const res = await finishVoaStudyAction(item.id, minutes)
      setStudyMsg(res.message)
    })
  }

  const audioLabel = item.audioKind === "mp3" ? "真人 MP3" : item.audioKind === "tts" ? "TTS 合成" : "无音频"

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-slate-900">{item.title}</h1>
            <p className="mt-0.5 text-xs text-slate-400">
              {item.publishedAt ? `${item.publishedAt} · ` : ""}
              {item.program ? `${item.program} · ` : ""}
              {item.sentences.length} 句原文 ·{" "}
              <span className={item.audioKind === "mp3" ? "text-emerald-600" : item.audioKind === "tts" ? "text-amber-600" : "text-rose-500"}>
                {audioLabel}
              </span>
              {" · "}
              <a href={item.pageUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                VOA 原文页
              </a>
            </p>
          </div>
        </div>

        {item.summary && <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>}

        {/* 播放器 */}
        <div className="mt-4">
          {src ? (
            <audio
              ref={audioRef}
              src={src}
              controls
              preload="none"
              className="w-full"
              onError={handleAudioError}
              onLoadedMetadata={() => {
                setAudioNote(null)
                if (audioRef.current) audioRef.current.playbackRate = rate
              }}
            />
          ) : (
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
              这条没有可用的原始音频。可以用下面的「逐句 TTS 播放」按句子听（免费合成，第一遍稍慢）。
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>倍速</span>
            {RATES.map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRate(r)
                  if (audioRef.current) audioRef.current.playbackRate = r
                }}
                className={["rounded px-2 py-1", rate === r ? "bg-indigo-50 font-medium text-indigo-700" : "hover:bg-slate-100"].join(" ")}
              >
                {r}x
              </button>
            ))}
            <button
              onClick={() => void playSentencesFrom(0)}
              disabled={ttsBusy || !item.sentences.length}
              className="rounded border border-slate-200 px-2 py-1 hover:bg-slate-50 disabled:opacity-50"
              title="用免费 TTS 逐句合成播放"
            >
              {ttsBusy ? `逐句 TTS 播放中…（第 ${(ttsPlaying ?? 0) + 1} 句）` : "逐句 TTS 播放"}
            </button>
            <button
              onClick={finishStudy}
              disabled={pending}
              className="rounded-lg bg-indigo-600 px-3 py-1.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {pending ? "记录中…" : "精听完成，记入统计"}
            </button>
            {studyMsg && <span className="text-emerald-600">{studyMsg}</span>}
          </div>

          {audioNote && <p className="mt-2 text-[11px] text-amber-600">{audioNote}</p>}
          <p className="mt-2 text-[11px] text-slate-400">
            拖动进度条可以直接跳转（本地缓存支持 Range）。没有逐句时间戳，所以不提供「点某句跳过去」——
            需要逐句反复听时用「逐句 TTS 播放」。
          </p>
        </div>
      </section>

      {/* 逐句原文：默认藏着，先盲听 */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">逐句原文（{item.sentences.length} 句）</h2>
          <button
            onClick={() => setShowText((v) => !v)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
          >
            {showText ? "隐藏原文" : "显示原文"}
          </button>
        </div>
        {!showText ? (
          <p className="mt-3 text-sm text-slate-400">先不看文本听一遍，再点「显示原文」核对。听不出来的句子点 ★ 存进生词本。</p>
        ) : (
          <ol className="mt-3 space-y-2">
            {item.sentences.map((s, i) => (
              <li key={i} className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <span className="mt-0.5 w-7 shrink-0 text-right text-[11px] text-slate-400">{i + 1}</span>
                <span className="min-w-0 flex-1 text-sm leading-relaxed text-slate-800">
                  {ttsPlaying === i ? <span className="mr-1 text-indigo-500">▶</span> : null}
                  {s}
                </span>
                <button
                  onClick={() => void saveSentence(i)}
                  disabled={saved.has(`s:${i}`)}
                  title="把这句存进生词本"
                  className={["shrink-0 text-sm", saved.has(`s:${i}`) ? "text-amber-500" : "text-slate-300 hover:text-amber-500"].join(" ")}
                >
                  {saved.has(`s:${i}`) ? "★" : "☆"}
                </button>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* 文章里命中六级词库的词 */}
      {item.vocab.length > 0 && (
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">
            文中六级词（{item.vocab.length}）
            <span className="ml-2 text-xs font-normal text-slate-400">点单词听发音，点 ★ 加入生词本</span>
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {item.vocab.map((v) => (
              <div key={v.w} className="flex items-start justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <div className="min-w-0">
                  <button
                    onClick={() => void speak(v.w, { accent: "us", rate })}
                    className="text-sm font-medium text-slate-900 hover:text-indigo-600"
                    title="发音"
                  >
                    {v.w}
                  </button>
                  {v.freq ? <span className="ml-2 text-[10px] text-amber-600">真题 {v.freq} 次</span> : null}
                  <div className="text-xs text-slate-500">
                    {v.pos && <span className="text-indigo-600">{v.pos}. </span>}
                    {v.cn}
                  </div>
                </div>
                <button
                  onClick={() => void saveVocab(v)}
                  disabled={saved.has(`w:${v.w}`)}
                  className={["shrink-0 text-sm", saved.has(`w:${v.w}`) ? "text-amber-500" : "text-slate-300 hover:text-amber-500"].join(" ")}
                  title="加入生词本"
                >
                  {saved.has(`w:${v.w}`) ? "★" : "☆"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
