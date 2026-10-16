<!-- source: https://code.claude.com/docs/en/admin-setup.md / last verified: 2026-10-16 -->

# Set up Claude Code for your organization

A decision map for administrators deploying Claude Code, covering API providers, managed settings, policy enforcement, usage monitoring, and data handling.

## Signature / Usage

Deployment decisions in order:

1. Choose your API provider (Teams/Enterprise, Console, Bedrock, Vertex/Agent Platform, Foundry)
2. Decide how settings reach devices (server-managed vs endpoint-managed)
3. Decide what to enforce (permission rules, sandboxing, MCP/plugin control, hooks, login enforcement, model restrictions)
4. Set up usage visibility (analytics dashboard, monitoring, spend controls)
5. Review data handling (data usage policy, ZDR, security)

```text
Server-managed settings (claude.ai admin console) > plist/registry policy > File-based managed settings > Windows user registry (HKCU)
```

## Options / Props

| Mechanism | Delivery | Priority | Platforms |
| --- | --- | --- | --- |
| Server-managed | claude.ai admin console, or self-hosted Claude apps gateway | Highest | All |
| plist / registry policy | macOS `com.anthropic.claudecode` plist, Windows `HKLM\SOFTWARE\Policies\ClaudeCode` | High | macOS, Windows |
| File-based managed | `managed-settings.json` at OS-specific paths | Medium | All |
| Windows user registry | `HKCU\SOFTWARE\Policies\ClaudeCode` | Lowest | Windows only |

## Decide what to enforce

Each row is a control surface with the setting keys that drive it.

