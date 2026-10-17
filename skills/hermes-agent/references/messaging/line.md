# LINE

Hermes Agent runs as a LINE Messaging API bot through the bundled platform plugin `plugins/platforms/line/`. Outbound text uses the free reply token first and falls back to the metered Push API after the token expires (~60 s).

## Signature / Usage

```env
# ~/.hermes/.env
LINE_CHANNEL_ACCESS_TOKEN=YOUR_LONG_LIVED_TOKEN
LINE_CHANNEL_SECRET=YOUR_CHANNEL_SECRET
LINE_ALLOWED_USERS=U1234567890abcdef...
LINE_ALLOWED_GROUPS=C1234567890abcdef...
LINE_ALLOWED_ROOMS=R1234567890abcdef...
LINE_PUBLIC_URL=https://my-tunnel.example.com
```

```yaml
gateway:
  platforms:
    line:
      enabled: true
```

Webhook URL in the LINE console: `https://<your-tunnel>/line/webhook` (verify, then toggle **Use webhook** on). Default port `8646` (expose with `cloudflared tunnel --url http://localhost:8646` or `ngrok http 8646`). Health check: `/line/webhook/health`.

## Options / Props

| Variable | Default | Description |
|----------|---------|-------------|
| `LINE_CHANNEL_ACCESS_TOKEN` | required | Long-lived channel access token |
| `LINE_CHANNEL_SECRET` | required | HMAC-SHA256 webhook verification secret |
| `LINE_HOST` | unset (dual-stack) | Bind host |
| `LINE_PORT` | `8646` | Bind port |
| `LINE_PUBLIC_URL` | — | Public HTTPS base URL; required for image / voice / video sends |
| `LINE_ALLOWED_USERS` / `LINE_ALLOWED_GROUPS` / `LINE_ALLOWED_ROOMS` | — | U- / C- / R-prefixed IDs; at least one required |
| `LINE_ALLOW_ALL_USERS` | `false` | Skip allowlist (dev only) |
| `LINE_HOME_CHANNEL` | — | Cron / notification target (`deliver: line`) |
| `LINE_SLOW_RESPONSE_THRESHOLD` | `45` | Seconds before the "Get answer" postback button fires (`0` disables) |
| `LINE_PENDING_TEXT` / `LINE_BUTTON_LABEL` / `LINE_DELIVERED_TEXT` / `LINE_INTERRUPTED_TEXT` / `LINE_EXPIRED_TEXT` | see page | Postback flow texts |

## Notes

- Disable **Auto-reply messages** and **Greeting messages** in the LINE console.
- Responds to every 1:1 message; groups and rooms only when allowlisted. Inbound text, images, audio, video, files, stickers and locations handled.
- Slow-response flow: state machine `PENDING -> READY -> DELIVERED` (+ `ERROR`); suppress `interim_assistant_messages` and tool progress so the reply token is not consumed early.
- LINE accepts no binary uploads: media is served from `/line/media/<token>/<filename>` via `LINE_PUBLIC_URL`.
- Limits: 5000 characters per bubble (chunked at ~4500, max 5 bubbles per call), no message editing, no markdown rendering (stripped), loading indicator DM-only.
- "already in use by another profile" means the token is bound to another running profile.

## Related

- [Messaging Gateway](./messaging.md)
