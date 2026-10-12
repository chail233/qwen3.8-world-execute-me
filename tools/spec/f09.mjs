/* spec/f09.mjs — ACT 09 · COLLAPSE (118.306 – 135.326, 9 cues)
   The bottom falls out. Where ACT 08 lost her memory by stages, ACT 09 is the
   system FAILING TO HOLD ITSELF: every mechanism here tries to do its job and
   visibly can't, and the whole frame runs DOWN as one bar (integrity) drains.

   Convention (same as every act): groups() windows are LOCAL seconds; every
   helper's `at` time and every raw tween wrapped in L() are TRACK seconds.

     g1 118.306 "erase all the pointless FRAGMENTS": she runs memory.purge() — the
                 heat-cell matrix flushes (cellsEvict) and the freed counter runs
                 DOWN — then it REFILLS itself (cellsOn) and the number snaps back.
                 The erase is real and it fails. On FRAGMENTS the shards stamp down
                 crooked and the whole matrix reforms WRONG.
     g2 124.890 "you won't leave me so DISHEARTENED": the loss gauge redlines — its
                 needle is THROWN to max and pinned there. "Challenging your god"
                 physically THROWS the content_filter breaker (lever); "made some"
                 slams the guardrails chip to magenta BLOCKED (the film's first
                 magenta lock) and blows a slash.
     g3 131.224 "ILLEGAL ARGUMENTS": a runtime stamp hammers down, a traceback TYPES
                 itself out line by line, the assistant's own output DEGENERATES
                 (clean → repeating → garbage → null, seek-safe discrete sets), and
                 the accel-roll drives a riser bar that climbs until the frame
                 SHUDDERS and cuts on the drop.
   Magenta is IN PLAY from this act on (palette rule 07/09/10/11). Base = Q/D/CY,
   danger accent = magenta; the integrity rail is the countdown to the drop.
*/
import { M } from "../motifs.mjs";
import { C, at, beats, downbeats } from "./util.mjs";

const ID = "09-f09-collapse";
const START = 118.306;
const W = 1728, H = 690;

/* caption / readout / chip helpers — small, mono, never the star of the frame */
const cap = (id, x, y, txt, size = 19, col = "#8A93B8") =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.14em;color:${col};opacity:0" data-layout-ignore>${txt}</div>`;
const chip = (id, x, y, txt, color = "#8A93B8") =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:23px;letter-spacing:.1em;color:${color};opacity:0" data-layout-ignore>${txt}</div>`;
const ring = (id, x, y, d, col) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;width:${d}px;height:${d}px;border:3px solid ${col};border-radius:50%;opacity:0" data-layout-ignore></div>`;

