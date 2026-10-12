# HANDOFF.md — 《world.execute(me);》MV 交接提示词包

> 用法：把下面 **P0 → P1 → P2 → P3 → P4** 五段按顺序、一次性贴给接手的模型（可以作为一条长消息，也可以拆成 5 条连发）。
> 之后每做一幕，贴 **P5** 的模板并填好幕号。
> **P6 是门禁**，任何模型都不得越过。
> 附录 A/B/C 是事实清单，模型遇到疑问先查这里，不要重新摸索。

---

## P0 · 主任务（必贴）

你要接手一支 HyperFrames MV 的制作，工程已经搭好，前 3 幕已经用新视觉系统重做过，第 4–12 幕还是旧版本，需要重做。

- 工程目录：`D:\Document\AIVedio\projects\world-execute-me`（Windows，shell 是 Git Bash）
- 片子：Mili《world.execute(me);》MV，时长 220s，1920×1080，BGM 就是这首歌本身，**画面严格跟着歌词和节拍走**。
- 主角：歌里那个「我」= 千问娘 **Qwen3.8**（注意：不是 Qwen3.8Max，用户已明确要求改名，屏上所有出现处都要改）。
- 项目根目录有 `AGENTS.md`（HyperFrames 工程规则）、`BRIEF.md`（创作意图）、`PLAN.md`、`STORYBOARD.md`（逐幕分镜，52KB，已写好每幕的画面设想）、`frame.md`（视觉设计规范：配色/字体/间距/资产清单）。**开工前必须先读 `STORYBOARD.md` 里对应那一幕的段落和 `frame.md`**，你的任务是把它实现出来，不是另起炉灶。
- 先加载 skill：`/hyperframes-core`、`/hyperframes-animation`、`/hyperframes-cli`（本工程 AGENTS.md 要求）。

**用户已经明确否掉的东西（再犯就是返工）：**
1. 歌词不能放在屏幕右侧 → 必须回到**左下角、左对齐**。当前代码里歌词在右栏，这是待改项。
2. 歌词变色（caps 强调态）后失去左对齐、溢出屏幕 → 必须修（transform-origin 用左侧）。
3. 「动画几乎没有，就是几个标志放出来」→ 每幕必须有**持续运动的画面叙事**，不是静态图标依次亮起。
4. 「不可以只用文字展示一下就糊弄过去」→ **每一句歌词都要用图形把它画出来**（例：唱到茄子就画一个符合全片风格的茄子，不是 emoji，不是文字）。
5. 「那几个标志违和感很强」→ 图形必须和全片风格统一（同一套描边粗细/圆角/辉光/配色/HUD 外框）。
6. 「你的角色画的是真的一言难尽」→ 角色立绘必须重画，**至少要像她**（参考仓库见 P3）。

**工作方式（用户对时间和 token 成本敏感）：**
- 不要自己摸索验证手段，直接用 P4 给的可信路径；不要重复踩附录 B 的坑。
- 批量生成、一次跑一遍 `npm run check`，不要每改一行就全量 check。
- 每完成一幕，**停下**，告诉用户「第 N 幕已就绪，请在 Studio 里拖到 X 秒看」，等用户确认再做下一幕。
- 不许渲染（见 P6）。

---

## P1 · 工程事实与命令

```bash
cd "D:/Document/AIVedio/projects/world-execute-me"
node tools/build-frames.mjs        # 由 spec 生成 compositions/frames/*.html（唯一正确的改画面方式）
npm run check                      # lint + runtime + layout + motion + contrast
npx hyperframes preview --background   # 起 Studio（agent 安全模式，别用 npm run dev）
npx hyperframes preview --status       # 确认还活着
npx hyperframes preview --stop         # 评审结束再停
```

