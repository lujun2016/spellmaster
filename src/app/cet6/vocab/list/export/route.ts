/**
 * 全词库导出：GET /cet6/vocab/list/export?format=xlsx|docx&dir=en-zh|zh-en&answers=1|0&q=&filter=
 *
 * 设计取舍：
 *  - 范围 = 当前筛选结果（页面上的搜索词和筛选条件原样带过来），不是无脑导 3992 行；
 *  - 「带答案/不带答案」= 答案列是填好还是留空（留空就是默写卷）；
 *  - Excel 一行一词，Word 用表格 + 标题，都带序号列，方便打印后对答案。
 */
import { Packer, Document, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, HeadingLevel } from "docx"
import * as XLSX from "xlsx"
import { db } from "@/lib/cet6/db"
import { readTrans } from "@/lib/cet6/json"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type Dir = "en-zh" | "zh-en"

function buildWhere(filter: string, q: string) {
  const where: Record<string, unknown> = {}
  if (q) where.text = { contains: q }
  switch (filter) {
    case "exam":
      where.freq = { gt: 0 }
      break
    case "new":
      where.progress = { is: null }
      break
    case "learning":
      where.progress = { isNot: null }
      break
    case "mastered":
      where.progress = { is: { OR: [{ recallLv: { gte: 4 } }, { spellLv: { gte: 4 } }] } }
      break
    default:
      break
  }
  return where
}

const today = () => new Date().toISOString().slice(0, 10)

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams
  const format = sp.get("format") === "docx" ? "docx" : "xlsx"
  const dir: Dir = sp.get("dir") === "zh-en" ? "zh-en" : "en-zh"
  const withAnswers = sp.get("answers") !== "0"
  const filter = sp.get("filter") ?? "all"
  const q = (sp.get("q") ?? "").trim()

  const rows = await db.word.findMany({
    where: buildWhere(filter, q),
    orderBy: { rank: "asc" },
    select: { text: true, ukPhone: true, usPhone: true, trans: true, freq: true },
  })

  if (!rows.length) {
    return new Response("没有符合条件的单词", { status: 404 })
  }

  const table = rows.map((r, i) => {
    const cn = readTrans(r.trans)
      .map((t) => `${t.pos ? `${t.pos}. ` : ""}${t.cn}`)
      .join("；")
    const phone = r.usPhone || r.ukPhone || ""
    // 题目列 + 答案列：英→中 时题目是单词，中→英 时题目是中文释义
    const prompt = dir === "en-zh" ? r.text : cn
    const answer = dir === "en-zh" ? cn : r.text
    return {
      no: i + 1,
      prompt,
      phone,
      answer: withAnswers ? answer : "",
      freq: r.freq || "",
    }
  })

  const stamp = today()
  const tag = `${dir}-${withAnswers ? "answers" : "blank"}`

  if (format === "xlsx") {
    const data = table.map((r) => ({
      序号: r.no,
      题目: r.prompt,
      音标: r.phone,
      答案: r.answer,
      真题频次: r.freq,
    }))
    const ws = XLSX.utils.json_to_sheet(data)
    ws["!cols"] = [{ wch: 6 }, { wch: 28 }, { wch: 24 }, { wch: 52 }, { wch: 10 }]
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, dir === "en-zh" ? "英→中" : "中→英")
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" })
    return new Response(buf, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="cet6-words-${tag}-${stamp}.xlsx"`,
        "Cache-Control": "no-store",
      },
    })
  }

  // Word：表格导出，答案列留空即默写卷
  const cell = (text: string, bold = false) =>
    new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text, bold, size: 20 })] })],
      width: { size: 100 / 5, type: WidthType.PERCENTAGE },
    })

  const header = new TableRow({
    tableHeader: true,
    children: ["序号", "题目", "音标", "答案", "真题频次"].map((t) => cell(t, true)),
  })
  const body = table.map(
    (r) =>
      new TableRow({
        children: [
          cell(String(r.no)),
          cell(r.prompt),
          cell(r.phone),
          cell(r.answer || "________________"),
          cell(String(r.freq)),
        ],
      }),
  )

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: `六级词汇 · ${dir === "en-zh" ? "英→中" : "中→英"} · ${withAnswers ? "含答案" : "不含答案（默写卷）"}`,
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: `共 ${table.length} 词 · 导出于 ${stamp}${withAnswers ? "" : " · 答案留空，自行默写后对照词库核对"}`,
          }),
          new Table({ rows: [header, ...body], width: { size: 100, type: WidthType.PERCENTAGE } }),
        ],
      },
    ],
  })
  const buf = await Packer.toBuffer(doc)
  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="cet6-words-${tag}-${stamp}.docx"`,
      "Cache-Control": "no-store",
    },
  })
}
