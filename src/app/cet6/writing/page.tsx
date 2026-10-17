import Link from "next/link"
import { TemplateCard } from "@/components/cet6/writing/TemplateCard"
import { getWritingOverview, listTemplates } from "@/lib/cet6/writing"

export const dynamic = "force-dynamic"

/**
 * 写作模板库：13 个模板按 5 个分类铺开，收藏的置顶。
 * 展示只是入口，「开始挖空」才是主路径——所以每张卡片的按钮比正文更显眼。
 */
export default async function WritingPage() {
  const [{ sections, total, starredCount }, overview] = await Promise.all([listTemplates(), getWritingOverview()])

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
