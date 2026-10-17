# CET6 复习工具 · 免费大模型 API 申请与接入指南

> 调研日期：**2026-09-24**
> 场景：个人 CET6 复习网页工具，需要 API 做 4 件事 —— ①中英双语文章挑 8-12 个六级生词并中文讲解 ②出 3 道阅读题 + 1 道翻译题 ③批改 150-200 词英语作文 ④偶尔生成一段短英文听力材料
> 硬性约束：**中国大陆可直连（不用梯子）** / **免费或极低价** / **OpenAI 兼容接口** / **注册不需要企业资质**

---

## 0. 先说结论（TL;DR）

- **首推：智谱 AI（GLM）**。理由：`glm-4.7-flash` 是官方定价页明确写着"免费"的模型，200K 上下文 / 128K 最大输出，OpenAI 兼容接口就是标准 `/chat/completions`，**而且官方 FAQ 明确写"调用 API 并不强制要求实名认证"** —— 这四条在国内厂商里是唯一全中的。你的 4 个用途（生词讲解、出题、作文批改、听力材料）它一个模型全能干。
- **备份 A（愿意实名一次 → 最划算）：魔搭 ModelScope API-Inference**。`base_url = https://api-inference.modelscope.cn/v1/`（**标准 OpenAI 兼容，我实测过 `/v1/models` 返回 200 且列出 35 个模型**），免费池里**直接有 `ZhipuAI/GLM-4.7-Flash`**，还有 DeepSeek-V4-Pro、Qwen3.5-397B、GLM-5.2、MiniMax-M3。额度按「魔粒」每天刷新（约 125–500 次/天）。代价：**必须绑阿里云账号 + 阿里云实名认证 + 验邮箱**。
- **备份 B（不想实名）：火山方舟（豆包）**。新用户每个模型 50 万 tokens 免费额度，`doubao-seed-2.0-mini` 极便宜，`base_url` 也是 OpenAI 兼容。缺点：**额度是用完即止的试用额度，不是长期免费**，且额度用尽后要继续用必须实名认证。
- **第三通道（最省事但模型小）：讯飞星火 Spark Lite**。`base_url = https://spark-api-open.xf-yun.com/v1/`、模型 ID `lite`（端点和模型 ID 我实测确认）；实名后"不限量"。但**输入只有 8K / 输出只有 4K**，长文章生词讲解会被截断，只能当极端兜底。
- **愿意花几块钱换质量：DeepSeek `deepseek-flash`**。它**不免费**，但空闲时段 输入 1 元 / 输出 4 元 每百万 tokens，一次作文批改花不到 1 分钱。
- 阿里云百炼（90 天新人额度）、硅基流动（免费模型需实名）可以当第四、第五备选；**百度千帆的 ERNIE-Speed/Lite 已下线，别再照旧教程去注册**；魔搭 ModelScope 的额度机制也不是网上说的"每天 2000 次"。

---

## 1. 总览对比表

| 平台 | 免费额度 / 免费模型 | 推荐模型 ID | OpenAI 兼容 base_url | 需梯子？ | 需实名认证？ | 注 |
|---|---|---|---|---|---|---|
| **智谱 AI（GLM）** | **长期 0 元**：`glm-4.7-flash`、`glm-4-flash-250414`、`glm-z1-flash`、`glm-4.6v-flash` 等 8 款标价"免费" | `glm-4.7-flash` | `https://open.bigmodel.cn/api/paas/v4/` | 否 | **否**（官方 FAQ：调用 API 不强制实名） | 并发数按权益等级 V1/V2/V3 分档，控制台自查 |
| **火山方舟（豆包）** | 新用户**每个模型 50 万 tokens**（试用性质，用完即止） | `doubao-seed-2.0-mini` | `https://ark.cn-beijing.volces.com/api/v3` | 否 | 注册不需要；**额度耗尽后继续用需要** | 可开"安心体验模式"防扣费；额度用光服务自动暂停 |
| **硅基流动 SiliconFlow** | **长期 0 元的模型**：`XingChenAGI/Xing4.0-29B`（对话）、`tencent/Hunyuan-MT-7B`（翻译）、多个 bge 向量/重排模型 | `XingChenAGI/Xing4.0-29B` | `https://api.siliconflow.cn/v1` | 否 | **需要**（官方文档原文"实名认证后使用全部的免费模型"） | 免费模型限速固定；旧说法里的"Qwen3-8B 免费"在当前价格页已不成立 |
| **阿里云百炼（通义千问）** | 新人**每个模型 100 万 tokens**，**有效期 90 天**，仅华北2（北京）地域 | `qwen-flash` | `https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/compatible-mode/v1`（旧域名 `https://dashscope.aliyuncs.com/compatible-mode/v1` 仍可用） | 否 | 领取免费额度**不需要**；额度用完后想按量付费才需要 | 未实名时"用完即停"强制开启，不会偷扣钱 |
| **DeepSeek** | ❌ **不免费**，无免费模型 | `deepseek-flash` | `https://api.deepseek.com` | 否 | 需手机号注册 + 充值 | 空闲时段：输入 1 元 / 输出 4 元 每百万 tokens |
| **长期免费备选** | 见第 7 节 | — | — | 否 | — | — |
| ↳ **魔搭 ModelScope**（愿实名 → 最优备份） | 长期免费，按「魔粒」计（登录 200/日 + 绑阿里云 50/日）—— **不是网上流传的 2000 次/天** | `ZhipuAI/GLM-4.7-Flash`、`Qwen/Qwen3.5-35B-A3B` | `https://api-inference.modelscope.cn/v1/`（**OpenAI 兼容，我实测过**） | 否 | **需要**（绑阿里云 + 阿里云实名 + 验邮箱） | 免费池里还有 DeepSeek-V4-Pro / Qwen3.5-397B / GLM-5.2 |
| ↳ **讯飞星火 Spark Lite**（最省事但模型小） | **长期免费 + 实名后不限量**（额度口径由子代理核实；端点和模型 ID 我实测确认） | `lite` | `https://spark-api-open.xf-yun.com/v1/` | 否 | **需要**（实名才"不限量"） | **输入仅 8K / 输出仅 4K**，长文章会被截断；QPS 未公开 |
| ↳ **百度千帆** | ❌ **已不免费**：`ERNIE-Speed` / `ERNIE-Lite` 官方迁移公告已标「已下线」 | — | `https://qianfan.baidubce.com/v2/chat/completions` | 否 | — | 只剩一次性新用户额度，见第 7.5 节 |

---

## 2. 智谱 AI（GLM）—— 首选

### 2.1 核实到的事实

**注册 / 登录**
- 开放平台入口：<https://open.bigmodel.cn/>（HTTP 200）
- 也可从主域 <https://bigmodel.cn> 进

**API Key 创建页（官方文档给出的就是这一页）**
- <https://bigmodel.cn/usercenter/proj-mgmt/apikeys>（HTTP 200）
- 官方 OpenAI 兼容文档原文步骤：访问开放平台 → 注册登录 → 在「API Keys」管理页创建 API Key

**免费模型（来源：官方定价页 <https://docs.bigmodel.cn/cn/guide/start/pricing> 与模型概览页，2026-09-24 抓取）**

官方价格表里"输入单价 / 输出单价"两列明确写 **"免费"** 的模型：

| 模型 ID | 定位 | 上下文 | 最大输出 |
|---|---|---|---|
| `glm-4.7-flash` | **免费文本模型**，延续 GLM-4.7 基座，30B 级 | 200K | 128K |
| `glm-4-flash-250414` | 免费文本模型（智谱首个免费 API） | 128K | 16K |
| `glm-z1-flash` | 免费（推理向） | 128K | — |
| `glm-4.6v-flash` | 免费视觉理解（9B，原生 Function Calling） | 128K | 32K |
| `glm-4.1v-thinking-flash` | 免费视觉推理 | 64K | 16K |
| `glm-4v-flash` | 免费图像理解 | 16K | 1K |
| `cogview-3-flash` | 免费文生图 | — | — |
| `cogvideox-flash` | 免费视频生成 | — | — |

**对你这个项目，只用 `glm-4.7-flash` 就够了**（200K 上下文能一次塞进整篇双语文章 + 生词表 + 出题要求）。

**⚠️ 重要变化：`glm-4.5-flash` 已下线**
官方文档在 GLM-4.5-Flash 页顶部写明：「GLM-4.5-Flash 将于 2026 年 1 月 30 日下线……正式下线后，相关请求将会自动路由至 GLM-4.7-Flash」。所以网上大量教程里写的 `glm-4.5-flash` 已经过时，**请直接用 `glm-4.7-flash`**。

**⚠️ 注意：`glm-5.3-flash` 不是免费的**
新旗舰 Flash 已转为付费：`GLM-5.3-Flash` 输入 0.8 元 / 输出 2.8 元 每百万 tokens；`GLM-5.3` 输入 8 元 / 输出 28 元。**只有 4.x 代 Flash 免费**。

