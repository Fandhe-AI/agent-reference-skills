<!-- source: https://code.claude.com/docs/en/plugins-reference.md / last verified: 2026-08-07 -->

# Plugins reference

Complete technical reference for the Claude Code plugin system: components, manifest schema, caching, directory structure, and CLI commands.

## Signature / Usage

```json
// .claude-plugin/plugin.json — complete schema
{
  "name": "plugin-name",
  "displayName": "Plugin Name",
  "version": "1.2.0",
  "description": "Brief plugin description",
  "author": { "name": "Author Name", "email": "author@example.com", "url": "https://github.com/author" },
  "homepage": "https://docs.example.com/plugin",
  "repository": "https://github.com/author/plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"],
  "metadata": { "catalogId": "cat-123" },
  "skills": "./custom/skills/",
  "commands": ["./custom/commands/special.md"],
  "agents": ["./custom/agents/reviewer.md"],
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json",
  "outputStyles": "./styles/",
  "lspServers": "./.lsp.json",
  "experimental": { "themes": "./themes/", "monitors": "./monitors.json" },
  "dependencies": ["helper-lib", { "name": "secrets-vault", "version": "~2.1.0" }]
}
```

## Options / Props

| Component | Default location | Notes |
| --- | --- | --- |
| Skills | `skills/` or `commands/`, or root `SKILL.md` | Boolean frontmatter fields accept `yes/no/on/off/1/0` too |
| Agents | `agents/` | Frontmatter: `name`, `description`, `model`, `effort`, `maxTurns`, `tools`, `disallowedTools`, `skills`, `memory`, `background`, `isolation` (`"worktree"` only); `hooks`/`mcpServers`/`permissionMode` not supported |
| Hooks | `hooks/hooks.json` or inline | Types: `command`, `http`, `mcp_tool`, `prompt`, `agent`. Plugin MCP tool matchers use `mcp__plugin_<plugin-name>_<server-name>__<tool>` |
| MCP servers | `.mcp.json` or inline | Start automatically when plugin enabled; independent of user MCP servers |
| LSP servers | `.lsp.json` or inline | Requires `command`, `extensionToLanguage`; optional `args`, `transport`, `env`, `initializationOptions`, `settings`, `startupTimeout`, `shutdownTimeout`, `restartOnCrash`, `maxRestarts`, `diagnostics` |
| Monitors | `monitors/monitors.json` or `experimental.monitors` | Fields: `name`, `command` (required), `description` (required), `when` (`"always"` default or `"on-skill-invoke:<skill>"`) |
| Themes | `themes/` or `experimental.themes` | JSON with `name`, `base` (`dark`/`light`), `overrides` color-token map |

### Manifest metadata fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Required if manifest present. Kebab-case, unique, used for namespacing |
| `displayName` | string | Human-readable name in UI; falls back to `name` |
| `version` | string | Pins the plugin; omit to fall back to git commit SHA |
| `defaultEnabled` | boolean | Whether the plugin starts enabled (default `true`) |
| `metadata` | object | Free-form, never read by Claude Code |

### Component path fields

| Field | Replaces vs adds to default |
| --- | --- |
| `commands`, `agents`, `workflows`, `outputStyles`, `experimental.themes`, `experimental.monitors` | Replaces the default folder |
| `skills` | Adds to the default `skills/` scan (exception: marketplace-root `source` entries) |
| `hooks`, `mcpServers`, `lspServers` | Own merge rules |

### Environment variables

| Variable | Resolves to |
| --- | --- |
| `${CLAUDE_PLUGIN_ROOT}` | Plugin's installation directory |
| `${CLAUDE_PLUGIN_DATA}` | Persistent directory `~/.claude/plugins/data/{id}/`, survives updates |
| `${CLAUDE_PROJECT_DIR}` | Project root |

## Notes

- Installed (marketplace) plugins are copied into `~/.claude/plugins/cache`; paths that traverse outside the plugin root (`../shared-utils`) do not work. Use symlinks within the plugin's own directory, or elsewhere in the same marketplace (dereferenced on copy), to share files.
- `userConfig` in `plugin.json` declares values Claude Code prompts for at enable time (`type`: `string`/`number`/`boolean`/`directory`/`file`; optional `sensitive`, `required`, `default`, `multiple`, `min`/`max`). Substituted as `${user_config.KEY}`; shell-executed fields (hook shell-form commands, monitor commands, `headersHelper`) reject the substitution for security.
- `channels` field declares MCP-server-backed message channels (Telegram/Slack/Discord style) for pushing content into a session.
- Plugin installation scopes: `user` (`~/.claude/settings.json`, default), `project` (`.claude/settings.json`), `local` (`.claude/settings.local.json`), `managed` (read-only).
- Skills-directory plugins: any folder with `.claude-plugin/plugin.json` under a skills directory loads as `<name>@skills-dir` automatically; scaffold with `claude plugin init <name>`.
- CLI: `claude plugin install|uninstall|prune|enable|disable <plugin>[@marketplace]`, `claude plugin validate ./path [--strict]`, `claude plugin tag --push`, `claude plugin list [--json]`.

## Related

- [Create plugins](./plugins.md)
- [Discover and install plugins](./discover-plugins.md)
- [Constrain plugin dependency versions](./plugin-dependencies.md)
- [Create and distribute a plugin marketplace](./plugin-marketplaces.md)
