# Hermes Web Dashboard

Browser-based administration panel (`hermes dashboard`) for configuration, API keys, MCP servers, messaging pairing and channels, webhooks, the gateway, memory, credentials, sessions, logs, analytics, cron jobs and skills.

## Signature / Usage

```bash
hermes dashboard                       # http://127.0.0.1:9119
hermes dashboard --port 8080
hermes dashboard --host 0.0.0.0        # non-loopback bind engages the auth gate
hermes dashboard --no-open
hermes dashboard register              # register a Nous OAuth client id
```

## Options / Props

| Flag | Default | Description |
|------|---------|-------------|
| `--port` | `9119` | Port |
| `--host` | `127.0.0.1` | Bind address |
| `--no-open` | — | Do not auto-open the browser |
| `--insecure` | off | Deprecated no-op; no longer disables authentication |
| `--isolated` | off | Dedicated per-profile server instead of routing to the machine dashboard |

Auth configuration:

```yaml
dashboard:
  public_url: "https://dashboard.example.com/hermes"
  trusted_proxies: ["172.20.0.5"]
  oauth:
    client_id: agent:01HXYZ...
    token_leeway: 60
    provider: self-hosted
    self_hosted:
      issuer: https://auth.example.com/application/o/hermes/
      client_id: hermes-dashboard
      scopes: "openid profile email"
      id_token_leeway: 60
  basic_auth:
    username: admin
    password_hash: "scrypt$..."
    secret: "<32+ random bytes>"
    session_ttl_seconds: 43200
  session_token_auth:
    enabled: false   # opt out of the deployment session-token provider (registers automatically when HERMES_DASHBOARD_SESSION_TOKEN is set)
```