**速率限制（官方文档 <https://docs.bigmodel.cn/cn/api/rate-limit>）**
- 限制形式是**并发请求数**（同一时刻处理中的请求数），**不是** RPM/TPM。
- 不同模型有独立的并发上限；**并发上限与账户"用户权益等级"（V1 / V2 / V3，按积分划分）相关**，高峰期还会动态限流。
- **官方文档没有给出免费模型的固定并发数值** —— 必须登录后在 <https://bigmodel.cn/usercenter/proj-mgmt/rate-limits> 查看你自己账户各模型的实际速率。**这一条我没能核实到具体数字，别信任何博客里写的"并发 5"之类的说法。**
- 相关错误码：`1302` = 触发用户速率限制（降并发 / 加队列）；`1305` = 平台服务过载（稍后重试）。
- 建议：对个人工具来说，**串行调用 + 失败重试（间隔递增）**就足够，不要并发压它。

**实名认证**
- 官方 FAQ（<https://docs.bigmodel.cn/cn/faq/authentication-issues>）原文：**「目前调用 API 并不强制要求实名认证」**，但建议实名。
- 实名入口（可选）：<https://open.bigmodel.cn/usercenter/auth>（HTTP 200）
- 结论：**注册手机号/账号后即可拿 Key 调免费模型，不需要企业资质、也不需要先实名。**

**OpenAI 兼容 base_url**
```
https://open.bigmodel.cn/api/paas/v4/
```
（来源：官方「OpenAI API 兼容」文档，示例代码里 `base_url="https://open.bigmodel.cn/api/paas/v4/"`）

### 2.2 最小 curl 测试

```bash
curl -X POST "https://open.bigmodel.cn/api/paas/v4/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "model": "glm-4.7-flash",
    "messages": [
      {"role": "user", "content": "用一句中文解释六级词汇 undertake 的意思，并给一个例句。"}
    ],
    "stream": false
  }'
```

**预期返回**：HTTP 200，JSON 形如 `{"id":"...","choices":[{"index":0,"message":{"role":"assistant","content":"..."},"finish_reason":"stop"}],"usage":{"prompt_tokens":..,"completion_tokens":..,"total_tokens":..}}`。如果 Key 错了会返回 401；如果模型名写错会返回模型不存在类错误。

> 官方 GLM-4.7-Flash 文档的示例里还带了三个参数：`"thinking": {"type": "enabled"}`（可切 `disabled`）、`"max_tokens": 65536`、`"temperature": 1.0`。**做生词讲解/出题这类任务建议显式关掉思考模式**（`"thinking": {"type":"disabled"}`）—— 思考模式会显著拉长首字延迟，而你的场景不需要长链推理。

> 只做可达性检查的话，不带 Key 请求 `https://open.bigmodel.cn/api/paas/v4/chat/completions` 会返回 **401**（我实测确认过），说明服务在线。

### 2.3 落地建议

- 4 个功能都用 `glm-4.7-flash`，用 `response_format: {"type":"json_object"}`（官方文档支持结构化输出）让你的 Next.js 前端直接解析生词表和题目，省掉正则解析。
- 长文章注意：选 `glm-4.7-flash`（200K）而不是 `glm-4-flash-250414`（128K，输出只有 16K）。

---

## 3. 火山方舟（豆包 Doubao）—— "不想实名"时的备份首选

### 3.1 核实到的事实

**注册 / 控制台**
- 火山引擎注册入口：<https://www.volcengine.com/>（HTTP 200）
- 火山方舟控制台：<https://console.volcengine.com/ark>（HTTP 200）

**开通与 API Key**
- API Key 页面：<https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey>（HTTP 200）
- 开通管理（看免费额度余量、开"安心体验模式"）：<https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement>（HTTP 200）

**免费额度规则（官方文档「免费推理额度」<https://www.volcengine.com/docs/82379/1399514>，页面最近更新 2026-08-24）**
- 新用户注册火山引擎账号即可获得免费推理试用额度，**0 成本**试用。
- **不同模型分别计算额度，主账号下共享**（子账号调用也扣同一个池子）。
- **基础模型与基于它精调后的模型共享同一份额度**。
- 只抵扣**按 token 后付费的在线推理**费用；**不能**抵扣批量推理、各类插件、知识库的费用；**不能**抵扣上下文缓存的存储费（但缓存命中/未命中的 token 和输出 token 可以抵扣）。
- 查询入口就是上面的「开通管理」页。

**额度具体是多少？**
官方「安心体验模式细则说明」<https://www.volcengine.com/docs/82379/1465347>（2026-08-13 更新）里反复写死了这个数字：**「平台赠送的 50w token 免费额度」**，即**每个模型 50 万 tokens**。
（早年的说法"每个模型 500 万 tokens"在当前官方文档里我**没有**找到依据，**未能核实**，请以控制台「开通管理」页显示的实际额度为准。）

**额度用完会怎样？**
- 免费额度耗尽后调用会失败；继续用需要**完成实名认证并手动开通对应模型推理服务**。
- 建议开 **「安心体验模式」**：只有"未开通过模型服务"的新账号能开；开启后仅消耗赠送额度，**接近额度时服务自动暂停**，不会产生额外费用。注意：**关闭后无法再次开启**，要谨慎。

**模型与价格（官方「模型价格」页 <https://www.volcengine.com/docs/82379/1099320>，元/百万 tokens）**

| 模型 ID | 输入 | 输出 | 备注 |
|---|---|---|---|
| `doubao-seed-2.0-mini` | 0.2（输入 [0,32]k） / 0.4 / 0.8 分档 | 2.0 / 4.0 / 8.0 分档 | **最便宜，个人工具首选** |
| `doubao-seed-2.0-lite` | 0.6 / 0.9 / 1.8 | 3.6 / 5.4 / 10.8 | 语音输入 9.0~27.0 |
| `doubao-seed-2.1-lite` | 0.8 | 2.7 | 语音输入 12.0 |
| `doubao-seed-2.0-pro` | 3.2 / 4.8 / 9.6 | 16.0 / 24.0 / 48.0 | 贵 |
| `doubao-seed-2.1-pro` | 6.0 | 30.0 | 最贵 |
| `doubao-seed-2.1-turbo` | 3.0 | 15.0 | |
| `glm-5.3-flash`（方舟上也有） | 0.8 | 2.8 | 与智谱同价 |
| `deepseek-v4-1-flash` | 空闲 1.0 / 高峰 2.0 | 空闲 4.0 / 高峰 8.0 | 高峰=工作日 09:00–12:00、14:00–18:00 |

50 万免费 tokens 用 `doubao-seed-2.0-mini` 大概够跑几百次批改/出题（一次作文批改约 1500 输入 + 800 输出 ≈ 2300 tokens，50 万 ÷ 2300 ≈ **200 次左右**）。当备份足够。

**OpenAI 兼容 base_url**
```
https://ark.cn-beijing.volces.com/api/v3
```
来源：官方文档中的示例代码（`base_url='https://ark.cn-beijing.volces.com/api/v3'`，见 <https://www.volcengine.com/docs/82379/1399009>）。
**我另外实测**：不带 Key `POST https://ark.cn-beijing.volces.com/api/v3/chat/completions` 返回 **401 + `{"error":{"code":"AuthenticationError","message":"the API key or AK/SK in the request is missing or invalid..."}}`** —— 证明该 endpoint 真实存在且可用 OpenAI 协议访问。

### 3.2 最小 curl 测试

```bash
curl -X POST "https://ark.cn-beijing.volces.com/api/v3/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "model": "doubao-seed-2.0-mini",
    "messages": [
      {"role": "user", "content": "用一句中文解释六级词汇 undertake 的意思，并给一个例句。"}
    ]
  }'
```

**预期返回**：HTTP 200，标准 OpenAI Chat Completions 结构（`choices[0].message.content` + `usage`）。
**常见错误**：Key 无效 → 401 `AuthenticationError`；模型未在控制台开通或模型名不对 → 4xx（错误信息里通常会提示 model 相关）；额度用尽且开了安心体验模式 → **429 `SetLimitExceeded`**，提示 "has reached the set inference limit... the model service has been paused"。

### 3.3 注意坑

- 免费额度是**一次性试用**，不是长期免费。做个人长期工具，它只能当兜底。
- 想保住"绝不扣费"，就开安心体验模式（但开了之后如果想买 TPM 保障包/模型单元，需要先关掉，关了就不能再开）。

---

## 4. 硅基流动 SiliconFlow —— 有长期免费模型，但需实名

### 4.1 核实到的事实

**注册 / 登录**
- 控制台：<https://cloud.siliconflow.cn/>（HTTP 200）
- 官方快速上手指南（<https://docs.siliconflow.cn/docs/userguide/quickstart>）写明：点击右上角「登录」，**目前支持短信登录、邮箱登录**

