<!-- source: https://code.claude.com/docs/en/plugins/manifest-reference.md / last verified: 2026-10-17 -->

# Plugin manifest (plugin.json)

Complete `.claude-plugin/plugin.json` example declaring a plugin's identity, component locations, inline components, and `userConfig`.

```json .claude-plugin/plugin.json
{
  "name": "deploy-tools",
  "displayName": "Deploy Tools",
  "version": "1.2.0",
  "description": "Deployment commands, a review agent, and a status monitor",
  "author": {
    "name": "Example Team",
    "email": "dev@example.com",
    "url": "https://example.com"
  },
  "homepage": "https://example.com/docs/deploy-tools",
  "repository": "https://github.com/example/deploy-tools",
  "license": "MIT",
  "keywords": ["deployment", "ci"],
  "defaultEnabled": true,
  "dependencies": ["secrets-vault"],
  "metadata": { "catalogId": "cat-123" },
  "skills": ["./extra-skills/"],
  "commands": {
    "status": {
      "source": "./commands/status.md",
      "description": "Show the current deployment status"
    },
    "about": {
      "content": "Explain what the deploy-tools plugin provides.",
      "description": "Describe this plugin"
    }
  },
  "agents": ["./agents/reviewer.md"],
  "hooks": "./config/extra-hooks.json",
  "mcpServers": {
    "deploy-api": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/server.js"]
    }
  },
  "lspServers": "./.lsp.json",
  "outputStyles": "./styles/",
  "experimental": {
    "themes": "./themes/",
    "monitors": "./config/monitors.json"
  },
  "userConfig": {
    "api_token": {
      "type": "string",
      "title": "API token",
      "description": "Token for the deployment API",
      "sensitive": true
    }
  }
}
```

## Notes

- The manifest is optional; only `name` is required when one is present. Validate with `claude plugin validate ./my-plugin` (`--strict` turns warnings into failures).
- `agents` accepts agent `.md` files only; directories are not accepted. `commands` accepts flat `.md` files, directories, or an object map of name to `source` or `content`. `commands`, `agents`, `outputStyles`, `workflows`, `experimental.themes` replace their default folder scan; `skills` adds to the default `skills/` scan.
- Other keys not shown above: `workflows` (workflow `.js` files or directories), `experimental.evals` (eval directory), `channels` (message channels bound to MCP servers), and `settings` (only `agent` and `subagentStatusLine` take effect; other keys are dropped at load).
- An unknown top-level key is stripped with a `claude plugin validate` warning and the plugin loads. An unknown key inside a strict object (`userConfig` option, `channels` entry, `lspServers` config, `monitors` entry) is an error and the plugin does not load.
- `${CLAUDE_PLUGIN_ROOT}` resolves to the plugin's install directory. To distribute the plugin, register it in a marketplace catalog; see `plugin-marketplace.md` in this directory.
- This is a Claude Code CLI feature. For the Agent SDK, see anthropic-agent-sdk. For the Claude API side, see anthropic-api-tools-mcp.
