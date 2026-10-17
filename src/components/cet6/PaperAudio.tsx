"use client"

import { useEffect, useRef, useState } from "react"

export type AudioPiece = { label: string; start: number; end: number }

type Props = {
  slug: string
  audioUrl: string | null
  audioHls: string | null
  pieces: AudioPiece[]
  hasAudio: boolean
  /** 默认要不要显示分段按钮 */
  showPieces?: boolean
}

function fmt(sec: number) {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, "0")}`
}

/**
 * 真题听力播放器。
 *
 * 音频来源有两类：直接给 MP3 直链的（2023–2025），和只有 m3u8 流的（2020–2022）。
 * 后者浏览器放不了，需要服务端 ffmpeg 转码，所以这里做「点播放 → 轮询进度 → 转好自动播」。
 * 分段按钮来自题库里标注的 Section 时间区间，可以直接跳到某一篇听力。
 */
export function PaperAudio({ slug, audioUrl, audioHls, pieces, hasAudio, showPieces = true }: Props) {
  const [src, setSrc] = useState<string | null>(audioUrl)
  const [preparing, setPreparing] = useState(false)
  const [percent, setPercent] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [rate, setRate] = useState(1)
  const [loopPiece, setLoopPiece] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (pollRef.current) clearTimeout(pollRef.current)
    }
  }, [])

  // 语速实时生效
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate
  }, [rate, src])

  /** 问一次后端：能播了吗？不能就继续等 */
  async function ask() {
    const res = await fetch(`/api/cet6/audio/${encodeURIComponent(slug)}`)
    const data = (await res.json()) as { status: string; url?: string; percent?: number | null; error?: string }
    if (data.status === "ready" && data.url) {
      setSrc(data.url)
      setPreparing(false)
      setPercent(null)
      // 自动播：用户刚点过播放，这里接上
      setTimeout(() => audioRef.current?.play().catch(() => {}), 60)
      return true
    }
    if (data.status === "converting") {
      setPreparing(true)
      setPercent(data.percent ?? null)
      pollRef.current = setTimeout(() => void ask(), 2500)
      return false
    }
    setPreparing(false)
    setError(data.error ?? "音频不可用")
    return false
  }

  function onPlayClick() {
    setError(null)
    if (src) {
      void audioRef.current?.play()
      return
    }
    if (!hasAudio) {
      setError(audioHls ? "音频源缺失" : "这套真题没有听力音频")
      return
    }
    setPreparing(true)
    void ask()
  }

  /** 跳到分段并记住循环区间（精听常用：反复听同一篇） */
  function jump(i: number) {
    const p = pieces[i]
    if (!p || !audioRef.current) return
    audioRef.current.currentTime = p.start
    setLoopPiece(i)
    void audioRef.current.play()
    audioRef.current.playbackRate = rate
  }

  function onTimeUpdate() {
    if (loopPiece === null) return
    const p = pieces[loopPiece]
    const el = audioRef.current
    if (!p || !el) return
    if (el.currentTime >= p.end) {
      el.currentTime = p.start
      void el.play()
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900">听力音频</h3>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>语速</span>
          {[0.75, 1, 1.25, 1.5].map((r) => (
            <button
              key={r}
              onClick={() => setRate(r)}
              className={[
                "rounded px-2 py-0.5",
                rate === r ? "bg-indigo-50 font-medium text-indigo-700" : "hover:bg-slate-100",
              ].join(" ")}
            >
              {r}x
            </button>
          ))}
        </div>
      </div>

      {!hasAudio && (
        <p className="text-xs text-slate-400">这套真题暂时没有听力音频，可以先做题、看解析。</p>
      )}

      {hasAudio && !src && (
        <button
          onClick={onPlayClick}
          disabled={preparing}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {preparing ? `准备音频中${percent !== null ? ` ${percent}%` : "…"}` : "▶ 加载并播放"}
        </button>
      )}

      {preparing && !src && (
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{ width: `${percent ?? 8}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
            这套的音频是 m3u8 流，正在用本机 ffmpeg 转成本地 MP3（约 30–60 秒，只转一次）。
            转好后会存在 <code>public/audio/papers/</code>，以后打开就是秒播。
          </p>
        </div>
      )}

      {src && (
        <>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio
            ref={audioRef}
            src={src}
            controls
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = rate
            }}
            className="w-full"
          />
          {showPieces && pieces.length > 0 && (
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-slate-500">分篇跳转（点击后循环播放该篇）</span>
                {loopPiece !== null && (
                  <button onClick={() => setLoopPiece(null)} className="text-xs text-slate-400 hover:text-slate-600">
                    取消循环
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1">
                {pieces.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => jump(i)}
                    title={`${fmt(p.start)} - ${fmt(p.end)}`}
                    className={[
                      "rounded-lg px-2 py-1 text-[11px]",
                      loopPiece === i
                        ? "bg-indigo-600 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {error && <p className="mt-2 text-xs text-rose-600">{error}</p>}
    </div>
  )
}
