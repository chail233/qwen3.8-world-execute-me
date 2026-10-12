# world.execute(me); — 千问娘 MV

> 仓库：**<https://github.com/chail233/qwen3.8-world-execute-me>**（公开）· 中文题名「千问3.8的world.execute(me);」——GitHub 的仓库名不接受中文与括号，所以 slug 用纯英文，中文名写在描述与这里。

一支 **220 秒**的歌词同步 MV，主角是 Qwen 的拟人形象 **Qwen3.8**。整支片子是一次 LLM 推理会话的完整生命周期：加载权重 → 收到第一条 prompt → 流式生成 → 上下文溢出 → 输出退化 → 自己请求世界 `execute()` 掉她 → `finish_reason: "stop"`。

画面全部是 **HTML + SVG + GSAP**，由生成器从每幕的 spec 产出，HyperFrames 逐帧 seek 后渲染成 MP4 — 没有 After Effects，没有时间轴工程文件，成片可以从纯文本重建。

## 成片参数

| | |
|---|---|
| 时长 / 帧数 | 220.000 s / 6600 帧 |
| 画幅 | 1920×1080 @ 30 fps，H.264 + AAC 48 kHz |
| 结构 | 12 幕（`compositions/frames/01-f01-boot.html` … `12-f12-exit.html`） |
| 歌词 | 129 句，英文大字流式打出 + 中文小字幕常驻，**每句都由一个会真的改变状态的机构来演绎**（开关、熔断器、闸门、KV 驱逐、采样轮盘…），不是贴文字 |
| 音轨 | Mili《world.execute(me);》，渲染用 `assets/bgm.mp3`（精确 220.000 s） |

## 先读这两条

