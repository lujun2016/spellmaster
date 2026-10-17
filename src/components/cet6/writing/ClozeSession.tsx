"use client"

import Link from "next/link"
import { useCallback, useMemo, useRef, useState, useTransition } from "react"
import { submitTemplatePracticeAction } from "@/app/cet6/writing/actions"
import { judge, normalizeAnswer, tally, type ClozeExercise, type Judgement } from "@/components/cet6/writing/cloze"

type Props = {
  templateId: string
  title: string
  category: string
  exercise: ClozeExercise
}

const RESULT_STYLE: Record<Judgement, string> = {
  right: "border-emerald-400 bg-emerald-50 text-emerald-800",
  close: "border-amber-400 bg-amber-50 text-amber-800",
  wrong: "border-rose-400 bg-rose-50 text-rose-800",
  empty: "border-rose-300 bg-rose-50 text-rose-500",
}

/**
 * 挖空背诵会话。
 *
 * 判分在客户端做（纯函数，输入内容不离开浏览器也能立刻看到对错），
 * 只有「交卷」这一步回服务端落库。exercise 在挂载时冻结一份：
 * 交卷会改动库里的练习次数，页面重新渲染时算出来的轮次可能已经变了，
 * 冻结住才能让用户看完这一轮的对错再决定下一轮。
 */
