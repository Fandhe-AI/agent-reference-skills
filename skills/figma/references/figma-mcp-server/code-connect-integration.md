# Code Connect Integration

Enhances Figma MCP server output with real implementation details from your codebase. When components are connected via Code Connect, the server wraps generated code in `<CodeConnectSnippet>` with design properties, import statements, usage examples, and custom instructions.

## Signature / Usage

Two implementation approaches:

### Code Connect CLI

Provides the richest output:

- Import statements from explicit `imports` fields or auto-populated `source` fields
- Full user-defined code snippets showing direct implementation
- Detailed prop mappings and component source paths

### Code Connect UI

Auto-generates content without a CLI:

- Import statements based on mapped component paths and names
- Snippets automatically created from design component names and current property values
- Custom instructions added through **Add instructions for MCP** in the UI

## Options / Props

Context injected into `<CodeConnectSnippet>` by the MCP server:

| Field | Description |
|-------|-------------|
| Design properties | Current variant values, boolean props, text content from Figma components |
| Import statements | How to import components from your library |
| Usage examples | Actual component implementation patterns from your codebase |
| Custom guidance | Team-specific conventions and best practices |

## Notes

- Prioritize connecting frequently-used design system components first
- Document component-specific patterns using custom instructions in Code Connect UI
- Keep mappings synchronized with codebase changes to prevent stale suggestions
- Test and refine instructions using the Code Connect UI preview before rolling out
- Components must be published in Figma before Code Connect integration takes effect with write-to-canvas

## Related

- [Tools and Prompts](./tools-and-prompts.md)
- [Write to Canvas](./write-to-canvas.md)
- [Desktop Server Installation](./desktop-server-installation.md)
- [Structure Figma File](./structure-figma-file.md)
