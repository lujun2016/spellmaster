import { statSync } from "node:fs"
import path from "node:path"
import { DangerZone } from "@/components/cet6/settings/DangerZone"
import { GeneralSettingsForm } from "@/components/cet6/settings/GeneralSettingsForm"
import { LlmPanel } from "@/components/cet6/settings/LlmPanel"
import { TtsPanel } from "@/components/cet6/settings/TtsPanel"
import { db } from "@/lib/cet6/db"
import { effectiveDailyNew, getDashboardStats, getSettings } from "@/lib/cet6/service"
import { planDailyNewWords } from "@/lib/cet6/srs"

export const dynamic = "force-dynamic"

/**
 * SQLite 文件的真实路径。
 *
 * .env 里写的是 `file:./dev.db` 这种相对路径，它是相对 schema.prisma 所在目录（prisma/cet6/）
 * 解析的，跟进程 cwd 无关——所以这里按同样的规则拼，才能把「复制这个文件就是备份」说准。
 */
function resolveDbPath(): string {
  const raw = process.env.CET6_DATABASE_URL ?? "file:./dev.db"
  const p = raw.replace(/^file:/, "")
  return path.isAbsolute(p) ? p : path.join(process.cwd(), "prisma/cet6", p)
}

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/**
 * 设置页。
 *
 * 读的时候有两套来源，注意别混：
 *  - getSettings() 给的是「带默认值的业务配置」，界面绑定用它；
 *  - Setting 表原始行用来显示 llmApiKey/llmBaseUrl（这两个键不在 getSettings 的返回里）。
 */
export default async function SettingsPage() {
  const [settings, stat, rows] = await Promise.all([getSettings(), getDashboardStats(), db.setting.findMany()])
  const raw = Object.fromEntries(rows.map((r) => [r.key, r.value]))

  // 自动规划的实际数值：跟首页/词汇页共用同一套算法，保证页面上看到的数字一致。
  // 另外单独算一次「纯自动值」，因为 effectiveDailyNew 返回的是取过较大值之后的结果，
  // 界面上要能把「自动值 / 设置值 / 实际值」三个数字分别说清楚。
  const daily = effectiveDailyNew({
    settings,
    totalWords: stat.totalWords,
    learnedWords: stat.learnedWords,
    daysLeft: stat.daysLeft,
  })
  const autoPlan = planDailyNewWords({
    totalWords: stat.totalWords,
    learnedWords: stat.learnedWords,
    daysLeft: stat.daysLeft,
  })

  const dbPath = resolveDbPath()
  let fileInfo = "文件暂时读不到（可能还没建库）"
  try {
    const s = statSync(dbPath)
    fileInfo = `${humanSize(s.size)} · 最后修改 ${s.mtime.toLocaleString("zh-CN")}`
  } catch {
    // 读不到就保持上面的提示，不因为一个 stat 失败让整页报错
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">设置</h1>
        <p className="mt-0.5 text-sm text-slate-500">考试节奏、发音、大模型、备份都在这里改；改完立刻生效，不需要重启</p>
      </div>

      <GeneralSettingsForm
        examDate={settings.examDate}
        regStartDate={settings.regStartDate}
        regEndDate={settings.regEndDate}
        dailyNewWords={settings.dailyNewWords}
        dailyMaxReviews={settings.dailyMaxReviews}
        autoPlan={settings.autoPlan}
        autoValue={autoPlan.newPerDay}
        autoNote={autoPlan.note}
        effectiveValue={daily.value}
        daysLeft={stat.daysLeft}
      />

      <TtsPanel ttsVoice={settings.ttsVoice} ttsRate={settings.ttsRate} />

      <LlmPanel
        provider={raw.llmProvider ?? settings.llmProvider}
        model={raw.llmModel ?? settings.llmModel}
        baseUrl={raw.llmBaseUrl ?? ""}
        apiKey={raw.llmApiKey ?? ""}
        envHasKey={Boolean(process.env.LLM_API_KEY)}
      />

      {/* 数据备份：只读信息，纯服务端渲染就够了 */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">数据与备份</h2>
        <p className="mt-0.5 text-xs text-slate-400">
          所有学习数据都在一个 SQLite 文件里，复制它就是完整备份（含词库、真题、复习进度、错题本、统计）
        </p>

        <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2">
          <div className="text-[11px] text-slate-500">数据库文件路径（可直接复制）</div>
          <code className="mt-1 block break-all font-mono text-xs text-slate-800">{dbPath}</code>
          <div className="mt-1 text-[11px] text-slate-400">{fileInfo}</div>
        </div>

        <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
          建议在动「危险操作」之前先复制一份，或者用下面的 JSON 导出一份可读的数据留底。
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <a
            href="/cet6/settings/export"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            导出全部学习数据为 JSON
          </a>
          <span className="text-[11px] text-slate-400">
            含错题本、词汇进度（带单词原文）、学习会话、每日统计、真题记录
          </span>
        </div>
      </section>

      <DangerZone />
    </div>
  )
}
