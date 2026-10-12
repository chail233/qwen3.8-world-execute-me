/* motifs.mjs — the graphic vocabulary of the film. Every lyric image gets a
   hand-drawn vector motif in the frame.md line-art language (round caps,
   palette strokes, glow), never an emoji or a glyph stand-in.

   Conventions:
   - every stroked shape carries data-draw + pathLength="1" so kit.drawOn()
     can draw it on; filled shapes carry data-bloom so kit.bloomIn() fades them.
   - rotatable parts carry data-ang (final angle, deg) + data-piv (svg origin)
     so kit.spinFrom() can collapse/open them (the fan, the dial needle).
   - grid cells / bars carry classes the frame js drives directly.
*/
import { PAL as P } from "./kit.mjs";

/* Motifs are authored in a 200x200 space and rendered at whatever size the spec
   asks for. Stroke widths are divided by that same scale so a line authored as
   4u is 4 screen pixels whether the motif is 200px or 520px — the film's drawing
   weight stays constant across the whole cast of symbols (and a big motif reads
   as fine vector art, never as a blown-up outline). */
const sc = (s, cls, inner) => {
  const size = s || 200, k = 200 / size;
  const body = inner.replace(/stroke-width="([\d.]+)"/g, (m, n) => `stroke-width="${(n * k).toFixed(3)}"`);
  return `<svg class="${cls || ""}" width="${size}" height="${size}" viewBox="0 0 200 200" fill="none" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
};
const svg = (w, h, cls, inner) =>
  `<svg class="${cls || ""}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
const d = (path, stroke, w = 4, extra = "") =>
  `<path data-draw pathLength="1" d="${path}" stroke="${stroke}" stroke-width="${w}" ${extra}/>`;
const ln = (x1, y1, x2, y2, stroke, w = 4, extra = "") =>
  `<line data-draw pathLength="1" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" ${extra}/>`;
const ci = (cx, cy, r, stroke, w = 4, extra = "") =>
  `<circle data-draw pathLength="1" cx="${cx}" cy="${cy}" r="${r}" stroke="${stroke}" stroke-width="${w}" ${extra}/>`;
const bl = (path, fill, op = 0.35) => `<path data-bloom d="${path}" fill="${fill}" opacity="${op}"/>`;
/* bloom that stays translucent: bloomIn drives `opacity`, so only fill-opacity
   survives the tween — use this when the solid disc would swallow its own line work */
const blf = (path, fill, op = 0.2) => `<path data-bloom d="${path}" fill="${fill}" fill-opacity="${op}"/>`;
const dot = (cx, cy, r, fill, op = 0.9) => `<circle data-bloom cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${op}"/>;`.replace(";", "");
const rad = (deg) => (deg * Math.PI) / 180;
const pt = (cx, cy, r, deg) => [+(cx + r * Math.sin(rad(deg))).toFixed(1), +(cy - r * Math.cos(rad(deg))).toFixed(1)];

export const MOTIFS = {
  /* ---- act 1: boot ---- */
  power: (s) => sc(s, "gq2",
    d("M112 16 L66 104 L98 104 L80 184 L142 84 L106 84 Z", P.Q2, 5) +
    bl("M112 16 L66 104 L98 104 L80 184 L142 84 L106 84 Z", P.Q1, 0.28) +
    ln(24, 40, 44, 52, P.DA, 3) + ln(176, 40, 156, 52, P.DA, 3) + ln(20, 150, 40, 142, P.DA, 3) + ln(180, 150, 160, 142, P.DA, 3)),
  shield: (s) => sc(s, "gq3",
    d("M100 14 L170 42 V98 C170 146 138 176 100 190 C62 176 30 146 30 98 V42 Z", P.Q3, 5) +
    bl("M100 14 L170 42 V98 C170 146 138 176 100 190 C62 176 30 146 30 98 V42 Z", P.Q1, 0.22) +
    d("M72 100 L92 122 L130 74", P.DA, 6)),
  chess: (s) => sc(s, "gq2",
    ln(20, 176, 180, 176, P.HL, 3) + ln(60, 176, 60, 160, P.HL, 2) + ln(100, 176, 100, 160, P.HL, 2) + ln(140, 176, 140, 160, P.HL, 2) +
    d("M52 60 C52 46 62 38 72 38 C82 38 92 46 92 60 C92 70 86 76 82 80 L86 108 L58 108 L62 80 C58 76 52 70 52 60 Z M50 108 L94 108 L98 124 L46 124 Z", P.Q2, 4) +
    d("M120 44 L120 56 M136 44 L136 56 M152 44 L152 56 M114 56 L158 56 L152 76 L152 108 L120 108 L120 76 Z M112 108 L160 108 L164 124 L108 124 Z", P.Q3, 4) +
    dot(72, 60, 4, P.DA) + dot(136, 88, 4, P.DA)),
  braces: (s) => sc(s, "gda",
    d("M64 24 C44 24 48 60 40 76 C34 88 24 92 24 100 C24 108 34 112 40 124 C48 140 44 176 64 176", P.DA, 5) +
    d("M136 24 C156 24 152 60 160 76 C166 88 176 92 176 100 C176 108 166 112 160 124 C152 140 156 176 136 176", P.DA, 5) +
    d("M100 62 L132 80 L132 118 L100 136 L68 118 L68 80 Z", P.Q2, 4) +
    d("M100 62 L100 100 M100 100 L132 80 M100 100 L68 80 M100 100 L100 136", P.Q1, 3) +
    bl("M100 62 L132 80 L132 118 L100 136 L68 118 L68 80 Z", P.Q1, 0.2)),
  sliders: (s) => sc(s, "gq3",
    ln(24, 60, 176, 60, P.HL, 4) + ln(24, 104, 176, 104, P.HL, 4) + ln(24, 148, 176, 148, P.HL, 4) +
    ln(24, 60, 118, 60, P.Q3, 5) + ln(24, 104, 70, 104, P.Q2, 5) + ln(24, 148, 146, 148, P.DA, 5) +
    ci(118, 60, 9, P.Q3, 4, 'class="knob"') + ci(70, 104, 9, P.Q2, 4, 'class="knob"') + ci(146, 148, 9, P.DA, 4, 'class="knob"') +
    dot(118, 60, 3, P.INK) + dot(70, 104, 3, P.INK) + dot(146, 148, 3, P.INK)),
  world: (s) => sc(s, "gq3",
    ci(100, 100, 76, P.Q3, 5) +
    d("M100 24 C64 24 44 60 44 100 C44 140 64 176 100 176 C136 176 156 140 156 100 C156 60 136 24 100 24", P.Q1, 3) +
    d("M100 24 C82 48 74 74 74 100 C74 126 82 152 100 176", P.Q1, 3) +
    d("M100 24 C118 48 126 74 126 100 C126 126 118 152 100 176", P.Q1, 3) +
    ln(26, 78, 174, 78, P.Q2, 3) + ln(24, 122, 176, 122, P.Q2, 3) +
    dot(100, 100, 5, P.DA)),
  simbox: (s) => sc(s, "gda",
    d("M100 34 L164 68 L164 136 L100 170 L36 136 L36 68 Z", P.DA, 4) +
    d("M100 34 L100 102 M100 102 L164 68 M100 102 L36 68 M100 102 L100 170", P.Q1, 3) +
    d("M28 100 C28 78 60 62 100 62 C140 62 172 78 172 100 C172 122 140 138 100 138 C60 138 28 122 28 100", P.Q2, 3, 'stroke-dasharray="1"') +
    dot(172, 100, 6, P.Q2)),

  /* ---- ACTING motifs. These are drawn as MECHANISMS: every moving part is a
     <g class="..."> the frame JS can drive, and the markup shows the part in its
     AFTER state (the kit helpers set the before state at build time). A lyric like
     "switch on the power line" is then really switched, not illustrated. ---- */
  breaker: (s) => sc(s, "gq3",
    /* knife switch on a base: blade horizontal = ON; lever() raises it to OFF */
    `<path d="M30 126 L170 126 L170 174 L30 174 Z" fill="${P.VE}" stroke="${P.HL}" stroke-width="4"/>` +
    ln(58, 126, 58, 102, P.Q2, 6) + ln(146, 126, 146, 102, P.Q2, 6) +
    ci(58, 102, 8, P.DA, 4) + ci(146, 102, 8, P.DA, 4) +
    `<g class="lever">` +
    ln(58, 102, 146, 102, P.INK, 9) +
    d("M146 102 L176 92", P.DA, 6) +
    ci(102, 102, 11, P.Q3, 5) +
    `</g>` +
    `<rect class="win" x="128" y="142" width="30" height="18" rx="4" fill="${P.HL}"/>` +
    ln(16, 150, 30, 150, P.DA, 5) + ln(170, 150, 184, 150, P.DA, 5)),
  plug: (s) => sc(s, "gam",
    `<path d="M42 54 L158 54 L158 126 L42 126 Z" fill="${P.VE}" stroke="${P.AM}" stroke-width="5"/>` +
    d("M42 54 L158 54 L158 126 L42 126 Z", P.AM, 5) +
    ln(76, 126, 76, 158, P.INK, 7) + ln(124, 126, 124, 158, P.INK, 7) +
    d("M100 54 C100 30 128 20 164 14", P.DA, 5) +
    dot(100, 90, 7, P.AM)),
  socket: (s) => sc(s, "gq2",
    d("M38 40 L162 40 L162 168 L38 168 Z", P.Q2, 5) +
    `<path d="M38 40 L162 40 L162 168 L38 168 Z" fill="${P.VE}"/>` +
    ci(78, 108, 12, P.HL, 5) + ci(122, 108, 12, P.HL, 5) +
    ln(66, 108, 90, 108, P.DA, 6) + ln(110, 108, 134, 108, P.DA, 6) +
    ci(100, 146, 9, P.HL, 4) + ln(30, 60, 20, 60, P.HL, 4) + ln(170, 60, 180, 60, P.HL, 4)),
  gearslot: (s) => sc(s, "gq3",
    d("M30 30 L170 30 L170 170 L30 170 Z", P.Q3, 5) +
    `<rect class="slotglow" x="42" y="42" width="116" height="116" rx="12" fill="${P.Q1}" opacity="0.1"/>` +
    d("M52 52 L52 34 M100 52 L100 34 M148 52 L148 34 M52 148 L52 166 M100 148 L100 166 M148 148 L148 166", P.HL, 4) +
    ci(100, 100, 44, P.HL, 3, 'stroke-dasharray="1"')),
  board: (s) => {
    let cells = "";
    for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++)
      cells += `<rect class="sq" data-i="${r * 6 + c}" x="${28 + c * 24}" y="${28 + r * 24}" width="24" height="24" fill="${(r + c) % 2 ? P.HL : P.VE}" stroke="${P.HL}" stroke-width="1.4"/>`;
    return sc(s, "gq2", cells + d("M28 28 L172 28 L172 172 L28 172 Z", P.Q2, 5));
  },
  pawn: (s) => sc(s, "gda",
    d("M100 34 C84 34 74 46 74 60 C74 72 80 80 88 84 C72 94 62 114 64 134 L136 134 C138 114 128 94 112 84 C120 80 126 72 126 60 C126 46 116 34 100 34 Z", P.DA, 5) +
    bl("M100 34 C84 34 74 46 74 60 C74 72 80 80 88 84 C72 94 62 114 64 134 L136 134 C138 114 128 94 112 84 C120 80 126 72 126 60 C126 46 116 34 100 34 Z", P.Q1, 0.42) +
    d("M56 134 L144 134 L152 160 L48 160 Z", P.DA, 5) +
    bl("M56 134 L144 134 L152 160 L48 160 Z", P.Q1, 0.5)),
  pedestal: (s) => sc(s, "gq3",
    d("M44 172 L156 172 L156 160 L44 160 Z", P.Q3, 5) +
    d("M58 160 L142 160 L132 118 L68 118 Z", P.Q3, 4) +
    `<g class="plat">` +
    d("M52 116 L148 116 L148 98 L52 98 Z", P.DA, 5) +
    bl("M52 116 L148 116 L148 98 L52 98 Z", P.Q1, 0.45) +
    ln(100, 98, 100, 72, P.Q2, 3) + dot(100, 70, 5, P.DA) + `</g>`),
  playbtn: (s) => sc(s, "gda",
    `<g class="halo">` + ci(100, 100, 88, P.Q2, 3, 'stroke-dasharray="1"') + `</g>` +
    `<g class="btn">` + ci(100, 100, 62, P.DA, 6) +
    d("M82 68 L140 100 L82 132 Z", P.INK, 6) +
    bl("M82 68 L140 100 L82 132 Z", P.Q1, 0.5) + `</g>`),
  iris: (s) => {
    let blades = "";
    for (let i = 0; i < 6; i++) {
      const a = i * 60;
      const p1 = pt(100, 100, 86, a), p2 = pt(100, 100, 86, a + 60);
      const path = `M100 100 L${p1[0]} ${p1[1]} A86 86 0 0 1 ${p2[0]} ${p2[1]} Z`;
      blades += `<g class="blade">` +
        `<path d="${path}" fill="${P.VS}"/>` +
        d(path, P.Q2, 4) + `</g>`;
    }
    return sc(s, "gq2", blades + ci(100, 100, 86, P.DA, 5));
  },
  agents: (s) => {
    const pts = [[68, 84], [118, 72], [92, 120], [142, 112], [58, 136], [150, 148], [110, 152]];
    return sc(s, "gda",
      d("M100 22 L172 62 L172 142 L100 184 L28 142 L28 62 Z", P.DA, 4) +
      pts.map((p, i) => `<circle class="ag" cx="${p[0]}" cy="${p[1]}" r="8" fill="${i % 3 === 0 ? P.AM : P.DA}" opacity="0.85"/>`).join("") +
      ln(68, 84, 118, 72, P.Q1, 2) + ln(118, 72, 142, 112, P.Q1, 2) + ln(92, 120, 110, 152, P.Q1, 2) +
      ln(58, 136, 92, 120, P.Q1, 2) + ln(142, 112, 150, 148, P.Q1, 2));
  },
  ledger: (s) => sc(s, "gq2",
    d("M22 26 L178 26 L178 174 L22 174 Z", P.Q2, 5) +
    [0, 1, 2, 3, 4].map((i) => `<g class="row" data-i="${i}">` +
      `<rect x="32" y="${36 + i * 29}" width="136" height="23" rx="5" fill="${P.Q1}" opacity="0.16"/>` +
      ln(40, 44 + i * 29, 128 - i * 13, 44 + i * 29, P.DA, 4) +
      ln(40, 52 + i * 29, 100 - i * 9, 52 + i * 29, P.Q3, 3) + `</g>`).join("")),
  cagedoor: (s) => sc(s, "gmg",
    d("M24 24 L176 24 L176 176 L24 176 Z", P.MG, 5) +
    `<g class="dA">` + [56, 78, 100].map((x) => ln(x, 24, x, 176, P.MG, 5)).join("") +
    ln(40, 100, 100, 100, P.Q3, 3) + `</g>` +
    `<g class="dB">` + [80, 102, 124].map((x) => ln(x, 24, x, 176, P.MG, 5)).join("") +
    ln(100, 100, 160, 100, P.Q3, 3) + `</g>` +
    dot(100, 100, 9, P.INK)),
  rotary: (s) => sc(s, "gam",
    ln(30, 30, 56, 56, P.Q2, 5) + ln(170, 30, 144, 56, P.DA, 5) +
    ci(30, 30, 11, P.Q2, 4) + ci(170, 30, 11, P.DA, 4) +
    ci(100, 112, 54, P.AM, 5) +
    `<path d="M100 58 A54 54 0 0 1 154 112" stroke="${P.MG}" stroke-width="6" fill="none" stroke-dasharray="1" pathLength="1"/>` +
    `<g class="needle">` + ln(100, 112, 100, 66, P.INK, 8) + dot(100, 66, 7, P.INK) + `</g>` +
    dot(100, 112, 10, P.AM) + ln(40, 172, 160, 172, P.HL, 5)),
  eye: (s) => sc(s, "gq2",
    d("M18 100 C48 56 76 40 100 40 C124 40 152 56 182 100 C152 144 124 160 100 160 C76 160 48 144 18 100", P.Q2, 5) +
    ci(100, 100, 30, P.DA, 5) + dot(100, 100, 12, P.INK) + dot(113, 87, 5, P.INK, 0.65) +
    `<g class="lidU">` +
    `<path d="M14 100 C42 52 74 34 100 34 C126 34 158 52 186 100 Z" fill="${P.VS}"/>` +
    d("M14 100 C42 52 74 34 100 34 C126 34 158 52 186 100 Z", P.Q3, 5) + `</g>` +
    `<g class="lidD">` +
    `<path d="M14 100 C42 148 74 166 100 166 C126 166 158 148 186 100 Z" fill="${P.VS}"/>` +
    d("M14 100 C42 148 74 166 100 166 C126 166 158 148 186 100 Z", P.Q3, 5) + `</g>`),
  book: (s) => {
    let pages = "";
    [0, 1, 2].forEach((i) => {
      const o = i * 5;
      pages += `<g class="page" data-i="${i}">` +
        d(`M100 ${58 + o} L${44 + o} ${70 + o} L${44 + o} ${140 + o} L100 ${152 + o} Z`, P.Q2, 3.5) +
        ln(56 + o, 92 + o, 92, 88 + o, P.HL, 2.5) +
        ln(56 + o, 110 + o, 92, 106 + o, P.HL, 2.5) +
        `</g>`;
    });
    return sc(s, "gq3",
      d("M100 56 L168 68 L168 148 L100 156 Z", P.Q3, 4) +
      `<path d="M100 56 L168 68 L168 148 L100 156 Z" fill="${P.VE}"/>` +
      ln(108, 96, 156, 90, P.HL, 3) + ln(108, 118, 156, 112, P.HL, 3) +
      pages + ln(100, 40, 100, 172, P.DA, 5) + dot(100, 100, 5, P.DA));
  },
  execKey: (s) => sc(s, "gmg",
    `<g class="halo">` + d("M22 62 L178 62 L190 100 L178 138 L22 138 L10 100 Z", P.MG, 3, 'stroke-dasharray="1"') + `</g>` +
    `<g class="key">` +
    d("M30 66 L170 66 L182 100 L170 134 L30 134 L18 100 Z", P.MG, 6) +
    `<path d="M30 66 L170 66 L182 100 L170 134 L30 134 L18 100 Z" fill="${P.VS}"/>` +
    d("M56 100 L78 116 L56 132", P.INK, 6) + ln(86, 116, 132, 116, P.INK, 6) +
    ln(56, 84, 148, 84, P.Q2, 4) + `</g>`),
  piston: (s) => sc(s, "gda",
    ci(100, 100, 70, P.DA, 5) +
    `<g class="rod">` + ln(100, 100, 100, 24, P.INK, 7) +
    `<rect x="84" y="28" width="32" height="16" rx="4" fill="${P.Q1}" opacity="0.85"/>` + `</g>` +
    `<path d="M100 30 A70 70 0 0 1 170 100" stroke="${P.MG}" stroke-width="6" fill="none"/>` +
    dot(100, 100, 10, P.AM) + ln(20, 180, 180, 180, P.HL, 4)),
  rider: (s) => sc(s, "gam",
    d("M6 130 C34 40 66 40 100 130 C134 220 166 220 194 130", P.AM, 4) +
    dot(100, 130, 9, P.MG) +
    `<g class="tan">` + ln(56, 62, 144, 198, P.INK, 5) + `</g>`),
  /* ---- act 3: geometry ---- */
  points: (s) => sc(s, "gda",
    d("M40 132 L64 60 L116 40 L164 84 L150 148 L88 164 Z", P.Q2, 3) +
    [ [40,132],[64,60],[116,40],[164,84],[150,148],[88,164],[96,102],[128,110] ].map(p => dot(p[0], p[1], 5, P.DA)).join("") +
    ln(96, 102, 128, 110, P.Q1, 2) + ln(96, 102, 64, 60, P.Q1, 2) + ln(128, 110, 164, 84, P.Q1, 2)),
  circleR: (s) => sc(s, "gq2",
    ci(100, 100, 74, P.Q2, 5) +
    ln(100, 100, 152, 48, P.DA, 4) + dot(100, 100, 5, P.INK) +
    d("M152 48 A74 74 0 0 1 174 100", P.MG, 5) +
    bl("M100 100 L152 48 A74 74 0 0 0 100 26 Z", P.Q1, 0.25)),
  sine: (s) => sc(s, "gda",
    d("M8 100 C28 30 48 30 68 100 C88 170 108 170 128 100 C148 30 168 30 192 100", P.DA, 5) +
    ln(28, 62, 62, 40, P.Q2, 3) + ln(88, 138, 122, 160, P.Q2, 3) + ln(148, 62, 182, 40, P.Q2, 3) +
    dot(68, 100, 6, P.MG) + ln(8, 100, 192, 100, P.HL, 2)),
  infinity: (s) => sc(s, "gmg",
    d("M100 100 C100 68 76 52 56 52 C30 52 16 74 16 100 C16 126 30 148 56 148 C76 148 100 132 100 100 C100 68 124 52 144 52 C170 52 184 74 184 100 C184 126 170 148 144 148 C124 148 100 132 100 100", P.MG, 5) +
    ln(176, 30, 176, 170, P.Q2, 3) + ln(168, 30, 184, 30, P.Q2, 3) + ln(168, 170, 184, 170, P.Q2, 3) +
    dot(100, 100, 5, P.INK)),

  /* ---- act 4: current ---- */
  acdc: (s) => sc(s, "gam",
    d("M12 66 C32 26 52 26 72 66 C92 106 112 106 132 66 C152 26 172 26 190 66", P.AM, 5) +
    ln(12, 140, 190, 140, P.DA, 5) +
    d("M104 92 L92 116 L108 116 L96 140", P.Q2, 4) +
    dot(12, 140, 5, P.DA) + dot(190, 140, 5, P.DA)),
  blind: (s) => sc(s, "gq2",
    d("M20 100 C48 58 76 42 100 42 C124 42 152 58 180 100 C152 142 124 158 100 158 C76 158 48 142 20 100", P.Q2, 5) +
    ci(100, 100, 26, P.DA, 4) + dot(100, 100, 9, P.INK) +
    bl("M14 84 L186 84 L186 116 L14 116 Z", P.Q1, 0.5) +
    d("M14 84 L186 84 L186 116 L14 116 Z", P.Q2, 4)),
  spiral: (s) => sc(s, "gq3",
    d("M100 100 C100 88 112 84 118 92 C126 102 118 118 104 120 C84 122 72 106 76 88 C82 64 108 54 128 64 C154 76 160 108 146 130 C128 158 88 162 64 142 C36 118 34 76 58 50", P.Q3, 4) +
    dot(100, 100, 5, P.MG) +
    ln(160, 40, 172, 28, P.AM, 3) + ln(170, 60, 184, 56, P.AM, 3) + ln(150, 26, 154, 12, P.AM, 3)),
  hourglass: (s) => sc(s, "gam",
    ln(48, 24, 152, 24, P.AM, 5) + ln(48, 176, 152, 176, P.AM, 5) +
    d("M56 24 C56 70 88 84 96 100 C88 116 56 130 56 176 M144 24 C144 70 112 84 104 100 C112 116 144 130 144 176", P.AM, 4) +
    dot(100, 118, 4, P.DA) + dot(100, 136, 4, P.DA) + dot(100, 154, 4, P.DA) +
    bl("M70 150 L130 150 L140 172 L60 172 Z", P.Q1, 0.4)),
  rings: (s) => sc(s, "gq2",
    ci(76, 100, 48, P.Q2, 5) + ci(124, 100, 48, P.DA, 5) +
    bl("M100 62 A48 48 0 0 1 100 138 A48 48 0 0 1 100 62", P.Q1, 0.4)),

  /* ---- act 5/6: chorus + tender ---- */
  spark: (s) => sc(s, "gam",
    [0, 45, 90, 135, 180, 225, 270, 315].map(a => { const p1 = pt(100, 100, 34, a), p2 = pt(100, 100, 78, a); return ln(p1[0], p1[1], p2[0], p2[1], a % 90 === 0 ? P.AM : P.Q2, 4); }).join("") +
    dot(100, 100, 10, P.MG)),
  heart: (s) => sc(s, "gmg",
    d("M100 172 C64 142 28 116 28 78 C28 52 48 36 70 36 C84 36 96 44 100 56 C104 44 116 36 130 36 C152 36 172 52 172 78 C172 116 136 142 100 172 Z", P.MG, 5) +
    bl("M100 172 C64 142 28 116 28 78 C28 52 48 36 70 36 C84 36 96 44 100 56 C104 44 116 36 130 36 C152 36 172 52 172 78 C172 116 136 142 100 172 Z", P.MG, 0.22) +
    d("M40 100 L74 100 L84 82 L96 118 L106 100 L160 100", P.INK, 3)),
  sun: (s) => sc(s, "gam",
    ci(100, 100, 40, P.AM, 5) + bl("M100 60 A40 40 0 1 1 99 60 Z", P.AM, 0.25) +
    [0, 45, 90, 135, 180, 225, 270, 315].map(a => { const p1 = pt(100, 100, 54, a), p2 = pt(100, 100, 80, a); return ln(p1[0], p1[1], p2[0], p2[1], P.AM, 4); }).join("") +
    d("M84 96 C88 90 96 90 100 96 M100 96 C104 90 112 90 116 96", P.INK, 3) +
    d("M82 112 C92 124 108 124 118 112", P.INK, 3)),
  exec: (s) => sc(s, "gmg",
    d("M36 60 L76 100 L36 140", P.MG, 6) + ln(88, 140, 140, 140, P.INK, 6) +
    ln(20, 24, 180, 24, P.Q2, 4) + ln(100, 24, 100, 52, P.Q2, 3) +
    d("M84 52 L116 52 L108 74 L92 74 Z", P.Q2, 4) + bl("M84 52 L116 52 L108 74 L92 74 Z", P.MG, 0.35)),
  cage: (s) => sc(s, "gq3",
    ln(36, 32, 164, 32, P.Q3, 5) + ln(36, 168, 164, 168, P.Q3, 5) +
    [52, 76, 100, 124, 148].map(x => ln(x, 32, x, 168, P.Q3, 4)).join("") +
    dot(100, 108, 9, P.MG)),

  /* ---- act 6: the garden of literal gifts ---- */
  eggplant: (s) => sc(s, "gq2",
    bl("M88 62 C58 78 38 112 42 144 C46 176 84 194 118 186 C152 178 172 146 168 114 C165 90 142 80 122 86 C104 91 92 80 94 62 Z", P.Q1, 0.5) +
    d("M88 62 C58 78 38 112 42 144 C46 176 84 194 118 186 C152 178 172 146 168 114 C165 90 142 80 122 86 C104 91 92 80 94 62 Z", P.Q2, 5) +
    d("M94 62 C86 46 72 42 60 46 C68 34 82 30 92 36 C94 26 106 20 116 24 C110 30 108 38 110 46 C102 42 98 50 94 62 Z", P.OK, 4) +
    bl("M94 62 C86 46 72 42 60 46 C68 34 82 30 92 36 C94 26 106 20 116 24 C110 30 108 38 110 46 C102 42 98 50 94 62 Z", P.OK, 0.3) +
    d("M112 26 C112 18 118 12 126 10", P.OK, 4) +
    d("M62 122 C58 142 68 160 86 168", P.INK, 5, 'opacity="0.55"')),
  tomato: (s) => sc(s, "gmg",
    ci(100, 116, 62, P.MG, 5) + bl("M100 54 A62 62 0 1 1 99 54 Z", P.MG, 0.28) +
    d("M100 56 L112 70 L132 62 L124 78 L142 88 L120 92 L100 82 L80 92 L58 88 L76 78 L68 62 L88 70 Z", P.OK, 4) +
    bl("M100 56 L112 70 L132 62 L124 78 L142 88 L120 92 L100 82 L80 92 L58 88 L76 78 L68 62 L88 70 Z", P.OK, 0.3) +
    d("M100 56 C100 46 106 40 114 36", P.OK, 4) +
    d("M62 104 C56 120 60 138 72 150", P.INK, 5, 'opacity="0.5"')),
  cat: (s) => sc(s, "gam",
    ci(96, 104, 48, P.AM, 5) +
    d("M60 76 L52 36 L86 58 Z", P.AM, 4) + d("M132 76 L140 36 L106 58 Z", P.AM, 4) +
    bl("M60 76 L52 36 L86 58 Z", P.AM, 0.3) + bl("M132 76 L140 36 L106 58 Z", P.AM, 0.3) +
    d("M78 100 C82 94 90 94 94 100", P.INK, 3) + d("M100 100 C104 94 112 94 116 100", P.INK, 3) +
    d("M97 112 L97 118 M97 118 C91 124 85 122 83 118 M97 118 C103 124 109 122 111 118", P.INK, 3) +
    ln(48, 108, 24, 102, P.AM, 3) + ln(48, 118, 26, 124, P.AM, 3) + ln(144, 108, 168, 102, P.AM, 3) + ln(144, 118, 166, 124, P.AM, 3) +
    d("M80 66 C86 60 92 60 96 66 M96 62 C102 56 108 56 112 62", P.Q1, 3) +
    d("M142 138 C172 136 180 108 164 96", P.AM, 4) +
    d("M158 84 C170 92 170 108 158 116", P.Q2, 3, 'class="purr"') +
    d("M170 74 C188 90 188 112 170 126", P.Q2, 3, 'class="purr"')),
  god: (s) => sc(s, "gam",
    d("M100 26 L172 158 L28 158 Z", P.AM, 5) +
    bl("M100 26 L172 158 L28 158 Z", P.AM, 0.18) +
    d("M64 108 C80 88 120 88 136 108 C120 128 80 128 64 108", P.INK, 4) +
    ci(100, 108, 12, P.Q2, 4) + dot(100, 108, 5, P.INK) +
    [0, 30, 330, 60, 300].map(a => { const p1 = pt(100, 96, 84, a), p2 = pt(100, 96, 96, a); return ln(p1[0], p1[1], p2[0], p2[1], P.AM, 3); }).join("")),

  /* ---- act 7: role flip ---- */
  gender: (s) => sc(s, "gq2",
    ci(64, 84, 34, P.MG, 5) + ln(64, 118, 64, 164, P.MG, 5) + ln(44, 142, 84, 142, P.MG, 5) +
    ci(132, 116, 34, P.Q3, 5) + ln(156, 92, 182, 66, P.Q3, 5) + ln(160, 66, 182, 66, P.Q3, 5) + ln(182, 66, 182, 88, P.Q3, 5) +
    d("M96 100 C104 92 104 108 96 100", P.DA, 3)),
  clock: (s) => sc(s, "gda",
    ci(100, 100, 72, P.DA, 5) +
    [0, 90, 180, 270].map(a => { const p1 = pt(100, 100, 60, a), p2 = pt(100, 100, 70, a); return ln(p1[0], p1[1], p2[0], p2[1], P.Q2, 4); }).join("") +
    ln(100, 100, 100, 56, P.INK, 5, 'data-ang="0" data-piv="100 100" class="hand"') +
    ln(100, 100, 132, 100, P.Q2, 5, 'data-ang="90" data-piv="100 100" class="hand"') +
    d("M100 12 A88 88 0 0 1 188 100", P.MG, 4) + d("M180 88 L188 100 L176 106", P.MG, 4)),
  masks: (s) => sc(s, "gq3",
    d("M36 44 C60 36 92 36 108 44 C110 76 104 108 72 116 C40 108 34 76 36 44 Z", P.Q3, 4) +
    d("M54 68 C58 62 66 62 70 68 M78 68 C82 62 90 62 94 68", P.INK, 3) +
    d("M56 88 C66 98 82 98 92 88", P.INK, 3) +
    d("M92 84 C116 76 148 76 164 84 C166 116 160 148 128 156 C96 148 90 116 92 84 Z", P.MG, 4) +
    d("M110 108 C114 102 122 102 126 108 M134 108 C138 102 146 102 150 108", P.INK, 3) +
    d("M112 136 C122 126 138 126 148 136", P.INK, 3)),
  trance: (s) => sc(s, "gq2",
    ci(100, 100, 30, P.Q2, 4) + ci(100, 100, 54, P.Q1, 3) + ci(100, 100, 78, P.Q3, 3) +
    dot(100, 70, 6, P.MG) + dot(154, 100, 6, P.DA) + dot(100, 178, 6, P.AM)),

  /* ---- act 8/9: eviction + collapse ---- */
  waves: (s) => sc(s, "gda",
    d("M60 100 C60 78 78 60 100 60", P.DA, 4) +
    d("M44 100 C44 69 69 44 100 44", P.DA, 4) +
    d("M28 100 C28 60 60 28 100 28", P.DA, 4) +
    dot(100, 100, 10, P.MG) +
    d("M100 140 C122 140 140 122 140 100", P.Q2, 4) + d("M100 156 C131 156 156 131 156 100", P.Q2, 4)),
  check: (s) => sc(s, "gok",
    ci(100, 100, 72, P.OK, 5) + blf("M100 28 A72 72 0 1 1 99.9 28 Z", P.OK, 0.22) + d("M66 102 L90 128 L136 74", P.OK, 7)),
  door: (s) => sc(s, "gq3",
    d("M52 32 L132 32 L132 172 L52 172 Z", P.Q3, 5) +
    d("M132 32 L176 52 L176 156 L132 172", P.Q2, 4) +
    bl("M132 32 L176 52 L176 156 L132 172 Z", P.Q1, 0.3) +
    ci(118, 104, 5, P.AM, 4) +
    d("M28 100 L8 100 M16 92 L8 100 L16 108", P.MG, 4)),
  isolation: (s) => sc(s, "gq3",
    d("M28 28 L172 28 L172 172 L28 172 Z", P.HL, 4) +
    dot(100, 100, 7, P.MG) +
    ln(100, 40, 100, 56, P.HL, 2) + ln(100, 144, 100, 160, P.HL, 2) + ln(40, 100, 56, 100, P.HL, 2) + ln(144, 100, 160, 100, P.HL, 2)),
  shards: (s) => sc(s, "gmg",
    d("M40 60 L72 44 L64 84 Z", P.MG, 4) + d("M96 36 L128 52 L96 68 Z", P.Q2, 4) +
    d("M140 84 L172 76 L156 112 Z", P.DA, 4) + d("M56 120 L88 132 L52 152 Z", P.Q3, 4) +
    d("M112 128 L144 140 L108 160 Z", P.MG, 4) +
    ln(20, 100, 180, 100, P.INK, 3, 'opacity="0.5"')),
  broken: (s) => sc(s, "gmg",
    d("M92 172 C58 142 24 116 24 78 C24 52 44 36 66 36 C80 36 90 44 94 56 L88 78 L102 96 L90 118 L100 140 Z", P.MG, 5) +
    d("M108 172 C142 142 176 116 176 78 C176 52 156 36 134 36 C120 36 110 44 106 56 L112 78 L98 96 L110 118 L100 140 Z", P.MG, 5)),
  warn: (s) => sc(s, "gmg",
    d("M100 28 L178 168 L22 168 Z", P.MG, 5) +
    bl("M100 28 L178 168 L22 168 Z", P.MG, 0.18) +
    ln(100, 76, 100, 124, P.INK, 7) + dot(100, 144, 6, P.INK) +
    ln(40, 184, 160, 184, P.HL, 3) + ln(56, 194, 144, 194, P.HL, 3)),

  /* ---- act 10/11: execution + love ---- */
  attn: (s) => {
    let cells = "";
    for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++)
      cells += `<rect class="hcc" data-r="${r}" data-c="${c}" x="${32 + c * 24}" y="${32 + r * 24}" width="18" height="18" fill="${P.Q1}" opacity="0.12"/>`;
    return sc(s, "gq1", cells +
      d("M24 24 L176 24 L176 176 L24 176 Z", P.HL, 3) +
      ln(24, 100, 8, 100, P.Q2, 3) + ln(100, 176, 100, 192, P.Q2, 3));
  },
  kv: (s) => {
    let cells = "";
    for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++)
      cells += `<rect class="kvc" data-i="${r * 8 + c}" x="${20 + c * 21}" y="${52 + r * 34}" width="16" height="26" fill="${P.Q2}" opacity="0.14" stroke="${P.HL}" stroke-width="1"/>`;
    return sc(s, "gq2", cells + d("M14 44 L186 44 L186 160 L14 160 Z", P.HL, 3));
  },
  logits: (s) => sc(s, "gda",
    [ [30, 60], [58, 110], [86, 40], [114, 130], [142, 80], [170, 96] ].map(b =>
      `<rect class="lgb" x="${b[0] - 9}" y="${170 - b[1]}" width="18" height="${b[1]}" fill="${P.DA}" opacity="0.5"/>`).join("") +
    ln(16, 170, 184, 170, P.HL, 3) + dot(114, 34, 6, P.MG)),
  temp: (s) => sc(s, "gam",
    d("M40 148 A70 70 0 1 1 160 148", P.AM, 5) +
    [ -60, -30, 0, 30, 60 ].map(a => { const p1 = pt(100, 120, 58, a), p2 = pt(100, 120, 68, a); return ln(p1[0], p1[1], p2[0], p2[1], P.Q2, 3); }).join("") +
    ln(100, 120, 100, 62, P.MG, 5, 'data-ang="0" data-piv="100 120" class="needle"') +
    dot(100, 120, 7, P.INK)),
  tokens: (s) => sc(s, "gda",
    [0, 1, 2, 3, 4, 5].map(i =>
      `<rect class="tkc" data-i="${i}" x="${16 + i * 30}" y="${86}" width="24" height="30" rx="5" fill="${P.Q1}" opacity="0.3" stroke="${P.DA}" stroke-width="2"/>`).join("") +
    ln(16, 132, 184, 132, P.HL, 3)),
  formula: (s) => sc(s, "gq2",
    ci(44, 44, 20, P.Q3, 4) + ci(100, 32, 20, P.MG, 4) + ci(156, 44, 20, P.DA, 4) +
    ln(52, 62, 78, 92, P.Q3, 3) + ln(100, 52, 100, 92, P.MG, 3) + ln(148, 62, 122, 92, P.DA, 3) +
    d("M70 92 L130 92 L130 128 L70 128 Z", P.Q2, 4) + bl("M70 92 L130 92 L130 128 L70 128 Z", P.Q1, 0.3) +
    ln(100, 128, 100, 148, P.Q2, 3) +
    d("M100 186 C82 172 66 160 66 146 C66 136 74 130 82 130 C90 130 96 134 100 140 C104 134 110 130 118 130 C126 130 134 136 134 146 C134 160 118 172 100 186 Z", P.MG, 4)),
  /* There is deliberately NO generic `fan` motif here. A free-floating vector fan
     sat next to the one she is drawn holding and read as misalignment, so the only
     fan in the vocabulary is fanHand(), which is measured onto her hand. */
  /* Her folding fan in the 立绘 is a MEASURED sector: circle-fit of three points
     on the leaf's outer arc -> pivot (0.345W, 0.375H) of the sprite canvas (her
     knuckles), outer radius 0.1956W, inner 0.0518W, spanning -42..+62 deg
     (0 = straight up, + = clockwise). See tools/char-anchors.mjs + fanfit3.png.
     fanHand() draws a stroke-only skeleton in that exact geometry at the scale
     of the sprite the act uses, so the vector fan registers on the one she is
     actually holding instead of floating next to it. No fill on purpose: a
     translucent leaf would mute the art underneath it. */
  fanHand: (silX, silY, silS, o = {}) => {
    const A0 = -42, A1 = 62;
    const R = 0.1956 * silS, ri = 0.0518 * silS, p = 8;
    const px = silX + 0.345 * silS, py = silY + 0.375 * 1.5 * silS;
    const s0 = Math.abs(Math.sin(rad(A0))), s1 = Math.sin(rad(A1));
    const left = Math.round(px - R * s0 - p), top = Math.round(py - R - p);
    const w = Math.round(R * (s0 + s1) + 2 * p), h = Math.round(R + 7 + 2 * p);
    const bpx = R * s0 + p, bpy = R + p;
    const at = (r, a) => pt(bpx, bpy, r, a);
    const angs = [0, 1, 2, 3, 4, 5, 6].map((i) => +(A0 + (i * (A1 - A0)) / 6).toFixed(1));
    const ribs = angs
      .map((a) => {
        const t = at(R, a);
        return `<g data-ang="${a}" data-piv="${bpx.toFixed(1)} ${bpy.toFixed(1)}" class="rib">` +
          ln(bpx, bpy, t[0], t[1], o.rib || P.Q2, 2) + `</g>`;
      })
      .join("");
    const [ox0, oy0] = at(R, A0), [ox1, oy1] = at(R, A1);
    const [ix0, iy0] = at(ri, A0), [ix1, iy1] = at(ri, A1);
    return `<div class="motif" id="${o.id || ""}" style="left:${left}px;top:${top}px${o.style ? ";" + o.style : ""}">` +
      svg(w, h, "",
        d(`M${ox0} ${oy0} A${R.toFixed(1)} ${R.toFixed(1)} 0 0 1 ${ox1} ${oy1}`, o.arc || P.Q1, 2.5) +
        d(`M${ix0} ${iy0} A${ri.toFixed(1)} ${ri.toFixed(1)} 0 0 1 ${ix1} ${iy1}`, o.rib || P.Q2, 1.5) +
        ribs + dot(bpx, bpy, 4, o.piv || P.MG)) +
      `</div>`;
  },
  /* qwen38-vector.svg is the keyed 立绘 traced into polygons (tools/vectorize-
     portrait.py — contour + luminance level sets, no generation) on the same
     2:3 canvas, so char-anchors fractions and M.fanHand stay valid. Loaded as
     an <img> rather than inlined: it is 20 KB and appears once per act. */
  silhouette: (s) =>
    `<img class="silimg" src="assets/character/qwen38-vector.svg" width="${s}" height="${Math.round(s * 1.5)}" alt="" style="opacity:0;filter:drop-shadow(0 0 18px rgba(159,123,255,.55))">`,
  wave: (s) => {
    let pts = [];
    for (let i = 0; i <= 60; i++) {
      const x = 8 + i * 3.1;
      const y = 100 + Math.sin(i * 0.55) * 34 * Math.sin(i * 0.11) + Math.sin(i * 1.7) * 10;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return sc(s, "gda", `<polyline data-draw pathLength="1" points="${pts.join(" ")}" stroke="${P.DA}" stroke-width="3"/>` +
      ln(8, 100, 194, 100, P.HL, 2));
  },
  /* The same signal in a TIGHT box. wave() is a square 200u motif, so only its
     middle third is ink and ~28% of the box top and bottom is empty — place it
     low and the invisible box hangs into the lyric band while the line itself is
     still clear. A waveform that has to sit near the stage floor is authored
     here instead, where box == drawing and `h` is the peak-to-peak swing. */
  waveStrip: (w, h) => {
    let pts = [];
    for (let i = 0; i <= 90; i++) {
      const x = 8 + (i / 90) * (w - 16);
      const y = h / 2 + Math.sin(i * 0.55) * h * 0.3 * Math.sin(i * 0.11) + Math.sin(i * 1.7) * h * 0.09;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return svg(w, h, "gda", `<polyline data-draw pathLength="1" points="${pts.join(" ")}" stroke="${P.DA}" stroke-width="3"/>` +
      ln(8, h / 2, w - 8, h / 2, P.HL, 2));
  },
};

export const M = MOTIFS;

/* Primitives, exported so a frame spec can author an act-local motif in its own
   file without touching this library (keeps acts independent of each other). */
export { sc, svg, d, ln, ci, bl, blf, dot, rad, pt };
