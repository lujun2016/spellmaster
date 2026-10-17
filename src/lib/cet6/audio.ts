/**
 * 发音工具（客户端）
 *
 * 两种模式：
 *  1. 真人发音：有道词典的 dictvoice 接口，单词/短语音质更标准（直连国内，无需 key）
 *  2. 合成发音：浏览器 Web Speech API，离线可用、永不失败，长句只能用这个
 *
 * 默认策略：单词优先有道，失败或无网络时自动回落到 Web Speech；
 * 长句（>3 个词）直接用 Web Speech，因为有道对长句会返回 500。
 */
export type SpeakOptions = {
  /** "uk" 英音 | "us" 美音 */
  accent?: "uk" | "us"
  /** 语速，1 为正常 */
  rate?: number
  /** 强制用浏览器合成，不走网络 */
  forceSynth?: boolean
}

let cachedVoices: SpeechSynthesisVoice[] = []

function pickVoice(accent: "uk" | "us"): SpeechSynthesisVoice | undefined {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return undefined
  if (!cachedVoices.length) cachedVoices = window.speechSynthesis.getVoices()
  const want = accent === "uk" ? "en-GB" : "en-US"
  return (
    cachedVoices.find((v) => v.lang === want && /Samantha|Daniel|Google|Microsoft/i.test(v.name)) ||
    cachedVoices.find((v) => v.lang === want) ||
    cachedVoices.find((v) => v.lang.startsWith("en"))
  )
}

/** 有道发音直链：type=1 英音，type=2 美音 */
export function youdaoUrl(text: string, accent: "uk" | "us" = "us"): string {
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=${accent === "uk" ? 1 : 2}`
}

/** 用 Web Speech 朗读任意长度文本 */
export function speakSynth(text: string, opts: SpeakOptions = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = opts.accent === "uk" ? "en-GB" : "en-US"
  u.rate = opts.rate ?? 1
  const voice = pickVoice(opts.accent ?? "us")
  if (voice) u.voice = voice
  synth.speak(u)
}

/**
 * 朗读一个单词/句子。
 * 返回实际使用的模式，方便 UI 显示"真人发音 / 合成发音"。
 */
export async function speak(text: string, opts: SpeakOptions = {}): Promise<"youdao" | "synth"> {
  const trimmed = text.trim()
  if (!trimmed) return "synth"

  const isShort = trimmed.split(/\s+/).length <= 3 && trimmed.length <= 40
  if (!opts.forceSynth && isShort) {
    try {
      await playUrl(youdaoUrl(trimmed, opts.accent ?? "us"))
      return "youdao"
    } catch {
      // 网络不通就回落到合成发音，不打扰用户
    }
  }
  speakSynth(trimmed, opts)
  return "synth"
}

/** 播放一个音频 URL，失败时 reject（调用方决定是否回落） */
export function playUrl(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("no window"))
    const audio = new Audio(url)
    audio.onended = () => resolve()
    audio.onerror = () => reject(new Error("audio error"))
    // 兜底：4 秒还播不出来就当作失败
    const timer = setTimeout(() => reject(new Error("audio timeout")), 4000)
    audio.onended = () => {
      clearTimeout(timer)
      resolve()
    }
    audio.play().catch((e) => {
      clearTimeout(timer)
      reject(e)
    })
  })
}

/** 提前把常用音色列表加载好（Chrome 首次 getVoices 是空的） */
export function warmupVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return
  cachedVoices = window.speechSynthesis.getVoices()
  if (!cachedVoices.length) {
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices()
    }
  }
}
