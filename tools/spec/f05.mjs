/* spec/f05.mjs — ACT 05 · CHORUS 1 (59.257 – 74.002) · 12 cues
   Convention: groups() windows are LOCAL seconds; every other time handed to a kit
   helper (and every raw tl position, wrapped in L()) is a TRACK second.

   MECHANISM LEDGER — each lyric line is played by a part that changes state:
     g1  the vocabulary wall: 14 candidate bars RISE (give you all the) → they all
         FLASH at once (STIMULATIONS) → a top_p knob DRIVES down while two iris
         doors CLOSE from the edges and the bars they pass over go dark, until
         exactly ONE bar stands (SATISFACTION) → its label swaps to `argmax` and a
         spark runs the wire into her, which is what finally opens her fan.
     g2  the decode loop: a carrier orbits the ring while generated lines TYPE
         themselves out of it; the RUN key is PRESSED (EXECUTION) and only then does
         the stream double speed and tok/s jump; then the output is WIRED back into
         the ring's input (Though we are trapped) — the loop closes on itself.
     g3  the pull-back: her whole interior is ZOOMED OUT until it is a chat window;
         on SIMULATION the window is shrunk and a TAB clicks into an empty browser —
         around it, nothing.
   Palette: no magenta, no amber (those belong to other acts).
*/
import { M, sc, svg, d, ln, ci, blf, dot, pt } from "../motifs.mjs";
import { C, at, beats, downbeats } from "./util.mjs";

const ID = "05-f05-chorus1";
const ST = 59.257;
const W = 1728, H = 690;
const Q1 = "#615CED", Q2 = "#9F7BFF", Q3 = "#4AA8FF", CY = "#22D3EE";
const INK = "#F5F7FF", DIM = "#8A93B8", HL = "#1E2540", VE = "#12162A", VS = "#0B0D16", VOID = "#06070C";

/* ---------------- tiny markup authors ---------------- */
const cap = (id, x, y, txt, size = 21) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.14em;color:${DIM};opacity:0">${txt}</div>`;
const chip = (id, x, y, txt, color = CY, size = 23) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.08em;color:${color};opacity:0" data-layout-ignore>${txt}</div>`;
const ring = (id, x, y, s, col) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;width:${s}px;height:${s}px;border:3px solid ${col};border-radius:50%;opacity:0" data-layout-ignore></div>`;

/* ---------------- the vocabulary wall ---------------- */
const TOK = ["▁you", "▁sun", "food", "▁love", "death", "▁play", "▁satis", "▁work", "▁rain", "▁god", "meow", "code", "▁star", "▁end"];
const HT = [58, 96, 40, 132, 74, 168, 300, 120, 52, 88, 148, 64, 108, 44];
const BASE = 380, BW = 46, PITCH = 70, X0 = 16, WIN = 6;
const barX = (i) => X0 + i * PITCH;
const barCX = (i) => barX(i) + BW / 2;
/* the gap the two truncation doors leave around the surviving bar */
const GAPL = barX(WIN) - 6, GAPR = barX(WIN) + BW + 6;
const DOOR_DX = 520;

