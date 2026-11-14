<!-- source: https://code.claude.com/docs/en/agent-sdk/subagents / last verified: 2026-11-14 -->

# Subagents in the SDK

Separate agent instances the main agent can spawn to isolate context, run tasks in parallel, and apply specialized instructions, defined programmatically via the `agents` option.

## Signature / Usage

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Review the authentication module for security issues",
  options: {
    allowedTools: ["Read", "Grep", "Glob", "Agent"],
    agents: {
      "code-reviewer": {
        description: "Expert code review specialist. Use for quality, security reviews.",
        prompt: "You are a code review specialist...",
        tools: ["Read", "Grep", "Glob"],
        model: "sonnet"
      }
    }
  }
})) {
  if ("result" in message) console.log(message.result);
}
```

### Forked subagents

A fork is a subagent that copies the conversation so far instead of starting fresh. From Claude Code v2.1.302, Claude can start forks with nothing configured by calling the Agent tool with `subagent_type: "fork"`. To stop it, deny only the fork type:

```typescript
const options = {
  // Deny only the fork subagent type; other subagents still run
  disallowedTools: ["Agent(fork)"]
};
```

```python
options = ClaudeAgentOptions(
    # Deny only the fork subagent type; other subagents still run
    disallowed_tools=["Agent(fork)"],
)
```

### Cap subagent depth, concurrency, and spend

Describes TypeScript SDK v0.3.219 / Python SDK v0.2.127 and later (bundling Claude Code v2.1.219+). Set depth and concurrency through the `env` option and spend as a query option:

| Limit | Set it with | Default | At the limit |
|------|------|------|------|
| Depth | `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` | `3` layers; `1` stops your subagents from spawning their own | A bottom-layer subagent cannot spawn and does the work itself |
| Concurrency | `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` | `20` | Spawn refused with `Concurrent subagent limit reached` until the count drops; ultracode sessions are never refused |
| Spend | `maxBudgetUsd` / `max_budget_usd` | No limit (subagent requests count) | Refuses to spawn (`Budget limit reached`), stops running background subagents, ends the query with `error_max_budget_usd` |

```typescript
options: {
  allowedTools: ["Read", "Grep", "Glob", "Agent"],
  // env replaces the subprocess environment, so spread process.env to keep PATH
  env: {
    ...process.env,
    CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH: "1",
    CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS: "5",
  },
  maxBudgetUsd: 5,
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `description` | string | Yes | When Claude should use this agent |
| `prompt` | string | Yes | The agent's system prompt |
| `tools` | string[] | No | Allowed tool names; omit to inherit all subagent tools. A tool left out is not in the subagent's session at all (no prompt or error) |
| `disallowedTools` | string[] | No | Tools/MCP patterns to remove (`mcp__server`, `mcp__server__*`, `mcp__*`). Keeps camelCase in Python (wire format) |
| `model` | string | No | `'fable'`, `'opus'`, `'sonnet'`, `'haiku'`, `'inherit'` (model of the spawning agent), or full model ID |
| `skills` | string[] | No | Skill names preloaded into the agent's context; at most the first 32 distinct names are preloaded, unlisted skills stay invocable through the Skill tool |
| `memory` | `'user'\|'project'\|'local'` | No | Memory source |
| `mcpServers` | array | No | MCP servers available to this agent |
| `initialPrompt` | string | No | Auto-submitted first user turn when run as main thread agent |
| `maxTurns` | number | No | Max agentic turns before stopping; the output is then marked partial (Claude Code v2.1.246+) and the agent can be resumed |
| `autoCompactWindow` | number | No | Lower the auto-compact window for this agent when run as a subagent, `100000` to `1000000`. TypeScript SDK v0.3.296+; not in Python's `AgentDefinition` |
| `background` | boolean | No | Force non-blocking background execution |
| `omitClaudeMd` | boolean | No | Leave user/project/local CLAUDE.md out of the agent's initial context (managed policy files still load); ignored for the main thread agent. TypeScript SDK v0.3.271+; not in Python's `AgentDefinition` |
| `effort` | `'low'\|'medium'\|'high'\|'xhigh'\|'max'`\|number | No | Reasoning effort level |
| `permissionMode` | PermissionMode | No | Permission mode for this agent |

## Notes

- Include `Agent` in `allowedTools` so subagent invocations auto-approve without a permission prompt.
- Subagents can also be defined as filesystem markdown files in `.claude/agents/`; programmatic `agents` definitions take precedence over filesystem agents with the same name.
- A subagent's context starts fresh (only the Agent tool's prompt string, its own system prompt, and CLAUDE.md); it does not receive the parent's conversation history or system prompt.
- By default subagents can spawn subagents up to three layers deep (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`).
- Subagents run in the background by default: an Agent tool call that omits `run_in_background` launches a background subagent, and Claude sets `run_in_background: false` when it needs the result before continuing. `background: true` forces background execution for a specific agent. Before Claude Code v2.1.198 the default was rolling out gradually and an omitted `run_in_background` could run synchronously.
- Concurrency limit: `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` (default `20`). Beyond it, spawning returns `Concurrent subagent limit reached` until the running count drops (sessions with ultracode active are never refused). The spend cap (`maxBudgetUsd` / `max_budget_usd`) also refuses to spawn more subagents with `Budget limit reached` and stops running background subagents.
- When Claude calls the Agent tool without a `subagent_type` it gets the built-in `general-purpose` subagent, even with no agents defined. `CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS=1` removes it and such a call fails with `subagent_type is required`.
- Background/foreground: a spawned subagent's Agent tool result has `status: "async_launched"` and the report arrives in a later turn; when Claude needs the report the call blocks and returns `status: "completed"`. To make Claude wait, ask for it in the prompt (for example "run the test-runner agent and wait for it"); `background: true` on the definition does the opposite and keeps that agent in the background.
- Resuming: a completed subagent's Agent tool result contains `agentId: <id>`. Capture `session_id` from the first query, then pass `resume: sessionId` in the second query with the same `agents` definition and include the agent ID in the prompt. The built-in `Explore` and `Plan` agents are one-shot and return no `agentId`; use a custom agent or `general-purpose`. TypeScript messages from a subagent carry `agent_id` (the task events' `task_id`, stable across resume; v0.3.292+) and all of them carry `parent_tool_use_id`.
- Detect invocation by matching both `"Agent"` and `"Task"` in `tool_use` blocks (the `system:init` tools list still shows `"Task"`).
- From v2.1.210 Claude Code scans the subagent's final message before the parent reads it: it neutralizes harness-only control tags with a backslash, keeps permission-configuration mentions as written, and adds a backslash before the colon of `Human:` / `Assistant:` turn markers; it prepends a `[harness: ...]` line for control-tag or permission-configuration matches and never removes or rewords text. An API error that ends a subagent early (such as a rate limit) is never delivered as its result.
- Fork subagents inherit the parent conversation and do not get the named-agent list. A subagent inherits the main session's extended thinking configuration.
- Opus 5 delegates to subagents more readily, so set the depth, concurrency, and spend limits for queries that run it. With the `claude_code` system prompt preset and Opus 5, Claude Code adds a line telling Claude not to call the Agent tool unless asked (the tool stays available); with a custom prompt or no `systemPrompt` that line is absent, so add the Opus 5 prompting guide's delegation instruction yourself. Either instruction only steers Claude; the limits are enforced by Claude Code.
- TypeScript `env` replaces the subprocess environment (spread `process.env` to keep `PATH`); Python `env` is merged into the inherited environment.
- Filesystem agents under `~/.claude/agents/` and `.claude/agents/` are picked up within seconds, but only for directories that existed at session start; a new directory, a file under an `add_dirs` / `additionalDirectories` directory, or a session started with `--disable-slash-commands` needs a restart.
- A subagent that has the `SendMessage` tool starts with a list of the other named agents running in the session (added to its first turn automatically; a fork doesn't get the list).
- For runs that coordinate dozens to hundreds of agents (dynamic workflows), use the `Workflow` tool, which moves orchestration into a script the runtime executes outside the conversation context (TypeScript Agent SDK v0.3.149 and later); include `Workflow` in `allowedTools` to auto-approve workflow runs.
- The tool name was renamed from `"Task"` to `"Agent"` in Claude Code v2.1.63; check both when detecting invocation for compatibility.
- This is Claude Agent SDK (library) subagents, defined programmatically via `agents` or as `.claude/agents/` files. The Claude Code CLI's own subagent feature (same filesystem format, invoked from the terminal) is documented under anthropic-claude-code-extend — this page's filesystem-based approach is that same mechanism accessed through the SDK.
- Source: https://code.claude.com/docs/en/agent-sdk/subagents (fetched 2026-11-14)

## Related

- [Skills](./skills.md)
- [Hooks](./hooks.md)
