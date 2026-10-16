# GPT-Live with WebRTC

Connect a browser to GPT-Live over WebRTC. Audio travels on negotiated media tracks; a data channel carries JSON events. The browser creates an SDP offer and your server exchanges it for an answer with `POST /v1/live/sessions`.

## Signature / Usage

Server (Node.js, `openai` SDK with Live support):

```javascript
const result = await client.live.create({
  session: {
    model: "gpt-live-1",
    instructions:
      "Be concise. Delegate requests needing current information to the backend, which can search the web.",
    delegation: {
      type: "responses",
      responses: {
        model: "gpt-5.6-terra",
        instructions:
          "Use web search when current facts are needed. Return concise, grounded results for a spoken conversation.",
        tools: [{ type: "web_search" }],
        tool_choice: "auto",
      },
    },
  },
  transport: { type: "webrtc", sdp: request.body.sdp },
});
response.status(201).json(result);
```

Browser (connection core):

```javascript
const stop = document.createElement("button");
stop.textContent = "End conversation";
stop.disabled = true;
const audio = new Audio();
audio.autoplay = true;
audio.controls = true;

let events;

let microphone;

let closeTimeout;
let ready = false;
const status = document.createElement("p");
// Abridged: the official cleanup() also stops microphone tracks and closes
// the data channel and peer connection.
function cleanup() { clearTimeout(closeTimeout); }
const connection = new RTCPeerConnection();
connection.addEventListener("track", (event) => {
  audio.srcObject = new MediaStream([event.track]);
});
microphone = await navigator.mediaDevices.getUserMedia({ audio: true });
for (const track of microphone.getAudioTracks()) {
  connection.addTrack(track, microphone);
}

// Create the event channel before creating the SDP offer.
events = connection.createDataChannel("oai-events");
events.addEventListener("message", ({ data }) => {
  const event = JSON.parse(data);
  if (event.type === "session.started") { ready = true; stop.disabled = false; }
  else if (event.type === "session.closed") {
    console.log("Final session usage", event.usage);
    status.textContent = "Conversation ended.";
    cleanup();
  }
});

const offer = await connection.createOffer();
await connection.setLocalDescription(offer);
// ...wait for ICE gathering to complete, then:
const response = await fetch("/api/session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ sdp: connection.localDescription.sdp }),
});
const result = await response.json();
await connection.setRemoteDescription({ type: "answer", sdp: result.transport.sdp });
// The HTTP request started this session. Do not send session.start here.

stop.addEventListener("click", () => {
  if (!ready || !events || events.readyState !== "open") return;
  stop.disabled = true;
  // The session.closed handler is already registered. Keep media and events
  // alive while pending work drains; only clean up after the final event.
  events.send(JSON.stringify({ type: "session.close" }));
  closeTimeout = setTimeout(() => {
    status.textContent = "Incomplete finalization: no session.closed event.";
    cleanup();
  }, 15_000);
});
```

Response (HTTP 201):

```json
{
  "session": { "id": "live_123" },
  "transport": { "type": "webrtc", "sdp": "<SDP answer>" }
}
```

## Options / Props

| Item | Description |
|------|-------------|
| `POST /v1/live/sessions` body | `session` (config) and `transport: { type: "webrtc", sdp }` |
| Data channel label | `oai-events` |
| Prerequisites | Project API key with GPT-Live access; Node.js 22.6+ for the Node example; browser with microphone permission on HTTPS or localhost |

## Notes

- Connection sequence: request microphone from a user action and add tracks; create the data channel and register listeners before the SDP offer; set local description and wait for ICE gathering; server posts `session` + `transport` to OpenAI; apply the SDP answer and wait for `session.started` before sending commands.
- Browser snippet is an abridged excerpt of the official browser example (voice-webrtc guide); the original also handles cleanup, the 10 s ICE-gathering timeout, status text, and a 15 s fallback when session.closed does not arrive.
- Do not send `session.start` on the data channel; the HTTP request starts the session.
- Creating a WebRTC session bills 15 seconds of voice duration during initialization, credited against duration charges once the session runs (not an extra 15 seconds).
- WebRTC negotiates the audio format via SDP, so omit `audio.format` from session configuration. Do not send `session.input_audio.append` or expect `session.output_audio.delta` on the data channel.
- Data channel carries transcript deltas, session commands, and nested `response.event` messages.
- End with `session.close` and keep receiving until `session.closed` before closing the peer connection and microphone tracks; if the connection fails or times out first, final usage is unconfirmed.
- Treat the session ID as opaque and preserve it unchanged, including its prefix.
- Keep the API key and session configuration on the trusted server. The example server is local-only; protect `/api/session` with authentication, authorization, request limits, and HTTPS before exposing it.
- To reduce startup latency, the docs point to a "WebRTC with WARP" guide.
- This page is the GPT-Live variant; the Realtime API WebRTC flow (`/v1/realtime/calls`) is a different API.
- Source: https://developers.openai.com/api/docs/guides/voice-webrtc

## Related

- [Overview](./overview.md)
- [WebSockets](./websocket.md)
- [Sessions](./sessions.md)
- [Server-side controls](./server-controls.md)
