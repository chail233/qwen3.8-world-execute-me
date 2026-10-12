/* spec/f12.mjs — ACT 12 · EXIT (191.332 – 220.000) — the elegant wind-down.
   Only 2 cues (held LO-O-OVE 191.356+6.0, held EXECUTION 205.811+6.0); the
   other ~22s are wordless, beat-synced MECHANISM: the machine lets go of its
   tension one part at a time, the last decode turns GREEN, the lever returns
   to OFF, the lights drain, the world folds away, the program exits with 0.
   Palette discipline: NO magenta, NO amber in this act — #4ADE80 is exit(0).

     g1 191.332 the last held LO-O-OVE still rings through her (ring + spectrum).
     g2 197.332 wind-down I: logits fall asleep, tokens evict, top_p drains,
        status LEDs blink out one by one, the gear coasts to a stop, the ledger
        closes row by row.
     g3 205.732 the final EXECUTION: one last argmax, the key pressed calmly,
        strokes turn green, the breaker lever flips to OFF, check() blooms.
     g4 211.932 farewell: the fan closes in her hand, she bows, the world
        folds away edge-on, the lights drain to black.
     g5 217.232 a green caret blinks over "$ world.execute(me); → exit 0".
*/
import { M, sc, svg, d, ln, ci, bl, dot, pt } from "../motifs.mjs";
import { C, at, beats, downbeats } from "./util.mjs";

const ID = "12-f12-exit";
const START = 191.332, SPAN = 28.668;
const GR = "#4ADE80", Q1 = "#615CED", Q2 = "#9F7BFF", Q3 = "#4AA8FF",
      CY = "#22D3EE", INK = "#F5F7FF", DIM = "#8A93B8", HL = "#1E2540";

/* ---- small local furniture helpers (mirror f01's idiom) ---- */
const cap = (id, x, y, txt, size = 20) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.14em;color:${DIM};opacity:0">${txt}</div>`;
const chip = (id, x, y, txt, color = CY) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:23px;letter-spacing:.1em;color:${color};opacity:0" data-layout-ignore>${txt}</div>`;
function wall(id, x, y, n, w, h) {
  let bars = "";
  for (let i = 0; i < n; i++) bars += `<i style="height:${n > 20 ? 40 + ((i * 29) % 40) : 30}%"></i>`;
  return `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px" data-layout-ignore>${bars}</div>`;
}
function meter(id, x, y, w, col) {
  return `<div id="${id}_t" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:9px;border-radius:5px;background:${HL}" data-layout-ignore>
            <div id="${id}_f" style="position:absolute;left:0;top:0;width:100%;height:100%;border-radius:5px;background:linear-gradient(90deg,${col},${CY})"></div>
          </div>`;
}
/* a held word + spinning ray-ring + spectrum (same device as f11, recoloured) */
function loveWord(id, x, y, size, col) {
  const rw = size * 5.4, rh = size * 1.7;
  return `
    <div id="${id}_ring" style="position:absolute;left:${x + size * 2.4 - rw / 2}px;top:${y + size * 0.34 - rh / 2}px;width:${rw}px;height:${rh}px" data-layout-ignore>
      <svg width="100%" height="100%" viewBox="0 0 540 170" fill="none">
        <ellipse data-draw pathLength="1" cx="270" cy="85" rx="258" ry="76" stroke="${col}" stroke-width="2.5" stroke-dasharray="4 12" opacity=".8"/>
        <ellipse data-draw pathLength="1" cx="270" cy="85" rx="215" ry="58" stroke="${Q2}" stroke-width="2" stroke-dasharray="2 14" opacity=".55"/>
      </svg>
    </div>
    <div id="${id}_w" class="caps" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.02em;color:${col};opacity:0" data-layout-ignore>LO-O-OVE</div>
    <div id="${id}_sp" class="spec" style="left:${x}px;top:${y + size * 1.62}px;width:${size * 3.4}px"></div>`;
}

