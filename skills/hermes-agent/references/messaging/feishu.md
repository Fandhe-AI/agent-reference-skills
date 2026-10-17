# Feishu / Lark

Hermes Agent runs as a Feishu or Lark bot in DMs and groups, supporting WebSocket (recommended) or webhook connection modes, interactive cards, document-comment replies and meeting invitations.

## Signature / Usage

```bash
# ~/.hermes/.env
FEISHU_APP_ID=cli_xxx
FEISHU_APP_SECRET=secret_xxx
FEISHU_DOMAIN=feishu            # feishu (China) or lark (international)
FEISHU_CONNECTION_MODE=websocket
FEISHU_ALLOWED_USERS=ou_xxx,ou_yyy
FEISHU_HOME_CHANNEL=oc_xxx
```

```bash
hermes gateway setup    # scan-to-create QR flow, or manual credentials
hermes gateway
```

## Options / Props

| Variable | Default | Description |
|----------|---------|-------------|
| `FEISHU_APP_ID` / `FEISHU_APP_SECRET` | required | App credentials |
| `FEISHU_DOMAIN` | `feishu` | `feishu` or `lark` |
| `FEISHU_CONNECTION_MODE` | `websocket` | `websocket` or `webhook` |
| `FEISHU_ALLOWED_USERS` | empty | open_id allowlist |
| `FEISHU_ALLOW_BOTS` / `feishu.allow_bots` | `none` | `none` / `mentions` / `all` |
| `FEISHU_REQUIRE_MENTION` | `true` | Group messages must @mention the bot |
| `FEISHU_GROUP_POLICY` | `allowlist` | `open` / `allowlist` / `disabled` |
| `FEISHU_HOME_CHANNEL` | — | Chat ID for cron output (`/set-home`) |
| `FEISHU_ENCRYPT_KEY` | empty | Webhook signature verification (`SHA256(timestamp + nonce + encrypt_key + body)` vs `x-lark-signature`) |
| `FEISHU_VERIFICATION_TOKEN` | empty | Webhook payload token check; also gates URL-verification challenge |
| `FEISHU_BOT_OPEN_ID` / `FEISHU_BOT_USER_ID` / `FEISHU_BOT_NAME` | empty | Manual bot identity when auto-detection fails |
| `FEISHU_WEBHOOK_HOST` / `PORT` / `PATH` | `127.0.0.1` / `8765` / `/feishu/webhook` | Webhook server |
| `FEISHU_REACTIONS` | on | `false` disables the Typing reaction |
| `HERMES_FEISHU_DEDUP_CACHE_SIZE` | `2048` | Dedup IDs (24 h TTL, persisted to `~/.hermes/feishu_seen_message_ids.json`) |
| `HERMES_FEISHU_TEXT_BATCH_DELAY_SECONDS` / `_MAX_MESSAGES` / `_MAX_CHARS` | `0.6` / `8` / `4000` | Text batching |
| `HERMES_FEISHU_MEDIA_BATCH_DELAY_SECONDS` | `0.8` | Media batching |
| `platforms.feishu.extra.ws_reconnect_interval` / `ws_ping_interval` | `120` / SDK default | WebSocket tuning |
| `platforms.feishu.extra.default_group_policy` / `admins` / `group_rules` | — | Per-group policy: `open`, `allowlist`, `blacklist`, `admin_only`, `disabled`; per-rule `require_mention` |

## Notes

- Required scopes: `im:message`, `im:message:send_as_bot`, `im:resource`, `im:chat`, `im:chat:readonly`; recommended `im:message.reactions:readonly`, `admin:app.info:readonly`, `contact:user.id:readonly`. Publish an app version for permissions to take effect.
- Events: subscribe `im.message.receive_v1` in Event Configuration; add `card.action.trigger` under the separate Callback Configuration tab and enable the Interactive Card capability, otherwise button clicks fail with error 200340 (200342 / 200343 mean the webhook callback URL is unreachable).
- Command approval uses an interactive card (Allow Once / Session / Always / Deny); card actions arrive as `/card button {...}` and are deduplicated for 15 minutes.
- Document comments: subscribe `drive.notice.comment_add_v1`, grant `docs:doc:readonly` and `drive:drive:readonly`; access rules in `~/.hermes/feishu_comment_rules.json` (policies `allowlist` / `pairing`) managed via `python -m gateway.platforms.feishu_comment_rules status|check|pairing`.
- Meeting invitations: subscribe `vc.bot.meeting_invited_v1`; the inviter must pass normal allowlist / pairing.
- Webhook mode: 120 requests per 60 s per (app_id, path, IP), 1 MB body, `application/json` only. Under multiplexed gateways each profile reads its own `.env`.
- Only one Hermes gateway may use the same `app_id` at a time. Outbound markdown is sent as a post message with `md` tag, falling back to plain text.

## Related

- [Messaging Gateway](./messaging.md)
- [DingTalk](./dingtalk.md)