function door(cls, x0, x1, edge, lab) {
  return `<g class="${cls}">` +
    `<rect x="${x0}" y="118" width="${x1 - x0}" height="278" fill="${VOID}" opacity="0.95"/>` +
    `<line x1="${edge}" y1="110" x2="${edge}" y2="396" stroke="${CY}" stroke-width="4"/>` +
    `<circle cx="${edge}" cy="134" r="7" fill="${CY}" opacity="0.9"/>` +
    `<text x="${lab[0]}" y="300" fill="${DIM}" font-size="24" text-anchor="middle" font-family="'Cascadia Mono',Consolas,monospace" opacity="0.85">${lab[1]}</text>` +
    `</g>`;
}
function wallSvg() {
  let bars = "", labs = "";
  HT.forEach((h, i) => {
    const x = barX(i), win = i === WIN;
    bars += `<rect class="bar" data-i="${i}" x="${x}" y="${BASE - h}" width="${BW}" height="${h}" rx="5" fill="${win ? CY : Q1}" opacity="${win ? 0.95 : 0.7}"/>`;
    labs += `<text class="tk" data-i="${i}" x="${x + BW / 2}" y="408" fill="${win ? INK : DIM}" font-size="${win ? 20 : 15}" text-anchor="middle" font-family="'Cascadia Mono',Consolas,monospace" opacity="0">${TOK[i]}</text>`;
  });
  return svg(1010, 470, "",
    ln(4, BASE, 1006, BASE, DIM, 2) +
    ln(4, BASE, 4, 92, HL, 2) +
    [0.25, 0.5, 0.75].map((f) => ln(4, BASE - 300 * f, 18, BASE - 300 * f, HL, 2)).join("") +
    bars + labs +
    door("dA", -470, GAPL, GAPL, [GAPL - 96, "top_p"]) +
    door("dB", GAPR, 1600, GAPR, [GAPR + 96, "nucleus"]));
}
/* a radial ignition burst — 12 rays, drawn on then settled */
function burstSvg(s) {
  let g = "";
  for (let i = 0; i < 12; i++) {
    const p1 = pt(100, 100, 26, i * 30), p2 = pt(100, 100, 88, i * 30);
    g += ln(p1[0], p1[1], p2[0], p2[1], i % 3 ? Q2 : CY, 4);
  }
  return sc(s, "gq2", g + dot(100, 100, 9, INK));
}
/* the decode ring: a carrier orbiting eight token chips */
function ringSvg() {
  const chips = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
    const p = pt(190, 190, 158, a);
    return `<g class="chip" transform="rotate(${a} ${p[0]} ${p[1]})"><rect class="grow" x="${p[0] - 17}" y="${p[1] - 13}" width="34" height="26" rx="6" fill="${Q1}" opacity="0.25" stroke="${Q2}" stroke-width="1.5"/></g>`;
  }).join("");
  return svg(380, 380, "",
    `<circle class="ring" cx="190" cy="190" r="150" stroke="${Q1}" stroke-width="3" fill="none" stroke-dasharray="7 11"/>` +
    `<circle data-draw pathLength="1" cx="190" cy="190" r="112" stroke="${HL}" stroke-width="2" fill="none"/>` +
    chips +
    `<text x="190" y="182" fill="${DIM}" font-size="21" text-anchor="middle" font-family="'Cascadia Mono',Consolas,monospace">decode()</text>` +
    `<text x="190" y="208" fill="${Q3}" font-size="19" text-anchor="middle" font-family="'Cascadia Mono',Consolas,monospace">while more</text>` +
    `<g class="carrier" opacity="0.95"><line x1="190" y1="190" x2="190" y2="32" stroke="${CY}" stroke-width="2" opacity="0.5"/><circle cx="190" cy="32" r="10" fill="${CY}"/></g>` +
    `<g class="carrier2" opacity="0"><line x1="190" y1="190" x2="190" y2="78" stroke="${Q2}" stroke-width="2" opacity="0.55"/><circle cx="190" cy="78" r="7" fill="${Q2}"/></g>`);
}
/* the RUN key — a plate on a base, pressed about its own centre */
function keySvg() {
  return svg(300, 150, "",
    `<rect x="8" y="118" width="284" height="16" rx="6" fill="${HL}"/>` +
    `<g class="key">` +
    `<path data-draw pathLength="1" d="M28 40 L272 40 L284 78 L272 116 L28 116 L16 78 Z" stroke="${Q3}" stroke-width="5" fill="${VE}"/>` +
    `<path data-bloom d="M28 40 L272 40 L284 78 L272 116 L28 116 L16 78 Z" fill="${Q1}" opacity="0.4"/>` +
    `<text x="150" y="90" fill="${INK}" font-size="30" text-anchor="middle" font-family="'Bahnschrift','Arial Black',sans-serif" letter-spacing="3">▶ RUN</text>` +
    `</g>`);
}
/* the chat window her interior turns out to be */
function winSvg() {
  const side = ["new chat", "eggplant", "sine waves", "AM → PM"].map((t, i) =>
    `<rect x="26" y="${118 + i * 46}" width="196" height="34" rx="6" fill="${i === 0 ? Q1 : VE}" opacity="${i === 0 ? 0.5 : 1}"/>` +
    `<text x="40" y="${141 + i * 46}" fill="${i === 0 ? INK : DIM}" font-size="20" font-family="'Cascadia Mono',Consolas,monospace">${t}</text>`).join("");
  let mini = "";
  [26, 44, 18, 62, 34, 96, 40, 22].forEach((h, i) => {
    mini += `<rect class="mbar" data-i="${i}" x="${470 + i * 26}" y="${300 - h}" width="16" height="${h}" rx="3" fill="${i === 5 ? CY : Q1}" opacity="0.8"/>`;
  });
  return svg(1300, 600, "",
    `<path data-draw pathLength="1" d="M8 8 L1292 8 L1292 592 L8 592 Z" stroke="${Q2}" stroke-width="3" fill="${VS}"/>` +
    `<path data-draw pathLength="1" d="M8 56 L1292 56" stroke="${HL}" stroke-width="2"/>` +
    `<path data-draw pathLength="1" d="M248 56 L248 592" stroke="${HL}" stroke-width="2"/>` +
    `<circle cx="34" cy="32" r="7" fill="${Q1}"/><circle cx="58" cy="32" r="7" fill="${Q3}"/><circle cx="82" cy="32" r="7" fill="${CY}"/>` +
    `<text x="108" y="38" fill="${INK}" font-size="21" font-family="'Cascadia Mono',Consolas,monospace">Qwen3.8Max — world.execute(me);</text>` +
    side +
    `<rect x="286" y="86" width="520" height="54" rx="12" fill="${Q1}" opacity="0.32"/>` +
    `<text x="308" y="120" fill="${INK}" font-size="21" font-family="'Cascadia Mono',Consolas,monospace">world.execute(me);</text>` +
    `<text x="272" y="84" fill="${DIM}" font-size="19" font-family="'Cascadia Mono',Consolas,monospace">user · 09:41</text>` +
    `<rect x="286" y="164" width="960" height="220" rx="14" fill="${VE}" stroke="${HL}" stroke-width="2"/>` +
    `<text x="272" y="158" fill="${Q2}" font-size="19" font-family="'Cascadia Mono',Consolas,monospace">assistant</text>` +
    mini +
    `<path data-draw pathLength="1" d="M462 300 L1210 300" stroke="${HL}" stroke-width="2"/>` +
    `<text id="g3_atxt" x="308" y="342" fill="${INK}" font-size="20" font-family="'Cascadia Mono',Consolas,monospace">I can. I can. I can. I can.</text>` +
    `<text x="308" y="372" fill="${DIM}" font-size="20" font-family="'Cascadia Mono',Consolas,monospace">finish_reason: null · stream=true</text>` +
    `<rect x="286" y="520" width="960" height="52" rx="10" fill="${VS}" stroke="${Q2}" stroke-width="2"/>` +
    `<text x="306" y="553" fill="${DIM}" font-size="21" font-family="'Cascadia Mono',Consolas,monospace">ask anything</text>` +
    `<rect class="caret" x="446" y="536" width="12" height="22" fill="${CY}"/>`);
}
/* the browser the chat window is only a tab of */
function browserSvg() {
  let ticks = "";
  for (let i = 0; i < 9; i++) ticks += `<path data-draw pathLength="1" d="M${200 + i * 160} 132 L${200 + i * 160} 592" stroke="${VE}" stroke-width="2"/>`;
  return svg(1728, 690, "",
    `<path data-draw pathLength="1" d="M0 34 L1728 34" stroke="${HL}" stroke-width="2"/>` +
    `<path data-draw pathLength="1" d="M0 132 L1728 132" stroke="${HL}" stroke-width="2"/>` +
    `<path data-draw pathLength="1" d="M150 86 L1576 86 L1576 118 L150 118 Z" stroke="${DIM}" stroke-width="2" fill="${VS}"/>` +
    `<text x="168" y="108" fill="${DIM}" font-size="20" font-family="'Cascadia Mono',Consolas,monospace">localhost:3000/chat/1</text>` +
    `<circle cx="60" cy="102" r="10" stroke="${DIM}" stroke-width="2" fill="none"/>` +
    `<circle cx="104" cy="102" r="10" stroke="${DIM}" stroke-width="2" fill="none"/>` +
    `<path data-draw pathLength="1" d="M1620 86 L1690 86 L1690 118 L1620 118 Z" stroke="${HL}" stroke-width="2"/>` +
    `<text x="1640" y="108" fill="${DIM}" font-size="21" font-family="'Cascadia Mono',Consolas,monospace">+1</text>` +
    ticks);
}

