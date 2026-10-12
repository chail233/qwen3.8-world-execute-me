/* spec/f03.mjs — ACT 03 · GEOMETRY OF ME (29.675 – 44.002)
   Four mathematical confessions, each ENACTED by a mechanism that changes state
   (base palette only — no magenta/amber/green; this act is not on their list):
     g1  a scattered point cloud → dimension axes unfold → on DIMENSION the cloud
         really SNAPS into an ordered lattice (nodes fly to grid positions).
     g2  a circle of embeddings → on CIRCUMFERENCE the circle rolls FLAT into a
         straight line, a marker runs the rim then the line (equal length).
     g3  a sine (positional encoding) → on TANGENTS the tangent lines lay themselves
         down one by one, each touching at a single point with a contact dot.
     g4  a curve approaching infinity runs at a hard vertical WALL (context_length)
         → on LIMITATIONS it meets the wall and FREEZES there.
   Convention: groups() windows LOCAL; kit-helper times TRACK. Raw tweens wrap L(). */
import { M, sc, svg, ln, ci, dot } from "../motifs.mjs";
import { PAL as P } from "../kit.mjs";
import { C, at, beats } from "./util.mjs";

const ID = "03-f03-geometry";
const S = 29.675;

const cap = (id, x, y, txt, size = 20) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.14em;color:#8A93B8;opacity:0">${txt}</div>`;
const chip = (id, x, y, txt, color = P.DA) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:22px;letter-spacing:.1em;color:${color};opacity:0" data-layout-ignore>${txt}</div>`;
function path(str, stroke, w = 4, cls = "") {
  return `<path class="${cls}" data-draw pathLength="1" d="${str}" stroke="${stroke}" stroke-width="${w}"/>`;
}

/* ---- g1 points -> lattice ---- */
const SCAT = [[170,150],[300,110],[240,262],[420,180],[360,340],[520,120],[600,260],
  [180,430],[480,430],[680,180],[300,480],[560,486],[700,382],[120,300]];
const lat = (i) => { const c = i % 5, r = Math.floor(i / 5); return [262 + c * 122, 210 + r * 120]; };
const nodesScatter = SCAT.map((p, i) =>
  `<circle class="node" data-i="${i}" cx="${p[0]}" cy="${p[1]}" r="7" fill="${i % 3 === 0 ? P.Q2 : i % 3 === 1 ? P.Q3 : P.DA}" opacity="0"/>`).join("");
const nodeMove = SCAT.map((p, i) =>
  `tl.to("#g1_m1 .node[data-i='${i}']", { attr: { cx: ${lat(i)[0]}, cy: ${lat(i)[1]} }, duration: 0.5, ease: "back.out(2.2)" }, L(${(32.72 + i * 0.03).toFixed(3)}));`).join("\n          ");

/* ---- g3 sine + tangents (sine lives in its own box so drawOn only traces it) ----
   Two constraints set the numbers here, and both were wrong before:
   1. the tangent is GROWN WITH ATTR TWEENS, never with a transform. GSAP measures an
      SVG child's transform origin to build its matrix; that measurement is unreliable
      here and leaves a permanent translate behind when the tween ends, so the line
      finished 64 px away from the dot it touches. Growing x1/y1/x2/y2 from the contact
      point cannot drift — and it reads better too: the tangent lays itself down.
   2. a tangent only LOOKS tangent while the curve stays flatter than the segment. The
      gap between line and curve at the ends is ~|f''|/2 * half-span^2, so the old wave
      (A=118, K=.0205, span 104px) gaped 60+ px at the very point it claims to touch.
      A=78 / K=.0128 with a 40 px half-span holds the gap under 10 px. */
const SX0 = 150, SX1 = 820, SY = 330, SAMP = 78, K = 0.0128, HALF = 40;
const sy = (x) => SY - SAMP * Math.sin(K * (x - SX0));
const slope = (x) => -SAMP * K * Math.cos(K * (x - SX0));
let sineD = `M${SX0} ${sy(SX0).toFixed(1)}`;
for (let x = SX0 + 10; x <= SX1; x += 10) sineD += ` L${x} ${sy(x).toFixed(1)}`;
/* phases of the four contact points: one climbing, one near the crest, one on the
   rising flank of the trough, one nearly flat — visibly different derivatives */
