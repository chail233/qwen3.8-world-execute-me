/* tools/probe-rects.mjs — print real laid-out rects for named elements at a given
   local time, using the same headless-Edge freeze harness as align-audit.
   usage: node tools/probe-rects.mjs <frame-id> <t> <sel,sel,...> */
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROJECT = join(HERE, "..");
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const [id, t, sels] = process.argv.slice(2);
const base = readFileSync(join(PROJECT, ".verify", `freeze-${id}.html`), "utf8");
const js =
  "var S=" + JSON.stringify(sels.split(",")) + ";" +
  "document.title='P '+JSON.stringify(S.map(function (s) {" +
  "var e=document.querySelector(s); if(!e) return [s,null];" +
  "var b=e.getBoundingClientRect();" +
  "return [s,[b.left,b.top,b.right,b.bottom].map(Math.round)];}));";
const page = join(PROJECT, ".verify", "probe.html");
writeFileSync(page, base.replace("</body>", `<script>${js}</script></body>`).replace(/location\.search/, `'?t=${t}'`));
let dom = "";
try {
  dom = execFileSync(EDGE, ["--headless", "--disable-gpu", "--no-first-run", "--virtual-time-budget=4000",
    "--dump-dom", `file:///${page.split("\\").join("/")}`], { encoding: "utf8", maxBuffer: 1 << 26, stdio: ["ignore", "pipe", "ignore"] });
} catch (e) { dom = String(e.stdout || ""); }
rmSync(page, { force: true });
const m = /<title>P (\[.*?\])<\/title>/.exec(dom);
if (!m) { console.log("NO-RESULT"); process.exit(1); }
for (const [s, r] of JSON.parse(m[1])) console.log(`  ${s.padEnd(16)} ${r ? `x ${r[0]}..${r[2]}  y ${r[1]}..${r[3]}` : "missing"}`);
