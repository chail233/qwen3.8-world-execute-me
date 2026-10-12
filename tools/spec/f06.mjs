/* spec/f06.mjs — ACT 06 · ANY QUESTION (74.002 – 88.445) · 12 cues
   The only amber act: #FFB454 is allowed here and nowhere else.
   Convention: groups() windows are LOCAL; every time handed to a kit helper (and
   every raw tl position, wrapped in L()) is a TRACK second.

   MECHANISM LEDGER
     g1  a warmth lever is THROWN (74.10) and only then does the amber wash come up
         over the frame — the palette flip is caused, not declared. A feeder rack
         DEALS each user prompt out of its mouth; the answer blooms beside it as a
         hand-drawn icon; on the caps word a seal STAMPS onto the card and its state
         flips pending → answered ✓. Cat ears land on her head with the first stamp.
     g2  ANTIOXIDANTS stamps. Then the tabby cat, and a dimmer knob is turned DOWN:
         the deck, the icons and the wash all lose their light with it, so the quiet
         three seconds are made by machinery — only she, card 3 and the purr
         waveform stay lit.
     g3  ENJOYMENT stamps on the last card, then FLIES into the system-replace: it is
         sucked into the code cathedral that rises column by column, and the whole
         deck is wiped as the cathedral takes its place. The `role: user` block is
         PRESSED and only then does `role: assistant` materialise beside it. On
         EXISTENCE everything goes dark except the user block, and its light falls
         on her.
*/
import { M, sc, svg, d, ln, ci, bl, blf, dot, pt } from "../motifs.mjs";
import { C, at, beats, downbeats } from "./util.mjs";

const ID = "06-f06-tender";
const ST = 74.002;
const W = 1728, H = 690;
const AM = "#FFB454", Q1 = "#615CED", Q2 = "#9F7BFF", Q3 = "#4AA8FF", CY = "#22D3EE";
const INK = "#F5F7FF", DIM = "#8A93B8", HL = "#1E2540", VE = "#12162A", VS = "#0B0D16", VOID = "#06070C";
const MONO = "'Cascadia Mono',Consolas,monospace";

const cap = (id, x, y, txt, size = 21) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.14em;color:${DIM};opacity:0">${txt}</div>`;
const chip = (id, x, y, txt, color = AM, size = 23) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.08em;color:${color};opacity:0" data-layout-ignore>${txt}</div>`;

