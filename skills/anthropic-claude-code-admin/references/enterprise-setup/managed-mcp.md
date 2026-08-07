<!-- source: https://code.claude.com/docs/en/managed-mcp.md / last verified: 2026-08-07 -->

# Control MCP server access for your organization

Restrict which MCP servers users can add or connect to with managed configuration files, allowlists, and denylists.

## Signature / Usage

`managed-mcp.json` (exclusive control — deploy a fixed server set, format matches project `.mcp.json`):

```json
{
  "mcpServers": {
    "github": { "type": "http", "url": "https://api.githubcopilot.com/mcp/" },
    "company-internal": {
      "type": "stdio",
      "command": "/usr/local/bin/company-mcp-server",
      "args": ["--config", "/etc/company/mcp-config.json"]
    }
  }
}
```

Allowlist/denylist (policy-based control, in any managed settings source):

```json
{
  "allowManagedMcpServersOnly": true,
  "allowedMcpServers": [
    { "serverUrl": "https://api.githubcopilot.com/*" },
    { "serverCommand": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "."] }
  ],
  "deniedMcpServers": [
    { "serverName": "dangerous-server" }
  ]
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `managed-mcp.json` path | file | `/Library/Application Support/ClaudeCode/managed-mcp.json` (macOS), `/etc/claude-code/managed-mcp.json` (Linux/WSL), `C:\Program Files\ClaudeCode\managed-mcp.json` (Windows) |
| `allowedMcpServers` | array | Entries with `serverUrl` (supports `*` wildcards), `serverCommand` (exact array match), or `serverName` (exact, not a security control on its own) |
| `deniedMcpServers` | array | Same entry shapes as `allowedMcpServers`; always merges from every settings source and overrides allowlist matches |
| `allowManagedMcpServersOnly` | boolean | When `true`, only the managed allowlist applies; user/project allowlists are ignored (denylist still merges from all sources) |
| `allowAllClaudeAiMcps` | boolean | Loads claude.ai connectors alongside a deployed `managed-mcp.json` instead of suppressing them (requires v2.1.149+; managed settings sources only) |
| `strictPluginOnlyCustomization` | setting | Restricts MCP servers to plugin-provided ones only when `mcp` is included in its list |

## Notes

- Deploying `managed-mcp.json` with an empty `{"mcpServers": {}}` disables MCP entirely; users see no servers in `/mcp` and `claude mcp add` fails with an enterprise-policy error.
- `managed-mcp.json` is a standalone file and cannot be delivered through server-managed settings — deploy it via MDM/GPO/fleet management or any process with administrator write access to the system path.
- Never store credentials in a `managed-mcp.json` `env` block (any user on the machine can read it); use `${VAR}` expansion, OAuth/per-user headers, or `headersHelper` instead.
- A `serverName` allowlist/denylist entry matches only the user-assigned label, not the underlying server — prefer `serverUrl` or `serverCommand` for actual enforcement.
- Evaluation order: merge lists from all sources (or managed-only if `allowManagedMcpServersOnly`) → check denylist (blocks unconditionally) → check allowlist (unset = allow all, set = server type must match its corresponding key).
- `allowManagedMcpServersOnly` is distinct from `allowManagedPermissionRulesOnly`, which locks down permission rules only.

## Related

- [server-managed-settings](./server-managed-settings.md)
- [admin-setup](./admin-setup.md)
