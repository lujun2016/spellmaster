/**
 * 写作模板挖空引擎（纯函数，服务端与客户端共用，不碰数据库）。
 *
 * 为什么不放在 src/lib/cet6/writing.ts：客户端组件提交后要逐空比对，而 service 那层
 * 握着 Prisma 连接，被客户端 import 会把整个数据库客户端打进浏览器包。判分属于纯逻辑，
 * 留在这里；落库留在 service/action 层。
 *
 * 挖空策略：
 *  1. 先按「高频句式库」扫描正文，把 it is a common phenomenon that / when it comes to 这类
 *     固定连接词和句型登记为候选空——这些是真正值得背、而且能自动判对错的部分；
 *  2. 词表类模板（如「上升/下降表达库」）正文里根本没有成句句式，退回按
 *     「中文标签：英文表达」的结构去挖英文那一半，让用户看中文默写英文；
 *  3. 候选空按文档顺序编号，按「步长取同余类」轮换：每轮挖其中一组，下一轮换一组，
 *     所以同一模板连着练几轮挖的空不同；
 *  4. 全程不用随机数：round 由服务端按「这个模板已练习次数」算出来，SSR 与客户端必然一致，
 *     否则会出现 hydration mismatch。
 *  {占位符} 一律不参与判分，只当作提示槽位显示——那部分内容本来就该由用户自由发挥。
 */

/** 每轮目标挖空数：候选多就拉大步长，候选少就整批挖，尽量落在这个数附近。
 *  「这个模板一共几组空在轮换」由 buildCloze 按实际候选数算出来（结果里的 rounds），
 *  不在这里写死——正文短的模板只能两组交替，正文长的能转五六组。 */
const TARGET_BLANKS = 5

export type ClozeToken =
  | { kind: "text"; text: string }
  | { kind: "slot"; label: string }
  | { kind: "blank"; no: number; answer: string; alts: string[]; width: number }

export type ClozeLine = { tokens: ClozeToken[] }

export type ClozeExercise = {
  lines: ClozeLine[]
  /** 本轮需要作答的空，按顺序编号（no 从 1 开始） */
  blanks: Array<{ no: number; answer: string; alts: string[] }>
  total: number
  /** 实际使用的轮次偏移 */
  round: number
  /** 这个模板一共有几组空在轮换：同一组空隔「几轮」重复一次 */
  rounds: number
}

// ==================== 高频句式库 ====================

type BankEntry = { en: string; alts?: string[] }

/**
 * 句式库只收「固定到可以逐字判分」的表达：连接词、过渡句、套语。
 * 带 ... 的开放句不进来（那种空没有唯一答案），交给 {占位符} 槽位提示。
 */
