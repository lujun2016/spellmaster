import Link from "next/link"
import { GenerateEssayButton } from "@/components/cet6/writing/GenerateEssayButton"
import { TemplateCard } from "@/components/cet6/writing/TemplateCard"
import { getWritingOverview, listTemplates } from "@/lib/cet6/writing"
import { getTodayWriting, listWritingHistory, type TopicType } from "@/lib/cet6/writing-gen"

export const dynamic = "force-dynamic"

/**
 * 写作模板库：13 个模板按 5 个分类铺开，收藏的置顶。
 * 展示只是入口，「开始挖空」才是主路径——所以每张卡片的按钮比正文更显眼。
 */
export default async function WritingPage() {
  const [{ sections, total, starredCount }, overview, today, history] = await Promise.all([
    listTemplates(),
    getWritingOverview(),
    getTodayWriting(),
    listWritingHistory(20),
  ])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">写作模板</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            共 {total} 个模板 · {sections.length} 个分类 · 收藏 {starredCount} 个 · 累计练习 {overview.practiceCount} 轮
            {overview.minutes > 0 && ` / ${overview.minutes} 分钟`}
          </p>
        </div>
        <p className="max-w-sm text-xs leading-relaxed text-slate-400">
          背诵模式会按轮次把模板里的连接词、句型和「中文标签：英文表达」挖空。
          每提交一次就换一组空，同一个模板多练几轮能把整篇覆盖完。
        </p>
      </div>

      {/* 每日范文生成 */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">今日范文</h2>
            <p className="mt-0.5 text-xs text-slate-400">
              按题型自动套骨架：有配大模型就用 AI 写新范文，没配就回退到库内真题范文（页面会标明来源）
            </p>
          </div>
          <GenerateEssayButton hasToday={Boolean(today)} />
        </div>

        {today ? (
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700">{today.topicType}</span>
              <span className={today.source === "llm" ? "text-emerald-600" : "text-amber-600"}>
                {today.source === "llm" ? "AI 生成" : "库内真题范文"}
              </span>
              {today.refSlug && <span className="text-slate-400">出自 {today.refSlug}</span>}
            </div>

            <div>
              <div className="mb-1 text-xs font-medium text-slate-400">题目</div>
              <p className="text-sm leading-relaxed text-slate-700">{today.prompt}</p>
            </div>

            <div>
              <div className="mb-1 text-xs font-medium text-slate-400">范文</div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">{today.essay}</p>
            </div>

            <div className="rounded-lg bg-amber-50/60 p-4">
              <div className="mb-2 text-xs font-medium text-amber-900">
                挖空骨架 —— 每空旁标了这句话在回应题目的哪个部分
              </div>
              <ol className="space-y-2">
                {today.skeleton.map((seg, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 w-24 shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-center text-[11px] font-medium text-amber-900">
                      {seg.label}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-slate-800">{seg.en}</p>
                      <p className="text-[11px] text-slate-500">→ {seg.hint}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-400">
            今天还没有范文。点右上角「生成今日范文」—— 没配大模型 key 也能用（回退到库内真题范文）。
          </p>
        )}

        {history.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-3">
            <div className="mb-2 text-xs font-medium text-slate-400">历史范文</div>
            <ul className="grid gap-1 sm:grid-cols-2">
              {history.map((h) => (
                <li key={h.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-xs">
                  <span className="text-slate-700">{h.date} · {h.topicType}</span>
                  <span className={h.source === "llm" ? "text-emerald-600" : "text-amber-600"}>
                    {h.source === "llm" ? "AI" : "库内"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {sections.map((section) => (
        <section key={section.category} className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold tracking-wide text-slate-700">{section.category}</h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
              {section.items.length}
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          {section.items.map((item) => (
            <TemplateCard key={item.id} item={item} />
          ))}
        </section>
      ))}

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
        <div className="font-medium text-slate-700">怎么用</div>
        <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[13px]">
          <li>先点「展开正文」通读一遍，把 {`{占位符}`} 想清楚自己要写什么内容。</li>
          <li>再点「开始挖空」默写：灰底【】是占位符提示，不计分；下划线输入框才是要默写的句式。</li>
          <li>交卷后逐空标对错，正确率低于 60% 的模板会自动记一条到错题本。</li>
        </ul>
        <div className="mt-2 text-[13px]">
          需要整篇成文？去看{" "}
          <Link href="/cet6/papers" className="text-indigo-600 hover:underline">
            真题练习
          </Link>{" "}
          里的范文与逐段思路。
        </div>
      </div>
    </div>
  )
}
