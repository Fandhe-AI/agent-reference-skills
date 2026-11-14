<!-- source: https://code.claude.com/docs/en/skills.md / last verified: 2026-11-14 -->

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
- All frontmatter fields are optional and only `description` is recommended; `disable-model-invocation: true` restricts the skill to manual `/name` invocation only.
- A skill that declares `allowed-tools` or hooks needs `Skill(name)` in `permissions.allow` to run unattended from scheduled tasks and `/loop` (2.1.325); a skill with `disable-model-invocation: true` doesn't run when a scheduled task fires with it as the prompt.
- Nested `.claude/skills/` directories below the start folder load the first time Claude touches a file there (`/add-dir <subdir>` loads them sooner); with the Bash sandbox on they load only when you start Claude Code there or `/cd` there (2.1.319).
- Source: https://code.claude.com/docs/en/skills.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.319, 2.1.325, retrieved 2026-11-14)
- This is a Claude Code CLI feature. For the Agent SDK, see anthropic-agent-sdk. For Claude API (Messages API) Agent Skills / tool use, and the Skills API, see anthropic-api-tools-mcp.
