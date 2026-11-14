# Yuanbao

Hermes connects to Yuanbao, Tencent's enterprise messaging platform, over a WebSocket gateway with HMAC authentication, supporting direct (C2C) and group conversations. Since v0.23 the platform and its `yb_*` tools ship as the `yuanbao` Hermes Labs plugin instead of Hermes core.

## Signature / Usage

```bash
hermes plugins install yuanbao
```

Plugins are installed per profile; use `hermes -p <profile> plugins install yuanbao` for another profile. Restart the gateway afterwards so it serves the platform. The plugin source is `NousResearch/hermes-labs-plugins` (`yuanbao` directory), which carries the full setup guide.

The names are unchanged from the v0.22.2 core adapter. Environment (v0.22.2 page, same names in the plugin):

```bash
# ~/.hermes/.env
YUANBAO_APP_ID=your-app-id
YUANBAO_APP_SECRET=your-app-secret
# Optional: override built-in endpoints only if Yuanbao support gives you different ones
# YUANBAO_WS_URL=wss://...
# YUANBAO_API_DOMAIN=https://...
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
| `YUANBAO_APP_ID` / `YUANBAO_APP_SECRET` | Bot credentials (`YUANBAO_APP_KEY` is the legacy spelling of the ID) |
| `YUANBAO_WS_URL` / `YUANBAO_API_DOMAIN` | Gateway endpoints (built-in defaults) |
| `YUANBAO_BOT_ID` | Optional; normally obtained from sign-token |
| `YUANBAO_ROUTE_ENV` | Optional routing environment (test / staging / production) |
| `YUANBAO_HOME_CHANNEL` / `YUANBAO_HOME_CHANNEL_NAME` | `direct:<account>` or `group:<group_code>` |
| `YUANBAO_ALLOWED_USERS` | Legacy allowlist |
| `YUANBAO_DM_POLICY` / `platforms.yuanbao.extra.dm_policy` | `open` (default) / `allowlist` / `disabled` |
| `YUANBAO_DM_ALLOW_FROM` / `dm_allow_from` | User IDs when DM policy is `allowlist` |
| `YUANBAO_GROUP_POLICY` / `group_policy` | `open` (default) / `allowlist` / `disabled` |
| `YUANBAO_GROUP_ALLOW_FROM` / `group_allow_from` | Group codes when group policy is `allowlist` |

Built-in connection parameters (not configurable, v0.22.2 page): WS connect timeout 15 s, heartbeat 30 s, max reconnect attempts 100 with 1 s to 60 s exponential backoff, reply heartbeat 2 s, send timeout 30 s.

Tools from the plugin: `yb_query_group_info`, `yb_query_group_members`, `yb_send_dm`, `yb_search_sticker`, `yb_send_sticker` (toolset `yuanbao` / `hermes-yuanbao`).

## Notes

- Hermes Labs plugin: built by Nous Research, not supported, and likely not maintained going forward. Fixes from the community are welcome.
- The v0.23.1 page is only a stub that points to the plugin's own guide; the Options table, chat ID formats and feature notes below were taken from the v0.22.2 page and are kept for the unchanged names. Verify details against the plugin guide.
- Chat ID formats: `direct:<account>` and `group:<group_code>` (e.g. `yuanbao:group:group_code` as a delivery target).
- Media (images JPEG / PNG / GIF / WebP, files, voice WAV / MP3 / OGG) is uploaded via COS; media URLs are validated against SSRF. Replies are Markdown-aware chunked; stickers (TIMFaceElem) and WeChat forwarded chat-history bundles (including nested forwards) are supported.
- Auto-sethome: the first user to message the bot becomes the home channel owner (a first DM upgrades a group home channel to direct). `/sethome` sets it manually.
- Sends a waiting message on slow responses; message dedup; typing indicator. `hermes gateway run -vv` enables verbose logging.
- Adapted: the v0.22.2 Hermes page lists YUANBAO_WS_URL / YUANBAO_API_DOMAIN with example.com placeholders, but the same page states both have built-in defaults; they are shown here as commented optional overrides.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/yuanbao (pinned to v0.23.1)

### Migration (v0.22 -> v0.23): Yuanbao moved out of core

- The Yuanbao gateway platform and `yb_*` tools are no longer in Hermes core; they ship as the `yuanbao` plugin from the Hermes Labs catalog (`hermes plugins install yuanbao`). All names stay the same: the `YUANBAO_*` variables, the `platforms.yuanbao` block (and the legacy `gateway.yuanbao` block) in `config.yaml`, the `yuanbao` toolset and the tool names.
- Upgrading needs nothing: every profile already using Yuanbao (`YUANBAO_APP_ID` or `YUANBAO_APP_KEY` plus `YUANBAO_APP_SECRET` in `.env`, `platforms.yuanbao` enabled, or the `yuanbao` / `hermes-yuanbao` toolset listed for another platform) gets the plugin installed automatically by `hermes update` or on the profile's first start (honours `security.allow_lazy_installs`). A failed attempt is retried with a backoff; `hermes update` always retries. This happens once per profile: after `hermes plugins remove yuanbao` it stays removed.
- The core dependency repair note (`hermes pm repair` for `websockets` / `httpx`) was dropped from the page.

## Related

- [Messaging Gateway](./messaging.md)
- [WeCom (Enterprise WeChat)](./wecom.md)
