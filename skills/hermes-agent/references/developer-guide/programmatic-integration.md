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
POST /v1/runs/{id}/resolve-unknown Acknowledge an exact restart-unknown admission
POST /v1/runs/{id}/stop          Interrupt the run
GET  /v1/capabilities            Machine-readable feature flags
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
| TUI gateway | JSON-RPC over stdio (`tui_gateway/entry.py`) or WebSocket (`tui_gateway/ws.py`; the Ink TUI uses the profile's shared gateway at `/api/ws`, protocol `hermes-gateway-v1`, single-use ticket per connection) | Custom hosts needing sessions, slash commands, approvals, streaming events | `tui_gateway/server.py` |
| API server | HTTP + SSE | OpenAI-compatible frontends and language-agnostic clients | `gateway/platforms/api_server.py` |

Selected TUI gateway methods: `prompt.submit`, `prompt.background`, `session.steer`, `session.create`, `session.list`, `session.active_list`, `session.activate`, `session.close`, `session.interrupt`, `session.history`, `session.compress`, `session.branch`, `session.title`, `session.usage`, `session.status`, `clarify.lock`, `config.set` / `config.get`, `commands.catalog`, `client.capabilities`, `gateway.capabilities`, `ping`, `command.resolve`, `command.dispatch`, `cli.exec`, `reload.mcp`, `reload.env`, `process.stop`, `delegation.status`, `subagent.interrupt`, `subagent.steer`, `spawn_tree.save` / `list` / `load`, `terminal.resize`, `clipboard.paste`, `image.attach`.

Plugins add `plugin.<plugin_id>.<name>` methods (`ctx.register_rpc`) and session events of type `plugin.<plugin_id>.<event>` (`ctx.emit_to_session`); an owner serving them lists `plugin-rpc-v1` in `runtime.describe`'s `capabilities`.

On the shared gateway's `hermes-gateway-v1` socket, a session picker reads stored conversations without attaching: `session.list` takes a `workspace` folder filter and, with `picker: true`, returns each row's `preview`, `last_reply`, `cwd`, `git_branch`, `workspace`, `last_active_at` and `pinned`; `session.transcript({session_id, subagent_id?, cursor?, limit?, order?})` pages a conversation's display rows across its compression lineage from the oldest or the newest, each compaction handoff a `row_kind: "compaction"` row (`{rows, next_cursor, reset}`, opaque cursor, at most 2 MiB a page); an oldest-order cursor also polls for rows written since (`reset: true` when the rows it covered changed shape), and `subagent_id` reads a delegated child of the session. None of them subscribes the caller or starts an agent.

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
- Attached clients can steer the session's subagents (v0.22.2 additionally said browser-controller results still require the connection that registered that controller; that sentence is gone in v0.23.1).
- `POST /v1/runs/{id}/resolve-unknown` is a canonical-authority recovery operation, not a generic status mutation. Send exactly the `admission_id` and integer `execution_generation` projected by the run status; the server binds the authenticated owner, selected profile, path run, API principal, target session, admission and generation before the compare-and-set. Resolution settles the lost head as interrupted and releases the next FIFO item (never requeues the head). Feature-detect `features.run_unknown_resolution` (legacy execution mode does not advertise it). New canonical API admissions retain an opaque owner scope, so keyed and non-keyed runs can be authorized after an adapter restart while the admission remains; pre-upgrade non-keyed admissions have no owner scope and stay unresolvable after restart; explicit session retirement ends the recovery path; replay reservation and canonical admission use separate databases, so this is not a global exactly-once guarantee.
- Decision guide addition: a client that needs the user's clipboard image (image paste) should run `hermes clipboard image --out PATH --json` on the user's machine; it is device-local, never a gateway call, because the gateway may be remote.
- Node client: `GatewayClient` from `@hermes/shared/gateway-client` (Ink TUI's client, in `apps/shared`) dials the owner with a ticket, reads `runtime.describe` before `session.create`, translates requests/results for `hermes-gateway-v1`, reconnects with backoff and emits typed events (`@hermes/shared/gateway-types`). The caller passes `connect(start, recover)` returning `{url, protocols, profile_id, instance_id}` (rerun on every reconnect; tickets are single-use); another local client can run `hermes gateway attach --json` (`--start` on the first call, `--recover` when asked to recover). It exits non-zero with the verdict on stdout when there is no owner, so `execFile` rejects and the client retries on its backoff. Sessions are created with `source: "tui"`; `session.create` refuses an owner whose `runtime.describe` does not offer the source. The optional `client: { name, version? }` is sent on `session.create` only when the owner lists `client` in `session_create.parameters`; `name` is 1-64 characters of `a-z`, `0-9`, `.`, `_`, `-`, starting with a letter or digit, `version` 1-64 printable ASCII characters without spaces, no other keys; it is an attribution label and grants nothing.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/programmatic-integration (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- Removed: `POST /v1/browser-control/register` and `GET /v1/browser-control/ws` (the disabled-by-default browser-extension controller protocol). To let Hermes drive a browser you already run, use `browser.cdp_url` or `/browser connect` (API Server page: "Browser-extension control (removed)").

### Node GatewayClient example

```ts
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

import { GatewayClient } from '@hermes/shared/gateway-client'
import type { AnyGatewayEvent } from '@hermes/shared/gateway-types'

const gw = new GatewayClient({
  connect: async (start, recover) => {
    const flags = start ? ['--start'] : recover ? ['--recover'] : []
    const { stdout } = await promisify(execFile)('hermes', ['gateway', 'attach', '--json', ...flags])
    const { url, protocols, endpoint } = JSON.parse(stdout)

    return { url, protocols, profile_id: endpoint.profile_id, instance_id: endpoint.instance_id }
  }
})

gw.on('event', (event: AnyGatewayEvent) => { /* … */ })
gw.start()
gw.drain()
const session = await gw.request('session.create', {})
```

```ts
const gw = new GatewayClient({
  connect,                                           // as above
  source: 'tui',                                     // the default: the terminal-client policy
  client: { name: 'my-client', version: '1.4.0' }    // version is optional
})
```

## Related

- [Extending the CLI](./extending-the-cli.md)
- [Public Subagent Lifecycle API](./subagent-lifecycle-api.md)
