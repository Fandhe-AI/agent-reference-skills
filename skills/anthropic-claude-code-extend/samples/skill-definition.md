<!-- source: https://code.claude.com/docs/en/skills.md / last verified: 2026-08-07 -->

# Skill definition

A minimal SKILL.md with frontmatter and instructions, invoked automatically or via `/skill-name`.

```markdown ~/.claude/skills/summarize-changes/SKILL.md
---
description: Summarizes uncommitted changes and flags anything risky. Use when the user asks what changed, wants a commit message, or asks to review their diff.
---

## Current changes

!`git diff HEAD`

## Instructions

Summarize the changes above in two or three bullet points, then list any risks.
```

## Notes

- Scope by location, highest to lowest priority: enterprise (managed settings) > personal (`~/.claude/skills/`) > project (`.claude/skills/`) > plugin (`<plugin>/skills/`).
- Custom commands (`.claude/commands/deploy.md`) and skills (`.claude/skills/deploy/SKILL.md`) both create `/deploy`; a skill of the same name takes precedence.
- Only `description` is required in frontmatter; `disable-model-invocation: true` restricts it to manual `/name` invocation only.
- This is a Claude Code CLI feature. For the Agent SDK, see anthropic-agent-sdk. For Claude API (Messages API) Agent Skills / tool use, and the Skills API, see anthropic-api-tools-mcp.
