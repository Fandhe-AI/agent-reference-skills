# IRC

The IRC adapter connects Hermes to any IRC server (Libera.Chat or a self-hosted ircd) using only Python's stdlib `asyncio`: no SDK, daemon or external dependency. Plain text only (no voice, image, file, thread, reaction, typing or streaming).

## Signature / Usage

```yaml
gateway:
  platforms:
    irc:
      enabled: true
      extra:
        server: irc.libera.chat
        port: 6697
        nickname: hermes-bot
        channel: "#hermes"
        use_tls: true
        server_password: ""
        nickserv_password: ""
        allowed_users: []
        max_message_length: 450
```

```bash
hermes gateway start
```

## Options / Props

| Variable | Required | Description |
|----------|:--------:|-------------|
| `IRC_SERVER` | yes | Server hostname |
| `IRC_CHANNEL` | yes | Channel(s), comma-separated |
| `IRC_NICKNAME` | yes | Bot nickname (default `hermes-bot`) |
| `IRC_PORT` | no | Default `6697` with TLS, `6667` without |
| `IRC_USE_TLS` | no | Default `true` on port 6697 |
| `IRC_SERVER_PASSWORD` | no | `PASS` command password |
| `IRC_NICKSERV_PASSWORD` | no | Automatic NickServ IDENTIFY on connect |
| `IRC_ALLOWED_USERS` | no | Allowed nicks |
| `IRC_ALLOW_ALL_USERS` | no | Allow anyone in the channel (dev only) |
| `IRC_HOME_CHANNEL` | no | Cron / notification channel (defaults to `IRC_CHANNEL`) |

## Notes

- Channel messages are treated as group conversations; private messages as DMs.
- IRC nicks are not authenticated unless the network enforces NickServ; avoid allow-all on public networks.
- Long replies are split into multiple `PRIVMSG` lines (`max_message_length`, default 450 bytes).
- A scoped credential lock per server+nick prevents two profiles from fighting over one IRC identity.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/irc (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
