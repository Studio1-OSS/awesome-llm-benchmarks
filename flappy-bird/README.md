# Flappy Bird

Build a Flappy Bird style game that makes a simple one-button loop feel precise, fair, and hard to put down.

## Status

**Runs recorded.** Model outputs and their usage records are included below.

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
| [Muse Spark 1.3](muse-spark-1.3/index.html) | Complete single-file Canvas game: smooth delta-time gravity, animated flapping bird, 3-layer parallax (clouds/hills/ground), pipes, score + persistent best, medal game-over panel | Headless-verified only (no browser playtest): `node --check` clean, scripted autopilot scored 17 and reached game over, restart and best-score persistence pass. Built from scratch; no shared code with other runs. |

## Verdict

Preliminary: Muse Spark 1.3 produced a complete, headless-verified game for $0.0163. The recorded cost uses Contributor-tier pricing; standard-tier pricing can be higher. A final model comparison still requires consistent manual playtesting across all runs.
