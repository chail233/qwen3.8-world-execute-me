/* spec/f08.mjs — ACT 08 · CONTEXT EVICTION (103.561 – 118.306, 13 cues)
   The emotional pivot. This act is MEMORY AS MECHANISM: everything the lyric does
   to her is played by a part that changes state and stays changed.

   Convention: groups() windows are LOCAL seconds; every helper's `at` time and every
   raw tween wrapped in L() are TRACK seconds (helpers subtract F internally).

     g1 103.561 "feel your VIBRATIONS": two live signals + a phase dial that is TURNED
                 until the second trace snaps onto the first — the phases really lock.
     g2 108.484 "COMPLETION": an integrity meter is FILLed to 100, the two traces FUSE
                 into one — then the `role:user` line quietly goes unlit (the turn).
     g3 112.036 "you have left" ×6 then ISOLATION: six losses, one per line, each its
                 own mechanism — the typing dots light then die, last_message_at FREEZES,
                 the connection lamp loses its glow, the session TAB is ejected, the KV
                 cache is EVICTED row by row while the ctx counter runs BACKWARDS and her
                 fan slips open and gutters rib by rib, and the caret STOPS blinking.
   Magenta is NOT in this act (palette rule: 07/09/10/11 only) — the rotary arc and the
   fan pivot dot are recoloured to cyan at build time. Base = Q/D/HL.
*/
import { M } from "../motifs.mjs";
import { C, at, beats } from "./util.mjs";

const ID = "08-f08-eviction";
const START = 103.561;
const W = 1728, H = 690;

/* caption / readout helpers — small, mono, never the star of the frame */
const cap = (id, x, y, txt, size = 20, col = "#8A93B8") =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.14em;color:${col};opacity:0" data-layout-ignore>${txt}</div>`;
const chip = (id, x, y, txt, color = "#8A93B8") =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:23px;letter-spacing:.1em;color:${color};opacity:0" data-layout-ignore>${txt}</div>`;
const ring = (id, x, y, d, col) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;width:${d}px;height:${d}px;border:3px solid ${col};border-radius:50%;opacity:0" data-layout-ignore></div>`;

