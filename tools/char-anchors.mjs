// char-anchors.mjs — where to put things ON TOP of the Qwen3.8 sprite.
//
// The shipped sprite is a keyed cut-out of the official 立绘
// (refs/qwen-girl-official.jpg -> tools/key-portrait.py -> assets/character/
// qwen38-official.png). It is drawn on a 2:3 canvas (w=s, h=1.5s) because
// M.silhouette(s) emits exactly that box, so every per-act placement that was
// tuned to the old sprite has to be re-derived from these fractions.
//
// Measured off snapshots/grid5.png (5% grid), snapshots/face-grid.png (2% grid
// over the head) and snapshots/fanfit2.png (the fan sector fitted to her leaf).
// fx/fy are fractions of the CANVAS (0..1 of width, 0..1 of height).
export const LANDMARKS = {
  hatTop: [0.500, 0.022], // white pom / beret crown
  badge: [0.376, 0.098], // Qwen emblem on the beret
  headTop: [0.500, 0.084], // hairline
  head: [0.500, 0.165], // face centre (hair spans 0.332..0.667 of W)
  eyeL: [0.447, 0.201],
  eyeR: [0.557, 0.182],
  chin: [0.500, 0.245],
  fanGrip: [0.345, 0.375], // her right hand, where the fan ribs converge
  fanLeaf: [0.370, 0.300], // centre of the open fan she actually holds
  chest: [0.500, 0.300], // the blue pendant
  waist: [0.500, 0.450], // the sash bow
  bagHand: [0.720, 0.520],
  hem: [0.500, 0.820], // dress hem
  feet: [0.500, 0.975],
};
// Horizontal extents of her art inside the canvas — anything that must clear
// her body uses these.
export const EXTENT = { left: 0.13, right: 0.88, top: 0.01, bottom: 0.99 };
/* M.fanHand() registers a vector skeleton on the fan she is drawn holding:
   pivot LANDMARKS.fanGrip, outer radius 0.1956W, inner 0.0518W, -42..+62 deg.
   The collapsed ("closed") pose is every rib at a0 = -42; spinFrom()/spinTo()
   in kit.mjs tween rotation between that and each rib's own data-ang. */
export const HAND_FAN = { pivot: LANDMARKS.fanGrip, ro: 0.1956, ri: 0.0518, a0: -42, a1: 62 };

// Per-act sprite boxes, stage coordinates: [left, top, s].
export const SPRITE = {
  f02: [920, 8, 440], f03: [1392, 150, 320], f04: [1308, 96, 360],
  f05: [1215, 46, 430], f06: [1215, 46, 430], f07: [83, 20, 380],
  f08: [1404, 110, 320], f09: [1300, 120, 300], f10: [1300, 110, 300],
  f11: [1180, 44, 430], f12: [1180, 44, 430],
};

const main = () => {
  const pad = (n) => String(n).padStart(3);
  console.log("act  box(stage)             " + Object.keys(LANDMARKS).map((k) => k.padStart(9)).join(""));
  for (const [id, [x, y, s]] of Object.entries(SPRITE)) {
    const cells = Object.keys(LANDMARKS).map((k) => {
      const [fx, fy] = LANDMARKS[k];
      return `${pad(Math.round(x + fx * s))},${pad(Math.round(y + fy * 1.5 * s))}`.padStart(9);
    });
    console.log(`${id}  [${pad(x)},${pad(y)} s=${s}]`.padEnd(26) + cells.join(""));
  }
  console.log("\nclearances (stage): cape left / right, and the fan box that puts its pivot on her grip");
  for (const [id, [x, y, s]] of Object.entries(SPRITE)) {
    const [gx, gy] = [x + LANDMARKS.fanGrip[0] * s, y + LANDMARKS.fanGrip[1] * 1.5 * s];
    console.log(`${id}  cape ${Math.round(x + EXTENT.left * s)}..${Math.round(x + EXTENT.right * s)}  grip ${Math.round(gx)},${Math.round(gy)}`);
  }
};
if (process.argv[1] && process.argv[1].endsWith("char-anchors.mjs")) main();
