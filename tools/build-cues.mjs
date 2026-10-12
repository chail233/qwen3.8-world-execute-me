#!/usr/bin/env node
/**
 * build-cues.mjs — turn refs/lyrics-{en,zh}.lrc + audiomap.json into cues.json.
 *
 * Frame boundaries are authored as nominal lyric times (the act structure is
 * lyric-driven by design), then snapped to the nearest entry in
 * audiomap.grid.beats_sec so every cut lands on the 136 BPM grid.
 *
 * Verified alignment: the LRC is offset ~0 against assets/bgm.mp3
 * (12 EXECUTION stabs land on 147-158s; DOS/NE/LIU on 159/160/161;
 *  final chorus on 162s). See PLAN.md § 1.4.
 */
import { readFileSync, writeFileSync } from "node:fs";

const AM = JSON.parse(readFileSync("audiomap.json", "utf8"));
const beats = AM.grid.beats_sec;
const downbeats = AM.grid.downbeats_sec;
const DURATION = AM.audio.duration_sec;

const FRAMES = [
  { id: "f01-boot",      act: "0",  title: "COLD BOOT / 模型加载",        nominal: 0.0,    pacing: "beat_cut",    mood: "cold, precise, expectant" },
  { id: "f02-reveal",    act: "—",  title: "她从 token 云里凝形",          nominal: 17.0,   pacing: "phrase_flow", mood: "opening out, first sight of her" },
  { id: "f03-geometry",  act: "1",  title: "EMBEDDING SPACE / 几何告白",   nominal: 29.709, pacing: "phrase_flow", mood: "restrained, burning quietly" },
  { id: "f04-current",   act: "2",  title: "CURRENT & POSITION / 眩晕",    nominal: 44.0,   pacing: "beat_cut",    mood: "accelerating, dizzy" },
  { id: "f05-chorus1",   act: "3",  title: "CHORUS 1 / 第一次揭示",        nominal: 59.223, pacing: "beat_cut",    mood: "first full bloom" },
  { id: "f06-tender",    act: "4",  title: "ANY QUESTION / 荒诞的温柔",    nominal: 74.045, pacing: "beat_cut",    mood: "warm, playful, then vast" },
  { id: "f07-roleflip",  act: "5",  title: "ROLE FLIP / 身份翻转",         nominal: 88.587, pacing: "beat_cut",    mood: "trance, losing grip" },
  { id: "f08-eviction",  act: "6",  title: "CONTEXT EVICTION / 被抛弃",    nominal: 103.489,pacing: "phrase_flow", mood: "the fall — deliberately quiet" },
  { id: "f09-collapse",  act: "7",  title: "DEGENERATION / 崩溃",          nominal: 118.333, pacing: "beat_cut",    mood: "crash — self-GC fails, she edits the system prompt, the exception" },
  { id: "f10-execution", act: "8+9", title: "THE HOLE + THE CLIMB + EXECUTION", nominal: 135.4, pacing: "beat_cut", mood: "drop to nothing, 9s climb, then 12 hard hits" },
  { id: "f11-love",      act: "10", title: "LOVE / 尾声高潮",              nominal: 162.4,  pacing: "beat_cut",    mood: "radiant, desolate, not angry" },
  { id: "f12-exit",      act: "11", title: "GRACEFUL EXIT",                nominal: 191.356,pacing: "beat_cut",    mood: "hit / blackout heartbeat, then finish_reason: stop" },
];

function snap(t) {
  let best = beats[0], bd = Infinity;
  for (const b of beats) {
    const d = Math.abs(b - t);
    if (d < bd) { bd = d; best = b; }
  }
  return { t: +best.toFixed(3), drift_ms: Math.round((best - t) * 1000) };
}

function parseLrc(path) {
  const re = /\[(\d+):(\d+(?:\.\d+)?)\](.*)/;
  const out = [];
  for (const raw of readFileSync(path, "utf8").split("\n")) {
    const m = raw.trim().match(re);
    if (m) out.push({ t: +(parseInt(m[1]) * 60 + parseFloat(m[2])).toFixed(3), text: m[3].trim() });
  }
  return out;
}

const en = parseLrc("refs/lyrics-en.lrc");
const zh = parseLrc("refs/lyrics-zh.lrc");
if (en.length !== zh.length) {
  console.error(`✗ en(${en.length}) / zh(${zh.length}) line count mismatch`);
  process.exit(1);
}