- **绝对不要手改 `compositions/frames/*.html`**：它们是生成物，改一次就被下次生成覆盖。改画面 = 改 `tools/kit.mjs`（全局视觉/动效）或 `tools/spec/fNN.mjs`（单幕内容）或 `tools/motifs.mjs`（图形库），然后跑 `node tools/build-frames.mjs`。
- 新生成的一幕要挂上去，必须在 `tools/frames-spec.mjs` 里 import 并加进 `FRAMES` 数组（现在只有 F01/F02/F03，所以 04–12 还是旧文件）。
- `index.html` 是根合成：12 个 `class="frame"` clip 在 track 1，`<audio src="assets/bgm.mp3">` 在 track 11，`data-duration="220"`。GSAP 是本地 vendor（`assets/vendor/gsap.min.js` + `MotionPathPlugin.min.js`，已在 index.html 里 registerPlugin）——**这个环境访问不了外网 CDN，不要引入任何远程资源**。
- 12 幕的时间轴（track 秒，start / duration）：
  `01-f01-boot 0 / 17.136`、`02-f02-reveal 17.136 / 12.539`、`03-f03-geometry 29.675 / 14.327`、`04-f04-current 44.002 / 15.255`、`05-f05-chorus1 59.257 / 14.745`、`06-f06-tender 74.002 / 14.443`、`07-f07-roleflip 88.445 / 15.116`、`08-f08-eviction 103.561 / 14.745`、`09-f09-collapse 118.306 / 17.02`、`10-f10-execution 135.326 / 27.005`、`11-f11-love 162.331 / 29.001`、`12-f12-exit 191.332 / 28.668`
- 数据源：
  - `audiomap.json` → `grid.beats_sec` / `grid.downbeats_sec`，136 BPM，一拍 0.4412s。
  - `cues.json` → 129 条歌词 cue，字段 `{i,t,end,dur,en,zh,caps,frame,held,pulled}`；`frame` 的值形如 `f01-boot`，而合成 id 是 `01-f01-boot`（`tools/spec/util.mjs` 的 `C(id)` 已经处理了前缀差异，直接 `C(ID)` 用）。最长英文句 34 字符；49 条是 `caps:true`（都是短单词，如 EXECUTION / DISHEARTENED）。
- 环境坑：`curl https://raw.githubusercontent.com/...` 在本机会超时（exit 28）；GitHub MCP 列目录可用、读单文件曾误报 `-32602`；ImageGen 配额 403 用不了 → **角色资产只能手写 SVG**。

---

## P2 · 代码架构与不可违反的约定

```
tools/kit.mjs          PAL 配色 + KIT_CSS（布局分区/底层床/图形样式/歌词栏）+ KIT_JS（所有动效 helper）
tools/motifs.mjs       ~45 个 SVG 图形动机 M.xxx(size)，含 helpers svg/d/ln/ci/bl/dot/pt
tools/build-frames.mjs validate(f) 校验器 + render(f) 模板拼装（图层顺序见下）
tools/spec/util.mjs    C(id) 取本幕 cue、meta、beats(a,b)、downbeats(a,b)、at(left,top,inner,extra) 定位
tools/spec/fNN.mjs     每幕的 spec：{id,start,span,actTitle,glow,cues,groups:[{id,html,css}],js}
tools/frames-spec.mjs  聚合 FRAMES 数组
tools/build-motif-sheet.mjs → .dev/motif-sheet.html    静态图形总表（美术评审用）
```

**时间约定（最重要，违反就整幕卡死）：**
- `groups(tl, wins)` 的窗口是**本幕局部秒**（0 = 本幕第一帧）。
- 传给**其它所有** kit helper 的时间是**全片 track 秒**（helper 内部用 `L(t)=t-F` 自己减偏移）。
- `build-frames.mjs` 的 `validate()` 会强制检查：窗口必须铺满 `[0,span]`、不重叠、第一个从 0 开始、最后一个开放结尾、每个声明的 group 都要被显示、cue 必须落在本幕范围内；违反直接 `exit 1`。**不要绕过校验器。**

**图层顺序（render() 里固定，别改）：** glow / rain / gridfloor / scan / vig（这五个是装饰，必须在内容之下，且带 `data-layout-ignore`）→ `.stage`（各幕 group）→ `.lyr` 歌词栏 → `.actlabel` → `.gutter` → `.statusbar` → `.flash`。

