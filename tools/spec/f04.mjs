/* spec/f04.mjs — ACT 04 · CURRENT (44.002 – 59.257)
   The groove returns: eight lyric lines, every one played by a real conductor /
   circuit mechanism that changes state and stays changed (base palette; green is
   reserved, so live current reads as cyan #22D3EE — no magenta/amber here):
     g1  Switch my current  → a breaker is really THROWN, the wire energizes and
                             current starts down the rail.
         To AC to DC        → a waveform selector flips: the AC sine flattens to a
                             straight DC line.
         And then blind…    → an eye's two lids SLAM shut over the iris.
         So dizzy           → a spiral spins up inside the closed eye + frame shake.
     g2  Oh we can travel   → a charge runs the whole rail, lighting bulbs in its
                             wake.
         To A.D to B.C      → a dial needle runs BACKWARDS while the position_ids
                             counter counts down (time reversed).
         And we can unite   → a plug is INSERTED home into a socket, closing the
                             circuit and tying her halo into it.
         So deeply…         → the bulb IGNITES and the rail fills deeply.
   Convention: groups() windows LOCAL; kit-helper times TRACK. Raw tweens wrap L(). */
import { M, sc, svg, ln, ci, bl, dot } from "../motifs.mjs";
import { PAL as P } from "../kit.mjs";
import { C, at, beats, downbeats } from "./util.mjs";

const ID = "04-f04-current";
const S = 44.002;

const cap = (id, x, y, txt, size = 20) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.14em;color:#8A93B8;opacity:0">${txt}</div>`;
const chip = (id, x, y, txt, color = P.DA) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:22px;letter-spacing:.1em;color:${color};opacity:0" data-layout-ignore>${txt}</div>`;
function pp(str, stroke, w = 4, cls = "") {
  return `<path class="${cls}" data-draw pathLength="1" d="${str}" stroke="${stroke}" stroke-width="${w}"/>`;
}

/* --- AC waveform box (drawn in, then flattened to DC) --- */
function acBox() {
  const w = 300, mid = 90; let s = `M8 ${mid}`;
  for (let x = 8; x <= w - 8; x += 8) s += ` L${x} ${(mid - 52 * Math.sin((x - 8) / 26)).toFixed(1)}`;
  return svg(w, 180, "gq3",
    `<line class="live" data-draw pathLength="1" x1="8" y1="${mid}" x2="${w - 8}" y2="${mid}" stroke="#1E2540" stroke-width="2"/>` +
    pp(s, P.DA, 4, "ac"));
}
/* --- DC straight line box, same footprint --- */
function dcBox() {
  const w = 300, mid = 90;
  return svg(w, 180, "gq2",
    `<line class="live" data-draw pathLength="1" x1="8" y1="${mid - 52}" x2="${w - 8}" y2="${mid - 52}" stroke="${P.Q3}" stroke-width="6"/>` +
    `<line class="live" data-draw pathLength="1" x1="8" y1="${mid}" x2="${w - 8}" y2="${mid}" stroke="#1E2540" stroke-width="2"/>`);
}
/* --- spiral (dizzy) --- */
function spiral() {
  let s = "M110 110", r = 6;
  for (let a = 0; a <= 1080; a += 15) { const rad = a * Math.PI / 180; r = 6 + a * 0.092; s += ` L${(110 + r * Math.cos(rad)).toFixed(1)} ${(110 + r * Math.sin(rad)).toFixed(1)}`; }
  return sc(220, "gq2", pp(s, P.Q2, 4) + dot(110, 110, 5, P.DA));
}
/* --- dial with a needle the frame spins backwards --- */
function dial(s) {
  return sc(s, "gq3",
    ci(100, 100, 72, P.Q3, 4) +
    `<path d="M100 28 A72 72 0 0 1 172 100" stroke="${P.HL}" stroke-width="2" fill="none"/>` +
    `<g class="needle">` + ln(100, 100, 100, 44, P.INK, 6) + dot(100, 44, 6, P.DA) + `</g>` +
    dot(100, 100, 8, P.Q2));
}
/* --- plug + socket (base palette, uniting) ---
   The two share a coordinate system (both 300px boxes, viewBox 0..200), so the
   prong tips and the hole centres are the SAME numbers: the plug really lands in
   the holes. Holes are a vertical pair (the prongs point right, one above the
   other); a horizontal pair could never be met by them. */
