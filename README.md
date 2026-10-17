# SpellMaster · K12 英语学习平台 + CET6 复习台

> **📌 版本说明**
> 本仓库是**当前版本**（`v0.2-cet6`）：在 K12 原版之上，新增了 **CET6 复习台**（`/cet6` 路由段 + 独立数据层）。
> CET6 改造**之前**的 K12 原版快照在 **[spellmaster-k12](https://github.com/lujun2016/spellmaster-k12)**（tag `v0.1-k12`），用于对照与回滚。
> 仓库、tag、Release 与日常操作说明见 [GITHUB.md](./GITHUB.md)。

---

## 这是什么

一个多角色 K12 英语学习 SaaS，外加一套完整的 **CET6 备考工作台**。

### 一、K12 原版（CET6 改造前已有）

| 角色 | 能做什么 |
|---|---|
| **学生** | 按教材单元闯关背单词、拼写练习、错词重练、看排行榜 |
| **家长** | 微信/手机号登录，查看孩子学习状态、会话摘要、动画状态 |
| **老师/管理员** | 管理教材、年级、单元、单词库、视频；管理学生 |

### 二、CET6 复习台（`/cet6`）

| 模块 | 路由 | 内容 |
|---|---|---|
| 词汇 | `/cet6/vocab` | 分册词库、拼写/选择、错词重练 |
| 听力 | `/cet6/listening` | 真题听力、VOA 精听、听写训练 |
| 阅读 | `/cet6/papers` | 真题套卷、逐题解析、重做 |
| 翻译 | `/cet6/translation` | 句子/段落翻译，含 AI 分析 |
| 写作 | `/cet6/writing` | 模板、完形式写作训练 |
| 错题本 | `/cet6/notebook` | 收藏与复习、按类型筛选、导出 |
| 统计 | `/cet6/stats` | 正确率趋势、模块分布、热力图、阶段统计 |
| 每日 | `/cet6/daily` | 每日阅读/听力任务 |
| 设置 | `/cet6/settings` | 通用设置、TTS、LLM、数据导出/危险操作 |

**语料规模**（据本地数据统计）：约 4000 词、**46 套真题共 1859 题（含逐题解析）**、数千条真题例句与中英对照例句，另有短语与词根记忆法数据。

## 技术栈

- **Next.js 16**（App Router）+ React 19
- **Prisma 5** + SQLite —— **两套独立 schema**：
  - `prisma/schema.prisma` → K12 数据
  - `prisma/cet6/schema.prisma` → CET6 数据
- **NextAuth**（微信 / 手机号验证码）
- **Tailwind CSS 4**

## 主要路由

```text
/login                       登录
/student/units               学生：单元列表
/student/units/[unitId]      学生：单元闯关
/student/leaderboard         学生：排行榜
/admin                       管理后台（学生 / 单词 / 教材）
/cet6                        复习台首页
/cet6/vocab  listening  papers  translation  writing
/cet6/notebook  stats  daily  settings
/api/v1/parent/*             家长端接口
/api/cet6/*                  CET6 接口（音频 / TTS / 题库）
/api/auth/[...nextauth]      认证
```

## 本地运行

```bash
pnpm install

# 1) K12 数据库
pnpm exec prisma db push
# 2) CET6 数据库（独立）
pnpm exec prisma db push --schema prisma/cet6/schema.prisma

# 3) 可选：导入 CET6 词库 / 真题（需要先抓取数据，见下）
pnpm run db:cet6:seed

# 4) 启动
pnpm dev
```

打开 http://localhost:3000。

### CET6 数据脚本

```bash
pnpm run data:words        # 构建词库
pnpm run data:papers       # 抓取真题
pnpm run data:quiz         # 抓取真题题目与解析
pnpm run db:cet6:generate  # 生成 CET6 Prisma 客户端
pnpm run db:cet6:studio    # 打开 CET6 数据库 GUI
```

> ⚠️ 原始题库/词库数据（`cet6-data/raw/`、`cet6-data/papers/quiz/`）与 TTS 缓存（`.cet6-audio/`）
> 体积大、可重新生成，**未提交到仓库**，已写入 `.gitignore`。

## 环境变量

`.env` **不提交**（已在 `.gitignore`）。至少需要：

```dotenv
DATABASE_URL="file:./prisma/dev.db"           # K12
NEXTAUTH_SECRET="..."
```

> CET6 使用独立的 schema 与数据库文件（`prisma/cet6/dev.db`），如代码中使用独立变量，请同步配置。

## 版本记录

| tag | 说明 |
|---|---|
| `v0.2-cet6` | 当前版本：K12 + CET6 复习台 |
| `v0.1-k12` | K12 原版（在 [spellmaster-k12](https://github.com/lujun2016/spellmaster-k12) 仓库） |

## 构建

```bash
pnpm build
```

2026-10-17 实测通过（`EXIT=0`，K12 与 `/cet6/*` 全部路由编译成功）。

## 许可证

未指定（私有仓库）。
