import Link from "next/link"
import { notFound } from "next/navigation"
import { PaperAudio } from "@/components/cet6/PaperAudio"
import { PaperQuiz, type QuizGroup, type QuizSection } from "@/components/cet6/PaperQuiz"
import { PaperTranslation } from "@/components/cet6/PaperTranslation"
import { PaperWriting } from "@/components/cet6/PaperWriting"
import { getPaperDetail } from "@/lib/cet6/paper"
import {
  PART_META,
  matchAnswerSuspicious,
  pieceQuestionRange,
  type PaperQuestion,
  type PartKey,
} from "@/lib/cet6/paper-shared"

export const dynamic = "force-dynamic"

type TabKey = "listening" | "objective" | "writing" | "translation"

const TAB_LABELS: Record<TabKey, string> = {
  listening: "听力",
  objective: "客观题",
  writing: "写作",
  translation: "翻译",
}

/** 听力按音频分段把题目归组；分段名来自 audioPieces（"Section A · 第 1 篇 · 1–4 题"） */
function buildListeningGroups(questions: PaperQuestion[], pieces: Array<{ label: string }>): QuizGroup[] {
  const groups: QuizGroup[] = []
  const used = new Set<number>()
  for (const p of pieces) {
    const range = pieceQuestionRange(p.label)
    if (!range) continue
    const inRange = questions.filter((q) => q.no >= range[0] && q.no <= range[1])
    if (!inRange.length) continue
    inRange.forEach((q) => used.add(q.no))
    groups.push({ label: p.label, questions: inRange })
  }
  const rest = questions.filter((q) => !used.has(q.no))
  if (rest.length) groups.push({ label: groups.length ? "其余题目" : undefined, questions: rest })
  return groups
}

/**
 * 真题详情。
 *
 * 四个标签页用 ?tab= 切换（服务端渲染，不用客户端状态），有哪部分才给哪个标签。
 * 听力页的播放器直接用 PaperAudio，本文件不碰音频逻辑。
 */
