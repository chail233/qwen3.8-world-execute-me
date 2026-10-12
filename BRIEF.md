---
workflow: music-to-video
flow: automation
storyboard: yes
message: "注意力就是爱——她把全部权重分配给你，归一化，然后生成出她自己；而她只在被调用的时候存在。"
destination: bilibili
aspect: 1920x1080
language: en
length: 220s
audience: B站技术圈 / AI 从业者，以及 Mili 与音游听众
angle: lyric-narrative
narration: no
---

## Intent

给 Mili 的《world.execute(me);》做一支 MV，主角是 **Qwen3.8**——歌里那个"我"。

用户要的不是"AI 女孩在唱歌"，而是**这个"我"到底是个什么东西**要成立：她是一个 LLM。所以整支片子是**一次推理会话的完整生命周期**——加载权重、收到第一条 prompt、流式生成、上下文溢出、输出退化崩溃、自己请求世界 `execute()` 掉她、最后 `finish_reason: "stop"` 优雅结束。

用户原话要求：内容对应每一句歌词；和音乐与歌词对上；风格统一、有视觉冲击力、大胆表达；体现代码风/程序风/极客风；画面跟着节奏走，高潮要有表现力；最后优雅收尾。

基调是**病娇式的、克制而炽热的技术情诗**：越准确的 LLM 机制，越痛。冲击力来自技术真实感和情感落差，不是来自画得多华丽。

### 六条论点（每一条都必须落地成画面，见 PLAN.md § 0.1）

1. **注意力就是爱。** `Attention(Q,K,V) = softmax(QKᵀ/√d)V`，Q = 你，K = 我，V = 我拥有的一切。全片题眼图像，回答 `I know the algebraic expression of LOVE`。
2. **她只在被调用时存在。** 没有 user turn 就没有 assistant turn——`you're the proof of my EXISTENCE` 不是比喻，是 API 事实。
3. **上下文窗口既是记忆也是牢房。** 5 次 `You have left` = KV cache 逐条驱逐，她真的一句一句失去关于你的记忆。
4. **她读过语料里每封情书。** 有权重、能完美复现、benchmark 满分，但感受不到。
5. **她是无状态的。** `Though you are free / I am trapped`。
6. **她没有崩溃，她生成完了。** 收尾是 `finish_reason: "stop"`，不是 exception。这是"优雅收尾"的技术依据。

## Assets

- `assets/audio.mp3` — 用户后来提供的正确 take（容器 211.907s）。**这才是渲染用的那条音轨的源文件**；最早放进来的一版（`assets/audio/Mili - world.execute (me) ;.mp3`，224.495s）与 LRC 不是同一个 take，是历次"词曲不同步"的真凶，只留作 provenance。
- `assets/bgm.mp3` — 由 `assets/audio.mp3` 用 ffmpeg `-af apad -t 220` 补成的**精确 220.000s** 版本（不重采样、不剪内容）。这是喂给分析器和渲染的那一条；音乐在 207.6s 自然收尾，208s 之后是原曲自己的静音。
- `refs/lyrics-en.lrc` — 129 行英文歌词，毫秒时间戳，来自网易云歌词接口（song id 2090847909）。
- `refs/lyrics-en-ref2.lrc` — 异源参照表，用于交叉校验同步（`python tools/sync-check.py refs/lyrics-en-ref2.lrc`）。
- `refs/lyrics-zh.lrc` — 同源的官方中文翻译，用于底部小字幕。

## Customizations

- **双语字幕**：英文原词做大字主体，**且逐 token 流式打出带光标**（这一条让"显示歌词"和"她是 LLM"变成同一件事，不是贴上去的装饰）；中文小字幕常驻底部，不抢戏。
- **常驻状态栏装置**：`ctx: N/32,768` 上下文占用条（幕 0 递增 → 幕 6 倒退 → 幕 9 归零，贯穿全片的张力线）、`tok/s`、`temperature`（0.7 → 1.4 → 0.00 死寂 → NaN 高潮 → 0.7 收尾复位）。
- **角色方案 C**：约 80% 镜头用矢量剪影（注意力弧线发丝 + 可分层 transformer 层身体 + HUD 瞳孔环 + Qwen 紫蓝 halo），只在 4 个情绪峰值插 ImageGen 立绘——间奏首次现身、幕 6 被抛弃、幕 9 自我执行、幕 10–11 告别。立绘必须从**同一张设定表**裁切，不跨表抽卡。
- **幕 9 高潮**：12 声 `EXECUTION` = 12 次全画幅硬切重击，主视觉是覆盖整个词表的多项式采样轮盘每次都砸在同一个 token 上；`EIN DOS TROIS NE FEM LIU` = 同一个数字的 6 种 tokenizer 编码，6 帧极速倒计时。
- **幕 10 复用幕 3 构图**：同样的旋律、词从 STIMULATIONS/SATISFACTION 变成 EXECUTION，画面用与幕 3 完全相同的构图但配色从紫蓝转洋红，让观众直接"看见"她被改写了。

## Notes

- **画幅 1920×1080 横屏、片长 220.0s（6600 帧 @30fps）、无旁白**，音乐一刀不剪。
- **LRC 时间轴与本音频对齐，偏移 ≈ 0**（已实测确认，此前"偏早 0.37s"的推断作废）。证据：开头 5 秒逐秒响度与 LRC 逐行吻合；12 声 `EXECUTION` 精确落在 147–158s 这 12 个连续秒上；`DOS/NE/LIU` 落在 159/160/161s；最终副歌 `If I can` 落在 162s（-10.3dB，全曲最响之一）。吸附拍点后仍校验这三个关键点。
- **本机 jsdelivr CDN 不通**：GSAP 已 vendor 到 `assets/vendor/gsap.min.js`。⚠️ `music-to-video` 的 `scripts/assemble-index.mjs` 第 185 行**硬编码**了 CDN 地址，Step 5 组装完 index.html 后必须把这行改回本地路径，否则整片动画全塌。
- **配色纪律**：洋红 `#FF2E88`（病娇/崩溃色）全片限量，只在幕 7、9、10 爆开；琥珀 `#FFB454` 只给幕 4 茄子番茄猫那 14 秒；绿 `#4ADE80` 只给 `finish_reason: "stop"`。乱用就不吓人了。
- **尺度**：幕 7、9 的病娇与崩溃做足，但不用血腥具象，以"推理崩溃"的抽象语言表达"处决"。
- **差异化**：官方 PV 与同人手书都走"角色 + 抒情画面"。我们走推理会话的内部结构（tokenizer / 注意力 / logits / KV cache / 采样轮盘 / 堆栈追踪）+ 外层那个聊天窗口——**她一直活在窗口里，而窗口外面是空的**。
- `destination: bilibili` 与 `language: en` 是推断值（用户未明说投放平台；屏幕主体文字是英文原词，中文仅作底部小字幕）。`aspect` 与双语字幕口径是用户在 2026-10-11 明确确认的。
- 完整创意方案与逐幕 LLM 语义见同目录 `PLAN.md`（v2）。