**图形标记约定（motifs 与 helper 的接口）：**
- 描边件带 `data-draw` + `pathLength="1"` → `drawOn(tl, scope, at, dur, staggerEach)` 走 strokeDashoffset 1→0。
- 填充件带 `data-bloom` → `bloomIn(tl, scope, at, dur, target)`。
- 可旋转件带 `data-ang`（最终角度）+ `data-piv`（svg 旋转中心）→ `spinFrom(tl, scope, at, dur, closed, staggerEach)`（扇骨、指针、表针用）。
- 网格 cell 的 class 必须是 `kvc` / `hcc` / `tkc` / `lgb` → `cellsOn` / `cellsEvict`。（曾因用了 `.cell`/`.lb` 这种通用名和样式表撞车，图形被撑成巨块。）

**可用 helper 一览（KIT_JS）：** `el, L, rng(seed)（mulberry32，禁用 Math.random）, buildBed, groups, lyric, chrome, count, whiteout, capsPunch, bedDrift, drawOn, bloomIn, beatKick, beatGlow, particles, spectrum, spinFrom, cellsOn, cellsEvict`。

**确定性渲染铁律：** 不许 `Date.now()`、不许 `Math.random()`（用 `rng(seed)`）、不许 CSS transition/animation（一律 GSAP timeline）、不许网络请求。

**check 的门禁细节：**
- lint 报错会让后面的 audit 全部失效，先清 lint。
- layout audit 的两个逃生口：装饰层加 `data-layout-ignore`；已标记的文本块允许压图加 `data-layout-allow-overlap`。
- motion audit 禁止动非 transform 属性（例如动 `top` 会报 `gsap_non_transform_motion`）→ 改动 `y`。
- 目前 01–03 的状态：0 error，1 条 advisory warning `composition_file_too_large`，contrast 25/25 通过。

---

## P3 · 视觉系统规范 + 必做整改项（含验收标准）

配色 `PAL`：底 `V #06070C / VS #0B0D16 / VE #12162A / HL #1E2540`；主色 `Q1 #615CED / Q2 #9F7BFF / Q3 #4AA8FF / DA #22D3EE`；文字 `INK #F5F7FF / DIM #8A93B8`；强调 `MG #FF2E88 / AM #FFB454 / OK #4ADE80`。
字体：英文/等宽 `Cascadia Mono`，强调大字 `Bahnschrift`，中文 `Microsoft YaHei`。全部 `local()`，不许外链。

**整改 1 — 歌词回到左下角、左对齐。**
- 现在 `KIT_CSS` 里 `.lyr { left:1190px; right:64px; top:250px; bottom:180px }`（右栏），`.stage { left:96px; top:96px; width:1054px; height:800px }`。要改成：歌词占据**左下横条**，stage 让出这块区域，两者**不许相交**（相交就会重演「歌词压图」的老问题）。
- 建议几何（可自行微调，但必须写进 kit.mjs 顶部的布局契约注释）：`.lyr { left:96px; top:796px; width:1180px; height:200px }`；`.stage { left:96px; top:88px; width:1728px; height:690px }`；statusbar 仍占 y 1022–1080。歌词条右侧 x 1276–1824 / y 796–996 空着，可放遥测小板。
- 最长英文句只有 34 字符，1180px 宽绰绰有余，**任何情况下都不许换行溢出**。

**整改 2 — caps 强调态不许破坏左对齐。**
- `lyric()` 里 caps 的入场是 `tl.fromTo(en,{scale:1.14},{scale:1,...})`，默认 transform-origin 在中心 → 放大时向左也扩，看起来就是「变色后不左对齐、超出屏幕」。
- 修法：给 `#lyr_en` 固定 `text-align:left`，caps punch 显式加 `transformOrigin:"0 50%"`（`capsPunch` 同理）。字号切换用 `set` 没问题，但**容器左边缘必须钉死不动**。

