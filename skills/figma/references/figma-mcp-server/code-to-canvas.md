# Code to Canvas

Captures live UI from the browser and converts it into editable Figma frames using the `generate_figma_design` tool. Bridges code-first development with design collaboration by bringing real UI into Figma.

## Signature / Usage

```bash
# Step 1: Install and configure the remote Figma MCP server for your client

# Step 2: Prompt to initiate capture
"Start a local server for my app and capture the UI in a new Figma file"
"Start a local server for my app and capture the UI in [existing file URL]"
"Capture the UI to my clipboard"
```

After prompting, use the browser toolbar to select **Entire screen** or **Select element** for targeted capture.

## Options / Props

| Requirement | Detail |
|-------------|--------|
| Plan | Starter, Professional, Education, Organization, and Enterprise |
| File type | Figma Design |
| Server | Remote Figma MCP server with a supported MCP client |
| Figma seat | Full seat required for files outside your drafts |
| File permission | Edit permission required to modify existing files |

## Notes

- Captured frames become standard Figma design layers — fully editable, organizable, and annotatable
- Clients typically infer that subsequent captures should go to the same file
- For live web apps, use tools like Playwright to inject the required capture scripts
- Supports capturing a single screen or an entire multi-step flow in one session

### Supported Clients

Augment, Claude Code, Codex by OpenAI, Cursor, Factory, Firebender, VS Code, Warp, Xcode 27 beta

### Alternatives

- `html_to_figma`: turns HTML from your codebase (or HTML your agent creates) into design layers without running your app
- Figma Chrome extension: brings a page into Figma as a code layer you can keep building in Figma Make

### Troubleshooting

`generate_figma_design` and `use_figma` are remote-only. If they aren't listed in your client:

1. Check that `https://mcp.figma.com/mcp` is in your client's MCP configuration
2. Check whether the desktop server (`http://127.0.0.1:3845/mcp`) is also configured. This is the most common cause: because both servers have similar tool names, the client may use the desktop server and never load the remote-only tools. Remove or disable it (Claude Code: `claude mcp list`, then `claude mcp remove figma-desktop`)
3. Restart the client, since clients load their tool list at start

If you use both servers on purpose, name them differently (for example `figma` and `figma-desktop`) and name the remote server in prompts.

## Related

- [Remote Server Installation](./remote-server-installation.md)
- [Tools and Prompts](./tools-and-prompts.md)
- [Write to Canvas](./write-to-canvas.md)
