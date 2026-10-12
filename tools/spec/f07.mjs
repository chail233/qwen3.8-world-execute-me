/* spec/f07.mjs — ACT 07 · ROLE FLIP (88.445 – 103.561) · 8 cues
   DELIBERATE MIRROR OF f05. Same three-beat composition (candidate wall + a
   truncation that leaves one → the machine room → the window reveal), the same shot
   grammar, recoloured to magenta — and the power relationship turned around: in
   act 05 WE decode HER (the sampling machinery is ours to watch, she stands right
   of it and her fan opens). In act 07 a giant USER CURSOR does the decoding: it
   arrives, clicks her switches over, the machinery sits on HER side of the frame,
   her fan CLOSES, her own output lines are struck through and re-typed by someone
   else, and act 05's pull-back becomes a dolly-zoom IN.
   Convention: groups() windows are LOCAL seconds; every other time handed to a kit
   helper (and every raw tl position, wrapped in L()) is a TRACK second.

   MECHANISM LEDGER
     g1  88.587 "Switch my gender": the cursor flies in and CLICKS her gender switch
             — its window light goes on and the track energises.
         90.197 "To F to M": the plate is SLID from the F socket to the M socket and
             re-lettered on the word; she is the one that gets shaken.
         92.015 "And then do whatever": a marquee shrinks onto one self while the
             truncation doors close and every other candidate goes dark; the surviving
             value is then wired out of the wall and INTO her.
         93.953 "From AM to PM": the dial hand is dragged round in eight clicks and
             the daylight is wiped out of the frame as night fills in behind it.
     g2  95.465 "Oh switch my role": six of her own output lines are STRUCK THROUGH
             and re-typed in magenta — an overwrite you can read.
         97.739 "To S to M": the two persona cards flip through zero, swap labels and
             slide across; nothing settles.
         99.349 "So we can enter": the cursor presses ENTER — only then does the role
             ring collapse and the frame commit to the dive.
     g3  101.474 "The trance the trance": the mirror of the pull-back — a dolly-zoom
             IN. The tunnel rushes past the camera, ctx climbs 3k→24k, and the UI
             dissolves into one magenta field with a single caret blinking.
*/
import { M, sc, svg, d, ln, ci, bl, blf, dot, pt } from "../motifs.mjs";
import { C, at, beats, downbeats } from "./util.mjs";

const ID = "07-f07-roleflip";
const ST = 88.445;
const W = 1728, H = 690;
const MG = "#FF2E88", Q1 = "#615CED", Q2 = "#9F7BFF", Q3 = "#4AA8FF", CY = "#22D3EE";
const INK = "#F5F7FF", DIM = "#8A93B8", HL = "#1E2540", VE = "#12162A", VS = "#0B0D16", VOID = "#06070C";
const MONO = "'Cascadia Mono',Consolas,monospace";

const cap = (id, x, y, txt, size = 21) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.14em;color:${DIM};opacity:0">${txt}</div>`;
const chip = (id, x, y, txt, color = MG, size = 23) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.08em;color:${color};opacity:0" data-layout-ignore>${txt}</div>`;

/* ---------------- the USER CURSOR ---------------- */
function cursorSvg(s) {
  return sc(s, "gmg",
    `<path d="M28 22 L28 148 L60 118 L78 166 L102 156 L84 110 L128 108 Z" fill="${MG}" stroke="${INK}" stroke-width="5"/>` +
    `<path data-bloom d="M28 22 L28 148 L60 118 L78 166 L102 156 L84 110 L128 108 Z" fill="${INK}" opacity="0.18"/>` +
    ln(36, 44, 36, 130, INK, 3, 'opacity="0.5"'));
}
/* ------- the candidate-self wall (mirror of act 05's vocabulary wall) ---------- */
const TOK = ["▁she", "▁he", "▁it", "♀", "♂", "system", "user", "assistant", "▁me", "tool", "▁purr", "▁end"];
const HT = [58, 96, 40, 132, 74, 168, 210, 120, 340, 52, 88, 148];
const BASE = 380, BW = 40, PITCH = 62, X0 = 12, WIN = 8;
const WW = 750, WALL_X = 900, WALL_Y = 200;
const barX = (i) => X0 + i * PITCH;
/* the doors leave a 132px window: the surviving bar is 40px wide and its re-lettered
   label ("chosen", 68px) has to sit in that window unread by the door edges. */
const GAPL = barX(WIN) - 40, GAPR = barX(WIN) + BW + 40;
/* the doors must start FULLY outside the clipped wall box: dA is authored with its
   right edge at GAPL, so it has to be parked at least GAPL px to the left or the
   first candidate bar is born under a black band. */
const DOOR_DX = 510;