**API Key 创建页**
- <https://cloud.siliconflow.cn/account/ak>（HTTP 200）
- 官方文档原文：进入「API 密钥」页面，点击「新建 API 密钥」

**OpenAI 兼容 base_url**
```
https://api.siliconflow.cn/v1
```
（来源：官方快速上手文档示例 `base_url = "https://api.siliconflow.cn/v1"`）

**长期免费模型（来源：官方价格页 <https://siliconflow.cn/pricing>，2026-09-24 抓取的页面渲染结果）**

页面上价格列显示为 **"免费"** 的模型（共 17 行）：

| 模型 ID | 类型 |
|---|---|
| `XingChenAGI/Xing4.0-29B` | **对话模型**（29B） |
| `tencent/Hunyuan-MT-7B` | 翻译模型（对翻译题生成/评分有用） |
| `PaddlePaddle/PaddleOCR-VL-1.5` | 视觉理解 |
| `Kwai-Kolors/Kolors` | 文生图 |
| `BAAI/bge-m3`、`BAAI/bge-reranker-v2-m3`、`BAAI/bge-large-zh-v1.5`、`BAAI/bge-large-en-v1.5` | 向量 / 重排 |
| `XingChenAGI/XingChenGSR-V1.0`、`XingChenASR-V3.2-Ultra`、`XingChenASR-Diarize-V3.0`、`XingChenASR-V3.2`、`Qwen/Qwen3-ASR-1.7B`、`FunAudioLLM/SenseVoiceSmall` | 语音（识别/分离） |

**⚠️ 与旧说法不符的地方**：网上流传很广的"硅基流动 Qwen3-8B / GLM 小模型永久免费"，在我 2026-09-24 抓到的价格页上**看不到** —— Qwen 系列对话模型全部标价（`Qwen/Qwen3.5-27B` ¥0.60/¥4.80，`Qwen/Qwen3.5-35B-A3B` ¥0.40/¥3.20，`Qwen/Qwen3.8-27B` ¥3.00/¥12.00 等）。**旧教程已经过时。**
（保留意见：价格页有若干"展开更多 N 个模型"的折叠区未展开，**可能**还藏着未渲染的免费模型 —— 这一点我没能排除。）

**速率限制（官方文档「Rate Limits」<https://docs.siliconflow.cn/docs/userguide/faqs/rate-limit-and-upgradation>）**
- 指标：RPM / RPH / RPD / TPM / TPD / IPM / IPD，**账户级**（不是 API Key 级），**每个模型单独设置**。
- 官方给的量级：**语言模型（Chat）RPM = 1000–10000，TPM = 50,000–5,000,000**；向量模型 RPM 2000–10000；重排 RPM 2000；图像 IPM 2 / IPD 400。
- 关键一句：**「免费模型 Rate Limits 固定」**，收费模型才按"用量级别"分层。
- 具体每个模型的数值要在「模型广场」的模型详情页查。

**实名认证（这是最大的坑）**
- 官方 FAQ（<https://docs.siliconflow.cn/docs/userguide/faqs/authentication>）说明：不实名**不能充值、不能开发票**。
- 而 Rate Limits 文档里直接写：**「实名认证后使用全部的免费模型」** —— 也就是说**想用免费模型就得先实名**（个人实名：身份证 + 支付宝人脸识别；也支持港澳台证件、外国人永久居留证）。
- 结论：可以用，但比智谱多一道实名门槛。

**新用户赠送额度**：官方文档（快速上手、财务相关 FAQ）里**没有**提到任何新用户赠送余额/代金券。网上"注册送 14 元 / 2000 万 tokens"的说法我**未能核实**，请以注册后控制台首页实际显示为准。

### 4.2 最小 curl 测试

```bash
curl -X POST "https://api.siliconflow.cn/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "model": "XingChenAGI/Xing4.0-29B",
    "messages": [
      {"role": "user", "content": "用一句中文解释六级词汇 undertake 的意思，并给一个例句。"}
    ],
    "stream": false
  }'
```

**预期返回**：HTTP 200，标准 OpenAI Chat Completions 结构。
**常见错误**：Key 无效 → 我实测 `GET https://api.siliconflow.cn/v1/models` 无 Key 时返回 `{"code":30014,"data":null,"message":"Token is invalid."}`；未实名调用免费模型 → 会出现权限/实名相关错误；超限 → 429。

---

## 5. 阿里云百炼（通义千问）

### 5.1 核实到的事实

**控制台 / API Key**
- 百炼控制台：<https://bailian.console.aliyun.com/>（HTTP 200）
- API Key 页面（控制台内，北京地域）：<https://bailian.console.aliyun.com/?apiKey=1>（HTTP 200）
- 官方取 Key 文档：<https://help.aliyun.com/zh/model-studio/get-api-key>（HTTP 200）

**新人免费额度（官方文档 <https://help.aliyun.com/zh/model-studio/new-free-quota>，这是最权威的一手来源）**
- 首次开通阿里云百炼时**自动发放**，无需手动领取。
- **每个模型独立额度，通常为 100 万 tokens**；不同模型（含同一模型的不同快照版本）额度**互不共享、不能合并**。
- **有效期 90 天**，从"开通百炼 / 模型发布 / 模型申请通过"三者**较晚者**起算；过期作废，**不支持补发、延期、重置**。
- **仅华北 2（北京）地域的模型享有免费额度**，其他地域没有。
- 免费额度 = 输入 + 输出 tokens **共用**一个总量，不区分输入输出。
- 只抵扣**实时推理（调用）**；**不支持** Batch、模型调优、模型部署、PAI-DSW、OSS 等。
- 同一实名主体下重新注册账号，**无法再次领取**。
- 额度余量在控制台「免费额度」页 / 「模型广场」模型详情页 / 「模型用量」页查看，分钟级更新（需手动刷新）。

**实名认证（这条写得很清楚，对你有利）**
- 官方原文：**「无需实名认证即可获取和使用免费额度。如需在免费额度用完后按量付费继续使用，则需先完成实名认证。」**
- **未实名用户系统默认强制开启「免费额度用完即停」**，开关不可见也无法关闭；额度耗尽时返回 **HTTP 403，错误码 `AllocationQuota.FreeTierOnly`**，不会继续扣费。→ 对个人用户很安全。
- 已实名用户可以自行开关"用完即停"。

**模型与价格（官方 qwen-flash 模型页 <https://help.aliyun.com/zh/model-studio/qwen-flash>）**
- `qwen-flash`：Qwen3 系 Flash，**1M 上下文**（最大输入 997,952 / 最大输出 32,768），支持思考/非思考模式切换、Function Calling、结构化输出、上下文缓存。
- 华北 2（北京）价格（输入 ≤128k 档）：**输入 0.15 元 / 输出 1.5 元** 每百万 tokens，缓存命中 0.03 元；128k–256k 档 0.6 / 6；256k–1m 档 1.2 / 12。
- 华北 2（北京）限流：**RPM 30,000 / TPM 10,000,000**。
- ⚠️ 官方**没有**把 `qwen-flash` 标为 0 元模型 —— 它不在定价页的免费列表里，**免费靠的是新人 100 万 tokens 额度**。所以它是"90 天免费"而不是"长期免费"。

**OpenAI 兼容 base_url（官方文档 <https://help.aliyun.com/zh/model-studio/compatibility-of-openai-with-dashscope>）**
```
北京（新推荐）：https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/compatible-mode/v1
北京（旧域名，仍可用）：https://dashscope.aliyuncs.com/compatible-mode/v1
```
- `{WorkspaceId}` 是业务空间 ID，在百炼控制台「业务空间详情」页查看。官方建议迁移到新专属域名（性能与稳定性更好）。
- **⚠️ API Key 按地域绑定**：用北京地域的 Key 调新加坡 endpoint 会返回 **401 `invalid_api_key`（Incorrect API key provided）**，这不是 Key 失效，而是地域不匹配。

**额外发现：OAuth 免费额度**
官方免费额度页里还写了一条：**「OAuth 认证提供独立的免费额度（每天 2000 次调用），与百炼控制台的 API Key 免费额度体系相互独立」**，且这部分在控制台免费额度页**不显示**（要去「运维管理 > 模型监控」看）。
这是给 OAuth 登录类工具（如 CLI/IDE 插件）用的，**不是**标准的 API Key 调用路径。当彩蛋记一下，别指望它替代 API Key。

### 5.2 最小 curl 测试

```bash
# 北京地域（旧域名，最省事）
curl -X POST "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "model": "qwen-flash",
    "messages": [
      {"role": "user", "content": "用一句中文解释六级词汇 undertake 的意思，并给一个例句。"}
    ]
  }'
```

