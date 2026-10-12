/* spec/f01.mjs — ACT 01 · COLD BOOT (0 – 17.136)
   Convention: groups() windows are LOCAL seconds; every other time handed to a
   kit helper is a TRACK second (the helper subtracts the frame start).

   BUILD RULE FOR THIS FILM: a lyric is an instruction, so every cue is ENACTED by
   a mechanism that changes state and stays changed — the breaker is really thrown
   (and only then does current run the line), the shield is really lifted off the
   bench and slotted home, the pieces really fall onto their squares and light them,
   the braces really close and fill themselves, the sliders really drive to value,
   the seal really drops and stays stamped, the pedestal really rises, the key is
   really pressed and the iris really opens on a live simulation.
     g1  0.000 power line -> protection -> pieces -> object
     g2  7.446 parameters poured in -> INITIALIZATION seal
     g3 11.095 world spawned -> SIMULATION opened -> execute()
*/
import { M } from "../motifs.mjs";
import { C, at, beats } from "./util.mjs";

const ID = "01-f01-boot";
const W = 1728, H = 690;

/* a caption under a station — small, mono, never the star of the frame */
const cap = (id, x, y, txt, size = 21) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.14em;color:#8A93B8;opacity:0">${txt}</div>`;

/* a state chip: the mechanism's readout. Its text is swapped by tl.set at the
   instant the part moves, so the state flip is legible, not implied. */
const chip = (id, x, y, txt, color = "#4ADE80") =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:24px;letter-spacing:.1em;color:${color};opacity:0" data-layout-ignore>${txt}</div>`;

/* one parameter slider: track + fill + knob. markup holds the END state (knob on
   the value, fill grown); insert()/fillX() wind it back to zero and drive it in. */
function slider(id, x, y, w, kw, col, frac) {
  const kx = Math.round(w * frac - 13);
  return `
          <div class="srow" style="left:${x}px;top:${y}px;width:${w}px" data-layout-ignore>
            <div class="strack"></div>
            <div class="sfill" id="${id}_f" style="background:linear-gradient(90deg,${col},rgba(34,211,238,.3))"></div>
            <div class="sknob" id="${id}_k" style="left:${kx}px;box-shadow:0 0 16px ${col}" data-dx="${-kx}"></div>
            ${cap(`${id}_c`, 0, 34, kw, 21)}
          </div>`;
}
/* the dx a knob travels back to the left end of its track */
const KNOB_DX = [-(Math.round(460 * 0.72) - 13), -(Math.round(460 * 0.78) - 13), -(Math.round(460 * 0.7) - 13)];

