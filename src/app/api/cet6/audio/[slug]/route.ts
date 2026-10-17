/**
 * 真题听力音频接口。
 *
 * GET /api/cet6/audio/<slug>
 *   → { status: "ready", url }           可以直接丢给 <audio src>
 *   → { status: "converting", percent }  正在后台转码（m3u8 → mp3），前端隔几秒再问
 *   → { status: "unavailable", error }   这套没有音频或转码失败
 *
 * 转码用本机 ffmpeg，只做一次，之后命中 public/audio/papers/<slug>.mp3。
 */
import { NextResponse } from "next/server"
import { db } from "@/lib/cet6/db"
import { ensurePaperAudio } from "@/lib/cet6/paper-audio"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const paper = await db.paper.findUnique({
    where: { slug },
    select: { slug: true, audioUrl: true, audioHls: true },
  })
  if (!paper) return NextResponse.json({ status: "unavailable", error: "找不到这套真题" }, { status: 404 })

  try {
    const result = await ensurePaperAudio({
      slug: paper.slug,
      audioUrl: paper.audioUrl,
      audioHls: paper.audioHls,
    })
    // 音频真的可播了才算"听过"（列表里据此标已听过并排后面）
    if (result.status === "ready" && paper) {
      const p = await db.paper.findUnique({ where: { slug }, select: { id: true, listenedAt: true } })
      if (p && !p.listenedAt) {
        await db.paper.update({ where: { id: p.id }, data: { listenedAt: new Date() } })
      }
    }
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json(
      { status: "unavailable", error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    )
  }
}
