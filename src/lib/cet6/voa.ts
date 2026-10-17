/**
 * 「VOA 每日英语」的服务端逻辑：查库、匹配六级词、把真人 MP3 缓存到本地再流式播放。
 *
 * 数据从哪来：cet6-data/fetch-voa.mjs 抓 VOA Learning English 的文章页，写进 ListeningItem
 * （source = "VOA Learning English"）。页面上「立即抓取」按钮走 runVoaFetch()，
 * 它直接 spawn 同一个脚本 —— 抓取规则只有一份，不会出现「脚本能抓、按钮抓不到」的分叉。
 *
 * 音频为什么要本地中转：
 *   本机代理是显式代理（http://127.0.0.1:7892），浏览器不会自动走它，
 *   直接让 <audio src="https://voa-audio.voanews.eu/..."> 多半拉不动。
 *   所以 /api/cet6/voa/audio 先用 curl（带代理）把 MP3 拉下来存到 .cet6-audio/voa/，
 *   再按 Range 分片发给浏览器：首次播放慢一点，之后秒开，进度条也能拖。
 */
import { execFile, spawn } from "node:child_process"
import { createReadStream } from "node:fs"
import { access, mkdir, rename, stat } from "node:fs/promises"
import { join } from "node:path"
import { promisify } from "node:util"
import { db } from "./db"
import { matchVocab } from "./daily"
import { readParagraphs, type ArticleVocab } from "./json"

const execFileAsync = promisify(execFile)

export const VOA_SOURCE = "VOA Learning English"

/** 默认代理：跟脚本保持一致，可用 CET6_PROXY 覆盖 */
export const VOA_DEFAULT_PROXY = process.env.CET6_PROXY || "http://127.0.0.1:7892"

export const VOA_AUDIO_DIR = join(process.cwd(), ".cet6-audio", "voa")

const PROJECT_ROOT = process.cwd()
const FETCH_SCRIPT = join(PROJECT_ROOT, "cet6-data", "fetch-voa.mjs")

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

// ==================== 查询 ====================

export type VoaItem = {
  id: string
  /** 源站稿件号（音频缓存文件名用它） */
  externalId: string
  title: string
  pageUrl: string
  audioUrl: string
  /** mp3 = 源站真人音频直链；tts = 拿不到直链，用原文合成的；none = 都没有 */
  audioKind: "mp3" | "tts" | "none"
  /** 栏目名（VOA 不给单篇难度分级，栏目是最有用的难度/题材信号） */
  program: string
  summary: string
  publishedAt: Date | null
  fetchedAt: Date
  sentenceCount: number
  /** 第一次听过的时间；null = 还没听过（列表里据此标"已听过"并排到后面） */
  listenedAt: Date | null
}

