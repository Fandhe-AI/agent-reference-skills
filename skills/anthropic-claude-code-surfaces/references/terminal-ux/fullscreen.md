<!-- source: https://code.claude.com/docs/en/fullscreen.md / last verified: 2026-10-17 -->

# Fullscreen rendering

Alternative rendering path for the Claude Code CLI that eliminates flicker, keeps memory usage flat in long conversations, and adds mouse support, by drawing on the terminal's alternate screen buffer (like `vim`/`htop`).

## Signature / Usage

```bash
# Enable/disable inside a conversation (relaunches with conversation intact)
/tui fullscreen
/tui default
/tui               # print which renderer is active (shows the reason after a failed start)

# Equivalent via environment variable
CLAUDE_CODE_NO_FLICKER=1 claude

# Force classic renderer regardless of saved tui setting
CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1 claude
```

### Fullscreen by default

Attached background sessions render fullscreen, and other sessions in screen reader mode use the classic renderer. Otherwise Claude Code starts in the renderer from the first row that matches:

| Your situation | Renderer you start in |
| --- | --- |
| You set `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1` or `CLAUDE_CODE_NO_FLICKER=0` | Classic |
| You set `CLAUDE_CODE_NO_FLICKER=1` | Fullscreen |
| Claude Code turned fullscreen off after a failed fullscreen start on this machine | Classic |
| You're in iTerm2's `tmux -CC` integration mode, or connected over SSH to Claude Code running on Windows | Classic |
| You saved a `tui` setting | The renderer the setting names |
| Your session doesn't fetch feature flags from Anthropic, and Claude Code has stopped offering the startup dialog on this machine | Classic |
| Your session doesn't fetch feature flags, and this machine's first Claude Code launch ran v2.1.239 or later | Fullscreen |
| Your session fetches feature flags, and you first used Claude Code on or after May 6, 2026 | Fullscreen |
| Anything else | Classic |

Sessions that don't fetch feature flags include those through Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry, and those with telemetry turned off.

If you start in classic and haven't saved a `tui` setting, a startup dialog may offer the switch. Accepting relaunches like `/tui fullscreen` and saves the setting once the relaunched session has started successfully. Choosing **Not now** means it is not offered again on this machine. It stops after the dialog has been shown on three launches, answered or not.

## Options / Props

| Shortcut / Setting | Description |
| --- | --- |
| `Ctrl+o` | Toggle transcript mode (`/` search, `n`/`N` next/prev match, `[` write to native scrollback, `v` open in `$VISUAL`/`$EDITOR`) |
| `PgUp` / `PgDn` | Scroll half a screen |
| `Ctrl+Home` / `Ctrl+End` | Jump to start / jump to latest and resume auto-follow |
| `Ctrl+L` | Redraw the screen; the conversation and your input stay in place |
| `Cmd+K` | Same as `Ctrl+L` when the terminal passes it through (iTerm2 and Terminal.app clear their own screen; Claude Code repaints the conversation) |
| `CLAUDE_CODE_SCROLL_SPEED` | Multiply scroll distance (0.25-20); `/scroll-speed` adjusts interactively (dialog max 10; not available in the JetBrains IDE terminal) |
| `wheelScrollAccelerationEnabled` (settings.json) | Turn off wheel-spin acceleration (v2.1.174+) |
| `CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT=1` | Repaint every cell each frame (fixes stale text on ConPTY-backed hosts like Windows Terminal) |
| `CLAUDE_CODE_DISABLE_MOUSE=1` | Opt out of mouse capture, keeping flicker-free rendering |
| `CLAUDE_CODE_DISABLE_MOUSE_CLICKS=1` | Keep wheel scroll, drop click/drag/hover (`CLAUDE_CODE_DISABLE_MOUSE` takes precedence) |

### Transcript mode keys

| Key | Action |
| --- | --- |
| `/` | Open search. `Enter` accepts, `Esc` cancels and restores scroll position |
| `n` / `N` | Next / previous match (works after closing the search bar) |
| `j` / `k` or `↑` / `↓` | Scroll one line |
| `g` / `G` or `Home` / `End` | Jump to top or bottom |
| `{` / `}` | Jump to the previous / next prompt |
| `Ctrl+u` / `Ctrl+d` | Scroll half a page |
| `Ctrl+b` / `Ctrl+f` or `Space` / `b` | Scroll a full page |
| `Ctrl+o`, `Esc`, or `q` | Exit transcript mode |

### Mouse version gates

| Feature | Version |
| --- | --- |
| Click options in multi-select menus | v2.1.208+ |
| Click a `/config` value, scroll settings list with the wheel | v2.1.271+ |
| Mouse wheel scrolls select / multi-select menus | v2.1.280+ |
| Scrollbar in list panels (`/skills`, `/mcp`, `/plugin` Installed) | v2.1.281+ |
| Scrollbar `↑` / `↓` arrows; click the `↑ N more` / `↓ N more` row | v2.1.286+ |
| Click expands the output of a `!` shell command | v2.1.257+ |