| Control | What it does | Key settings |
| --- | --- | --- |
| Permission rules | Allow, ask, or deny specific tools and commands | `permissions.allow`, `permissions.deny` |
| Permission lockdown | Make managed settings the only settings source of permission rules; disable `--dangerously-skip-permissions` | `allowManagedPermissionRulesOnly`, `permissions.disableBypassPermissionsMode` |
| Starting permission mode | Choose the mode terminal sessions start in instead of the built-in starting mode, or remove auto mode | `permissions.defaultMode`, `permissions.disableAutoMode` |
| Sandboxing | OS-level filesystem and network isolation with domain allowlists | `sandbox.enabled`, `sandbox.network.allowedDomains` |
| Managed policy CLAUDE.md | Org-wide instructions loaded in every session, can't be excluded | File at the managed policy path |
| MCP server control | Restrict which MCP servers users can add or connect to, deploy a fixed set, or provide remote servers to every user alongside their own | `allowedMcpServers`, `deniedMcpServers`, `allowManagedMcpServersOnly`, `managedMcpServers`, or a deployed `managed-mcp.json` file |
| Plugin marketplace control | Restrict which marketplace sources users can add and install from, reject the CLI flags that sideload plugins/agents/MCP servers for one run, block `command` plugin sources, allowlist which marketplaces' plugins can be suggested | `strictKnownMarketplaces`, `blockedMarketplaces`, `disableSideloadFlags`, `disableCommandPluginSources`, `pluginSuggestionMarketplaces` |
| Customization lockdown | Block skills, agents, hooks, and MCP servers from user and project sources so they come only from plugins or managed settings; locking skills also stops claude.ai-enabled skills from syncing | `strictPluginOnlyCustomization` |
| Disable claude.ai sync | Stop loading skills and plugins developers enable on claude.ai. If Skills is turned off for the org on claude.ai, Claude Code stops syncing both, and on v2.1.273+ also removes ones already synced; to stop either without turning Skills off, set its key to `false` in managed settings | `syncClaudeAiSkills`, `syncClaudeAiPlugins` |
| Hook restrictions | Restrict which hooks run and restrict HTTP hook URLs | `allowManagedHooksOnly`, `allowedHttpHookUrls` |
| Login enforcement | Restrict login to a specific method or Anthropic organization (organization checked for claude.ai logins, not for Console logins or gateway sign-in); sessions authenticated by `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, or `apiKeyHelper` are blocked at startup when set. Before v2.1.212 only terminal logins applied either key | `forceLoginMethod`, `forceLoginOrgUUID` |
| Provider restrictions | Limit which API providers a machine may use; a session on an unlisted provider is refused at startup, at login, and on its next API contact. Requires v2.1.285+ | `allowedProviders` |
| Disable agent view | Turn off `claude agents`, `--bg`, `/background`, and the on-demand supervisor | `disableAgentView` |
| Corporate launcher | Prefix the background-agent supervisor, its workers, and other covered background processes with a required launcher instead of turning agent view off | `processWrapper` |
| Model restrictions | `availableModels` filters the picker; adding `enforceAvailableModels` also constrains the auto-selected default model | `availableModels`, `enforceAvailableModels` |
| Effort cap | Cap the effort level for every model or per model, on every provider | `maxEffortLevel` |
| Version floor | Prevent auto-update from installing below an org-wide minimum | `minimumVersion` |
| Required version range | Refuse to start when the running version is outside an approved range; stronger than `minimumVersion`, which only blocks downgrades | `requiredMinimumVersion`, `requiredMaximumVersion` |
| Telemetry opt-out | Turn off Anthropic-bound usage metrics, error reports, and surveys on every device | `env` with `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` set to `1` |

Members who sign in through claude.ai or the Anthropic API on a Claude Enterprise plan can also be governed from organization admin settings (organization model restrictions, default model, effort limits — enforced server-side); none of these reach sessions on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or Claude Platform on AWS, where managed settings (`availableModels`, `model`, `maxEffortLevel`) apply instead.

## Notes

- Managed values take precedence over user/project settings apart from documented precedence exceptions (`fallbackModel`, `availableModels`, and `modelPicker` replace rather than merge).
- Delivery details (per-OS mechanisms, precedence within the managed tier, verification) are on the managed-settings page.
- Mixed providers: configure server-managed settings for claude.ai users plus a file-based or plist/registry fallback so other users still receive managed policy. Bedrock / Agent Platform / Foundry deployments can get remote delivery by running a Claude apps gateway. The plist and HKLM locations resist tampering (admin to write); HKCU is writable without elevation, so treat it as a convenience default, not an enforcement channel.
- WSL sessions in Claude Code Desktop (Windows): the session's Claude Code process runs inside the WSL 2 distribution, so Windows-only sources don't reach it unless `wslInheritsWindowsSettings: true` is deployed. Desktop turns WSL sessions off by default on devices it detects as organization-managed (e.g. `C:\Program Files\ClaudeCode\managed-settings.json` exists); to turn them on deploy `disableWslSessions` under `HKLM\SOFTWARE\Policies\Claude` as `REG_SZ` `false` or `REG_DWORD` `0` (requires Claude Desktop v1.19367.0+; a value under HKCU doesn't enable it; separate from the `ClaudeCode` key).
- Connected GitHub accounts: on Team and Enterprise plans, Organization settings > Git providers lists GitHub organizations/accounts linked through the Claude GitHub App (shared by Claude Code, Claude Tag, and Claude Security); an admin or a member can link an account; unlink with "Unlink from this workspace" (the app stays installed on GitHub). Enterprise Compliance API activity types: `github_app_installation_linked` / `github_app_installation_unlinked`.
- Data handling review includes a HIPAA configuration row: for Claude for Enterprise organizations with HIPAA enabled, some Claude Code (local mode) features are turned off and others off by default. Sessions that go through a gateway aren't eligible for the HIPAA configuration.
- Array settings like `permissions.allow`/`permissions.deny` merge across sources; developers can extend but not remove managed entries.
- A configured `policyHelper` preempts all four managed-settings sources; its output becomes the only managed configuration for the run.
- WSL by default reads only the Linux file path (`/etc/claude-code`); `wslInheritsWindowsSettings: true` extends Windows registry/file policy to WSL.
- Verify with `/status` — on the Status tab the `Setting sources` line shows `Enterprise managed settings (<source>)`, where the source is `(remote)`, `(plist)`, `(HKLM)`, `(HKCU)`, or `(file)`.

## Related

- [managed-settings](./managed-settings.md)
- [hipaa-setup](../permissions-security/hipaa-setup.md)
- [server-managed-settings](./server-managed-settings.md)
- [network-config](./network-config.md)
- [authentication](./authentication.md)
