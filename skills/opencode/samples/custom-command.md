---
source: https://opencode.ai/docs/commands/
---

# Custom Slash Command

Turn a prompt template into a `/review` command with a Markdown file or JSONC entry.

```md title=".opencode/commands/review.md"
---
description: Review code for correctness
agent: plan
model: anthropic/claude-sonnet-5-5#high
---

Review $ARGUMENTS. Report bugs first.
```

Run it from the TUI with a target:

```text
/review src/auth.ts
```

Define a command in JSONC (`template` is required there):

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "commands": {
    "review": {
      "description": "Review code for correctness",
      "template": "Review $ARGUMENTS. Report bugs first.",
    },
  },
}
```

Insert shell output into the prompt:

```md title=".opencode/commands/review-diff.md"
Review this diff:

!`git diff --stat && git diff`
```

## Notes

- Global commands live in `~/.config/opencode/commands/`, project commands in `.opencode/commands/`; nested paths become `/team/review`.
- `$ARGUMENTS` is the full argument string; `$1`, `$2` are positional, and quotes group words.
- Shell blocks run outside the agent's tool permission flow; only use trusted commands and never place untrusted arguments inside them.
- OpenCode commands are distinct from Claude Code slash commands (anthropic-claude-code-extend).
