<!-- source: https://code.claude.com/docs/en/settings-example.md / last verified: 2026-10-17 -->

# Organization managed-settings.json

An organization's `managed-settings.json` showing the shape of the managed keys: login, models, permissions, MCP and marketplace allowlists, sandbox, minimum version, retention, and announcements.

```json managed-settings.json
{
  "forceLoginMethod": "claudeai",
  "forceLoginOrgUUID": [
    "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  ],
  "availableModels": [
    "opus",
    "sonnet"
  ],
  "enforceAvailableModels": true,
  "permissions": {
    "deny": [
      "Bash(curl *)",
      "Read(./.env)",
      "Read(./secrets/**)"
    ],
    "disableBypassPermissionsMode": "disable"
  },
  "allowManagedPermissionRulesOnly": true,
  "allowedMcpServers": [
    {
      "serverUrl": "https://api.githubcopilot.com/*"
    }
  ],
  "allowManagedMcpServersOnly": true,
  "strictKnownMarketplaces": [
    {
      "source": "github",
      "repo": "acme-corp/approved-plugins"
    }
  ],
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false,
    "network": {
      "allowedDomains": [
        "registry.npmjs.org",
        "github.com"
      ],
      "allowManagedDomainsOnly": true
    }
  },
  "requiredMinimumVersion": "2.1.150",
  "cleanupPeriodDays": 7,
  "companyAnnouncements": [
    "Welcome to Acme Corp! Review our code guidelines at docs.example.com"
  ]
}
```

## Notes

- Not a recommended policy: pick the keys that match your requirements. Replace the example organization UUID, MCP server URL, and marketplace with your own.
- Deploy as `managed-settings.json`, via MDM, or as server-managed settings from the claude.ai console. One deployed file applies to everything it reaches; server-managed settings do not support per-group policy yet.
- `allowManagedPermissionRulesOnly` ignores permission rules from user, project, and local settings; `allowManagedMcpServersOnly` makes the managed `allowedMcpServers` the only MCP allowlist.
- `allowedMcpServers` matches by `serverUrl` rather than name, since a user can name any server "github".
- `requiredMinimumVersion` is read at session start and waits for a restart when changed.
- Example from the Claude Code docs (code.claude.com) `settings-example` page.
