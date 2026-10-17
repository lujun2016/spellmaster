import Link from "next/link"
import { notFound } from "next/navigation"
import { VoaPlayer } from "@/components/cet6/VoaPlayer"
import { getVoaItem } from "@/lib/cet6/voa"

export const dynamic = "force-dynamic"

/**
 * VOA 每日英语详情：播放器 + 逐句原文（默认隐藏）+ 文中六级词。
 * 取不到就 404，不在这里做任何网络请求，所以打开慢或者没梯子都不会把页面弄崩。
 */
export default async function VoaItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await getVoaItem(id)
  if (!item) notFound()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">VOA 每日英语</h1>
          <p className="mt-0.5 text-sm text-slate-500">先盲听，再显示原文对照；听不出来的词句一键进生词本。</p>
        </div>
        <Link
          href="/cet6/listening"
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          返回听力精听
        </Link>
      </div>

      <VoaPlayer
        item={{
          id: item.id,
          title: item.title,
          pageUrl: item.pageUrl,
          audioUrl: item.audioUrl,
          audioKind: item.audioKind,
          program: item.program,
          summary: item.summary,
          publishedAt: item.publishedAt ? item.publishedAt.toISOString().slice(0, 10) : null,
          sentences: item.sentences,
          vocab: item.vocab,
        }}
      />
    </div>
  )
}
