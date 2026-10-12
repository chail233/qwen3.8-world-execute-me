/* kit.mjs — the shared frame kit: layout zones, bed layers, and every motion
   helper the 12 frames are allowed to use. One file owns the look so the acts
   cannot drift apart.

   Layout contract (1920x1080):
     gutter      x 0..62        line numbers (decorative)
     stage       x 96..1824     ALL graphics live here, y 88..778
     lyric block x 96..1276     EN lyric + ZH + cue ticks, y 796..1010, LEFT-anchored
     actlabel    top-right      act title + timecode
     statusbar   bottom 58      telemetry
   The stage stops at y778 so lyric text below it can never sit on a graphic.
   Motif coordinates inside .stage are therefore 0..1728 x 0..690.
*/

export const PAL = {
  V: "#06070C", VS: "#0B0D16", VE: "#12162A", HL: "#1E2540",
  Q1: "#615CED", Q2: "#9F7BFF", Q3: "#4AA8FF", DA: "#22D3EE",
  INK: "#F5F7FF", DIM: "#8A93B8", MG: "#FF2E88", AM: "#FFB454", OK: "#4ADE80",
};

export const KIT_CSS = `
        @font-face { font-family: "Bahnschrift"; src: local("Bahnschrift"), local("Bahnschrift Regular"); font-weight: 100 700; }
        @font-face { font-family: "Cascadia Mono"; src: local("Cascadia Mono"), local("CascadiaMono-Regular"); font-weight: 100 700; }
        @font-face { font-family: "Microsoft YaHei"; src: local("Microsoft YaHei"), local("Microsoft YaHei UI"); font-weight: 100 700; }

        #root { position: absolute; inset: 0; width: 1920px; height: 1080px; overflow: hidden;
          background: #06070C; color: #F5F7FF; font-family: "Cascadia Mono", Consolas, monospace; }
        #root * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Opt-in "grow this SVG part in place": tween --pop, not scale.
           GSAP builds an SVG element's matrix by MEASURING its transform origin, and that
           measurement is unreliable here — the tween ends with a translate baked into the
           element (act 03's tangent line finished 64 px from the dot it touches). Handing
           the scale to CSS makes the browser resolve transform-box:fill-box exactly, so the
           part grows where it was authored. tools/audit-svg-transforms.mjs watches for it. */
        svg .grow { transform-box: fill-box; transform-origin: 50% 50%; transform: scale(var(--pop, 1)); }

        /* ---- bed layers (decorative, ignored by the layout audit) ---- */
        .rain { position: absolute; inset: 0; opacity: .42; overflow: hidden; }
        .rain .col { position: absolute; top: -1200px; width: 2px; height: 1200px;
          background: repeating-linear-gradient(180deg, rgba(34,211,238,.5) 0 9px, transparent 9px 30px); }
        .glow { position: absolute; inset: 0; opacity: .55; }
        .gridfloor { position: absolute; left: 0; right: 0; bottom: 58px; height: 300px; opacity: .14;
          background:
            repeating-linear-gradient(90deg, rgba(97,92,237,.7) 0 1px, transparent 1px 96px),
            repeating-linear-gradient(0deg, rgba(97,92,237,.55) 0 1px, transparent 1px 44px);
          transform: perspective(700px) rotateX(58deg); transform-origin: 50% 100%; }
        .scan { position: absolute; inset: 0; pointer-events: none; opacity: .05;
          background: repeating-linear-gradient(0deg, #F5F7FF 0 1px, transparent 1px 4px); }
        .vig { position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(120% 90% at 50% 46%, transparent 55%, rgba(3,4,8,.85) 100%); }

        .gutter { position: absolute; left: 0; top: 0; bottom: 58px; width: 62px;
          border-right: 1px solid #1E2540; padding: 14px 8px 0 0; text-align: right;
          font-size:16px; line-height: 24px; color: #8A93B8; overflow: hidden; }
        .gutter .cur { color: #9F7BFF; }
        .statusbar { position: absolute; left: 0; right: 0; bottom: 0; height: 58px;
          background: #0B0D16; border-top: 1px solid #1E2540; display: flex; align-items: center;
          justify-content: space-between; padding: 0 26px; font-size:20px; letter-spacing: .06em; color: #8A93B8; }
        .statusbar .l { color: #F5F7FF; } .statusbar .l b { color: #9F7BFF; font-weight: 600; }
        .statusbar .r { color: #4AA8FF; }

        .actlabel { position: absolute; right: 64px; top: 34px; text-align: right; }
        .actlabel .a { font-size:20px; letter-spacing: .22em; color: #8A93B8; }
        .actlabel .t { margin-top: 6px; font-size:16px; letter-spacing: .12em; color: #8A93B8; }

        /* ---- graphics stage: every motif is placed inside this box ---- */
        .stage { position: absolute; left: 96px; top: 88px; width: 1728px; height: 690px; }
        .group { position: absolute; inset: 0; visibility: hidden; }
        /* whole-act furniture. It must NOT carry its own visibility: the runtime
           hides an off-window sub-composition with visibility on its host, and an
           inline visibility:visible here would inherit straight through that and
           bleed the act's furniture over every later act. */
        .stay { position: absolute; inset: 0; }
        .flash { position: absolute; inset: 0; background: #F5F7FF; opacity: 0; pointer-events: none; }

        .motif { position: absolute; }
        /* the shared HUD corner frame: every act frames its graphics with the same
           four brackets, which is what makes different motifs read as one system. */
        .hud { position: absolute; inset: -22px; pointer-events: none; }
        .hud i { position: absolute; width: 26px; height: 26px; border: 2px solid rgba(138,147,184,.45); }
        .hud i:nth-child(1) { left: 0; top: 0; border-right: 0; border-bottom: 0; }
        .hud i:nth-child(2) { right: 0; top: 0; border-left: 0; border-bottom: 0; }
        .hud i:nth-child(3) { left: 0; bottom: 0; border-right: 0; border-top: 0; }
        .hud i:nth-child(4) { right: 0; bottom: 0; border-left: 0; border-top: 0; }
        .motif svg { display: block; overflow: visible; }
        .motif [data-draw] { fill: none; stroke-linecap: round; stroke-linejoin: round; }
        .gq1 { filter: drop-shadow(0 0 7px rgba(97,92,237,.75)); }
        .gq2 { filter: drop-shadow(0 0 8px rgba(159,123,255,.7)); }
        .gq3 { filter: drop-shadow(0 0 7px rgba(74,168,255,.7)); }
        .gda { filter: drop-shadow(0 0 7px rgba(34,211,238,.65)); }
        .gmg { filter: drop-shadow(0 0 9px rgba(255,46,136,.7)); }
        .gam { filter: drop-shadow(0 0 8px rgba(255,180,84,.65)); }
        .gok { filter: drop-shadow(0 0 7px rgba(74,222,128,.6)); }

        .pt { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: #22D3EE; }
        .spec { position: absolute; display: flex; align-items: flex-end; gap: 5px; }
        .spec i { display: block; width: 7px; height: 100%; transform-origin: 50% 100%;
          background: linear-gradient(180deg, #22D3EE, rgba(97,92,237,.25)); }

        /* ---- lyric block: bottom-left, left-anchored ---- */
        .lyr { position: absolute; left: 96px; top: 796px; width: 1180px; height: 214px; }
        .lyr .bar { position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(180deg, #615CED, #9F7BFF 55%, rgba(159,123,255,.15)); }
        .lyr .bar i { position: absolute; left: -3px; width: 8px; height: 8px; border-radius: 50%;
          background: #9F7BFF; box-shadow: 0 0 10px #9F7BFF; }
        .lyr .meta { position: absolute; left: 28px; top: -34px; display: flex; align-items: center; gap: 14px; }
        .lyr .meta .n { font-size:16px; letter-spacing: .18em; color: #8A93B8; }
        .lyr .meta .ticks { display: flex; gap: 6px; }
        .lyr .meta .ticks i { width: 14px; height: 3px; background: #1E2540; }
        .lyr .meta .ticks i b { display: block; width: 100%; height: 100%; background: #9F7BFF; visibility: hidden; }
        /* transform-origin at the left edge: a caps cue scales UP from the anchor,
           never off the left of the screen (the old centred origin pushed 62px text out). */
        .lyr .en { position: absolute; left: 28px; right: 0; top: 24px; transform-origin: 0 50%;
          text-align: left; font-size: 40px; font-weight: 600; line-height: 1.28; color: #F5F7FF; }
        .lyr .en.caps { font-family: "Bahnschrift", "Arial Black", sans-serif; font-size: 62px;
          letter-spacing: .02em; line-height: 1.1; color: #9F7BFF; }
        .lyr .zh { position: absolute; left: 28px; right: 0; top: 164px;
          font-family: "Microsoft YaHei", sans-serif; font-size: 26px; line-height: 1.5; color: #8A93B8; }

        .caps { font-family: "Bahnschrift", "Arial Black", sans-serif; font-weight: 700; letter-spacing: .01em; }
        .panel { border: 1px solid #1E2540; background: #0B0D16; }
        .dim { color: #8A93B8; } .cy { color: #22D3EE; } .vi { color: #9F7BFF; } .bl { color: #4AA8FF; }
        .am { color: #FFB454; } .mg { color: #FF2E88; } .ok { color: #4ADE80; }
`;

