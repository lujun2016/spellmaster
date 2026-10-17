/**
 * 免费大模型的调用封装（OpenAI 兼容 /chat/completions）。
 *
 * 设计原则：LLM 是「可选增强」。没有配 key 时所有功能都要能靠本地规则跑通，
 * 这里只负责「有 key 就调一下」，失败一律返回 null，由调用方决定降级行为。
 *
 * key / base_url / model 存在本地 SQLite 的 Setting 表里（设置页写入），
 * 也可以只写在 .env（LLM_API_KEY 等）——两处都读，Setting 优先。
 * 厂商预设与 URL 拼接复用设置页那份 llmProviders.ts，避免两处各写一套。
 */
import { chatCompletionsUrl, findProvider } from "@/components/cet6/settings/llmProviders"
import { db } from "./db"
import { getSettings } from "./service"

export type LlmConfig = {
  provider: string
  baseUrl: string
  model: string
  apiKey: string
  /** 已拼好的 /chat/completions 地址 */
  endpoint: string
  /** 三项齐全才算配好 */
  ready: boolean
  /** key 来自哪里（界面上要如实说明） */
  keyFrom: "setting" | "env" | "none"
}

/** 读当前生效的 LLM 配置：Setting 表优先，其次 .env，最后回落到厂商预设 */
export async function getLlmConfig(): Promise<LlmConfig> {
  const [settings, rows] = await Promise.all([
    getSettings(),
    db.setting.findMany({ where: { key: { in: ["llmApiKey", "llmBaseUrl"] } } }),
  ])
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]))

  const provider = settings.llmProvider || process.env.LLM_PROVIDER || ""
  const preset = findProvider(provider)
  const baseUrl = (map.llmBaseUrl || process.env.LLM_BASE_URL || preset?.baseUrl || "").trim()
  const model = (settings.llmModel || process.env.LLM_MODEL || preset?.model || "").trim()
  const apiKey = (map.llmApiKey || process.env.LLM_API_KEY || "").trim()

  return {
    provider,
    baseUrl,
    model,
    apiKey,
    endpoint: chatCompletionsUrl(baseUrl),
    ready: Boolean(baseUrl && model && apiKey),
    keyFrom: map.llmApiKey ? "setting" : process.env.LLM_API_KEY ? "env" : "none",
  }
}

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string }

/**
 * 调一次对话接口。失败返回 null（打日志，不抛错），调用方据此降级到本地规则。
 */
export async function chat(messages: ChatMessage[], opts: { timeoutMs?: number; maxTokens?: number } = {}) {
  const cfg = await getLlmConfig()
  if (!cfg.ready) return null

  try {
    const res = await fetch(cfg.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cfg.apiKey}` },
      body: JSON.stringify({
        model: cfg.model,
        messages,
        temperature: 0.6,
        max_tokens: opts.maxTokens ?? 1600,
      }),
      signal: AbortSignal.timeout(opts.timeoutMs ?? 45000),
    })
    if (!res.ok) {
      console.warn(`[cet6 llm] ${cfg.provider || "custom"} 返回 ${res.status}：${(await res.text()).slice(0, 200)}`)
      return null
    }
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> }
    const content = data.choices?.[0]?.message?.content
    return content ? content.trim() : null
  } catch (e) {
    console.warn("[cet6 llm] 调用失败：", e instanceof Error ? e.message : e)
    return null
  }
}

/**
 * 让模型输出 JSON 并容错解析。
 * 免费模型经常把 JSON 包在 ```json 代码块里，或前后带解释文字，这里都兜住。
 */
export async function chatJson<T>(
  messages: ChatMessage[],
  opts: { timeoutMs?: number; maxTokens?: number } = {},
): Promise<T | null> {
  const raw = await chat(messages, opts)
  if (!raw) return null
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim()
  const start = cleaned.search(/[[{]/)
  const end = Math.max(cleaned.lastIndexOf("}"), cleaned.lastIndexOf("]"))
  if (start < 0 || end <= start) return null
  try {
    return JSON.parse(cleaned.slice(start, end + 1)) as T
  } catch (e) {
    console.warn("[cet6 llm] JSON 解析失败：", e instanceof Error ? e.message : e)
    return null
  }
}
