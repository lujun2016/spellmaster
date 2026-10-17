import Link from "next/link"
import { notFound } from "next/navigation"
import { buildTranslationDoc, paperTitle } from "@/components/cet6/translation/analysis"
import { TranslationSession } from "@/components/cet6/translation/TranslationSession"
import { db } from "@/lib/cet6/db"

export const dynamic = "force-dynamic"

/**
 * 真题翻译练习页。
 * 素材就是这套真题的 translation（中文原文）与 translationReference（参考译文），
 * 逐句解析来自 subjective.translation.sentences，清洗逻辑全在 analysis.ts。
 */
export default async function PaperTranslationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const row = await db.paper.findUnique({ where: { slug } })
  if (!row) notFound()

  const doc = buildTranslationDoc({
    subjective: row.subjective,
    translation: row.translation,
    reference: row.translationReference,
  })
  const title = paperTitle(row.label, row.set)

  if (!doc.sourceZh) {
    return (
      <div className="space-y-3">
        <Link href="/cet6/translation" className="text-xs text-slate-400 hover:text-slate-600">
          ← 翻译练习
        </Link>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
          这套真题在库里没有翻译原文（slug <code>{row.slug}</code>），没法练。换一套吧。
        </p>
      </div>
    )
  }

  return (
    <TranslationSession
      key={row.slug}
      title={`${title} 翻译`}
      subtitle={doc.directionsEn || undefined}
      sourceZh={doc.sourceZh}
      referenceEn={doc.referenceEn}
      units={doc.units}
      referenceSentenceCount={doc.referenceSentenceCount}
      refId={row.id}
      tags={`翻译,${row.label}`}
      draftKey={`cet6-translation-${row.slug}`}
      backHref="/cet6/translation"
      backLabel="翻译练习"
    />
  )
}
