"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react"
import { saveTranslationAttemptAction } from "@/app/cet6/translation/actions"
import { gradeSentenceAttempt, runChecks, type CheckItem, type CheckLevel } from "@/components/cet6/translation/checks"
import type { TranslationUnit } from "@/components/cet6/translation/analysis"

export type SessionProps = {
  title: string
  subtitle?: string
  /** 中文原文（整段）或单句的题干 */
  sourceZh: string
  referenceEn: string
  units: TranslationUnit[]
  /** 逐句解析条数与参考译文句数不一致时给个说明 */
  referenceSentenceCount: number
  refId?: string
  tags: string
  /** 单句模式：显示来源单词 */
  word?: string
  wordCn?: string
  /**
   * 落库用的标题。整段练习就用真题名字；单句练习题面是随机的，
   * 用固定标题会让错题本里一堆看不出区别的记录，所以单独给一个。
   */
  recordTitle?: string
  /** localStorage 草稿键，避免写了一半刷新丢掉 */
  draftKey: string
  backHref: string
  backLabel: string
}

const LEVEL_STYLE: Record<CheckLevel, { dot: string; text: string; label: string }> = {
  warn: { dot: "bg-rose-500", text: "text-rose-700", label: "需要检查" },
  pass: { dot: "bg-emerald-500", text: "text-emerald-700", label: "通过" },
  info: { dot: "bg-sky-400", text: "text-sky-700", label: "参考" },
}

/**
 * 翻译练习会话。
 *
 * 提交后给三样东西，没有「AI 评分」这种假东西：
 *  1. 规则自查清单（runChecks：词数比例、超长句、被动、数字、连接词、括注词……每条都写明触发原因）；
 *  2. 参考译文；
 *  3. 逐句对照（trunk 主干 / downgrade 降级 / grammar 语法 / 目标句式）。
 * 题干在挂载时冻结一份：保存记录会触发 revalidate，单句模式那边题干是随机抽的，
 * 不冻结的话用户刚对照完，题干就被服务端重算成另一句了。
 */
