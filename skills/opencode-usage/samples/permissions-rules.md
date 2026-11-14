---
source: https://opencode.ai/docs/permissions/
---

# Permission Rules

Ask before shell commands, allow routine Git inspection, and deny `git push`.

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git status *", "effect": "allow" },
    { "action": "shell", "resource": "git diff *", "effect": "allow" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
  ],
}
```

Ask before any access outside the project:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "external_directory", "resource": "*", "effect": "ask" },
  ],
}
```

## Notes

- The `git push *` deny matches commands that start with `git push`; variants such as `git -C . push` fall through to the `shell` `ask` rule.
- The last matching rule wins, so put broad rules first; with no match, OpenCode uses `ask`.
- V2 uses `permissions`, `shell`, and `subagent` instead of V1 `permission`, `bash`, and `task`.
- `shell` runs with the host user's authority; prefer a narrow allowlist over patterns meant to catch every dangerous command.
- OpenCode permissions are distinct from Claude Code permissions (anthropic-claude-code-admin).