export const KIT_JS = `
          function el(tag, cls, parent, html) {
            var n = document.createElement(tag);
            if (cls) n.className = cls;
            if (html != null) n.innerHTML = html;
            if (parent) parent.appendChild(n);
            return n;
          }
          function L(t) { return t - F; }
          function rng(seed) {           /* deterministic pseudo-random, mulberry32 */
            var a = seed >>> 0;
            return function () {
              a |= 0; a = (a + 0x6D2B79F5) | 0;
              var t = Math.imul(a ^ (a >>> 15), 1 | a);
              t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
              return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
            };
          }

          (function buildBed() {
            var rain = document.getElementById("rain");
            for (var c = 0; c < 14; c++) {
              var col = el("div", "col", rain);
              col.style.left = (70 + c * 132) + "px";
              col.style.backgroundPosition = "0 " + ((c * 97) % 30) + "px";
              col.style.opacity = String(0.4 + ((c * 37) % 50) / 100);
            }
            var gut = document.getElementById("gutter");
            for (var g = 1; g <= 40; g++) el("div", g === 1 ? "cur" : null, gut, String(g).padStart(2, "0"));
          })();

          /* group windows are LOCAL seconds (0 = this frame's first instant). The hide
             lands 20ms early so a sample on a boundary never sees two groups live. */
          function groups(tl, wins) {
            wins.forEach(function (w) {
              tl.set(w[0], { autoAlpha: 1, visibility: "visible" }, w[1]);
              if (w[2] != null) tl.set(w[0], { autoAlpha: 0, visibility: "hidden" }, w[2] - 0.02);
            });
          }

          /* streaming lyric in the bottom-left block: ONE en + ONE zh element, absolute
             textContent swaps + a clip-path wipe for the type-on feel.

             Three rules here are load-bearing, all learned the hard way from the
             frame-by-frame sync audit (tools/sync-check.py + tools/vocal-probe.py):
             1. a line's HIDE may never land after the next line's SHOW. Both writes
                target the same element, so an overlap silently blanks the next line
                for its whole window (that is what ate TROIS at 159.657).
             2. the WHOLE line must be readable by the time the singer starts it, not
                just its first letter. The wipe used to run up to 0.45 s, so the tail
                of every caption arrived after the word was already sung — a median
                +0.33 s (max +0.57 s) on the last character, which at this song's 136
                BPM is a whole beat late and reads as the subtitles trailing the
                music. Now LEAD (<=0.18 s) buys the time the wipe (<=0.18 s,
                front-loaded) spends drawing, so reveal ends at or before the stamp.
             3. a line may open up to LEAD before its own stamp, but only into the
                silence its predecessor left — sub-editors place the swap slightly
                ahead of the entry so the eye is already on the word. */
          function lyric(tl, cues) {
            var en = document.getElementById("lyr_en");
            var zh = document.getElementById("lyr_zh");
            var meta = document.getElementById("lyr_n");
            var ticks = document.getElementById("lyr_ticks");
            var dot = document.getElementById("lyr_dot");
            var LEAD = 0.18;
            var PLAIN = { fontSize: "40px", fontFamily: '"Cascadia Mono", Consolas, monospace', color: "#F5F7FF", letterSpacing: "0px", lineHeight: "1.28" };
            var CAPS = { fontSize: "62px", fontFamily: '"Bahnschrift", "Arial Black", sans-serif', color: "#9F7BFF", letterSpacing: ".02em", lineHeight: "1.1" };
            cues.forEach(function (q) { el("i", null, ticks, "<b></b>"); });
            var dots = ticks.querySelectorAll("b");
            var t0s = cues.map(function (q, i) {
              var room = i > 0 ? q.t - (cues[i - 1].t + cues[i - 1].dur) : 1;
              return Math.max(0, L(q.t) - Math.min(LEAD, Math.max(0, room - 0.02)));
            });
            cues.forEach(function (q, i) {
              var t0 = t0s[i];
              var next = i + 1 < cues.length ? t0s[i + 1] : null;
              var tHide = Math.min(L(q.t + q.dur), next == null ? Infinity : next);
              tl.set(en, Object.assign({ textContent: q.en, autoAlpha: 1 }, q.caps ? CAPS : PLAIN), t0);
              tl.set(zh, { textContent: q.zh, autoAlpha: 1 }, t0);
              tl.set(meta, { textContent: "LYRIC " + String(i + 1).padStart(2, "0") + "/" + String(cues.length).padStart(2, "0") }, t0);
              tl.set(dots[i], { visibility: "visible" }, t0);
              tl.fromTo(en, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: Math.min(0.18, Math.max(0.07, q.dur * 0.12)), ease: "power1.out" }, t0);
              if (q.caps) tl.fromTo(en, { scale: 1.14 }, { scale: 1, duration: 0.24, ease: "power3.out" }, t0);
              tl.set(en, { autoAlpha: 0 }, tHide);
              tl.set(zh, { autoAlpha: 0 }, tHide);
              if (dot) tl.to(dot, { y: (i / Math.max(1, cues.length - 1)) * 206, duration: 0.4, ease: "power2.inOut" }, t0);
            });
          }

          /* status strip telemetry / run-state steps: [[trackT, telemetry, state|null], ...] */
          function chrome(tl, steps) {
            steps.forEach(function (s) {
              if (s[1] != null) tl.set("#sb_tel", { textContent: s[1] }, L(s[0]));
              if (s[2] != null) tl.set("#sb_state", { textContent: s[2] }, L(s[0]));
            });
          }
          /* animated counter: fmt(value) -> text.
             The write goes through a property SETTER, not an onUpdate callback:
             the renderer seeks frame by frame, and gsap seek() suppresses
             callbacks while still applying values — an onUpdate-driven number
             would sit at its start value in the finished video. */
          function count(tl, sel, from, to, at, dur, fmt) {
            var node = document.querySelector(sel);
            var cur = from;
            var o = {};
            Object.defineProperty(o, "v", {
              configurable: true,
              get: function () { return cur; },
              set: function (x) { cur = x; node.textContent = fmt(x); }
            });
            node.textContent = fmt(from);
            tl.to(o, { v: to, duration: dur, ease: "none" }, L(at));
          }
          /* the whiteout: the chrome (rail labels, gutters, status, rain) blanks for the
             flash and comes back together at backAt. #lyr is deliberately NOT part of it:
             #flash paints above the lyric block, so hiding the caption would only push its
             onset off the sung beat (it ate the title cue at 16.0). The line stays scheduled
             and is simply revealed as the flash fades. */
          function whiteout(tl, at, backAt) {
            tl.set(".gutter, .statusbar, #rain, .actlabel", { autoAlpha: 0 }, L(at));
            tl.to("#flash", { opacity: 1, duration: 0.04, ease: "none" }, L(at));
            tl.to("#root", { x: 14, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, L(at));
            tl.to("#flash", { opacity: 0, duration: 0.45, ease: "power2.out" }, L(at + 0.3));
            tl.set(".gutter, .statusbar, #rain, .actlabel", { autoAlpha: 1 }, L(backAt));
          }
          function capsPunch(tl, sel, at, color) {
            tl.fromTo(sel, { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 1, scale: 1, duration: 0.22, ease: "power3.out" }, L(at));
            if (color) tl.set(sel, { color: color }, L(at));
          }
          function bedDrift(tl) {
            tl.to("#rain .col", { y: 1200, duration: SPAN, ease: "none", stagger: { each: 0.35, from: "start" } }, 0);
          }

          /* ---- graphics helpers ---- */
          /* stroke draw-on: every [data-draw] path carries pathLength="1" */
          function drawOn(tl, scope, at, dur, staggerEach) {
            var q = document.querySelectorAll(scope + " [data-draw]");
            gsap.set(q, { strokeDasharray: 1, strokeDashoffset: 1 });
            tl.to(q, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut", stagger: staggerEach || 0.08 }, L(at));
          }
          /* fill bloom after the line work lands */
          function bloomIn(tl, scope, at, dur, target) {
            var q = document.querySelectorAll(scope + " [data-bloom]");
            gsap.set(q, { autoAlpha: 0 });
            tl.to(q, { autoAlpha: target == null ? 0.9 : target, duration: dur, ease: "sine.inOut", stagger: 0.06 }, L(at));
          }
          /* scale kick on each beat (track seconds in) */
          function beatKick(tl, sel, beats, scale) {
            beats.forEach(function (b) {
              tl.to(sel, { scale: scale == null ? 1.06 : scale, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out" }, L(b));
            });
          }
          /* opacity flash on each beat */
          function beatGlow(tl, sel, beats, peak) {
            beats.forEach(function (b) {
              tl.to(sel, { opacity: peak == null ? 0.9 : peak, duration: 0.09, yoyo: true, repeat: 1, ease: "sine.out" }, L(b));
            });
          }
          /* drifting particle field inside a host box */
          function particles(tl, hostSel, n, seed, w, h) {
            var host = document.querySelector(hostSel);
            var r = rng(seed);
            for (var i = 0; i < n; i++) {
              var p = el("div", "pt", host);
              var x = r() * w, y = r() * h;
              p.style.left = x + "px"; p.style.top = y + "px";
              p.style.opacity = "0";
              if (i % 4 === 0) p.style.background = "#9F7BFF";
              if (i % 7 === 0) p.style.background = "#4AA8FF";
              tl.to(p, { opacity: 0.35 + r() * 0.5, duration: 0.8 + r(), ease: "sine.inOut" }, r() * SPAN * 0.5);
              tl.to(p, { x: (r() - 0.5) * 220, y: (r() - 0.5) * 180, duration: SPAN, ease: "sine.inOut" }, 0);
              tl.to(p, { opacity: 0, duration: 1.2, ease: "sine.in" }, SPAN - 1.4 - r());
            }
          }
          /* dancing spectrum bars, period locked to the beat grid */
          function spectrum(tl, hostSel, n, beatSec, height) {
            var host = document.querySelector(hostSel);
            host.style.height = height + "px";
            for (var i = 0; i < n; i++) {
              var b = el("i", null, host);
              var period = beatSec * (1 + (i % 4) * 0.5);
              var peak = 0.25 + ((i * 37) % 70) / 100;
              gsap.set(b, { scaleY: 0.12 });
              tl.to(b, { scaleY: peak, duration: period / 2, ease: "sine.inOut", yoyo: true,
                repeat: Math.max(1, Math.floor(SPAN / period) * 2 - 1) }, (i % 5) * 0.06);
            }
          }
          /* collapse -> open for [data-ang] parts (fan ribs, dial needles, clock hands):
             each part's final angle lives in markup; we tween rotation from the closed angle */
          function spinFrom(tl, scope, at, dur, closed, staggerEach) {
            var q = document.querySelectorAll(scope + " [data-ang]");
            q.forEach(function (n, i) {
              var a = parseFloat(n.getAttribute("data-ang"));
              /* set-then-tween, never fromTo: GSAP resolves svgOrigin against the
                 element's live matrix, so a fromTo shears each part off on its own */
              var piv = n.getAttribute("data-piv") || "100 100";
              gsap.set(n, { rotation: closed - a, svgOrigin: piv });
              tl.to(n, { rotation: 0, duration: dur, ease: "power3.inOut", svgOrigin: piv },
                L(at) + i * (staggerEach || 0.035));
            });
          }
          /* the mirror: open -> collapsed. The parts start in their markup pose
             (rotation 0) and are folded onto the closed angle, one after the other. */
          function spinTo(tl, scope, at, dur, closed, staggerEach) {
            var q = document.querySelectorAll(scope + " [data-ang]");
            q.forEach(function (n, i) {
              var a = parseFloat(n.getAttribute("data-ang"));
              var piv = n.getAttribute("data-piv") || "100 100";
              tl.to(n, { rotation: closed - a, duration: dur, ease: "power3.inOut", svgOrigin: piv },
                L(at) + i * (staggerEach || 0.035));
            });
          }
          /* light up grid cells one by one (.hc heat cells / .kv cells / .tk tokens) */
          function cellsOn(tl, scope, sel, at, each, peak) {
            var q = document.querySelectorAll(scope + " " + sel);
            q.forEach(function (n, i) {
              tl.to(n, { opacity: peak == null ? 0.85 : peak, duration: 0.12, ease: "power2.out" }, L(at) + i * each);
            });
          }
          /* evict: flash a cell then drop it to empty */
          function cellsEvict(tl, scope, sel, at, each) {
            var q = document.querySelectorAll(scope + " " + sel);
            q.forEach(function (n, i) {
              tl.to(n, { opacity: 0.95, duration: 0.08, ease: "power2.out" }, L(at) + i * each);
              tl.to(n, { opacity: 0.06, scaleY: 0.2, duration: 0.3, ease: "power2.in" }, L(at) + i * each + 0.22);
            });
          }

          /* ---- continuous behaviour: nothing on this film's stage ever sits still.
             Every motif gets an entrance AND a loop; the density bar is "pause anywhere
             and at least two things are moving", which these make structural. ---- */
          /* heartbeat: breathing scale+glow, repeats until the group is swapped out */
          function pulse(tl, sel, at, period, scale, reps) {
            tl.to(sel, { scale: scale == null ? 1.045 : scale, duration: period / 2, ease: "sine.inOut",
              yoyo: true, repeat: reps == null ? Math.max(1, Math.ceil((SPAN - (at - F)) / period) - 1) : reps }, L(at));
          }
          /* hard on/off blink — cursors, status LEDs, warning lamps */
          function blink(tl, sel, at, period, reps) {
            var n = reps == null ? Math.max(1, Math.floor((SPAN - (at - F)) / period)) : reps;
            tl.to(sel, { opacity: 0.08, duration: period / 2, ease: "steps(1)", yoyo: true, repeat: n * 2 - 1 }, L(at));
          }
          /* endless rotation about a point (world spin, orbit dot, dial needle).
             piv: "x y" in svg user units (uses svgOrigin) or any CSS origin like "50% 50%".
             A 0->360 tween restarts at the same visual angle each repeat, so it is seamless. */
          function orbit(tl, sel, at, period, turns, piv) {
            var svg = /^\s*[\d.]+\s+[\d.]+\s*$/.test(piv || "");
            var o = svg ? { svgOrigin: piv } : { transformOrigin: piv || "50% 50%" };
            o.rotation = (turns == null ? 1 : turns) * 360;
            o.duration = period; o.ease = "none";
            o.repeat = Math.max(0, Math.ceil((SPAN - (at - F)) / period) - 1);
            tl.to(sel, o, L(at));
          }
          /* a scan line sweeping across a panel, top to bottom, again and again */
          function sweep(tl, sel, at, period, dist, reps) {
            tl.fromTo(sel, { y: 0 }, { y: dist, duration: period, ease: "none",
              repeat: reps == null ? Math.max(1, Math.ceil((SPAN - (at - F)) / period) - 1) : reps }, L(at));
          }
          /* a charge running along a wire: dot travels the given dx/dy, then resets */
          function travel(tl, sel, at, dur, dx, dy, reps) {
            tl.fromTo(sel, { x: 0, y: 0, opacity: 0 },
              { x: dx, y: dy, opacity: 1, duration: dur, ease: "power1.inOut" }, L(at));
            tl.to(sel, { opacity: 0, duration: dur * 0.35, ease: "power1.in" }, L(at) + dur * 0.8);
            if (reps > 1) {
              tl.fromTo(sel, { x: 0, y: 0, opacity: 0 },
                { x: dx, y: dy, opacity: 1, duration: dur, ease: "power1.inOut", repeat: reps - 1 }, L(at) + dur * 1.2);
            }
          }
          /* slow wander so a whole assembly never looks parked */
          function drift(tl, sel, at, dx, dy, period) {
            tl.to(sel, { x: dx, y: dy, duration: period / 2, ease: "sine.inOut", yoyo: true,
              repeat: Math.max(1, Math.ceil((SPAN - (at - F)) / period) * 2 - 1) }, L(at));
          }

          /* ---- MECHANISMS. A lyric is an ACTION, so a motif may not merely arrive:
             it has to change STATE. Every helper below leaves the part in its new
             position for the rest of the act, and every one is a plain property
             tween, which is what makes it survive the renderer's frame-by-frame seek.
             Set the BEFORE state with gsap.set at build time, tween to AFTER. ---- */
          /* throw a lever / blade / breaker about an exact svg user-space pivot */
          function lever(tl, sel, at, from, to, piv, dur, ease) {
            gsap.set(sel, { rotation: from, svgOrigin: piv });
            tl.to(sel, { rotation: to, duration: dur == null ? 0.3 : dur,
              ease: ease || "back.out(2.2)" }, L(at));
          }
          /* two halves slide shut from either side (shield closing, brackets meeting) */
          function clamp(tl, selA, selB, at, dx, dur) {
            gsap.set(selA, { x: -dx }); gsap.set(selB, { x: dx });
            tl.to(selA, { x: 0, duration: dur || 0.42, ease: "power3.inOut" }, L(at));
            tl.to(selB, { x: 0, duration: dur || 0.42, ease: "power3.inOut" }, L(at));
          }
          /* push a part home into a slot: it starts offset by dx/dy and clicks in */
          function insert(tl, sel, at, dx, dy, dur) {
            gsap.set(sel, { x: dx, y: dy });
            tl.to(sel, { x: 0, y: 0, duration: dur || 0.45, ease: "power2.out" }, L(at));
          }
          /* a piece falls from h px above, lands, squashes and settles */
          function drop(tl, sel, at, h, land) {
            var t = L(at), f = land || 0.42;
            gsap.set(sel, { y: -h });
            tl.to(sel, { y: 0, duration: f, ease: "bounce.out" }, t);
            tl.to(sel, { scaleX: 1.12, scaleY: 0.86, duration: 0.06, ease: "power1.out",
              transformOrigin: "50% 100%" }, t + f);
            tl.to(sel, { scaleX: 1, scaleY: 1, duration: 0.24, ease: "power2.out" }, t + f + 0.07);
          }
          /* press a button: sink, hold, spring back */
          function press(tl, sel, at, piv, depth) {
            var svg = /^\s*[\d.]+\s+[\d.]+\s*$/.test(piv || "");
            var o = svg ? { svgOrigin: piv } : { transformOrigin: piv || "50% 50%" };
            var d = depth == null ? 0.84 : depth;
            tl.to(sel, Object.assign({ scale: d, duration: 0.1, ease: "power2.in" }, o), L(at));
            tl.to(sel, Object.assign({ scale: 1, duration: 0.36, ease: "back.out(3)" }, o), L(at) + 0.11);
          }
          /* slam a seal down from above; it lands and stays landed */
          function stamp(tl, sel, at, fromY, rot) {
            gsap.set(sel, { y: -(fromY || 150), rotation: rot == null ? -14 : rot, scale: 1.3, autoAlpha: 0 });
            tl.set(sel, { autoAlpha: 1 }, L(at));
            tl.to(sel, { y: 0, rotation: 0, scale: 1, duration: 0.24, ease: "power3.in" }, L(at));
          }
          /* iris opening: every matched blade starts stacked at the centre and flies
             outward to its own angle, which is what "the aperture opened" looks like */
          function aperture(tl, sel, at, dist, dur) {
            var q = document.querySelectorAll(sel);
            Array.prototype.forEach.call(q, function (n, i) {
              var a = (i / q.length) * Math.PI * 2;
              gsap.set(n, { x: 0, y: 0 });
              tl.to(n, { x: Math.sin(a) * dist, y: -Math.cos(a) * dist,
                duration: dur || 0.55, ease: "power2.inOut" }, L(at));
            });
          }
          /* type a line of stage text: a mask slides off it left-to-right while a
             cursor runs ahead. Callback-rewritten text is dead under seek, so the
             reveal is geometric. */
          function typeIn(tl, sel, at, dur, cursorSel, w) {
            gsap.set(sel, { clipPath: "inset(0 100% 0 0)", autoAlpha: 1 });
            tl.to(sel, { clipPath: "inset(0 0% 0 0)", duration: dur, ease: "none" }, L(at));
            if (cursorSel) {
              gsap.set(cursorSel, { autoAlpha: 0 });
              tl.set(cursorSel, { autoAlpha: 1 }, L(at));
              tl.to(cursorSel, { x: w == null ? 0 : w, duration: dur, ease: "none" }, L(at));
              tl.set(cursorSel, { autoAlpha: 0 }, L(at) + dur + 0.2);
            }
          }
          /* wire up: a stroke goes from dead to live, and stays live */
          function energize(tl, sel, at, to, dur) {
            tl.to(sel, { stroke: to, duration: dur || 0.25, ease: "none" }, L(at));
          }
          /* same for a filled part: an LED, a cell, a gauge puck */
          function energizeFill(tl, sel, at, to, dur) {
            tl.to(sel, { fill: to, duration: dur || 0.2, ease: "none" }, L(at));
          }
          /* a level filling up (or draining) along x: geometric, so it survives seek */
          function fillX(tl, sel, at, dur, hideFrom, hideTo) {
            var a = hideFrom == null ? 100 : hideFrom, b = hideTo == null ? 0 : hideTo;
            gsap.set(sel, { clipPath: "inset(0 " + a + "% 0 0)" });
            tl.to(sel, { clipPath: "inset(0 " + b + "% 0 0)", duration: dur, ease: "none" }, L(at));
          }
          /* and along y, filling from the floor of the box up */
          function fillY(tl, sel, at, dur, hideFrom, hideTo) {
            var a = hideFrom == null ? 100 : hideFrom, b = hideTo == null ? 0 : hideTo;
            gsap.set(sel, { clipPath: "inset(" + a + "% 0 0 0)" });
            tl.to(sel, { clipPath: "inset(" + b + "% 0 0 0)", duration: dur, ease: "none" }, L(at));
          }
          /* erase: a whole part is wiped away and gone for the rest of the act */
          function erase(tl, sel, at, dur, dir) {
            var open = { x: "inset(0 0% 0 0)", y: "inset(0 0 0 0)" }[dir || "x"];
            var shut = { x: "inset(0 0% 0 100%)", y: "inset(100% 0 0 0)" }[dir || "x"];
            gsap.set(sel, { clipPath: open });
            tl.to(sel, { clipPath: shut, duration: dur || 0.5, ease: "power2.inOut" }, L(at));
          }
          /* damped shake — an impact, a rejected write */
          function shake(tl, sel, at, amp, dur) {
            var a = amp == null ? 9 : amp, step = (dur == null ? 0.5 : dur) / 6;
            [a, -a * 0.72, a * 0.5, -a * 0.32, a * 0.16, 0].forEach(function (x, i) {
              tl.to(sel, { x: x, duration: step, ease: "power1.out" }, L(at) + i * step);
            });
          }
          /* one-frame slam of the whole camera on a hard accent */
          function jerk(tl, at, dx) {
            tl.to("#root", { x: dx == null ? 11 : dx, duration: 0.045, yoyo: true, repeat: 3, ease: "none" }, L(at));
          }
          /* a short full-frame flash that keeps the chrome (the climax's hard cuts) */
          function slash(tl, at, peak) {
            tl.to("#flash", { opacity: peak == null ? 0.8 : peak, duration: 0.035, ease: "none" }, L(at));
            tl.to("#flash", { opacity: 0, duration: 0.1, ease: "power2.out" }, L(at) + 0.04);
          }
          /* a ring shockwave that leaves nothing behind: the visible proof something HIT */
          function pop(tl, sel, at, scale, dur) {
            gsap.set(sel, { autoAlpha: 0 });
            tl.set(sel, { autoAlpha: 1, scale: 0.22, opacity: 1 }, L(at));
            tl.to(sel, { scale: scale == null ? 1.6 : scale, opacity: 0,
              duration: dur || 0.7, ease: "power2.out" }, L(at));
          }
          /* mechanical index step: a hand / carriage jumping in equal clicks */
          function tickTo(tl, sel, at, angle, steps, dur, piv) {
            var svg = /^[\d. ]+$/.test(piv || "");
            var o = { rotation: angle, duration: dur || 0.42,
              ease: "steps(" + (steps == null ? 6 : steps) + ")",
              svgOrigin: svg ? piv : null, transformOrigin: svg ? null : (piv || "50% 50%") };
            if (!svg) delete o.svgOrigin; else delete o.transformOrigin;
            tl.to(sel, o, L(at));
          }
          /* A dial needle that really turns. These motifs are emitted inside a scaling
             <g>, and GSAP's svgOrigin mis-resolves through it (the hand lands half the
             frame away), so the tip is swept by tweening its ATTRIBUTES instead.
             lineSel targets the needle <line>; dotSel, if given, its tip <circle>. */
          function needleTick(tl, lineSel, dotSel, at, angle, steps, dur, px, py, r) {
            var n = steps == null ? 6 : steps, d = (dur == null ? 0.42 : dur) / n;
            for (var k = 1; k <= n; k++) {
              var a = (angle * k / n) * Math.PI / 180;
              var x = +(px + r * Math.sin(a)).toFixed(1);
              var y = +(py - r * Math.cos(a)).toFixed(1);
              tl.to(lineSel, { attr: { x2: x, y2: y }, duration: d, ease: "none" }, L(at) + (k - 1) * d);
              if (dotSel) tl.to(dotSel, { attr: { cx: x, cy: y }, duration: d, ease: "none" }, L(at) + (k - 1) * d);
            }
          }
          /* a row being thrown out of the rack: lift, fly, disappear */
          function eject(tl, sel, at, dx, dy, dur) {
            var t = L(at), f = dur || 0.55;
            tl.to(sel, { x: dx, y: dy, opacity: 0.15, scale: 0.9, duration: f,
              ease: "power2.in" }, t);
            tl.set(sel, { autoAlpha: 0 }, t + f);
          }
          /* an part arriving with real weight: overshoot, then settle */
          function settle(tl, sel, at, fromScale, dur) {
            gsap.set(sel, { scale: fromScale == null ? 1.35 : fromScale });
            tl.to(sel, { scale: 1, duration: dur || 0.45, ease: "back.out(2.4)" }, L(at));
          }
`;
