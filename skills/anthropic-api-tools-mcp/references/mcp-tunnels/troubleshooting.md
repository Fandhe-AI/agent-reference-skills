<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/troubleshooting / last verified: 2026-08-07 -->

# Troubleshoot MCP tunnels

Diagnose connectivity, TLS, IP validation, and OAuth routing issues, layer by layer: outbound connection to the tunnel edge, inner TLS to the proxy, then routing/IP validation toward the upstream.

## Signature / Usage

```yaml
# Fix: proxy rejects legitimate in-cluster upstream ("not a private address")
upstream:
  allowed_ips:
    - 10.0.0.0/8
    - 172.16.0.0/12
    - 192.168.0.0/16
    - 127.0.0.0/8   # loopback, local testing only
```

## Options / Props

| Symptom | Cause | Fix |
| --- | --- | --- |
| Tunnel missing from `+ MCP Server` picker | No active certificate, or wrong workspace | Register a CA cert / open session in the tunnel's workspace |
| HTTP 500; cloudflared logs `No ingress rules were defined` | cloudflared has no local target | Add `--url http://localhost:8080` + `network_mode: "service:mcp-proxy"` |
| Proxy logs `no route for host` | `tunnel_domain` mismatch or config not reloaded | Match exact domain, restart proxy |
| Proxy logs `IP validation failed: <ip> is not a private address` | Upstream resolves outside RFC1918 | Add narrowest covering CIDR to `upstream.allowed_ips` |
| `cannot unmarshal !!seq into map[string]string` | `routes` written as a YAML list | Use `routes: { name: http://host:port }` |
| `open /data/tls.key: permission denied` | Key is `0600`, proxy runs non-root | `chmod 644 data/tls.key` |

## Notes

- OAuth behind a source-IP allowlist: split discovery so `/authorize` stays on your existing public hostname while `/token`, `/register`, and discovery docs route through the tunnel.
- Setup component auth failures follow the general WIF troubleshooting flow (subject/audience/issuer/JWKS/lifetime); a `403` after successful exchange means missing `workspace:manage_tunnels` scope or the service account isn't a workspace member.
- Avoid `0.0.0.0/0` in `upstream.allowed_ips` outside local testing — it disables SSRF protection entirely.
- This is Claude API MCP-tunnel troubleshooting, unrelated to Claude Code's MCP configuration (`anthropic-claude-code-extend`).

## Related

- [reference.md](./reference.md)
- [security.md](./security.md)
