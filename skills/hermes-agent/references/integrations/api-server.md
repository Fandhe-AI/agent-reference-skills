# API Server

Exposes hermes-agent as an OpenAI-compatible HTTP endpoint. Any frontend that speaks the OpenAI format (Open WebUI, LobeChat, LibreChat, NextChat, ChatBox, ...) can use it as a backend with the full toolset (terminal, files, web search, memory, skills).

## Signature / Usage

Add to `~/.hermes/.env`:

```bash
API_SERVER_ENABLED=true
API_SERVER_KEY=change-me-local-dev
# Optional: only if a browser must call Hermes directly
# API_SERVER_CORS_ORIGINS=http://localhost:3000
```

Start the gateway (`hermes gateway`; logs `API server listening on http://127.0.0.1:8642`), then:

```bash
curl http://localhost:8642/v1/chat/completions \
  -H "Authorization: Bearer change-me-local-dev" \
  -H "Content-Type: application/json" \
  -d '{"model": "hermes-agent", "messages": [{"role": "user", "content": "Hello!"}]}'
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/chat/completions` | OpenAI Chat Completions, stateless (full `messages` each request). Streaming adds `hermes.tool.progress` events |
| POST | `/v1/responses` | OpenAI Responses format; server-side state via `previous_response_id` or named `conversation` |
| GET / DELETE | `/v1/responses/{id}` | Retrieve / delete a stored response |
| GET | `/v1/models` | Lists the agent as a model (profile name, or `hermes-agent` for default). Cheap OpenAI-compat surface |
| GET | `/api/model/options` | Curated provider/model inventory with pricing and capability hints; `?refresh=1` forces full probing |
| GET | `/v1/capabilities` | Machine-readable stable surface and `features` flags |
| GET | `/health`, `/v1/health` | Liveness; returns `{"status": "ok"}` |
| GET | `/health/detailed` | Authenticated readiness (config, state DB, model, disk, gateway, runs); degraded still HTTP 200 |
| POST | `/v1/runs` | Create an agent run; returns `run_id` |
| GET | `/v1/runs/{run_id}` | Poll run state |
| GET | `/v1/runs/{run_id}/events` | SSE stream of progress and lifecycle events |
| POST | `/v1/runs/{run_id}/stop` | Interrupt a run (`{"status": "stopping"}`, settles as `cancelled`) |
| POST | `/v1/runs/{run_id}/approval` | Resolve a pending approval (advertised as `run_approval`); canonical runs need `request_id`, `execution_generation`, `choice` |
| POST | `/v1/runs/{run_id}/clarify` | Answer a canonical clarification (`request_id`, `execution_generation`, `answer`) |
| POST | `/v1/runs/{run_id}/resolve-unknown` | Acknowledge a run in non-terminal `unknown` status after an owner restart (`admission_id`, `execution_generation`); advertised as `features.run_unknown_resolution` only when the canonical session authority is active |
| GET / POST | `/api/jobs` | List / create scheduled jobs (same shape as `hermes cron`) |
| GET / PATCH / DELETE | `/api/jobs/{job_id}` | Fetch / update / remove a job |
| POST | `/api/jobs/{job_id}/pause`, `/resume`, `/run` | Pause, resume, trigger immediately |
| GET | `/v1/skills`, `/v1/toolsets` | Read-only capability discovery |

Sessions API (all under `/api/sessions`, gated by `API_SERVER_KEY`):

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/sessions` | List (paginated: `limit`, `offset`, `source`, `include_children`) |
| POST | `/api/sessions` | Create an empty session |
| GET / PATCH / DELETE | `/api/sessions/{id}` | Read metadata / update title or `end_reason` / delete |
| GET | `/api/sessions/{id}/messages` | History; `include_compacted=true`, `inline_images=false` |
| POST | `/api/sessions/{id}/fork` | Branch the session (like CLI `/branch`) |
| POST | `/api/sessions/{id}/chat` | One synchronous agent turn |
| POST | `/api/sessions/{id}/chat/stream` | SSE for one turn: `assistant.delta`, `assistant.commentary`, `tool.started`, `tool.completed`, `tool.failed`, then `run.completed` / `run.failed` / `run.cancelled` |

Responses request example:

```json
{
  "model": "hermes-agent",
  "input": "What files are in my project?",
  "instructions": "You are a helpful coding assistant.",
  "store": true
}
```

## Options / Props

Environment variables (env vars take precedence over `config.yaml`):

| Name | Default | Description |
|------|---------|-------------|
| `API_SERVER_ENABLED` | `false` | Enable the API server |
| `API_SERVER_PORT` | `8642` | HTTP port |
| `API_SERVER_HOST` | `127.0.0.1` | Bind address |
| `API_SERVER_KEY` | (required) | Bearer token |
| `API_SERVER_CORS_ORIGINS` | (none) | Comma-separated allowed browser origins |
| `API_SERVER_MODEL_NAME` | profile name | Model name on `/v1/models` |

```yaml
gateway:
  api_server:
    enabled: true
    port: 8642
    host: 127.0.0.1
    key: your-secret-key
    cors_origins: http://localhost:3000
    model_name: my-hermes
    max_concurrent_runs: 10   # concurrent-run cap; 0 disables the limit
    history_tool_output_max_chars: 0   # cap tool outputs in stored /v1/responses history; 0 = verbatim
