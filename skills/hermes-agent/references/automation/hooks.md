# Hooks

Hermes has four hook systems that run custom code at lifecycle points: gateway hooks, plugin hooks, shell hooks and outbound webhooks. Hook callback errors are isolated and logged; directive/control hooks can change flow, transforms can replace content, and a shell `pre_tool_call` hook can block or fail closed.

## Signature / Usage

| System | Registered via | Runs in | Use case |
|--------|---------------|---------|----------|
| Gateway hooks | `HOOK.yaml` + `handler.py` in `~/.hermes/hooks/<name>/` | Gateway only | Logging, alerts, webhooks |
| Plugin hooks | `ctx.register_hook()` in a plugin | CLI + Gateway | Tool interception, metrics, guardrails |
| Shell hooks | `hooks:` block in profile `config.yaml` | CLI + Gateway + Desktop/TUI/dashboard chat | Blocking, auto-format, context injection |
| Outbound webhooks | `hooks.outbound:` list in `config.yaml` | CLI + Gateway | Signed lifecycle events to external HTTP endpoints |

Gateway hook:

```yaml
# ~/.hermes/hooks/my-hook/HOOK.yaml
name: my-hook
description: Log all agent activity to a file
events:
  - agent:start
  - agent:end
  - agent:step
```

```python
# ~/.hermes/hooks/my-hook/handler.py
async def handle(event_type: str, context: dict):
    """Called for each subscribed event. Must be named 'handle'."""
    ...
```

Plugin hook:

```python
def register(ctx):
    ctx.register_hook("pre_tool_call", my_tool_observer)
    ctx.register_hook("post_tool_call", my_tool_logger)
    ctx.register_hook("pre_llm_call", my_memory_callback)
    ctx.register_hook("kanban_task_blocked", my_blocked_callback)
```

Shell hook:

```yaml
hooks:
  <event_name>:                  # Must be in VALID_HOOKS
    - matcher: "<regex>"         # Optional; pre/post_tool_call only
      command: "<shell command>" # Required; shlex.split, shell=False
      timeout: <seconds>         # Optional; default 60, capped at 300
      fail_closed: <bool>        # Optional; pre_tool_call only (`failClosed` also accepted)

hooks_auto_accept: false
```

Outbound webhook:

```yaml
hooks:
  outbound:
    - name: ci-notify
      url: https://ci.example.com/hermes-events
      events: [on_session_end, subagent_stop]
      secret_env: HERMES_OUTBOUND_WEBHOOK_SECRET
      timeout: 10                           # per-attempt seconds (1-60)
    - name: tool-monitor
      url: https://metrics.example.com/hooks/hermes
      events: [post_tool_call]
      matcher: "terminal|delegate_task"
```

## Options / Props

Gateway events:

| Event | When it fires | Context keys |
|-------|---------------|--------------|
| `gateway:startup` | Gateway process starts | `platforms` |
| `session:start` | New messaging session | `platform`, `user_id`, `session_id`, `session_key` |
| `session:end` | Session ended (before reset) | `platform`, `user_id`, `session_key` |
| `session:reset` | `/new` or `/reset` | `platform`, `user_id`, `session_key` |
| `session:compress` | Context compression done | `platform`, `session_id`, `old_session_id`, `in_place`, `compression_count` |
| `agent:start` | Agent begins a message | `platform`, `user_id`, `chat_id`, `thread_id`, `chat_type`, `session_id`, `message` (500 chars) |
| `agent:step` | Each tool-loop iteration | `platform`, `user_id`, `session_id`, `iteration`, `tool_names` |
| `agent:end` | Agent finishes | as `agent:start` plus `response` (500 chars) |
| `reaction:added` / `reaction:removed` | Emoji reaction (Slack adapter; needs `reactions:read` scope and bot events) | `platform`, `reaction`, `user_id`, `item_user_id`, `item_type`, `channel_id`, `message_ts`, `team_id`, `event_ts`, `raw_event` |
| `command:*` | Any slash command (wildcard) | `platform`, `user_id`, `command`, `args` |

Plugin hook catalog (category; return behavior):

| Hook | Category | Behavior |
|------|----------|----------|
| `pre_tool_call` | Directive | Before each tool; return `{"action": "block", "message": ...}`, `{"action": "approve", ...}` or `{"action": "modify", "args": {...}}`. `block` beats `approve`; `modify` args are shallow-merged. Fails closed on timeout/raise. |
| `post_tool_call` | Observer | After block/error/success (`tool_name`, `args`, `result`, `task_id`, `duration_ms`, `status`, ...) |
| `transform_tool_result`, `transform_terminal_output`, `transform_llm_output`, `pre_transcription`, `transform_api_error_classification` | Transform | First valid string/dict replaces the value |
| `pre_llm_call` | Directive | Once per turn; return string or `{"context": ...}` appended to the user message (never the system prompt) |
| `post_llm_call` | Observer | After a successful, non-interrupted turn |
| `pre_verify` | Directive | Edited-code verify gate; continue/block directive keeps the turn going |
| `pre_api_request`, `post_api_request`, `api_request_error`, `pre_auxiliary_call`, `post_auxiliary_call` | Observer | Provider request telemetry (prefer sanitized `request` / `response`) |
| `on_stream_start`, `on_stream_delta`, `on_stream_end`, `on_interim_message` | Observer | Streaming output via bounded queues (reasoning deltas need `plugins.stream_reasoning_deltas: true`) |
| `on_session_start`, `on_session_end`, `on_session_finalize`, `on_session_reset`, `agent_loop_stopped` | Observer | Session lifecycle |
| `on_skill_lifecycle`, `subagent_start`, `subagent_stop`, `pre_command`, `pre_approval_request`, `post_approval_response`, `on_human_input_request`, `on_human_input_resolved`, `on_room_member_activity`, `gateway_platform_event` | Observer | See official page for fields |
| `pre_gateway_dispatch`, `post_gateway_admission` | Directive | Gateway admission (`skip` / `rewrite` / `allow`; `handled` skips the agent turn, fail-open) |
| `kanban_task_claimed`, `kanban_task_completed`, `kanban_task_blocked`, `on_kanban_worker_spawned`, `on_kanban_worker_exited`, `on_kanban_worker_stale_claim`, `on_kanban_task_updated`, `on_kanban_dispatch_tick` | Observer | Kanban lifecycle (claimed fires in the dispatcher process; completed/blocked in the worker process) |

