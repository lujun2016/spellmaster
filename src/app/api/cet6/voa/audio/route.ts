/**
 * VOA 音频中转：GET /api/cet6/voa/audio?id=<ListeningItem id>
 *
 * 为什么不直接把 https://voa-audio.voanews.eu/xxx.mp3 丢给 <audio>：
 *   本机代理是显式代理（http://127.0.0.1:7892），没有 TUN，浏览器不会自动走它，
 *   直连那个域名大概率一直转圈。所以由服务端用 curl（带代理）把音频拉到
 *   .cet6-audio/voa/<稿件号>.mp3，再按 Range 分片发给浏览器：
 *   首次播放要多等一两秒，之后是本地文件秒开，进度条也能拖。
 *
 * TTS 兜底的条目（音频是原文合成的）只有一个本地路径，直接 302 到已有的文件接口。
 */
import { ensureVoaAudioCached, getVoaAudioTarget, streamVoaAudio, markVoaListened } from "@/lib/cet6/voa"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id") ?? ""
  if (!id) return new Response("缺少 id 参数", { status: 400 })

  let target: Awaited<ReturnType<typeof getVoaAudioTarget>>
  try {
    target = await getVoaAudioTarget(id)
  } catch {
    return new Response("查库失败", { status: 500 })
  }
  if (!target) return new Response("这条没有音频", { status: 404 })

  // 走到这里说明客户端真的在取音频了 —— 记为"已听过"（只记第一次）
  void markVoaListened(id)

  // TTS 产物已经在 .cet6-audio/tts/ 里，交给现成的文件接口
  if (!/^https?:\/\//i.test(target.audioUrl)) {
    return Response.redirect(new URL(target.audioUrl, req.url), 302)
  }

  let file: string
  try {
    file = await ensureVoaAudioCached(target.externalId, target.audioUrl)
  } catch (e) {
    // 代理不通时这里会失败：给个明确的状态码，前端会回落到直链 / 逐句 TTS
    return new Response(`音频下载失败：${e instanceof Error ? e.message : String(e)}`, { status: 502 })
  }

  const result = await streamVoaAudio(file, req.headers.get("range"))
  if (!result.body) {
    return new Response(result.status === 416 ? "range not satisfiable" : "not found", {
      status: result.status,
      headers: result.headers,
    })
  }
  return new Response(result.body, { status: result.status, headers: result.headers })
}
