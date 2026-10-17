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

- Inside the image `gateway run` is supervised by s6-overlay (auto-restart; dashboard supervised alongside). Each profile gets an s6 slot `gateway-<name>`; one container hosting all profiles is the recommended layout. State is restored from each profile's `gateway_state.json`; only an explicit `hermes gateway stop` keeps a gateway down across restarts.
- Per-profile lifecycle:

```sh
docker exec hermes hermes profile create coder
docker exec hermes hermes -p coder gateway start
docker exec hermes hermes -p coder gateway status
docker exec hermes hermes profile delete coder
```

- Dashboard auth gate: engages when the bind is non-loopback and a `DashboardAuthProvider` is registered (username/password via `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` + `_PASSWORD` for trusted networks; OAuth via `HERMES_DASHBOARD_OAUTH_CLIENT_ID`; self-hosted OIDC via `HERMES_DASHBOARD_OIDC_ISSUER` + `HERMES_DASHBOARD_OIDC_CLIENT_ID`). With no provider the dashboard fails closed at startup. Behind a reverse proxy set `dashboard.public_url` and `dashboard.trusted_proxies` (unbounded `*`, `0.0.0.0/0`, `::/0` are rejected).
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
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/docker (pinned to v0.22.2)

## Related

- [profiles.md](./profiles.md)
- [multi-profile-gateways.md](./multi-profile-gateways.md)
