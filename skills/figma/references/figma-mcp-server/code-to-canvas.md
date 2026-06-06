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
| Server | Remote Figma MCP server |
| Figma seat | Full seat required for files outside your drafts |
| File permission | Edit permission required to modify existing files |

## Notes

- Captured frames become standard Figma design layers — fully editable, organizable, and annotatable
- Clients typically infer that subsequent captures should go to the same file
- For live web apps, use tools like Playwright to inject the required capture scripts
- Supports capturing a single screen or an entire multi-step flow in one session

### Supported Clients

Augment, Claude Code, Codex by OpenAI, Cursor, Factory, Firebender, VS Code, Warp

## Related

- [Remote Server Installation](./remote-server-installation.md)
- [Tools and Prompts](./tools-and-prompts.md)
- [Write to Canvas](./write-to-canvas.md)
