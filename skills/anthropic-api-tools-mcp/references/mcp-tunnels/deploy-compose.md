<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/deploy-compose / last verified: 2026-08-07 -->

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

- `setup init` is idempotent over `data/`: re-running reuses the stored tunnel ID/CA and never creates a second tunnel; a new CA is generated only when `data/` is empty or `TUNNEL_ID` changed (subject to the 2-certificate cap).
- `tunnel_domain` in `mcp-proxy.yaml` is required — the proxy strips this suffix to resolve bare-subdomain `routes` keys.
- Rotate the tunnel token by incrementing `--token-version` (programmatic) or clicking "Rotate token" in Console + updating `TUNNEL_TOKEN` + restarting cloudflared (manual); update promptly since rotation invalidates the old token immediately.
- Certificate renewal: `docker compose run --rm setup renew-cert --output=dir:/data` (programmatic) or re-sign with the existing CA (manual); the proxy hot-reloads `tls.cert_file` without restart.
- This is a Claude API MCP-tunnel deployment guide, unrelated to Claude Code's MCP configuration (`anthropic-claude-code-extend`).

## Related

- [console.md](./console.md)
- [reference.md](./reference.md)
- [troubleshooting.md](./troubleshooting.md)