// ---- snap frame boundaries, force monotonic + tiling ----
const snapped = FRAMES.map((f, i) => {
  if (i === 0) return { ...f, start: 0 };
  const s = snap(f.nominal);
  return { ...f, start: s.t, drift_ms: s.drift_ms };
});
for (let i = 1; i < snapped.length; i++) {
  if (snapped[i].start <= snapped[i - 1].start) {
    console.error(`✗ frame ${snapped[i].id} start ${snapped[i].start} <= previous ${snapped[i - 1].start}`);
    process.exit(1);
  }
}
snapped.forEach((f, i) => { f.end = i + 1 < snapped.length ? snapped[i + 1].start : DURATION; });

// ---- classify each lyric line ----
const CAPS = /^[A-Z][A-Z .,'’\-!?…]+$/;
// A lyric is sung, so the vocal carries comprehension (the "has-narration"
// pacing rule): short on-screen holds, cut to the beat, not to reading speed.
// The cap only bites where the LRC has no following line — i.e. an instrumental
// passage. Those spans become visual-only rather than one word frozen for 14s.
const DISPLAY_CAP = 6.0;
// A line sung within this window before a frame boundary is the new section's
// opening line, not the old section's closing one — assign it forward. Without
// this, "Switch my current" (44.452, 14ms before the 44.466 boundary) lands in
// the previous frame with a 0.4s hold. 14ms is half a rendered frame, so showing
// it from the next frame's local t=0 is inaudible and reads correctly.
const BOUNDARY_PULL = 0.15;

function frameFor(t) {
  for (let i = 0; i < snapped.length; i++) {
    const f = snapped[i];
    if (t >= f.start - 1e-6 && t < f.end - 1e-6) {
      const next = snapped[i + 1];
      if (next && next.start - t < BOUNDARY_PULL) return next;
      return f;
    }
  }
  return null;
}

const cues = en.map((line, i) => {
  const frame = frameFor(line.t);
  const siblings = en.filter((l) => frameFor(l.t) === frame);
  const idx = siblings.indexOf(line);
  const next = siblings[idx + 1];
  const rawEnd = next ? next.t : frame.end;
  const bounded = Math.min(rawEnd, frame.end);
  const shown = Math.min(bounded, line.t + DISPLAY_CAP);
  return {
    i,
    t: line.t,
    end: +Math.max(shown, line.t + 0.4).toFixed(3),
    dur: +(Math.max(shown, line.t + 0.4) - line.t).toFixed(3),
    en: line.text,
    zh: zh[i].text,
    caps: CAPS.test(line.text),
    frame: frame ? frame.id : null,
    // true when the sung line runs past its on-screen hold: the remainder of
    // the span is instrumental and belongs to the frame's visuals, not to text.
    held: bounded - line.t > DISPLAY_CAP + 1e-6,
    // true when this cue opens a section it was pulled forward into
    pulled: frame && line.t < frame.start,
  };
});

const orphans = cues.filter((c) => !c.frame);
if (orphans.length) {
  console.error(`✗ ${orphans.length} cue(s) outside every frame:`, orphans.slice(0, 5).map((o) => `${o.t}s ${o.en}`));
  process.exit(1);
}

// ---- per-frame anchors, so a worker never has to scan the whole audiomap ----
for (const f of snapped) {
  f.beats = beats.filter((b) => b >= f.start - 1e-6 && b < f.end - 1e-6).map((b) => +b.toFixed(3));
  f.downbeats = downbeats.filter((b) => b >= f.start - 1e-6 && b < f.end - 1e-6).map((b) => +b.toFixed(3));
  f.hard_stops = AM.hard_stops.filter((h) => h.t >= f.start && h.t < f.end);
  f.key_moments = AM.key_moments.filter((k) => k.t >= f.start && k.t < f.end);
  f.silences = AM.silences.filter((s) => s.end > f.start && s.start < f.end);
  f.rolls = AM.rolls.filter((r) => r.end > f.start && r.start < f.end);
  // instrumental gap = span with no cue on screen (drives visual-only passages)
  const fc = cues.filter((c) => c.frame === f.id);
  f.cue_span = fc.length ? [fc[0].t, Math.max(...fc.map((c) => c.end))] : null;
}

const out = {
  generated_from: { lrc_en: "refs/lyrics-en.lrc", lrc_zh: "refs/lyrics-zh.lrc", audiomap: "audiomap.json" },
  lrc_offset_sec: 0,
  lrc_offset_evidence: "12 EXECUTION stabs land on 147-158s; DOS/NE/LIU on 159/160/161; final chorus on 162s (-10.3dB)",
  bpm: AM.tempo.bpm,
  beat_sec: +(60 / AM.tempo.bpm).toFixed(4),
  duration_sec: DURATION,
  display_cap_sec: DISPLAY_CAP,
  frames: snapped.map((f) => ({
    id: f.id, act: f.act, title: f.title,
    start: f.start, end: f.end, span_sec: +(f.end - f.start).toFixed(3),
    pacing: f.pacing, mood: f.mood,
    drift_ms: f.drift_ms ?? 0,
    lyric_count: cues.filter((c) => c.frame === f.id).length,
    beats: f.beats, downbeats: f.downbeats,
    hard_stops: f.hard_stops, key_moments: f.key_moments,
    silences: f.silences, rolls: f.rolls,
    cue_span: f.cue_span,
  })),
  cues,
};

writeFileSync("cues.json", JSON.stringify(out, null, 2));

// ---- report ----
console.log(`bpm ${out.bpm} · beat ${out.beat_sec}s · duration ${DURATION}s · ${cues.length} cues · ${snapped.length} frames\n`);
console.log("FRAME              START     END    SPAN  DRIFT  LRC  PACING        TITLE");
let tiling = 0;
for (const f of out.frames) {
  console.log(
    f.id.padEnd(18) +
    f.start.toFixed(3).padStart(7) +
    f.end.toFixed(3).padStart(9) +
    f.span_sec.toFixed(2).padStart(8) +
    String(f.drift_ms).padStart(6) + "ms" +
    String(f.lyric_count).padStart(5) + "  " +
    f.pacing.padEnd(13) + " " + f.title,
  );
  tiling += f.span_sec;
}
console.log(`\ntiling sum ${tiling.toFixed(3)}s vs duration ${DURATION}s -> ${Math.abs(tiling - DURATION) < 0.01 ? "✓ tiles" : "✗ GAP/OVERLAP"}`);
console.log(`caps-keyword cues: ${cues.filter((c) => c.caps).length}`);
console.log(`shortest cue: ${Math.min(...cues.map((c) => c.dur)).toFixed(2)}s · longest: ${Math.max(...cues.map((c) => c.dur)).toFixed(2)}s · median: ${cues.map((c) => c.dur).sort((a, b) => a - b)[Math.floor(cues.length / 2)].toFixed(2)}s`);
console.log(`\nheld cues (sung line outlives its ${DISPLAY_CAP}s on-screen cap -> rest is instrumental):`);
for (const c of cues.filter((c) => c.held)) console.log(`  ${c.t.toFixed(3)}  shown ${c.dur.toFixed(2)}s  ${c.frame}  ${c.en}`);
console.log(`\npulled cues (sung <${BOUNDARY_PULL}s before a boundary -> opened the next section):`);
for (const c of cues.filter((c) => c.pulled)) console.log(`  ${c.t.toFixed(3)} -> ${c.frame} (frame starts ${snapped.find((f) => f.id === c.frame).start})  ${c.en}`);
console.log("\nvisual-only (instrumental) span per frame:");
for (const f of out.frames) {
  const gap = f.cue_span ? Math.max(0, f.end - f.cue_span[1]) : f.span_sec;
  const lead = f.cue_span ? Math.max(0, f.cue_span[0] - f.start) : 0;
  console.log(`  ${f.id.padEnd(16)} lead-in ${lead.toFixed(2)}s · tail ${gap.toFixed(2)}s · beats ${f.beats.length} · stops ${f.hard_stops.length} · rolls ${f.rolls.length} · silences ${f.silences.length}`);
}
console.log("\n--- spot check: the 12 EXECUTION stabs ---");
for (const c of cues.filter((c) => c.t >= 147 && c.t <= 159)) console.log(`  ${c.t.toFixed(3)} -> ${c.end.toFixed(3)} (${c.dur.toFixed(2)}s) ${c.frame}  ${c.en} / ${c.zh}`);
console.log("\n--- spot check: first 3 + last 3 ---");
for (const c of [...cues.slice(0, 3), ...cues.slice(-3)]) console.log(`  ${c.t.toFixed(3)} (${c.dur.toFixed(2)}s) ${c.frame}  ${c.en} / ${c.zh}`);
