/**
 * 音频文件仓库。
 *
 * 为什么不用 public/ ？
 *   Next dev 会监视 public/ 下的变动，往里面写 MP3 会反复触发模块热重载 ——
 *   转码中的 ffmpeg 子进程会被反复打断（表现为进度老是归零、产物被截断）。
 *   所以音频统一放在项目根下的隐藏目录 .cet6-audio/（点号开头不会被 watcher 盯上），
 *   再通过 API 路由流式播放。
 *
 * 目录结构：
 *   .cet6-audio/tts/<内容哈希>.mp3      句子/单词的合成音频
 *   .cet6-audio/papers/<slug>.mp3       真题听力（m3u8 转码产物或下载缓存）
 */
import { createReadStream } from "node:fs"
import { mkdir, stat } from "node:fs/promises"
import { join } from "node:path"

export type AudioKind = "tts" | "papers"

export const AUDIO_ROOT = join(process.cwd(), ".cet6-audio")

export function audioDir(kind: AudioKind) {
  return join(AUDIO_ROOT, kind)
}

export async function ensureAudioDir(kind: AudioKind) {
  const dir = audioDir(kind)
  await mkdir(dir, { recursive: true })
  return dir
}

/** 对外可访问的地址（由 /api/cet6/audio/file/[kind]/[name] 提供） */
export function audioFileUrl(kind: AudioKind, name: string) {
  return `/api/cet6/audio/file/${kind}/${encodeURIComponent(name)}`
}

/** 文件名安全化：只允许哈希/套号这类字符，避免路径穿越 */
export function safeAudioName(name: string): string | null {
  if (!/^[A-Za-z0-9._-]{1,80}$/.test(name)) return null
  if (name.includes("..")) return null
  return name
}

export type AudioStream = {
  status: number
  headers: Record<string, string>
  body: ReadableStream | null
}

/**
 * 支持 Range 的音频流（<audio> 拖动进度条要靠它，返回 206 + Content-Range）。
 */
export async function streamAudio(kind: AudioKind, name: string, rangeHeader: string | null): Promise<AudioStream> {
  const safe = safeAudioName(name)
  if (!safe) return { status: 400, headers: {}, body: null }

  const path = join(audioDir(kind), safe)
  let size: number
  try {
    const s = await stat(path)
    if (!s.isFile()) throw new Error("not a file")
    size = s.size
  } catch {
    return { status: 404, headers: {}, body: null }
  }

  const baseHeaders = {
    "Content-Type": "audio/mpeg",
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=31536000, immutable",
  }

  if (!rangeHeader) {
    const stream = createReadStream(path)
    return {
      status: 200,
      headers: { ...baseHeaders, "Content-Length": String(size) },
      body: nodeToWebStream(stream),
    }
  }

  const m = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim())
  if (!m) {
    return { status: 416, headers: { ...baseHeaders, "Content-Range": `bytes */${size}` }, body: null }
  }
  const start = m[1] ? Number(m[1]) : 0
  const end = m[2] ? Math.min(Number(m[2]), size - 1) : size - 1
  if (start > end || start >= size) {
    return { status: 416, headers: { ...baseHeaders, "Content-Range": `bytes */${size}` }, body: null }
  }

  const stream = createReadStream(path, { start, end })
  return {
    status: 206,
    headers: {
      ...baseHeaders,
      "Content-Length": String(end - start + 1),
      "Content-Range": `bytes ${start}-${end}/${size}`,
    },
    body: nodeToWebStream(stream),
  }
}

/** Node 可读流 → Web ReadableStream（Response 需要后者） */
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