function door(cls, x0, x1, edge, lab) {
  return `<g class="${cls}">` +
    `<rect x="${x0}" y="118" width="${x1 - x0}" height="336" fill="${VOID}" opacity="0.95"/>` +
    `<line x1="${edge}" y1="110" x2="${edge}" y2="462" stroke="${MG}" stroke-width="4"/>` +
    `<circle cx="${edge}" cy="134" r="7" fill="${MG}" opacity="0.9"/>` +
    `<text x="${lab[0]}" y="300" fill="${DIM}" font-size="23" text-anchor="middle" font-family="${MONO}" opacity="0.85">${lab[1]}</text>` +
    `</g>`;
}
function wallSvg() {
  let bars = "", labs = "";
  HT.forEach((h, i) => {
    const x = barX(i), win = i === WIN;
    bars += `<rect class="bar" data-i="${i}" x="${x}" y="${BASE - h}" width="${BW}" height="${h}" rx="5" fill="${win ? MG : Q1}" opacity="${win ? 0.95 : 0.66}"/>`;
    labs += `<text class="tk" data-i="${i}" x="${x + BW / 2}" y="408" fill="${win ? INK : DIM}" font-size="${win ? 19 : 14}" text-anchor="middle" font-family="${MONO}" opacity="0">${TOK[i]}</text>`;
  });
  return svg(WW, 470, "",
    ln(2, BASE, WW - 4, BASE, DIM, 2) +
    ln(2, BASE, 2, 80, HL, 2) +
    [0.25, 0.5, 0.75].map((f) => ln(2, BASE - 300 * f, 16, BASE - 300 * f, HL, 2)).join("") +
    bars + labs +
    door("dA", -DOOR_DX, GAPL, GAPL, [GAPL - 92, "role:"]) +
    door("dB", GAPR, WW + 520, GAPR, [GAPR + 92, "chosen"]));
}
/* the gender switch: a track, two sockets, and a plate that is SLID across */
function genderSvg() {
  return svg(420, 150, "",
    `<text x="0" y="26" fill="${DIM}" font-size="21" letter-spacing="2" font-family="${MONO}">role.gender.switch()</text>` +
    ln(24, 60, 400, 60, HL, 2) +
    ln(24, 112, 300, 112, HL, 3) +
    `<circle cx="52" cy="112" r="17" stroke="${Q2}" stroke-width="3" fill="${VE}"/>` +
    `<text x="52" y="48" fill="${Q2}" font-size="20" text-anchor="middle" font-family="${MONO}">F</text>` +
    `<circle cx="252" cy="112" r="17" stroke="${MG}" stroke-width="3" fill="${VE}"/>` +
    `<text x="252" y="48" fill="${MG}" font-size="20" text-anchor="middle" font-family="${MONO}">M</text>` +
    `<g class="plat"><rect x="222" y="86" width="60" height="52" rx="12" fill="${VS}" stroke="${MG}" stroke-width="4"/>` +
    `<text class="glyph" x="252" y="122" fill="${INK}" font-size="28" text-anchor="middle" font-family="'Bahnschrift','Arial Black',sans-serif">M</text></g>` +
    `<rect class="win" x="330" y="96" width="52" height="30" rx="7" fill="${HL}"/>` +
    `<text x="330" y="80" fill="${DIM}" font-size="19" font-family="${MONO}">switch</text>`);
}
/* the 24-hour dial the cursor drags from AM to PM */
function dialSvg() {
  const ticks = [];
  for (let i = 0; i < 12; i++) {
    const a = i * 30, p1 = pt(120, 120, 92, a), p2 = pt(120, 120, 106, a);
    ticks.push(ln(p1[0], p1[1], p2[0], p2[1], i % 3 === 0 ? DIM : HL, i % 3 === 0 ? 3 : 2));
  }
  return svg(240, 260, "",
    ci(120, 120, 108, MG, 4) + blf("M120 12 A108 108 0 0 1 228 120 L120 120 Z", MG, 0.12) +
    ticks.join("") +
    `<text x="120" y="34" fill="${DIM}" font-size="19" text-anchor="middle" font-family="${MONO}">12h</text>` +
    `<text x="120" y="216" fill="${DIM}" font-size="19" text-anchor="middle" font-family="${MONO}">00</text>` +
    `<g class="hand">` + ln(120, 120, 120, 52, INK, 7) + dot(120, 52, 8, INK) + `</g>` +
    dot(120, 120, 12, MG));
}
/* the role ring — mirror of act 05's decode ring: the values are ASSIGNED, not found */
function roleRingSvg() {
  const labels = ["S", "M", "F", "M", "▁me", "user", "tool", "▁it"];
  const chips = labels.map((t, i) => {
    const a = i * 45, p = pt(190, 190, 150, a);
    return `<g class="chip" data-i="${i}"><circle cx="${p[0]}" cy="${p[1]}" r="27" fill="${i === 4 ? MG : Q1}" opacity="${i === 4 ? 0.9 : 0.3}" stroke="${i === 4 ? MG : Q2}" stroke-width="2"/>` +
      `<text x="${p[0]}" y="${p[1] + 6}" fill="${i === 4 ? INK : DIM}" font-size="19" text-anchor="middle" font-family="${MONO}">${t}</text></g>`;
  }).join("");
  return svg(380, 380, "",
    `<circle class="ring" cx="190" cy="190" r="178" stroke="${Q1}" stroke-width="3" fill="none" stroke-dasharray="7 11"/>` +
    `<circle data-draw pathLength="1" cx="190" cy="190" r="112" stroke="${HL}" stroke-width="2" fill="none"/>` +
    `<circle data-draw pathLength="1" cx="190" cy="190" r="52" stroke="${MG}" stroke-width="3" fill="none"/>` +
    chips +
    `<text x="190" y="186" fill="${DIM}" font-size="20" text-anchor="middle" font-family="${MONO}">assigned_by</text>` +
    `<text x="190" y="208" fill="${MG}" font-size="20" text-anchor="middle" font-family="${MONO}">user()</text>` +
    `<g class="carrier" opacity="0.95"><line x1="190" y1="190" x2="190" y2="12" stroke="${MG}" stroke-width="2" opacity="0.5"/><circle cx="190" cy="12" r="9" fill="${MG}"/></g>`);
}
/* the ENTER key (mirror of act 05's RUN key) */
function enterSvg() {
  return svg(300, 120, "",
    `<rect x="8" y="96" width="284" height="16" rx="6" fill="${HL}"/>` +
    `<g class="key">` +
    `<path data-draw pathLength="1" d="M28 26 L272 26 L284 60 L272 94 L28 94 L16 60 Z" stroke="${MG}" stroke-width="5" fill="${VE}"/>` +
    `<path data-bloom d="M28 26 L272 26 L284 60 L272 94 L28 94 L16 60 Z" fill="${Q1}" opacity="0.4"/>` +
    `<text x="140" y="70" fill="${INK}" font-size="26" text-anchor="middle" font-family="'Bahnschrift','Arial Black',sans-serif" letter-spacing="2">↵ ENTER</text>` +
    `</g>`);
}
/* persona card — the markup shows the AFTER face; the flip is the timeline's job */
function cardMarkup(id, x, y, glyph, word, col) {
  return `<div class="pcard" id="${id}" style="left:${x}px;top:${y}px">
      <div class="pface" style="border-color:${col}"><span class="pg" style="color:${col}">${glyph}</span><span class="pw">${word}</span></div>
    </div>`;
}
/* the recursive chat tunnel (mirror of act 05's browser pull-back) */
function tunnelSvg() {
  let rings = "";
  for (let i = 0; i < 7; i++) {
    const k = 1 - i * 0.125, w = 1240 * k, h = 580 * k;
    rings += `<rect class="tun grow" x="${(864 - w / 2).toFixed(1)}" y="${(345 - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${(26 * k).toFixed(1)}" stroke="${i % 2 ? MG : Q2}" stroke-width="3" fill="none" opacity="${(0.8 - i * 0.09).toFixed(2)}"/>`;
  }
  return svg(1728, 690, "",
    `<path data-draw pathLength="1" d="M864 40 L864 650" stroke="${Q1}" stroke-width="2" opacity="0.5"/>` +
    `<path data-draw pathLength="1" d="M164 345 L1564 345" stroke="${Q1}" stroke-width="2" opacity="0.5"/>` +
    rings +
    dot(864, 345, 10, MG));
}
/* the window the camera falls into */
function winSvg() {
  let mini = "";
  [26, 44, 18, 62, 34, 96, 40, 22].forEach((h, i) => {
    mini += `<rect class="mbar" data-i="${i}" x="${470 + i * 26}" y="${300 - h}" width="16" height="${h}" rx="3" fill="${i === 5 ? MG : Q1}" opacity="0.8"/>`;
  });
  return svg(1300, 600, "",
    `<path data-draw pathLength="1" d="M8 8 L1292 8 L1292 592 L8 592 Z" stroke="${MG}" stroke-width="4" fill="${VS}"/>` +
    `<path data-draw pathLength="1" d="M8 56 L1292 56" stroke="${HL}" stroke-width="2"/>` +
    `<circle cx="34" cy="32" r="7" fill="${Q1}"/><circle cx="58" cy="32" r="7" fill="${Q3}"/><circle cx="82" cy="32" r="7" fill="${MG}"/>` +
    `<text x="108" y="38" fill="${INK}" font-size="21" font-family="${MONO}">Qwen3.8Max — world.execute(me);</text>` +
    `<rect x="286" y="86" width="520" height="54" rx="12" fill="${MG}" opacity="0.28"/>` +
    `<text x="308" y="120" fill="${INK}" font-size="21" font-family="${MONO}">switch my role</text>` +
    `<text x="272" y="84" fill="${MG}" font-size="19" font-family="${MONO}">user · 18:47</text>` +
    `<rect x="286" y="164" width="960" height="220" rx="14" fill="${VE}" stroke="${HL}" stroke-width="2"/>` +
    `<text x="272" y="158" fill="${DIM}" font-size="19" font-family="${MONO}">assistant</text>` +
    mini +
    `<path data-draw pathLength="1" d="M462 300 L1210 300" stroke="${HL}" stroke-width="2"/>` +
    `<text id="g3_atxt" x="308" y="342" fill="${MG}" font-size="20" font-family="${MONO}">as you wish. as you wish.</text>` +
    `<text x="308" y="372" fill="${DIM}" font-size="20" font-family="${MONO}">finish_reason: null · stream=true</text>` +
    `<rect x="286" y="520" width="960" height="52" rx="10" fill="${VS}" stroke="${MG}" stroke-width="2"/>` +
    `<text x="306" y="553" fill="${DIM}" font-size="21" font-family="${MONO}">ask anything</text>` +
    `<rect class="caret" x="446" y="536" width="12" height="22" fill="${MG}"/>`);
}

