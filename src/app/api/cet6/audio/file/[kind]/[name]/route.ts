/**
 * 音频流接口：GET /api/cet6/audio/file/<kind>/<name>
 *   kind: tts（合成音频）| papers（真题听力）
 *
 * 支持 Range 请求，这样 <audio> 才能拖动进度条。
 */
import { streamAudio, type AudioKind } from "@/lib/cet6/audio-store"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(req: Request, { params }: { params: Promise<{ kind: string; name: string }> }) {
  const { kind, name } = await params
  if (kind !== "tts" && kind !== "papers") {
    return new Response("unknown kind", { status: 400 })
  }

  const result = await streamAudio(kind as AudioKind, name, req.headers.get("range"))
  if (!result.body) {
    return new Response(result.status === 416 ? "range not satisfiable" : "not found", {
      status: result.status,
      headers: result.headers,
    })
  }
  return new Response(result.body, { status: result.status, headers: result.headers })
}