function audioKindOf(audioUrl: string): VoaItem["audioKind"] {
  if (/^https?:\/\//i.test(audioUrl)) return "mp3"
  if (audioUrl.includes("/api/cet6/audio/file/tts/")) return "tts"
  return "none"
}

type Row = {
  id: string
  externalId: string
  title: string
  pageUrl: string
  audioUrl: string
  transcript: string
  summary: string
  level: string
  publishedAt: Date | null
  fetchedAt: Date
  listenedAt: Date | null
}

function toItem(r: Row): VoaItem {
  return {
    id: r.id,
    externalId: r.externalId,
    title: r.title,
    pageUrl: r.pageUrl,
    audioUrl: r.audioUrl,
    audioKind: audioKindOf(r.audioUrl),
    program: r.level,
    summary: r.summary,
    publishedAt: r.publishedAt,
    fetchedAt: r.fetchedAt,
    sentenceCount: readParagraphs(r.transcript).length,
    listenedAt: r.listenedAt,
  }
}

export async function listVoaItems(limit = 12): Promise<VoaItem[]> {
  const rows = await db.listeningItem.findMany({
    where: { source: VOA_SOURCE },
    orderBy: [{ publishedAt: "desc" }, { fetchedAt: "desc" }],
    take: limit,
  })
  return rows.map(toItem)
}

export async function countVoaItems(): Promise<number> {
  return db.listeningItem.count({ where: { source: VOA_SOURCE } })
}

/** 详情：逐句原文 + 能匹配上的六级词 */
export async function getVoaItem(id: string) {
  const row = await db.listeningItem.findUnique({ where: { id } })
  if (!row || row.source !== VOA_SOURCE) return null
  const sentences = readParagraphs(row.transcript).map((p) => p.en)
  const vocab = await matchVoaVocab(sentences)
  return { ...toItem(row), sentences, vocab }
}

/** 用文章里出现的词去 3992 词库匹配六级词（复用每日精读那套 matchVocab） */
export async function matchVoaVocab(sentences: string[], limit = 15): Promise<ArticleVocab[]> {
  if (!sentences.length) return []
  return matchVocab(
    sentences.map((en) => ({ en, cn: "" })),
    limit,
  )
}

/**
 * 音频中转接口要用的最小信息。
 * 真实 MP3 需要先缓存到本地再分片发出去；TTS 产物本来就在本地，直接转到已有的文件接口。
 */
/**
 * 标记"已听过"（只记第一次：列表里显示的是第一次听的时间，重复播放不覆盖）。
 * 在客户端取音频时调用，所以"点了精听并且真的加载了音频"才算听过。
 */
export async function markVoaListened(id: string) {
  const row = await db.listeningItem.findUnique({ where: { id }, select: { listenedAt: true } })
  if (row && !row.listenedAt) {
    await db.listeningItem.update({ where: { id }, data: { listenedAt: new Date() } })
  }
}

export async function getVoaAudioTarget(id: string) {
  const row = await db.listeningItem.findUnique({
    where: { id },
    select: { source: true, externalId: true, audioUrl: true },
  })
  if (!row || row.source !== VOA_SOURCE || !row.audioUrl) return null
  return { externalId: row.externalId, audioUrl: row.audioUrl }
}

// ==================== 触发抓取（给 server action 用） ====================

export type VoaFetchResult = {
  ok: boolean
  message: string
  added: number
  updated: number
  mp3: number
  tts: number
  items: Array<{ title: string; sentences: number; audio: string }>
}

/**
 * 跑一次抓取。直接 spawn cet6-data/fetch-voa.mjs，读它末尾那行 VOA_RESULT {...}。
 * 任何失败（代理不通、脚本报错、超时）都转成 ok:false + 人话提示，绝不抛给页面。
 */
export async function runVoaFetch(opts: { limit?: number; proxy?: string; timeoutMs?: number } = {}): Promise<VoaFetchResult> {
  const limit = Math.min(Math.max(opts.limit ?? 12, 1), 30)
  const proxy = opts.proxy || VOA_DEFAULT_PROXY
  const fail = (message: string): VoaFetchResult => ({ ok: false, message, added: 0, updated: 0, mp3: 0, tts: 0, items: [] })

  try {
    const { stdout } = await execFileAsync(
      process.execPath,
      [FETCH_SCRIPT, `--limit=${limit}`, `--proxy=${proxy}`, "--json"],
      { timeout: opts.timeoutMs ?? 180_000, maxBuffer: 8 * 1024 * 1024, cwd: PROJECT_ROOT },
    )
    const line = stdout.split("\n").find((l) => l.startsWith("VOA_RESULT "))
    if (!line) return fail("抓取脚本没有返回结果，请看服务端日志")
    const data = JSON.parse(line.slice("VOA_RESULT ".length)) as {
      ok: boolean
      reason?: string
      added?: number
      updated?: number
      mp3?: number
      tts?: number
      items?: Array<{ title: string; sentences: number; audio: string }>
    }
    if (!data.ok) {
      return fail(
        data.reason === "没有可入库的文章"
          ? "抓到订阅源了，但没有可用的文章（可能都已入库，或站点结构变了）"
          : data.reason || "抓取失败",
      )
    }
    return {
      ok: true,
      message: `抓取完成：新增 ${data.added ?? 0} 条，更新 ${data.updated ?? 0} 条`,
      added: data.added ?? 0,
      updated: data.updated ?? 0,
      mp3: data.mp3 ?? 0,
      tts: data.tts ?? 0,
      items: data.items ?? [],
    }
  } catch (e) {
    const err = e as { killed?: boolean; stderr?: string; message?: string }
    if (err.killed) return fail(`抓取超时（${Math.round((opts.timeoutMs ?? 180_000) / 1000)} 秒），先看看网络是不是很慢`)
    return fail(`抓取过程出错：${(err.stderr || err.message || "未知原因").toString().slice(-300)}`)
  }
}

// ==================== 音频本地缓存 + Range 流 ====================

function cacheName(externalId: string) {
  // 文件名只用稿件号，避免非法字符进文件名
  const safe = externalId.replace(/[^A-Za-z0-9._-]/g, "").slice(0, 40) || "voa"
  return `${safe}.mp3`
}

async function exists(path: string) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

/** 用 curl（显式代理）把源站 MP3 拉到本地缓存；已缓存则直接返回路径 */
export async function ensureVoaAudioCached(externalId: string, audioUrl: string, proxy = VOA_DEFAULT_PROXY): Promise<string> {
  await mkdir(VOA_AUDIO_DIR, { recursive: true })
  const file = join(VOA_AUDIO_DIR, cacheName(externalId))
  if (await exists(file)) return file

  const tmp = `${file}.part`
  await new Promise<void>((resolve, reject) => {
    const child = spawn(
      "curl",
      ["-sS", "-x", proxy, "-L", "--max-time", "120", "-A", UA, "-o", tmp, audioUrl],
      { stdio: ["ignore", "ignore", "pipe"] },
    )
    let stderr = ""
    child.stderr.on("data", (d) => (stderr += d.toString()))
    child.on("error", reject)
    child.on("close", (code) => {
      if (code === 0) resolve()
      else reject(new Error(stderr.trim() || `curl 退出码 ${code}`))
    })
  })

  const s = await stat(tmp)
  if (s.size < 4096) throw new Error("下载到的音频太小，可能是错误页")
  await rename(tmp, file)
  return file
}

export type VoaAudioStream = {
  status: number
  headers: Record<string, string>
  body: ReadableStream | null
}

/** 按 Range 分片返回本地 MP3（<audio> 拖进度条要靠它） */
export async function streamVoaAudio(file: string, rangeHeader: string | null): Promise<VoaAudioStream> {
  let size: number
  try {
    const s = await stat(file)
    if (!s.isFile()) throw new Error("not a file")
    size = s.size
  } catch {
    return { status: 404, headers: {}, body: null }
  }

  const base = {
    "Content-Type": "audio/mpeg",
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=31536000, immutable",
  }

  if (!rangeHeader) {
    return { status: 200, headers: { ...base, "Content-Length": String(size) }, body: nodeToWebStream(createReadStream(file)) }
  }

  const m = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim())
  if (!m) return { status: 416, headers: { ...base, "Content-Range": `bytes */${size}` }, body: null }
  const start = m[1] ? Number(m[1]) : 0
  const end = m[2] ? Math.min(Number(m[2]), size - 1) : size - 1
  if (start > end || start >= size) {
    return { status: 416, headers: { ...base, "Content-Range": `bytes */${size}` }, body: null }
  }
  return {
    status: 206,
    headers: { ...base, "Content-Length": String(end - start + 1), "Content-Range": `bytes ${start}-${end}/${size}` },
    body: nodeToWebStream(createReadStream(file, { start, end })),
  }
}

function nodeToWebStream(stream: ReturnType<typeof createReadStream>): ReadableStream {
  return new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) => controller.enqueue(new Uint8Array(chunk as Buffer)))
      stream.on("end", () => controller.close())
      stream.on("error", (err) => controller.error(err))
    },
    cancel() {
      stream.destroy()
    },
  })
}
