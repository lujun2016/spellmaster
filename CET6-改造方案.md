# SpellMaster → CET-6 自用复习工具 改造方案

> 状态：**已实施完成**（2026-09-24）。这份文档保留为设计记录；实际上线情况、使用方式与已知限制见 **`CET6-使用说明.md`**。
>
> 落地情况速览：新的六级工具全部在 `/cet6` 路由段 + 独立 SQLite（`prisma/cet6/dev.db`），旧应用原封不动保留；
> 词库 3992 词、真题 46 套 1859 题（含答案与逐题解析）、13 个写作模板均已入库；`pnpm build` 通过；
> 与当初设计的差异：① 音频改为「免费百度 TTS + 有道发音 + 浏览器朗读兜底」（微软 Edge TTS 实测握手 404 已弃用）；
> ② 真题改为接入带答案解析的题库（2020–2026），比原计划的 Word 版文本强得多；③ 每日文章源确定为中国日报双语栏目（更新慢，改为按天轮换）。

---

## 0.5 本次已经落地的产物（不依赖旧代码）

| 文件 | 内容 |
|---|---|
| `cet6-data/raw/*.jsonl.gz` | 六级词库原始分册（CET6_1/2/3 + 乱序版，4 册，6.4 MB） |
| `cet6-data/build-words.mjs` | 归一化+合并去重脚本（纯 Node，无依赖，可重跑） |
| `cet6-data/words.json.gz` | **3992 词**：音标/释义/英释/短语/例句/真题例句/同义词/同根词/记忆法（2.0 MB） |
| `cet6-data/stats.json` | 语料统计 |

语料实测家底：**6918 条真题例句**（阅读 5163 / 听力 1037 / 写作 488，含年份+套数+题型，2008.12–2017.6）、
**7795 条中英对照例句**（可直接当翻译练习）、**24172 条短语**、1837 条词根记忆法。

> ⚠️ 阻塞点：`src/`、`prisma/`、`.env`、`node_modules/` 全为 iCloud 占位文件（`compressed,dataless`），
> 读取报 `Resource deadlock avoided`，`brctl` 与 Finder 强制读取均失败（Finder 报 -36 I/O error）。
> 这些文件恢复本地后才能读源码、装依赖、跑构建。

---

## 0. 一句话结论

旧项目是「小学背单词 SaaS」（老师/家长/学生三角色 + 微信登录 + 单元闯关 + 排行榜 + 视频），
你要的是「单人自用的六级复习台」。**角色/权限/家长端/排行榜整套砍掉**，把它的
「拼写练习 + 词库管理 + 音频发音 + 学习流程」四块底子，换成六级词汇 + 真题语料 + 五个新模块。

---

## 1. 免费内容与音频源：已实测（关键结论）

