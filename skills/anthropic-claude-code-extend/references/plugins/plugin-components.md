<!-- source: https://code.claude.com/docs/en/plugins/components.md / last verified: 2026-10-17 -->

# Add components to a plugin

Add skills, commands, agents, hooks, MCP servers, LSP servers, executables, default settings, themes, output styles, channels, and monitors to a Claude Code plugin. None is required.

## Signature / Usage

```text
my-plugin/
├── .claude-plugin/plugin.json
├── skills/review/SKILL.md          # /my-plugin:review
├── commands/about.md               # /my-plugin:about (older format)
├── agents/security-reviewer.md     # my-plugin:security-reviewer
├── hooks/hooks.json
├── monitors/monitors.json
├── output-styles/terse.md
├── themes/dracula.json
├── bin/hello-plugin
├── settings.json
├── .mcp.json
└── .lsp.json
```

```json
// hooks/hooks.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "\"${CLAUDE_PLUGIN_ROOT}/scripts/format.sh\"" }
        ]
      }
    ]
  }
}
```

```json
// .mcp.json
{ "mcpServers": { "db": { "command": "node", "args": ["${CLAUDE_PLUGIN_ROOT}/server.js"] } } }
```

```json
// .lsp.json (no wrapper object)
{ "gopls": { "command": "gopls", "args": ["serve"], "extensionToLanguage": { ".go": "go" } } }
```

```json
// .claude-plugin/plugin.json: userConfig
{
  "name": "my-plugin",
  "userConfig": {
    "api_token": { "type": "string", "title": "API token", "description": "Token for your team's API", "sensitive": true }
  }
}
```

## Options / Props

| Component | Location | Manifest key | Name / behavior |
| --- | --- | --- | --- |
| Skills | `skills/<dir>/SKILL.md` | `skills` (adds to default scan) | `/<plugin>:<directory>`; frontmatter `name` replaces last segment |
| Commands | `commands/<file>.md` | `commands` (path, array, or object with `source` / `content`; replaces scan) | `/<plugin>:<file>`; subdirectory adds a segment (`commands/db/migrate.md` = `/my-plugin:db:migrate`) |
| Agents | `agents/*.md` (recursive) | `agents` (replaces scan) | `<plugin>:<name>`; `agents/review/security.md` = `my-plugin:review:security`; a file listed in manifest loads without subfolder names |
| Hooks | `hooks/hooks.json` | `hooks` (both load) | Registered when the plugin loads; `modules` key makes a mod |
| MCP servers | `.mcp.json` | `mcpServers` (inline map, path, or array; manifest wins on same name) | Server `plugin:<plugin>:<server>`; tool `mcp__plugin_<plugin>_<server>__<tool>` |
| LSP servers | `.lsp.json` | `lspServers` (adds; manifest wins on same name) | `command`, `args`, `extensionToLanguage` (extensions start with `.`) |
| Executables | `bin/` | | On `PATH` of the Bash tool's shell while enabled |
| Default settings | `settings.json` | `settings` | Only `agent` and `subagentStatusLine` take effect |
| Themes | `themes/<slug>.json` | `experimental.themes` | Appears in `/theme` under file `name` |
| Output styles | `output-styles/<name>.md` | `outputStyles` | `/output-style` as `<plugin>:<name>` |
| Channels | manifest `channels` entry bound to an `mcpServers` key | `channels` | Per-channel `userConfig` |
| Monitors | `monitors/monitors.json` | `experimental.monitors` | Background shell command; output reaches Claude as notifications |

| Plugin agent frontmatter | Fields |
| --- | --- |
| Supported | `name`, `description`, `model`, `effort`, `maxTurns`, `autoCompactWindow`, `tools`, `disallowedTools`, `skills`, `memory`, `background`, `omitClaudeMd`, `isolation` (only `"worktree"`), `color`, `experimental.cacheTtl` |
| Ignored | `permissionMode`, `hooks`, `mcpServers`, `initialPrompt` |

| Path variable | Meaning |
| --- | --- |
| `${CLAUDE_PLUGIN_ROOT}` | Install directory; changes per version; do not write state there |
| `${CLAUDE_PLUGIN_DATA}` | `~/.claude/plugins/data/<id>/`, survives updates; created on first reference |
| `${CLAUDE_PROJECT_DIR}` | Project root |

## Notes

- Commands are the older format; skills supersede them for new work. Command files take the same frontmatter as skills.
- A `SKILL.md` at the plugin root loads as one skill only with no `skills/` directory and no `skills` key; set frontmatter `name`. Claude Code does not load a plugin-root `CLAUDE.md` (validate warns); write instructions as a skill. A rule that must always hold belongs in a hook.
- Agent frontmatter that does not parse still loads the agent with all fields ignored (description `Agent from my-plugin plugin`).
- Hooks fire on their events from plugin load, not only when the plugin's skills run. Every hook process receives `CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA`, and `CLAUDE_PLUGIN_OPTION_<KEY>`. Without `args`, `command` runs through a shell, so quote `${CLAUDE_PLUGIN_ROOT}`; with `args`, no quoting is needed. A matcher on the server name alone never matches the plugin's own MCP tools; use the full `mcp__plugin_<plugin>_<server>__<tool>` name.
- MCP: `claude plugin validate` checks `.mcp.json` (v2.1.281+). A local stdio server runs in Claude Code and local Cowork but not on claude.ai; reference a remote `https://` URL to reach claude.ai users. `mcpServers` also accepts a packaged `.mcpb` / `.dxt` file (path or `https://` URL); required bundle `user_config` values with no saved value keep the server from starting (`--config <server>.<key>=<value>` needs v2.1.285+). On `/reload-plugins`, unchanged servers keep their connection.
- LSP: validate does not read `.lsp.json`; one invalid entry skips the whole file (`Invalid LSP server config for ".lsp.json"`). The plugin does not install the binary; two servers claiming one extension means the first registered wins (`LSP server "<name>" is not used for <ext> files`). Log to stderr; headers over 64 KiB or bodies over 32 MiB disconnect the server and count as a crash for `restartOnCrash` / `maxRestarts`.
- `bin/` comes after the user's own `PATH` entries, so a plugin cannot shadow system commands; claude.ai and Cowork do not install a plugin with a top-level `bin/`.
- Default settings: `settings.json` beats the manifest `settings` key; user settings beat plugin defaults; when two plugins set the same key the last loaded wins. Plugin themes are read-only (edits save as a user copy).
- Monitors start only in interactive sessions (not `-p`), run outside the sandbox with full user permissions, never accept `${user_config.*}`, and are not stopped when the plugin is disabled mid-session.
- `userConfig`: `"sensitive": true` masks input and uses secure storage. The dialog opens on install in `/plugin`, `/plugin install <plugin>@<marketplace>`, or enabling from the Installed tab; reopen with `/plugin configure <plugin>@<marketplace>`. `claude plugin install` never prompts: pass `--config KEY=VALUE` or pipe JSON to `claude plugin configure --values-stdin`.
- On Windows substituted paths use forward slashes. Marketplace-installed plugins get eligible Node.js dependencies installed automatically; otherwise install into `${CLAUDE_PLUGIN_DATA}` from a `SessionStart` hook and point `NODE_PATH` at `${CLAUDE_PLUGIN_DATA}/node_modules`.

## Related

- [Plugins overview](./plugins-overview.md)
- [Plugins reference](./plugins-reference.md)
- [Create plugins](./plugins.md)
- [Plugin loading reference](./plugin-loading.md)
- [Troubleshoot plugins](./plugins-troubleshooting.md)
