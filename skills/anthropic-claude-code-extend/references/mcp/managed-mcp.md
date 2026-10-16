<!-- source: https://code.claude.com/docs/en/managed-mcp.md / last verified: 2026-10-17 -->

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
| Provided servers | Every user gets the remote servers you list and keeps their own; skips the allowlist | `managedMcpServers` in a managed settings source (server-managed settings, MDM, `managed-settings.json`, or a Claude apps gateway policy); v2.1.259+ |

```json
// managed settings — Provided servers pattern
{
  "managedMcpServers": {
    "search": { "type": "http", "url": "https://search.example.com/mcp" },
    "records": {
      "type": "http",
      "url": "https://records.example.com/mcp",
      "headers": { "X-Records-Key": "key-issued-for-all-claude-code-users" }
    }
  }
}
```

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
- `managedMcpServers` entries: `type` is `http` or `sse`, `url` must be `https://`, no `command` / `args` / `env` / `headersHelper`, no `${VAR}` references, and names use only letters, numbers, hyphens and underscores; an entry failing a check is dropped with a notice in `/status`. A provided server takes precedence over a same-named local / project / user server and over a plugin or connector at the same URL; if `managed-mcp.json` is also deployed, both load and the file's entry wins on a name clash. `deniedMcpServers` applies to provided servers; users can't remove them (`claude mcp remove` reports it) but can turn them off for themselves in `/mcp`. Claude Code reads the key only from managed sources; with `managedSourcesBehavior: "merge"` it provides the servers from every admin source (higher-ranked source's entry wins on a name clash). Desktop's same-named setting has a different (array) shape; don't copy between them.
- `--mcp-config` / `--strict-mcp-config`: both lists filter servers passed with `--mcp-config` (other than in-process `type: "sdk"`); `--strict-mcp-config` limits which configuration files load and doesn't bypass either list. Without `managed-mcp.json`, a same-named `--mcp-config` server replaces the provided one for that run and `--strict-mcp-config` leaves provided servers out; with `managed-mcp.json` deployed, `--strict-mcp-config` makes Claude Code exit at startup.
- `managed-mcp.json` blocks the built-in Claude in Chrome server by default (`claude --chrome` exits at startup); `allowClaudeInChromeWithManagedMcp: true` in the device's own managed settings (MDM plist, HKLM registry, or system `managed-settings.json`; v2.1.282+) lets it run alongside, and a `deniedMcpServers` entry for `claude-in-chrome` still blocks it.
- Servers that skip the allowlist check: every `managedMcpServers` entry and any `managed-mcp.json` entry whose values use no `${VAR}` expansion; a `managed-mcp.json` server that uses `${VAR}` expansion is still checked. The denylist applies regardless of origin.
- The anthropic-claude-code-admin skill also has a page with the same name; this page covers the MCP-focused view only.
- Don't put credentials in `managed-mcp.json` `env` blocks (world-readable); use `${VAR}` expansion, OAuth/per-user headers, or `headersHelper` instead.
- Evaluation order: merge allow/deny lists from every settings source → check denylist (always blocks) → check allowlist (if unset, everything passes; if set, remote servers need `serverUrl` match, stdio servers need `serverCommand` match).
- When a restriction blocks an already-configured server, it silently disappears from `/mcp` and `claude mcp list` with no in-app warning — communicate blocked servers to affected users directly.
- Set `OTEL_LOG_TOOL_DETAILS=1` with OpenTelemetry export configured to record which MCP servers/tools users actually invoke.

## Related

- [Connect Claude Code to tools via MCP](./mcp.md)
- [Connect to MCP servers (quickstart)](./mcp-quickstart.md)
