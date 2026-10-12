/* spec/f02.mjs — ACT 02 · FIRST LIGHT (17.136 – 29.675, instrumental)
   No lyric here: the attention mechanism wakes and a loose token cloud finds its
   alignment, then SHE resolves out of it. There is no line to illustrate, so the
   MECHANISM is the reveal itself — and it is a state change, not a fade-in:
     g1  the weight matrix heats cell by cell, token fragments drift toward the
         attending centre (the cloud converging = attention pulling focus).
     g2  96 layer-plates rise and stack into a glowing column, that column gives
         up its shape, and her figure is rezzed up bottom-to-top out of it
         (clip wipe + plate dissolve = wireframe -> solid). Only once she is
         solid do her eyes open and her fan part — her halo is drawn on her, so
         the clip wipe that rezzes her up is what raises it into frame.
   Convention: groups() windows are LOCAL seconds; every time handed to a kit
   helper is TRACK seconds (helpers subtract the frame start). */
import { M, sc, svg, ci, ln, bl, dot, pt } from "../motifs.mjs";
import { PAL as P } from "../kit.mjs";
import { C, beats, downbeats } from "./util.mjs";

const ID = "02-f02-reveal";
const W = 1728, H = 690;

/* stage-local helpers (mirrors f01's language: a caption is never the star) */
const cap = (id, x, y, txt, size = 21) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:${size}px;letter-spacing:.14em;color:#8A93B8;opacity:0">${txt}</div>`;
const chip = (id, x, y, txt, color = P.DA) =>
  `<div id="${id}" style="position:absolute;left:${x}px;top:${y}px;font-size:22px;letter-spacing:.1em;color:${color};opacity:0" data-layout-ignore>${txt}</div>`;

/* a small floating BPE fragment of the embedding space */
const TOK = [
  ["▁love", 150, 150], ["▁world", 300, 92], ["▁execute", 236, 262], ["▁you", 430, 148],
  ["</s>", 120, 330], ["▁me", 512, 224], ["▁set", 356, 336], ["▁point", 214, 420],
  ["▁circle", 470, 372], ["▁wave", 560, 120], ["▁dim", 84, 236], ["▁unit", 596, 300],
  ["▁light", 640, 210], ["▁∞", 40, 300],
];
/* "focus: aligned" must READ as alignment: the cloud snaps into an ordered
   two-column block beside the matrix. Converging every fragment onto one point
   just stacked fourteen labels on top of each other. Slots are handed out row by
   row in start-y order, and left-to-right inside a row, so each fragment keeps
   both its band and its side while flying right — parallel paths, no label ever
   has to cross another to reach its slot. */
const BY_Y = TOK.map((t, i) => i).sort((a, b) => TOK[a][2] - TOK[b][2] || TOK[a][1] - TOK[b][1]);
const RANK = {};
for (let r = 0; r < BY_Y.length; r += 2) {
  [BY_Y[r], BY_Y[r + 1]]
    .filter((i) => i !== undefined)
    .sort((a, b) => TOK[a][1] - TOK[b][1])
    .forEach((tokIdx, col) => { RANK[tokIdx] = r + col; });
}
const TOK_TO = TOK.map((t, i) => [620 + (RANK[i] % 2) * 190, 128 + Math.floor(RANK[i] / 2) * 44]);

/* 96 transformer layer-plates as a glowing scan-column behind where she appears.
   Plain class="plate" lines: the frame js rises them (scaleY) then dissolves them. */
function layerStack(n, w, h) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const y = 26 + (i * (h - 52)) / (n - 1);
    const col = i % 3 === 0 ? P.Q1 : i % 3 === 1 ? P.Q2 : P.Q3;
    s += `<line class="plate" x1="18" y1="${y.toFixed(1)}" x2="${w - 18}" y2="${y.toFixed(1)}" stroke="${col}" stroke-width="2" opacity="0"/>`;
  }
  return svg(w, h, "gq2", s);
}

const DB = downbeats(17.136, 29.675);
const BEATS1 = beats(17.9, 22.9).slice(0, 8);
const BEATS2 = beats(23.4, 29.6).slice(0, 10);

