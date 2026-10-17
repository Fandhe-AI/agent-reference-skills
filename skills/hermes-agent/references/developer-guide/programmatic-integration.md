# Programmatic Integration

Three protocols for driving hermes-agent from external programs (IDE plugins, custom UIs, CI, embedded sub-agents): ACP, the TUI gateway JSON-RPC, and the OpenAI-compatible HTTP API server. All drive the same `AIAgent` core.

## Signature / Usage

```bash
hermes acp                  # serve ACP on stdio
hermes acp --check          # verify ACP dependencies and adapter imports
hermes acp --setup          # interactive provider/model setup for ACP terminal auth
```

API server endpoints:

```
POST /v1/chat/completions        OpenAI Chat Completions (streaming via SSE)
POST /v1/responses               OpenAI Responses API (stateful)
POST /v1/runs                    Start a run, returns run_id (202)
GET  /v1/runs/{id}               Run status
GET  /v1/runs/{id}/events        SSE stream of lifecycle events
POST /v1/runs/{id}/approval      Resolve a pending approval
POST /v1/runs/{id}/steer         Inject mid-run guidance at the next tool boundary
POST /v1/runs/{id}/stop          Interrupt the run
GET  /v1/capabilities            Machine-readable feature flags
POST /v1/browser-control/register Register a browser controller
GET  /v1/browser-control/ws       Browser-controller WebSocket
GET  /v1/models                  Lists hermes-agent
GET  /api/model/options          Provider-aware picker inventory
GET  /health, /health/detailed
```

TUI gateway server-to-client request and answer (JSON-RPC frames):

```
← {"jsonrpc":"2.0","id":"srq-7","method":"approval","params":{"session_id":"…","request_id":"…","command":"rm -rf build","description":"…"}}
→ {"jsonrpc":"2.0","id":"srq-7","result":{"choice":"once"}}
```

## Options / Props

| Protocol | Transport | Best for | Defined by |
|----------|-----------|----------|------------|
| ACP | JSON-RPC over stdio | IDE clients (VS Code, Zed, JetBrains) speaking Agent Client Protocol | `acp_adapter/` |
| TUI gateway | JSON-RPC over stdio (or WebSocket via `tui_gateway/ws.py`) | Custom hosts needing sessions, slash commands, approvals, streaming events | `tui_gateway/server.py` |
| API server | HTTP + SSE | OpenAI-compatible frontends and language-agnostic clients | `gateway/platforms/api_server.py` |

Selected TUI gateway methods: `prompt.submit`, `prompt.background`, `session.steer`, `session.create`, `session.list`, `session.active_list`, `session.activate`, `session.close`, `session.interrupt`, `session.history`, `session.compress`, `session.branch`, `session.title`, `session.usage`, `session.status`, `clarify.lock`, `config.set` / `config.get`, `commands.catalog`, `client.capabilities`, `gateway.capabilities`, `ping`, `command.resolve`, `command.dispatch`, `cli.exec`, `reload.mcp`, `reload.env`, `process.stop`, `delegation.status`, `subagent.interrupt`, `subagent.steer`, `spawn_tree.save` / `list` / `load`, `terminal.resize`, `clipboard.paste`, `image.attach`.

Events streamed back: `message.delta`, `message.complete`, `tool.start`, `tool.generating`, `tool.complete`, `gateway.ready`, `request.cancel`, plus session lifecycle and error events.

Rewind parameters on `prompt.submit`:

| Parameter | Meaning |
|-----------|---------|
| `truncate_before_user_ordinal` | Zero-based index of the user turn to cut at; must be a real integer (boolean refused with `4004`) |
| `truncate_before_row_id` | Integer SQLite row ID of the target user turn; preferred durable address; mismatch with ordinal returns `4030`, stale ID `4018` (no fallback) |
| `confirm_truncate` | Required whenever an ordinal / message ID / row ID is sent; without target refused `4004` |
| `confirm_empty_truncate` | Required when the cut would empty the transcript (ordinal 0) |
| `confirm_deep_truncate` | Send when the cut would archive more than one user turn; currently logged and still run, next release will refuse with `4033` |

Server-to-client request methods and answers: `approval` -> `{choice}`; `clarify` -> `{answers}` (or `{}` to cancel); `sudo`, `secret`, `vault.code`, `vault.unlock_prompt` -> `{value}`; `connection` -> `{settled_by, targets}`; `terminal.read`, `window.read`, `preview.act`, `tour` -> `{value}`.

Terminal run status:

| Turn outcome | Status | Terminal event |
|--------------|--------|----------------|
| Final answer produced | `completed` | `run.completed` |
| Interrupted | `cancelled` | `run.cancelled` (`interrupted: true`, `turn_exit_reason`) |
| Provider/agent failure | `failed` | `run.failed` |
| Gateway shutdown during run (`/v1/runs` only) | `interrupted` | `run.interrupted` |
| Ended without finishing (iteration budget, partial) | `failed` | `run.failed` (`partial`, `turn_exit_reason`, `output`) |

Pi-style RPC mapping: `prompt` -> `prompt.submit`; `steer` -> `session.steer`; `follow_up` -> `prompt.submit` queued; `abort` -> `session.interrupt`; `set_model` -> `command.dispatch` `/model <provider:model>`; `compact` -> `session.compress`; `get_state` -> `session.status`; `get_messages` -> `session.history`; `switch_session` -> `session.resume`; `fork` -> `session.branch`; `ui_request` / `ui_response` -> server-to-client requests answered by JSON-RPC responses.

## Notes

- `session.create` accepts per-session `model` / `provider` overrides; an impossible pair is refused offline with JSON-RPC `-32602` (`error.data` carries `model`, `provider`, up to five `suggestions`).
- Resuming or activating a live session attaches another event subscriber; existing submit exclusivity and busy-input policy remain in force.
- A truncating submit is never absorbed by the busy-input policy: while a turn runs it refuses with `4009` (`session busy`); call `session.interrupt` and retry. A successful truncating submit returns `survivor_user_row_ids`; rebind cached row IDs from it.
- Breaking for WebSocket integrations: after `gateway.ready`, call `client.capabilities` with `{"server_requests": true}` once per connection; otherwise every server-to-client request is failed immediately. Answer unimplemented methods with JSON-RPC error `-32601`.
- `request.cancel` `{ id, method, reason }` withdraws a question; `session.resume` / `session.activate` results carry `open_requests` and `inflight` (with `display_kind` / `display_metadata` for gateway-started turns).
- `POST /v1/runs/{id}/steer` is accepted only while status is `running` (otherwise `409 run_not_accepting_steer`); `200` means queued, and an undelivered steer is returned as `pending_steer` on the terminal event.
- `GET /v1/models` is intentionally minimal; use `GET /api/model/options` (API-server bearer key or dashboard `X-Hermes-Session-Token`) or `model.options` for the Hermes-aware picker. `refresh=1` busts the cache and probes all saved custom providers.
- A run is never reported `completed` with `completed: false` or `partial: true`.
- Model hot-swapping works on every surface via `/model` (CLI/TUI, `command.dispatch`, ACP prompt, API server `model` field; see `hermes_cli/model_switch.py`).
- Hermes has no `--mode rpc` flag. For in-process Python embedding import `run_agent.AIAgent` directly.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/programmatic-integration (pinned to v0.22.2)

## Related

- [Extending the CLI](./extending-the-cli.md)
- [Public Subagent Lifecycle API](./subagent-lifecycle-api.md)
