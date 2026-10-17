import { buildNotebookMarkdown } from "@/components/cet6/notebook/markdown"
import { listNotebook, localDateKey } from "@/lib/cet6/service"

export const dynamic = "force-dynamic"

/**
 * 错题本导出：GET 一个 Markdown 附件。
 * 用路由而不是 server action，因为这里要的是浏览器直接下载成 .md 文件。
 */
export async function GET() {
  const items = await listNotebook()
  const now = new Date()

  return new Response(buildNotebookMarkdown(items, now), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // 纯 ASCII 文件名，省掉 RFC 5987 的 filename* 编码（用户自己会用浏览器另存）
      "Content-Disposition": `attachment; filename="cet6-notebook-${localDateKey(now)}.md"`,
      "Cache-Control": "no-store",
    },
  })
}
