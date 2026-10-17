# GitHub 备份与版本信息

> 最后更新：2026-10-17
> 本文件记录两个仓库、tag、Release 与日常操作，方便在当前工作区继续开发时查阅。

---

## 一、两个仓库

| 仓库 | 内容 | 可见性 | 本地目录 |
|---|---|---|---|
| [lujun2016/spellmaster](https://github.com/lujun2016/spellmaster) | 当前版本：K12 + **CET6 复习台** | 🔒 Private | `~/spellmaster` |
| [lujun2016/spellmaster-k12](https://github.com/lujun2016/spellmaster-k12) | CET6 改造前的 **K12 原版快照**（含微信小程序） | 🔒 Private | `~/spellmaster-k12` |

### 克隆（注意用 `ssh://` 形式）

本机的 git 全局配置里有一条 `url.https://github.com/.insteadof=git@github.com:`，会把 `git@github.com:` 改写成 HTTPS。所以要这样克隆：

```bash
git clone ssh://git@github.com/lujun2016/spellmaster.git
git clone ssh://git@github.com/lujun2016/spellmaster-k12.git
```

---

## 二、版本与 tag

| 仓库 | tag | 指向提交 | 说明 |
|---|---|---|---|
| `spellmaster` | `v0.2-cet6` | `fa19912` | 当前版本：K12 + CET6 复习台 |
| `spellmaster-k12` | `v0.1-k12` | `0ed8fd9` | K12 原版快照 |

两个 tag 都是**附注 tag**（带说明、作者、日期），已推到远端。

### 打新 tag 的方法

```bash
git tag -a v0.3-xxx -m "这一版做了什么"
git push origin v0.3-xxx        # tag 不会跟 push 分支一起走，要单独推
```

---

## 三、Release

两个仓库各有一个 Release，tag 同上，均**未**勾选 pre-release（即正常发布），并已设为 Latest。

**`spellmaster` 的 Release 附件**：

| 附件 | 大小 | 内容 |
|---|---|---|
| `cet6-data-2026-10-17.zip` | 97 MB | 真题 JSON、词库、抓取脚本（152 个条目） |

> ⚠️ **版权提示**：真题内容属于考试主办方，**不要在公开仓库/公开 Release 中分发**。
> 仓库若将来转为 Public，应先把该附件撤下，让使用者自行导入数据。

---

## 四、本地目录

| 路径 | 用途 | 体积 | 状态 |
|---|---|---|---|
| `~/spellmaster` | 主项目（在用） | 933 MB | ✅ 可直接 `pnpm dev` |
| `~/spellmaster-k12` | K12 快照（仅源码） | 11 MB | ⚠️ 跑之前需 `pnpm install` |

**主项目包含**：`node_modules`、`.env`、`.next`、`prisma/cet6/dev.db`（学习数据，19 MB，不入库）。

---

## 五、哪些文件不进仓库

已在 `.gitignore` 中：

```text
node_modules/  .next/  .env*  *.tsbuildinfo
.cet6-audio/                 # TTS 缓存（44 MB）
cet6-data/raw/               # 词库原始数据
cet6-data/papers/quiz/       # 真题题目与解析
cet6-data/words.json.gz
prisma/cet6/dev.db           # 学习进度（个人数据）
prisma/cet6/backups/
src/generated/               # Prisma 生成物（含 16 MB 平台二进制）
```

---

## 六、日常操作

```bash
cd ~/spellmaster

# 看状态
git status
git log --oneline -5

# 改完代码后
git add -A
git commit -m "feat: ..."
git push origin main

# 打版本
git tag -a v0.3-xxx -m "说明"
git push origin v0.3-xxx
```

---

## 七、恢复（换机器 / 重装）

```bash
git clone ssh://git@github.com/lujun2016/spellmaster.git
cd spellmaster
pnpm install
# 重建 .env（仓库不含），至少需要 DATABASE_URL、NEXTAUTH_SECRET
pnpm exec prisma db push
pnpm exec prisma db push --schema prisma/cet6/schema.prisma
pnpm dev
```

数据（真题/词库）从 Release 附件 `cet6-data-2026-10-17.zip` 解压到项目根目录即可。
