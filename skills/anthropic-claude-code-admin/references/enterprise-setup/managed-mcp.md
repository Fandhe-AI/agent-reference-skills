<!-- source: https://code.claude.com/docs/en/managed-mcp.md / last verified: 2026-10-16 -->

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

`managedMcpServers` (provide remote servers to every user alongside their own; v2.1.259+):

```json
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

## Choose a pattern

| Pattern | What it does | Configure |
| --- | --- | --- |
| Disable MCP | No servers load except the few that load under exclusive control | `managed-mcp.json` with an empty server map |
| Fixed deployment | Every user gets the same servers and can't add others | `managed-mcp.json` with the servers you want |
| Provided servers | Every user gets the remote servers you list and keeps their own | `managedMcpServers` in managed settings |
| Approved catalog | Publish a list of approved servers; users add the ones they want, anything else is blocked | `allowedMcpServers` + `allowManagedMcpServersOnly: true` |
| Plugin servers only | Users can't add servers through `~/.claude.json` or `.mcp.json`; plugin servers still load | `strictPluginOnlyCustomization` with `mcp` in the list |
| Soft allowlist | Enforce an allowlist that users can broaden in their own settings | `allowedMcpServers` without `allowManagedMcpServersOnly` |
| Denylist only | Block known-bad servers, allow everything else | `deniedMcpServers` |
| No restrictions | Users add anything | Don't deploy any managed MCP configuration |

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `managedMcpServers` | object | Remote servers provided to every user in addition to their own; keyed by server name. Requires v2.1.259+ (earlier clients ignore it). Read only from managed settings sources (never HKCU, user/project/local settings, or embedding-host parent settings); with `managedSourcesBehavior: "merge"` every admin source contributes and the higher-ranked entry wins per name. Not read in the Desktop Code tab on a third-party deployment or in Cowork sessions |
| `managed-mcp.json` path | file | `/Library/Application Support/ClaudeCode/managed-mcp.json` (macOS), `/etc/claude-code/managed-mcp.json` (Linux/WSL), `C:\Program Files\ClaudeCode\managed-mcp.json` (Windows) |
| `allowedMcpServers` | array | Entries with `serverUrl` (supports `*` wildcards), `serverCommand` (exact array match), or `serverName` (exact, not a security control on its own) |
| `deniedMcpServers` | array | Same entry shapes as `allowedMcpServers`; always merges from every settings source and overrides allowlist matches |
| `allowManagedMcpServersOnly` | boolean | When `true`, only the managed allowlist applies; user/project allowlists are ignored (denylist still merges from all sources) |
| `allowAllClaudeAiMcps` | boolean | Loads claude.ai connectors alongside a deployed `managed-mcp.json` instead of suppressing them; read only from admin-controlled tiers (server-managed settings, MDM plist / HKLM registry, system `managed-settings.json`), no effect in user or project settings; allow/deny lists still apply to those connectors |
| `allowClaudeInChromeWithManagedMcp` | boolean | Lets the built-in Claude in Chrome server run alongside `managed-mcp.json` (blocked by default; `claude --chrome` then exits with an error naming this setting). Requires v2.1.282+; read only from device managed settings (MDM plist, HKLM registry, system `managed-settings.json`), not server-managed settings; a `deniedMcpServers` entry for `claude-in-chrome` still blocks it |
| `strictPluginOnlyCustomization` | setting | Restricts MCP servers to plugin-provided ones only when `mcp` is included in its list |

## Notes

- Deploying `managed-mcp.json` with an empty `{"mcpServers": {}}` disables MCP entirely; users see no servers in `/mcp` and `claude mcp add` fails with an enterprise-policy error.
- `managed-mcp.json` is a standalone file and cannot be delivered through server-managed settings — deploy it via MDM/GPO/fleet management or any process with administrator write access to the system path.
- `managedMcpServers` entry constraints: `type` is `http` or `sse` only (`streamable-http` accepted as an alias for `http`); `url` must be `https://` (plain `http://`, even localhost, is refused); no `command`, `args`, `env`, or `headersHelper` member; no `${VAR}` references (no expansion); server name only letters, numbers, hyphens, underscores, and no control/invisible formatting characters. Entries failing a check are dropped with a notice in `/status`, others still load. Claude Desktop has a same-named managed setting with an array shape, which Claude Code doesn't accept. Header values are readable by anyone who can read the managed settings, so use a credential issued for the whole audience or let each user sign in with OAuth.
- Provided servers: take precedence over same-named servers in local/project/user scope and over a plugin server or claude.ai connector at the same URL; load together with `managed-mcp.json` (file entry wins on a name clash); keep loading under `strictPluginOnlyCustomization` locking `mcp`; need no `allowedMcpServers` entry; `deniedMcpServers` applies (including a user's own); users can't edit or remove them (`claude mcp remove` reports they are provided by the organization) but can turn them off in `/mcp` (listed under Managed MCPs). `/mcp` and `claude mcp get` show only the host of the URL and header names without values.
- Allowlist vs `managed-mcp.json` (v2.1.259+): `allowedMcpServers` no longer filters `managed-mcp.json` servers, except servers whose definition uses `${VAR}` expansion. `deniedMcpServers` still applies. On a user's first launch of v2.1.259+, `managed-mcp.json` servers that an allowlist previously kept out start loading with no prompt or notice, so add denylist entries (or deploy per-group files) before users upgrade.
- Exclusive control loads only: the file's servers, `managedMcpServers`, in-process servers the host app registers, and the Claude in Chrome server if allowed. It blocks plugin servers, `--mcp-config` servers, and suppresses claude.ai connectors Claude Code fetches itself. With `--mcp-config` on a workstation Claude Code exits (`You cannot dynamically configure MCP servers when an enterprise MCP config is present`); in cloud sessions on a host with the file it starts with the managed servers only and warns on stderr. `--strict-mcp-config` while the file is deployed makes Claude Code exit at startup. Validate with `claude mcp list` (only managed servers) and `claude mcp add ...` (fails with the exclusive-control error).
- Reading the `allowManagedMcpServersOnly` lock and managed allowlist across managed sources requires v2.1.273+. `serverUrl` / `serverCommand` entries expand `${VAR}` from a pinned environment (v2.1.219+). Denylist `serverName` entries accept any non-empty string (e.g. `claude.ai Slack` to block a connector); allowlist `serverName` is limited to letters, numbers, hyphens, underscores. Servers skipping the allowlist: `managedMcpServers` entries, `managed-mcp.json` entries without `${VAR}` expansion, built-in servers (Claude in Chrome, `ide`), and a Claude Tag session's Slack tools; in-process `type: "sdk"` servers skip all checks.
- Never store credentials in a `managed-mcp.json` `env` block (any user on the machine can read it); use `${VAR}` expansion, OAuth/per-user headers, or `headersHelper` instead.
- A `serverName` allowlist/denylist entry matches only the user-assigned label, not the underlying server — prefer `serverUrl` or `serverCommand` for actual enforcement.
- Evaluation order: merge lists from all sources (or managed-only if `allowManagedMcpServersOnly`) → check denylist (blocks unconditionally) → check allowlist (unset = allow all, set = server type must match its corresponding key).
- `allowManagedMcpServersOnly` is distinct from `allowManagedPermissionRulesOnly`, which locks down permission rules only.

## Related

- [server-managed-settings](./server-managed-settings.md)
- [admin-setup](./admin-setup.md)
