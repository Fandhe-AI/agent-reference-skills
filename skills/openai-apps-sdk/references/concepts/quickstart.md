# Quickstart

Plugins extend and customize ChatGPT and Codex. A plugin can include skills that provide instructions and resources, an MCP server that exposes tools, or both. This tutorial creates a personal plugin by connecting an MCP server and invoking its tool from ChatGPT Work.

## Signature / Usage

```text
1. Open ChatGPT → Settings → Security and login → turn on Developer mode.
2. Go to ChatGPT Plugins, select the plus button, enter the MCP server URL
   (e.g. https://tinymcp.dev/api/moldy-aloof-zettabyte/mcp).
3. Complete connection details and create the plugin.
4. Open your personal plugins (chatgpt.com/plugins?view=personal), install the plugin.
5. On the ChatGPT homepage, switch from Chat to Work, start a new Work chat.
6. Type @ and select the plugin to invoke it directly.
```

## Notes

- ChatGPT and Codex share one universal plugin directory; public plugins are published once and become discoverable from supported surfaces in both products.
- Custom UI is optional and not part of the quickstart.
- Test several realistic inputs (different values, invalid values, requests that should not call the tool) and refine tool metadata when the wrong tool is selected.

## Related

- [Plugin Architecture](./plugin-architecture.md)
- [MCP server](./mcp-server.md)
- [Skills (plugin skills)](./plugin-skills.md)