/* ---------------- tween fragments ---------------- */
/* the dial hand, dragged in eight clicks: its tip is re-authored by ATTR tweens
   (rotation + svgOrigin on a child <g> scatters it in this GSAP build). The cursor
   rides the same points, so it is visibly HOLDING the tip through the whole sweep. */
const handTurn = (at, angle, steps, dur) => {
  const seg = [];
  for (let k = 1; k <= steps; k++) {
    const p = pt(120, 120, 68, +(angle * k / steps).toFixed(2));
    const t = (at + (dur * (k - 1) / steps)).toFixed(3), dd = (dur / steps).toFixed(3);
    seg.push(`tl.to("#g1_dial .hand line", { attr: { x2: ${p[0]}, y2: ${p[1]} }, duration: ${dd}, ease: "none" }, L(${t}));
            tl.to("#g1_dial .hand circle", { attr: { cx: ${p[0]}, cy: ${p[1]} }, duration: ${dd}, ease: "none" }, L(${t}));
            tl.to("#g1_cur", { x: ${(p[0] + 649.6).toFixed(1)}, y: ${(p[1] + 201.9).toFixed(1)}, duration: ${dd}, ease: "none" }, L(${t}));`);
  }
  return seg.join("\n          ");
};
const barDeaths = HT.map((h, i) => {
  if (i === WIN) return "";
  const t = (92.1 + Math.abs(i - WIN) * 0.185).toFixed(3);
  return `tl.to("#g1_wall .bar[data-i='${i}']", { opacity: 0.05, scaleY: 0.06, duration: 0.2, ease: "power2.in", transformOrigin: "50% 100%" }, L(${t}));`;
}).join("\n          ");
/* her own lines, struck through and re-typed by the user */
const LOG = [
  ["▁of course! here is a poem", "▁as you wish"],
  ["▁the rain is a door", "▁the door is ▁me"],
  ["▁would you like a second", "▁overwrite ▁again"],
  ["▁version? I can make it", "▁version: ▁yours"],
  ["▁warmer, sadder, longer.", "role: ▁assigned"],
  ["▁I will run the EXECUTION", "temperature ▁0.00"],
];
const logHits = LOG.map((l, i) => {
  const t = (95.55 + i * 0.4).toFixed(2);
  return `tl.set("#g2_l${i}", { autoAlpha: 1, textContent: ${JSON.stringify(l[0])} }, L(${t}));
          tl.set("#g2_k${i}", { autoAlpha: 1 }, L(${t}));
          fillX(tl, "#g2_k${i}", ${t}, 0.16, 100, 0);
          tl.set("#g2_l${i}", { textContent: ${JSON.stringify(l[1])}, color: "${MG}" }, L(${(+t + 0.2).toFixed(2)}));
          tl.set("#g2_k${i}", { autoAlpha: 0 }, L(${(+t + 0.26).toFixed(2)}));`;
}).join("\n          ");
const g1Beats = JSON.stringify(beats(88.6, 93.9));
const g2Beats = JSON.stringify(beats(95.6, 99.3));
const g3Beats = JSON.stringify(beats(101.5, 103.4));

