# WhatsApp Business (Cloud API)

Hermes connects to WhatsApp through Meta's official WhatsApp Business Cloud API: no Node.js bridge, no QR codes, no account-ban risk. Requires a Meta Business account, a dedicated business number and a public HTTPS webhook URL.

## Signature / Usage

```bash
hermes whatsapp-cloud      # wizard: validates each credential, prints tunnel / webhook instructions
cloudflared tunnel --url http://localhost:8090
hermes gateway
```

```bash
# ~/.hermes/.env
WHATSAPP_CLOUD_PHONE_NUMBER_ID=123456789012345
WHATSAPP_CLOUD_ACCESS_TOKEN=EAA...
WHATSAPP_CLOUD_APP_SECRET=<32-char hex>
WHATSAPP_CLOUD_VERIFY_TOKEN=<token_urlsafe(32)>
WHATSAPP_CLOUD_ALLOWED_USERS=15551234567,15557654321
```

In Meta's dashboard (WhatsApp -> Configuration) set Callback URL `https://<tunnel>/whatsapp/webhook` with the same Verify Token, then subscribe to the **messages** webhook field.

## Options / Props

| Variable | Default | Description |
|----------|---------|-------------|
| `WHATSAPP_CLOUD_PHONE_NUMBER_ID` | required | 15-17 digit ID (not the phone number) |
| `WHATSAPP_CLOUD_ACCESS_TOKEN` | required | Starts with `EAA`; temp tokens last 24 h, use a System User token for production |
| `WHATSAPP_CLOUD_APP_SECRET` | required | Signature verification; without it inbound is refused with 503 |
| `WHATSAPP_CLOUD_VERIFY_TOKEN` | required | Shared secret for the GET handshake |
| `WHATSAPP_CLOUD_ALLOWED_USERS` | required unless allow-all | wa_ids (country code, no `+`) |
| `WHATSAPP_CLOUD_ALLOW_ALL_USERS` | `false` | Bypass allowlist |
| `WHATSAPP_CLOUD_APP_ID` / `WHATSAPP_CLOUD_WABA_ID` | — | Optional; WABA ID makes webhooks match the business account |
| `WHATSAPP_CLOUD_WEBHOOK_HOST` | unset (dual-stack) | Bind interface |
| `WHATSAPP_CLOUD_WEBHOOK_PORT` | `8090` | Must match tunnel port |
| `WHATSAPP_CLOUD_WEBHOOK_PATH` | `/whatsapp/webhook` | Webhook path |
| `WHATSAPP_CLOUD_API_VERSION` | `v20.0` | Graph API version |
| `WHATSAPP_CLOUD_HOME_CHANNEL` | — | wa_id home channel |

## Notes

- Permanent token: System User with `business_management`, `whatsapp_business_messaging`, `whatsapp_business_management`, expiration Never.
- 24-hour window: free-form replies only within 24 h of the user's last message; later sends (cron, long async results) fail with Graph error `131047`. Template messages are not yet implemented in Hermes.
- DMs only in v1 (use the Baileys bridge for groups). Meta's default throughput is 80 messages/second per number; not enforced client-side. In dev mode up to 5 recipient numbers (Meta-side whitelist).
- Native interactive messages for clarify (buttons for 1-3 choices, list for 4+), approvals and slash-command confirmations; read receipts and typing indicator; voice notes need ffmpeg (else MP3 attachment); messages split at 4096 chars.
- Errors: `graph error 100` means a phone number was pasted into the Phone Number ID field; `190` subcode 463 token expired, 467 invalidated. `/health` reports `ffmpeg_present`, `verify_token_configured`, `app_secret_configured`.
- Both Baileys (`whatsapp`) and Cloud (`whatsapp_cloud`) adapters can run simultaneously on different numbers.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/whatsapp-cloud (pinned to v0.22.2)

## Related

- [WhatsApp](./whatsapp.md)
- [Messaging Gateway](./messaging.md)
