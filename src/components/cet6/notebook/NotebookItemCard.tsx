"use client"

import { useState, useTransition } from "react"
import { deleteNotebookItemAction, gradeNotebookItemAction } from "@/app/cet6/notebook/actions"
import { describeDue, GRADE_LABEL, type Grade } from "@/lib/cet6/srs"
import type { NotebookCard } from "./types"

/** 错题本只要三档：忘了 / 模糊 / 认得。太简单这种选项在错题上没意义（错的本来就不熟） */
const GRADES: Array<{ grade: Grade; className: string; hint: string }> = [
  { grade: "again", className: "bg-rose-600 hover:bg-rose-700", hint: "5 分钟后再来" },
  { grade: "hard", className: "bg-amber-500 hover:bg-amber-600", hint: "间隔不变，压短一半" },
  { grade: "good", className: "bg-indigo-600 hover:bg-indigo-700", hint: "进下一阶" },
]

/** 来源的配色：一眼能看出这条是从哪个模块攒下来的 */
const SOURCE_CLS: Record<string, string> = {
  词汇: "bg-indigo-50 text-indigo-700",
  阅读: "bg-emerald-50 text-emerald-700",
  听力: "bg-sky-50 text-sky-700",
  翻译: "bg-amber-50 text-amber-700",
  写作: "bg-fuchsia-50 text-fuchsia-700",
  真题: "bg-rose-50 text-rose-700",
  每日精读: "bg-teal-50 text-teal-700",
  手工: "bg-slate-100 text-slate-600",
}

/**
 * 列表里的一条。默认只显示题干/单词和到期时间，
 * 点开才把「我的答案 vs 正确答案」并排摊出来——错题的价值就在这个对比上。
 */
export function NotebookItemCard({ item }: { item: NotebookCard }) {
  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const dueText = item.dueAt ? (item.due ? "现在到期" : describeDue(new Date(item.dueAt))) : "未排程"

  function grade(g: Grade) {
    if (pending) return
    startTransition(async () => {
      const res = await gradeNotebookItemAction(item.id, g)
      if (!res.ok) {
        setToast("评级失败：条目可能已被删除")
        return
      }
      setToast(
        `已记「${GRADE_LABEL[g]}」· 下次复习 ${res.nextDueAt ? describeDue(new Date(res.nextDueAt)) : "未知"}`,
      )
    })
  }

  function remove() {
    startTransition(async () => {
      await deleteNotebookItemAction(item.id)
    })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">{item.kindLabel}</span>
            <span
              className={[
                "rounded-full px-2 py-0.5 text-[11px]",
                SOURCE_CLS[item.source] ?? "bg-slate-100 text-slate-600",
              ].join(" ")}
            >
              {item.source}
            </span>
            <span
              className={[
                "rounded-full px-2 py-0.5 text-[11px]",
                item.due ? "bg-rose-50 text-rose-700" : "bg-slate-50 text-slate-500",
              ].join(" ")}
            >
              {dueText}
            </span>
            {item.reps > 0 && (
              <span className="text-[11px] text-slate-400">
                第 {item.stage} 阶 · 复习 {item.reps} 次
                {item.lapses > 0 && ` · 忘过 ${item.lapses} 次`}
              </span>
            )}
          </div>
          <h3 className="mt-1.5 font-medium text-slate-900">{item.title}</h3>
          <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-600">{item.content}</p>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50"
        >
          {open ? "收起" : "对照答案"}
        </button>
      </div>

      {open && (
        <div className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-sm">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg bg-rose-50/60 px-3 py-2">
              <div className="text-[11px] font-medium text-rose-700">我的答案</div>
              <div className="mt-0.5 whitespace-pre-wrap text-rose-900">{item.myAnswer || "—"}</div>
            </div>
            <div className="rounded-lg bg-emerald-50/60 px-3 py-2">
              <div className="text-[11px] font-medium text-emerald-700">正确答案</div>
              <div className="mt-0.5 whitespace-pre-wrap text-emerald-900">{item.answer || "—"}</div>
            </div>
          </div>
          {item.note && (
            <div className="rounded-lg bg-amber-50/60 px-3 py-2 text-xs text-amber-900">💡 {item.note}</div>
          )}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.map((t) => (
                <span key={t} className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-500">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {GRADES.map((g) => (
          <button
            key={g.grade}
            onClick={() => grade(g.grade)}
            disabled={pending}
            title={g.hint}
            className={[
              "rounded-lg px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50",
              g.className,
            ].join(" ")}
          >
            {GRADE_LABEL[g.grade]}
          </button>
        ))}

        <span className="flex-1" />

        {confirming ? (
          <span className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">确定删掉这条？</span>
            <button
              onClick={remove}
              disabled={pending}
              className="rounded-lg bg-rose-600 px-2.5 py-1 text-xs text-white hover:bg-rose-700 disabled:opacity-50"
            >
              删除
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50"
            >
              取消
            </button>
          </span>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-500 hover:border-rose-200 hover:text-rose-600"
          >
            删除
          </button>
        )}
      </div>

      {toast && <div className="mt-2 text-[11px] text-slate-400">{toast}</div>}
    </div>
  )
}