export function ClozeSession({ templateId, title, category, exercise }: Props) {
  // 冻结本次练习的空表，避免交卷后服务端算出的新轮次把当前填写内容冲掉
  const [frozen] = useState(() => exercise)
  const [values, setValues] = useState<Record<number, string>>({})
  const [results, setResults] = useState<Record<number, Judgement> | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [saved, setSaved] = useState<{ correct: number; wrong: number; minutes: number } | null>(null)
  const [pending, startTransition] = useTransition()
  const startedAt = useRef(Date.now())

  const submitted = results !== null

  const filled = useMemo(() => frozen.blanks.filter((b) => (values[b.no] ?? "").trim().length > 0).length, [frozen.blanks, values])

  const stats = useMemo(() => {
    if (!results) return null
    const ordered = frozen.blanks.map((b) => results[b.no] ?? "empty")
    return tally(ordered)
  }, [frozen.blanks, results])

  const submit = useCallback(() => {
    if (submitted || pending) return
    const next: Record<number, Judgement> = {}
    for (const b of frozen.blanks) next[b.no] = judge(values[b.no] ?? "", b)
    setResults(next)

    // 已看答案的情况下不记对错，只记时长——不让「先看答案再交卷」把正确率刷上去
    const s = tally(frozen.blanks.map((b) => next[b.no]))
    const minutes = Math.max(1, Math.round((Date.now() - startedAt.current) / 60000))
    const payload = {
      templateId,
      title,
      category,
      round: frozen.round,
      correct: revealed ? 0 : s.right,
      wrong: revealed ? 0 : s.wrong,
      minutes,
      missed: frozen.blanks.filter((b) => next[b.no] !== "right").map((b) => b.answer),
    }
    startTransition(async () => {
      try {
        await submitTemplatePracticeAction(payload)
        setSaved({ correct: payload.correct, wrong: payload.wrong, minutes: payload.minutes })
      } catch {
        // 落库失败不影响本轮对错展示，只是统计没记上
        setSaved(null)
      }
    })
  }, [category, frozen, pending, revealed, submitted, templateId, title, values])

  const showAnswers = useCallback(() => {
    setRevealed(true)
    setValues((v) => {
      const next = { ...v }
      for (const b of frozen.blanks) next[b.no] = b.answer
      return next
    })
  }, [frozen.blanks])

  const reset = useCallback(() => {
    setValues({})
    setResults(null)
    setRevealed(false)
    setSaved(null)
    startedAt.current = Date.now()
  }, [])

  const nextRound = (frozen.round + 1) % Math.max(1, frozen.rounds)

  return (
    <div className="space-y-4">
      {/* 顶部状态条：填了几个、交卷后显示成绩 */}
      <div className="sticky top-[57px] z-10 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-slate-200 bg-white/95 px-4 py-2.5 text-sm backdrop-blur">
        <span className="text-slate-500">
          第 <b className="text-slate-900">{frozen.round + 1}</b> 组空 · 已填{" "}
          <b className="text-slate-900">
            {filled}/{frozen.total}
          </b>
        </span>
        {!submitted && (
          <>
            <button
              type="button"
              onClick={submit}
              disabled={pending || filled === 0}
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 disabled:opacity-40"
            >
              交卷并对照
            </button>
            <button
              type="button"
              onClick={showAnswers}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              看答案
            </button>
            {revealed && <span className="text-xs text-amber-600">已看答案，本次只记时长、不计正确率</span>}
          </>
        )}
        {submitted && stats && (
          <>
            <span className="text-emerald-700">
              对 <b>{stats.right}</b>
            </span>
            {stats.close > 0 && <span className="text-amber-600">近似 {stats.close}</span>}
            <span className="text-rose-600">
              错 <b>{stats.wrong}</b>
            </span>
            <span className="text-slate-500">
              正确率 <b className="text-slate-900">{stats.accuracy}%</b>
            </span>
          </>
        )}
        <div className="ml-auto flex items-center gap-2">
          {submitted && (
            <Link
              href={`/cet6/writing/${templateId}?round=${nextRound}`}
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
            >
              下一组空 →
            </Link>
          )}
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50"
          >
            重做
          </button>
        </div>
      </div>

      {saved && (
        <div className="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          已计入今日统计：{saved.minutes} 分钟 · 对 {saved.correct} / 错 {saved.wrong}
          {saved.correct + saved.wrong > 0 &&
            saved.correct / (saved.correct + saved.wrong) < 0.6 &&
            " · 正确率偏低，已记一条到错题本"}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        {/* 逐行渲染模板正文，换行结构保留：一行一个 <p>，空行留出段间距 */}
        <div className="font-serif">
          {frozen.lines.map((line, i) => {
            if (line.tokens.length === 0) return <div key={i} className="h-3" />
            return (
              <p key={i} className="whitespace-pre-wrap text-[15px] leading-[2.2] text-slate-800">
                {line.tokens.map((t, j) => {
                  if (t.kind === "text") return <span key={j}>{t.text}</span>
                  if (t.kind === "slot")
                    return (
                      <span
                        key={j}
                        title="占位符：这里写你自己的内容，不计分"
                        className="mx-0.5 rounded bg-slate-100 px-1.5 py-0.5 text-[12px] text-slate-500"
                      >
                        {t.label}
                      </span>
                    )
                  const r = submitted ? results[t.no] : undefined
                  return (
                    <span key={j} className="inline-flex items-baseline gap-1">
                      <sup className="text-[10px] text-slate-400">{t.no}</sup>
                      <input
                        autoFocus={t.no === 1}
                        value={values[t.no] ?? ""}
                        disabled={submitted}
                        onChange={(e) => setValues((v) => ({ ...v, [t.no]: e.target.value }))}
                        onKeyDown={(e) => {
                          // Ctrl/Cmd + Enter 交卷，省得手离开键盘
                          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit()
                        }}
                        style={{ width: `${t.width}ch` }}
                        placeholder="______"
                        className={[
                          "rounded border-b-2 bg-transparent px-1 text-[14px] outline-none transition-colors",
                          r ? RESULT_STYLE[r] : "border-slate-300 focus:border-indigo-400",
                          submitted ? "cursor-default" : "",
                        ].join(" ")}
                      />
                      {(r === "wrong" || r === "empty" || r === "close") && (
                        <span className={r === "close" ? "text-[11px] text-amber-600" : "text-[11px] text-rose-600"}>
                          → {t.answer}
                        </span>
                      )}
                    </span>
                  )
                })}
              </p>
            )
          })}
        </div>
      </div>

      {submitted && stats && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold text-slate-700">逐空对照</h2>
            <span className="text-xs text-slate-400">
              正确率 {stats.accuracy}%（严格对的才算；「近似」是词形/拼写差一点，按错计）
            </span>
          </div>
          <ol className="mt-3 space-y-2">
            {frozen.blanks.map((b) => {
              const r = results[b.no] ?? "empty"
              return (
                <li key={b.no} className="text-sm">
                  <span className="mr-2 inline-block w-5 text-right text-xs text-slate-400">{b.no}</span>
                  <span
                    className={
                      r === "right"
                        ? "font-medium text-emerald-700"
                        : r === "close"
                          ? "font-medium text-amber-700"
                          : "font-medium text-rose-700"
                    }
                  >
                    {r === "right" ? "✓" : r === "close" ? "≈" : "✗"} {b.answer}
                  </span>
                  {r !== "right" && (
                    <span className="ml-2 text-slate-500">
                      你写的：{values[b.no]?.trim() ? values[b.no] : "（空）"}
                      {values[b.no] && normalizeAnswer(values[b.no]) === "" && "（没识别出英文）"}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
          <p className="mt-3 text-xs text-slate-400">
            判分规则：忽略大小写与标点，词序不同但用词一致也算对；带 / 的答案任选一个即可。
          </p>
        </div>
      )}
    </div>
  )
}
