# BlueBubbles (iMessage)

Connect Hermes to Apple iMessage through BlueBubbles, a free open-source macOS server. Inbound arrives via a webhook that Hermes registers itself; outbound uses the BlueBubbles REST API.

## Signature / Usage

```bash
# ~/.hermes/.env
BLUEBUBBLES_SERVER_URL=http://192.168.1.10:1234
BLUEBUBBLES_PASSWORD=your-server-password
```

```bash
hermes gateway setup     # select BlueBubbles (iMessage)
hermes gateway run
hermes pairing approve bluebubbles <CODE>
```

## Options / Props

| Variable | Default | Description |
|----------|---------|-------------|
| `BLUEBUBBLES_SERVER_URL` | required | BlueBubbles server URL (Settings -> API) |
| `BLUEBUBBLES_PASSWORD` | required | Server password |
| `BLUEBUBBLES_WEBHOOK_HOST` | `127.0.0.1` | Webhook listener bind address |
| `BLUEBUBBLES_WEBHOOK_PORT` | `8645` | Webhook listener port |
| `BLUEBUBBLES_WEBHOOK_PATH` | `/bluebubbles-webhook` | Webhook path |
| `BLUEBUBBLES_HOME_CHANNEL` | — | Phone/email for cron delivery |
| `BLUEBUBBLES_ALLOWED_USERS` | — | Comma-separated authorized users |
| `BLUEBUBBLES_ALLOW_ALL_USERS` | `false` | Allow all users |
| `BLUEBUBBLES_REQUIRE_MENTION` | `false` | Require a mention pattern in group chats |
| `BLUEBUBBLES_MENTION_PATTERNS` | Hermes wake words | JSON array / newline / comma-separated regexes |
| `platforms.bluebubbles.extra.send_read_receipts` | `true` | Auto-mark read (no env var; needs Private API) |
| `platforms.bluebubbles.extra.require_mention` / `mention_patterns` | — | YAML equivalents for group mention gating |

## Notes

- Requires an always-on Mac with Messages.app signed in and BlueBubbles Server v1.0.0+.
- Two URLs point in opposite directions: `BLUEBUBBLES_SERVER_URL` (Hermes calls BlueBubbles) and the webhook (BlueBubbles POSTs to Hermes). Hermes registers the `new-message` / `updated-message` webhook itself via `/api/v1/webhook` (password sent as a `?password=` query parameter) and removes it on clean shutdown. If on different machines, set `BLUEBUBBLES_WEBHOOK_HOST` to an address the Mac can reach.
- Setup does not write `platforms.bluebubbles.enabled`; an explicit `enabled: false` wins over credentials (`hermes config get platforms.bluebubbles.enabled`).
- Private API helper is required for tapback reactions, typing indicators, read receipts and creating chats by address; basic text and media work without it unless the Mac is at the login screen or on another user session.
- Markdown is stripped to plain text. Chats can be addressed by email or phone number.
- Home channel set during unreliable sending can cause "Recovered reply" repeats; leave empty until sending is reliable.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/bluebubbles (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
- [Photon iMessage](./photon.md)
