# MCP Server — Design to Code Workflow

Connect the Figma MCP server to Claude Code, select a frame, and generate implementation code with full design context.

```bash
# Step 1: Install Figma MCP server in Claude Code (plugin method — recommended)
claude plugin install figma@claude-plugins-official

# Or add manually
claude mcp add --transport http figma https://mcp.figma.com/mcp

# Authenticate: run /mcp in Claude Code and authorize via Figma OAuth
```

```
# Step 2: Open target Figma file and select a frame

# Step 3: Prompt Claude Code — examples

"Generate my Figma selection in React with Tailwind CSS"

"Implement the selected frame using Chakra UI components"

"Get the variable names and values used in this frame"

"Search for a Button component in my design system"
```

```json
// What the MCP server injects when Code Connect is configured:
// <CodeConnectSnippet>
// {
//   "imports": ["import { Button } from '@/components/Button'"],
//   "snippet": "<Button variant=\"primary\" disabled={false}>Label</Button>",
//   "designProperties": { "Type": "Primary", "Disabled": false }
// }
// </CodeConnectSnippet>
```

## Notes

- The remote server (`https://mcp.figma.com/mcp`) supports all tools including `use_figma`, `generate_diagram`, and `create_new_file`; the desktop server (`http://127.0.0.1:3845/mcp`) omits remote-only tools.
- `get_design_context` outputs React + Tailwind by default; specify a framework in the prompt to override.
- Write-to-canvas operations (e.g., `use_figma`, `generate_figma_design`) require a full Figma seat — Dev seats are read-only.
- Adding Code Connect mappings before prompting significantly improves generated code accuracy.
