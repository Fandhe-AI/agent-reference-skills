# DingTalk

Hermes Agent runs as a DingTalk chatbot over Stream Mode (a long-lived outbound WebSocket, no public URL), replying with markdown via session webhooks or optional AI Cards.

## Signature / Usage

```bash
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['dingtalk'], explicit=True)"
```

```bash
# ~/.hermes/.env
DINGTALK_CLIENT_ID=your-app-key
DINGTALK_CLIENT_SECRET=your-app-secret
DINGTALK_ALLOWED_USERS=user-id-1,user-id-2
```

```bash
hermes gateway setup    # QR-code device flow or manual paste
hermes gateway
```

Create the app in the DingTalk Developer Console, add the Robot capability, and choose **Stream Mode** as the message reception mode.

## Options / Props

| Name | Description |
|------|-------------|
| `DINGTALK_CLIENT_ID` / `DINGTALK_CLIENT_SECRET` | AppKey / AppSecret (required) |
| `DINGTALK_ALLOWED_USERS` / `extra.allowed_users` | Allowed user IDs (if both set, only users in both are authorized) |
| `DINGTALK_REQUIRE_MENTION` / `extra.require_mention` | Require @mention in groups (DMs always reply) |
| `DINGTALK_FREE_RESPONSE_CHATS` | Group chat IDs exempt from mention |
| `DINGTALK_MENTION_PATTERNS` | Extra mention regexes (e.g. `^小马`) |
| `DINGTALK_HOME_CHANNEL` | Cron / notification target |
| `DINGTALK_ALLOW_ALL_USERS` | Allow everyone |
| `platforms.dingtalk.extra.card_template_id` | Enable AI Cards with streaming text updates |
| `display.platforms.dingtalk.*` | `show_reasoning`, `streaming`, `tool_progress` (`all` / `new` / `off`), `interim_assistant_messages` |
| `group_sessions_per_user` | Per-user session isolation in groups (default `true`) |

## Notes

- Dependencies from the `dingtalk` extra: `dingtalk-stream`, `httpx`, `alibabacloud-dingtalk`.
- QR setup currently authorizes under an `openClaw` source string (DingTalk consent screen only); the bot is private to your tenant.
- DingTalk user IDs are set by your org admin (Contacts -> Members); the bot also logs `sender_id` of incoming messages.
- Reactions: 🤔Thinking then 🥳Done. Message dedup window 5 minutes; responses capped at 20,000 characters per message.
- "No session_webhook available" means the webhook expired; send a new message (each inbound message provides a fresh webhook).
- Stream reconnect backoff 2s, 5s, 10s, 30s, 60s. Always set `DINGTALK_ALLOWED_USERS`; without it all users are denied.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/dingtalk (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
- [Feishu / Lark](./feishu.md)
