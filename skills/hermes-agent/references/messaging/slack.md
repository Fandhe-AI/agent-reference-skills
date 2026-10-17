# Slack

Hermes Agent connects to Slack as a bot over Socket Mode (slack-bolt / slack_sdk), so no public URL is needed.

## Signature / Usage

```bash
# ~/.hermes/.env
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_APP_TOKEN=xapp-your-app-token-here
SLACK_ALLOWED_USERS=U01ABC2DEF3              # Comma-separated Member IDs
SLACK_HOME_CHANNEL=C01234567890              # optional, cron/scheduled messages
```

```bash
hermes slack manifest --agent-view --write   # writes ~/.hermes/slack-manifest.json
hermes gateway setup                          # select Slack
hermes gateway
```

Setup: create the app (from the generated manifest, or from scratch), add bot token scopes, enable Socket Mode (app-level token with `connections:write`), subscribe to events, enable the App Home Messages Tab, install to the workspace, then `/invite @Hermes Agent` into each channel.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Bot scopes | list | `chat:write`, `app_mentions:read`, `channels:history`, `channels:read`, `groups:history`, `im:history`, `im:read`, `im:write`, `mpim:history`, `mpim:read`, `users:read`, `files:read`, `files:write` (optional `groups:read`, `assistant:write`) |
| Bot events | list | `message.im`, `message.mpim`, `message.channels` (required), `message.groups` (recommended), `app_mention` (required) |
| `platforms.slack.reply_to_mode` | `off` / `first` (default) / `all` | Threading of multi-part replies |
| `extra.reply_in_thread` / `reply_broadcast` | bool (default `true` / `false`) | Thread replies / also post to channel |
| `extra.unfurl_links` / `unfurl_media` | bool | Control link/media previews |
| `extra.rich_blocks` | bool (default `false`) | Send Block Kit blocks with plain-text fallback |
| `extra.feedback_buttons` | bool (default `false`) | Feedback controls (needs `rich_blocks`) |
| `extra.native_task_cards` | bool (default `false`) | Live tool calls as native plan/task cards (need a thread) |
| `extra.suggested_prompts` | list | Up to four `{title, message}` prompts |
| `extra.assistant_thread_titles` | bool (default `true`) | Title Agent/Assistant DM threads |
| `extra.allow_bots` / `SLACK_ALLOW_BOTS` | `none` (default) / `mentions` / `all` | Messages from other bots |
| `extra.api_human_users` / `SLACK_API_HUMAN_USERS` | list | User IDs whose user-token Web-API posts count as human |
| `extra.cron_continuable_surface` | `thread` (default) / `in_channel` | Continuable cron delivery surface |
| `platforms.slack.typing_status_text` | string (default `"is thinking..."`) | Working-state status line (needs `assistant:write`) |
| `display.live_status` | `full` (default) / `verb` / `off` | Per-tool live status |
| `slack.require_mention` / `strict_mention` / `thread_require_mention` / `require_mention_channels` / `ignore_other_user_mentions` | bool / list | Mention gating options (compose; see Notes) |
| `slack.free_response_channels` / `SLACK_FREE_RESPONSE_CHANNELS` | list | Channels exempt from @mention |
| `slack.mention_patterns` / `reply_prefix` | list / string | Extra triggers / outgoing prefix |
| `slack.reaction_triggers` / `reaction_trigger_target` | bool or list / string | Route reactions to the agent (needs `reactions:read`, `reaction_added` / `reaction_removed`) |
| `slack.allowed_channels` / `SLACK_ALLOWED_CHANNELS` | list | Channel allowlist (1:1 DMs exempt, group DMs not) |
| `slack.unauthorized_dm_behavior` | `pair` (default) / `ignore` | Unauthorized DM handling |
| `slack.channel_prompts` | mapping | Ephemeral per-channel system prompts |
| `slack.channel_skill_bindings` | list | `id` + `skills` (or `skill`) loaded at session start |
| `group_sessions_per_user` | bool (default `true`) | Per-user session isolation |

## Notes

- The app-level token (`xapp-`) cannot come from a manifest; always generate it manually with `connections:write`.
- New apps must use Agent view (`--agent-view`); Agent view cannot be reverted to Assistant view. Classic (RTM) Slack apps were fully deprecated in March 2025.
- Changing scopes or events requires reinstalling the app. Missing `message.channels` / `message.groups` is the most common reason the bot works in DMs but not channels.
- Slack blocks native slash commands inside threads; use the `!cmd` prefix (e.g. `!stop`, `!approve`). Native slash replies are ephemeral.
- Channels require @mention by default; DMs always respond; once active in a thread, replies need no mention. Group DMs (MPIM) are shared surfaces and obey channel gating.
- Multi-workspace: comma-separated `SLACK_BOT_TOKEN`, or `~/.hermes/slack_tokens.json` mapping team IDs to `{token, team_name}`; first token is primary for Socket Mode.
- Cron `deliver:` targets: `slack`, `slack:C0123456789`, `slack:U0123456789` (DM, needs `im:write`).
- For Codex-backed peer-agent channels prefer `agent.reasoning_effort: high` or lower; `xhigh` can spend the whole turn in hidden reasoning.
- Always set `SLACK_ALLOWED_USERS`; without it the gateway denies all messages.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/slack (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
- [Discord](./discord.md)