**整改 3 — 动画密度。**
验收标准：任意时刻暂停，画面里至少有 2 个东西在动；每句歌词都对应一个**画出来的**图形动作（不是文字、不是图标闪现）。手段：`beatKick`/`beatGlow` 挂到 beat 网格上、`particles`、`spectrum`、MotionPath 走线、`spinFrom`、`cellsOn/cellsEvict` 流水、镜头级 `x/y/scale/rotation` 缓推、层级视差、`count` 数字滚动、`chrome` 遥测跳变。平均一镜 6s，每镜 ≥2 个视觉层（这是用户长期要求）。

**整改 4 — 图形风格统一（去违和感）。**
所有 motif 共用：描边 2–2.6px、`stroke-linecap/linejoin: round`、`pathLength="1"`、只用 PAL 里的颜色、辉光统一走 `.gq1/.gq2/.gq3/.gda/.gmg/.gam/.gok` 这 7 个 drop-shadow 类、每个 motif 外面套同一个 HUD 边框（四角刻线 + 极淡底），让它们看起来是同一台界面里的东西而不是一堆贴纸。改完跑 `node tools/build-motif-sheet.mjs` 重新生成 `.dev/motif-sheet.html`，再用附录 B 里的 headless 截图法出一张总表自查。

**整改 5 — 重画角色（Qwen3.8）。**
- 现有资产 `assets/character/qwen38max-silhouette.svg`（720×1080，纯剪影 + 边缘光）被用户否掉：「一言难尽」「至少要像她」。另有 `qwen38max-sheet.png`（2×2 ImageGen 图，现在 ImageGen 已 403 无法再生成）。
- 参考仓库：`https://github.com/shuaizenge/ai-girls/tree/main/characters/qwen`，目录下有 `README.md`、`adult/`、`chibi/`；chibi 里有一张 `zipzippipe-BV1tE9XBbErS-53s.png`（997,530 bytes）。sha 固定的下载地址：
  `https://raw.githubusercontent.com/shuaizenge/ai-girls/2c2c029ac4c59e1ebc909788a64ce75df0cbe711/characters/qwen/chibi/zipzippipe-BV1tE9XBbErS-53s.png`
  （curl 在本机超时，用 GitHub MCP `get_file_contents` 或 WebFetch 抓 blob 页；抓到后**一定要用 Read 工具真的看图**再动笔，不要凭文字描述画。）
- 已确认的识别特征：**蓝紫长发、中式服装（立领 + 盘扣）、折扇、千问标识**。用户允许少细节，但**必须一眼是她**：建议保留脸部（至少眼睛/刘海轮廓），不要做纯黑剪影。
- 交付形式仍是 SVG（可被各幕 `<img>` 引用、可用 CSS 变量改色），文件名建议改成 `qwen38-silhouette.svg` 并同步所有引用（`tools/motifs.mjs` 的 `M.silhouette`、02/11/12 幕）。

**整改 6 — 改名 Qwen3.8。**
需要改的地方：`tools/build-frames.mjs` 里 statusbar 那行 `world.execute(me); · <b>Qwen3.8Max</b>`、`frame.md`、`BRIEF.md`、各幕 actlabel/标题里出现的名字、以及旧生成文件（重新生成即可覆盖）。改完全局 grep `Qwen3.8Max|qwen38max` 复查（`.hyperframes/preview/` 下的缓存文件可以忽略）。

---

## P4 · 验证手段可信度表（照这个做，别自己找路）

