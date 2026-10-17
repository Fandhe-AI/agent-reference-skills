# Pets (Petdex Mascots)

An animated mascot sprite that reacts to agent activity across the CLI, TUI and desktop app. Pets come from the public petdex gallery. Cosmetic only (no effect on prompt caching, tokens or behavior); off by default.

## Signature / Usage

```bash
hermes pets list [query] [--limit N]
hermes pets list --installed
hermes pets install boba --select
hermes pets show
hermes pets doctor
```

```yaml
display:
  pet:
    enabled: false        # master on/off (true once you select a pet)
    slug: ""              # active pet; empty = first installed
    render_mode: auto     # auto | kitty | iterm | sixel | unicode | off
    scale: 0.33           # master size knob (relative to native 192x208 frames)
    unicode_cols: 0       # hard override for terminal width (0 = derive from scale)
```

## Commands

| Goal | Command |
| --- | --- |
| Install a pet | `hermes pets install <slug> [--select] [--force]` |
| Set the active pet | `hermes pets select [slug]` |
| Resize everywhere | `hermes pets scale <factor>` (clamped 0.1-3.0) |
| Preview/animate | `hermes pets show [slug] [--state <s>] [--cycle] [--once] [--mode <m>] [--scale <f>]` |
| Disable | `hermes pets off` |
| Remove | `hermes pets remove <slug>` |
| Diagnose | `hermes pets doctor` |

Slash command: `/pet` (toggle), `/pet list`, `/pet scale <factor>`, `/pet <slug>`, `/pet off`. Generate a new pet: `/hatch <description>` (alias `/generate-pet`).

## Agent activity to pet state

| Agent activity | Pet state |
| --- | --- |
| A tool/turn just failed | `failed` |
| A plan finished (all todos done) | `jump` |
| A turn finished cleanly | `wave` |
| A tool is executing | `run` |
| The model is thinking/reading | `review` |
| Turn in flight (unspecified) | `run` |
| Blocked on you (clarify/approval prompt open) | `waiting` (falls back to `idle` on legacy 8-row sheets) |
| Nothing happening | `idle` |

## Notes

- Pets install to `<HERMES_HOME>/pets/<slug>/` (per profile); the petdex npm CLI installs to `~/.codex/pets`, so install through `hermes pets`.
- Terminal rendering uses a graphics protocol (kitty, Ghostty, WezTerm, iTerm2, sixel) at full fidelity, else truecolor Unicode half-blocks; disabled in pipes/redirects. The half-block fallback clamps to a legibility floor.
- Generation: base drafts (cheap, prompt-only), then hatch (reference-image grounded animation rows packed into a petdex/Codex atlas, 8x9 grid of 192x208 cells). Requires a reference-capable image backend: Nous Portal, OpenRouter, OpenAI (`gpt-image-2`) or Krea; override with `HERMES_PET_IMAGE_PROVIDER` (e.g. `openrouter`). Installing gallery pets needs no image backend.
- Desktop: Cmd+K "Pets..." and Settings -> Appearance (size slider, Roam toggle, off by default); Alt+wheel resizes; vibe reactions (hearts) trigger on local lexicon matches such as "good bot", "thank you"; Shift-click pops the pet out into a transparent always-on-top overlay (drag, single-click mini composer, double-click toggles app window, mail icon for finished turns).
- `hermes pets doctor` reports pets directory, `display.pet.*`, detected protocol, and Pillow availability; prints `ready` when a pet is installed, selected, enabled and Pillow imports.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/pets (pinned to v0.22.2)

## Related

- [Image Generation](./image-generation.md)
- [Skins](./skins.md)
