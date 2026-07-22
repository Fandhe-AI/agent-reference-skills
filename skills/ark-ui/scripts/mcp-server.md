# mcp-server

Configure the official Ark UI MCP Server (`@ark-ui/mcp`, stdio transport) so AI agents can generate design-system-consistent components across React, Vue, Solid, and Svelte.

## Add to Claude Code

```sh
claude mcp add ark-ui -- npx -y @ark-ui/mcp
```

## Add to Cursor

Add the following to `.cursor/mcp.json`.

```json
{
  "mcpServers": {
    "ark-ui": {
      "command": "npx",
      "args": ["-y", "@ark-ui/mcp"]
    }
  }
}
```

## Add to VS Code (Copilot)

Add the following to `.vscode/mcp.json`.

```json
{
  "servers": {
    "ark-ui": {
      "command": "npx",
      "args": ["-y", "@ark-ui/mcp"]
    }
  }
}
```

## Add to Windsurf

Add the following under Settings > Windsurf Settings > Cascade > MCP configuration.

```json
{
  "mcpServers": {
    "ark-ui": {
      "command": "npx",
      "args": ["-y", "@ark-ui/mcp"]
    }
  }
}
```

## Add to Zed

Add the following to `settings.json` via Settings > Open Settings.

```json
{
  "context_servers": {
    "ark-ui": {
      "source": "custom",
      "command": "npx",
      "args": ["-y", "@ark-ui/mcp"]
    }
  }
}
```

## Available tools

Once connected, send a natural-language prompt in the connected agent's chat (e.g. "Build me a checkbox with ark ui") to invoke the following tools.

| Tool | Description |
| --- | --- |
| `list_components` | Returns a full list of all available components |
| `list_examples` | Displays various component usage patterns |
| `get_example` | Retrieves code examples and usage patterns |
| `styling_guide` | Provides styling guidelines for components (data attributes and CSS variables) |
