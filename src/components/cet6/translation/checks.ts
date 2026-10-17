/**
 * 译文「自查清单」——基于规则的可判定检查（纯函数，不碰数据库）。
 *
 * 这里刻意不做评分、也不做语义判断：没有 AI 就不假装能读懂意思。
 * 每条检查都是能在中文原文里找到触发条件、能在英文译文里用正则/词数统计验证的硬规则，
 * 例如「原文出现了括注 (drone)，译文里有没有 drone」「原文有『近年来』，译文有没有用现在完成时」。
 * 界面上必须写明「这是规则检查，不是评分」，不然用户会把通过率当分数。
 */

export type CheckLevel = "pass" | "warn" | "info"

export type CheckItem = {
  id: string
  /** 规则名（用户一眼能看懂在查什么） */
  label: string
  level: CheckLevel
  /** 具体到数字与例子的说明 */
  detail: string
}

export type CheckReport = {
  items: CheckItem[]
  words: number
  sentences: number
  chineseChars: number
  pass: number
  warn: number
  info: number
  /** 与参考译文的实词命中率（0~100），仅在给了参考译文时有值 */
  coverage?: number
}

/** 英文常见功能词，做词汇覆盖统计时排除掉（只留下有信息量的实词） */
const STOPWORDS = new Set(
  `the a an and or but if of to in on at for with from by as is are was were be been being am do does did done have has had having this that these those it its it's their there here they them we our us you your i my me he she his her not no nor so such than then too very can could will would shall should may might must about into over under more most much many some any all both each few other only own same also just even still yet however therefore thus while when where which who whom whose what how why because before after during between among through against above below up down out off again further once during per via`
    .split(/\s+/)
    .filter(Boolean),
)

