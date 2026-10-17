"use client"

import { useMemo, useRef, useState, useTransition } from "react"
import { saveVocabAction, submitDailyQuizAction } from "@/app/cet6/daily/actions"
import { playUrl, speak, speakSynth } from "@/lib/cet6/audio"
import type { ArticleParagraph, ArticleQuiz, ArticleVocab } from "@/lib/cet6/json"

type Article = {
  id: string
  date: string
  title: string
  sourceUrl: string
  paragraphs: ArticleParagraph[]
  vocab: ArticleVocab[]
  quiz: ArticleQuiz[]
  generatedBy: string
}

/**
 * 精读阅读器。
 *
 * 音频策略：整篇按段合成（段落较长，符合 TTS 接口的可用长度），合成结果服务端按内容缓存，
 * 所以第二遍播放是秒开的；服务端不可用时回落到浏览器朗读。
 */
export function DailyReader({ article }: { article: Article }) {
  const [showCn, setShowCn] = useState(true)
  const [rate, setRate] = useState(1)
  const [playing, setPlaying] = useState<number | null>(null)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set())
  const [quizState, setQuizState] = useState<Record<number, number>>({}) // 题号 → 选中项
  const [translationInput, setTranslationInput] = useState("")
  const [submitted, setSubmitted] = useState<null | { total: number; correct: number }>(null)
  const [pending, start] = useTransition()
  const audioCache = useRef<Map<number, string>>(new Map())
  const startedAt = useRef(Date.now())

  const objectiveQuiz = useMemo(() => article.quiz.filter((q) => q.options.length >= 2), [article.quiz])
  const translationQuiz = useMemo(() => article.quiz.find((q) => q.options.length === 0), [article.quiz])

  /** 播一段：服务端 TTS → 缓存 → 浏览器朗读兜底 */
  async function playParagraph(i: number) {
    const text = article.paragraphs[i]?.en
    if (!text) return
    setAudioError(null)
    setPlaying(i)
    const cached = audioCache.current.get(i)
    if (cached) {
      try {
        await playUrl(cached)
        setPlaying(null)
        return
      } catch {
        audioCache.current.delete(i)
      }
    }
    try {
      const res = await fetch(`/api/cet6/tts?text=${encodeURIComponent(text.slice(0, 700))}&rate=${rate}`)
      if (!res.ok) throw new Error(`TTS ${res.status}`)
      const data = (await res.json()) as { url?: string }
      if (!data.url) throw new Error("没有音频地址")
      audioCache.current.set(i, data.url)
      await playUrl(data.url)
    } catch {
      speakSynth(text, { rate })
      setAudioError("服务端 TTS 不可用，已改用浏览器朗读（设置页可调语速/口音）")
    } finally {
      setPlaying(null)
    }
  }

  async function playAll() {
    for (let i = 0; i < article.paragraphs.length; i++) {
      await playParagraph(i)
    }
  }

  async function saveWord(v: ArticleVocab) {
    const res = await saveVocabAction(v.w, `${v.pos ? v.pos + ". " : ""}${v.cn}`)
    if (res.ok) setSavedWords((s) => new Set(s).add(v.w))
  }

  function submitQuiz() {
    const results = objectiveQuiz.map((q, idx) => ({ correct: quizState[idx] === q.answer }))
    start(async () => {
      const minutes = Math.max(1, Math.round((Date.now() - startedAt.current) / 60000))
      const res = await submitDailyQuizAction(results, minutes)
      setSubmitted({ total: res.total, correct: res.correct })
    })
  }

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-900">{article.title}</h2>
            <p className="mt-0.5 text-xs text-slate-400">
              {article.date} · {article.paragraphs.length} 段 ·{" "}
              <a href={article.sourceUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                原文链接
              </a>{" "}
              · 内容来源：{article.generatedBy}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <button
              onClick={playAll}
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
            >
              ▶ 通读全文
            </button>
            {[0.75, 1, 1.25].map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={["rounded px-2 py-0.5", rate === r ? "bg-indigo-50 font-medium text-indigo-700" : "hover:bg-slate-100"].join(" ")}
              >
                {r}x
              </button>
            ))}
            <button onClick={() => setShowCn((v) => !v)} className="rounded px-2 py-0.5 hover:bg-slate-100">
              {showCn ? "隐藏中文" : "显示中文"}
            </button>
          </div>
        </div>
        {audioError && <p className="mt-2 text-[11px] text-amber-600">{audioError}</p>}
      </section>

      {/* 正文：中英对照 */}
      <section className="space-y-3">
        {article.paragraphs.map((p, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start gap-3">
              <button
                onClick={() => void playParagraph(i)}
                title="朗读这一段"
                className="mt-0.5 shrink-0 rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-500 hover:bg-slate-50"
              >
                {playing === i ? "…" : "🔊"}
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] leading-relaxed text-slate-800">{p.en}</p>
                {showCn && p.cn && <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.cn}</p>}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 生词表 */}
      {article.vocab.length > 0 && (
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">
            本文六级词（{article.vocab.length}）
            <span className="ml-2 text-xs font-normal text-slate-400">点★加入生词本，点词听发音</span>
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {article.vocab.map((v) => (
              <div key={v.w} className="flex items-start justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <div className="min-w-0">
                  <button
                    // 单词走 speak()：优先真人发音（有道），失败自动回落浏览器朗读
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
                  onClick={() => void saveWord(v)}
                  disabled={savedWords.has(v.w)}
                  className={["shrink-0 text-sm", savedWords.has(v.w) ? "text-amber-500" : "text-slate-300 hover:text-amber-500"].join(" ")}
                  title="加入生词本"
                >
                  {savedWords.has(v.w) ? "★" : "☆"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 题目 */}
      {article.quiz.length > 0 && (
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">今日练习</h3>

          {objectiveQuiz.map((q, idx) => (
            <div key={idx} className="mb-4 rounded-lg bg-slate-50 p-3">
              <p className="text-sm text-slate-800">{q.q}</p>
              <div className="mt-2 grid gap-1 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const chosen = quizState[idx] === oi
                  const revealed = submitted !== null
                  const isAnswer = oi === q.answer
                  return (
                    <button
                      key={oi}
                      onClick={() => !submitted && setQuizState((s) => ({ ...s, [idx]: oi }))}
                      className={[
                        "rounded-lg border px-3 py-1.5 text-left text-sm",
                        revealed && isAnswer
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : revealed && chosen
                            ? "border-rose-300 bg-rose-50 text-rose-800"
                            : chosen
                              ? "border-indigo-300 bg-indigo-50 text-indigo-800"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
                      ].join(" ")}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {submitted && q.explain && <p className="mt-2 text-xs text-slate-500">解析：{q.explain}</p>}
            </div>
          ))}

          {translationQuiz && (
            <div className="mb-4 rounded-lg bg-slate-50 p-3">
              <p className="whitespace-pre-wrap text-sm text-slate-800">{translationQuiz.q}</p>
              <textarea
                value={translationInput}
                onChange={(e) => setTranslationInput(e.target.value)}
                rows={3}
                placeholder="先自己翻一遍，再对照参考译文"
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              />
              {submitted && (
                <div className="mt-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-700">
                  <div className="text-xs font-medium text-slate-400">参考译文</div>
                  <p className="mt-1">{translationQuiz.explain?.replace(/^参考译文：/, "")}</p>
                  <p className="mt-2 text-[11px] text-slate-400">
                    自己对比：专有名词有没有译对？数字和朝代有没有漏？有没有用到被动或 with 结构？
                  </p>
                </div>
              )}
            </div>
          )}

          {!submitted ? (
            <button
              onClick={submitQuiz}
              disabled={pending || Object.keys(quizState).length === 0}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              提交（{Object.keys(quizState).length}/{objectiveQuiz.length} 题已答）
            </button>
          ) : (
            <p className="text-sm text-slate-600">
              已提交：答对 {submitted.correct}/{submitted.total}（选择题），成绩已计入今日统计。
            </p>
          )}
        </section>
      )}
    </div>
  )
}
