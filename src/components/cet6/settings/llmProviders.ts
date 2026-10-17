/**
 * 免费大模型的接入预设。
 *
 * 这些厂商都提供 OpenAI 兼容的 /chat/completions 接口，所以只要 base_url + model + key
 * 三个值就能通吃，切换厂商不需要改代码——这也是当初不接某个 SDK 的原因。
 * 预设只是省得手敲 URL：选一个厂商就把 base_url/model 填好，用户还能自己改。
 */

export type LlmProvider = {
  id: string
  label: string
  /** OpenAI 兼容接口的根地址（不带 /chat/completions） */
  baseUrl: string
  /** 该厂商常用的便宜/免费模型，只是默认值，可以改 */
  model: string
  note: string
}

export const LLM_PROVIDERS: LlmProvider[] = [
  {
    id: "zhipu",
    label: "智谱 GLM",
    baseUrl: "https://open.bigmodel.cn/api/paas/v4",
    model: "glm-4.7-flash",
    note: "4.x 代 Flash 免费（5.3-Flash 已转付费）；目前不强制实名；Key 在 bigmodel.cn/usercenter/proj-mgmt/apikeys",
  },
  {
    id: "doubao",
    label: "火山方舟（豆包）",
    baseUrl: "https://ark.cn-beijing.volces.com/api/v3",
    model: "doubao-seed-2.0-mini",
    note: "model 也可以填控制台里的推理接入点 ID（ep- 开头）",
  },
  {
    id: "siliconflow",
    label: "硅基流动 SiliconFlow",
    baseUrl: "https://api.siliconflow.cn/v1",
    model: "XingChenAGI/Xing4.0-29B",
    note: "免费对话模型目前是 Xing4.0-29B，且必须实名后才能用免费模型；model 要写全名（含斜杠）",
  },
  {
    id: "modelscope",
    label: "魔搭 ModelScope",
    baseUrl: "https://api-inference.modelscope.cn/v1",
    model: "ZhipuAI/GLM-4.7-Flash",
    note: "免费池里就有 GLM-4.7-Flash（实测 /v1/models 可列出）；key 在个人中心访问令牌里，需绑阿里云实名",
  },
  {
    id: "deepseek",
    label: "DeepSeek",
    baseUrl: "https://api.deepseek.com",
    model: "deepseek-flash",
    note: "不免费但很便宜（空闲时段半价，一次作文批改约 5 厘），适合质量要求高的批改/翻译",
  },
  {
    id: "dashscope",
    label: "阿里云百炼（通义千问）",
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    model: "qwen-flash",
    note: "新用户每个模型 100 万 tokens / 90 天，无需实名即可领（用完即停，仅北京地域）",
  },
  {
    id: "spark",
    label: "讯飞星火 Lite",
    baseUrl: "https://spark-api-open.xf-yun.com/v1",
    model: "lite",
    note: "Lite 长期免费，但输入仅 8K / 输出仅 4K，长文章讲解会被截断，只当兜底",
  },
  {
    id: "custom",
    label: "自定义（OpenAI 兼容）",
    baseUrl: "",
    model: "",
    note: "本地 ollama/vLLM 也走这里，例如 http://localhost:11434/v1",
  },
]

export function findProvider(id: string): LlmProvider | undefined {
  return LLM_PROVIDERS.find((p) => p.id === id)
}

/**
 * 把用户填的 base_url 拼成聊天接口地址。
 * 容忍三种写法：只写域名、写了 /v1、直接把完整地址粘进来（避免拼出 /chat/completions/chat/completions）。
 */
export function chatCompletionsUrl(baseUrl: string): string {
  const trimmed = baseUrl.trim().replace(/\/+$/, "")
  if (!trimmed) return ""
  if (trimmed.endsWith("/chat/completions")) return trimmed
  return `${trimmed}/chat/completions`
}
