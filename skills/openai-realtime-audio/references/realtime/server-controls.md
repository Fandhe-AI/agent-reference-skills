# Webhooks and server-side controls

Keep tool use, business logic, and instructions on your application server while the end user connects directly via WebRTC or SIP, using a "sideband" WebSocket control channel to the same Realtime session.

## Signature / Usage

```javascript
// WebRTC: get the call ID from the SDP response's Location header
const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
  method: "POST",
  body: offer.sdp,
  headers: { Authorization: `Bearer ${EPHEMERAL_KEY}`, "Content-Type": "application/sdp" },
});
const callId = sdpResponse.headers.get("Location")?.split("/").pop(); // rtc_...

// Server: open a sideband WebSocket to the same session
const ws = new WebSocket(`wss://api.openai.com/v1/realtime?call_id=${callId}`, {
  headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY },
});
```

## Options / Props

| Transport | Sideband mechanism |
|------|-------------|
| WebRTC | Read the `Location` header (`/v1/realtime/calls/rtc_...`) from the SDP POST response to get `call_id`, then open `wss://api.openai.com/v1/realtime?call_id=<id>` |
| SIP | Configure a project webhook URL; OpenAI POSTs a `realtime.call.incoming` event with `call_id` and SIP headers when a call arrives, then open the same `?call_id=` WebSocket |

## Notes

- A sideband connection means two active connections to one Realtime session: the end-user client and your server; the server connection can monitor, update instructions, and respond to tool calls.
- The `realtime.call.incoming` webhook and general webhook signature verification (`webhook-id` / `webhook-timestamp` / `webhook-signature` headers) follow the same mechanics as other OpenAI webhooks — see the openai-api-core skill's webhooks-errors reference for the general webhook/signature handling; this page covers only the Realtime-specific `call_id` sideband flow.
- Once connected via `?call_id=`, send/receive the same client and server events as any other Realtime WebSocket connection (see [Conversations](./conversations.md)).

## Related

- [SIP connection](./sip.md)
- [WebRTC connection](./webrtc.md)
- [Conversations](./conversations.md)
