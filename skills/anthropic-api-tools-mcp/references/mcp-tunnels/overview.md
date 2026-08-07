<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/overview / last verified: 2026-08-07 -->

# MCP tunnels

Securely connect Claude to MCP servers running in a private network without opening inbound ports or exposing services to the public internet. Research preview, requires request access.

## Signature / Usage

```bash
curl https://api.anthropic.com/v1/messages \
  -H "anthropic-beta: mcp-client-2025-11-20" \
  -d '{
    "model": "claude-opus-5",
    "max_tokens": 1000,
    "messages": [{"role": "user", "content": "Use the hello tool to greet tunnel."}],
    "mcp_servers": [
      {"type": "url", "url": "https://echo.YOUR_TUNNEL_DOMAIN_HERE/mcp", "name": "echo"}
    ],
    "tools": [{"type": "mcp_toolset", "mcp_server_name": "echo"}]
  }'
```

## Options / Props

| Network requirement | Destination | Port / protocol | Used during |
| --- | --- | --- | --- |
| Setup component | `api.anthropic.com` | 443 TCP | Provisioning and token rotation |
| cloudflared | Tunnel edge (`198.41.192.0/19`, `2606:4700:a0::/44`) | 7844 TCP and UDP | Runtime |
| Proxy | Your upstream MCP servers | As configured | Runtime |

| Security layer | Protects against |
| --- | --- |
| Outer mTLS + IP validation (Anthropic ↔ transport provider) | Unauthorized clients reaching the tunnel |
| Inner TLS (Anthropic backend ↔ your proxy) | Payload inspection by transport provider/intermediary |
| OAuth on each MCP server | Unauthorized use of MCP tools by authenticated tunnel traffic |

## Notes

- Tunnel stack = two containers you run in-network: `cloudflared` (outbound-only connector) + `mcp-proxy` (terminates inner TLS, validates upstream IPs, routes by hostname).
- Each MCP server gets a hostname under your tunnel domain (`<subdomain>.<your-tunnel-domain>`); attach it to a Managed Agent session in the Console or pass it to the Messages API `mcp_servers` array.
- Runs on Cloudflare's network as a third-party transport provider (no uptime/support commitment); Cloudflare cannot read payloads but can observe egress IP, host fingerprint, connection timing/byte-volume, and the tunnel subdomain.
- Tunnels created through the Console are not available as connectors in claude.ai.
- The tunnel carries encrypted traffic but does not itself authenticate to the upstream MCP server — configure the server's own OAuth/bearer auth independently.
- This is the Claude API's MCP-consumption transport layer. Claude Code's own MCP configuration is a separate topic — see `anthropic-claude-code-extend`.

## Related

- [concepts.md](./concepts.md)
- [quickstart.md](./quickstart.md)
- [console.md](./console.md)
- MCP connector (`mcp-connector` category)