## Notes

- `/focus` shows a quieter view: your last prompt, a one-line summary of tool calls with edit diffstats, and the final response. The setting persists across sessions; run `/focus` again to turn it off. In fullscreen rendering, `/diff` opens a panel beside the conversation.
- `/tui fullscreen` relaunch carries into the new session: the conversation as shown (after `/rewind`, it relaunches from the rewound point, not the longer transcript on disk), permission mode, effort level, the model last picked with `/model`, and `--allowed-tools` / `--disallowed-tools` / `--agent` / `--agents` / `--append-system-prompt` / `--system-prompt-snapshot`.
- Claude Code declines to relaunch when a restriction can't be passed: a `--system-prompt` replacement, a `--tools` allowlist, `--setting-sources`, or deny/ask rules added for this session only by a hook or SDK permission update. It prints `Cannot switch renderers in this session` with the reasons and saves nothing. `/tui` clears `CLAUDE_CODE_NO_FLICKER` from the relaunched process so the setting it writes takes effect.
- Mouse: click to position the cursor in the prompt, accept `/` and `@` suggestions, choose select-menu options, expand collapsed tool results, and open URLs / file paths (`Cmd`-click on macOS, `Ctrl`-click elsewhere). Drag selects; double-click selects a word, triple-click a line.
- Auto-follow: scrolling up pauses it and a `Jump to bottom` button appears (click it, press `Ctrl+End`, or scroll down to resume). Rebind `scroll:bottom` for keyboards without `Ctrl+End` (MacBook). `/config` has an Auto-scroll toggle. `selection:clear` is an action with no default binding that clears the selection.
- Copy on select: selected text copies automatically on mouse release (toggle in `/config`). With it off, press `Ctrl+Shift+c`; on kitty-protocol terminals `Cmd+c` also works.
- Screen reader mode always uses the classic renderer, except attached background sessions, which always render fullscreen regardless of the `tui` setting. Background sessions opened from agent view or `claude attach` always render fullscreen and ignore `tui` and `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN`.
- Failed-start fallback: if a fullscreen session crashes before starting successfully (first frame drawn, then 10s up or ended with `/exit`, Ctrl+C, Ctrl+D), the next session starts classic. After one failed start: `Claude Code's fullscreen renderer didn't finish starting last time on this machine` (fullscreen is retried next session). After two: `... has repeatedly failed to start on this machine` (stays classic until an update or `/tui fullscreen`, silently). Failed starts are counted per Claude Code version and reset by a successful fullscreen start. Before v2.1.236 Claude Code kept starting fullscreen after a failed start. With `CLAUDE_CODE_NO_FLICKER=1` the session renders fullscreen and is not counted.
- `Ctrl+L` / `Cmd+K` redraw while keeping the conversation. Before v2.1.280, starting with v2.1.260, they cleared the screen; before v2.1.238, a double `Ctrl+L` within two seconds ran `/clear`.
- Network (UNC) paths such as `\\server\share\file.ts` render as plain text with no link.
- Mouse capture replaces native terminal selection; hold your terminal's native-selection key (`Fn` on Terminal.app, `Option` on iTerm2, `Shift` elsewhere; in VS Code, Cursor, and Devin Desktop `Shift`, or `Option` on macOS with `terminal.integrated.macOptionClickForcesSelection`) for one-off native selection.
- Clipboard path: `pbcopy` on macOS; `wl-copy` (Wayland) or `xclip` / `xsel` (X11) on Linux; PowerShell `Set-Clipboard` on Windows and WSL. Inside tmux it also writes the tmux paste buffer; over SSH it falls back to OSC 52 (iTerm2 blocks OSC 52 until enabled; `/terminal-setup` enables it).
- Incompatible with iTerm2's `tmux -CC` integration mode; regular tmux (without `-CC`) works, with `set -g mouse on` needed for wheel scroll. tmux through the 3.6 series lacks synchronized output, so expect more flicker than in a bare terminal.
- On Windows, full repaint is enabled automatically for background sessions and agent view; set `CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT=1` only for interactive fullscreen sessions you launched directly.
- JetBrains IDE terminal: Claude Code applies its own scroll handling and ignores `CLAUDE_CODE_SCROLL_SPEED`; 2025.3 or later is recommended (2025.2 has scroll-wheel bugs that Claude Code mitigates at runtime).
- This is a research preview; report issues via `/feedback` or the `claude-code` GitHub repo.

## Related

- [interactive-mode](./interactive-mode.md)
- [accessibility](./accessibility.md)
