<!-- source: https://code.claude.com/docs/en/plugins/security.md / last verified: 2026-10-17 -->

# Plugin security and trust

A plugin you install can execute arbitrary code on your machine with your user privileges. A marketplace's name tells you who publishes the catalog, not what each plugin does, so review before installing.

## Signature / Usage

```bash
claude plugin marketplace list                                  # source each marketplace was added from
claude --plugin-dir <plugin directory> plugin details <plugin name>   # Component inventory before install
claude plugin details <plugin name>                             # same, for the installed copy
claude plugin uninstall <plugin> --scope <scope>
```

In a session, `/plugin` > select plugin > details pane shows **Will install** (commands, agents, skills, hooks, MCP / LSP servers). Read `hooks/hooks.json`, `.mcp.json`, and every file in `bin/` in the plugin source.

## Options / Props

| What a plugin can do | Detail |
| --- | --- |
| Hooks | Shell commands at lifecycle points |
| Monitors | Background shell commands started at session start, on plugin reload, or first run of a named skill |
| Mods | JavaScript run inside Claude Code with your permissions |
| MCP / LSP servers | stdio MCP servers and language servers are processes Claude Code starts on your machine |
| `bin/` directory | Added to the `PATH` of the Bash tool's shell |
| Skills, commands, agents | Enter Claude's context as instructions |
| Updates | Auto-update can change reviewed files on disk |

| Tier | Marketplaces |
| --- | --- |
| Official | `claude-plugins-official`, `claude-code-marketplace`, `claude-code-plugins`, `anthropic-marketplace`, `anthropic-plugins`, `agent-skills`, `anthropic-agent-skills`, `life-sciences`, `knowledge-work-plugins`, `claude-for-legal`, `claude-for-financial-services`, `financial-services-plugins`, `first-party-plugins`, `claude-tag-plugins` |
| Community | `claude-community`, `claude-plugins-community`, `healthcare` |
| Third-party | Every other marketplace |

## Notes

- Permission rules and the sandbox cover Claude's tool calls, not code a plugin runs itself. Hooks, monitors, MCP servers, LSP servers, and mod processes run outside the sandbox with full user permissions. A call to a plugin's MCP tool, or a Bash command running an executable from `bin/`, is a tool call and is subject to permission rules.
- Installing a plugin also enables it, unless its manifest or marketplace entry sets `defaultEnabled: false`.
- Claude Code accepts official and community names only for marketplaces sourced from `github.com/anthropics/` repositories; otherwise it stops loading the marketplace and its plugins (error: Marketplace is registered from an untrusted source).
- Where the `claude-community` catalog pins a plugin to a commit SHA, Claude Code refuses to install a different commit.
- An `archive` source pinned to a `sha256` digest that does not match the download is refused (error: Plugin archive integrity check failed). This is separate from the commit SHA pin.
- Uninstall: by default deletes the plugin's persistent data when removing the last scope (`--keep-data` keeps it); cached files stay under `~/.claude/plugins/cache/` for 14 days; removing the marketplace uninstalls every plugin from it.
- Trust warning text: "Make sure you trust a plugin before installing, updating, or using it. Anthropic does not control what MCP servers, files, or other software are included in plugins and cannot verify that they will work as intended or that they won't change." Managed setting `pluginTrustMessage` appends text.
- Admin controls (managed settings): allowlist/blocklist marketplaces, force-enable plugins, disable `--plugin-dir` / `--plugin-url` / `CLAUDE_CODE_PLUGIN_DIRS`, limit hooks to managed settings and force-enabled plugins, `syncClaudeAiPlugins`.
- Telemetry: plugin loaded event reports official-tier names as-is; community and third-party names are the literal `third-party` unless `OTEL_LOG_TOOL_DETAILS=1`. The plugin installed event omits name fields for non-official plugins unless set.

## Related

- [Plugins overview](./plugins-overview.md)
- [Manage plugins for your organization](./plugins-org.md)
- [Anthropic's marketplaces](./anthropic-marketplaces.md)
- [Measure plugin cost and usage](./measure-plugin.md)
