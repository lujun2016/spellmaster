"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import { gradeWordAction } from "@/app/cet6/vocab/actions"
import { saveWordToNotebookAction } from "@/app/cet6/notebook/actions"
import type { WordDTO } from "@/lib/cet6/service"
import { describeDue, type Grade } from "@/lib/cet6/srs"
import { speak, youdaoUrl } from "@/lib/cet6/audio"

const GRADES: Array<{ grade: Grade; label: string; key: string; className: string; hint: string }> = [
  { grade: "again", label: "忘了", key: "1", className: "bg-rose-600 hover:bg-rose-700", hint: "5 分钟后重来" },
  { grade: "hard", label: "模糊", key: "2", className: "bg-amber-500 hover:bg-amber-600", hint: "原地踏步" },
  { grade: "good", label: "认得", key: "3", className: "bg-indigo-600 hover:bg-indigo-700", hint: "进下一阶" },
  { grade: "easy", label: "太简单", key: "4", className: "bg-emerald-600 hover:bg-emerald-700", hint: "跳两阶" },
]

type Props = {
  words: WordDTO[]
  skill?: "recall" | "spell"
  /** 结束后是否显示"再来一轮"（首页进入时为 true） */
  showRestart?: boolean
}

/**
 * 词汇复习会话。
 * 一张卡：先只给单词（自己先回忆），按键/点击显示答案，再按 1-4 评级。
 * 评级立刻写库（server action），排程由 SM-2 引擎算，UI 只负责展示"下次什么时候见"。
 */
