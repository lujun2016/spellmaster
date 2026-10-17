/**
 * 文本差异对比（客户端也用得到，所以放独立文件，不依赖 Node API）。
 *
 * 用最长公共子序列做字符级对齐，用来给「听写/拼写」的结果标出：
 *   same    写对了
 *   wrong   写错（用户多写/写错的字符）
 *   missing 漏写（答案里有但用户没写）
 */
export type DiffPart = { ch: string; kind: "same" | "wrong" | "missing" }

export function diffChars(input: string, answer: string): DiffPart[] {
  const a = input.toLowerCase()
  const b = answer.toLowerCase()
  const m = a.length
  const n = b.length
  // 句子级别的长度（听写整句可能上百字符），O(m*n) 完全够用
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }

  const out: DiffPart[] = []
  let i = 0
  let j = 0
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      out.push({ ch: answer[j], kind: "same" })
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ ch: input[i], kind: "wrong" })
      i++
    } else {
      out.push({ ch: answer[j], kind: "missing" })
      j++
    }
  }
  while (i < m) out.push({ ch: input[i++], kind: "wrong" })
  while (j < n) out.push({ ch: answer[j++], kind: "missing" })
  return out
}

/** 单词级准确率：按词对齐，用于听写评分（比字符级更能反映"听没听懂"） */
export function wordAccuracy(input: string, answer: string): number {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9'\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
  const want = norm(answer)
  const got = norm(input)
  if (!want.length) return 0
  const pool = [...got]
  let hit = 0
  for (const w of want) {
    const idx = pool.indexOf(w)
    if (idx >= 0) {
      hit++
      pool.splice(idx, 1)
    }
  }
  return Math.round((hit / want.length) * 100) / 100
}
