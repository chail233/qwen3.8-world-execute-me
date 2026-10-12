/* tools/audit-scopes.mjs — static guard for the runtime warnings the checker
   only surfaces after a full render: every helper scope must actually contain
   the marker that helper tweens. drawOn wants [data-draw], bloomIn wants
   [data-bloom], spinFrom wants [data-ang]. Also flags any #id a helper targets
   that no group html declares. */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const FRAMES = join(HERE, "..", "compositions", "frames");

const MARK = { drawOn: "data-draw", bloomIn: "data-bloom", spinFrom: "data-ang" };

let bad = 0, seen = 0;
for (const f of readdirSync(FRAMES).filter((n) => n.endsWith(".html")).sort()) {
  const html = readFileSync(join(FRAMES, f), "utf8");

  /* every id declared anywhere in the file */
  const declared = new Set();
  for (const q of html.matchAll(/\sid="([^"]+)"/g)) declared.add(q[1]);

  for (const [fn, marker] of Object.entries(MARK)) {
    const re = new RegExp(`${fn}\\(tl,\\s*"([^"]+)"`, "g");
    for (const call of html.matchAll(re)) {
      const sel = call[1];
      for (const part of sel.split(",").map((s) => s.trim())) {
        if (!part.startsWith("#")) continue;
        const id = part.match(/^#([A-Za-z0-9_-]+)/)[1];
        if (!declared.has(id)) {
          console.log(`${f}: ${fn} targets #${id} — not declared`);
          bad++;
          continue;
        }
        /* subtree heuristic: from this element's id= to the next declared id,
           which is where the next sibling motif begins. */
        const at = html.indexOf(`id="${id}"`);
        const nxt = html.indexOf('id="', at + 1);
        const sub = html.slice(at, nxt === -1 ? html.length : nxt);
        seen++;
        if (!sub.includes(marker)) {
          console.log(`${f}: ${fn}("#${id}") — no [${marker}] inside it`);
          bad++;
        }
      }
    }
  }

  /* plain selectors handed to the other beat/tween helpers */
  for (const call of html.matchAll(/(?:beatKick|beatGlow|cellsOn|cellsEvict)\(tl,\s*"[^"]*",\s*"([^"]+)"/g)) {
    for (const part of call[1].split(",").map((s) => s.trim())) {
      const id = part.match(/^#([A-Za-z0-9_-]+)/);
      if (id && !declared.has(id[1])) {
        console.log(`${f}: cells helper targets #${id[1]} — not declared`);
        bad++;
      }
    }
  }
  for (const call of html.matchAll(/(?:beatKick|beatGlow|pulse|blink|sweep|travel|drift|count|whiteout|capsPunch)\(tl,\s*"([^"]+)"/g)) {
    for (const part of call[1].split(",").map((s) => s.trim())) {
      const id = part.match(/^#([A-Za-z0-9_-]+)/);
      if (id && !declared.has(id[1])) {
        console.log(`${f}: helper targets #${id[1]} — not declared`);
        bad++;
      }
    }
  }
}
console.log(bad ? `\n${bad} scope problem(s)` : `\nscopes OK (${seen} marker scopes checked)`);
