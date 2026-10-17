import Link from "next/link"
import { notFound } from "next/navigation"
import { DictationDrill } from "@/components/cet6/DictationDrill"
import { getDrill } from "@/lib/cet6/listening"

export const dynamic = "force-dynamic"

/** 听写练习页：逐句播放 → 写下来 → 对照原文 */
export default async function DrillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const drill = await getDrill(id)
  if (!drill) notFound()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">逐句听写</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {drill.source} · 共 {drill.sentences.length} 句
          </p>
        </div>
        <Link href="/cet6/listening" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
          返回
        </Link>
      </div>

      <DictationDrill
        drillId={drill.id}
        title={drill.source}
        sentences={drill.sentences}
        previous={drill.answers.map((a) => ({ n: a.n, input: a.input, correct: a.correct, accuracy: a.accuracy }))}
      />
    </div>
  )
}
