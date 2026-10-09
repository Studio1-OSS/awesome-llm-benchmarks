# 3D GTA Game

Build a third-person, GTA-style open-world city sandbox in a single HTML file, with every building, vehicle, pedestrian, texture and effect generated procedurally at runtime.

## Status

**Comparison complete.** Four model outputs have been reviewed and documented below.

## Prompt

**Prompt used for this test:**

> A fully explorable, third-person open-world city sandbox that runs entirely in the browser — a dense downtown, residential neighborhoods, highways, alleyways, convenience stores, gas stations, parks, parking lots, construction zones, and industrial districts. The player can freely walk, sprint, jump, enter and drive vehicles, explore buildings and rooftops, and move seamlessly across the city.
>
> The world feels alive: pedestrians wander sidewalks, cars obey traffic lights and navigate intersections, police vehicles patrol the streets, taxis stop for passengers, traffic jams naturally form, streetlights switch on at night, helicopters occasionally fly overhead, and distant aircraft cross the skyline.
>
> Include dynamic systems such as day/night cycles, changing weather, rain-slick roads, vehicle headlights, street lamps, shadows, basic pedestrian AI, traffic AI, vehicle physics, collision detection, wanted/police pursuit mechanics, and simple NPC interactions.
>
> Make the city visually rich with skyscrapers, storefronts, billboards, road markings, traffic signals, street furniture, bridges, tunnels, elevated highways, neon signs, trees, dumpsters, fences, fire escapes, rooftop equipment, and distant city landmarks.
>
> Everything must be generated procedurally from code at runtime: every building, road, vehicle, pedestrian, prop, texture, sign, sky, lighting effect, animation, and environmental detail. Zero image files, zero texture files, zero 3D model files, zero external asset downloads.
>
> The result should feel like a miniature GTA-style open-world sandbox built entirely from code, with enough procedural variation, AI activity, environmental detail, and freedom of movement that the player can simply explore the city and discover things happening around them.
>
> Write the entire thing as a single self-contained index.html file in the current directory. Use Three.js from a CDN script tag (that is the only external dependency allowed; everything else must be procedural). Do not ask questions - build it.

No attached assets were used for any run. Each interface used its own default system prompt; Claude Code and Grok Build also loaded the author's global rules files.

## Run protocol

Each model started in an empty directory. Its output was then loaded in Chrome exactly as generated, with no edits, and play-tested by hand.

The prompt text was the same for every run, but two runs differed in how it was delivered:

- **GLM 5.3 Flash and Kimi K3** received the prompt above verbatim, with no follow-up instructions.
- **Fable 5.1** received it pasted with terminal quote markers (`▎`) at the start of each line, followed by one extra line: `Build this as a single html page`. There were no follow-up instructions during the build.
- **Grok 4.7** received it pasted with the same quote markers and no extra line. During the build the author sent four follow-up messages, each of which cancelled the turn in progress and started a new one:
  1. `is it complete?`
  2. `is it done? this is taking too much time bro`
  3. `is it done now? how much more time plz give me the file asap - single html. it is taking way too long`
  4. `just give me the version man it is too late`

The Grok 4.7 result is included in the comparison, but it was produced under time pressure the other three runs did not have.

| Model | Provider | Interface | Run date |
| --- | --- | --- | --- |
| Fable 5.1 (`claude-fable-5-1`) | Anthropic | Claude Code | 2026-09-01 |
| GLM 5.3 Flash (`zai-org/GLM-5.3-Flash`) | Nebius Token Factory | DeepSeek Harness 0.1.0-rc.6, headless profile | 2026-09-21 |
| Kimi K3 (`moonshotai/Kimi-K3`) | Nebius Token Factory | DeepSeek Harness 0.1.0-rc.6, headless profile | 2026-09-21 |
| Grok 4.7 (`grok-4.7-build`) | xAI | Grok Build 1.0.40 | 2026-09-21 |

The GLM 5.3 Flash and Kimi K3 runs had a 60-minute wall-clock limit. Token counts for those two come from the provider's usage records.

## Token usage and costs

| Model | Runs | Input tokens | Cached input tokens | Output tokens | Total tokens | Cost |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Fable 5.1 (`claude-fable-5-1`) | 1 | 199,064 | 3,463,676 | 179,586 | 378,650 | $13.81 |
| GLM 5.3 Flash (`zai-org/GLM-5.3-Flash`) | 1 | 22,140,166 | — | 279,725 | 22,419,891 | $3.460887 |
| Kimi K3 (`moonshotai/Kimi-K3`) | 1 | 71,095 | 10,161,984 | 175,921 | 247,016 | $33.338052 |
| Grok 4.7 (`grok-4.7-build`) | 1 | 270,779 | 1,486,720 | 130,008 | 400,787 | $2.064966 (recorded) |

As in the Flappy Bird test, cached input tokens are listed separately and are not included in the total.

