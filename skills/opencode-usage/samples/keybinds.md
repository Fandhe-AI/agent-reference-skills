---
source: https://opencode.ai/docs/cli/keybinds/
---

# Custom Keybinds

Customize TUI key bindings and the leader key in `cli.json`.

```json title="cli.json"
{
  "keybinds": {
    "leader": "ctrl+space",
    "command.palette.show": "ctrl+k",
    "app.exit": ["ctrl+c", "ctrl+d"],
    "app.debug": false
  },
  "leader": {
    "timeout": 1500
  }
}
```

Reference the leader key in another binding:

```json
{
  "keybinds": {
    "leader": "ctrl+space",
    "model.list": "<leader>m"
  },
  "leader": {
    "timeout": 2000
  }
}
```

## Notes

- A binding takes a string, an array, comma-separated alternatives, or an object (`key`, `preventDefault`); disable it with `"none"` or `false`.
- `leader` defaults to `ctrl+x`. Unknown command IDs are ignored.
- Keybinds live in `cli.json`, not `opencode.jsonc`, and are distinct from Claude Code keybindings (anthropic-claude-code).
