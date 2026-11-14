---
source: https://opencode.ai/docs/config/#permissions
---

# Config: Permissions, Policies, Agents

Config keys for permission rules, policy statements, and agent definitions.

## Signature / Usage

### Permissions

Define ordered rules that allow, deny, or ask before an agent uses a tool on a
matching resource.

```jsonc
{
  "permissions": [
    {
      "action": "shell",
      "resource": "git push *",
      "effect": "ask",
    },
  ],
}
```

See the [permissions guide](https://opencode.ai/docs/permissions/) for rule matching and available actions.

### Policies

Allow or deny use of a provider, hard-deny a permission check, or block an MCP
server, skill, or plugin, with ordered statements that broader configuration can
override.

```jsonc
{
  "policies": [
    { "action": "provider.use", "resource": "*", "effect": "deny" },
    { "action": "provider.use", "resource": "anthropic", "effect": "allow" },
    { "action": "tool.use", "resource": "shell:git push *", "effect": "deny" },
  ],
}
```

See the [policies guide](https://opencode.ai/docs/policies/) for matching, precedence across configuration
files, and Console-managed policy.

### Agents

Override built-in agents or define specialized agents with their own model,
instructions, mode, and permissions.

Adapted (not in the official docs): the official example denies only `edit`. Every agent starts from an allow-all base policy, so the reviewer instead denies every action and allows only `read` and `glob` (still denying `.env` reads; `grep` stays denied because its permission resource is the search pattern, not the file path, so a `.env` read deny would not cover it). This also blocks `shell`, `subagent`, and MCP tools, which could otherwise change files.

```jsonc
{
  "agents": {
    "reviewer": {
      "description": "Review changes without editing files",
      "mode": "subagent",
      "system": "Focus on correctness, security, and missing tests.",
      "permissions": [
        { "action": "*", "resource": "*", "effect": "deny" },
        { "action": "read", "resource": "*", "effect": "allow" },
        { "action": "glob", "resource": "*", "effect": "allow" },
        { "action": "read", "resource": "*.env", "effect": "deny" },
        { "action": "read", "resource": "*.env.*", "effect": "deny" },
      ],
    },
  },
}
```

See the [agents guide](https://opencode.ai/docs/agents/) for all agent options and file-based agents.

## Notes

- With `shell` denied, the reviewer cannot run `git diff`; the parent agent must include the diff or the changed files in the subagent prompt.
- Adapted from the official docs: the `reviewer` example replaces the `edit`-only deny with a deny-all rule followed by `read` and `glob` allows and `.env` read denies. The last matching rule wins, and the base policy allows every action, so denying only `edit` would still let the reviewer use `shell` or launch another agent through `subagent`.
- OpenCode permissions, policies, and agents are distinct from Claude Code (anthropic-claude-code / anthropic-claude-code-extend / anthropic-claude-code-admin) equivalents.

## Related

- [config-schema.md](./config-schema.md)
- [config-integrations.md](./config-integrations.md)
