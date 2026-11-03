---
source: https://developers.cloudflare.com/agents/concepts/agent-skills/
---

# Agent Skills

Agent Skills are an open format (a folder with a `SKILL.md`) for giving an agent specialized knowledge and repeatable workflows. The Agents SDK reads the format in `agents/skills`.

## Signature / Usage

```md
---
name: release-notes
description: Turn a list of changes into release notes. Use when the user asks for release notes, a changelog entry, or a summary of what shipped.
license: Apache-2.0
compatibility: Requires Node.js 20 or later
metadata:
  author: my-team
  version: "1.2"
---

1. Read `references/style-guide.md`.
2. Run `scripts/format-release-notes.js` with one line per change.
3. Reply with the formatted notes.
```

## Options / Props

Frontmatter fields:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string (required) | — | 1 to 64 chars; lowercase letters, digits, hyphens; cannot start or end with a hyphen or contain `--`; must match the directory name. |
| `description` | string (required) | — | 1 to 1,024 chars; says what the skill does and when to use it. |
| `license` | string | — | A license name or a bundled license file. |
| `compatibility` | string | — | 1 to 500 chars; environment requirements. |
| `metadata` | map | — | String keys to string values. |
| `allowed-tools` | string | — | Space-separated tools the skill may use without asking. Experimental; support varies. |

Progressive disclosure:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| 1. Catalog | stage | — | Each skill's `name` and `description` at session start (50 to 100 tokens per skill). |
| 2. Instructions | stage | — | Full `SKILL.md` body when a task matches (under 5,000 tokens recommended). |
| 3. Resources | stage | — | Scripts, references, assets when the instructions refer to them. |

Skill sources in the Agents SDK:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Computer Workspace | source | — | Skills as files the agent, a user, or your code can add and edit at runtime. |
| R2 | source | — | Many agents share one set of skills managed outside your Worker. |
| Code | source | — | Tests, or a small fixed set of skills that ships with your Worker. |

## Notes

- The Agents SDK checks every `SKILL.md` against the specification, loads skills that break a rule with a warning, and skips unusable ones (for example, without a description). Parse with `parseSkill()` and require no warnings to validate.
- It uses the shared `.agents/skills/` convention (`/workspace/.agents/skills/` in a Workspace). The model loads skills with the `activate_skill` and `read_skill_resource` tools; with a Workspace backend it runs skill scripts with the Workspace `exec` tool.
- Keep the body under 500 lines; move detail to `references/`; keep references one level deep. Scripts should never wait for interactive input, document `--help`, print structured output, keep output small, and be safe to run twice.
- Trust: a skill adds instructions to context and its scripts can run code; only load skills from trusted sources, limit script capabilities, and review changes to editable skills.
- These are the open Agent Skills format for Cloudflare agents, not the Claude Code Agent Skills documented by the anthropic-claude-code-extend skill or this repository's skill system, though the SKILL.md format is shared.

## Related

- [Tools](./tools.md)
- [What are agents?](./what-are-agents.md)
