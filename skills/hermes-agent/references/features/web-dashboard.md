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
```

| Env var | Overrides |
|---|---|
| `HERMES_DASHBOARD_OAUTH_CLIENT_ID` | `dashboard.oauth.client_id` |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` / `_PASSWORD_HASH` / `_PASSWORD` / `_SECRET` / `_TTL_SECONDS` | `dashboard.basic_auth.*` (plaintext password wins over a config hash) |
| `HERMES_DASHBOARD_OIDC_ISSUER` / `_CLIENT_ID` / `_SCOPES` | `dashboard.oauth.self_hosted.*` |
| `HERMES_DASHBOARD_PUBLIC_URL` | `dashboard.public_url` |
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
| `GET /api/logs`, `GET /api/analytics/usage?days=` | Logs and usage |
| `GET/POST /api/cron/jobs`, `POST /api/cron/jobs/{id}/pause|resume|trigger`, `PUT|DELETE /api/cron/jobs/{id}` | Cron |
| `GET /api/skills`, `PUT /api/skills/toggle`, `GET /api/tools/toolsets` | Skills and toolsets |
| `GET /api/chat/workspaces` | Chat workspaces (`?scan=1` rescans) |
| `/api/mcp/*`, `/api/messaging/platforms/*`, `/api/pairing/*`, `/api/webhooks/*`, `/api/credentials/pool/*`, `/api/memory/*`, `/api/gateway/*`, `/api/ops/*`, `/api/system/stats`, `/api/hermes/update/check`, `/api/curator/*`, `/api/portal` | Admin endpoints |

Management endpoint families accept `?profile=<name>` (or `"profile"` in the JSON body for writes); unknown profiles return 404.

## Notes

- Binding to any non-loopback host engages the auth gate; with no auth provider registered the dashboard refuses to start (fail-closed). Providers: `basic` (username/password; trusted networks or VPN only), `nous` (Nous Portal OAuth, suitable for public internet), `self-hosted` OIDC (public PKCE client, no client secret; HTTPS issuer required except loopback), plus custom `DashboardAuthProvider` plugins (`supports_password` or `supports_token`).
- A non-loopback `public_url` always engages the gate even on a loopback backend; the callback is `<public_url>/auth/callback`. List non-loopback TLS terminators in `dashboard.trusted_proxies` (wildcards and `0.0.0.0/0` rejected).
- Cookies: `hermes_session_at` (15 minutes), `hermes_session_pkce` (10 minutes), `hermes_session_rt` (unused in contract v1). Audit log at `$HERMES_HOME/logs/dashboard-auth.log`; `/auth/password-login` is rate limited (default 10 per minute per IP).
- Remote Desktop connects to a running `hermes dashboard` (Settings -> Gateways -> Remote gateway); the readiness probe hits only `GET /api/status`, while chat uses `/api/ws` (close code 4403 = request guard, 4401 = ticket failed). Verify with `curl -s http://<host>:9119/api/status | jq '.auth_required, .auth_providers'`. Use `RestartPreventExitStatus=78` in systemd units.
- The `/chat` tab needs a POSIX PTY (Linux, macOS, WSL2), Node.js and `ptyprocess`.
- `/reload` in the CLI re-reads `~/.hermes/.env`. CORS is limited to localhost origins (9119, 3000, 5173).
- Built-in themes: `default`, `default-large`, `nous-blue`, `midnight`, `ember`, `mono`, `cyberpunk`, `rose`; extension guide in Extending the Dashboard.
- Development: `hermes dashboard --no-open` plus `npm run dev` in `web/` (Vite on 5173 proxying `/api`); build resource caps `HERMES_WEB_BUILD_MAX_OLD_SPACE_SIZE`, `HERMES_WEB_BUILD_THREADS`, `HERMES_WEB_BUILD_LIGHT=1`.

## Related

- [Extending the Dashboard](./extending-the-dashboard.md)
- [Curator](./curator.md)
- [MCP](./mcp.md)