| 用途 | 方案 | 实测结果 |
|---|---|---|
| 六级词库 | 开源词库 [kajweb/dict](https://github.com/kajweb/dict) 六个分册 | ✅ **已下载并归一化：3992 词** |
| 单词发音 | 有道 `dictvoice?audio=word&type=2` | ✅ 实测 200，返回 MP3，无需 key（**长句 500**，短句 200 → 用于单词/短语） |
| 句子/文章音频 | 百度翻译 `fanyi.baidu.com/gettts?lan=en&text=..&spd=3&source=web` | ✅ **实测主力方案**：224 字符整段 200 OK（51 KB MP3），`spd` 可变速，无需 key |
| 音频兜底 | 浏览器 `speechSynthesis` | ✅ 零网络依赖，永不失败（音色一般） |
| 备用 TTS | 微软 Edge TTS | ⚠️ 端点可达但握手 404，要额外实现鉴权 token，**不作主方案** |
| 视频 | B站 `www.bilibili.com` | ✅ 可达（搜索 API 有风控 412 → 用 BV 号收藏 + 站内嵌入）；YouTube ❌ 被墙 |
| 每日文章源 | 中国日报英语点津 `language.chinadaily.com.cn` | ✅ 可达，**中英对照正文可干净抽取**（导语+英文段落+中文译文） |
| 备用文章源 | 沪江英语、可可英语 | ✅ 可达（可可英语有反爬，需带 UA） |
| 被墙源 | VOA Learning English、BBC 6 Minute English | ❌ 连接超时，**放弃** |
| 免费 LLM（可选增强） | 智谱 GLM-4-Flash（官方标称免费）、豆包 lite 免费额度、硅基流动免费模型 | ✅ 端点可达，需自己注册 key |
| LLM（非免费但便宜） | DeepSeek `deepseek-flash` | ✅ 可达，按量计费 |

**核心设计原则：LLM 是"可选增强"，不是依赖。**
已到手的语料足够离线出题，没有 key 也能用：

- 3992 词 × 音标/释义/英释/同义词/同根词
- **6918 条真题例句**（阅读 5163 / 听力 1037 / 写作 488，标注了年份+套数+题型）
- 7795 条中英对照例句 → 直接当翻译练习
- 24172 条常用短语，1837 条记忆法（词根拆解）

数据已生成：`cet6-data/words.json.gz`（2.0 MB，含全部字段），构建脚本 `cet6-data/build-words.mjs` 可重跑。

---

## 2. 保留 / 砍掉 / 新增

| 现有文件（推断） | 处理 |
|---|---|
| `src/components/SpellingPractice.tsx` | **改造复用** → 六级单词拼写 + 听写模式 |
| `src/components/WordsManager.tsx` | **改造复用** → 词库/词单管理、生词本 |
| `src/lib/audio-service.ts` | **改造复用** → 接入有道 TTS（单词）+ 百度 TTS（整句） |
| `src/components/UnitLearningFlow.tsx` | **替换** → 换成 SM-2 复习流（今日待复习队列） |
| `src/components/LeaderboardClient.tsx`、`src/lib/rank-service.ts` | **删**（单人自用无排行榜） |
| `src/app/admin/*`、`src/components/StudentsManager.tsx` | **删**（无学生管理） |
| `src/app/api/v1/parent/*`、`src/lib/parent-auth.ts`、`src/lib/wechat.ts`、`src/lib/verification-codes.ts` | **删**（无家长端、无微信验证码） |
| `src/lib/auth.ts`、`src/app/login/page.tsx`、NextAuth | **删或留一个单口令**（自用建议直接免登录，或 4 位 PIN） |
| `src/components/VideoPlayer.tsx`、`ResultAnimation.tsx` | 按需留（动画可给打卡/连击用） |
| `prisma/schema.prisma` | **重写**为新数据模型（见下） |

---

## 3. 数据模型草案（Prisma）

```prisma
// 词条：由 cet6-data/words.json.gz 一次性 seed
model Word {
  id        String   @id @default(cuid())
  text      String   @unique          // 单词
  rank      Int                        // 频次序（真题句数降序）
  freq      Int                        // 真题出现次数
  ukPhone   String?
  usPhone   String?
  trans     Json                       // [{pos, cn}]
  defEn     String?
  phrases   Json                       // [{en, cn}]
  sents     Json                       // [{en, cn}]  中英对照例句
  examSents Json                       // [{en, y, p, t}] 真题例句+来源
  synos     Json
  relWords  Json
  mnemonic  String?
  progress  WordProgress?
}

// 复习排程：简化版 SM-2（艾宾浩斯）
model WordProgress {
  id         String   @id @default(cuid())
  wordId     String   @unique
  word       Word     @relation(fields: [wordId], references: [id])
  stage      Int      @default(0)     // 0..8，对应 5min/12h/1d/2d/4d/7d/15d/30d/60d
  ease       Float    @default(2.5)   // 难度因子
  dueAt      DateTime                  // 下次到期时间
  reps       Int      @default(0)     // 累计复习次数
  lapses     Int      @default(0)     // 遗忘次数
  lastResult String?                   // again | hard | good | easy
  // 分技能掌握度，用于区分"认得"和"拼得出"
  recallLv   Int      @default(0)     // 中→英 回忆
  spellLv    Int      @default(0)     // 听音拼写
}

// 错题本 + 生词本（合一，用 kind 区分）
model NotebookItem {
  id        String   @id @default(cuid())
  kind      String                     // word | mistake | sentence | phrase
  source    String                     // 阅读 | 听力 | 翻译 | 写作 | 词汇 | 手工
  title     String
  content   String                     // 题目/词条原文
  answer    String?
  myAnswer  String?                    // 我做错的答案
  note      String?                    // 我的批注
  tags      String                     // 逗号分隔
  createdAt DateTime @default(now())
  dueAt     DateTime?                  // 同样进复习排程
}

// 番茄钟 + 打卡
model StudySession {
  id        String   @id @default(cuid())
  kind      String                     // vocab | listening | reading | writing | translation
  minutes   Int
  pomodoros Int      @default(1)
  startedAt DateTime
  endedAt   DateTime?
  note      String?
}

model DailyStat {
  date      DateTime @id @db.Date      // 一天一行
  minutes   Int      @default(0)
  newWords  Int      @default(0)
  reviews   Int      @default(0)
  correct   Int      @default(0)
  wrong     Int      @default(0)
  streak    Int      @default(0)       // 连续打卡天数
}

// 听力精听
model ListeningDrill {
  id         String   @id @default(cuid())
  title      String
  audioPath  String?                   // 百度/有道 TTS 合成后落盘
  sourceText String
  sentences  Json                      // [{en, cn, audio?}]
  dictation  Json?                     // 我的听写结果
  accuracy   Float?
  createdAt  DateTime @default(now())
}

// 写作/翻译模板
model WritingTemplate {
  id       String @id @default(cuid())
  category String                     // 议论文 | 图表 | 应用文 | 书信 | 翻译技巧
  title    String
  body     String                     // 模板正文，含 {占位符}
  phrases  Json                       // 万能句式
  starred  Boolean @default(false)
}

// 每日自动内容
model DailyArticle {
  id        String   @id @default(cuid())
  date      DateTime @db.Date
  title     String
  sourceUrl String
  paragraphs Json                     // [{en, cn}]
  audioPath String?
  vocab     Json?                     // LLM 或本地匹配出的生词
  quiz      Json?                     // 理解题
  generatedBy String                  // llm:glm-4.7-flash | local
}
```

---

## 4. 页面结构（路由）

```
/                    今日驾驶舱：倒计时 + 今日待复习数 + 番茄钟 + 连续打卡
/vocab               词汇复习（默认队列）：卡片翻转 → 认得/模糊/忘了
/vocab/spell         拼写模式（听音拼写 / 中译英）
/vocab/list          全词库浏览（按频次/字母/未学筛选），一键加入生词本
/notebook            错题本 + 生词本（按来源和标签筛选，可导出 Markdown）
/listening           听力精听：音频 + 逐句听写 + 对照原文 + 复读/变速
/writing             写作模板 + 万能句式（背诵模式：填空/抽查）
/translation         翻译练习（用 7795 条中英对照句，先译后对）
/daily               每日一篇：中国日报双语文章 + 生词 + 理解题 + 音频
/stats               统计：热力图、番茄数、正确率曲线、各模块时长
/settings            设置：考试日期、每日新词量、复习上限、LLM key、TTS 音色
```

---

## 5. 五个模块的关键交互（重点说明）

### 5.1 词汇 + 艾宾浩斯
- 间隔阶梯：`5分钟 → 12小时 → 1天 → 2天 → 4天 → 7天 → 15天 → 30天 → 60天`
- 评级影响：`again` 退回上一阶、`hard` 原地、`good` 进一阶、`easy` 跳两阶
- **双轨掌握度**（sm-2 的 `recallLv` / `spellLv` 分开记）：认得 ≠ 拼得出。六级翻译/写作要拼得出，所以拼写正确才升 `spellLv`，卡片只升 `recallLv`
- 顺序优先级：`dueAt 已到期` → `真题高频未学词` → `按频次序新词`；每日新词量可设（建议 30–50）
- 每天总量上限保护（默认 150 张），防止某天堆积后被劝退

### 5.2 错题本 + 生词本
- **一处收集**：做完听力/翻译/阅读，点「加入错题本」，自动带上来源标签和原文
- 生词有两条入口：手动加，或在精读/精听页面点词（配合 3992 词库匹配，命中就自动带释义）
- 错题同样进 SM-2 排程（`dueAt`），在 `/` 今日队列里和单词混排
- 导出：一键导出 Markdown/CSV，方便打印或喂给别的工具

### 5.3 听力精听（音频不依赖外部素材）
- 文本 → 百度 TTS 逐句合成 MP3（免费、spd 变速）→ 缓存到 `public/audio/`；单词用有道发音（英/美音）
- 播放器：倍速 0.6–1.5x、单句循环、AB 复读、逐句跳转（复用现有 `VideoPlayer` 的控件思路）
- 听写：逐句输入 → 与原文按单词做 diff 高亮 → 算准确率 → 错的词自动进生词本
- 素材来源：真题听力句（1037 条自带年份/套数）、每日中国日报文章、自己的错题

### 5.4 写作 / 翻译模板
- 内置六大类模板：议论文（观点对比/问题解决）、图表描述、书信/通知、翻译高频句型、万能开头结尾、连接词替换表
- 背诵模式：模板挖空 → 我填 → 判定；对的降频、错的进复习队列
- 翻译练习直接用 `sents`（7795 条中英对照）与真题句，先自己翻再对照

### 5.5 番茄计时 + 打卡
- 番茄钟 25/5，可切 45/10；结束时记录到 `StudySession`（带模块标签）
- 首页显示：距考试天数、今日番茄数、今日任务完成度、连续打卡 N 天
- 统计页：日历热力图（GitHub 风格）+ 各模块时长饼图 + 正确率折线

---

## 6. 每日内容自动生成管线（免费方案）

```
① 抓取   中国日报英语点津列表页 → 抽当日/最新 1 篇双语文章
         （正文结构已验证：中文导语 + 英文段落 + 中文译文）
② 分句   按句切分，中英段落配对，存入 DailyArticle.paragraphs
③ 生词   本地：用 3992 词库匹配文章中命中的六级词（标频次）
         增强：有 LLM key 时让模型挑 8-12 个最值得学的 + 给中文讲解
④ 出题   本地：从真题句做选词填空、从原文做翻译句
         增强：LLM 出 3 道理解题 + 1 道翻译题 + 范文
⑤ 配音   百度 TTS 合成全文/逐句 MP3（spd 调语速），落盘缓存
⑥ 入库   DailyArticle，首页「今日一篇」直接可读可听可练
```

**兜底层级**：`有 key` → LLM 全功能；`无 key` → 纯本地规则版（依然有文章、生词、音频、练习）。
我会把「今天有没有生成成功」显示出来，失败不静默。

---

## 7. 实施顺序

| 阶段 | 内容 | 产出 |
|---|---|---|
| M1 | 数据层：seed 脚本把 3992 词灌进 DB + SM-2 引擎 | `/vocab` 能跑起来 |
| M2 | 首页驾驶舱 + 番茄钟 + 打卡 | 每天能用的最小闭环 |
| M3 | 听力精听（百度 TTS + 有道发音 + 听写 diff） | `/listening` |
| M4 | 错题本/生词本 + 导出 | `/notebook` |
| M5 | 写作模板 + 翻译练习 | `/writing`、`/translation` |
| M6 | 每日内容管线（抓取 + 可选 LLM） | `/daily` |
| M7 | 统计页 + 清理旧代码（删家长端/排行榜/微信登录） | 收尾 |

---

## 8. 待你确认

1. **iCloud 恢复**：`src/` 下 57 个文件全是占位符，我读不到也跑不了构建。恢复后我按真实代码适配。
2. **免费 LLM key**：你有没有智谱/豆包/硅基流动的 key？没有的话我先按「纯本地离线」做，key 位置留好。
3. **考试日期**：用于首页倒计时和复习强度设置（比如每天新词量）。
4. **数据库**：旧项目用的什么库（`.env` 里的 `DATABASE_URL` 我读不到）。自用建议 **SQLite**，免安装免维护。
5. **旧功能要不要彻底删**：家长端/微信登录/排行榜，删掉更清爽；如果你想留着以后给别人用，我就只做「隐藏而不删」。
