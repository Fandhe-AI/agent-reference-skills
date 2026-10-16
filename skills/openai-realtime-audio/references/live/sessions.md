# Managing GPT-Live sessions

Configure a GPT-Live session, provide history and context, handle transcripts and microphone input, manage long conversations, store and fork sessions, and close gracefully with final usage.

## Signature / Usage

Seed history at startup (`session.input`):

```python
from openai.types.live.session_config_param import SessionConfigParam

session: SessionConfigParam = {
    "model": "gpt-live-1",
    "input": [
        {
            "type": "message",
            "role": "user",
            "content": [
                {"type": "input_text", "text": "I need help with my recent order."}
            ],
        },
        {
            "type": "message",
            "role": "assistant",
            "content": [{"type": "output_text", "text": "What is the order number?"}],
        },
    ],
}
```

Add context during the conversation:

```javascript
export function sendUpdate(connection) {
  connection.send({
    type: "session.thinking.append",
    event_id: "context_1",
    delegation_id: null,
    content:
      "The user has already accepted the terms. The account lookup is still running.",
  });
}
```

Transcript delta event:

```json
{
  "type": "session.input_transcript.delta",
  "event_id": "event_transcript_1",
  "delta": "What is",
  "start_ms": 1000,
  "end_ms": 1200
}
```

Usage update:

```json
{
  "type": "session.usage.updated",
  "event_id": "event_usage_1",
  "usage": { "seconds": 12 },
  "context_window": { "usage_ratio": 0.42 }
}
```

Fork (WebSocket) and recording download:

```javascript
const ws = new ForksWS(new OpenAI(), { session_id: sourceSessionId });
// on "open": ws.send({ type: "session.start", session: {} });

const fork = await client.live.sessions.fork(sourceSessionId, {
  transport: { type: "webrtc", sdp: offerSdp },
});
const response = await client.live.sessions.downloadRecording(sessionId);
```

## Options / Props

Configuration fields:

| Setting | At startup | During the session |
|---------|------------|--------------------|
| Model | Required `model` | Start a new session |
| Instructions | `instructions`, up to 16,384 tokens | `session.instructions.append` |
| History | `input`, relevant prior text messages; default `[]` | Append events |
| Voice | `audio.output.voice`; default `marin`; supported voice or authorized custom voice | Start a new session |
| Delegation | `delegation.type` `client` or `responses`; omitted or `null` selects client | `session.update` within the existing mode |
| Storage | `store`; default `false`; `true` makes the session forkable | Choose at startup |

Additional voices (API name, language, regional influence, presentation, source): `quartz` (English, Australian, Feminine, Generated), `ripple` (English, Australian, Masculine, Natural), `vesper` (English, British, Masculine, Natural), `willow` (English, Irish, Feminine, Natural), `stone` (English, Irish, Masculine, Natural), `gleam` (English, North American, Feminine, Natural), `meridian` (English, North American, Masculine, Natural), `bossa` (Portuguese, Brazilian, Feminine, Natural), `tempo` (Portuguese, Brazilian, Masculine, Natural), `beacon` (English, Filipino, Masculine, Generated), `delta` (English, Southern U.S., Feminine, Generated), `cinder` (English, Southern U.S., Masculine, Generated).

Context events:

| Event | Use |
|-------|-----|
| `session.instructions.append` | Trusted application instructions that influence behavior and speech |
| `session.thinking.append` | Factual context not to be said immediately |
| `session.commentary.append` | Information for the model to say aloud; may paraphrase |

Each takes plain-string `content` up to 500 tokens and a required `delegation_id` (`null` for session-wide).

Input control events: `session.input_audio.mute` -> `session.input_audio.muted`; `session.input_audio.unmute` -> `session.input_audio.unmuted` (match via `client_event_id`).

Fork startup overrides: WebSocket: `store`, Responses delegation settings, `audio.format`; WebRTC: `store`, Responses delegation settings, frontend client permissions.

`session.closed` `reason` values:

| Reason | Meaning |
|--------|---------|
| `close_requested` | App sent `session.close` or called the hangup endpoint |
| `expired` | Session reached its duration limit |
| `content` | A safety filter ended the session |
| `remote_hangup` | Remote primary connection ended gracefully |
| `connection_lost` | Primary or upstream connection lost unexpectedly |

## Notes

- `session.update` only changes `session.delegation.responses` in a session already using Responses delegation; other fields are rejected (`immutable_field_update`). A successful update emits `session.updated`. `delegation: null` at startup selects client delegation.
- Startup `input` accepts up to 128 messages and 8,192 combined tokens; roles `developer`, `user`, `assistant`; developer and user use `input_text`, assistant uses `text` or `output_text`. Put trusted instructions in `instructions` or a developer message.
- WebSocket: choose `audio.format` at startup; WebRTC negotiates format, so omit `audio.format`.
- Context append acknowledgments arrive when the session timeline reaches the estimated end of the context; `start_ms` / `end_ms` describe context delivery, not speech. Pending appends return errors when the session closes.
- Transcript deltas: append exactly as received, keep `start_ms` / `end_ms` (milliseconds from session start; interval end exclusive). No item ID or turn-completion event; grouping is up to the app. GPT-Live is full duplex, so update caller and assistant captions independently.
- Greeting: put greeting instructions in a `developer` message in `session.input` (on WebSocket, in `session.start`) and keep input audio running; startup instructions do not guarantee speech.
- Disclosure: use `session.instructions.append` for exact wording; verify via audio, not the acknowledgment.
- Long conversations: 128,000-token default context window; above 90% usage a replacement voice engine starts in the same session with original instructions plus up to 8,192 tokens of history (recent messages and a summary of older ones). Keep important facts in your application.
- Storage/fork: `store: true` must be enabled for the project and allowed by the data policy; forking needs a completed stored recording. Recordings are available for 30 days; with Zero Data Retention `store` is treated as `false` and forking is unavailable. A fork inherits model, original instructions, and input; set the child's `store` explicitly (omitting inherits). WebSocket fork URL: `wss://api.openai.com/v1/live/sessions/{source_session_id}/fork`; WebRTC: `POST /v1/live/sessions/{source_session_id}/fork` with a new SDP offer.
- Recording: `GET /v1/live/sessions/{session_id}/content` returns binary stereo WAV (input left, output right).
- Idle close and resume: close during inactivity, save state, then fork or reseed with saved text history; muting leaves the session active.
- Errors: `error.client_event_id` identifies the failed command. Some moderation events end the session; others cut off the current speech and emit `error` without ending it.
- Usage: `session.usage.updated` reports cumulative seconds; use the latest value (12 then 15 means 15). Track backend token usage separately from nested Responses events.
- Graceful close: finish needed Responses work, install the `session.closed` listener, send `session.close`, keep connections open while events drain, read final `usage.seconds` / `reason`, then clean up. `session.close` cancels queued Responses and rejects further commands. Without `session.closed`, final usage is unconfirmed; stored sessions can take longer to finalize.
- Source: https://developers.openai.com/api/docs/guides/live-conversations

## Related

- [Overview](./overview.md)
- [Delegation](./delegation.md)
- [Server-side controls](./server-controls.md)
- [WebSockets](./websocket.md)
- [Costs](./costs.md)
- [Events](./events.md)
