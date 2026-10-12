#!/usr/bin/env node
/* build-frames.mjs — stamps the shared kit + each act's bespoke groups into
   compositions/frames/<id>.html. One pipeline owns every file so the layout
   contract (stage left / lyric rail right / chrome) cannot drift between acts. */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { KIT_CSS, KIT_JS } from "./kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = join(HERE, "..");
const OUT = join(PROJECT, "compositions", "frames");
mkdirSync(OUT, { recursive: true });

const { FRAMES } = await import("./frames-spec.mjs");

function tc(s) {
  const m = Math.floor(s / 60);
  const x = (s % 60).toFixed(1).padStart(4, "0");
  return `${String(m).padStart(2, "0")}:${x}`;
}

/* ------------------------------------------------------------------ *
 *  validator — every time the spec hands the kit must be LOCAL seconds
 *  inside [0, span] for group windows (track seconds everywhere else).
 *  Passing track seconds into groups() used to double-subtract the frame
 *  offset and clamp every window to 0, freezing the act.
 * ------------------------------------------------------------------ */
function validate(f) {
  const errs = [];
  const m = f.js.match(/groups\(tl,\s*(\[\[[\s\S]*?\]\])\s*\)/);
  if (!m) errs.push("no groups(tl, [...]) call found");
  else {
    let wins;
    try {
      wins = JSON.parse(m[1]);
    } catch (e) {
      errs.push(`groups() windows are not JSON-parseable: ${e.message}`);
      wins = null;
    }
    if (wins) {
      const ids = new Set(f.groups.map((g) => `#${g.id}`));
      let prevEnd = 0;
      wins.forEach((w, i) => {
        const [sel, a, b] = w;
        if (!ids.has(sel)) errs.push(`window ${i}: ${sel} is not a declared group`);
        ids.delete(sel);
        if (!(a >= 0) || a > f.span + 1e-6) errs.push(`window ${i} (${sel}): start ${a}s outside [0, ${f.span}] — track second instead of local?`);
        if (a < prevEnd - 1e-6) errs.push(`window ${i} (${sel}): start ${a}s overlaps previous end ${prevEnd}s`);
        if (b != null) {
          if (!(b > a) || b > f.span + 1e-6) errs.push(`window ${i} (${sel}): end ${b}s invalid for span ${f.span}s`);
          prevEnd = b;
        } else if (i !== wins.length - 1) {
          errs.push(`window ${i} (${sel}): open-ended but not last`);
        }
      });
      for (const left of ids) errs.push(`group ${left} is declared but never shown`);
    }
  }
  f.cues.forEach((q) => {
    if (q.t < f.start - 1.0 || q.t > f.start + f.span + 0.5) errs.push(`cue "${q.en}" at ${q.t}s outside frame ${f.start}–${f.start + f.span}`);
  });
  if (errs.length) {
    console.error(`\n✗ ${f.id}`);
    errs.forEach((e) => console.error(`   - ${e}`));
    process.exit(1);
  }
}

function render(f) {
  /* f.persistent: stage furniture that lives for the WHOLE act (the load rail, the
     ctx spine). It is not a group, so groups() never toggles it and the validator's
     "every group is shown" rule still holds. */
  const persistent = f.persistent
    ? `          <div class="stay" id="g0">\n${f.persistent}\n          </div>\n`
    : "";
  const groupsHtml = f.groups.map((g) => `          <div class="group" id="${g.id}">\n${g.html}\n          </div>`).join("\n");
  const groupsCss = f.groups.map((g) => g.css || "").join("\n");
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <template>
      <style>${KIT_CSS}${groupsCss}
      </style>

      <div id="root" data-composition-id="${f.id}" data-width="1920" data-height="1080" data-duration="${f.span}">
        <div class="glow" data-layout-ignore style="background:radial-gradient(62% 52% at 34% 42%, ${f.glow || "rgba(97,92,237,.15)"} 0%, transparent 72%)"></div>
        <div class="rain" id="rain" data-layout-ignore></div>
        <div class="gridfloor" data-layout-ignore></div>
        <div class="scan" data-layout-ignore></div>
        <div class="vig" data-layout-ignore></div>
        <div class="stage" id="stage">
          <div class="hud" data-layout-ignore><i></i><i></i><i></i><i></i></div>
${persistent}${groupsHtml}
        </div>
        <div class="lyr" id="lyr">
          <div class="bar"><i id="lyr_dot" style="top:0"></i></div>
          <div class="meta"><span class="n" id="lyr_n">LYRIC 00/00</span><span class="ticks" id="lyr_ticks"></span></div>
          <div class="en" id="lyr_en"></div>
          <div class="zh" id="lyr_zh"></div>
        </div>
        <div class="actlabel" data-layout-ignore><div class="a">${f.actTitle}</div><div class="t">${tc(f.start)} – ${tc(f.start + f.span)}</div></div>
        <div class="gutter" id="gutter" data-layout-ignore></div>
        <div class="statusbar">
          <span class="l">world.execute(me); · <b>Qwen3.8</b></span>
          <span class="c" id="sb_tel">ctx 0/32,768 · tok/s 0.0 · t=0.70</span>
          <span class="r" id="sb_state">▶ generating</span>
        </div>
        <div class="flash" id="flash"></div>
      </div>

      <script>
        (function () {
          var F = ${f.start};
          var SPAN = ${f.span};
${KIT_JS}
          var tl = gsap.timeline({ paused: true });
          bedDrift(tl);
          var CUES = ${JSON.stringify(f.cues)};
${f.js}
          window.__timelines = window.__timelines || {};
          window.__timelines["${f.id}"] = tl;
          tl.seek(0);
        })();
      </script>
    </template>
  </body>
</html>
`;
}

for (const f of FRAMES) {
  validate(f);
  const path = join(OUT, `${f.id}.html`);
  writeFileSync(path, render(f));
  console.log(`wrote ${f.id}.html  span ${f.span}s  groups ${f.groups.length}  cues ${f.cues.length}`);
}
console.log(`\n${FRAMES.length} frames written to ${OUT}`);
