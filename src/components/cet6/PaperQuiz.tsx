"use client"

/**
 * 客观题作答区（听力 / 选词填空 / 段落匹配 / 仔细阅读共用）。
 *
 * 一个 section 一个「提交本部分」按钮：交卷后立刻在本地判分并展示逐题对错与中文解析，
 * 同时把成绩写进 PaperAttempt（走 submitSectionAction）。
 * 答案键就在页面里，所以判分放本地做，反馈即时；服务端那份只负责落库。
 *
 * 客户端统一从 paper-shared 取类型和纯函数——paper.ts 里有 node:fs，不能被客户端引用。
 */
import { useEffect, useMemo, useRef, useState } from "react"
import { addMistakesAction, submitSectionAction, type MistakeInput } from "@/app/cet6/papers/actions"
import {
  PART_META,
  explainEntries,
  gradeSection,
  letterAt,
  splitLetterParagraphs,
  splitPassageParagraphs,
  tokenizeClozePassage,
  type PaperQuestion,
  type PartKey,
  type SectionGrade,
} from "@/lib/cet6/paper-shared"

export type QuizGroup = {
  /** 分组标题：听力用音频分段名，仔细阅读用 Passage One / Two */
  label?: string
  /** 材料渲染方式；没有材料的分组（听力）留空 */
  material?: "cloze" | "letters" | "paragraphs"
  text?: string
  questions: PaperQuestion[]
}

export type QuizSection = {
  key: string
  part: PartKey
  title: string
  /** 板块级的说明文字（例如选词填空的词库提示、答案键存疑的提醒） */
  hint?: string
  groups: QuizGroup[]
  /** 选词填空：字母 → 单词 */
  bank?: Record<string, string>
  /** 段落匹配：可选段落号（取自短文里真实存在的段落） */
  paraLetters?: string[]
  /** 答案键超出短文段落范围的题号，这些题不计入得分 */
  suspiciousNos?: number[]
  /** 逐题补充提示，例如选词填空的空位在短文原文里缺失 */
  notes?: Record<number, string>
}

type Props = {
  paperId: string
  slug: string
  /** "2021年6月 第1套"，用于错题本标题 */
  paperLabel: string
  sections: QuizSection[]
}

/** 把答案字母还原成可读文本；各题型选项存放方式不同，这里统一收口 */
function answerLabel(q: PaperQuestion, letter: string): string {
  if (!letter) return "未作答"
  if (q.part === "matching") return `${letter} 段`
  if (q.part === "cloze") return q.wordBank?.[letter] ? `${letter}. ${q.wordBank[letter]}` : letter
  const raw = (q.options ?? [])[letter.charCodeAt(0) - 65]
  if (!raw) return letter
  // 听力和选词填空的选项自带 "A) " 前缀，仔细阅读的不带，统一去掉前缀
  return raw.replace(/^[A-O]\)\s*/, "").trim()
}

/** 题干里只有题干没有中文场景说明时，补一句提示避免用户以为页面坏了 */
function noteOf(section: QuizSection, no: number): string | undefined {
  return section.notes?.[no]
}

