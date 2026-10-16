<!-- source: https://code.claude.com/docs/en/managed-settings.md / last verified: 2026-10-16 -->

# Deploy managed settings

Deploy managed settings to every developer's machine: delivery mechanisms per OS, how Claude Code combines managed sources, and how to verify enforcement. Claude Code applies them above every other level, so no user, project, local, or `--settings` value overrides them, apart from a few security-sensitive exceptions where a stricter lower-level value still counts.

## Signature / Usage

Save `managed-settings.json` in the system directory for the OS:

- **macOS**: `/Library/Application Support/ClaudeCode/managed-settings.json`
- **Linux and WSL**: `/etc/claude-code/managed-settings.json`
- **Windows**: `C:\Program Files\ClaudeCode\managed-settings.json`

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./secrets/**)"
    ],
    "disableBypassPermissionsMode": "disable"
  },
  "allowManagedPermissionRulesOnly": true
}
```

Confirm on one machine with `/status`: the `Setting sources` line shows `Enterprise managed settings (file)`.

## Options / Props

Delivery mechanisms (all carry the same policy keys as `settings.json`):

| Mechanism | How you deliver it | When Claude Code reads it |
| --- | --- | --- |
| Server-managed settings | claude.ai admin console, or a self-hosted Claude apps gateway | Fetched at startup and polled hourly |
| MDM or OS-level policy | macOS configuration profile or Windows `HKLM` registry value (Jamf, Intune, Group Policy) | Read at startup, checked for changes every 30 minutes |
| File-based | `managed-settings.json` in a system directory | Read at startup, reloaded when a file changes |
| HKCU registry (Windows and WSL) | Windows `HKCU` registry value | Read at startup, checked every 30 minutes; used only when no admin document is present above it and no host-supplied parent settings supply a restrictive key |

Where each mechanism stores the policy:

| Mechanism | Location |
| --- | --- |
| macOS configuration profile | `com.anthropic.claudecode` managed preferences domain (same top-level keys; nested settings as dictionaries, lists as plist arrays) |
| Windows HKLM registry | JSON as `REG_SZ` / `REG_EXPAND_SZ` value `Settings` under `HKLM\SOFTWARE\Policies\ClaudeCode` |
| File-based | `managed-settings.json`, optional `managed-settings.d/`, and `managed-mcp.json` in the system directory |
| Windows HKCU registry | Same `Settings` value under `HKCU\SOFTWARE\Policies\ClaudeCode` |

Managed source priority (highest first):

| # | Source |
| --- | --- |
| 1 | Remote settings (server-managed settings or Claude apps gateway) |
| 2 | MDM or OS-level policies (macOS plist or HKLM registry key) |
| 3 | Managed settings files (`managed-settings.d/*.json` and `managed-settings.json` merged) |
| 4 | HKCU registry (Windows; WSL when `wslInheritsWindowsSettings` is on and the HKCU value also sets it) |

`managedSourcesBehavior`:

| Value | Behavior |
| --- | --- |
| `"first-wins"` (default) | Uses the highest-ranked source that delivers at least one policy key; ignores the rest apart from keys read from every admin source |
| `"merge"` | Applies every admin source that delivers a policy key, combined by kind of key (lists union, locks take the strictest value). Requires Claude Code v2.1.242 or later |

Drop-in merge rules for `managed-settings.d/` (`managed-settings.json` first, then `*.json` alphabetically; hidden and non-`.json` files ignored):

| Kind | Rule |
| --- | --- |
| Single values | Later file replaces earlier |
| Lists (`permissions.deny`, `sandbox.network.allowedDomains`) | Combined, duplicates removed |
| Nested blocks (`env`, `sandbox`) | Merged key by key |
| `fallbackModel`, `modelPicker` | Later value replaces earlier whole |
| `extraKnownMarketplaces`, `managedMcpServers` | Later entry with the same name replaces earlier whole |

`/status` `Setting sources` labels: `(remote)`, `(plist)`, `(HKLM)`, `(file)`, `(drop-ins)`, `(file + drop-ins)`, `(remote + file, merged)`, `(HKCU)`, `(parent process)`, `(helper)`. A `Skipped sources` line names sources found but not selected (v2.1.242+).

Keys only a managed source can set (excerpt): `allowAllClaudeAiMcps`, `allowedChannelPlugins`, `allowManagedHooksOnly`, `allowManagedMcpServersOnly`, `allowManagedPermissionRulesOnly`, `blockedMarketplaces`, `channelsEnabled`, `disableCommandPluginSources`, `disableSideloadFlags`, `forceRemoteSettingsRefresh`, `managedMcpServers`, `managedSourcesBehavior`, `parentSettingsBehavior`, `pluginSuggestionMarketplaces`, `pluginTrustMessage`, `policyHelper`, `sandbox.filesystem.allowManagedReadPathsOnly`, `sandbox.network.allowManagedDomainsOnly`, `strictKnownMarketplaces`, `strictPluginOnlyCustomization`, `wslInheritsWindowsSettings`.

Turn telemetry off for the organization via the managed `env` block:

```json
{
  "env": {
    "DISABLE_TELEMETRY": "1"
  }
}
```

## Notes

- Claude Code does not read the legacy Windows path `C:\ProgramData\ClaudeCode\managed-settings.json`.
- Cloud sessions in Anthropic-hosted environments do not read a device's MDM profile or file; policy for them must come from server-managed settings. Cowork sessions never fetch server-managed settings from the claude.ai console.
- Some keys are read from every admin source regardless of `managedSourcesBehavior`: sandbox locks (`sandbox.network.allowManagedDomainsOnly`, `sandbox.filesystem.allowManagedReadPathsOnly`), `allowAllClaudeAiMcps`, `allowManagedMcpServersOnly` (v2.1.273+), `forceRemoteSettingsRefresh`, per-variable `env` merge (v2.1.223+), `maxEffortLevel` (v2.1.267+), and others.
- A `policyHelper` that emits a `managedSettings` object makes that object the only managed settings for the session.
- Parent settings from an embedding host (Claude Desktop, IDE extension, Agent SDK `managedSettings` option) are ignored by default when an admin source is present; set `parentSettingsBehavior` to `"merge"` in the highest-priority managed source to keep the host's restrictive values.
- With `allowManagedPermissionRulesOnly`, Cowork folder access allow rules must be added to the selected managed source (for example `"Edit(~/CoworkProjects/**)"`).
- A managed `model` and `autoCompactWindow` are defaults, not locks; deploy `availableModels` to restrict model choice.
- A managed file, drop-in, MDM plist, or HKLM value that is present but not a parseable JSON object makes Claude Code refuse to start. Invalid individual entries are repaired or dropped with a warning (visible in a startup dialog, `-p` stderr, or `claude doctor`). Keys with a single restrictive value fail closed (v2.1.282+); per-field `sandbox` handling requires v2.1.283+.
- `requiredMinimumVersion` and `requiredMaximumVersion` fail open: an invalid value is dropped.
- Starter MDM templates (Jamf, Iru, Intune, Group Policy) are in the `anthropics/claude-code` repository under `examples/mdm`.

## Related

- [admin-setup](./admin-setup.md)
- [server-managed-settings](./server-managed-settings.md)
- [managed-mcp](./managed-mcp.md)