const BANK: BankEntry[] = [
  // —— 议论文：观点对比 / 现象分析 / 问题解决 ——
  { en: "It is a common phenomenon that" },
  { en: "has sparked heated discussion" },
  { en: "When it comes to" },
  { en: "opinions vary from person to person" },
  { en: "Some people are firmly convinced that" },
  { en: "They argue that" },
  { en: "Others, however, hold a different view" },
  { en: "In their eyes" },
  { en: "The most important reason is that" },
  { en: "As far as I am concerned" },
  { en: "What really matters is" },
  { en: "In recent years" },
  { en: "has been gaining increasing popularity among" },
  { en: "According to a recent survey" },
  { en: "This trend has aroused wide public concern" },
  { en: "Several factors can account for this phenomenon" },
  { en: "To begin with" },
  { en: "What's more" },
  { en: "Perhaps the most important reason is that" },
  { en: "As for its influence, the picture is mixed" },
  { en: "On the one hand" },
  { en: "On the other hand" },
  { en: "for instance" },
  { en: "In my view" },
  { en: "we should take a rational attitude towards" },
  { en: "It is advisable for us to" },
  { en: "Nowadays" },
  { en: "has become a matter of growing concern" },
  { en: "It is reported that" },
  { en: "The negative effects are obvious" },
  { en: "If no effective measures are taken" },
  { en: "it is high time that we took action" },
  { en: "For one thing" },
  { en: "For another" },
  { en: "Only when all sides make joint efforts can we" },
  { en: "After all" },
  { en: "Moreover" },
  { en: "In addition" },
  { en: "Therefore" },
  { en: "First" },
  { en: "Second" },

  // —— 图表 ——
  { en: "As is vividly shown in the chart" },
  { en: "There are several reasons behind this change" },
  { en: "First and foremost" },
  { en: "Last but not least" },
  { en: "Taking all these factors into consideration" },
  { en: "we may reasonably predict that" },
  { en: "which will undoubtedly benefit us in the long run" },
  { en: "There was a sharp increase in" },
  { en: "By contrast" },
  { en: "account for" },
  { en: "make up" },
  { en: "constitute" },
  { en: "peak at" },
  { en: "bottom out at" },
  { en: "remain stable" },
  { en: "level off" },

  // —— 应用文：建议信 / 投诉信 / 通知 ——
  { en: "I am writing to express my views concerning" },
  { en: "I would like to offer some suggestions" },
  { en: "I have been" },
  { en: "In the first place" },
  { en: "I suggest that" },
  { en: "It would be helpful if you could" },
  { en: "In the second place" },
  { en: "Besides" },
  { en: "I hope you will find these proposals useful" },
  { en: "I would be more than happy to discuss them further" },
  { en: "Thank you for your time and consideration" },
  { en: "Yours sincerely" },
  { en: "Dear Sir or Madam" },
  { en: "I am writing to make a complaint about" },
  { en: "To my disappointment" },
  { en: "for your reference" },
  { en: "I would appreciate it if you could" },
  { en: "such as" },
  { en: "I would also like to request" },
  { en: "I look forward to your prompt reply" },
  { en: "Yours faithfully" },
  { en: "In order to" },
  { en: "is going to hold" },
  { en: "are welcome to attend" },
  { en: "Furthermore" },
  { en: "Those who are interested are requested to" },
  { en: "For further information, please contact" },

  // —— 翻译技巧 / 万能句式 ——
  { en: "It is said that", alts: ["It is said that ..."] },
  { en: "It is widely believed that", alts: ["It is widely believed that ..."] },
  { en: "It is reported", alts: ["It is reported that"] },
  { en: "There is no denying that" },
  { en: "With the development of" },
  { en: "dates back to" },
  { en: "originated in" },
  { en: "is regarded as", alts: ["is seen as"] },
  { en: "a symbol of" },
  { en: "intangible cultural heritage" },
  { en: "cultural heritage" },
  { en: "carry forward", alts: ["pass on"] },
  { en: "be famous for", alts: ["be known for", "is famous for"] },
  { en: "Recent years have witnessed" },
  { en: "According to a recent survey conducted by" },
  { en: "is a blessing or a curse" },
  { en: "As the saying goes" },
  { en: "What is more important", alts: ["More importantly"] },
  { en: "However, this is not the whole picture" },
  { en: "Nevertheless" },
  { en: "This can be attributed to" },
  { en: "As a consequence" },
  { en: "A case in point is" },
  { en: "Admittedly" },
  { en: "Even so" },
  { en: "Only in this way can we" },
  { en: "What we should bear in mind is that" },
  { en: "As college students, we are supposed to" },
]

/** 长句式优先匹配，避免 "In addition" 先吃掉 "In addition, schools" 里的片段 */
const BANK_SORTED = [...BANK].sort((a, b) => b.en.length - a.en.length)

// ==================== 候选空查找 ====================

type Candidate = { start: number; end: number; answer: string; alts: string[] }

/** 句式库扫描：登记所有未重叠的命中区间 */
function findBankCandidates(line: string): Candidate[] {
  const claimed = new Array<boolean>(line.length).fill(false)
  const out: Candidate[] = []

  for (const entry of BANK_SORTED) {
    let from = 0
    for (;;) {
      const start = line.indexOf(entry.en, from)
      if (start < 0) break
      const end = start + entry.en.length
      from = start + 1
      if (claimed.slice(start, end).some(Boolean)) continue
      // 词边界：防止 "In addition" 命中 "In additional" 这种截断
      if (/[A-Za-z]/.test(line[start - 1] ?? "") || /[A-Za-z]/.test(line[end] ?? "")) continue
      for (let i = start; i < end; i++) claimed[i] = true
      out.push({ start, end, answer: line.slice(start, end), alts: entry.alts ?? [] })
    }
  }
  return out.sort((a, b) => a.start - b.start)
}

