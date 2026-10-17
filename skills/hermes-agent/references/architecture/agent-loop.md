# Agent Loop

The `AIAgent` class is the core orchestration engine: it assembles prompts, selects the API mode, runs interruptible model calls, executes tools, handles fallback and compression, and persists the session.

## Signature / Usage

```python
# Simple interface — returns final response string
response = agent.chat("Fix the bug in main.py")

# Full interface — returns dict with messages, metadata, usage stats
result = agent.run_conversation(
    user_message="Fix the bug in main.py",
    system_message=None,           # auto-built if omitted
    conversation_history=None,      # auto-loaded from session if omitted
    task_id="task_abc123"
)
```

`chat()` is a thin wrapper around `run_conversation()` that extracts the `final_response` field from the result dict.

`run_agent.py` is a thin facade: the loop lives in `agent/conversation_loop.py`, turn phases in `agent/turn_*.py` (iteration prep, API call, API error, overflow, truncation, recovery), and constructor wiring in `agent/agent_init.py`.

## API Modes

| API mode | Used for | Client type |
|----------|----------|-------------|
| `chat_completions` | OpenAI-compatible endpoints (OpenRouter, custom, most providers) | `openai.OpenAI` |
| `codex_responses` | OpenAI Codex / Responses API | `openai.OpenAI` with Responses format |
| `anthropic_messages` | Native Anthropic Messages API | `anthropic.Anthropic` via adapter |

Mode resolution order:

1. Explicit `api_mode` constructor arg (highest priority)
2. Provider-specific detection (e.g. `anthropic` provider -> `anthropic_messages`)
3. Base URL heuristics (e.g. `api.anthropic.com` -> `anthropic_messages`)
4. Default: `chat_completions`

## Turn Lifecycle

```text
run_conversation()
  1. Generate task_id if not provided
  2. Append user message to conversation history
  3. Build or reuse cached system prompt (prompt_builder.py)
  4. Check if preflight compression is needed (>50% context)
  5. Build API messages from conversation history
     - chat_completions: OpenAI format as-is
     - codex_responses: convert to Responses API input items
     - anthropic_messages: convert via anthropic_adapter.py
  6. Inject ephemeral prompt layers (budget warnings, context pressure)
  7. Apply prompt caching markers if on Anthropic
  8. Make interruptible API call (_interruptible_api_call)
  9. Parse response:
     - If tool_calls: execute them, append results, loop back to step 5
     - If text response: persist session, flush memory if needed, return
```

Internal message format is OpenAI-compatible (`role` / `content` / `tool_calls` / `tool_call_id`). Reasoning content is stored in `assistant_msg["reasoning"]`.

Role alternation rules: after system, `User -> Assistant -> ...`; during tool calling `Assistant (tool_calls) -> Tool -> Tool -> ... -> Assistant`. Never two assistant or two user messages in a row; only `tool` role may be consecutive.

## Tool Execution

- Single tool call: executed directly in the main thread.
- Multiple tool calls: executed concurrently via `ThreadPoolExecutor` (interactive tools such as `clarify` force sequential execution). Results are reinserted in original call order.

```text
for each tool_call in response.tool_calls:
    1. Resolve handler from tools/registry.py
    2. Fire pre_tool_call plugin hook
    3. Check if dangerous command (tools/approval.py)
       - If dangerous: invoke approval_callback, wait for user
    4. Execute handler with args + task_id
    5. Fire post_tool_call plugin hook
    6. Append {"role": "tool", "content": result} to history
```

Agent-level tools intercepted by `agent/tool_executor.py` before `handle_function_call()`: `todo`, `memory`, `session_search`, `delegate_task`.

## Callback Surfaces

| Callback | When fired | Used by |
|----------|-----------|---------|
| `tool_progress_callback` | Before/after each tool execution | CLI spinner, gateway progress messages |
| `thinking_callback` | When model starts/stops thinking | CLI "thinking..." indicator |
| `reasoning_callback` | When model returns reasoning content | CLI reasoning display, gateway reasoning blocks |
| `clarify_callback` | When `clarify` tool is called | CLI input prompt, gateway interactive message |
| `step_callback` | After each complete agent turn | Gateway step tracking, ACP progress |
| `stream_delta_callback` | Each streaming token (when enabled) | CLI streaming display |
| `tool_gen_callback` | When tool call is parsed from stream | CLI tool preview in spinner |
| `status_callback` | State changes (thinking, executing, etc.) | ACP status updates |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/agent-loop (pinned to v0.22.2)
- The developer-guide Agent Loop page (v0.22.2) says default 50; the Delegation feature page and Delegation Patterns guide both state 250, which is used here.
- Interruptible calls: `_interruptible_api_call()` runs the HTTP call in a background thread while the main thread waits on response / interrupt event / timeout. On interrupt the API thread is abandoned and no partial response enters history.
- Iteration budget: default 500 (`agent.max_turns`); subagents get independent budgets capped at `delegation.max_iterations` (default 250). At 100% the agent stops and returns a summary.
- Fallback: on 429 / 5xx / 401 / 403 the agent tries `fallback_providers` in order (401/403 attempt credential refresh first). A Codex Responses turn stalled on reasoning-only output (three consecutive continuations) fails over with reason `incomplete_response`. Auxiliary tasks (vision, compression, web extraction) have independent chains under `auxiliary.*`.
- Compression triggers: preflight at >50% of context; gateway auto-compression at 85%. Memory is flushed first, `compression.protect_last_n` (default 20) recent messages are kept, tool call/result pairs are never split.
- After each turn messages are saved to SQLite via `hermes_state.py` and memory changes flushed to `MEMORY.md` / `USER.md`.

## Related

- [Provider Runtime](./provider-runtime.md)
- [Prompt Assembly](./prompt-assembly.md)
- [Context Compression & Caching](./context-compression-and-caching.md)
- [Tools Runtime](./tools-runtime.md)
- [Architecture Overview](./architecture.md)
