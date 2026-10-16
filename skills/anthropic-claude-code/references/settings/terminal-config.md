<!-- source: https://code.claude.com/docs/en/terminal-config.md / last verified: 2026-10-16 -->

# Configure your terminal for Claude Code

Fixes for terminal-specific quirks: Shift+Enter for newlines, terminal bell/notifications, tmux, color theme matching, and Vim mode. This page is about getting the *terminal* to send the right signals; to change which keys Claude Code itself responds to, see keybindings.

## Enter multiline prompts

Enter submits; Ctrl+J or `\` + Enter always inserts a newline. Shift+Enter works natively in Ghostty/Kitty/iTerm2/WezTerm/Warp/Apple Terminal/Windows Terminal, and in other terminals that support the kitty keyboard protocol, such as foot and Alacritty 0.16 or later (requires Claude Code v2.1.269 or later); run `/terminal-setup` once for VS Code/Cursor/Devin Desktop/Alacritty before 0.16/Zed; not available in gnome-terminal or JetBrains IDEs. `/terminal-setup` also sets `terminal.integrated.gpuAcceleration: "off"` and tunes `mouseWheelScrollSensitivity` in VS Code-family editors. Run it in the host terminal, not inside tmux/screen. Inside tmux, Shift+Enter also needs the tmux config below.

## Enable Option key shortcuts on macOS

Most macOS terminals don't send Option as a modifier by default ("Use Option as Meta Key").

| Terminal | Fix |
| --- | --- |
| Apple Terminal | Settings → Profiles → Keyboard → "Use Option as Meta Key" (done automatically by first-run `/terminal-setup`) |
| iTerm2 | Settings → Profiles → Keys → General → Left/Right Option key → "Esc+"; `/terminal-setup` also enables clipboard access |
| VS Code | Add `"terminal.integrated.macOptionIsMeta": true` |

## Get a terminal bell or notification

Desktop notification is sent by default only in Ghostty/Kitty/iTerm2. Elsewhere, set `preferredNotifChannel: "terminal_bell"`:

```json ~/.claude/settings.json
{ "preferredNotifChannel": "terminal_bell" }
```

iTerm2 requires enabling: Settings → Profiles → Terminal → "Notification Center Alerts" → Filter Alerts → "Send escape sequence-generated alerts".

### Play a sound with a Notification hook

```json ~/.claude/settings.json
{
  "hooks": {
    "Notification": [
      { "hooks": [{ "type": "command", "command": "afplay /System/Library/Sounds/Glass.aiff" }] }
    ]
  }
}
```

## See session status in your terminal

If your terminal implements the OSC 7501 Program Status Protocol, it can show whether each interactive Claude Code session is working, waiting on you, or done. There is nothing to turn on in Claude Code. If your terminal implements the protocol and you see no status, check: Claude Code version (status reporting requires v2.1.295 or later); tmux (inside tmux, Claude Code checks tmux for support instead of your terminal, and `allow-passthrough` has no effect on that; start the session outside tmux); background sessions (they don't report status to your terminal, even while attached; agent view shows it instead); and `CLAUDE_CODE_DISABLE_TERMINAL_TITLE=1` (Claude Code then doesn't check for support or report status).

## Fix Backspace deleting a whole word on Windows

On Windows, Claude Code reads a Backspace that arrives as `^H` as Ctrl+Backspace, which deletes the previous word, except when `TERM_PROGRAM` is `mintty` or `TERM` is `cygwin`. On macOS and Linux it reads it as plain Backspace. If each press of Backspace deletes a whole word, set `CLAUDE_CODE_BS_AS_CTRL_BACKSPACE=0`; if Ctrl+Backspace erases only one character on macOS or Linux because your terminal sends `^H` for it, set it to `1`.

## Configure tmux

Inside tmux, Shift+Enter and desktop notifications/progress bar break by default. Add to `~/.tmux.conf`, then `tmux source-file ~/.tmux.conf`:

```bash ~/.tmux.conf
set -g allow-passthrough on
set -s extended-keys on
set -as terminal-features 'xterm*:extkeys'
```

## Match the color theme

`/theme` (or the picker in `/config`) selects a built-in theme, a custom theme, or one from an installed plugin; "auto" follows the terminal's light/dark background.

### Create a custom theme

Each custom theme is a JSON file in `~/.claude/themes/`; filename (minus `.json`) is the slug, stored as `custom:<slug>`.

```json ~/.claude/themes/dracula.json
{
  "name": "Dracula",
  "base": "dark",
  "overrides": { "claude": "#bd93f9", "error": "#ff5555", "success": "#50fa7b" }
}
```

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Display label in `/theme` (default: filename slug) |
| `base` | string | `dark`, `light`, `dark-daltonized`, `light-daltonized`, `dark-ansi`, `light-ansi` (default `dark`) |
| `overrides` | object | Color-token → value map (unset tokens fall through to `base`) |

Color values: `#rrggbb`, `#rgb`, `rgb(r,g,b)`, `ansi256(n)`, `ansi:<name>` (16 standard ANSI names). Unknown tokens/invalid values are ignored (won't break rendering). Files in `~/.claude/themes/` hot-reload (restart once if the folder didn't exist at startup).

