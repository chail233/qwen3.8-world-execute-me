#!/usr/bin/env node
/* build-motif-sheet.mjs — writes .dev/motif-sheet.html: every motif in its
   fully-drawn state on the film's canvas, in a labelled grid. Static page (no
   runtime, no iframe) so headless Edge can screenshot it — this is how the
   line-art itself gets reviewed before it goes into an act. */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { MOTIFS } from "./motifs.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const names = Object.keys(MOTIFS);
const CELL = 260;
const cols = 8;
const rows = Math.ceil(names.length / cols);

let cells = "";
names.forEach((n) => {
  cells += `<div class="cell"><div class="box">${MOTIFS[n](200)}</div><div class="lb">${n}</div></div>\n`;
});

const html = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body { margin: 0; background: #06070C; font-family: Consolas, monospace; }
      #grid { display: grid; grid-template-columns: repeat(${cols}, ${CELL}px); }
      .cell { width: ${CELL}px; height: ${CELL + 26}px; position: relative; border: 1px solid #12162A; }
      .box { position: absolute; left: 30px; top: 20px; }
      .box svg { overflow: visible; }
      [data-draw] { fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
      [data-bloom] { opacity: .8; }
      .gq1 { filter: drop-shadow(0 0 7px rgba(97,92,237,.75)); }
      .gq2 { filter: drop-shadow(0 0 8px rgba(159,123,255,.7)); }
      .gq3 { filter: drop-shadow(0 0 7px rgba(74,168,255,.7)); }
      .gda { filter: drop-shadow(0 0 7px rgba(34,211,238,.65)); }
      .gmg { filter: drop-shadow(0 0 9px rgba(255,46,136,.7)); }
      .gam { filter: drop-shadow(0 0 8px rgba(255,180,84,.65)); }
      .gok { filter: drop-shadow(0 0 7px rgba(74,222,128,.6)); }
      .lb { position: absolute; left: 8px; bottom: 4px; color: #8A93B8; font-size: 13px; }
    </style>
  </head>
  <body>
    <div id="grid">
${cells}    </div>
  </body>
</html>
`;
const out = join(HERE, "..", ".dev", "motif-sheet.html");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
console.log(`.dev/motif-sheet.html: ${names.length} motifs, ${rows} rows`);
