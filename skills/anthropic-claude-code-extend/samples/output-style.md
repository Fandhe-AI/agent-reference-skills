<!-- source: https://code.claude.com/docs/en/output-styles.md / last verified: 2026-08-07 -->

# Output style definition

A custom output style that changes response format (not what Claude knows) by rewriting the system prompt.

```markdown .claude/output-styles/diagrams-first.md
---
name: Diagrams first
description: Lead every explanation with a diagram
keep-coding-instructions: true
---

When explaining code, architecture, or data flow, start with a Mermaid diagram showing the structure, then explain in prose.
```

Set the active style without opening the picker:

```json .claude/settings.json
{
  "outputStyle": "Explanatory"
}
```

## Notes

- `keep-coding-instructions: true` keeps Claude Code's built-in software-engineering instructions alongside the custom ones; omit it to fully replace them.
- Built-in styles: **Default**, **Proactive**, **Explanatory**, **Learning**.
- Applies to the main conversation only — a subagent runs its own system prompt and is unaffected (a fork inherits the parent's full system prompt instead).
- Takes effect after `/clear` or a new session; it is read once at session start. The standalone `/output-style` command was removed — use `/config` or edit `outputStyle` directly.
- This is a Claude Code CLI feature. Agent SDK system-prompt customization is covered by anthropic-agent-sdk.
