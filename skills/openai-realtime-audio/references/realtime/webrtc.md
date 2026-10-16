# Realtime API with WebRTC

Connect browser/mobile clients to the Realtime API over a WebRTC peer connection, either via a client-generated ephemeral key or the unified `/v1/realtime/calls` interface.

## Signature / Usage

```javascript
// Ephemeral-token flow (browser)
const tokenResponse = await fetch("/token"); // your server mints this via client_secrets
const { value: EPHEMERAL_KEY } = await tokenResponse.json();

const pc = new RTCPeerConnection();
const audioEl = document.createElement("audio");
audioEl.autoplay = true;
pc.ontrack = (e) => (audioEl.srcObject = e.streams[0]);

const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
pc.addTrack(ms.getTracks()[0]);

const dc = pc.createDataChannel("oai-events");

const offer = await pc.createOffer();
await pc.setLocalDescription(offer);

const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
  method: "POST",
  body: offer.sdp,
  headers: {
    Authorization: `Bearer ${EPHEMERAL_KEY}`,
    "Content-Type": "application/sdp",
  },
});

await pc.setRemoteDescription({ type: "answer", sdp: await sdpResponse.text() });
```

## Options / Props

| Connection mode | Flow | Server touches |
|------|-------------|------|
| Unified interface | Browser POSTs SDP to your server, your server forwards SDP + session config to `/v1/realtime/calls` with a standard API key | Every session (server in critical path) |
| Ephemeral token | Your server mints a short-lived `ek_...` key via `POST /v1/realtime/client_secrets`, browser connects directly to `/v1/realtime/calls` with that key | Only key minting |

## Notes

- Recommended over WebSocket for client-side (browser/mobile) connections for more consistent audio performance.
- With WebRTC, audio in/out is handled by standard `RTCPeerConnection`/media-stream APIs; only non-audio client/server events need the `oai-events` data channel.
- Never use a standard OpenAI API key in the browser — only ephemeral client secrets or a server-brokered call.
- Set `OpenAI-Safety-Identifier` on the trusted backend request that creates the session or client secret, not from the browser.
- The official guide is now `guides/voice-webrtc` (the old `realtime-webrtc` page is folded into it). It has two API variants: GPT-Live (`?api=live`, "Connect a browser to GPT-Live", `POST /v1/live/sessions`) and Realtime (from the "Overview" section onward). This page covers the Realtime variant; for GPT-Live see [GPT-Live WebRTC](../live/webrtc.md).
- Per the audio hub (guides/audio): "Sharing a transport does not make GPT-Live and Realtime handshakes, credentials, or event formats interchangeable."
- The official guide recommends the unified interface for "simpler setup and faster connections"; this approach "puts your application server in the critical path for session initialization".
- Reduce connection latency with WARP (WebRTC Abridged Roundtrip Protocol): reduces the time it takes to start a Realtime API voice session; optimizations can be enabled individually or combined for the full WARP handshake. Native client setup, browser support, origin-trial instructions, and the unified connection flow are in [WebRTC with WARP](./webrtc-warp.md).

## Related

- [Overview](./overview.md)
- [WebRTC with WARP](./webrtc-warp.md)
- [WebSocket connection](./websocket.md)
- [Client secrets (ephemeral keys)](./client-secrets.md)
- [Conversations](./conversations.md)
- [Server-side controls](./server-controls.md)
