<!-- source: https://code.claude.com/docs/en/interactive-mode.md / last verified: 2026-08-07 -->

# Interactive mode

Complete reference for keyboard shortcuts, input modes, and interactive features in Claude Code sessions.

## Signature / Usage

```bash
! npm test          # shell mode: run a command directly, response auto-generated
/                    # command or skill menu
@                    # file path mention / autocomplete
:heart:              # emoji shortcode (v2.1.217+)
/btw what was that config file called?   # side question, not added to history
```

Multiline input: `\` + `Enter` (any terminal), `Option+Enter` (macOS with Option-as-Meta), `Shift+Enter` (native in iTerm2/WezTerm/Ghostty/Kitty/Warp/Terminal.app/Windows Terminal), `Ctrl+J` (any terminal), or paste directly.

## Options / Props

| Shortcut | Description |
| --- | --- |
| `Ctrl+C` | Interrupt, or clear input (second press exits) |
| `Ctrl+D` | Exit session (double-press within 800ms) |
| `Ctrl+O` | Toggle transcript viewer |
| `Ctrl+R` | Reverse search command history |
| `Ctrl+B` | Background running Bash task/agent (tmux: press twice) |
| `Ctrl+T` | Toggle Claude's to-do task list |
| `Ctrl+S` | Stash / restore prompt draft |
| `Ctrl+Z` | Suspend Claude Code (Unix), `fg` to resume |
| `Shift+Tab` | Cycle permission modes (Manual/acceptEdits/plan/auto/bypassPermissions) |
| `Esc` / `Esc Esc` | Interrupt or close dialog / clear input draft or open rewind menu |
| `Option+P` / `Alt+P` | Switch model |
| `Option+T` / `Alt+T` | Toggle extended thinking |
| `Option+O` / `Alt+O` | Toggle fast mode |

Vim editor mode (`/config` → Editor mode) supports NORMAL/INSERT/VISUAL mode switching (`i`/`I`/`a`/`A`/`o`/`O`/`v`/`V`), navigation (`h``j``k``l`, `w`/`e`/`b`, `0`/`$`/`^`, `gg`/`G`, `f`/`F`/`t`/`T`), editing (`x`, `dd`, `D`, `dw`/`de`/`db`, `cc`/`C`, `yy`, `p`/`P`, `u`, `.`), and text objects (`iw`/`aw`, `i"`/`a"`, `i(`/`a(`, etc.).

## Notes

- `?` on an empty prompt toggles the shortcut help panel.
- Background Bash: output written to a file, auto-terminated if it exceeds 5GB; subagent-owned background commands terminate after 60 minutes by default (`CLAUDE_SUBAGENT_BG_SHELL_MAX_MS`).
- Shell mode (`!` prefix) auto-responds to command output as of v2.1.186; set `respondToBashCommands: false` to restore the old behavior of just adding output to context.
- `/btw` has full conversation visibility but no tool access; press `f` to fork it into a real session with tools.
- Session recap generates automatically after 3+ minutes away and at least 3 turns; `/recap` generates on demand.

## Related

- [fullscreen](./fullscreen.md)
- [accessibility](./accessibility.md)
- [voice-dictation](./voice-dictation.md)