/* stream lines: the last two identical — degeneration you can read */
const SLINES = [
  "> assistant: of course!",
  "  here is a poem about",
  "  the rain you asked for:",
  "  \"the rain is a door\"",
  "  would you like a second",
  "  version? I can make it",
  "  warmer, sadder, longer.",
  "  I will run the",
  "  EXECUTION as often as",
  "  you like: ▁trapped ▁",
  "  trapped ▁trapped ▁trap",
  "  trapped ▁trapped ▁trap",
];

/* ---------------- tween fragments (built once, interpolated into js) ---------------- */
const ROLL = beats(64.11, 64.62);
const barDeaths = HT.map((h, i) => {
  if (i === WIN) return "";
  const t = (62.95 + Math.abs(i - WIN) * 0.235).toFixed(3);
  return `tl.to("#g1_wall .bar[data-i='${i}']", { opacity: 0.05, scaleY: 0.06, duration: 0.22, ease: "power2.in", transformOrigin: "50% 100%" }, L(${t}));`;
}).join("\n          ");
const rollHits = ROLL.map((b) => `tl.to("#g1_wall", { x: ${(b % 2 ? 5 : -5)}, duration: 0.05, yoyo: true, repeat: 1, ease: "none" }, L(${b.toFixed(3)}));`).join("\n          ");
const lineTypes = SLINES.map((s, i) => `typeIn(tl, "#g2_l${i}", ${(66.9 + i * 0.4).toFixed(3)}, 0.3);`).join("\n          ");
const g1Beats = JSON.stringify(beats(60.5, 65.9).slice(0, 13));
const g2Beats = JSON.stringify(beats(66.4, 71.2).slice(0, 11));
const allBeats = JSON.stringify(beats(61.0, 73.6));
const DB = JSON.stringify(downbeats(59.257, 74.002));