Shell hook stdin payload: `hook_event_name`, `tool_name`, `tool_input`, `session_id`, `cwd`, `profile`, `extra` (`tool_name` / `tool_input` null for non-tool events). Stdout responses: `{"decision": "block", "reason": ...}` or `{"action": "block", "message": ...}`, `{"action": "modify", "args": {...}}` (or `{"decision": "modify", "tool_input": {...}}`), `{"action": "approve", ...}`, `{"context": ...}` for `pre_llm_call`, `{"action": "continue", ...}` for `pre_verify`.

`hermes hooks` CLI:

| Command | What it does |
|---------|--------------|
| `hermes hooks list` | Configured shell and outbound hooks with matcher, timeout, consent status (outbound shows signed/UNSIGNED) |
| `hermes hooks test <event> [--for-tool X] [--payload-file F]` | Fire matching hooks against a synthetic payload |
| `hermes hooks revoke <command>` | Remove allowlist entries (effective after restart) |
| `hermes hooks doctor` | Exec bit, allowlist, mtime drift, JSON validity, timing |

Outbound webhook headers: `Content-Type: application/json`, `X-Hermes-Event`, `X-Hermes-Delivery` (same as body `delivery_id`), `X-Hermes-Signature-256: sha256=<hex>` (HMAC-SHA256 of raw body, only with a secret). Body: `hook_event_name`, `profile`, `tool_name`, `tool_input`, `session_id`, `cwd`, `extra`, `delivery_id`, `timestamp`.

```python
import hashlib, hmac

def verify(body: bytes, header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, header)
```

## Notes

- Gateway hooks are trusted-by-placement: loaded once at gateway startup (per served profile on first event under multi-profile gateways) from every `<profile home>/hooks/*/` containing both `HOOK.yaml` (non-empty `events` list) and `handler.py`. `handler.py` is imported in-process with no sandbox or prompt; `HERMES_SAFE_MODE` does not skip it; CLI, TUI, Desktop and cron never load gateway hooks. Handler must be named `handle`, sync or async.
- Hermes ships no built-in `BOOT.md` hook; the documented pattern is a user hook on `gateway:startup` that spawns a one-shot `AIAgent` using `_resolve_gateway_model()` / `_resolve_runtime_agent_kwargs()` and a `[SILENT]` convention.
- Plugin-hook general rules: callbacks receive keyword arguments (always accept `**kwargs`); exceptions are logged and skipped; timeout-bounded hooks (`plugins.hook_callback_timeout`, default 30s, 0 disables, max 600) are abandoned on timeout, with `pre_tool_call` failing closed and others failing open; `PluginManager` adds `telemetry_schema_version="hermes.observer.v1"` to every callback; valid event names come from `hermes_cli.plugins.VALID_HOOKS`.
- `pre_llm_call` fires once per turn after compression; context from multiple plugins is joined with blank lines in alphabetical plugin order. `register_system_prompt_section(id, callable_or_str, position="after_memory", max_chars=...)` adds bounded, cache-safe sections (ID 1-128 chars lowercase `[a-z0-9._-]`; per-section cap 4,000 chars, aggregate 8,000 chars and 32 sections; rendered once per new session).
- Shell hooks: first-use consent per exact `(event, command)` pair stored in `~/.hermes/shell-hooks-allowlist.json` (`{"approvals": [{"event": ..., "command": ...}]}`); bypass with `--accept-hooks`, `HERMES_ACCEPT_HOOKS=1` or `hooks_auto_accept: true` (non-TTY runs need one). Script edits are silently trusted (keyed on command string, not hash). Default fail-open; exit code 2 on `pre_tool_call` blocks (message from stdout JSON, else first 400 chars of stderr, else `Blocked by shell hook.`); `fail_closed: true` blocks on missing command, timeout, non-zero exit without directive, or non-JSON stdout. Python plugin decisions are evaluated first; the first valid block wins. Shell hooks run with your full credentials; keep scripts in `~/.hermes/agent-hooks/` by convention. On Windows, script-file commands run via the file's interpreter.
- Claude Code `UserPromptSubmit` has no separate Hermes event; use `pre_llm_call`.
- Outbound webhooks are notify-only (response ignored), fire-and-forget on one background thread, retried once on connection errors/5xx (not 4xx), never follow redirects, drop events when the bounded queue is full, and run no consent prompt (`HERMES_SAFE_MODE=1` still skips registration). Prefer `secret_env` over inline `secret:`; dedupe on `delivery_id` and reject stale `timestamp`s. Changes apply on next CLI session / gateway restart.

## Related

- [Kanban Multi-Agent](./kanban.md)
- [Cron Jobs](./cron.md)
- [Delegation](./delegation.md)