| 手段 | 可信度 | 说明 |
|---|---|---|
| `hyperframes snapshot` | ❌ 不可信 | 工具缺陷：把子合成 timeline 冻在 t=0，多幕工程截出来全是第一帧。**永远不要拿它当证据。** |
| Studio `/api/.../thumbnail/...` | ❌ 不可信 | 同样冻在 t=0。 |
| Studio 播放器 seek + 结构探针 | ✅ 可信 | `<hyperframes-player>` 的 shadowRoot 里是同源 iframe。用 `evaluate_script`：`const p=document.querySelector('hyperframes-player'); p.pause(); p.seek(t);` 然后读 `iframe.contentWindow.__timelines['01-f01-boot'].time()`、`[data-draw]` 的 `strokeDashoffset`、歌词元素的 `textContent`/computed style。Studio URL 支持 `?t=` 直接跳秒。 |
| 应用内浏览器截图 | ⚠️ 常失败 | 面板被隐藏时报 `NATIVE_BROWSER_VIEWPORT_UNAVAILABLE`。 |
| headless Edge 截图 | ✅ 仅限静态自包含页面 | 必须用**旧模式** `--headless`（`--headless=new` 遇到 iframe/websocket 会挂死）；`--screenshot=` 必须是**绝对路径**；页面用 `file:///` 打开（preview server **没有静态服务能力**，未知路径一律回落到 Studio SPA）。命令形如：`"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu --window-size=2080,1760 --screenshot="D:/.../snapshots/motif-sheet.png" "file:///D:/.../.dev/motif-sheet.html"` |
| `node tools/build-freeze.mjs <id>` + `bash tools/shoot-freeze.sh <id> <前缀> t...` | ✅ 逐幕像素证据（首选） | 生成自包含页 `.verify/freeze-<id>.html`（内联本地 GSAP，`?t=` 传**本幕局部秒**），headless Edge 出 `snapshots/<前缀>-t<t>.png`。`node tools/align-audit.mjs [id...]` 用同一套页面在全片每秒采样，报三类碰撞（文字压在角色上 / 压在歌词栏上 / 文字互相压）+ 溢出。 |
| 用户肉眼在 Studio 拖动 | ✅ 最终裁判 | 整体观感由用户判断，逐幕交付。 |

死路（已试过，别再走）：`.dev/harness.html` + `tools/shoot.sh`（preview server SPA 回落 + headless 挂死）、`tools/build-verify.mjs`（两级 verify 工程，snapshot 照样冻住）。**这三样连同各自的一次性产物已在 2026-10-12 的清理中删除**；同一批还删了 `snapshots/` 全部验证截图（只留 `face-grid/fanfit2/fanfit3/motif-sheet` 四张被文档引用的）、`.verify/`、`.thumbnails/`、`.dev/`，以及被 `tools/vocal-probe.py` + `tools/sync-check.py` 取代的 11 个旧测量脚本和弃用的角色描摹链（`trace-character.mjs` / `key-character.mjs`）。`.verify/` 由 `node tools/build-freeze.mjs <id>` 随时重建，已冒烟验证。

**只给 agent 用的临时页面一律放点目录**：`.verify/`（freeze 页、探针页、track-frames.json）、`.dev/`（motif-sheet / char-preview / harness 这类人看的静态页）。`hyperframes lint` 不扫点目录，所以调试产物不会混进验收报告；工程交付物只有 `index.html` + `compositions/`。

---

## P5 · 逐幕制作提示词模板（每幕贴一次）

```
现在做第 NN 幕 <id>（track start–end 秒，span X 秒，actTitle「...」）。

1. 先读 STORYBOARD.md 里第 NN 幕的段落、frame.md 的相关规范、以及 cues.json 中 frame="<key>" 的所有 cue（en/zh/caps/dur）。
2. 新建 tools/spec/fNN.mjs，导出 FNN，结构参照 tools/spec/f01.mjs：
   {id,start,span,actTitle,glow,cues:C(ID),groups:[{id,html,css}],js}
   并在 tools/frames-spec.mjs 里 import + 加进 FRAMES。
3. 本幕要逐句落实：每一句歌词 → 一个画出来的图形动作（列出你的「歌词 ↔ 画面」对照表给我看）。
   不允许只用文字糊弄；不允许静态图标依次亮起。
4. 时间约定：groups() 用局部秒，其它 helper 用 track 秒。跑 node tools/build-frames.mjs，validate 必须通过。
5. 动画密度：任意时刻 ≥2 个东西在动；把 beatKick/beatGlow 挂到 beats()/downbeats() 网格上。
6. 角色出场时引用重画后的 Qwen3.8 资产；屏上名字写 Qwen3.8。
7. npm run check 跑到 0 error（advisory warning 可留，但要说明）。
8. 用 P4 的 Studio 播放器探针在 <3 个关键秒> 验证画面真的在动、歌词左下左对齐无溢出。
9. 停下，告诉我：改了哪些文件、歌词↔画面对照表、我该拖到第几秒看、check 结果。**不要渲染，不要自动做下一幕。**
```

