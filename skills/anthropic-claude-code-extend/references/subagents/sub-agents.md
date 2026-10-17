<!-- source: https://code.claude.com/docs/en/sub-agents / last verified: 2026-10-17 -->

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

### Built-in subagents

| Agent | Model | Tools | Purpose |
|---|---|---|---|
| Explore | Main conversation's model (Fable main session: see below) | Read-only (no Write/Edit) | Fast codebase search/discovery |
| Plan | Inherits (unless `CLAUDE_CODE_SUBAGENT_MODEL` is forced onto every subagent) | Read-only | Research during plan mode |
| general-purpose | `CLAUDE_CODE_SUBAGENT_MODEL` model if set and nothing assigns a model another way, otherwise the main conversation's model | Every tool available to subagents | Complex multi-step research + modification |
| claude | None of its own; follows the model order | Every tool available to subagents | Catch-all; default agent for `claude agents` background sessions |
| statusline-setup | Sonnet | — | `/statusline` configuration |
| claude-code-guide | Haiku | — | Questions about Claude Code itself |

Explore and Plan start without the CLAUDE.md files and the git status snapshot.

A user/project subagent named `Explore` overrides the built-in one and keeps its own `model` field.

Explore model under a Fable main session: with a Claude subscription, an Anthropic Console account, or an LLM gateway reached through `ANTHROPIC_BASE_URL`, Explore runs on the Opus model that the `opus` alias resolves to; on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, Claude Platform on AWS, or a Claude apps gateway, Explore stays on the main conversation's model.

Removing built-ins: `CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS=1` removes only Explore and Plan (v2.1.198+); in `-p` and the Agent SDK, `CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS=1` removes all built-in types.

## Options / Props

Supported YAML frontmatter fields (only `name` and `description` required):