/**
 * 词表类模板的后备规则：把「中文标签：英文表达」里的英文挖掉。
 * 答案只取分隔符之后开头那段连续英文，遇到汉字/占位符就停——这样
 * 「避坑：不要用 "With ..." 起手」这种夹在中文里的引用不会被误挖成空。
 */
function findLabelCandidates(line: string): Candidate[] {
  const out: Candidate[] = []
  // 以分号切段，支持「造纸术：paper-making；印刷术：printing」这种一条多组
  let offset = 0
  for (const seg of line.split(/(?<=[；;])/)) {
    const sep = /[：:]|→/.exec(seg)
    if (sep) {
      const afterSep = seg.slice(sep.index + sep[0].length)
      const leadMatch = /^[\s.。…·]*/.exec(afterSep)
      const lead = leadMatch ? leadMatch[0].length : 0
      const body = afterSep.slice(lead)
      // 取开头连续的一段英文：遇到汉字、花括号（占位符）或全角标点就停，
      // 这样「避坑：不要用 "With ..." 起手」这类夹在中文里的引用不会被误挖成空
      const runMatch = /^[^一-龥{}（）；]*/.exec(body)
      const run = runMatch ? runMatch[0] : ""
      const answer = run.replace(/[\s,，、/;；:：.。\-]+$/, "").trim()
      const letters = (answer.match(/[A-Za-z]/g) ?? []).length
      if (letters >= 3) {
        const start = offset + sep.index + sep[0].length + lead
        out.push({ start, end: start + answer.length, answer, alts: [] })
      }
    }
    offset += seg.length
  }
  return out
}

// ==================== 主入口 ====================

/**
 * 生成一轮挖空练习。
 * @param body 模板正文（保留 \n 换行）
 * @param round 轮次偏移，通常 = 该模板已练习次数（服务端算），也可由 ?round= 手动指定
 */
export function buildCloze(body: string, round = 0): ClozeExercise {
  const rawLines = body.replace(/\r\n/g, "\n").split("\n")

  // 第一遍：逐行收集候选空
  const perLine: Candidate[][] = rawLines.map((line) => {
    const bank = findBankCandidates(line)
    if (bank.length > 0) return bank
    return findLabelCandidates(line)
  })

  // 全局按文档顺序编号
  const flat: Array<{ line: number; cand: Candidate }> = []
  perLine.forEach((cands, line) => cands.forEach((cand) => flat.push({ line, cand })))

  // 第二遍：轮换挑选。
  // 步长按「本轮想挖几个空」反推，再对候选总数取余，于是候选 5 个的短模板和
  // 候选 30 个的长词表的每轮空数都落在 TARGET_BLANKS 附近，而且相邻轮次取的是
  // 不同的同余类 → 同一模板练下一轮挖的空不一样。步长缩到 2 时两轮交替。
  const step = Math.max(2, Math.ceil(flat.length / TARGET_BLANKS))
  const mod = Math.min(step, Math.max(1, flat.length))
  const want = round % mod
  const picked = new Set<number>()
  flat.forEach((_, i) => {
    if (i % mod === want) picked.add(i)
  })

  const noByIndex = new Map<number, number>()
  const blanks: Array<{ no: number; answer: string; alts: string[] }> = []
  let counter = 0
  flat.forEach((item, i) => {
    if (!picked.has(i)) return
    counter += 1
    noByIndex.set(i, counter)
    blanks.push({ no: counter, answer: item.cand.answer, alts: item.cand.alts })
  })

  // 第三遍：切 token，同时处理 {占位符} → 槽位提示
  const lines: ClozeLine[] = rawLines.map((line, lineIdx) => {
    const cuts: Array<{ start: number; end: number; make: () => ClozeToken }> = []

    flat.forEach((item, i) => {
      if (item.line !== lineIdx) return
      const no = noByIndex.get(i)
      if (no === undefined) return // 本轮没被挖的候选，按原样显示，等于白送一个提示
      cuts.push({
        start: item.cand.start,
        end: item.cand.end,
        make: () => ({
          kind: "blank" as const,
          no,
          answer: item.cand.answer,
          alts: item.cand.alts,
          // 输入框宽度跟着答案走：太长就按上限截断，避免撑破布局
          width: Math.min(Math.max(item.cand.answer.length, 8), 46),
        }),
      })
    })

    const slotRe = /\{([^{}]*)\}/g
    let m: RegExpExecArray | null
    while ((m = slotRe.exec(line)) !== null) {
      const label = m[1].trim()
      cuts.push({ start: m.index, end: m.index + m[0].length, make: () => ({ kind: "slot" as const, label }) })
    }

    cuts.sort((a, b) => a.start - b.start)
    const tokens: ClozeToken[] = []
    let cursor = 0
    for (const cut of cuts) {
      if (cut.start < cursor) continue
      if (cut.start > cursor) tokens.push({ kind: "text", text: line.slice(cursor, cut.start) })
      tokens.push(cut.make())
      cursor = cut.end
    }
    if (cursor < line.length) tokens.push({ kind: "text", text: line.slice(cursor) })
    return { tokens }
  })

  return { lines, blanks, total: blanks.length, round, rounds: mod }
}

