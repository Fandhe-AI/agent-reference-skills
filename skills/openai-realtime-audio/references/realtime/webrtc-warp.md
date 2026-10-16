# WebRTC with WARP

Use WebRTC Abridged Roundtrip Protocol (WARP) to reduce the time it takes to start a GPT-Live or Realtime API voice session. WARP combines DTLS 1.3, SPED, and SNAP with a pre-negotiated data channel to establish the connection with fewer network round trips.

## Signature / Usage

Native client field trials (libwebrtc), initialized before creating the peer connection factory:

```text
WebRTC-ForceDtls13/Enabled/WebRTC-Sctp-Snap/Enabled/WebRTC-IceHandshakeDtls/Enabled/
```

Browser client with a pre-negotiated data channel (`dcid` forwarded to the application server):

```javascript
// WARP only: set to true after enabling the supported WARP optimizations.
const useWarp = false;

// WARP only: choose any available data-channel ID.
const dataChannelId = 4;

const pc = new RTCPeerConnection();

// Set up the event channel using any channel label.
// WARP only: pre-negotiate the channel using the selected data-channel ID.
const dc = pc.createDataChannel(
  "events",
  useWarp ? { negotiated: true, id: dataChannelId } : undefined,
);

const offer = await pc.createOffer();
await pc.setLocalDescription(offer);

const endpoint = new URL("/session", window.location.origin);

// WARP only: include the matching data-channel ID in the session request.
if (useWarp) {
  endpoint.searchParams.set("dcid", String(dataChannelId));
}
```

Application server forwarding `dcid` to the Realtime API:

```javascript
const endpoint = new URL("https://api.openai.com/v1/realtime/calls");

// WARP only: forward the negotiated data-channel ID to the Realtime API.
if (typeof req.query.dcid === "string") {
  endpoint.searchParams.set("dcid", req.query.dcid);
}
```

GPT-Live session request body (`POST /v1/live/sessions`, channel created with `id: 4`):

```json
{
  "session": {
    "model": "gpt-live-1"
  },
  "transport": {
    "type": "webrtc",
    "sdp": "<SDP offer>",
    "dcid": 4
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `WebRTC-ForceDtls13/Enabled/` | field trial | Enables DTLS 1.3 |
| `WebRTC-Sctp-Snap/Enabled/` | field trial | Enables SNAP |
| `WebRTC-IceHandshakeDtls/Enabled/` | field trial | Enables SPED |
| `transport.dcid` | number | GPT-Live: pre-negotiated data-channel ID in the `POST /v1/live/sessions` JSON body; omit for a standard data channel |
| `dcid` (query) | string | Realtime API: pre-negotiated data-channel ID, e.g. `POST /v1/realtime/calls?dcid=4`; omit for a standard data channel |
| `negotiated` / `id` | RTCDataChannelInit | Create the data channel before the SDP offer with `negotiated: true` and an available `id` (such as `4`) |

## Notes

- WARP, SPED, and SNAP are IETF Internet-Drafts, so their specifications and client support may change. The optimizations can be used individually.
- GPT-Live and the Realtime API use the same WebRTC optimizations; they differ in how the negotiated data-channel ID is sent when creating a session.
- GPT-Live: keep `transport.type` as `webrtc`; do not send `dcid` as a URL query parameter (GPT-Live rejects query parameters). Apply the returned `transport.sdp` as the remote answer and wait for `session.started`; do not send `session.start` on the data channel.
- Realtime API: use the unified `/v1/realtime/calls` flow, with the same SDP and session configuration in the multipart body.
- Browsers cannot configure libwebrtc field trials. DTLS 1.3: Chrome supports it without an origin trial. SNAP: Chrome 151-156 supports it through an origin trial (token in `<meta http-equiv="origin-trial" ...>` or an `Origin-Trial` HTTP header; confirm `WebRtcSctpSnap` in DevTools > Application). SPED: no browser origin trial is available. A SNAP token does not enable SPED or full WARP, and a Chrome token does not apply to Edge.
- Pre-negotiating the data channel needs no origin trial and can reduce the wait for server events even without full WARP.
- Firefox, Safari, browsers on iOS, and older Chromium builds can support standard WebRTC without supporting full WARP.
- For SDKs that wrap libwebrtc, pass the field-trial string through the SDK's initialization options, or initialize libwebrtc before the SDK creates its peer connection factory.

## Related

- [Realtime API with WebRTC](./webrtc.md)
- [Overview](./overview.md)
- [Client secrets (ephemeral keys)](./client-secrets.md)