**预期返回**：HTTP 200，标准 OpenAI Chat Completions 结构（官方示例返回里有 `"model": "qwen-..."`、`choices[0].message.content`、`usage`）。
**常见错误**：地域不匹配 → 401 `invalid_api_key`；免费额度耗尽且未实名（用完即停强制开）→ **403 `AllocationQuota.FreeTierOnly`**；已实名但余额不足 → 400/403 欠费类错误。

---

## 6. DeepSeek —— 明确不免费，但便宜得可以忽略

### 6.1 事实

- **没有任何免费模型、没有白嫖额度**。官方定价页只讲按量付费，提到"充值余额或赠送余额"优先扣赠送余额，但**页面上没有承诺任何新用户赠送**。（如有活动以充值页/公告页为准 —— 我**未能核实**存在新用户赠送。）
- 平台入口：<https://platform.deepseek.com/>（HTTP 200）
- API Key 管理：<https://platform.deepseek.com/api_keys>（HTTP 200）
- 充值：<https://platform.deepseek.com/top_up>（HTTP 200）
- 用量：<https://platform.deepseek.com/usage>（HTTP 200）

**当前价格（来源：官方中文定价页 <https://api-docs.deepseek.com/zh-cn/quick_start/pricing>，2026-09-24 抓取）**

| 模型 | 百万 tokens 输入（缓存命中） | 输入（缓存未命中） | 输出 | 并发 |
|---|---|---|---|---|
| `deepseek-flash` | 空闲 **0.02 元** / 高峰 0.04 元 | 空闲 **1 元** / 高峰 2 元 | 空闲 **4 元** / 高峰 8 元 | 2500 |
| `deepseek-v4-pro` | 空闲 0.15 元 / 高峰 0.30 元 | 空闲 4.5 元 / 高峰 9.0 元 | 空闲 13.5 元 / 高峰 27.0 元 | 500 |

（美元口径同页给出：flash 空闲 输入 $0.15 / 输出 $0.6；pro 空闲 输入 $0.66 / 输出 $1.98。）

**夜间/空闲折扣（这是重点）**
- **空闲时段价格 = 高峰时段价格的一半**。
- **高峰时段 = 北京时间周一至周五 9:00–12:00、14:00–18:00（不含中国法定节假日）**；
- **其余时段全部是空闲时段**，包括周末全天和法定节假日全天。
- → 也就是说**晚上、早上 9 点前、中午 12–14 点、周末全天，全部半价**。你复习做题多半在晚上和周末，正好吃到半价。

**上下文 / 输出**：1M 上下文，最大输出 384K；支持思考模式（默认开）与非思考模式、JSON 输出、工具调用、图像理解（flash 支持，pro 不支持）。

**OpenAI 兼容 base_url**
```
https://api.deepseek.com          # 官方文档给的 base_url（OpenAI 格式）
https://api.deepseek.com/anthropic # Anthropic 格式
```

### 6.2 花多少钱？算给你看

按空闲时段 `deepseek-flash`（输入 1 元 / 输出 4 元 每百万 tokens）：

- 一次作文批改：约 1500 输入 + 800 输出 tokens
  → 1500 ÷ 1e6 × 1 + 800 ÷ 1e6 × 4 = 0.0015 + 0.0032 = **约 0.0047 元（不到半分钱）**
- 1000 次批改 ≈ **4.7 元**
- 一天做 1 篇阅读 + 1 篇生词 + 1 篇作文 + 听力素材（4 次调用，约 8000 tokens），一天 ≈ **2 分钱**，一个月 ≈ **0.6 元**

### 6.3 最小 curl 测试

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "model": "deepseek-flash",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "用一句中文解释六级词汇 undertake 的意思，并给一个例句。"}
    ],
    "stream": false
  }'
```

**预期返回**：HTTP 200，标准 OpenAI 结构（官方示例脚本即此形式）。
**注意**：`deepseek-flash` 默认**开启思考模式**，会额外产生（计费的）推理 tokens；如果你的用途只是出题讲解，可以在请求体里加 `"thinking": {"type": "disabled"}` 省 token（参数名以官方「思考模式」文档为准）。旧模型名 `deepseek-v4-flash`、`deepseek-v4-flash-vision-exp` **仍可调用但对应模型已下线**，请求会被转到 `DeepSeek-V4.1-Flash` 并按 flash 价格计费 —— 别再用旧名。

---

## 7. 备选平台（长期免费 + 国内直连）

### 7.1 硅基流动的免费模型（已在上文第 4 节详述）
`XingChenAGI/Xing4.0-29B` 是目前我核实到的、**唯一一个长期免费且有真实对话能力的国内直连模型**。代价是必须实名认证。

### 7.2 智谱的其他免费模型（上文第 2 节）
`glm-4-flash-250414`（128K）、`glm-z1-flash` 可以作为 `glm-4.7-flash` 的同类冗余（同一平台不同模型，额度独立计算，属于"同平台多模型备份"而不是"跨平台备份"）。

### 7.3 讯飞星火（Spark Lite）—— **长期免费**，可直连 ✅省事的第三通道

这是本次调研里比较值得记的一条：**讯飞星火 Lite 是"实名后不限量"的免费选项**（但模型很小，见下面的限制）。

**我亲自核实过的（抓官方 HTTP 调用文档原文 + 实测端点）**
- 官方文档：<https://www.xfyun.cn/doc/spark/HTTP%E8%B0%83%E7%94%A8%E6%96%87%E6%A1%A3.html>（HTTP 200）
- **OpenAI 兼容 base_url**：`https://spark-api-open.xf-yun.com/v1/`（文档原文：「兼容 openAI SDK：base_url 需要配置为 https://spark-api-open.xf-yun.com/v1/」）
- **模型 ID 一览**（文档原文的 `model` 取值范围）：`4.0Ultra`（Ultra）/ `generalv3.5`（Max）/ `max-32k` / `generalv3`（Pro）/ `pro-128k` / **`lite`（Lite）**
- **端点实测**：伪造 Key `POST https://spark-api-open.xf-yun.com/v1/chat/completions` 返回 **401 + `{"message":"HMAC signature cannot be verified: apikey not found"}`** —— 端点真实存在、协议是 OpenAI 风格（注意它的鉴权报错措辞是 HMAC，请用控制台拿到的 APIPassword 作为 Bearer token）
- 文档里明确提到「如有并发提升(**含免费模型**)、一对一报价等需求…」以及「点击前往产品页面领取免费额度」→ 官方口径里确实存在"免费模型"

**由我派出的子代理核实（我未逐条复看原文，标注为待确认）**
- 决定性证据：讯飞控制台自己的前端代码里含字符串 **「您还未进行实名认证，前往实名认证即可获取 Spark Lite 的不限量使用资格」** → 即 **Lite 是"实名认证后不限量免费"**。
- 官方 API 文档也写明 Lite「轻量级大语言模型，具有更高的响应速度，**支持免费使用**」。
- ⚠️ **关键限制：Lite 的最大输入只有 8K、最大输出只有 4K**（官方文档模型对比表原文）。对你的用途来说：**作文批改（~1500 输入 / 800 输出）够用；但"整篇双语文章 + 挑 12 个生词的详细中文讲解"可能顶到 8K 输入上限**，写得长一点就会被截断 —— 这也是我不把它当主力的原因。
- 官方**没有**任何页面承诺 Lite「永久免费」，只承诺"免费使用"（对比：Max 版本明确标了"26 年 3 月 10 日下线"，Lite 没标日期）。
- **未能核实**：Lite 的具体 QPS / 并发上限，官方没有公开（旧产品页 <https://www.xfyun.cn/services/cbm> 直接返回 **500**，属平台自身故障）。官方只说"如有并发提升(**含免费模型**)…请联系"，反证免费模型并发确实受限。
- 未实名用户会被"限制能力调用次数以及其他权益"（控制台文案），所以**不用实名也能试，但想要"不限量"就得实名**。

- **注册**：<https://passport.xfyun.cn/register>（HTTP 200）；产品/价格页 <https://xinghuo.xfyun.cn/sparkapi>（HTTP 200，但是纯 JS 单页，curl 抓不到正文）
- **APIPassword 获取页（按模型版本分开，别拿错）**：
  - **Spark Lite（免费那个）：<https://console.xfyun.cn/services/cbm>**（HTTP 200）
  - Pro：<https://console.xfyun.cn/services/bm3> ｜ Max：<https://console.xfyun.cn/services/bm35> ｜ X2/X1.5：<https://console.xfyun.cn/services/bmx1>
  - 控制台首页 / 我的应用：<https://console.xfyun.cn/app/myapp>（HTTP 200）

**最小 curl 测试**

```bash
curl -X POST "https://spark-api-open.xf-yun.com/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "model": "lite",
    "messages": [
      {"role": "user", "content": "用一句中文解释六级词汇 undertake 的意思，并给一个例句。"}
    ],
    "stream": false
  }'
```

