# Desktop Server Installation

Local Figma MCP server running in the Figma desktop app. The remote server is strongly recommended; the desktop server requires the Figma desktop app and a Dev or Full seat on a Professional, Education, Organization, Government, or Enterprise plan. It doesn't support writing to the canvas or sending UI to Figma.

## Signature / Usage

Server URL: `http://127.0.0.1:3845/mcp` (HTTP transport, local only)

### Step 1: Enable the desktop server in Figma

1. Open the Figma desktop app and make sure it is up to date
2. Create or open a Figma Design file
3. With nothing selected, switch to Dev Mode with the toolbar toggle or `Shift+D`
4. In the MCP server section of the right sidebar, click **Enable desktop MCP server**

A confirmation message appears at the bottom of the screen when the server is running.

### Step 2: Connect your client

For other clients, add the server using this configuration, then refresh or restart the server in your client. If the connection fails or no tools appear, check that the server is still enabled in the Figma desktop app.

```json
{
  "mcpServers": {
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

### Step 3 (optional): Adjust desktop server settings

In the MCP server section of the right sidebar in Dev Mode, click **Open settings modal**.

| Setting | Description |
| --- | --- |
| Image settings: Local server | Returns localhost links to images, so you can use the actual image assets wherever your file is rendered |
| Image settings: Download assets | Lets the MCP server download image assets (icons, images) from Figma into your project |
| Enable Code Connect | Includes Code Connect mappings in responses, so generated code can reuse components from your codebase |

### Steps for each client

Xcode supports the remote server only.

**Claude Code:**

```bash
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp
```

Restart Claude Code, then type `/mcp` to confirm the server is listed. Manage it with `claude mcp list`, `claude mcp get figma-desktop`, `claude mcp remove figma-desktop`.

**Codex:** Settings → Settings → MCP servers → Add server. Change the server type from STDIO to Streamable HTTP, enter name `figma-desktop` and URL `http://127.0.0.1:3845/mcp`, then Save. Works while the Figma desktop app is open and the desktop server is on.

**Cursor:** Command palette → Cursor Settings → Tools & MCP → Add Custom MCP, then add the JSON configuration above and save.

**VS Code:** Command palette → `MCP: Add Server` → HTTP → paste the server URL → ID `figma-desktop` → choose where to save (all projects or current workspace). Open chat in Agent mode and type `#get_design_context` to check that tools are available; if none appear, restart the Figma desktop app and VS Code.

### Figma for Government

Figma for Government supports the desktop server only; follow the same steps using the Figma for Government desktop app.

Available tools: `get_screenshot`, `get_design_context`, `get_metadata`, `get_figjam`, `get_variable_defs`, `get_code_connect_map`, `add_code_connect_map`, `create_design_system_rules` (MCP prompt).

Not available on Figma for Government: the remote MCP server; writing to the canvas (including `use_figma`); sending UI to Figma (including `generate_figma_design`); the Code Connect UI (the Code Connect CLI is supported); agent skills.

## Notes

- Desktop server does not support remote-only tools (`create_new_file`, `generate_diagram`, `use_figma`, `upload_assets`, etc.)
- The Figma desktop app must remain open and connected for the server to be available
- The official URL is now `/docs/figma-mcp-server/local-server-installation/`; the old `/docs/figma-mcp-server/desktop-server-installation/` returned 404 (checked 2026-10-17). The page title still says "desktop server", and this file name is kept
- Caution: MCP services for Figma for Government are not included in Figma's FedRAMP audit (Figma is working to bring them into scope for a future audit)

## Related

- [Remote Server Installation](./remote-server-installation.md)
- [Tools and Prompts](./tools-and-prompts.md)
- [Code Connect Integration](./code-connect-integration.md)
