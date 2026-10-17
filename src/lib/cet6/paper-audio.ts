/**
 * 真题听力音频：把 m3u8 流按需转成本地 MP3。
 *
 * 产物写在 .cet6-audio/papers/（不是 public/，否则写文件会不断触发 Next dev 热重载，
 * 把转码进程打断），通过 /api/cet6/audio/file/papers/<slug>.mp3 播放。
 *
 * 背景：题库里 2023–2025 的套有 MP3 直链，直接播即可；
 * 2020–2022 的套只有 m3u8（HLS），浏览器 <audio> 放不了，需要服务端用 ffmpeg 转码。
 * 转码 8 分钟的听力大约 40–60 秒，所以做成「后台任务 + 前端轮询进度」而不是卡住请求。
 *
 * 转好的文件放在 public/audio/papers/<slug>.mp3，转一次以后就一直命中本地。
 */
import { spawn } from "node:child_process"
import { access, stat, rm, rename } from "node:fs/promises"
import { join } from "node:path"
import { audioDir, audioFileUrl, ensureAudioDir } from "./audio-store"
/** 小于这个体积的成品一律视为残文件（完整听力 25 分钟约 18 MB） */
const MIN_VALID_BYTES = 3_000_000
/** 转码出来的音频至少要有这么长，否则说明中途断了 */
const MIN_VALID_SECONDS = 300

export type ConvertJob = {
  slug: string
  startedAt: number
  /** 0–100，未知总时长时为 null */
  percent: number | null
  done: boolean
  error: string | null
  url: string | null
}

/** 进程内的任务表：同一个套不会被重复转码 */
const jobs = new Map<string, ConvertJob>()

async function exists(p: string) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

export function getJob(slug: string): ConvertJob | undefined {
  return jobs.get(slug)
}

/** 用 ffprobe 问一下总时长（失败就返回 null，进度按不确定处理） */
function probeDuration(input: string): Promise<number | null> {
  return new Promise((resolve) => {
    const p = spawn("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "csv=p=0",
      input,
    ])
    let out = ""
    p.stdout.on("data", (d) => (out += d.toString()))
    p.on("close", () => {
      const v = Number(out.trim())
      resolve(Number.isFinite(v) && v > 0 ? v : null)
    })
    p.on("error", () => resolve(null))
  })
}

/**
 * 确保某个套有可播放的本地 MP3。
 * 返回 'ready'（已经能播）或 'converting'（已开始后台转换，前端轮询再问）。
 */
export async function ensurePaperAudio(params: {
  slug: string
  audioHls: string | null
  audioUrl: string | null
}): Promise<{ status: "ready" | "converting" | "unavailable"; url?: string; percent?: number | null; error?: string }> {
  const { slug, audioHls, audioUrl } = params
  const localPath = join(audioDir("papers"), `${slug}.mp3`)
  const localUrl = audioFileUrl("papers", `${slug}.mp3`)

  // 只认体积合理的成品：转码中途被打断会留下很小的残文件，不能当成品播
  if (await exists(localPath)) {
    const s = await stat(localPath)
    if (s.size > MIN_VALID_BYTES) return { status: "ready", url: localUrl }
    await rm(localPath, { force: true }).catch(() => {})
  }

  // 有直链就先用直链，不用转码
  if (audioUrl) return { status: "ready", url: audioUrl }

  if (!audioHls) return { status: "unavailable", error: "这套真题没有听力音频" }

  const running = jobs.get(slug)
  if (running) {
    if (running.done) {
      return running.error
        ? { status: "unavailable", error: running.error }
        : { status: "ready", url: running.url ?? localUrl }
    }
    return { status: "converting", percent: running.percent }
  }

  // 开一个后台转码任务
  const job: ConvertJob = { slug, startedAt: Date.now(), percent: 0, done: false, error: null, url: null }
  jobs.set(slug, job)
  void runConversion(slug, audioHls, localPath, localUrl, job)
  return { status: "converting", percent: 0 }
}

async function runConversion(slug: string, hls: string, outPath: string, outUrl: string, job: ConvertJob) {
  // 先写临时文件：这样即使进程被杀（比如 dev server 热重载），也不会留下一个能骗过校验的残成品。
  // 注意临时名也得保留 .mp3 后缀，否则 ffmpeg 认不出输出格式。
  const partPath = outPath.replace(/\.mp3$/, ".part.mp3")
  try {
    await ensureAudioDir("papers")
    await rm(partPath, { force: true }).catch(() => {})
    const duration = await probeDuration(hls)
    await new Promise<void>((resolve, reject) => {
      const args = [
        "-y",
        "-loglevel",
        "error",
        "-i",
        hls,
        "-vn",
        "-acodec",
        "libmp3lame",
        "-b:a",
        "96k",
        // 把进度打到 stdout，便于换算百分比
        "-progress",
        "pipe:1",
        "-nostats",
        partPath,
      ]
      const p = spawn("ffmpeg", args)
      let buf = ""
      p.stdout.on("data", (d) => {
        buf += d.toString()
        const lines = buf.split("\n")
        buf = lines.pop() ?? ""
        for (const line of lines) {
          const m = line.match(/^out_time_us=(\d+)/)
          if (m && duration) {
            const sec = Number(m[1]) / 1_000_000
            job.percent = Math.max(0, Math.min(99, Math.round((sec / duration) * 100)))
          }
        }
      })
      let err = ""
      p.stderr.on("data", (d) => (err += d.toString()))
      p.on("error", (e) => reject(new Error(`ffmpeg 启动失败：${e.message}（是否安装了 ffmpeg？）`)))
      p.on("close", (code) => {
        if (code === 0) resolve()
        else reject(new Error(`ffmpeg 退出码 ${code}：${err.slice(-300)}`))
      })
    })
    // 校验产物：时长太短说明流被截断，宁可报错也不要缓存一个残缺的听力
    const made = await probeDuration(partPath)
    if (!made || made < MIN_VALID_SECONDS) {
      throw new Error(`转码产物只有 ${made ? Math.round(made) : "?"} 秒，疑似流被截断（应为 ${duration ? Math.round(duration) : "?"} 秒）`)
    }
    await rename(partPath, outPath)
    job.done = true
    job.percent = 100
    job.url = outUrl
    console.log(`[cet6 audio] ${slug} 转码完成 ${Math.round(made)}s → ${outUrl}`)
  } catch (e) {
    await rm(partPath, { force: true }).catch(() => {})
    job.done = true
    job.error = e instanceof Error ? e.message : String(e)
    console.error(`[cet6 audio] ${slug} 转码失败：`, job.error)
  }
}
