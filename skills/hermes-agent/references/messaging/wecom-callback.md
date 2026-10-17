# WeCom Callback (Self-Built App)

Hermes connects to WeCom as a self-built enterprise application using the callback model: WeCom pushes encrypted XML to an HTTP endpoint, Hermes acknowledges silently and delivers the reply proactively through the `message/send` API. The app shows as a first-class entry in users' WeCom sidebar and supports multi-corp routing.

## Signature / Usage

```bash
# ~/.hermes/.env
WECOM_CALLBACK_CORP_ID=your-corp-id
WECOM_CALLBACK_CORP_SECRET=your-corp-secret
WECOM_CALLBACK_AGENT_ID=1000002
WECOM_CALLBACK_TOKEN=your-callback-token
WECOM_CALLBACK_ENCODING_AES_KEY=your-43-char-aes-key
WECOM_CALLBACK_PORT=8645
WECOM_CALLBACK_ALLOWED_USERS=user1,user2
```

Callback URL in the WeCom console: `http://YOUR_PUBLIC_IP:8645/wecom/callback` (HTTPS required by WeCom in practice), with the generated Token and EncodingAESKey. Then run `hermes gateway`.

```yaml
platforms:
  wecom_callback:
    enabled: true
    extra:
      host: "0.0.0.0"
      port: 8645
      apps:
        - name: "dept-a"
          corp_id: "ww_corp_a"
          corp_secret: "secret-a"
          agent_id: "1000002"
          token: "token-a"
          encoding_aes_key: "key-a-43-chars..."
```

## Options / Props

`platforms.wecom_callback.extra`:

| Setting | Default | Description |
|---------|---------|-------------|
| `corp_id` / `corp_secret` / `agent_id` / `token` / `encoding_aes_key` | required | App credentials; key is 43 characters |
| `host` | unset (dual-stack) | Bind address (`WECOM_CALLBACK_HOST`) |
| `port` | `8645` | Callback port |
| `path` | `/wecom/callback` | Callback path |
| `apps` | — | Multi-app list; users scoped by `corp_id:user_id` |

Endpoints: `GET /wecom/callback` (URL verification), `POST /wecom/callback` (encrypted messages), `GET /health` (`{"status": "ok"}`). Access: `WECOM_CALLBACK_ALLOWED_USERS` or `WECOM_CALLBACK_ALLOW_ALL_USERS=true`.

## Notes

- Differs from WeCom Bot (WebSocket, works in group chats): this mode is a self-built app.
- Payloads use AES-CBC with SHA1 signature verification, compatible with Tencent's WXBizMsgCrypt SDK; replies go through the proactive API, not the callback response.
- Limitations: no streaming, no typing indicators, text-only input, agent sessions take 3 to 30 minutes, text messages keep only the first 2048 bytes (replies split; CJK about 680 characters per message).
- Signature failures are usually a Token / EncodingAESKey copy error or whitespace around `=` in `.env`. Loopback-bound listeners are unreachable by WeCom: leave `extra.host` unset or front it with a tunnel / reverse proxy.

## Related

- [WeCom (Enterprise WeChat)](./wecom.md)
- [Messaging Gateway](./messaging.md)
