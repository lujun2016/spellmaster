"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { gradeWordAction } from "@/app/cet6/vocab/actions"
import { saveWordToNotebookAction } from "@/app/cet6/notebook/actions"
import { speak } from "@/lib/cet6/audio"
import type { WordDTO } from "@/lib/cet6/service"
import type { Grade } from "@/lib/cet6/srs"
import { diffChars } from "@/lib/cet6/diff"

type Props = { words: WordDTO[] }

/**
 * 拼写听写模式。
 * 显示中文释义（可听发音），用户拼出英文。
 * 拼对自动评「认得」，拼错自动评「忘了」，也可以手动改成「模糊」（拼错了但想起来了）。
 */
export function SpellSession({ words }: Props) {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState("")
  const [checked, setChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [stats, setStats] = useState({ right: 0, wrong: 0 })
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [pending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  const word = words[index]
  const total = words.length
  const done = index >= total
  const correct = checked && !!word && input.trim().toLowerCase() === word.text.toLowerCase()

  useEffect(() => {
    inputRef.current?.focus()
  }, [index, checked])

  const submit = useCallback(
    (grade: Grade) => {
      if (!word || pending) return
      startTransition(async () => {
        await gradeWordAction(word.id, grade, "spell")
        setStats((s) => ({ right: s.right + (grade === "again" ? 0 : 1), wrong: s.wrong + (grade === "again" ? 1 : 0) }))
        setIndex((i) => i + 1)
        setInput("")
        setChecked(false)
        setShowHint(false)
      })
    },
    [word, pending],
  )

  function check() {
    if (!word || !input.trim()) return
    setChecked(true)
  }

  async function save() {
    if (!word) return
    const res = await saveWordToNotebookAction(word.id, "拼写")
    if (res.ok) setSaved((s) => new Set(s).add(word.id))
  }

  if (!total) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        没有可拼写的词。先去
        <Link href="/cet6/vocab" className="mx-1 text-indigo-600 hover:underline">
          词汇复习
        </Link>
        过一遍，或者去设置里调大每日新词量。
      </div>
    )
  }

  if (done) {
    const answered = stats.right + stats.wrong
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">拼写完成</h2>
        <p className="mt-1 text-sm text-slate-500">
          共 {answered} 个 · 拼对 {stats.right} · 拼错 {stats.wrong}
          {answered > 0 && ` · 正确率 ${Math.round((stats.right / answered) * 100)}%`}
        </p>
        <div className="mt-4 flex gap-2">
          <Link href="/cet6/vocab" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
            回到卡片模式
          </Link>
          <Link href="/cet6" className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            回首页
          </Link>
        </div>
      </div>
    )
  }

  const diff = checked ? diffChars(input.trim(), word.text) : []

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="tabular-nums">
          {index + 1} / {total}
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <span>
          拼对 {stats.right} · 拼错 {stats.wrong}
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="text-xs text-slate-400">
          {word.isNew ? "新词" : "复习词"} · 按中文释义拼出英文
        </div>

        <div className="mt-3 space-y-1">
          {word.trans.map((t, i) => (
            <div key={i} className="text-lg text-slate-900">
              {t.pos && <span className="mr-1 text-xs text-indigo-600">{t.pos}.</span>}
              {t.cn}
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => void speak(word.text, { accent: "us" })}
            className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
          >
            🔊 听发音
          </button>
          <button
            onClick={() => setShowHint(true)}
            className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
          >
            提示首字母
          </button>
          <button
            onClick={save}
            disabled={saved.has(word.id)}
            className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            {saved.has(word.id) ? "★ 已收藏" : "☆ 收藏"}
          </button>
        </div>

        {showHint && !checked && (
          <div className="mt-2 text-xs text-slate-400">
            {word.text[0]}
            {"·".repeat(Math.max(0, word.text.length - 1))}（共 {word.text.length} 个字母）
          </div>
        )}

        <div className="mt-5">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                if (checked) submit(correct ? "good" : "again")
                else check()
              }
            }}
            disabled={checked || pending}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            placeholder="在这里拼写，回车提交"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-lg tracking-wide outline-none focus:border-indigo-400 disabled:bg-slate-50"
          />
        </div>

        {checked && (
          <div className="mt-4 space-y-2">
            <div className="text-sm">
              {correct ? (
                <span className="text-emerald-600">✓ 拼对了</span>
              ) : (
                <span className="text-rose-600">
                  ✗ 拼错了，正确拼写：
                  <span className="ml-1 font-mono text-base text-slate-900">{word.text}</span>
                </span>
              )}
            </div>
            {!correct && (
              <div className="font-mono text-base">
                {diff.map((d, i) => (
                  <span
                    key={i}
                    className={
                      d.kind === "same"
                        ? "text-slate-900"
                        : d.kind === "wrong"
                          ? "rounded bg-rose-100 text-rose-700 line-through"
                          : "rounded bg-emerald-100 text-emerald-700"
                    }
                  >
                    {d.ch}
                  </span>
                ))}
                <span className="ml-3 text-[11px] text-slate-400">（绿的漏写，红的写错）</span>
              </div>
            )}
            {word.exam[0] && (
              <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm leading-relaxed text-slate-600">
                {word.exam[0].en}
                <div className="mt-1 text-[11px] text-slate-400">
                  {word.exam[0].y} {word.exam[0].p} {word.exam[0].t}
                </div>
              </div>
            )}
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
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => submit(correct ? "good" : "again")}
            className="rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700"
          >
            下一个（回车）
          </button>
          <button
            onClick={() => submit("hard")}
            className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
            title="拼错了但其实想起来了，标记为「模糊」"
          >
            标记模糊
          </button>
        </div>
      )}
    </div>
  )
}
