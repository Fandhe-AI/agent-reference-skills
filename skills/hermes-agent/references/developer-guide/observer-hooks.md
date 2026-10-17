# Observer Hooks

Read-only telemetry contract for plugins (trace, metrics, audit, replay, export): event families, correlation IDs and payload safety. Backend-neutral; does not change runtime behavior.

## Signature / Usage

```python
def register(ctx):
    ctx.register_hook("pre_api_request", on_pre_api_request)
    ctx.register_hook("post_api_request", on_post_api_request)
    ctx.register_hook("pre_tool_call", on_pre_tool_call)
    ctx.register_hook("post_tool_call", on_post_tool_call)

def on_post_tool_call(**kwargs):
    tool_name = kwargs.get("tool_name")
    status = kwargs.get("status")
    result = kwargs.get("result")
```

## Options / Props

Every payload carries `telemetry_schema_version = "hermes.observer.v1"`. Callbacks receive keyword arguments; accept `**kwargs`.

Behavior-affecting hooks (other hook returns are ignored):

| Hook | Return behavior |
|------|-----------------|
| `pre_llm_call` | String or `{"context": "..."}` injects ephemeral context into the current user message |
| `pre_tool_call` | `{"action": "block", "message": "..."}` blocks; `{"action": "modify", "args": {...}}` transforms input arguments |
| `transform_tool_result` | Replacement tool result string after `post_tool_call` |
| `transform_llm_output` | Replacement final assistant text string |

Correlation IDs:

| Field | Meaning |
|-------|---------|
| `session_id` | Conversation/session identity |
| `task_id` | Task identity (subagents, isolated execution) |
| `turn_id` | User-turn identity shared by API attempts and tool calls |
| `api_request_id` | Opaque provider-attempt identity; do not parse |
| `api_call_count` | Numeric API attempt count within the loop |
| `tool_call_id` | Provider-supplied tool call ID when available |
| `parent_session_id` / `child_session_id` | Delegated subagent session link |
| `parent_subagent_id` / `child_subagent_id` | Subagent link |
| `parent_turn_id` | Parent turn that spawned delegated work |

Event families:

| Family | Hooks |
|--------|-------|
| Session lifecycle | `on_session_start`, `on_session_end` (turn/run scoped), `on_session_finalize`, `on_session_reset` |
| Turn-scoped LLM | `pre_llm_call`, `post_llm_call` |
| Request-scoped API | `pre_api_request`, `post_api_request`, `api_request_error`, `pre_auxiliary_call`, `post_auxiliary_call` |
| Tool lifecycle | `pre_tool_call`, `post_tool_call`, `transform_tool_result` |
| Human input | `on_human_input_request`, `on_human_input_resolved` (`kind` = `sudo` / `clarify` / `approval`; typed answer never included) |
| Approval | `pre_approval_request`, `post_approval_response` (`choice`: `once`, `session`, `always`, `deny`, `timeout`, `cancelled`) |
| Subagent | `subagent_start`, `subagent_stop` |

`post_tool_call` `status` values: `ok`, `error`, `blocked`, `cancelled`; it also carries `result`, `duration_ms`, `error_type`, `error_message`.

`pre_api_request` fields: identity (`session_id`, `task_id`, `turn_id`, `api_request_id`), runtime (`platform`, `model`, `provider`, `base_url`, `api_mode`), attempt metadata (`api_call_count`, `message_count`, `tool_count`, `approx_input_tokens`, `request_char_count`, `max_tokens`), `started_at`, sanitized `request`. `post_api_request` adds `api_duration`, `ended_at`, `finish_reason`, `response_model`, `usage`, `assistant_content_chars`, `assistant_tool_call_count`, sanitized `response`, compat `assistant_message`. `api_request_error` adds `status_code`, `retry_count`, `max_retries`, `retryable`, `reason`, `error = {"type", "message"}`.

## Notes

- Callbacks are fail-open: exceptions are logged and the agent loop continues.
- `on_session_end` is not necessarily the final lifetime boundary; use `on_session_finalize` / `on_session_reset` for once-per-identity cleanup.
- `post_tool_call` is emitted for blocked and cancelled paths so spans can close.
- Approval hooks are observer-only; to prevent a tool reaching approval use `pre_tool_call` blocking. Smart (aux-LLM) approvals do not fire the human-input hooks.
- `subagent_stop` carries a metadata-only `tool_call_history` (tool name, argument names, bounded side-effect targets, byte counts, outcome; query strings and fragments removed).
- Prefer sanitized `request` / `response` / `error` fields; legacy `request_messages`, `conversation_history`, `assistant_message` may still be present. Sanitization bounds payloads and redacts sensitive keys.
- Expensive payload construction is gated behind `has_hook(...)`: register only hooks you consume, keep callbacks fast, offload network export.
- Behavior-changing request/execution wrappers are middleware, not observers. A first-party NeMo Relay shared-metrics path exists that does not need an observability plugin; the official Langfuse catalog plugin is an example consumer.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/observer-hooks (pinned to v0.22.2)

## Related

- [Build a Hermes Plugin](./plugins.md)
- [Public Subagent Lifecycle API](./subagent-lifecycle-api.md)