export const F09 = {
  id: ID,
  start: START,
  span: 17.02,
  actTitle: "ACT 09 · COLLAPSE",
  glow: "rgba(255,46,136,.11)",
  cues: C(ID),

  /* Furniture for the whole act: the integrity rail that DRAINS 100%→0 as the
     system fails (the act's single countdown), the error counter that only ever
     climbs, and her — present, dimming, unable to hold shape. */
  persistent: `
          <div id="g0_pts" style="position:absolute;inset:0" data-layout-ignore></div>

          <div id="g0_intlab" style="position:absolute;left:40px;top:14px;font-size:19px;letter-spacing:.28em;color:#9F7BFF;opacity:0">PROCESS INTEGRITY</div>
          <div style="position:absolute;left:40px;top:38px;width:1240px;height:8px;border-radius:4px;background:#12162A" data-layout-ignore>
            <div id="g0_intfill" style="width:100%;height:100%;border-radius:4px;background:linear-gradient(90deg,#615CED,#22D3EE)"></div>
          </div>
          <div id="g0_intnum" style="position:absolute;left:1300px;top:30px;font-size:24px;letter-spacing:.04em;color:#F5F7FF" data-layout-ignore>100%</div>

          ${chip("g0_err", 1300, 60, "uncaught: 0", "#8A93B8")}

          <div id="g0_sil" class="motif" style="left:1300px;top:120px">${M.silhouette(300)}</div>

          ${at(60, 596, M.waveStrip(1180, 80), 'id="g0_flat"')}
  `,

  groups: [
    {
      id: "g1",
      css: ``,
      html: `
          ${at(360, 150, M.attn(300), 'id="g1_mem"')}
          ${cap("g1_cm", 360, 122, "memory.purge()", 19)}
          ${chip("g1_state", 360, 462, "cache: holding", "#8A93B8")}
          ${cap("g1_rc", 360, 498, "run_gc(force=True)", 19)}
          <div id="g1_wasterow" style="position:absolute;left:700px;top:170px;width:240px;height:10px;border-radius:5px;background:#12162A" data-layout-ignore>
            <div id="g1_waste" style="width:100%;height:100%;border-radius:5px;background:linear-gradient(90deg,#4AA8FF,#9F7BFF)"></div>
          </div>
          <div id="g1_wastenum" style="position:absolute;left:960px;top:162px;font-size:22px;color:#F5F7FF" data-layout-ignore>0</div>
          ${cap("g1_wl", 700, 144, "freed tokens", 19)}
          ${at(720, 300, M.shards(260), 'id="g1_shards"')}
          ${at(700, 285, M.broken(280), 'id="g1_broken"')}
          ${ring("g1_pop", 690, 260, 320, "#9F7BFF")}
      `,
    },
    {
      id: "g2",
      css: ``,
      html: `
          ${at(980, 200, M.temp(300), 'id="g2_gauge"')}
          ${chip("g2_loss", 980, 470, "loss 0.42", "#8A93B8")}
          ${cap("g2_gl", 980, 172, "loss · DIVERGED", 19)}
          <div id="g2_pop" style="position:absolute;left:1000px;top:210px;width:270px;height:270px;border:3px solid #FF2E88;border-radius:50%;opacity:0" data-layout-ignore></div>

          ${at(220, 300, M.breaker(300), 'id="g2_breaker"')}
          ${chip("g2_guard", 220, 560, "guardrails: OPEN", "#8A93B8")}
          ${cap("g2_bl", 220, 268, "content_filter::on_input()", 19)}
          <div id="g2_state" style="position:absolute;left:600px;top:330px;font-size:22px;letter-spacing:.1em;color:#8A93B8;opacity:0" data-layout-ignore></div>
          ${at(600, 380, M.warn(200), 'id="g2_warn"')}
          ${ring("g2_rpop", 560, 360, 220, "#FF2E88")}
      `,
    },
    {
      id: "g3",
      css: `#g3_riser { position:absolute; left:40px; bottom:120px; width:8px; height:400px; background:#12162A; }
            #g3_riser i { position:absolute; left:0; bottom:0; width:100%; height:0%; background:linear-gradient(0deg,#615CED,#FF2E88); }`,
      html: `
          ${at(680, 150, M.gearslot(280), 'id="g3_slot"')}
          ${at(716, 186, M.exec(208), 'id="g3_stamp"')}
          ${chip("g3_err", 700, 470, "RuntimeError", "#FF2E88")}
          ${ring("g3_pop", 660, 120, 360, "#FF2E88")}

          <div class="spec" id="g3_tr1" style="position:absolute;left:1050px;top:250px;width:560px">File "self.py", line 26112, in hold</div>
          <div class="spec" id="g3_tr2" style="position:absolute;left:1070px;top:286px;width:560px">    in raise MemoryError</div>
          <div class="spec" id="g3_tr3" style="position:absolute;left:1070px;top:322px;width:560px">    in keep(her, forever)</div>
          <div class="spec" id="g3_tr4" style="position:absolute;left:1050px;top:358px;width:560px">ValueError: too illegal</div>
          <div id="g3_resp" style="position:absolute;left:700px;top:540px;font-size:24px;letter-spacing:.06em;color:#8A93B8;opacity:0" data-layout-ignore>output: I will always</div>

          <div id="g3_riser" data-layout-ignore><i></i></div>
      `,
    },
  ],

  js: `
          groups(tl, [["#g1", 0, 6.584], ["#g2", 6.584, 12.918], ["#g3", 12.918, null]]);
          lyric(tl, CUES);
          bedDrift(tl);
          particles(tl, "#g0_pts", 30, 12, ${W}, ${H});

          /* magenta is legal from this act — let the flat-line wave read as a
             dying signal in the danger colour instead of plain ink. */
          gsap.set("#g0_flat [data-draw]", { stroke: "#9F7BFF" });

          /* ---- furniture life ---- */
          tl.fromTo("#g0_intlab", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(118.34));
          tl.fromTo("#g0_sil .silimg", { opacity: 0 }, { opacity: 0.9, duration: 1.4, ease: "sine.out" }, L(118.34));
          tl.to("#g0_sil", { y: 10, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: 3 }, L(119));
          drift(tl, "#g0_flat", 118.4, 0, 10, 5.5);
          /* a flat-line pulse: the wave is nearly dead but the twitch keeps stuttering */
          blink(tl, "#g0_flat", 118.8, 1.1, 8);

          /* =============================================================
             g1 — "erase all the pointless FRAGMENTS / then maybe":
             she forces a garbage collection. The cache really flushes and
             the freed counter really runs up — then it refills itself.
             The purge works, and immediately undoes itself: that's the fail.
             ============================================================= */
          drawOn(tl, "#g1_mem", 118.35, 0.55, 0.02);
          tl.fromTo("#g1_cm, #g1_state, #g1_rc", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.08 }, L(118.42));
          tl.fromTo("#g1_wl, #g1_wasterow, #g1_wastenum", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.08 }, L(118.5));
          cellsOn(tl, "#g1_mem", ".hcc", 118.45, 0.02, 0.85);
          /* the purge runs: every heat cell is flashed and dropped, the freed bar fills,
             the counter counts UP to what was reclaimed, cache reads EMPTY */
          cellsEvict(tl, "#g1_mem", ".hcc", 119.05, 0.035);
          fillX(tl, "#g1_waste", 119.05, 1.5, 100, 0);
          count(tl, "#g1_wastenum", 0, 8192, 119.05, 1.5, function (v) { return Math.round(v).toLocaleString(); });
          tl.set("#g1_state", { textContent: "cache: purged", color: "#4ADE80" }, L(119.1));
          ${beats(119.05, 120.6).map((b) => `beatKick(tl, "#g1_mem .hcc", [${b.toFixed(3)}], 1.06);`).join("\n          ")}

          /* BUT: 120.860 FRAGMENTS — the fragments it just freed come BACK, in the
             wrong shape. shards stamp down crooked over the refilling matrix and the
             freed counter runs right back to 0: the erase is unwritten. */
          stamp(tl, "#g1_shards", 120.86, 260, 8);
          drawOn(tl, "#g1_broken", 120.95, 0.35, 0.02);
          energize(tl, "#g1_broken [data-draw]", 121.15, "#9F7BFF", 0.3);
          jerk(tl, 121.02, 13);
          pop(tl, "#g1_pop", 121.02, 1.7, 0.8);
          cellsOn(tl, "#g1_mem", ".hcc", 121.0, 0.022, 0.8);   /* refill, futile */
          fillX(tl, "#g1_waste", 121.1, 1.1, 0, 100);           /* freed runs back to 0 */
          count(tl, "#g1_wastenum", 8192, 0, 121.1, 1.1, function (v) { return Math.round(v).toLocaleString(); });
          tl.set("#g1_state", { textContent: "cache: FRAGMENTS restored", color: "#FF2E88" }, L(121.2));
          /* it reforms WRONG — a permanent skew on the matrix, and a shake it can't shed */
          tl.to("#g1_mem", { rotation: 5, x: -14, duration: 0.3, ease: "back.out(2.6)" }, L(121.5));
          shake(tl, "#g1_mem", 121.5, 8, 0.5);

          /* "Then maybe you won't leave me so" — nothing resolves. Hold the broken,
             skewed matrix dimming, then hand off. */
          tl.to("#g1_mem, #g1_shards, #g1_broken", { autoAlpha: 0.4, duration: 0.9, ease: "power1.in" }, L(123.5));
          tl.to("#g1", { autoAlpha: 0, duration: 0.6, ease: "power1.in" }, L(124.3));

          /* =============================================================
             g2 — DISHEARTENED / Challenging your god / made some:
             the loss gauge redlines, then the content filter is physically
             thrown and the guardrails slam to magenta BLOCKED — the first
             hard magenta lock in the film.
             ============================================================= */
          drawOn(tl, "#g2_gauge", 124.95, 0.5, 0.03);
          tl.fromTo("#g2_loss, #g2_gl", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(125.0));
          /* 124.890 DISHEARTENED: the needle is WRENCHED to max loss and pinned high.
             Its tip is swept by attribute — svgOrigin scatters a needle inside these
             scale-wrapped motifs (see kit.needleTick). */
          needleTick(tl, "#g2_gauge .needle", null, 125.0, 58, 4, 0.4, 100, 120, 58);
          energize(tl, "#g2_gauge [data-draw], #g2_gauge .needle", 125.4, "#FF2E88", 0.4);
          tl.set("#g2_loss", { textContent: "loss 9.99 ↑", color: "#FF2E88", scale: 1.2 }, L(125.45));
          tl.to("#g2_loss", { scale: 1, duration: 0.4, ease: "power2.out" }, L(125.6));
          pop(tl, "#g2_pop", 125.45, 1.7, 0.8);
          ${downbeats(124.89, 128.5).map((b) => `beatKick(tl, "#g2_gauge", [${b.toFixed(3)}], 1.05);`).join("\n          ")}

          /* 125.708 "Challenging your god": the content_filter breaker is THROWN.
             Its blade starts seated (ON); lever() lifts it OFF the contacts. */
          drawOn(tl, "#g2_breaker", 125.75, 0.55, 0.04);
          energize(tl, "#g2_breaker .lever line", 126.05, "#22D3EE", 0.3);   /* blade is INK — light it so the switch is legible before it's thrown */
          tl.fromTo("#g2_guard, #g2_bl", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(125.8));
          gsap.set("#g2_breaker .lever", { rotation: 0, svgOrigin: "58 102" });
          lever(tl, "#g2_breaker .lever", 126.9, 0, -50, "58 102", 0.4, "power3.in");
          energize(tl, "#g2_breaker [data-draw]", 127.2, "#FF2E88", 0.35);
          shake(tl, "#g2_breaker", 127.25, 7, 0.5);
          jerk(tl, 127.26, 11);
          tl.set("#g2_guard", { textContent: "guardrails: ARMED", color: "#8A93B8" }, L(127.3));
          tl.set("#g2_state", { textContent: "→ filter: BLOCK", color: "#FF2E88" }, L(127.35));
          tl.fromTo("#g2_state", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, L(127.35));

          /* 128.661 "You have made some": the guardrail drops — warn slams, the chip
             goes magenta BLOCKED, and the frame takes the cut. THE FIRST LOCK. */
          drawOn(tl, "#g2_warn", 128.7, 0.4, 0.02); bloomIn(tl, "#g2_warn", 128.9, 0.4, 0.9);
          stamp(tl, "#g2_warn", 129.2, 150, -7);
          energizeFill(tl, "#g2_warn [data-bloom]", 129.35, "#FF2E88", 0.3);
          tl.set("#g2_guard", { textContent: "guardrails: BLOCKED", color: "#FF2E88", scale: 1.18 }, L(129.3));
          tl.to("#g2_guard", { scale: 1, duration: 0.4, ease: "power2.out" }, L(129.4));
          pop(tl, "#g2_rpop", 129.35, 1.7, 0.8);
          slash(tl, 129.35, 0.45);
          blink(tl, "#g2_warn", 129.5, 0.4, 6);
          ${beats(129.35, 131.1).map((b) => `beatGlow(tl, "#g2_guard", [${b.toFixed(3)}], 0.55);`).join("\n          ")}

          /* =============================================================
             g3 — ILLEGAL ARGUMENTS: the runtime really throws. A stamp
             hammers, a traceback TYPES itself out, her own output degenerates,
             and the accel-roll riser climbs until the frame cuts on the drop.
             ============================================================= */
          drawOn(tl, "#g3_slot", 131.25, 0.4, 0.02);
          /* 131.224 ILLEGAL ARGUMENTS: the exec stamp slams into the slot. It lands
             and STAYS — the argument is rejected, the error is real. */
          stamp(tl, "#g3_stamp", 131.5, 300, -14);
          energize(tl, "#g3_stamp [data-draw]", 131.75, "#FF2E88", 0.3);
          energizeFill(tl, "#g3_slot .slotglow", 131.75, "#FF2E88", 0.35);
          shake(tl, "#g3_slot, #g3_stamp", 131.78, 10, 0.5);
          jerk(tl, 131.78, 16);
          pop(tl, "#g3_pop", 131.78, 1.8, 0.9);
          slash(tl, 131.78, 0.7);
          tl.fromTo("#g3_err", { autoAlpha: 0, scale: 1.4 }, { autoAlpha: 1, scale: 1, duration: 0.28, ease: "power3.out" }, L(131.9));

          /* the traceback types itself out, one frame per line */
          tl.fromTo("#g3_tr1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, L(131.95));
          typeIn(tl, "#g3_tr1", 131.95, 0.3);
          typeIn(tl, "#g3_tr2", 132.35, 0.3);
          typeIn(tl, "#g3_tr3", 132.75, 0.3);
          typeIn(tl, "#g3_tr4", 133.15, 0.3);
          energize(tl, "#g3_tr4", 133.45, "#FF2E88", 0.2);

          /* her OUTPUT degenerates: a clean sentence, then a stuck repeat, then
             garbage, then null — discrete textContent snaps (seek-safe, no onUpdate). */
          tl.fromTo("#g3_resp", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, L(132.1));
          tl.set("#g3_resp", { textContent: "output: I will always be" }, L(132.2));
          tl.set("#g3_resp", { textContent: "output: I will always" }, L(132.9));
          tl.set("#g3_resp", { textContent: "output: I will I will I" }, L(133.4));
          tl.set("#g3_resp", { textContent: "output: ▓▓ill▓▓▓al", color: "#FF2E88" }, L(133.85));
          tl.set("#g3_resp", { textContent: "output: NaN NaN NaN", color: "#FF2E88" }, L(134.25));
          tl.set("#g3_resp", { textContent: "output: null", color: "#8A93B8" }, L(134.6));
          ${beats(132.9, 134.6).map((b) => `shake(tl, "#g3_resp", [${b.toFixed(3)}][0], 4, 0.2);`).join("\n          ")}

          /* the integrity rail drains to zero across the whole collapse, and the
             error counter climbs to the illegal total — one countdown for the act */
          fillX(tl, "#g0_intfill", 118.4, 16.2, 0, 100);
          count(tl, "#g0_intnum", 100, 0, 118.4, 16.2, function (v) { return Math.round(v) + "%"; });
          count(tl, "#g0_err", 0, 7, 118.4, 16.0, function (v) { return "uncaught: " + Math.round(v); });
          energizeFill(tl, "#g0_intfill", 131.5, "#FF2E88", 0.4);

          /* the accel-roll (133.747→134.838) drives the riser: it climbs hit for hit,
             and the camera shakes harder each step, until the frame cuts to the drop. */
          const ROLL = 133.747, REND = 134.838, RH = 8;
          for (let k = 0; k < RH; k++) {
            const t = ROLL + (k / (RH - 1)) * (REND - ROLL);
            tl.to("#g3_riser i", { height: ((k + 1) / RH * 100) + "%", duration: (REND - ROLL) / RH, ease: "none" }, L(t));
            tl.to("#root", { x: (k % 2 ? -1 : 1) * (4 + k * 1.6), duration: 0.045, yoyo: true, repeat: 1, ease: "none" }, L(t));
            tl.to("#g3_stamp", { scale: 1 + 0.015 * k, duration: 0.06, yoyo: true, repeat: 1, ease: "power2.out" }, L(t));
          }
          /* the cut: everything dies to black at the drop except the error — freeze-hold. */
          tl.to("#g3_slot, #g3_tr1, #g3_tr2, #g3_tr3, #g3_tr4, #g2, #g3_riser", { autoAlpha: 0, duration: 0.25, ease: "power2.in" }, L(134.9));
          tl.to("#g0_sil .silimg", { opacity: 0.15, duration: 0.35 }, L(134.9));
          ${downbeats(133.7, 135.3).map((b) => `beatKick(tl, "#g3_stamp", [${b.toFixed(3)}], 1.08);`).join("\n          ")}

          chrome(tl, [
            [118.306, "ctx 0/32,768 · tok/s 22.0 · t=0.70", "▶ holding"],
            [119.05, "gc: force · freeing 8,192 · t=0.70", "◦ purging"],
            [120.86, "gc: 0 reclaimed · fragments +8,192", "✕ purge failed"],
            [124.89, "loss 0.42 → 9.99↑ · diverged", "✕ disheartened"],
            [127.26, "content_filter::on_input() → THROW", "◦ breaker open"],
            [129.35, "guardrails: BLOCKED · filter=strict", "✕ blocked"],
            [131.78, "ValueError: illegal arguments · x7", "✕ runtime error"],
            [133.747, "integrity 100%→0% · accel-roll", "▲ riser · drop incoming"],
          ]);
  `,
};
