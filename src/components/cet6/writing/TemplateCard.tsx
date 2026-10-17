import Link from "next/link"
import { StarButton } from "@/components/cet6/writing/StarButton"
import type { WritingTemplateDTO } from "@/lib/cet6/writing"

/**
 * 单个模板卡片。展开正文用原生 <details> 实现，这样卡片本身还是服务端组件，
 * 不用为了「折叠」把整棵树搬到客户端。
 */
export function TemplateCard({ item }: { item: WritingTemplateDTO }) {
  return (
    <div
      className={[
        "rounded-xl border bg-white",
        item.starred ? "border-amber-200 shadow-sm" : "border-slate-200",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium text-slate-900">{item.title}</h3>
            {item.starred && <span className="text-xs text-amber-600">★ 置顶</span>}
            {item.practiceCount > 0 && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
                已练 {item.practiceCount} 轮
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">{item.summary}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StarButton id={item.id} starred={item.starred} />
          <Link
            href={`/cet6/writing/${item.id}`}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
          >
            开始挖空
          </Link>
        </div>
      </div>

      <details className="group border-t border-slate-100">
        <summary className="cursor-pointer select-none px-4 py-2 text-sm text-slate-500 hover:text-slate-800">
          <span className="group-open:hidden">展开正文与 {item.phrases.length} 条句式</span>
          <span className="hidden group-open:inline">收起正文与句式</span>
        </summary>
        <div className="space-y-4 px-4 pb-4">
          {/* whitespace-pre-wrap 保留模板里的换行和缩进，否则整篇会被压成一坨 */}
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-3 font-sans text-[13px] leading-relaxed text-slate-700">
            {item.body}
          </pre>
          {item.phrases.length > 0 && (
            <div>
              <div className="mb-1.5 text-xs font-medium tracking-wide text-slate-400">
                重点句式（{item.phrases.length}）
              </div>
              <ul className="space-y-1.5">
                {item.phrases.map((p, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-medium text-slate-800">{p.en}</span>
                    <span className="ml-2 text-slate-500">{p.cn}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </details>
    </div>
  )
}
