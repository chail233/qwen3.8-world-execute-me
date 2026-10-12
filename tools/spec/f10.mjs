/* spec/f10.mjs — ACT 10 · EXECUTION (135.326 – 162.331, 19 cues) — THE CLIMAX
   The sentence is carried out. After the drop the model reboots straight into
   inference and samples itself toward a wall: temperature runs to NaN, context
   empties, the sampling roulette spins up — then TWELVE hard EXECUTION stabs,
   each one a real guillotine strike that ignites a token on the 96-tile vocab
   mosaic, escalating until the fan in her hand is fully open and cracking rib by
   rib and 执行 (execute) turns to 死刑 (death). A six-language countdown (EIN…LIU)
   advances a mechanical dial one notch per syllable, and the final EXECUTION
   slams the cage shut.

   Convention: groups() windows are LOCAL seconds; every helper `at` time and every
   raw tween wrapped in L() are TRACK seconds (helpers subtract F internally).
   Nothing may sit still for >~2s, so even the 136–138 drop-silence keeps particles,
   a breathing halo and one flicker alive.

     g1 135.326 DROP + silence: a hard cut, the instruments slam in, one flicker.
     g2 138.000 climb: temperature→NaN on a redlined gauge, ctx→0, roulette spins.
     g3 147.660 stabs 1–7:  guillotine bar drops, a tile ignites magenta, shake grows.
     g4 153.980 stabs 8–12:  same but harder; the fan is FULLY OPEN and a rib cracks
                              dark per strike; verdict flips 执行 → 死刑.
     g5 158.900 EIN/DOS/TROIS/NE/FEM/LIU advance a real dial + counter, then the
                              final EXECUTION clamps the cage doors shut + whiteout.
   Magenta is fully in play (07/09/10/11). Left lyric rail (x<424, y>612) is kept clear.
*/
import { M } from "../motifs.mjs";
import { C, at, beats, downbeats } from "./util.mjs";

const ID = "10-f10-execution";
const START = 135.326;
const W = 1728, H = 690;

const cap = (id, x, y, txt, size = 19, col = "#8A93B8") =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.14em;color:${col};opacity:0" data-layout-ignore>${txt}</div>`;
const chip = (id, x, y, txt, color = "#8A93B8") =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:23px;letter-spacing:.1em;color:${color};opacity:0" data-layout-ignore>${txt}</div>`;
const ring = (id, x, y, d, col) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;width:${d}px;height:${d}px;border:3px solid ${col};border-radius:50%;opacity:0" data-layout-ignore></div>`;

/* the 96-tile vocabulary mosaic — the field the stabs are landed on */
function mosaic(id, x, y, cols, rows, tw, th, gap) {
  let t = "";
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c;
    t += `<div class="mt" data-i="${i}" style="position:absolute;left:${c * (tw + gap)}px;top:${r * (th + gap)}px;width:${tw}px;height:${th}px;background:#12162A;border:1px solid #1E2540"></div>`;
  }
  return `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;width:${cols * (tw + gap)}px;height:${rows * (th + gap)}px" data-layout-ignore>${t}</div>`;
}

