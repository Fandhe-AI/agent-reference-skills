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
| `gateway.bot_loop_guard` | mapping | `enabled`, `max_events: 20`, `window_seconds: 300`, `cooldown_seconds: 600`; v0.23 adds `max_hops` (default 4) and `bot_replies_expect_reply` (default `false`) |
| `platforms.telegram.extra.base_url` / `base_file_url` / `local_mode` | yaml | Point at a local telegram-bot-api server (lifts 20 MB cap to 2 GB) |
| `platforms.telegram.extra.max_concurrent_updates` | int (default 32) | Cross-chat concurrency; `1` = fully sequential |
| `platforms.telegram.extra.drop_pending_on_cold_boot` | bool (default `false` in v0.23; `true` in v0.22.2) | Default now answers the offline backlog on boot (Telegram queues up to 24 h; already-handled updates are skipped via persisted receipts); `true` discards it. Conflict recovery (409) also preserves the queue |
| `platforms.telegram.extra.media_group_wait_seconds` | float (default 1.5, max 10) | New in v0.23. Album debounce after the last item; Hermes waits at most 8 s for a slow download and sends the whole album as one message |
| `platforms.telegram.extra.dm_topic_auto_transfer` | bool (default `false`) | New in v0.23. With `/topic` mode on, a plain root-DM message opens a new topic ("Hermes Chat" until auto-titled) instead of continuing in the most recently active topic; falls back to the old behavior if topic creation fails. Also accepted as top-level `telegram.extra.dm_topic_auto_transfer` |
| `telegram.allowed_topics` / `telegram.free_response_chats` / `telegram.free_response_topics` | list | Forum-topic whitelist (evaluated before `ignored_threads`; General or a message without `message_thread_id` is topic `1`; DMs never filtered) / bypass `require_mention` for a whole chat or one topic |
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
| `gateway.streaming.transport` | `auto` / `draft` / `edit` / `off` | Streaming transport; `auto` (default) uses native drafts (`sendMessageDraft`) in private chats (topics inside a private chat try drafts and fall back to edits; groups and group forum topics always use edits). Set `edit` if the draft preview collapses or flickers on your client |
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
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram (pinned to v0.23.1)

### Changes in v0.23 (from v0.22.2)

- Hermes Cloud with Team Gateway: Telegram (and Discord, Slack) reach the agent through a shared Hermes bot; a bot of your own does not run there because the gateway switches direct connections off at every start. The card shows **Via Team Gateway** (or **Link accounts in Nous Portal** when the Portal manages access). Otherwise **Link Telegram** shows a one-time message such as `/link AB12CD`, a QR code and an **Open Telegram** button; send the message to the shared bot from the account to link. The gateway must be running. `GATEWAY_RELAY_ALLOW_DIRECT_PLATFORMS=true` in the instance environment runs your own bot beside the shared one but keeps a live connection open, so the instance never sleeps.
- Repeated-update protection: completed update IDs are now also saved per bot under the Hermes home for 24 h (Telegram's longest hold of an undelivered update), so reconnects, adapter rebuilds, gateway restarts and the cold-boot backlog do not answer an already-handled update again; a receipt older than 24 h or an unreadable receipts file no longer protects it. The in-memory window is the latest 4096 completed admissions per bot.
- Silence in groups: a bare silence token (`[SILENT]` etc.) stays silent for a reply to another member, a message opening by @mentioning someone else, and any other message without a `?`; it is replaced by the notice for messages that mention the bot, reply to it, match `mention_patterns`, are `/command`s, or are any other message with a `?`. The notice also applies when the bot's own identity is unknown, when the replied-to author is unknown or posted as a chat, and for captionless voice notes, video notes or audio files.
- `exclusive_bot_mentions`: a message is addressed to another bot only when it starts with that bot's handle (`@OtherBot do this`, `@BotA @BotB: compare`, `/status@OtherBot`); a handle later in the text does not silence this bot. `bots_require_mention` also holds in `free_response_chats` / `free_response_topics`.
- Bot loop guard: your message starts an exchange; each bot message is one hop and past `max_hops` (default 4) further bot messages start no turn; repeated text counts once; with `bot_replies_expect_reply: false` Hermes does not answer a bot answering Hermes's own reply; runtime notices are never sent to a bot.
- Observe-unmentioned mode: slash commands in that chat/topic (`/new`, `/model`, `/undo`, skill commands) act on the same shared session; admin-only commands are still checked against the sender. Guest mode: broadcast channel posts run the `allowed_chats` / `require_mention` / topic gates but never get the guest bypass (add the channel ID to `allowed_chats` and @mention the bot).
- Contacts and locations shared with the bot reach the agent as a short text block. MP3 and M4A files go out as audio tracks with markdown captions; with ffmpeg, artist/title tags and embedded cover art fill Telegram's music player. A local Bot API server (`base_url`) is also used by `hermes send`, the `send_message` tool and standalone cron delivery.
- Forum supergroups: the command menu is registered per chat (`BotCommandScopeChat`) the first time a message arrives, once per forum chat per gateway run. Topics with a `thread_id` are listed in `channel_directory.json` so `send_message` can target them by name. `/topic` no longer creates a pinned System topic. On `message thread not found` Hermes retries once, then delivers to the root chat without its reply anchor and drops that topic's binding; removing the last binding turns topic mode off. Private DM topics have a Bot API read-state limitation (root "All Messages" and the topic may show different unread indicators; expected Telegram behaviour).
- Fallback transport: the hardcoded IPv4 seed list (`149.154.166.110`, `149.154.167.220`) always follows the DoH answers; one request's walk shares a 15 s connect budget (half the 30 s send deadline). Sends outside the gateway skip DoH, use `HERMES_TELEGRAM_HTTP_*` timeouts and a 60 s media-upload write timeout, and retry only connect/pool timeouts.
- Rich messages and sends outside the gateway: `hermes send`, `send_message` and standalone cron delivery take the rich path under the same rules, escape the `(1/2)` chunk marker, treat only Telegram's own HTML tags as HTML, retry a Bot API HTML rejection as MarkdownV2 before plain text, and send two or more photos as a native album (`sendMediaGroup`, 10 per album). `disable_link_previews` also covers streaming preview edits and the final edit of a streamed reply. File attachments follow the flood-control rule (short penalty waited out; longer one schedules a single native re-upload).
- `agent.clarify_timeout` default is `90` seconds (v0.22.2 said `3600`); when `clarify` is available the platform hint steers the agent to use it for small fixed-choice decisions instead of numbered lists or copy-to-clipboard buttons. Push notification mode `important` also applies to `hermes send`, `send_message` and standalone cron delivery (messages arrive silently, except cron briefs, which ring by default via `cron.delivery.notify`).

### Migration (v0.22 -> v0.23): cold-boot pending queue default flipped

- `drop_pending_on_cold_boot` default changed from `true` (backlog discarded) to `false` (backlog answered in order); an explicit value in your config is respected either way. Set `true` to restore the v0.22 behaviour. The v0.22 note that conflict recovery drops pending updates no longer holds: conflict recovery preserves the queue too.

## Related

- [Messaging Gateway](./messaging.md)
- [Webhooks](./webhooks.md)
