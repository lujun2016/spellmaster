/**
 * 语音合成接口（免费、无 key）。
 *
 * GET  /api/cet6/tts?text=hello&rate=1&lang=en        → { url }
 * POST /api/cet6/tts  { texts: string[], rate?: number } → { urls: (string|null)[] }
 *
 * 合成结果按内容哈希缓存在 public/audio/tts/，同一句话只会真正请求一次。
 * 客户端拿不到 url 时应该回落到浏览器 speechSynthesis（见 src/lib/cet6/audio.ts）。
 */
import { NextResponse } from "next/server"
import { synthesizeSpeech } from "@/lib/cet6/tts"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const text = searchParams.get("text") ?? ""
  const rate = Number(searchParams.get("rate") ?? 1)
  const lang = (searchParams.get("lang") ?? "en") === "zh" ? "zh" : "en"

  if (!text.trim()) return NextResponse.json({ error: "缺少 text 参数" }, { status: 400 })

  try {
    const res = await synthesizeSpeech(text, { rate, lang })
    return NextResponse.json({ url: res.url, cached: res.cached })
  } catch (e) {
    // 合成失败不算致命：前端会回落到 Web Speech
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 502 })
  }
}

export async function POST(req: Request) {
  let body: { texts?: unknown; rate?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "请求体不是合法 JSON" }, { status: 400 })
  }

  const texts = Array.isArray(body.texts) ? body.texts.filter((t): t is string => typeof t === "string") : []
  const rate = typeof body.rate === "number" ? body.rate : 1
  if (!texts.length) return NextResponse.json({ error: "texts 不能为空" }, { status: 400 })
  // 一次别要太多，避免把免费接口打挂
  if (texts.length > 60) return NextResponse.json({ error: "一次最多 60 句" }, { status: 400 })

  const urls: Array<string | null> = []
  for (const t of texts) {
    try {
      const r = await synthesizeSpeech(t, { rate, lang: "en" })
      urls.push(r.url)
    } catch {
      urls.push(null)
    }
  }
  return NextResponse.json({ urls })
}
