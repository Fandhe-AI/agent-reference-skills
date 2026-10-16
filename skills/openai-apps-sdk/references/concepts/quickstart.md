# Quickstart

Plugins extend and customize ChatGPT and Codex. A plugin can include skills that provide instructions and resources, an MCP server that exposes tools, or both. This tutorial creates a personal plugin by connecting an MCP server and invoking its tool from ChatGPT Work.

## Signature / Usage

```text
Connect your MCP server (Add custom MCP server):
1. Go to ChatGPT Plugins (chatgpt.com/plugins).
2. Select the plus button, then Add custom MCP server.
3. Enter a name; Server URL https://tinymcp.dev/api/moldy-aloof-zettabyte/mcp ;
   Authentication: No authentication.
4. Review the risk warning, select "I understand and want to continue".
5. Select "Create as a plugin".

Test the plugin:
1. Open your personal plugins (chatgpt.com/plugins?view=personal); the plugin appears there.
2. Open the plugin, select the plus button to install it.
3. On the ChatGPT homepage, switch from Chat to Work, start a new Work chat.
4. Type @ and select the plugin to invoke it directly.
5. Ask it to roll one 20-sided die; confirm it calls roll_dice once with sides = 20
   and returns one value from 1 through 20.
```

## Notes

- ChatGPT and Codex share one universal plugin directory; public plugins are published once and become discoverable from supported surfaces in both products.
- The quickstart uses a public example MCP server that exposes a read-only `roll_dice` tool and needs no authentication.
- The "turn on Developer mode" prerequisite (Settings -> Security and login) was removed from the official docs (fetched 2026-10-17); the flow now starts at the plus button and **Add custom MCP server**.
- Custom UI is optional and not part of the quickstart.
- Test several realistic inputs (different values, invalid values, requests that should not call the tool) and refine tool metadata when the wrong tool is selected.

## Related

- [Plugin Architecture](./plugin-architecture.md)
- [MCP server](./mcp-server.md)
- [Skills (plugin skills)](./plugin-skills.md)