export function TranslationSession(props: SessionProps) {
  const [frozen] = useState(() => props)
  const mode: "passage" | "sentence" = frozen.word ? "sentence" : "passage"

  const [text, setText] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [saved, setSaved] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const startedAt = useRef(Date.now())

  // 草稿恢复：只读一次，之后由 onChange 写入
  useEffect(() => {
    try {
      const draft = window.localStorage.getItem(frozen.draftKey)
      if (draft) setText(draft)
    } catch {
      // 隐私模式下 localStorage 不可用，忽略即可
    }
  }, [frozen.draftKey])

  const onTextChange = useCallback(
    (v: string) => {
      setText(v)
      try {
        window.localStorage.setItem(frozen.draftKey, v)
      } catch {
        // 同上
      }
    },
    [frozen.draftKey],
  )

  const liveWords = useMemo(() => text.trim().split(/\s+/).filter(Boolean).length, [text])
  const suggestLow = Math.floor((frozen.sourceZh.match(/[\u4e00-\u9fa5]/g) ?? []).length * 0.6)

  const report = useMemo(
    () => (submitted ? runChecks({ sourceZh: frozen.sourceZh, userEn: text, referenceEn: frozen.referenceEn || undefined, mode }) : null),
    [frozen.referenceEn, frozen.sourceZh, mode, submitted, text],
  )

  const submit = useCallback(() => {
    if (submitted || pending || !text.trim()) return
    setSubmitted(true)
    const rep = runChecks({ sourceZh: frozen.sourceZh, userEn: text, referenceEn: frozen.referenceEn || undefined, mode })
    const grade =
      mode === "sentence" && frozen.referenceEn ? gradeSentenceAttempt(rep, frozen.referenceEn) : { correct: 0, wrong: 0 }
    const summary = [
      `${rep.words} 词 / ${rep.sentences} 句`,
      `规则检查：通过 ${rep.pass} · 需检查 ${rep.warn} · 参考 ${rep.info}`,
      rep.coverage !== undefined ? `词汇覆盖 ${rep.coverage}%` : "",
      rep.items.filter((i) => i.level === "warn").map((i) => i.label).join("；"),
    ]
      .filter(Boolean)
      .join(" | ")

    startTransition(async () => {
      const recordTitle = frozen.recordTitle ?? frozen.title
      try {
        const res = await saveTranslationAttemptAction({
          title: recordTitle,
          sourceZh: frozen.sourceZh,
          userEn: text,
          referenceEn: frozen.referenceEn || undefined,
          summary,
          minutes: Math.max(1, Math.round((Date.now() - startedAt.current) / 60000)),
          correct: grade.correct,
          wrong: grade.wrong,
          refId: frozen.refId,
          tags: frozen.tags,
          note: recordTitle,
        })
        setSaved(`已保存练习记录（${res.minutes} 分钟），并写入错题本`)
      } catch {
        setSaved("练习记录保存失败，界面上的对照结果不受影响")
      }
    })
  }, [frozen, mode, pending, submitted, text])

  const reset = useCallback(() => {
    onTextChange("")
    setSubmitted(false)
    setSaved(null)
    startedAt.current = Date.now()
  }, [onTextChange])

  const warnItems = report?.items.filter((i) => i.level === "warn") ?? []
  const passItems = report?.items.filter((i) => i.level === "pass") ?? []
  const infoItems = report?.items.filter((i) => i.level === "info") ?? []

  return (
    <div className="space-y-4">
      <div>
        <Link href={frozen.backHref} className="text-xs text-slate-400 hover:text-slate-600">
          ← {frozen.backLabel}
        </Link>
        <h1 className="mt-1 text-xl font-semibold text-slate-900">{frozen.title}</h1>
        {frozen.subtitle && <p className="mt-0.5 text-sm text-slate-500">{frozen.subtitle}</p>}
        {mode === "sentence" && frozen.word && (
          <div className="mt-1.5 text-xs text-slate-400">
            来源词条：<b className="text-slate-600">{frozen.word}</b>
            {submitted && frozen.wordCn && <span className="ml-2">{frozen.wordCn}</span>}
          </div>
        )}
      </div>

      {/* 中文原文 */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">中文原文</h2>
          <span className="text-xs text-slate-400">
            {(frozen.sourceZh.match(/[\u4e00-\u9fa5]/g) ?? []).length} 个汉字
          </span>
        </div>
        <p className="whitespace-pre-wrap font-serif text-[15px] leading-8 text-slate-800">{frozen.sourceZh}</p>
      </div>

      {/* 译文输入 */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-700">你的译文</h2>
          <span className="text-xs text-slate-400">
            {liveWords} 词
            {mode === "passage" && suggestLow > 0 && ` · 参考篇幅 ${suggestLow}+ 词`}
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit()
          }}
          disabled={submitted}
          rows={mode === "passage" ? 12 : 4}
          placeholder={mode === "passage" ? "在这里写出整段英文译文…（草稿会自动保留）" : "把这句话翻成英文…（草稿会自动保留）"}
          className="w-full resize-y rounded-lg border border-slate-200 p-3 font-serif text-[15px] leading-8 text-slate-800 outline-none focus:border-indigo-400 disabled:bg-slate-50"
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {!submitted ? (
            <>
              <button
                type="button"
                onClick={submit}
                disabled={pending || liveWords === 0}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 disabled:opacity-40"
              >
                提交并对照
              </button>
              <span className="text-xs text-slate-400">⌘/Ctrl + Enter 也可提交</span>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={reset}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                再写一遍
              </button>
              {saved && <span className="text-xs text-emerald-700">{saved}</span>}
              {pending && <span className="text-xs text-slate-400">正在保存…</span>}
            </>
          )}
        </div>
      </div>

      {report && (
        <>
          {/* 自查清单：明确声明是规则检查 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-700">自查清单</h2>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">
                这是规则检查，不是评分
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              每条都是能用词数统计和正则判定的硬规则（原文出现什么标记 → 译文里该有什么），
              不判断语义对错。通过项多不等于分数高，没通过的项才值得动手改。
            </p>

            {warnItems.length > 0 && (
              <ul className="mt-3 space-y-2">
                {warnItems.map((i) => (
                  <CheckRow key={i.id} item={i} />
                ))}
              </ul>
            )}
            {warnItems.length === 0 && (
              <p className="mt-3 text-sm text-emerald-700">没有触发任何「需要检查」的规则。</p>
            )}

            {(passItems.length > 0 || infoItems.length > 0) && (
              <details className="mt-3">
                <summary className="cursor-pointer select-none text-xs text-slate-400 hover:text-slate-600">
                  展开其余 {passItems.length + infoItems.length} 项（通过 {passItems.length} · 参考 {infoItems.length}）
                </summary>
                <ul className="mt-2 space-y-2">
                  {[...passItems, ...infoItems].map((i) => (
                    <CheckRow key={i.id} item={i} />
                  ))}
                </ul>
              </details>
            )}
          </div>

          {/* 参考译文 */}
          {frozen.referenceEn && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-baseline justify-between">
                <h2 className="text-sm font-semibold text-slate-700">参考译文</h2>
                <span className="text-xs text-slate-400">{frozen.referenceSentenceCount} 句</span>
              </div>
              <p className="whitespace-pre-wrap font-serif text-[15px] leading-8 text-slate-800">{frozen.referenceEn}</p>
            </div>
          )}

          {/* 逐句对照 */}
          {frozen.units.length > 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-sm font-semibold text-slate-700">逐句对照（{frozen.units.length} 句）</h2>
                <span className="text-xs text-slate-400">主干 / 降级处理 / 语法点 / 目标句式</span>
              </div>
              <ol className="space-y-3">
                {frozen.units.map((u) => (
                  <li key={u.no} className="rounded-lg bg-slate-50 p-3">
                    <div className="flex items-baseline gap-2">
                      <span className="rounded bg-white px-1.5 py-0.5 text-[11px] text-slate-500">第 {u.no} 句</span>
                      {u.zh && <span className="text-[13px] text-slate-600">{u.zh}</span>}
                    </div>
                    {u.en && (
                      <p className="mt-2 font-serif text-[15px] leading-7 text-slate-900">
                        <span className="mr-1.5 text-[11px] text-emerald-600">目标句式</span>
                        {u.en}
                      </p>
                    )}
                    <dl className="mt-2 space-y-1.5 text-[13px] leading-7 text-slate-600">
                      {u.trunk && <Explain term="主干" text={u.trunk} />}
                      {u.downgrade && <Explain term="降级" text={u.downgrade} />}
                      {u.grammar && <Explain term="语法" text={u.grammar} />}
                    </dl>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
              这套题没有逐句解析数据（只有原文{!frozen.referenceEn && "、也没有参考译文"}），
              所以只跑规则自查。逐句解析集中在 2020-07 ~ 2026-06 的 46 套里。
            </div>
          )}
        </>
      )}
    </div>
  )
}

function CheckRow({ item }: { item: CheckItem }) {
  const style = LEVEL_STYLE[item.level]
  return (
    <li className="flex gap-2 text-sm">
      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
      <span className="min-w-0">
        <span className={`font-medium ${style.text}`}>{item.label}</span>
        <span className="ml-1.5 text-[11px] text-slate-400">{style.label}</span>
        <span className="mt-0.5 block text-[13px] leading-6 text-slate-600">{item.detail}</span>
      </span>
    </li>
  )
}

function Explain({ term, text }: { term: string; text: string }) {
  return (
    <div>
      <dt className="inline rounded bg-white px-1.5 py-0.5 text-[11px] text-indigo-600">{term}</dt>
      <dd className="mt-0.5 whitespace-pre-wrap">{text}</dd>
    </div>
  )
}
