# AI MCP Server

The Chakra UI MCP Server is a Model Context Protocol server that provides AI assistants (Claude Code, Cursor, Copilot) with access to Chakra UI components, design tokens, and migration guidance.

## Tools

### Component Tools

- **`list_components`** — Get a complete list of all available components
- **`get_component_props`** — Detailed props, types, and configuration options for any component
- **`get_component_example`** — Retrieve code examples and usage patterns

### Chakra UI Pro Tools

Requires an active [Chakra UI Pro](https://pro.chakra-ui.com/pricing) license and `CHAKRA_PRO_API_KEY` environment variable.

- **`list_component_templates`** — List available component templates from Chakra UI Pro
- **`get_component_templates`** — Retrieve fully responsive, accessible component templates

### Design System Tools

- **`get_theme`** — Get a detailed list of all design tokens
- **`theme_customization`** — Custom theme token creation and modification

### Migration Tools

- **`v2_to_v3_code_review`** — Migration guidance from v2 to v3

## Setup

The server uses `stdio` transport and is published as `@chakra-ui/react-mcp`.

### Visual Studio Code

Requires [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extensions.

`.vscode/mcp.json`:

```json
{
  "servers": {
    "chakra-ui": {
      "command": "npx",
      "args": ["-y", "@chakra-ui/react-mcp"]
    }
  }
}
```

Click "Start" on the MCP server after adding the config.

### Cursor

`.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "chakra-ui": {
      "command": "npx",
      "args": ["-y", "@chakra-ui/react-mcp"]
    }
  }
}
```

If Cursor doesn't detect changes automatically, restart the editor or enable the server via "MCP Tools."

### Claude Code

```bash
claude mcp add chakra-ui -- npx -y @chakra-ui/react-mcp
```

Start a session with `claude`.

### Windsurf

Navigate to **Settings > Windsurf Settings > Cascade > Manage MCPs > View raw config** and add:

`.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "chakra-ui": {
      "command": "npx",
      "args": ["-y", "@chakra-ui/react-mcp"]
    }
  }
}
```

Click "Refresh" if the server doesn't appear.

### Zed

**Settings > Open Settings** — add a context server to `settings.json`:

`.config/zed/settings.json`:

```json
{
  "context_servers": {
    "chakra-ui": {
      "source": "custom",
      "command": "npx",
      "args": ["-y", "@chakra-ui/react-mcp"]
    }
  }
}
```

### Custom MCP Client

```json
{
  "mcpServers": {
    "chakra-ui": {
      "command": "npx",
      "args": ["-y", "@chakra-ui/react-mcp"]
    }
  }
}
```

## Chakra UI Pro Integration

### Setting Up Your API Key

1. Get your API key from the [Chakra UI Pro](https://pro.chakra-ui.com) user menu.
2. Add the `CHAKRA_PRO_API_KEY` environment variable to your MCP configuration.

**For editors with `env` support (VS Code, Cursor, Windsurf, Zed, Custom):**

```json
{
  "env": {
    "CHAKRA_PRO_API_KEY": "your_api_key_here"
  }
}
```

**For Claude Code:**

```bash
claude mcp add chakra-ui --env CHAKRA_PRO_API_KEY=your_api_key_here -- npx -y @chakra-ui/react-mcp
```

Once configured, `list_component_templates` and `get_component_templates` become available.

## Related

- [AI LLMs](./ai-llms.md)
- [AI Rules](./ai-rules.md)
- [CLI](./cli.md)