---

## P6 · 门禁与交付流程（不可越过）

1. **渲染门禁**：`npm run render` 只能在用户**明确批准**之后执行。用户此前已多次强调「先看预览、我说可以才渲染」。
2. **逐幕评审**：一幕一停，等用户确认。用户说「停一下」= 把当前这个原子步收尾就停，不要顺手多做。
3. **不要问一堆确认问题**：用户希望你自己按 P3 的默认决定推进；只有会影响整片结构的选择（例如改时长、改分镜顺序、改配色体系）才回头问。
4. **preview server 收尾**：评审结束后 `npx hyperframes preview --stop`（之前留了一个后台实例，PID 10232，接手后先 `--status` 查一下还在不在）。
5. 每幕完成后把状态更新到本文件附录 A。

---

## 附录 A · 进度快照（2026-10-12）

| 幕 | id | 状态 |
|---|---|---|
| 1 | 01-f01-boot | ✅ 新 kit 重做，check 绿；**但用户判定表现力不足，需按整改 3 重做** |
| 2 | 02-f02-reveal | ✅ 新 kit 重做，check 绿（此幕 17.1–29.7s 是纯器乐，无歌词，不是 bug） |
| 3 | 03-f03-geometry | ✅ 新 kit 重做，check 绿 |
| 4–12 | 04…12 | ❌ 仍是旧生成文件（旧 kit），未重做，未在 frames-spec.mjs 注册 |

全局待办（按优先级）：① 歌词移回左下 + 左对齐 + caps 溢出修复（kit.mjs）② 角色重画 ③ motif 风格统一 ④ 动画密度标准落到每一幕 ⑤ 改名 Qwen3.8 ⑥ 重做 01（作为新密度标杆）→ 逐幕 02–12 ⑦ 用户全片确认后才渲染。

## 附录 B · 踩过的坑（都已修，别回退）

- **整幕卡死**：`groups()` 里对窗口又减了一次帧偏移 → 窗口变负 → 被 clamp 到 0，画面不动、歌词不出。修法：窗口一律局部秒 + 加 `validate()`。
- **`cues: 0`**：cues.json 的 frame key 是 `f01-boot`，合成 id 是 `01-f01-boot` → `C()` 里 `id.replace(/^\d+-/,"")`。
- **`gsap_non_transform_motion`**：`#lyr_dot` 动了 `top` → 改动 `y`（0→642px）。
- **`text_occluded`**：`.vig`/`.scan` 压在文字上 → 装饰层移到内容层之下。
- **motif 被撑成巨块**：class 名 `.cell`/`.lb` 和总表样式撞车 → 改 `kvc/lgb/hcc/tkc`，并同步 f01/f02 的选择器。
- **KIT_JS 语法错误**：块注释里写了反引号，把外层模板字符串提前结束 → 注释里别用反引号。
- **snapshot/thumbnail 全一样**：不是我们的 bug，是工具把子 timeline 冻在 t=0（见 P4）。
- **误判 f02 是空 CUES 的 bug**：其实是纯器乐段。

## 附录 C · 我已替用户决定的默认值（用户若不同意，改这里）

1. 歌词条几何：左下 `left:96 / top:796 / width:1180 / height:200`，stage 收到 `top:88 / height:690 / width:1728`。
2. caps 强调态：只放大到 1.14、颜色 `#9F7BFF`、字体 Bahnschrift、`transformOrigin:"0 50%"`、**单行不换行**。
3. 角色刻画程度：半剪影 + 可见的眼睛与刘海轮廓 + 蓝紫长发 + 中式立领盘扣 + 折扇 + 千问标识辉光；纯 SVG，可用 CSS 变量改色。
4. motif 统一手段：共用描边/圆角/辉光类 + 统一 HUD 四角外框。
5. 交付节奏：先做 01 作为「新密度标杆」给用户看，通过后再批量推进 02–12。
