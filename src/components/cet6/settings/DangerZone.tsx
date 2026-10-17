"use client"

import { useState, useTransition } from "react"
import { clearStatsAction, resetWordProgressAction } from "@/app/cet6/settings/actions"

/**
 * 危险操作。
 *
 * 二次确认用「输入 DELETE」而不是 window.confirm：
 * 浏览器弹窗手快点掉太容易，打字这个动作逼人确认一次自己在干什么。
 * 服务端 action 里也再校验一遍，绕过界面直接调也删不掉。
 */
function DangerBlock({
  title,
  desc,
  detail,
  label,
  onRun,
}: {
  title: string
  desc: string
  detail: string
  label: string
  onRun: (confirm: string) => Promise<{ ok: boolean; message: string }>
}) {
  const [text, setText] = useState("")
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  function run() {
    startTransition(async () => {
      const res = await onRun(text)
      setMsg({ ok: res.ok, text: res.message })
      if (res.ok) setText("")
    })
  }

  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50/40 p-4">
      <h3 className="text-sm font-semibold text-rose-900">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-rose-800">{desc}</p>
      <p className="mt-1 text-[11px] text-rose-700/80">{detail}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入 DELETE 以确认"
          className="rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-rose-400"
        />
        <button
          onClick={run}
          // 没输入正确的确认词就点不动，避免误点
          disabled={pending || text !== "DELETE"}
          className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "执行中…" : label}
        </button>
        {msg && (
          <span className={msg.ok ? "text-xs text-emerald-700" : "text-xs text-rose-700"}>{msg.text}</span>
        )}
      </div>
    </div>
  )
}

export function DangerZone() {
  return (
    <section className="rounded-xl border border-rose-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">危险操作</h2>
      <p className="mt-0.5 text-xs text-slate-400">
        两个操作都不可撤销。这里刻意不提供「删除词库 / 删除真题」的入口——那些是数据资产，删了得重新灌库。
      </p>

      <div className="mt-4 space-y-3">
        <DangerBlock
          title="清空词汇复习进度"
          desc="删除全部 WordProgress：所有词的记忆阶段、到期时间、复习次数、掌握度归零，等于词从「没学过」重新开始。"
          detail="保留：词库、真题、错题本、每日统计。首页会重新从第 1 个单词开始发新词。"
          label="清空复习进度"
          onRun={resetWordProgressAction}
        />
        <DangerBlock
          title="清空打卡统计"
          desc="删除全部 DailyStat 和 StudySession：热力图、连续打卡、累计时长、正确率趋势、模块分布全部清零。"
          detail="保留：词汇复习进度、错题本、真题记录。真题练习记录（PaperAttempt）不受影响。"
          label="清空统计"
          onRun={clearStatsAction}
        />
      </div>
    </section>
  )
}
