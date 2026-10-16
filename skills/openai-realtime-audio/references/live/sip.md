# GPT-Live telephony and SIP

Connect phone calls to GPT-Live through direct SIP (provider exchanges audio with OpenAI) or a server audio bridge (your application relays audio over WebRTC or WebSocket). Covers inbound accept/reject, sideband attach, outbound calls, transfer, and hangup.

## Signature / Usage

Accept an inbound call (`POST /v1/live/sessions/{session_id}/accept`, `Authorization: Bearer $OPENAI_API_KEY`):

```json
{
  "session": {
    "type": "live",
    "model": "gpt-live-1",
    "instructions": "You are answering an inbound support call.",
    "audio": { "output": { "voice": "marin" } },
    "delegation": { "type": "client" }
  }
}
```

Place an outbound call (`POST /v1/live/sessions`):

```bash
jq -n \
  --arg username "$SIP_USERNAME" \
  --arg password "$SIP_PASSWORD" \
  '{
    "session": {
      "model": "gpt-live-1",
      "instructions": "Help the user schedule an appointment.",
      "audio": { "output": { "voice": "marin" } },
      "delegation": { "type": "client" }
    },
    "transport": {
      "type": "sip",
      "destination": "+14155550123",
      "trunk": {
        "provider_url": "sips:sip.example.com:5061",
        "auth": { "type": "digest", "username": $username, "password": $password },
        "caller_number": "+14155550100"
      }
    }
  }' | curl https://api.openai.com/v1/live/sessions \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-Type: application/json" \
    --data-binary @-
```

Response (`200 OK`, does not mean the call is answered):

```json
{
  "session": { "id": "live_123" },
  "transport": { "type": "sip" }
}
```

## Options / Props

Connection types:

| Connection | Responsibilities |
|------------|------------------|
| Direct SIP | Provider exchanges call audio with OpenAI. Your app handles webhooks, session config, call decisions, business logic |
| Server audio bridge | Your app relays provider or room audio to GPT-Live over WebRTC or WebSocket; manages both connections, event translation, playback, call lifecycle |

Call-control endpoints:

| Endpoint | Body | Result |
|----------|------|--------|
| `POST /v1/live/sessions/{session_id}/accept` | top-level `session` object | `200 OK`, empty body |
| `POST /v1/live/sessions/{session_id}/reject` | `{ "status_code": 486 }` (integer 300-699) | first decision wins; later one returns `decision_already_made` |
| `POST /v1/live/sessions/{session_id}/refer` | `{ "target_uri": "sip:agent@example.com" }` | `200 OK`, empty body |
| `POST /v1/live/sessions/{session_id}/hangup` | none | `200 OK`, empty body |
| `wss://api.openai.com/v1/live/sessions/{session_id}/attach` | sideband WebSocket; do not send `session.start` | events, commands, transcripts |

Outbound trunk fields:

| Field | Value |
|-------|-------|
| `transport.destination` | E.164 phone number, e.g. `+14155550123`; SIP URI destinations unsupported |
| `transport.trunk.provider_url` | e.g. `sips:sip.example.com:5061` (default port 5061; `;transport=tcp` optional) |
| `transport.trunk.auth.type` | `digest` |
| `transport.trunk.auth.username` / `password` | Provider SIP credentials |
| `transport.trunk.caller_number` | Caller number in E.164 |

Sideband events:

| Event | Meaning |
|-------|---------|
| `transport.dtmf.received` | Caller pressed a key; `event` is `0`-`9`, `*`, `#`, or `A`-`D` |
| `transport.dtmf.send` | A hosted tool successfully sent a tone |
| `transport.ringing` | Provider reports ringing or early media |
| `transport.answered` | Call answered, media established |
| `transport.failed` | Setup failed after initialization; see `error.code` / `error.message` |

## Notes

- Inbound: configure the project webhook for `live.transport.incoming`; verify the signature and deduplicate. `data.type: "sip"` and `data.session_id` identify the call; use the session ID unchanged. Treat `data.sip_headers` as untrusted metadata, not authorization.
- Deprecated `live.call.incoming` (no `data.type`) may still be delivered; handle both names during migration. The same pending call can also emit a Realtime webhook; assign one handler to accept/reject.
- GPT-Live SIP support must be enabled for the project and the provider trunk routed to it. SIP signaling uses TLS and call audio requires SRTP. SIP negotiates the audio format, so omit `audio.format`.
- Assign one handler per side effect so duplicate webhook deliveries or events seen on multiple connections do not run tools twice.
- Outbound calling must be enabled for the organization and is available through the Live API, not the Realtime API call-creation endpoint. Trunk must support TLS signaling, Opus, and SDES-SRTP. Provider URL must use `sips:` with no credentials, paths, URI headers, or parameters; local hostnames and private/local IPs are rejected.
- Attach the sideband immediately after creation: it replays only the preceding 3 seconds of events; deduplicate by `event_id`.
- Limits: 1 MiB request body; ringing 3 minutes; connected call 2 hours (not configurable). `403 outbound_sip_not_enabled`; transport setup failures can return `502`; initialization timeouts `504`.
- Each creation request places a new call; `X-Client-Request-Id` does not deduplicate. Do not auto-retry after an ambiguous timeout.
- Keep the sideband open until `session.closed` supplies final usage.
- Server audio bridge: WebRTC recommended; WebSocket supports raw G.711 mu-law / A-law at 8 kHz, forwardable without PCM conversion when codec, rate, and channel count match. Keep the provider's call/room ID alongside the OpenAI session ID.
- Distinct from the Realtime API SIP (`/v1/realtime/calls`).

## Related

- [Overview](./overview.md)
- [WebRTC](./webrtc.md)
- [WebSockets](./websocket.md)
- [Server-side controls](./server-controls.md)
- [Partner integrations](./partner-integrations.md)
- [Sessions](./sessions.md)
