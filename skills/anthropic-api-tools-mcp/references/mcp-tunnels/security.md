<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/security / last verified: 2026-08-07 -->

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

- Breach response order: stop stack → detach upstream servers from sessions/API calls → archive tunnel (invalidates token) → contact Anthropic → rotate downstream OAuth → review logs before restoring.
- Teardown: stop stack → archive tunnel in Console → delete stored Secrets (`kubectl delete secret mcp-tunnel mcp-tunnel-token mcp-tunnel-cert`) or `rm -rf data` (Compose).
- This is Claude API MCP-tunnel security guidance, unrelated to Claude Code's MCP configuration (`anthropic-claude-code-extend`).

## Related

- [console.md](./console.md)
- [troubleshooting.md](./troubleshooting.md)
