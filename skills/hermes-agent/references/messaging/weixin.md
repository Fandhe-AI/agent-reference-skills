# Weixin (WeChat)

Hermes connects to personal WeChat (微信) accounts through Tencent's iLink Bot API using HTTP long-polling (no public endpoint, webhook or WebSocket). Distinct from WeCom (Enterprise WeChat).

## Signature / Usage

```bash
python -c "import pm; pm.sync_venv(['messaging'], explicit=True)"
hermes gateway setup     # select Weixin; scan the QR code with WeChat and confirm on the phone
```

```bash
# ~/.hermes/.env
WEIXIN_ACCOUNT_ID=your-account-id
WEIXIN_DM_POLICY=open
WEIXIN_ALLOWED_USERS=user_id_1,user_id_2
WEIXIN_HOME_CHANNEL=chat_id
```

```bash
hermes gateway
```

## Options / Props

`platforms.weixin.extra` / env:

| Key / Variable | Default | Description |
|----------------|---------|-------------|
| `account_id` / `WEIXIN_ACCOUNT_ID` | required | iLink Bot account ID |
| `token` / `WEIXIN_TOKEN` | required | Auto-saved from QR login (`~/.hermes/weixin/accounts/`) |
| `base_url` / `WEIXIN_BASE_URL` | `https://ilinkai.weixin.qq.com` | iLink API |
| `cdn_base_url` / `WEIXIN_CDN_BASE_URL` | `https://novac2c.cdn.weixin.qq.com/c2c` | Media CDN |
| `dm_policy` / `WEIXIN_DM_POLICY` | `open` | `open` / `allowlist` / `disabled` / `pairing` |
| `group_policy` / `WEIXIN_GROUP_POLICY` | `disabled` | `open` / `allowlist` / `disabled` |
| `allow_from` / `WEIXIN_ALLOWED_USERS` | — | DM user IDs |
| `group_allow_from` / `WEIXIN_GROUP_ALLOWED_USERS` | — | Group chat IDs (not member user IDs, despite the name) |
| `split_multiline_messages` / `WEIXIN_SPLIT_MULTILINE_MESSAGES` | `false` | Legacy multi-line splitting |
| `text_batch_delay_seconds` | `0.3` (max 2.0) | Debounce for rapid texts; `0` disables |
| `text_batch_split_delay_seconds` | `1.0` (max 4.0) | Extended flush delay |
| `WEIXIN_HOME_CHANNEL` / `WEIXIN_HOME_CHANNEL_NAME` | — / `Home` | Cron target |
| `WEIXIN_ALLOW_ALL_USERS` | — | Gateway-level allow-all |

## Notes

- QR login connects an iLink bot identity (e.g. `...@im.bot`), not a scriptable personal account: ordinary WeChat groups usually cannot be joined and group events are typically not delivered, so group policy often has no effect; the gateway warns at startup if `WEIXIN_GROUP_POLICY` is not `disabled`. Allowed users must message the iLink bot identity itself, and `WEIXIN_ALLOWED_USERS` is only an inbound filter.
- Media goes through an AES-128-ECB encrypted CDN (needs `cryptography`); outbound uploads use `getuploadurl`. Messages up to 4000 characters stay one bubble; Markdown is preserved.
- `context_token` per peer is persisted in `<account_id>.context-tokens.json`. Proactive sends with a stale token are retried once without it; fresh pairs need the user to message first.
- Long-poll `getupdates` with a 35 s timeout; session expired `errcode=-14` pauses 10 minutes (re-run setup). Only one gateway can use a token at a time. Dedup window 5 minutes. Outbound media URLs are SSRF-checked.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/weixin (pinned to v0.22.2)

## Related

- [WeCom (Enterprise WeChat)](./wecom.md)
- [QQ Bot](./qqbot.md)
- [Messaging Gateway](./messaging.md)
