<!-- source: https://code.claude.com/docs/en/output-styles / last verified: 2026-08-07 -->

# Output styles

Output styles change how Claude responds, not what Claude knows — they modify the system prompt to set role, tone, and output format. Use one when you keep re-prompting for the same voice/format every turn, or want Claude to act as something other than a software engineer. For project/codebase instructions, use CLAUDE.md instead.

## Signature / Usage

```markdown
---
name: Diagrams first
description: Lead every explanation with a diagram
keep-coding-instructions: true
---

When explaining code, architecture, or data flow, start with a Mermaid diagram showing the structure, then explain in prose.
```

Set without the menu:

```json
{
  "outputStyle": "Explanatory"
}
```

## Options / Props

Frontmatter fields:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | string | file name | Style name |
| `description` | string | none | Shown in the `/config` picker |
| `keep-coding-instructions` | boolean | `false` | Keep Claude Code's built-in software-engineering instructions alongside the custom instructions |
| `force-for-plugin` | boolean | `false` | Plugin styles only — auto-apply whenever the plugin is enabled, overriding the user's `outputStyle` setting |

Built-in styles: **Default** (existing system prompt), **Proactive** (executes immediately, assumes reasonable defaults, stronger autonomy than auto mode but still shows permission prompts), **Explanatory** (adds "Insights" between steps), **Learning** (collaborative; adds `TODO(human)` markers for you to fill in).

File locations: `~/.claude/output-styles` (user), `.claude/output-styles` (project — loads from every nested directory between cwd and repo root, closest wins on name clash), `.claude/output-styles` under managed policy (org). Plugins ship an `output-styles/` directory.

## Notes

- Applies to the main conversation only; a subagent runs its own system prompt and isn't affected, except a fork which inherits the parent's full system prompt.
- Takes effect after `/clear` or a new session — it's read once at session start.
- The standalone `/output-style` command was removed in v2.1.91; use `/config` or edit `outputStyle` directly.
- This is a Claude Code CLI feature. For the Agent SDK equivalent, see anthropic-agent-sdk. For the Claude API (Messages API) Agent Skills / tool use, see anthropic-api-tools-mcp.

## Related

- [commands.md](./commands.md) — `/config` command that opens the style picker
- [skills.md](./skills.md) — task-specific instructions loaded on invocation, vs. an always-on style
