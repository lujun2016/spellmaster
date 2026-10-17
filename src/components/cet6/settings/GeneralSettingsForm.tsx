"use client"

import { useState, useTransition } from "react"
import { saveSettingsAction } from "@/app/cet6/settings/actions"

const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"

/**
 * 学习计划设置：考试日期、每日新词量、每日复习上限、自动规划开关。
 *
 * autoPlan 的语义容易记错，所以在界面上直接把它当前算出来的数字写出来：
 * 「自动值 40，设置值 60 → 实际每天 60」，用户不用去猜取哪个。
 */
export function GeneralSettingsForm({
  examDate,
  dailyNewWords,
  dailyMaxReviews,
  autoPlan,
  autoValue,
  autoNote,
  effectiveValue,
  daysLeft,
}: {
  examDate: string
  dailyNewWords: number
  dailyMaxReviews: number
  autoPlan: boolean
  autoValue: number
  autoNote: string
  effectiveValue: number
  daysLeft: number
}) {
  const [form, setForm] = useState({
    examDate,
    dailyNewWords: String(dailyNewWords),
    dailyMaxReviews: String(dailyMaxReviews),
    autoPlan,
  })
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  function save() {
    startTransition(async () => {
      const res = await saveSettingsAction({
        examDate: form.examDate,
        dailyNewWords: form.dailyNewWords,
        dailyMaxReviews: form.dailyMaxReviews,
        autoPlan: form.autoPlan ? "1" : "0",
      })
      setMsg({ ok: res.ok, text: res.message })
    })
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">学习计划</h2>
      <p className="mt-0.5 text-xs text-slate-400">决定首页「今天要背多少」的数字，改完立刻生效</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-slate-500">
          考试日期
          <input
            type="date"
            value={form.examDate}
            onChange={(e) => setForm({ ...form, examDate: e.target.value })}
            className={`mt-1 ${inputCls}`}
          />
          <span className="mt-1 block text-[11px] text-slate-400">
            {daysLeft >= 0 ? `距今 ${daysLeft} 天` : `已过去 ${-daysLeft} 天，记得改成下一次考试`}
          </span>
        </label>

        <label className="text-xs text-slate-500">
          每日新词量（设置值）
          <input
            type="number"
            min={0}
            max={200}
            value={form.dailyNewWords}
            onChange={(e) => setForm({ ...form, dailyNewWords: e.target.value })}
            className={`mt-1 ${inputCls}`}
          />
          <span className="mt-1 block text-[11px] text-slate-400">自动规划打开时，这个值是下限</span>
        </label>

        <label className="text-xs text-slate-500">
          每日复习上限
          <input
            type="number"
            min={0}
            max={1000}
            value={form.dailyMaxReviews}
            onChange={(e) => setForm({ ...form, dailyMaxReviews: e.target.value })}
            className={`mt-1 ${inputCls}`}
          />
          <span className="mt-1 block text-[11px] text-slate-400">
            一天最多发多少张到期卡，防止积压太多直接劝退
          </span>
        </label>

        <div className="text-xs text-slate-500">
          自动规划每日新词
          <label className="mt-1 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
            <input
              type="checkbox"
              checked={form.autoPlan}
              onChange={(e) => setForm({ ...form, autoPlan: e.target.checked })}
            />
            <span className="text-sm text-slate-700">{form.autoPlan ? "已打开" : "已关闭"}</span>
          </label>
          <span className="mt-1 block text-[11px] text-slate-400">
            打开后按「剩余词数 ÷ 剩余天数」自动算，并与上面的设置值取较大者
          </span>
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-[11px] leading-relaxed text-slate-500">
        当前：自动值 <b className="text-slate-700">{autoValue}</b> 个/天 · 设置值{" "}
        <b className="text-slate-700">{form.dailyNewWords || 0}</b> 个/天 → 实际每天{" "}
        <b className="text-indigo-700">{form.autoPlan ? Math.max(autoValue, Number(form.dailyNewWords) || 0) : Number(form.dailyNewWords) || 0}</b>{" "}
        个新词。
        <br />
        {autoNote}
        {form.autoPlan !== autoPlan && "（这是按未保存的值预览，点保存后生效）"}
        {effectiveValue > 0 && form.autoPlan === autoPlan && ` 首页当前显示 ${effectiveValue} 个。`}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={save}
          disabled={pending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {pending ? "保存中…" : "保存"}
        </button>
        {msg && <span className={msg.ok ? "text-xs text-emerald-600" : "text-xs text-rose-600"}>{msg.text}</span>}
      </div>
    </section>
  )
}