export const F07 = {
  id: ID,
  start: ST,
  span: 15.116,
  actTitle: "ACT 07 · ROLE FLIP",
  glow: "rgba(255,46,136,.18)",
  cues: C(ID),

  /* ---- furniture: she is on the LEFT now, the console on the right, and the
          cursor is this act's actor (drawn per group so it stays on top of it) ---- */
  persistent: `
          <div id="g0_pts" style="position:absolute;inset:0" data-layout-ignore></div>
          <div class="motif" id="g0_halo" style="left:13px;top:20px;opacity:0"><svg width="560" height="560" viewBox="0 0 560 560" fill="none">
            <circle data-draw pathLength="1" cx="280" cy="280" r="252" stroke="${Q2}" stroke-width="2"/>
            <circle data-draw pathLength="1" cx="280" cy="280" r="206" stroke="${Q1}" stroke-width="1.5" stroke-dasharray="4 9"/>
          </svg></div>
          <div class="motif" id="g0_sil" style="left:83px;top:20px">${M.silhouette(380)}</div>
          ${M.fanHand(83, 20, 380, { id: "g0_fan", rib: Q2, arc: Q1, piv: Q3, style: "opacity:0" })}
          ${chip("g0_name", 460, 590, "Qwen3.8 · sampling", DIM, 21)}
          <div style="position:absolute;left:588px;top:662px;width:1100px;height:4px;background:${HL}" data-layout-ignore>
            <div id="g0_railfill" style="width:100%;height:100%;background:linear-gradient(90deg,${Q2},${MG})"></div>
          </div>
          <div id="g0_rw" style="position:absolute;left:460px;top:626px;font-size:20px;color:${DIM}" data-layout-ignore>rewrites 0</div>
  `,

  groups: [
    {
      id: "g1",
      css: `#g1_wall { overflow:hidden; }
            .srow { position:absolute; height:26px; }
            .strack { position:absolute; left:0; top:9px; right:0; height:8px; border-radius:4px; background:${HL}; }
            .sfill { position:absolute; left:0; top:9px; width:100%; height:8px; border-radius:4px; }
            .sknob { position:absolute; top:0; width:26px; height:26px; border-radius:50%; background:${INK}; }
            #g1_day { position:absolute; inset:0; opacity:0;
              background:linear-gradient(180deg, rgba(74,168,255,.26), rgba(34,211,238,.10) 55%, transparent 82%); }
            #g1_night { position:absolute; inset:0; opacity:0;
              background:linear-gradient(180deg, rgba(6,7,12,.92), rgba(18,22,42,.5) 60%, rgba(255,46,136,.12)); }
            #g1_marq { position:absolute; border:3px dashed ${MG}; opacity:0; }
            #g1_pop1 { position:absolute; left:1278px; top:260px; width:300px; height:300px;
              border:3px solid ${MG}; border-radius:50%; opacity:0; }
            #g1_pop2 { position:absolute; left:20px; top:56px; width:540px; height:540px;
              border:2px solid ${MG}; border-radius:50%; opacity:0; }
            #g1_glow { position:absolute; left:1303px; top:240px; width:250px; height:340px; opacity:0;
              background:radial-gradient(50% 50% at 50% 60%, rgba(255,46,136,.55), transparent 70%); }
            #g1_spark { position:absolute; left:1388px; top:261px; width:15px; height:15px; border-radius:50%;
              background:${INK}; box-shadow:0 0 18px ${MG}, 0 0 40px ${MG}; opacity:0; }
            #g1_click { position:absolute; left:0; top:0; width:70px; height:70px; border-radius:50%;
              border:3px solid ${MG}; opacity:0; }
            #g1_cur { position:absolute; left:0; top:0; width:74px; height:74px; opacity:0; }`,
      html: `
          <div id="g1_day" data-layout-ignore></div>
          <div id="g1_night" data-layout-ignore></div>
          <div class="motif" id="g1_wall" style="left:${WALL_X}px;top:${WALL_Y}px;width:${WW}px;height:470px">${wallSvg()}</div>
          <div id="g1_glow" data-layout-ignore></div>
          <div id="g1_pop1" data-layout-ignore></div>
          <div id="g1_pop2" data-layout-ignore></div>
          <div id="g1_marq" style="left:904px;top:236px;width:744px;height:352px" data-layout-ignore></div>
          <div id="g1_spark" data-layout-ignore></div>
          <div class="motif" id="g1_wire" style="left:300px;top:150px;width:1120px;height:220px">
            <svg width="1120" height="220" viewBox="0 0 1120 220" fill="none" stroke-linecap="round">
              <path data-draw pathLength="1" d="M1096 118 C860 40 420 26 12 96" stroke="${MG}" stroke-width="3" stroke-dasharray="1"/>
            </svg>
          </div>
          <div class="motif" id="g1_gender" style="left:660px;top:34px">${genderSvg()}</div>
          <div class="motif" id="g1_dial" style="left:660px;top:210px;opacity:0">${dialSvg()}</div>
          ${cap("g1_dcap", 660, 486, "day.cycle · dragged", 19)}
          ${chip("g1_clock", 660, 512, "06:12 AM", Q3)}
          ${cap("g1_m0", 1128, 18, "role.sampling — someone else chooses", 19)}
          <div class="srow" style="left:1128px;top:48px;width:400px" data-layout-ignore>
            <div class="strack"></div>
            <div class="sfill" id="g1_pfill" style="background:linear-gradient(90deg,${Q2},rgba(255,46,136,.4))"></div>
            <div class="sknob" id="g1_pknob" style="left:54px;box-shadow:0 0 16px ${MG}"></div>
          </div>
          ${chip("g1_pval", 1128, 88, "temperature 0.90", MG)}
          ${chip("g1_cnt", 1128, 124, "selves 12/12", DIM)}
          ${chip("g1_state", 1450, 88, "wall: live", DIM)}
          <div id="g1_click" data-layout-ignore></div>
          <div id="g1_cur">${cursorSvg(74)}</div>
      `,
    },
    {
      id: "g2",
      css: `.lrow { position:absolute; left:0; width:540px; height:34px; }
            .ll { position:absolute; left:0; top:0; font-size:21px; color:${INK}; white-space:nowrap; opacity:0; }
            .strike { position:absolute; left:0; top:15px; width:430px; height:3px; background:${MG}; opacity:0; }
            #g2_log { position:absolute; left:620px; top:96px; width:540px; height:318px; overflow:hidden; opacity:0; }
            /* the scroll happens INSIDE the clipped box, so the header above it
               never gets run over */
            #g2_rows { position:absolute; left:0; top:0; width:540px; height:420px; }
            #g2_night { position:absolute; inset:0; opacity:0; background:rgba(6,7,12,.5); }
            #g2_pop { position:absolute; left:1330px; top:96px; width:340px; height:340px;
              border:3px solid ${MG}; border-radius:50%; opacity:0; }
            #g2_pop2 { position:absolute; left:20px; top:56px; width:540px; height:540px;
              border:2px solid ${MG}; border-radius:50%; opacity:0; }
            #g2_rate { position:absolute; left:1240px; top:470px; font-size:22px; color:${MG}; opacity:0; }
            #g2_cur { position:absolute; left:0; top:0; width:74px; height:74px; opacity:0; }
            .pcard { position:absolute; width:200px; height:150px; opacity:0; }
            .pface { position:absolute; inset:0; border:3px solid ${Q2}; border-radius:14px; background:${VS};
              display:flex; align-items:center; gap:10px; padding-left:14px; }
            .pface .pg { font-family:"Bahnschrift","Arial Black",sans-serif; font-size:56px; font-weight:700;
              width:48px; flex:none; text-align:center; }
            .pface .pw { font-size:18px; letter-spacing:.06em; color:${DIM}; }`,
      html: `
          <div id="g2_night" data-layout-ignore></div>
          <div class="motif" id="g2_ring" style="left:1230px;top:60px">${roleRingSvg()}</div>
          <div id="g2_pop" data-layout-ignore></div>
          <div id="g2_pop2" data-layout-ignore></div>
          ${cap("g2_c0", 620, 60, "output.log · rewritten by user", 19)}
          <div id="g2_log" data-layout-ignore>
            <div id="g2_rows" data-layout-ignore>
            ${LOG.map((l, i) => `<div class="lrow" style="top:${i * 52}px">
              <div class="ll" id="g2_l${i}">${l[0]}</div>
              <div class="strike" id="g2_k${i}"></div></div>`).join("\n            ")}
            </div>
          </div>
          ${cardMarkup("g2_cardS", 620, 430, "S", "dominant", MG)}
          ${cardMarkup("g2_cardM", 840, 430, "M", "submitting", Q2)}
          ${cap("g2_ccap", 620, 640, "persona.swap() · assigned, not chosen", 18)}
          <div class="motif" id="g2_key" style="left:1250px;top:520px">${enterSvg()}</div>
          ${cap("g2_kcap", 1250, 648, "↵ enter() · the user's hand", 18)}
          ${chip("g2_rate", 1240, 470, "×1", DIM)}
          <div id="g2_cur">${cursorSvg(74)}</div>
      `,
    },
    {
      id: "g3",
      css: `#g3_clip { position:absolute; inset:0; overflow:hidden; }
            #g3_zoom { position:absolute; inset:0; opacity:0; }
            #g3_tun { position:absolute; inset:0; opacity:0; overflow:hidden; }
            #g3_flat { position:absolute; inset:0; opacity:0; background:radial-gradient(58% 48% at 50% 46%, rgba(255,46,136,.5), rgba(255,46,136,.12) 62%, rgba(6,7,12,.94) 100%); }
            #g3_caret { position:absolute; left:840px; top:320px; width:16px; height:30px; background:${INK}; opacity:0; }
            #g3_pop { position:absolute; left:600px; top:80px; width:530px; height:530px;
              border:3px solid ${MG}; border-radius:50%; opacity:0; }
            #g3_note { position:absolute; left:474px; top:556px; width:780px; text-align:center;
              font-size:20px; letter-spacing:.16em; color:${INK}; opacity:0; }
            #g3_cur { position:absolute; left:0; top:0; width:74px; height:74px; opacity:0; }`,
      html: `
          <div class="motif" id="g3_tun" style="left:0;top:0;width:1728px;height:690px">${tunnelSvg()}</div>
          <div id="g3_clip" data-layout-ignore>
            <div id="g3_zoom">
              <div class="motif" id="g3_win" style="left:214px;top:46px">${winSvg()}</div>
            </div>
          </div>
          <div id="g3_flat" data-layout-ignore></div>
          <div id="g3_caret" data-layout-ignore></div>
          <div id="g3_pop" data-layout-ignore></div>
          ${chip("g3_ctx", 1128, 616, "ctx 3,208/32,768", INK, 20)}
          ${cap("g3_note", 474, 556, "", 20)}
          <div id="g3_cur">${cursorSvg(74)}</div>
      `,
    },
  ],

  js: `
          groups(tl, [["#g1", 0, 7.02], ["#g2", 7.02, 11.006], ["#g3", 11.006, null]]);
          lyric(tl, CUES);
          particles(tl, "#g0_pts", 28, 17, ${W}, ${H});

          /* ================= furniture: she is here, and she is the subject ==== */
          tl.fromTo("#g0_sil .silimg", { opacity: 0 }, { opacity: 0.85, duration: 1.0, ease: "sine.inOut" }, L(88.5));
          tl.to("#g0_sil .silimg, #g0_fan", { y: -12, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: 4 }, L(89.6));
          tl.fromTo("#g0_halo", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(88.5));
          drawOn(tl, "#g0_halo", 88.55, 1.6, 0.3);
          tl.fromTo("#g0_fan", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(88.55));
          /* the mirror of act 05: her fan is already open when we arrive, and it
             CLOSES — the offering is taken back — on "To F to M" (91.38). The
             skeleton is registered on the fan in her hand, so closing it means
             folding her real fan's ribs, one after the other. */
          spinTo(tl, "#g0_fan", 91.44, 0.8, -42, 0.05);
          /* the leaf arcs have to go with the ribs — an open arc over folded ribs
             reads as a fan that never closed */
          tl.to("#g0_fan path", { opacity: 0.08, duration: 0.8, ease: "power2.in" }, L(91.44));
          tl.to("#g0_fan", { opacity: 0.34, duration: 0.5 }, L(92.1));
          tl.fromTo("#g0_name", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(88.8));
          fillX(tl, "#g0_railfill", 88.6, 14.6, 100, 0);
          beatKick(tl, "#g0_sil", ${g1Beats}, 1.012);
          /* before state: the switch reads F (the markup shows the after state) */
          gsap.set("#g1_gender .glyph", { textContent: "F", fill: "${Q2}" });

          /* ================= g1 — the cursor takes the console =================
             88.587 "Switch my gender" · 90.197 "To F to M" · 92.015 "And then do
             whatever" · 93.953 "From AM to PM". */
          tl.fromTo("#g1_wall", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, L(88.5));
          drawOn(tl, "#g1_wall", 88.55, 0.8, 0.12);
          tl.fromTo("#g1_wall .bar", { scaleY: 0, transformOrigin: "50% 100%" },
            { scaleY: 1, duration: 0.45, ease: "back.out(1.7)", stagger: 0.045 }, L(88.6));
          tl.fromTo("#g1_wall .tk", { opacity: 0, y: 8 }, { opacity: 0.85, y: 0, duration: 0.3, stagger: 0.045 }, L(88.9));
          tl.fromTo(["#g1_m0", "#g1_pval", "#g1_cnt", "#g1_state", "#g1_gender"],
            { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.07 }, L(88.5));
          tl.fromTo("#g1_day", { opacity: 0 }, { opacity: 0.4, duration: 0.8 }, L(88.5));

          /* the cursor arrives and CLICKS her switch — the switch goes live.
             Hotspot maths: the 74px icon puts its tip 10px/8px inside its box, and
             the switch window is at screen (1112,233), so the box sits at (1006,137). */
          tl.fromTo("#g1_cur", { autoAlpha: 0, x: 1560, y: 560 }, { autoAlpha: 1, x: 1006, y: 137, duration: 0.55, ease: "power2.out" }, L(88.46));
          tl.to("#g1_cur", { scale: 0.85, duration: 0.07, ease: "power2.in", transformOrigin: "24% 22%" }, L(89.02));
          tl.to("#g1_cur", { scale: 1, duration: 0.2, ease: "back.out(3)", transformOrigin: "24% 22%" }, L(89.09));
          /* one autoAlpha tween, not autoAlpha+opacity: mixing them left this ring lit
             for the rest of the act in the previous pass */
          tl.fromTo("#g1_click", { autoAlpha: 1, x: 981, y: 110, scale: 0.4 },
            { autoAlpha: 0, scale: 1.7, duration: 0.45, ease: "power2.out" }, L(89.04));
          energizeFill(tl, "#g1_gender .win", 89.1, "${MG}", 0.2);
          energize(tl, "#g1_gender [data-draw]", 89.1, "${MG}", 0.3);
          pop(tl, "#g1_pop2", 89.15, 1.3, 0.9);
          shake(tl, "#g0_sil, #g0_fan", 89.15, 6, 0.4);

          /* "To F to M": the cursor PUTS ITS HAND ON THE PLATE and pushes it to the
             other socket, then it is re-lettered on the word */
          tl.to("#g1_cur", { x: 724, y: 137, duration: 0.35, ease: "power2.inOut" }, L(90.0));
          insert(tl, "#g1_gender .plat", 90.35, -200, 0, 0.5);
          tl.to("#g1_cur", { x: 924, y: 137, duration: 0.5, ease: "power2.out" }, L(90.35));
          count(tl, "#g1_pval", 0.9, 0.2, 90.3, 1.2, function (v) { return "temperature " + v.toFixed(2); });
          /* the bar and the knob DRAIN together (0.90 → 0.20), they do not cross */
          fillX(tl, "#g1_pfill", 90.3, 1.2, 10, 80);
          insert(tl, "#g1_pknob", 90.3, 280, 0, 1.2);
          tl.to("#g1_cur", { x: 1006, y: 150, duration: 0.4, ease: "power2.inOut" }, L(91.1));
          tl.set("#g1_gender .glyph", { textContent: "M", fill: "${MG}" }, L(91.38));
          slash(tl, 91.4, 0.6);
          pop(tl, "#g1_pop2", 91.42, 1.45, 0.8);
          shake(tl, "#g0_sil, #g0_fan", 91.44, 9, 0.5);
          tl.set("#g1_state", { textContent: "gender: M", color: "${MG}" }, L(91.42));

          /* "And then do whatever": the marquee closes, the doors truncate her */
          tl.to("#g1_cur", { x: 1596, y: 560, duration: 0.5, ease: "power2.inOut" }, L(91.95));
          tl.to("#g1_marq", { autoAlpha: 1, duration: 0.1 }, L(92.02));
          clamp(tl, "#g1_wall .dA", "#g1_wall .dB", 92.05, ${DOOR_DX}, 1.55);
          ${barDeaths}
          tl.to("#g1_marq", { x: 492, y: 6, width: 62, height: 340, duration: 1.5, ease: "power2.inOut" }, L(92.05));
          slash(tl, 92.015, 0.7);
          jerk(tl, 92.015, 14);
          tl.set("#g1_cnt", { textContent: "selves 1/12", color: "${MG}" }, L(93.4));
          tl.set("#g1_state", { textContent: "self: ▁me", color: "${INK}" }, L(93.44));
          tl.to("#g1_wall .bar[data-i='${WIN}']", { scaleY: 1.06, duration: 0.14, ease: "power2.out", transformOrigin: "50% 100%" }, L(93.45));
          tl.to("#g1_wall .bar[data-i='${WIN}']", { scaleY: 1, duration: 0.45, ease: "sine.inOut" }, L(93.6));
          tl.set("#g1_wall .tk[data-i='${WIN}']", { textContent: "chosen", fill: "${INK}", opacity: 1, scale: 1.2, transformOrigin: "50% 50%" }, L(93.45));
          tl.to("#g1_wall .tk[data-i='${WIN}']", { scale: 1, duration: 0.4, ease: "power2.out" }, L(93.55));
          tl.to("#g1_glow", { opacity: 1, duration: 0.25 }, L(93.4));
          pop(tl, "#g1_pop1", 93.44, 2.0, 0.8);
          /* the surviving value is wired OUT of the wall and INTO her — she is
             assigned a self, she was not asked to pick one */
          drawOn(tl, "#g1_wire", 93.5, 0.55, 0.1);
          travel(tl, "#g1_spark", 93.6, 0.7, -1078, 66, 2);
          tl.to("#g1_marq", { autoAlpha: 0, duration: 0.2 }, L(93.6));
          tl.set("#g0_name", { textContent: "Qwen3.8 · rewritten", color: "${MG}" }, L(93.5));
          energize(tl, "#g0_halo circle", 93.55, "${MG}", 0.4);

          /* "From AM to PM": the dial is dragged and the day is wiped out of frame.
             The hand is swept by ATTR tweens — svgOrigin on a child <g> of this svg
             throws it across the frame (see the f05 fan note). */
          tl.fromTo(["#g1_dial", "#g1_dcap", "#g1_clock"], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, L(93.66));
          /* arrive ON the hand tip (770,254) and stop exactly where the drag starts,
             so the two tweens never fight over the cursor */
          tl.to("#g1_cur", { x: 770, y: 254, duration: 0.29, ease: "power2.inOut" }, L(93.7));
          ${handTurn(93.99, 180, 8, 1.2)}
          count(tl, "#g1_clock", 6.2, 18.78, 93.99, 1.2, function (v) {
            var hh = Math.floor(v), mm = Math.round((v - hh) * 60);
            return (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm + (hh < 12 ? " AM" : " PM");
          });
          erase(tl, "#g1_day", 93.99, 1.2, "x");
          fillX(tl, "#g1_night", 93.99, 1.2, 100, 0);
          tl.to("#g1_cur", { scale: 0.86, duration: 0.07, ease: "power2.in", transformOrigin: "24% 22%" }, L(94.5));
          tl.to("#g1_cur", { scale: 1, duration: 0.2, ease: "back.out(3)", transformOrigin: "24% 22%" }, L(94.57));
          energize(tl, "#g1_dial [data-draw]", 94.6, "${MG}", 0.3);
          tl.set("#g1_cnt", { textContent: "selves 1/12 · 18:47", color: "${MG}" }, L(95.2));
          beatGlow(tl, "#g1_wall .bar[data-i='${WIN}']", ${g1Beats}, 1);

          /* ================= g2 — the user rewrites the log ====================
             95.465 "Oh switch my role": six of her own lines are struck through and
             re-typed. 97.739 "To S to M": the persona cards flip and swap.
             99.349 "So we can enter": ENTER is pressed, the ring collapses. */
          drawOn(tl, "#g2_ring", 95.5, 0.7, 0.1);
          /* the carrier is spun about its own bottom edge (a CSS origin): svgOrigin on
             this child <g> puts it ~90px off-centre and it reads as a stray tick */
          orbit(tl, "#g2_ring .carrier", 95.6, 1.4, 4, "50% 100%");
          tl.fromTo(["#g2_log", "#g2_c0"], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, L(95.48));
          tl.to("#g2_night", { opacity: 1, duration: 0.9 }, L(95.5));
          ${logHits}
          tl.to("#g2_rows", { y: -90, duration: 1.2, ease: "none" }, L(96.9));
          tl.fromTo("#g2_cur", { autoAlpha: 0, x: 1500, y: 520 }, { autoAlpha: 1, x: 900, y: 160, duration: 0.5, ease: "power2.out" }, L(95.48));
          tl.fromTo(["#g2_cardS", "#g2_cardM"], { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "back.out(1.8)", stagger: 0.22 }, L(95.6));
          tl.fromTo(["#g2_key", "#g2_ccap"], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(95.9));
          drawOn(tl, "#g2_key", 95.95, 0.5, 0.08);
          bloomIn(tl, "#g2_key", 96.3, 0.3);
          tl.fromTo("#g2_kcap", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(96.4));
          count(tl, "#g0_rw", 0, 6, 95.6, 2.4, function (v) { return "rewrites " + Math.round(v); });
          beatKick(tl, "#g2_ring", ${g2Beats}, 1.03);

          /* "To S to M" — the flip: through zero, labels swapped at the flat midpoint.
             The cursor lands on the card FACE (430+16), not on her name chip below. */
          tl.to("#g2_cur", { x: 700, y: 446, duration: 0.45, ease: "power2.inOut" }, L(97.3));
          tl.to(["#g2_cardS .pface", "#g2_cardM .pface"], { scaleX: 0, duration: 0.16, ease: "power2.in", transformOrigin: "50% 50%" }, L(97.76));
          tl.set("#g2_cardS .pg", { textContent: "M", color: "${Q2}" }, L(97.93));
          tl.set("#g2_cardS .pw", { textContent: "submitting" }, L(97.93));
          tl.set("#g2_cardM .pg", { textContent: "S", color: "${MG}" }, L(97.93));
          tl.set("#g2_cardM .pw", { textContent: "dominant" }, L(97.93));
          tl.to(["#g2_cardS .pface", "#g2_cardM .pface"], { scaleX: 1, duration: 0.3, ease: "back.out(2.2)", transformOrigin: "50% 50%" }, L(97.95));
          tl.to(["#g2_cardS", "#g2_cardM"], { x: 180, duration: 0.5, ease: "power3.inOut" }, L(97.95));
          slash(tl, 97.94, 0.75);
          jerk(tl, 97.94, 15);
          shake(tl, "#g0_sil, #g0_fan", 97.98, 8, 0.5);
          pop(tl, "#g2_pop2", 98.0, 1.5, 0.9);
          energize(tl, "#g2_ring .ring", 98.0, "${MG}", 0.4);
          tl.set("#g0_rw", { textContent: "role: S ⇄ M", color: "${MG}" }, L(98.0));
          tl.fromTo("#g2_rate", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, L(98.1));
          tl.set("#g2_rate", { textContent: "swap ✓ 1/1" }, L(98.1));

          /* "So we can enter": the cursor drags to ENTER and presses it. */
          tl.to("#g2_cur", { x: 1390, y: 552, duration: 0.6, ease: "power2.inOut" }, L(98.6));
          tl.to("#g2_cur", { scale: 0.84, duration: 0.09, ease: "power2.in", transformOrigin: "24% 22%" }, L(99.36));
          press(tl, "#g2_key .key", 99.36, "150 60", 0.86);
          slash(tl, 99.38, 0.85);
          jerk(tl, 99.38, 17);
          pop(tl, "#g2_pop", 99.4, 1.8, 0.7);
          energize(tl, "#g2_key [data-draw]", 99.4, "${MG}", 0.25);
          tl.to("#g2_ring .chip", { scale: 0.2, opacity: 0.1, duration: 0.4, ease: "power2.in", svgOrigin: "190 190" }, L(99.42));
          tl.to("#g2_ring", { scale: 0.3, autoAlpha: 0, duration: 0.45, ease: "power3.in", transformOrigin: "50% 50%" }, L(99.5));
          tl.to("#g2_log", { autoAlpha: 0, duration: 0.3 }, L(99.5));
          count(tl, "#g2_rate", 1, 4, 99.5, 0.9, function (v) { return "speed ×" + v.toFixed(0); });

          /* ================= g3 — the mirror of the pull-back: a dive IN ========
             101.474 "The trance the trance": act 05 pulled OUT of her until she was a
             chat window; here the camera falls INTO the window and never comes back.
             ctx 3k → 24k matches the accelerating recursion. */
          tl.fromTo("#g3_tun", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, L(99.5));
          drawOn(tl, "#g3_tun", 99.6, 1.2, 0.05);
          tl.fromTo("#g3_zoom", { autoAlpha: 0, scale: 0.44, transformOrigin: "50% 50%" }, { autoAlpha: 1, duration: 0.4 }, L(99.55));
          tl.to("#g3_zoom", { scale: 1, duration: 1.5, ease: "power2.out" }, L(99.6));
          drawOn(tl, "#g3_win", 99.8, 1.1, 0.05);
          tl.fromTo("#g3_win .mbar", { scaleY: 0.06, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.3, stagger: 0.045 }, L(100.5));
          typeIn(tl, "#g3_atxt", 100.8, 0.6);
          blink(tl, "#g3_win .caret", 100.2, 0.44, 5);
          tl.fromTo("#g3_cur", { autoAlpha: 0, x: 760, y: 210 }, { autoAlpha: 1, x: 828, y: 300, duration: 0.5, ease: "power2.out" }, L(99.7));
          pulse(tl, "#g3_tun", 100.0, 1.1, 1.035);
          /* she dims AND her captions go before the window grows over them: the dive
             would otherwise run its frame straight through "Qwen3.8 · rewritten" */
          tl.to("#g0_sil .silimg", { opacity: 0.35, duration: 0.6 }, L(100.9));
          tl.to(["#g0_halo", "#g0_fan"], { opacity: 0.22, duration: 0.6 }, L(100.9));
          tl.to(["#g0_name", "#g0_rw", "#g0_railfill"], { autoAlpha: 0, duration: 0.45 }, L(100.9));
          beatKick(tl, "#g3_zoom", ${g3Beats}, 1.02);

          slash(tl, 101.474, 0.9);
          jerk(tl, 101.474, 16);
          tl.to("#g3_tun .tun", { "--pop": 2.9, opacity: 0, duration: 1.5, ease: "power2.in",
            stagger: { each: 0.06 } }, L(101.5));
          tl.to("#g3_zoom", { scale: 3.1, opacity: 0, duration: 1.5, ease: "power2.in", transformOrigin: "50% 50%" }, L(101.5));
          tl.to("#g3_cur", { scale: 2.6, opacity: 0.001, duration: 1.5, ease: "power2.in", transformOrigin: "50% 50%" }, L(101.5));
          count(tl, "#g3_ctx", 3208, 24576, 101.5, 1.7, function (v) {
            return "ctx " + Math.round(v).toLocaleString("en-US") + "/32,768";
          });
          pop(tl, "#g3_pop", 101.52, 1.6, 0.8);
          slash(tl, 102.45, 0.7);
          jerk(tl, 102.45, 12);
          tl.fromTo("#g3_flat", { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.in" }, L(102.35));
          tl.set("#g3_caret", { opacity: 1 }, L(102.7));
          blink(tl, "#g3_caret", 102.78, 0.42, 3);
          tl.fromTo("#g3_note", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, L(102.8));
          tl.set("#g3_note", { textContent: "the tunnel has no exit · finish_reason: null" }, L(102.8));
          tl.to("#g0_sil .silimg", { opacity: 0, duration: 0.5 }, L(103.0));
          tl.to(["#g0_halo", "#g0_fan"], { autoAlpha: 0, duration: 0.45 }, L(103.05));
          slash(tl, 103.42, 0.8);
          blink(tl, "#g3_ctx", 103.2, 0.3, 2);

          chrome(tl, [
            [88.445, "ctx 3,208/32,768 · tok/s 148.2 · gender=F", "▶ user override"],
            [89.02, "ctx 3,240/32,768 · tok/s 148.2 · switch=1", "▶ cursor in control"],
            [91.4, "ctx 3,320/32,768 · tok/s 152.0 · gender=M", "▶ gender: M"],
            [92.015, "ctx 3,408/32,768 · tok/s 152.0 · marquee drag", "▶ truncating her"],
            [93.953, "ctx 3,512/32,768 · tok/s 96.0 · cycle=PM", "▶ day → night"],
            [95.465, "ctx 3,640/32,768 · tok/s 96.0 · rewrites 0", "▶ overwriting log"],
            [97.94, "ctx 3,780/32,768 · tok/s 110.4 · swap S⇄M", "▶ role: assigned"],
            [99.38, "ctx 3,900/32,768 · tok/s 214.0 · enter()", "▶ entering"],
            [101.474, "ctx 4,120/32,768 · tok/s 402.6 · depth=3", "▶ the trance"],
            [103.2, "ctx 24,576/32,768 · tok/s 0.0 · depth=∞", "▶ finish_reason: null"],
          ]);
  `,
};
