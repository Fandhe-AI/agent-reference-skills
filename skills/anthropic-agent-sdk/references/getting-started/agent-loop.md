<!-- source: https://code.claude.com/docs/en/agent-sdk/agent-loop.md / last verified: 2026-11-14 -->

# How the agent loop works

The message lifecycle, tool execution, context window, and architecture that power SDK agents: Claude evaluates the prompt, calls tools, receives results, and repeats until the task is complete.

## Signature / Usage

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions, ResultMessage

async def run_agent():
    try:
        async for message in query(
            prompt="Find and fix the bug causing test failures in the auth module",
            options=ClaudeAgentOptions(
                allowed_tools=["Read", "Edit", "Bash", "Glob", "Grep"],
                setting_sources=["project"],
                max_turns=30,
                effort="high",
            ),
        ):
            if isinstance(message, ResultMessage):
                if message.subtype == "success":
                    print(f"Done: {message.result}")
                else:
                    print(f"Stopped: {message.subtype}")
    except Exception as error:
        print(f"Session ended with an error: {error}")

asyncio.run(run_agent())
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `max_turns` / `maxTurns` | number | Maximum tool-use round trips (default: no limit) |
| `max_budget_usd` / `maxBudgetUsd` | number | Maximum cost before stopping (default: no limit; covers subagent spend too) |
| `effort` | `"low" \| "medium" \| "high" \| "xhigh" \| "max"` | Reasoning depth per response; independent of extended thinking. Unset: Claude Code resolves the level itself |
| `permission_mode` / `permissionMode` | `"default" \| "acceptEdits" \| "plan" \| "dontAsk" \| "auto" \| "bypassPermissions"` | Controls tool approval behavior |
| `model` | string | Pin a model by alias or full name. Unset: Claude Code's default model |
| `session_store` / `sessionStore` | adapter | Mirror transcripts to your own backend so another host can resume (see Session storage) |

## Notes

- The loop: receive prompt → evaluate/respond → execute tools → repeat (one cycle = one turn) → return result. Ends when Claude produces a response with no tool calls.
- Five core message types: `SystemMessage` (subtypes `init`, `compact_boundary`, `informational`, `worker_shutting_down`), `AssistantMessage`, `UserMessage` (tool results), `StreamEvent` (partial messages only), `ResultMessage` (end of loop; check `subtype` before reading `result`).
- Built-in tools by category: file ops (`Read`, `Edit`, `Write`), search (`Glob`, `Grep`), execution (`Bash`), web (`WebSearch`, `WebFetch`), discovery (`ToolSearch`), orchestration (`Agent`, `Skill`, `AskUserQuestion`, `TaskCreate`, `TaskUpdate`).
- Read-only tools (`Read`, `Glob`, `Grep`, read-only-marked MCP tools) can run concurrently; state-modifying tools (`Edit`, `Write`, `Bash`) run sequentially. Custom tools default to sequential unless `readOnlyHint` is set.
- Result subtypes: `success` (result available), `error_max_turns`, `error_max_budget_usd`, `error_during_execution`, `error_max_structured_output_retries` (none of these carry `result`). All subtypes carry `total_cost_usd`, `usage`, `num_turns`, `session_id`.
- A small number of trailing system events, such as `prompt_suggestion`, can arrive after the `ResultMessage`, so iterate the stream to completion rather than breaking on the result.
- Turn counting: each turn with tool calls counts, plus one for the final text-only response. Without that extra turn the run ends with `error_max_turns` and no final response.
- The budget cap (`maxBudgetUsd` / `max_budget_usd`) covers subagents: their spend counts toward the total. Once spend reaches the cap, spawning another subagent fails with `Budget limit reached`, and Claude Code stops any background subagents still running. Requires Claude Code v2.1.217 or later.
- With streaming input, a message still queued when a turn ends at the max-turns limit starts a new turn and the max-turns count starts over; the budget total keeps accumulating across messages, and a `/clear` starts it over.
- A single-shot `query()` call raises after yielding an error result subtype; wrap in try/except to continue past it. A streaming input session stays alive after an error result, except after a session crash (final `error_during_execution`, process exits).
- Result fields: `usage` covers only the main loop; use `modelUsage` / `model_usage` for whole-tree accounting. In Python, `total_cost_usd`, `usage`, `model_usage` are optional, so check for `None`. After a session crash the cost fields may be zeroed and `stop_reason` is `null`.
- `stop_reason` (`string | null` in TypeScript, `str | None` in Python) says why the model stopped on its final turn: `end_turn`, `max_tokens`, or `refusal`. To detect refusals, compare it with `"refusal"`.
- On models without the task-tracking tools, Claude Code provides `TaskCreate` / `TaskUpdate` only when you opt in (see todo-tracking).
- Python message checks use `isinstance()`; TypeScript checks the `type` string, and `AssistantMessage` / `UserMessage` wrap the raw API message in `.message` (content is at `message.message.content`). Enable partial messages (`include_partial_messages` / `includePartialMessages`) to receive `StreamEvent`.
- Hooks fire at points in the loop (`PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `Stop`, `SubagentStart` / `SubagentStop`, `PreCompact`) and run in your process, so they use no context. Both SDKs support these; TypeScript has additional events.
- Budget headroom: spend is compared with the cap after each model response arrives, so spend can pass the cap by up to the cost of that one response plus what still-running subagents spend before they stop. Leave headroom when setting the cap.
- Effort levels: `"low"` minimal reasoning (file lookups), `"medium"` balanced (routine edits), `"high"` thorough (refactors, debugging), `"xhigh"` extended depth on models that support it, `"max"` maximum depth. Not all models support `effort`. Set it in top-level `query()` options, or per subagent via the `effort` field on `AgentDefinition` to override the session level.
- Context: CLAUDE.md and system prompt are prompt-cached; MCP tool schemas and other non-core tools are deferred by tool search by default and load on demand. `PreCompact` receives a `trigger` of `manual` or `auto`; sending `/compact` as a prompt compacts on demand. Persistent rules belong in CLAUDE.md (re-injected every request), not the initial prompt, since compaction can drop early instructions.
- To resume across stateless containers or serverless hosts, pass a `session_store` / `sessionStore` adapter; the Claude Code subprocess still writes to local disk first.
- Source: https://code.claude.com/docs/en/agent-sdk/agent-loop.md (fetched 2026-11-14)
- Automatic compaction summarizes older history when the context window approaches its limit; customize via CLAUDE.md summarization instructions, the `PreCompact` hook, or a manual `/compact` prompt.
- Subagents start with a fresh conversation (no parent turn history) and only their final response returns to the parent, keeping the main context lean.

## Related

- [Quickstart](./quickstart.md)
- [Configure permissions](../control/permissions.md)
- [Use Claude Code features in the SDK](./claude-code-features.md)
