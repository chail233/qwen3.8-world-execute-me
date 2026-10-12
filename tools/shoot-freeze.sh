#!/usr/bin/env bash
# shoot-freeze.sh — pixel harness for motion: screenshots .verify/freeze-<id>.html
# (self-contained, GSAP seeked to ?t=) with headless Edge over file://.
# usage: bash tools/shoot-freeze.sh <frame-id> <prefix> <t1> [t2 ...]
set -e
cd "$(dirname "$0")/.."
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
ID="$1"; PREFIX="$2"; shift 2
node tools/build-freeze.mjs "$ID" >/dev/null
for T in "$@"; do
  OUT="D:\\Document\\AIVedio\\projects\\world-execute-me\\snapshots\\${PREFIX}-t${T}.png"
  PROF="/tmp/fz-$$-$T"
  "$EDGE" --headless --disable-gpu --hide-scrollbars --no-first-run \
    --user-data-dir="$PROF" \
    --screenshot="$OUT" --window-size=1920,1080 --timeout=15000 \
    "file:///D:/Document/AIVedio/projects/world-execute-me/.verify/freeze-${ID}.html?t=${T}" >/dev/null 2>&1 || true
  rm -rf "$PROF" 2>/dev/null || true
  echo "snapshots/${PREFIX}-t${T}.png"
done
