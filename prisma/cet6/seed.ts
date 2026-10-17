/**
 * 六级复习工具 seed 脚本
 *
 * 运行： pnpm db:cet6:seed
 *
 * 灌入内容（每一步都是幂等的，可反复跑）：
 *   1. 词库            cet6-data/words.json.gz       → Word（3992 词）
 *   2. 写作模板        cet6-data/templates.json      → WritingTemplate
 *   3. 真题            cet6-data/papers/parsed.json  → Paper（存在才灌）
 *   4. 默认设置        → Setting
 *
 * 注意：不会覆盖已有的 WordProgress（学习进度），重跑 seed 只更新词条内容。
 */
import { readFileSync, existsSync } from "node:fs"
import { gunzipSync } from "node:zlib"
import { join } from "node:path"
import { PrismaClient } from "../../src/generated/cet6"

const db = new PrismaClient()
const root = join(__dirname, "../..")
const dataDir = join(root, "cet6-data")

type RawWord = {
  w: string
  rank: number
  freq: number
  uk: string
  us: string
  trans: unknown[]
  en: string
  phrases: unknown[]
  sents: unknown[]
  exam: unknown[]
  syno: unknown[]
  rel: unknown[]
  mn: string
  books: string[]
}

const J = (v: unknown) => JSON.stringify(v ?? [])

async function seedWords() {
  const path = join(dataDir, "words.json.gz")
  if (!existsSync(path)) {
    console.warn(`⚠️  找不到 ${path}，跳过词库。先跑： node cet6-data/build-words.mjs`)
    return
  }
  const words: RawWord[] = JSON.parse(gunzipSync(readFileSync(path)).toString("utf8"))
  console.log(`📚 词库 ${words.length} 词，开始写入…`)

  const BATCH = 400
  let written = 0
  for (let i = 0; i < words.length; i += BATCH) {
    const slice = words.slice(i, i + BATCH)
    await db.$transaction(
      slice.map((w) =>
        db.word.upsert({
          where: { text: w.w },
          create: {
            text: w.w,
            rank: w.rank,
            freq: w.freq,
            ukPhone: w.uk || null,
            usPhone: w.us || null,
            trans: J(w.trans),
            defEn: w.en || null,
            phrases: J(w.phrases),
            sents: J(w.sents),
            exam: J(w.exam),
            synos: J(w.syno),
            relWords: J(w.rel),
            mnemonic: w.mn || null,
          },
          // 只更新词条内容，不碰 progress 关系
          update: {
            rank: w.rank,
            freq: w.freq,
            ukPhone: w.uk || null,
            usPhone: w.us || null,
            trans: J(w.trans),
            defEn: w.en || null,
            phrases: J(w.phrases),
            sents: J(w.sents),
            exam: J(w.exam),
            synos: J(w.syno),
            relWords: J(w.rel),
            mnemonic: w.mn || null,
          },
        }),
      ),
    )
    written += slice.length
    if (written % 1600 === 0 || written === words.length) {
      console.log(`   ${written}/${words.length}`)
    }
  }
  const total = await db.word.count()
  console.log(`✅ 词库完成，库中共 ${total} 词`)
}

async function seedTemplates() {
  const path = join(dataDir, "templates.json")
  if (!existsSync(path)) {
    console.warn(`⚠️  找不到 ${path}，跳过写作模板`)
    return
  }
  const items = JSON.parse(readFileSync(path, "utf8")) as Array<{
    category: string
    title: string
    summary: string
    body: string
    phrases: unknown[]
    starred?: boolean
    sort?: number
  }>
  // 模板没有天然唯一键，用 category+title 去重后重建，避免重复插入
  await db.writingTemplate.deleteMany({})
  await db.writingTemplate.createMany({
    data: items.map((t) => ({
      category: t.category,
      title: t.title,
      summary: t.summary ?? "",
      body: t.body,
      phrases: J(t.phrases),
      starred: t.starred ?? false,
      sort: t.sort ?? 0,
    })),
  })
  console.log(`✅ 写作模板 ${items.length} 条`)
}

/**
 * 灌入真题：数据来自 cet6-data/papers/quiz/（123xzw999/cet6-exam-quiz 的 46 套，
 * 含标准答案与中文逐题解析），音频优先用 Drhm1224/cet6-all-in-one 里的 MP3 直链，
 * 没有 MP3 的用 m3u8（本地按需用 ffmpeg 转码，见 /api/cet6/audio）。
 */
