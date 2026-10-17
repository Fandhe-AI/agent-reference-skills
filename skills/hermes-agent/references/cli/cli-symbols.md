# CLI Symbols Glossary

Decoder for the symbols in the Hermes terminal UI: transcript markers, status-bar badges, overlay glyphs, and approval prompts. Covers the TUI and notes pieces shared with the Classic CLI.

## Signature / Usage

```text
❯  input prompt        ●  tool call        ✓ / ✗  tool succeeded / failed
▸ / ▾  collapsed / expanded section        ▍  streaming cursor
```

Glyphs marked *themeable* are brand defaults that a skin can override (e.g. `tool_prefix`, the prompt symbol). Everything else is fixed in the renderer.

## Transcript symbols

| Symbol | Meaning |
|--------|---------|
| `❯` | Input prompt. *Themeable*. |
| `●` | A tool call (precedes tool name and arguments). |
| `┊` | Tool-activity rail. *Themeable* (`tool_prefix`). |
| `✓` / `✗` | Tool result: succeeded / failed. |
| `▸` / `▾` | Collapsed / expanded section chevron (click to toggle). |
| `▍` | Streaming cursor. |
| `│` `├─` `└─` | Tree rails; `└─` marks the last child. |
| `◈` | Display-only timeline event. |
| `◇` | Injected reference block, e.g. `◇ Reference 1/2 — <label>`. |
| `↳` | Sticky prompt echoing the user message being worked on. |
| `☐` / `☑` / `•` | Markdown task-list items (open / done) and plain bullets. |
| `▶` | Collapsed `<details>` summary in rendered markdown. |

## Status-bar symbols

Segments appear only when relevant and drop off first on narrow terminals.

| Symbol | Meaning |
|--------|---------|
| `⠋⠙⠹…` | Busy spinner (thinking and tool phases use different braille sets). |
| `☤ 🌀 🤔 ✨ 🍵 🔮` | Frames of the `emoji` busy-indicator style (`/indicator emoji`). Default style rotates kaomoji faces. |
| `\| / - \` | Frames of the `ascii` busy-indicator style. |
| `⏱` | Per-prompt elapsed time, e.g. `⏱ 12s/3m 45s` (turn / session). |
| `⏲` | Same timer, frozen after the turn completes. |
| `cmp N` | Session auto-compressed N times. |
| `▶ N` | N `/bg` tasks running. |
| `⚠ YOLO` | YOLO mode on. Also in the startup banner. |
| `⛓ N` | N subagents active. |
| `↩ resumes when subagent finishes` | Idle while delegated work is in flight. |
| `● REC` | Voice mode recording. |
| `◉ STT` | Speech-to-text transcribing. |
| `◉ focus` | Focus view on. |
| `♥` | Affection flash. |
| `⚡` / `🔋` | Battery (opt-in): plugged in / on battery. |
| `N bg` | N background terminal processes tracked. |
| `N live sessions` | Open TUI sessions in this process; click to open the switcher. |

## Notices

| Symbol | Meaning |
|--------|---------|
| `✓` | Success. |
| `•` | Informational. |
| `⚠` | Warning (also credit warnings). |
| `✕` | Error. |

## Approval and confirmation prompts

| Symbol | Meaning |
|--------|---------|
| `⚠ approval required` | A tool needs explicit approval (bordered panel with command preview). |
| `⚠` / `?` | Confirmation dialog title: dangerous action / ordinary question. |
| `🔐` | Sudo password prompt (masked). |
| `🔑` | Credential/secret input prompt (masked). |

## Subagents overlay (`/agents`)

| Symbol | Meaning |
|--------|---------|
| `●` | Running. |
| `○` | Queued. |
| `✓` | Completed. |
| `■` | Interrupted. |
| `✗` | Failed. |
| `⌛` | Timed out. |
| `⚠` | Errored. |
| `⚡N` | N currently-active agents in a rollup row. |
| `▁▂▃▄▅▆▇█` | Activity sparkline per branch. |

## Session switcher (`Ctrl+X`)

| Symbol | Meaning |
|--------|---------|
| `✓` | Idle. |
| `…` | Starting. |
| `?` | Waiting for input. |
| `▶` | Working. |
| `✎ draft` | Unsent draft in that session's composer. |

## Pickers and hubs

| Symbol | Meaning |
|--------|---------|
| `▸` | Current selection row. |
| `*` | Currently-active model / provider. |
| `●` / `○` | Provider authenticated / not (model picker); plugin state fallback. |
| `✓` / `✗` | Plugin enabled / disabled (plugins hub). |
| `↑ N more` / `↓ N more` | More rows above/below the visible window. |
| `┃` | Scrollbar thumb. |

## Goals

| Symbol | Meaning |
|--------|---------|
| `✓` | Goal complete. |
| `↻` | Goal continuing (another iteration scheduled). |
| `⏸` | Goal paused. |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/reference/cli-symbols (v0.22.2).

## Related

- [TUI](./tui.md)
- [CLI Interface](./interface.md)
- [Slash Commands Reference](./slash-commands.md)
