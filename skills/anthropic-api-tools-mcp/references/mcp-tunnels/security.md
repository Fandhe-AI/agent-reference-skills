<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/security / last verified: 2026-11-14 -->

# MCP tunnels security

Hardening best practices, breach-response steps, and tunnel teardown procedure for MCP tunnel deployments.

## Signature / Usage

```bash
# Respond to a suspected breach
helm uninstall mcp-tunnel -n mcp-tunnel   # or: docker compose down --timeout 0
# then: detach upstream MCP servers, archive the tunnel in Console,
# contact Anthropic support, rotate downstream OAuth credentials, review logs
```

## Options / Props

| Best practice | Rationale |
| --- | --- |
| Require OAuth on every MCP server | Defense in depth beyond tunnel transport auth |
| Enable SSO for your org | Enforces IdP session controls on tunnel/federation admins |
| Restrict `upstream.allowed_ips` | Primary SSRF defense for the proxy |
| Pin images by SHA-256 digest | Reproducible, auditable deployments |
| Rotate tunnel token + server cert on schedule | Limits blast radius of leaked credentials |

## Notes

- Source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/security (fetched 2026-11-14)
- Additional best practices: configure OAuth per the MCP authorization spec; monitor logs (alert on warnings, errors, unusual traffic); keep proxy images updated; limit proxy/cloudflared reach to the listed network requirements (NetworkPolicy or host firewall); limit each MCP server's tool/data scope; protect keys and tokens at rest with your secrets management.
- Archiving invalidates the tunnel token and detaches the domain; it can also be done over the API (Archive a tunnel, `endpoints/tunnels-archive.md`). Breach response uses `docker compose down --timeout 0` for Compose; routine teardown uses plain `docker compose down`.
- Compose teardown: keys and certs are in `data/`; the token is in `data/tunnel-token` (programmatic) or your shell environment (manual); `config/` and `docker-compose.yaml` hold no secrets. Helm teardown: delete whichever Secrets apply with `--ignore-not-found`.

- Breach response order: stop stack → detach upstream servers from sessions/API calls → archive tunnel (invalidates token) → contact Anthropic → rotate downstream OAuth → review logs before restoring.
- Teardown: stop stack → archive tunnel in Console → delete stored Secrets (`kubectl delete secret mcp-tunnel mcp-tunnel-token mcp-tunnel-cert`) or `rm -rf data` (Compose).
- This is Claude API MCP-tunnel security guidance, unrelated to Claude Code's MCP configuration (`anthropic-claude-code-extend`).

## Related

- [console.md](./console.md)
- [troubleshooting.md](./troubleshooting.md)