function socket(s) {
  return sc(s, "gq2",
    `<rect x="40" y="44" width="120" height="112" rx="10" fill="${P.VE}" stroke="${P.Q2}" stroke-width="5"/>` +
    `<rect class="slotglow" x="48" y="62" width="32" height="76" rx="8" fill="${P.DA}" opacity="0"/>` +
    ci(64, 78, 12, P.HL, 4) + ci(64, 122, 12, P.HL, 4));
}
const PRONG_Y = [78, 122], PRONG_TIP = 176;
function plug(s) {
  return sc(s, "gq3",
    `<rect x="40" y="52" width="96" height="96" rx="10" fill="${P.VE}" stroke="${P.Q3}" stroke-width="5"/>` +
    PRONG_Y.map((y) => ln(136, y, PRONG_TIP, y, P.INK, 8)).join("") +
    `<path d="M88 52 C88 30 112 22 150 18" stroke="${P.DA}" stroke-width="4" fill="none"/>` +
    dot(88, 100, 6, P.Q3));
}
/* --- bulb / LED that ignites --- */
function bulb(s) {
  return sc(s, "gda",
    `<g class="halo">` + ci(100, 92, 66, P.DA, 3, 'stroke-dasharray="1"') + `</g>` +
    `<path d="M100 30 A46 46 0 0 1 146 76 C146 104 122 116 120 138 L80 138 C78 116 54 104 54 76 A46 46 0 0 1 100 30 Z" fill="${P.VE}" stroke="${P.DA}" stroke-width="4"/>` +
    pp("M86 96 L96 72 L104 100 L114 74", P.HL, 4, "filament") +
    `<path d="M82 138 L118 138 L114 162 L86 162 Z" fill="${P.VE}" stroke="${P.Q3}" stroke-width="4"/>` +
    `<path d="M86 150 H114 M86 158 H114" stroke="${P.Q3}" stroke-width="3"/>`);
}
/* --- the main conductor rail with bulbs along it --- */
function rail() {
  const w = 1220; let bulbs = "";
  for (let i = 0; i < 7; i++) bulbs += `<circle class="bulb" data-i="${i}" cx="${70 + i * 182}" cy="16" r="10" fill="#1E2540" stroke="${P.HL}" stroke-width="2" opacity="0"/>`;
  return svg(w, 34, "gq1",
    `<line x1="10" y1="16" x2="${w - 10}" y2="16" stroke="#1E2540" stroke-width="7"/>` +
    `<rect class="fill" x="10" y="11" width="${w - 20}" height="10" rx="5" fill="${P.DA}" opacity="0.9"/>` +
    `<line class="live" data-draw pathLength="1" x1="10" y1="16" x2="${w - 10}" y2="16" stroke="${P.Q1}" stroke-width="3" opacity=".5"/>` +
    bulbs);
}
function haloRing(s) {
  return sc(s, "gq2", ci(100, 100, 84, P.Q1, 2.5) + ci(100, 100, 66, P.DA, 2, 'stroke-dasharray="1"'));
}

const DB = downbeats(44.002, 59.257);
const BTRIP = DB.slice(0, 6);

