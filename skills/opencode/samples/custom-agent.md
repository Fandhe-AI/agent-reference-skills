---
source: https://opencode.ai/docs/agents/
---

# Custom Agent

Define a read-only reviewer subagent as a Markdown file that the main agent can launch.

Adapted (not in the official docs): the official example denies only `edit` and `shell`. Every agent starts from an allow-all base policy, so the reviewer instead denies every action and allows only `read` and `glob` (still denying `.env` reads; `grep` stays denied because its permission resource is the search pattern, not the file path, so a `.env` read deny would not cover it). This also blocks `shell`, `subagent`, and MCP tools, which could otherwise change files.

```md title=".opencode/agents/reviewer.md"
---
description: Reviews changes for correctness and regressions
mode: subagent
model: anthropic/claude-sonnet-5-5#high
permissions:
  - action: "*"
    resource: "*"
    effect: deny
  - action: "read"
    resource: "*"
    effect: allow
  - action: "glob"
    resource: "*"
    effect: allow
  - action: "read"
    resource: "*.env"
    effect: deny
  - action: "read"
    resource: "*.env.*"
    effect: deny
---

Review the current changes. List findings in severity order with file and line references.
```

Ask your primary agent to use it:

```text
Use the reviewer subagent to review my current changes.
```

Define an agent in JSONC under `agents`:

Adapted (not in the official docs): the official example denies only `edit`. Every agent starts from an allow-all base policy, so the reviewer instead denies every action and allows only `read` and `glob` (still denying `.env` reads; `grep` stays denied because its permission resource is the search pattern, not the file path, so a `.env` read deny would not cover it). This also blocks `shell`, `subagent`, and MCP tools, which could otherwise change files.

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "agents": {
    "reviewer": {
      "description": "Reviews current changes",
      "mode": "subagent",
      "system": "Report findings in severity order.",
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

## Notes

- With `shell` denied, the reviewer cannot run `git diff`; the parent agent must include the diff or the changed files in the subagent prompt.
- Adapted from the official docs: the `reviewer` examples replace the `edit` (and `shell`) denies with a deny-all rule followed by `read` and `glob` allows and `.env` read denies. The last matching rule wins, and the base policy allows every action, so denying only `edit` and `shell` would still let the reviewer use `shell` or launch another agent through `subagent`.
- Save agents in `~/.config/opencode/agents/<name>.md` (global) or `.opencode/agents/<name>.md` (project); a nested path becomes part of the agent ID.
- In Markdown the body is the `system` prompt; the frontmatter takes the same fields as an `agents` entry.
- The last matching permission rule wins; do not use legacy top-level fields such as `tools` or `permission` in V2.
- OpenCode agents are distinct from Claude Code subagents (anthropic-claude-code-extend).
