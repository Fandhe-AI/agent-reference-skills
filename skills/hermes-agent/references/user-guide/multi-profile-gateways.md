# Running Many Gateways at Once

Operating multiple profiles (each with its own bot tokens, sessions, memory) as managed services on one machine. Multiplexing is on by default: one host gateway process serves every profile.

## Signature / Usage

```bash
hermes profile create coder
coder setup
hermes gateway install      # register the default-profile host gateway
hermes gateway start        # the host serves coder too
hermes -p coder gateway run # optional: attaches to the live host and exits 0
```

A gateway of its own for a named profile (`hermes -p coder gateway install --force`, or `gateway.standalone: true` in `profiles/coder/config.yaml`) is needed only when a boundary blocks the fold: a different UNIX user, a `HERMES_HOME` outside `profiles/`, or port-binding platforms.

Multiplexing control:

```bash
hermes config set gateway.multiplex_profiles true
hermes gateway restart
```

```yaml
gateway:
  multiplex_profiles: true
```

Per-profile park / unpark without stopping the host:

```bash
hermes -p coder gateway stop     # park coder; other profiles keep running
hermes -p coder gateway start    # unpark coder and serve it again
hermes -p coder gateway restart  # reconnect coder with its current configuration
```

## Options / Props

| Key / flag | Description |
|------|-------------|
| `gateway.multiplex_profiles` | Unset = the default gateway decides at boot via the migration preflight; `true` multiplexes regardless; `false` is retired (rewritten to `true`). Env override: `GATEWAY_MULTIPLEX_PROFILES` |
| `gateway.standalone: true` (in a named profile's own `config.yaml`) | Temporary compatibility shim: the host does not serve that profile and it runs its own gateway; ignored with a warning on the default profile; no env var |
| `gateway.auto_multiplex_migration` | `false` on the default profile stops `hermes update` from folding per-profile gateways automatically |
| `gateway.parked` (marker file in a profile home) | Written by `gateway stop`; excludes the profile from serving and from cron ticks |
| `gateway.profile_routes` | Route users/guilds/channels/threads sharing one bot token to different profiles |
| `--force` (on `run`, `start`, `install`, `restart`) | Starts a separate per-profile gateway where a real boundary blocks the fold |
| `hermes gateway migrate --multiplex [--dry-run] [-y]` | Fold a per-profile fleet onto one host gateway |

`profile_routes` entry fields: `name`, `platform`, `guild_id`, `chat_id`, `thread_id`, `user_id`, `bot_profile`, `profile`. Specificity scoring is additive: `user_id` = 16, `thread_id` = 8, `chat_id` = 4, `guild_id` = 2; all declared fields must hold; ties keep declaration order. Requires `gateway.multiplex_profiles: true`.

```yaml
gateway:
  multiplex_profiles: true
  profile_routes:
    - name: acme-server
      platform: discord
      guild_id: "1234567890"
      profile: acme
    - name: tg-group
      platform: telegram
      chat_id: "-1001234567890"
      profile: tg-profile
```

## Notes

- Adapted: the official Quick start shows per-profile `coder gateway install/start` (pre-multiplex topology); under the default multiplexing those commands exit 78, so this page starts the default-profile host gateway instead.
- Named profiles do not get their own gateway by default: `hermes -p <name> gateway install|start|run` refuses with exit 78 (attach to the host instead; under a supervisor the attach exits 75 so the unit retries). `hermes -p <name> gateway run` while a host is live attaches and exits 0.
- HTTP-inbound platforms for secondary profiles use the default listener under a prefix `/p/<profile>/` (for example `POST http://host:8644/p/coder/webhooks/<route>`); `api_server` and `webhook` are mirrored and must not be enabled on the secondary; Twilio SMS, LINE, Teams, BlueBubbles, Microsoft Graph, WhatsApp Cloud, WeCom callback, and Feishu webhook run in shared-listener mode. WhatsApp bridge runs per paired profile (`hermes -p work whatsapp`); Relay is owned by the default profile. API-server requests use the named profile's `API_SERVER_KEY`; webhook routes bind to a profile with `profile: <name>` (or `hermes webhook subscribe <name> --route-profile coder`).
- One bot token per profile per platform; a duplicate `(platform, token)` parks the duplicate adapter (`fatal / duplicate_credential`). Audit without printing token values (adapted; duplicate hashes in the first column indicate a shared token):

```bash
for f in ~/.hermes/.env ~/.hermes/profiles/*/.env; do
  [ -f "$f" ] || continue
  for v in TELEGRAM_BOT_TOKEN DISCORD_BOT_TOKEN; do
    val=$(grep -E "^${v}=" "$f" | head -n 1 | cut -d= -f2-)
    [ -n "$val" ] || continue
    h=$(printf '%s' "$val" | shasum -a 256 | cut -c1-12)
    echo "$h $v $f"
  done
done | sort
```

- Adapted: the official audit (`grep -H`) prints raw token values; this version compares hashes and prints only variable and file names.
- Session keys are namespaced `agent:<profile>:...` (default keeps `agent:main:...`); each profile's rows go to its own `state.db`. Credentials, authorization, MCP connections, terminal settings, outbound identity, and hooks are resolved per profile; shared by design: the process, PID/lock, `gateway_state.json`, the HTTP listener, and the `profile_routes` table.
- The served set is live: a profile created, deleted, or renamed while the multiplexer runs is served/unserved without restart; the host also rescans every 30 seconds.
- Migration: `hermes update` auto-folds per-profile gateways when nothing blocks it (same UNIX user, service domain, `profiles/` tree); blockers include duplicate credentials and port-binding platforms without `/p/<profile>/` ingress. Migration is transactional with resume via `~/.hermes/gateway_migration.json`; there is no `--standalone` reverse. In the s6 Docker image, `hermes gateway migrate --multiplex` parks named slots and folds intent into the root slot.
- Service files: macOS `~/Library/LaunchAgents/ai.hermes.gateway-<profile>.plist`, Linux `~/.config/systemd/user/hermes-gateway-<profile>.service` (default profile keeps `ai.hermes.gateway.plist` / `hermes-gateway.service`). Logs: `~/.hermes/profiles/<name>/logs/gateway.log`; `hermes logs -f`, `hermes -p coder logs -f`.
- Keep the host awake: macOS `caffeinate -dis` (lid-close still sleeps); Linux `systemd-inhibit` and `sudo loginctl enable-linger "$USER"`.
- Troubleshooting: launchd "Could not find service in domain for user gui: 501" after `stop` is auto-handled; stale PID: inspect `gateway.pid`, `kill -TERM`; health check `hermes doctor` / `hermes -p <profile> doctor`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/multi-profile-gateways (pinned to v0.22.2)

## Related

- [profiles.md](./profiles.md)
- [multi-connection-desktop.md](./multi-connection-desktop.md)
- [docker.md](./docker.md)
