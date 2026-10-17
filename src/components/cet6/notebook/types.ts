/**
 * 错题本在客户端用到的数据形状。
 *
 * 为什么不让客户端组件直接用 Prisma 的行类型：Date 跨 RSC 边界传起来虽然能work，
 * 但客户端只关心「什么时候到期」和「显示成什么」，统一转成 ISO 字符串 + 已算好的字段，
 * 组件里就不用再 import 服务端类型，也不会在两边各写一套格式化逻辑。
 */
import type { NotebookItem } from "@/generated/cet6"
import { isDue } from "@/lib/cet6/srs"

export const NOTEBOOK_KINDS = [
  { value: "word", label: "生词" },
  { value: "mistake", label: "错题" },
  { value: "sentence", label: "句子" },
  { value: "phrase", label: "短语" },
] as const

export const NOTEBOOK_SOURCES = ["手工", "词汇", "阅读", "听力", "翻译", "写作", "真题", "每日精读"] as const

export type NotebookKind = (typeof NOTEBOOK_KINDS)[number]["value"]

export function kindLabel(kind: string): string {
  return NOTEBOOK_KINDS.find((k) => k.value === kind)?.label ?? kind
}

export type NotebookCard = {
  id: string
  kind: string
  kindLabel: string
  source: string
  title: string
  content: string
  answer: string | null
  myAnswer: string | null
  note: string | null
  tags: string[]
  /** 间隔阶梯下标 0–8，越大说明越牢 */
  stage: number
  reps: number
  lapses: number
  /** ISO 字符串；null = 还没进复习队列 */
  dueAt: string | null
  /** 服务端渲染时是否已到期 */
  due: boolean
  createdAt: string
}

export function toNotebookCard(row: NotebookItem, now = new Date()): NotebookCard {
  return {
    id: row.id,
    kind: row.kind,
    kindLabel: kindLabel(row.kind),
    source: row.source,
    title: row.title,
    content: row.content,
    answer: row.answer,
    myAnswer: row.myAnswer,
    note: row.note,
    tags: row.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    stage: row.stage,
    reps: row.reps,
    lapses: row.lapses,
    dueAt: row.dueAt ? row.dueAt.toISOString() : null,
    due: row.dueAt ? isDue({ dueAt: row.dueAt }, now) : false,
    createdAt: row.createdAt.toISOString(),
  }
}
