# WebRTC browser session

Connect a browser to the Realtime API over WebRTC using an ephemeral key, stream microphone audio in, and play model audio out.

```javascript
// 1. Fetch an ephemeral key from your own backend (never expose the standard API key here)
const tokenResponse = await fetch("/token");
const data = await tokenResponse.json();
const EPHEMERAL_KEY = data.value;

// 2. Create a peer connection
const pc = new RTCPeerConnection();

// 3. Play remote (model) audio
const audioElement = document.createElement("audio");
audioElement.autoplay = true;
pc.ontrack = (e) => (audioElement.srcObject = e.streams[0]);

// 4. Send local microphone audio
const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
pc.addTrack(ms.getTracks()[0]);

// 5. Data channel for session/control events
const dc = pc.createDataChannel("oai-events");
dc.addEventListener("message", (e) => {
  console.log(JSON.parse(e.data));
});

// 6. SDP offer/answer handshake against the Realtime API
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

const answer = { type: "answer", sdp: await sdpResponse.text() };
await pc.setRemoteDescription(answer);
```

## Notes

- OpenAI Realtime API の例。`EPHEMERAL_KEY` は `client-secret-issuance.md` の手順でバックエンドから取得したもの（`ek_` プレフィックス）を使う。標準の API key をブラウザに埋め込まない
- `pc.ontrack` で受信した `MediaStream` を `<audio>` に割り当てるだけで音声再生が完結する
- `oai-events` データチャンネルは `session.update` などの制御イベント送受信に使う（`voice-agent-basic.md` 参照）
- POST 先は `https://api.openai.com/v1/realtime/calls`（WebRTC 用エンドポイント）であり、WebSocket 用の `wss://.../v1/realtime` とは別物
