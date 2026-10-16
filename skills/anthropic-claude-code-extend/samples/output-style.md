<!-- source: https://code.claude.com/docs/en/output-styles.md / last verified: 2026-10-17 -->

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
- Built-in styles (5): **Default**, **Proactive**, **Concise** (v2.1.237+), **Explanatory**, **Learning**.
- Applies to the main conversation only — a subagent runs its own system prompt and is unaffected (a fork inherits the parent's full system prompt instead).
- Switch with `/output-style <style>` (for example `/output-style concise`; no argument lists the styles). It also works in non-interactive mode and Agent SDK sessions, and via Remote Control (built-in styles only), from v2.1.269. Alternatively use `/config` or edit `outputStyle`.
- A mid-session switch applies from the next message (v2.1.251+; earlier versions needed `/clear` or a new session). Style files are read at startup, so restart Claude Code after creating or editing one.
- The `outputStyle` value is case-sensitive: `explanatory` does not match and gives the Default style, while the `/output-style` command ignores case.
- This is a Claude Code CLI feature. Agent SDK system-prompt customization is covered by anthropic-agent-sdk.
