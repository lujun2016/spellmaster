/**
 * 语音合成（服务端）。
 *
 * 产物放在 .cet6-audio/tts/（不在 public/ 下，避免 Next dev 的 watcher 被写文件搅动），
 * 通过 /api/cet6/audio/file/tts/<name> 播放。
 *
 * 免费的几条路子里，实测可用的是百度翻译的 gettts 接口：
 *   https://fanyi.baidu.com/gettts?lan=en&text=...&spd=3&source=web
 * 它对整段文本（实测 224 字符）也能返回 MP3，且 spd 能调语速，不需要 key。
 * 有道的 dictvoice 只适合单词/短句（长句直接 500），所以单词发音走客户端 audio.ts，长文本走这里。
 *
 * 合成的结果按「文本 + 语速 + 语言」做内容哈希缓存到 public/audio/tts/，
 * 同一句话只请求一次，之后直接命中本地文件（离线也能放）。
 */
import { createHash } from "node:crypto"
import { writeFile, access } from "node:fs/promises"
import { join } from "node:path"
import { audioDir, audioFileUrl, ensureAudioDir } from "./audio-store"
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

export type SynthesizeOptions = {
  /** 相对语速，1 为正常；会被映射成百度的 spd(1..5) */
  rate?: number
  lang?: "en" | "zh"
}

/** 相对语速 → 百度 spd 档位 */
function rateToSpd(rate: number): number {
  if (rate <= 0.7) return 1
  if (rate <= 0.9) return 2
  if (rate <= 1.1) return 3
  if (rate <= 1.3) return 4
  return 5
}

async function exists(path: string) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

/** 缓存文件名：内容哈希，避免非法字符进文件名 */
function cacheName(text: string, rate: number, lang: string) {
  return createHash("sha1").update(`${lang}|${rate}|${text}`).digest("hex") + ".mp3"
}

export type SynthesizeResult = {
  url: string
  cached: boolean
  bytes: number
}

/**
 * 合成一段语音，返回可直接播放的 public 路径。
 * 走不通时抛错，由调用方（比如听力页面）回落到浏览器 speechSynthesis。
 */
export async function synthesizeSpeech(text: string, opts: SynthesizeOptions = {}): Promise<SynthesizeResult> {
  const clean = text.replace(/\s+/g, " ").trim()
  if (!clean) throw new Error("文本为空")
  // 百度接口对超长文本会截断，这里按 800 字符分段保护（超长文本请调用方先分句）
  if (clean.length > 800) throw new Error(`文本过长（${clean.length} 字符），请先分句再合成`)

  const rate = opts.rate ?? 1
  const lang = opts.lang ?? "en"
  await ensureAudioDir("tts")

  const name = cacheName(clean, rate, lang)
  const file = join(audioDir("tts"), name)
  const publicUrl = audioFileUrl("tts", name)
  if (await exists(file)) {
    return { url: publicUrl, cached: true, bytes: 0 }
  }

  const spd = rateToSpd(rate)
  const apiUrl = `https://fanyi.baidu.com/gettts?lan=${lang}&text=${encodeURIComponent(clean)}&spd=${spd}&source=web`
  const res = await fetch(apiUrl, {
    headers: { "User-Agent": UA, Referer: "https://fanyi.baidu.com/" },
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) throw new Error(`TTS 接口返回 ${res.status}`)

  const buf = Buffer.from(await res.arrayBuffer())
  // 接口异常时会返回 JSON 错误体而不是音频，这里挡一下
  if (buf.length < 1000 || buf.subarray(0, 1).toString() === "{") {
    throw new Error(`TTS 返回的不是音频（${buf.length} 字节）`)
  }

  await writeFile(file, buf)
  return { url: publicUrl, cached: false, bytes: buf.length }
}

/** 批量合成（听力精听按句生成时用），返回每句的音频地址，失败的句子里 url 为 null */
export async function synthesizeSentences(
  sentences: Array<{ en: string }>,
  opts: SynthesizeOptions = {},
): Promise<Array<string | null>> {
  const out: Array<string | null> = []
  for (const s of sentences) {
    try {
      const r = await synthesizeSpeech(s.en, opts)
      out.push(r.url)
    } catch {
      out.push(null)
    }
  }
  return out
}