function words(text: string): string[] {
  return (text ?? "")
    .replace(/[^A-Za-z0-9'’\- ]/g, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^['’-]+|['’-]+$/g, ""))
    .filter((w) => /[A-Za-z]/.test(w))
}

function countCjk(text: string): number {
  return ((text ?? "").match(/[\u4e00-\u9fa5]/g) ?? []).length
}

/**
 * 原文里的中文句数。只按句末标点切：「，」「、」是句内停顿，
 * 「；」虽然算分句边界，但拿它计句数会把「原文 4 句」这种数字算歪。
 */
function countChineseSentences(text: string): number {
  return (text ?? "")
    .split(/[。！？]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1).length
}

/** be 动词 + 过去分词，用来判定「被动语态有没有用上」 */
const PASSIVE = /\b(is|are|was|were|be|been|being|get|gets|got)\s+([a-z]+ed|built|made|known|seen|given|taken|held|used|found|shown|written|done|kept|paid|sent|brought|thought|sold|told|set|put|cut|read|driven|grown|chosen|spoken|broken)\b/i

/** 原文标记 → 译文里应该出现的英文连接词 */
const CONNECTIVES: Array<{ zh: string; en: RegExp; tip: string }> = [
  { zh: "随着", en: /\b(as|with|along with|following)\b/i, tip: "as / with" },
  { zh: "因此", en: /\b(therefore|thus|consequently|as a result|hence)\b/i, tip: "therefore / thus / as a result" },
  { zh: "因而", en: /\b(therefore|thus|consequently|as a result|hence|so)\b/i, tip: "thus / as a result" },
  { zh: "然而", en: /\b(however|nevertheless|nonetheless|yet|whereas|while)\b/i, tip: "however / while" },
  { zh: "但是", en: /\b(but|however|yet|nevertheless)\b/i, tip: "but / however" },
  { zh: "虽然", en: /\b(although|though|even though|despite|in spite of)\b/i, tip: "although / despite" },
  { zh: "尽管", en: /\b(although|though|even though|despite|in spite of|while)\b/i, tip: "although / despite" },
  { zh: "例如", en: /\b(for example|for instance|such as|e\.g\.|like)\b/i, tip: "for example / such as" },
  { zh: "由于", en: /\b(because|since|due to|owing to|as a result of)\b/i, tip: "because / due to" },
  { zh: "而且", en: /\b(and|moreover|furthermore|in addition|besides)\b/i, tip: "and / moreover / in addition" },
  { zh: "不仅", en: /\bnot only\b/i, tip: "not only ... but also" },
  { zh: "同时", en: /\b(meanwhile|at the same time|while|and)\b/i, tip: "meanwhile / while" },
  { zh: "此外", en: /\b(besides|moreover|furthermore|in addition|what's more)\b/i, tip: "besides / in addition" },
  { zh: "从而", en: /\b(thus|thereby|so as to|and therefore)\b/i, tip: "thus / thereby" },
]

/** 时间/完成态信号 → 期望的完成时 */
const PERFECT_ZH = /近年来|最近|已经|已|至今|迄今|长期以来|多年来/

export type CheckInput = {
  sourceZh: string
  userEn: string
  /** 有参考译文时额外做词汇覆盖统计（纯字符串匹配） */
  referenceEn?: string
  /** passage = 整段翻译；sentence = 单句翻译（词数下限等规则不同） */
  mode?: "passage" | "sentence"
}

export function runChecks(input: CheckInput): CheckReport {
  const sourceZh = (input.sourceZh ?? "").trim()
  const userEn = (input.userEn ?? "").trim()
  const mode = input.mode ?? "passage"
  const items: CheckItem[] = []

  const w = words(userEn)
  const wordCount = w.length
  const cjk = countCjk(userEn)
  const zhChars = countCjk(sourceZh)
  const zhSentences = countChineseSentences(sourceZh)
  const enSentences = userEn
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)

  // —— 1. 空译文 ——
  if (wordCount === 0) {
    return {
      items: [{ id: "empty", label: "译文为空", level: "warn", detail: "先写点东西再提交，规则检查需要文本才能跑。" }],
      words: 0,
      sentences: 0,
      chineseChars: zhChars,
      pass: 0,
      warn: 1,
      info: 0,
    }
  }

  // —— 2. 中文残留 ——
  if (cjk > 0) {
    items.push({
      id: "cjk",
      label: "译文里有未翻译的中文",
      level: "warn",
      detail: `检出 ${cjk} 个汉字。六级翻译整段给分，留中文一般直接算漏译。`,
    })
  } else {
    items.push({ id: "cjk", label: "没有中文残留", level: "pass", detail: "全文为英文。" })
  }

  // —— 3. 篇幅：按汉字数估算应有的英文词数（管长短的规则只有这一条，避免重复报警） ——
  if (mode === "passage") {
    const low = Math.floor(zhChars * 0.5)
    const high = Math.ceil(zhChars * 1.25)
    if (wordCount < low) {
      items.push({
        id: "length",
        label: "篇幅偏短，可能漏译",
        level: "warn",
        detail: `原文 ${zhChars} 个汉字，按 1 汉字≈0.6~0.9 词的常规比例应约 ${Math.floor(zhChars * 0.6)}~${Math.floor(zhChars * 0.9)} 词；你写了 ${wordCount} 词。逐句核对原文有没有整句没翻。`,
      })
    } else if (wordCount > high) {
      items.push({
        id: "length",
        label: "篇幅明显偏长",
        level: "info",
        detail: `原文 ${zhChars} 个汉字，你写了 ${wordCount} 词。超出常规比例，检查是否有重复表达或过度扩写（时间只有 30 分钟）。`,
      })
    } else {
      items.push({
        id: "length",
        label: "篇幅落在常规区间",
        level: "pass",
        detail: `${zhChars} 个汉字 → ${wordCount} 词。`,
      })
    }
  } else if (input.referenceEn) {
    const refWords = words(input.referenceEn).length
    const ratio = refWords ? wordCount / refWords : 1
    items.push(
      ratio < 0.5 || ratio > 1.9
        ? {
            id: "length",
            label: "与原句长度差距较大",
            level: "warn",
            detail: `参考答案 ${refWords} 词，你写了 ${wordCount} 词（${Math.round(ratio * 100)}%）。差太远通常意味着漏了成分或加了原文没有的内容。`,
          }
        : {
            id: "length",
            label: "与原句长度接近",
            level: "pass",
            detail: `参考答案 ${refWords} 词，你写了 ${wordCount} 词。`,
          },
    )
  }

  // —— 5. 句数对比 ——
  if (enSentences.length > 0) {
    const diff = Math.abs(enSentences.length - zhSentences)
    items.push(
      diff > 2
        ? {
            id: "sentences",
            label: "句数与原文差距大",
            level: "info",
            detail: `原文约 ${zhSentences} 句，你写了 ${enSentences.length} 句。合句/拆句本身不算错，但要确认没有把两句意思并成一句导致漏点。`,
          }
        : {
            id: "sentences",
            label: "句数与原文相当",
            level: "pass",
            detail: `原文约 ${zhSentences} 句 → 译文 ${enSentences.length} 句。`,
          },
    )
  }

  // —— 6. 超长句（六级翻译最典型的扣分点） ——
  const longOnes = enSentences.map((s, i) => ({ i, n: words(s).length })).filter((x) => x.n > 35)
  if (longOnes.length > 0) {
    items.push({
      id: "longsentence",
      label: "有句子过长",
      level: "warn",
      detail: `第 ${longOnes.map((x) => x.i + 1).join("、")} 句超过 35 词（最长 ${Math.max(...longOnes.map((x) => x.n))} 词）。中文流水句直接照搬成一句英文最容易出错，优先拆成两句或用 which / and 断开。`,
    })
  } else {
    items.push({ id: "longsentence", label: "没有超长句", level: "pass", detail: "每句都在 35 词以内。" })
  }

  // —— 7. 被动语态 ——
  const passiveZh = /被|受到|得到|遭受|由[^，。；]{0,12}(?:建造|制造|生产|设计)|为[^，。；]{0,8}所/.test(sourceZh)
  if (passiveZh) {
    if (PASSIVE.test(userEn)) {
      items.push({ id: "passive", label: "被动语态已处理", level: "pass", detail: "原文有被动意味，译文里检出了 be + 过去分词。" })
    } else {
      items.push({
        id: "passive",
        label: "原文有被动，译文里没检出被动结构",
        level: "warn",
        detail: "原文出现「被/受到/得到/遭受/由…」等被动信号，但译文里没找到 be + 过去分词（如 is regarded as / was built）。留意是不是写成了中式主动句。",
      })
    }
  }

  // —— 8. 数字与量级 ——
  const digitGroups = (sourceZh.match(/\d+(?:\.\d+)?/g) ?? []).filter((d) => d.length >= 1)
  const missingDigits = [...new Set(digitGroups)].filter((d) => !userEn.includes(d))
  const scaleZh = /[万亿]|百分|%/.test(sourceZh)
  const scaleEn = /\b(million|billion|trillion|percent|per cent|thousand)\b|%/i.test(userEn)
  if (missingDigits.length > 0) {
    items.push({
      id: "numbers",
      label: "数字没有落到译文里",
      level: "warn",
      detail: `原文里的这些数字在译文中找不到：${missingDigits.join("、")}。数字漏译是硬扣分点。`,
    })
  } else if (digitGroups.length > 0) {
    items.push({ id: "numbers", label: "数字已全部出现", level: "pass", detail: `原文数字 ${[...new Set(digitGroups)].join("、")}。` })
  }
  if (scaleZh) {
    items.push(
      scaleEn
        ? { id: "scale", label: "量级/百分比表达已出现", level: "pass", detail: "检出了 million / billion / percent 之类。" }
        : {
            id: "scale",
            label: "原文有「万/亿/百分」，译文没检出量级词",
            level: "warn",
            detail: "中文「万」「亿」在英文里必须换算成 ten thousand / million / billion，百分比用 percent。这里没检出，容易把量级写错。",
          },
    )
  }

  // —— 9. 时态信号 ——
  if (PERFECT_ZH.test(sourceZh)) {
    items.push(
      /\b(have|has|had)\b/i.test(userEn)
        ? { id: "tense", label: "完成时已使用", level: "pass", detail: "原文有「近年来/已经」类信号，译文用了 have/has/had。" }
        : {
            id: "tense",
            label: "原文有完成态信号，译文没检出完成时",
            level: "warn",
            detail: "原文出现「近年来/已经/至今」等从过去持续到现在的标记，通常要用现在完成时（has/have + 过去分词）。",
          },
    )
  }

  // —— 10. 逻辑连接词 ——
  const needed = CONNECTIVES.filter((c) => sourceZh.includes(c.zh))
  const missingConn = needed.filter((c) => !c.en.test(userEn))
  if (needed.length > 0) {
    items.push(
      missingConn.length === 0
        ? {
            id: "connectives",
            label: "逻辑连接词齐全",
            level: "pass",
            detail: `原文的 ${needed.map((c) => c.zh).join("、")} 在译文里都有对应表达。`,
          }
        : {
            id: "connectives",
            label: "有逻辑关系没在译文里体现",
            level: "warn",
            detail: `原文出现「${missingConn.map((c) => c.zh).join("、")}」，但译文里没检出对应连接词（可用：${missingConn.map((c) => c.tip).join(" / ")}）。中文靠语序表达的逻辑，英文必须显式写出来。`,
          },
    )
  }

  // —— 11. 并列列举 ——
  if (sourceZh.includes("、")) {
    const ok = /,.*\band\b|\band\b/i.test(userEn)
    items.push(
      ok
        ? { id: "enumeration", label: "并列列举已用英文标点", level: "pass", detail: "检出了逗号 + and 的列举结构。" }
        : {
            id: "enumeration",
            label: "并列项没有用英文列举结构",
            level: "warn",
            detail: "原文用了「、」列举多项，英文列举的标准写法是 A, B and C（最后一项前加 and），不要用中文顿号或全用逗号。",
          },
    )
  }

  // —— 12. 原文括注的英文词（真题常给 glossary，属于送分点） ——
  const glosses = [...sourceZh.matchAll(/[（(]\s*([A-Za-z][A-Za-z\-\s]{1,30}?)\s*[)）]/g)].map((m) => m[1].trim())
  if (glosses.length > 0) {
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "")
    const missing = glosses.filter((g) => !normalize(userEn).includes(normalize(g)))
    items.push(
      missing.length === 0
        ? { id: "glossary", label: "原文括注词已使用", level: "pass", detail: `用到了：${glosses.join("、")}。` }
        : {
            id: "glossary",
            label: "原文给了英文词但译文里没用",
            level: "warn",
            detail: `原文括注了 ${missing.join("、")}，译文里找不到。这是出题人直接给的词，用上就不会错。`,
          },
    )
  }

  // —— 13. 首字母大小写与句末标点 ——
  const firstChar = userEn[0] ?? ""
  const endsOk = /[.!?"']$/.test(userEn)
  if (/[a-z]/.test(firstChar) || !endsOk) {
    items.push({
      id: "format",
      label: "格式问题",
      level: "warn",
      detail: `${/[a-z]/.test(firstChar) ? "首字母没有大写。" : ""}${!endsOk ? "结尾缺少句末标点。" : ""}`.trim(),
    })
  } else {
    items.push({ id: "format", label: "首字母与句末标点正常", level: "pass", detail: "格式没有问题。" })
  }

  // —— 14. 空格与标点格式 ——
  const spacingIssues: string[] = []
  if (/ {2,}/.test(userEn)) spacingIssues.push("有多处连续空格")
  if (/\s+[,.;!?]/.test(userEn)) spacingIssues.push("标点前多了空格")
  if (/,[^\s\d]/.test(userEn)) spacingIssues.push("逗号后缺空格")
  if (spacingIssues.length > 0) {
    items.push({ id: "spacing", label: "标点/空格格式", level: "info", detail: spacingIssues.join("；") + "。" })
  }

  // —— 15. 同词重复 ——
  const freq = new Map<string, number>()
  for (const raw of w) {
    const key = raw.toLowerCase()
    if (key.length < 5 || STOPWORDS.has(key)) continue
    freq.set(key, (freq.get(key) ?? 0) + 1)
  }
  const repeated = [...freq.entries()].filter(([, n]) => n >= 4).sort((a, b) => b[1] - a[1])
  if (repeated.length > 0) {
    items.push({
      id: "repeat",
      label: "同一个词反复出现",
      level: "info",
      detail: repeated
        .slice(0, 3)
        .map(([word, n]) => `${word} ×${n}`)
        .join("、") +
        "。同一段里反复用同一个词会掉档，考虑换同义表达（写作模板里的「高分替换词表」可以直接拿来用）。",
    })
  }

  // —— 16. 与参考译文的词汇覆盖（纯字符匹配，明确标注不是语义判断） ——
  let coverage: number | undefined
  if (input.referenceEn) {
    const refContent = [...new Set(words(input.referenceEn).map((x) => x.toLowerCase()))].filter(
      (x) => x.length >= 6 && !STOPWORDS.has(x),
    )
    if (refContent.length > 0) {
      const mine = new Set(w.map((x) => x.toLowerCase()))
      const hit = refContent.filter((x) => mine.has(x))
      coverage = Math.round((hit.length / refContent.length) * 100)
      const missed = refContent.filter((x) => !mine.has(x)).slice(0, 12)
      items.push({
        id: "coverage",
        label: `参考译文词汇覆盖 ${coverage}%（纯字符匹配）`,
        level: coverage >= 60 ? "pass" : "info",
        detail:
          coverage >= 60
            ? "参考译文里的长词大部分你用了。"
            : `参考译文用了这些词，你的译文里没出现：${missed.join("、")}${refContent.length - hit.length > missed.length ? " 等" : ""}。只说明用词选择不同，不代表意思错——按需参考。`,
      })
    }
  }

  return {
    items,
    words: wordCount,
    sentences: enSentences.length,
    chineseChars: zhChars,
    pass: items.filter((i) => i.level === "pass").length,
    warn: items.filter((i) => i.level === "warn").length,
    info: items.filter((i) => i.level === "info").length,
    coverage,
  }
}

/**
 * 单句模式的对错判定：只看「参考译文的实词命中率」和「有没有留下中文」。
 * 这是规则判定不是评分——单句有唯一参考答案，而且句子短，词汇命中率还算靠谱，
 * 所以只有这个模式才往 DailyStat 里写 correct/wrong；整段翻译不猜对错。
 */
export function gradeSentenceAttempt(report: CheckReport, referenceEn: string): { correct: number; wrong: number } {
  const hasCjk = report.items.some((i) => i.id === "cjk" && i.level === "warn")
  const coverage = report.coverage ?? 0
  const refWords = words(referenceEn).length
  const ratio = refWords ? report.words / refWords : 0
  const ok = !hasCjk && coverage >= 60 && ratio >= 0.5 && ratio <= 1.9
  return ok ? { correct: 1, wrong: 0 } : { correct: 0, wrong: 1 }
}
