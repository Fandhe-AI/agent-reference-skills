# SimpleX Chat

Hermes connects to SimpleX Chat through the `simplex-chat` CLI daemon over a local WebSocket. SimpleX assigns no persistent user IDs; every contact is an opaque numeric `contactId`.

## Signature / Usage

```bash
simplex-chat -p 5225      # daemon listens on ws://127.0.0.1:5225
```

```bash
# ~/.hermes/.env
SIMPLEX_WS_URL=ws://127.0.0.1:5225
SIMPLEX_ALLOWED_USERS=<contact-id-1>,<contact-id-2>
SIMPLEX_HOME_CHANNEL=<contact-id>
```

```bash
hermes gateway setup                       # select SimpleX Chat
hermes send --to simplex:alice "hello"     # DM by display name
hermes send --to simplex:group:12 "hello"  # group by numeric ID
hermes pairing approve simplex <CODE>
```

## Options / Props

| Variable | Required | Description |
|----------|----------|-------------|
| `SIMPLEX_WS_URL` | Yes | Daemon WebSocket URL |
| `SIMPLEX_ALLOWED_USERS` | Recommended | Numeric `contactId` allowlist (display names not accepted) |
| `SIMPLEX_ALLOW_ALL_USERS` | No | Allow every contact |
| `SIMPLEX_AUTO_ACCEPT` | No | Auto-accept contact requests (default `true`) |
| `SIMPLEX_GROUP_ALLOWED` | No | Group IDs or `*`; omit to ignore groups |
| `SIMPLEX_HOME_CHANNEL` / `SIMPLEX_HOME_CHANNEL_NAME` | No | Cron target / label |
| `HERMES_SIMPLEX_TEXT_BATCH_DELAY` | No | Text batching quiet period (default `0.8` s) |

## Notes

- Requires the simplex-chat CLI daemon and the `websockets` package (`hermes pm repair`). No prebuilt Docker image for the client; build from source.
- All contacts are denied by default: use `SIMPLEX_ALLOWED_USERS` or DM pairing. Group addressing prefix: `group:` (e.g. `simplex:group:12`).
- Inbound images, voice notes and files use the daemon's XFTP flow; outbound uses structured `/_send` with `filePath`; `MEDIA:/path` tags are sent as voice note (audio) or document.
- `hermes send` needs only the daemon running (not the gateway) for plain text; channel directory refreshes every 5 minutes while the gateway runs.
- Connection to the daemon is local (`ws://127.0.0.1:5225`); messages are end-to-end encrypted by the SimpleX protocol.

## Related

- [Messaging Gateway](./messaging.md)
- [Signal](./signal.md)
