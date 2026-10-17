# TUI

The TUI is the modern front-end for Hermes: a terminal UI backed by the same Python runtime as the Classic CLI. Same agent, sessions, and slash commands; a more responsive surface with overlays, mouse support, and non-blocking input.

## Signature / Usage

```bash
hermes --tui                          # launch the TUI
hermes --tui -c                       # resume latest TUI session (falls back to latest classic)
hermes --tui --resume latest
hermes --tui -r 20260409_000000_aa11bb   # by ID or title
hermes --tui --resume latest --in ./my-project
hermes --tui --dev                    # run source directly (contributors)

export HERMES_TUI=1                   # env-var opt-in; `hermes` / `hermes chat` use the TUI
```

```yaml
# ~/.hermes/config.yaml — persistent default
display:
  interface: tui   # "cli" (default) or "tui"
```

Explicit flags win: `hermes --cli` drops to the classic REPL for one invocation.

## Options / Props

### Status line

| Status | Meaning |
|--------|---------|
| `starting agent…` | Session ID live; tools/skills still loading. Typed messages queue. |
| `ready` | Idle, accepting input. |
| `thinking…` / `running…` | Reasoning or running a tool. |
| `interrupted` | Turn cancelled; press Enter to send again. |
| `forging session…` / `resuming…` | Initial connect or `--resume` handshake. |

The status line also shows the working directory with git branch, per-prompt elapsed time (`⏱` live, `⏲` frozen), `🗜️ N` compressions, `▶ N` running `/bg` tasks, and `⚠ YOLO`. The session title appears as a badge at the far right once named.

### TUI-owned slash commands

| Command | TUI behavior |
|---------|--------------|
| `/help` | Overlay with categorized commands |
| `/sessions` (alias `/switch`) | Live session switcher |
| `/model` | Modal model picker grouped by provider, with cost hints |
| `/skin` | Live-preview theme |
| `/details` | Toggle verbose tool-call details (global or per-section) |
| `/usage` | Rich token / cost / context panel |
| `/agents` (alias `/tasks`) | Live subagent tree with kill/pause controls |
| `/connectors` | Connector accounts list |
| `/reload` | Re-read `~/.hermes/.env` into the running TUI |
| `/mouse [on\|off\|toggle\|wheel\|buttons\|all]` | Mouse tracking preset (persists to `display.mouse_tracking`) |
| `/terminal-setup` | Install VS Code / Cursor / Windsurf terminal bindings |
| `/indicator` | Busy-indicator style |

### Keybindings (differences from Classic CLI)

| Key | Action |
|-----|--------|
| `Ctrl+T` | Expand the live-work dock into the full-height `/agents` roster (Enter or `t` transcript, `d` details, `e` steer, `x` stop) |
| `Ctrl+R` / `F7` | Toggle the live dock between preview and one summary line |
| `Ctrl+X` | Open the live session switcher (deletes a highlighted queued message instead) |
| `Ctrl+G` / `Ctrl+X Ctrl+E` | Edit the input buffer in `$EDITOR` |
| `Cmd+V` / `Ctrl+V` | Text paste, then OSC52/native clipboard, then image attach |
| Mouse drag | Highlight text with a uniform selection background |

Session switcher: `Up`/`Down` move, `Enter` switch, `Ctrl+D` close, `Ctrl+N` new blank session, `Ctrl+R` refresh, `Esc` close; select `+new`, type a prompt, press `Enter` to dispatch (`Tab` first to pick a model).

### Configuration

```yaml
display:
  skin: default
  details_mode: collapsed    # hidden | collapsed | expanded
  sections:
    thinking: expanded
    tools: expanded
    activity: collapsed
  mouse_tracking: all        # off | wheel | buttons | all
  tui_status_indicator: kaomoji   # kaomoji | emoji | unicode | ascii
```

Per-section defaults: `thinking` expanded, `tools` expanded, `subagents` follows `details_mode`, `activity` hidden. Runtime: `/details [hidden|collapsed|expanded|cycle]` and `/details <section> [hidden|collapsed|expanded|reset]` (sections: `thinking`, `tools`, `subagents`, `activity`).

### Environment variables

| Name | Description |
|------|-------------|
| `HERMES_TUI` | `1` makes `hermes` / `hermes chat` use the TUI. |
| `HERMES_TUI_DIR` | Path to a prebuilt `ui-tui` directory (must contain `dist/entry.js`). |
| `HERMES_TUI_THEME` | `light`, `dark`, or a raw 6-char background hex; highest priority in light-terminal detection. |
| `HERMES_TUI_RESUME` | `1` (most recent TUI session) or a session ID to auto-resume. |
| `HERMES_TUI_GATEWAY_URL` | Internal wiring for the web dashboard's embedded chat; not a user-facing remote-attach knob. |

## Notes

- Requires Node.js >= 20 (the TUI runs as a subprocess; `hermes doctor` verifies) and a TTY; non-interactive environments fall back to single-query mode. On first launch Node dependencies install into `ui-tui/node_modules`.
- The classic CLI remains the shipped default. Sessions are shared with the classic CLI via `~/.hermes/state.db`. No TUI-specific config file exists.
- Banner sections (Tools open; Skills, System Prompt, MCP Servers collapsed) toggle by clicking the header; state resets on next launch.
- LaTeX math (`$E = mc^2$`, `$$\frac{a}{b}$$`) renders as Unicode math, always on; unsupported syntax falls back to a code span. Classic CLI keeps raw TeX.
- Light-terminal detection order: `HERMES_TUI_THEME`, then `COLORFGBG`, then an OSC 11 background probe.
- On macOS, `F7` is the physical function key (use Fn / globe, or enable standard function keys); `Ctrl+R` is the equivalent binding.
- `wheel` mouse tracking is recommended inside tmux to avoid hover-event "No image in clipboard" spam.
- If the spawned gateway dies, the TUI restarts it (bounded attempts per minute) and reopens the same saved session; the in-flight reply is lost. For an attached dashboard gateway, only the WebSocket drops and the TUI reconnects with backoff, reattaching to the same session.
- If the TUI fails to launch (no Node, missing bundle, TTY issue), Hermes prints a diagnostic and falls back.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/tui (v0.22.2).

## Related

- [CLI Interface](./interface.md)
- [Slash Commands Reference](./slash-commands.md)
- [CLI Symbols Glossary](./cli-symbols.md)
- [CLI Commands Reference](./commands.md)