export const F02 = {
  id: ID,
  start: 17.136,
  span: 12.539,
  actTitle: "ACT 02 · FIRST LIGHT",
  glow: "rgba(159,123,255,.17)",
  cues: C(ID),

  persistent: `
          <div id="g0_pts" style="position:absolute;inset:0" data-layout-ignore></div>
          <div id="g0_head" style="position:absolute;left:40px;top:596px;font-size:19px;letter-spacing:.3em;color:#4AA8FF;opacity:0">EMBEDDING SPACE · d_model = 4096</div>
          <div id="g0_layers" style="position:absolute;left:1490px;top:52px;font-size:22px;letter-spacing:.12em;color:#9F7BFF;opacity:0" data-layout-ignore>0/96 LAYERS</div>
  `,

  groups: [
    {
      id: "g1",
      css: `#g1_cloud { position:absolute; inset:0; }
            .tok { position:absolute; font-family:"Cascadia Mono", Consolas, monospace; font-size:24px;
              color:#8A93B8; opacity:.26; white-space:nowrap; }`,
      html: `
          <div class="motif" id="g1_at" style="left:150px;top:88px">${M.attn(430)}</div>
          <div id="g1_cloud" data-layout-ignore>
            ${TOK.map((t) => `<span class="tok" style="left:${t[1]}px;top:${t[2]}px">${t[0]}</span>`).join("\n            ")}
          </div>
          ${cap("g1_c1", 150, 532, "Attention(Q, K, V)")}
          ${chip("g1_focus", 466, 556, "focus: scattered", P.DIM)}
      `,
    },
    {
      id: "g2",
      css: `#g2_sil { overflow:hidden; }
            #g2_sil .silimg { will-change: clip-path; }`,
      html: `
          <div class="motif" id="g2_stack" style="left:920px;top:8px">${layerStack(30, 440, 660)}</div>
          <div class="motif" id="g2_sil" style="left:920px;top:8px">${M.silhouette(440)}</div>
          <div class="motif" id="g2_gaze" style="left:1093px;top:109px">
            <svg width="90" height="60" viewBox="0 0 90 60" fill="none">
              <circle class="gaze" cx="24" cy="32" r="4" fill="#22D3EE" opacity="0"/>
              <circle class="gaze" cx="72" cy="20" r="4" fill="#22D3EE" opacity="0"/>
            </svg>
          </div>
          ${M.fanHand(920, 8, 440, { id: "g2_fan", rib: P.Q2, arc: P.Q3, piv: P.DA })}
          ${cap("g2_c1", 40, 92, "transformer.stack()")}
          ${cap("g2_c2", 40, 128, "L0 … L95 → resolve", 19)}
          ${chip("g2_state", 40, 176, "render: wireframe", P.DIM)}
          <div id="g2_arcs" style="position:absolute;left:60px;top:120px">
            <svg width="820" height="360" viewBox="0 0 820 360" fill="none" stroke-linecap="round">
              <path class="live" data-draw pathLength="1" d="M10 300 C220 250 420 210 800 150" stroke="#615CED" stroke-width="2" opacity=".5"/>
              <path class="live" data-draw pathLength="1" d="M10 220 C260 210 480 190 800 190" stroke="#9F7BFF" stroke-width="2" opacity=".5"/>
              <path class="live" data-draw pathLength="1" d="M10 340 C300 300 560 250 800 240" stroke="#4AA8FF" stroke-width="2" opacity=".5"/>
            </svg>
          </div>
      `,
    },
  ],

  js: `
          groups(tl, [["#g1", 0, 5.829], ["#g2", 5.829, null]]);
          lyric(tl, CUES);
          particles(tl, "#g0_pts", 30, 7, ${W}, ${H});
          var DB = ${JSON.stringify(DB)};

          /* ============================================================
             g1 — attention wakes and the token cloud converges (phrase_flow:
             slow drift, no hard cut). Nothing is cut, everything is pulled.
             ============================================================ */
          tl.fromTo("#g0_head", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, L(17.4));
          tl.fromTo("#g1_c1, #g1_focus", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.12 }, L(17.5));
          /* the matrix heats cell by cell, and breathes on the downbeats */
          cellsOn(tl, "#g1_at", ".hcc", 17.4, 0.05, 0.9);
          ${BEATS1.map((b) => `beatGlow(tl, "#g1_at", [${b.toFixed(3)}], 0.85);`).join("\n          ")}
          tl.to("#g1_at", { scale: 1.05, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: 1, transformOrigin: "50% 50%" }, L(18.4));
          /* the fragments drift toward the attending centre — attention pulling focus */
          ${TOK.map((t, i) => `tl.to("#g1_cloud .tok:nth-child(${i + 1})", { x: ${TOK_TO[i][0] - t[1]}, y: ${TOK_TO[i][1] - t[2]}, opacity: 0.82, color: "${i % 3 === 0 ? "#9F7BFF" : i % 3 === 1 ? "#4AA8FF" : "#22D3EE"}", duration: 4.4, ease: "sine.inOut" }, L(${(17.6 + i * 0.14).toFixed(3)}));`).join("\n          ")}
          tl.set("#g1_focus", { textContent: "focus: aligned", color: "#22D3EE" }, L(22.2));
          tl.to("#g1_focus", { scale: 1.12, duration: 0.24, yoyo: true, repeat: 1 }, L(22.2));
          tl.to("#g1", { autoAlpha: 0, duration: 0.6, ease: "power1.in" }, 5.4);

          /* ============================================================
             g2 — the EMERGENCE. Layer-plates rise into a column; the column
             gives up its shape and her figure is rezzed up out of it (clip
             wipe, bottom-to-top) while plates dissolve. THEN eyes, halo, fan.
             ============================================================ */
          tl.fromTo("#g2_c1, #g2_c2, #g2_state", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.1 }, L(23.0));
          /* plates rise one by one — the 96 layers stacking upward */
          tl.to("#g0_layers", { autoAlpha: 1, duration: 0.3 }, L(22.965));
          count(tl, "#g0_layers", 0, 96, 22.965, 3.4, function (v) { return Math.round(v) + "/96 LAYERS"; });
          /* plates light one by one — the 96 layers stacking upward. No transform here:
             a scaleY on a horizontal SVG line cannot do anything (its bbox has no height),
             it only bakes a translate into the element. */
          tl.fromTo("#g2_stack .plate", { opacity: 0 }, { opacity: 0.7, duration: 0.34, ease: "power2.out", stagger: 0.06 }, L(23.05));
          tl.to("#g2_stack .plate", { opacity: 0.9, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 3 }, L(24.6));
          drawOn(tl, "#g2_arcs", 23.1, 1.5, 0.12);

          /* the dissolve: wireframe column lets go, the solid figure rezzes up
             from the floor of its frame — a state change, not a fade-in. */
          tl.to("#g2_stack .plate", { opacity: 0, duration: 1.4, ease: "power2.in", stagger: 0.02 }, L(24.75));
          tl.set("#g2_sil .silimg", { opacity: 1 }, L(24.8));
          fillY(tl, "#g2_sil", 24.9, 2.4, 100, 0);
          tl.set("#g2_state", { textContent: "render: SOLID", color: "#4ADE80" }, L(26.9));
          tl.to("#g2_state", { scale: 1.12, duration: 0.24, yoyo: true, repeat: 1 }, L(26.9));

          /* she comes alive only once she is solid: the clip wipe has already raised
             her own halo into frame, so the eyes light and the fan in her hand parts. */
          tl.fromTo("#g2_gaze .gaze", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.6)", stagger: 0.08 }, L(27.0));
          pulse(tl, "#g2_gaze .gaze", 27.6, 1.4, 1.18);
          drawOn(tl, "#g2_fan", 27.4, 0.9, 0.05);
          spinFrom(tl, "#g2_fan", 27.5, 1.3, -42, 0.06);
          bloomIn(tl, "#g2_fan", 28.2, 0.7, 0.5);

          /* beat-synced life to the end: she never sits still. The fan skeleton is
             registered on the fan in her hand, so every move that touches her body
             has to touch it too or the registration breaks. */
          beatKick(tl, "#g2_sil, #g2_fan, #g2_gaze", DB, 1.02);
          ${BEATS2.map((b) => `beatKick(tl, "#g2_gaze .gaze", [${b.toFixed(3)}], 1.25);`).join("\n          ")}
          tl.to("#g2_sil, #g2_fan, #g2_gaze", { y: -16, duration: 3.0, ease: "sine.inOut", yoyo: true, repeat: 1 }, L(26.0));

          chrome(tl, [
            [17.136, "ctx 214/32,768 · tok/s 40.1 · t=0.70", "▶ attending"],
            [20.689, "ctx 288/32,768 · tok/s 40.1 · t=0.70", "▶ resolving weights"],
            [23.0, "ctx 368/32,768 · tok/s 38.6 · t=0.70", "▶ stacking L0–L95"],
            [24.9, "ctx 448/32,768 · tok/s 38.6 · t=0.70", "▶ rendering"],
            [27.5, "ctx 512/32,768 · tok/s 41.2 · t=0.70", "▶ Qwen3.8 online"],
          ]);
  `,
};
