# GPT-Live server-side controls

Attach your application server to an existing GPT-Live WebRTC or SIP session over a second connection called a sideband WebSocket, to receive events, run private tools, apply conversation guardrails, and update the conversation. Both connections share one session while WebRTC or SIP carries the primary audio.

## Signature / Usage

Attach URL (authenticate with `Authorization: Bearer $OPENAI_API_KEY`, include the same connection headers used to create the session; do not send `session.start` again):

```text
wss://api.openai.com/v1/live/sessions/{session_id}/attach
```

Guardrail redirect:

```javascript
export function sendUpdate(connection) {
  connection.send({
    type: "session.instructions.append",
    event_id: "guardrail_block_17",
    delegation_id: null,
    content:
      "Stop speaking immediately. Do not continue or act on the last request. Refuse briefly, then wait.",
  });
}
```

## Options / Props

Sideband tasks:

| Task | Events or commands |
|------|--------------------|
| Follow the conversation | Receive user and assistant transcript deltas, delegation events, nested Responses events |
| Update backend configuration | `session.update` within the existing delegation mode; startup settings (frontend model, audio configuration) stay fixed |
| Provide context | `session.instructions.append`, `session.thinking.append` (quiet context), `session.commentary.append` (speakable updates) |
| Return tool results | With Responses delegation, `response.item.create`, then `response.create` |
| Control microphone input | `session.input_audio.mute` / `session.input_audio.unmute` (does not stop assistant output) |
| Finish the session | `session.close`, then receive `session.closed` before disconnecting |

Reflected audio on a sideband (base64 raw mono PCM16LE at 24 kHz regardless of primary transport format; no `event_id`):

| Event | Audio field | Timing |
|-------|-------------|--------|
| `session.input_audio.append` | `audio` | No timestamps |
| `session.output_audio.delta` | `delta` | `start_ms` / `end_ms` on the session timeline |

## Notes

- Session ID source: WebRTC or outbound SIP uses `session.id` from the `POST /v1/live/sessions` response; inbound SIP uses `data.session_id` from the webhook after accepting. Use the ID unchanged, including its prefix, and verify your app is authorized for it.
- Sideband versus data channel: use the browser data channel for captions and local UI; use a sideband when transcripts are processed on the server (guardrails, sentiment analysis, speculative tool calls). With a primary WebSocket connection, use that connection directly. Responses delegation also works without a sideband.
- Assign one owner (browser or backend) per action; if both connections receive a function-call event, execute it once. Same for context updates and `response.create`.
- Send microphone audio only through the primary connection; the sideband only receives reflected audio. Reflected input is pre-mute and does not confirm model consumption; reflected output can have gaps and does not show when the caller heard it.
- Context appends: `delegation_id: null` for session-wide context; a non-null ID must identify an existing client delegation. `content` up to 500 tokens. Match `session.instructions.appended` via `client_event_id`.
- Guardrails: accumulate `session.input_transcript.delta` / `session.output_transcript.delta`, run checks concurrently with a lightweight model, block affected actions in application state, stop related application-owned work, log and redirect. Cancelling does not stop an already-running hosted response or frontend speech. Keep the redirect instruction application-authored; do not copy untrusted user text into it.
- `session.instructions.append` can interrupt speech in progress but cannot retract audio already heard. To block audio, control playback at the client or media relay (mute/drop output, discard queued audio); a sideband alone does not control playback. `session.input_audio.mute` does not mute model output or cancel delegated work.
- Checking speech before playback requires your own buffering and output VAD or noise gate; GPT-Live provides none. Buffering adds latency and discarded speech remains in model context.
- Finish cleanly: register the `session.closed` handler before sending `session.close`, keep the WebRTC connection, data channel, and sideband open while pending work drains, save final usage; if the connection fails first, record finalization as incomplete.
- Distinct from the Realtime API sideband.
- Source: https://developers.openai.com/api/docs/guides/voice-server-controls

## Related

- [Overview](./overview.md)
- [WebRTC](./webrtc.md)
- [SIP](./sip.md)
- [Sessions](./sessions.md)
- [Delegation](./delegation.md)
- [Events](./events.md)
