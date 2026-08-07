# WebSocket server connection

Connect a trusted backend server directly to the Realtime API over WebSocket using a standard API key.

```javascript
import WebSocket from "ws";

const url = "wss://api.openai.com/v1/realtime?model=gpt-realtime-2.1";
const ws = new WebSocket(url, {
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "OpenAI-Safety-Identifier": "hashed-user-id",
  },
});

ws.on("open", function open() {
  console.log("Connected to server.");
});

ws.on("message", function incoming(message) {
  console.log(JSON.parse(message.toString()));
});
```

```python
import os
import json
import websocket

OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

url = "wss://api.openai.com/v1/realtime?model=gpt-realtime-2.1"
headers = [
    "Authorization: Bearer " + OPENAI_API_KEY,
    "OpenAI-Safety-Identifier: hashed-user-id",
]

def on_open(ws):
    print("Connected to server.")

def on_message(ws, message):
    data = json.loads(message)
    print("Received event:", json.dumps(data, indent=2))

ws = websocket.WebSocketApp(url, header=headers, on_open=on_open, on_message=on_message)
ws.run_forever()
```

## Notes

- OpenAI Realtime API の例。WebSocket 接続は「標準の API key をサーバー上でのみ扱える」前提のサーバー間 (server-to-server) 統合向け。ブラウザから直接この方法を使わない
- 送受信するイベントはすべて JSON 文字列（`session.update`, `input_audio_buffer.append` など）
- `OpenAI-Safety-Identifier` ヘッダーはエンドユーザーの匿名ハッシュ ID を渡すための任意ヘッダー
- ブラウザから直接つなぐ場合は `webrtc-browser-session.md` を使う
