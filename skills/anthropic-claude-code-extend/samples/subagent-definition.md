<!-- source: https://code.claude.com/docs/en/sub-agents.md / last verified: 2026-08-07 -->

# Subagent definition in .claude/agents/

A project-scoped subagent with a restricted, read-only tool set, invoked by name or `@`-mention.

```markdown .claude/agents/code-reviewer.md
---
name: code-reviewer
description: Reviews code for quality and best practices. Use proactively after code changes.
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, analyze the code and provide
specific, actionable feedback on quality, security, and best practices.
```

## Notes

- Invoke explicitly with natural language ("Use the code-reviewer subagent to..."), by `@`-mention (`@agent-code-reviewer`), or run the whole session as this subagent with `claude --agent code-reviewer`.
- Only `name` and `description` are required; omitting `tools` inherits every tool available to subagents.
- Scope/precedence, highest to lowest: managed settings `.claude/agents/` > `--agents` CLI flag > project `.claude/agents/` > `~/.claude/agents/` > plugin `agents/` directory.
- This is a Claude Code CLI feature. Agent SDK subagent definitions are covered by anthropic-agent-sdk.
