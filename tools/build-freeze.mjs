/* tools/build-freeze.mjs — emit .verify/freeze-<id>.html: the act's own markup +
   script, unwrapped from its <template>, with GSAP inlined and the timeline
   seeked to ?t=. Snapshot and Studio thumbnails freeze sub-compositions at t=0,
   so this is the only way to get real pixels at an exact second — and the only
   honest motion test: shoot t and t+0.1, then diff (tools/motion-diff.mjs).
   usage: node tools/build-freeze.mjs <frame-id> */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = join(HERE, "..");
const id = process.argv[2];
if (!id) {
  console.error("usage: node tools/build-freeze.mjs <frame-id>");
  process.exit(1);
}

const src = readFileSync(join(PROJECT, "compositions", "frames", `${id}.html`), "utf8");
const open = src.indexOf("<template>");
const close = src.lastIndexOf("</template>");
if (open < 0 || close < open) {
  console.error(`${id}: no <template> block`);
  process.exit(1);
}
/* the template's contents, promoted to the real document */
const inner = src.slice(open + "<template>".length, close)
  .replace(/src="assets\//g, 'src="../assets/');

const out = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style> html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: #06070C; } </style>
    <script src="../assets/vendor/gsap.min.js"></script>
    <script src="../assets/vendor/MotionPathPlugin.min.js"></script>
    <script>if (window.MotionPathPlugin) gsap.registerPlugin(window.MotionPathPlugin);</script>
  </head>
  <body>
${inner}
    <script>
      (function () {
        var T = parseFloat(new URLSearchParams(location.search).get("t") || "0");
        var tl = window.__timelines && window.__timelines["${id}"];
        if (!tl) { document.title = "NO TIMELINE"; return; }
        tl.pause();
        tl.seek(T);
        document.title = "frozen " + T;
      })();
    </script>
  </body>
</html>
`;

const path = join(PROJECT, ".verify", `freeze-${id}.html`);
mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, out);
console.log(path);
