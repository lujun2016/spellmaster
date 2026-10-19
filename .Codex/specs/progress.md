# 进度交接（2026-10-17）

## 已完成
- ② 数字口径统一：首页「共欠 N，今天先清 M」/ 词汇页「今天 M 张 · 共欠 N（剩余分摊）」
- ③ 拼写：回车拼对直接进下一词；拼错停留显示差异
- ⑧ 真题：提交后错题自动写入错题本（服务端，去重，缺答案题不写）
- 视觉 A/A+：globals.css 未分层 :root 覆盖 palette + 中文行高 + 聚焦环 + 卡片阴影 + 字号上浮
  （A+ 已构建上线：背景 #EDF0F4、正文 14.5px、卡片 14px 圆角 + 投影）
- 桌面图标：改为 osacompile 生成的标准 app（adhoc 签名），直接开带时间戳的新标签；
  兜底：~/Desktop/启动六级复习台（备用）.command；日志 /tmp/cet6-gui.log

## 已完成（补充）
- ① 番茄钟全局：src/lib/cet6/pomodoro-store.ts（localStorage + endAt）+ PomodoroDock（右下角胶囊、
  抖动/双音/爆炸、自动进休息）；首页 Pomodoro.tsx 改为读写同一 store
- ④⑤ 听力：VoaPlayer 删除 TTS 兜底与「逐句 TTS 播放」按钮；onPlay → markVoaListenedAction + revalidate；
  三处列表统一未听置顶/已听沉底
- ⑥ 真题完成度：getPaperProgress() 按题号去重算 percent，100% 显示 score；卡片右上角展示
- ⑩ 考试/报名：regStartDate/regEndDate + 首页三态（未开始/进行中/已结束隐藏）
- ⑨ 全词库导出：/cet6/vocab/list/export（xlsx/docx × en-zh/zh-en × 带/不带答案），已装 xlsx+docx，
  四种组合实测可回读（Excel 3992 行、Word 3992 个空答案行），next.config 加 serverExternalPackages

## 待做
1. ⑦ 写作生成：新增 WritingGen 表；有 key 用 AI（按题型选模板、措辞灵活），无 key 回退库内范文；
   范文后附挖空骨架 + 每空标注作用（用户计划切 4pro 后做）

## 约定
- 每批：tsc → next build → launchctl kickstart gui/$(id -u)/local.cet6.review → curl 验证
- 数据改动前备份 prisma/cet6/dev.db
- 视觉颜色类微调最后统一做
