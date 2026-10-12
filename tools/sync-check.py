"""sync-check.py — audit cues.json against a reference LRC.

Reference stamps are whole seconds (floor-rounded at the source), so a line's
true onset lies in [stamp, stamp+1). Words inside a line are given an
interpolated onset spread across the gap to the next line; a cue is compared
against the interpolated onset of its FIRST matched word.

Usage: python tools/sync-check.py [ref.lrc]
"""
import json
import re
import statistics
import sys
from collections import defaultdict
from difflib import SequenceMatcher
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REF = ROOT / "refs" / (sys.argv[1] if len(sys.argv) > 1 else "lyrics-en-ref2.lrc")
LINE = re.compile(r"\[(\d\d):(\d\d)\.(\d\d)\](.*)")
TOL = 0.90  # 0.5 s floor-rounding + the interpolation estimate itself


def norm(word):
    w = word.lower()
    for junk in ("ve", "ll", "re", "d", "m"):
        w = w.replace("'" + junk, "")
    return re.sub(r"[^a-z0-9]", "", w)


def words(text):
    return [w for w in (norm(t) for t in text.split()) if w]


ref = []
for raw in REF.read_text(encoding="utf8").splitlines():
    m = LINE.match(raw)
    if not m:
        continue
    mm, ss, cs, text = m.groups()
    t = int(mm) * 60 + int(ss) + int(cs) / 100
    ws = words(text)
    if ws:
        ref.append({"t": t, "w": ws, "text": text.strip()})

# per-word expected onset: line stamp, advanced by the word's share of the gap
expected = []
for li, line in enumerate(ref):
    nxt = ref[li + 1]["t"] if li + 1 < len(ref) else line["t"] + 2.0
    span = max(nxt - line["t"], 0.0)
    n = len(line["w"])
    for k in range(n):
        expected.append(line["t"] + (k / n) * span)

refw = [w for line in ref for w in line["w"]]
line_of = []
for li, line in enumerate(ref):
    line_of.extend([li] * len(line["w"]))

cues = json.loads((ROOT / "cues.json").read_text(encoding="utf8"))["cues"]
ours = []  # (cue_index, word)
for i, c in enumerate(cues):
    for w in words(c["en"]):
        ours.append((i, w))
ourw = [w for _, w in ours]

match = {}
sm = SequenceMatcher(None, refw, ourw, autojunk=False)
for a, b, size in sm.get_matching_blocks():
    for k in range(size):
        match[b + k] = a + k  # our word -> ref word

by_cue = defaultdict(list)
for j, (ci, _) in enumerate(ours):
    if j in match:
        by_cue[ci].append(match[j])

print(f"{len(cues)} cues · {len(ref)} ref lines · {len(refw)} ref words · {len(ourw)} our words")
print(f"{'idx':>3} {'frame':<16} {'t':>8} {'exp':>8} {'delta':>7}  verdict")
acts = defaultdict(list)
worst = []
for i, c in enumerate(cues):
    hits = sorted(by_cue.get(i, []))
    if not hits:
        print(f"{i:3d} {c['frame']:<16} {c['t']:8.3f} {'-':>8} {'-':>7}  NO WORD MATCHED: {c['en'][:44]!r}")
        continue
    exp = expected[hits[0]]
    d = c["t"] - exp
    acts[c["frame"]].append(d)
    verdict = "ok" if abs(d) <= TOL else ("LATE" if d > 0 else "EARLY")
    if verdict != "ok":
        worst.append((i, c, exp, d, verdict))
        print(f"{i:3d} {c['frame']:<16} {c['t']:8.3f} {exp:8.2f} {d:+7.2f}  {verdict}  {c['en'][:40]!r}")

print("\n--- per act (delta = our cue start minus expected onset) ---")
print(f"{'frame':<18} {'n':>3} {'median':>8} {'min':>7} {'max':>7}")
for frame, ds in acts.items():
    print(f"{frame:<18} {len(ds):3d} {statistics.median(ds):+8.2f} {min(ds):+7.2f} {max(ds):+7.2f}")

covered = set()
for js in by_cue.values():
    for j in js:
        covered.add(line_of[j])
missed = [li for li in range(len(ref)) if li not in covered]
print(f"\n--- reference lines with no cue word: {len(missed)} ---")
for li in missed:
    print(f"  {ref[li]['t']:7.2f}  {ref[li]['text'][:60]}")

print(f"\nflagged {len(worst)}/{len(cues)} cues")
