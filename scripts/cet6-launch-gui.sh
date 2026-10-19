#!/bin/bash
# 供桌面 App 调用：确保服务在跑 → 等就绪 → 打开浏览器
export PATH="/opt/homebrew/bin:$HOME/.npm-global/bin:/usr/bin:/bin:/usr/sbin:/sbin"
LOG=/tmp/cet6-gui.log
echo "[$(date '+%F %T')] 开始" >> "$LOG"
PLIST="$HOME/Library/LaunchAgents/local.cet6.review.plist"
UID_NUM="$(id -u)"

if launchctl print "gui/$UID_NUM/local.cet6.review" >/dev/null 2>&1; then
  launchctl kickstart -k "gui/$UID_NUM/local.cet6.review" >/dev/null 2>&1
else
  launchctl bootstrap "gui/$UID_NUM" "$PLIST" >/dev/null 2>&1 || launchctl load -w "$PLIST" >/dev/null 2>&1
fi

for _ in $(seq 1 45); do
  sleep 2
  curl -sS -m 5 -o /dev/null "http://localhost:3000/cet6" 2>/dev/null && break
done

if curl -sS -m 8 -o /dev/null "http://localhost:3000/cet6" 2>/dev/null; then
  # 带一个时间戳参数：保证浏览器发起新请求（不会命中旧标签页）
  open "http://localhost:3000/cet6?v=$(date +%s)" 2>>"$LOG"
  echo "[$(date '+%F %T')] 已调用 open，exit=$?" >> "$LOG"
else
  osascript -e 'display dialog "服务启动超时，请把 /tmp/cet6-server.err 最后几行发给助手。" with title "六级复习台" buttons {"好"} default button 1 with icon caution' >/dev/null 2>&1
  echo "[$(date '+%F %T')] 超时" >> "$LOG"
fi
