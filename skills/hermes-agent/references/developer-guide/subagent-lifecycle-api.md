# Public Subagent Lifecycle API

Plugins can launch and supervise fresh Hermes child sessions through `ctx.subagent_lifecycle` without importing `tools.delegate_tool`, gateway internals, TUI state or `AIAgent` fields.

## Signature / Usage

```python
from agent.subagent_lifecycle import SubagentLaunchRequest

def launch_review(ctx):
    # Call from a plugin tool or hook while an agent turn is active.
    service = ctx.subagent_lifecycle
    handle = service.launch(SubagentLaunchRequest(
        goal="Review this change for regressions.",
        context="Only inspect the supplied repository.",
        role="leaf",
        correlation_id="review-42",
        allowed_toolsets=("file",),
    ))
    # Persist handle.to_dict() if desired.
    if service.wait(handle, timeout_seconds=2).timed_out:
        return handle.to_dict()
    return service.result(handle)
```

## Options / Props

Request fields: `goal`, `context`, `role`, `model`, `provider`, `allowed_toolsets`, `blocked_tools`, `working_directory`, `parent_session_id`, `correlation_id`, `metadata`, `timeout_seconds` (subject to the restrictions below).

Service operations taking a handle: `status`, `wait`, `cancel(handle, reason=...)`, `steer(handle, text)`, `result`, `reconnect`.

States: `PENDING`, `STARTING`, `RUNNING`, `SUCCEEDED`, `FAILED`, `INTERRUPTED`, `CANCEL_REQUESTED`, `CANCELLED`, `UNKNOWN`.

Routing precedence for `provider`: request > `delegation` config > parent; `model` in the request overrides the configured model. Children follow the `delegation` config (`provider`, `model`, `base_url`, `api_key`, `api_mode`, `request_overrides`).

## Notes

- Launching outside an active agent turn fails closed with `No active Hermes parent session`. Works in CLI, gateway, non-interactive, kanban-worker sessions and under `plugins.isolation: host`.
- `SubagentHandle` is serializable with a versioned opaque capability; malformed or forged handles return `UNKNOWN` / `UNKNOWN_HANDLE`.
- `steer` returns `False` for empty text, unknown/forged handles, another parent session's handle, or a finished child.
- `cancel` is cooperative and returns `CANCEL_REQUESTED`; completion is claimed only once `wait` / `result` observes a terminal state. Terminal results are immutable, idempotent, bounded to 32k characters, omit transcripts and hidden reasoning, and include a stable result hash.
- Metadata and terminal results are retained in-process for one hour; after restart `reconnect` returns `RECONNECT_UNAVAILABLE` and never starts a replacement child.
- Fail-closed requests: size caps, unknown or parent-broadening toolsets rejected (plugin-registered toolsets count as known); per-tool blocks, working-directory overrides and per-launch timeouts are explicitly rejected for now. Use `allowed_toolsets` to narrow a child. An unresolvable provider raises `SubagentLifecycleError`.
- Does not change the synchronous `delegate_task` tool; core does not expose `provider` to the model.
- Source: developer-guide/subagent-lifecycle-api (v0.22.2 snapshot).

## Related

- [Build a Hermes Plugin](./plugins.md)
- [Observer Hooks](./observer-hooks.md)