| Env var | Overrides |
|---|---|
| `HERMES_DASHBOARD_OAUTH_CLIENT_ID` | `dashboard.oauth.client_id` |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` / `_PASSWORD_HASH` / `_PASSWORD` / `_SECRET` / `_TTL_SECONDS` | `dashboard.basic_auth.*` (plaintext password wins over a config hash) |
| `HERMES_DASHBOARD_OIDC_ISSUER` / `_CLIENT_ID` / `_SCOPES` | `dashboard.oauth.self_hosted.*` |
| `HERMES_DASHBOARD_PUBLIC_URL` | `dashboard.public_url` |
| `HERMES_DASHBOARD_SESSION_TOKEN` | Deployment session token (`file:<path>` is read at startup and fails loudly when missing/empty); registers the `session-token` provider |
| `HERMES_DESKTOP_REMOTE_URL` | Desktop saved remote URL |
| `HERMES_DASHBOARD_DRAIN_SECRET` | Drain provider bearer secret (min 256 bits) |

## Pages

Status (auto-refresh 5 s, resource pressure banner), Chat (embedded TUI over `/api/pty`, session switcher, workspace picker), Config, API Keys, Sessions, Logs, Analytics (7/30/90 days), Cron, Profiles, Skills (including hub), MCP (with the `optional-mcps/` catalog), Webhooks, Pairing, Channels, System (host stats, update check, Nous Portal, curator, gateway, memory, credential pool, operations, checkpoints, shell hooks).

## REST API

| Endpoint | Purpose |
|---|---|
| `GET /api/status` | Version, gateway status, `auth_required`, `auth_providers`, `memory` and `disk` pressure blocks |
| `GET /api/sessions`, `/api/sessions/{id}`, `/api/sessions/{id}/messages`, `/api/sessions/search?q=` | Session data (messages page: `limit` max 500, `offset`, `order=oldest|latest`) |
| `GET/PUT /api/config`, `GET /api/config/defaults`, `GET /api/config/schema` | Config |
| `GET/PUT/DELETE /api/env` | Environment variables |
| `DELETE /api/sessions/{id}` | Delete a session; needs the mutation identity from `GET /api/sessions/{id}/mutation-snapshot` (see Notes) |
| `POST /api/sessions/bulk-delete`, `DELETE /api/sessions/empty`, `POST /api/sessions/prune` (non-dry-run), `POST /api/sessions/owner-backfill` | Offline maintenance; refused with `409` while the profile's gateway runs |
| `GET /api/logs`, `GET /api/analytics/usage?days=` | Logs and usage |
| `GET/POST /api/cron/jobs`, `POST /api/cron/jobs/{id}/pause|resume|trigger`, `PUT|DELETE /api/cron/jobs/{id}` | Cron |
| `GET /api/skills`, `PUT /api/skills/toggle`, `GET /api/tools/toolsets` | Skills and toolsets |
| `GET /api/chat/workspaces` | Chat workspaces (`?scan=1` rescans) |
| `/api/mcp/*`, `/api/messaging/platforms/*`, `/api/pairing/*`, `/api/webhooks/*`, `/api/credentials/pool/*`, `/api/memory/*`, `/api/gateway/*`, `/api/ops/*`, `/api/system/stats`, `/api/hermes/update/check`, `/api/curator/*`, `/api/portal` | Admin endpoints |

Management endpoint families accept `?profile=<name>` (or `"profile"` in the JSON body for writes); unknown profiles return 404.

## Notes

- Binding to any non-loopback host engages the auth gate; with no auth provider registered the dashboard refuses to start (fail-closed). Providers: `basic` (username/password; trusted networks or VPN only), `nous` (Nous Portal OAuth, suitable for public internet), `self-hosted` OIDC (public PKCE client, no client secret; HTTPS issuer required except loopback), `session-token` (bundled `plugins/dashboard_auth/session_token`; the provisioned `HERMES_DASHBOARD_SESSION_TOKEN` as a credential), plus custom `DashboardAuthProvider` plugins (`supports_password` or `supports_token`).
- A non-loopback `public_url` always engages the gate even on a loopback backend; the callback is `<public_url>/auth/callback`. List non-loopback TLS terminators in `dashboard.trusted_proxies` (wildcards and `0.0.0.0/0` rejected).
- Cookies: `hermes_session_at` (15 minutes), `hermes_session_pkce` (10 minutes), `hermes_session_rt` (unused in contract v1). Audit log at `$HERMES_HOME/logs/dashboard-auth.log`; `/auth/password-login` is rate limited (default 10 per minute per IP).
- Remote Desktop connects to a running `hermes dashboard` (Settings -> Gateways -> Remote gateway); the readiness probe hits only `GET /api/status`, while chat uses `/api/ws` (close code 4403 = request guard, 4401 = ticket failed). Verify with `curl -s http://<host>:9119/api/status | jq '.auth_required, .auth_providers'`. Use `RestartPreventExitStatus=78` in systemd units.
- The `/chat` tab needs a POSIX PTY (Linux, macOS, WSL2), Node.js and `ptyprocess`.
- `/reload` in the CLI re-reads `~/.hermes/.env`.
- CORS and browser WebSocket upgrades are granted only to the server's own origin: a loopback origin (`localhost`, `127.0.0.1`, `[::1]`) on the port the server is bound to (default `http://127.0.0.1:9119`, your `--port`, or a Desktop backend's ephemeral port). No fixed dev-server port (3000 / 5173) is trusted any more; other local pages get no CORS headers and their WebSocket upgrades are refused. A reverse proxy on another loopback port that rewrites `Host` needs its address in `dashboard.public_url` (`webapp.public_url` for the Webapp). A desktop dev build's backend also trusts that build's loopback `HERMES_DESKTOP_DEV_SERVER` renderer.
- Session-token provider: no browser sign-in flow (`/login` shows a note). REST sends the token in `X-Hermes-Session-Token` (a bearer `Authorization` header also works and wins when both are sent; only this provider's token works in the dedicated header); `/api/ws` uses the `?token=` upgrade credential. Rotation invalidates every saved client copy (Desktop shows "HTTP reachable but the WebSocket fails" until the new token is pasted). It is a shared secret with no per-user identity; prefer Nous Research or self-hosted OIDC for shared or internet-facing deployments. Nix modules set `HERMES_DASHBOARD_SESSION_TOKEN=file:<path>` from `backend.sessionTokenFile`.
- Self-hosted OIDC: every account that can sign in acts as the machine owner; restrict the app to your own account in the provider (e.g. Okta app assignment, Entra "Assignment required").
- The dashboard frontend builds automatically on first launch (and on `hermes update`) with the Node and pnpm Hermes provisions; if it cannot provision them (e.g. lazy installs disabled) the update skips the build and `hermes dashboard` builds on first launch.
- `DELETE /api/sessions/{id}` must carry the mutation identity (`request_id`, `expected_revision`, `expected_generation`) read from `GET /api/sessions/{id}/mutation-snapshot`; a partial identity is `409 mutation_identity_required`, none at all (Desktop 0.22.2 and older) is `409 client_upgrade_required`. The delete runs in the profile's gateway: a running or queued turn gives `409 session_busy`, a turn lost across a gateway restart `409 unknown_execution`. Deleting a session with executed turns leaves small terminal-receipt tombstones in `state_meta` (kept indefinitely) so exact retries return the same answer.
- Bulk maintenance endpoints (`bulk-delete`, `empty`, non-dry-run `prune`, `owner-backfill`) take the exclusive `gateway.lock`; while that profile's gateway runs they return `409` (`Exclusive maintenance refused: Gateway runtime already owns profile <home>. Drain and stop the gateway, then retry.`). Run `hermes gateway stop` first; `dry_run` prune and read endpoints keep working.
- The Channels page lists the built-in channels (Telegram, Discord, Slack, Matrix, Mattermost, WhatsApp, Signal, BlueBubbles/iMessage, Email, SMS/Twilio, DingTalk, Feishu/Lark, WeCom, WeChat, QQ Bot, API server, webhooks); platforms from installed plugins (Yuanbao, Home Assistant, ...) appear too.
- Built-in themes: `default`, `default-large`, `nous-blue`, `midnight`, `ember`, `mono`, `cyberpunk`, `rose`; extension guide in Extending the Dashboard.
- Development: `hermes dashboard --no-open` plus `pnpm install` + `pnpm run dev` in `web/` (Vite on 5173 proxying `/api` including WebSockets, with `Host` / `Origin` forwarded unchanged; `HERMES_DASHBOARD_URL` selects another backend; Vite's own CORS is off); build resource caps `HERMES_WEB_BUILD_MAX_OLD_SPACE_SIZE`, `HERMES_WEB_BUILD_THREADS`, `HERMES_WEB_BUILD_LIGHT=1`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/web-dashboard (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- CORS: the fixed localhost allow-list (9119, 3000, 5173) is replaced by same-origin loopback on the bound port; Vite apps on 5173 / 5174 no longer get CORS headers or WebSocket upgrades unless proxied as above.
- `DELETE /api/sessions/{id}` without the revision-fence identity now fails with `409` (see above).
- Frontend tooling moved from `npm` to `pnpm` (Hermes-provisioned Node and pnpm); `npm run dev` becomes `pnpm run dev`.
- Basic-auth recipe: the official setup recipe previously wrote `HERMES_DASHBOARD_BASIC_AUTH_SECRET=$(openssl rand -base64 32)` inside a quoted heredoc, which stores the literal text `$(openssl rand -base64 32)`. If `grep BASIC_AUTH_SECRET ~/.hermes/.env` shows that text, replace it with a freshly generated secret and restart the dashboard. The v0.23.1 recipe appends the secret with `echo "HERMES_DASHBOARD_BASIC_AUTH_SECRET=$(openssl rand -base64 32)" >> ~/.hermes/.env` after the heredoc.
- Yuanbao is no longer a built-in Channels entry; it appears as a plugin-provided platform.

## Related

- [Extending the Dashboard](./extending-the-dashboard.md)
- [Curator](./curator.md)
- [MCP](./mcp.md)
