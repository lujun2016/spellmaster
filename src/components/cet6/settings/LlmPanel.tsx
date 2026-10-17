"use client"

import { useState, useTransition } from "react"
import { saveSettingsAction, testLlmConnectionAction, type LlmTestResult } from "@/app/cet6/settings/actions"
import { LLM_PROVIDERS, findProvider } from "./llmProviders"

const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"

/**
 * 免费大模型设置。
 *
 * 界面上只有「保存」和「测试连接」两个动作，但测试连接会先保存再请求：
 * 测试必须打的是真实保存下来的那套 (base_url, key, model)，否则测通了自己调用还是失败。
 */
export function LlmPanel({
  provider,
  model,
  baseUrl,
  apiKey,
  envHasKey,
}: {
  provider: string
  model: string
  baseUrl: string
  apiKey: string
  envHasKey: boolean
}) {
  const [form, setForm] = useState({ provider, model, baseUrl, apiKey })
  const [showKey, setShowKey] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [test, setTest] = useState<LlmTestResult | null>(null)
  const [pending, startTransition] = useTransition()

  function pickProvider(id: string) {
    const preset = findProvider(id)
    // 切厂商时把预设地址/模型填上；自定义留空就保留用户已填的内容
    setForm((f) => ({
      ...f,
      provider: id,
      baseUrl: preset?.baseUrl ? preset.baseUrl : f.baseUrl,
      model: preset?.model ? preset.model : f.model,
    }))
    setTest(null)
  }

  function save() {
    startTransition(async () => {
      const res = await saveSettingsAction({
        llmProvider: form.provider,
        llmModel: form.model,
        llmBaseUrl: form.baseUrl,
        llmApiKey: form.apiKey,
      })
      setMsg({ ok: res.ok, text: res.message })
    })
  }

  function saveAndTest() {
    startTransition(async () => {
      const saved = await saveSettingsAction({
        llmProvider: form.provider,
        llmModel: form.model,
        llmBaseUrl: form.baseUrl,
        llmApiKey: form.apiKey,
      })
      setMsg({ ok: saved.ok, text: saved.ok ? "已保存，正在测试…" : saved.message })
      if (!saved.ok) return
      setTest(null)
      const result = await testLlmConnectionAction()
      setTest(result)
    })
  }

  const preset = findProvider(form.provider)

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">免费大模型</h2>
      <p className="mt-0.5 text-xs text-slate-400">
        每日精读的改写、翻译参考、写作批改会用到。厂商都走 OpenAI 兼容接口，换厂商只要换下面三行。
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-slate-500">
          厂商
          <select value={form.provider} onChange={(e) => pickProvider(e.target.value)} className={`mt-1 ${inputCls}`}>
            <option value="">未选择</option>
            {LLM_PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
          {preset && <span className="mt-1 block text-[11px] text-slate-400">{preset.note}</span>}
        </label>

        <label className="text-xs text-slate-500">
          模型（model）
          <input
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            placeholder="glm-4.7-flash / qwen-flash / deepseek-flash"
            className={`mt-1 ${inputCls}`}
          />
        </label>

        <label className="text-xs text-slate-500 sm:col-span-2">
          base_url
          <input
            value={form.baseUrl}
            onChange={(e) => setForm({ ...form, baseUrl: e.target.value })}
            placeholder="https://open.bigmodel.cn/api/paas/v4"
            className={`mt-1 ${inputCls}`}
          />
          <span className="mt-1 block text-[11px] text-slate-400">
            只写到版本号那一层即可，实际请求的是 <code>{form.baseUrl || "<base_url>"}/chat/completions</code>
          </span>
        </label>

        <label className="text-xs text-slate-500 sm:col-span-2">
          API Key
          <span className="mt-1 flex gap-2">
            <input
              type={showKey ? "text" : "password"}
              value={form.apiKey}
              onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
              placeholder={envHasKey ? "留空则用 .env 里的 LLM_API_KEY" : "粘贴厂商控制台里的 Key"}
              className={inputCls}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="shrink-0 rounded-lg border border-slate-200 px-3 text-xs text-slate-600 hover:bg-slate-50"
            >
              {showKey ? "隐藏" : "显示"}
            </button>
          </span>
        </label>
      </div>

      <div className="mt-3 rounded-lg bg-amber-50/70 px-3 py-2 text-[11px] leading-relaxed text-amber-900">
        🔒 Key 只存在本地 SQLite 文件里（<code>prisma/cet6/dev.db</code> 的 Setting 表），不会上传、不会外传。
        只有点「测试连接」或在每日精读里调用大模型时，才会由本机直接发给你选的厂商。
        {envHasKey && " 当前 .env 里也有一份 LLM_API_KEY，Setting 表为空时会回落到它。"}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={save}
          disabled={pending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? "处理中…" : "保存"}
        </button>
        <button
          onClick={saveAndTest}
          disabled={pending}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          测试连接（发一句 ping）
        </button>
        {msg && <span className={msg.ok ? "text-xs text-emerald-600" : "text-xs text-rose-600"}>{msg.text}</span>}
      </div>

      {test && (
        <div
          className={[
            "mt-3 rounded-lg px-3 py-2 text-xs leading-relaxed",
            test.ok ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900",
          ].join(" ")}
        >
          <div className="font-medium">
            {test.ok ? "✓ 连接成功" : "✗ 连接失败"}：{test.message}
          </div>
          <div className="mt-1 space-y-0.5 font-mono text-[11px] opacity-80">
            {test.url && <div>POST {test.url}</div>}
            <div>
              {test.status !== undefined && `HTTP ${test.status} · `}
              {test.ms !== undefined && `${test.ms} ms`}
            </div>
            {test.detail && <div className="whitespace-pre-wrap break-all">{test.detail}</div>}
          </div>
        </div>
      )}
    </section>
  )
}