export default async function PaperDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ tab?: string }>
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams])
  const detail = await getPaperDetail(slug)
  if (!detail) notFound()

  const { paper, questions, material, subjective } = detail
  const paperLabel = `${paper.label} ${paper.set}`.trim()

  const listening = questions.filter((q) => q.part === "listening")
  const cloze = questions.filter((q) => q.part === "cloze")
  const matching = questions.filter((q) => q.part === "matching")
  const reading = questions.filter((q) => q.part === "reading")

  const matchingLetters = material.matchingParagraphs.map((p) => p.letter).filter(Boolean)
  // 段落匹配的答案键校验要用短文里真实的段落号，paraOptions 本身也会漏（见 paper-shared）
  const matchingSuspicious = matching.filter((q) => matchAnswerSuspicious(q, matchingLetters)).map((q) => q.no)

  const clozeBank = cloze.find((q) => q.wordBank)?.wordBank ?? undefined
  const clozeBlankNos = material.clozeBlankNos
  // 选词填空：短文原文缺空位的题单独提示，用户只能靠题干那句单独作答
  const clozeNotes: Record<number, string> = {}
  for (const q of cloze) {
    if (material.cloze && !clozeBlankNos.includes(q.no)) {
      clozeNotes[q.no] = "短文原文在这个位置缺失（源数据抽取时丢了句子），请只根据上面这句题干作答。"
    }
  }

  const sections: QuizSection[] = []

  if (listening.length) {
    sections.push({
      key: "listening",
      part: "listening",
      title: `${PART_META.listening.name}（${listening.length} 题）`,
      hint:
        "选项中文在交卷后显示，避免提前剧透。" +
        (listening.some((q) => !q.optionsZh || !q.optionsZh.length) ? " 部分题目源数据没有中文选项。" : ""),
      groups: buildListeningGroups(listening, paper.audioPieces),
    })
  }

  const objectiveSections: QuizSection[] = []

  if (cloze.length) {
    objectiveSections.push({
      key: "cloze",
      part: "cloze",
      title: `${PART_META.cloze.name}（${cloze.length} 题）`,
      hint:
        "从 15 个词库里为每空选一个字母。" +
        (material.cloze
          ? clozeBlankNos.length < cloze.length
            ? ` 注意：短文原文只保留了 ${clozeBlankNos.length} 个空位，其余空位所在句子在源数据里丢失，已在对应题目上标注。`
            : ""
          : " 短文原文缺失，请依据每题题干作答。"),
      groups: [{ material: "cloze", text: material.cloze || undefined, questions: cloze }],
      bank: clozeBank,
      notes: clozeNotes,
    })
  }

  if (matching.length) {
    objectiveSections.push({
      key: "matching",
      part: "matching",
      title: `${PART_META.matching.name}（${matching.length} 题）`,
      hint: `每题从短文的段落号里选一个（共 ${matchingLetters.length} 段）。` +
        (matchingSuspicious.length
          ? ` 有 ${matchingSuspicious.length} 题的答案键超出了段落范围，已标注且不计入得分。`
          : ""),
      groups: [{ material: "letters", text: material.matching || undefined, questions: matching }],
      paraLetters: matchingLetters,
      suspiciousNos: matchingSuspicious,
    })
  }

  if (reading.length) {
    const groups: QuizGroup[] = []
    for (const rp of material.readingParagraphs) {
      const qs = reading.filter((q) => q.pref === rp.key)
      if (!qs.length) continue
      groups.push({
        label: `${rp.key === "reading-1" ? "Passage One" : "Passage Two"}（第 ${qs[0].no}–${qs[qs.length - 1].no} 题）`,
        material: "paragraphs",
        text: rp.paragraphs.map((p) => `${p.letter} ${p.text}`).join("\n\n"),
        questions: qs,
      })
    }
    // 短文缺失时仍要把题目列出来，否则这一整块就没了
    const grouped = groups.flatMap((g) => g.questions.map((q) => q.no))
    const leftover = reading.filter((q) => !grouped.includes(q.no))
    if (leftover.length) groups.push({ label: "其余题目", questions: leftover })

    objectiveSections.push({
      key: "reading",
      part: "reading",
      title: `${PART_META.reading.name}（${reading.length} 题）`,
      hint: material.readingParagraphs.length
        ? undefined
        : "两篇短文原文缺失（源数据未随题库导出），只能依据题干、选项与解析作答。",
      groups,
    })
  }

  const tabs: TabKey[] = []
  if (listening.length) tabs.push("listening")
  if (objectiveSections.length) tabs.push("objective")
  if (paper.writing || subjective.writing?.model) tabs.push("writing")
  if (paper.translation || subjective.translation?.reference) tabs.push("translation")

  // 三个客观题板块的 tab 值都归到「客观题」页，方便直接从链接跳到某一板块
  const TAB_ALIAS: Record<string, TabKey> = {
    listening: "listening",
    objective: "objective",
    writing: "writing",
    translation: "translation",
    cloze: "objective",
    matching: "objective",
    reading: "objective",
  }
  const requested = TAB_ALIAS[(sp.tab ?? "").toLowerCase()]
  const tab: TabKey = requested && tabs.includes(requested) ? requested : (tabs[0] ?? "objective")

  const sectionCounts: Array<{ key: PartKey; count: number }> = (
    [
      { key: "listening" as PartKey, count: listening.length },
      { key: "cloze" as PartKey, count: cloze.length },
      { key: "matching" as PartKey, count: matching.length },
      { key: "reading" as PartKey, count: reading.length },
    ]
  ).filter((s) => s.count > 0)

  return (
    <div className="space-y-4">
      <div>
        <Link href="/cet6/papers" className="text-xs text-slate-400 hover:text-slate-600">
          ← 真题列表
        </Link>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <h1 className="text-xl font-semibold text-slate-900">{paper.label}</h1>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600">{paper.set}</span>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600">{paper.slug}</span>
        </div>
        {/* 答案来源说明：2018–2019 有 9 套的答案解析是扫描件 OCR 出来的，识别可能有误，
            必须让使用者看到，否则会出现「我明明选对了却判错」的情况 */}
        {paper.source && (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-1.5 text-[11px] leading-relaxed text-amber-800">
            ⚠ {paper.source}
          </p>
        )}
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
          <span>共 {paper.questionCount} 题</span>
          {sectionCounts.map((s) => (
            <span key={s.key}>
              {PART_META[s.key].short} {s.count}
            </span>
          ))}
          <span>{paper.hasAudio ? "♪ 有听力音频" : "无听力音频"}</span>
        </div>
      </div>

      {detail.attempts.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="mb-1.5 text-[11px] font-medium text-slate-500">最近练习记录</div>
          <div className="flex flex-wrap gap-2">
            {detail.attempts.slice(0, 6).map((a) => (
              <span key={a.id} className="rounded-lg bg-slate-50 px-2 py-1 text-[11px] text-slate-600">
                {a.section === "listening" ? "听力" : a.section === "cloze" ? "选词填空" : a.section === "matching" ? "段落匹配" : "仔细阅读"}{" "}
                <b className={a.total && a.correct / a.total >= 0.8 ? "text-emerald-600" : "text-slate-900"}>
                  {a.correct}/{a.total}
                </b>
                <span className="text-slate-300"> · </span>
                {a.createdAt.toLocaleDateString("zh-CN")}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-1 border-b border-slate-200">
        {tabs.map((t) => (
          <Link
            key={t}
            href={`/cet6/papers/${paper.slug}?tab=${t}`}
            className={[
              "-mb-px rounded-t-lg border-b-2 px-3 py-2 text-sm",
              t === tab
                ? "border-indigo-500 font-medium text-indigo-700"
                : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700",
            ].join(" ")}
          >
            {TAB_LABELS[t]}
          </Link>
        ))}
      </div>

      {tab === "listening" && (
        <div className="space-y-4">
          <PaperAudio
            slug={paper.slug}
            audioUrl={paper.audioUrl}
            audioHls={paper.audioHls}
            pieces={paper.audioPieces}
            hasAudio={paper.hasAudio}
          />
          <PaperQuiz paperId={paper.id} slug={paper.slug} paperLabel={paperLabel} sections={sections} />
        </div>
      )}

      {tab === "objective" && (
        <PaperQuiz paperId={paper.id} slug={paper.slug} paperLabel={paperLabel} sections={objectiveSections} />
      )}

      {tab === "writing" && (
        <PaperWriting
          slug={paper.slug}
          directions={paper.writing ?? subjective.writing?.directions ?? null}
          model={paper.writingModel ?? subjective.writing?.model ?? null}
          modelZh={paper.writingModelZh ?? subjective.writing?.modelZh ?? null}
          outline={subjective.writing?.outline ?? []}
        />
      )}

      {tab === "translation" && (
        <PaperTranslation
          slug={paper.slug}
          source={paper.translation ?? subjective.translation?.source ?? null}
          reference={paper.translationReference ?? subjective.translation?.reference ?? null}
          sentences={subjective.translation?.sentences ?? []}
        />
      )}
    </div>
  )
}
