<!-- source: https://code.claude.com/docs/en/accessibility.md / last verified: 2026-08-07 -->

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
| `CLAUDE_CODE_ACCESSIBILITY=1` | Keep native cursor visible for screen magnifiers |
| `prefersReducedMotion` | Reduce/disable spinners and animations |
| `theme: dark-daltonized` / `light-daltonized` | Colorblind-friendly themes |

## Notes

- Menus and permission prompts become numbered lists; type the number and press Enter. Yes/no prompts accept typed `y`/`n`.
- Terminal bell rings when Claude finishes a reply, a permission prompt appears, or a tool running longer than 5 seconds finishes.
- Screen reader mode ignores the `tui` (fullscreen) setting except for attached background sessions, which still render fullscreen.
- Doesn't turn on automatically when a screen reader is detected; doesn't change non-interactive `-p` mode (already plain text).

## Related

- [interactive-mode](./interactive-mode.md)
- [fullscreen](./fullscreen.md)
