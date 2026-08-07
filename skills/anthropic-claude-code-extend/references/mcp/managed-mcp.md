<!-- source: https://code.claude.com/docs/en/managed-mcp.md / last verified: 2026-08-07 -->

# Control MCP server access for your organization

Restrict which MCP servers users can add or connect to with managed configuration files, allowlists, and denylists.

## Signature / Usage

```json
// managed-mcp.json — deploy at a system path for exclusive control
{
  "mcpServers": {
    "github": { "type": "http", "url": "https://api.githubcopilot.com/mcp/" },
    "sentry": { "type": "http", "url": "https://mcp.sentry.dev/mcp" }
  }
}
```

```json
// managed-settings.json — allowlist pattern
{
  "allowManagedMcpServersOnly": true,
  "allowedMcpServers": [
    { "serverUrl": "https://api.githubcopilot.com/*" },
    { "serverUrl": "https://*.internal.example.com/*" }
  ],
  "deniedMcpServers": [
    { "serverName": "dangerous-server" }
  ]
}
```

## Options / Props

| Pattern | What it does | Configure |
| --- | --- | --- |
| Disable MCP | No servers load anywhere | `managed-mcp.json` with `{"mcpServers": {}}` |
| Fixed deployment | Every user gets the same servers, can't add others | `managed-mcp.json` with the servers |
| Approved catalog | Users add from an approved list; anything else blocked | `allowedMcpServers` + `allowManagedMcpServersOnly: true` |
| Soft allowlist | Enforced allowlist, users can broaden in own settings | `allowedMcpServers` without the `Only` flag |
| Denylist only | Block known-bad servers, allow everything else | `deniedMcpServers` |

| `managed-mcp.json` path | Platform |
| --- | --- |
| `/Library/Application Support/ClaudeCode/managed-mcp.json` | macOS |
| `/etc/claude-code/managed-mcp.json` | Linux and WSL |
| `C:\Program Files\ClaudeCode\managed-mcp.json` | Windows |

| Match key | Matches |
| --- | --- |
| `serverUrl` | Remote server URL, exact or `*` wildcard |
| `serverCommand` | Exact command + args (all arguments, in order) |
| `serverName` | User-assigned label — not a security control by itself, exact match only |

## Notes

- This managed policy governs the Claude Code **CLI**'s own MCP server connections. It does not control the Agent SDK's MCP configuration (see anthropic-agent-sdk) or the Claude API's MCP connector / MCP tunnels (see anthropic-api-tools-mcp).
- `managed-mcp.json` is a standalone file (not deliverable via server-managed settings); any process with admin privileges (MDM, GPO, fleet tooling) can deploy it. It also suppresses claude.ai connectors unless `allowAllClaudeAiMcps: true` is set.
- Don't put credentials in `managed-mcp.json` `env` blocks (world-readable); use `${VAR}` expansion, OAuth/per-user headers, or `headersHelper` instead.
- Evaluation order: merge allow/deny lists from every settings source → check denylist (always blocks) → check allowlist (if unset, everything passes; if set, remote servers need `serverUrl` match, stdio servers need `serverCommand` match).
- When a restriction blocks an already-configured server, it silently disappears from `/mcp` and `claude mcp list` with no in-app warning — communicate blocked servers to affected users directly.
- Set `OTEL_LOG_TOOL_DETAILS=1` with OpenTelemetry export configured to record which MCP servers/tools users actually invoke.

## Related

- [Connect Claude Code to tools via MCP](./mcp.md)
- [Connect to MCP servers (quickstart)](./mcp-quickstart.md)
