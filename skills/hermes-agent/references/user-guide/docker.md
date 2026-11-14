# Docker Backend

Running Hermes Agent inside Docker (image `nousresearch/hermes-agent`). All user data lives in one directory mounted at `/opt/data`; the image is stateless. (Using Docker as the agent's terminal sandbox backend is a separate config block, `terminal.backend: docker`, documented in Configuration -> Docker Backend.)

## Signature / Usage

First-time setup:

```sh
mkdir -p ~/.hermes
docker run -it --rm \
  -v ~/.hermes:/opt/data \
  nousresearch/hermes-agent setup
```

Gateway in the background:

```sh
docker run -d \
  --name hermes \
  --restart unless-stopped \
  -v ~/.hermes:/opt/data \
  -p 8642:8642 \
  nousresearch/hermes-agent gateway run
```

Interactive chat: `docker run -it --rm -v ~/.hermes:/opt/data nousresearch/hermes-agent`

Webapp (Hermes Desktop in a browser, prebuilt in the image; the mounted `config.yaml` turns it on):

```yaml
webapp:
  enabled: true
  host: 0.0.0.0
  port: 9120
  public_url: "http://localhost:9120"  # the address your browser opens
```

```sh
docker run -d \
  --name hermes \
  --restart unless-stopped \
  -v ~/.hermes:/opt/data \
  -p 9120:9120 \
  -e HERMES_DASHBOARD_BASIC_AUTH_USERNAME=admin \
  -e HERMES_DASHBOARD_BASIC_AUTH_PASSWORD="$(openssl rand -hex 16)" \
  nousresearch/hermes-agent gateway run
```

Behind a tunnel or reverse proxy in another container (Cloudflare Tunnel, Caddy, Traefik, nginx):

```yaml
webapp:
  enabled: true
  host: 0.0.0.0                              # reachable from the proxy's container
  port: 9120
  public_url: "https://hermes.example.com"   # the address the browser opens
dashboard:
  trusted_proxies:
    - "172.30.0.0/24"                        # a network only the proxy and Hermes are on
```

Adapted (not in the official docs): the `environment:` block on the `hermes` service supplies the dashboard Basic-auth provider that a non-loopback Webapp requires; set both variables in the shell or an `.env` file next to the Compose file.

```yaml
services:
  hermes:
    image: nousresearch/hermes-agent
    command: gateway run
    restart: unless-stopped
    environment:
      - HERMES_DASHBOARD_BASIC_AUTH_USERNAME=${HERMES_DASHBOARD_BASIC_AUTH_USERNAME}
      - HERMES_DASHBOARD_BASIC_AUTH_PASSWORD=${HERMES_DASHBOARD_BASIC_AUTH_PASSWORD}
    volumes:
      - ~/.hermes:/opt/data
    networks: [tunnel]
  cloudflared:
    image: cloudflare/cloudflared
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    restart: unless-stopped
    networks: [tunnel]
networks:
  tunnel:
    ipam:
      config:
        - subnet: 172.30.0.0/24
```

## Options / Props

Image tags:

| Image tag | Meaning |
|---|---|
| `latest` / `stable` | The image accepted by the stable release gate |
| `main` | Development image from main-branch builds |
| `X.Y.Z` | Versioned stable image (use a digest for an exact pin) |

Dashboard environment variables (`HERMES_DASHBOARD=1` brings up the supervised dashboard):

| Environment variable | Description | Default |
|---------------------|-------------|---------|
| `HERMES_DASHBOARD` | `1` / `true` / `yes` enables the supervised dashboard service | unset (stays down) |
| `HERMES_DASHBOARD_HOST` | Bind address | `0.0.0.0` |
| `HERMES_DASHBOARD_PORT` | Port | `9119` |
| `HERMES_DASHBOARD_INSECURE` | Deprecated no-op; a non-loopback bind always requires an auth provider | ignored |

Persistent `/opt/data` contents: `.env`, `config.yaml`, `SOUL.md`, `sessions/`, `memories/`, `skills/`, `home/` (per-profile HOME for tool subprocesses), `cron/`, `hooks/`, `logs/`, `skins/`.

Other variables mentioned: `API_SERVER_ENABLED`, `API_SERVER_HOST`, `API_SERVER_KEY` (min 8 chars), `API_SERVER_PORT` (per profile `.env`), `HERMES_GATEWAY_NO_SUPERVISE=1` (or `--no-supervise`), `HERMES_UID` / `HERMES_GID` (aliases `PUID` / `PGID`), `HERMES_HOME_MODE`, `HERMES_DOCKER_EXEC_AS_ROOT=1`, `HERMES_ALLOW_ROOT_GATEWAY=1`, `HERMES_SKIP_CONFIG_MIGRATION=1`.

## Notes

- Adapted from the official docs: the Compose example gained `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` / `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` for the `hermes` service, because a non-loopback Webapp refuses to start without an auth provider.
- Inside the image `gateway run` is supervised by s6-overlay (auto-restart; dashboard supervised alongside). Each profile gets an s6 slot `gateway-<name>` under `/run/hermes-service/`; one container hosting all profiles is the recommended layout. State is restored from each profile's `gateway_state.json`; only an explicit `hermes gateway stop` keeps a gateway down across restarts.
- Per-profile lifecycle:

```sh
docker exec hermes hermes profile create coder
docker exec hermes hermes -p coder gateway start
docker exec hermes hermes -p coder gateway status
docker exec hermes hermes profile delete coder
```

- Dashboard auth gate: engages when the bind is non-loopback and a `DashboardAuthProvider` is registered (username/password via `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` + `_PASSWORD` for trusted networks; OAuth via `HERMES_DASHBOARD_OAUTH_CLIENT_ID`; self-hosted OIDC via `HERMES_DASHBOARD_OIDC_ISSUER` + `HERMES_DASHBOARD_OIDC_CLIENT_ID`). With no provider the dashboard fails closed at startup. Behind a reverse proxy set `dashboard.public_url` and `dashboard.trusted_proxies` (unbounded `*`, `0.0.0.0/0`, `::/0` are rejected).
- Webapp in a container: keep `webapp.host: 0.0.0.0` (the default `127.0.0.1` is the container's own loopback, which neither a published port nor another container's proxy can reach; a proxy gets a 502 Bad Gateway; `hermes webapp --status` still reports `Serving at http://127.0.0.1:9120`). A non-loopback host needs one of the dashboard auth providers and refuses to start without one. Without `public_url`, links printed by `hermes webapp` use the container's own address, and behind a TLS-terminating proxy the sign-in callback would be built as `http://`. `dashboard.trusted_proxies` (shared by the Webapp listener) takes the proxy's exact IP or a bounded CIDR; `*`, `0.0.0.0/0` and `::/0` are rejected. Cloudflare Tunnel needs no published port; give its public hostname the service `http://hermes:9120`.
- Webapp next to the dashboard (port 9119 vs 9120): `dashboard.public_url` and `webapp.public_url` are independent and the sign-in providers are shared. Nous sign-in uses one `HERMES_DASHBOARD_OAUTH_CLIENT_ID` registered with one callback, so it serves only one of the two hostnames; `hermes dashboard register --redirect-uri` updates an existing dashboard client in place (moving its callback). Native Desktop's Settings -> Web Access registers a separate Webapp client (`webapp/sign-in-registration.json`) but works only from the Desktop app on the same machine, so a headless container signs in on the other hostname with username/password.
- The TUI uses the same supervised s6 gateway as its local backend, even with no messaging platform configured: an interactive `--tui` launch starts the registered s6 gateway and waits for readiness. Named profiles attach to the root gateway; only profiles with `gateway.standalone: true` use their own slot. Client startup never installs a service or bypasses s6.
- Interactive containers (`docker run -it ... --tui` or `bash`): the entrypoint defaults to `S6_LOGGING=2` and `S6_CMD_USE_TERMINAL=1` so supervised output does not overwrite the screen; console output goes to `/run/uncaught-logs/current` (runtime storage, lost on restart/removal). Headless containers still forward service output to `docker logs`; explicit `S6_LOGGING` / `S6_CMD_USE_TERMINAL` take precedence.
- The image records Chromium's resolved executable in `/etc/hermes/chromium-executable-path` (read by Hermes when launching the browser); browser tools need shared memory (`--shm-size=1g`).
- Never run two gateway containers against the same data directory. A dashboard in a separate container requires a shared PID and network namespace (for example `network_mode: host`).
- `state.db` runs in WAL mode; bind mounts across a VM boundary (virtiofs, 9p/drvfs) can corrupt it. A fresh DB there uses rollback (`DELETE`) mode; for an existing one set `database.journal_mode: delete` or use a named volume (`-v hermes-data:/opt/data`). `hermes doctor` flags the issue.
- `/opt/hermes` is root-owned and read-only to the runtime user; mutable state belongs under `/opt/data`. The runtime user cannot apt-install; use a derived image (`FROM nousresearch/hermes-agent:latest`, `USER root`, `RUN apt-get ...`) for repeatable system dependencies.
- Overriding `entrypoint:` drops the s6 supervision tree and the zombie reaper; add `init: true` (Compose) or `docker run --init`. Browser tools need `--shm-size=1g`.
- Permission denied: set `HERMES_UID`/`HERMES_GID` (or `PUID`/`PGID`) to the bind mount's owner. `docker exec hermes <cmd>` drops to the `hermes` user (UID 10000) automatically.
- Logs: per-profile gateway tee'd to `docker logs` and `${HERMES_HOME}/logs/gateways/<profile>/current`; boot reconciler at `${HERMES_HOME}/logs/container-boot.log`; generic logs via `docker exec hermes hermes logs --follow`.
- Upgrading: `docker pull nousresearch/hermes-agent:latest`, recreate the container; config-schema migrations run automatically with timestamped backups. Browser/resource guidance: minimum 1 GB memory, 2-4 GB recommended (2 GB+ with browser tools).
- Local inference servers: on a shared Docker network use the container name as host (`base_url: http://vllm:8000/v1`); on the host use `host.docker.internal` (macOS/Windows) or `--network host` (Linux; `-p` is ignored).

```yaml
model:
  provider: custom
  model: my-model
  base_url: http://vllm:8000/v1
  api_key: "none"
```
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/docker (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- Migration (v0.22 -> v0.23): per-profile s6 gateway slots moved from `/run/service/gateway-<name>/` to `/run/hermes-service/gateway-<name>/` (including `/command/s6-svstat /run/hermes-service/gateway-<name>` and the `02-reconcile-profiles` reconciler); the image's browser path file moved from `/etc/hermes/agent-browser-executable-path` to `/etc/hermes/chromium-executable-path`.

## Related

- [profiles.md](./profiles.md)
- [multi-profile-gateways.md](./multi-profile-gateways.md)
