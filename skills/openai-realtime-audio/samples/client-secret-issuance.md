# Client secret (ephemeral key) issuance

Mint a short-lived `ek_*` token on your backend so a browser or mobile client can connect to the Realtime API without exposing your standard API key.

```bash
curl https://api.openai.com/v1/realtime/client_secrets \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "expires_after": {
      "unit": "minutes",
      "value": 30
    },
    "session": {
      "type": "realtime",
      "model": "gpt-realtime",
      "instructions": "You are a friendly assistant."
    }
  }'
```

```python
import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
client_secret = client.realtime.client_secrets.create()
print(client_secret.value, client_secret.expires_at)
```

Example response:

```json
{
  "value": "ek_68af296e8e408191a1120ab6383263c2",
  "expires_at": 1756310470,
  "session": {
    "type": "realtime",
    "object": "realtime.session",
    "id": "sess_C9CiUVUzUzYIssh3ELY1d",
    "model": "gpt-realtime",
    "output_modalities": ["audio"],
    "instructions": "You are a friendly assistant."
  }
}
```

## Notes

- OpenAI Realtime API の例。この `value`（`ek_` プレフィックス）が `webrtc-browser-session.md` の `EPHEMERAL_KEY` になる
- `session` に付けた設定（model, instructions など）はそのトークンで開始するセッションの初期値になるが、クライアント接続時に上書き可能
- トークンは短命（数十分〜。ドキュメント記載時点では最短1分のケースもある）。都度サーバーで新規発行する
- この発行 API 自体は標準の API key で叩く（バックエンドのみで実行し、フロントエンドに API key を渡さない）
