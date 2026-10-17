import Link from "next/link"
import { AddItemForm } from "@/components/cet6/notebook/AddItemForm"
import { NotebookItemCard } from "@/components/cet6/notebook/NotebookItemCard"
import { NOTEBOOK_KINDS, toNotebookCard, type NotebookCard } from "@/components/cet6/notebook/types"
import { db } from "@/lib/cet6/db"
import { listNotebook } from "@/lib/cet6/service"

export const dynamic = "force-dynamic"

/** 一次最多渲染这么多条，剩下的提示用筛选缩小范围（个人工具，不做分页翻页） */
const LIMIT = 200

type Filter = { kind: string; source: string; due: boolean }

function parseFilter(sp: { kind?: string; source?: string; due?: string }): Filter {
  const kind = NOTEBOOK_KINDS.find((k) => k.value === sp.kind)?.value ?? ""
  return { kind, source: (sp.source ?? "").trim(), due: sp.due === "1" }
}

/** 拼筛选查询串；空值不写进 URL，保证链接干净、可分享 */
function buildQuery(f: Partial<Filter>): string {
  const p = new URLSearchParams()
  if (f.kind) p.set("kind", f.kind)
  if (f.source) p.set("source", f.source)
  if (f.due) p.set("due", "1")
  const s = p.toString()
  return s ? `?${s}` : ""
}

/**
 * 错题本 / 生词本。
 *
 * 这里既是「收藏夹」（看得见、能手工补录、能导出），也是「复习队列」（到期后进卡片流）。
 * 两种用法共用同一批数据，靠 dueAt 区分，所以筛选里特意留了「今天到期」这一档。
 */
export default async function NotebookPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; source?: string; due?: string }>
}) {
  const filter = parseFilter(await searchParams)

  const [items, dueCount, kindCounts, sourceCounts] = await Promise.all([
    listNotebook({ kind: filter.kind || undefined, source: filter.source || undefined, dueOnly: filter.due }),
    listNotebook({ kind: filter.kind || undefined, source: filter.source || undefined, dueOnly: true }),
    db.notebookItem.groupBy({ by: ["kind"], _count: { _all: true } }),
    db.notebookItem.groupBy({ by: ["source"], _count: { _all: true } }),
  ])

  const total = kindCounts.reduce((s, r) => s + r._count._all, 0)
  const kindCount = (k: string) => kindCounts.find((r) => r.kind === k)?._count._all ?? 0
  const cards: NotebookCard[] = items.slice(0, LIMIT).map((row) => toNotebookCard(row))
  const sources = sourceCounts.map((r) => r.source).sort((a, b) => a.localeCompare(b, "zh"))
  const active = Boolean(filter.kind || filter.source || filter.due)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">错题本 / 生词本</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            共 {total} 条{active && ` · 当前筛选 ${items.length} 条`} · 今天到期 {dueCount.length} 条
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/cet6/notebook/review"
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            开始复习{dueCount.length > 0 && `（${dueCount.length}）`}
          </Link>
          <a
            href="/cet6/notebook/export"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            导出 Markdown
          </a>
        </div>
      </div>

      {/* 类型快捷筛选：带条数，一眼看出攒了什么 */}
      <div className="flex flex-wrap items-center gap-1.5">
        <Link
          href={`/cet6/notebook${buildQuery({ source: filter.source, due: filter.due })}`}
          className={[
            "rounded-lg px-2.5 py-1.5 text-xs",
            !filter.kind ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-500 hover:bg-slate-100",
          ].join(" ")}
        >
          全部 {total}
        </Link>
        {NOTEBOOK_KINDS.map((k) => (
          <Link
            key={k.value}
            href={`/cet6/notebook${buildQuery({ kind: k.value, source: filter.source, due: filter.due })}`}
            className={[
              "rounded-lg px-2.5 py-1.5 text-xs",
              filter.kind === k.value ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-500 hover:bg-slate-100",
            ].join(" ")}
          >
            {k.label} {kindCount(k.value)}
          </Link>
        ))}
        <Link
          href={`/cet6/notebook${buildQuery({ kind: filter.kind, source: filter.source, due: !filter.due })}`}
          className={[
            "rounded-lg px-2.5 py-1.5 text-xs",
            filter.due ? "bg-rose-50 font-medium text-rose-700" : "text-slate-500 hover:bg-slate-100",
          ].join(" ")}
        >
          今天到期 {dueCount.length}
        </Link>
      </div>

      {/* 来源筛选用表单提交，纯服务端渲染，不依赖 JS */}
      <form action="/cet6/notebook" className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3">
        {filter.kind && <input type="hidden" name="kind" value={filter.kind} />}
        <label className="text-xs text-slate-500">
          来源
          <select
            name="source"
            defaultValue={filter.source}
            className="ml-1 rounded-lg border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-indigo-400"
          >
            <option value="">全部来源</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}（{sourceCounts.find((r) => r.source === s)?._count._all ?? 0}）
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1.5 text-sm text-slate-600">
          <input type="checkbox" name="due" value="1" defaultChecked={filter.due} />
          只看今天到期
        </label>
        <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-700">筛选</button>
        {active && (
          <Link href="/cet6/notebook" className="text-xs text-slate-400 hover:text-slate-600">
            清除筛选
          </Link>
        )}
      </form>

      <AddItemForm />

      <div className="space-y-3">
        {cards.map((c) => (
          <NotebookItemCard key={c.id} item={c} />
        ))}
        {!cards.length && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center">
            <p className="text-sm text-slate-500">
              {active ? "这个筛选条件下没有条目" : "错题本还是空的"}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              词汇复习卡片上的「☆ 收藏」、真题/阅读里的错题都会进这里，也可以手工添加。
            </p>
          </div>
        )}
        {items.length > LIMIT && (
          <p className="text-center text-xs text-slate-400">
            仅显示最近 {LIMIT} 条（共 {items.length} 条），用上面的筛选缩小范围，或导出 Markdown 全量查看。
          </p>
        )}
      </div>
    </div>
  )
}
