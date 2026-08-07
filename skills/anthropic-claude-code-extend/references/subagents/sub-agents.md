<!-- source: https://code.claude.com/docs/en/sub-agents / last verified: 2026-08-07 -->

# Subagents

Specialized AI assistants that handle specific types of tasks in their own context window, with a custom system prompt, tool access, and permissions, then return a summary to the caller.

## Signature / Usage

```markdown title=".claude/agents/code-reviewer.md"
---
name: code-reviewer
description: Reviews code for quality and best practices. Use proactively after code changes.
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, analyze the code and provide
specific, actionable feedback on quality, security, and best practices.
```

Invoke explicitly with natural language ("Use the code-reviewer subagent to..."), by `@`-mention (`@agent-code-reviewer`), or run the whole session as that subagent with `claude --agent code-reviewer` / `"agent": "code-reviewer"` in `settings.json`.

## Built-in subagents

| Agent | Model | Tools | Purpose |
|---|---|---|---|
| Explore | Inherits (capped at Opus on Claude API), skips CLAUDE.md/git status | Read-only (no Write/Edit) | Fast codebase search/discovery |
| Plan | Inherits | Read-only | Research during plan mode |
| general-purpose | Inherits | Every tool available to subagents | Complex multi-step research + modification |
| claude | Inherits | Every tool available to subagents | Catch-all; default agent for `claude agents` background sessions |
| statusline-setup | Sonnet | — | `/statusline` configuration |
| claude-code-guide | Haiku | — | Questions about Claude Code itself |

A user/project subagent named `Explore` overrides the built-in one and keeps its own `model` field.

## Options / Props

Supported YAML frontmatter fields (only `name` and `description` required):

| Name | Type | Description |
|---|---|---|
| `name` | string | Unique identifier, lowercase + hyphens. No `:` (reserved for plugin-scoped IDs) |
| `description` | string | When Claude should delegate to this subagent |
| `tools` | string list | Allowlist of tools. Omit to inherit every tool available to subagents. `mcp__<server>` / `mcp__<server>__*` patterns supported |
| `disallowedTools` | string list | Denylist, removed from inherited/specified tools; applied before `tools` |
| `model` | string | `sonnet` \| `opus` \| `haiku` \| `fable` \| full model ID \| `inherit` (default) |
| `permissionMode` | string | `default` \| `acceptEdits` \| `auto` \| `dontAsk` \| `bypassPermissions` \| `plan` \| `manual` (alias of `default`) |
| `maxTurns` | number | Max agentic turns before the subagent stops |
| `skills` | string list | Skills preloaded (full content) into context at startup |
| `mcpServers` | list | MCP servers scoped to this subagent (name reference or inline config) |
| `hooks` | object | Lifecycle hooks scoped to this subagent (`PreToolUse`, `PostToolUse`, `Stop`→`SubagentStop`) |
| `memory` | string | `user` \| `project` \| `local` — persistent memory directory across sessions |
| `background` | boolean | Force background execution. Default: Claude decides (background by default as of v2.1.198) |
| `effort` | string | `low` \| `medium` \| `high` \| `xhigh` \| `max`, overrides session effort |
| `isolation` | string | `worktree` — run in an isolated git worktree |
| `color` | string | Display color in task list/transcript |
| `initialPrompt` | string | Auto-submitted first user turn when run as main session agent via `--agent` |

## Scope / precedence

| Location | Scope | Priority |
|---|---|---|
| Managed settings `.claude/agents/` | Organization-wide | 1 (highest) |
| `--agents` CLI flag | Current session | 2 |
| `.claude/agents/` | Current project | 3 |
| `~/.claude/agents/` | All projects | 4 |
| Plugin `agents/` directory | Where plugin enabled | 5 (lowest) |

## Notes

- For the Agent SDK's own subagent definitions, see anthropic-agent-sdk.
- Subagents run in foreground (blocks conversation) or background (concurrent, permission prompts surface in main session); background is the default as of v2.1.198, with a reduced built-in tool set.
- Nesting: a subagent can spawn its own subagents up to 3 layers deep by default (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`). Session cap: 200 subagents (`CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION`). Concurrent cap: 20 (`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`).
- A non-fork subagent starts with fresh context: its own system prompt, the delegation task message, CLAUDE.md hierarchy, a git status snapshot, and any preloaded skills. Explore/Plan skip CLAUDE.md and git status.
- A **fork** (`/subtask`, or `/fork` on older versions) inherits the entire conversation instead of starting fresh — same system prompt, tools, model, and message history as the main session; only its final result returns.
- Resume a finished subagent via `SendMessage` addressed to its agent ID/name to continue with full history instead of starting over.
- `Agent(agent-name)` syntax in `tools` restricts which subagent types a `--agent`-run main thread can spawn; `permissions.deny: ["Agent(name)"]` blocks a specific subagent globally.
- Subagent output is scanned for instruction-shaped patterns (e.g. fake `<system-reminder>` tags) before Claude reads it; matches get a `[harness: ...]` marker line, content is never altered/removed.

## Related

- [agents.md](./agents.md)
- [agent-teams.md](./agent-teams.md)
- [agent-view.md](./agent-view.md)
- [workflows.md](./workflows.md)