> ⚠️ 讯飞的鉴权报错措辞是 HMAC 风格（`HMAC signature cannot be verified`），所以 `Authorization: Bearer <API_PASSWORD>` 里的值要填**控制台那个模型对应的 APIPassword**（官方文档原文：「不同版本模型对应的默认 APIPassword 不同」）。**预期返回**：HTTP 200，标准 OpenAI Chat Completions 结构；Key 不对 → 401 + `{"message":"...apikey not found"}`（我实测过这个 401）。

**判断**：如果你愿意做一次实名认证，讯飞星火 Lite 比硅基流动更适合当备份 —— 因为它是**"不限量"而不是"额度用完就停"**。但我**没有实测它的输出质量**（中文讲解、出题、作文批改能不能达到可用水平，需要你自己跑几次试试）。

### 7.4 魔搭社区 ModelScope API-Inference —— 长期免费，**而且是 OpenAI 兼容**（模型池最强，但要绑阿里云 + 实名）

这一节我最初判断错了，后来**亲手验证后改过来了**：魔搭的 API-Inference **就是标准 OpenAI 兼容接口**，不是"要另写适配层"的自有协议。

**我亲自核实过的（curl 实测）**
- **OpenAI 兼容 base_url**：`https://api-inference.modelscope.cn/v1/`
- 我实测 `GET https://api-inference.modelscope.cn/v1/models`（**不带任何 Key**）→ **HTTP 200，返回 35 个模型**
- 我实测 `POST https://api-inference.modelscope.cn/v1/chat/completions`（伪造 Key）→ **HTTP 401 + `{"error":{"message":"Authentication failed, please make sure that a valid ModelScope token is supplied."}}`** → 端点存在、走标准 Bearer 鉴权
- 当时返回的 35 个可用模型里，**跟你这个项目直接相关的有**：
  - `ZhipuAI/GLM-4.7-Flash` ← **和智谱官方那个免费模型是同一个**，等于换个入口白嫖
  - `deepseek-ai/DeepSeek-V4-Pro`、`deepseek-ai/DeepSeek-V4.1-Flash`、`deepseek-ai/DeepSeek-V4-Flash-0731`
  - `Qwen/Qwen3.5-397B-A17B`、`Qwen/Qwen3.5-35B-A3B`、`Qwen/Qwen3.8-Flash-Next`、`Qwen/Qwen3.5-27B`
  - `ZhipuAI/GLM-5.2`、`MiniMax/MiniMax-M3`、`stepfun-ai/Step-3.7-Flash`、`meituan-longcat/LongCat-Flash-Lite`
  - （也就是说：**这里是本次调研里唯一能免费用到 DeepSeek-V4-Pro / Qwen3.5-397B / GLM-5.2 级别模型的地方**）
- Access Token 页面：<https://modelscope.cn/my/myaccesstoken>（HTTP 200）
- 注册：<https://modelscope.cn/register>（HTTP 200）

**由子代理核实（我未复看原文，但结论方向可信）**
- 官方文档：<https://www.modelscope.cn/docs/model-service/API-Inference/intro>（HTTP 200，但**是纯 JS 单页应用，curl 抓不到正文**；子代理是从官方文档的 Markdown 源站拿到全文的）
- 额度机制是 **「魔粒」**：**登录 200 魔粒/日 + 绑定阿里云 50 魔粒/日 = 250 魔粒/日**，24 小时刷新；API-Inference 按 **轻量 0.5 / 主流 1 / 旗舰 2 魔粒每次**扣减 → 换算约 **500 / 250 / 125 次每天**（这是**按档位换算的推算区间，不是官方承诺值**）
- 硬性前提（三项缺一不可）：**绑定阿里云账号 → 阿里云账号通过实名认证 → 验证个人邮箱**
- ⚠️ **网上广泛流传的"魔搭每天 2000 次免费调用"在当前官方文档里找不到任何依据** —— 别按那个做容量规划
- **未能核实**：魔粒三档（0.5/1/2）与具体模型的对应关系，官方没给列表；并发上限官方只说"动态调整"

**最小 curl 测试**

```bash
curl -X POST "https://api-inference.modelscope.cn/v1/chat/completions" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "ZhipuAI/GLM-4.7-Flash",
    "messages": [
      {"role": "user", "content": "用一句中文解释六级词汇 undertake 的意思，并给一个例句。"}
    ],
    "stream": false
  }'
```

**预期返回**：HTTP 200，标准 OpenAI Chat Completions 结构。Key 不对 → **401** + `Authentication failed, please make sure that a valid ModelScope token is supplied.`（我实测过这个 401）。
`$API_KEY` 填 ModelScope 的 **Access Token**（不是阿里云 AK/SK）。

**判断**：**如果你愿意做一次实名认证（阿里云个人实名即可，不需要企业资质），魔搭比讯飞 Lite 更适合当备份** —— 模型池强得多（GLM-4.7-Flash / DeepSeek-V4 / Qwen3.5 都能用），接口是标准 OpenAI 兼容，额度每天刷新。代价是多两步：绑阿里云 + 阿里云实名 + 验邮箱。

### 7.5 百度千帆 —— **已不免费**（除一次性新用户额度）

**由子代理核实（我未复看原文）**
- 官方迁移公告页（2026-09-22 更新）里 **`ERNIE-Speed-8K`、`ERNIE-Speed-128K`、`ERNIE-Lite-8K` 全部标记为「已下线」**；该页有 43 处「已下线」、5 处「未下线」，而后者全是 embedding / reranker 类。
- 当前免费形式只剩**一次性新用户额度**：17 个模型各 100 万 tokens，**有效期 3 个月**，且 **ERNIE-Speed / Lite 不在其中**。
- **未能定论**：ERNIE-Speed 是"彻底停服"还是"仅 V1 调用路径停用"，公告页表述自相矛盾（公告说"下线的是 V1 版本调用接口，并不意味着所有相关模型服务均下线"，但迁移清单又把它标成"已下线"，且它已从当前模型列表和价格表中消失）。
- 接入信息（如果你还是想用）：**注册** <https://cloud.baidu.com/> ｜ **控制台** <https://console.bce.baidu.com/qianfan/> ｜ **API Key** <https://console.bce.baidu.com/iam/#/iam/apikey/list>（官方文档称 API Key "永久有效"）｜ **OpenAI 兼容 base_url** `https://qianfan.baidubce.com/v2/chat/completions`（官方原文"V2 接口兼容 OpenAI 接口协议"）｜ **鉴权** `Authorization: Bearer bce-v3/ALTAK-****/****`（**不是 sk- 形式**）
- 我实测伪造 Key 请求 `POST https://qianfan.baidubce.com/v2/chat/completions` → **401**（端点存在）
- 当前按量付费参考价（ERNIE-4.5-Turbo-32K）：**输入 0.8 元 / 输出 3.2 元 每百万 tokens**（官方计费页 0.0008 / 0.0032 元每千 tokens）

**判断**：网上大量"千帆 ERNIE-Speed 永久免费"的教程已经**失效**。不建议选它。

### 7.6 本节事实的来源与可信度说明

- 7.1 / 7.2 来自我自己抓取的官方页面（智谱定价页、硅基流动价格页与 Rate Limits 文档）。
- 7.3 的 base_url、模型 ID、端点存在性**是我亲自核实**的；"Lite 不限量"和"Lite 输入 8K / 输出 4K"来自子代理的一手抓取，**我未复看原文**，请你在实名页面/官方文档自行确认。
- 7.4 里 **base_url、OpenAI 兼容性、端点 401、35 个模型清单是我自己 curl 实测的**；「魔粒」的具体数字（200/日、50/日、0.5/1/2 每次）来自子代理抓取的官方文档 Markdown 源站原文，**我未复看**，且"125–500 次/天"是**换算推算值**。
- 7.5 的具体数字来自子代理的一手抓取，我**没有**复看原文；但因为它的结论是"不要选这个平台"，即使数值有偏差也不影响决策。
- 总结：**凡是影响你决策的关键接入参数（base_url / 模型 ID / 端点是否存在）我都亲手 curl 过**；只有"额度规则的具体数字"这类需要登录才能确认的东西，依赖了子代理的抓取。


---

## 8. 推荐排序

### 如果只注册 1 个平台 → **智谱 AI（GLM）**

理由（按重要性排序）：
1. **真的长期免费**：官方定价页白纸黑字把 `glm-4.7-flash` 的输入/输出单价写成"免费"，不是"试用额度"、不是"限时"。
2. **能力对得上**：200K 上下文 + 128K 输出，双语文章 + 生词 + 出题 + 作文批改一个模型全包；官方明确支持 JSON 结构化输出和 Function Calling。
3. **门槛最低**：官方 FAQ 明确"调用 API 并不强制要求实名认证" —— 不用刷脸、不用上传身份证、不要企业资质，注册完拿 Key 就能跑。这点在四家国内大厂里是独一份。
4. **接入最省事**：`base_url` 就是 `https://open.bigmodel.cn/api/paas/v4/`，OpenAI SDK 改两行即可。
5. **注意：智谱的 TTS/ASR 是收费的**。我核实过官方定价页的「语音模型」表：`GLM-TTS` 2 元/万字符、`GLM-TTS-Clone` 6 元/次、`GLM-ASR-2512` 输入 16 元/百万 tokens（输出不计费）、`GLM-4-Voice` 80 元/百万 tokens —— **一个都不免费**。所以"生成一段短英文听力素材"这一步请理解为**生成文本材料**（免费），如果你真的要合成音频，那一步是要花钱的。

