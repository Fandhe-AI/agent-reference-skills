# Remote Server Installation

Cloud-hosted Figma MCP server setup. Recommended for the broadest feature set including write-to-canvas, diagram generation, and design system search.

## Signature / Usage

Server URL: `https://mcp.figma.com/mcp` (HTTP/SSE transport)

### Claude Code

```bash
# Preferred: plugin install
claude plugin install figma@claude-plugins-official

# Manual
claude mcp add --transport http figma https://mcp.figma.com/mcp
# For global access across all projects
claude mcp add --transport http --scope user figma https://mcp.figma.com/mcp
```

Then authenticate via the `/mcp` command in Claude.

Caution: if `claude plugin install` fails, your organization may have blocked plugin installation (for all plugins or for the Figma plugin). Contact your Claude administrator, or add the server manually with `claude mcp add` (this does not install Figma's skills).

### Cursor

```
# Preferred: in chat
/add-plugin figma
```

Or use the deep-link installer, then authenticate when prompted.

### VS Code

```json
{
  "servers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "type": "http"
    }
  }
}
```

Open Command Palette (`⌘ Shift P`) → select MCP configuration (user or workspace) → paste the JSON above → click Start → authorize access.

### Codex

```bash
codex mcp add figma --url https://mcp.figma.com/mcp
```

Or via app: Plugins → + → Install Figma, then authenticate. Two routes: the Figma plugin in the Codex app (includes skills), or the Codex CLI (`codex mcp add`, no skills).

### Xcode

Requires Xcode 27 beta. Xcode supports the remote server only.

1. One-click setup adds the Figma plugin to Xcode
2. Next to the Figma plugin, click Sign in… and allow access

Manual setup: Xcode Settings → Intelligence → install an agent if needed → Plug-ins → Add plug-in → Add from URL → `https://github.com/figma/mcp-server-guide` → choose the Figma Plug-in → Sign in….

### Other clients

Add a new MCP server using the HTTP transport and the URL `https://mcp.figma.com/mcp`, then sign in to Figma when prompted.

## Notes

- Authentication uses Figma OAuth; authorization is triggered on first use
- Remote server supports all tools including `create_new_file`, `generate_diagram`, `use_figma`, `upload_assets`, and others marked remote-only
- See [Tools and Prompts](./tools-and-prompts.md) for the full list of remote-only tools

## Related

- [Desktop Server Installation](./desktop-server-installation.md)
- [Tools and Prompts](./tools-and-prompts.md)
- [Write to Canvas](./write-to-canvas.md)