export function ReviewSession({ words, skill = "recall", showRestart = true }: Props) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [tally, setTally] = useState<Record<Grade, number>>({ again: 0, hard: 0, good: 0, easy: 0 })
  const [toast, setToast] = useState<string | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [pending, startTransition] = useTransition()

  const word = words[index]
  const total = words.length
  const done = index >= total
  const newCount = useMemo(() => words.filter((w) => w.isNew).length, [words])

  const grade = useCallback(
    (g: Grade) => {
      if (!word || pending) return
      startTransition(async () => {
        const res = await gradeWordAction(word.id, g, skill)
        setTally((t) => ({ ...t, [g]: t[g] + 1 }))
        setToast(`下次复习：${describeDue(new Date(res.nextDueAt))}`)
        setIndex((i) => i + 1)
        setRevealed(false)
      })
    },
    [word, pending, skill],
  )

  // 键盘流：空格显示答案，1-4 评级，避免鼠标来回移动
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (done) return
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault()
        if (!revealed) setRevealed(true)
        else grade("good")
        return
      }
      const map: Record<string, Grade> = { Digit1: "again", Digit2: "hard", Digit3: "good", Digit4: "easy" }
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

  async function save() {
    if (!word) return
    const res = await saveWordToNotebookAction(word.id, "词汇")
    if (res.ok) setSavedIds((s) => new Set(s).add(word.id))
  }

  if (!total) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <div className="text-3xl">🎉</div>
        <h2 className="mt-3 text-lg font-semibold text-slate-900">今天的词都复习完了</h2>
        <p className="mt-1 text-sm text-slate-500">
          没有到期的卡片，也没有待学新词。可以去真题或听力换换脑子。
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Link href="/cet6/papers" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
            做真题
          </Link>
          <Link href="/cet6" className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            回首页
          </Link>
        </div>
      </div>
    )
  }

  if (done) {
    const answered = Object.values(tally).reduce((a, b) => a + b, 0)
    const right = tally.good + tally.easy
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">本轮完成</h2>
        <p className="mt-1 text-sm text-slate-500">
          共 {answered} 张 · 记住 {right} 张 · 遗忘 {tally.again} 张
          {answered > 0 && ` · 记住率 ${Math.round((right / answered) * 100)}%`}
        </p>
        <div className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
          {GRADES.map((g) => (
            <div key={g.grade} className="rounded-lg bg-slate-50 py-3">
              <div className="text-lg font-semibold tabular-nums text-slate-900">{tally[g.grade]}</div>
              <div className="text-xs text-slate-400">{g.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400">
          遗忘的词 5 分钟后会重新出现；本轮是 {newCount} 个新词 + {total - newCount} 个复习词。
        </p>
        <div className="mt-4 flex gap-2">
          <Link href="/cet6/stats" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
            看统计
          </Link>
          <Link href="/cet6" className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            回首页
          </Link>
          {showRestart && (
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              再来一轮
            </button>
          )}
        </div>
      </div>
    )
  }

  const isSaved = savedIds.has(word.id)

  return (
    <div className="space-y-4">
      {/* 进度 */}
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="tabular-nums">
          {index + 1} / {total}
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>
        <span>{word.isNew ? "新词" : "复习"}</span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        {/* 正面：只有单词 */}
        <div className="flex flex-col items-center py-6">
          <div className="flex items-center gap-2">
            {word.freq > 0 && (
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">
                真题出现 {word.freq} 次
              </span>
            )}
            {word.isNew && (
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] text-indigo-700">新词</span>
            )}
          </div>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">{word.text}</h2>
          <div className="mt-2 flex items-center gap-3 text-sm text-slate-400">
            {(word.usPhone || word.ukPhone) && (
              <span>
                {word.usPhone && <span className="mr-2">美 {word.usPhone}</span>}
                {word.ukPhone && <span>英 {word.ukPhone}</span>}
              </span>
            )}
            <button
              onClick={() => void speak(word.text, { accent: "us" })}
              className="rounded-lg border border-slate-200 px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-50"
              title={`真人发音：${youdaoUrl(word.text)}`}
            >
              🔊 发音
            </button>
          </div>

          {!revealed && (
            <p className="mt-6 text-xs text-slate-400">
              先在脑子里说出意思，再按 <kbd className="rounded border px-1">空格</kbd> 核对
            </p>
          )}
        </div>

        {/* 背面：释义与例句 */}
        {revealed && (
          <div className="mt-2 space-y-4 border-t border-slate-100 pt-5">
            <div>
              {word.trans.map((t, i) => (
                <div key={i} className="text-base text-slate-900">
                  {t.pos && <span className="mr-1 text-xs text-indigo-600">{t.pos}.</span>}
                  {t.cn}
                </div>
              ))}
              {word.defEn && <div className="mt-1 text-xs leading-relaxed text-slate-400">{word.defEn}</div>}
            </div>

            {word.mnemonic && (
              <div className="rounded-lg bg-amber-50/60 px-3 py-2 text-xs text-amber-900">
                💡 {word.mnemonic}
              </div>
            )}

            {word.phrases.length > 0 && (
              <div>
                <div className="mb-1 text-xs font-medium text-slate-400">常用短语</div>
                <ul className="space-y-0.5 text-sm text-slate-700">
                  {word.phrases.slice(0, 5).map((p, i) => (
                    <li key={i}>
                      <span className="font-medium">{p.en}</span>
                      <span className="ml-2 text-slate-400">{p.cn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {word.exam.length > 0 && (
              <div>
                <div className="mb-1 text-xs font-medium text-slate-400">真题例句</div>
                <ul className="space-y-2">
                  {word.exam.slice(0, 2).map((e, i) => (
                    <li key={i} className="rounded-lg bg-slate-50 px-3 py-2">
                      <div className="flex items-start gap-2">
                        <p className="flex-1 text-sm leading-relaxed text-slate-700">{e.en}</p>
                        <button
                          onClick={() => void speak(e.en, { forceSynth: true })}
                          className="shrink-0 text-xs text-slate-400 hover:text-slate-600"
                          title="朗读"
                        >
                          🔊
                        </button>
                      </div>
                      <div className="mt-1 text-[11px] text-slate-400">
                        {e.y} {e.p} {e.t}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {word.sents.length > 0 && word.exam.length === 0 && (
              <div>
                <div className="mb-1 text-xs font-medium text-slate-400">例句</div>
                <ul className="space-y-1 text-sm text-slate-700">
                  {word.sents.slice(0, 2).map((s, i) => (
                    <li key={i}>
                      <div>{s.en}</div>
                      <div className="text-xs text-slate-400">{s.cn}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {word.synos.length > 0 && (
              <div className="text-xs text-slate-500">
                <span className="text-slate-400">同近义词：</span>
                {word.synos.flatMap((s) => s.words).slice(0, 8).join(" / ")}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 操作区 */}
      {!revealed ? (
        <div className="flex gap-2">
          <button
            onClick={() => setRevealed(true)}
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700"
          >
            显示答案（空格）
          </button>
          <button
            onClick={save}
            disabled={isSaved}
            className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            {isSaved ? "★ 已收藏" : "☆ 收藏"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button
              key={g.grade}
              onClick={() => grade(g.grade)}
              disabled={pending}
              className={[
                "rounded-lg px-3 py-3 text-sm font-medium text-white transition-opacity disabled:opacity-60",
                g.className,
              ].join(" ")}
              title={g.hint}
            >
              <div>{g.label}</div>
              <div className="text-[10px] font-normal opacity-80">{g.key}</div>
            </button>
          ))}
        </div>
      )}

      {toast && <div className="text-center text-xs text-slate-400">{toast}</div>}
    </div>
  )
}
