# WhatsApp

Hermes connects to WhatsApp through a built-in Baileys bridge that emulates a WhatsApp Web session (not the official Business API). No Meta developer account is needed.

## Signature / Usage

```bash
# ~/.hermes/.env
WHATSAPP_ENABLED=true
WHATSAPP_MODE=bot                          # "bot" or "self-chat"
WHATSAPP_ALLOWED_USERS=15551234567         # country code, no +; or * to allow everyone
# WHATSAPP_ALLOW_ALL_USERS=true            # same effect as *
```

```bash
hermes whatsapp     # wizard: choose mode, install bridge deps, scan QR (Settings -> Linked Devices -> Link a Device)
hermes gateway
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `WHATSAPP_ENABLED` | env | Enable the adapter |
| `WHATSAPP_MODE` | `bot` (recommended, dedicated number) / `self-chat` | Operating mode |
| `WHATSAPP_ALLOWED_USERS` | env | Phone numbers (country code, no `+`) or `*` |
| `WHATSAPP_ALLOW_ALL_USERS` | env | Allow all senders |
| `WHATSAPP_GROUP_POLICY` / `whatsapp.group_policy` | `pairing` (default, forwards nothing) / `allowlist` / `open` | Group gating |
| `WHATSAPP_GROUP_ALLOWED_USERS` / `whatsapp.group_allow_from` | group JIDs | e.g. `120363001234567890@g.us` |
| `WHATSAPP_REQUIRE_MENTION` / `require_mention` | bool | Answer only @mentions, replies to the bot, or `/commands` (`free_response_chats` exempt) |
| `whatsapp.unauthorized_dm_behavior` | `pair` / `ignore` | `ignore` keeps a private number silent |
| `whatsapp.reply_prefix` | string | Header on replies (default `☤ **Hermes Agent**`; empty disables) |
| `whatsapp.send_read_receipts` | bool (default `false`) | Mark accepted inbound messages read |
| `platforms.whatsapp.extra.bridge_port` | int | Bridge port (launch profile 3000; secondaries pick 3001-3999) |
| `gateway.platforms.whatsapp.extra.text_batch_delay_seconds` | float (default 0.3, max 2.0) | Debounce quiet period; `0` disables batching |
| `gateway.platforms.whatsapp.extra.text_batch_split_delay_seconds` | float (default 1.0, max 4.0) | Extended delay near split threshold |
| `WHATSAPP_DEBUG` | env | `true` logs raw message events to `bridge.log` |

## Notes

- Unofficial API: small risk of account restriction. Use a dedicated number, do not send bulk or unsolicited messages.
- Requires Node.js v18+ and npm; no Chromium / Puppeteer.
- Session lives in `~/.hermes/platforms/whatsapp/session` (full account credentials; `chmod 700`, never commit). Re-pair with `hermes whatsapp`.
- Multiple profiles: `hermes -p work whatsapp` pairs a secondary; give each gateway-per-profile a distinct `bridge_port` and keep `session_path` distinct. Failures: `whatsapp_unpaired`, `whatsapp_bridge_foreign_session`, `whatsapp_bridge_unresponsive`.
- Responses split at 4,096 characters; Markdown converted (`**bold**` -> `*bold*`, `# Heading` -> `*Heading*`, links -> `text (url)`).
- Voice in: `.ogg` opus transcribed by STT; voice out: MP3 attachments. Native polls (clarify-as-poll; never for approvals) and location pins supported in bot mode.
- For a stable business bot see the Cloud API page (official Meta path, needs a public webhook URL).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/whatsapp (pinned to v0.22.2)

## Related

- [WhatsApp Business (Cloud API)](./whatsapp-cloud.md)
- [Messaging Gateway](./messaging.md)
