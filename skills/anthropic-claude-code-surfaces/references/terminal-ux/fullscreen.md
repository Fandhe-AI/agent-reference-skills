<!-- source: https://code.claude.com/docs/en/fullscreen.md / last verified: 2026-08-07 -->

# Fullscreen rendering

Alternative rendering path for the Claude Code CLI that eliminates flicker, keeps memory usage flat in long conversations, and adds mouse support, by drawing on the terminal's alternate screen buffer (like `vim`/`htop`).

## Signature / Usage

```bash
# Enable/disable inside a conversation (relaunches with conversation intact)
/tui fullscreen
/tui default
/tui               # print which renderer is active

# Equivalent via environment variable
CLAUDE_CODE_NO_FLICKER=1 claude

# Force classic renderer regardless of saved tui setting
CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1 claude
```

Sessions created on or after May 6, 2026 default to fullscreen; earlier sessions default to classic.

## Options / Props

| Shortcut / Setting | Description |
| --- | --- |
| `Ctrl+o` | Toggle transcript mode (`/` search, `n`/`N` next/prev match, `[` write to native scrollback, `v` open in `$VISUAL`/`$EDITOR`) |
| `PgUp` / `PgDn` | Scroll half a screen |
| `Ctrl+Home` / `Ctrl+End` | Jump to start / jump to latest and resume auto-follow |
| `CLAUDE_CODE_SCROLL_SPEED` | Multiply scroll distance (0.25-20); `/scroll-speed` adjusts interactively |
| `wheelScrollAccelerationEnabled` (settings.json) | Turn off wheel-spin acceleration (v2.1.174+) |
| `CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT=1` | Repaint every cell each frame (fixes stale text on ConPTY-backed hosts like Windows Terminal) |

## Notes

- Screen reader mode always uses the classic renderer, except attached background sessions, which always render fullscreen regardless of the `tui` setting.
- Mouse capture replaces native terminal selection; hold your terminal's native-selection key (`Fn` on Terminal.app, `Option` on iTerm2, `Shift` elsewhere) for one-off native selection, or set `CLAUDE_CODE_DISABLE_MOUSE=1` to opt out entirely (`CLAUDE_CODE_DISABLE_MOUSE_CLICKS=1` to keep wheel scroll but drop clicks).
- Incompatible with iTerm2's `tmux -CC` integration mode; regular tmux (without `-CC`) works fine, with `set -g mouse on` needed for wheel scroll.
- This is a research preview; report issues via `/feedback` or the `claude-code` GitHub repo.

## Related

- [interactive-mode](./interactive-mode.md)
- [accessibility](./accessibility.md)
