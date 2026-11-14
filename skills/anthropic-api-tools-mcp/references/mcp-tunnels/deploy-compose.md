<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/deploy-compose / last verified: 2026-11-14 -->

# Deploy MCP tunnels with Docker Compose

Install the hardened MCP tunnel stack on a VM using Docker Compose, with or without programmatic access (Workload Identity Federation).

## Signature / Usage

```yaml
# config/mcp-proxy.yaml
listen_addr: ":8080"
tunnel_domain: ${TUNNEL_DOMAIN}
tls:
  cert_file: /data/tls.crt
  key_file: /data/tls.key
routes:
  echo: http://hello-mcp:9000
```

```bash
docker compose run --rm setup   # programmatic access only: fetch token, cert, register CA
docker compose up -d
```

## Options / Props

| Flow | Requires |
| --- | --- |
| With programmatic access | `TUNNEL_ID` (optional), `ANTHROPIC_FEDERATION_RULE_ID`, `ANTHROPIC_ORGANIZATION_ID`, `ANTHROPIC_WORKSPACE_ID` (optional), `ANTHROPIC_IDENTITY_TOKEN` |
| Without programmatic access | `TUNNEL_DOMAIN`, `TUNNEL_TOKEN` copied from Console, self-signed CA + server cert via `openssl` |

| Container | Hardening applied |
| --- | --- |
| `mcp-proxy`, `cloudflared`, `setup` | Non-root UID `65532`, `read_only: true`, `no-new-privileges`, `cap_drop: [ALL]`, images pinned by SHA-256 digest |

## Notes

- Source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/deploy-compose (fetched 2026-11-14)
- Programmatic flow: `sudo chown 65532:65532 data` first (containers run as UID `65532`); leave `TUNNEL_ID` unset to let setup create a tunnel (set `ANTHROPIC_WORKSPACE_ID=wrkspc_...` if the rule is scoped to a non-default workspace; an auto-created tunnel lands there). `setup init` writes `data/tunnel-domain` and `data/tunnel-token`; then `export TUNNEL_DOMAIN=$(sudo cat data/tunnel-domain)` and `export TUNNEL_TOKEN=$(sudo cat data/tunnel-token)`. `ANTHROPIC_IDENTITY_TOKEN` is an OIDC JWT whose audience must match the federation rule; WIF tokens last 1 hour by default, nothing to revoke. Needs an OIDC identity provider on the host (e.g. cloud VM metadata server, SPIFFE).
- Manual flow: no `setup` service. `--url http://localhost:8080` on cloudflared is required (no ingress rules are pushed in the manual flow; without it cloudflared returns 503). The proxy listens on plain WebSocket `:8080`; inner TLS happens inside it. The official hardened steps use `chmod 644 data/tls.key` so the non-root container can read the bind-mounted key; Adapted (not in the official docs): prefer `sudo chown 65532:65532 data/tls.key` and `chmod 600 data/tls.key` so the key is not world-readable.
- `routes` is a flat map subdomain -> upstream URL, not a list. `TUNNEL_TOKEN` has no default in the compose file: re-export in every fresh shell and after reboot. Multi-VM: copy `mcp-tunnel/` to each host; the same token and certs work on all replicas.
- Token rotation (programmatic): edit the integer in the setup service's `--token-version` (setup refuses to rotate if unchanged), re-mint the identity token, `docker compose run --rm setup`, re-export `TUNNEL_TOKEN`, `docker compose up -d cloudflared`.
- Renewal: `--renew-before=720h` makes `renew-cert` a no-op when more than 30 days remain (safe on a schedule). Manual renewal re-signs with the existing CA using `data/tls.ext`. The proxy polls and reloads `tls.cert_file` in either flow.

- `setup init` is idempotent over `data/`: re-running reuses the stored tunnel ID/CA and never creates a second tunnel; a new CA is generated only when `data/` is empty or `TUNNEL_ID` changed (subject to the 2-certificate cap).
- `tunnel_domain` in `mcp-proxy.yaml` is required — the proxy strips this suffix to resolve bare-subdomain `routes` keys.
- Rotate the tunnel token by incrementing `--token-version` (programmatic) or clicking "Rotate token" in Console + updating `TUNNEL_TOKEN` + restarting cloudflared (manual); update promptly since rotation invalidates the old token immediately.
- Certificate renewal: `docker compose run --rm setup renew-cert --output=dir:/data` (programmatic) or re-sign with the existing CA (manual); the proxy hot-reloads `tls.cert_file` without restart.
- This is a Claude API MCP-tunnel deployment guide, unrelated to Claude Code's MCP configuration (`anthropic-claude-code-extend`).

## Related

- [console.md](./console.md)
- [reference.md](./reference.md)
- [troubleshooting.md](./troubleshooting.md)