async function seedPapers() {
  const quizDir = join(dataDir, "papers/quiz")
  const indexPath = join(quizDir, "index.json")
  if (!existsSync(indexPath)) {
    console.warn(`⚠️  找不到 ${indexPath}，跳过真题。先跑： node cet6-data/fetch-exam-quiz.mjs`)
    return
  }

  const index = JSON.parse(readFileSync(indexPath, "utf8")) as {
    papers: Array<{
      id: string
      label: string
      set: string
      year: number
      month: number
      questionCount: number
      byPart: Record<string, number>
    }>
  }

  // m3u8 音频映射（2020–2022 那些套）
  const audioPath = join(quizDir, "audio.json")
  const audioMap: Record<string, { src: string; pieces: Array<{ label: string; start: number; end: number }> }> =
    existsSync(audioPath) ? JSON.parse(readFileSync(audioPath, "utf8")) : {}

  // 有现成 MP3 的套（2023–2025），直连播放最省事
  const MP3_BASE = "https://gcore.jsdelivr.net/gh/Drhm1224/cet6-all-in-one@main/Audio"
  const mp3Map = new Map<string, string>()
  for (const ym of ["2023_06", "2023_12", "2024_06", "2024_12", "2025_06", "2025_12"]) {
    for (const set of ["1", "2"]) {
      const slug = `${ym.replace("_", "-")}-${set}`
      mp3Map.set(slug, `${MP3_BASE}/cet6_${ym}_${set}.mp3`)
    }
  }

  let n = 0
  let withAudio = 0
  for (const meta of index.papers) {
    const file = join(quizDir, `${meta.id}.json`)
    if (!existsSync(file)) {
      console.warn(`   ⚠️ 缺少 ${meta.id}.json，跳过`)
      continue
    }
    const data = JSON.parse(readFileSync(file, "utf8")) as {
      questions: unknown[]
      passages?: Record<string, string>
      subjective?: {
        writing?: { directions?: string; model?: string; modelZh?: string }
        translation?: { source?: string; reference?: string }
      }
    }
    const subj = data.subjective ?? {}
    const hls = audioMap[meta.id]
    const mp3 = mp3Map.get(meta.id)

    const values = {
      year: meta.year,
      month: meta.month,
      set: String(meta.set ?? ""),
      label: meta.label ?? "",
      writing: subj.writing?.directions ?? null,
      writingModel: subj.writing?.model ?? null,
      writingModelZh: subj.writing?.modelZh ?? null,
      translation: subj.translation?.source ?? null,
      translationReference: subj.translation?.reference ?? null,
      subjective: JSON.stringify(subj),
      passages: JSON.stringify(data.passages ?? {}),
      questions: JSON.stringify(data.questions ?? []),
      byPart: JSON.stringify(meta.byPart ?? {}),
      questionCount: meta.questionCount ?? data.questions?.length ?? 0,
      audioUrl: mp3 ?? null,
      audioHls: mp3 ? null : (hls?.src ?? null),
      audioPieces: JSON.stringify(hls?.pieces ?? []),
    }

    await db.paper.upsert({
      where: { slug: meta.id },
      create: { slug: meta.id, ...values },
      update: values,
    })
    if (mp3 || hls) withAudio++
    n++
  }
  console.log(`✅ 真题 ${n} 套（其中 ${withAudio} 套有听力音频）`)
}

async function seedSettings() {
  const defaults: Array<[string, string]> = [
    ["examDate", process.env.NEXT_PUBLIC_EXAM_DATE || "2026-12-12"],
    ["dailyNewWords", "40"], // 每日新词
    ["dailyMaxReviews", "150"], // 每日复习上限（防堆积劝退）
    ["autoPlan", "1"], // 是否按剩余天数自动调整每日新词量
    ["ttsVoice", "en-US"], // 浏览器 TTS 音色
    ["ttsRate", "1"], // 语速
    ["llmProvider", process.env.LLM_PROVIDER || ""],
    ["llmModel", process.env.LLM_MODEL || ""],
  ]
  for (const [key, value] of defaults) {
    await db.setting.upsert({
      where: { key },
      create: { key, value },
      update: {}, // 已有设置不覆盖用户改过的值
    })
  }
  console.log(`✅ 默认设置 ${defaults.length} 项`)
}

async function main() {
  console.log("=== 六级复习工具 seed ===\n")
  await seedWords()
  await seedTemplates()
  await seedPapers()
  await seedSettings()
  console.log("\n=== 完成 ===")
}

main()
  .catch((e) => {
    console.error("seed 失败：", e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