export function PaperQuiz({ paperId, slug, paperLabel, sections }: Props) {
  const [answers, setAnswers] = useState<Record<string, Record<number, string>>>({})
  const [grades, setGrades] = useState<Record<string, SectionGrade>>({})
  const [busy, setBusy] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [saved, setSaved] = useState<Record<number, "saving" | "saved">>({})
  // 计时起点：挂载时记一次，交卷时用来估算用时（渲染期间不读时钟，避免不纯渲染）
  const startedAt = useRef(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  function pick(sectionKey: string, no: number, letter: string) {
    if (grades[sectionKey]) return // 交卷后锁定，避免成绩和作答对不上
    setAnswers((prev) => ({ ...prev, [sectionKey]: { ...(prev[sectionKey] ?? {}), [no]: letter } }))
  }

  function sectionQuestions(section: QuizSection) {
    return section.groups.flatMap((g) => g.questions)
  }

  /** 收集本部分答错的题，转成错题本的输入格式 */
  function mistakesOf(section: QuizSection, grade: SectionGrade): MistakeInput[] {
    const byNo = new Map(grade.detail.map((d) => [d.n, d]))
    return sectionQuestions(section)
      .filter((q) => {
        const d = byNo.get(q.no)
        return d && !d.right
      })
      .map((q) => {
        const d = byNo.get(q.no)!
        return {
          part: section.part,
          no: q.no,
          stem: q.stem || `第 ${q.no} 题`,
          stemZh: q.stemZh || undefined,
          answer: answerLabel(q, d.answer),
          myAnswer: answerLabel(q, d.my),
          note: [q.type ? `题型：${q.type}` : "", q.explain?.定位 ? `定位：${q.explain.定位}` : ""]
            .filter(Boolean)
            .join("\n"),
        }
      })
  }

  async function saveMistakes(section: QuizSection, items: MistakeInput[]) {
    if (!items.length) {
      setToast("本部分没有错题")
      return
    }
    setToast("正在加入错题本…")
    const res = await addMistakesAction({ paperId, paperLabel, slug, items })
    setToast(res.message)
  }

  async function submit(section: QuizSection) {
    const qs = sectionQuestions(section)
    const grade = gradeSection(qs, answers[section.key] ?? {}, section.suspiciousNos ?? [])
    setGrades((prev) => ({ ...prev, [section.key]: grade }))
    setBusy(section.key)
    const minutes = Math.max(1, Math.round((Date.now() - startedAt.current) / 60000))
    const res = await submitSectionAction({
      paperId,
      slug,
      section: section.part,
      total: grade.total,
      correct: grade.correct,
      detail: grade.detail,
      minutes,
    })
    setBusy(null)
    setToast(
      res.ok
        ? `${PART_META[section.part].short}已记录：${grade.correct}/${grade.total}，用时约 ${minutes} 分钟`
        : res.message,
    )
  }

  return (
    <div className="space-y-4">
      {toast && (
        <div className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs text-indigo-800">
          {toast}
        </div>
      )}

      {sections.map((section) => {
        const qs = sectionQuestions(section)
        const grade = grades[section.key]
        const answered = Object.keys(answers[section.key] ?? {}).length
        const wrong = grade ? mistakesOf(section, grade) : []

        return (
          <section key={section.key} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">{section.title}</h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  共 {qs.length} 题
                  {!grade && ` · 已作答 ${answered}`}
                  {grade && ` · 得分 ${grade.correct}/${grade.total}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {grade && wrong.length > 0 && (
                  <button
                    onClick={() => void saveMistakes(section, wrong)}
                    className="rounded-lg border border-amber-200 px-3 py-1.5 text-xs text-amber-700 hover:bg-amber-50"
                  >
                    全部 {wrong.length} 道错题加入错题本
                  </button>
                )}
                {grade ? (
                  <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-500">已提交</span>
                ) : (
                  <button
                    onClick={() => void submit(section)}
                    disabled={busy === section.key}
                    className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {busy === section.key ? "提交中…" : "提交本部分"}
                  </button>
                )}
              </div>
            </div>

            {section.hint && (
              <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-[11px] leading-relaxed text-amber-800">
                {section.hint}
              </p>
            )}

            {section.bank && (
              <div className="mb-3">
                <div className="mb-1 text-[11px] font-medium text-slate-500">词库（15 选 10）</div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(section.bank).map(([letter, word]) => (
                    <span
                      key={letter}
                      className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] text-slate-700"
                    >
                      <b className="text-slate-500">{letter})</b> {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {section.groups.map((group, gi) => (
              <div key={gi} className={gi > 0 ? "mt-4" : ""}>
                {group.label && (
                  <div className="mb-2 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                    {group.label}
                  </div>
                )}

                {group.material === "cloze" && group.text && (
                  <ClozePassage text={group.text} picks={answers[section.key] ?? {}} />
                )}
                {group.material === "letters" && group.text && (
                  <LetterPassage text={group.text} />
                )}
                {group.material === "paragraphs" && group.text && (
                  <NumberedPassage text={group.text} />
                )}

                <ol className="mt-3 space-y-2">
                  {group.questions.map((q) => (
                    <QuestionCard
                      key={q.no}
                      q={q}
                      section={section}
                      my={answers[section.key]?.[q.no] ?? ""}
                      grade={grade}
                      note={noteOf(section, q.no)}
                      onPick={(letter) => pick(section.key, q.no, letter)}
                      onSaveMistake={(item) => void saveMistakes(section, [item])}
                      savedState={saved[q.no]}
                      markSaved={() => setSaved((prev) => ({ ...prev, [q.no]: "saved" }))}
                    />
                  ))}
                </ol>
              </div>
            ))}
          </section>
        )
      })}
    </div>
  )
}

// ==================== 材料渲染 ====================

/** 选词填空短文：把空位画成小格子，实时显示已选的字母 */
function ClozePassage({ text, picks }: { text: string; picks: Record<number, string> }) {
  const tokens = useMemo(() => tokenizeClozePassage(text), [text])
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3 text-sm leading-7 text-slate-700">
      {tokens.map((t, i) =>
        t.kind === "text" ? (
          <span key={i}>{t.text}</span>
        ) : (
          <span
            key={i}
            title={`第 ${t.no} 空`}
            className={[
              "mx-0.5 inline-flex min-w-8 items-center justify-center rounded border px-1 align-middle text-xs font-medium",
              picks[t.no]
                ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                : "border-dashed border-slate-300 bg-white text-slate-400",
            ].join(" ")}
          >
            {t.no}.{picks[t.no] ?? "?"}
          </span>
        ),
      )}
    </div>
  )
}

/** 信息匹配长文：段落号是答案选项，必须显示出来 */
function LetterPassage({ text }: { text: string }) {
  const paras = useMemo(() => splitLetterParagraphs(text), [text])
  return (
    <div className="max-h-96 space-y-2 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50/60 p-3 text-sm leading-6 text-slate-700">
      {paras.map((p, i) => (
        <p key={i}>
          {p.letter && <b className="mr-1 text-indigo-600">{p.letter})</b>}
          {p.text}
        </p>
      ))}
    </div>
  )
}

/** 仔细阅读短文：按 P1 / P2 分段 */
function NumberedPassage({ text }: { text: string }) {
  const paras = useMemo(() => splitPassageParagraphs(text), [text])
  return (
    <div className="max-h-96 space-y-2 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50/60 p-3 text-sm leading-6 text-slate-700">
      {paras.map((p, i) => (
        <p key={i}>
          {p.letter && <b className="mr-1 text-slate-400">{p.letter}</b>}
          {p.text}
        </p>
      ))}
    </div>
  )
}

// ==================== 单题 ====================

type QuestionProps = {
  q: PaperQuestion
  section: QuizSection
  my: string
  grade?: SectionGrade
  note?: string
  onPick: (letter: string) => void
  onSaveMistake: (item: MistakeInput) => void
  savedState?: "saving" | "saved"
  markSaved: () => void
}

function QuestionCard({ q, section, my, grade, note, onPick, onSaveMistake, savedState, markSaved }: QuestionProps) {
  const detail = grade?.detail.find((d) => d.n === q.no)
  const right = detail ? detail.right : null
  const suspicious = section.suspiciousNos?.includes(q.no)
  const explain = explainEntries(section.part, q.explain)

  // 各题型的可选项：听力/阅读是 4 个选项，选词填空是 15 个词库字母，段落匹配是段落号
  const choices: string[] =
    section.part === "cloze"
      ? Object.keys(section.bank ?? {})
      : section.part === "matching"
        ? (section.paraLetters ?? q.paraOptions ?? [])
        : (q.options ?? []).map((_, i) => letterAt(i))

  return (
    <li
      className={[
        "rounded-lg border p-3",
        right === null ? "border-slate-200" : right ? "border-emerald-200 bg-emerald-50/30" : "border-rose-200 bg-rose-50/30",
      ].join(" ")}
    >
      <div className="flex items-start gap-2">
        <span className="mt-0.5 shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-600">
          {q.no}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-6 text-slate-800">{q.stem || "（本题源数据没有题干）"}</p>
          {q.stemZh && <p className="mt-0.5 text-xs text-slate-400">{q.stemZh}</p>}
          {q.anchor && <p className="mt-0.5 text-xs text-slate-400">提要：{q.anchor}</p>}
          {q.type && <span className="mt-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-500">{q.type}</span>}
          {note && (
            <p className="mt-1 rounded bg-amber-50 px-2 py-1 text-[11px] text-amber-800">{note}</p>
          )}
        </div>
        {right !== null && (
          <span
            className={[
              "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
              right ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
            ].join(" ")}
          >
            {right ? "正确" : detail?.my ? "错误" : "未作答"}
          </span>
        )}
        {suspicious && (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] text-amber-700">答案存疑</span>
        )}
      </div>

      {section.part === "cloze" ? (
        <div className="mt-2 flex flex-wrap items-center gap-1">
          <select
            value={my}
            disabled={Boolean(grade)}
            onChange={(e) => onPick(e.target.value)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs outline-none focus:border-indigo-400 disabled:bg-slate-50 disabled:text-slate-500"
          >
            <option value="">选择词库字母…</option>
            {(choices as string[]).map((letter) => (
              <option key={letter} value={letter}>
                {letter}) {section.bank?.[letter] ?? ""}
              </option>
            ))}
          </select>
          {detail && (
            <span className="text-xs text-slate-500">
              正确：
              <b className={right ? "text-emerald-600" : "text-rose-600"}>{answerLabel(q, detail.answer)}</b>
              {detail.my && !right && <span className="ml-2 text-slate-400">你选了 {answerLabel(q, detail.my)}</span>}
            </span>
          )}
        </div>
      ) : (
        <div className="mt-2 space-y-1">
          {choices.map((letter) => {
            const idx = letter.charCodeAt(0) - 65
            const raw = section.part === "matching" ? null : (q.options ?? [])[idx]
            const label = raw ? raw.replace(/^[A-O]\)\s*/, "").trim() : `${letter} 段`
            const zh = section.part === "listening" ? (q.optionsZh ?? [])[idx] : null
            const isMine = my === letter
            const isRight = detail?.answer === letter
            return (
              <button
                key={letter}
                onClick={() => onPick(letter)}
                disabled={Boolean(grade)}
                className={[
                  "flex w-full items-start gap-2 rounded-lg border px-2.5 py-1.5 text-left text-sm transition-colors",
                  grade
                    ? isRight
                      ? "border-emerald-300 bg-emerald-50"
                      : isMine
                        ? "border-rose-300 bg-rose-50"
                        : "border-slate-200"
                    : isMine
                      ? "border-indigo-400 bg-indigo-50"
                      : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50",
                ].join(" ")}
              >
                <span className="mt-0.5 shrink-0 text-[11px] font-medium text-slate-400">
                  {section.part === "matching" ? "段落" : letter}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-slate-700">{label}</span>
                  {/* 听力选项的中文只在交卷后显示，提前给会直接剧透答案 */}
                  {zh && grade && <span className="mt-0.5 block text-[11px] text-slate-400">{zh}</span>}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {suspicious && (
        <p className="mt-2 text-[11px] leading-relaxed text-amber-700">
          本题源数据的答案键为「{q.answer}」，超出了短文实际段落范围（
          {(section.paraLetters ?? []).join("")}），无法判定对错，因此不计入本部分得分。
        </p>
      )}

      {detail && (
        <div className="mt-3 border-t border-slate-200 pt-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-slate-600">
              正确答案：<b className="text-emerald-700">{answerLabel(q, detail.answer)}</b>
              {detail.my && (
                <span className="ml-2 text-slate-400">
                  我的答案：<b className={right ? "text-emerald-700" : "text-rose-600"}>{answerLabel(q, detail.my)}</b>
                </span>
              )}
            </span>
            {!right && (
              <button
                onClick={() => {
                  onSaveMistake({
                    part: section.part,
                    no: q.no,
                    stem: q.stem || `第 ${q.no} 题`,
                    stemZh: q.stemZh || undefined,
                    answer: answerLabel(q, detail.answer),
                    myAnswer: answerLabel(q, detail.my),
                    note: [q.type ? `题型：${q.type}` : "", q.explain?.定位 ? `定位：${q.explain.定位}` : ""]
                      .filter(Boolean)
                      .join("\n"),
                  })
                  markSaved()
                }}
                disabled={savedState === "saved"}
                className="shrink-0 rounded-lg border border-amber-200 px-2 py-1 text-[11px] text-amber-700 hover:bg-amber-50 disabled:opacity-60"
              >
                {savedState === "saved" ? "★ 已加错题本" : "☆ 加入错题本"}
              </button>
            )}
          </div>

          {explain.length > 0 && (
            <dl className="mt-2 space-y-1.5">
              {explain.map((e) => (
                <div key={e.label} className="rounded-lg bg-slate-50 px-2.5 py-2">
                  <dt className="mb-0.5 text-[11px] font-medium text-indigo-700">{e.label}</dt>
                  <dd className="text-xs leading-relaxed whitespace-pre-wrap text-slate-600">{e.text}</dd>
                </div>
              ))}
            </dl>
          )}
          {explain.length === 0 && <p className="mt-1 text-[11px] text-slate-400">本题源数据没有中文解析。</p>}
        </div>
      )}
    </li>
  )
}
