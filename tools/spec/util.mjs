/* spec/util.mjs — shared readers for the per-frame spec modules. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const cues = JSON.parse(readFileSync(join(HERE, "..", "..", "cues.json"), "utf8"));
const audio = JSON.parse(readFileSync(join(HERE, "..", "..", "audiomap.json"), "utf8"));

export const CUES = cues.cues;
export const FRAMES_META = cues.frames;

export function C(id) {
  const key = id.replace(/^\d+-/, "");   /* cues.json keys frames as "f01-boot" */
  return CUES.filter((q) => q.frame === key);
}
export function meta(id) {
  return FRAMES_META.find((f) => f.id === id);
}
export function beats(a, b) {
  return audio.grid.beats_sec.filter((t) => t >= a && t <= b);
}
export function downbeats(a, b) {
  return audio.grid.downbeats_sec.filter((t) => t >= a && t <= b);
}
/* stage-local placement for a motif box */
export function at(left, top, inner, extra = "") {
  return `<div class="motif" style="left:${left}px;top:${top}px" ${extra}>${inner}</div>`;
}
