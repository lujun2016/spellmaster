#!/bin/bash
# 前台启动（能看到日志，Ctrl+C 关闭）。日常直接双击桌面上的「六级复习台」图标即可。
exec "$(cd "$(dirname "$0")" && pwd)/scripts/cet6-start.sh"
