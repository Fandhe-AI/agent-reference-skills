# Discord

Hermes Agent runs as a Discord bot in DMs, server channels and threads, with slash commands, voice messages and voice-channel support.

## Signature / Usage

```bash
# ~/.hermes/.env
DISCORD_BOT_TOKEN=your-bot-token
DISCORD_ALLOWED_USERS=284102345871466496
```

```bash
hermes gateway setup    # select Discord; verifies the token, checks intents, prints the invite link
hermes gateway
```

Setup: create an application in the Developer Portal, create the bot, enable **Server Members Intent** and **Message Content Intent** (Presence is optional), copy the token (shown once), invite with `https://discord.com/oauth2/authorize?client_id=YOUR_APP_ID&scope=bot+applications.commands&permissions=309237763136`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DISCORD_BOT_TOKEN` | env (required) | Bot token |
| `DISCORD_ALLOWED_USERS` | env | Comma-separated user IDs (usernames resolved on connect; needs Server Members Intent) |
| `DISCORD_ALLOWED_ROLES` | env | Role IDs, OR semantics with users; auto-enables Server Members Intent |
| `DISCORD_ALLOW_ALL_USERS` / `GATEWAY_ALLOW_ALL_USERS` | env (default `false`) | Explicit allow-all opt-in |
| `DISCORD_HOME_CHANNEL` / `DISCORD_HOME_CHANNEL_NAME` | env | Home channel for cron output (`/sethome`) |
| `DISCORD_REQUIRE_MENTION` | env (default `true`) | Respond in server channels only when @mentioned |
| `DISCORD_THREAD_REQUIRE_MENTION` | env (default `false`) | Require @mention in threads too (multi-bot threads) |
| `DISCORD_FREE_RESPONSE_CHANNELS` | env | Channels that need no @mention |
| `DISCORD_FREE_RESPONSE_AUTO_THREAD` | env (default `false`) | Auto-thread in free-response channels (needs `DISCORD_AUTO_THREAD=true`) |
| `DISCORD_AUTO_THREAD` | env (default `true`) | New thread per @mention in a text channel |
| `DISCORD_NO_THREAD_CHANNELS` | env | Respond inline instead of threading |
| `DISCORD_IGNORE_NO_MENTION` | env (default `true`) | Stay silent when a message mentions others but not the bot |
| `DISCORD_IGNORED_CHANNELS` / `DISCORD_ALLOWED_CHANNELS` | env | Deny list (highest priority) / allow list |
| `DISCORD_ALLOW_BOTS` | `none` (default) / `mentions` / `all` | Handling of other bots' messages |
| `DISCORD_BOTS_REQUIRE_INLINE_MENTION` | env (default `true`) | Require a literal `<@BOT_ID>` to start a bot handoff |
| `DISCORD_REACTIONS` | env (default `true`) | 👀 start / ✅ success / ❌ error |
| `DISCORD_HISTORY_BACKFILL` / `DISCORD_HISTORY_BACKFILL_LIMIT` | env (default `true` / `50`) | Prepend recent scrollback on mention |
| `DISCORD_REPLY_TO_MODE` | `off` / `first` (default) / `all` | Reply-reference behavior |
| `DISCORD_ALLOW_MENTION_EVERYONE` / `_ROLES` / `_USERS` / `_REPLIED_USER` | env (defaults `false` / `false` / `true` / `true`) | What the bot may ping |
| `DISCORD_COMMAND_SYNC_POLICY` | `safe` (default) / `bulk` / `off` | Native slash-command startup sync |
| `DISCORD_PROXY` | env | Proxy for HTTP/WebSocket/REST (`http://`, `https://`, `socks5://`) |
| `DISCORD_MAX_ATTACHMENT_BYTES` | env (default `33554432`) | Per-attachment download cap; `0` = unlimited |
| `HERMES_DISCORD_TEXT_BATCH_DELAY_SECONDS` / `_SPLIT_DELAY_SECONDS` | env (default `0.6` / `2.0`) | Text batching windows |
| `discord.channel_prompts` | mapping | Ephemeral per-channel/thread system prompts |
| `discord.missed_message_backfill` | mapping | Opt-in replay after reconnect (`enabled`, `channels`, `window_seconds`, `limit`, `max_dispatches`, `max_attempts`) |
| `discord.voice_fx` | mapping | Ambient bed + verbal acks in voice channels (off by default) |
| `discord.websocket_*` | numbers | WebSocket liveness thresholds (`websocket_liveness_interval_seconds: 15`, etc.) |
| `group_sessions_per_user` | bool (default `true`) | Per-user session isolation in shared channels |
| `display.tool_progress` | `off` / `new` / `all` / `verbose` | Tool progress messages |

## Notes

- Without Message Content Intent Discord rejects the connection ("privileged Gateway Intents are not enabled") and the bot stays offline. Online-but-silent usually means no access policy is configured (fail-closed since 0.18).
- Permission integers: Minimal `117760`, Recommended `309237763136`, Full `309240908864` (adds Connect and Speak). Existing installs must re-invite to gain new permissions.
- `discord.allow_any_attachment` is a no-op (all file types accepted); known text files are auto-injected up to 100 KiB.
- Skills register as native Discord application commands (limit 100 per bot). Set `gateway.platforms.discord.extra.slash_commands: false` on follower gateways sharing an application.
- Slash command split via `allow_admin_from` / `user_allowed_commands`; `/whoami` shows your tier.
- Forum channels: each send creates a new thread; thread name from the first line (max 100 chars).
- Bot loop guard: 20 bot messages in 5 minutes per channel drops further bot messages for 10 minutes.
- Mention control: `@everyone` / `@here` / role pings blocked by default.

## Related

- [Messaging Gateway](./messaging.md)
- [Slack](./slack.md)
