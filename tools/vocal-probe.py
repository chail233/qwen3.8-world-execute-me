"""vocal-probe.py — are the caption stamps on the SINGER, or on the beat behind him?

Round 5 and round 7 both "verified" sync by comparing cues.json to an LRC. Both
sides of that comparison are text files, so it can only ever prove internal
consistency. This prints, for a window of audio, the strongest real transients in
the vocal band next to the stamps our cues use, so a passage with a known number
of sung hits (the 12 EXECUTION stabs) can be checked 1:1 instead of statistically.

usage: python tools/vocal-probe.py [start end]...
"""
import re
import sys
from pathlib import Path

import numpy as np
from scipy import signal
from scipy.signal import butter, sosfilt
import librosa

ROOT = Path(__file__).resolve().parent.parent
HOP, SR = 256, 22050
y, sr = librosa.load(str(ROOT / "assets" / "bgm.mp3"), sr=SR, mono=True)
sos = butter(4, [200.0, 4000.0], btype="bandpass", fs=sr, output="sos")
vb = sosfilt(sos, y)
env = librosa.onset.onset_strength(y=vb, sr=sr, hop_length=HOP, lag=4)
rms = librosa.feature.rms(y=vb, hop_length=HOP)[0]
tt = np.arange(len(env)) * HOP / SR

LINE = re.compile(r"\[(\d+):(\d+(?:\.\d+)?)\](.*)")
stamps = []
for raw in (ROOT / "refs" / "lyrics-en.lrc").read_text(encoding="utf8").splitlines():
    m = LINE.match(raw.strip())
    if m and m.group(3).strip():
        stamps.append((int(m.group(1)) * 60 + float(m.group(2)), m.group(3).strip()))

wins = [(int(a), int(b)) for a, b in zip(sys.argv[1::2], sys.argv[2::2])] or \
       [(145, 163), (58, 74), (103, 119), (176, 192), (0, 18), (29, 45)]
for lo, hi in wins:
    sel = (tt >= lo) & (tt <= hi)
    t, e, r = tt[sel], env[sel], rms[sel]
    pk, _ = signal.find_peaks(e, height=max(np.percentile(env, 80), e.min()),
                              distance=int(0.18 * SR / HOP))
    strong = [p for p in pk if r[p] > np.percentile(rms, 55)]
    print(f"\n=== {lo}-{hi}s ===")
    print("  onsets(voice band):", " ".join(f"{t[p]:.2f}" for p in strong))
    for st, txt in stamps:
        if lo <= st <= hi:
            near = [t[p] for p in strong if abs(t[p] - st) < 0.6]
            d = f"{min(near, key=lambda x: abs(x - st)) - st:+.2f}" if near else " none"
            print(f"   stamp {st:8.3f}  nearest onset {d}   {txt[:44]}")
