# GPT-Live with WebSockets

Connect a trusted server to GPT-Live over a primary WebSocket that carries audio and JSON events in both directions. WebRTC is recommended; WebSockets are a supported alternative.

## Signature / Usage

```javascript
import OpenAI from "openai";
import { LiveWS } from "openai/resources/live/ws";

const ws = new LiveWS(new OpenAI());
let started = false;
let closing = false;
let pendingByte = Buffer.alloc(0);

ws.socket.on("open", () => {
  ws.send({
    type: "session.start",
    event_id: "event_start",
    session: {
      model: "gpt-live-1",
      instructions:
        "Be concise. Delegate requests needing current information to the backend, which can search the web.",
      audio: {
        format: { type: "audio/pcm", rate: 24000 },
        output: { voice: "marin" },
      },
      delegation: {
        type: "responses",
        responses: {
          model: "gpt-5.6-luna",
          tools: [{ type: "web_search" }],
          tool_choice: "auto",
        },
      },
    },
  });
});

process.stdin.on("data", (chunk) => {
  if (!started || closing || ws.socket.readyState !== 1) return;
  const bytes = Buffer.concat([pendingByte, chunk]);
  const completeLength = bytes.length - (bytes.length % 2);
  pendingByte = bytes.subarray(completeLength);
  if (completeLength) {
    ws.send({
      type: "session.input_audio.append",
      audio: bytes.subarray(0, completeLength).toString("base64"),
    });
  }
});

ws.on("event", (event) => {
  if (event.type === "session.started") {
    started = true;
    console.error("Session ready", event.session.id);
  } else if (event.type === "session.output_audio.delta") {
    process.stdout.write(Buffer.from(event.delta, "base64"));
  } else if (event.type === "session.closed") {
    console.error("Final session usage", event.usage);
    ws.close();
  }
});

// end the conversation (only after session.started)
process.on("SIGINT", () => {
  if (closing) return;
  if (!started || ws.socket.readyState !== 1) {
    ws.socket.platformSocket.terminate();
    return;
  }
  closing = true;
  ws.send({ type: "session.close" });
});
```

Abridged from the official example; stdin carries raw mono PCM16 at 24 kHz and the full guide also adds a 15-second close timeout.

## Options / Props

`session.audio.format` (set at startup; one format for input and output; cannot change during the session):

| Format | Description |
|--------|-------------|
| `{"type":"audio/pcm","rate":24000}` | Mono signed 16-bit little-endian PCM at 24 kHz; the default |
| `{"type":"audio/pcm","rate":16000}` | Mono signed 16-bit little-endian PCM at 16 kHz |
| `{"type":"audio/pcmu","rate":8000}` | G.711 mu-law at 8 kHz, one byte per sample |
| `{"type":"audio/pcma","rate":8000}` | G.711 A-law at 8 kHz, one byte per sample |

Events:

| Event | Direction / use |
|-------|-----------------|
| `session.start` | Client; first message, carries `session` config |
| `session.started` | Server; resolved session config and ID. Wait for it before sending audio or commands |
| `session.input_audio.append` | Client; base64 raw audio in `audio` (no acknowledgment) |
| `session.output_audio.delta` | Server; base64 audio in `delta` |
| `session.input_transcript.delta` / `session.output_transcript.delta` | Server; append `delta` to the matching transcript |
| `response.event` | Server; envelope with nested `event` for Responses delegation |
| `response.create` | Client; start or continue delegated backend work |
| `session.update` / `session.updated` | Update supported settings within the existing delegation mode / resolved config |
| `session.instructions.append` | Client; add conversation instructions |
| `session.input_audio.mute` / `session.input_audio.unmute` | Client; control incoming audio |
| `session.close` / `session.closed` | Client request / server terminal event with final `usage` |
| `error` | Server; use `error.client_event_id` to identify the command |

## Notes

- Connect to `wss://api.openai.com/v1/live/sessions` with no query parameters; authenticate with `Authorization: Bearer $OPENAI_API_KEY`; keep the key on the trusted server.
- Base64-encode raw bytes without a WAV or other container header. PCM chunks must contain complete 16-bit samples (even byte length); otherwise chunk boundaries are arbitrary but order must be preserved.
- Resample when the source rate differs from the configured rate; the format setting does not convert input bytes. A matching G.711 stream can pass through without conversion to PCM.
- The primary WebSocket sends output audio without timing fields or an output-audio-done event; track playback with your own audio queue and use transcript timestamps for captions.
- Model, initial instructions, audio format, voice, and delegation mode are fixed at startup. Muting input does not cancel backend work or stop generated speech.
- Install the `session.closed` listener before sending `session.close`; keep receiving until it arrives (the example waits up to 15 seconds). Voice-duration updates are cumulative snapshots; do not add them together. A transport failure before `session.closed` leaves final usage unconfirmed.
- EOF on the audio source does not end a Live session; send `session.close`.
- To monitor or control an existing session use a sideband connection (see server-controls). The Responses WebSocket mode is a separate guide for connecting a reasoning backend.
- Distinct from the Realtime API WebSocket connection.
- Source: https://developers.openai.com/api/docs/guides/voice-websockets

## Related

- [Overview](./overview.md)
- [WebRTC](./webrtc.md)
- [SIP](./sip.md)
- [Sessions](./sessions.md)
- [Server-side controls](./server-controls.md)