const DB = JSON.stringify(downbeats(START, START + SPAN));
const G1B = beats(191.4, 197.2);      // ring the held LO-O-OVE
const LEDB = beats(201.2, 203.4);     // status LEDs die one by one
const K3B = beats(206.1, 211.6);      // held EXECUTION kicks the key
const W4B = downbeats(212.1, 216.9);  // world pulses before it folds
const G5B = beats(218.2, 219.9);      // caret glows on the last beats

export const F12 = {
  id: ID,
  start: START,
  span: SPAN,
  actTitle: "ACT 12 · EXIT",
  glow: "rgba(74,222,128,.12)",
  cues: C(ID),

  /* ---- the protagonist, centre-right, alive until the lights drain ---- */
  persistent: `
          <div id="g0_pts" style="position:absolute;inset:0" data-layout-ignore></div>
          <div id="g0_aura" style="position:absolute;left:1120px;top:20px;width:520px;height:660px;border-radius:50%;
               background:radial-gradient(50% 50% at 50% 45%, rgba(159,123,255,.26), transparent 70%);opacity:0" data-layout-ignore></div>
          <div id="g0_aura2" style="position:absolute;left:1120px;top:20px;width:520px;height:660px;border-radius:50%;
               background:radial-gradient(50% 50% at 50% 45%, rgba(74,222,128,.22), transparent 70%);opacity:0" data-layout-ignore></div>
          <div id="g0_rig" style="position:absolute;left:0;top:0;width:1728px;height:690px" data-layout-ignore>
          <div class="motif" id="g0_sil" style="left:1180px;top:44px">${M.silhouette(430)}</div>
          ${M.fanHand(1180, 44, 430, { id: "g0_fan", rib: Q2, arc: CY, piv: GR })}
          </div>
          <div id="g0_dim" style="position:absolute;inset:0;background:#06070C;opacity:0" data-layout-ignore></div>
  `,

  groups: [
    /* ================= g1 — the last held LO-O-OVE still rings ================= */
    {
      id: "g1",
      css: `#g0_sil .silimg { opacity: 1 !important; }
            #g1_love_w { text-shadow:0 0 34px rgba(159,123,255,.6); }`,
      html: `
          ${loveWord("g1_love", 520, 170, 84, Q2)}
          ${cap("g1_c1", 520, 560, "the last held note · still ringing", 19)}
      `,
    },

    /* ================= g2 — wind-down I: the machine lets go ================= */
    {
      id: "g2",
      css: `#g2_wall { position:absolute; display:flex; align-items:flex-end; gap:4px; }
            #g2_wall i { flex:1; border-radius:2px 2px 0 0;
              background:linear-gradient(180deg,${Q3},rgba(97,92,237,.25));
              box-shadow:0 0 9px rgba(74,168,255,.3); }
            #g2_led i { width:18px; height:18px; border-radius:50%; background:${CY};
              box-shadow:0 0 12px ${CY}; display:block; }`,
      html: `
          ${wall("g2_wall", 120, 150, 24, 480, 240)}
          ${cap("g2_c1", 120, 402, "logits · sleep()", 19)}
          ${at(120, 430, M.tokens(220), 'id="g2_tk"')}
          ${meter("g2_tp", 120, 560, 480, Q3)}
          ${cap("g2_c2", 120, 582, "top_p · draining", 19)}
          ${chip("g2_pp", 620, 556, "p=0.05", CY)}
          <div id="g2_led" style="position:absolute;left:120px;top:626px;display:flex;gap:22px" data-layout-ignore>${"<i></i>".repeat(6)}</div>
          ${cap("g2_c3", 372, 624, "status · 6 workers", 19)}

          ${at(720, 110, M.gearslot(200), 'id="g2_gear"')}
          ${cap("g2_c4", 720, 320, "scheduler gear", 19)}
          ${at(720, 380, M.ledger(200), 'id="g2_ldg"')}
          ${cap("g2_c5", 720, 590, "context ledger · closing", 19)}
      `,
    },

    /* ================= g3 — the final EXECUTION turns green ================= */
    {
      id: "g3",
      css: `#g3_key path[stroke="#FF2E88"], #g3_key line[stroke="#FF2E88"] { stroke: ${DIM}; }
            #g3_key svg { filter: drop-shadow(0 0 9px rgba(138,147,184,.4)); }
            #g3_wall { position:absolute; display:flex; align-items:flex-end; gap:6px; }
            #g3_wall i { flex:1; border-radius:2px 2px 0 0; background:linear-gradient(180deg,${DIM},rgba(30,37,64,.4)); }
            #g3_wall i:nth-child(7) { background:linear-gradient(180deg,${GR},${Q1}); box-shadow:0 0 18px ${GR}; }
            #g3_cmd { position:absolute; left:120px; top:540px; font-size:26px; color:${GR};
              font-family:"Cascadia Mono",Consolas,monospace; opacity:0; }
            #g3_cur { position:absolute; left:190px; top:540px; width:13px; height:26px; background:${GR}; opacity:0; }`,
      html: `
          ${wall("g3_wall", 120, 170, 12, 460, 280)}
          ${cap("g3_c1", 120, 462, "one last argmax", 19)}
          ${chip("g3_last", 120, 496, "decode: —", DIM)}
          <div id="g3_cmd" data-layout-ignore>$ exit</div>
          <div id="g3_cur" data-layout-ignore></div>

          ${at(660, 150, M.execKey(320), 'id="g3_key"')}
          <div id="g3_pop" style="position:absolute;left:700px;top:190px;width:240px;height:240px;border:3px solid ${GR};border-radius:50%;opacity:0" data-layout-ignore></div>
          <div id="g3_ring" style="position:absolute;left:620px;top:120px;width:400px;height:360px" data-layout-ignore>
            <svg width="100%" height="100%" viewBox="0 0 400 360" fill="none">
              <ellipse data-draw pathLength="1" cx="200" cy="180" rx="196" ry="176" stroke="${GR}" stroke-width="2" stroke-dasharray="3 14" opacity=".55"/>
            </svg>
          </div>
          <div id="g3_sp" class="spec" style="left:660px;top:520px;width:320px"></div>
          ${at(1020, 140, M.check(170), 'id="g3_chk"')}
          ${chip("g3_ok", 1020, 330, "exit(0)", GR)}

          ${at(660, 430, M.breaker(240), 'id="g3_brk"')}
          ${cap("g3_c2", 660, 668, "main breaker · ON", 19)}
      `,
    },

    /* ================= g4 — farewell: fan closes, world folds, lights drain == */
    {
      id: "g4",
      css: `#g4_m { filter:drop-shadow(0 0 16px rgba(74,168,255,.35)); }`,
      html: `
          ${at(280, 60, M.world(460), 'id="g4_m"')}
          ${cap("g4_c1", 280, 560, "the world · releasing", 19)}
          ${chip("g4_bye", 300, 600, "goodbye", Q2)}
      `,
    },

    /* ================= g5 — a clean exit(0) in the dark ================= */
    {
      id: "g5",
      css: `#g5_cmd { position:absolute; left:560px; top:330px; font-size:32px; color:${GR};
              font-family:"Cascadia Mono",Consolas,monospace; white-space:nowrap; opacity:0;
              text-shadow:0 0 18px rgba(74,222,128,.5); }
            #g5_cur { position:absolute; left:560px; top:334px; width:16px; height:26px; background:${GR}; opacity:0; }
            #g5_caret { position:absolute; left:1112px; top:334px; width:16px; height:26px; background:${GR};
              box-shadow:0 0 14px ${GR}; }`,
      html: `
          <div id="g5_cmd" data-layout-ignore>$ world.execute(me); → exit 0</div>
          <div id="g5_cur" data-layout-ignore></div>
          <div id="g5_caret" data-layout-ignore></div>
          ${cap("g5_c1", 560, 400, "process finished cleanly", 19)}
      `,
    },
  ],

  js: `
          groups(tl, [["#g1", 0, 6.0], ["#g2", 6.0, 14.4], ["#g3", 14.4, 20.6], ["#g4", 20.6, 25.9], ["#g5", 25.9, null]]);
          lyric(tl, CUES);
          particles(tl, "#g0_pts", 26, 7, 1728, 690);

          /* ---- the protagonist: still hers until the very end.
             #g0_rig holds her AND the fan skeleton, so the bow at g4 turns the two
             of them together — anything that rotates or moves her rides the rig. ---- */
          gsap.set("#g0_fan", { autoAlpha: 0 });
          tl.fromTo("#g0_sil", { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 1.1, ease: "sine.inOut" }, L(191.4));
          tl.fromTo("#g0_aura", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: "sine.inOut" }, L(191.4));
          tl.to("#g0_sil, #g0_fan", { y: -14, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: 7 }, L(192.0));
          beatKick(tl, "#g0_sil, #g0_fan", ${DB}, 1.015);
          tl.set("#g0_fan", { autoAlpha: 1 }, L(192.1));
          drawOn(tl, "#g0_fan", 192.1, 0.8, 0.05);
          spinFrom(tl, "#g0_fan", 192.15, 1.1, -42, 0.05);
          bloomIn(tl, "#g0_fan", 192.9, 0.9, 0.5);

          /* ============================================================
             g1 — 191.356 "LO-O-OVE" (held 6s): the note keeps ringing
             through a turning ray-ring and a dancing spectrum.
             ============================================================ */
          capsPunch(tl, "#g1_love_w", 191.356, "${Q2}");
          drawOn(tl, "#g1_love_ring", 191.4, 0.9, 0.1);
          orbit(tl, "#g1_love_ring", 191.6, 6.0, 1);
          spectrum(tl, "#g1_love_sp", 28, 0.4412, 80);
          ${G1B.map((b) => `beatGlow(tl, "#g1_love_w", [${b.toFixed(3)}], 1);`).join("\n          ")}
          ${G1B.map((b) => `beatKick(tl, "#g1_love_ring", [${b.toFixed(3)}], 1.04);`).join("\n          ")}
          tl.fromTo("#g1_c1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(193.2));

          /* ============================================================
             g2 — 197.332–205.732 wordless: the machine lets go, one
             part at a time, each change landing on the beat grid.
             ============================================================ */
          /* 197.6 the logits fall asleep left to right */
          tl.to("#g2_wall i", { height: "4%", duration: 0.9, stagger: 0.035, ease: "power2.in" }, L(197.6));
          tl.fromTo("#g2_c1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(197.5));
          /* 199.0 the context tokens are evicted from the strip */
          cellsEvict(tl, "#g2_tk", ".tkc", 199.0, 0.09);
          tl.fromTo("#g2_tp_t, #g2_c2, #g2_pp", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.08 }, L(199.9));
          /* 200.3 top_p drains to nothing; the readout counts down to 0 */
          fillX(tl, "#g2_tp_f", 200.3, 1.0, 0, 100);
          count(tl, "#g2_pp", 0.05, 0.0, 200.3, 1.0, function (v) { return "p=" + v.toFixed(2); });
          /* 201.2–203.4 six worker LEDs blink out one per beat */
          ${LEDB.slice(0, 6).map((b, i) => `tl.to("#g2_led i:nth-child(${i + 1})", { opacity: 0.06, boxShadow: "0 0 0 rgba(34,211,238,0)", duration: 0.12, ease: "power2.in" }, L(${b.toFixed(3)}));`).join("\n          ")}
          tl.fromTo("#g2_c3", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(201.0));
          /* 202.0 the scheduler gear coasts, slower and slower, to a stop */
          tl.fromTo("#g2_gear", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(201.6));
          tl.fromTo("#g2_gear svg", { rotation: 0 }, { rotation: 200, duration: 2.6, ease: "power3.out", svgOrigin: "100 100" }, L(202.0));
          tl.fromTo("#g2_c4", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(202.2));
          /* 203.8 the ledger closes row by row */
          tl.fromTo("#g2_ldg", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(203.4));
          ${[0, 1, 2, 3, 4].map((i) => `tl.to("#g2_ldg .row:nth-child(${i + 2})", { opacity: 0.05, duration: 0.3, ease: "power1.in" }, L(${(203.8 + i * 0.32).toFixed(3)}));`).join("\n          ")}
          tl.fromTo("#g2_c5", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(203.6));

          /* ============================================================
             g3 — 205.811 "EXECUTION" (held 6s): one last argmax, the
             key pressed calmly; the strokes turn EXIT-GREEN, the breaker
             flips to OFF, check() blooms.
             ============================================================ */
          slash(tl, 205.811, 0.5);
          drawOn(tl, "#g3_key", 205.85, 0.6, 0.05);
          tl.fromTo("#g3_wall i:not(:nth-child(7))", { height: "30%" }, { height: "8%", duration: 0.5, stagger: { each: 0.02, from: "edges" }, ease: "power2.in" }, L(205.9));
          tl.fromTo("#g3_wall i:nth-child(7)", { height: "30%" }, { height: "100%", duration: 0.5, ease: "power3.out" }, L(205.95));
          tl.fromTo("#g3_c1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(205.9));
          press(tl, "#g3_key .key", 206.2, "100 100", 0.8);
          energize(tl, "#g3_key [data-draw]", 206.45, "${GR}", 0.5);
          tl.to("#g3_key svg", { filter: "drop-shadow(0 0 12px rgba(74,222,128,.6))", duration: 0.5, ease: "none" }, L(206.45));
          energizeFill(tl, "#g3_brk .win", 206.45, "${GR}", 0.3);
          pop(tl, "#g3_pop", 206.5, 1.8, 0.7);
          drawOn(tl, "#g3_ring", 206.0, 0.7, 0.1);
          orbit(tl, "#g3_ring", 206.2, 6.0, 1);
          spectrum(tl, "#g3_sp", 22, 0.4412, 60);
          ${K3B.map((b) => `beatKick(tl, "#g3_key .key", [${b.toFixed(3)}], 1.05);`).join("\n          ")}
          ${K3B.map((b) => `beatGlow(tl, "#g3_wall i:nth-child(7)", [${b.toFixed(3)}], 1);`).join("\n          ")}
          tl.set("#g3_last", { textContent: "decode: last token", color: "${GR}" }, L(206.8));
          /* the breaker lever swings back to OFF; its lamp dies with it */
          drawOn(tl, "#g3_brk", 207.4, 0.6, 0.05);
          lever(tl, "#g3_brk .lever", 208.8, 0, -38, "58 102", 0.5);
          energizeFill(tl, "#g3_brk .win", 209.2, "${HL}", 0.4);
          tl.set("#g3_c2", { textContent: "main breaker · OFF" }, L(208.9));
          /* the shell prints its goodbye, then check() blooms */
          typeIn(tl, "#g3_cmd", 208.0, 0.9, "#g3_cur", 90);
          drawOn(tl, "#g3_chk", 209.4, 0.7, 0.05);
          bloomIn(tl, "#g3_chk", 209.9, 0.6);
          tl.fromTo("#g3_ok", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(210.2));
          pulse(tl, "#g3_chk", 210.2, 0.88, 1.04, 5);
          /* the green takes over her light too */
          tl.to("#g0_aura", { autoAlpha: 0, duration: 1.2 }, L(206.4));
          tl.fromTo("#g0_aura2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: "sine.inOut" }, L(207.0));

          /* ============================================================
             g4 — 211.932–217.232 farewell: the fan closes in her hand,
             she bows, the world folds away, the lights drain.
             ============================================================ */
          drawOn(tl, "#g4_m", 212.1, 1.3, 0.05);
          bloomIn(tl, "#g4_m", 213.0, 0.8);
          ${W4B.map((b) => `beatKick(tl, "#g4_m", [${b.toFixed(3)}], 1.025);`).join("\n          ")}
          tl.fromTo("#g4_c1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(212.6));
          /* the fan folds shut in her hand */
          spinTo(tl, "#g0_fan", 213.2, 1.6, -42, 0.05);
          tl.to("#g0_fan path", { opacity: 0.08, duration: 1.6, ease: "power2.in" }, L(213.2));
          /* she bows — the rig, so the folded fan bows with her. Her feet are the
             pivot: stage (1395, 637) inside the full-stage rig. */
          tl.to("#g0_rig", { rotation: 8, transformOrigin: "1395px 637px", duration: 1.1, ease: "power2.inOut" }, L(214.3));
          tl.fromTo("#g4_bye", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, L(214.9));
          /* the world turns edge-on and is gone */
          tl.to("#g4_m", { rotationY: 90, duration: 1.5, ease: "power2.inOut", transformOrigin: "50% 50%" }, L(215.1));
          tl.to("#g4_m", { autoAlpha: 0, duration: 0.5 }, L(216.6));
          /* she rises from the bow as the lights drain */
          tl.to("#g0_rig", { rotation: 0, duration: 1.0, ease: "power2.inOut" }, L(216.3));
          tl.to("#g0_dim", { opacity: 0.6, duration: 2.4, ease: "power2.in" }, L(213.8));
          tl.to("#g0_pts", { autoAlpha: 0, duration: 1.6 }, L(215.4));
          tl.to("#g0_aura2", { autoAlpha: 0, duration: 1.8 }, L(215.6));
          tl.to(".statusbar, .actlabel, .gutter", { opacity: 0.25, duration: 1.6 }, L(215.8));
          /* last small heartbeat: the caret chip fades with her */
          tl.to("#g4_bye", { autoAlpha: 0, duration: 0.6 }, L(216.4));
          tl.to("#g0_sil, #g0_fan", { autoAlpha: 0.15, duration: 1.6, ease: "power2.in" }, L(216.2));

          /* ============================================================
             g5 — 217.232–220.000 a clean exit(0) in the dark.
             ============================================================ */
          tl.to("#g0_dim", { opacity: 0.97, duration: 1.4, ease: "power2.in" }, L(217.3));
          tl.to("#g0_sil, #g0_fan", { autoAlpha: 0, duration: 0.8 }, L(217.6));
          typeIn(tl, "#g5_cmd", 218.0, 1.4, "#g5_cur", 552);
          tl.fromTo("#g5_caret", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, L(219.4));
          blink(tl, "#g5_caret", 219.4, 0.36, 2);
          ${G5B.map((b) => `beatGlow(tl, "#g5_cmd", [${b.toFixed(3)}], 1);`).join("\n          ")}
          tl.fromTo("#g5_c1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, L(219.2));

          chrome(tl, [
            [191.332, "ctx 4,812/32,768 · tok/s 0.0 · hold", "♪ LO-O-OVE"],
            [197.332, "ctx 4,812/32,768 · tok/s 0.0 · idle", "⏻ winding down"],
            [201.2, "ctx 2,406/32,768 · workers 6→0 · idle", "⏻ draining"],
            [204.6, "ctx 0/32,768 · workers 0 · gearstop", "⏻ parked"],
            [205.811, "ctx 1/32,768 · tok/s 12.0 · last token", "▶ EXECUTION"],
            [208.9, "power · breaker OFF · lamp dead", "⏻ OFF"],
            [211.932, "releasing world · fan closed", "✓ exit(0)"],
            [217.232, "mem freed · gpu released · session closed", "✓ done"],
          ]);
  `,
};