// ==================== 判分 ====================

/**
 * 判定用归一化：小写、去掉标点与所有非字母数字字符、压缩空格。
 * 这样 "Moreover," / "moreover" / "Moreover" 视为同一个答案，不因为标点扣分；
 * 中文一律清掉（词表类的空里常带「（猛涨）」这类提示）。
 */
export function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

/** 把 "a / b / c" 这种带并列选项的答案拆成多个可接受答案 */
function expandAlts(answer: string, alts: string[]): string[] {
  const out = new Set<string>()
  for (const raw of [answer, ...alts]) {
    out.add(normalizeAnswer(raw))
    for (const part of raw.split(/\s*(?:\/|；|;|\|)\s*/)) {
      const n = normalizeAnswer(part)
      if (n) out.add(n)
    }
  }
  out.delete("")
  return [...out]
}

/** 归一化后的编辑距离，用来识别「就差一两个字母」的答案 */
function editDistance(a: string, b: string): number {
  if (a === b) return 0
  const m = a.length
  const n = b.length
  if (!m || !n) return Math.max(m, n)
  let prev = Array.from({ length: n + 1 }, (_, j) => j)
  for (let i = 1; i <= m; i++) {
    const cur = [i, ...new Array<number>(n).fill(0)]
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    }
    prev = cur
  }
  return prev[n]
}

export type Judgement = "right" | "close" | "wrong" | "empty"

/**
 * 判分。close = 词形/拼写只差一点，界面上标黄提示，但仍然计入"错"，
 * 不然统计会虚高（自己骗自己最没意义）。
 */
export function judge(input: string, blank: { answer: string; alts: string[] }): Judgement {
  const mine = normalizeAnswer(input)
  if (!mine) return "empty"
  const candidates = expandAlts(blank.answer, blank.alts)
  if (candidates.includes(mine)) return "right"

  // 词序不同但词集相同也算对（比如副词位置调整）
  const myWords = mine.split(" ").sort().join(" ")
  for (const c of candidates) {
    if (c.split(" ").sort().join(" ") === myWords) return "right"
  }
  // 编辑距离容忍：短答案 1 个字符，长答案按长度的 12%
  for (const c of candidates) {
    const tol = c.length <= 12 ? 1 : Math.floor(c.length * 0.12)
    if (editDistance(mine, c) <= tol) return "close"
  }
  return "wrong"
}

/** 统计一轮结果，供页面显示与落库 */
export function tally(results: Judgement[]) {
  const right = results.filter((r) => r === "right").length
  const close = results.filter((r) => r === "close").length
  const wrong = results.filter((r) => r === "wrong" || r === "empty").length
  const answered = results.filter((r) => r !== "empty").length
  return {
    right,
    close,
    wrong,
    answered,
    total: results.length,
    /** 正确率按「严格对」算 */
    accuracy: results.length ? Math.round((right / results.length) * 100) : 0,
  }
}