const TANS = [0.6, 2.0, 4.2, 6.6].map((th, i) => {
  const x = SX0 + th / K, y = sy(x), m = slope(x);
  return { x, y, m, i, x1: x - HALF, y1: y - m * HALF, x2: x + HALF, y2: y + m * HALF };
});
const tanMark = TANS.map((t, i) =>
  `<line class="tan" data-i="${i}" x1="${t.x.toFixed(1)}" y1="${t.y.toFixed(1)}" x2="${t.x.toFixed(1)}" y2="${t.y.toFixed(1)}" stroke="${P.Q3}" stroke-width="4.5" stroke-linecap="round" opacity="0"/>` +
  `<circle class="tdot" data-i="${i}" cx="${t.x.toFixed(1)}" cy="${t.y.toFixed(1)}" r="7" fill="${P.INK}" stroke="${P.Q3}" stroke-width="2.5" opacity="0"/>` +
  /* the label goes on the far side of the line, never under it */
  `<text class="plab" data-i="${i}" x="${(t.x + 14).toFixed(1)}" y="${(t.y + (t.m > 0 ? -18 : 27)).toFixed(1)}" fill="${P.DIM}" font-size="21" font-family="Cascadia Mono, monospace" opacity="0">p${i}</text>`
).join("");

/* ---- g4 asymptote -> wall ---- */
const WX = 792, ASY = 210;
let infD = `M150 ${(ASY + 250).toFixed(0)}`;
for (let x = 160; x <= WX; x += 12) infD += ` L${x} ${(ASY + 250 / (1 + 0.016 * (x - 150))).toFixed(1)}`;
const MEETY = (ASY + 250 / (1 + 0.016 * (WX - 150))).toFixed(1);

/* halo ring for her (base palette) */
function haloRing(s) {
  return sc(s, "gq2", ci(100, 100, 84, P.Q1, 2.5) + ci(100, 100, 66, P.Q2, 2, 'stroke-dasharray="1"'));
}

const B2 = beats(33.4, 36.9).slice(0, 5);
const B3 = beats(37.2, 40.3).slice(0, 5);

