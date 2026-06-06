# Desktop Server Installation

Local Figma MCP server running in the Figma desktop app. Suited for specific organizational needs; remote server is recommended for most users.

## Signature / Usage

Server URL: `http://127.0.0.1:3845/mcp` (HTTP transport, local only)

### Step 1: Enable the desktop MCP server in Figma

1. Open the Figma desktop app (latest version)
2. Open or create a Design file
3. Switch to Dev Mode with `Shift+D`
4. In the MCP server section, click **Enable desktop MCP server**

### Step 2: Configure your MCP client

**Claude Code:**

```bash
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp
```

**VS Code** (requires GitHub Copilot):

Open Command Palette → `MCP: Add Server` → select HTTP → paste the server URL → use ID `figma-desktop`.

**Cursor:**

Settings → MCP tab → Add new global MCP server with URL `http://127.0.0.1:3845/mcp`.

**Generic JSON config:**

```json
{
  "mcpServers": {
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

### Step 3: Provide design context

Two methods to give the agent context:

- **Selection-based**: Select a frame in Figma, then prompt the client to implement the selection
- **Link-based**: Share a Figma node URL; the agent extracts the `node-id` automatically

### Step 4: Adjust settings

Access settings via the MCP server inspect panel in the desktop app:

- **Image handling**: choose local server or download assets
- **Code Connect**: enable component reuse from your codebase

## Notes

- Desktop server does not support remote-only tools (`create_new_file`, `generate_diagram`, `use_figma`, `upload_assets`, etc.)
- The Figma desktop app must remain open and connected for the server to be available
- Adjust settings panel is accessible through the MCP server section in Dev Mode

## Related

- [Remote Server Installation](./remote-server-installation.md)
- [Tools and Prompts](./tools-and-prompts.md)
- [Code Connect Integration](./code-connect-integration.md)
