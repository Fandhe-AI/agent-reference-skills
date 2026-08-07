<!-- source: https://code.claude.com/docs/en/plugins-reference.md / last verified: 2026-08-07 -->

# Plugin manifest (plugin.json)

Complete `.claude-plugin/plugin.json` schema declaring a plugin's identity and component locations.

```json .claude-plugin/plugin.json
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

## Notes

- Only `name` is required if a manifest is present; all other fields are optional (`version` falls back to the git commit SHA if omitted).
- Component path fields (`commands`, `agents`, `outputStyles`, `experimental.themes/monitors`) **replace** the default folder; `skills` **adds to** the default `skills/` scan.
- `${CLAUDE_PLUGIN_ROOT}` resolves to the plugin's install directory, `${CLAUDE_PLUGIN_DATA}` to a persistent per-plugin data directory that survives updates.
- To distribute this plugin, register it in a marketplace catalog — see `plugin-marketplace.md` in this directory for the `marketplace.json` schema.
- This is a Claude Code CLI feature. For the Agent SDK, see anthropic-agent-sdk. For the Claude API side, see anthropic-api-tools-mcp.
