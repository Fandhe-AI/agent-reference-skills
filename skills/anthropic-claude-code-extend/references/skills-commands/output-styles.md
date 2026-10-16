<!-- source: https://code.claude.com/docs/en/output-styles / last verified: 2026-10-17 -->

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

Built-in styles (five including Default): **Default** (existing system prompt), **Proactive** (executes immediately, assumes reasonable defaults, stronger autonomy than auto mode but still shows permission prompts), **Concise** (responses lead with the result and drop preamble, narration and recaps; answers a simple question in one to three sentences; safety-related content such as error reports, failing test output, security warnings and destructive-action confirmations stays at full length; v2.1.237+), **Explanatory** (adds "Insights" between steps), **Learning** (collaborative; adds `TODO(human)` markers for you to fill in).

File locations: `~/.claude/output-styles` (user), `.claude/output-styles` (project — loads from every nested directory between cwd and repo root, closest wins on name clash), `.claude/output-styles` under managed policy (org). Plugins ship an `output-styles/` directory.

## Notes

- Applies to the main conversation only; a subagent runs its own system prompt and isn't affected, except a fork which inherits the parent's full system prompt.
- When you switch styles mid-session, the new style applies from your next message (v2.1.251+; before that, `/clear` or a new session was needed).
- `/output-style [style]` (no argument lists the styles and marks the current one) saves the choice to `.claude/settings.local.json`; the `/config` terminal menu and the VS Code **Output styles** menu (v2.1.257+; creating a custom style file there needs v2.1.261+) do the same. The command also works in `-p`, the Agent SDK and over Remote Control (v2.1.269+; built-in styles only there) and ignores case. The command was removed in v2.1.91 and exists again in the current docs.
- The `outputStyle` setting value is case-sensitive (`Proactive`, `Concise`, `Explanatory`, `Learning`); a value that doesn't match exactly, such as `explanatory`, falls back to Default.
- This is a Claude Code CLI feature. For the Agent SDK equivalent, see anthropic-agent-sdk. For the Claude API (Messages API) Agent Skills / tool use, see anthropic-api-tools-mcp.

## Related

- [commands.md](./commands.md) — `/config` command that opens the style picker
- [skills.md](./skills.md) — task-specific instructions loaded on invocation, vs. an always-on style
