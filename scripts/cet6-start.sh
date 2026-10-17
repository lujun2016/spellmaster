#!/bin/bash
# ============================================================
#  六级复习台 · 启动器（被桌面 App 和 .command 共用）
#
#  用法：
#    bash scripts/cet6-start.sh          # 前台启动，终端里能看到日志（Ctrl+C 关闭）
#    bash scripts/cet6-start.sh --bg     # 后台启动，不占终端（桌面 App 用这个）
#
#  自动处理：iCloud 占位文件回迁 → 依赖重建 → 必要构建 → 备份进度 → 启动 → 开浏览器
# ============================================================
set -u

# GUI（Finder 双击）启动时 PATH 很窄，必须自己补上
export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$HOME/.npm-global/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd -P "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR" || exit 1

PORT=3000
URL="http://localhost:$PORT/cet6"
LOG="/tmp/cet6-server.log"
BG=0
SERVICE=0
case "${1:-}" in
  --bg) BG=1 ;;
  --service) SERVICE=1 ;;   # 由 launchd 托管的常驻服务：前台运行、不开浏览器
esac

say() { echo "$@"; }

# 抓 VOA 每日听力需要梯子（没有也不影响其他模块）
export CET6_PROXY="${CET6_PROXY:-http://127.0.0.1:7892}"

notify_fail() {
  local msg="$1"
  if [ "$BG" = "1" ]; then
    osascript -e "display dialog \"$msg\" with title \"六级复习台启动失败\" buttons {\"好\"} default button 1 with icon caution" >/dev/null 2>&1 || true
  fi
}

say "════════════════════════════════════════"
say "  六级复习台"
say "  目录：$PROJECT_DIR"
say "════════════════════════════════════════"

# ---------- 1. iCloud 占位文件回迁 ----------
say "① 检查文件是否被 iCloud 抽空…"
placeholders=0
while IFS= read -r f; do
  case "$(stat -f %Sf "$f" 2>/dev/null)" in
    *dataless*)
      placeholders=$((placeholders + 1))
      brctl download "$f" >/dev/null 2>&1 || true
      ;;
  esac
done < <(find src prisma -type f 2>/dev/null)

build_placeholders=0
while IFS= read -r f; do
  case "$(stat -f %Sf "$f" 2>/dev/null)" in
    *dataless*)
      build_placeholders=$((build_placeholders + 1))
      brctl download "$f" >/dev/null 2>&1 || true
      ;;
  esac
done < <(find .next -type f 2>/dev/null | head -300)

if [ "$placeholders" -gt 0 ] || [ "$build_placeholders" -gt 0 ]; then
  say "   占位文件：源码 $placeholders 个 / 构建产物 $build_placeholders 个，已请求下载，等 6 秒…"
  sleep 6
else
  say "   文件正常。"
fi
if [ "$build_placeholders" -gt 20 ]; then
  say "   构建产物损坏较多，稍后重新构建。"
  rm -rf .next
fi

# ---------- 2. 依赖 ----------
say "② 检查依赖…"
NEED_INSTALL=0
if [ ! -d node_modules ]; then
  NEED_INSTALL=1
else
  bad=0
  [ -e node_modules/next/package.json ] || bad=$((bad + 1))
  for f in node_modules/.pnpm/@tailwindcss+postcss@*/node_modules/@tailwindcss/postcss/package.json; do
    [ -e "$f" ] || continue
    case "$(stat -f %Sf "$f" 2>/dev/null)" in *dataless*) bad=$((bad + 1));; esac
    head -c 1 "$f" >/dev/null 2>&1 || bad=$((bad + 1))
  done
  [ "$bad" -gt 0 ] && NEED_INSTALL=1
fi
if [ "$NEED_INSTALL" = "1" ]; then
  say "   依赖缺失或被抽空，从本地存储重建（约 20 秒）…"
  rm -rf node_modules
  if ! pnpm install --frozen-lockfile >/tmp/cet6-pnpm.log 2>&1; then
    say "   ⚠️ 依赖重建失败，日志：/tmp/cet6-pnpm.log"
    notify_fail "依赖重建失败，请把 /tmp/cet6-pnpm.log 的最后几行发给助手。"
    exit 1
  fi
  say "   依赖已重建。"
else
  say "   依赖正常。"
fi

# ---------- 3. 构建 ----------
if [ ! -f .next/BUILD_ID ]; then
  say "③ 正在构建（约 1–2 分钟，只需一次）…"
  if ! npx --no-install next build >/tmp/cet6-build.log 2>&1; then
    say "   ⚠️ 构建失败，日志：/tmp/cet6-build.log"
    notify_fail "构建失败，请把 /tmp/cet6-build.log 的最后几行发给助手。"
    exit 1
  fi
  say "   构建完成。"
else
  say "③ 构建产物已存在。"
fi

# ---------- 4. 备份学习进度 ----------
DB="prisma/cet6/dev.db"
if [ -f "$DB" ]; then
  mkdir -p prisma/cet6/backups
  TODAY="$(date +%Y%m%d)"
  if [ ! -f "prisma/cet6/backups/dev-$TODAY.db" ]; then
    cp "$DB" "prisma/cet6/backups/dev-$TODAY.db" 2>/dev/null || true
    say "   已备份今日学习进度（保留最近 7 份）。"
  fi
  ls -1t prisma/cet6/backups/dev-*.db 2>/dev/null | tail -n +8 | while read -r old; do rm -f "$old"; done
fi

# ---------- 5. 启动 ----------
if lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  say "④ 服务已在运行，打开浏览器。"
  open "$URL" 2>/dev/null || true
  [ "$BG" = "1" ] || say "   👉 $URL"
  exit 0
fi

if [ "$BG" = "1" ]; then
  say "④ 后台启动服务…"
  nohup npx --no-install next start -p "$PORT" >"$LOG" 2>&1 &
  disown 2>/dev/null || true
  # 等它就绪（最多 60 秒）
  for _ in $(seq 1 30); do
    sleep 2
    if curl -sS -m 5 -o /dev/null "http://localhost:$PORT/cet6" 2>/dev/null; then break; fi
  done
  if curl -sS -m 8 -o /dev/null "http://localhost:$PORT/cet6" 2>/dev/null; then
    open "$URL" 2>/dev/null || true
    say "   已启动：$URL"
    exit 0
  fi
  say "   ⚠️ 启动超时，日志：$LOG"
  notify_fail "服务启动超时。日志在 /tmp/cet6-server.log，请把最后几行发给助手。"
  exit 1
fi

if [ "$SERVICE" = "1" ]; then
  say "④ 以常驻服务方式运行（由系统托管，崩溃会自动重启）…"
  exec npx --no-install next start -p "$PORT"
fi

say "④ 启动服务…"
say
say "   👉 打开地址： $URL"
say "   （关闭服务：按 Ctrl+C）"
say
( sleep 5; open "$URL" 2>/dev/null || true ) &
exec npx --no-install next start -p "$PORT"