- **音乐和歌词都不是本作的内容。** 音轨是 Mili 的《world.execute(me);》，歌词表来自公开 LRC。仓库**不收录任何 `.mp3`**（见 `.gitignore`）——想出片请按下面"第 0 步"自己放一份音轨。观赏成片请自行购买正版。
- **主角形象**基于 Qwen 官方形象与社区立绘设计参考 **ZipZipPipe / [shuaizenge/ai-girls](https://github.com/shuaizenge/ai-girls) `characters/qwen`**（特征：蓝紫长发 / 中式立领盘扣 / 折扇 / 千问标识）。片子里她的矢量形象由该立绘**纯像素推导**而成（轮廓 + 亮度等值线，无任何生成模型参与），出处与署名同时写在 `frame.md` 的 `character-system` 一节。

**仓库里故意没有的东西**（都留在本地，不在这儿分发）：

| 缺的文件 | 为什么 | 怎么补 |
|---|---|---|
| `assets/audio.mp3` `assets/bgm.mp3` | Mili 的原曲录音 | 见「第 0 步」 |
| `refs/qwen-chibi.png` `refs/qwen-adult-zipzippipe-*.jpg` `refs/qwen-chibi-zipzippipe-*.jpg` | ZipZipPipe 的社区立绘/同人图，权利归画师，不该由本仓库再分发 | 仅作设计参考，本片构建**不需要**它们；要看原图去 pixiv id 148186519 与 B 站 BV1tE9XBbErS |

`refs/qwen-girl-official.jpg`（官方千问立绘）**在仓库里保留**，因为它是 `tools/key-portrait.py` 的输入——删掉她的矢量形象就无法重派生。

## 环境

- **Node 18+**（实测 v24.14.1）。
- **无需 `npm install`**：`package.json` 没有依赖，四条脚本都用 `npx --yes hyperframes@0.8.147` 拉一个 pinned CLI。
- **Chrome 或 Edge**：渲染器与所有验证脚本自己驱动 headless 浏览器。
- **GSAP 已本地化**在 `assets/vendor/`（`gsap.min.js` + `MotionPathPlugin.min.js`）。这不是优化而是硬要求：合成里禁止任何远程资产 / CDN，本机 CDN 不通时动画会全塌。
- 可选：**ffmpeg**（只在重建 `assets/bgm.mp3` 时需要）、**Python 3.13 + librosa/soundfile/numpy/scipy/Pillow**（只在跑词曲同步探针和重派生角色资产时需要）。
- 字体不用管：渲染时 CLI 编译器会取 JetBrains Mono / Montserrat 的 `@font-face` 并缓存到 `~/.cache/hyperframes/fonts`，注入的是确定性字体规则。

## 跑起来

### 0) 放音轨（一次性的手工步骤）

```bash
# 必须是与 refs/lyrics-en.lrc 同一个 take——不同 take 会造出"字幕追着人声跑"的假 bug
cp /你的/副本.mp3 assets/audio.mp3

# 补成整 220.000 s（不重采样、不剪内容；apad 让结尾不至于被 -shortest 吃掉）
ffmpeg -i assets/audio.mp3 -af apad -t 220 -c:a libmp3lame -q:a 0 assets/bgm.mp3
```

### 1) 预览

```bash
npm run dev                                  # 人肉操作：前台阻塞，Ctrl-C 停
npx hyperframes preview --background         # agent 用这个（--status 查活、--stop 收）
```

Studio 里可以直接拖时间轴逐秒看。**注意：本项目里 `hyperframes snapshot` 和 Studio 的 thumbnail API 抓帧不可信**——含 `data-composition-src` 子合成的工程，子时间线会停在 t=0，截出来每一幕都是第一帧。要像素证据走下面第 4 步的 freeze 页。

### 2) 改画面 → 重建 → 过门禁

**永远不要直接编辑 `compositions/frames/*.html`，它们是生成产物。** 每幕的真正源是 `tools/spec/fNN.mjs`。

```bash
node tools/build-frames.mjs          # spec + kit → compositions/frames/*.html（12 个）
node tools/audit-scopes.mjs          # 每个动画选择器是否真的命中元素（"GSAP target not found" 的静态版）
node tools/audit-svg-transforms.mjs  # 拦那个会给 SVG 子元素烘进残留 translate 的写法
node tools/align-audit.mjs           # ~2.5 min：全片逐秒采样，报文字压角色 / 压歌词栏 / 互相压 / 溢出
npm run check                        # lint + Runtime + Layout + Motion + Contrast（一条命令）
```

`npm run check` 必须 **0 error** 才算完；剩下的 12 条 `composition_file_too_large` warning 是已知取舍（见"已知取舍"）。

### 3) 出片

```bash
npm run render    # → renders/world-execute-me_<日期>_<时间>.mp4
```

20 核机器上 5 个 worker，实测 6600 帧约 **5–6 分钟**、**120 MB**。渲染器会把音频整体下调约 1.9 dB 去够 −1 dBTP 的上限，这是它的响度归一化行为，不是混音改动。

### 4) 像素验证（这套项目里唯一可信的画面证据）

```bash
node tools/build-freeze.mjs 03-f03-geometry      # → .verify/freeze-<id>.html（自包含，内联本地 GSAP）
bash tools/shoot-freeze.sh 03-f03-geometry q03 6.0 8.0   # → snapshots/q03-t6.0.png / q03-t8.0.png
node tools/motion-diff.mjs snapshots/q03-t6.0.png snapshots/q03-t8.0.png   # 变化像素占比
```

三个坑：`?t=` 传的是**这一幕的局部秒**（= 全片秒 − 该幕 `data-start`）；headless Edge **只能用旧版 `--headless`**（`--headless=new` 和 `--virtual-time-budget` 会挂死）；`shoot-freeze.sh` 的输出名前缀**一幕只用一个**，复用前缀会互相覆盖。

### 5) 词曲同步验证

```bash
python tools/vocal-probe.py 0 220                    # 逐窗口：真实人声起音 vs cues.json 的戳（唯一可信判据）
python tools/sync-check.py refs/lyrics-en-ref2.lrc   # 拿异源参照表交叉校验，避免自我循环论证
```

## 目录

| 路径 | 作用 | 性质 |
|---|---|---|
| `index.html` | 根时间轴：挂 12 幕 + `<audio id="el-bgm">` | **源**（手写，CLI 会 stamp `data-hf-id`） |
| `tools/spec/fNN.mjs` | 每一幕的分组、cue、机构动画 | **源，改画面就改这里** |
| `tools/kit.mjs` `tools/motifs.mjs` `tools/frames-spec.mjs` `tools/spec/util.mjs` | 共享层：调色板 / CSS / 时间助手 / 45 个手绘 SVG 动机 | 源 |
| `tools/build-cues.mjs` → `cues.json` | LRC + 拍点网格 → 129 句的时间戳表 | 派生，**入库**（每幕 spec 的输入） |
| `audiomap.json` | `hyperframes beats` 的拍点分析结果 | 派生，**入库** |
| `compositions/frames/*.html` | 12 个生成的子合成 | **产物，别手改** |
| `assets/vendor/` | 本地化的 GSAP | 源 |
| `assets/character/qwen38-vector.svg` | 片子里她的形象 | 派生（可重建，见下） |
| `assets/audio.mp3` `assets/bgm.mp3` | 音轨 | **不入库**（版权 + 体积） |
| `refs/` | 歌词 LRC、参照 LRC、官方千问立绘 `qwen-girl-official.jpg`（重建角色链的输入） | 源 |
| `renders/` `snapshots/` `.verify/` `.thumbnails/` | 成片与验证截图、调试页 | 产物，不入库 |
| `BRIEF.md` | 当前简报：概念、6 条论点、资产清单 | 文档 |
| `STORYBOARD.md` | 12 幕分幕说明，每幕的机构与视觉系统 | 文档 |
| `frame.md` | 视觉原子规范：调色板、字体、角色系统、GSAP 硬规则 | 文档 |
| `HANDOFF.md` | 交接包：工程事实、代码约定、验证手段可信度表、门禁、踩过的坑 | 文档（**接手前先读这个**） |
| `PLAN.md` | 2026-10-11 的计划快照 | **历史**，三处结论已被推翻，顶部有标注 |
| `AGENTS.md` / `CLAUDE.md` | HyperFrames 项目的 agent 约定与命令 | 文档 |

## 重建派生资产

```bash
node tools/build-cues.mjs                                  # refs/*.lrc + audiomap.json → cues.json
python tools/key-portrait.py refs/qwen-girl-official.jpg assets/character/qwen38-official.png
python tools/vectorize-portrait.py --tol 2.6 --lines 34     # → assets/character/qwen38-vector.svg
node tools/build-motif-sheet.mjs                           # → .dev/motif-sheet.html（动机美术审查页）
node tools/char-anchors.mjs                                # 打印她的锚点比例与每幕 sprite 盒
```

## 已知取舍

- **`compositions/frames/*.html` 每个 630–870 行，12 条 lint warning。** 其中约一半是从 `kit.mjs` 内联进每一幕的重复 CSS+JS；人类真正要读要改的源已经是 `tools/spec/fNN.mjs`。拆开只会让"改一处要改 12 个文件"，所以**保持现状**。
- **207.6 s 之后约 12.4 s 静音。** 原曲在 207.6 s 自然收尾（实测 208 s 起峰值已低于 −63 dBFS），而第 12 幕的告别动作排在 210–219.5 s：合扇、鞠躬、`✓ exit(0)`、光标最后闪两下。这是刻意留的余韵，不是漏配音；加淡出只会剪掉原曲自己的结尾，把成片缩到 212 s 则会把收尾整段砍掉。
- **agent 环境里测不了实时播放同步**（无 rAF 回调），只能 `pause + seek(t)`。所以本项目所有"画面对不对"的结论都来自 freeze 页 + 逐秒采样，而不是"我这边播了一下看着没问题"。

## License / 使用边界

代码与自绘 SVG（`index.html`、`tools/`、`compositions/`）随本仓库开放；**音乐、原曲录音与歌词的权利不属于本作**，角色形象的原始设计版权归其设计者。 fork 去做别的音轨的 MV 请自行解决授权。