export const F01 = {
  id: ID,
  start: 0,
  span: 17.136,
  actTitle: "ACT 01 · COLD BOOT",
  glow: "rgba(97,92,237,.16)",
  cues: C(ID),

  /* ---- furniture that lives for the whole act ---- */
  persistent: `
          <div id="g0_pts" style="position:absolute;inset:0" data-layout-ignore></div>
          <div style="position:absolute;left:40px;top:648px;width:1560px;height:4px;background:#1E2540" data-layout-ignore>
            <div id="g0_fill" style="width:100%;height:100%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#615CED,#22D3EE)"></div>
          </div>
          <div id="g0_pct" style="position:absolute;left:1620px;top:632px;font-size:21px;color:#8A93B8" data-layout-ignore>0%</div>
          <div id="g0_head" style="position:absolute;left:40px;top:600px;font-size:19px;letter-spacing:.3em;color:#4AA8FF;opacity:0">BOOT SEQUENCE</div>
  `,

  groups: [
    {
      id: "g1",
      css: `#g1_bus { position:absolute; left:250px; top:183px; }
            .busdot { position:absolute; left:262px; top:196px; width:13px; height:13px; border-radius:50%;
              background:#22D3EE; box-shadow:0 0 16px #22D3EE, 0 0 34px rgba(34,211,238,.6); opacity:0; }
            .srow { position:absolute; height:26px; }
            .strack { position:absolute; left:0; top:9px; right:0; height:8px; border-radius:4px; background:#1E2540; }
            .sfill { position:absolute; left:0; top:9px; width:100%; height:8px; border-radius:4px; }
            .sknob { position:absolute; top:0; width:26px; height:26px; border-radius:50%; background:#F5F7FF; }
            .obj { position:absolute; font-family:"Cascadia Mono", Consolas, monospace; }
            .obwrap { display:flex; align-items:center; gap:14px; }
            .ob { font-size:96px; font-weight:700; color:#22D3EE; line-height:1; }
            .obbody { display:flex; flex-direction:column; gap:12px; padding-top:8px; }
            .obline { font-size:30px; color:#9F7BFF; white-space:nowrap; opacity:0; }
            .obline.b { padding-left:22px; }`,
      html: `
          <div id="g1_bus" style="position:absolute;left:250px;top:183px">
            <svg width="1420" height="70" viewBox="0 0 1420 70" fill="none" stroke-linecap="round">
              <line class="live" data-draw pathLength="1" x1="10" y1="20" x2="1390" y2="20" stroke="#1E2540" stroke-width="5"/>
              <path class="live" data-draw pathLength="1" d="M280 20 L280 64" stroke="#1E2540" stroke-width="4"/>
              <path class="live" data-draw pathLength="1" d="M680 20 L680 64" stroke="#1E2540" stroke-width="4"/>
              <path class="live" data-draw pathLength="1" d="M1060 20 L1060 64" stroke="#1E2540" stroke-width="4"/>
              <path class="live" data-draw pathLength="1" d="M1390 20 L1408 20" stroke="#1E2540" stroke-width="4"/>
              <circle class="live" data-draw pathLength="1" cx="1390" cy="20" r="7" stroke="#1E2540" stroke-width="4"/>
            </svg>
          </div>
          <div class="busdot" id="g1_dot" data-layout-ignore></div>
          <div class="busdot" id="g1_dot2" data-layout-ignore></div>
          <div class="busdot" id="g1_dot3" data-layout-ignore></div>

          ${at(30, 40, M.breaker(320), 'id="g1_m1"')}
          ${chip("g1_state", 56, 344, "OFF", "#8A93B8")}
          ${cap("g1_c1", 56, 388, "power.rail()")}
          ${cap("g1_k1", 56, 420, "S1 · MAIN LINE", 19)}
          <div id="g1_pop" style="position:absolute;left:40px;top:90px;width:300px;height:300px;border:3px solid #22D3EE;border-radius:50%;opacity:0" data-layout-ignore></div>

          ${at(380, 250, M.gearslot(300), 'id="g1_slot"')}
          ${at(404, 271, M.shield(252), 'id="g1_m2"')}
          ${chip("g1_guard", 396, 566, "guard: none", "#8A93B8")}
          ${cap("g1_c2", 396, 598, "equip(PROTECTION)", 19)}
          <div id="g1_pop2" style="position:absolute;left:370px;top:240px;width:320px;height:320px;border:3px solid #22D3EE;border-radius:50%;opacity:0" data-layout-ignore></div>

          ${at(760, 240, M.board(340), 'id="g1_m3"')}
          ${at(884, 300, M.pawn(96), 'id="g1_p1"')}
          ${at(925, 382, M.pawn(96), 'id="g1_p2"')}
          ${at(843, 423, M.pawn(96), 'id="g1_p3"')}
          ${chip("g1_turn", 786, 596, "turn: 0", "#8A93B8")}
          ${cap("g1_c3", 786, 628, "pieces.lay_down()", 19)}

          <div class="obj" id="g1_obj" style="left:1150px;top:270px" data-layout-ignore>
            <div class="obwrap">
              <span class="ob" id="g1_lb">{</span>
              <div class="obbody">
                <div class="obline" id="g1_ol1">world = Object()</div>
                <div class="obline b" id="g1_ol2">seeds: 1, rules: 12</div>
              </div>
              <span class="ob" id="g1_rb">}</span>
            </div>
          </div>
          ${chip("g1_objchip", 1170, 500, "obj: —", "#8A93B8")}
          ${cap("g1_c4", 1170, 532, "new World()", 19)}
      `,
    },
    {
      id: "g2",
      css: `#g2_scan { position:absolute; left:596px; top:60px; width:420px; height:3px;
              background:linear-gradient(90deg, transparent, #22D3EE, transparent); opacity:.8; }`,
      html: `
          ${cap("g2_m0", 40, 44, "console.set()", 20)}
          ${slider("g2_p1", 40, 92, 460, "lr 0.00", "#9F7BFF", 0.72)}
          ${slider("g2_p2", 40, 168, 460, "wd 0.00", "#4AA8FF", 0.78)}
          ${slider("g2_p3", 40, 244, 460, "temp 0.00", "#22D3EE", 0.7)}
          ${at(596, 60, M.kv(440), 'id="g2_m2"')}
          <div id="g2_scan" data-layout-ignore></div>
          ${cap("g2_c1", 596, 424, "kv_cache.write()", 19)}
          ${at(1090, 40, M.tokens(480), 'id="g2_m3"')}
          ${cap("g2_c2", 1096, 200, "tokenizer.encode()", 19)}
          ${at(1100, 380, M.logits(300), 'id="g2_m4"')}
          ${cap("g2_c3", 1400, 556, "logits → sample", 19)}
          ${at(760, 440, M.check(240), 'id="g2_seal"')}
          <div id="g2_pop" style="position:absolute;left:700px;top:380px;width:360px;height:360px;border:3px solid #4ADE80;border-radius:50%;opacity:0" data-layout-ignore></div>
          ${chip("g2_ok", 1010, 540, "READY", "#4ADE80")}
      `,
    },
    {
      id: "g3",
      css: `#g3_sat { position:absolute; }
            #g3_sat i { position:absolute; left:50%; top:0; width:13px; height:13px; margin-left:-6px;
              border-radius:50%; background:#FFB454; box-shadow:0 0 16px #FFB454; }
            #g3_sat b { position:absolute; left:50%; bottom:0; width:9px; height:9px; margin-left:-4px;
              border-radius:50%; background:#4AA8FF; box-shadow:0 0 13px #4AA8FF; }`,
      html: `
          ${at(90, 0, M.world(500), 'id="g3_m1"')}
          <div id="g3_sat" style="left:60px;top:-30px;width:560px;height:560px" data-layout-ignore><i></i><b></b></div>
          ${at(150, 360, M.pedestal(320), 'id="g3_ped"')}
          <div id="g3_pop1" style="position:absolute;left:150px;top:70px;width:380px;height:380px;border:3px solid #22D3EE;border-radius:50%;opacity:0" data-layout-ignore></div>
          ${cap("g3_c2", 56, 556, "world.spawn()", 19)}

          ${at(680, 150, M.agents(400), 'id="g3_m2"')}
          ${at(680, 150, M.iris(400), 'id="g3_iris"')}
          ${chip("g3_sim", 700, 588, "sim: paused", "#8A93B8")}
          ${cap("g3_c3", 700, 620, "sim.begin(t=0)", 19)}

          ${at(1230, 90, M.playbtn(300), 'id="g3_btn"')}
          <div id="g3_pop2" style="position:absolute;left:1250px;top:110px;width:260px;height:260px;border:3px solid #FF2E88;border-radius:50%;opacity:0" data-layout-ignore></div>
          ${cap("g3_c1", 1240, 404, "▶ run", 20)}
          <div id="g3_spec" class="spec" style="left:1240px;top:450px;width:380px"></div>
          <div id="g3_title" class="caps" style="position:absolute;left:0;top:250px;width:1728px;text-align:center;font-size:96px;color:#F5F7FF;opacity:0">world.execute(me);</div>
      `,
    },
  ],

  js: `
          groups(tl, [["#g1", 0, 7.446], ["#g2", 7.446, 11.095], ["#g3", 11.095, null]]);
          lyric(tl, CUES);
          particles(tl, "#g0_pts", 34, 11, ${W}, ${H});

          /* ---- furniture: the boot rail is the act's heartbeat ---- */
          tl.fromTo("#g0_head", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0.2);
          tl.fromTo("#g0_fill", { scaleX: 0 }, { scaleX: 1, duration: 15.4, ease: "none" }, 0.3);
          count(tl, "#g0_pct", 0, 100, 0.3, 15.4, function (v) { return Math.round(v) + "%"; });

          /* =============================================================
             g1 — four mechanisms on one bench, each thrown by its own lyric
             ============================================================= */

          /* 0.10 "Switch on the power line": the breaker is drawn, then THROWN.
             Nothing carries current until the blade lands — the wires start dead
             (#1E2540) and only energize on the throw. */
          drawOn(tl, "#g1_m1", 0.15, 0.95, 0.05);
          drawOn(tl, "#g1_bus", 0.2, 1.15, 0.07);
          tl.fromTo("#g1_c1, #g1_k1, #g1_state", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.1 }, 0.35);
          lever(tl, "#g1_m1 .lever", 0.55, -54, 0, "58 102", 0.34, "back.out(2.6)");
          energize(tl, "#g1_bus .live", 0.72, "#22D3EE", 0.3);
          energizeFill(tl, "#g1_m1 .win", 0.72, "#4ADE80", 0.2);
          pop(tl, "#g1_pop", 0.72, 1.5, 0.6);
          tl.set("#g1_state", { textContent: "ON", color: "#4ADE80", scale: 1.3 }, L(0.72));
          tl.to("#g1_state", { scale: 1, duration: 0.3, ease: "power2.out" }, L(0.78));
          /* only now does current actually run the line, pass after pass */
          travel(tl, "#g1_dot", 0.85, 1.4, 1310, 0, 5);
          travel(tl, "#g1_dot2", 1.8, 1.75, 1310, 0, 4);
          travel(tl, "#g1_dot3", 3.2, 2.1, 1310, 0, 3);
          pulse(tl, "#g1_m1 .win", 1.1, 1.2, 1.3);

          /* 1.74 "Remember to put on": the empty slot wakes up; the piece is shown
             lying on the bench beside it (its parked position), not yet fitted. */
          drawOn(tl, "#g1_slot", 1.78, 0.7, 0.06);
          tl.fromTo("#g1_c2, #g1_guard", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.1 }, 1.85);
          energizeFill(tl, "#g1_slot .slotglow", 2.1, "#615CED", 0.4);
          drawOn(tl, "#g1_m2", 1.95, 0.75, 0.05); bloomIn(tl, "#g1_m2", 2.35, 0.5);
          pulse(tl, "#g1_slot", 2.3, 1.1, 1.04, 3);

          /* 2.92 "PROTECTION": the shield is lifted off the bench and slotted HOME.
             It ends up inside the frame and stays there; the readout flips to ARMED. */
          insert(tl, "#g1_m2", 2.92, 250, -140, 0.42);
          tl.to("#g1_m2", { scale: 0.93, duration: 0.09, ease: "power2.in" }, L(3.34));
          tl.to("#g1_m2", { scale: 1, duration: 0.3, ease: "back.out(3)" }, L(3.43));
          shake(tl, "#g1_slot", 3.36, 7, 0.42);
          energize(tl, "#g1_slot [data-draw]", 3.36, "#22D3EE", 0.25);
          pop(tl, "#g1_pop2", 3.36, 1.7, 0.6);
          tl.set("#g1_guard", { textContent: "guard: ARMED", color: "#4ADE80" }, L(3.4));
          beatKick(tl, "#g1_slot", [2.92], 1.06);

          /* 3.87 "Lay down your pieces": the board is drawn, then each pawn FALLS
             onto a square and that square lights. 5.49 "And let's begin" fires the
             next two drops on consecutive beats, and the board takes the impact. */
          drawOn(tl, "#g1_m3", 3.9, 0.85, 0.04);
          tl.fromTo("#g1_c3, #g1_turn", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.1 }, 4.0);
          tl.set("#g1_p1", { autoAlpha: 0 }, 0); drop(tl, "#g1_p1", 4.2, 190, 0.46);
          tl.set("#g1_p1", { autoAlpha: 1 }, L(4.05));
          energizeFill(tl, '#g1_m3 .sq[data-i="8"]', 4.66, "#22D3EE", 0.2);
          tl.set("#g1_turn", { textContent: "turn: 1", color: "#22D3EE" }, L(4.66));
          tl.set("#g1_p2", { autoAlpha: 0 }, 0); drop(tl, "#g1_p2", 5.49, 190, 0.46);
          tl.set("#g1_p2", { autoAlpha: 1 }, L(5.34));
          energizeFill(tl, '#g1_m3 .sq[data-i="21"]', 5.95, "#22D3EE", 0.2);
          tl.set("#g1_turn", { textContent: "turn: 2", color: "#22D3EE" }, L(5.95));
          tl.set("#g1_p3", { autoAlpha: 0 }, 0); drop(tl, "#g1_p3", 5.93, 190, 0.46);
          tl.set("#g1_p3", { autoAlpha: 1 }, L(5.78));
          energizeFill(tl, '#g1_m3 .sq[data-i="28"]', 6.39, "#22D3EE", 0.2);
          tl.set("#g1_turn", { textContent: "turn: 3 · BEGIN", color: "#4ADE80" }, L(6.4));
          shake(tl, "#g1_m3", 6.0, 6, 0.4);
          ${beats(5.49, 6.3).map((b) => `tl.to("#g0_fill", { opacity: 1, duration: 0.06, yoyo: true, repeat: 1 }, ${b.toFixed(3)});`).join("\n          ")}

          /* 6.38 "OBJECT CREATION": the two braces CLOSE on each other, then the
             body of the object is TYPED between them. */
          gsap.set("#g1_obj", { autoAlpha: 0 });
          gsap.set("#g1_lb, #g1_rb", { autoAlpha: 0 });
          tl.set("#g1_obj", { autoAlpha: 1 }, L(6.4));
          tl.set("#g1_lb, #g1_rb", { autoAlpha: 1, scale: 1 }, L(6.4));
          clamp(tl, "#g1_lb", "#g1_rb", 6.5, 190, 0.38);
          tl.to("#g1_lb, #g1_rb", { color: "#9F7BFF", duration: 0.3, ease: "none" }, L(6.9));
          typeIn(tl, "#g1_ol1", 6.94, 0.3);
          typeIn(tl, "#g1_ol2", 7.08, 0.28);
          tl.fromTo("#g1_c4, #g1_objchip", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, stagger: 0.1 }, 6.55);
          tl.set("#g1_objchip", { textContent: "obj: World#1", color: "#9F7BFF" }, L(7.24));
          tl.to("#g1", { autoAlpha: 0, duration: 0.2, ease: "power1.in" }, 7.25);

          /* =============================================================
             g2 — "Fill in my data parameters": three sliders driven to
             value, the KV cache written cell by cell, then the
             INITIALIZATION seal dropped on top of the console.
             ============================================================= */
          tl.fromTo("#g2_m0", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 7.5);
          [1, 2, 3].forEach(function (i) {
            const t = 7.5 + (i - 1) * 0.28;
            fillX(tl, "#g2_p" + i + "_f", t, 2.0, 100, [28, 22, 30][i - 1]);
            insert(tl, "#g2_p" + i + "_k", t, ${JSON.stringify(KNOB_DX)}[i - 1], 0, 2.0);
            tl.fromTo("#g2_p" + i + "_c", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, t + 0.05);
          });
          count(tl, "#g2_p1_c", 0, 0.72, 7.5, 2.0, function (v) { return "lr " + v.toFixed(2); });
          count(tl, "#g2_p2_c", 0, 96.4, 7.78, 2.0, function (v) { return "wd " + v.toFixed(1); });
          count(tl, "#g2_p3_c", 0, 0.7, 8.06, 2.0, function (v) { return "temp " + v.toFixed(2); });

          drawOn(tl, "#g2_m2", 7.55, 0.7, 0.05);
          cellsOn(tl, "#g2_m2", ".kvc", 7.9, 0.042, 0.85);
          sweep(tl, "#g2_scan", 7.7, 1.15, 340);
          tl.fromTo("#g2_c1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 7.9);

          drawOn(tl, "#g2_m3", 7.9, 0.6, 0.05);
          cellsOn(tl, "#g2_m3", ".tkc", 8.2, 0.1, 0.8);
          drawOn(tl, "#g2_m4", 8.5, 0.7, 0.05);
          pulse(tl, "#g2_m4 .lgb", 9.1, 0.88, 1.16);
          tl.fromTo("#g2_c2, #g2_c3", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.15 }, 8.2);

          /* 10.09 "INITIALIZATION": the seal is DROPPED from above, lands with real
             weight, shakes the console and blows a ring off the impact. It stays. */
          stamp(tl, "#g2_seal", 10.14, 300, -16);
          shake(tl, "#g2_m2, #g2_m3, #g2_m4", 10.44, 9, 0.5);
          jerk(tl, 10.44, 12);
          pop(tl, "#g2_pop", 10.44, 1.8, 0.8);
          tl.fromTo("#g2_ok", { autoAlpha: 0, scale: 1.6 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 10.5);
          tl.to("#g2", { autoAlpha: 0, duration: 0.2, ease: "power1.in" }, 10.98);

          /* =============================================================
             g3 — "Set up our new world / let's begin the SIMULATION":
             the pedestal rises, the world is blown up over it and starts
             turning, the run key is pressed, the iris opens on agents that
             are already moving.
             ============================================================= */
          drawOn(tl, "#g3_ped", 11.1, 0.7, 0.06);
          insert(tl, "#g3_ped .plat", 11.35, 0, 74, 0.5);
          drawOn(tl, "#g3_m1", 11.45, 1.3, 0.06); bloomIn(tl, "#g3_m1", 12.4, 0.7);
          /* inflated out of a single point, then it never stops turning */
          settle(tl, "#g3_m1", 11.6, 0.12, 0.7);
          pop(tl, "#g3_pop1", 11.6, 1.5, 0.7);
          orbit(tl, "#g3_m1", 12.7, 13, 1);
          orbit(tl, "#g3_sat", 11.9, 3.4, 1);
          tl.fromTo("#g3_c2, #g3_sim", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.12 }, 11.3);

          /* the agents hide behind the closed iris — nothing to reveal until it opens */
          drawOn(tl, "#g3_m2", 12.1, 0.9, 0.05);
          drawOn(tl, "#g3_iris", 12.25, 0.8, 0.05);
          gsap.set("#g3_iris .blade", { x: 0, y: 0 });
          tl.fromTo("#g3_c3", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 12.4);

          /* 12.91 "And let's begin the": the key is physically pressed. */
          drawOn(tl, "#g3_btn", 12.55, 0.7, 0.05); bloomIn(tl, "#g3_btn", 12.95, 0.4);
          press(tl, "#g3_btn .btn", 12.98, "100 100", 0.8);
          pop(tl, "#g3_pop2", 13.08, 1.7, 0.7);
          energize(tl, "#g3_btn .halo", 13.05, "#FF2E88", 0.3);
          tl.fromTo("#g3_c1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 12.65);

          /* 13.89 "SIMULATION": the aperture blades FLY APART and the agents inside
             are revealed already alive. The simulation is not announced, it is opened. */
          aperture(tl, "#g3_iris .blade", 13.92, 78, 0.55);
          /* the blades retract to the rim and the ring gives up its place: a real
             aperture does not leave debris on the stage */
          tl.to("#g3_iris", { autoAlpha: 0, scale: 1.16, duration: 0.55, ease: "power1.in" }, L(14.25));
          tl.fromTo("#g3_m2 .ag", { scale: 0.25 }, { scale: 1, duration: 0.35, ease: "back.out(2.6)", stagger: 0.07 }, L(14.1));
          drift(tl, "#g3_m2 .ag:nth-of-type(1)", 14.6, 34, -22, 1.9);
          drift(tl, "#g3_m2 .ag:nth-of-type(3)", 14.8, -28, 26, 2.4);
          drift(tl, "#g3_m2 .ag:nth-of-type(5)", 15.0, 22, 30, 1.6);
          tl.set("#g3_sim", { textContent: "sim: RUNNING", color: "#4ADE80" }, L(14.4));
          spectrum(tl, "#g3_spec", 26, 0.4412, 140);
          beatKick(tl, "#g3_m1", [13.89, 14.443, 15.348], 1.05);
          ${beats(13.89, 15.9).map((b) => `beatKick(tl, "#g3_m2 .ag", [${b.toFixed(3)}], 1.14);`).join("\n          ")}

          whiteout(tl, 16.0, 16.75);
          tl.set("#g3_m1, #g3_sat, #g3_ped, #g3_m2, #g3_iris, #g3_btn, #g3_spec", { autoAlpha: 0 }, L(16.0));
          capsPunch(tl, "#g3_title", 16.4, "#F5F7FF");

          chrome(tl, [
            [0.1, "ctx 0/32,768 · tok/s 0.0 · t=0.70", "▶ mains OFF"],
            [0.72, "ctx 0/32,768 · tok/s 0.0 · t=0.70", "▶ mains ON · 240V"],
            [3.87, "ctx 12/32,768 · tok/s 6.2 · t=0.70", "▶ loading weights"],
            [6.38, "ctx 64/32,768 · tok/s 12.4 · t=0.70", "▶ object created"],
            [7.45, "ctx 96/32,768 · tok/s 24.8 · t=0.70", "▶ filling parameters"],
            [10.14, "ctx 1,024/32,768 · tok/s 40.1 · t=0.70", "▶ init ok"],
            [11.1, "ctx 1,024/32,768 · tok/s 40.1 · t=0.70", "▶ spawning world"],
            [13.92, "ctx 2,310/32,768 · tok/s 58.4 · t=0.70", "▶ simulating"],
          ]);
  `,
};
