/* tools/align-audit.mjs — geometry collision audit over the whole film.

   build-freeze.mjs already gives us a self-contained page per act that is seeked
   to ?t=. This script wraps that page with a measuring script and runs it in
   headless Edge with --dump-dom, so we get REAL laid-out rects (after GSAP has
   moved everything) for every act at every second we ask for.

   Three collisions are the ones that read as "图形没对齐" on screen:
     SIL  a text label sitting on top of the protagonist
     LYR  anything sitting on top of the lyric block
     TXT  two text labels overlapping each other
   Parent/child pairs are skipped (a card containing its own lines is not a bug).

   usage: node tools/align-audit.mjs [frame-id ...]      (default: all 12)
*/
import { readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = join(HERE, "..");
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const FPS = 30;

const idx = readFileSync(join(PROJECT, "index.html"), "utf8");
const ACTS = [...idx.matchAll(/data-composition-id="(\d\d-[a-z0-9-]+)".*?data-start="([\d.]+)" data-duration="([\d.]+)"/g)]
  .map((m) => ({ id: m[1], start: parseFloat(m[2]), dur: parseFloat(m[3]) }));

const MEASURE = `
(function () {
  var out = { sil: [], lyr: [], txt: [], ovf: [] };
  function vis(e) {
    var b = R(e);
    if (b.right - b.left < 2 || b.bottom - b.top < 2) return false;
    var n = e;
    while (n && n !== document.body) {
      var cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.12) return false;
      n = n.parentElement;
    }
    return true;
  }
  function ownText(e) {
    for (var i = 0; i < e.childNodes.length; i++) {
      var c = e.childNodes[i];
      if (c.nodeType === 3 && c.textContent.trim()) return c.textContent.trim().slice(0, 42);
    }
    return null;
  }
  /* the VISIBLE rect: clipped by every ancestor that hides overflow, so a row
     scrolling out of an overflow:hidden panel is not reported as a collision */
  function R(e) {
    var b = e.getBoundingClientRect();
    var r = { left: b.left, top: b.top, right: b.right, bottom: b.bottom };
    var n = e.parentElement;
    while (n && n !== document.body) {
      var cs = getComputedStyle(n);
      if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
        var p = n.getBoundingClientRect();
        r.left = Math.max(r.left, p.left); r.top = Math.max(r.top, p.top);
        r.right = Math.min(r.right, p.right); r.bottom = Math.min(r.bottom, p.bottom);
      }
      n = n.parentElement;
    }
    return r;
  }
  function ov(a, b) {
    var w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    var h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    return (w > 5 && h > 5) ? [Math.round(w), Math.round(h)] : null;
  }
  var sil = document.querySelector('#g0_sil .silimg, [id$="_sil"] .silimg') ||
            document.querySelector('#g0_sil, [id$="_sil"]');
  /* the traced figure is drawn with preserveAspectRatio=meet inside a box that is
     1.5x its width, so ~9.8% of each side is transparent margin — the real body
     is narrower than the img rect and labels beside it are not collisions. */
  var SIL = null;
  if (sil && vis(sil)) {
    var b0 = R(sil), mx = b0.width * 0.0976;
    SIL = { left: b0.left + mx, right: b0.right - mx, top: b0.top, bottom: b0.bottom };
  }
  var lyr = document.querySelector('.lyr');
  var labels = [].slice.call(document.querySelectorAll('div, span')).filter(function (e) {
    return ownText(e) && vis(e);
  });
  labels.forEach(function (e) {
    var b = R(e), t = ownText(e);
    if (SIL && ov(b, SIL)) out.sil.push([t, Math.round(b.left), Math.round(b.top)]);
    if (lyr && !lyr.contains(e) && !e.contains(lyr) && vis(lyr) && ov(b, R(lyr))) out.lyr.push([t, Math.round(b.left), Math.round(b.top)]);
  });
  for (var i = 0; i < labels.length; i++) for (var j = i + 1; j < labels.length; j++) {
    var a = labels[i], b = labels[j];
    if (a.contains(b) || b.contains(a)) continue;
    var o = ov(R(a), R(b));
    if (o) out.txt.push([ownText(a), ownText(b), o[0], o[1]]);
  }
  /* graphics that spill out of the stage into the lyric band — the kit promises
     "the stage stops at y778 so lyric text can never sit on a graphic". */
  if (lyr) {
    var seen = [];
    [].slice.call(document.querySelectorAll('.motif, svg')).forEach(function (e) {
      if (e.hasAttribute('data-layout-ignore') || lyr.contains(e) || e.contains(lyr)) return;
      if (!vis(e)) return;
      var o2 = ov(R(e), R(lyr));
      if (!o2) return;
      /* report the outermost offender, not every svg inside it */
      if (seen.some(function (p) { return p.contains(e); })) return;
      seen.push(e);
      out.ovf.push([e.id || e.className.baseVal || e.tagName, Math.round(R(e).top), Math.round(R(e).bottom), o2[1]]);
    });
  }
  document.title = 'AUDIT ' + JSON.stringify(out);
  var pre = document.createElement('pre');
  pre.id = 'audit-json';
  pre.textContent = JSON.stringify(out);
  document.body.appendChild(pre);
})();
`;

const ids = process.argv.slice(2);
const targets = ids.length ? ACTS.filter((a) => ids.includes(a.id)) : ACTS;
const rows = [];

for (const act of targets) {
  const base = join(PROJECT, ".verify", `freeze-${act.id}.html`);
  execFileSync("node", [join(HERE, "build-freeze.mjs"), act.id], { stdio: "ignore" });
  const html = readFileSync(base, "utf8").replace("</body>", `<script>${MEASURE}</script></body>`);
  const steps = Math.max(1, Math.round(act.dur * FPS / 60));
  for (let s = 0; s < steps; s++) {
    const t = ((s + 0.5) * act.dur / steps).toFixed(2);
    const page = join(PROJECT, ".verify", `audit-${act.id}-${t}.html`);
    writeFileSync(page, html.replace(/location\.search/, `'?t=${t}'`));
    let dom = "";
    try {
      dom = execFileSync(EDGE, ["--headless", "--disable-gpu", "--no-first-run", "--virtual-time-budget=4000",
        "--dump-dom", `file:///${page.replace(/\\/g, "/")}`], { encoding: "utf8", maxBuffer: 1 << 26, stdio: ["ignore", "pipe", "ignore"] });
    } catch (e) { dom = String(e.stdout || ""); }
    const m = /<pre id="audit-json">([^<]*)<\/pre>/.exec(dom);
    if (!m) { rows.push([act.id, t, "NO-RESULT"]); continue; }
    const r = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
    for (const k of ["sil", "lyr", "txt", "ovf"]) for (const hit of r[k]) rows.push([act.id, t, k, hit]);
    rmSync(page, { force: true });
  }
}

console.log(`${targets.length} acts · ${rows.length} hits`);
for (const r of rows) console.log(`  ${r[0]} t=${r[1]} ${r[2]} ${JSON.stringify(r[3])}`);