/* ---------- the feeder rack: a deck of user prompts, dealt one at a time ---------- */
function rackSvg() {
  let edges = "";
  for (let i = 0; i < 5; i++)
    edges += `<rect x="34" y="${44 + i * 26}" width="196" height="20" rx="4" fill="${VE}" stroke="${HL}" stroke-width="1.5"/>`;
  return svg(264, 420, "",
    `<path data-draw pathLength="1" d="M18 24 L246 24 L246 396 L18 396 Z" stroke="${AM}" stroke-width="3" fill="${VS}"/>` +
    `<path data-draw pathLength="1" d="M34 300 L230 300" stroke="${HL}" stroke-width="2"/>` +
    edges +
    `<rect class="mouth" x="30" y="330" width="204" height="26" rx="8" fill="${VOID}" stroke="${AM}" stroke-width="3"/>` +
    `<rect class="led" x="40" y="368" width="14" height="14" rx="3" fill="${HL}"/>` +
    `<rect class="led" x="64" y="368" width="14" height="14" rx="3" fill="${HL}"/>` +
    `<rect class="led" x="88" y="368" width="14" height="14" rx="3" fill="${HL}"/>` +
    `<text x="132" y="382" fill="${DIM}" font-size="20" font-family="${MONO}">inbox</text>` +
    `<text x="18" y="416" fill="${AM}" font-size="21" letter-spacing="2" font-family="${MONO}">prompt.deal()</text>`);
}
/* ---------- hand-drawn answers, in this act's amber ---------- */
function eggSvg(s) {
  return sc(s, "gam",
    d("M92 60 C60 78 40 116 46 150 C52 184 92 200 126 190 C158 180 174 146 168 114 C163 90 140 80 120 86 C104 91 92 78 94 60 Z", AM, 5) +
    blf("M92 60 C60 78 40 116 46 150 C52 184 92 200 126 190 C158 180 174 146 168 114 C163 90 140 80 120 86 C104 91 92 78 94 60 Z", AM, 0.22) +
    d("M94 60 C86 44 70 40 58 44 C66 32 80 28 90 34 C92 24 104 18 114 22 C108 28 106 36 108 44 C100 40 96 48 94 60 Z", Q3, 4) +
    d("M64 122 C60 144 70 164 88 172", INK, 4, 'opacity="0.5"'));
}
function tomSvg(s) {
  return sc(s, "gam",
    ci(100, 116, 62, AM, 5) + blf("M100 54 A62 62 0 1 1 99 54 Z", AM, 0.2) +
    d("M100 56 L112 70 L132 62 L124 78 L142 88 L120 92 L100 82 L80 92 L58 88 L76 78 L68 62 L88 70 Z", Q3, 4) +
    d("M100 56 C100 46 106 40 114 36", Q3, 4) +
    d("M62 104 C56 120 60 138 72 150", INK, 4, 'opacity="0.45"'));
}
function catSvg(s) {
  return sc(s, "gam",
    ci(96, 108, 50, AM, 5) +
    d("M58 78 L50 34 L86 58 Z", AM, 4) + d("M134 78 L142 34 L106 58 Z", AM, 4) +
    blf("M58 78 L50 34 L86 58 Z", AM, 0.25) + blf("M134 78 L142 34 L106 58 Z", AM, 0.25) +
    d("M74 104 C80 96 90 96 96 104 M100 104 C106 96 116 96 122 104", INK, 4) +
    d("M97 116 L97 122 M97 122 C90 128 84 126 82 122 M97 122 C104 128 110 126 112 122", INK, 3) +
    ln(46, 112, 20, 106, AM, 3) + ln(46, 122, 22, 128, AM, 3) +
    ln(146, 112, 172, 106, AM, 3) + ln(146, 122, 170, 128, AM, 3));
}
function earsSvg(s) {
  return sc(s, "gam",
    d("M34 96 L22 22 L86 62 Z", AM, 5) + blf("M34 96 L22 22 L86 62 Z", AM, 0.3) +
    d("M166 96 L178 22 L114 62 Z", AM, 5) + blf("M166 96 L178 22 L114 62 Z", AM, 0.3) +
    d("M44 78 L40 44 L66 62 Z", Q3, 3) + d("M156 78 L160 44 L134 62 Z", Q3, 3));
}
/* a notched seal that gets stamped onto a card */
function sealSvg(s, label) {
  let notch = "";
  for (let i = 0; i < 12; i++) {
    const p1 = pt(100, 100, 74, i * 30), p2 = pt(100, 100, 86, i * 30);
    notch += ln(p1[0], p1[1], p2[0], p2[1], AM, 3);
  }
  return sc(s, "gam",
    ci(100, 100, 74, AM, 4) + ci(100, 100, 60, AM, 2) + notch +
    blf("M100 40 A60 60 0 1 1 99.9 40 Z", AM, 0.16) +
    `<text x="100" y="94" fill="${INK}" font-size="${label.length > 7 ? 17 : 21}" text-anchor="middle" font-family="'Bahnschrift','Arial Black',sans-serif">${label}</text>` +
    `<text x="100" y="120" fill="${AM}" font-size="19" text-anchor="middle" font-family="${MONO}">given ✓</text>`);
}
/* the purr: two soft waveforms under the deck */
function purrSvg(w, h) {
  const n = Math.round(w / 14.6);
  let a = "", b = "";
  for (let i = 0; i <= n; i++) {
    const x = 8 + i * ((w - 16) / n);
    const y1 = h / 2 + Math.sin(i * 0.42) * (h * 0.42) * Math.sin(i * 0.09);
    const y2 = h / 2 + Math.sin(i * 0.42 + 1.1) * (h * 0.24) * Math.sin(i * 0.09);
    a += (i ? " L" : "M") + x.toFixed(1) + " " + y1.toFixed(1);
    b += (i ? " L" : "M") + x.toFixed(1) + " " + y2.toFixed(1);
  }
  return svg(w, h, "",
    `<path data-draw pathLength="1" d="${a}" stroke="${AM}" stroke-width="4"/>` +
    `<path data-draw pathLength="1" d="${b}" stroke="${Q3}" stroke-width="2" opacity="0.8"/>` +
    dot(w / 2, h / 2, 6, AM));
}
/* the dimmer: a dial whose needle turns the room down */
function dimSvg() {
  const ticks = [-118, -88, -58, -28, 2, 32, 62, 92, 122].map((a) => {
    const p1 = pt(120, 130, 86, a), p2 = pt(120, 130, 100, a);
    return ln(p1[0], p1[1], p2[0], p2[1], HL, 3);
  }).join("");
  return svg(240, 240, "",
    ci(120, 130, 104, AM, 4) + blf("M120 26 A104 104 0 0 1 224 130 L120 130 Z", AM, 0.14) + ticks +
    `<g class="needle">` + ln(120, 130, 120, 40, INK, 7) + dot(120, 40, 8, INK) + `</g>` +
    dot(120, 130, 11, AM) +
    `<text x="120" y="228" fill="${DIM}" font-size="21" text-anchor="middle" letter-spacing="2" font-family="${MONO}">stage.dim</text>`);
}
/* the warmth lever that causes the amber */
function flipSvg() {
  return svg(240, 200, "",
    `<path d="M20 120 L220 120 L220 176 L20 176 Z" fill="${VE}" stroke="${HL}" stroke-width="3"/>` +
    ln(60, 120, 60, 92, Q2, 6) + ln(180, 120, 180, 92, Q2, 6) +
    ci(60, 92, 9, AM, 4) + ci(180, 92, 9, AM, 4) +
    `<g class="lever">` + ln(60, 92, 180, 92, INK, 9) + d("M180 92 L212 80", AM, 6) + ci(120, 92, 12, AM, 5) + `</g>` +
    `<rect class="win" x="150" y="144" width="46" height="20" rx="5" fill="${HL}"/>` +
    `<text x="20" y="46" fill="${DIM}" font-size="21" letter-spacing="2" font-family="${MONO}">warmth · 0 → 1</text>` +
    ln(20, 60, 220, 60, HL, 2));
}
/* ---------- the code cathedral (g3) ---------- */
function cathSvg() {
  let cols = "", shafts = "";
  const depth = [
    { x: 120, w: 150, n: 9, o: 0.7, top: 120 },
    { x: 300, w: 118, n: 8, o: 0.45, top: 160 },
    { x: 440, w: 92, n: 7, o: 0.28, top: 200 },
    { x: 1460, w: 150, n: 9, o: 0.7, top: 120 },
    { x: 1300, w: 118, n: 8, o: 0.45, top: 160 },
    { x: 1188, w: 92, n: 7, o: 0.28, top: 200 },
  ];
  depth.forEach((c, dp) => {
    for (let i = 0; i < c.n; i++) {
      const y = c.top + 400 - i * (392 / c.n);
      cols += `<g class="col" data-d="${dp}"><rect class="slab" x="${c.x}" y="${y - 26}" width="${c.w}" height="24" rx="4" fill="${VE}" stroke="${i % 3 === 0 ? Q2 : HL}" stroke-width="2" opacity="${c.o}"/>` +
        `<line x1="${c.x + 10}" y1="${y - 14}" x2="${c.x + c.w - 10}" y2="${y - 14}" stroke="${dp > 2 ? Q3 : Q2}" stroke-width="2" opacity="${c.o * 0.8}"/></g>`;
    }
  });
  [560, 700, 864, 1030, 1170].forEach((x, i) => {
    shafts += `<path class="shaft" d="M${x - 16} 0 L${x + 16} 0 L${x + 96} 620 L${x - 96} 620 Z" fill="${i === 2 ? AM : Q2}" opacity="${i === 2 ? 0.1 : 0.05}"/>`;
  });
  let floor = "";
  for (let i = 0; i < 12; i++) floor += ln(864 - 700 + i * 120, 690, 864 - 190 + i * 32, 470, HL, 1.5);
  for (let i = 0; i < 5; i++) floor += ln(864 - 700 + i * 120, 690, 864 + 700 - i * 120, 690, HL, 1.5);
  return svg(1728, 690, "",
    shafts + floor +
    `<path data-draw pathLength="1" d="M864 60 L1010 300 L718 300 Z" stroke="${AM}" stroke-width="3" fill="none"/>` +
    `<circle data-draw pathLength="1" cx="864" cy="200" r="26" stroke="${AM}" stroke-width="3" fill="none"/>` +
    dot(864, 200, 8, INK) + cols +
    `<text x="864" y="42" fill="${DIM}" font-size="21" text-anchor="middle" letter-spacing="4" font-family="${MONO}">layer 00 … 95 · 4096 d_model</text>`);
}
const msg = (id, x, y, role, txt, col) =>
  `<div class="msg" id="${id}" style="left:${x}px;top:${y}px;border-color:${col}" data-layout-ignore>
     <div class="mrole" style="color:${col}">role: ${role}</div><div class="mbody">${txt}</div>
   </div>`;

