#!/bin/bash
# 关闭六级复习台（把占用 3000 端口的服务停掉）
export PATH="/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
PORT=3000
PIDS="$(lsof -nP -tiTCP:$PORT -sTCP:LISTEN 2>/dev/null)"
if [ -n "$PIDS" ]; then
  kill $PIDS 2>/dev/null
  sleep 1
  PIDS2="$(lsof -nP -tiTCP:$PORT -sTCP:LISTEN 2>/dev/null)"
  [ -n "$PIDS2" ] && kill -9 $PIDS2 2>/dev/null
  osascript -e 'display notification "服务已关闭，学习进度已保存" with title "六级复习台"' >/dev/null 2>&1 || true
else
  osascript -e 'display notification "服务本来就没在跑" with title "六级复习台"' >/dev/null 2>&1 || true
fi
