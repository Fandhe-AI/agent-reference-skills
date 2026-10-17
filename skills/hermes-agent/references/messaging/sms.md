# SMS

Hermes connects to SMS through the Twilio API: people text your Twilio number and get responses back. Twilio posts inbound messages to a webhook served by the gateway.

## Signature / Usage

```bash
# ~/.hermes/.env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567
SMS_WEBHOOK_URL=https://your-server:8080/webhooks/twilio   # must match Twilio Console
SMS_ALLOWED_USERS=+15559876543,+15551112222
```

In the Twilio Console set **Messaging -> A MESSAGE COMES IN** to the webhook URL with HTTP method `POST`, then run `hermes gateway`. Expected log: `[sms] Twilio webhook server listening on 127.0.0.1:8080, from: +1555***4567`.

## Options / Props

| Name | Required | Description |
|------|----------|-------------|
| `TWILIO_ACCOUNT_SID` | Yes | Account SID (starts with `AC`) |
| `TWILIO_AUTH_TOKEN` | Yes | Auth token (also used for webhook signature validation) |
| `TWILIO_PHONE_NUMBER` | Yes | Twilio number in E.164 |
| `SMS_WEBHOOK_URL` | Yes | Public URL for signature validation; adapter refuses to start without it |
| `SMS_WEBHOOK_PORT` | No | Listener port (default `8080`) |
| `SMS_WEBHOOK_HOST` | No | Bind address (default `127.0.0.1`) |
| `SMS_INSECURE_NO_SIGNATURE` | No | `true` disables signature validation (local dev only) |
| `SMS_ALLOWED_USERS` | No | Comma-separated E.164 numbers |
| `SMS_ALLOW_ALL_USERS` | No | `true` allows anyone (not recommended) |
| `SMS_HOME_CHANNEL` / `SMS_HOME_CHANNEL_NAME` | No | Cron / notification target and display name (default `Home`) |

## Notes

- Requires aiohttp (installed via the `sms` extra of the package manager helper) and a publicly reachable server; use `cloudflared tunnel --url http://localhost:8080` or `ngrok http 8080` locally.
- Inbound webhooks are verified via the `X-Twilio-Signature` header (HMAC-SHA1).
- Plain text only (Markdown stripped); 1600-character limit, longer replies split at newlines then spaces; messages from your own Twilio number are ignored.
- The gateway denies all users by default. SMS has no built-in encryption; prefer Signal or Telegram for sensitive work.
- Shares credentials with the optional telephony skill.

## Related

- [Messaging Gateway](./messaging.md)
- [Signal](./signal.md)
