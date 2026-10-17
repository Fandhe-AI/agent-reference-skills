# Yuanbao

Hermes connects to Yuanbao, Tencent's enterprise messaging platform, over a WebSocket gateway with HMAC authentication, supporting direct (C2C) and group conversations.

## Signature / Usage

```bash
# ~/.hermes/.env
YUANBAO_APP_ID=your-app-id
YUANBAO_APP_SECRET=your-app-secret
YUANBAO_WS_URL=wss://api.yuanbao.example.com/ws
YUANBAO_API_DOMAIN=https://api.yuanbao.example.com
YUANBAO_HOME_CHANNEL=direct:bot_account_id
```

```bash
hermes gateway setup     # select Yuanbao; enter APP_ID and APP_SECRET
hermes gateway
```

Create the bot in the Yuanbao app under **PAI -> My Bot** and copy APP_ID / APP_SECRET.

## Options / Props

| Variable | Description |
|----------|-------------|
| `YUANBAO_APP_ID` / `YUANBAO_APP_SECRET` | Bot credentials |
| `YUANBAO_WS_URL` / `YUANBAO_API_DOMAIN` | Gateway endpoints (built-in defaults) |
| `YUANBAO_BOT_ID` | Optional; normally obtained from sign-token |
| `YUANBAO_ROUTE_ENV` | Optional routing environment (test / staging / production) |
| `YUANBAO_HOME_CHANNEL` / `YUANBAO_HOME_CHANNEL_NAME` | `direct:<account>` or `group:<group_code>` |
| `YUANBAO_ALLOWED_USERS` | Legacy allowlist |
| `YUANBAO_DM_POLICY` / `platforms.yuanbao.extra.dm_policy` | `open` (default) / `allowlist` / `disabled` |
| `YUANBAO_DM_ALLOW_FROM` / `dm_allow_from` | User IDs when DM policy is `allowlist` |
| `YUANBAO_GROUP_POLICY` / `group_policy` | `open` (default) / `allowlist` / `disabled` |
| `YUANBAO_GROUP_ALLOW_FROM` / `group_allow_from` | Group codes when group policy is `allowlist` |

Built-in connection parameters (not configurable): WS connect timeout 15 s, heartbeat 30 s, max reconnect attempts 100 with 1 s to 60 s exponential backoff, reply heartbeat 2 s, send timeout 30 s.

## Notes

- Chat ID formats: `direct:<account>` and `group:<group_code>` (e.g. `yuanbao:group:group_code` as a delivery target).
- Media (images JPEG / PNG / GIF / WebP, files, voice WAV / MP3 / OGG) is uploaded via COS; media URLs are validated against SSRF. Replies are Markdown-aware chunked; stickers (TIMFaceElem) and WeChat forwarded chat-history bundles (including nested forwards) are supported.
- Auto-sethome: the first user to message the bot becomes the home channel owner (a first DM upgrades a group home channel to direct). `/sethome` sets it manually.
- Sends a waiting message on slow responses; message dedup; typing indicator. `hermes gateway run -vv` enables verbose logging.
- Core dependencies `websockets` and `httpx` can be repaired with `hermes pm repair`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/yuanbao (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
- [WeCom (Enterprise WeChat)](./wecom.md)
