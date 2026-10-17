"use client"

import Link from "next/link"
import { useCallback, useEffect, useState, useTransition } from "react"
import { gradeNotebookItemAction } from "@/app/cet6/notebook/actions"
import { describeDue, GRADE_LABEL, type Grade } from "@/lib/cet6/srs"
import type { NotebookCard } from "./types"

/** 三档评级：错题不需要「太简单」，真觉得简单就删掉 */
const GRADES: Array<{ grade: Grade; key: string; className: string; hint: string }> = [
  { grade: "again", key: "1", className: "bg-rose-600 hover:bg-rose-700", hint: "5 分钟后再出现" },
  { grade: "hard", key: "2", className: "bg-amber-500 hover:bg-amber-600", hint: "间隔压短一半" },
  { grade: "good", key: "3", className: "bg-indigo-600 hover:bg-indigo-700", hint: "进下一阶" },
]

/**
 * 错题/生词的复习卡片流。
 *
 * 跟词汇复习（ReviewSession）一个读法：先只看正面自己想，翻面核对答案再评级。
 * 差别在于错题卡片正面是题干 + 我的错误答案所在的语境，翻面才并排给出「我的 vs 正确」，
 * 这样每次复习都被迫重新面对当时错在哪。
 */
export function NotebookReview({ items, title = "错题本复习" }: { items: NotebookCard[]; title?: string }) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [tally, setTally] = useState<Record<Grade, number>>({ again: 0, hard: 0, good: 0, easy: 0 })
  const [toast, setToast] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const item = items[index]
  const total = items.length
  const done = index >= total

  const grade = useCallback(
    (g: Grade) => {
      if (!item || pending) return
      startTransition(async () => {
        const res = await gradeNotebookItemAction(item.id, g)
        if (!res.ok) {
          setToast("评级失败，已跳过这张")
        } else {
          setTally((t) => ({ ...t, [g]: t[g] + 1 }))
          setToast(`下次复习：${res.nextDueAt ? describeDue(new Date(res.nextDueAt)) : "未知"}`)
        }
        setIndex((i) => i + 1)
        setRevealed(false)
      })
    },
    [item, pending],
  )

  // 键盘流：空格翻面，1/2/3 评级，复习时手不用离开键盘
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (done) return
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault()
        if (!revealed) setRevealed(true)
        else grade("good")
        return
      }
      const map: Record<string, Grade> = { Digit1: "again", Digit2: "hard", Digit3: "good" }
      const g = map[e.code]
      if (!revealed || !g) return
      e.preventDefault()
      grade(g)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [revealed, grade, done])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 1600)
    return () => clearTimeout(t)
  }, [toast])

  if (!total) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <div className="text-3xl">✓</div>
        <h2 className="mt-3 text-lg font-semibold text-slate-900">没有到期要复习的条目</h2>
        <p className="mt-1 text-sm text-slate-500">
          错题本里的条目会按 SM-2 阶梯自己排期。想提前过一遍可以点下面的「不限到期」。
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Link
            href="/cet6/notebook/review?all=1"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
          >
            不限到期，全部过一遍
          </Link>
          <Link
            href="/cet6/notebook"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            回错题本
          </Link>
        </div>
      </div>
    )
  }

  if (done) {
    const answered = tally.again + tally.hard + tally.good
    const right = tally.good
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">{title} · 本轮完成</h2>
        <p className="mt-1 text-sm text-slate-500">
          共 {answered} 张 · 认得 {right} 张 · 模糊 {tally.hard} 张 · 忘了 {tally.again} 张
          {answered > 0 && ` · 认得率 ${Math.round((right / answered) * 100)}%`}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
          {GRADES.map((g) => (
            <div key={g.grade} className="rounded-lg bg-slate-50 py-3">
              <div className="text-lg font-semibold tabular-nums text-slate-900">{tally[g.grade]}</div>
              <div className="text-xs text-slate-400">{GRADE_LABEL[g.grade]}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400">
          「忘了」的条目 5 分钟后重新到期，本轮已经把它们重新排进队列，刷新就能再抽到。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
          >
            再来一轮
          </button>
          <Link
            href="/cet6/notebook"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            回错题本
          </Link>
          <Link
            href="/cet6/stats"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            看统计
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 进度条 */}
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="tabular-nums">
          {index + 1} / {total}
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <span>
          {item.kindLabel} · {item.source}
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col items-center py-4 text-center">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">{item.kindLabel}</span>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] text-indigo-700">{item.source}</span>
            {item.due && <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] text-rose-700">已到期</span>}
          </div>
          <h2 className="mt-3 text-xl font-semibold text-slate-900">{item.title}</h2>
          <p className="mt-2 max-w-2xl whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{item.content}</p>
          {item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {item.tags.map((t) => (
                <span key={t} className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-500">
                  #{t}
                </span>
              ))}
            </div>
          )}
          {!revealed && (
            <p className="mt-6 text-xs text-slate-400">
              先自己回忆/重做一遍，再按 <kbd className="rounded border px-1">空格</kbd> 对照答案
            </p>
          )}
        </div>

        {revealed && (
          <div className="mt-2 space-y-3 border-t border-slate-100 pt-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-rose-50/60 px-3 py-2">
                <div className="text-[11px] font-medium text-rose-700">我当时写的</div>
                <div className="mt-0.5 whitespace-pre-wrap text-sm text-rose-900">{item.myAnswer || "—"}</div>
              </div>
              <div className="rounded-lg bg-emerald-50/60 px-3 py-2">
                <div className="text-[11px] font-medium text-emerald-700">正确答案</div>
                <div className="mt-0.5 whitespace-pre-wrap text-sm text-emerald-900">{item.answer || "—"}</div>
              </div>
            </div>
            {item.note && (
              <div className="rounded-lg bg-amber-50/60 px-3 py-2 text-xs text-amber-900">💡 {item.note}</div>
            )}
            <div className="text-[11px] text-slate-400">
              这条已经复习 {item.reps} 次 · 当前第 {item.stage} 阶 · 遗忘 {item.lapses} 次
            </div>
          </div>
        )}
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700"
        >
          显示答案（空格）
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {GRADES.map((g) => (
            <button
              key={g.grade}
              onClick={() => grade(g.grade)}
              disabled={pending}
              title={g.hint}
              className={[
                "rounded-lg px-3 py-3 text-sm font-medium text-white disabled:opacity-60",
                g.className,
              ].join(" ")}
            >
              <div>{GRADE_LABEL[g.grade]}</div>
              <div className="text-[10px] font-normal opacity-80">{g.key}</div>
            </button>
          ))}
        </div>
      )}

      {toast && <div className="text-center text-xs text-slate-400">{toast}</div>}
    </div>
  )
}
