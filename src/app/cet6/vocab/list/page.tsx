import Link from "next/link"
import { ExportPanel } from "@/components/cet6/ExportPanel"
import { SaveWordButton } from "@/components/cet6/SaveWordButton"
import { db } from "@/lib/cet6/db"
import { readTrans } from "@/lib/cet6/json"

export const dynamic = "force-dynamic"

const PAGE_SIZE = 50

type Filter = "all" | "new" | "learning" | "mastered" | "exam"

const FILTERS: Array<{ key: Filter; label: string }> = [
  { key: "all", label: "全部" },
  { key: "exam", label: "真题词" },
  { key: "new", label: "未学" },
  { key: "learning", label: "学习中" },
  { key: "mastered", label: "已掌握" },
]

function buildWhere(filter: Filter, q: string) {
  const where: Record<string, unknown> = {}
  if (q) where.text = { contains: q }
  switch (filter) {
    case "exam":
      where.freq = { gt: 0 }
      break
    case "new":
      where.progress = { is: null }
      break
    case "learning":
      where.progress = { isNot: null }
      break
    case "mastered":
      where.progress = { is: { OR: [{ recallLv: { gte: 4 } }, { spellLv: { gte: 4 } }] } }
      break
    default:
      break
  }
  return where
}

/** 全词库浏览：查词、按状态筛选、翻页、随手收藏 */
export default async function WordListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; filter?: string; page?: string }>
}) {
  const sp = await searchParams
  const q = (sp.q ?? "").trim()
  const filter = (FILTERS.find((f) => f.key === sp.filter)?.key ?? "all") as Filter
  const page = Math.max(1, Number(sp.page ?? 1) || 1)

  const where = buildWhere(filter, q)
  const [total, rows] = await Promise.all([
    db.word.count({ where }),
    db.word.findMany({
      where,
      include: { progress: true },
      orderBy: { rank: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ])
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  /** 拼查询串：切换筛选时回到第 1 页，翻页时保留筛选和搜索词 */
  const link = (patch: { filter?: Filter; page?: number } = {}) => {
    const nextFilter = patch.filter ?? filter
    const nextPage = patch.page ?? page
    const p = new URLSearchParams()
    if (q) p.set("q", q)
    if (nextFilter !== "all") p.set("filter", nextFilter)
    if (nextPage > 1) p.set("page", String(nextPage))
    const s = p.toString()
    return `/cet6/vocab/list${s ? `?${s}` : ""}`
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">全词库</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          共 {total} 词（当前筛选）· 按真题出现频次排序，真题词排在最前
        </p>
      </div>

      <form action="/cet6/vocab/list" className="flex flex-wrap items-center gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="搜索单词…"
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-indigo-400"
        />
        {filter !== "all" && <input type="hidden" name="filter" value={filter} />}
        <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-700">搜索</button>
        <div className="flex flex-wrap gap-1">
          {FILTERS.map((f) => (
            <Link
              key={f.key}
              href={link({ filter: f.key, page: 1 })}
              className={[
                "rounded-lg px-2.5 py-1.5 text-xs",
                f.key === filter ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-500 hover:bg-slate-100",
              ].join(" ")}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </form>

      <ExportPanel q={q} filter={filter} total={total} />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500">
            <tr>
              <th className="px-3 py-2 font-medium">单词</th>
              <th className="px-3 py-2 font-medium">释义</th>
              <th className="hidden px-3 py-2 font-medium sm:table-cell">真题</th>
              <th className="px-3 py-2 font-medium">掌握</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {rows.map((w) => {
              const trans = readTrans(w.trans)
              const lv = Math.max(w.progress?.recallLv ?? 0, w.progress?.spellLv ?? 0)
              return (
                <tr key={w.id} className="border-t border-slate-100">
                  <td className="px-3 py-2">
                    <div className="font-medium text-slate-900">{w.text}</div>
                    <div className="text-[11px] text-slate-400">{w.usPhone || w.ukPhone || ""}</div>
                  </td>
                  <td className="px-3 py-2 text-slate-600">
                    {trans
                      .slice(0, 2)
                      .map((t) => `${t.pos ? t.pos + ". " : ""}${t.cn}`)
                      .join("；")}
                  </td>
                  <td className="hidden px-3 py-2 text-xs text-slate-400 sm:table-cell">
                    {w.freq > 0 ? `${w.freq} 次` : "—"}
                  </td>
                  <td className="px-3 py-2">
                    <span className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <span
                          key={i}
                          className={["h-1.5 w-1.5 rounded-full", i < lv ? "bg-indigo-500" : "bg-slate-200"].join(" ")}
                        />
                      ))}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <SaveWordButton wordId={w.id} />
                  </td>
                </tr>
              )
            })}
            {!rows.length && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-sm text-slate-400">
                  没有匹配的词
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <Link
            href={link({ page: Math.max(1, page - 1) })}
            className={["rounded-lg px-3 py-1.5", page <= 1 ? "pointer-events-none text-slate-300" : "text-slate-600 hover:bg-slate-100"].join(" ")}
          >
            上一页
          </Link>
          <span className="text-xs text-slate-400">
            第 {page} / {pages} 页
          </span>
          <Link
            href={link({ page: Math.min(pages, page + 1) })}
            className={[
              "rounded-lg px-3 py-1.5",
              page >= pages ? "pointer-events-none text-slate-300" : "text-slate-600 hover:bg-slate-100",
            ].join(" ")}
          >
            下一页
          </Link>
        </div>
      )}
    </div>
  )
}
