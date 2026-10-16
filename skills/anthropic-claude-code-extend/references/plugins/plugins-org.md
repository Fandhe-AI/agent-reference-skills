<!-- source: https://code.claude.com/docs/en/plugins/org.md / last verified: 2026-10-17 -->

# Manage Claude Code plugins for your organization

Control which plugins Claude Code installs and allows across an organization through managed settings (server-managed, MDM, or `managed-settings.json`).

## Signature / Usage

```json
{
  "strictKnownMarketplaces": [
    { "source": "github", "repo": "anthropics/claude-plugins-official" },
    { "source": "github", "repo": "your-org/*" },
    { "source": "skills-dir" }
  ],
  "extraKnownMarketplaces": {
    "claude-plugins-official": {
      "source": { "source": "github", "repo": "anthropics/claude-plugins-official" }
    },
    "your-marketplace": {
      "source": { "source": "github", "repo": "your-org/your-marketplace" },
      "autoUpdate": true
    }
  },
  "enabledPlugins": {
    "code-formatter@your-marketplace": true,
    "deploy-helper@your-marketplace": true
  },
  "disableSideloadFlags": true
}
```

## Options / Props

| Key | What it enforces | What it cannot do |
| --- | --- | --- |
| `strictKnownMarketplaces` (alias `allowedMarketplaces`) | Allowlist of marketplace sources; `[]` blocks every source incl. official | Does not register marketplaces, restrict entries inside allowed marketplaces, or block `--plugin-dir` |
| `blockedMarketplaces` | Blocklist, checked before the allowlist | Does not block an already registered marketplace from a non-matching source |
| `syncClaudeAiPlugins` | `false` stops loading plugins synced from claude.ai (v2.1.273+) | Does not turn off one synced plugin; use `"<name>@synced": false` in `enabledPlugins` |
| `enabledPlugins` | `true` force-enables; `false` blocks at every scope and hides | Does not install a plugin whose marketplace is not registered or allowed |
| `disableSideloadFlags` | Rejects `--plugin-dir`, `--plugin-url`, `--agents`, SDK `plugins` option, non-SDK `--mcp-config`, `CLAUDE_CODE_PLUGIN_DIRS` | Does not restrict `.mcp.json`, `claude mcp add`, SDK servers (pair with `allowedMcpServers`) |
| `disableCommandPluginSources` | Blocks `command`-source plugins; defaults to `allowManagedHooksOnly` when unset | Other source types |
| `allowManagedHooksOnly` | Restricts which hooks run | Does not trust hooks from user-enabled plugins |
| `strictPluginOnlyCustomization` | Blocks skills, agents, hooks, MCP servers not from a plugin, managed settings, or built-ins; `true` or array of `skills` / `agents` / `hooks` / `mcp` | Does not restrict which plugins install |
| `pluginSuggestionMarketplaces` | Marketplaces whose plugins may be suggested | Does not affect built-in tips |
| `pluginTrustMessage` | Appends text to the trust warning | Does not change warning text |
| `allowedChannelPlugins` | Replaces default plugins allowed to push channel messages; needs `channelsEnabled: true` | |
| `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL=1` | Stops auto-registering the official marketplace | Does not remove an existing registration |
| `allowManagedModsOnly` | Stops non-organization mods running hooks (set under `pluginConfigs`) | Does not stop a plugin containing a mod from installing |

| Allowlist source object | Form |
| --- | --- |
| `github` | `{ "source": "github", "repo": "org/repo" }`, optional `ref`, `path`; owner wildcard `org/*` (v2.1.223+; `*` must be the whole repo name) |
| `git` | `{ "source": "git", "url": "..." }`, optional `ref`, `path` |
| `url` | `{ "source": "url", "url": "..." }` (headers not compared) |
| `file` / `directory` | Absolute `path` |
| `hostPattern` | Regex on host of `github` / `git` / `url` sources (anchor with `^` `$`); `github` counts as `github.com` |
| `pathPattern` | Regex on `path` of `file` / `directory` sources |
| `skills-dir` | Keeps skills-directory plugins loading; matches no marketplace |

## Notes

- Delivery mechanisms: server-managed settings (Organization settings > Claude Code > Managed settings; Owner role required), MDM (plist on macOS, registry JSON string on Windows), or `managed-settings.json` (plus `managed-settings.d/`). By default only the first source delivering a policy key applies (server, then MDM, then file); `managedSourcesBehavior: "merge"` applies all.
- Managed `extraKnownMarketplaces` + `enabledPlugins` register and install at the next session start; a user disabling at their scope does not stop loading. A managed marketplace entry replaces a same-name lower-precedence entry (fields do not merge).
- `claude-plugins-official` needs no `extraKnownMarketplaces` entry if `enabledPlugins` enables one of its plugins.
- Per-repository: set the same keys in `.claude/settings.json`; `extraKnownMarketplaces` apply only after folder trust (silently ignored otherwise). Plugins with an external source show `Plugin "<name>" is enabled in project settings but isn't installed` until `claude plugin install <name>@<marketplace> --scope project`.
- In `-p` / CI, installs run in the background; set `CLAUDE_CODE_SYNC_PLUGIN_INSTALL=1` to wait before the first query. Verify with `claude -p --output-format stream-json --verbose` and read the `init` event `plugins` list.
- Seed: build with `CLAUDE_CODE_PLUGIN_CACHE_DIR=/opt/claude-seed claude plugin marketplace add ...` then `claude plugin install ...`; at runtime set `CLAUDE_CODE_PLUGIN_SEED_DIR` (multiple seeds separated by `:` or `;` on Windows). Seed is read-only, forces `autoUpdate` off, overrides same-name user entries, still subject to allowlist/blocklist, and seed plugins must be enabled via `enabledPlugins`.
- Allowlist and blocklist apply before download and again at session start (installed plugins whose source no longer matches do not load; `/plugin` shows `... is not in the allowed marketplace list` or `... is blocked by enterprise policy`). `[]` lockdown does not cover plugins synced from claude.ai.
- Allowlist `github` and `git` entries match exactly on repo/url, `ref`, `path`; blocklist canonicalizes git URLs and a `github` entry also blocks the equivalent `git` URL. Aliases `allowedMarketplaces` / `additionalMarketplaces` require v2.1.232+; canonical key wins when both are set.
- Auto-update: managed `"autoUpdate"` on an entry locks the user toggle (error `Auto-update for '<name>' is set by`). Fleet-wide off: managed `env` `DISABLE_AUTOUPDATER=1` (also stops Claude Code's own updates; add `FORCE_AUTOUPDATE_PLUGINS=1` to keep plugin updates). Does not cover `command`-source plugins.
- Per-group channels need separate endpoint-managed settings or Claude apps gateway policies; server-managed settings apply to everyone.
- Audit via `claude_code.plugin_installed` / `claude_code.plugin_loaded` events and `GET /v1/organizations/analytics/plugins` (Enterprise).
- No dedicated key exists for per-user targeting, restricting entries inside an allowed marketplace (use `enabledPlugins: false`), or hiding `/plugin`.
- Troubleshooting: invalid JSON in `managed-settings.json` stops startup; `/status` shows `Enterprise managed settings` when loaded; `Disabled in ~/.claude/settings.json but still loads` means another source re-enabled it.

## Related

- [Plugin security and trust](./plugin-security.md)
- [Host and maintain a marketplace](./host-marketplace.md)
- [Marketplace reference](./marketplace-reference.md)
- [Measure plugin cost and usage](./measure-plugin.md)
- [Plugin relevance](./plugin-relevance.md)
