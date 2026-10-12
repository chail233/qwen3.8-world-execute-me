#!/usr/bin/env python
"""Diagnose whether refs/lyrics-en.lrc is time-aligned with assets/bgm.mp3.

Strategy: the song contains landmarks that are unambiguous in a loudness/onset
curve and are labelled in the LRC. Measure them, then test offset hypotheses.

Landmarks used:
  A. the intro climax + cut  (LRC: "world.execute(me);" @ 16.000)
  B. the 12 isolated EXECUTION stabs (LRC: 147.660 .. 158.000, ~0.93s apart)
  C. the long quiet VOID before them (LRC: 131.224 .. 147.660)
  D. the final loud section (LRC: 162.632 .. 191.356)
"""
import json
import re
import sys

import numpy as np
import librosa

AUDIO = "assets/bgm.mp3"
LRC = "refs/lyrics-en.lrc"
SR = 22050
HOP = 512


def load(path):
    y, sr = librosa.load(path, sr=SR, mono=True)
    return y.astype(np.float32), sr


def lrc_lines(path):
    out = []
    pat = re.compile(r"\[(\d+):(\d+(?:\.\d+)?)\](.*)")
    for raw in open(path, encoding="utf-8"):
        m = pat.match(raw.strip())
        if m:
            out.append((int(m.group(1)) * 60 + float(m.group(2)), m.group(3).strip()))
    return out


def rms_envelope(y, sr):
    frame = 2048
    r = librosa.feature.rms(y=y, frame_length=frame, hop_length=HOP)[0]
    t = librosa.frames_to_time(np.arange(len(r)), sr=sr, hop_length=HOP)
    return t, r


def db(r, floor=1e-6):
    return 20 * np.log10(np.maximum(r, floor))


def per_second_profile(t, r):
    """Compact ASCII loudness profile, one row per second."""
    d = db(r)
    rows = []
    for s in range(int(t[-1]) + 1):
        m = (t >= s) & (t < s + 1)
        if not m.any():
            continue
        peak = d[m].max()
        mean = d[m].mean()
        rows.append((s, peak, mean))
    return rows


def ascii_bar(v, lo=-60.0, hi=0.0, width=52):
    f = max(0.0, min(1.0, (v - lo) / (hi - lo)))
    return "#" * int(round(f * width))


def find_isolated_stabs(t, r, lo, hi, min_gap=0.55, topn=16):
    """Sharp local loudness maxima inside [lo,hi) — the EXECUTION-stab signature."""
    m = (t >= lo) & (t < hi)
    ts, rs = t[m], r[m]
    if len(rs) < 5:
        return []
    d = db(rs)
    med = np.median(d)
    picks = []
    for i in range(2, len(d) - 2):
        if d[i] >= d[i - 1] and d[i] >= d[i + 1] and d[i] > med + 3:
            picks.append((ts[i], d[i]))
    merged = []
    for tt, vv in picks:
        if merged and tt - merged[-1][0] < min_gap:
            if vv > merged[-1][1]:
                merged[-1] = (tt, vv)
        else:
            merged.append((tt, vv))
    return merged[:topn]


def main():
    y, sr = load(AUDIO)
    dur = len(y) / sr
    t, r = rms_envelope(y, sr)
    lines = lrc_lines(LRC)

    print(f"audio duration : {dur:.3f}s   sr={sr}   lrc lines={len(lines)}")
    print(f"lrc last line  : {lines[-1][0]:.3f}s  {lines[-1][1]!r}")
    print()

    print("=== PER-SECOND LOUDNESS PROFILE (peak dB / mean dB) ===")
    rows = per_second_profile(t, r)
    for s, peak, mean in rows:
        mark = ""
        for lt, ltxt in lines:
            if int(lt) == s:
                mark = f"  <- lrc {lt:7.3f} {ltxt[:34]}"
                break
        print(f"{s:4d}s {peak:7.1f} {mean:7.1f} |{ascii_bar(mean)}{ascii_bar(peak, width=14)}|{mark}")

    print()
    print("=== CANDIDATE ISOLATED STABS in 120..180s ===")
    for tt, vv in find_isolated_stabs(t, r, 120, 180):
        print(f"  {tt:8.3f}s  peak {vv:6.1f} dB")

    print()
    print("=== OFFSET HYPOTHESES ===")
    print("LRC landmark -> predicted audio time under each offset")
    landmarks = [
        ("world.execute(me);  (intro climax)", 16.000),
        ("first EXECUTION stab", 147.660),
        ("last EXECUTION stab", 158.000),
        ("ILLEGAL ARGUMENTS (collapse end)", 131.224),
        ("final chorus start", 162.632),
    ]
    for off in (0.0, 1.36, 5.0, -0.37):
        print(f"  offset {off:+.2f}s : " + "  ".join(f"{n.split('(')[0].strip()}={v + off:.2f}" for n, v in landmarks))

    print()
    print("=== audiomap cross-reference ===")
    am = json.load(open("audiomap.json", encoding="utf-8"))
    print("key_moments:", [(k["t"], k["kind"], round(k["delta"], 2)) for k in am["key_moments"]])
    print("hard_stops :", [h["t"] for h in am["hard_stops"]])
    print("silences   :", [(s["start"], s["end"]) for s in am["silences"]])
    print("tempo      :", am["tempo"])
    return 0


if __name__ == "__main__":
    sys.exit(main())
