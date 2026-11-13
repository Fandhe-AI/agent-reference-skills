---
source: https://opencode.ai/docs/agents/
---

# Custom Agent

Define a read-only reviewer subagent as a Markdown file that the main agent can launch.

```md title=".opencode/agents/reviewer.md"
---
description: Reviews changes for correctness and regressions
mode: subagent
model: anthropic/claude-sonnet-5-5#high
permissions:
  - action: edit
    resource: "*"
    effect: deny
  - action: shell
    resource: "*"
    effect: deny
---

Review the current changes. List findings in severity order with file and line references.
```

Ask your primary agent to use it:

```text
Use the reviewer subagent to review my current changes.
```

Define an agent in JSONC under `agents`:

Adapted (not in the official docs): the official example denies only `edit`; the default policy allows `shell`, so a `shell` deny is added to keep the reviewer from changing files through shell commands.

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "agents": {
    "reviewer": {
      "description": "Reviews current changes",
      "mode": "subagent",
      "system": "Report findings in severity order.",
      "permissions": [
        { "action": "edit", "resource": "*", "effect": "deny" },
        { "action": "shell", "resource": "*", "effect": "deny" },
      ],
    },
  },
}
```

## Notes

- Adapted from the official docs: the JSONC `reviewer` example adds `{ "action": "shell", "resource": "*", "effect": "deny" }`, matching the Markdown example, because the default policy allows `shell`.
- Save agents in `~/.config/opencode/agents/<name>.md` (global) or `.opencode/agents/<name>.md` (project); a nested path becomes part of the agent ID.
- In Markdown the body is the `system` prompt; the frontmatter takes the same fields as an `agents` entry.
- The last matching permission rule wins; do not use legacy top-level fields such as `tools` or `permission` in V2.
- OpenCode agents are distinct from Claude Code subagents (anthropic-claude-code-extend).
