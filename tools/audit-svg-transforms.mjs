/* audit-svg-transforms.mjs — flag GSAP tweens that scale/rotate an SVG CHILD.
   Why it matters: GSAP resolves an SVG element's transform origin by measuring the
   element, and inside a group that is still hidden that measurement comes back wrong.
   The render that follows leaves a permanent translate on the element — measured on
   act 03, a tangent line finished 64 px away from the dot it is meant to touch.
   With no explicit origin GSAP anchors the growth at the element's bounding-box
   corner, so the tween slides sideways instead of growing in place. Divs have a CSS
   box and are unaffected: only children of <svg> are reported.
   usage: node tools/audit-svg-transforms.mjs */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(PROJECT, "compositions", "frames");

/* the class/id tokens that appear inside an <svg> block */
function svgTokens(src) {
  const set = new Set();
  for (const svg of src.match(/<svg[\s\S]*?<\/svg>/g) || []) {
    for (const m of svg.matchAll(/\b(?:class|id)="([^"]+)"/g)) {
      m[1].split(/\s+/).filter(Boolean).forEach((t) => set.add(t));
    }
  }
  return set;
}

/* every tl.to / from / fromTo / set( call, with its source span */
function calls(src) {
  const out = [];
  const re = /(?:\btl|\bgsap)\.(?:to|from|fromTo|set)\(/g;
  let m;
  while ((m = re.exec(src))) {
    let i = re.lastIndex - 1, depth = 0, end = i;
    for (; i < src.length; i++) {
      const c = src[i];
      if (c === "(") depth++;
      else if (c === ")") { depth--; if (!depth) { end = i; break; } }
    }
    out.push({ body: src.slice(re.lastIndex, end), index: m.index });
  }
  return out;
}

let hits = 0;
for (const f of readdirSync(DIR).filter((n) => n.endsWith(".html")).sort()) {
  const src = readFileSync(join(DIR, f), "utf8");
  const inSvg = svgTokens(src);
  for (const c of calls(src)) {
    if (!/\b(?:scale|rotation|scaleX|scaleY)\s*:/.test(c.body)) continue;
    const sel = (c.body.match(/["']([^"']+)["']/) || [])[1];
    if (!sel) continue;
    const tokens = sel.match(/[.#][\w-]+/g) || [];
    if (!tokens.some((t) => inSvg.has(t.slice(1)))) continue;
    const origin = (c.body.match(/transformOrigin\s*:\s*["']([^"']*)["']/) || [null, "(default)"])[1];
    console.log(`${f}:${src.slice(0, c.index).split("\n").length}  ${sel}  origin=${origin}`);
    hits++;
  }
}
console.log(hits ? `${hits} SVG-child transform tween(s) to review` : "svg transforms: 0 hits");
