"use client"

import { useState } from "react"

/**
 * 导出面板：选方向 / 格式 / 是否带答案，然后下载。
 *
 * 当前页面的搜索词和筛选条件会原样带过去 —— 你在页面上筛了「真题词」，导出的就是那批。
 */
export function ExportPanel({ q, filter, total }: { q: string; filter: string; total: number }) {
  const [dir, setDir] = useState<"en-zh" | "zh-en">("en-zh")
  const [format, setFormat] = useState<"xlsx" | "docx">("xlsx")
  const [answers, setAnswers] = useState(true)

  function download() {
    const p = new URLSearchParams()
    p.set("format", format)
    p.set("dir", dir)
    p.set("answers", answers ? "1" : "0")
    if (q) p.set("q", q)
    if (filter && filter !== "all") p.set("filter", filter)
    window.location.href = `/cet6/vocab/list/export?${p.toString()}`
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <div className="mb-1 text-[11px] text-slate-500">导出方向</div>
          <div className="flex overflow-hidden rounded-lg border border-slate-200 text-xs">
            {[
              ["en-zh", "英→中（认词）"],
              ["zh-en", "中→英（默写）"],
            ].map(([v, label]) => (
              <button
                key={v}
                onClick={() => setDir(v as "en-zh" | "zh-en")}
                className={["px-2.5 py-1.5", dir === v ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-500 hover:bg-slate-50"].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1 text-[11px] text-slate-500">格式</div>
          <div className="flex overflow-hidden rounded-lg border border-slate-200 text-xs">
            {[
              ["xlsx", "Excel"],
              ["docx", "Word"],
            ].map(([v, label]) => (
              <button
                key={v}
                onClick={() => setFormat(v as "xlsx" | "docx")}
                className={["px-2.5 py-1.5", format === v ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-500 hover:bg-slate-50"].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-1.5 pb-1 text-xs text-slate-600">
          <input type="checkbox" checked={answers} onChange={(e) => setAnswers(e.target.checked)} />
          带答案
        </label>

        <button
          onClick={download}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          导出 {total} 词
        </button>
        <span className="pb-1 text-[11px] text-slate-400">范围＝当前筛选结果</span>
      </div>
    </div>
  )
}
