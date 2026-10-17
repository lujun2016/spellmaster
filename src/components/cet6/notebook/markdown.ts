/**
 * 错题本 → Markdown 的渲染。
 *
 * 单独放一个模块而不是写在 route.ts 里，有两个原因：
 *  1. Next 的 route.ts 只接受 GET/POST/dynamic 之类的固定导出，多导一个函数会被类型检查拦下；
 *  2. 纯函数可以脱离 HTTP 单独测（npx tsx 直接调）。
 */
import type { NotebookItem } from "@/generated/cet6"
import { localDateKey } from "@/lib/cet6/service"
import { describeDue } from "@/lib/cet6/srs"
import { kindLabel } from "./types"

/** 多行文本塞进引用块，避免正文里的换行把 Markdown 结构撑乱 */
function quote(text: string): string {
  return text
    .split("\n")
    .map((line) => `> ${line}`.trimEnd())
    .join("\n")
}

function field(label: string, text: string | null): string {
  if (!text?.trim()) return ""
  // 不带结尾换行：块之间由 join("\n\n") 统一分隔，这里再加一个就会多出一行空行
  return `**${label}**\n\n${quote(text)}`
}

function renderItem(item: NotebookItem, index: number, now: Date): string {
  const tags = item.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)

  const meta = [
    `收藏于 ${localDateKey(item.createdAt)}`,
    `第 ${item.stage} 阶 · 复习 ${item.reps} 次 · 遗忘 ${item.lapses} 次`,
    item.dueAt ? `下次复习：${describeDue(item.dueAt, now)}` : "未排程",
  ]
  if (tags.length) meta.push(`标签：${tags.map((t) => `#${t}`).join(" ")}`)

  const blocks = [
    `#### ${index}. ${item.title}`,
    `*${meta.join(" ｜ ")}*`,
    field("内容", item.content),
    field("我的答案", item.myAnswer),
    field("正确答案", item.answer),
    field("备注", item.note),
  ]
  return blocks.filter(Boolean).join("\n\n")
}

/** 整份 Markdown：类型（##）→ 来源（###）→ 条目（####） */
export function buildNotebookMarkdown(items: NotebookItem[], now = new Date()): string {
  const hh = String(now.getHours()).padStart(2, "0")
  const mm = String(now.getMinutes()).padStart(2, "0")
  const out: string[] = [
    "# 六级错题本 / 生词本",
    "",
    `导出时间：${localDateKey(now)} ${hh}:${mm} · 共 ${items.length} 条`,
    "",
  ]

  if (!items.length) {
    out.push("（错题本是空的）", "")
    return out.join("\n")
  }

  // 分组维度跟页面上的筛选项保持一致：先按类型，再按来源
  for (const kind of [...new Set(items.map((i) => i.kind))]) {
    const ofKind = items.filter((i) => i.kind === kind)
    out.push(`## ${kindLabel(kind)}（${ofKind.length} 条）`, "")
    for (const source of [...new Set(ofKind.map((i) => i.source))]) {
      const ofSource = ofKind.filter((i) => i.source === source)
      out.push(`### ${source}（${ofSource.length} 条）`, "")
      ofSource.forEach((item, i) => {
        out.push(renderItem(item, i + 1, now), "", "---", "")
      })
    }
  }
  return out.join("\n")
}
