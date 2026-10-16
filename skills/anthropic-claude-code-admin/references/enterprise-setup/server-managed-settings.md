<!-- source: https://code.claude.com/docs/en/server-managed-settings.md / last verified: 2026-10-16 -->

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

- Not available for third-party providers (Bedrock, Vertex/Agent Platform, Foundry, Claude Platform on AWS, custom `ANTHROPIC_BASE_URL`) — exporting a `CLAUDE_CODE_USE_*` var or non-default `ANTHROPIC_BASE_URL` in the shell skips the settings fetch entirely. For these providers a self-hosted Claude apps gateway provides the equivalent remote delivery (gateway-signed-in clients fetch from the gateway; a gateway client that can't reach it exits at startup instead of using the cache; the hourly background refresh is fail-open on both channels).
- Platform availability: delivery requires a direct connection to `api.anthropic.com` and a Team/Enterprise OAuth login, `CLAUDE_CODE_OAUTH_TOKEN`, a directly configured API key, or a `user_oauth` Anthropic profile (v2.1.257+, unless the profile sets a non-Anthropic `base_url`). Keys from an `apiKeyHelper` and Workload Identity Federation credentials don't trigger the fetch. A Console API key belongs to a separate Console organization, so claude.ai settings don't reach it. Cowork sessions in Claude Desktop don't fetch server-managed settings.
- Precedence: server-managed settings are checked before endpoint-managed settings; sources don't merge except for cross-source lock keys, the per-key `env` block merge (requires v2.1.223+; the telemetry `OTEL_*` unit and credential-paired routing variables follow the winning source as a unit), `allowedProviders` (a machine list and a server-managed list combine; v2.1.285+), and per-key exceptions. Claude Code never reads `forceLoginGatewayUrl`, `gatewayInternalNetworks`, or the `"gateway"` value of `forceLoginMethod` from server-managed settings.
- Cached `env` values for proxy/TLS, API routing/provider selection, auth credentials, and `CLAUDE_CONFIG_DIR` are withheld until the server confirms the payload each session (v2.1.198+); from v2.1.223 this includes Workload Identity Federation variables and the `ANTHROPIC_PROFILE` / `ANTHROPIC_CONFIG_DIR` selectors and OS directory variables (`HOME`, `XDG_CONFIG_HOME`, `APPDATA`, `USERPROFILE`), which Claude Code reads only at startup, so deliver those selectors via endpoint-managed settings. A cached `modelPricing` and a cached `managedMcpServers` (v2.1.259+) likewise apply only after the session's fetch confirms the payload; Claude Code waits up to 30 seconds for that fetch before connecting MCP servers.
- Security approval dialogs: shell command settings (`apiKeyHelper`, `statusLine`, `otelHeadersHelper`), sandbox binary settings (`sandbox.bwrapPath`, `socatPath`, `ripgrep`), sandbox network/isolation settings (e.g. `sandbox.network.tlsTerminate`, `httpProxyPort`, `socksProxyPort`, `sandbox.credentials` unless deny-only, `allowAppleEvents`, `enableWeakerNestedSandbox`, `enableWeakerNetworkIsolation`, `filesystem.disabled`, `allowAllUnixSockets`, `allowUnixSockets`, `allowMachLookup`; approval required since v2.1.251), custom env vars needing approval (non-empty proxy, base-URL or `OTEL_EXPORTER_OTLP_ENDPOINT` values always), and hook configurations trigger a dialog the user must accept (rejecting exits Claude Code). A managed CLAUDE.md delivered through the `claudeMd` key does NOT require approval (v2.1.260+; before that it did).
- Approval is judged by delivered value for some variables: the four privacy toggles (`CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, `DISABLE_ERROR_REPORTING`, `DISABLE_TELEMETRY`, `DO_NOT_TRACK`) and `API_FORCE_IDLE_TIMEOUT` (v2.1.248+) apply without approval when truthy; `ANTHROPIC_CUSTOM_HEADERS` lines naming a credential, org/tenant selector, routing/host override, or API-behavior header need approval (v2.1.251+).
- Non-interactive runs (`claude -p`, Agent SDK, VS Code chat panel, desktop Code tab) can't show the dialog, so they apply the delivered settings for that run only without recording approval (v2.1.207+); `claude install` / `claude update` run with the last-approved settings (v2.1.246+); an interactive session that can't show the dialog keeps the last-approved settings (v2.1.211+).
- Invalid entries: Claude Code applies every remaining valid setting and surfaces a validation error (v2.1.169+); the approval dialog evaluates the salvaged payload. If every setting fails validation and none falls back to a stricter value, nothing is applied and the cache is unchanged.
- Verify delivery: `claude doctor` shows a `Managed settings (remote)` line (v2.1.248+) with one of four outcomes: delivered settings loaded; no server-managed settings configured; fetch failed (with cause and whether a cached policy applies); fetch skipped (with reason). `/status` shows the line after a failed fetch.
- Audit events for settings changes are available through the compliance API or audit log export (contact your Anthropic account team). Server-managed settings are a client-side control, not a security boundary.
- A configured `policyHelper` preempts every other managed source including server-managed settings; `policyHelper` and `wslInheritsWindowsSettings` are OS-level-only and not honored when delivered here.
- A `managed-mcp.json` file can't be distributed through server-managed settings; deliver `allowedMcpServers` / `deniedMcpServers` instead. On v2.1.259+ you can also provide remote servers with `managedMcpServers` (`http` and `sse` only; doesn't take exclusive control like the file). A `managed-mcp.json` deployed at its system path still applies.

## Related

- [admin-setup](./admin-setup.md)
- [managed-settings](./managed-settings.md)
- [authentication](./authentication.md)
