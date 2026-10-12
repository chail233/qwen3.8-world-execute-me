"""vectorize-portrait.py — turn the keyed portrait into vector art, derived only
from the pixels already in the file (nothing is generated).

Two things come out of the same trace:
  * the outer body contour, from the alpha mask -> the silhouette plate;
  * the level sets of a smoothed luminance field inside that mask -> the lines the
    eye reads as hair locks, beret, collar, sleeve, fan edge and the face.
Everything is plain polygon paths on the sprite's own 2:3 canvas, so the landmark
fractions in char-anchors.mjs keep pointing at the same body parts as before.

usage: python tools/vectorize-portrait.py [--tol 2.6] [--lines 34]
"""
import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
from skimage import measure, morphology

ROOT = Path(__file__).resolve().parent.parent
VW, VH = 1000, 1500  # the sprite box is 1 x 1.5, so these are its own units

FILL = "#12162A"
STROKE = "#9F7BFF"
LEVELS = [(45, 0.52), (64, 0.40), (82, 0.30)]  # luminance percentile -> line opacity


def clean(mask):
    """Close the cut-out, drop stray islands, and plug the holes the keying left
    in her — a silhouette with a see-through arm reads as a rendering bug."""
    mask = ndimage.binary_closing(mask, structure=morphology.disk(4))
    mask = morphology.remove_small_objects(mask, min_size=4000)
    return ndimage.binary_fill_holes(mask)


def path_of(contour, h, w, tol):
    pts = np.array([[float(c[1]) * VW / w, float(c[0]) * VH / h] for c in contour])
    simp = measure.approximate_polygon(pts, tolerance=tol)
    return "M" + "L".join("%.1f %.1f" % (p[0], p[1]) for p in simp) + "Z", len(simp)


def trace(mask, img, tol, max_lines, sigma, inner):
    h, w = mask.shape
    outer, _ = path_of(max(measure.find_contours(mask.astype(float), 0.5), key=len), h, w, tol)

    lum = ndimage.gaussian_filter(
        img[..., 0] * 0.299 + img[..., 1] * 0.587 + img[..., 2] * 0.114, sigma
    )
    lines = []
    for pct, op in LEVELS:
        band = mask & (lum >= np.percentile(lum[mask], pct))
        for c in measure.find_contours(band.astype(float), 0.5):
            if len(c) < 150:
                continue
            p, n = path_of(c, h, w, tol * inner)
            lines.append((n, p, op))
    lines.sort(key=lambda x: -x[0])
    return outer, [(p, op) for _, p, op in lines[:max_lines]]


def svg(outer, lines):
    out = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VW} {VH}">',
        f'<path d="{outer}" fill="{FILL}"/>',
        f'<g fill="none" stroke="{STROKE}" stroke-linejoin="round" stroke-linecap="round">',
        f'<path d="{outer}" stroke-width="6" opacity="0.95"/>',
    ]
    for p, op in lines:
        out.append(f'<path d="{p}" stroke-width="3" opacity="{op}"/>')
    out += ["</g>", "</svg>"]
    return "\n".join(out)


def preview(outer, lines, path):
    """Rasterise the polygons with PIL so the trace can be judged without a browser."""
    W = 500
    H = int(W * VH / VW)
    im = Image.new("RGB", (W, H), (6, 7, 12))
    dr = ImageDraw.Draw(im)
    s = W / VW

    def pts(d):
        v = [float(x) for x in d.replace("M", " ").replace("Z", " ").replace("L", " ").split()]
        return [(v[i] * s, v[i + 1] * s) for i in range(0, len(v) - 1, 2)]

    o = pts(outer)
    dr.polygon(o, fill=(18, 22, 42))
    dr.line([*o, o[0]], fill=(159, 123, 255), width=2)
    for p, _ in lines:
        q = pts(p)
        if len(q) > 1:
            dr.line(q, fill=(120, 110, 220), width=1)
    im.save(path)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="src", default="assets/character/qwen38-official.png")
    ap.add_argument("--out", default="assets/character/qwen38-vector.svg")
    ap.add_argument("--tol", type=float, default=2.6)
    ap.add_argument("--lines", type=int, default=34)
    ap.add_argument("--sigma", type=float, default=2.5)
    ap.add_argument("--inner", type=float, default=1.5)
    a = ap.parse_args()

    img = np.asarray(Image.open(ROOT / a.src).convert("RGBA")).astype(np.uint8)
    mask = clean(img[..., 3] > 128)
    outer, lines = trace(mask, img, a.tol, a.lines, a.sigma, a.inner)
    doc = svg(outer, lines)
    (ROOT / a.out).write_text(doc, encoding="utf8")
    prev = str(ROOT / a.out).replace(".svg", "-preview.png")
    preview(outer, lines, prev)
    print(json.dumps({
        "src": a.src, "mask_px": int(mask.sum()), "lines": len(lines),
        "svg_bytes": len(doc.encode("utf8")), "outer_points": outer.count("L"),
        "out": a.out, "preview": prev,
    }, ensure_ascii=False))


main()
