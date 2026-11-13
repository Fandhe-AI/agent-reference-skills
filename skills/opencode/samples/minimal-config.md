---
source: https://opencode.ai/docs/config/
---

# Minimal opencode.jsonc

Create a project `opencode.jsonc` with the schema for editor validation and a default model.

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  // Use this model by default.
  "model": "anthropic/claude-sonnet-5-5",
}
```

## Notes

- OpenCode supports JSON and JSONC; use JSONC for comments or trailing commas.
- Project settings go in `opencode.json(c)` or `.opencode/opencode.json(c)`; global settings go in `~/.config/opencode/opencode.json(c)`. Closer files override farther ones, and the system config (`/etc/opencode` on Linux) overrides all of them.
- The root `model` default does not retain a `#variant`; agent and command model references can select one.
- Configuration, permissions, and agents here are distinct from Claude Code settings (anthropic-claude-code / anthropic-claude-code-admin).
