# Telegram

Hermes Agent runs as a Telegram bot (built on python-telegram-bot) supporting text, voice, images and file attachments, group chats, topics, webhook mode and native streaming.

## Signature / Usage

```bash
# ~/.hermes/.env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrSTUvwxYZ
TELEGRAM_ALLOWED_USERS=123456789    # Comma-separated for multiple users
```

```bash
hermes gateway setup    # select Telegram (interactive)
hermes gateway          # start
```

Setup flow: create a bot with @BotFather (`/newbot`), find your numeric user ID (@userinfobot / @get_id_bot), configure, start the gateway. The dashboard / desktop app "Messaging -> Telegram" page also offers a **Create with QR** button that writes `TELEGRAM_BOT_TOKEN` and `TELEGRAM_ALLOWED_USERS` for you.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TELEGRAM_BOT_TOKEN` | env | Token from @BotFather |
| `TELEGRAM_ALLOWED_USERS` | env | Allowed numeric user IDs (all chat types) |
| `TELEGRAM_GROUP_ALLOWED_USERS` | env | Sender IDs allowed in groups/forums only (no DM access) |
| `TELEGRAM_GROUP_ALLOWED_CHATS` | env | Chat IDs whose every member is authorized (`*` allows any) |
| `TELEGRAM_ALLOWED_CHATS` / `TELEGRAM_OBSERVE_UNMENTIONED_GROUP_MESSAGES` | env | Observe group chatter without auto-replying (with `require_mention: true`) |
| `TELEGRAM_GUEST_MODE` | env (default `false`) | Non-allowlisted groups: respond only on explicit @mention |
| `TELEGRAM_HOME_CHANNEL` / `TELEGRAM_HOME_CHANNEL_NAME` | env | Home channel for cron delivery (`/sethome` sets it) |
| `TELEGRAM_CRON_THREAD_ID` | env | Topic thread for cron deliveries; overrides `TELEGRAM_HOME_CHANNEL_THREAD_ID` for cron only |
| `TELEGRAM_WEBHOOK_URL` | env | Public HTTPS URL; switches from long polling to webhook mode |
| `TELEGRAM_WEBHOOK_SECRET` | env (required with webhook URL) | Secret token Telegram echoes; gateway refuses to start without it (`openssl rand -hex 32`) |
| `TELEGRAM_WEBHOOK_PORT` | env (default `8443`) | Local webhook listen port |
| `TELEGRAM_PROXY` / `telegram.proxy_url` | env / yaml | Telegram-specific proxy (`http://`, `https://`, `socks5://`); takes priority over `HTTPS_PROXY` etc. |
| `TELEGRAM_FALLBACK_IPS` / `extra.fallback_ips` | env / yaml | Explicit fallback IPs for `api.telegram.org` (DoH auto-discovery otherwise) |
| `TELEGRAM_REACTIONS` / `telegram.reactions` | env / yaml (default off) | Reactions: 👀 start, 👍 success, 👎 error |
| `telegram.require_mention` | bool | In groups respond only to replies, `@botusername`, `/command@botusername`, or `mention_patterns` regex matches |
| `telegram.mention_patterns` | list | Python regexes, case-insensitive, checked against text and captions |
| `telegram.ignored_threads` | list | Forum topic IDs where Hermes stays silent |
| `telegram.exclusive_bot_mentions` | bool (default `true`) | When explicit bot mentions exist, only mentioned bot profiles process the message |
| `telegram.bots_require_mention` / `TELEGRAM_BOTS_REQUIRE_MENTION` | bool | Messages from other bots trigger only on explicit @mention |
| `TELEGRAM_ALLOW_BOTS` | env | Admit bot-authored messages (`mentions` or `all`) |
| `gateway.bot_loop_guard` | mapping | `enabled`, `max_events: 20`, `window_seconds: 300`, `cooldown_seconds: 600` |
| `platforms.telegram.extra.base_url` / `base_file_url` / `local_mode` | yaml | Point at a local telegram-bot-api server (lifts 20 MB cap to 2 GB) |
| `platforms.telegram.extra.max_concurrent_updates` | int (default 32) | Cross-chat concurrency; `1` = fully sequential |
| `platforms.telegram.extra.drop_pending_on_cold_boot` | bool (default `true`) | `false` receives the offline backlog on boot |
| `platforms.telegram.extra.status_indicator` | bool (default off) | Sets bot short description to Online/Offline (`status_online` / `status_offline` customizable) |
| `platforms.telegram.extra.command_menu` | mapping | `max_commands` (default 60, clamped 1..100), `priority_mode` (`prepend` / `append` / `replace`), `priority` list |
| `platforms.telegram.extra.dm_topics` | list | Operator-curated DM topics; fields `name`, `icon_color`, `icon_custom_emoji_id`, `skill`, `thread_id` (auto-filled) |
| `platforms.telegram.extra.ignore_root_dm` | bool | Root DM becomes a lobby for users with `dm_topics` |
| `platforms.telegram.extra.group_topics` | list | Bind skills to forum topics: `chat_id`, `thread_id`, `name`, `skill` |
| `platforms.telegram.extra.disable_topic_auto_rename` | bool | Keep topic names untouched in `/topic` mode |
| `platforms.telegram.extra.rich_messages` / `rich_drafts` / `allow_cjk_rich_messages` | bool | Opt-in native Rich Messages rendering (`sendRichMessage`) |
| `platforms.telegram.extra.disable_link_previews` | bool | Attach `LinkPreviewOptions(is_disabled=True)` |
| `telegram.pretty_tables` | bool (default `true`) | `false` keeps the legacy always-code-block table behavior |
| `telegram.channel_prompts` | mapping | Ephemeral per-chat/topic system prompts (topic overrides group) |
| `gateway.streaming.transport` | `auto` / `draft` / `edit` / `off` | Streaming transport; `auto` uses native drafts (`sendMessageDraft`) in DMs only |
| `display.platforms.telegram.notifications` | `important` (default) / `all` | Push notification volume (`HERMES_TELEGRAM_NOTIFICATIONS` env override) |

