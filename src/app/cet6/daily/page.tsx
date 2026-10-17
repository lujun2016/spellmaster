import Link from "next/link"
import { DailyReader } from "@/components/cet6/DailyReader"
import { getArticleByDate, listArticles } from "@/lib/cet6/daily"
import { localDateKey } from "@/lib/cet6/service"
import { getLlmConfig } from "@/lib/cet6/llm"
import { GenerateButton } from "@/components/cet6/daily/GenerateButton"

export const dynamic = "force-dynamic"

/**
 * 每日精读。
 *
 * 内容来自中国日报双语栏目（该栏目更新慢，见 daily.ts 注释：按天轮换未读文章）。
 * 页面上会如实显示这篇是"纯本地规则版"还是"LLM 增强版"，以及音频来源。
 */
export default async function DailyPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const sp = await searchParams
  const date = sp.date ?? localDateKey()
  const [article, history, llm] = await Promise.all([getArticleByDate(date), listArticles(20), getLlmConfig()])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">每日精读</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            一篇中英对照文章：跟读听力、挑生词、做理解题和翻译。素材来自中国日报双语栏目。
          </p>
        </div>
        <div className="text-right">
          <GenerateButton hasArticle={Boolean(article)} />
          <p className="mt-2 text-[11px] text-slate-400">
            {llm.ready
              ? `已配置大模型（${llm.provider || "自定义"} · ${llm.model}），生成时会自动补生词讲解和理解题`
              : "未配置大模型 key：生词表用本地词库匹配，题目用规则生成（设置页可以填免费 key 增强）"}
          </p>
        </div>
      </div>

      {article ? (
        <DailyReader article={article} />
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-slate-900">今天还没有内容</h2>
          <p className="mt-1 text-sm text-slate-500">
            点右上角「生成今日内容」抓一篇双语文章。没配大模型 key 也能用：生词表靠本地词库匹配，
            题目靠规则生成（选词填空 + 翻译）。
          </p>
        </div>
      )}

      {history.length > 0 && (
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">读过的文章</h2>
          <ul className="divide-y divide-slate-100">
            {history.map((h) => (
              <li key={h.date} className="flex items-center justify-between gap-3 py-2 text-sm">
                <div className="min-w-0">
                  <Link href={`/cet6/daily?date=${h.date}`} className="font-medium text-slate-800 hover:text-indigo-600">
                    {h.title}
                  </Link>
                  <div className="text-[11px] text-slate-400">
                    {h.date} · 生词 {h.vocabCount} · 题目 {h.quizCount} · {h.generatedBy}
                  </div>
                </div>
                {h.date === date && <span className="shrink-0 text-[11px] text-indigo-600">当前</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
