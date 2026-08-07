<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/console / last verified: 2026-08-07 -->

# Manage tunnels in the Console

Create tunnels, register CA certificates, retrieve the tunnel token, and attach tunneled MCP servers to agents from the Claude Console.

## Signature / Usage

```text
Manage > MCP tunnels > New tunnel
  -> name the tunnel (domain auto-assigned: abcd1234.tunnel.anthropic.com)
  -> optionally toggle "Set up programmatic access" (requires WIF + federation rule with workspace:manage_tunnels)
  -> Create tunnel
```

## Options / Props

| Field (detail page) | Description |
| --- | --- |
| Domain | `abcd1234.tunnel.anthropic.com`; proxy routes are subdomains of this |
| Token | Reveal via eye icon; copy icon to copy; "Rotate token" invalidates and issues new |
| Certificates | Up to 2 active CA certs (`.pem`/`.crt`/`.cer`, ≤8 kB, no private-key material) for zero-downtime rotation |

| Prerequisite | Detail |
| --- | --- |
| MCP servers | One or more running in your private network |
| Console role | "Manage tunnels" permission (org admins/owners have it by default) |
| Auth to Tunnels API | Programmatic access (WIF, recommended) or manual (copy token by hand) |

## Notes

- Organization can have up to 10 active tunnels; creating one does not establish connectivity by itself.
- A tunnel with no active certificates cannot accept connections and does not appear in the agent's `+ MCP Server` picker.
- Every token reveal/rotation is recorded in the Compliance API activity log; rotation doesn't sever already-established cloudflared connections.
- Archiving a tunnel is immediate and permanent.
- This is Claude API MCP-tunnel console management, unrelated to Claude Code's `.claude/settings.json` MCP config (`anthropic-claude-code-extend`).

## Related

- [overview.md](./overview.md)
- [deploy-compose.md](./deploy-compose.md)
- [deploy-helm.md](./deploy-helm.md)
- [security.md](./security.md)
