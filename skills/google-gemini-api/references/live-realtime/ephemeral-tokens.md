---
source: https://ai.google.dev/gemini-api/docs/live-api/ephemeral-tokens
---

# Ephemeral tokens

Short-lived authentication tokens for accessing the Gemini API (Live API) through WebSockets from a user's device (client-to-server), reducing the security risk of exposing API keys.

## Signature / Usage

Create a token (Python):

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

JavaScript:

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});
const expireTime = new Date(Date.now() + 30 * 60 * 1000).toISOString();

const token = await client.authTokens.create({
    config: {
      uses: 1, // The default
      expireTime: expireTime, // Default is 30 mins
      newSessionExpireTime: new Date(Date.now() + (1 * 60 * 1000)), // Default 1 minute in the future
    },
  });
```

REST:

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

Lock the token to a set of configurations (Python):

```python
token = client.auth_tokens.create(
    config = {
    'uses': 1,
    'live_connect_constraints': {
        'model': 'gemini-3.8-live',
        'config': {
            'session_resumption':{},
            'response_modalities':['AUDIO']
        }
    },
    }
)
```

Connect with the token (JavaScript):

```javascript
import { GoogleGenAI, Modality } from '@google/genai';

// Use the token generated in the "Create an ephemeral token" section here
const ai = new GoogleGenAI({
  apiKey: token.name
});
const model = 'gemini-3.8-live';
const config = { responseModalities: [Modality.AUDIO] };

const session = await ai.live.connect({
  model: model,
  config: config,
  callbacks: { ... },
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `uses` | int | Number of sessions the token can start (`1` is the default) |
| `expireTime` / `expire_time` | timestamp | Time to send messages over the connection; default 30 minutes in the future |
| `newSessionExpireTime` / `new_session_expire_time` | timestamp | Time to start new Live API sessions with the token; default 1 minute in the future |
| `liveConnectConstraints` / `live_connect_constraints` | object | Lock the token to a `model` and `config` (e.g. `sessionResumption`, `responseModalities`) |

## Notes

- Ephemeral tokens are in Preview and, at this time, only compatible with the Live API, and only with the `v1beta` API version.
- google-genai 2.31.0 emits an ExperimentalWarning when connecting to Live with an ephemeral token unless the client uses `http_options={"api_version": "v1alpha"}`, while this page and the REST endpoint document `v1beta`.
- Flow: the client authenticates with your backend, the backend requests a token from the Gemini API provisioning service, and the client uses the token (`token.name`) as if it were an API key.
- Within the `expireTime` window you need `sessionResumption` to reconnect the call every 10 minutes (the same token can be reused even with `uses: 1`).
- Without the SDK, pass the token in an `access_token` query parameter, or in an HTTP `Authorization` header prefixed by the auth-scheme `Token`.
- Best practices: set a short expiration with `expire_time`; tokens expire, requiring re-provisioning; verify secure authentication for your own backend; avoid ephemeral tokens for backend-to-Gemini connections.
- These tokens apply only to the Gemini Live API; for the OpenAI Realtime API see the openai-realtime-audio skill.

## Related

- [Get started with Live API (WebSockets)](./get-started-websocket.md)
- [Session management with Live API](./session-management.md)
- [Live API overview](./overview.md)
