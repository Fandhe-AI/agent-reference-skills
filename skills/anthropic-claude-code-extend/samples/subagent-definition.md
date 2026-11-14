<!-- source: https://code.claude.com/docs/en/sub-agents.md / last verified: 2026-11-14 -->

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
- Subagent files are watched: add or edit one under `~/.claude/agents/` or `.claude/agents/` and the next delegation uses it (restart only after creating a scope's first agent file in a new `agents` directory, or after editing under an `--add-dir` directory). Claude Code skips a file with no `name`, no `description`, a `name` starting with `-` or containing `:`, or unparsable YAML.
- Fork mode is on by default from v2.1.302; set `CLAUDE_CODE_FORK_SUBAGENT=0` for Claude to wait for a subagent. `CLAUDE_CODE_SUBAGENT_EFFORT` (2.1.316) sets the effort subagents run at when nothing else names one, and `effort` in the frontmatter overrides the session level.
- Source: https://code.claude.com/docs/en/sub-agents.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.316, retrieved 2026-11-14)
- This is a Claude Code CLI feature. Agent SDK subagent definitions are covered by anthropic-agent-sdk.
