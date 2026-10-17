"use client"

/**
 * 翻译部分：中文原文 + 自己译 + 对照参考译文。
 *
 * 参考译文默认隐藏（先自己翻再对照）。除了整段参考译文，源数据里还有逐句拆解
 * （主干 / 降级处理 / 语法点 / 参考译文），那是这套题库里质量最高的部分之一，
 * 所以也放进来，折叠在「逐句拆解」里按需展开。
 */
import { useState } from "react"
import { TRANSLATION_SENTENCE_FIELDS, type TranslationSentence } from "@/lib/cet6/paper-shared"
import { useLocalDraft } from "./useLocalDraft"

type Props = {
  slug: string
  source: string | null
  reference: string | null
  sentences: TranslationSentence[]
}

export function PaperTranslation({ slug, source, reference, sentences }: Props) {
  const [showRef, setShowRef] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const { draft, setDraft, clear } = useLocalDraft(`cet6:translation-draft:${slug}`)

  return (
    <div className="space-y-4">
      {/* 两处翻译入口的分工：这里是在真题流程里顺手译一遍，专项页才有逐句对照和规则自查 */}
      <div className="rounded-lg bg-slate-50 px-3 py-2 text-[11px] leading-relaxed text-slate-500">
        这里是在做整套真题时顺手练一遍翻译（草稿自动保存）。
        想要「逐句对照 + 规则自查清单 + 从词库随机抽句」的专项训练，去{" "}
        <a href={`/cet6/translation/${slug}`} className="text-indigo-600 hover:underline">
          翻译专项练习 →
        </a>
      </div>
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-2 text-sm font-semibold text-slate-900">中文原文</h2>
        {source ? (
          <p className="text-sm leading-7 whitespace-pre-wrap text-slate-700">{source}</p>
        ) : (
          <p className="text-sm text-slate-400">这套真题的翻译原文缺失。</p>
        )}
        <p className="mt-2 text-[11px] text-slate-400">建议 30 分钟，先把整段译完再对答案。</p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900">我的译文</h2>
          {draft && (
            <button onClick={clear} className="text-[11px] text-slate-400 hover:text-slate-600">
              清空
            </button>
          )}
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={8}
          placeholder="在这里翻译，草稿会自动存在本机浏览器里…"
          className="w-full resize-y rounded-lg border border-slate-200 p-3 text-sm leading-7 outline-none focus:border-indigo-400"
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900">参考译文</h2>
          <div className="flex items-center gap-2">
            {sentences.length > 0 && (
              <button
                onClick={() => setShowBreakdown((v) => !v)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
              >
                {showBreakdown ? "收起逐句拆解" : `逐句拆解（${sentences.length} 句）`}
              </button>
            )}
            <button
              onClick={() => setShowRef((v) => !v)}
              className={[
                "rounded-lg px-3 py-1.5 text-xs font-medium",
                showRef ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-indigo-600 text-white hover:bg-indigo-700",
              ].join(" ")}
            >
              {showRef ? "隐藏参考译文" : "对照参考译文"}
            </button>
          </div>
        </div>

        {showRef && (
          <div className="mt-3">
            {reference ? (
              <p className="rounded-lg bg-slate-50 p-3 text-sm leading-7 whitespace-pre-wrap text-slate-700">{reference}</p>
            ) : (
              <p className="text-sm text-slate-400">这套真题没有参考译文。</p>
            )}
          </div>
        )}

        {showBreakdown && sentences.length > 0 && (
          <div className="mt-3 space-y-2">
            {sentences.map((s, i) => (
              <div key={i} className="rounded-lg border border-slate-200 p-3">
                <div className="mb-1.5 text-[11px] font-medium text-slate-500">第 {i + 1} 句</div>
                <dl className="space-y-1.5">
                  {TRANSLATION_SENTENCE_FIELDS.map((f) => {
                    const text = s[f.key]
                    if (!text || !text.trim()) return null
                    return (
                      <div key={f.key} className="rounded bg-slate-50 px-2.5 py-1.5">
                        <dt className="mb-0.5 text-[11px] font-medium text-indigo-700">{f.label}</dt>
                        <dd className="text-xs leading-relaxed whitespace-pre-wrap text-slate-600">{text}</dd>
                      </div>
                    )
                  })}
                </dl>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
