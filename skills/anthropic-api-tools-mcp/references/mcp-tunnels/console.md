<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/console / last verified: 2026-11-14 -->

# Manage tunnels in the Console

Create tunnels, register CA certificates, retrieve the tunnel token, and attach tunneled MCP servers to agents from the Claude Console.

## Signature / Usage

```text
MCP tunnels page (platform.claude.com/settings/workspaces/default/mcp-tunnels) > New tunnel
  -> select the workspace in the sidebar picker first (tunnels are workspace-scoped)
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

- Source: https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/console (fetched 2026-11-14)
- Deployment identifiers: tunnel ID (`tnl_...`) and domain from the detail page. Programmatic flow also needs the federation rule ID (`fdrl_...`, org-level, on the Rules tab of the Workload identity page) and the organization ID (UUID). Manual flow needs the token and a registered CA.
- Programmatic access toggle appears only if your role can manage federation rules (needs a registered OIDC issuer, a rule with `workspace:manage_tunnels`, and the rule's service account added to the tunnel's workspace; for non-default workspaces pass the workspace ID at deploy time: `api.wif.workspaceId` for Helm, `ANTHROPIC_WORKSPACE_ID` for Compose). Roles without Manage tunnels permission get read-only access.
- Certificate rotation: add the new cert beside the old (max 2 active), redeploy proxy, confirm traffic, then Revoke the old one (stays listed with a Revoked badge).
- Agent attach (Sessions > Create session > Create new agent only; the dialog can add MCP servers only to a new agent): pick tunnel, set Subdomain and Path, check "Resolves to". Tunnel does not authenticate to the upstream: use Connect / vault for OAuth or bearer. If the environment blocks MCP servers, add the "Resolves to" host to Allowed hosts under Networking and leave "Allow MCP servers" unchecked.
- Archived tunnels show under the Archived or All filter.

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