## Notes

- Privacy mode is on by default in BotFather; for groups either turn it off (Bot Settings -> Group Privacy -> Turn off) or promote the bot to admin. Remove and re-add the bot to each group after changing privacy.
- The `MEDIA:/path` tag attaches files; with a Docker terminal backend the path must be readable on the host running the gateway (mount a volume, e.g. `docker_volumes: ["/home/user/.hermes/cache/documents:/output"]`).
- Telegram's public Bot API caps `getFile` at 20 MB. A local telegram-bot-api server (run with `TELEGRAM_LOCAL: "1"`, bind to `127.0.0.1`, never expose port 8081) raises it to 2 GB; log the bot out of the public API first with `/logOut`. Use `platforms.telegram.extra`, not `telegram.extra` (the latter is silently dropped).
- `stt.enabled: false` skips transcription and hands the raw audio path to the agent. Edge TTS needs ffmpeg for voice bubbles (OpenAI / ElevenLabs produce Opus natively).
- Replies over 4,096 characters are split into numbered parts; flood-control resumes from the refused part.
- Multi-session DM mode (`/topic`, `/topic off`, `/topic <session-id>`) needs BotFather Threaded Mode enabled (Bot Settings -> Threads Settings). It is user-driven and persisted in `state.db`; `extra.dm_topics` is operator-driven. Bot API 9.4 (Feb 2026) introduced private chat topics; Bot API 9.5 (Mar 2026) native streaming via `sendMessageDraft`.
- `TELEGRAM_GROUP_ALLOWED_USERS` previously took chat IDs; chat-ID-shaped values still work with a deprecation warning. Migrate to `TELEGRAM_GROUP_ALLOWED_CHATS`.
- Slash command split: `allow_admin_from` + `user_allowed_commands` (plus `group_allow_admin_from` / `group_user_allowed_commands`); `/help` and `/whoami` always allowed; unset admin list disables gating for that scope.
- Do not reuse one bot token across running gateways (Telegram rejects concurrent polling).
- Always set `TELEGRAM_ALLOWED_USERS`; without it the gateway denies all users.

## Related

- [Messaging Gateway](./messaging.md)
- [Webhooks](./webhooks.md)
