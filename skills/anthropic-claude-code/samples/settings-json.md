<!-- source: https://code.claude.com/docs/en/settings-example.md / last verified: 2026-10-17 -->

# Personal settings.json

A developer's personal `~/.claude/settings.json`: model and effort, terminal tweaks, status line, and pre-approved permissions.

```json ~/.claude/settings.json
{
  "model": "claude-sonnet-5",
  "modelSettings": {
    "claude-sonnet-5": { "effortLevel": "xhigh" }
  },
  "editorMode": "vim",
  "theme": "light-daltonized",
  "statusLine": {
    "type": "command",
    "command": "jq -r '\"[\\(.model.display_name)] \\(.context_window.used_percentage // 0)% context\"'",
    "padding": 2
  },
  "spinnerTipsEnabled": false,
  "preferredNotifChannel": "terminal_bell",
  "permissions": {
    "allow": [
      "Bash(git diff *)",
      "Read(~/.zshrc)"
    ]
  },
  "autoUpdatesChannel": "stable",
  "cleanupPeriodDays": 20
}
```

## Notes

- Scopes: `~/.claude/settings.json` (user, every project), `.claude/settings.json` (shared project, committed), `.claude/settings.local.json` (project local, personal). Team and organization examples: `settings-team.md`, `settings-managed.md`.
- Precedence, highest to lowest: Managed > Command line (`--settings`) > Project local > Shared project > User. A key at a higher level overrides the same key below it.
- List keys such as `permissions.allow` combine across files instead of overriding (a few keys such as `fallbackModel`, `modelPicker`, `availableModels` follow their own rules; see `references/settings/settings.md`). An `allow` rule in your local file does not outrank an `ask` rule from a project or managed file.
- Claude Code watches settings files and applies most edits (including `permissions` and `hooks`) without a restart. `model` is read only at session start; use `/model` to switch mid-session and `/effort` to change effort.
- The official page's "What each key does" tab uses comments, which Claude Code does not accept in a settings file; copy only the plain JSON.
- Run `/status` to see which settings sources loaded and `claude doctor` to list rejected entries.
- Example from the Claude Code docs (code.claude.com) `settings-example` page.
