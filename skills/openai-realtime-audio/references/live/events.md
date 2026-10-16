# GPT-Live WebSocket events (primary / sideband / fork)

Event index for the three GPT-Live WebSocket endpoints: primary (`/v1/live/sessions`), sideband (`/v1/live/sessions/{session_id}/attach`), and fork (`/v1/live/sessions/{session_id}/fork`). Full per-event schemas are in the API reference.

## Signature / Usage

Primary WebSocket first message (`wss://api.openai.com/v1/live/sessions`, no query parameters, `Authorization: Bearer $OPENAI_API_KEY`):

```json
{
  "type": "session.start",
  "event_id": "evt_start_001",
  "session": {
    "model": "gpt-live-1",
    "instructions": "Help the caller plan a restaurant reservation. Confirm details before booking.",
    "audio": {
      "format": { "type": "audio/pcm", "rate": 24000 },
      "output": { "voice": "marin" }
    },
    "delegation": { "type": "client" }
  }
}
```

Server confirmation:

```json
{
  "type": "session.started",
  "event_id": "event_started_1",
  "session": {
    "id": "live_123",
    "expires_at": 1788307200,
    "status": "active",
    "model": "gpt-live-1"
  }
}
```

Fork first message (an empty object inherits the stored configuration):

```json
{
  "type": "session.start",
  "session": {}
}
```

Delegation event:

```json
{
  "type": "session.delegation.created",
  "event_id": "evt_delegation_001",
  "offset_ms": 3600,
  "delegation": {
    "id": "del_abc123",
    "type": "delegation",
    "target": "client"
  }
}
```

Error event:

```json
{
  "type": "error",
  "event_id": "evt_error_001",
  "error": {
    "type": "invalid_request_error",
    "code": "unknown_parameter",
    "message": "Unknown parameter: 'session.voice'.",
    "param": "session.voice",
    "client_event_id": "evt_invalid_001"
  }
}
```

## Options / Props

Endpoints:

| Endpoint | Path | Notes |
|----------|------|-------|
| Primary WebSocket | `WS /v1/live/sessions` | Send audio and control events; send `session.start` first, wait for `session.started` before audio |
| Sideband WebSocket | `WS /v1/live/sessions/{session_id}/attach` | Attaching does not create a session or replay earlier events; receives reflected input and output audio; do not send `session.start` or `session.input_audio.append`; no required first message; for Responses delegation, tool choice can be updated but the delegation type cannot change |
| Fork WebSocket | `WS /v1/live/sessions/{session_id}/fork` | Starts a new session from stored state; send `session.start` with an overrides object; do not supply a new model; omitted settings (including `store`) are inherited; may override Responses delegation settings, storage, and the new WebSocket audio format; frontend client permissions apply only to WebRTC forks |

Client events (primary and fork list all; sideband omits `session.start`):

| Event | Notes |
|-------|-------|
| `session.start` | Starts the session on primary / fork (not on sideband) |
| `session.update` | Update supported settings |
| `session.input_audio.append` | Primary and fork only |
| `session.input_audio.mute` / `session.input_audio.unmute` | Control incoming audio |
| `session.output_audio.fixture.play` | Fixture audio playback |
| `session.instructions.append` / `session.thinking.append` / `session.commentary.append` | Context appends |
| `decision.create` | Decisions |
| `decision.item.create` / `decision.item.delete` | Decisions context items |
| `response.item.create` / `response.create` | Responses delegation items / continuation |
| `session.close` | End the session |

Server events:

| Event | Notes |
|-------|-------|
| `transport.ringing` / `transport.answered` / `transport.failed` | SIP call progress |
| `transport.dtmf.received` / `transport.dtmf.send` | SIP keypad notifications |
| `session.started` / `session.updated` | Resolved session configuration |
| `session.input_audio.muted` / `session.input_audio.unmuted` | Mute acknowledgments |
| `session.output_audio.fixture.playing` / `session.output_audio.fixture.played` | Fixture playback |
| `session.instructions.appended` / `session.thinking.appended` / `session.commentary.appended` | Append acknowledgments |
| `session.output_audio.delta` | Output audio |
| `session.input_transcript.delta` / `session.output_transcript.delta` | Transcript fragments |
| `session.delegation.created` | Schema `LiveDelegationCreated`: `delegation { id, target ("client" / "responses" / "decisions"), type "delegation", response_id? }`, `event_id`, `offset_ms`, `client_event_id?` |
| `decision.event` / `decision.item.created` / `decision.item.deleted` | Decisions |
| `response.event` | Responses delegation envelope |
| `session.usage.updated` | Cumulative usage |
| `session.closed` | Final usage and reason |
| `error` | Schema `LiveErrorEvent`: `error { code, message, type, client_event_id?, param? }`, `event_id` |
| `info` | Schema `LiveInfoEvent`: `code` (e.g. `data_channel_permissions`), `message`, `event_id` |
| `session.input_audio.append` | Reflected input audio on a sideband, before model-input muting |

## Notes

- Authenticate from your backend with the API key; keep the key on your server.
- `session.delegation.created` contains metadata, not the task text. `delegation.id` is used as `delegation_id` when replying to client-owned work or correlating backend events; `response_id` is omitted for client delegations.
- `error.client_event_id` identifies the client command that caused the error, when supplied.
- The sideband page for a WebRTC frontend: attach from your backend to handle events and control the session.
- This index lists only event names and the examples quoted above; consult the official API reference for the full field schemas of each event.

## Related

- [WebSockets](./websocket.md)
- [Server-side controls](./server-controls.md)
- [Sessions](./sessions.md)
- [Delegation](./delegation.md)
- [Decisions voice](./decisions-voice.md)
- [SIP](./sip.md)
