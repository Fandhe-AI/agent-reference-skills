<!-- source: https://code.claude.com/docs/en/accessibility.md / last verified: 2026-11-14 -->

# Use Claude Code with a screen reader

Screen reader mode replaces the visual terminal interface with plain, linear labeled text that VoiceOver, NVDA, and similar tools read in order. Opt-in; also covers settings for screen magnifiers, reduced motion, and colorblind-friendly themes.

## Signature / Usage

```bash
# One session
claude --ax-screen-reader

# Every session in this shell (Bash/Zsh)
export CLAUDE_AX_SCREEN_READER=1

# Every session on the machine — add to settings.json
# "axScreenReader": true
```

In PowerShell: `$env:CLAUDE_AX_SCREEN_READER = "1"`. Over SSH, set the variable or setting on the remote machine where Claude Code runs.

Precedence: `--ax-screen-reader` flag > `CLAUDE_AX_SCREEN_READER` env var > `axScreenReader` setting. `CLAUDE_AX_SCREEN_READER=0` forces the mode off even when the setting is `true`. The first printed line confirms the mode: `[Screen Reader Mode: on via flag]`, `[Screen Reader Mode: on via env]`, or `[Screen Reader Mode: on via settings]`.

## Options / Props

| Label | Meaning |
| --- | --- |
| `you:` | Your messages |
| `claude:` | Claude's replies |
| `thinking:` | Claude's thinking |
| `tool:` / `tool error:` | Tool activity / a failed tool |
| `error:` | An error in the conversation, such as a failed API request |
| `warning:` | A warning from Claude Code, such as a switch to a fallback model |
| `Permission Required:` | A permission prompt waiting for input |
| `Cost:` | Session cost summary at exit, if your account shows costs |

| Setting | Purpose |
| --- | --- |
| `CLAUDE_AX_STARTUP_QUIET_MS` | How long Claude Code waits after the confirmation line before it draws the first prompt in screen reader mode (default 3 seconds; any key ends the wait). Requires v2.1.217+ |
| `CLAUDE_AX_PREPARK_MS` | When set, how many milliseconds Claude Code holds the terminal cursor at the start of the current line before writing a new or changed line in screen reader mode. Requires v2.1.233+ |
| `CLAUDE_CODE_ACCESSIBILITY=1` | A terminal cursor that stays visible for screen magnifiers such as macOS Zoom. The cursor follows the input caret and, on v2.1.218+, the highlighted row in menus and panels such as `/config` and `/plugin` |
| `prefersReducedMotion` | Reduce/disable spinners, shimmer, and animations when `true` |
| `theme: dark-daltonized` / `light-daltonized` | Colorblind-friendly themes (also via `/theme`) |
| `preferredNotifChannel: "terminal_bell"` | A terminal bell outside screen reader mode when Claude is waiting on you |

## Notes

- Project settings can't turn the mode on: Claude Code ignores the `axScreenReader` key and a `CLAUDE_AX_SCREEN_READER` value under `env` in `.claude/settings.json` and `.claude/settings.local.json`, and prints `Screen reader mode is off: project settings can't turn it on`. Use the flag, a shell variable, or user settings. To silence the line, set `"axScreenReader": false` in user settings or remove the project keys.
- Output is flat text: no box-drawing chrome, no color-only cues, no redraws of unchanged content (spinners are static text), tables read as `Header: value` sentences, diffs are plain `+` / `-` lines. Everything stays in scrollback.
- The cursor stays on the input caret and only changed characters are written; deleting words or lines with the text editing shortcuts (`Ctrl+W`, `Alt+D`, `Option+Delete`, `Ctrl+Backspace`, `Ctrl+U`, `Cmd+Backspace`, `Ctrl+K`) announces the deleted text. `Shift+Tab` permission-mode changes are announced once (e.g. `[plan mode on]`).
- Menus and permission prompts become numbered lists (`Select with numbers`); type the number and press Enter, `Escape` cancels menus ending `or Escape to cancel`. The `/effort` slider becomes the same list. Yes/no prompts accept typed `y`/`n` (`yes`/`no` also work).
- If your screen reader jumps back to the prompt while reading, it is following the terminal cursor; in NVDA press `NVDA+6` to stop (and again to resume) the review cursor following it.
- Turn-boundary OSC 133 markers support jump-to-previous-prompt: iTerm2 `Cmd+Shift+Up`; VS Code terminal `Ctrl+Up` (Windows) / `Cmd+Up` (macOS); Windows Terminal has no default key, bind `scrollToMark`; Kitty and Ghostty: check the terminal docs. macOS Terminal doesn't act on the markers and Claude Code doesn't emit them in WezTerm; search the scrollback for the `you:` label instead.
- Terminal bell rings when Claude finishes a reply, a prompt or dialog needs an answer, or a tool that ran longer than 5 seconds finishes. Silence it in your terminal application.
- Screen reader mode isn't needed in the VS Code extension's chat panel, which announces conversation activity to screen readers without any setting on v2.1.236+.
- Known limitations: the mode doesn't turn on automatically when a screen reader runs; a permission mode change made with a command such as `/plan` isn't announced; attaching to a background session (`claude attach` or agent view) enters the alternate screen with no native scrollback (press Left Arrow on an empty prompt, or Ctrl+Z if a dialog has focus, to leave); costs are announced at exit, not per turn; it doesn't change non-interactive `-p` mode (already plain text).
- Screen reader mode ignores the `tui` (fullscreen) setting except for attached background sessions, which still render fullscreen.
- Report issues on the claude-code GitHub issue tracker, naming your assistive technology, OS, and terminal.
- Source: https://code.claude.com/docs/en/accessibility.md (fetched 2026-11-14). The earlier "requires v2.1.181+" statement does not appear in the current source and was removed.

## Related

- [interactive-mode](./interactive-mode.md)
- [fullscreen](./fullscreen.md)
