# Webhooks and Server-Side Controls (Realtime API)

Keep tool use and business logic on your application server by opening a "sideband" control connection alongside a client's Realtime API session (WebRTC or SIP).

## Signature / Usage

```javascript
// 1. Establish the WebRTC peer connection and capture the call ID from the Location header
const baseUrl = "https://api.openai.com/v1/realtime/calls";
const sdpResponse = await fetch(baseUrl, {
  method: "POST",
  body: offer.sdp,
  headers: {
    Authorization: `Bearer ${EPHEMERAL_KEY}`,
    "Content-Type": "application/sdp",
  },
});
// Location: /v1/realtime/calls/rtc_123456
const location = sdpResponse.headers.get("Location");
const callId = location?.split("/").pop();
```

```javascript
// 2. On the server, open a sideband WebSocket to the same session using call_id
import WebSocket from "ws";
const url = "wss://api.openai.com/v1/realtime?call_id=" + callId;
const ws = new WebSocket(url, {
  headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY },
});
ws.on("open", () => {
  ws.send(JSON.stringify({
    type: "session.update",
    session: { type: "realtime", instructions: "Be extra nice today!" },
  }));
});
ws.on("message", (message) => console.log(JSON.parse(message.toString())));
```

## Notes

- Distinct from **WebSocket Mode** (`wss://api.openai.com/v1/responses`), a separate feature for the Responses API that keeps a persistent connection for long-running, tool-call-heavy text workflows (not yet documented in this skill). This page covers server-side controls for **Realtime API** (voice/audio) sessions only — the two features share the word "WebSocket" but serve different APIs.
- Two connections exist per session: one from the user's client, one from your application server (the "sideband" connection). The server connection can monitor the session, update instructions, and respond to tool calls.
- For **SIP** calls, OpenAI POSTs a `realtime.call.incoming` webhook event to your configured webhook URL (headers `webhook-id` / `webhook-timestamp` / `webhook-signature`, same format as standard OpenAI webhooks) carrying `data.call_id` and `data.sip_headers`. Use that `call_id` to open the sideband `wss://api.openai.com/v1/realtime?call_id={callId}` WebSocket.
- The sideband WebSocket connection lives for the duration of the call/session and behaves like a normal Realtime API WebSocket connection.

## Related

- [Webhooks](./webhooks.md)
