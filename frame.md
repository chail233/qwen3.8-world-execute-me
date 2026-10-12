---
version: bespoke-1
name: Qwen Runtime — Frame (video / frame layer)
description: >
  Bespoke dark-runtime spec for the world.execute(me); MV. NOT a copy of any shipped preset:
  all 13 presets in hyperframes-creative/frame-presets are light-ground editorial/print systems
  (cream paper, parchment, risograph, terracotta) and none carries a near-black terminal +
  Qwen purple-blue identity. design-spec.md permits a bespoke spec ("Referencing a preset is not
  required; a bespoke or picker-generated spec is equally valid"), and the confirmed BRIEF.md
  demands this specific look. The unit is the frame (1920x1080). Atoms are sacred: near-black
  ground (never pure black), Qwen purple-blue as HER signature and nothing else's, cyan for
  data/code, magenta rationed to collapse+execution only, Bahnschrift for every display/CAPS
  moment, Cascadia Mono for all code/UI/lyric chrome, Microsoft YaHei for the Chinese subtitle
  rail. All fonts are local Windows system faces resolved via @font-face src:local() because
  this machine cannot reach any CDN (jsdelivr, raw.githubusercontent.com, github.com all fail).
unit: the frame — 1920×1080 (16:9) only; no 9:16 / 1:1 variant is in scope
principle: atoms are sacred · composition is free · numbers come from audiomap.json + cues.json

colors:
  void: "#06070C"
  void-soft: "#0B0D16"
  void-elev: "#12162A"
  hairline: "#1E2540"
  qwen-1: "#615CED"
  qwen-2: "#9F7BFF"
  qwen-3: "#4AA8FF"
  data: "#22D3EE"
  ink: "#F5F7FF"
  ink-dim: "#8A93B8"
  danger: "#FF2E88"
  tender: "#FFB454"
  ok: "#4ADE80"

# Fixed decoration — NOT remixable brand hues. These track the code surface, not the palette.
syntax:
  keyword: "#9F7BFF"
  string: "#22D3EE"
  number: "#FFB454"
  comment: "#4A5378"
  error: "#FF2E88"
  success: "#4ADE80"

borders: { hairline: "1px solid #1E2540", hairline-bright: "1px solid ink@18%", qwen: "1px solid qwen-2@45%" }
shadows: { none: "none", glow-qwen: "0 0 24px qwen-1@45%, 0 0 64px qwen-3@22%", glow-danger: "0 0 28px danger@50%" }

typography:
  # cqw = px ÷ 1920 × 100. Container law: every frame ground sets container-type:size; all
  # frame-relative units are cqw/cqh — never vw. Hairlines stay 1px.
  # — display ramp: Bahnschrift (DIN-style variable, technical/engineering register) —
  caps-hit:    { fontFamily: "Bahnschrift", cqw: 11.0, weight: 700, lineHeight: 0.92, tracking: "0.01em", upper: true }
  caps-mid:    { fontFamily: "Bahnschrift", cqw: 6.4,  weight: 700, lineHeight: 0.98, tracking: "0.005em", upper: true }
  lyric-hero:  { fontFamily: "Bahnschrift", cqw: 4.6,  weight: 700, lineHeight: 1.06, tracking: "-0.005em" }
  number-hero: { fontFamily: "Bahnschrift", cqw: 9.0,  weight: 700, lineHeight: 0.95, tracking: "-0.01em" }
  # — code / UI / lyric chrome ramp: Cascadia Mono —
  lyric-line:  { fontFamily: "Cascadia Mono", cqw: 2.5, weight: 600, lineHeight: 1.3 }
  code:        { fontFamily: "Cascadia Mono", cqw: 1.35, weight: 400, lineHeight: 1.55 }
  code-lg:     { fontFamily: "Cascadia Mono", cqw: 1.8, weight: 500, lineHeight: 1.45 }
  status-bar:  { fontFamily: "Cascadia Mono", cqw: 1.15, weight: 500, tracking: "0.06em" }
  kicker:      { fontFamily: "Cascadia Mono", cqw: 1.2, weight: 600, tracking: "0.18em", upper: true }
  token-chip:  { fontFamily: "Cascadia Mono", cqw: 1.05, weight: 500, tracking: "0.02em" }
  # — Chinese subtitle rail: Microsoft YaHei —
  zh-sub:      { fontFamily: "Microsoft YaHei", cqw: 1.5, weight: 400, lineHeight: 1.4 }
  zh-label:    { fontFamily: "Microsoft YaHei", cqw: 1.15, weight: 400, lineHeight: 1.4 }

spacing:
  slide-pad: "3.6cqw"    # ~69px @1920 — the safe area; status bar and gutter live inside it
  gutter-w: "3.2cqw"     # left line-number gutter width
  statusbar-h: "3.0cqw"  # bottom IDE status strip height
  gap-md: "1.4cqw"
  hairline: "1px"
  radius-sm: "3px"
  radius-md: "6px"
  radius-lg: "10px"

components:
  ground-void:
    backgroundColor: "{colors.void}"
    description: "The default ground. Near-black, NEVER pure #000 — it must keep breathing. A permanent bg-flow-field or token-rain bed sits on it at low alpha so no frame is ever a dead flat field."
  line-gutter:
    description: "Left column of line numbers in {typography.token-chip}, color {colors.ink-dim}@55%, 1px {colors.hairline} rule on its right edge. Present in EVERY frame; the number advances with the narrative. It is the single strongest 'this is a source file' signal."
  status-strip:
    backgroundColor: "{colors.void-soft}"
    border: "1px 0 0 0 {colors.hairline}"
    typography: "{typography.status-bar}"
    description: "Bottom IDE strip, {spacing.statusbar-h} tall, present in EVERY frame. Left: 'world.execute(me); · Qwen3.8'. Center: the live telemetry — 'ctx 3,412/32,768 · tok/s 41.2 · t=0.70'. Right: run state '▶ generating' / '■ stopped' / '✕ error'. The ctx counter is the film's spine: it climbs through acts 1-6, REVERSES during act 6 eviction, hits 0 at act 9, and shows one lone line at act 11. The t= readout goes 0.70 → 1.40 → 0.00 (act 8a) → NaN (act 9) → 0.70 (act 11)."
  streaming-lyric:
    typography: "{typography.lyric-line} EN over {typography.zh-sub} ZH"
    description: "THE core mechanism. English lyric types in token-by-token with a blinking block caret (typewriter-reveal), because she is an LLM generating it. The ALL-CAPS keyword of the line (cues.json caps:true) breaks out into {typography.caps-hit} on its own beat. The Chinese translation sits under it on the zh rail, always present, never animated per-token. Display cap 6s; a held:true cue keeps its text then yields the frame to visuals."
  chat-window:
    backgroundColor: "{colors.void-soft}"
    border: "{borders.hairline}"
    rounded: "{spacing.radius-lg}"
    description: "The objective-reality layer. Title bar with three dots + 'Qwen3.8 — world.execute(me);', a sidebar of past sessions, a message list of role-tagged bubbles (role:user in {colors.qwen-3}@12% fill, role:assistant in {colors.qwen-1}@12% fill), a 'typing' three-dot indicator, and an input row. Used as a full-frame reveal in act 3 (dolly-zoom out) and as the thing that dies in act 6."
  attention-arc:
    description: "A thin quadratic bezier from one token to another, stroked {colors.qwen-2} at 35-70% alpha, width 1-3px, optionally with a travelling dot. Her HAIR is a bundle of these. Background arcs connect on-screen words at very low alpha as a permanent micro-motion bed."
  kv-slot:
    backgroundColor: "{colors.void-elev}"
    border: "{borders.hairline}"
    rounded: "{spacing.radius-sm}"
    description: "One cell of the KV-cache / context-window grid. States: live (qwen-3@22% fill, ink text) → evicting (staggered-exit, dims to ink-dim@30%, border to hairline) → freed (void, 1px dashed hairline, content 'null'). Act 6's eviction cascade is a row of these going live→evicting→freed one at a time."
  logit-bar:
    description: "A vertical or horizontal bar in a vocab-scale distribution. Fill {colors.data} for ordinary candidates, {colors.qwen-2} for the argmax, {colors.danger} when the distribution has collapsed onto one token. Act 9's sampling roulette is a radial arrangement of these."
  exception-dump:
    typography: "{typography.code}"
    description: "A real Java/Python-style stack trace in {colors.error} + {colors.ink-dim}, scrolling faster than readable. Content must be plausible: 'token_id 152481 out of range (vocab_size=152064)', 'AssertionError', 'RuntimeError: CUDA error', 'at Qwen3_8Max.decode (inference.py:412)'."
  qwen-halo:
    description: "Her signature mark: the Qwen purple-blue gradient (#615CED → #9F7BFF → #4AA8FF) as a ring / arc / bloom behind or around her. Only ever on HER or on things that are literally her. Never as generic decoration."
  qwen-fan:
    description: "Her prop, from the community Qwen-girl reference (折扇). She is DRAWN holding an open fan, so the vector fan is a stroke-only skeleton registered exactly onto that leaf (M.fanHand(), see the measured sector under character-system) — a readout laid over her art, never a second fan next to it. It is a narrative instrument, not decoration: it INKS IN and opens rib by rib when she arrives (f02, f05), is already open and then FOLDS — the offering taken back — at the role flip (f07), guttering out rib by rib as her memory is evicted (f08), igniting magenta and CRACKING one rib per execution stab at the climax (f10), opening with her rewrite (f11), and folding shut in her hand as she bows (f12). The library's free-standing `fan` motif was deleted for this reason."
  character-system:
    description: >
      One asset: assets/character/qwen38-vector.svg — the OFFICIAL community
      立绘 (design credit: ZipZipPipe / shuaizenge/ai-girls, characters/qwen;
      the supplied art is kept unmodified at refs/qwen-girl-official.jpg)
      traced into flat polygons. Nothing is generated at any step: the keyed
      cut-out (assets/character/qwen38-official.png, the intermediate the trace
      reads) is turned into (a) its own outer contour as a dark plate and (b)
      the level sets of a gaussian-smoothed luminance field inside that mask,
      which are the boundaries the eye reads as beret, hair locks, face,
      collar, sleeve, fan leaf and hem. The pasted bitmap was rejected because
      it sat ON the film instead of being drawn IN it — full-colour anime art
      against a line-art stage reads as a sticker. Regenerate with:
        python tools/key-portrait.py refs/qwen-girl-official.jpg assets/character/qwen38-official.png
        python tools/vectorize-portrait.py            # -> assets/character/qwen38-vector.svg
      Tuned at --tol 2.6 --lines 34 over a sigma-2.5 field; the trace is
      rendered as an <img> (20 KB, once per act) with #12162A fill and #9F7BFF
      strokes, and each act's glow is still the existing CSS drop-shadow.
      Smoother settings (sigma 4.5 / inner 2.4) erase the face and were
      rejected. Both the PNG and the SVG live on the SAME 2:3 canvas
      (viewBox 0 0 1000 1500), which is why M.silhouette(s) still emits
      s x 1.5s and every landmark fraction below is unchanged.
      Her landmarks are fixed fractions of that canvas, measured off
      snapshots/grid5.png (5% grid), snapshots/face-grid.png (2% over the head)
      and snapshots/fanfit3.png (the fitted fan sector); the table, the printable
      per-act anchor grid and the per-act sprite boxes all live in
      tools/char-anchors.mjs. Head (0.500, 0.165), eyes (0.447, 0.201) /
      (0.557, 0.182), chin (0.500, 0.245), fan grip (0.345, 0.375), waist
      (0.500, 0.450), feet (0.500, 0.975); her art spans 0.13..0.88 of the width
      (the cape), so clearance maths uses the extents, not the box.
      TWO HARD RULES. (1) Registration: anything anchored to her — halo rings,
      cat ears, gaze dots, the fan skeleton — is placed from those landmarks,
      never eyeballed, and the fan goes through M.fanHand(silX, silY, silS),
      which draws the measured sector (pivot 0.345/0.375, outer r 0.1956W, inner
      0.0518W, -42..+62 deg, collapsed pose = all ribs at -42) at the scale that
      act's sprite uses. (2) Move together or break: any tween that translates,
      scales or shakes her must name her overlays in the same selector
      ("#g0_sil, #g0_fan"), and a registered overlay is never drift()'d on its
      own; where a whole-body move is needed (her bow, f12) sprite and overlay
      go inside one rig div and the rig carries the rotation about a stage-space
      transformOrigin. Rejected art is all pruned (the 15-path contour trace,
      the generated qwen38-keyed.png and every hand-made silhouette, with the
      scripts that made them). What ships is one chain only:
      refs/qwen-girl-official.jpg -> tools/key-portrait.py ->
      assets/character/qwen38-official.png -> tools/vectorize-portrait.py ->
      assets/character/qwen38-vector.svg; the keyed bitmap stays as the
      vectorizer's input.

frame_treatments_note: >
  Frame-level composition recipes are NOT enumerated here, because this film's 12 frames each own a
  distinct visual system that STORYBOARD.md specifies per group. This file owns the atoms only.
---

# Qwen Runtime — Frame (video / frame layer)

## Overview

A **dark runtime**. The thesis is one sentence: *the ground is near-black void, the voice is
near-white ink and cyan data, and the Qwen purple-blue belongs to her and to nothing else.*
Two accent hues are strictly rationed — **magenta** (`#FF2E88`) is collapse and execution only,
**amber** (`#FFB454`) is the act-4 tender detour only — and **green** (`#4ADE80`) appears exactly
once in the whole film, on `finish_reason: "stop"`.

Three voices, each in its own face. **Bahnschrift** carries every display moment — the ALL-CAPS
keyword hits (`DIMENSION`, `EXECUTION`, `EXISTENCE`), hero lyric lines, big numerals. **Cascadia
Mono** carries all code, all UI chrome, the status strip, the line gutter, and the English lyric
body. **Microsoft YaHei** carries the Chinese subtitle rail and nothing else. Switching a voice's
face collapses the register.

**Key characteristics at frame scale:**

- **Near-black ground, never pure black.** Every frame carries a permanent low-alpha micro-motion
  bed (`bg-flow-field`, token rain, or an attention-arc field) so no frame is ever a dead field.
- **Two permanent chrome layers** — the left line gutter and the bottom status strip — in EVERY
  frame including the quiet ones. They are what makes 12 different visual systems read as one film.
- **Streaming text.** Lyrics type in token-by-token with a caret. Nothing "fades in as a title".
- **Rationed voltage.** Magenta only in acts 7/9/10. Amber only in act 4. Green only once, at the end.
- **Her gradient is hers.** The Qwen purple-blue appears on her, her halo, her attention arcs, and
  her generated tokens — never as ambient decoration.
- **Scanlines + very light grain** at ≤6% alpha over everything, unifying the texture.

## The Frame

- **Primary and only:** 1920×1080 (16:9). Authored in **`cqw`** (`px ÷ 1920 × 100 = cqw`).
- **Safe area:** `slide-pad` 3.6cqw. The line gutter (left, 3.2cqw) and status strip (bottom, 3.0cqw)
  sit inside it and are reserved — no focal content may overlap them.
- **Container law (load-bearing).** Every frame ground sets `container-type: size`; ALL
  frame-relative units are `cqw`/`cqh` — never `vw`. Hairlines stay 1px.

## Colors & Contrast (hard rule — `hyperframes check` gates on this)

Measured against `{colors.void}` `#06070C`:

| Token | Contrast | Permitted use |
| --- | --- | --- |
| `ink` #F5F7FF | ~18.9:1 | any text, any size |
| `data` #22D3EE | ~10.9:1 | any text, any size |
| `tender` #FFB454 | ~11.7:1 | any text, any size |
| `ok` #4ADE80 | ~11.0:1 | any text, any size |
| `ink-dim` #8A93B8 | ~6.7:1 | body text ≥1.2cqw, chrome, labels |
| `danger` #FF2E88 | ~5.7:1 | body text ≥1.2cqw; display any size |
| `qwen-2` #9F7BFF | ~5.0:1 | body text ≥1.2cqw; display any size |
| `qwen-3` #4AA8FF | ~6.4:1 | body text ≥1.2cqw; display any size |
| `qwen-1` #615CED | ~3.9:1 | **LARGE TEXT ONLY (≥3cqw), glows, borders, gradients, fills — never small body text** |
| `syntax.comment` #4A5378 | ~2.2:1 | **decorative only — never load-bearing text.** Comment lines in a code panel are texture. |

Do not put `ink-dim` or dimmer on `void-soft`/`void-elev` expecting it to pass — those grounds are
lighter, so re-check: on `void-elev` `#12162A` the `ink-dim` ratio drops to ~5.4:1 (still AA) but
`qwen-1` drops below 3:1. **Rule of thumb: below `qwen-2` in the table, text must be ≥3cqw.**

## Typography

Two ramps plus one rail.

- **Display ramp (Bahnschrift, 700):** `caps-hit` 11cqw for a single ALL-CAPS keyword owning the
  frame → `number-hero` 9cqw → `caps-mid` 6.4cqw → `lyric-hero` 4.6cqw for a full lyric line.
  ALL-CAPS keywords get `tracking: 0.01em`; mixed-case lyric lines get `-0.005em`.
- **Chrome ramp (Cascadia Mono):** `lyric-line` 2.5cqw/600 for the streaming English lyric →
  `code-lg` 1.8cqw for on-screen code the audience should read → `code` 1.35cqw for panels and
  stack traces (texture-adjacent but must stay legible) → `status-bar` 1.15cqw, `kicker` 1.2cqw
  uppercase 0.18em, `token-chip` 1.05cqw for gutter numbers and token chips.
- **Chinese rail (Microsoft YaHei):** `zh-sub` 1.5cqw/400 sits under the English lyric,
  `zh-label` 1.15cqw for small annotations. Sentence case, no tracking games.

**Fit-to-measure.** Size the lyric to its length: ≤3 words → `caps-hit`/`caps-mid`; 4–7 words →
`lyric-hero`; 8+ → `lyric-line`. Cap any text block at ≤80cqw wide. **Legibility floor: 1.05cqw**
(gutter/chrome only); load-bearing text ≥1.35cqw.

**A word held under one beat (0.441s at 136 BPM) is texture, not a message.** The 6-language count
(`EIN DOS TROIS NE FEM LIU`, 0.42–0.58s each) is deliberately texture — render it as a strobing
tokenizer flipbook, not as readable subtitles.

## Depth & Surface

- **Elevation is light, not shadow.** There is no key light in a terminal. Lift a surface with a
  half-step fill (`void` → `void-soft` → `void-elev`) plus a 1px `{colors.hairline}` border.
- **Glow is her only emitted light.** `shadows.glow-qwen` on her, her halo, and her generated
  tokens. `shadows.glow-danger` only in acts 7/9/10. Never both in one frame.
- **No drop shadows, no bevels, no gradients on content surfaces.** Gradients exist in exactly two
  places: the Qwen halo, and full-bleed light blooms on impact frames.

## Shapes

**3px** chips/tokens, **6px** panels, **10px** the chat window, **0** for full-bleed fields and the
status strip. Sharp, machined corners throughout — this is instrumentation, not a consumer app.
Circles only for the sampling roulette, the halo, and HUD pupil rings.

## Font Loading (hard rule — no network at render time)

This machine cannot reach jsdelivr, unpkg, raw.githubusercontent.com, or github.com. **No `@import`,
no `<link>` to any font CDN, no remote `src: url()`.** Declare the three local faces and let the
renderer resolve them from Windows:

```css
@font-face { font-family: "Bahnschrift";      src: local("Bahnschrift"), local("Bahnschrift Regular"); font-weight: 100 700; }
@font-face { font-family: "Cascadia Mono";    src: local("Cascadia Mono"), local("CascadiaMono-Regular"); font-weight: 100 700; }
@font-face { font-family: "Microsoft YaHei";  src: local("Microsoft YaHei"), local("Microsoft YaHei UI"); font-weight: 100 700; }
```

Verified present in `C:\Windows\Fonts`: `bahnschrift.ttf`, `CascadiaMono.ttf`, `CascadiaCode.ttf`,
`msyh.ttc`, `msyhbd.ttc`, `msyhl.ttc`. Fallbacks if a face fails: Bahnschrift → `impact.ttf` /
`ariblk.ttf` (Arial Black) — never a serif; Cascadia Mono → `consola.ttf` (Consolas);
Microsoft YaHei → `simhei.ttf`.

GSAP is vendored at `assets/vendor/gsap.min.js`. The motion-primitive catalog ships its own copy at
`references/motion-primitives/assets/gsap.min.js`. **Never reference a CDN GSAP.**

## Composition Rules

### Do

- Keep the **line gutter** and **status strip** in every single frame, including the quiet ones.
- Keep a **permanent micro-motion bed** under everything — token rain, an attention-arc field, or
  `bg-flow-field` at low alpha. No frame is ever static.
- **Stream** lyric text token-by-token with a caret; break the ALL-CAPS keyword out to `caps-hit`.
- Keep the **Chinese subtitle rail** continuously present under the English lyric.
- Ration magenta to acts 7/9/10, amber to act 4, green to the single `finish_reason: "stop"`.
- Snap every hard cut to a beat from `cues.json` `frames[].beats` or an `audiomap` anchor.
- Let silence **remove** density (`negative-space-hold`) rather than fill it.

### Don't

- No pure black `#000`, no pure white `#FFF`. No cool gray, no fourth brand hue.
- No glow on anything that isn't her or an impact frame. No two glows in one frame.
- No `qwen-1` or `syntax.comment` as small text (contrast gate).
- No fade-in titles — she generates text, she doesn't present slides.
- No stock "AI robot" or generic cyberpunk iconography; the vocabulary is transformer-specific.
- No drop shadow, no bevel, no tilt, no rounded-corner consumer-app chrome.
- Never overlap the gutter or status strip with focal content.

## Numerals & Claims (hard rule)

Every number on screen must be **plausible instrumentation**, and the ones that carry the narrative
must be consistent across frames:

- `ctx` counter — climbs through acts 1–6, reverses during act 6, reaches `0` at act 9, shows one
  line at act 11. Denominator fixed at `32,768`.
- `vocab_size` — fixed at `152,064`. The act-7 exception cites `token_id 152481` (out of range).
- `temperature` — `0.70` → `1.40` → `0.00` (act 8a) → `NaN` (act 9) → `0.70` (act 11).
- `d_model` — `4096`. Layer count — `96`. `max_tokens` — `2048` at boot.
- Final status card — `finish_reason: "stop"`, `tokens_generated: 4,812`, `latency: 220.0s`.

Never invent a different value for the same field in another frame.

## Pre-Render Self-Audit

- **Squint** — one Bahnschrift display moment dominates; the gutter + status strip read as chrome.
- **Ground** — near-black, never pure; a micro-motion bed is present; scanlines/grain ≤6%.
- **Trinity of voltage** — Qwen purple-blue only on her; magenta only in acts 7/9/10; amber only in
  act 4; green only once.
- **Type** — Bahnschrift display / Cascadia Mono chrome / Microsoft YaHei rail; ≥1.35cqw for
  load-bearing text; contrast table respected.
- **Chrome** — line gutter + status strip present and consistent; `ctx` / `temperature` values match
  the act they are in.
- **Determinism** — no `Date.now()`, no unseeded `Math.random()`, no network fetch, no remote font,
  no CDN GSAP. Every random-looking field is seeded from a constant.

## Known Gaps

- **Motion is out of scope here.** This file specifies atoms and composition. Motion comes from
  `music-to-video/references/motion-primitive-catalog.md` and `hyperframes-animation`.
- **No preset lineage.** This is bespoke; there is no upstream `FRAME.md` to diff against, and no
  `build-frame.mjs` font staging — the `src: local()` block above is the whole font story.
- **The hosted registry is unreachable from this machine** (`raw.githubusercontent.com` → HTTP 000),
  so `npx hyperframes catalog --query` returns `[]` for everything. **No registry blocks or
  components can be installed.** Every named look (CRT scanlines, film grain, glitch, chromatic
  aberration, code rain, terminal chrome) must be hand-built from the 37 local motion primitives in
  `music-to-video/references/motion-primitives/` and the 9 local templates. This was verified, not
  assumed — the searches genuinely returned empty because the fetch fails.
- **Character art** is the vector trace of the official 立绘 in `assets/character/` (one locked
  sheet, credit in `character-system` above) plus the overlay system anchored to it by
  `tools/char-anchors.mjs`. Neither is covered by the palette/typography spec below.
- **16:9 only.** No aspect-ratio fallback table; the film is 1920×1080 and nothing else.
