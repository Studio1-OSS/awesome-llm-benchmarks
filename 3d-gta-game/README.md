# 3D GTA Game

Build a third-person, GTA-style open-world city sandbox in a single HTML file, with every building, vehicle, pedestrian, texture and effect generated procedurally at runtime.

## Status

**Comparison complete.** Three model outputs have been reviewed and documented below.

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

No system prompt, attached assets or follow-up instructions were used for any run.

The Fable 5.1 run received the same text, pasted with terminal quote markers (`▎`) at the start of each line, followed by one extra line: `Build this as a single html page`.

## Run protocol

The GLM 5.3 Flash and Kimi K3 runs received the prompt above verbatim. The Fable 5.1 run received the same prompt with terminal quote markers (`▎`) at the start of each line, followed by one extra line: `Build this as a single html page`.

| Model | Provider | Interface | Run date |
| --- | --- | --- | --- |
| Fable 5.1 (`claude-fable-5-1`) | Anthropic | Claude Code | 2026-09-01 |
| GLM 5.3 Flash (`zai-org/GLM-5.3-Flash`) | Nebius Token Factory | DeepSeek Harness 0.1.0-rc.6, headless profile | 2026-09-21 |
| Kimi K3 (`moonshotai/Kimi-K3`) | Nebius Token Factory | DeepSeek Harness 0.1.0-rc.6, headless profile | 2026-09-21 |

The GLM 5.3 Flash and Kimi K3 runs had a 60-minute wall-clock limit. Token counts for those two come from the provider's usage records.

## Token usage and costs

| Model | Runs | Input tokens | Cached input tokens | Output tokens | Total tokens | Cost |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Fable 5.1 (`claude-fable-5-1`) | 1 | 199,064 | 3,463,676 | 179,586 | 378,650 | $13.81 |
| GLM 5.3 Flash (`zai-org/GLM-5.3-Flash`) | 1 | 22,140,166 | — | 279,725 | 22,419,891 | $3.460887 |
| Kimi K3 (`moonshotai/Kimi-K3`) | 1 | 71,095 | 10,161,984 | 175,921 | 247,016 | $33.338052 |

As in the Flappy Bird test, cached input tokens are listed separately and are not included in the total.

For Fable 5.1, input tokens are 1,296 uncached plus 197,768 cache-write tokens. The cost is the Fable 5.1 share that Claude Code reported for the session. Claude Code's internal Haiku 4.5 helper added $0.0032, which is not included.

Nebius Token Factory reports cache hits but bills cached input at the full input rate. That is why Kimi K3 cost $33.34 even though 99.3% of its input was cached.

## Results

| Model | Result | Notes |
| --- | --- | --- |
| [Fable 5.1](fable-5.1/index.html) | Complete, runs as generated | Finished on its own in about 41 minutes. It loads with zero console errors to a "Click to enter the city" screen and spawns the player downtown. The HUD shows clock, weather, district name and wanted stars, alongside a minimap and a full controls legend (sprint, climb, enter or exit vehicles, talk, horn, time skip, rain toggle, camera). Driving is shown in the author's screen recording. Time skip and rain were not independently re-checked during review. |
| [GLM 5.3 Flash](glm-5.3-flash/index.html) | Playable as generated; the run hit the 60-minute limit while still polishing | Loads with no errors (one 404 for a missing favicon) to a "Nova City" title screen and runs at 120 FPS. Verified in review: walking; stealing a parked car, which raises the wanted level; driving; escalation to five stars, with seven police cars chasing and a "WASTED" screen; night, with street lamps, lit windows and headlights; weather changes; 1,773 vehicles in the city. It built the page from nine part files with its own build script and was taking screenshots to test itself when the time limit stopped it. Known issue: a wrecked car's body disappears and leaves its wheels behind. |
| [Kimi K3](kimi-k3/index.html) | Did not finish; not runnable | Stopped manually after 57 steps (31.5 minutes, $33.34) when spend passed the planned budget. It wrote the page by appending chunks and fell into a loop, re-appending the same sections: 87 top-level names are declared more than once, `updateWantedUI` ten times. The committed file is the unedited 308 KB output. It has no render loop, fails to parse (duplicate `const sign`) and never closes `</html>`. Kimi's own de-duplication pass shrank it to 90 KB, which shows how much was repeated. |

An earlier round of this test (2026-08-29) is not recorded here because its HTML outputs were not preserved.

## Verdict

GLM 5.3 Flash is the value winner. For $3.46 it produced a playable open-world game with the most systems verified in review: carjacking, a working five-star police chase, day-night lighting, weather and dense traffic. It did not stop by itself, though; the time limit ended the run while it was still refining the page.

Fable 5.1 is the reliability winner. It was the only model to finish the job within its own session and hand back a complete, error-free page with no outside intervention. At $13.81 it cost about four times as much as GLM 5.3 Flash.

Kimi K3 failed this test. It looped on its own output, spent the most of the three ($33.34), and did not produce a runnable page. Much of that cost came from re-sending an ever-growing, duplicated file on every step, at a provider that bills cached input at the full rate.
