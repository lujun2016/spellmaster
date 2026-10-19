"use server"

/**
 * 设置页的 server actions。
 *
 * 几件事必须在这儿把关，不能只靠界面：
 *  1. 只允许写白名单里的 Setting 键——否则客户端传什么键就能往库里塞什么键；
 *  2. 数值做范围校验（比如 ttsRate 越界会让发音变得没法听）；
 *  3. 危险操作要求 confirm === "DELETE"，界面上输错一个字都执行不了。
 */
import { revalidatePath } from "next/cache"
import { chatCompletionsUrl } from "@/components/cet6/settings/llmProviders"
import { db } from "@/lib/cet6/db"
import { setSetting } from "@/lib/cet6/service"

/** 允许从设置页写入的键（其余一律拒绝） */
const ALLOWED_KEYS = new Set([
  "examDate",
  "regStartDate",
  "regEndDate",
  "dailyNewWords",
  "dailyMaxReviews",
  "autoPlan",
  "ttsVoice",
  "ttsRate",
  "llmProvider",
  "llmModel",
  "llmApiKey",
  "llmBaseUrl",
])

const TTS_VOICES = new Set(["en-US", "en-GB"])

function clampInt(v: number, lo: number, hi: number): number {
  if (!Number.isFinite(v)) return lo
  return Math.max(lo, Math.min(hi, Math.round(v)))
}

/** 逐字段校验；返回错误信息或 null（通过） */
function validate(key: string, value: string): string | null {
  switch (key) {
    case "examDate":
      return /^\d{4}-\d{2}-\d{2}$/.test(value) ? null : "考试日期格式不对，应该是 YYYY-MM-DD"
    case "dailyNewWords": {
      const n = Number(value)
      return Number.isFinite(n) && n >= 0 && n <= 200 ? null : "每日新词量要在 0–200 之间"
    }
    case "dailyMaxReviews": {
      const n = Number(value)
      return Number.isFinite(n) && n >= 0 && n <= 1000 ? null : "每日复习上限要在 0–1000 之间"
    }
    case "ttsRate": {
      const n = Number(value)
      return Number.isFinite(n) && n >= 0.6 && n <= 1.5 ? null : "语速要在 0.6–1.5 之间"
    }
    case "ttsVoice":
      return TTS_VOICES.has(value) ? null : "音色只能是 en-US 或 en-GB"
    case "autoPlan":
      return value === "0" || value === "1" ? null : "autoPlan 只能是 0 或 1"
    default:
      return null
  }
}

/** 归一化后再落库：数字键存字符串形式的规范值，避免 "40.0"/" 40 " 这类脏数据 */
function normalize(key: string, value: string): string {
  const v = value.trim()
  switch (key) {
    case "dailyNewWords":
      return String(clampInt(Number(v), 0, 200))
    case "dailyMaxReviews":
      return String(clampInt(Number(v), 0, 1000))
    case "ttsRate":
      return String(Math.max(0.6, Math.min(1.5, Number(v) || 1)))
    default:
      return v
  }
}

export type SaveResult = { ok: boolean; message: string; saved?: string[] }

/** 批量保存设置（表单一次提交多个字段，省得每个字段一个 action） */
export async function saveSettingsAction(entries: Record<string, string>): Promise<SaveResult> {
  const saved: string[] = []
  for (const [key, raw] of Object.entries(entries)) {
    if (!ALLOWED_KEYS.has(key)) return { ok: false, message: `不允许修改的设置项：${key}` }
    const err = validate(key, String(raw ?? "").trim())
    if (err) return { ok: false, message: err }
    await setSetting(key, normalize(key, String(raw ?? "")))
    saved.push(key)
  }

  revalidatePath("/cet6")
  revalidatePath("/cet6/settings")
  revalidatePath("/cet6/vocab")
  return { ok: true, message: `已保存 ${saved.length} 项设置`, saved }
}

// ==================== 大模型连通性测试 ====================

export type LlmTestResult = {
  ok: boolean
  /** 给用户看的一句话结论（成功是模型回复，失败是具体原因） */
  message: string
  /** 实际请求的地址，方便排查 base_url 拼错 */
  url?: string
  /** HTTP 状态码，网络层失败时没有 */
  status?: number
  /** 耗时毫秒 */
  ms?: number
  /** 出错时附上响应体片段，别让错误静默 */
  detail?: string
}

/**
 * 用「已保存的」key 打一次 /chat/completions（发一句 ping）。
 *
 * 刻意只读数据库里的设置、不接受前端传 key：测试的内容必须和真实调用时用的完全一致，
 * 否则测通了也没意义。所以界面上点测试之前会先保存表单。
 */
