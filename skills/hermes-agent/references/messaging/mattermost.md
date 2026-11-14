# Mattermost

Hermes Agent runs as a Mattermost bot over the REST API (v4) and WebSocket, using `aiohttp` (no extra library). Works with self-hosted Team and Enterprise editions.

## Signature / Usage

```bash
# ~/.hermes/.env
MATTERMOST_URL=https://mm.example.com
MATTERMOST_TOKEN=***
MATTERMOST_ALLOWED_USERS=3uo8dkh1p7g1mfk49ear5fzs5c
# MATTERMOST_REPLY_MODE=thread
```

```bash
hermes gateway setup    # select Mattermost
hermes gateway
```

Setup: enable bot accounts (System Console -> Integrations -> Bot Accounts -> Enable Bot Account Creation), create a bot (token shown once; a personal access token also works), add the bot to channels, find your 26-character user ID (not the `@username`).

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `MATTERMOST_URL` | required | Server URL (with `https://`, no trailing slash) |
| `MATTERMOST_TOKEN` | required | Bot / personal access token |
| `MATTERMOST_ALLOWED_USERS` | — | Comma-separated user IDs |
| `MATTERMOST_REPLY_MODE` | `off` | `off` flat messages / `thread` reply under your message |
| `MATTERMOST_REQUIRE_MENTION` | `true` | `false` responds to all channel messages (DMs always work) |
| `MATTERMOST_FREE_RESPONSE_CHANNELS` | — | Channel IDs exempt from @mention |
| `MATTERMOST_ALLOWED_CHANNELS` / `mattermost.allowed_channels` | — | Channel allowlist (DMs exempt); checked before other gating |
| `MATTERMOST_HOME_CHANNEL` | — | Home channel (`/sethome`) |
| `MATTERMOST_BOT_USERS` / `mattermost.bot_users` | — | New in v0.23. Peer bot user IDs. Posts from Mattermost bot accounts (`props.from_bot`) are recognised on their own; list personal-access-token bots here. These senders use the bot loop guard; set `MATTERMOST_ALLOW_BOTS=all` (or `mentions`) only when bot-to-bot messages are intentional. The `config.yaml` spelling is `mattermost: bot_users: [...]` |
| `mattermost.channel_prompts` | — | Ephemeral per-channel system prompts keyed by channel ID |
| `group_sessions_per_user` | `true` | Per-user session isolation in shared channels |

## Notes

- DMs always respond; channels respond on @mention (the mention is stripped before processing).
- WebSocket reconnects with exponential backoff 2s to 60s; nginx needs `Upgrade` / `Connection: upgrade` headers on `/api/v4/websocket`.
- Validate a token with `curl -H "Authorization: Bearer YOUR_TOKEN" https://your-server/api/v4/users/me`. With a bot token that call returns the bot's ID, not yours.
- Finding your user ID (v0.23): the profile dialog (avatar -> Profile) does not show it. Use System Console -> User Management -> Users (admins), `https://your-mattermost-server/api/v4/users/me` in a logged-in browser tab (the `id` field), `curl -s -H "Authorization: Bearer YOUR_BOT_TOKEN" https://your-mattermost-server/api/v4/users/username/YOUR_USERNAME`, or `mmctl user list --all` (admins; prints `<id>: <username> (<email>)`).
- Always set `MATTERMOST_ALLOWED_USERS`; without it the gateway denies all users.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/mattermost (pinned to v0.23.1)

## Related

- [Messaging Gateway](./messaging.md)
- [Matrix](./matrix.md)