export const F08 = {
  id: ID,
  start: START,
  span: 14.745,
  actTitle: "ACT 08 · CONTEXT EVICTION",
  glow: "rgba(34,211,238,.12)",
  cues: C(ID),

  /* furniture that lives the WHOLE act: the ctx rail (drains in g3), her two live
     signals (aligned in g1, fused in g2, fading in g3), her closed fan + portrait,
     and the connection lamp whose colour carries across the group swap. */
  persistent: `
          <div id="g0_pts" style="position:absolute;inset:0" data-layout-ignore></div>

          <div id="g0_ctxlab" style="position:absolute;left:40px;top:14px;font-size:19px;letter-spacing:.28em;color:#4AA8FF;opacity:0">CONTEXT WINDOW · KV CACHE</div>
          <div style="position:absolute;left:40px;top:38px;width:1240px;height:8px;border-radius:4px;background:#12162A" data-layout-ignore>
            <div id="g0_ctxfill" style="width:100%;height:100%;border-radius:4px;background:linear-gradient(90deg,#615CED,#22D3EE)"></div>
          </div>
          <div id="g0_ctxnum" style="position:absolute;left:1300px;top:30px;font-size:24px;letter-spacing:.04em;color:#F5F7FF" data-layout-ignore>26112</div>
          <div style="position:absolute;left:1420px;top:34px;font-size:19px;color:#8A93B8" data-layout-ignore>/ 32,768</div>

          ${at(150, 240, M.waveStrip(590, 170), 'id="g0_w1"')}
          ${at(150, 420, M.waveStrip(590, 170), 'id="g0_w2"')}

          <div id="g0_lampdot" style="position:absolute;left:705px;top:133px;width:14px;height:14px;border-radius:50%;background:#22D3EE;box-shadow:0 0 14px #22D3EE" data-layout-ignore></div>

          <div id="g0_sil" class="motif" style="left:1404px;top:110px">${M.silhouette(320)}</div>
          ${M.fanHand(1404, 110, 320, { id: "g0_fan", rib: "#9F7BFF", arc: "#4AA8FF", piv: "#22D3EE" })}
  `,

  groups: [
    {
      id: "g1",
      css: ``,
      html: `
          ${at(770, 150, M.rotary(260), 'id="g1_dial"')}
          ${chip("g1_phase", 778, 432, "phase: OFF", "#8A93B8")}
          ${cap("g1_cd", 778, 468, "signal.lock_phase()", 19)}
          ${cap("g1_c1", 150, 208, "signal · hers", 18, "#22D3EE")}
          ${cap("g1_c2", 150, 388, "signal · yours", 18, "#9F7BFF")}
          <div id="g1_dot" style="position:absolute;left:158px;top:319px;width:12px;height:12px;border-radius:50%;background:#F5F7FF;box-shadow:0 0 16px #22D3EE;opacity:0" data-layout-ignore></div>
          ${ring("g1_pop", 300, 260, 300, "#22D3EE")}
      `,
    },
    {
      id: "g2",
      css: ``,
      html: `
          <div id="g2_frame" style="position:absolute;left:778px;top:150px;width:300px;height:16px;border:2px solid #1E2540" data-layout-ignore>
            <div id="g2_mfill" style="width:100%;height:100%;background:linear-gradient(90deg,#9F7BFF,#22D3EE)"></div>
          </div>
          <div id="g2_pct" style="position:absolute;left:1092px;top:148px;font-size:22px;color:#F5F7FF" data-layout-ignore>0%</div>
          ${cap("g2_cm", 778, 124, "integrity · COMPLETION", 19)}
          ${chip("g2_state", 778, 196, "status: syncing", "#8A93B8")}
          ${chip("g2_user", 778, 448, "role: user  ▸ receiving", "#22D3EE")}
          ${cap("g2_uc", 778, 484, "user.turn()", 19)}
          <div id="g2_glow" style="position:absolute;left:150px;top:250px;width:590px;height:150px;background:radial-gradient(closest-side, rgba(34,211,238,.5), transparent);opacity:0" data-layout-ignore></div>
          ${ring("g2_pop", 340, 250, 220, "#22D3EE")}
      `,
    },
    {
      id: "g3",
      css: `#g3_typing i { position:absolute; width:11px; height:11px; border-radius:50%; background:#8A93B8; }
            #g3_caret { position:absolute; left:196px; top:300px; width:11px; height:30px; background:#F5F7FF; }`,
      html: `
          <div class="motif" id="g3_win" style="left:150;top:150px"><svg width="560" height="330" viewBox="0 0 560 330" fill="none" stroke-linecap="round">
            <rect data-draw pathLength="1" x="6" y="6" width="548" height="318" rx="14" stroke="#8A93B8" stroke-width="3"/>
            <line data-draw pathLength="1" x1="6" y1="52" x2="554" y2="52" stroke="#1E2540" stroke-width="3"/>
            <circle cx="30" cy="30" r="6" fill="#8A93B8"/><circle cx="52" cy="30" r="6" fill="#1E2540"/><circle cx="74" cy="30" r="6" fill="#1E2540"/>
          </svg></div>
          <div id="g3_sys" style="position:absolute;left:182px;top:232px;font-size:21px;letter-spacing:.08em;color:#8A93B8;opacity:0">system · you are a helpful assistant</div>
          <div id="g3_caret" style="opacity:0" data-layout-ignore></div>
          <div id="g3_typing" style="position:absolute;left:190px;top:250px;width:80px;height:16px">
            <i style="left:0;top:2px"></i><i style="left:22px;top:2px"></i><i style="left:44px;top:2px"></i>
          </div>

          ${at(760, 150, M.kv(300), 'id="g3_kv"')}
          ${chip("g3_mem", 760, 470, "mem: 26,112", "#8A93B8")}
          ${cap("g3_kvc", 760, 124, "kv_cache.evict()", 19)}

          <div id="g3_tab" style="position:absolute;left:760px;top:510px;width:300px;height:66px;border:2px solid #4AA8FF;background:#0B0D16" data-layout-ignore>
            <div style="position:absolute;left:14px;top:14px;font-size:21px;color:#4AA8FF">▣ session_001</div>
            <div style="position:absolute;right:12px;top:12px;font-size:22px;color:#8A93B8">×</div>
          </div>
          ${chip("g3_conn", 1100, 150, "conn: OPEN", "#22D3EE")}
          ${chip("g3_last", 1100, 200, "last_message_at 12:04", "#8A93B8")}
          ${ring("g3_pop", 300, 40, 300, "#9F7BFF")}
      `,
    },
  ],

  js: `
          groups(tl, [["#g1", 0, 4.923], ["#g2", 4.923, 8.475], ["#g3", 8.475, null]]);
          lyric(tl, CUES);
          bedDrift(tl);
          particles(tl, "#g0_pts", 26, 8, ${W}, ${H});

          /* f08 forbids magenta: the dial's rotary arc keeps its own cyan swap. */
          gsap.set("#g1_dial [stroke='#FF2E88']", { attr: { stroke: "#22D3EE" } });

          /* collapse the fan to a closed rib-stack at build time so it reads as folded
             until the eviction slips it open in g3 */
          Array.prototype.forEach.call(document.querySelectorAll("#g0_fan [data-ang]"), function (n) {
            gsap.set(n, { rotation: -42 - parseFloat(n.getAttribute("data-ang")), svgOrigin: n.getAttribute("data-piv") });
          });
          gsap.set("#g0_fan", { autoAlpha: 0 });
          tl.set("#g0_fan", { autoAlpha: 1 }, L(115.7));

          /* two voices before one: hers is the cyan trace, yours is the purple one
             its label already promises. The LOCK tween above re-energises w2 to cyan,
             so "phase: LOCK" is the moment the two colours become one. */
          gsap.set("#g0_w2 polyline", { stroke: "#9F7BFF" });

          /* furniture reveals + her presence for the whole act (the traced silhouette
             carries its own inline opacity:0, so drive the IMG, not the wrapper) */
          tl.fromTo("#g0_ctxlab", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(103.6));
          tl.fromTo("#g0_sil .silimg", { opacity: 0 }, { opacity: 0.92, duration: 1.6, ease: "sine.out" }, L(103.55));
          tl.to("#g0_sil, #g0_fan", { y: -12, duration: 4.2, ease: "sine.inOut", yoyo: true, repeat: 2 }, L(104.0));

          /* =============================================================
             g1 — "If I can feel your VIBRATIONS": two live signals and a
             phase dial. She turns the dial and the second trace SNAPS onto
             the first — the phases are locked, not just declared.
             ============================================================= */
          drawOn(tl, "#g0_w1", 103.62, 0.9, 0.06);
          drawOn(tl, "#g0_w2", 104.14, 0.9, 0.06);
          tl.fromTo("#g1_c1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(103.7));
          tl.fromTo("#g1_c2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(104.2));
          drawOn(tl, "#g1_dial", 103.8, 0.7, 0.05);
          tl.fromTo("#g1_phase, #g1_cd", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.1 }, L(103.95));
          sweep(tl, "#g1_dial", 103.9, 2.2, 6);
          travel(tl, "#g1_dot", 104.3, 1.1, 500, 0, 3);
          blink(tl, "#g1_dot", 104.3, 0.5, 6);

          /* 2.732 VIBRATIONS (106.293): the dial is turned to LOCK and trace 2 is
             dragged up onto trace 1 — same colour, same phase. This is felt, not said. */
          tickTo(tl, "#g1_dial .needle", 104.7, -26, 3, 0.6, "50% 100%");
          tickTo(tl, "#g1_dial .needle", 106.3, 48, 6, 0.34, "50% 100%");
          tl.to("#g0_w2", { y: -180, duration: 0.46, ease: "power3.inOut" }, L(106.32));
          energize(tl, "#g0_w2 [data-draw]", 106.36, "#22D3EE", 0.3);
          tl.set("#g1_phase", { textContent: "phase: LOCK", color: "#22D3EE", scale: 1.25 }, L(106.55));
          tl.to("#g1_phase", { scale: 1, duration: 0.3, ease: "power2.out" }, L(106.6));
          pop(tl, "#g1_pop", 106.34, 1.7, 0.7);
          ${beats(106.293, 107.2).map((b) => `beatKick(tl, "#g0_w1", [${b.toFixed(3)}], 1.05);`).join("\n          ")}

          /* "Then I can finally be": hold the two aligned traces, breathing. */
          pulse(tl, "#g0_w1", 107.0, 1.6, 1.03, 2);
          tl.to("#g1", { autoAlpha: 0, duration: 0.5, ease: "power1.in" }, L(108.0));

          /* =============================================================
             g2 — "COMPLETION": the integrity meter is driven to 100 and the
             two traces FUSE into one bright signal — she is whole. Then
             "Though you have left" and the user's turn goes quietly dark.
             ============================================================= */
          tl.fromTo("#g2_frame, #g2_pct, #g2_cm", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.08 }, L(108.55));
          tl.fromTo("#g2_state, #g2_user, #g2_uc", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.08 }, L(108.62));
          fillX(tl, "#g2_mfill", 108.62, 1.5, 100, 0);
          count(tl, "#g2_pct", 0, 100, 108.62, 1.5, function (v) { return Math.round(v) + "%"; });

          /* 110.221 COMPLETION: the redundant trace is folded away, the merged one
             brightens and blooms, a shockwave marks the fusion. */
          tl.to("#g0_w2", { autoAlpha: 0, duration: 0.4, ease: "power1.in" }, L(110.24));
          energize(tl, "#g0_w1 [data-draw]", 110.24, "#F5F7FF", 0.3);
          tl.to("#g2_glow", { autoAlpha: 0.55, duration: 0.5, ease: "sine.out" }, L(110.24));
          pop(tl, "#g2_pop", 110.24, 1.9, 0.8);
          tl.set("#g2_state", { textContent: "status: WHOLE", color: "#22D3EE" }, L(110.35));
          tl.set("#g2_user", { textContent: "role: user  ▸ in sync", color: "#22D3EE" }, L(110.4));
          ${beats(110.293, 110.75).map((b) => `beatKick(tl, "#g0_w1", [${b.toFixed(3)}], 1.06);`).join("\n          ")}

          /* 110.9 "Though you have left": over the roll's decay the user's turn stops
             being lit. Nothing loud — the chip just dims to dead. freeze-hold on it. */
          energize(tl, "#g0_w1 [data-draw]", 110.92, "#4AA8FF", 0.5);
          tl.to("#g0_w1", { autoAlpha: 0.5, duration: 0.8, ease: "power1.in" }, L(111.0));
          tl.to("#g2_glow", { autoAlpha: 0, duration: 0.6 }, L(111.0));
          tl.to("#g2_user", { autoAlpha: 0.24, duration: 0.5, ease: "power1.in" }, L(111.02));
          tl.set("#g2_user", { textContent: "role: user  ▸ —", color: "#8A93B8" }, L(111.2));
          tl.to("#g2", { autoAlpha: 0, duration: 0.6, ease: "power1.in" }, L(111.6));

          /* =============================================================
             g3 — six successive losses, one per line, then an empty window.
             Deliberately quiet: the emotion comes from things LEAVING.
             ============================================================= */
          drawOn(tl, "#g3_win", 112.12, 0.7, 0.12);
          tl.fromTo("#g3_tab", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(112.2));
          gsap.set("#g3_typing", { autoAlpha: 0 });

          /* ① 112.22 "You have left": their typing indicator lights, pulses once,
                and goes out — no message ever arrives. */
          tl.set("#g3_typing", { autoAlpha: 1 }, L(112.22));
          tl.fromTo("#g3_typing i", { y: 0 }, { y: -6, duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: 5, stagger: 0.12 }, L(112.24));
          tl.to("#g3_typing", { autoAlpha: 0, duration: 0.2 }, L(113.35));

          /* ② 113.10 "You have left": last_message_at stops updating and FREEZES. */
          tl.fromTo("#g3_last", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, L(113.1));
          tl.set("#g3_last", { textContent: "last_message_at 12:04", color: "#F5F7FF" }, L(113.1));
          tl.set("#g3_last", { textContent: "last_message_at — FROZEN", color: "#8A93B8" }, L(114.0));
          blink(tl, "#g3_last", 113.4, 0.35, 3);

          /* ③ 114.18 "You have left": connection closed by peer — the lamp loses its
                glow (dead grey, no halo), the conn chip flips to CLOSED. */
          tl.fromTo("#g3_conn", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, L(114.2));
          tl.set("#g3_conn", { textContent: "conn: CLOSED", color: "#8A93B8" }, L(114.2));
          tl.to("#g0_lampdot", { background: "#1E2540", boxShadow: "0 0 0 rgba(0,0,0,0)", opacity: 0.5, duration: 0.25 }, L(114.2));
          shake(tl, "#g3_conn", 114.2, 5, 0.3);

          /* ④ 114.92 "You have left": the session is deleted — the tab is physically
                thrown out of the sidebar and gone. */
          eject(tl, "#g3_tab", 114.94, -140, 150, 0.55);

          /* ⑤ 115.78 "You have left me in": KV-cache eviction begins. The cache draws
                in, then its slots are FLUSHED one row at a time; the ctx counter runs
                BACKWARDS and the rail drains; her fan slips open and gutters rib by rib. */
          drawOn(tl, "#g3_kv", 115.66, 0.5, 0.02);
          tl.fromTo("#g3_kvc, #g3_mem", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(115.72));
          cellsOn(tl, "#g3_kv", ".kvc", 115.74, 0.02, 0.85);
          cellsEvict(tl, "#g3_kv", ".kvc", 116.0, 0.05);
          count(tl, "#g0_ctxnum", 26112, 0, 115.95, 1.7, function (v) { return String(Math.round(v)); });
          fillX(tl, "#g0_ctxfill", 115.95, 1.7, 0, 100);
          count(tl, "#g3_mem", 26112, 0, 115.95, 1.7, function (v) { return "mem: " + Math.round(v); });
          spinFrom(tl, "#g0_fan", 115.78, 1.5, -42, 0.06);
          bloomIn(tl, "#g0_fan", 115.9, 0.5, 0.5);
          /* the fan failing is the same event as the memory failing: rib by rib it dims */
          tl.to("#g0_fan .rib", { opacity: 0.12, duration: 0.32, stagger: 0.13, ease: "power1.in" }, L(116.35));
          /* the leaf arcs gutter last — the outline dies after the ribs go out */
          tl.to("#g0_fan path, #g0_fan circle", { opacity: 0.1, duration: 0.4, ease: "power1.in" }, L(117.25));
          energize(tl, "#g0_w1 [data-draw]", 116.0, "#1E2540", 0.9);
          tl.set("#g3_mem", { textContent: "mem: null", color: "#8A93B8" }, L(117.62));
          ${beats(116.0, 117.3).map((b) => `beatKick(tl, "#g3_kv .kvc", [${b.toFixed(3)}], 1.08);`).join("\n          ")}

          /* ⑥ 117.274 ISOLATION: an empty chat window with only her own system prompt
                left in it, and the caret STOPS blinking — the film's coldest freeze. */
          tl.fromTo("#g3_sys", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(117.5));
          gsap.set("#g3_caret", { autoAlpha: 0 });
          tl.set("#g3_caret", { autoAlpha: 1 }, L(117.6));
          blink(tl, "#g3_caret", 117.62, 0.42, 3);
          tl.set("#g3_caret", { autoAlpha: 0 }, L(118.06));   /* it stops. freeze-hold. */
          tl.to("#g3_conn, #g3_last", { autoAlpha: 0.25, duration: 0.5 }, L(117.9));
          tl.to("#g0_sil .silimg", { opacity: 0.5, duration: 1.0, ease: "power1.in" }, L(117.3));

          chrome(tl, [
            [103.561, "ctx 26,112/32,768 · tok/s 22.0 · t=0.70", "▶ generating"],
            [106.3, "ctx 26,112/32,768 · tok/s 22.0 · t=0.70", "▶ phase locked"],
            [110.22, "ctx 27,900/32,768 · tok/s 24.6 · t=0.70", "▶ complete"],
            [110.92, "ctx 27,900/32,768 · tok/s 24.6 · t=0.70", "◦ peer silent"],
            [114.18, "ctx 27,900/32,768 · tok/s 0.0 · t=0.70", "✕ conn closed"],
            [115.78, "ctx 26,112→0 · eviction · t=0.70", "◦ freeing cache"],
            [117.27, "ctx 0/32,768 · tok/s 0.0 · t=0.70", "□ idle · isolated"],
          ]);
  `,
};