export async function testLlmConnectionAction(): Promise<LlmTestResult> {
  const rows = await db.setting.findMany()
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]))

  // Setting 表为空时回落到 .env，方便先用 .env 试通再决定要不要存进库
  const apiKey = (map.llmApiKey || process.env.LLM_API_KEY || "").trim()
  const baseUrl = (map.llmBaseUrl || process.env.LLM_BASE_URL || "").trim()
  const model = (map.llmModel || process.env.LLM_MODEL || "").trim()
  const fromEnv = !map.llmApiKey && Boolean(process.env.LLM_API_KEY)

  if (!baseUrl) return { ok: false, message: "还没填 base_url（选个厂商会自动填）" }
  if (!apiKey) return { ok: false, message: "还没填 API Key" }
  if (!model) return { ok: false, message: "还没填模型名（model）" }

  const url = chatCompletionsUrl(baseUrl)
  const started = Date.now()

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "ping" }],
        max_tokens: 8,
        stream: false,
      }),
      // 15 秒超时：正常免费模型首字都在 3 秒内，再久基本是地址/key 有问题，没必要干等
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    })
    const ms = Date.now() - started
    const text = await res.text()

    if (!res.ok) {
      return {
        ok: false,
        url,
        status: res.status,
        ms,
        message: `HTTP ${res.status} ${res.statusText || ""}`.trim(),
        detail: text.slice(0, 600),
      }
    }

    let content = ""
    try {
      const data = JSON.parse(text) as {
        choices?: Array<{ message?: { content?: string }; text?: string }>
      }
      content = data.choices?.[0]?.message?.content ?? data.choices?.[0]?.text ?? ""
    } catch {
      // 返回不是 JSON：有些网关会回纯文本，直接把原文当结果展示
      content = text.slice(0, 200)
    }

    return {
      ok: true,
      url,
      status: res.status,
      ms,
      message: content.trim() || "（接口返回 200，但内容为空，可能是模型不支持该参数）",
      detail: fromEnv ? "用的是 .env 里的 LLM_API_KEY（Setting 表里没存 key）" : undefined,
    }
  } catch (e) {
    const ms = Date.now() - started
    const err = e as Error
    const isTimeout = err.name === "TimeoutError" || err.name === "AbortError"
    const cause = describeCause(err)
    return {
      ok: false,
      url,
      ms,
      // fetch 只会抛 "fetch failed"，真正有用的原因（ECONNREFUSED / DNS / 证书）在 cause 里，
      // 不挖出来的话用户只知道「失败了」，没法判断是地址写错还是网断了
      message: isTimeout ? "超时：15 秒内没有响应" : `请求失败：${err.message}${cause ? `（${cause}）` : ""}`,
      detail: cause ? `底层错误：${cause}` : undefined,
    }
  }
}

/** 从 fetch 的异常链里挖出可读原因（undici 会把多地址的失败包成 AggregateError） */
function describeCause(err: unknown): string | undefined {
  const cause = (err as { cause?: unknown }).cause
  if (!cause) return undefined
  const nested = (cause as { errors?: unknown[] }).errors
  const items = Array.isArray(nested) && nested.length ? nested : [cause]
  const text = items
    .map((item) => {
      const e = item as { code?: string; message?: string }
      return [e.code, e.message].filter(Boolean).join(" ")
    })
    .filter(Boolean)
    .join("; ")
  return text ? text.slice(0, 300) : String(cause).slice(0, 300)
}

// ==================== 危险操作（必须输入 DELETE） ====================

const CONFIRM_WORD = "DELETE"

export type DangerResult = { ok: boolean; message: string }

/** 清空词汇复习进度：只删 WordProgress，词库/真题/错题本/统计都不动 */
export async function resetWordProgressAction(confirm: string): Promise<DangerResult> {
  if (confirm !== CONFIRM_WORD) return { ok: false, message: `请输入 ${CONFIRM_WORD} 确认` }
  const before = await db.wordProgress.count()
  const res = await db.wordProgress.deleteMany()
  revalidatePath("/cet6")
  revalidatePath("/cet6/vocab")
  revalidatePath("/cet6/vocab/list")
  revalidatePath("/cet6/stats")
  revalidatePath("/cet6/settings")
  return { ok: true, message: `已清空 ${res.count} 条复习进度（清空前 ${before} 条），词库和真题没动` }
}

/** 清空统计：DailyStat + StudySession，学习进度和错题本都保留 */
export async function clearStatsAction(confirm: string): Promise<DangerResult> {
  if (confirm !== CONFIRM_WORD) return { ok: false, message: `请输入 ${CONFIRM_WORD} 确认` }
  const [stats, sessions] = await Promise.all([db.dailyStat.deleteMany(), db.studySession.deleteMany()])
  revalidatePath("/cet6")
  revalidatePath("/cet6/stats")
  revalidatePath("/cet6/settings")
  return { ok: true, message: `已删除 ${stats.count} 天统计和 ${sessions.count} 条学习会话` }
}