```

The block is also accepted under `gateway.platforms.api_server:` or top-level `platforms.api_server:`.

Per-request model selection (accepted on `/v1/chat/completions`, `/v1/responses`, `/v1/runs`, `/api/sessions/{id}/chat` and `/chat/stream`): `model`, `provider`, `model_options` (reasoning / service tier). Precedence: session `/model` override, then `gateway.platforms.api_server.model_routes` alias, then direct request `model`/`provider`, then global defaults. A `provider` conflicting with a `model_routes` alias returns 400.

## Notes

- `API_SERVER_KEY` is required for every deployment, including the default loopback bind; the server gives full toolset access including terminal commands.
- A bare `model` (no `provider`) on `/v1/chat/completions` and `/v1/responses` is ignored unless `gateway.platforms.api_server.direct_model_requests: true`. Explicit `provider`, `/v1/runs`, and session-chat endpoints always honor the model.
- Inline images (`image_url` / `input_image`, http(s) or `data:image/...`) are supported; uploaded files (`file`, `input_file`, `file_id`) and non-image `data:` URLs return `400 unsupported_content_type`.
- All SSE streams emit a `: keepalive` comment line after 10 s of silence; custom parsers must skip lines starting with `:`. `gateway.platforms.api_server.tool_progress_events: false` turns off named `hermes.tool.progress` events on Chat Completions only.
- Reasoning: Chat Completions streams `choices[0].delta.reasoning_content`; Responses emits `reasoning` output items; advertised as `features.reasoning_streaming`.
- `POST /v1/runs` accepts `Idempotency-Key` (1-255 visible ASCII chars): identical retry returns the original `run_id` with HTTP 202 and `Idempotency-Replayed: true`; different payload returns 409 `idempotency_key_conflict`; keys retained 24 hours.
- Run statuses: `completed`, `failed`, `cancelled`, `interrupted`; gateway shutdown persists active runs as `interrupted` (terminal event `run.interrupted`). A canonical run whose owner restarted mid-turn reports non-terminal `unknown`; later turns in that session wait until `POST /v1/runs/{run_id}/resolve-unknown` acknowledges it (ordinary `/stop` returns `409 unknown_execution`). Concurrent-run cap exceeded returns HTTP 429 `Too many concurrent runs (max N)`.
- Resolve-unknown body must contain exactly `admission_id` and `execution_generation` (else `400 invalid_params`); success returns the canonical terminal receipt (`outcome: "interrupted"`) plus `run_id`, an exact repeat returns the same receipt (200); stale/non-integer generation or a run not currently unknown returns `409 stale_generation`; an admission ID not belonging to the path run returns `409 not_found`.
- Unadmitted runs keep no reservation (exact retry is safe): draining/retiring profile or a state DB locked past the write timeout answers HTTP 503 (`runtime_draining` / `storage_unavailable`) with `Retry-After`; a malformed control body answers 400 `invalid_params`.
- With the canonical gateway owner, `GET /v1/runs/{run_id}` exposes `pending_controls` (same `prompt_id` / `execution_generation` as attached WebSocket viewers); controls reject identityless or bulk responses, and stale generations, foreign prompt IDs and settled runs return 409.
- API sessions are their own sessions: `session_id` / `X-Hermes-Session-Id` cannot bind a session owned by another surface (CLI, TUI, Desktop, ACP, messaging); such a request returns HTTP 409 `permission_denied` before admission (no run, no `Idempotency-Key` reservation). To work on that chat, attach through the gateway WebSocket (`prompt.submit`).
- Conversation semantics: requests use the gateway's durable admission queue; structured image content stays structured (not parsed as a slash command). `X-Hermes-Session-Key` conversation is retained on `/v1/runs` and `/v1/responses`; a nonempty `/v1/runs` `conversation_history` is authoritative even with an explicit `session_id`, otherwise history loads when the turn executes.
- Terminal results: runs polling and SSE agree on `cancelled` / `failed`; Responses uses `response.cancelled` / `response.failed`; Chat Completions reports `finish_reason: "cancelled"` (interrupted) or `"error"` (failure), not `"stop"`. A turn that exhausts `agent.max_turns` still returns the wrap-up: Chat Completions `finish_reason: "length"` with `hermes.error_code: "iteration_budget_exhausted"`, Responses `status: "incomplete"`. Session-chat replies include `status`.
- Idempotency keys (`POST /v1/chat/completions`, `POST /v1/responses`; `/v1/runs` has its own ledger, 24 h): in canonical mode (session authority) a key is a durable admission identity scoped to the authenticated API profile and credential (a rotated `API_SERVER_KEY` makes it a new request). Legacy mode (no session authority) dedups non-streaming requests via a 5-minute in-memory cache; streaming is not deduplicated.
- Idempotency conflicts: a changed identity field or a different target session is refused with `admission_conflict` (HTTP 409 on Responses and non-streaming Chat Completions; on streaming Chat Completions the stream is already HTTP 200, so the last chunk carries `finish_reason: "error"` / `error.message` `"admission_conflict"` then `data: [DONE]`). Identity fields: Responses = `input`, `instructions`, `previous_response_id`, `conversation`, `conversation_history`, `model`, `provider`, `model_options`, `tools` (+ `truncation` when sent); Chat Completions = last user message, earlier messages (unless `X-Hermes-Session-Id` is sent), system prompt, turn settings (model/provider/`model_options`) but not `tools` / `tool_choice`. Delivery mode (JSON vs `stream: true`) is not part of the identity.
- Idempotency replay vs duplicate prevention: an exact retry replays only while the server still holds the identity plus a replay record or rebuildable terminal admission; afterwards it is refused as a conflict and nothing runs. A Responses retry may get 409 `unknown_execution` (claim exists, answer missing, first attempt may have run): do not resend under a new key. Deleted sessions' admissions become prune-eligible 7 days after `DELETE /api/sessions/{id}` (removed only when a prune pass runs); Responses replay can end sooner because the response store keeps the 1,000 most recently settled identities per profile (pending/running never dropped; `DELETE /v1/responses/{id}` removes one at once; a current default, not a guarantee). An explicit `X-Hermes-Session-Id` is never remapped (deleted id stays retired; unretained identity gets `not_found`); without it, Chat Completions derives the session from the system prompt and first user message and never reuses a deleted session's id.
- Run owner scope for admissions created in v0.23 is stored atomically with the canonical admission (private server state; older non-keyed admissions fail closed after an adapter restart); the replay ledger and canonical admission are separate transactions, so there is no global exactly-once guarantee.
- `X-Hermes-Session-Key` (max 256 chars, no `\r` `\n` `\x00`) gives a stable per-channel scope for long-term memory such as Honcho, independent of `X-Hermes-Session-Id`.
- A system message / `instructions` field is layered on top of Hermes' core system prompt; the agent keeps its tools, memory, and skills.
- Multi-profile routing (`gateway.multiplex_profiles`, `/p/<profile>/...`): each prefix requires that profile's own `API_SERVER_KEY`; default key is rejected on named profiles (breaking change, July 2026); runs are per-profile scoped (other profile's run id returns 404).
- CORS is off by default. When enabled: preflight `Access-Control-Max-Age: 600`; `X-Hermes-Session-Id` and `Idempotency-Key` are allowed request headers (key semantics and retention: see the idempotency notes above). Responses include `X-Content-Type-Options: nosniff` and `Referrer-Policy: no-referrer`.
- Limitations: stored responses persist in SQLite (max 100, LRU eviction); no file upload; `/v1/models` advertises a stable alias.
- Proxy mode: another gateway with `GATEWAY_PROXY_URL` pointing here forwards all messages to this server's agent.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/api-server (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- Browser-extension control is removed: `POST /v1/browser-control/register`, `GET /v1/browser-control/ws`, the `/v1/artifacts/*` routes, dashboard `browser.controller.*` RPCs and the `browser.extension_control` config key no longer exist (they routed the old `browser_navigate` / `browser_click` tools; browser automation is now `browser_exec` over CDP). Upgrading drops a leftover `browser.extension_control` block from `config.yaml`. To drive a browser you already run, set `browser.cdp_url` or use `/browser connect`.
- `Idempotency-Key` on Chat Completions / Responses: the v0.22 "cached by key for 5 minutes" description now applies only to legacy mode; canonical mode uses durable admission identity (see above).
- API server no longer runs its own agent on a session owned by another surface; it now refuses with 409 `permission_denied`.

## Related

- [Honcho](./honcho.md)
- [Providers](./providers.md)
- [Fallback Providers](./fallback-providers.md)
- [Integrations Overview](./overview.md)
