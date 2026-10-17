# Middleware

Hermes middleware is the behavior-changing companion to observer hooks: plugins can rewrite LLM provider requests and tool arguments, or wrap the actual LLM and tool execution callbacks.

## Signature / Usage

```python
def register(ctx):
    ctx.register_middleware("llm_request", on_llm_request)
    ctx.register_middleware("llm_execution", on_llm_execution)
    ctx.register_middleware("tool_request", on_tool_request)
    ctx.register_middleware("tool_execution", on_tool_execution)
```

Request middleware may return optional trace fields:

```python
return {
    "request": updated_request,
    "source": "my-plugin",
    "reason": "selected fallback model",
}
```

Execution middleware calls `next_call` to continue the chain:

```python
def on_tool_execution(**kwargs):
    result = kwargs["next_call"](kwargs["args"])
    return result
```

## Options / Props

Every callback receives `telemetry_schema_version` (`hermes.observer.v1`), `middleware_schema_version` (`hermes.middleware.v1`), and runtime context such as `session_id`, `task_id`, `turn_id`, `api_request_id`, `provider`, `model`, `api_mode`, `tool_name`, `tool_call_id` when applicable.

| Kind | Payload | Return shape | Purpose |
| --- | --- | --- | --- |
| `llm_request` | `request`, `original_request` | `{"request": {...}}` | Replace effective provider kwargs before provider execution |
| `tool_request` | `tool_name`, `args`, `original_args` | `{"args": {...}}` | Replace effective tool args before hooks, guardrails, approvals, and execution |
| `llm_execution` | `request`, `original_request`, `next_call` | Any provider response | Wrap or replace the actual provider call |
| `tool_execution` | `tool_name`, `args`, `original_args`, `next_call` | Any tool result | Wrap or replace the actual tool call |

Execution order:

| Flow | Steps |
| --- | --- |
| LLM call | build provider kwargs -> `llm_request` -> `pre_api_request` hooks -> `llm_execution` -> `post_api_request` / `api_request_error` hooks |
| Tool call | parse/coerce args -> `tool_request` -> availability checks, observer block directives, guardrails, approvals -> `tool_execution` -> `post_tool_call` hooks -> `transform_tool_result` hooks |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/middleware (pinned to v0.22.2)
- Middleware only runs for enabled plugins: `hermes plugins enable <plugin-name>`. For isolated testing use one `HERMES_HOME` for enablement and the run:

```bash
export HERMES_HOME=$HOME/.hermes/cache/scratch/hermes-middleware-test
mkdir -p "$HERMES_HOME"
hermes plugins enable <plugin-name>
hermes chat --query 'Reply exactly ok'
```

- Multiple plugins registering the same execution kind run as a nested chain in registration order. Failures are fail-open: a warning is logged and the next middleware or base path continues; a callback failing identically on every call is reported once at WARNING, repeats at DEBUG.
- `tool_request` runs before approvals; mutated paths, commands and URLs are what guardrails and approvals evaluate.
- Request middleware should return complete replacement payloads, not partial patches. Execution middleware should call `next_call(...)` exactly once unless intentionally short-circuiting. If it raises before `next_call`, Hermes continues with the rest of the chain; if it raises after a successful `next_call`, the downstream result is preserved and nothing runs twice. Downstream failures are not converted into a successful `None`.
- Return the same response shape Hermes expects from the provider adapter; do not wrap it in a plugin-specific envelope.
- Trace entries are stored in later observer hook payloads as `middleware_trace`. Use observer hooks for read-only telemetry.
- NeMo Relay execution middleware is installed through Relay's discovered configuration or an explicit `plugins.toml` selected with `HERMES_NEMO_RELAY_PLUGINS_TOML`.

## Related

- [Agent Loop](./agent-loop.md)
- [Tools Runtime](./tools-runtime.md)
