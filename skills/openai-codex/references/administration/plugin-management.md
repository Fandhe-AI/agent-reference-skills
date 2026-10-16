# Plugin management

Workspace admins import a plugin marketplace from GitHub and keep its plugins in sync with the repository. A marketplace is a JSON catalog listing the plugins to import.

## Signature / Usage

Codex marketplace (`.agents/plugins/marketplace.json`) with a local plugin; the path is relative to the selected marketplace root, not `.agents/plugins/`:

```json
{
  "name": "team-plugins",
  "interface": {
    "displayName": "Team plugins"
  },
  "plugins": [
    {
      "name": "team-tools",
      "source": {
        "source": "local",
        "path": "./plugins/team-tools"
      }
    }
  ]
}
```

Claude-compatible entry:

```json
{
  "name": "team-plugins",
  "plugins": [
    {
      "name": "team-tools",
      "source": "./plugins/team-tools"
    }
  ]
}
```

Git subdirectory source (`source: "url"` is for a plugin at a repository root):

```json
{
  "name": "team-tools",
  "source": {
    "source": "git-subdir",
    "url": "https://github.com/example/team-tools.git",
    "path": "./plugins/team-tools",
    "ref": "main"
  }
}
```

Move an existing plugin to GitHub management by adding `pluginId`:

```json
{
  "name": "team-tools",
  "pluginId": "plugin_0123456789abcdef0123456789abcdef",
  "source": {
    "source": "local",
    "path": "./plugins/team-tools"
  }
}
```

Reference an existing app with `.app.json` at the plugin root (leading dot required):

```json
{
  "apps": {
    "team-tools": {
      "id": "asdk_app_example",
      "required": true
    }
  }
}
```

Native plugin manifest (`.codex-plugin/plugin.json`) pointing at it:

```json
{
  "name": "team-tools",
  "version": "1.0.0",
  "description": "Use the team's approved tools.",
  "author": {
    "name": "Example team"
  },
  "apps": "./.app.json",
  "interface": {
    "displayName": "Team tools",
    "shortDescription": "Use approved team tools",
    "longDescription": "Connect to the team's existing app.",
    "developerName": "Example team",
    "category": "Productivity",
    "capabilities": ["Read"]
  }
}
```

Layout:

```text
team-plugins/
├── .agents/plugins/marketplace.json
└── plugins/team-tools/
    ├── .codex-plugin/plugin.json
    └── .app.json
```

## Options / Props

Import form (Admin > Plugins > Add > Import marketplace):

| Field | Description |
|-------|-------------|
| Source | Repository URL only, such as `https://github.com/example/team-plugins` (no branch or folder URL) |
| Path | Subdirectory containing the marketplace (for example `team-tools`); empty for repository root; don't enter the manifest filename |
| Branch, tag, or commit | Optional; empty uses the default branch. A branch receives future commits; a fixed commit stays at that revision |

Supported files in the selected directory:

| File | Format |
|------|--------|
| `.agents/plugins/marketplace.json` | A Codex marketplace with a `plugins` array |
| `.claude-plugin/marketplace.json` | A Claude-compatible marketplace with a `plugins` array |
| `.claude-plugin/plugin.json` | A standalone Claude plugin, when no marketplace manifest is present |

## Notes

- Use a GitHub account that can read the marketplace repository and every repository it references; public and private repositories are supported, but workspace import currently supports only GitHub. Git sources can select a `ref` or a full 40-character commit `sha`.
- Entries can reference native plugins (`.codex-plugin/plugin.json`), Claude-compatible plugins, Agent Plugins 1.0 packages, or supported skill packages.
- New plugins start with **Available** installation and authentication on install. New marketplaces have automatic daily sync enabled; sync adds any new repository plugins automatically, so review repository changes before merging. Initial import can take up to an hour for very large marketplaces. **Sync now** (Admin > Plugins > Marketplaces) requests an update immediately.
- Import and sync do not apply installation/authentication policies (`AVAILABLE`, `INSTALLED_BY_DEFAULT`, `NOT_AVAILABLE`, `ON_INSTALL`, `ON_USE`); admins configure them per plugin and they are preserved across syncs and when moving a plugin to GitHub management. Importing does not grant app access or connect members' accounts.
- Moving a plugin: copy the ID after `/admin/plugins/` in the plugin's URL; the plugin must be in the same workspace; it keeps ID, sharing, and policies; later archive uploads can no longer replace it; a plugin already managed by another GitHub source cannot be taken over.
- Any imported plugin declaring MCP servers (`mcp.json` / `.mcp.json`, including remote HTTPS URLs and inline declarations) is marked **Desktop only** and works only in the ChatGPT desktop app.
- `.app.json` app IDs start with `asdk_app_`, `connector_`, or `templated_apps_` (use the app ID, not a `plugin_...` ID). The reference does not create an app or grant permissions; existing app permissions, action controls, and service access still apply.
- After a sync, **Completed — N errors** means some plugins couldn't be processed; an invalid update to an existing plugin keeps its last working version. Removing an entry from the repository marks the imported copy **No longer in source** without deleting it; deleting the marketplace in ChatGPT deletes all plugins imported from it.
- Reconnecting GitHub access: marketplace sync uses the importing admin's GitHub connection; that admin reconnects their account. To transfer ownership, the new admin imports the same marketplace with identical Source, Path, and Branch/tag/commit. Don't delete the marketplace to reconnect or change ownership.
- Local client marketplaces can instead be configured via cloud-managed or system `config.toml` (see Managed configuration, "Configure plugin marketplaces and defaults").
- Source: https://learn.chatgpt.com/docs/enterprise/plugin-management (retrieved 2026-10).

## Related

- [Plugin controls](./plugin-controls.md)
- [Skill controls](./skill-controls.md)
- [Managed configuration](./managed-configuration.md)
