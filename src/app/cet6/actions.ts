"use server"

/** 首页/通用 server actions：番茄钟、设置读写 */
import { revalidatePath } from "next/cache"
import { finishPomodoro, setSetting, startPomodoro } from "@/lib/cet6/service"

export async function startPomodoroAction(kind: string) {
  const s = await startPomodoro(kind)
  return { id: s.id }
}

export async function finishPomodoroAction(sessionId: string | null, kind: string, minutes: number) {
  await finishPomodoro(sessionId, kind, minutes)
  revalidatePath("/cet6")
  revalidatePath("/cet6/stats")
  return { ok: true }
}

export async function updateSettingAction(key: string, value: string) {
  await setSetting(key, value)
  revalidatePath("/cet6")
  revalidatePath("/cet6/settings")
  return { ok: true }
}