For Fable 5.1, input tokens are 1,296 uncached plus 197,768 cache-write tokens. The cost is the Fable 5.1 share that Claude Code reported for the session. Claude Code's internal Haiku 4.5 helper added $0.0032, which is not included.

Nebius Token Factory reports cache hits but bills cached input at the full input rate. That is why Kimi K3 cost $33.34 even though 99.3% of its input was cached.

For Grok 4.7, figures come from Grok Build's session usage log. They cover the build only, from the prompt at 17:46 UTC to the finished file at 18:36 UTC, and leave out two later turns: one that handed over the file ($0.47) and one answering a cost question ($0.40). Grok Build records cost in ticks of 10 billion per dollar, so the recorded cost is 20,649,660,000 ticks. The session's per-turn figures fit $2.00 per million input tokens, $0.50 per million cached input tokens and $6.00 per million output tokens exactly. Of the output, 86,850 tokens were reasoning.

**The Grok 4.7 cost is a lower bound.** The build made 16 model calls, but the usage log records only 12. The other four were in progress when the author's follow-up messages cancelled them, and the log has no usage for them. Tokens generated before a cancellation are normally still billed, so the actual cost is probably higher than recorded. It is not estimated here.

## Results

| Model | Result | Notes |
| --- | --- | --- |
| [Fable 5.1](fable-5.1/index.html) | Complete, runs as generated | Finished on its own in about 41 minutes. It loads with zero console errors to a "Click to enter the city" screen and spawns the player downtown. The HUD shows clock, weather, district name and wanted stars, alongside a minimap and a full controls legend (sprint, climb, enter or exit vehicles, talk, horn, time skip, rain toggle, camera). Driving is shown in the author's screen recording. Time skip and rain were not independently re-checked during review. |
| [GLM 5.3 Flash](glm-5.3-flash/index.html) | Playable as generated; the run hit the 60-minute limit while still polishing | Loads with no errors (one 404 for a missing favicon) to a "Nova City" title screen and runs at 120 FPS. Verified in review: walking; stealing a parked car, which raises the wanted level; driving; escalation to five stars, with seven police cars chasing and a "WASTED" screen; night, with street lamps, lit windows and headlights; weather changes; 1,773 vehicles in the city. It built the page from nine part files with its own build script and was taking screenshots to test itself when the time limit stopped it. Known issue: a wrecked car's body disappears and leaves its wheels behind. |
| [Grok 4.7](grok-4.7/index.html) | Runs as generated; build ended early at the author's request | Built in about 50 minutes across five turns, the first four cancelled by the author's follow-up messages. The build included one Grok-run headless Chrome check, which was also cut short. It loads with zero console errors, with warnings only for Three.js's deprecated non-module build and an invalid `vc` material property. The "Vesper" title screen plays over a live night city with lit towers, a helicopter, an elevated road and traffic. The HUD shows district and street intersection, clock, weather, wanted stars, a $250 wallet and a minimap, with a controls legend (enter vehicle, talk or hail a taxi, horn, radio, map). The author's screen recording shows walking, a taxi-hail prompt, storm weather ("Storm · Slick") and driving out of a gas station. Known issue: shop signs render mirrored ("NOVA COLA" reads backwards). The police pursuit and the day-night transition were not independently verified. |
| [Kimi K3](kimi-k3/index.html) | Did not finish; not runnable | Stopped manually after 57 steps (31.5 minutes, $33.34) when spend passed the planned budget. It wrote the page by appending chunks and fell into a loop, re-appending the same sections: 87 top-level names are declared more than once, `updateWantedUI` ten times. The committed file is the unedited 308 KB output. It has no render loop, fails to parse (duplicate `const sign`) and never closes `</html>`. Kimi's own de-duplication pass shrank it to 90 KB, which shows how much was repeated. |

An earlier round of this test (2026-08-29) is not recorded here because its HTML outputs were not preserved.

## Verdict

GLM 5.3 Flash is the value winner. For $3.46 it produced a playable open-world game with the most systems verified in review: carjacking, a working five-star police chase, day-night lighting, weather and dense traffic. It did not stop by itself, though; the time limit ended the run while it was still refining the page.

Fable 5.1 is the reliability winner. It was the only model to finish the job within its own session and hand back a complete, error-free page with no outside intervention. At $13.81 it cost about four times as much as GLM 5.3 Flash.

Grok 4.7 has the lowest recorded cost, $2.06, and its page ran as generated. That figure is incomplete, though: four interrupted calls are missing from its usage log. It also had the least verification of the three working pages, and it was the only run hurried along mid-build. It is a strong budget result, but not yet directly comparable to GLM 5.3 Flash's fully recorded $3.46.

Kimi K3 failed this test. It looped on its own output, spent the most of the four ($33.34), and did not produce a runnable page. Much of that cost came from re-sending an ever-growing, duplicated file on every step, at a provider that bills cached input at the full rate.
