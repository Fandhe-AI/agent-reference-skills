<!-- source: https://code.claude.com/docs/en/agent-sdk/agent-loop.md / last verified: 2026-08-07 -->

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
| `effort` | `"low" \| "medium" \| "high" \| "xhigh" \| "max"` | Reasoning depth per response; independent of extended thinking |
| `permission_mode` / `permissionMode` | `"default" \| "acceptEdits" \| "plan" \| "dontAsk" \| "auto" \| "bypassPermissions"` | Controls tool approval behavior |
| `model` | string | Pin a model, e.g. `"claude-sonnet-5"` |

## Notes

- The loop: receive prompt → evaluate/respond → execute tools → repeat (one cycle = one turn) → return result. Ends when Claude produces a response with no tool calls.
- Five core message types: `SystemMessage` (subtypes `init`, `compact_boundary`, `informational`, `worker_shutting_down`), `AssistantMessage`, `UserMessage` (tool results), `StreamEvent` (partial messages only), `ResultMessage` (end of loop; check `subtype` before reading `result`).
- Built-in tools by category: file ops (`Read`, `Edit`, `Write`), search (`Glob`, `Grep`), execution (`Bash`), web (`WebSearch`, `WebFetch`), discovery (`ToolSearch`), orchestration (`Agent`, `Skill`, `AskUserQuestion`, `TaskCreate`, `TaskUpdate`).
- Read-only tools (`Read`, `Glob`, `Grep`, read-only-marked MCP tools) can run concurrently; state-modifying tools (`Edit`, `Write`, `Bash`) run sequentially. Custom tools default to sequential unless `readOnlyHint` is set.
- Result subtypes: `success` (result available), `error_max_turns`, `error_max_budget_usd`, `error_during_execution`, `error_max_structured_output_retries` (none of these carry `result`). All subtypes carry `total_cost_usd`, `usage`, `num_turns`, `session_id`.
- A single-shot `query()` call raises after yielding an error result subtype; wrap in try/except to continue past it.
- Automatic compaction summarizes older history when the context window approaches its limit; customize via CLAUDE.md summarization instructions, the `PreCompact` hook, or a manual `/compact` prompt.
- Subagents start with a fresh conversation (no parent turn history) and only their final response returns to the parent, keeping the main context lean.

## Related

- [Quickstart](./quickstart.md)
- [Configure permissions](../control/permissions.md)
- [Use Claude Code features in the SDK](./claude-code-features.md)
