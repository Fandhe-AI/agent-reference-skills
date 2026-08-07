# Realtime translation

Stream source audio into a dedicated translation session and receive translated audio plus transcript deltas while the speaker is still talking, using `gpt-realtime-translate`.

## Signature / Usage

```javascript
// WebSocket
import WebSocket from "ws";

const ws = new WebSocket(
  "wss://api.openai.com/v1/realtime/translations?model=gpt-realtime-translate",
  { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
);

ws.on("open", () => {
  ws.send(JSON.stringify({
    type: "session.update",
    session: { audio: { output: { language: "es" } } },
  }));
});

ws.on("message", (data) => {
  const event = JSON.parse(data);
  if (event.type === "session.output_audio.delta") playPcm16(event.delta);
  if (event.type === "session.output_transcript.delta") process.stdout.write(event.delta);
});
```

## Options / Props

| Voice-agent session | Translation session |
|------|-------------|
| Connects to `/v1/realtime` | Connects to `/v1/realtime/translations` |
| Model acts as assistant | Model acts as interpreter |
| Conversation + response lifecycle | Continuous streaming from incoming audio |
| Calls `response.create` | Never calls `response.create` |

| Endpoint | Purpose |
|------|-------------|
| `POST /v1/realtime/translations/client_secrets` | Mint a short-lived client secret for browser WebRTC |
| `POST https://api.openai.com/v1/realtime/translations/calls` | Establish a browser WebRTC translation call (SDP exchange) |
| `wss://api.openai.com/v1/realtime/translations?model=gpt-realtime-translate` | Server-to-server WebSocket session |
| `session.input_audio_buffer.append` | Append base64 24kHz PCM16 source audio (WebSocket) |
| `session.output_audio.delta` / `session.output_transcript.delta` / `session.input_transcript.delta` | Server streaming output events |
| `session.close` / `session.closed` | Flush and gracefully end a WebSocket translation session (translation-only event) |

## Notes

- Use WebRTC when the browser captures/plays audio (media tracks, no manual PCM handling); use WebSocket when the server already owns raw audio (e.g. Twilio Media Streams, SIP media).
- Create one translation session per target language; for conversational (two-way) translation, run one session per direction and keep participant audio tracks separate.
- Always send `session.close` and wait for `session.closed` before closing the WebSocket, so trailing translated output isn't dropped.
- If the app needs an assistant that answers questions/calls tools rather than pure interpretation, use `gpt-realtime-2.1` with a standard voice-agent session instead.

## Related

- [Overview](./overview.md)
- [Transcription](./transcription.md)
- [WebRTC connection](./webrtc.md)
- [WebSocket connection](./websocket.md)