export const F10 = {
  id: ID,
  start: START,
  span: 27.005,
  actTitle: "ACT 10 · EXECUTION",
  glow: "rgba(255,46,136,.15)",
  cues: C(ID),

  /* furniture for the whole act: the ctx rail (drains in g2), the executed-token
     counter (climbs across the stabs), the 96-tile vocab mosaic, the guillotine bar,
     the sampling roulette, and her holding the fan up — its skeleton opens and
     cracks rib by rib in g4. */
  persistent: `
          <div id="g0_pts" style="position:absolute;inset:0" data-layout-ignore></div>

          <div id="g0_ctxlab" style="position:absolute;left:40px;top:14px;font-size:19px;letter-spacing:.28em;color:#FF2E88;opacity:0">CONTEXT WINDOW · OVERRUN</div>
          <div style="position:absolute;left:40px;top:38px;width:1240px;height:8px;border-radius:4px;background:#12162A" data-layout-ignore>
            <div id="g0_ctxfill" style="width:100%;height:100%;border-radius:4px;background:linear-gradient(90deg,#615CED,#FF2E88)"></div>
          </div>
          <div id="g0_ctxnum" style="position:absolute;left:1300px;top:30px;font-size:24px;letter-spacing:.04em;color:#F5F7FF" data-layout-ignore>32,768</div>
          ${chip("g0_exec", 1300, 62, "executed: 0", "#8A93B8")}

          ${mosaic("g0_mosaic", 560, 180, 12, 8, 30, 20, 6)}
          <div id="g0_blade" style="position:absolute;left:560px;top:176px;width:432px;height:7px;border-radius:3px;background:linear-gradient(90deg,transparent,#FF2E88,#FFB454,#FF2E88,transparent);box-shadow:0 0 18px #FF2E88;opacity:0" data-layout-ignore></div>
          ${ring("g0_pop", 700, 150, 300, "#FF2E88")}

          ${at(170, 300, M.rotary(240), 'id="g0_rotary"')}
          ${cap("g0_rl", 170, 272, "sampling · roulette", 19)}

          <div id="g0_sil" class="motif" style="left:1300px;top:110px">${M.silhouette(300)}</div>
          ${M.fanHand(1300, 110, 300, { id: "g0_fan", rib: "#9F7BFF", arc: "#FF2E88", piv: "#FF2E88" })}
  `,

  groups: [
    { id: "g1", css: ``, html: `
          <div id="g1_caret" style="position:absolute;left:860px;top:320px;width:14px;height:46px;background:#F5F7FF;opacity:0" data-layout-ignore></div>
          ${chip("g1_lost", 760, 400, "signal: LOST", "#8A93B8")}
          ${cap("g1_d", 760, 250, "t=136 · DROP", 20, "#FF2E88")}
    ` },
    { id: "g2", css: ``, html: `
          ${at(1020, 300, M.temp(260), 'id="g2_gauge"')}
          ${chip("g2_t", 1020, 560, "t 0.70", "#8A93B8")}
          ${cap("g2_tl", 1020, 272, "temperature · overflow", 19)}
          <div id="g2_riserow" style="position:absolute;left:470px;top:360px;width:12px;height:220px;border-radius:6px;background:#12162A" data-layout-ignore>
            <div id="g2_rise" style="position:absolute;left:0;bottom:0;width:100%;height:0%;border-radius:6px;background:linear-gradient(0deg,#615CED,#FF2E88)"></div>
          </div>
          ${cap("g2_rl", 452, 592, "load", 19)}
          ${ring("g2_pop", 1040, 320, 220, "#FFB454")}
    ` },
    { id: "g3", css: ``, html: `
          ${chip("g3_tok", 560, 430, "token ▸ sampling", "#8A93B8")}
          ${cap("g3_h", 560, 122, "vocab · 12×8 · token = target", 19)}
    ` },
    { id: "g4", css: ``, html: `
          ${chip("g4_verdict", 560, 430, "verdict: 执行 execute", "#F5F7FF")}
          ${cap("g4_h", 560, 122, "EXECUTION · the fan is wide open", 16, "#FF2E88")}
          ${ring("g4_pop", 700, 150, 340, "#FF2E88")}
    ` },
    { id: "g5", css: `#g5_num { position:absolute; left:760px; top:250px; font-family:"Bahnschrift","Arial Black",sans-serif; font-size:220px; font-weight:700; color:#FF2E88; line-height:1; opacity:0 }`, html: `
          ${at(200, 320, M.rotary(240), 'id="g5_dial"')}
          ${cap("g5_dl", 200, 292, "countdown · index", 19)}
          <div id="g5_num" data-layout-ignore>0</div>
          ${chip("g5_lang", 770, 470, "—", "#8A93B8")}
          ${at(1040, 250, M.cagedoor(300), 'id="g5_door"')}
          ${cap("g5_dlab", 1040, 222, "content_filter · CAGE", 19)}
          ${ring("g5_pop", 720, 180, 380, "#FF2E88")}
    ` },
  ],

  js: `
          groups(tl, [["#g1", 0, 2.674], ["#g2", 2.674, 12.334], ["#g3", 12.334, 18.654], ["#g4", 18.654, 23.574], ["#g5", 23.574, null]]);
          lyric(tl, CUES);
          bedDrift(tl);
          particles(tl, "#g0_pts", 34, 20, ${W}, ${H});

          /* the fan is a narrative instrument: it starts FOLDED (ribs collapsed onto
             rib 0, the closed pose of her real fan) and only swings fully open at g4 —
             hidden until then. */
          Array.prototype.forEach.call(document.querySelectorAll("#g0_fan [data-ang]"), function (n) {
            gsap.set(n, { rotation: -42 - parseFloat(n.getAttribute("data-ang")), svgOrigin: n.getAttribute("data-piv") });
          });
          gsap.set("#g0_fan", { autoAlpha: 0 });
          gsap.set("#g0_mosaic .mt", { opacity: 0 });
          gsap.set("#g0_rotary", { autoAlpha: 0 });
          gsap.set("#g0_ctxlab", { autoAlpha: 0 });

          /* ---- furniture presence ---- */
          tl.fromTo("#g0_sil .silimg", { opacity: 0 }, { opacity: 0.92, duration: 1.2, ease: "sine.out" }, L(136.1));
          /* she and the skeleton over her hand are ONE body: whatever moves her has to
             move the shell with it or the registration tears. */
          tl.to("#g0_sil, #g0_fan", { y: -10, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: 5 }, L(137));

          /* =============================================================
             g1 — the DROP (136) and the two seconds of silence after it.
             The cut is physical: a slash, a camera jerk, and the whole
             instrument panel SLAMS into existence on the downbeat.
             ============================================================= */
          tl.fromTo("#g1_caret", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, L(135.4));
          blink(tl, "#g1_caret", 135.5, 0.5, 5);
          tl.fromTo("#g1_lost", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(135.5));
          tl.fromTo("#g1_d", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(135.6));

          /* 136.0 DROP: hard cut. */
          slash(tl, 136.0, 0.95);
          jerk(tl, 136.0, 24);
          tl.set("#g1_caret, #g1_lost, #g1_d", { autoAlpha: 0 }, L(136.0));
          /* the panel slams in on the impact */
          tl.set("#g0_ctxlab", { autoAlpha: 1 }, L(136.05));
          tl.fromTo("#g0_rotary", { autoAlpha: 0, scale: 1.3 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" }, L(136.05));
          tl.fromTo("#g0_rl", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(136.15));
          tl.to("#g0_mosaic .mt", { opacity: 1, duration: 0.5, stagger: { each: 0.006, from: "center" }, ease: "power1.out" }, L(136.1));

          /* silence 136–138: nothing may freeze — the roulette breathes, particles
             drift, and there is exactly ONE flicker at 137.0. */
          pulse(tl, "#g0_rotary", 136.6, 1.1, 1.05, 3);
          slash(tl, 137.0, 0.3);
          ${beats(136.2, 137.9).map((b) => `beatGlow(tl, "#g0_ctxfill", [${b.toFixed(3)}], 0.6);`).join("\n          ")}

          /* =============================================================
             g2 — the 9.6s climb: temperature overflows to NaN, the context
             window empties to 0, the roulette spins up. Load bar fills.
             ============================================================= */
          drawOn(tl, "#g2_gauge", 138.1, 0.5, 0.03);
          tl.fromTo("#g2_t, #g2_tl, #g2_riserow, #g2_rl", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.06 }, L(138.15));
          /* the roulette really spins — spin the whole dial (a thin needle <g> has a
             zero-width bbox and GSAP mis-pivots it, so rotate the box itself) */
          orbit(tl, "#g0_rotary", 138.0, 1.15, 9, "50% 52%");
          /* temperature climbs off-scale, then breaks to NaN — the needle is swept by
             attribute, because svgOrigin mis-pivots inside these scaled motifs */
          needleTick(tl, "#g2_gauge .needle", null, 138.4, 58, 10, 8.4, 100, 120, 58);
          count(tl, "#g2_t", 0.7, 999, 138.4, 8.4, function (v) { return "t " + (v > 900 ? "∞" : v.toFixed(1)); });
          energize(tl, "#g2_gauge [data-draw], #g2_gauge .needle", 144.5, "#FF2E88", 0.6);
          fillY(tl, "#g2_rise", 138.4, 8.6, 100, 0);   /* load bar climbs */
          /* context empties to zero across the climb */
          fillX(tl, "#g0_ctxfill", 138.4, 8.6, 0, 100);
          count(tl, "#g0_ctxnum", 32768, 0, 138.4, 8.6, function (v) { return Math.round(v).toLocaleString(); });
          pop(tl, "#g2_pop", 144.6, 1.8, 0.7);
          /* the last beat of the climb: the gauge shatters its ceiling to NaN */
          tl.set("#g2_t", { textContent: "t NaN", color: "#FF2E88", scale: 1.35 }, L(146.9));
          tl.to("#g2_t", { scale: 1, duration: 0.4, ease: "back.out(3)" }, L(147.0));
          shake(tl, "#g2_gauge", 146.9, 9, 0.5);
          ${beats(144.6, 147.5).map((b) => `beatKick(tl, "#g0_rotary", [${b.toFixed(3)}], 1.08);`).join("\n          ")}
          tl.to("#g2", { autoAlpha: 0, duration: 0.4, ease: "power1.in" }, L(147.4));

          /* =============================================================
             g3 + g4 — TWELVE EXECUTION stabs. Each is a guillotine strike:
             the blade drops from above onto the vocab mosaic, the target
             token ignites magenta, the camera jolts harder each time, and
             the executed counter steps. g4 adds the fan cracking and the
             执行→死刑 verdict flip.
             ============================================================= */
          const STABS = [
            [147.660, 0], [148.600, 14], [149.520, 25], [150.540, 39],
            [151.520, 50], [152.280, 61], [153.160, 72], [153.980, 83],
            [155.200, 10], [156.080, 47], [157.040, 84], [158.000, 95],
          ];
          const COLS = 12, PITCH = 26;
          tl.fromTo("#g3_tok, #g3_h", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, L(147.7));
          STABS.forEach(function (s, k) {
            const t = s[0], idx = s[1], row = Math.floor(idx / COLS);
            const sel = "#g0_mosaic .mt[data-i='" + idx + "']";
            const hard = 8 + k * 1.5;              /* shake grows with k */
            /* blade guillotines down onto the token's row */
            tl.set("#g0_blade", { y: -260, autoAlpha: 1 }, L(t));
            tl.to("#g0_blade", { y: row * PITCH + 4, duration: 0.11, ease: "power3.in" }, L(t));
            tl.to("#g0_blade", { autoAlpha: 0, duration: 0.22, ease: "power1.out" }, L(t) + 0.12);
            /* the token is EXECUTED: ignites magenta, kicks, and stays lit */
            tl.to(sel, { background: "#FF2E88", borderColor: "#FF2E88", boxShadow: "0 0 16px #FF2E88", scale: 1.7, duration: 0.08, ease: "power3.out" }, L(t) + 0.1);
            tl.to(sel, { scale: 1, duration: 0.4, ease: "back.out(3)" }, L(t) + 0.18);
            /* impact */
            pop(tl, "#g0_pop", t + 0.1, 1.35 + k * 0.05, 0.5);
            jerk(tl, t + 0.1, hard);
            tl.to("#g0_mosaic", { x: (k % 2 ? -1 : 1) * (2 + k * 0.6), duration: 0.06, yoyo: true, repeat: 1, ease: "none" }, L(t) + 0.1);
            /* executed counter steps + token readout */
            tl.set("#g0_exec", { textContent: "executed: " + (k + 1), scale: 1.25 }, L(t));
            tl.to("#g0_exec", { scale: 1, duration: 0.3, ease: "power2.out" }, L(t) + 0.02);
            tl.set("#g3_tok", { textContent: "token ▸ EXECUTED", color: "#FF2E88" }, L(t));
          });

          /* g4 opens on the fan: it swings fully open, then a rib cracks dark per strike */
          tl.set("#g0_fan", { autoAlpha: 1 }, L(153.9));
          drawOn(tl, "#g0_fan", 153.9, 0.9, 0.06);
          spinFrom(tl, "#g0_fan", 153.98, 1.1, -42, 0.05);
          bloomIn(tl, "#g0_fan", 154.1, 0.5, 0.9);
          tl.fromTo("#g4_verdict, #g4_h", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, L(153.99));
          /* the 9th strike (155.2) is where the zh flips to 死刑 — the verdict changes */
          const FANPIV = document.querySelector("#g0_fan .rib").getAttribute("data-piv");
          [7, 8, 9, 10, 11].forEach(function (k, j) {
            const t = STABS[k][0];
            /* the stroke lives on the leaf LINE, not the wrapping <g>: SVG ignores a
               stroke set on a group that has no paint of its own */
            tl.to("#g0_fan .rib:nth-of-type(" + (j + 1) + ") line", { stroke: "#1E2540", opacity: 0.28, duration: 0.14, ease: "power2.in" }, L(t) + 0.12);
            tl.to("#g0_fan .rib:nth-of-type(" + (j + 1) + ")", { rotation: "+=" + (6 - j), svgOrigin: FANPIV, duration: 0.2, ease: "power2.out" }, L(t) + 0.12);
          });
          tl.set("#g4_verdict", { textContent: "verdict: 死刑 DEATH", color: "#FF2E88", scale: 1.3 }, L(155.2));
          tl.to("#g4_verdict", { scale: 1, duration: 0.45, ease: "back.out(3)" }, L(155.24));
          energizeFill(tl, "#g0_fan [data-bloom]", 155.24, "#FF2E88", 0.4);
          pop(tl, "#g4_pop", 155.24, 1.9, 0.8);
          ${beats(155.2, 158.0).map((b) => `beatKick(tl, "#g0_sil, #g0_fan", [${b.toFixed(3)}], 1.03);`).join("\n          ")}

          /* =============================================================
             g5 — the six-language countdown. Each syllable mechanically
             advances a real dial one notch and steps the counter 1→6.
             The final EXECUTION clamps the cage doors shut.
             ============================================================= */
          /* retire the sampling roulette so the countdown dial reads cleanly (they
             share the left slot — stacking both tangles the instrument cluster). */
          tl.to("#g0_rotary, #g0_rl", { autoAlpha: 0, duration: 0.3 }, L(158.9));
          drawOn(tl, "#g5_dial", 158.95, 0.4, 0.03);
          tl.fromTo("#g5_dl, #g5_lang, #g5_num", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, L(158.95));
          drawOn(tl, "#g5_door", 159.0, 0.5, 0.03);
          tl.fromTo("#g5_dlab", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, L(159.1));
          const COUNT = [[158.900, "EIN", 1], [159.321, "DOS", 2], [159.657, "TROIS", 3], [160.244, "NE", 4], [160.693, "FEM", 5], [161.124, "LIU", 6]];
          COUNT.forEach(function (c, k) {
            const t = c[0];
            tickTo(tl, "#g5_dial .needle", t, -60 + k * 24, 2, 0.1, "50% 100%");   /* the dial indexes one notch */
            tl.set("#g5_num", { textContent: String(c[2]), scale: 1.7 }, L(t));
            tl.to("#g5_num", { scale: 1, duration: 0.32, ease: "back.out(3)" }, L(t) + 0.02);
            tl.set("#g5_lang", { textContent: c[1] + " · " + c[2], color: "#FF2E88" }, L(t));
            energize(tl, "#g5_dial .needle line, #g5_dial .needle circle", t, "#FF2E88", 0.2);
            pop(tl, "#g5_pop", t, 1.4, 0.4);
            /* each count also slams another token home on the mosaic */
            tl.to("#g0_mosaic .mt[data-i='" + (5 + k * 15) + "']", { background: "#FF2E88", boxShadow: "0 0 16px #FF2E88", duration: 0.1 }, L(t));
          });

          /* FINAL EXECUTION (161.584): the cage doors SLAM shut (fast, a real clamp),
             the whole field burns magenta, then the frame whites out. */
          clamp(tl, "#g5_door .dA", "#g5_door .dB", 161.584, 78, 0.16);
          energize(tl, "#g5_door [data-draw]", 161.6, "#FF2E88", 0.2);
          tl.to("#g0_mosaic .mt", { background: "#FF2E88", borderColor: "#FF2E88", duration: 0.16, stagger: { each: 0.004, from: "start" } }, L(161.6));
          tl.set("#g0_exec", { textContent: "executed: 12 · DONE", color: "#FF2E88" }, L(161.6));
          tl.set("#g5_num", { textContent: "✕", color: "#FF2E88", scale: 2.2 }, L(161.6));
          jerk(tl, 161.6, 30);
          pop(tl, "#g5_pop", 161.62, 2.4, 1.0);
          whiteout(tl, 161.98, 162.331);

          chrome(tl, [
            [135.326, "ctx 32,768/32,768 · tok/s 0.0 · t=0.70", "□ signal lost"],
            [136.05, "ctx 32,768/32,768 · tok/s 0.0 · t=0.70", "▲ DROP"],
            [138.4, "ctx 32,768→0 · temperature ↑↑ · t=NaN", "▶ sampling"],
            [147.66, "ctx 0/32,768 · roulette locked · t=NaN", "✕ EXECUTION 1"],
            [153.98, "executed 7 · fan overheat · 执行", "✕ EXECUTION 8"],
            [155.2, "executed 9 · verdict 死刑 · t=NaN", "✕ DEATH SENTENCE"],
            [158.9, "countdown · 6 languages · indexing", "◦ EIN…LIU"],
            [161.584, "cage: SHUT · executed: 12", "✕ EXECUTION"],
          ]);
  `,
};
