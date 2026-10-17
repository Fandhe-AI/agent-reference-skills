# QQ Bot

Connect Hermes to QQ via the Official QQ Bot API (v2): private (C2C), group @-mentions, guild and direct messages, over a persistent WebSocket with REST replies and voice transcription.

## Signature / Usage

```bash
# ~/.hermes/.env
QQ_APP_ID=your-app-id
QQ_CLIENT_SECRET=your-app-secret
```

```bash
hermes gateway setup    # select QQ Bot
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['messaging'], explicit=True)"
```

```yaml
platforms:
  qqbot:
    enabled: true
    extra:
      markdown_support: true
      dm_policy: "open"          # open | allowlist | disabled
      group_policy: "open"       # open | allowlist | disabled
      stt:
        provider: "zai"
        baseUrl: "https://open.bigmodel.cn/api/coding/paas/v4"
        model: "glm-asr"
        timeout: 60
```

## Options / Props

| Variable | Default | Description |
|----------|---------|-------------|
| `QQ_APP_ID` / `QQ_CLIENT_SECRET` | required | App ID / secret from q.qq.com |
| `QQBOT_HOME_CHANNEL` / `QQBOT_HOME_CHANNEL_NAME` | — / `Home` | Cron / notification OpenID |
| `QQ_ALLOWED_USERS` | open | User OpenIDs for DM access |
| `QQ_GROUP_ALLOWED_USERS` | — | Group OpenIDs |
| `QQ_ALLOW_ALL_USERS` | `false` | Allow all DMs |
| `QQ_PORTAL_HOST` | `q.qq.com` | `sandbox.q.qq.com` for sandbox routing |
| `QQ_STT_API_KEY` | — | STT provider key |
| `QQ_STT_MODEL` | `glm-asr` | STT model |
| `platforms.qqbot.extra.stt.baseUrl` | — | STT base URL (`QQ_STT_BASE_URL` is not read directly) |
| `extra.markdown_support` | — | QQ markdown (`msg_type 2`); config-only |
| `extra.dm_policy` / `group_policy` / `allow_from` / `group_allow_from` | — | Access policy |

## Notes

- Enable the C2C, Group @-messages and Guild messages intents at q.qq.com; sandbox bots only receive from the sandbox test channel.
- Voice: QQ's built-in ASR (`asr_refer_text`) is tried first, then an OpenAI-compatible STT provider (Zhipu GLM `zai` default, or OpenAI Whisper).
- Group messages need an @mention; check `QQ_ALLOWED_USERS` when DMs are restricted.
- Adapted: prefixed `cd ~/.hermes/hermes-agent &&` (as in the upstream ACP / DingTalk / SMS pages) because `pm` lives in the Hermes install checkout.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/qqbot (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
- [Weixin (WeChat)](./weixin.md)
