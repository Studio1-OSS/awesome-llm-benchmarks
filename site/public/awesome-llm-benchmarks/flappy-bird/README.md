# Flappy Bird

Build a Flappy Bird style game that makes a simple one-button loop feel precise, fair, and hard to put down.

## Status

**Comparison complete.** Four model outputs have been reviewed and documented below.

## Prompt

**Prompt used for this test:**

> Create a complete single HTML file for a cute Flappy Bird style game using Canvas. Smooth gravity, flapping animation, parallax background, score, pipe obstacles, game over screen.

Record any system prompt, attached assets, or follow-up instruction alongside the model run. Do not change the shared prompt between models.

## Run protocol

Use the same prompt and assets for every run. Record exact model identity, provider, settings, tokens, cost, and a short manual-playtest note.

## Token usage and costs

| Model | Runs | Input tokens | Cached input tokens | Output tokens | Total tokens | Cost |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Codex 5.6 Terra | 1 | 21,818 | 131,584 | 4,259 | 26,077 | Not reported |
| DeepSeek V4 Flash (`deepseek/deepseek-v4-flash`) | 9 | 276,009 | — | 27,083 | 303,092 | $0.026754 |
| Kimi K3 (`moonshotai/Kimi-K3`) | 6 | 173,137 | — | 7,490 | 180,627 | $0.226800 |
| Muse Spark 1.3 | 1 | 1.2M | — | 29.8K | — | $0.0163 |

For Codex, the reported total is 26,077 tokens (21,818 input + 4,259 output); its 131,584 cached input tokens are listed separately and are not included in that total.

Muse Spark 1.3 was run on the Contributor tier, which lowers the recorded price; standard-tier pricing can be higher.

## Results

| Model | Result | Notes |
| --- | --- | --- |
| [Codex 5.6 Terra](codex-5.6-terra/index.html) | Generated a polished game UI | The gameplay logic is broken, so the result is not a viable playable game despite its visual presentation. |
| [DeepSeek V4 Flash](deepseek-v4-flash/index.html) | Good-looking playable output with a strong 3D-style visual effect | No intro screen. The gameplay loop is functional but relatively simple, with limited game complexity. |
| [Kimi K3](kimi-k3/index.html) | Good-looking playable output | The gameplay loop is similarly simple and offers less overall detail than Muse Spark 1.3. |
| [Muse Spark 1.3](muse-spark-1.3/index.html) | Most detailed and cohesive UI; complete single-file Canvas game with animated bird, layered parallax, pipes, score, persistent best score, and a game-over panel | The game is playable but tuned harder than ideal. Its strong visual polish and richer implementation make it the standout result. |

## Verdict

Muse Spark 1.3 is the overall winner. It delivered the most cohesive UI, the richest level of implementation detail, and a working game for $0.0163. Its difficulty should be tuned down for better accessibility, but that is a smaller issue than the functional and presentation gaps in the other runs.

DeepSeek V4 Flash is the strongest budget alternative at $0.026754: it is playable and visually appealing, particularly its 3D-style effect, but it lacks an intro screen and keeps the game loop simple. Kimi K3 also produced a usable result, but at $0.226800 it costs substantially more while offering less detail than Muse Spark 1.3. Codex 5.6 Terra produced a presentable interface but failed the core reliability requirement because its game logic does not work.

Cost comparisons should account for pricing tier: Muse Spark 1.3 was run on the Contributor tier, which lowers its recorded cost; standard-tier pricing can be higher. On the recorded runs, Muse Spark 1.3 offers the best balance of UI quality, implementation depth, functionality, and cost.