| Name | Type | Description |
|---|---|---|
| `name` | string | Unique identifier, at most 256 characters (e.g. `code-reviewer`, `reviewer-v2`). No `:` (reserved for plugin-scoped IDs) |
| `description` | string | When Claude should delegate to this subagent |
| `tools` | string \| list | Allowlist of tools, as a comma-separated string or YAML list. Omit to inherit every tool available to subagents. `mcp__<server>` / `mcp__<server>__*` patterns supported |
| `disallowedTools` | string list | Denylist, removed from inherited/specified tools; applied before `tools` |
| `model` | string | `sonnet` \| `opus` \| `haiku` \| `fable` \| full model ID \| `inherit` (main conversation's model). When omitted, resolved in order: per-invocation `model` parameter → frontmatter `model` → `CLAUDE_CODE_SUBAGENT_MODEL` → main conversation's model |
| `permissionMode` | string | `default` \| `acceptEdits` \| `auto` \| `dontAsk` \| `bypassPermissions` \| `plan` \| `manual` (alias of `default`). Ignored for plugin subagents |
| `maxTurns` | number | Max agentic turns before the subagent stops |
| `autoCompactWindow` | number | Lower the auto-compact window for this subagent, `100000` to `1000000` (plain integer, not `200k`). Requires v2.1.296+; ignored when `CLAUDE_CODE_AUTO_COMPACT_WINDOW` is a positive integer |
| `skills` | string list | Skills preloaded (full content) into context at startup |
| `mcpServers` | list | MCP servers scoped to this subagent (name reference or inline config). Ignored for plugin subagents |
| `hooks` | object | Lifecycle hooks scoped to this subagent (`PreToolUse`, `PostToolUse`, `Stop`→`SubagentStop`). Ignored for plugin subagents |
| `memory` | string | `user` \| `project` \| `local` — persistent memory directory across sessions |
| `omitClaudeMd` | boolean | `true` starts the subagent without the user, project and local CLAUDE.md files (managed policy files still load, except for managed subagents). Ignored when run as main session agent via `--agent` or the `agent` setting. Requires v2.1.271+ |
| `background` | boolean | Keep this subagent in the background even when Claude asks for the foreground. Where fork mode is on, Claude Code already runs spawned subagents in the background |
| `effort` | string | `low` \| `medium` \| `high` \| `xhigh` \| `max`; overrides session effort but not `CLAUDE_CODE_EFFORT_LEVEL`; available levels depend on the model |
| `isolation` | string | `worktree` — run in an isolated git worktree |
| `color` | string | Display color in task list/transcript: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan` |
| `initialPrompt` | string | Auto-submitted first user turn when run as main session agent via `--agent`. Ignored for plugin subagents |
| `experimental` | map | `cacheTtl: 5m \| 1h` chooses the prompt cache lifetime for this subagent's requests (write it inside `experimental`, not at top level; `1h` ignored while the subscription uses usage credits). Requires v2.1.248+ |

### Scope / precedence

| Location | Scope | Priority |
|---|---|---|
| Managed settings `.claude/agents/` | Organization-wide | 1 (highest) |
| `--agents` CLI flag | Current session | 2 |
| `.claude/agents/` | Current project | 3 |
| `~/.claude/agents/` | All projects | 4 |
| Plugin `agents/` directory | Where plugin enabled | 5 (lowest) |

## Notes

- For the Agent SDK's own subagent definitions, see anthropic-agent-sdk.
- Subagents run in foreground (blocks conversation) or background (concurrent, permission prompts surface in main session). Fork mode is on by default in interactive sessions from v2.1.232 (earlier: `CLAUDE_CODE_FORK_SUBAGENT=1`) and off in `-p` and the Agent SDK; `CLAUDE_CODE_FORK_SUBAGENT=1` turns it on everywhere, `0` off everywhere. While fork mode is on, Claude Code runs spawned subagents (forks and non-fork alike) in the background and Claude can't request the foreground. With fork mode off, Claude runs them in the background by default and in the foreground when it needs the result; the `background` frontmatter field keeps one in the background. `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` forces the foreground.
- Nesting: a subagent can spawn its own subagents up to 3 layers deep by default (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`; 1 turns nesting off). Concurrent cap: 20 (`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`, v2.1.217+). There is no limit on the total number of subagents over a session. Version history: v2.1.172–216 nested up to 5 layers by default (not changeable); v2.1.217–218 defaulted to 1; v2.1.219 raised the default to 3.
- Discovery: `.claude/agents/` and `~/.claude/agents/` are scanned recursively (subfolders don't affect identity; identity is the `name` field). Plugin `agents/` is also scanned recursively, and a subfolder becomes part of the scoped ID (`agents/review/security.md` in plugin `my-plugin` is `my-plugin:review:security`). `--add-dir` / `/add-dir` also loads that directory's `.claude/agents/` (not watched; restart after editing).
- A non-fork subagent starts with fresh context: its own system prompt, the delegation task message, CLAUDE.md hierarchy, a git status snapshot, and any preloaded skills. Explore/Plan skip CLAUDE.md and git status. `omitClaudeMd: true` limits CLAUDE.md to managed policy files (none for managed subagents); git status is absent outside a Git repository or when `includeGitInstructions` is off.
- A **fork** (`/subtask`, v2.1.212+; `/fork` on v2.1.161–v2.1.211, and again when agent view is turned off) inherits the entire conversation instead of starting fresh — same system prompt, tools, model, and message history as the main session; only its final result returns. While agent view is on, `/fork` instead copies the whole session into a new background session.
- Resume a finished subagent via `SendMessage` addressed to its agent ID/name to continue with full history instead of starting over. Built-in Explore and Plan are one-shot (no agent ID) and cannot be resumed.
- `Agent(agent-name)` syntax in `tools` restricts which subagent types a `--agent`-run main thread can spawn; `permissions.deny: ["Agent(name)"]` blocks a specific subagent globally.
- Subagent output is scanned before Claude reads it (v2.1.210+): text imitating Claude Code output (e.g. a `<system-reminder>` tag, `Human:` / `Assistant:` lines) gets a backslash inserted, and instruction-shaped matches get a `[harness: ...]` marker line; nothing is removed or reworded.

## Related

- [agents.md](./agents.md)
- [agent-teams.md](./agent-teams.md)
- [agent-view.md](./agent-view.md)
- [workflows.md](./workflows.md)
