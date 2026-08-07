# Package your plugin

Assembles skills and (optionally) an MCP server into the installable plugin unit. The manifest gives the plugin a stable identity and tells ChatGPT/Codex which skills, MCP server connections, and resources belong together. Public plugins publish once to the universal directory shared by ChatGPT and Codex; local/repo marketplaces are separate authoring and team-distribution sources.

## Signature / Usage

`.codex-plugin/plugin.json`:

```json
{
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "Bundle reusable skills and MCP servers.",
  "author": { "name": "Your team", "email": "team@example.com", "url": "https://example.com" },
  "homepage": "https://example.com/plugins/my-plugin",
  "repository": "https://github.com/example/my-plugin",
  "license": "MIT",
  "keywords": ["research", "crm"],
  "skills": "./skills/",
  "mcpServers": "./.mcp.json",
  "apps": "./.app.json",
  "hooks": "./hooks/hooks.json",
  "interface": {
    "displayName": "My Plugin",
    "shortDescription": "Reusable skills and MCP servers",
    "longDescription": "Distribute skills and MCP servers together.",
    "developerName": "Your team",
    "category": "Productivity",
    "capabilities": ["Read", "Write"],
    "websiteURL": "https://example.com",
    "privacyPolicyURL": "https://example.com/privacy",
    "termsOfServiceURL": "https://example.com/terms",
    "defaultPrompt": ["Use My Plugin to summarize new CRM notes."],
    "brandColor": "#10A37F",
    "composerIcon": "./assets/icon.png",
    "logo": "./assets/logo.png",
    "screenshots": ["./assets/screenshot-1.png"]
  }
}
```

```bash
codex plugin marketplace add owner/repo
codex plugin marketplace add owner/repo --ref main
codex plugin marketplace list
codex plugin marketplace upgrade
codex plugin marketplace remove marketplace-name
```

## Options / Props

| Field | Description |
|-------|-------------|
| `name`, `version`, `description` | Plugin identity; `name` stable, kebab-case, used as identifier and component namespace |
| `author`, `homepage`, `repository`, `license`, `keywords` | Publisher/discovery metadata |
| `skills` | Path to bundled skill folders, relative to plugin root, `./`-prefixed |
| `mcpServers` | Path to `.mcp.json` (direct server map or wrapped `{ "mcp_servers": {...} }`) for a bundled MCP server |
| `apps` | Compatibility field pointing to `.app.json`, which maps a *registered* MCP server connection (not bundled) |
| `hooks` | Path(s) to lifecycle hook definitions; defaults to `./hooks/hooks.json` if omitted |
| `interface.*` | Install-surface metadata: display name, descriptions, category, capabilities, URLs, starter prompts, icons/screenshots |

## Notes

- Only `plugin.json` belongs in `.codex-plugin/`; keep `skills/`, `hooks/`, `assets/`, `.mcp.json`, `.app.json` at the plugin root.
- `@plugin-creator` (Work mode in ChatGPT) / `$plugin-creator` (Codex) scaffolds the manifest and can generate a local marketplace entry from a registered MCP connection's `plugin_asdk_app...` ID.
- Marketplace file: repo-scoped at `$REPO_ROOT/.agents/plugins/marketplace.json` (legacy-compatible path `$REPO_ROOT/.claude-plugin/marketplace.json` also read), personal at `~/.agents/plugins/marketplace.json`. Each `plugins[]` entry needs `source.path` (or `source: "url"` / `"git-subdir"` / `"npm"`), `policy.installation`, `policy.authentication`, and `category`.
- Installed plugins live at `~/.codex/plugins/cache/$MARKETPLACE_NAME/$PLUGIN_NAME/$VERSION/`; local plugins use `$VERSION = local`.
- Plugin-bundled hooks are non-managed — Codex will not run them until the user reviews and trusts the hook definition. Hook commands receive `PLUGIN_ROOT` / `PLUGIN_DATA` (also mirrored as `CLAUDE_PLUGIN_ROOT` / `CLAUDE_PLUGIN_DATA` for compatibility).
- Workspace sharing (Share button on a plugin's detail page) is separate from marketplace/public publishing and stays within the workspace boundary; admins can disable via `features.plugin_sharing = false` in `requirements.toml`.
- Public plugin publication goes through the plugin submission portal (see deploy/submission docs, out of scope for this category).

## Related

- [Build skills](./build-skills.md)
- [MCP server](./mcp-server.md)