The `effortUltra` token is the `ultracode` tag on the input box border while ultracode is on; overriding it takes effect on Claude Code v2.1.239 or later.

Token groups: text/accent (`claude`, `text`, `inverseText`, `inactive`, `subtle`, `suggestion`, `permission`, `remember`), status (`success`, `error`, `warning`, `merged`), input/mode (`promptBorder`, `planMode`, `autoAccept`, `bashBorder`, `ide`, `fastMode`), diff (`diffAdded`, `diffRemoved`, `diffAddedDimmed`, `diffRemovedDimmed`, `diffAddedWord`, `diffRemovedWord`), fullscreen-only (`userMessageBackground`, `userMessageBackgroundHover`, `bashMessageBackgroundColor`, `memoryBackgroundColor`, `selectionBg`), usage/labels (`rate_limit_fill`, `rate_limit_empty`, `briefLabelYou`, `briefLabelClaude`), plus shimmer pairs (e.g. `claude`/`claudeShimmer`), 8 named subagent colors (`<color>_FOR_SUBAGENTS_ONLY`), and 7 `rainbow_<color>` tokens for the `ultrathink` gradient.

## Switch to fullscreen rendering

`/tui fullscreen` (or `CLAUDE_CODE_NO_FLICKER=1` at launch) switches to a dedicated full-screen buffer instead of scrollback, keeping memory flat and adding mouse support. Scroll with mouse/PageUp inside Claude Code rather than terminal scrollback. If only flicker is the issue and synchronized output isn't auto-detected (e.g. Emacs `eat`), set `CLAUDE_CODE_FORCE_SYNC_OUTPUT=1` instead. Not available in screen reader mode.

## Paste large content

Pastes over 800 characters or 2 lines collapse to a placeholder like `[Pasted text #1 +120 lines]`; full content is still sent on submit. VS Code's integrated terminal can drop characters on very large pastes — prefer writing to a file and asking Claude to read it.

## Edit prompts with Vim keybindings

`/config` → Editor mode, or `editorMode: "vim"` in settings. Supports a subset of NORMAL/VISUAL motions and operators (`hjkl`, `v`/`V`, `d`/`c`/`y` + text objects). Not remappable via the keybindings file — use `vimInsertModeRemaps` for INSERT-mode sequences like `jj`→Escape. Enter still submits in INSERT mode (unlike standard Vim); use `o`/`O` or Ctrl+J for a newline.

## Notes

- `CLAUDE_CODE_FORCE_SYNC_OUTPUT`, `CLAUDE_CODE_NO_FLICKER`, and `FORCE_HYPERLINK` are environment variables documented in `env-vars.md`.

## Related

- [keybindings.md](./keybindings.md): remapping any Claude Code shortcut, including Enter/Shift+Enter
- [statusline.md](./statusline.md): OSC 8 hyperlink support and terminal width detection (`COLUMNS`/`LINES`)