### 如果注册 2 个 → 分两种情况

**情况 A：你愿意做一次实名认证 → 智谱 AI + 魔搭 ModelScope（我认为这是最优组合）**

| | 智谱 GLM（主力） | 魔搭 ModelScope（备份） |
|---|---|---|
| 免费性质 | 官方定价页标"免费"的模型 | 长期免费，每天按「魔粒」刷新（约 125–500 次/天） |
| base_url | `https://open.bigmodel.cn/api/paas/v4/` | `https://api-inference.modelscope.cn/v1/` |
| 模型 ID | `glm-4.7-flash`（200K/128K） | `ZhipuAI/GLM-4.7-Flash`（同一个模型！）或 `Qwen/Qwen3.5-35B-A3B` |
| 需实名 | 否 | **是**（绑阿里云 + 阿里云个人实名 + 验邮箱） |
| 优势 | 无门槛、不需要实名 | **模型池强得多**：DeepSeek-V4-Pro、Qwen3.5-397B、GLM-5.2、MiniMax-M3 都能免费调 |

理由：
- 两个都是**标准 OpenAI 兼容**（我用 `/v1/models` 和 `/v1/chat/completions` 实测过魔搭的接口），主备切换只改 `base_url` / `model`。
- **风险不重叠**：智谱的风险是"免费模型转付费/下线"；魔搭的风险是"魔粒规则调整/每天要记得登录领额度"。两边的失效原因互不相关。
- 魔搭里直接有 `ZhipuAI/GLM-4.7-Flash` —— **等于给你主力模型准备了一个不同厂商的镜像入口**，智谱那边真出事时你先切它，连 prompt 都不用改。
- 只有"想要长期免费额度"才需要实名；智谱那边完全不需要，所以即使你暂时不想实名，主力也不会断。

**情况 A'：只想要"最省事的第二通道"（不想绑阿里云）→ 智谱 AI + 讯飞星火 Lite**

- 讯飞星火 Lite：`base_url = https://spark-api-open.xf-yun.com/v1/`，模型 ID `lite`，实名后"不限量"。
- 比魔搭省事（不用绑阿里云），但**模型小得多：输入只有 8K、输出只有 4K**，长文章生词讲解会被截断；具体 QPS 官方未公开，输出质量我也没实测。
- 适合当"极端兜底"（主力和魔搭都挂了的时候用），不适合作主力。

**情况 B：你完全不想实名 / 不想上传身份证 → 智谱 AI + 火山方舟（豆包）**

- **风险类型互补**：智谱的风险是"免费模型哪天转收费/下线"（有先例：`glm-4.5-flash` 已于 2026-01-30 下线），方舟的风险是"50 万 tokens 用完就没了"。一个赌长期、一个赌额度，不会同时失效。
- **都是纯 OpenAI 兼容 + 同样的 `/chat/completions`**：`base_url` / `model` 做成环境变量，主备切换就是改两行。
- **都不需要实名**（方舟是"额度用完后想继续用"才需要实名，而那时你有智谱兜底）。

**不推荐把硅基流动放在第 2 位**：需要实名 + 免费模型里只有 `Xing4.0-29B` 一个能用，作为"备份"在关键时刻（比如智谱免费模型改政策）大概率顶不住你的 4 个用途（尤其是长文章生词讲解和作文批改的质量）。魔搭（同样要实名）给的模型池比它强一个量级。

### 推荐排序（一句话版）

1. **智谱 `glm-4.7-flash`** —— 主力，唯一"长期免费 + 免实名 + OpenAI 兼容 + 大上下文"全中。
2. **魔搭 ModelScope**（愿实名）／**火山方舟**（不愿实名）—— 二选一当备份。
3. **讯飞星火 Lite** —— 第三通道，够省事但模型小。
4. **DeepSeek `deepseek-flash`** —— 花几块钱买质量，晚上/周末半价。
5. 百炼（90 天新人额度）、硅基流动（实名后才有免费模型）—— 有就用，不必专门为它折腾。
6. **百度千帆** —— 别选了，免费模型已下线。

### 如果允许花几块钱 → 加一个 **DeepSeek `deepseek-flash`**
- 定位：**质量兜底**。当免费模型出的题质量不满意、或批改不细致时切到它；空闲时段（晚上/周末）输入 1 元、输出 4 元每百万 tokens，一个月一两块钱。
- 好处：1M 上下文 + 384K 输出 + 并发 2500，完全不用担心速率限制。

---

## 9. 核实状态：哪些是我核实过的，哪些没核实

### ✅ 我亲自核实过的（抓取官方文档/定价页原文，或用 curl 实测 HTTP 状态）

| 结论 | 证据来源 |
|---|---|
| 智谱 `glm-4.7-flash` / `glm-4-flash-250414` / `glm-z1-flash` / `glm-4.6v-flash` 等标价"免费" | 官方定价页 pricing（表格"免费"字样） |
| 智谱 `GLM-5.3-Flash` 已转付费（0.8 / 2.8 元） | 官方定价页旗舰模型表 |
| 智谱 `glm-4.5-flash` 于 2026-01-30 下线并路由到 `glm-4.7-flash` | 官方 GLM-4.5-Flash 文档页 Info 提示 |
| 智谱 base_url = `https://open.bigmodel.cn/api/paas/v4/` | 官方「OpenAI API 兼容」文档示例 |
| 智谱"调用 API 不强制实名认证" | 官方 FAQ「实名认证」页原文 |
| 智谱速率限制 = 并发数、按权益等级 V1/V2/V3、错误码 1302/1305 | 官方「速率限制」文档 |
| 智谱 API Key 页 = `bigmodel.cn/usercenter/proj-mgmt/apikeys` | 官方快速开始文档链接 |
| 方舟免费额度"不同模型分别计算、主账号共享、不抵扣 Batch/插件/知识库" | 官方「免费推理额度」文档 |
| 方舟免费额度量级 = **每个模型 50 万 tokens** | 官方「安心体验模式细则说明」反复写"50w token" |
| 方舟 base_url = `https://ark.cn-beijing.volces.com/api/v3` | 官方文档示例 + 我实测 401 `AuthenticationError` |
| 方舟 doubao 各模型单价 | 官方「模型价格」文档 |
| 硅基流动 base_url = `https://api.siliconflow.cn/v1` | 官方快速上手文档 |
| 硅基流动免费模型 17 个（`Xing4.0-29B`、`Hunyuan-MT-7B`、bge、ASR 等） | 官方价格页渲染结果（含"免费"徽标） |
| 硅基流动"实名认证后使用全部的免费模型"、免费模型限速固定 | 官方「Rate Limits」文档原文 |
| 硅基流动 Chat 模型 RPM 1000–10000 / TPM 50,000–5,000,000 | 官方「Rate Limits」文档表格 |
| 百炼新人免费额度：每模型通常 100 万 tokens、90 天、仅北京地域、不可补发 | 官方「新人免费额度」文档 |
| 百炼"无需实名认证即可获取和使用免费额度"、未实名强制用完即停、403 `AllocationQuota.FreeTierOnly` | 官方「新人免费额度」文档 |
| 百炼 base_url（北京新域名 / 旧 dashscope 域名）、API Key 按地域绑定 | 官方「OpenAI 兼容」文档 |
| 百炼 `qwen-flash` 1M 上下文、北京价格 0.15/1.5 元、北京限流 RPM 30000 / TPM 10,000,000 | 官方 qwen-flash 模型页 |
| 百炼 OAuth 独立免费额度 = 每天 2000 次调用 | 官方「新人免费额度」文档 FAQ |
| DeepSeek 无免费模型、`deepseek-flash` 空闲 1 元输入 / 4 元输出、高峰时段定义、并发 2500 | 官方中文定价页 + 官方「限速与隔离」文档 |
| DeepSeek base_url = `https://api.deepseek.com` | 官方「首次调用 API」文档 |
| 各平台 URL 均返回 HTTP 200（除标注） | 我用 `curl -o /dev/null -w "%{http_code}"` 逐个实测 |
| 讯飞星火 OpenAI 兼容 base_url = `https://spark-api-open.xf-yun.com/v1/`，模型 ID 含 `lite` | 官方 HTTP 调用文档原文 + 我实测端点返回 401「apikey not found」 |
| 智谱语音模型（GLM-TTS 2 元/万字符、GLM-ASR-2512 16 元/百万 tokens、GLM-4-Voice 80 元/百万 tokens）**不免费** | 官方定价页「语音模型」表 |
| 魔搭 API-Inference **是 OpenAI 兼容**，base_url = `https://api-inference.modelscope.cn/v1/` | 我实测 `GET /v1/models` 返回 **200 + 35 个模型**；`POST /v1/chat/completions` 伪造 Key 返回 **401 `Authentication failed... valid ModelScope token`** |
| 魔搭免费池里**有 `ZhipuAI/GLM-4.7-Flash`**，另有 `deepseek-ai/DeepSeek-V4-Pro`、`Qwen/Qwen3.5-397B-A17B`、`ZhipuAI/GLM-5.2`、`MiniMax/MiniMax-M3`、`stepfun-ai/Step-3.7-Flash` 等 | 我实测 `/v1/models` 返回的 35 个模型 ID 列表 |
| 讯飞 Spark Lite 最大输入 **8K** / 最大输出 **4K** | 官方 HTTP 调用文档的模型对比表原文 |
| 百度千帆 V2 OpenAI 兼容端点 = `https://qianfan.baidubce.com/v2/chat/completions`，鉴权用 `Bearer bce-v3/...` | 官方 API 文档原文 + 我实测伪造 Key 返回 401 |

