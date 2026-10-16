# Realtime API with WebSocket

Connect to the Realtime API over a raw WebSocket, for server-to-server integrations where your backend already owns raw audio (media pipelines, telephony, workers).

## Signature / Usage

```javascript
import WebSocket from "ws";

const url = "wss://api.openai.com/v1/realtime?model=gpt-realtime-2.1";
const ws = new WebSocket(url, {
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "OpenAI-Safety-Identifier": "hashed-user-id",
  },
});

ws.on("open", () => {
  ws.send(JSON.stringify({
    type: "session.update",
    session: { type: "realtime", instructions: "Be extra nice today!" },
  }));
});

ws.on("message", (message) => console.log(JSON.parse(message.toString())));
```

## Options / Props

| Environment | How to connect |
|------|-------------|
| Node.js server | `ws` module with `Authorization: Bearer <API key>` header |
| Python server | `websocket-client` with the same headers |
| Browser (edge cases: Deno, Cloudflare Workers) | Standard `WebSocket` with subprotocols `["realtime", "openai-insecure-api-key.<ephemeral-key>", "openai-organization.<org>", "openai-project.<project>"]` |

## Notes

- Recommended only for server-to-server; use WebRTC for browser/mobile clients.
- Lowest-level interface: you must send/receive Base64-encoded audio chunks yourself over `input_audio_buffer.append` / `response.output_audio.delta`.
- The official guide is now `guides/voice-websockets` (the old `realtime-websocket` page is folded into it). The first half is GPT-Live ("Connect a server to GPT-Live"); the second half ("Connect via WebSocket") is Realtime. This page covers the Realtime side; for GPT-Live see [GPT-Live WebSocket](../live/websocket.md). GPT-Live and Realtime handshakes and event formats are not interchangeable.
- The Signature code was checked against the official Realtime examples (`wss://api.openai.com/v1/realtime?model=gpt-realtime-2.1`, `ws` module, `session.update` in the "Sending and receiving events" example); it is a condensed combination of the connect and send examples.
- Client-sent events and server-sent events are the same event set used across WebRTC and WebSocket — see [Conversations](./conversations.md).

## Related

- [Overview](./overview.md)
- [WebRTC connection](./webrtc.md)
- [Conversations](./conversations.md)
