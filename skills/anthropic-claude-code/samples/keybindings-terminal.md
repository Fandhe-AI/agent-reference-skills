<!-- source: https://code.claude.com/docs/en/keybindings.md / last verified: 2026-08-07 -->

# Custom Keybindings and Terminal Setup

Rebind a keyboard shortcut in `~/.claude/keybindings.json` and configure a terminal (tmux) so Shift+Enter and notifications work correctly.

```json ~/.claude/keybindings.json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "$docs": "https://code.claude.com/docs/en/keybindings",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+u": null
      }
    }
  ]
}
```

```bash ~/.tmux.conf
# Fix Shift+Enter and desktop notifications inside tmux
set -g allow-passthrough on
set -s extended-keys on
set -as terminal-features 'xterm*:extkeys'
```

## Notes

- Run `/keybindings` to create or open `~/.claude/keybindings.json`; changes are auto-detected without restarting.
- Setting an action to `null` unbinds a default shortcut in that context (`Global`, `Chat`, `Settings`, etc.).
- Run `/terminal-setup` once (in the host terminal, not inside tmux/screen) to enable Shift+Enter in VS Code/Cursor/Alacritty/Zed and tune editor terminal settings.
- Reserved shortcuts cannot be rebound: Ctrl+C (interrupt), Ctrl+D (exit), Ctrl+M (Enter), Caps Lock.
- Example from the Claude Code docs (code.claude.com) `keybindings` and `terminal-config` pages.
