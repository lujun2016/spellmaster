"use client"

/**
 * 写作部分：题干 + 自己写 + 看范文。
 *
 * 范文默认收起来（先自己写再对照才有意义），点开才显示 model / modelZh / 逐段大纲。
 * 草稿只存在浏览器本地，不上传——这是自用工具，不需要服务端存作文。
 */
import { useState } from "react"
import type { WritingOutline } from "@/lib/cet6/paper-shared"
import { useLocalDraft } from "./useLocalDraft"

type Props = {
  slug: string
  directions: string | null
  model: string | null
  modelZh: string | null
  outline: WritingOutline[]
}

/** 六级作文要求 150–200 词，按空格粗算就够用了 */
function countWords(text: string) {
  const t = text.trim()
  if (!t) return 0
  return t.split(/\s+/).length
}

export function PaperWriting({ slug, directions, model, modelZh, outline }: Props) {
  const [showModel, setShowModel] = useState(false)
  const { draft, setDraft, clear } = useLocalDraft(`cet6:writing-draft:${slug}`)
  const words = countWords(draft)

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="mb-2 text-sm font-semibold text-slate-900">作文题干</h2>
        {directions ? (
          <p className="text-sm leading-7 whitespace-pre-wrap text-slate-700">{directions}</p>
        ) : (
          <p className="text-sm text-slate-400">这套真题的作文题干缺失。</p>
        )}
        <p className="mt-2 text-[11px] text-slate-400">建议 30 分钟，150–200 词。</p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900">我的作文</h2>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className={words >= 150 && words <= 200 ? "text-emerald-600" : ""}>{words} 词</span>
            {draft && (
              <button onClick={clear} className="hover:text-slate-600">
                清空
              </button>
            )}
          </div>
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={12}
          placeholder="在这里写，草稿会自动存在本机浏览器里…"
          className="w-full resize-y rounded-lg border border-slate-200 p-3 text-sm leading-7 outline-none focus:border-indigo-400"
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900">参考范文</h2>
          <button
            onClick={() => setShowModel((v) => !v)}
            className={[
              "rounded-lg px-3 py-1.5 text-xs font-medium",
              showModel ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-indigo-600 text-white hover:bg-indigo-700",
            ].join(" ")}
          >
            {showModel ? "收起范文" : "看范文"}
          </button>
        </div>

        {showModel && (
          <div className="mt-3 space-y-3">
            {model ? (
              <div>
                <div className="mb-1 text-[11px] font-medium text-indigo-700">英文范文</div>
                <p className="rounded-lg bg-slate-50 p-3 text-sm leading-7 whitespace-pre-wrap text-slate-700">{model}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-400">这套真题没有范文。</p>
            )}

            {modelZh && (
              <div>
                <div className="mb-1 text-[11px] font-medium text-indigo-700">范文中文说明</div>
                <p className="rounded-lg bg-slate-50 p-3 text-sm leading-7 whitespace-pre-wrap text-slate-700">{modelZh}</p>
              </div>
            )}

            {outline.length > 0 && (
              <div>
                <div className="mb-1 text-[11px] font-medium text-indigo-700">逐段怎么写的</div>
                <ol className="space-y-1.5">
                  {outline.map((o) => (
                    <li key={o.no} className="rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">
                      <b className="mr-1 text-slate-500">第 {o.no} 段</b>
                      {o.text}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
