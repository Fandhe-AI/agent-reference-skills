# WeCom (Enterprise WeChat)

Hermes connects to WeCom (企业微信) through the AI Bot WebSocket gateway: real-time bidirectional communication with no public endpoint or webhook. For the inbound-webhook, self-built-app mode see WeCom Callback.

## Signature / Usage

```bash
# ~/.hermes/.env
WECOM_BOT_ID=your-bot-id
WECOM_SECRET=your-secret
WECOM_ALLOWED_USERS=user_id_1,user_id_2
WECOM_HOME_CHANNEL=chat_id
```

```bash
hermes gateway setup    # scan-to-create QR flow, or manual Bot ID / Secret
hermes gateway
```

```yaml
platforms:
  wecom:
    enabled: true
    extra:
      bot_id: "your-bot-id"
      secret: "your-secret"
      group_policy: "allowlist"
      group_allow_from: ["group_id_1"]
      groups:
        group_id_1:
          allow_from: ["user_alice"]
```

## Options / Props

`platforms.wecom.extra`:

| Key | Default | Description |
|-----|---------|-------------|
| `bot_id` / `secret` | required | AI Bot credentials |
| `websocket_url` | `wss://openws.work.weixin.qq.com` | Gateway URL (`WECOM_WEBSOCKET_URL`) |
| `dm_policy` | `open` | `open` / `allowlist` / `disabled` / `pairing` (`WECOM_DM_POLICY`) |
| `group_policy` | `open` | `open` / `allowlist` / `disabled` (`WECOM_GROUP_POLICY`) |
| `allow_from` / `group_allow_from` | `[]` | DM user IDs / group IDs |
| `groups` | `{}` | Per-group `allow_from`; `"*"` entry is the default; entries case-insensitive, optional `wecom:user:` / `wecom:group:` prefix stripped |
| `stream_keepalive_enabled` | `false` | Keepalive frames to refresh the ~6-minute reply-stream window |
| `stream_keepalive_interval_seconds` | `120` | Keepalive cadence |
| `stream_safe_duration_seconds` | `330` | Stream age after which finalize prefers proactive send |

Env: `WECOM_BOT_ID`, `WECOM_SECRET`, `WECOM_ALLOWED_USERS`, `WECOM_HOME_CHANNEL`.

## Notes

- Native streaming over `msgtype: "stream"` follows the global `streaming.enabled` (off by default); per-platform `display.platforms.wecom.streaming` defaults to `true` but only applies when the global switch is on.
- Outbound limits: text 4000 chars per message; image 10 MB; file 20 MB (absolute); voice 2 MB (AMR only for native voice); video 10 MB. Larger-than-native media under 20 MB is downgraded to a file. Uploads use 512 KB chunks (init, chunks, finish).
- Inbound AES-256-CBC media is decrypted automatically (needs `cryptography`; `hermes pm repair`).
- Reply mode (`aibot_respond_msg`) correlates responses to the inbound request; falls back to proactive `aibot_send_msg` when the context has expired.
- Heartbeat ping every 30 s; reconnect backoff 2, 5, 10, 30, 60 s; dedup window 5 minutes (max 1000 IDs).

## Related

- [WeCom Callback (Self-Built App)](./wecom-callback.md)
- [Weixin (WeChat)](./weixin.md)
- [Messaging Gateway](./messaging.md)
