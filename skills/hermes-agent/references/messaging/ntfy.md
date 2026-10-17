# ntfy

ntfy is an HTTP pub-sub notification service (public `ntfy.sh` or self-hosted). The Hermes adapter uses `httpx` only: send a message to a topic from your phone, get the agent's reply as a push notification.

## Signature / Usage

```bash
# ~/.hermes/.env
NTFY_TOPIC=hermes-myname-2026
NTFY_ALLOWED_USERS=hermes-myname-2026
NTFY_HOME_CHANNEL=hermes-myname-2026
```

```bash
hermes gateway setup    # select ntfy
hermes gateway restart
hermes send ntfy:alerts-channel "Done!"
```

## Options / Props

| Variable | Required | Description |
|----------|----------|-------------|
| `NTFY_TOPIC` | Yes | Topic to subscribe to (incoming messages) |
| `NTFY_SERVER_URL` | No | Default `https://ntfy.sh`; point to a self-hosted server |
| `NTFY_TOKEN` | No | Bearer token (e.g. `tk_xyz`) or `user:pass` Basic auth |
| `NTFY_PUBLISH_TOPIC` | No | Separate topic for replies (default `NTFY_TOPIC`) |
| `NTFY_MARKDOWN` / `platforms.ntfy.extra.markdown` | No | Send replies with `X-Markdown: true` |
| `NTFY_ALLOWED_USERS` | Recommended | Allowed topic names (topic is the user identity) |
| `NTFY_ALLOW_ALL_USERS` | No | Allow every publisher (only for private topics with read tokens) |
| `NTFY_HOME_CHANNEL` / `NTFY_HOME_CHANNEL_NAME` | No | Cron / notification topic and label |

## Notes

- Identity model: ntfy has no authenticated user identity. The message `title` is publisher-controlled and is NOT used for authorization; the topic name is the identity, so anyone who knows the topic can talk to the agent. Self-host with access control, use a reserved/private topic with `NTFY_TOKEN`, or pick a long unguessable topic name.
- Outgoing-only setup: set `NTFY_TOPIC` and `NTFY_PUBLISH_TOPIC` to the same value and omit `NTFY_ALLOWED_USERS`; the agent never responds to inbound messages.
- Cron delivery: `cronjob(action="create", schedule="every 1h", deliver="ntfy", prompt="...")`; works out-of-process via a standalone sender.
- Limits: 4096-character message bodies (truncated with warning), no typing indicator, no threads or attachments.
- 401 halts the reconnect loop (`fatal: ntfy_unauthorized`); 404 halts with `fatal: ntfy_topic_not_found`; reconnect backoff 2, 5, 10, 30, 60 s.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/ntfy (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