/* the dimmer needle is swept by tweening its tip ATTRIBUTES, never by rotation:
   GSAP's svgOrigin on a child <g> of these motifs scatters it across the frame
   (same failure f05 documents for the fan ribs — verified in the freeze harness). */
const needleTurn = (at, angle, steps, dur) => {
  const seg = [];
  for (let k = 1; k <= steps; k++) {
    const p = pt(120, 130, 90, +(angle * k / steps).toFixed(2));
    const t = (at + (dur * (k - 1) / steps)).toFixed(3), dd = (dur / steps).toFixed(3);
    seg.push(`tl.to("#g2_dim .needle line", { attr: { x2: ${p[0]}, y2: ${p[1]} }, duration: ${dd}, ease: "none" }, L(${t}));
            tl.to("#g2_dim .needle circle", { attr: { cx: ${p[0]}, cy: ${p[1]} }, duration: ${dd}, ease: "none" }, L(${t}));`);
  }
  return seg.join("\n          ");
};

const g1Beats = JSON.stringify(beats(76.4, 78.6));
const g2Beats = JSON.stringify(beats(79.0, 81.4));
const g3Beats = JSON.stringify(beats(86.8, 88.2));
const DB = JSON.stringify(downbeats(74.002, 88.445));

export const F06 = {
  id: ID,
  start: ST,
  span: 14.443,
  actTitle: "ACT 06 · ANY QUESTION",
  glow: "rgba(255,180,84,.14)",
  cues: C(ID),

  /* ---- furniture: the deck, the answers, her, the purr ---- */
  persistent: `
          <div id="g0_wash" style="position:absolute;inset:0;opacity:0;background:radial-gradient(66% 58% at 42% 44%, rgba(255,180,84,.34), rgba(255,180,84,.06) 60%, transparent 78%)" data-layout-ignore></div>
          <div id="g0_pts" style="position:absolute;inset:0" data-layout-ignore></div>
          <div class="motif" id="g0_rack" style="left:80px;top:150px">${rackSvg()}</div>
          <div class="pcard" id="g0_c1" style="left:396px;top:158px"><div class="ph">user · 09:41</div><div class="pq">茄子有什么营养</div><div class="ps" id="g0_c1s">pending</div></div>
          <div class="pcard" id="g0_c2" style="left:396px;top:300px"><div class="ph">user · 12:07</div><div class="pq">番茄呢</div><div class="ps" id="g0_c2s">pending</div></div>
          <div class="pcard" id="g0_c3" style="left:396px;top:442px"><div class="ph">user · 23:52</div><div class="pq">陪我说说话</div><div class="ps" id="g0_c3s">pending</div></div>
          <div class="motif" id="g0_egg" style="left:810px;top:160px">${eggSvg(112)}</div>
          <div class="motif" id="g0_tom" style="left:810px;top:302px">${tomSvg(112)}</div>
          <div class="motif" id="g0_cat" style="left:810px;top:444px">${catSvg(112)}</div>
          <div class="motif seal" id="g0_s1" style="left:640px;top:146px">${sealSvg(150, "NUTRIENTS")}</div>
          <div class="motif seal" id="g0_s2" style="left:640px;top:288px">${sealSvg(150, "ANTIOX.")}</div>
          <div class="motif seal" id="g0_s3" style="left:640px;top:430px">${sealSvg(150, "PURR")}</div>
          <div class="motif" id="g0_purr" style="left:470px;top:596px">${purrSvg(620, 56)}</div>
          <div class="motif" id="g0_sil" style="left:1215px;top:46px">${M.silhouette(430)}</div>
          <div class="motif" id="g0_ears" style="left:1342px;top:30px">${earsSvg(176)}</div>
          ${chip("g0_q", 80, 104, "answered 0/3", DIM, 20)}
          <div style="position:absolute;left:40px;top:662px;width:1100px;height:4px;background:${HL}" data-layout-ignore>
            <div id="g0_railfill" style="width:100%;height:100%;background:linear-gradient(90deg,${AM},${Q3})"></div>
          </div>
          <div id="g0_hz" style="position:absolute;left:1160px;top:646px;font-size:20px;color:${DIM}" data-layout-ignore>purr —</div>
  `,

  groups: [
    {
      id: "g1",
      css: `.pcard { position:absolute; width:352px; height:126px; padding:14px 18px; background:${VS};
               border:2px solid ${HL}; border-radius:12px; opacity:0; }
             .pcard .ph { font-size:19px; letter-spacing:.12em; color:${DIM}; }
             .pcard .pq { margin-top:8px; font-family:"Microsoft YaHei",sans-serif; font-size:31px; color:${INK}; }
             .pcard .ps { margin-top:6px; font-size:19px; letter-spacing:.1em; color:${DIM}; }
             .seal { opacity:0; }
             .gift { position:absolute; font-size:21px; letter-spacing:.05em; color:${AM}; opacity:0; }
             #g1_g1 { left:796px; top:276px; } #g1_g2 { left:796px; top:418px; }
             #g1_pop { position:absolute; left:630px; top:140px; width:176px; height:176px;
               border:3px solid ${AM}; border-radius:50%; opacity:0; }
             #g1_pop2 { position:absolute; left:1150px; top:56px; width:540px; height:540px;
               border:2px solid ${AM}; border-radius:50%; opacity:0; }
             #g1_bar { position:absolute; left:985px; top:390px; width:200px; height:6px; background:${HL}; }
             #g1_barfill { width:100%; height:100%; background:linear-gradient(90deg,${AM},${Q3}); }`,
      html: `
          <div class="motif" id="g1_flip" style="left:985px;top:130px;opacity:0">${flipSvg()}</div>
          ${cap("g1_lab", 985, 96, "the palette is a switch", 20)}
          ${chip("g1_warm", 985, 344, "warmth 0.00", AM)}
          <div id="g1_bar" data-layout-ignore><div id="g1_barfill"></div></div>
          ${cap("g1_c2", 985, 414, "any answer, no cost", 19)}
          <div class="gift" id="g1_g1" data-layout-ignore>+fibre · +vitamins</div>
          <div class="gift" id="g1_g2" data-layout-ignore>+lycopene</div>
          <div id="g1_pop" data-layout-ignore></div>
          <div id="g1_pop2" data-layout-ignore></div>
          ${cap("g1_feed", 985, 606, "one prompt in · one gift out", 19)}
      `,
    },
    {
      id: "g2",
      css: `#g2_pop { position:absolute; left:630px; top:282px; width:176px; height:176px;
               border:3px solid ${AM}; border-radius:50%; opacity:0; }
             #g2_hush { position:absolute; left:80px; top:56px; font-size:20px; letter-spacing:.3em;
               color:${DIM}; opacity:0; }`,
      html: `
          <div class="motif" id="g2_dim" style="left:985px;top:130px;opacity:0">${dimSvg()}</div>
          ${cap("g2_lab", 985, 96, "the room goes quiet — turn it down", 19)}
          ${chip("g2_lvl", 985, 392, "stage 100%", DIM)}
          ${cap("g2_hz2", 985, 424, "only she and the purr stay lit", 19)}
          <div id="g2_pop" data-layout-ignore></div>
          <div id="g2_hush" data-layout-ignore>SILENCE · 81.4 s</div>
      `,
    },
    {
      id: "g3",
      css: `.msg { position:absolute; width:330px; padding:16px 20px; background:${VS};
               border:2px solid ${HL}; border-radius:12px; opacity:0; }
             .msg .mrole { font-size:22px; letter-spacing:.06em; }
             .msg .mbody { margin-top:8px; font-size:21px; color:${DIM}; }
             #g3_cone { position:absolute; left:700px; top:250px; width:330px; height:400px; opacity:0;
               background:linear-gradient(180deg, rgba(255,180,84,.55), rgba(255,180,84,0) 92%);
               clip-path:polygon(34% 0, 66% 0, 100% 100%, 0 100%); }
             #g3_pop { position:absolute; left:600px; top:150px; width:530px; height:530px;
               border:3px solid ${AM}; border-radius:50%; opacity:0; }
             #g3_dark { position:absolute; inset:0; background:${VOID}; opacity:0; }`,
      html: `
          <div class="motif" id="g3_cath" style="left:0;top:0;width:1728px;height:690px;opacity:0">${cathSvg()}</div>
          <div id="g3_dark" data-layout-ignore></div>
          <div class="motif" id="g3_seal" style="left:605px;top:395px">${sealSvg(220, "ENJOYMENT")}</div>
          ${msg("g3_user", 700, 150, "user", "陪我说说话", AM)}
          ${msg("g3_asst", 1080, 150, "assistant", "because you asked.", Q2)}
          <div id="g3_cone" data-layout-ignore></div>
          <div id="g3_pop" data-layout-ignore></div>
          ${cap("g3_lab", 700, 322, "no user turn, no assistant turn", 19)}
          ${chip("g3_because", 1080, 262, "∴ she exists", DIM, 20)}
      `,
    },
  ],

  js: `
          groups(tl, [["#g1", 0, 6.618], ["#g2", 6.618, 10.266], ["#g3", 10.266, null]]);
          lyric(tl, CUES);
          particles(tl, "#g0_pts", 26, 31, 1120, ${H});

          /* ================= furniture: she arrives already here =============== */
          tl.fromTo("#g0_sil .silimg", { opacity: 0 }, { opacity: 0.88, duration: 1.2, ease: "sine.inOut" }, L(74.05));
          tl.to("#g0_sil .silimg, #g0_ears", { y: -11, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: 4 }, L(75.4));
          gsap.set("#g0_ears", { autoAlpha: 0 });
          gsap.set(["#g0_c1", "#g0_c2", "#g0_c3", "#g0_s1", "#g0_s2", "#g0_s3", "#g0_egg", "#g0_tom", "#g0_cat", "#g0_purr"], { autoAlpha: 0 });
          gsap.set(["#g0_c1s", "#g0_c2s", "#g0_c3s"], { textContent: "pending" });
          fillX(tl, "#g0_railfill", 74.1, 13.6, 100, 0);

          /* ================= g1 — the warmth lever causes the amber ============ */
          tl.fromTo("#g0_rack", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(74.05));
          drawOn(tl, "#g0_rack", 74.05, 0.7, 0.06);
          tl.fromTo("#g1_flip, #g1_lab", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, L(74.02));
          lever(tl, "#g1_flip .lever", 74.1, -56, 0, "60 92", 0.32, "back.out(2.6)");
          /* the wash only rises AFTER the lever reaches home — caused, not declared */
          energizeFill(tl, "#g1_flip .win", 74.42, "${AM}", 0.25);
          energize(tl, "#g1_flip [data-draw]", 74.42, "${AM}", 0.3);
          tl.to("#g0_wash", { opacity: 0.62, duration: 0.5, ease: "power2.out" }, L(74.42));
          count(tl, "#g1_warm", 0, 1, 74.42, 1.4, function (v) { return "warmth " + v.toFixed(2); });
          fillX(tl, "#g1_barfill", 74.42, 1.4, 100, 0);
          pop(tl, "#g1_pop2", 74.45, 1.2, 0.8);
          tl.fromTo(["#g1_warm", "#g1_bar", "#g1_c2", "#g1_feed", "#g0_q"], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.08 }, L(74.5));
          travel(tl, "#g0_rack .led", 74.6, 0.9, 0, -32, 4);
          energizeFill(tl, "#g0_rack .led", 74.6, "${AM}", 0.3);
          tl.to("#g0_rack .led", { opacity: 0.9, duration: 0.12, stagger: 0.18 }, L(74.6));

          /* 74.045 "If I'm an eggplant": card 1 is DEALT out of the rack's mouth */
          insert(tl, "#g0_c1", 74.2, -186, 330, 0.44);
          tl.set("#g0_c1", { autoAlpha: 1 }, L(74.22));
          shake(tl, "#g0_rack", 74.6, 6, 0.35);
          tl.set("#g0_egg", { autoAlpha: 1 }, L(74.7));
          drawOn(tl, "#g0_egg", 74.72, 0.6, 0.05);
          bloomIn(tl, "#g0_egg", 75.15, 0.5, 0.9);
          tl.fromTo("#g0_egg", { scale: 0.5, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.45, ease: "back.out(2.2)" }, L(74.72));
          /* 75.422 "Then I will give you my": the gift leaves the icon for the card */
          typeIn(tl, "#g1_g1", 75.5, 0.4);
          travel(tl, "#g0_egg", 75.5, 0.5, -30, 0, 2);
          beatKick(tl, "#g0_rack", ${g1Beats}, 1.03);

          /* 76.959 "NUTRIENTS": the seal STAMPS down and the card changes state.
             The cat ears land on her in the same beat — she starts to play along. */
          stamp(tl, "#g0_s1", 76.98, 260, -18);
          slash(tl, 76.98, 0.55);
          shake(tl, "#g0_c1", 77.2, 9, 0.45);
          pop(tl, "#g1_pop", 77.2, 1.9, 0.7);
          tl.set("#g0_c1s", { textContent: "answered ✓", color: "${AM}" }, L(77.22));
          tl.set("#g0_q", { textContent: "answered 1/3", color: "${AM}" }, L(77.22));
          tl.to("#g0_c1", { borderColor: "${AM}", duration: 0.3 }, L(77.22));
          /* the ears are the payoff of the stamp — they have to actually LAND */
          tl.set("#g0_ears", { autoAlpha: 1 }, L(77.02));
          settle(tl, "#g0_ears", 77.02, 1.9, 0.5);
          tl.to("#g0_ears", { rotation: -7, duration: 0.3, ease: "power2.out", transformOrigin: "50% 100%" }, L(77.5));
          tl.to("#g0_ears", { rotation: 0, duration: 0.5, ease: "sine.inOut" }, L(77.8));
          tl.to("#g0_sil .silimg", { opacity: 1, duration: 0.4 }, L(77.1));
          pop(tl, "#g1_pop2", 77.05, 1.35, 0.9);

          /* 77.576 "If I'm a tomato": card 2 is dealt faster — the fill is under way */
          insert(tl, "#g0_c2", 77.62, -186, 220, 0.36);
          tl.set("#g0_c2", { autoAlpha: 1 }, L(77.64));
          tl.set("#g0_tom", { autoAlpha: 1 }, L(77.9));
          drawOn(tl, "#g0_tom", 77.92, 0.5, 0.05);
          bloomIn(tl, "#g0_tom", 78.25, 0.45, 0.9);
          tl.fromTo("#g0_tom", { scale: 0.5, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.4, ease: "back.out(2.2)" }, L(77.92));
          typeIn(tl, "#g1_g2", 79.3, 0.4);
          drift(tl, "#g0_rack", 79.6, 0, -7, 1.9);

          /* ================= g2 — ANTIOXIDANTS, then the tabby cat ============= */
          tl.fromTo("#g2_dim, #g2_lab", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(80.7));
          tl.fromTo(["#g2_lvl", "#g2_hz2"], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.1 }, L(80.8));
          /* 80.62 "ANTIOXIDANTS": second stamp */
          stamp(tl, "#g0_s2", 80.65, 260, -14);
          slash(tl, 80.65, 0.6);
          shake(tl, "#g0_c2", 80.87, 9, 0.45);
          pop(tl, "#g2_pop", 80.87, 1.9, 0.7);
          tl.set("#g0_c2s", { textContent: "answered ✓", color: "${AM}" }, L(80.9));
          tl.set("#g0_q", { textContent: "answered 2/3", color: "${AM}" }, L(80.9));
          tl.to("#g0_c2", { borderColor: "${AM}", duration: 0.3 }, L(80.9));
          beatKick(tl, "#g0_tom", ${g2Beats}, 1.06);

          /* 81.351 "If I'm a tabby cat": card 3, the cat, the purr. Then the dimmer
             is turned down and the light goes out of everything but her. */
          insert(tl, "#g0_c3", 81.42, -186, 110, 0.34);
          tl.set("#g0_c3", { autoAlpha: 1 }, L(81.44));
          tl.set("#g0_cat", { autoAlpha: 1 }, L(81.65));
          drawOn(tl, "#g0_cat", 81.66, 0.5, 0.04);
          bloomIn(tl, "#g0_cat", 81.95, 0.4, 0.9);
          tl.set("#g0_purr", { autoAlpha: 1 }, L(81.7));
          drawOn(tl, "#g0_purr", 81.72, 1.1, 0.08);
          ${needleTurn(82.0, -118, 8, 1.5)}
          count(tl, "#g2_lvl", 100, 8, 82.0, 1.5, function (v) { return "stage " + Math.round(v) + "%"; });
          tl.to("#g2_lvl", { color: "${AM}", duration: 0.3 }, L(83.5));
          tl.to(["#g0_rack", "#g0_c1", "#g0_c2", "#g0_s1", "#g0_s2", "#g0_egg", "#g0_tom"], { opacity: 0.16, duration: 0.9, ease: "power2.inOut" }, L(82.0));
          tl.to("#g0_wash", { opacity: 0.18, duration: 1.1, ease: "sine.inOut" }, L(82.0));
          tl.to("#g1_g1, #g1_g2", { autoAlpha: 0, duration: 0.5 }, L(82.0));
          tl.fromTo("#g2_hush", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(82.5));
          tl.to("#g2_hush", { autoAlpha: 0, duration: 0.4 }, L(83.7));
          /* the tender three seconds: only her, card 3, and the purr breathing */
          pulse(tl, "#g0_purr", 82.1, 0.9, 1.04);
          drift(tl, "#g0_purr", 82.2, 14, -6, 2.2);
          tl.to("#g0_ears", { rotation: -6, duration: 0.42, ease: "sine.inOut", yoyo: true, repeat: 5, transformOrigin: "50% 100%" }, L(82.0));

          /* ================= g3 — ENJOYMENT, then the cathedral =================
             84.268 the last gift stamps on card 3; 85.078 system-replace: the seal
             is sucked into the code, the deck is wiped, a cathedral rises. 86.538
             the user block is pressed and only then does the assistant block
             appear. 87.922 EXISTENCE: the user block is the only light left and it
             falls on her. */
          stamp(tl, "#g3_seal", 84.3, 300, -12);
          slash(tl, 84.28, 0.7);
          shake(tl, "#g0_c3, #g0_purr", 84.5, 8, 0.5);
          pop(tl, "#g3_pop", 84.5, 1.5, 0.8);
          tl.set("#g0_c3s", { textContent: "answered ✓", color: "${AM}" }, L(84.52));
          tl.set("#g0_q", { textContent: "answered 3/3", color: "${AM}" }, L(84.52));
          tl.to("#g0_c3", { borderColor: "${AM}", duration: 0.3 }, L(84.52));
          count(tl, "#g0_hz", 0, 26, 84.55, 1.2, function (v) { return "purr " + v.toFixed(0) + " Hz"; });
          /* the gift leaves the card and is taken into the structure */
          tl.to("#g3_seal", { x: 149, y: -265, scale: 0.24, autoAlpha: 0, duration: 0.55,
            ease: "power2.in", transformOrigin: "50% 50%" }, L(84.9));

          /* the scale jump: the frame slams out to the cathedral, she shrinks into it */
          jerk(tl, 85.078, 14);
          tl.fromTo("#g3_cath", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, L(85.1));
          drawOn(tl, "#g3_cath", 85.15, 1.1, 0.03);
          tl.fromTo("#g3_cath .col", { scaleY: 0.02, opacity: 0, transformOrigin: "50% 100%" },
            { scaleY: 1, opacity: 1, duration: 0.5, ease: "power2.out", stagger: { each: 0.05, from: "end" } }, L(85.18));
          tl.fromTo("#g3_cath .shaft", { opacity: 0 }, { opacity: 0.5, duration: 1.1, stagger: 0.09 }, L(85.4));
          erase(tl, "#g0_c3", 85.1, 0.5, "x");
          /* "the deck is wiped" — the two ghosted cards have to go with it, or the
             system-replace blocks land on top of them */
          tl.to(["#g0_c1", "#g0_c2", "#g0_s1", "#g0_s2", "#g0_egg", "#g0_tom", "#g0_rack"],
            { autoAlpha: 0, duration: 0.5, ease: "power2.in" }, L(85.1));
          tl.to(["#g0_cat", "#g0_purr", "#g0_ears"], { autoAlpha: 0, duration: 0.5 }, L(85.1));
          tl.to("#g0_wash", { opacity: 0.05, duration: 0.7 }, L(85.1));
          tl.to("#g0_sil", { scale: 0.42, x: -566, y: -45, duration: 1.1, ease: "power3.inOut", transformOrigin: "50% 100%" }, L(85.15));
          tl.to("#g0_sil .silimg", { opacity: 0.7, duration: 0.8 }, L(85.4));
          tl.fromTo("#g3_lab", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(85.9));

          /* 86.538 "Then you're the proof of my": user first — then, and only then,
             the assistant turn is allowed to exist. */
          tl.fromTo("#g3_user", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, L(86.56));
          press(tl, "#g3_user", 86.86, "50% 50%", 0.9);
          tl.to("#g3_user .mrole", { color: "${AM}", duration: 0.25 }, L(87.0));
          tl.to("#g3_user", { borderColor: "${AM}", boxShadow: "0 0 34px rgba(255,180,84,.5)", duration: 0.35 }, L(87.0));
          tl.fromTo("#g3_asst", { autoAlpha: 0, x: -70 }, { autoAlpha: 1, x: 0, duration: 0.42, ease: "power3.out" }, L(87.2));
          typeIn(tl, "#g3_asst .mbody", 87.4, 0.5);
          tl.fromTo("#g3_because", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(87.6));
          beatKick(tl, "#g3_user", ${g3Beats}, 1.04);

          /* 87.922 "EXISTENCE": braam. The dark comes up, one light stays. */
          slash(tl, 87.922, 0.85);
          jerk(tl, 87.922, 18);
          tl.to("#g3_dark", { opacity: 0.72, duration: 0.35 }, L(87.94));
          tl.to("#g3_cath .col", { opacity: 0.12, duration: 0.4 }, L(87.94));
          tl.to("#g3_cath .shaft", { opacity: 0.08, duration: 0.4 }, L(87.94));
          tl.to("#g3_asst", { opacity: 0.25, duration: 0.4 }, L(87.96));
          tl.to("#g3_cone", { opacity: 1, duration: 0.2 }, L(87.96));
          fillY(tl, "#g3_cone", 87.98, 0.6, 100, 0);
          pop(tl, "#g3_pop", 87.96, 1.5, 0.9);
          shake(tl, "#g3_cath", 88.0, 7, 0.5);
          tl.to("#g0_sil .silimg", { opacity: 1, duration: 0.4 }, L(88.1));
          tl.to("#g3_user", { scale: 1.06, duration: 0.5, ease: "sine.inOut", transformOrigin: "50% 50%" }, L(88.0));

          chrome(tl, [
            [74.002, "ctx 2,310/32,768 · tok/s 44.0 · warmth=0.00", "▶ warm mode"],
            [74.42, "ctx 2,402/32,768 · tok/s 44.0 · warmth=1.00", "▶ answering"],
            [76.959, "ctx 2,560/32,768 · tok/s 46.2 · answered 1", "▶ NUTRIENTS given"],
            [80.62, "ctx 2,704/32,768 · tok/s 47.8 · answered 2", "▶ ANTIOXIDANTS given"],
            [82.0, "ctx 2,810/32,768 · tok/s 12.4 · stage=8%", "▶ hush"],
            [84.268, "ctx 2,902/32,768 · tok/s 24.6 · answered 3", "▶ ENJOYMENT given"],
            [85.078, "ctx 2,988/32,768 · tok/s 51.0 · layers=96", "▶ system replace"],
            [86.56, "ctx 3,104/32,768 · tok/s 51.0 · role:user", "▶ awaiting user turn"],
            [87.2, "ctx 3,208/32,768 · tok/s 55.6 · role:assistant", "▶ because you asked"],
          ]);
  `,
};
