# Self-Hosting

Running the Inngest server on your own infrastructure using the Inngest CLI binary with SQLite/PostgreSQL and in-memory/external Redis.

## Signature / Usage

```bash
# Docker (starts on port 8288 for API/dashboard, 8289 for Connect gateway)
docker run -p 8288:8288 -p 8289:8289 \
  -e INNGEST_EVENT_KEY=your-hex-event-key \
  -e INNGEST_SIGNING_KEY=your-hex-signing-key \
  inngest/inngest inngest start

# npm global install
npm install -g inngest-cli
inngest start --event-key <KEY> --signing-key <KEY>

# curl installer
curl -sfL https://cli.inngest.com/install.sh | sh
inngest start --event-key <KEY> --signing-key <KEY>
```

```bash
# App SDK — point to self-hosted server
INNGEST_DEV=0
INNGEST_BASE_URL=http://localhost:8288
INNGEST_EVENT_KEY=<your-key>
INNGEST_SIGNING_KEY=<your-key>
```

## Options / Props

| Setting | Description |
|---------|-------------|
| `--event-key` | Event key (must be a hex string with even character count) |
| `--signing-key` | Signing key (must be a hex string with even character count) |
| `--redis-uri` | External Redis URI for improved multi-process performance |
| `--postgres-uri` | PostgreSQL URI to replace the default SQLite storage |
| `--host` | Server host (default: `localhost`) |
| `--port` | API/dashboard port (default: `8288`) |

Configuration can also be provided via environment variables (prefix `INNGEST_`, convert hyphens to underscores) or YAML/JSON/TOML config files.

## Notes

- Self-hosting is supported from Inngest CLI v1.0+
- Default storage: SQLite; default queue/state: in-memory Redis — suitable for single-process deployments
- Use external Redis (`--redis-uri`) and PostgreSQL (`--postgres-uri`) for multi-node or production-scale deployments
- Kubernetes/Helm chart available for production-ready deployments with autoscaling, security policies, and ingress
- Docker Compose example in the official docs bundles Postgres and Redis services for quick local production simulation
- Prometheus metrics exposed at `GET /metrics`; enable per-function counters with `INNGEST_EXPERIMENTAL_PROM_METRICS=1`
- Connect gateway runs on port 8289; ensure this port is accessible when using the Connect (workers) API
- Custom gateway URL for Connect can be specified via the `gatewayUrl` parameter in the SDK
- Inngest support does not guarantee direct support for self-hosted instances; enterprise options available for dedicated support

## Related

- [Dev Server](./dev-server.md)
- [Connect (Workers)](./connect.md)
- [Environment Variables](./environment-variables.md)
- [Prometheus Metrics](./prometheus-metrics.md)
