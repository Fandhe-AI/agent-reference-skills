<!-- source: https://code.claude.com/docs/en/server-managed-settings.md / last verified: 2026-08-07 -->

# Configure server-managed settings

Centrally configure Claude Code for your organization through server-delivered settings, without requiring device management infrastructure.

## Signature / Usage

Configured at **Admin Settings > Claude Code > Managed settings** (`https://claude.ai/admin-settings/claude-code`) as JSON:

```json
{
  "permissions": {
    "deny": ["Bash(curl *)", "Read(./.env)", "Read(./secrets/**)"],
    "disableBypassPermissionsMode": "disable"
  },
  "allowManagedPermissionRulesOnly": true
}
```

```json
{
  "forceRemoteSettingsRefresh": true
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Requirements | — | Claude for Teams/Enterprise plan, Owner/Primary Owner role, network access to `api.anthropic.com` |
| `forceRemoteSettingsRefresh` | boolean | Block startup until remote settings freshly fetched; exits on fetch failure |
| Fetch cadence | — | Fetched at startup, polled hourly during active sessions |
| Access control | — | Only Primary Owner / Owner roles can view or edit |

## Notes

- Not available for third-party providers (Bedrock, Vertex/Agent Platform, Foundry, Claude Platform on AWS, custom `ANTHROPIC_BASE_URL`) — exporting a `CLAUDE_CODE_USE_*` var or non-default `ANTHROPIC_BASE_URL` in the shell skips the settings fetch entirely.
- Precedence: server-managed settings are checked before endpoint-managed settings; sources don't merge except for cross-source lock keys and the per-key `env` block merge (requires v2.1.223+).
- Cached `env` values for proxy/TLS, API routing/provider selection, and auth credentials are withheld until the server confirms the payload each session (v2.1.198+), to prevent a cached value from redirecting the confirming fetch itself.
- Shell command settings, custom env vars needing approval, hook configurations, and managed CLAUDE.md content trigger a security approval dialog the user must accept.
- A configured `policyHelper` preempts every other managed source including server-managed settings.
- A `managed-mcp.json` file can't be distributed through server-managed settings; use `allowedMcpServers`/`deniedMcpServers` policy keys instead.

## Related

- [admin-setup](./admin-setup.md)
- [authentication](./authentication.md)
