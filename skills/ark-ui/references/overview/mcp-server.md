# MCP Server

The Ark UI MCP Server is a Model Context Protocol implementation that lets AI agents build design system components with full Ark UI knowledge, generating consistent code across React, Vue, Solid, and Svelte.

## Signature / Usage

```bash
# Claude Code
claude mcp add ark-ui -- npx -y @ark-ui/mcp
```

## Options / Props

| Tool | Description |
| --- | --- |
| `list_components` | Returns a full list of all available components |
| `list_examples` | Displays various component usage patterns |
| `get_example` | Retrieves code examples and usage patterns |
| `styling_guide` | Provides styling guidelines for components (data attributes and CSS variables) |

## Notes

- Package: `@ark-ui/mcp`, transport: stdio.
- Also integrates with VS Code (`.vscode/mcp.json`), Cursor (`.cursor/mcp.json`), Windsurf, and Zed via their respective MCP configuration files.
- Typical usage is a natural-language prompt in the connected agent's chat interface, e.g. "Build me a checkbox with ark ui".

## Related

- [LLMs.txt](./llms-txt.md)
