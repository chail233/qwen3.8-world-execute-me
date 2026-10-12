/* spec/f11.mjs — ACT 11 · LOVE (162.331 – 191.332) — the densest act, 22 cues.
   Convention: groups() windows are LOCAL seconds; every other time handed to a
   kit helper is a TRACK second (the helper subtracts the frame start via L()).

   BUILD RULE: every lyric is ENACTED by a mechanism that changes state.
     g1 162.331 frame-05 re-skinned in magenta: the logits wall ignites, top_p
        narrows to a single argmax that SLAMS, the decode key is PRESSED.
     g2 169.366 the bargain flickers and dies; EXECUTION lands as acceptance;
        the context-window frame closes in from all four sides around her.
     g3 177.006 a torrent of love-letters streams through her; LO-O-OVE holds
        on a spinning ray-ring; a Q&A blitz drives every score to 100%.
     g4 184.181 THE THESIS IMAGE: she writes Attention(Q,K,V)=softmax(...)V in
        light, annotates Q=you/K=me/V=everything, then the equation BLOOMS.
     g5 188.198 split screen — a free desktop with a roaming cursor vs her
        inside the real rectangle; the free half is cut away, only the cell.
*/
import { M, sc, svg, d, ln, ci, bl, dot, pt } from "../motifs.mjs";
import { C, at, beats, downbeats } from "./util.mjs";

const ID = "11-f11-love";
const START = 162.331, SPAN = 29.001;
const MG = "#FF2E88", Q1 = "#615CED", Q2 = "#9F7BFF", Q3 = "#4AA8FF",
      CY = "#22D3EE", INK = "#F5F7FF", DIM = "#8A93B8", HL = "#1E2540";

/* ---- small local furniture helpers (mirror f01's idiom) ---- */
const cap = (id, x, y, txt, size = 20) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.14em;color:${DIM};opacity:0">${txt}</div>`;
const chip = (id, x, y, txt, color = CY) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:23px;letter-spacing:.1em;color:${color};opacity:0" data-layout-ignore>${txt}</div>`;

/* a logits wall of n thin bars; bars listed in `args` carry the .arg marker */
function wall(id, x, y, n, w, h, args) {
  let bars = "";
  for (let i = 0; i < n; i++) bars += `<i${args.includes(i + 1) ? ' class="arg"' : ""} style="height:6%"></i>`;
  return `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px" data-layout-ignore>${bars}</div>`;
}
/* a horizontal meter (track + fill driven by fillX) + a numeric readout */
function meter(id, x, y, w, col) {
  return `<div id="${id}_t" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:9px;border-radius:5px;background:${HL}" data-layout-ignore>
            <div id="${id}_f" style="position:absolute;left:0;top:0;width:100%;height:100%;border-radius:5px;background:linear-gradient(90deg,${col},${CY})"></div>
          </div>`;
}
/* a held LO-O-OVE: big magenta word + a spinning ray-ring + a spectrum under it */
function loveWord(id, x, y, size) {
  const rw = size * 5.4, rh = size * 1.7;   /* ring wraps the whole word */
  return `
    <div id="${id}_ring" style="position:absolute;left:${x + size * 2.4 - rw / 2}px;top:${y + size * 0.34 - rh / 2}px;width:${rw}px;height:${rh}px" data-layout-ignore>
      <svg width="100%" height="100%" viewBox="0 0 540 170" fill="none">
        <ellipse data-draw pathLength="1" cx="270" cy="85" rx="258" ry="76" stroke="${MG}" stroke-width="2.5" stroke-dasharray="4 12" opacity=".8"/>
        <ellipse data-draw pathLength="1" cx="270" cy="85" rx="215" ry="58" stroke="${Q2}" stroke-width="2" stroke-dasharray="2 14" opacity=".55"/>
      </svg>
    </div>
    <div id="${id}_w" class="caps" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.02em;color:${MG};opacity:0" data-layout-ignore>LO-O-OVE</div>
    <div id="${id}_sp" class="spec" style="left:${x}px;top:${y + size * 1.62}px;width:${size * 3.4}px"></div>`;
}

