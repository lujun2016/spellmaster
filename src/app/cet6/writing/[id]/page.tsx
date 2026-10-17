import Link from "next/link"
import { notFound } from "next/navigation"
import { ClozeSession } from "@/components/cet6/writing/ClozeSession"
import { StarButton } from "@/components/cet6/writing/StarButton"
import { buildCloze } from "@/components/cet6/writing/cloze"
import { getTemplate } from "@/lib/cet6/writing"

export const dynamic = "force-dynamic"

/**
 * 模板背诵页（挖空默写）。
 *
 * 轮次来源：默认用「这个模板已练习次数」（服务端算，SSR 稳定），
 * 也允许 ?round=N 手动挑某一组空——换组是纯查询参数，不依赖随机数。
 * 客户端组件的 key 只跟 URL 上的 round 有关：交卷后练习次数变了但 key 不变，
 * 于是本次的对错结果不会被服务端重算出来的新轮次冲掉。
 */
export default async function WritingPracticePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ round?: string }>
}) {
  const [{ id }, sp] = await Promise.all([params, searchParams])
  const tpl = await getTemplate(id)
  if (!tpl) notFound()

  const parsed = sp.round !== undefined ? Number(sp.round) : NaN
  const manualRound = Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : null
  const round = manualRound ?? tpl.practiceCount
  const exercise = buildCloze(tpl.body, round)
  const activeGroup = exercise.rounds > 0 ? exercise.round % exercise.rounds : 0

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href="/cet6/writing" className="text-xs text-slate-400 hover:text-slate-600">
            ← 写作模板
          </Link>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">{tpl.title}</h1>
          <p className="mt-0.5 text-sm text-slate-500">{tpl.summary}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">{tpl.category}</span>
            <span>已练 {tpl.practiceCount} 轮</span>
            <span>本轮 {exercise.total} 个空</span>
            {exercise.rounds > 1 && <span>共 {exercise.rounds} 组空轮换</span>}
          </div>
        </div>
        <StarButton id={tpl.id} starred={tpl.starred} size="lg" />
      </div>

      {/* 换一组空：手动切换轮次组，跟交卷后自动推进的轮次是同一套编号 */}
      {exercise.rounds > 1 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400">换一组空：</span>
          {Array.from({ length: exercise.rounds }, (_, r) => (
            <Link
              key={r}
              href={`/cet6/writing/${tpl.id}?round=${r}`}
              className={[
                "rounded-lg px-2.5 py-1",
                r === activeGroup ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-500 hover:bg-slate-100",
              ].join(" ")}
            >
              第 {r + 1} 组
            </Link>
          ))}
        </div>
      )}

      <ClozeSession
        key={manualRound === null ? "auto" : `manual-${manualRound}`}
        templateId={tpl.id}
        title={tpl.title}
        category={tpl.category}
        exercise={exercise}
      />

      <details className="rounded-xl border border-slate-200 bg-white">
        <summary className="cursor-pointer select-none px-4 py-2.5 text-sm text-slate-500 hover:text-slate-800">
          对照原文与重点句式（{tpl.phrases.length} 条）
        </summary>
        <div className="space-y-4 border-t border-slate-100 px-4 py-4">
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-3 font-sans text-[13px] leading-relaxed text-slate-700">
            {tpl.body}
          </pre>
          {tpl.phrases.length > 0 && (
            <ul className="space-y-1.5">
              {tpl.phrases.map((p, i) => (
                <li key={i} className="text-sm">
                  <span className="font-medium text-slate-800">{p.en}</span>
                  <span className="ml-2 text-slate-500">{p.cn}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </details>
    </div>
  )
}
