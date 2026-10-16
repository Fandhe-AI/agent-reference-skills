<!-- source: https://code.claude.com/docs/en/accessibility.md / last verified: 2026-10-17 -->

# Use Claude Code with a screen reader

Screen reader mode replaces the visual terminal interface with plain, linear labeled text that VoiceOver, NVDA, and similar tools read in order. Opt-in; requires Claude Code v2.1.181+.

## Signature / Usage

```bash
# One session
claude --ax-screen-reader

# Every session in this shell (Bash/Zsh)
export CLAUDE_AX_SCREEN_READER=1

# Every session on the machine — add to settings.json
# "axScreenReader": true
```

Precedence: `--ax-screen-reader` flag > `CLAUDE_AX_SCREEN_READER` env var > `axScreenReader` setting. `CLAUDE_AX_SCREEN_READER=0` forces the mode off even when the setting is `true`.

## Options / Props

| Label | Meaning |
| --- | --- |
| `you:` | Your messages |
| `claude:` | Claude's replies |
| `tool:` / `tool error:` | Tool activity / a failed tool |
| `error:` | An error in the conversation |
| `Permission Required:` | A permission prompt waiting for input |
| `Cost:` | Session cost summary at exit |

| Setting | Purpose |
| --- | --- |
| `CLAUDE_AX_STARTUP_QUIET_MS` | How long Claude Code waits after the confirmation line before it draws the first prompt in screen reader mode (default 3 seconds; any key ends the wait). Requires v2.1.217+ |
| `CLAUDE_AX_PREPARK_MS` | When set, how many milliseconds Claude Code holds the terminal cursor at the start of the current line before writing a new or changed line in screen reader mode. Requires v2.1.233+ |
| `CLAUDE_CODE_ACCESSIBILITY=1` | A terminal cursor that stays visible for screen magnifiers such as macOS Zoom. The cursor follows the input caret and, on v2.1.218+, the highlighted row in menus and panels such as `/config` and `/plugin` |
| `prefersReducedMotion` | Reduce/disable spinners and animations |
| `theme: dark-daltonized` / `light-daltonized` | Colorblind-friendly themes |
| `preferredNotifChannel: "terminal_bell"` | A terminal bell outside screen reader mode when Claude is waiting on you |

## Notes

- Menus and permission prompts become numbered lists; type the number and press Enter. The `/effort` slider becomes the same kind of numbered list. Yes/no prompts accept typed `y`/`n`.
- Windows Terminal has no jump-to-previous-prompt key by default; bind its `scrollToMark` action. macOS Terminal doesn't act on the OSC 133 markers and Claude Code doesn't emit them in WezTerm; search the scrollback for the `you:` label instead.
- Screen reader mode isn't needed in the VS Code extension's chat panel, which announces conversation activity to screen readers without any setting on v2.1.236+.
- Terminal bell rings when Claude finishes a reply, a permission prompt appears, or a tool running longer than 5 seconds finishes.
- Screen reader mode ignores the `tui` (fullscreen) setting except for attached background sessions, which still render fullscreen.
- Doesn't turn on automatically when a screen reader is detected; doesn't change non-interactive `-p` mode (already plain text).

## Related

- [interactive-mode](./interactive-mode.md)
- [fullscreen](./fullscreen.md)