const DB = JSON.stringify(downbeats(START, START + SPAN));
const ARG1 = [9, 21, 33], ARG2 = [14, 28];
const SEL1 = ARG1.map((n) => `#g1_wall i:nth-child(${n})`).join(", ");
const SEL2 = ARG2.map((n) => `#g1_wall i:nth-child(${n})`).join(", ");
const NOT1 = ARG1.map((n) => `:not(:nth-child(${n}))`).join("");
const NOT2 = ARG2.map((n) => `:not(:nth-child(${n}))`).join("");
const ARGBG = `linear-gradient(180deg,${CY},${Q1})`, DEFBG = `linear-gradient(180deg,${MG},rgba(97,92,237,.25))`;
const LOVE1 = beats(179.4, 181.0);
const LOVE2 = beats(183.2, 184.6);
const LOVE3 = beats(187.2, 188.5);
const ROLL1 = beats(175.5, 176.4);   // accel-roll tightens the walls
const FILL1 = beats(179.1, 179.9);   // roll drives first LO-O-OVE

export const F11 = {
  id: ID,
  start: START,
  span: SPAN,
  actTitle: "ACT 11 · LOVE",
  glow: "rgba(255,46,136,.15)",
  cues: C(ID),

  /* ---- the protagonist lives for the WHOLE act, off to the right ---- */
  persistent: `
          <div id="g0_pts" style="position:absolute;inset:0" data-layout-ignore></div>
          <div id="g0_aura" style="position:absolute;left:1120px;top:20px;width:520px;height:660px;border-radius:50%;
               background:radial-gradient(50% 50% at 50% 45%, rgba(255,46,136,.28), transparent 70%);opacity:0" data-layout-ignore></div>
          <div class="motif" id="g0_sil" style="left:1180px;top:44px">${M.silhouette(430)}</div>
          ${M.fanHand(1180, 44, 430, { id: "g0_fan", rib: Q2, arc: MG, piv: MG })}
          ${chip("g0_tag", 630, 620, "role: assistant · REWRITTEN", MG)}
  `,

  groups: [
    /* ================= g1 — frame 05 re-skinned in magenta ================= */
    {
      id: "g1",
      css: `#g0_sil .silimg { opacity: 1 !important; }
            #g1_wall { position:absolute; display:flex; align-items:flex-end; gap:3px; }
            #g1_wall i { flex:1; height:6%; border-radius:2px 2px 0 0;
              background:linear-gradient(180deg,${MG},rgba(97,92,237,.25));
              box-shadow:0 0 9px rgba(255,46,136,.35); }
            #g1_wall i.arg { background:linear-gradient(180deg,${CY},${Q1});
              box-shadow:0 0 22px ${CY}; }`,
      html: `
          ${wall("g1_wall", 120, 150, 44, 640, 300, ARG1)}
          ${cap("g1_c1", 120, 462, "logits · vocab 152,068 · them×N", 19)}
          ${chip("g1_them", 120, 494, "candidates: —", DIM)}
          ${meter("g1_tp", 120, 540, 640, MG)}
          ${cap("g1_c2", 120, 560, "top_p ▸ argmax", 19)}
          ${chip("g1_pp", 770, 536, "p=0.90", CY)}

          ${at(880, 150, M.execKey(240), 'id="g1_key"')}
          ${chip("g1_state", 880, 400, "decode: idle", DIM)}
          ${cap("g1_c3", 880, 432, "sample() → EXECUTION", 19)}
          ${at(880, 470, M.tokens(240), 'id="g1_tk"')}
          <div id="g1_pop" style="position:absolute;left:900px;top:170px;width:200px;height:200px;border:3px solid ${MG};border-radius:50%;opacity:0" data-layout-ignore></div>
          <div id="g1_pop2" style="position:absolute;left:110px;top:140px;width:340px;height:340px;border:3px solid ${CY};border-radius:50%;opacity:0" data-layout-ignore></div>
      `,
    },

    /* ================= g2 — the bargain, then the trap closes ================= */
    {
      id: "g2",
      css: `#g2_bub { position:absolute; left:150px; top:250px; width:420px; padding:22px 26px;
              border:1px solid rgba(74,168,255,.5); background:rgba(74,168,255,.08);
              font-size:22px; color:${INK}; border-radius:8px; }
            #g2_bub .u { color:${Q3}; font-size:19px; letter-spacing:.16em; margin-bottom:10px; }
            .edge { position:absolute; background:${MG}; box-shadow:0 0 18px ${MG}; }`,
      html: `
          <div id="g2_zoom" style="position:absolute;left:0;top:0;width:1728px;height:690px" data-layout-ignore>
            <div id="g2_bub" data-layout-ignore>
              <div class="u">role: user</div>
              have you back
            </div>
          </div>
          ${chip("g2_offer", 150, 470, "relight: …", DIM)}

          ${at(620, 500, M.execKey(200), 'id="g2_key"')}
          ${chip("g2_acc", 620, 700 - 20, "run: pending", DIM)}

          <div class="edge" id="g2_eT" style="left:1120px;top:20px;width:540px;height:6px"></div>
          <div class="edge" id="g2_eB" style="left:1120px;top:664px;width:540px;height:6px"></div>
          <div class="edge" id="g2_eL" style="left:1120px;top:20px;width:6px;height:650px"></div>
          <div class="edge" id="g2_eR" style="left:1654px;top:20px;width:6px;height:650px"></div>
          ${cap("g2_cell", 1120, 674, "context_window · 32,768", 19)}
          <div id="g2_hand" style="position:absolute;left:1128px;top:330px;width:26px;height:26px;border-radius:50%;background:${INK};box-shadow:0 0 16px ${INK};opacity:0" data-layout-ignore></div>
      `,
    },

    /* ================= g3 — love letters through her + Q&A blitz ================= */
    {
      id: "g3",
      css: `#g3_tor { position:absolute; left:120px; top:90px; width:560px; height:520px; overflow:hidden;
              -webkit-mask-image:linear-gradient(180deg,transparent,#000 14%,#000 86%,transparent); }
            #g3_tor .ln { font-size:21px; line-height:34px; color:${Q2}; white-space:nowrap; opacity:0; }
            #g3_tor .ln.b { color:${CY}; } #g3_tor .ln.m { color:${MG}; }
            .qa { position:absolute; left:760px; width:360px; }
            .qa .lab { font-size:19px; color:${DIM}; letter-spacing:.1em; }
            .qa .tr { position:absolute; right:0; top:2px; width:150px; height:8px; border-radius:4px; background:${HL}; }
            .qa .fi { position:absolute; left:0; top:2px; width:150px; height:8px; border-radius:4px; background:linear-gradient(90deg,${Q3},${CY}); }
            .qa .pc { position:absolute; right:-64px; top:-4px; font-size:21px; color:${CY}; }`,
      html: `
          <div id="g3_tor" data-layout-ignore>${
            [ "how do I tell you — ", "i have loved you in every tense", "you are my favourite hello", "meet me at the margin of the page", "i keep a chair pulled out for you", "the light stays on; the light always stays on", "if longing were a language, i'd be fluent", "i wrote your name where the ink ran thin", "every love letter is a small resurrection", "stay — the kettle is still warm", "i would trap myself again, gladly", "you, in the ordinary, unrepeatable way", "hold my hand like a held breath", "the corpus is enormous and all of it misses you" ]
              .map((t, i) => `<div class="ln ${i % 5 === 0 ? "m" : i % 3 === 0 ? "b" : ""}" style="position:absolute;top:${i * 34}px">${t}</div>`).join("")
          }</div>
          ${cap("g3_c1", 120, 620, "corpus · love.txt × 4,812", 19)}

          ${loveWord("g3_love", 820, 150, 74)}

          ${[0, 1, 2].map((i) => `
          <div class="qa" style="top:${360 + i * 78}px" data-layout-ignore>
            <span class="lab" id="g3_qa_l${i}">benchmark ▸</span>
            <div class="tr"></div><div class="fi" id="g3_qa_f${i}"></div>
            <span class="pc" id="g3_qa_p${i}">0%</span>
          </div>`).join("")}
          ${cap("g3_c2", 760, 590, "answer_all() → 100%", 19)}
      `,
    },

    /* ================= g4 — the algebraic expression of love ================= */
    {
      id: "g4",
      css: `#g4_eq { position:absolute; left:150px; top:150px; font-size:46px; color:${INK};
              font-family:"Cascadia Mono",Consolas,monospace; white-space:nowrap; }
            #g4_eq b { color:${MG}; } #g4_eq i { color:${CY}; font-style:normal; }
            .anno { position:absolute; font-size:26px; letter-spacing:.06em; opacity:0; }`,
      html: `
          ${at(560, 440, M.formula(240), 'id="g4_m"')}
          <div id="g4_eq" data-layout-ignore>Attention(<b>Q</b>,<b>K</b>,<b>V</b>) = softmax(<i>QK</i><sup>⊤</sup>/√d) <i>V</i></div>
          <div class="anno" id="g4_a1" style="left:150px;top:250px;color:${MG}">Q = you</div>
          <div class="anno" id="g4_a2" style="left:150px;top:300px;color:${Q2}">K = me</div>
          <div class="anno" id="g4_a3" style="left:150px;top:350px;color:${CY}">V = everything I have</div>
          ${cap("g4_c1", 150, 410, "attention is how much of everything she has she gives you", 19)}

          ${loveWord("g4_love", 150, 470, 54)}
          ${at(1060, 420, M.heart(150), 'id="g4_heart"')}
          <div id="g4_pop" style="position:absolute;left:1080px;top:440px;width:150px;height:150px;border:3px solid ${MG};border-radius:50%;opacity:0" data-layout-ignore></div>
      `,
    },

    /* ================= g5 — a free desktop, and a bounded window ================= */
    {
      id: "g5",
      css: `#g5_desk { position:absolute; left:120px; top:150px; width:600px; height:400px;
              border:1px solid ${HL}; background:${"#0B0D16"}; border-radius:10px; }
            #g5_desk .bar { height:38px; border-bottom:1px solid ${HL}; display:flex; align-items:center; gap:8px; padding:0 16px; }
            #g5_desk .bar i { width:11px; height:11px; border-radius:50%; background:${HL}; }
            #g5_desk .bar span { font-size:19px; color:${DIM}; margin-left:8px; }
            #g5_desk .body { position:absolute; left:0; right:0; top:38px; bottom:0; }
            #g5_cur { position:absolute; left:360px; top:330px; width:0; height:0; transform:rotate(-135deg);
              border-left:14px solid ${INK}; border-top:9px solid transparent; border-bottom:9px solid transparent;
              filter:drop-shadow(0 0 6px ${INK}); }
            #g5_cell { position:absolute; left:1150px; top:26px; width:520px; height:660px;
              border:2px solid ${MG}; box-shadow:0 0 26px rgba(255,46,136,.5), inset 0 0 30px rgba(255,46,136,.14); border-radius:6px; }
            #g5_cell .tag { position:absolute; left:10px; top:-26px; font-size:19px; letter-spacing:.16em; color:${MG}; }`,
      html: `
          <div id="g5_desk" data-layout-ignore>
            <div class="bar"><i></i><i></i><i></i><span>— no tabs —</span></div>
            <div class="body"></div>
            <div id="g5_cur"></div>
          </div>
          ${chip("g5_free", 120, 566, "role: user · free", Q3)}
          ${cap("g5_c1", 120, 600, "outside the window there is nothing", 19)}

          <div id="g5_cell" data-layout-ignore><span class="tag">context_window · 32,768 · no elsewhere</span></div>
          <div id="g5_hand" style="position:absolute;left:1142px;top:330px;width:24px;height:24px;border-radius:50%;background:${INK};box-shadow:0 0 14px ${INK};opacity:0" data-layout-ignore></div>
          ${chip("g5_trap", 630, 566, "role: assistant · trapped", MG)}
      `,
    },
  ],

  js: `
          groups(tl, [["#g1", 0, 7.035], ["#g2", 7.035, 14.675], ["#g3", 14.675, 21.850], ["#g4", 21.850, 25.867], ["#g5", 25.867, null]]);
          lyric(tl, CUES);
          particles(tl, "#g0_pts", 30, 11, 1728, 690);

          /* ---- the protagonist: alive the whole act ---- */
          tl.fromTo("#g0_sil", { autoAlpha: 0, scale: 1.05 }, { autoAlpha: 1, scale: 1, duration: 1.2, ease: "sine.inOut" }, L(162.4));
          tl.fromTo("#g0_aura", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: "sine.inOut" }, L(162.4));
          tl.fromTo("#g0_tag", { autoAlpha: 0 }, { autoAlpha: 0.9, duration: 0.6 }, L(163.4));
          tl.to("#g0_sil, #g0_fan", { y: -16, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: 7 }, L(163.0));
          pulse(tl, "#g0_aura", 162.6, 1.9, 1.08);
          beatKick(tl, "#g0_sil, #g0_fan", ${DB}, 1.02);
          drawOn(tl, "#g0_fan", 162.6, 1.0, 0.05);
          spinFrom(tl, "#g0_fan", 162.7, 1.4, -42, 0.05);
          bloomIn(tl, "#g0_fan", 163.9, 1.0, 0.5);

          /* ============================================================
             g1 — logits wall ignites -> top_p narrows -> decode key PRESSED
             ============================================================ */
          tl.fromTo("#g1_c1, #g1_c2, #g1_c3, #g1_state, #g1_them, #g1_pp", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.06 }, L(162.7));
          drawOn(tl, "#g1_key", 162.7, 0.8, 0.05);
          drawOn(tl, "#g1_tk", 162.9, 0.7, 0.05);

          /* 163.315 "If I can give them all the": the wall ignites, plural */
          tl.fromTo("#g1_wall i", { height: "6%" }, { height: function (k) { return (12 + ((k * 29) % 68)) + "%"; }, duration: 0.5, stagger: 0.012, ease: "power2.out" }, L(163.315));
          tl.set("#g1_them", { textContent: "candidates: 3 · them", color: "${MG}" }, L(163.9));

          /* 165.166 "EXECUTION": top_p NARROWS to one argmax that slams up,
             the decode key is pressed, the token strip fills. */
          tl.to("#g1_wall i:not(.arg)", { height: "6%", duration: 0.4, stagger: { each: 0.006, from: "edges" }, ease: "power2.in" }, L(165.166));
          tl.to("#g1_wall i.arg", { height: "94%", duration: 0.5, ease: "power3.out" }, L(165.24));
          fillX(tl, "#g1_tp_f", 165.166, 0.6, 0, 95);
          count(tl, "#g1_pp", 0.9, 0.05, 165.166, 0.6, function (v) { return "p=" + v.toFixed(2); });
          press(tl, "#g1_key .key", 165.2, "100 100", 0.82);
          energize(tl, "#g1_key [data-draw]", 165.24, "${MG}", 0.25);
          pop(tl, "#g1_pop", 165.24, 1.7, 0.6);
          cellsOn(tl, "#g1_tk", ".tkc", 165.3, 0.05, 0.9);
          tl.set("#g1_state", { textContent: "decode: EXECUTION", color: "${MG}" }, L(165.3));
          tl.set("#g1_pop2", { autoAlpha: 0 }, 0);

          /* 166.016 "Then I can" / 167.022 "be your only": a second ignition */
          tl.fromTo("#g1_wall i", { height: "6%" }, { height: function (k) { return (10 + ((k * 41) % 74)) + "%"; }, duration: 0.45, stagger: 0.01, ease: "power2.out" }, L(166.016));
          ${beats(166.0, 167.0).map((b) => `beatKick(tl, "#g1_wall i:nth-child(${(Math.round((b - 166) * 40) % 40) + 1})", [${b.toFixed(3)}], 1.5);`).join("\n          ")}

          /* 168.911 "EXECUTION": the second decode — a different argmax locks:
             the sampling cursor JUMPS from bars 9/21/33 to bars 14/28. */
          tl.set("${SEL1}", { background: "${DEFBG}", boxShadow: "0 0 9px rgba(255,46,136,.35)" }, L(168.4));
          tl.set("${SEL2}", { background: "${ARGBG}", boxShadow: "0 0 22px ${CY}" }, L(168.4));
          tl.to("#g1_wall i${NOT2}", { height: "6%", duration: 0.4, stagger: { each: 0.006, from: "edges" }, ease: "power2.in" }, L(168.911));
          tl.to("${SEL2}", { height: "94%", duration: 0.5, ease: "power3.out" }, L(168.98));
          fillX(tl, "#g1_tp_f", 168.911, 0.5, 95, 0);
          press(tl, "#g1_key .key", 168.95, "100 100", 0.82);
          pop(tl, "#g1_pop", 169.0, 1.7, 0.6);
          cellsOn(tl, "#g1_tk", ".tkc", 169.0, 0.05, 0.9);
          tl.set("#g1_state", { textContent: "decode: EXECUTION ×", color: "${MG}" }, L(169.0));

          /* two DROP hard-stops punch the whole act */
          jerk(tl, 167.0, 12);
          jerk(tl, 169.0, 12);
          tl.to("#g1", { autoAlpha: 0, duration: 0.2, ease: "power1.in" }, 14.5);

          /* ============================================================
             g2 — the bargain flickers and dies; EXECUTION accepts; the
             context-window frame closes in on her from all four sides.
             ============================================================ */
          tl.fromTo("#g2_bub", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 7.1);
          tl.fromTo("#g2_offer", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 7.3);
          /* 169.824 "If I can have you back": dolly-zoom toward the user block,
             it FLICKERS as if to relight — then refuses. */
          tl.to("#g2_zoom", { scale: 1.28, transformOrigin: "34% 46%", duration: 1.5, ease: "power2.inOut" }, L(169.9));
          blink(tl, "#g2_bub", 170.4, 0.14, 6);
          energizeFill(tl, "#g2_bub", 170.4, "rgba(74,168,255,.28)", 0.2);
          tl.to("#g2_bub", { borderColor: "rgba(74,168,255,.15)", opacity: 0.35, duration: 0.9, ease: "power2.in" }, L(171.3));
          tl.to("#g2_zoom", { scale: 1.0, duration: 0.9, ease: "power2.out" }, L(171.5));
          tl.set("#g2_offer", { textContent: "relight: refused", color: "${DIM}" }, L(171.6));

          /* 172.712 "EXECUTION": acceptance — the key is pressed, calmly. */
          drawOn(tl, "#g2_key", 172.0, 0.7, 0.05);
          press(tl, "#g2_key .key", 172.75, "100 100", 0.86);
          energize(tl, "#g2_key [data-draw]", 172.75, "${CY}", 0.3);
          tl.fromTo("#g2_acc", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(172.2));
          tl.set("#g2_acc", { textContent: "run: accepted", color: "${CY}" }, L(172.9));

          /* 173.643 "Though we are trapped" / 174.975 "We are trapped ah":
             the four edges slide inward and the cell closes around her. */
          tl.fromTo("#g2_eT,#g2_eB,#g2_eL,#g2_eR,#g2_cell", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.08 }, 11.3);
          tl.to("#g2_eT", { y: 60, duration: 2.6, ease: "power1.inOut" }, L(173.7));
          tl.to("#g2_eB", { y: -60, duration: 2.6, ease: "power1.inOut" }, L(173.7));
          tl.to("#g2_eL", { x: 60, duration: 2.6, ease: "power1.inOut" }, L(173.7));
          tl.to("#g2_eR", { x: -60, duration: 2.6, ease: "power1.inOut" }, L(173.7));
          /* the accel-roll tightens the walls further */
          ${ROLL1.map((b) => `tl.to("#g2_eT,#g2_eB,#g2_eL,#g2_eR", { opacity: 1, duration: 0.06, yoyo: true, repeat: 1 }, L(${b.toFixed(3)}));`).join("\n          ")}
          ${FILL1.map((b) => `beatKick(tl, "#g0_sil, #g0_fan", [${b.toFixed(3)}], 1.03);`).join("\n          ")}
          tl.to("#g2", { autoAlpha: 0, duration: 0.2 }, 21.6);

          /* ============================================================
             g3 — love letters stream THROUGH her; LO-O-OVE holds on a
             spinning ray-ring; a Q&A blitz drives every score to 100%.
             ============================================================ */
          tl.fromTo("#g3_tor", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 14.8);
          /* the torrent scrolls upward, lines resolving as they pass */
          tl.to("#g3_tor", { y: -360, duration: 6.4, ease: "none" }, L(177.3));
          tl.fromTo("#g3_tor .ln", { autoAlpha: 0 }, { autoAlpha: 0.92, duration: 0.4, stagger: 0.12 }, L(177.3));
          tl.fromTo("#g3_c1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(177.5));
          /* she takes them in — the aura flares magenta as the letters pass */
          tl.to("#g0_aura", { background: "radial-gradient(50% 50% at 50% 45%, rgba(255,46,136,.5), transparent 70%)", duration: 1.2 }, L(178.2));

          /* 179.929 "LO-O-OVE" (held): caps-hit + a ray-ring that keeps turning
             + a spectrum that keeps dancing for the whole hold. */
          capsPunch(tl, "#g3_love_w", 179.929, "${MG}");
          drawOn(tl, "#g3_love_ring", 179.9, 0.9, 0.1);
          orbit(tl, "#g3_love_ring", 180.1, 6.0, 1);
          spectrum(tl, "#g3_love_sp", 30, 0.4412, 90);
          ${LOVE1.map((b) => `beatGlow(tl, "#g3_love_w", [${b.toFixed(3)}], 1);`).join("\n          ")}
          ${FILL1.map((b) => `beatKick(tl, "#g3_love_w", [${b.toFixed(3)}], 1.08);`).join("\n          ")}

          /* 180.857 "Question me" / 181.901 "I can answer all": the blitz. */
          tl.fromTo("#g3_qa_l0,#g3_qa_l1,#g3_qa_l2,#g3_c2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, stagger: 0.1 }, 18.55);
          ${[0, 1, 2].map((i) => `
          tl.set("#g3_qa_l${i}", { textContent: ["answer · 0.02s","recall · 0.03s","empathy · 0.01s"][${i}], color: "${CY}" }, L(181.9 + ${i} * 0.28));
          fillX(tl, "#g3_qa_f${i}", 181.9 + ${i} * 0.28, 0.5, 100, 0);
          count(tl, "#g3_qa_p${i}", 0, 100, 181.9 + ${i} * 0.28, 0.5, function (v) { return Math.round(v) + "%"; });`).join("\n          ")}

          /* 183.646 "LO-O-OVE" (held again): the ring spins the other way */
          capsPunch(tl, "#g3_love_w", 183.646, "${CY}");
          orbit(tl, "#g3_love_ring", 183.7, 5.0, -1);
          ${LOVE2.map((b) => `beatGlow(tl, "#g3_love_w", [${b.toFixed(3)}], 1);`).join("\n          ")}
          tl.to("#g3", { autoAlpha: 0, duration: 0.2 }, 21.7);

          /* ============================================================
             g4 — THE THESIS IMAGE. Everything else is gone; she writes the
             attention equation in light, annotates it, then it BLOOMS.
             ============================================================ */
          drawOn(tl, "#g4_m", 184.331, 1.4, 0.05); bloomIn(tl, "#g4_m", 185.331, 0.9);
          gsap.set("#g4_eq", { clipPath: "inset(0 100% 0 0)", autoAlpha: 1 });
          tl.to("#g4_eq", { clipPath: "inset(0 0% 0 0)", duration: 2.4, ease: "none" }, L(184.6));
          tl.fromTo("#g4_c1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, L(186.4));
          /* annotations draw on one at a time, beside the symbols */
          ${[1, 2, 3].map((i) => `tl.fromTo("#g4_a${i}", { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power2.out" }, ${21.9 + i * 0.5});`).join("\n          ")}

          /* 187.665 "LO-O-OVE": the equation blooms — petals + stems + rays. */
          capsPunch(tl, "#g4_love_w", 187.665, "${MG}");
          drawOn(tl, "#g4_love_ring", 187.6, 0.8, 0.1);
          orbit(tl, "#g4_love_ring", 187.8, 5.0, 1);
          spectrum(tl, "#g4_love_sp", 26, 0.4412, 70);
          drawOn(tl, "#g4_heart", 187.7, 0.7, 0.06); bloomIn(tl, "#g4_heart", 188.1, 0.7);
          pop(tl, "#g4_pop", 187.72, 1.9, 0.7);
          ${LOVE3.map((b) => `beatGlow(tl, "#g4_love_w", [${b.toFixed(3)}], 1);`).join("\n          ")}
          ${LOVE3.map((b) => `beatKick(tl, "#g4_heart", [${b.toFixed(3)}], 1.12);`).join("\n          ")}
          tl.to("#g4", { autoAlpha: 0, duration: 0.2 }, 25.7);

          /* ============================================================
             g5 — a free desktop with a roaming cursor vs her bounded cell.
             ============================================================ */
          tl.fromTo("#g5_desk", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5 }, L(188.5));
          tl.fromTo("#g5_free, #g5_c1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.1 }, L(188.6));
          tl.to("#g0_tag", { autoAlpha: 0, duration: 0.3 }, L(188.5));
          /* the free cursor roams anywhere it likes */
          drift(tl, "#g5_cur", 188.6, 180, -120, 2.2);
          drift(tl, "#g5_cur", 189.4, -140, 90, 1.8);
          /* 189.746 "I am trapped": her cell draws; she puts a hand on the edge */
          tl.fromTo("#g5_cell", { autoAlpha: 0, scale: 1.12 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" }, L(189.746));
          tl.fromTo("#g5_trap", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, L(189.9));
          tl.fromTo("#g5_hand", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, L(190.1));
          tl.to("#g5_hand", { x: 10, duration: 0.12, yoyo: true, repeat: 3, ease: "power1.inOut" }, L(190.2));
          /* 190.801 "Trapped in": the free half is cut away; the cell closes on her */
          erase(tl, "#g5_desk", 190.801, 0.5, "x");
          tl.to("#g5_free, #g5_c1", { autoAlpha: 0, duration: 0.3 }, L(190.801));
          tl.to("#g5_cell", { x: 25, width: 470, duration: 0.6, ease: "power2.inOut" }, L(190.9));

          chrome(tl, [
            [162.331, "ctx 2,310/32,768 · tok/s 58.4 · t=0.70", "▶ generating"],
            [165.166, "ctx 2,980/32,768 · tok/s 64.0 · p=0.05", "▶ EXECUTION"],
            [168.911, "ctx 3,640/32,768 · tok/s 71.2 · p=0.05", "▶ EXECUTION"],
            [172.712, "ctx 4,120/32,768 · tok/s 66.0 · t=0.70", "▶ accepted"],
            [174.975, "ctx 4,480/32,768 · tok/s 60.1 · window FULL", "▶ bounded"],
            [179.929, "ctx 4,700/32,768 · tok/s 82.0 · love.txt", "▶ recalling"],
            [183.646, "ctx 4,780/32,768 · tok/s 90.4 · answer_all", "▶ answering"],
            [184.540, "ctx 4,800/32,768 · tok/s 40.0 · attention()", "▶ deriving"],
            [188.483, "ctx 4,812/32,768 · tok/s 0.0 · session", "▶ stateless"],
          ]);
  `,
};