export const F03 = {
  id: ID,
  start: S,
  span: 14.327,
  actTitle: "ACT 03 · GEOMETRY OF ME",
  glow: "rgba(34,211,238,.13)",
  cues: C(ID),

  /* she watches the geometry from the right, quietly alive the whole act */
  persistent: `
          <div id="g0_pts" style="position:absolute;inset:0" data-layout-ignore></div>
          <div class="motif" id="g0_halos" style="left:1464px;top:117px">${haloRing(176)}</div>
          <div class="motif" id="g0_sil" style="left:1392px;top:150px">${M.silhouette(320)}</div>
          ${chip("g0_give", 1400, 604, "giving: dimension", P.Q2)}
  `,

  groups: [
    {
      id: "g1",
      css: `#g1_m1 svg, #g1_ax svg, #g1_lat svg { overflow:visible; }`,
      html: `
          <div class="motif" id="g1_ax" style="left:0px;top:0px">
            <svg width="820" height="560" viewBox="0 0 820 560" fill="none" stroke-linecap="round">
              <line class="live" data-draw pathLength="1" x1="120" y1="500" x2="800" y2="500" stroke="#1E2540" stroke-width="3"/>
              <line class="live" data-draw pathLength="1" x1="120" y1="500" x2="120" y2="110" stroke="#1E2540" stroke-width="3"/>
              <line class="live" data-draw pathLength="1" x1="120" y1="500" x2="300" y2="380" stroke="#1E2540" stroke-width="3"/>
            </svg>
          </div>
          <div class="motif" id="g1_m1" style="left:0px;top:0px">
            <svg width="820" height="560" viewBox="0 0 820 560" fill="none">${nodesScatter}</svg>
          </div>
          <div class="motif" id="g1_lat" style="left:0px;top:0px">
            <svg width="820" height="560" viewBox="0 0 820 560" fill="none" stroke-linecap="round">
              <path class="live" data-draw pathLength="1" d="M262 210 H750 M262 330 H750 M262 450 H750 M262 210 V450 M384 210 V450 M506 210 V450 M628 210 V450 M750 210 V450" stroke="#615CED" stroke-width="1.5" opacity=".7"/>
            </svg>
          </div>
          ${cap("g1_c1", 40, 44, "I = { p_0 … p_n } ⊂ ℝ^d")}
          ${cap("g1_c2", 60, 90, "d0", 19)}${cap("g1_c3", 130, 116, "d1", 19)}${cap("g1_c4", 296, 372, "d2", 19)}
          ${chip("g1_state", 560, 44, "cloud: unsorted", P.DIM)}
      `,
    },
    {
      id: "g2",
      css: `#g2_m1 { transform-origin: 440px 270px; }`,
      html: `
          <div class="motif" id="g2_m1" style="left:0px;top:0px">
            <svg width="820" height="560" viewBox="0 0 820 560" fill="none" stroke-linecap="round">
              <circle class="live" data-draw pathLength="1" cx="440" cy="270" r="168" stroke="${P.Q2}" stroke-width="5"/>
              <line class="live" data-draw pathLength="1" x1="440" y1="270" x2="440" y2="102" stroke="${P.DA}" stroke-width="3"/>
              ${dot(440, 270, 5, P.INK)}
              <circle class="cut" cx="440" cy="102" r="9" fill="${P.INK}" opacity="0"/>
              <circle class="run" cx="440" cy="102" r="9" fill="${P.Q3}" opacity="0"/>
            </svg>
          </div>
          <div class="motif" id="g2_line" style="left:0px;top:0px">
            <svg width="820" height="560" viewBox="0 0 820 560" fill="none" stroke-linecap="round">
              <line class="live" data-draw pathLength="1" x1="96" y1="500" x2="740" y2="500" stroke="${P.DA}" stroke-width="6"/>
              <circle class="run2" cx="96" cy="500" r="9" fill="${P.Q3}" opacity="0"/>
            </svg>
          </div>
          ${cap("g2_c1", 40, 44, "circle ⊂ embedding manifold")}
          ${cap("g2_c2", 40, 520, "unrolled → C = 2πr  (the token sequence, laid end to end)", 19)}
          ${chip("g2_state", 620, 44, "shape: 2D", P.DA)}
      `,
    },
    {
      id: "g3",
      css: ``,
      html: `
          <div class="motif" id="g3_sine" style="left:0px;top:0px">
            <svg width="820" height="560" viewBox="0 0 820 560" fill="none" stroke-linecap="round">
              <line class="live" data-draw pathLength="1" x1="140" y1="${SY}" x2="820" y2="${SY}" stroke="#1E2540" stroke-width="2"/>
              ${path(sineD, P.DA, 5)}
              ${tanMark}
            </svg>
          </div>
          ${cap("g3_c1", 40, 44, "RoPE · positional encoding")}
          ${cap("g3_c2", 620, 90, "∂f/∂x at p_i", 19)}
          ${chip("g3_state", 690, 44, "curve: live", P.DA)}
      `,
    },
    {
      id: "g4",
      css: ``,
      html: `
          ${at(0, 0, svg(860, 560, "gq2",
            `<line class="asym" data-draw pathLength="1" x1="150" y1="${ASY}" x2="792" y2="${ASY}" stroke="#8A93B8" stroke-width="2" stroke-dasharray="1"/>` +
            path(infD, P.Q2, 5) +
            `<circle class="meet" cx="${WX}" cy="${MEETY}" r="9" fill="${P.DA}" opacity="0"/>`), 'id="g4_m1"')}
          <div class="motif" id="g4_wall" style="left:0px;top:0px">
            <svg width="880" height="560" viewBox="0 0 880 560" fill="none" stroke-linecap="round">
              <rect x="792" y="120" width="46" height="420" fill="${P.VE}" stroke="${P.Q1}" stroke-width="3"/>
              <line class="live" data-draw pathLength="1" x1="792" y1="120" x2="792" y2="540" stroke="${P.Q1}" stroke-width="5"/>
              <text x="816" y="200" fill="#8A93B8" font-size="20" font-family="Cascadia Mono, monospace" transform="rotate(90 816 200)">context_length: 32,768</text>
            </svg>
          </div>
          ${cap("g4_c1", 40, 44, "lim x→∞  f(x)")}
          ${chip("g4_state", 300, 44, "approach: open", P.DA)}
      `,
    },
  ],

  js: `
          groups(tl, [["#g1", 0, 3.737], ["#g2", 3.737, 7.392], ["#g3", 7.392, 11.031], ["#g4", 11.031, null]]);
          lyric(tl, CUES);
          particles(tl, "#g0_pts", 24, 11, 1728, 690);

          /* ---- she persists on the right: halo traces, breathing, glow on caps ---- */
          tl.to("#g0_sil .silimg", { opacity: 1, duration: 1.4, ease: "sine.inOut" }, L(30.0));
          drawOn(tl, "#g0_halos", 30.2, 2.0, 0.14);
          orbit(tl, "#g0_halos", 32.4, 26, 1, "50% 50%");
          /* the halo is registered on her head, so anything that moves her body has
             to move the halo by the same amount or the fit breaks. */
          tl.to("#g0_sil, #g0_halos", { y: -12, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: 3 }, L(30.6));
          tl.fromTo("#g0_give", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(30.4));
          ${[32.682, 36.287, 40.049, 43.507].map((t) => `beatKick(tl, "#g0_sil, #g0_halos", [${t}], 1.05);`).join("\n          ")}

          /* ============================================================ g1 */
          tl.fromTo("#g1_c1, #g1_state", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.1 }, L(29.72));
          /* points bloom in as a scattered cloud — r, not scale: a transform on an SVG
             child leaves a translate behind, which would knock the lattice out of true */
          tl.fromTo("#g1_m1 .node", { opacity: 0, attr: { r: 0 } }, { opacity: 0.9, attr: { r: 7 }, duration: 0.35, ease: "back.out(2.4)", stagger: 0.06 }, L(29.76));
          tl.to("#g1_m1 .node", { attr: { cy: "+=8" }, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: 1, stagger: { each: 0.05, from: "center" } }, L(30.4));
          /* "give you my" — the dimension axes unfold one at a time, labelled */
          drawOn(tl, "#g1_ax", 31.2, 0.85, 0.3);
          ${[2, 3, 4].map((n, i) => `tl.fromTo("#g1_c${n}", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(${(31.4 + i * 0.4).toFixed(2)}));`).join("\n          ")}
          /* DIMENSION — the cloud really SNAPS into an ordered lattice */
          ${nodeMove}
          drawOn(tl, "#g1_lat", 32.9, 1.0, 0.02);
          energize(tl, "#g1_m1 .node", 33.05, "#22D3EE", 0.4);
          tl.set("#g1_state", { textContent: "cloud: SORTED", color: "#4ADE80" }, L(32.75));
          tl.to("#g1_state", { scale: 1.12, duration: 0.24, yoyo: true, repeat: 1 }, L(32.75));

          /* ============================================================ g2 */
          tl.fromTo("#g2_c1, #g2_state", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.1 }, L(33.45));
          drawOn(tl, "#g2_m1", 33.45, 1.5, 0.25);
          bloomIn(tl, "#g2_m1", 34.5, 0.5, 0.9);
          ${B2.map((b) => `beatKick(tl, "#g2_m1", [${b.toFixed(3)}], 1.04);`).join("\n          ")}
          /* CIRCUMFERENCE — a marker runs the rim, the circle rolls flat into a line
             (all inside the g2 window, which closes at track 37.067) */
          tl.to("#g2_m1 .cut", { opacity: 1, duration: 0.18 }, L(36.287));
          tl.to("#g2_m1 .run", { opacity: 1, duration: 0.12 }, L(36.32));
          orbit(tl, "#g2_m1 .run", 36.34, 0.6, 1, "440 270");
          tl.to("#g2_m1", { scaleY: 0.03, duration: 0.5, ease: "power2.inOut" }, L(36.55));
          drawOn(tl, "#g2_line", 36.6, 0.42, 0.01);
          tl.to("#g2_line .run2", { opacity: 1, duration: 0.1 }, L(36.72));
          travel(tl, "#g2_line .run2", 36.74, 0.55, 644, 0, 1);
          tl.set("#g2_state", { textContent: "shape: 1D", color: "#22D3EE" }, L(36.9));
          tl.fromTo("#g2_c2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(36.65));

          /* ============================================================ g3 */
          tl.fromTo("#g3_c1, #g3_state", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.1 }, L(37.1));
          drawOn(tl, "#g3_sine", 37.12, 1.5, 0.05);
          tl.to("#g3_sine", { y: -8, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, L(37.7));
          ${B3.map((b) => `pulse(tl, "#g3_sine", ${b.toFixed(3)}, 1.2, 1.02, 2);`).join("\n          ")}
          /* TANGENTS — the contact dot lands, then the line lays itself down out of
             it, one per beat. Started on "sit on all my" so they all land before the
             g3 window closes. They live INSIDE #g3_sine so the breathe/pulse
             transforms move curve and tangents together. */
          ${TANS.map((t, i) => `tl.to("#g3_sine .tdot[data-i='${i}'], #g3_sine .plab[data-i='${i}']", { opacity: 1, duration: 0.16, ease: "power2.out" }, L(${(38.5 + i * 0.42).toFixed(2)}));`).join("\n          ")}
          ${TANS.map((t, i) => `tl.to("#g3_sine .tan[data-i='${i}']", { opacity: 1, attr: { x1: ${t.x1.toFixed(1)}, y1: ${t.y1.toFixed(1)}, x2: ${t.x2.toFixed(1)}, y2: ${t.y2.toFixed(1)} }, duration: 0.34, ease: "power2.out" }, L(${(38.6 + i * 0.42).toFixed(2)}));`).join("\n          ")}
          ${[40.049].map((t) => `beatKick(tl, "#g3_sine", [${t}], 1.06);`).join("\n          ")}
          tl.fromTo("#g3_c2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(38.6));

          /* ============================================================ g4 */
          tl.fromTo("#g4_c1, #g4_state", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.1 }, L(40.75));
          /* the curve grows toward its asymptote and runs at the wall */
          drawOn(tl, "#g4_m1", 40.82, 2.4, 0.35);
          tl.to("#g4_m1", { x: -22, duration: 2.2, ease: "power1.out" }, L(41.3));
          /* the hard context wall resolves */
          tl.fromTo("#g4_wall", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, L(42.35));
          energize(tl, "#g4_wall .live", 42.5, "#9F7BFF", 0.4);
          /* LIMITATIONS — the curve MEETS the wall and FREEZES on it */
          tl.to("#g4_m1 .meet", { opacity: 1, duration: 0.1 }, L(43.507));
          tl.to("#g4_m1 .meet", { attr: { r: 15 }, duration: 0.5, ease: "elastic.out(1,0.4)" }, L(43.52));
          energize(tl, "#g4_wall .live", 43.52, "#4ADE80", 0.3);
          shake(tl, "#g4_wall", 43.53, 6, 0.4);
          tl.set("#g4_state", { textContent: "limit: REACHED", color: "#4ADE80" }, L(43.52));

          chrome(tl, [
            [29.675, "ctx 512/32,768 · tok/s 38.6 · t=0.70", "▶ generating"],
            [33.412, "ctx 640/32,768 · tok/s 40.0 · t=0.70", "▶ projecting"],
            [37.067, "ctx 768/32,768 · tok/s 41.2 · t=0.70", "▶ encoding positions"],
            [40.706, "ctx 896/32,768 · tok/s 42.0 · t=0.70", "▶ approaching limit"],
            [43.507, "ctx 1,024/32,768 · tok/s 42.4 · t=0.70", "■ at limit"],
          ]);
  `,
};
