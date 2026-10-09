# Awesome LLM Benchmarks

A clean, evidence-first home for comparing model-generated web experiences. Tests are defined before runs are added, so every later result can be traced to one prompt, one model, one cost record, and one explicit verdict.

## Tests

| Test | Status | What it measures |
| --- | --- | --- |
| [2D Breakout](2d-breakout/README.md) | Ready for runs | Responsive arcade-game craft |
| [3D Game](3d-game/README.md) | Ready for runs | Interactive 3D scene design |
| [3D GTA Game](3d-gta-game/README.md) | Comparison complete | Open-world systems depth and long-build reliability |
| [3D Snake](3d-snake/README.md) | Ready for runs | 3D game loop and spatial clarity |
| [Design Portfolio](design-portfolio/README.md) | Ready for runs | Editorial visual design and interaction |
| [Endless Runner](endless-runner/README.md) | Ready for runs | Game feel, pacing, and visual direction |
| [Flappy Bird](flappy-bird/README.md) | Ready for runs | Input precision and game-loop tuning |

## Result structure

Add a model only when its exact public model name is known.

```text
test-name/
  README.md
  exact-model-name/
    README.md
    index.html
```

The test README is the comparison record. Every model README is the evidence record for one run.

## Required model README fields

- Exact model and provider name
- Verbatim prompt, including system prompt and follow-ups
- Run date, interface, settings, and input assets
- Input tokens, output tokens, and actual cost
- A direct link to the runnable HTML artifact
- Observed result, review notes, and any known limitations

Do not add a model folder for an unnamed result. Do not estimate missing cost or reconstruct missing prompts.