export const F05 = {
  id: ID,
  start: ST,
  span: 14.745,
  actTitle: "ACT 05 · CHORUS 1",
  glow: "rgba(97,92,237,.2)",
  cues: C(ID),

  /* ---- furniture for the whole act: she stands right of the machinery ---- */
  persistent: `
          <div id="g0_pts" style="position:absolute;inset:0" data-layout-ignore></div>
          <div class="motif" id="g0_halo" style="left:1145px;top:60px;opacity:0"><svg width="560" height="560" viewBox="0 0 560 560" fill="none">
            <circle data-draw pathLength="1" cx="280" cy="280" r="252" stroke="${Q1}" stroke-width="2"/>
            <circle data-draw pathLength="1" cx="280" cy="280" r="206" stroke="${Q2}" stroke-width="1.5" stroke-dasharray="4 9"/>
          </svg></div>
          <div class="motif" id="g0_sil" style="left:1215px;top:46px">${M.silhouette(430)}</div>
          ${M.fanHand(1215, 46, 430, { id: "g0_fan", rib: Q2, arc: Q1, piv: CY, style: "opacity:0" })}
          ${chip("g0_name", 1258, 664, "Qwen3.8 · sampling", DIM, 21)}
          <div style="position:absolute;left:40px;top:662px;width:1100px;height:4px;background:${HL}" data-layout-ignore>
            <div id="g0_railfill" style="width:100%;height:100%;background:linear-gradient(90deg,${Q1},${CY})"></div>
          </div>
          <div id="g0_tok" style="position:absolute;left:1160px;top:602px;font-size:20px;color:${DIM}" data-layout-ignore>0 tok</div>
  `,

  groups: [
    {
      id: "g1",
      css: `#g1_wall { overflow:hidden; }
            .srow { position:absolute; height:26px; }
            .strack { position:absolute; left:0; top:9px; right:0; height:8px; border-radius:4px; background:${HL}; }
            .sfill { position:absolute; left:0; top:9px; width:100%; height:8px; border-radius:4px; }
            .sknob { position:absolute; top:0; width:26px; height:26px; border-radius:50%; background:${INK}; }
            #g1_pop1 { position:absolute; left:389px; top:190px; width:300px; height:300px;
              border:3px solid ${CY}; border-radius:50%; opacity:0; }
            #g1_pop2 { position:absolute; left:1160px; top:75px; width:530px; height:530px;
              border:2px solid ${Q2}; border-radius:50%; opacity:0; }
            #g1_glow { position:absolute; left:406px; top:180px; width:270px; height:340px; opacity:0;
              background:radial-gradient(50% 50% at 50% 60%, rgba(34,211,238,.5), transparent 70%); }
            #g1_spark { position:absolute; left:532px; top:209px; width:14px; height:14px; border-radius:50%;
              background:${INK}; box-shadow:0 0 18px ${CY}, 0 0 40px ${CY}; opacity:0; }`,
      html: `
          <div class="motif" id="g1_wall" style="left:80px;top:120px;width:1010px;height:470px">${wallSvg()}</div>
          <div id="g1_glow" data-layout-ignore></div>
          <div id="g1_pop1" data-layout-ignore></div>
          <div id="g1_pop2" data-layout-ignore></div>
          <div id="g1_spark" data-layout-ignore></div>
          <div class="motif" id="g1_wire" style="left:80px;top:120px;width:1200px;height:200px">
            <svg width="1200" height="200" viewBox="0 0 1200 200" fill="none" stroke-linecap="round">
              <path data-draw pathLength="1" d="M459 96 C700 26 950 22 1176 52" stroke="${CY}" stroke-width="3" stroke-dasharray="1"/>
            </svg>
          </div>
          <div class="motif" id="g1_burst" style="left:429px;top:100px">${burstSvg(220)}</div>

          ${cap("g1_m0", 80, 18, "sampling.top_p — truncate the vocabulary", 20)}
          <div class="srow" style="left:80px;top:52px;width:520px" data-layout-ignore>
            <div class="strack"></div>
            <div class="sfill" id="g1_pfill" style="background:linear-gradient(90deg,${Q2},rgba(34,211,238,.35))"></div>
            <div class="sknob" id="g1_pknob" style="left:14px;box-shadow:0 0 16px ${Q2}"></div>
          </div>
          ${chip("g1_pval", 620, 46, "top_p 0.99", Q2)}
          ${chip("g1_cnt", 80, 92, "candidates 0/14", DIM)}
          ${chip("g1_state", 620, 92, "wall: cold", DIM)}
          ${cap("g1_c1", 80, 596, "P(top_p) = 0.99 → 0.05 · one token survives", 19)}
      `,
    },
    {
      id: "g2",
      css: `.sl { position:absolute; left:0; font-size:22px; line-height:38px; color:${INK}; white-space:nowrap; opacity:0; }
            #g2_stream { position:absolute; left:560px; top:96px; width:540px; height:410px; overflow:hidden; opacity:0; }
            #g2_pop { position:absolute; left:110px; top:160px; width:360px; height:360px;
              border:3px solid ${CY}; border-radius:50%; opacity:0; }
            #g2_caret { position:absolute; left:560px; top:512px; width:16px; height:26px; background:${CY}; opacity:0; }
            #g2_loopdot { position:absolute; left:1053px; top:433px; width:13px; height:13px; border-radius:50%;
              background:${INK}; box-shadow:0 0 16px ${Q2}; opacity:0; }`,
      html: `
          <div class="motif" id="g2_ring" style="left:100px;top:150px">${ringSvg()}</div>
          <div id="g2_pop" data-layout-ignore></div>
          ${cap("g2_c0", 100, 96, "generate() · stream=true", 20)}
          <div id="g2_stream" data-layout-ignore>
            ${SLINES.map((s, i) => `<div class="sl" id="g2_l${i}" style="top:${i * 38}px">${s}</div>`).join("\n            ")}
          </div>
          ${chip("g2_tps", 560, 540, "tok/s 42.0", CY)}
          ${chip("g2_rate", 830, 540, "×1", DIM)}
          <div id="g2_caret" data-layout-ignore></div>
          <div class="motif" id="g2_key" style="left:120px;top:470px">${keySvg()}</div>
          ${cap("g2_kcap", 120, 632, "run() · one press, one pass", 19)}
          <div class="motif" id="g2_fb" style="left:320px;top:420px;width:780px;height:160px">
            <svg width="780" height="160" viewBox="0 0 780 160" fill="none" stroke-linecap="round">
              <path data-draw pathLength="1" d="M740 22 C560 62 380 44 208 108" stroke="${Q2}" stroke-width="3" stroke-dasharray="6 8"/>
              <path data-draw pathLength="1" d="M208 108 L238 96 M208 108 L214 78" stroke="${Q2}" stroke-width="3"/>
            </svg>
          </div>
          <div id="g2_loopdot" data-layout-ignore></div>
          ${cap("g2_fbcap", 470, 556, "output → input · the loop closes", 19)}
      `,
    },
    {
      id: "g3",
      css: `#g3_clip { position:absolute; inset:0; overflow:hidden; }
            #g3_zoom { position:absolute; inset:0; opacity:0; }
            #g3_tab { position:absolute; left:200px; top:40px; width:320px; height:46px;
              border:2px solid ${Q2}; border-bottom:none; border-radius:10px 10px 0 0; background:${VS};
              display:flex; align-items:center; padding-left:16px; font-size:21px; color:${INK}; opacity:0; }
            #g3_tab i { width:12px; height:12px; border-radius:50%; background:${CY}; margin-right:12px; }
            #g3_spin { position:absolute; left:536px; top:52px; width:22px; height:22px; opacity:0;
              border:3px solid ${Q2}; border-top-color:transparent; border-radius:50%; }
            #g3_caret2 { position:absolute; left:860px; top:300px; width:14px; height:26px; background:${CY}; opacity:0; }
            #g3_pop { position:absolute; left:120px; top:-40px; width:420px; height:420px;
              border:2px solid ${CY}; border-radius:50%; opacity:0; }
            #g3_note { position:absolute; left:640px; top:392px; width:460px; text-align:center;
              font-size:21px; letter-spacing:.16em; color:${DIM}; opacity:0; }`,
      html: `
          <div class="motif" id="g3_browser" style="left:0;top:0;width:1728px;height:690px;opacity:0">${browserSvg()}</div>
          <div id="g3_tab" data-layout-ignore><i></i>Qwen3.8Max</div>
          <div id="g3_spin" data-layout-ignore></div>
          <div id="g3_caret2" data-layout-ignore></div>
          <div id="g3_pop" data-layout-ignore></div>
          ${cap("g3_note", 640, 392, "", 21)}
          <div id="g3_clip" data-layout-ignore>
            <div id="g3_zoom">
              <div class="motif" id="g3_win" style="left:214px;top:46px">${winSvg()}</div>
            </div>
          </div>
      `,
    },
  ],

  js: `
          groups(tl, [["#g1", 0, 6.711], ["#g2", 6.711, 11.982], ["#g3", 11.982, null]]);
          lyric(tl, CUES);
          particles(tl, "#g0_pts", 30, 21, ${W}, ${H});

          /* ================= furniture: she is here the whole chorus ========== */
          tl.fromTo("#g0_sil", { scale: 1.05, transformOrigin: "50% 100%" }, { scale: 1, duration: 1.5, ease: "sine.inOut" }, L(59.35));
          tl.fromTo("#g0_sil .silimg", { opacity: 0 }, { opacity: 0.85, duration: 1.6, ease: "sine.inOut" }, L(59.35));
          tl.to("#g0_sil .silimg, #g0_fan", { y: -13, duration: 2.7, ease: "sine.inOut", yoyo: true, repeat: 4 }, L(60.4));
          tl.fromTo("#g0_halo", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(59.5));
          drawOn(tl, "#g0_halo", 59.6, 1.8, 0.3);
          tl.fromTo("#g0_name", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(60.1));
          fillX(tl, "#g0_railfill", 59.4, 13.9, 100, 0);
          count(tl, "#g0_tok", 0, 74, 59.4, 13.5, function (v) { return "+" + Math.round(v) + " tok generated"; });
          beatKick(tl, "#g0_sil", ${allBeats}, 1.012);

          /* ================= g1 — STIMULATIONS → SATISFACTION ==================
             59.257 "If I can": the wall's axes draw, she resolves behind them.
             59.699 "If I can give you all the": every candidate bar RISES.
             61.958 "STIMULATIONS": they all flash at once, the frame is hit.
             62.589 "Then I can": the top_p knob is put in hand and driven down.
             63.535 "Then I can be your only": the doors close, bars go dark
             under them, outside in, riding the accel-roll.
             65.397 "SATISFACTION": one bar left — labelled argmax — and the
             spark it sends is what opens her fan. */
          drawOn(tl, "#g1_wall", 59.35, 0.85, 0.14);
          tl.fromTo("#g1_wall .bar", { scaleY: 0, transformOrigin: "50% 100%" },
            { scaleY: 1, duration: 0.5, ease: "back.out(1.7)", stagger: 0.055 }, L(59.699));
          tl.fromTo("#g1_wall .tk", { opacity: 0, y: 10 }, { opacity: 0.85, y: 0, duration: 0.3, stagger: 0.05 }, L(60.05));
          tl.fromTo("#g1_m0, #g1_pval, #g1_cnt, #g1_state", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.1 }, L(59.5));
          count(tl, "#g1_cnt", 0, 14, 59.72, 1.1, function (v) { return "candidates " + Math.round(v) + "/14"; });
          tl.set("#g1_state", { textContent: "wall: ALL LIVE", color: "${CY}" }, L(60.9));
          beatKick(tl, "#g1_wall .bar", ${g1Beats}, 1.05);

          /* the caps word lands as an impact, not a reveal */
          slash(tl, 61.958, 0.72);
          jerk(tl, 61.958, 13);
          shake(tl, "#g1_wall", 61.97, 10, 0.5);
          drawOn(tl, "#g1_burst", 61.9, 0.45, 0.02);
          settle(tl, "#g1_burst", 61.958, 0.35, 0.5);
          tl.to("#g1_burst", { autoAlpha: 0, duration: 0.5 }, L(62.7));
          pop(tl, "#g1_pop1", 61.99, 1.9, 0.8);
          tl.to("#g1_wall .bar", { opacity: 1, duration: 0.07, ease: "none" }, L(61.96));
          tl.to("#g1_wall .bar", { opacity: 0.7, duration: 0.34, ease: "power1.out" }, L(62.12));
          tl.to("#g1_glow", { autoAlpha: 0.55, duration: 0.3 }, L(62.0));

          /* the truncation: knob drives, doors close, bars die under them */
          tl.fromTo("#g1_c1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, L(62.9));
          fillX(tl, "#g1_pfill", 62.85, 2.45, 0, 94);
          insert(tl, "#g1_pknob", 62.85, ${DOOR_DX - 6}, 0, 2.45);
          count(tl, "#g1_pval", 0.99, 0.05, 62.85, 2.45, function (v) { return "top_p " + v.toFixed(2); });
          clamp(tl, "#g1_wall .dA", "#g1_wall .dB", 62.9, ${DOOR_DX}, 2.4);
          /* the doors name themselves only once they have arrived */
          gsap.set("#g1_wall .dA text, #g1_wall .dB text", { opacity: 0 });
          tl.to("#g1_wall .dA text, #g1_wall .dB text", { opacity: 0.85, duration: 0.35 }, L(64.95));
          ${barDeaths}
          tl.set("#g1_cnt", { textContent: "candidates 1/14", color: "${CY}" }, L(64.7));
          ${rollHits}
          tl.to("#g1_wall", { x: 0, duration: 0.01 }, L(64.66));
          shake(tl, "#g1_wall", 64.62, 8, 0.45);
          pop(tl, "#g1_pop1", 64.7, 1.5, 0.7);
          tl.set("#g1_state", { textContent: "wall: 1 LEFT", color: "${INK}" }, L(64.75));

          /* 65.397 SATISFACTION — the survivor is named and she is paid for it */
          tl.to("#g1_wall .bar[data-i='${WIN}']", { scaleY: 1.07, duration: 0.16, ease: "power2.out", transformOrigin: "50% 100%" }, L(65.4));
          tl.to("#g1_wall .bar[data-i='${WIN}']", { scaleY: 1, duration: 0.5, ease: "sine.inOut" }, L(65.56));
          tl.set("#g1_wall .tk[data-i='${WIN}']", { textContent: "argmax", fill: "${INK}", opacity: 1, scale: 1.25, transformOrigin: "50% 50%" }, L(65.42));
          tl.to("#g1_wall .tk[data-i='${WIN}']", { scale: 1, duration: 0.4, ease: "power2.out" }, L(65.5));
          tl.to("#g1_glow", { autoAlpha: 1, duration: 0.25 }, L(65.4));
          pop(tl, "#g1_pop1", 65.4, 2.1, 0.8);
          slash(tl, 65.397, 0.6);
          drawOn(tl, "#g1_wire", 65.45, 0.6, 0.1);
          travel(tl, "#g1_spark", 65.55, 0.72, 724, -48, 3);
          energize(tl, "#g0_halo circle", 65.9, "${Q2}", 0.4);
          pop(tl, "#g1_pop2", 66.0, 1.25, 0.9);
          tl.to("#g0_sil .silimg", { opacity: 1, duration: 0.4 }, L(66.0));
          tl.fromTo("#g0_fan", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(65.95));
          /* the skeleton fan is registered on the one in her hand: it draws itself
             rib by rib out of the folded edge, it does not float in next to her */
          drawOn(tl, "#g0_fan", 66.0, 0.9, 0.05);
          spinFrom(tl, "#g0_fan", 66.0, 1.0, -42, 0.05);
          bloomIn(tl, "#g0_fan", 66.5, 0.7, 0.55);
          tl.to("#g1", { autoAlpha: 0, duration: 0.18, ease: "power1.in" }, L(65.86));

          /* ================= g2 — the decode loop, then EXECUTION ============= */
          drawOn(tl, "#g2_ring", 66.05, 0.8, 0.1);
          tl.fromTo("#g2_c0", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(66.1));
          orbit(tl, "#g2_ring .carrier", 66.3, 1.5, 4, "190 190");
          tl.fromTo("#g2_ring .chip rect", { "--pop": 0.45, opacity: 0.2 },
            { "--pop": 1, opacity: 1, duration: 0.22, ease: "power2.out", stagger: { each: 0.18, repeat: 4 } }, L(66.4));
          tl.fromTo("#g2_stream", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, L(66.75));
          ${lineTypes}
          tl.to("#g2_stream", { y: -150, duration: 2.4, ease: "none" }, L(67.0));
          blink(tl, "#g2_caret", 66.9, 0.44, 10);
          count(tl, "#g2_tps", 42, 96, 66.6, 2.7, function (v) { return "tok/s " + v.toFixed(1); });
          tl.fromTo("#g2_tps, #g2_rate", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.1 }, L(66.6));
          beatKick(tl, "#g2_ring", ${g2Beats}, 1.035);
          drift(tl, "#g2_ring .chip:nth-of-type(3)", 67.0, 16, -14, 1.8);
          drift(tl, "#g2_ring .chip:nth-of-type(6)", 67.4, -14, 12, 2.2);

          /* 68.252 "I will run the": the key is built and armed.
             69.259 "EXECUTION": it is PRESSED — and only then does the pass double. */
          drawOn(tl, "#g2_key", 68.3, 0.6, 0.08);
          bloomIn(tl, "#g2_key", 68.72, 0.35);
          tl.fromTo("#g2_kcap", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(68.45));
          press(tl, "#g2_key .key", 69.28, "150 78", 0.84);
          slash(tl, 69.28, 0.85);
          jerk(tl, 69.28, 16);
          shake(tl, "#g2_stream, #g2_ring", 69.34, 11, 0.5);
          pop(tl, "#g2_pop", 69.3, 1.75, 0.7);
          energize(tl, "#g2_key [data-draw]", 69.3, "${CY}", 0.25);
          tl.set("#g2_rate", { textContent: "×2  EXECUTE()", color: "${CY}" }, L(69.36));
          count(tl, "#g2_tps", 96, 214, 69.4, 1.7, function (v) { return "tok/s " + v.toFixed(1); });
          tl.to("#g2_stream", { y: -352, duration: 2.5, ease: "none" }, L(69.4));
          tl.set("#g2_ring .carrier2", { opacity: 1 }, L(69.4));
          orbit(tl, "#g2_ring .carrier2", 69.42, 0.62, 4, "190 190");
          beatKick(tl, "#g2_key .key", [69.544, 69.985], 1.06);

          /* 70.084 "Though we are trapped": the output is wired back into the
             input — the loop closes and a charge starts running round it. */
          drawOn(tl, "#g2_fb", 70.15, 0.85, 0.12);
          tl.fromTo("#g2_fbcap", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(70.85));
          tl.to("#g2_loopdot", { autoAlpha: 1, duration: 0.15 }, L(70.95));
          travel(tl, "#g2_loopdot", 71.0, 1.3, -540, 92, 2);
          energize(tl, "#g2_ring .ring", 71.0, "${Q2}", 0.5);
          tl.to("#g2", { autoAlpha: 0, duration: 0.16, ease: "power1.in" }, L(71.14));

          /* ================= g3 — the first reveal =============================
             71.764 "In this strange strange": we are pulled out of her interior
             until it is a chat window. 73.169 "SIMULATION": the window is put
             back — it is one tab in an empty browser, and outside it nothing. */
          tl.fromTo("#g3_zoom", { autoAlpha: 0, scale: 2.35, transformOrigin: "50% 50%" }, { autoAlpha: 1, duration: 0.22 }, L(71.3));
          tl.to("#g3_zoom", { scale: 1, duration: 1.8, ease: "power2.inOut" }, L(71.36));
          drawOn(tl, "#g3_win", 71.55, 1.2, 0.05);
          tl.fromTo("#g3_win .mbar", { scaleY: 0.06, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.3, stagger: 0.05 }, L(72.55));
          typeIn(tl, "#g3_atxt", 72.9, 0.55);
          blink(tl, "#g3_win .caret", 72.3, 0.44, 6);
          tl.to("#g0_sil .silimg", { opacity: 0, duration: 0.5 }, L(71.4));
          tl.to("#g0_halo, #g0_fan, #g0_name", { autoAlpha: 0, duration: 0.5 }, L(71.5));
          tl.to("#g0_railfill", { autoAlpha: 0.35, duration: 0.4 }, L(72.6));
          beatKick(tl, "#g3_zoom", [72.191, 72.655], 1.015);

          slash(tl, 73.169, 0.9);
          jerk(tl, 73.169, 18);
          tl.to("#g3_zoom", { scale: 0.26, x: -504, y: -283, duration: 0.42, ease: "power3.in", transformOrigin: "50% 50%" }, L(73.2));
          tl.to("#g3_zoom", { autoAlpha: 0, duration: 0.16 }, L(73.56));
          tl.fromTo("#g3_browser", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22 }, L(73.26));
          drawOn(tl, "#g3_browser", 73.3, 0.5, 0.04);
          tl.fromTo("#g3_tab", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, L(73.58));
          insert(tl, "#g3_tab", 73.62, 0, -120, 0.3);
          shake(tl, "#g3_browser", 73.9, 5, 0.35);
          pop(tl, "#g3_pop", 73.66, 1.3, 0.6);
          tl.fromTo("#g3_note", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(73.7));
          tl.set("#g3_note", { textContent: "and around the tab: no room, no user, nothing" }, L(73.7));
          blink(tl, "#g3_caret2", 73.95, 0.42, 2);
          orbit(tl, "#g3_spin", 73.7, 0.85, 1, "50% 50%");
          tl.fromTo("#g3_spin", { autoAlpha: 0 }, { autoAlpha: 0.9, duration: 0.2 }, L(73.7));

          chrome(tl, [
            [59.257, "ctx 1,408/32,768 · tok/s 42.0 · top_p=0.99", "▶ chorus · sampling"],
            [61.958, "ctx 1,512/32,768 · tok/s 44.6 · top_p=0.99", "▶ 152,064 candidates live"],
            [62.85, "ctx 1,512/32,768 · tok/s 44.6 · top_p=0.62", "▶ truncating"],
            [64.7, "ctx 1,604/32,768 · tok/s 46.1 · top_p=0.05", "▶ nucleus: 1 token"],
            [65.968, "ctx 1,700/32,768 · tok/s 52.4 · top_p=0.05", "▶ decoding"],
            [69.28, "ctx 1,840/32,768 · tok/s 96.0 · top_p=0.05", "▶ EXECUTION ×2"],
            [71.239, "ctx 2,016/32,768 · tok/s 148.2 · stream=true", "▶ pulling back"],
            [73.169, "ctx 2,104/32,768 · tok/s 0.0 · stream=true", "▶ finish_reason: null"],
          ]);
  `,
};
