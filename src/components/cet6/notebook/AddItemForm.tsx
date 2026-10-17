"use client"

import { useState, useTransition } from "react"
import { createNotebookItemAction } from "@/app/cet6/notebook/actions"
import { NOTEBOOK_KINDS, NOTEBOOK_SOURCES, type NotebookKind } from "./types"

/**
 * 手工添加错题/生词。手工录入是错题本的主要入口之一（阅读/翻译里遇到的东西
 * 大多不在词库里），所以字段给全，但只有标题和内容是必填。
 */
export function AddItemForm() {
  const [open, setOpen] = useState(false)
  const [kind, setKind] = useState<NotebookKind>("mistake")
  const [source, setSource] = useState<string>("手工")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [answer, setAnswer] = useState("")
  const [myAnswer, setMyAnswer] = useState("")
  const [note, setNote] = useState("")
  const [tags, setTags] = useState("")
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  function reset() {
    setTitle("")
    setContent("")
    setAnswer("")
    setMyAnswer("")
    setNote("")
    setTags("")
  }

  function submit() {
    startTransition(async () => {
      const res = await createNotebookItemAction({
        kind,
        source,
        title,
        content,
        answer: answer || undefined,
        myAnswer: myAnswer || undefined,
        note: note || undefined,
        tags: tags || undefined,
      })
      setMsg({ ok: res.ok, text: res.message })
      if (res.ok) reset()
    })
  }

  const inputCls =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
      >
        ＋ 手工添加
      </button>
    )
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">手工添加</h2>
        <button onClick={() => setOpen(false)} className="text-xs text-slate-400 hover:text-slate-600">
          收起
        </button>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-xs text-slate-500">
          类型
          <select value={kind} onChange={(e) => setKind(e.target.value as NotebookKind)} className={`mt-1 ${inputCls}`}>
            {NOTEBOOK_KINDS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-slate-500">
          来源
          <select value={source} onChange={(e) => setSource(e.target.value)} className={`mt-1 ${inputCls}`}>
            {NOTEBOOK_SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-2 block text-xs text-slate-500">
        标题 <span className="text-rose-500">*</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="题干 / 单词 / 短语"
          className={`mt-1 ${inputCls}`}
        />
      </label>

      <label className="mt-2 block text-xs text-slate-500">
        内容 <span className="text-rose-500">*</span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="原文、句子、你的疑问"
          className={`mt-1 ${inputCls}`}
        />
      </label>

      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <label className="text-xs text-slate-500">
          正确答案
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={2}
            placeholder="留给复习时翻面对照"
            className={`mt-1 ${inputCls}`}
          />
        </label>
        <label className="text-xs text-slate-500">
          我的答案
          <textarea
            value={myAnswer}
            onChange={(e) => setMyAnswer(e.target.value)}
            rows={2}
            placeholder="当时写错的那个（更容易看出错在哪）"
            className={`mt-1 ${inputCls}`}
          />
        </label>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <label className="text-xs text-slate-500">
          备注
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="为什么错、怎么记"
            className={`mt-1 ${inputCls}`}
          />
        </label>
        <label className="text-xs text-slate-500">
          标签（英文逗号分隔）
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. 长难句,虚拟语气"
            className={`mt-1 ${inputCls}`}
          />
        </label>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={submit}
          disabled={pending || !title.trim() || !content.trim()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? "保存中…" : "保存"}
        </button>
        {msg && <span className={msg.ok ? "text-xs text-emerald-600" : "text-xs text-rose-600"}>{msg.text}</span>}
        <span className="text-[11px] text-slate-400">
          保存后 12 小时进复习队列；同类型 + 同标题 + 同内容会被当成重复，不会重复入库
        </span>
      </div>
    </section>
  )
}
