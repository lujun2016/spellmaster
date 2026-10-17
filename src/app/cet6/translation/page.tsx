import Link from "next/link"
import { buildTranslationDoc, paperTitle } from "@/components/cet6/translation/analysis"
import { db } from "@/lib/cet6/db"

export const dynamic = "force-dynamic"

type Row = {
  id: string
  slug: string
  label: string
  set: string
  translation: string | null
  translationReference: string | null
  subjective: string
}

/**
 * 真题翻译列表。
 *
 * 库里的 paper 有 74 条，但只有 46 条是「新格式 slug + 参考译文 + 逐句解析」的完整数据；
 * 另外 28 条是早期抓取残留（slug 形如 2021.06_第1套），没有参考译文，其中 12 条
 * 内容跟新格式完全重复。这里按「原文前 40 字」判重，重复的只保留可练的那一条，
 * 剩下的以「仅原文」折叠区列出，免得列表里一套题出现两遍。
 */
export default async function TranslationPage() {
  const [rows, practices, sentenceWords] = await Promise.all([
    db.paper.findMany({
      where: { translation: { not: null } },
      orderBy: [{ year: "desc" }, { month: "desc" }, { set: "asc" }],
      select: {
        id: true,
        slug: true,
        label: true,
        set: true,
        translation: true,
        translationReference: true,
        subjective: true,
      },
    }),
    db.studySession.groupBy({ by: ["note"], where: { kind: "translation" }, _count: { _all: true } }),
    db.word.count({ where: { sents: { not: "[]" } } }),
  ])

  const practiceByNote = new Map(practices.map((p) => [p.note ?? "", p._count._all]))
  const body = (r: Row) => (r.translation ?? "").replace(/\s+/g, "")

  // 按原文内容分组：每组保留「有参考译文的那条」当正本，其余进折叠区
  const byContent = new Map<string, Row[]>()
  for (const r of rows) {
    const text = body(r)
    if (!text) continue
    const key = text.slice(0, 40)
    const list = byContent.get(key)
    if (list) list.push(r)
    else byContent.set(key, [r])
  }
  const primary: Row[] = []
  const leftovers: Row[] = []
  for (const group of byContent.values()) {
    const best = group.find((r) => (r.translationReference ?? "").trim()) ?? group[0]
    primary.push(best)
    for (const r of group) if (r !== best) leftovers.push(r)
  }

  const items = primary.map((r) => {
    const doc = buildTranslationDoc({ subjective: r.subjective, translation: r.translation, reference: r.translationReference })
    const title = paperTitle(r.label, r.set)
    return {
      id: r.id,
      slug: r.slug,
      title,
      label: r.label,
      set: r.set,
      preview: (r.translation ?? "").replace(/\s+/g, " ").slice(0, 40),
      hasReference: doc.referenceEn.length > 0,
      unitCount: doc.units.length,
      chineseChars: doc.sourceZh.replace(/\s+/g, "").length,
      practiced: practiceByNote.get(title) ?? 0,
    }
  })

  const full = items.filter((i) => i.unitCount > 0)
  const plain = items.filter((i) => i.unitCount === 0)

  // 按「2026年6月」这样的考次分组，一组三套
  const groupBy = (list: typeof items) => {
    const groups: Array<{ label: string; items: typeof items }> = []
    for (const it of list) {
      const hit = groups.find((g) => g.label === it.label)
      if (hit) hit.items.push(it)
      else groups.push({ label: it.label, items: [it] })
    }
    return groups
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">翻译练习</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            素材全部来自真题：{full.length} 套带逐句解析 · {plain.length} 套仅原文 · 另有词库例句 {sentenceWords} 个词可抽
          </p>
        </div>
        <Link
          href="/cet6/translation/sentence"
          className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm text-indigo-700 hover:bg-indigo-100"
        >
          随机例句单句练习 →
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-[13px] leading-relaxed text-slate-500">
        写完点「提交并对照」，会得到三样东西：<b className="text-slate-700">规则自查清单</b>
        （词数比例、超长句、被动语态、数字量级、连接词、原文括注词——都是可判定的硬规则，
        界面上会写明「这是规则检查，不是评分」）、<b className="text-slate-700">参考译文</b>、
        以及<b className="text-slate-700">逐句对照</b>
        （主干 trunk / 降级处理 downgrade / 语法点 grammar / 目标句式）。
      </div>

      {groupBy(full).map((group) => (
        <div key={group.label} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/60 px-4 py-2">
            <span className="text-sm font-medium text-slate-700">{group.label}</span>
            <span className="rounded-full bg-white px-2 py-0.5 text-[11px] text-slate-500">{group.items.length} 套</span>
          </div>
          <ul className="divide-y divide-slate-100">
            {group.items.map((it) => (
              <li key={it.id}>
                <Link href={`/cet6/translation/${encodeURIComponent(it.slug)}`} className="block px-4 py-3 hover:bg-slate-50">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-slate-900">{it.set}</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
                      逐句解析 {it.unitCount} 句
                    </span>
                    <span className="text-[11px] text-slate-400">{it.chineseChars} 字</span>
                    {it.practiced > 0 && (
                      <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] text-indigo-700">
                        已练 {it.practiced} 次
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13px] text-slate-500">{it.preview}…</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {(plain.length > 0 || leftovers.length > 0) && (
        <details className="rounded-xl border border-slate-200 bg-white">
          <summary className="cursor-pointer select-none px-4 py-2.5 text-sm text-slate-500 hover:text-slate-800">
            另外 {plain.length + leftovers.length} 条只有中文原文（早期抓取的旧格式，没有参考译文与逐句解析）
          </summary>
          <ul className="divide-y divide-slate-100 border-t border-slate-100">
            {[...plain, ...leftovers.map((r) => ({
              id: r.id,
              slug: r.slug,
              label: r.label,
              set: r.set,
              preview: (r.translation ?? "").replace(/\s+/g, " ").slice(0, 40),
            }))].map((it) => (
              <li key={it.id}>
                <Link
                  href={`/cet6/translation/${encodeURIComponent(it.slug)}`}
                  className="block px-4 py-2.5 hover:bg-slate-50"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[13px]">
                    <span className="text-slate-700">
                      {it.label} {it.set}
                    </span>
                    <span className="text-[11px] text-slate-400">{it.slug}</span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-slate-400">{it.preview}…</p>
                </Link>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}
