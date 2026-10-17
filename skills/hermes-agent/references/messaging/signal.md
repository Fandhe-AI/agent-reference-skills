# Signal

Hermes connects to Signal through the signal-cli daemon running in HTTP mode (SSE for inbound, JSON-RPC for outbound). Uses `httpx`; no new Python dependencies.

## Signature / Usage

```bash
signal-cli link -n "HermesAgent"                                   # link as secondary device
signal-cli --account +1234567890 daemon --http 127.0.0.1:8080       # start daemon
curl http://127.0.0.1:8080/api/v1/check                             # verify
```

```bash
# ~/.hermes/.env
SIGNAL_HTTP_URL=http://127.0.0.1:8080
SIGNAL_ACCOUNT=+1234567890
SIGNAL_ALLOWED_USERS=+1234567890,+0987654321    # E.164 numbers or UUIDs
SIGNAL_GROUP_ALLOWED_USERS=groupId1,groupId2     # omit to disable groups, * for all
SIGNAL_HOME_CHANNEL=+1234567890
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `SIGNAL_HTTP_URL` | env (required) | signal-cli HTTP endpoint |
| `SIGNAL_ACCOUNT` | env (required) | Bot phone number (E.164) |
| `SIGNAL_ALLOWED_USERS` | env | Comma-separated phone numbers / UUIDs |
| `SIGNAL_GROUP_ALLOWED_USERS` | env | Group IDs to monitor, or `*` (default: groups ignored) |
| `SIGNAL_ALLOW_ALL_USERS` | env (default `false`) | Skip the allowlist |
| `SIGNAL_HOME_CHANNEL` | env | Default cron delivery target |

## Notes

- Requires Java 17+ and signal-cli (not in apt / snap; Linux install is from GitHub releases, macOS `brew install signal-cli`).
- DM access: allowlist set -> only those users; no allowlist -> pairing code (`hermes pairing approve signal CODE`); `SIGNAL_ALLOW_ALL_USERS=true` -> anyone.
- Attachment limit 100 MB both directions; image uploads batched in groups of 32 and throttled for Signal's rate limits.
- Markdown (`**bold**`, `*italic*`, code, `~~strike~~`, `||spoiler||`, headings) converted to Signal `bodyRanges`; replies use native quotes; messages over 8,000 characters are split into numbered chunks.
- Signal cannot edit sent messages, so tool-progress bubbles are suppressed even with `/verbose`.
- Note to Self works when `SIGNAL_ACCOUNT` is your own number (linked secondary device); echo-back is filtered.
- SSE reconnect with exponential backoff 2s to 60s; pings after 120s of silence. Phone numbers redacted in logs.
- Only one signal-cli instance may listen on a number (duplicate messages otherwise). Session data in `~/.local/share/signal-cli/` is credentials.

## Related

- [Messaging Gateway](./messaging.md)
- [SMS](./sms.md)