### 🟡 由我派出的子代理一手核实，但我**没有逐条复看原文**（可信度较高，精确数值请你自己确认）

| 结论 | 说明 |
|---|---|
| 讯飞星火 **Spark Lite 实名后不限量** | 证据来自讯飞控制台前端代码字符串「…即可获取 Spark Lite 的不限量使用资格」 |
| 魔搭 ModelScope 采用「**魔粒**」制（登录 200/日 + 绑阿里云 50/日） | 来自官方文档 Markdown 源站原文；"约 125–500 次/天"是按档位换算的**推算值** |
| 魔搭使用前提：**绑定阿里云 + 阿里云实名 + 验证邮箱** | 同上官方文档原文 |
| 魔搭"每天 2000 次免费调用"**在官方文档中无依据** | 该说法来自博客/二手汇总 |
| 百度千帆 `ERNIE-Speed-8K/128K`、`ERNIE-Lite-8K` **已下线** | 来自官方迁移公告页（43 处「已下线」） |
| 千帆当前免费形式 = 一次性新用户额度（17 个模型各 100 万 tokens，3 个月） | 同上；ERNIE-Speed/Lite 不在其中 |

### ⚠️ 网上有说法但我**没能核实**（不要当事实用）

1. **智谱新用户赠送"2000 万 tokens / 3 亿 token 代金券"** —— 出现在多个博客和论坛。官方定价页、模型概览、快速开始文档里**都没有**这个承诺。我查到的官方入口是「体验中心/特惠」（<https://open.bigmodel.cn/console/trialcenter>、<https://bigmodel.cn/trialcenter/modeltrial>，均 200 可达），**具体送多少必须登录后自己看**。好消息：用 `glm-4.7-flash` 根本不需要券。
2. **智谱免费模型的具体并发数** —— 官方只给了"按权益等级 V1/V2/V3 分档"的框架，**没有公开固定数字**。登录 <https://bigmodel.cn/usercenter/proj-mgmt/rate-limits> 自查。
3. **硅基流动新用户赠送额度（如"14 元 / 2000 万 tokens"）** —— 官方快速上手与财务 FAQ 均未提及，**未能核实**。
4. **火山方舟"每个模型 500 万 tokens"** —— 这是早年的说法，当前官方文档（2026-08 更新）写的是 **50w token**。以控制台「开通管理」页显示为准。
5. **"硅基流动 Qwen3-8B / GLM 免费版长期免费"** —— 在当前价格页上**不成立**（Qwen 系列全部标价）。另外硅基流动价格页有若干"展开更多"折叠区未展开，**不能 100% 排除**还有未渲染的免费模型，但至少不能拿旧说法当依据。
6. **DeepSeek 是否有新用户赠送余额** —— 定价页提到"充值余额或赠送余额"，但**没有**承诺新用户会获得赠送。**未能核实**。
7. **智谱 `glm-tts` / `glm-asr` 是否免费** —— 已核实：**不免费**（GLM-TTS 2 元/万字符、GLM-ASR-2512 输入 16 元/百万 tokens）。所以这条不再是"未核实"，而是"已确认为收费"。
8. **硅基流动 `Xing4.0-29B` 的上下文长度与限速具体数值** —— 价格页只给了价格徽标，具体参数要去「模型广场」模型详情页看（JS 渲染，我抓不到）。**未能核实**。
9. **火山方舟"每个模型恰好 50 万 tokens"** —— 我核实到的是一手文档里的"50w token"这一表述（文档语境是该平台赠送额度的通用值），但**每个模型各自的实际赠送额是否都精确等于 50 万，我没有逐模型核实**（要登录控制台「开通管理」页看）。
10. **讯飞星火 Lite "实名后不限量"** —— 这条证据是子代理在讯飞控制台前端代码里找到的字符串（「您还未进行实名认证，前往实名认证即可获取 Spark Lite 的不限量使用资格」），**我本人没有复看那段代码**。请在讯飞的实名认证页面自行确认。另外 **Lite 的具体 QPS / 并发上限官方未公开**（旧的 Spark 产品页直接返回 500），且它的**中文讲解/出题质量我没有实测**。
11. **讯飞星火的"免费额度"口径** —— 官方 HTTP 调用文档只写「前往产品页面领取免费额度」，没有把"Lite 永久免费"写成正式条款。**"不限量"是控制台文案，不是合同条款**，存在未来调整的可能。
12. **魔搭 ModelScope 的「魔粒」制度** —— 全部数字（登录 200/日、绑阿里云 +50/日、每次调用扣 0.5/1/2 魔粒、约 125–500 次/天）**来自子代理抓取的官方文档原文，我未复看**。其中"125–500 次/天"是**按档位换算的推算区间**，不是官方承诺值；**魔粒档位与具体模型的对应关系官方没有给列表**。网上流传的"每天 2000 次"在官方文档里**找不到依据**。
13. **百度千帆 ERNIE-Speed 的下线范围** —— 子代理核实到官方迁移公告把 `ERNIE-Speed-8K`、`ERNIE-Speed-128K`、`ERNIE-Lite-8K` 标为「已下线」，但**是"彻底停服"还是"仅 V1 调用路径停用"，公告表述自相矛盾，未能定论**。
14. **`glm-4-flash`（无后缀）是否还能调用** —— 我核实到的是"它不在官方模型概览/定价页的列表里"，**但这不等于该模型名一定返回错误**（平台可能仍保留旧名路由）。建议直接用 `glm-4.7-flash`，不要用无后缀名。

### 🔒 我没有做的事
- **没有发起任何需要 API Key 的真实推理请求**（我没有 Key）。所有请求示例都只是可复制的模板，并附上了"预期返回"。
- 所有 URL 都只做了可达性检查（`curl -sS -o /dev/null -w "%{http_code}"`），**没有**登录、注册或提交任何表单。

---

## 10. 避坑清单（给你这个项目的具体建议）

1. **把 `base_url` / `model` / `api_key` 全部放进 `.env`**，代码里只读环境变量。主备切换 = 改一行 `.env`，不用改代码。
2. **别用旧模型名**：智谱用 `glm-4.7-flash`（不是 `glm-4.5-flash`），DeepSeek 用 `deepseek-flash`（不是 `deepseek-v4-flash`）。
3. **方舟开"安心体验模式"**：防止 50 万 tokens 用完后静默扣费（注意关了就不能再开）。
4. **百炼未实名时"用完即停"是强制开的**，这是保护你，别急着去实名（实名后才能关掉它，反而有欠费风险）。
5. **请求要串行 + 指数退避重试**，别并发压免费额度。智谱错误码 `1302`（限速）和 `1305`（平台过载）都靠重试解决；方舟超限是 `429 SetLimitExceeded`。
6. **生词讲解 / 出题用 JSON 结构化输出**（智谱官方文档支持 `structured output`），前端直接解析，比正则稳。
7. **长文章别用 128K 上下文模型**：`glm-4-flash-250414` 的输出上限只有 16K，出 10 道题的讲解可能会被截断，用 `glm-4.7-flash`（200K / 输出 128K）。
8. **保留一个"付费兜底"开关**：DeepSeek 空闲时段价格极低（晚上和周末半价），出题质量不满意时手动切过去，一个月成本个位数。
9. **免费政策会变**：智谱 `glm-4.5-flash` 就是先例（免费模型下线、请求路由到新模型）。所以代码里**别硬编码 "这个模型一定免费"**的假设，做好切模型的准备。
10. **接讯飞 Lite 时注意 APIPassword 是按模型版本区分的**：官方文档原文「不同版本模型对应的默认 APIPassword 不同」——别拿 Pro 的密码去调 `lite`。另外它的报错措辞是 HMAC 风格，看到 `HMAC signature cannot be verified` 别以为是 base_url 写错了，先检查 Key 对不对。
11. **别照抄网上"永久免费清单"**：这次调研至少推翻了两条广为流传的说法 —— 硅基流动的 "Qwen3-8B 永久免费"（当前价格页已全部标价）、魔搭的 "每天 2000 次"（官方文档无此依据）；另外千帆 ERNIE-Speed/Lite 已下线。**注册前先看官方定价页/公告页那一眼，能省很多时间。**