export const F04 = {
  id: ID,
  start: S,
  span: 15.255,
  actTitle: "ACT 04 · CURRENT",
  glow: "rgba(97,92,237,.15)",
  cues: C(ID),

  /* the conductor rail + she standing on it, alive the whole act */
  persistent: `
          <div id="g0_pts" style="position:absolute;inset:0" data-layout-ignore></div>
          <div class="motif" id="g0_rail" style="left:60px;top:556px">${rail()}</div>
          <div class="busdot" id="g0_spark" data-layout-ignore></div>
          <div class="motif" id="g0_halos" style="left:1389px;top:69px">${haloRing(198)}</div>
          <div class="motif" id="g0_sil" style="left:1308px;top:96px">${M.silhouette(360)}</div>
          ${chip("g0_amp", 60, 596, "I = 0.0 A", P.DIM)}
          <div style="position:absolute;left:40px;top:624px;width:1560px;height:3px;background:#1E2540" data-layout-ignore>
            <div id="g0_fill" style="width:100%;height:100%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#615CED,#22D3EE)"></div>
          </div>
  `,

  groups: [
    {
      id: "g1",
      css: `#g1_ac { transform-origin: 0 90px; }
            .busdot { position:absolute; left:64px; top:560px; width:15px; height:15px; border-radius:50%;
              background:#22D3EE; box-shadow:0 0 18px #22D3EE, 0 0 40px rgba(34,211,238,.6); opacity:0; }`,
      html: `
          ${at(90, 150, M.breaker(300), 'id="g1_brk"')}
          ${chip("g1_sw", 130, 470, "SW: OPEN", P.DIM)}
          ${cap("g1_c1", 120, 434, "throw.breaker()")}

          <div class="motif" id="g1_ac" style="left:520px;top:170px">${acBox()}</div>
          <div class="motif" id="g1_dc" style="left:520px;top:170px">${dcBox()}</div>
          <div class="motif" id="g1_sel" style="left:600px;top:110px">
            <svg width="140" height="80" viewBox="0 0 140 80" fill="none" stroke-linecap="round">
              <line x1="20" y1="60" x2="120" y2="60" stroke="#1E2540" stroke-width="4"/>
              <circle cx="24" cy="60" r="7" fill="${P.DA}"/>
              <g class="lever"><line x1="24" y1="60" x2="70" y2="18" stroke="${P.INK}" stroke-width="7"/></g>
              <circle cx="116" cy="60" r="7" fill="${P.HL}"/>
            </svg>
          </div>
          ${cap("g1_c2", 520, 60, "AC  ⟷  DC")}
          ${chip("g1_cur", 540, 350, "current: AC", P.DA)}

          <div class="motif" id="g1_eye" style="left:800px;top:160px">${M.eye(260)}</div>
          <div class="motif" id="g1_spiral" style="left:820px;top:180px">${spiral()}</div>
          ${cap("g1_c3", 800, 434, "vision.mask = dropout(p)")}
      `,
    },
    {
      id: "g2",
      css: `.busdot { position:absolute; left:64px; top:560px; width:15px; height:15px; border-radius:50%;
              background:#22D3EE; box-shadow:0 0 18px #22D3EE, 0 0 40px rgba(34,211,238,.6); opacity:0; }`,
      html: `
          ${at(120, 150, dial(300), 'id="g2_dial"')}
          ${chip("g2_pos", 150, 470, "pos_id 8192", P.Q2)}
          ${cap("g2_c1", 130, 434, "position_ids.rewind()")}

          ${at(640, 170, socket(300), 'id="g2_sock"')}
          ${at(472, 170, plug(300), 'id="g2_plug"')}
          ${chip("g2_link", 660, 470, "link: open", P.DIM)}
          ${cap("g2_c2", 660, 508, "circuit.close()")}

          ${at(980, 130, bulb(300), 'id="g2_bulb"')}
          <div id="g2_pop" style="position:absolute;left:1000px;top:150px;width:260px;height:260px;border:3px solid #22D3EE;border-radius:50%;opacity:0" data-layout-ignore></div>
          ${cap("g2_c3", 1000, 434, "load.energise()")}
      `,
    },
  ],

  js: `
          groups(tl, [["#g1", 0, 7.361], ["#g2", 7.361, null]]);
          lyric(tl, CUES);
          particles(tl, "#g0_pts", 28, 13, 1728, 690);

          /* ---- she carries the charge the whole act ---- */
          tl.to("#g0_sil .silimg", { opacity: 1, duration: 1.0, ease: "sine.inOut" }, L(44.2));
          drawOn(tl, "#g0_halos", 44.6, 1.6, 0.12);
          tl.to("#g0_sil, #g0_halos", { y: -14, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: 4 }, L(44.6));
          ${BTRIP.map((b) => `beatKick(tl, "#g0_sil, #g0_halos", [${b.toFixed(3)}], 1.04);`).join("\n          ")}
          tl.fromTo("#g0_amp", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(44.4));

          /* ============================================================ g1 */
          tl.fromTo("#g1_c1, #g1_sw, #g1_c2, #g1_cur, #g1_c3", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.08 }, L(44.2));
          drawOn(tl, "#g1_brk", 44.15, 0.7, 0.06);

          /* 44.452 "Switch my current" — the breaker is THROWN, then the wire lives */
          drawOn(tl, "#g1_ac", 44.3, 0.8, 0.05);
          tl.fromTo("#g1_sel", { opacity: 0 }, { opacity: 1, duration: 0.35 }, L(44.2));
          lever(tl, "#g1_brk .lever", 44.5, -52, 0, "58 102", 0.34, "back.out(2.8)");
          energize(tl, "#g1_brk [data-draw]", 44.72, "#22D3EE", 0.3);
          energizeFill(tl, "#g1_brk .win", 44.72, "#22D3EE", 0.2);
          tl.to("#g1_brk", { scale: 1.14, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, L(44.72));
          tl.set("#g1_sw", { textContent: "SW: CLOSED", color: "#22D3EE" }, L(44.72));
          shake(tl, "#g1_brk", 44.72, 6, 0.4);
          /* current starts down the rail (left bulbs wake) */
          tl.to("#g0_rail .fill", { clipPath: "inset(0 82% 0 0)", duration: 0.6, ease: "power2.out" }, L(44.75));
          energize(tl, "#g0_rail .live", 44.75, "#22D3EE", 0.5);
          ${[0, 1].map((i) => `tl.to("#g0_rail .bulb[data-i='${i}']", { opacity: 1, attr: { fill: "#22D3EE" }, duration: 0.25 }, L(${(44.95 + i * 0.16).toFixed(2)}));`).join("\n          ")}
          count(tl, "#g0_amp", 0, 3.2, 44.72, 1.4, function (v) { return "I = " + v.toFixed(1) + " A"; });

          /* 45.850 "To AC to DC" — the selector flips; the sine flattens to a line */
          lever(tl, "#g1_sel .lever", 45.9, 0, 116, "24 60", 0.3, "back.out(2.4)");
          tl.to("#g1_ac", { scaleY: 0.04, opacity: 0.25, duration: 0.4, ease: "power2.inOut" }, L(46.0));
          drawOn(tl, "#g1_dc", 46.05, 0.55, 0.01);
          energize(tl, "#g1_dc .live", 46.5, "#22D3EE", 0.3);
          tl.set("#g1_cur", { textContent: "current: DC", color: "#9F7BFF" }, L(46.1));
          ${DB.slice(2, 5).map((b) => `pulse(tl, "#g1_dc", ${b.toFixed(3)}, 0.8, 1.03, 2);`).join("\n          ")}

          /* 47.672 "blind my vision" — the two lids SLAM shut over the iris */
          gsap.set("#g1_eye .lidU", { y: -80 });
          gsap.set("#g1_eye .lidD", { y: 80 });
          drawOn(tl, "#g1_eye", 46.9, 0.7, 0.05); bloomIn(tl, "#g1_eye", 47.2, 0.3, 0.9);
          tl.to("#g1_eye .lidU", { y: 6, duration: 0.3, ease: "power3.in" }, L(47.7));
          tl.to("#g1_eye .lidD", { y: -6, duration: 0.3, ease: "power3.in" }, L(47.7));
          energize(tl, "#g1_eye [data-draw]", 48.0, "#8A93B8", 0.3);
          tl.to("#g1_eye", { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out" }, L(48.0));

          /* 49.534 "So dizzy" — a spiral spins up inside the shut eye + shake */
          drawOn(tl, "#g1_spiral", 49.55, 1.4, 0.02);
          orbit(tl, "#g1_spiral", 49.9, 2.4, 1, "110 110");
          ${beats(49.534, 51.2).slice(0, 4).map((b) => `shake(tl, "#g1_spiral", ${b.toFixed(3)}, 5, 0.3);`).join("\n          ")}
          tl.to("#g1_spiral", { opacity: 0.7, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 2 }, L(50.0));

          /* ============================================================ g2 */
          tl.fromTo("#g2_c1, #g2_c2, #g2_c3, #g2_pos, #g2_link", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.06 }, L(51.5));

          /* 51.363 "Oh we can travel" — a charge runs the whole rail, waking bulbs */
          travel(tl, "#g0_spark", 51.42, 1.6, 1220, 0, 1);
          tl.to("#g0_rail .fill", { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power1.inOut" }, L(51.42));
          ${[2, 3, 4, 5, 6].map((i) => `tl.to("#g0_rail .bulb[data-i='${i}']", { opacity: 1, attr: { fill: "#22D3EE" }, duration: 0.22 }, L(${(51.6 + (i - 2) * 0.26).toFixed(2)}));`).join("\n          ")}
          count(tl, "#g0_amp", 3.2, 6.4, 51.42, 1.7, function (v) { return "I = " + v.toFixed(1) + " A"; });

          /* 53.225 "To A.D to B.C" — needle runs BACKWARDS, position_ids counts down */
          drawOn(tl, "#g2_dial", 51.7, 0.8, 0.05);
          orbit(tl, "#g2_dial .needle", 53.3, 3.4, -2, "50% 100%");
          count(tl, "#g2_pos", 8192, 0, 53.3, 3.3, function (v) { return "pos_id " + Math.round(v); });
          ${beats(53.3, 54.4).map((b) => `beatKick(tl, "#g2_dial", [${b.toFixed(3)}], 1.05);`).join("\n          ")}

          /* 55.083 "And we can unite" — the plug is INSERTED home, circuit closes */
          drawOn(tl, "#g2_sock", 54.4, 0.7, 0.05);
          drawOn(tl, "#g2_plug", 54.5, 0.7, 0.05);
          insert(tl, "#g2_plug", 55.14, -150, 0, 0.5);
          tl.to("#g2_plug", { scale: 0.96, duration: 0.08, ease: "power2.in" }, L(55.6));
          tl.to("#g2_plug", { scale: 1, duration: 0.26, ease: "back.out(3)" }, L(55.68));
          energizeFill(tl, "#g2_sock .slotglow", 55.6, "#22D3EE", 0.3);
          shake(tl, "#g2_sock", 55.62, 7, 0.4);
          tl.to("#g2_sock", { scale: 1.12, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, L(55.62));
          tl.set("#g2_link", { textContent: "link: CLOSED", color: "#22D3EE" }, L(55.62));
          /* she is tied into the circuit */
          energize(tl, "#g0_halos", 55.62, "#22D3EE", 0.4);
          beatKick(tl, "#g0_sil, #g0_halos", [55.62], 1.08);

          /* 56.916 "So deeply" — the bulb IGNITES and the rail fills to full */
          drawOn(tl, "#g2_bulb", 55.9, 0.8, 0.05);
          press(tl, "#g2_bulb", 56.95, "50% 90%", 0.9);
          energize(tl, "#g2_bulb .filament", 57.0, "#22D3EE", 0.35);
          energize(tl, "#g2_bulb .halo", 57.05, "#9F7BFF", 0.3);
          pop(tl, "#g2_pop", 57.05, 1.8, 0.8);
          jerk(tl, 57.06, 10);
          pulse(tl, "#g2_bulb .filament", 57.3, 1.0, 1.12, 6);
          ${[0, 1, 2, 3, 4, 5, 6].map((i) => `tl.to("#g0_rail .bulb[data-i='${i}']", { attr: { r: 13 }, duration: 0.2, yoyo: true, repeat: 1 }, L(${(56.98 + i * 0.05).toFixed(2)}));`).join("\n          ")}
          count(tl, "#g0_amp", 6.4, 9.8, 56.95, 2.0, function (v) { return "I = " + v.toFixed(1) + " A"; });

          chrome(tl, [
            [44.002, "ctx 1,024/32,768 · tok/s 42.4 · t=0.70", "▶ mains OFF"],
            [44.72, "ctx 1,024/32,768 · tok/s 42.4 · t=0.70", "▶ mains ON · 240V"],
            [46.0, "ctx 1,152/32,768 · tok/s 44.0 · t=0.70", "▶ AC → DC"],
            [47.7, "ctx 1,152/32,768 · tok/s 44.0 · t=0.70", "▶ dropout 0.5"],
            [51.42, "ctx 1,408/32,768 · tok/s 46.2 · t=0.70", "▶ travelling"],
            [53.3, "ctx 1,408/32,768 · tok/s 46.2 · t=0.70", "◀ rewinding"],
            [55.62, "ctx 1,664/32,768 · tok/s 48.0 · t=0.70", "▶ circuit closed"],
            [57.05, "ctx 1,664/32,768 · tok/s 48.0 · t=0.70", "▶ fully energised"],
          ]);
  `,
};
