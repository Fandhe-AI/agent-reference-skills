# Client secrets (ephemeral keys)

`POST /v1/realtime/client_secrets` mints a short-lived token (`ek_...`) that safely grants Realtime API access to client applications (browser, mobile) without exposing your standard API key.

## Signature / Usage

```javascript
const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "OpenAI-Safety-Identifier": "hashed-user-id",
  },
  body: JSON.stringify({
    expires_after: { anchor: "created_at", seconds: 600 },
    session: {
      type: "realtime",
      model: "gpt-realtime-2.1",
      instructions: "You are a friendly assistant.",
    },
  }),
});
const data = await response.json(); // { value, expires_at, session }
```

## Options / Props

| Field | Type | Description |
|------|------|-------------|
| `expires_after.anchor` | `"created_at"` | Only supported anchor value |
| `expires_after.seconds` | number (10-7200, default 600) | TTL for the secret |
| `session` | `RealtimeSessionCreateRequest` \| `RealtimeTranscriptionSessionCreateRequest` | Session config bound to this secret |
| Response `value` | string | The client secret (`ek_...`) to hand to the client |
| Response `expires_at` | unix timestamp | When the secret stops being valid |
| Response `session` | object | Full applied session configuration, including defaults |

## Notes

- Mint on your trusted backend using a standard API key; never embed a standard API key in a browser or mobile client.
- A single secret can be used to create multiple sessions before it expires.
- Set `OpenAI-Safety-Identifier` on this server-side request so the identifier is bound to the resulting ephemeral token — the browser does not need to resend it when connecting.
- Used by both the ephemeral-token WebRTC flow (`/v1/realtime/calls`) and browser WebSocket connections; translation sessions have an analogous `POST /v1/realtime/translations/client_secrets` endpoint (see [Translation](./translation.md)).

## Related

- [WebRTC connection](./webrtc.md)
- [Overview](./overview.md)
- [Translation](./translation.md)
