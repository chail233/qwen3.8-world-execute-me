#!/usr/bin/env python3
"""tools/key-portrait.py — turn the reference portrait into a render-ready sprite.

The film's character must BE the official illustration, so this does the minimum:
  1. key the white background by border-connected flood fill (a faint watermark at
     luminance ~238 is therefore swallowed too, while her enclosed white dress,
     which is only reachable through dark outline strokes, stays opaque);
  2. feather alpha 1.5px and un-premultiply the white out of the edge ring, so no
     white halo survives on the film's #0B0E1C stage;
  3. re-centre the content box onto the 2:3 canvas M.silhouette(s) already assumes
     (s wide, 1.5s tall) at 96% height — so per-act placements stay valid.

usage: python tools/key-portrait.py refs/qwen-girl-official.jpg assets/character/qwen38-official.png
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

SRC = sys.argv[1] if len(sys.argv) > 1 else "refs/qwen-girl-official.jpg"
DST = sys.argv[2] if len(sys.argv) > 2 else "assets/character/qwen38-official.png"
BG_MIN = 232          # a pixel is "background" when its darkest channel is >= this
FEATHER = 1.5         # px of alpha blur
MARGIN = 0.96         # content fills this fraction of the canvas height

im = Image.open(SRC).convert("RGB")
a = np.asarray(im).astype(np.int16)
H, W = a.shape[:2]
mn = a.min(axis=2)

# --- 1. background = near-white AND connected to the image border -------------
from scipy import ndimage
near_white = mn >= BG_MIN
lab, n = ndimage.label(near_white, structure=np.ones((3, 3)))
border_labels = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])))
border_labels.discard(0)
bg = np.isin(lab, list(border_labels))
fg = ~bg
print(f"flood fill: {len(border_labels)} border-connected background blobs, "
      f"{100*fg.mean():.1f}% kept as art")

# --- 2. feather + defringe ----------------------------------------------------
alpha = Image.fromarray((fg * 255).astype(np.uint8)).filter(
    ImageFilter.GaussianBlur(FEATHER))
al = np.asarray(alpha).astype(np.float32) / 255.0

# un-premultiply the white that the blur pulled into the edge ring:
#   c_seen = a*true + (1-a)*255  ->  true = (c_seen - (1-a)*255) / a
f = a.astype(np.float32)
safe = np.maximum(al, 1e-3)
true = (f - (1.0 - al)[..., None] * 255.0) / safe[..., None]
out = np.where(al[..., None] > 0, np.clip(true, 0, 255), 0).astype(np.uint8)

rgba = np.dstack([out, (al * 255).astype(np.uint8)])
sprite = Image.fromarray(rgba, "RGBA")

# --- 3. reframe onto the 2:3 canvas ------------------------------------------
box = sprite.getbbox()
cx, cy, cw, ch = (box[0] - 2, box[1] - 2,
                  box[2] - box[0] + 4, box[3] - box[1] + 4)
cx = max(cx, 0); cy = max(cy, 0)
content = sprite.crop((cx, cy, cx + cw, cy + ch))
oH = int(round(ch / MARGIN))          # content fills MARGIN of the canvas height
oW = int(round(oH * 2 / 3))           # canvas aspect w:h = 2:3, as M.silhouette assumes
k = min(1.0, (MARGIN * oW) / cw)      # only if she were wider than the canvas
canvas = Image.new("RGBA", (oW, oH), (0, 0, 0, 0))
res = content.resize((max(1, int(cw * k)), max(1, int(ch * k))), Image.LANCZOS)
canvas.paste(res, ((oW - res.width) // 2, (oH - res.height) // 2), res)
canvas.save(DST)
print(f"{SRC} {W}x{H}  content box {(cx, cy, cw, ch)}  ->  {DST} {canvas.size}")
