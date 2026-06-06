# Write to Canvas

Enables AI agents to create and modify native Figma content (frames, components, variables, auto layout) directly on the canvas using the `use_figma` tool. Output is editable design structure, not static screenshots.

## Signature / Usage

```
# Basic prompt pattern
"Using this Figma file: [URL], create a new page and build a settings screen with auto layout"

# From a selection link
"Using this selection: [link], convert these raw values to variables"

# Follow-up in the same file
"Add an empty state below that"
```

## Options / Props

| Requirement | Detail |
|-------------|--------|
| Figma seat | Full seat required (Dev seats are read-only) |
| File permission | Edit permission on the target file |
| Server | Remote Figma MCP server must be configured |
| Supported clients | Claude Code, Claude Desktop, Cursor, VS Code, Copilot CLI, and others |

## Notes

- Feature is **beta-level quality** and currently free; will become usage-based and paid after beta
- Response output limit: 20 KB per tool call
- No asset or image support in write operations
- Custom fonts not supported
- Components must be manually published before Code Connect integration works
- Workflow: system → canvas → code (not a screenshot, generates real Figma layer structure)

## Related

- [Remote Server Installation](./remote-server-installation.md)
- [Tools and Prompts](./tools-and-prompts.md)
- [Code Connect Integration](./code-connect-integration.md)
- [Write Effective Prompts](./write-effective-prompts.md)
