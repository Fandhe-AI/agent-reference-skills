<!-- source: https://code.claude.com/docs/en/skills.md / last verified: 2026-08-07 -->

# Custom slash command with arguments

A skill invoked as `/fix-issue 123`; the `$ARGUMENTS` placeholder is replaced with whatever follows the skill name. `commands.md` documents only built-in `/` commands and points to skills for custom ones ("To add custom commands, write a skill").

```yaml .claude/skills/fix-issue/SKILL.md
---
name: fix-issue
description: Fix a GitHub issue
disable-model-invocation: true
---

Fix GitHub issue $ARGUMENTS following our coding standards.

1. Read the issue description
2. Understand the requirements
3. Implement the fix
4. Write tests
5. Create a commit
```

Running `/fix-issue 123` sends Claude "Fix GitHub issue 123 following our coding standards...".

## Notes

- `disable-model-invocation: true` restricts the skill to manual `/fix-issue` invocation only; Claude cannot trigger it automatically.
- If a skill is invoked with arguments but doesn't include `$ARGUMENTS`, Claude Code appends `ARGUMENTS: <input>` to the end of the skill content instead.
- For positional access use `$ARGUMENTS[N]` or the shorthand `$N` (e.g. `$0`, `$1`); `.claude/commands/deploy.md` (legacy custom command) and `.claude/skills/deploy/SKILL.md` both create `/deploy` and work the same way.
- This is a Claude Code CLI feature. For the Agent SDK, see anthropic-agent-sdk. For Claude API (Messages API) Agent Skills / tool use, see anthropic-api-tools-mcp.
