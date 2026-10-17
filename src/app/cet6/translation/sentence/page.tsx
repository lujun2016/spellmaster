import Link from "next/link"
import { DrawButton } from "@/components/cet6/translation/DrawButton"
import { TranslationSession } from "@/components/cet6/translation/TranslationSession"
import { db } from "@/lib/cet6/db"
import { readSents, readTrans } from "@/lib/cet6/json"

export const dynamic = "force-dynamic"

/**
 * 从词库例句里抽单句翻译。
 *
 * 候选池只在服务端按 rank 取前 400 个高频词的例句（词库按真题频次排过序，
 * 前 400 个词覆盖的例句已经足够多），再筛「10~22 词、纯英文、中文译文有内容」。
 * 题目由 ?i= 下标决定，缺省时用一次随机数——随机值只参与服务端渲染并作为 props
 * 传给客户端，所以不会造成 hydration 不一致。
 */
async function buildPool() {
  const rows = await db.word.findMany({
    where: { sents: { not: "[]" } },
    orderBy: { rank: "asc" },
    take: 400,
    select: { text: true, trans: true, sents: true },
  })

  const pool: Array<{ key: string; en: string; cn: string; word: string; wordCn: string }> = []
  for (const r of rows) {
    const wordCn = readTrans(r.trans)
      .map((t) => (t.pos ? `${t.pos}. ${t.cn}` : t.cn))
      .join("；")
    for (const s of readSents(r.sents)) {
      const en = (s.en ?? "").trim()
      const cn = (s.cn ?? "").trim()
      if (!en || !cn) continue
      const wordCount = en.split(/\s+/).filter(Boolean).length
      if (wordCount < 10 || wordCount > 22) continue
      // 纯英文例句才适合当翻译题（中文夹在英文里说明这条例句本身有问题）
      if (/[^\x20-\x7E]/.test(en)) continue
      if (cn.replace(/[^\u4e00-\u9fa5]/g, "").length < 8) continue
      pool.push({ key: `${r.text}-${pool.length}`, en, cn, word: r.text, wordCn: wordCn.slice(0, 60) })
    }
  }
  return pool
}

export default async function SentenceTranslationPage({ searchParams }: { searchParams: Promise<{ i?: string }> }) {
  const [sp, pool] = await Promise.all([searchParams, buildPool()])

  if (pool.length === 0) {
    return (
      <div className="space-y-3">
        <Link href="/cet6/translation" className="text-xs text-slate-400 hover:text-slate-600">
          ← 翻译练习
        </Link>
        <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
          词库里没找到合适的例句（10~22 词的纯英文例句），先去背词或换真题翻译练。
        </p>
      </div>
    )
  }

  const seed = Number.isFinite(Number(sp.i)) && sp.i !== undefined ? Math.abs(Math.floor(Number(sp.i))) : Math.floor(Math.random() * 1_000_000_000)
  const item = pool[seed % pool.length]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">单句翻译（词库例句）</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            中文来自词库例句的译法，要求你译回原句意思。候选池共 {pool.length} 句 · 当前第 {(seed % pool.length) + 1} 句
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DrawButton basePath="/cet6/translation/sentence" />
          <Link
            href="/cet6/translation"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            真题整段翻译
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3 text-[13px] leading-relaxed text-slate-500">
        单句模式有唯一参考答案，所以会对错记入统计：判定口径是
        <b className="text-slate-700">参考译文实词命中率 ≥ 60% 且词数在 0.5~1.9 倍之间、且没有残留中文</b>
        （纯词汇匹配的规则判定，不是语义评分）。整段翻译没有客观答案，只记时长与次数。
      </div>

      <TranslationSession
        key={item.key}
        title="把这句中文译成英文"
        recordTitle={`例句翻译：${item.word}`}
        sourceZh={item.cn}
        referenceEn={item.en}
        units={[]}
        referenceSentenceCount={1}
        tags="翻译,例句"
        word={item.word}
        wordCn={item.wordCn}
        draftKey={`cet6-translation-sentence-${item.key}`}
        backHref="/cet6/translation"
        backLabel="翻译练习"
      />
    </div>
  )
}
