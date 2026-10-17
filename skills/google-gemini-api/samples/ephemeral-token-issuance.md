---
source: https://ai.google.dev/gemini-api/docs/live-api/ephemeral-tokens
---

# Ephemeral Token Issuance for Live API

Issue a short-lived token on the backend and use it as the API key from a client for Live API sessions.

```python
import datetime
from google import genai

now = datetime.datetime.now(tz=datetime.timezone.utc)

client = genai.Client()

token = client.auth_tokens.create(
    config = {
    'uses': 1, # The ephemeral token can only be used to start a single session
    'expire_time': now + datetime.timedelta(minutes=30), # Default is 30 minutes in the future
    # 'expire_time': '2025-05-17T00:00:00Z',   # Accepts isoformat.
    'new_session_expire_time': now + datetime.timedelta(minutes=1), # Default 1 minute in the future
  }
)

# You'll need to pass the value under token.name back to your client to use it
```

```javascript
import { GoogleGenAI, Modality } from '@google/genai';

// Use the token generated in the "Create an ephemeral token" section here
const ai = new GoogleGenAI({
  apiKey: token.name
});
const model = 'gemini-3.8-live';
const config = { responseModalities: [Modality.AUDIO] };

async function main() {

  const session = await ai.live.connect({
    model: model,
    config: config,
    callbacks: {
      onopen: () => console.log('Opened'),
      onmessage: (m) => console.log(m),
      onerror: (e) => console.error(e.message),
      onclose: (e) => console.log('Close:', e.reason),
    },
  });

  // Send content...

  session.close();
}

main();
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/auth_tokens" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "uses": 1,
    "expireTime": "YYYY-MM-DDTHH:MM:SSZ",
    "newSessionExpireTime": "YYYY-MM-DDTHH:MM:SSZ"
  }'
```

## Notes

- Preview feature, compatible only with the Live API and only with the `v1beta` API version.
- By default the token has 1 minute to start new sessions (`newSessionExpireTime`) and 30 minutes to send messages (`expireTime`).
- The official JavaScript connect snippet elides the callbacks (`callbacks: { ... }`); this sample fills in `onopen` / `onmessage` / `onerror` / `onclose` as in the Live API tools guide.
- Tokens can be locked to a configuration with `live_connect_constraints` (model and config).
- Distinct from OpenAI Realtime client secrets (openai-realtime-audio).