---

## 11. 直接填进这个项目的 `.env`

仓库里 `.env` 已经预留了 4 个变量：`LLM_PROVIDER` / `LLM_API_KEY` / `LLM_BASE_URL` / `LLM_MODEL`。按本文档核实的结果，直接这样填（**只填一份，另一份注释掉备用**）：

```bash
# —— 主：智谱 GLM（长期免费，不需要实名）——
LLM_PROVIDER=zhipu
LLM_API_KEY=你的智谱Key
LLM_BASE_URL=https://open.bigmodel.cn/api/paas/v4/
LLM_MODEL=glm-4.7-flash

# —— 备 A：魔搭 ModelScope（长期免费，模型池最强；需绑阿里云+实名+验邮箱）——
# LLM_PROVIDER=modelscope
# LLM_API_KEY=你的ModelScope Access Token
# LLM_BASE_URL=https://api-inference.modelscope.cn/v1/
# LLM_MODEL=ZhipuAI/GLM-4.7-Flash
# （想换更强的：Qwen/Qwen3.5-35B-A3B、deepseek-ai/DeepSeek-V4-Pro、ZhipuAI/GLM-5.2）

# —— 备 B：讯飞星火 Spark Lite（实名后不限量，最省事，但输入 8K/输出 4K）——
# LLM_PROVIDER=spark
# LLM_API_KEY=你的APIPassword
# LLM_BASE_URL=https://spark-api-open.xf-yun.com/v1/
# LLM_MODEL=lite

# —— 备 C：火山方舟豆包（50 万 tokens 试用额度，不需要实名）——
# LLM_PROVIDER=ark
# LLM_API_KEY=你的方舟Key
# LLM_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
# LLM_MODEL=doubao-seed-2.0-mini

# —— 备：硅基流动（需实名认证才能用免费模型）——
# LLM_PROVIDER=siliconflow
# LLM_API_KEY=你的硅基流动Key
# LLM_BASE_URL=https://api.siliconflow.cn/v1
# LLM_MODEL=XingChenAGI/Xing4.0-29B

# —— 备：阿里云百炼（新人 100 万 tokens × 每模型，90 天）——
# LLM_PROVIDER=dashscope
# LLM_API_KEY=你的百炼Key
# LLM_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
# LLM_MODEL=qwen-flash

# —— 质量兜底：DeepSeek（付费，空闲时段极便宜）——
# LLM_PROVIDER=deepseek
# LLM_API_KEY=你的DeepSeek Key
# LLM_BASE_URL=https://api.deepseek.com
# LLM_MODEL=deepseek-flash
```

### ⚠️ `CET6-改造方案.md` 里的两个模型名已经过时，需要一起改

| 旧写法（改造方案里） | 现状（2026-09-24 核实） | 改成 |
|---|---|---|
| 第 46 行「智谱 GLM-4-Flash（官方标称免费）」 | `glm-4-flash` 作为无后缀模型名**已不在官方模型概览列表**里；对应可用的是 `glm-4-flash-250414`（128K/输出 16K）或更好的 `glm-4.7-flash` | 写 `glm-4.7-flash` |
| 第 47 行「DeepSeek `deepseek-chat`」 | `deepseek-chat` **已不在官方定价页**；当前模型是 `deepseek-flash` 与 `deepseek-v4-pro` | 写 `deepseek-flash` |
| 第 184 行数据里的 `generatedBy // llm:glm-4-flash \| local` 枚举值 | 同上 | 建议改 `llm:glm-4.7-flash`（或干脆存 `llm:<provider>:<model>` 便于换模型后区分历史数据） |

（这三处我是在本项目文件里直接读到的原文字，属于"旧教程/旧方案滞后于官方"的典型例子，改掉可以避免你后面调试时对着一个不存在的模型名查半天。）

---

## 附录：本文档核实过的全部 URL 及其 HTTP 状态（2026-09-24 实测）

```
200  https://open.bigmodel.cn/
200  https://bigmodel.cn/usercenter/proj-mgmt/apikeys
200  https://bigmodel.cn/usercenter/proj-mgmt/rate-limits
200  https://bigmodel.cn/trialcenter/modeltrial
200  https://open.bigmodel.cn/console/trialcenter
200  https://open.bigmodel.cn/usercenter/auth
200  https://docs.bigmodel.cn/cn/guide/start/pricing
200  https://docs.bigmodel.cn/cn/guide/models/free/glm-4.7-flash
200  https://docs.bigmodel.cn/cn/api/rate-limit
401  https://open.bigmodel.cn/api/paas/v4/chat/completions   (无 Key 请求，预期 401)
200  https://www.volcengine.com/
200  https://console.volcengine.com/ark
200  https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey
200  https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement
200  https://www.volcengine.com/docs/82379/1399514   (免费推理额度)
200  https://www.volcengine.com/docs/82379/1465347   (安心体验模式细则说明)
200  https://www.volcengine.com/docs/82379/1099320   (模型价格)
200  https://www.volcengine.com/docs/82379/1399009   (Chat API 示例，含 base_url)
401  https://ark.cn-beijing.volces.com/api/v3/chat/completions   (无 Key 请求，预期 401)
200  https://cloud.siliconflow.cn/
200  https://cloud.siliconflow.cn/account/ak
200  https://cloud.siliconflow.cn/models
200  https://siliconflow.cn/pricing
200  https://docs.siliconflow.cn/docs/userguide/quickstart
200  https://docs.siliconflow.cn/docs/userguide/faqs/authentication
200  https://docs.siliconflow.cn/docs/userguide/faqs/rate-limit-and-upgradation
200  https://bailian.console.aliyun.com/
200  https://bailian.console.aliyun.com/?apiKey=1
200  https://help.aliyun.com/zh/model-studio/new-free-quota
200  https://help.aliyun.com/zh/model-studio/get-api-key
200  https://help.aliyun.com/zh/model-studio/compatibility-of-openai-with-dashscope
200  https://help.aliyun.com/zh/model-studio/qwen-flash
200  https://platform.deepseek.com/
200  https://platform.deepseek.com/api_keys
200  https://platform.deepseek.com/top_up
200  https://platform.deepseek.com/usage
200  https://api-docs.deepseek.com/zh-cn/quick_start/pricing
200  https://api-docs.deepseek.com/zh-cn/
200  https://xinghuo.xfyun.cn/sparkapi                          (讯飞星火）
200  https://www.xfyun.cn/doc/spark/HTTP%E8%B0%83%E7%94%A8%E6%96%87%E6%A1%A3.html   (讯飞 HTTP 调用文档，含 base_url 与 model 取值)
401  https://spark-api-open.xf-yun.com/v1/chat/completions       (伪造 Key，返回 apikey not found → 端点存在)
200  https://modelscope.cn/
200  https://www.modelscope.cn/docs/model-service/API-Inference/intro   (SPA 空壳，正文抓不到)
200  https://modelscope.cn/register
200  https://modelscope.cn/my/myaccesstoken                     (Access Token 创建页)
200  https://modelscope.cn/magicube/usage?tab=earn              (魔粒额度查看)
200  https://modelscope.cn/my/settings/account                  (邮箱验证/个人信息)
200  https://api-inference.modelscope.cn/v1/models              (无需 Key，返回 35 个模型 ID — 我实测)
401  https://api-inference.modelscope.cn/v1/chat/completions     (伪造 Key → Authentication failed，端点存在 — 我实测)
200  https://passport.xfyun.cn/register
200  https://console.xfyun.cn/app/myapp
200  https://console.xfyun.cn/services/cbm                      (Spark Lite 的 APIPassword 页)
500  https://www.xfyun.cn/services/cbm                           (旧产品页，平台自身故障)
401  https://qianfan.baidubce.com/v2/chat/completions            (伪造 Key → 端点存在 — 我实测)
200  https://console.bce.baidu.com/qianfan/ais/console/applicationConsole/application
200  https://console.bce.baidu.com/qianfan/
200  https://console.bce.baidu.com/iam/#/iam/apikey/list        (千帆 API Key 页)
200  https://cloud.baidu.com/doc/qianfan/s/Imi2rpirg            (千帆新用户免费额度)
200  https://cloud.baidu.com/doc/qianfan/s/rmse4vxp8            (V1 下线及迁移说明)
```
