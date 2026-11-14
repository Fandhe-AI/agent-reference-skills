<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/quickstart / last verified: 2026-11-14 -->

# MCP tunnels quickstart

Shortest path to a working tunnel: local Docker Compose deployment with manual credential provisioning and a sample FastMCP "hello" server.

## Signature / Usage

```yaml
# docker-compose.yaml (excerpt)
services:
  mcp-proxy:
    image: us-docker.pkg.dev/anthropic-public-registry/images/mcp-proxy@sha256:...
    volumes:
      - ./config/mcp-proxy.yaml:/etc/mcp-gateway/config.yaml:ro
      - ./data:/data:ro
  cloudflared:
    image: cloudflare/cloudflared@sha256:...
    command: tunnel --no-autoupdate run --url http://localhost:8080
    environment: [TUNNEL_TOKEN]
    network_mode: "service:mcp-proxy"
  hello-mcp:
    image: python:3.13-slim
    command: sh -c "pip install --quiet mcp && python hello_server.py"
```

## Options / Props

| Step | Action |
| --- | --- |
| 1. Create a tunnel | Console > Manage > MCP tunnels > New tunnel; copy Domain and Token |
| 2. Deployment dir | `mkdir -p mcp-tunnel/{config,data}`; export `TUNNEL_DOMAIN`, `TUNNEL_TOKEN` |
| 3. CA + server cert | `openssl` self-signed CA + server cert with SAN `*.${TUNNEL_DOMAIN}`; register `ca.crt` in Console |
| 4. Sample server | FastMCP `hello_server.py` on port 9000, `streamable-http` transport |
| 5. Proxy config + compose | `config/mcp-proxy.yaml` with `routes: {echo: http://hello-mcp:9000}` |
| 6. Start | `docker compose up -d`; verify `route configured` and `Registered tunnel connection` in logs |
| 7. Call from Claude | Managed Agents > Sessions > + MCP Server, subdomain `echo`, path `mcp` |

## Notes

- Source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/quickstart (fetched 2026-11-14)
- Each tunnel belongs to one workspace (pick it in the Console workspace picker; page `platform.claude.com/settings/workspaces/default/mcp-tunnels`). Leave "Set up programmatic access" off for this path. After registering `ca.crt` via Add certificate, the "Needs certificate" badge disappears.
- Server cert SAN covers `${TUNNEL_DOMAIN}` and `*.${TUNNEL_DOMAIN}`, `extendedKeyUsage = serverAuth`, 90-day validity; the guide also has PowerShell variants of every step.
- Expected logs: one `route configured` line for `echo` and four `Registered tunnel connection` lines (rerun if empty at first).
- If the Console warns that the environment blocks MCP servers, see the Console guide's "Use the tunnel in an agent". To swap in your own server: add it to Compose, add a route in `config/mcp-proxy.yaml`, then `docker compose restart mcp-proxy`.

- Requires Docker + Docker Compose, a Console role that can manage tunnels, and OpenSSL 1.1.1+.
- This is a local-testing path (manual credentials); production deployments use Helm or hardened Docker Compose (see deploy-helm.md / deploy-compose.md).
- This is the Claude API's MCP-tunnel setup path. Claude Code's own MCP configuration is unrelated — see `anthropic-claude-code-extend`.

## Related

- [overview.md](./overview.md)
- [deploy-compose.md](./deploy-compose.md)
- [deploy-helm.md](./deploy-helm.md)
