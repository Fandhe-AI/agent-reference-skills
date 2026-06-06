# Tools and Prompts

Complete reference for all tools and example prompts exposed by the Figma MCP Server.

## Options / Props

### Tools

| Tool | Description | Requires File | Remote Only |
|------|-------------|---------------|-------------|
| `add_code_connect_map` | Maps Figma node IDs to codebase components | Figma Design | No |
| `create_new_file` | Creates a new blank Figma Design, FigJam, or Figma Slides file | None | Yes |
| `generate_diagram` | Converts Mermaid syntax or descriptions to FigJam diagrams | None | Yes |
| `generate_figma_design` | Sends live UI as design layers to Figma files | Figma Design | Yes |
| `get_code_connect_map` | Retrieves mappings between Figma instances and code components | Figma Design | No |
| `get_code_connect_suggestions` | Detects suggested Code Connect mappings | Figma Design | No |
| `get_context_for_code_connect` | Retrieves context for generating Code Connect templates | Figma Design | Yes |
| `get_design_context` | Extracts design context (default output: React + Tailwind) | Figma Design, Make | No |
| `get_figjam` | Returns FigJam metadata in XML format with screenshots | FigJam | No |
| `get_libraries` | Returns subscribed and available design libraries | Figma Design | Yes |
| `get_metadata` | Returns sparse XML representation of the current selection | Figma Design | No |
| `get_screenshot` | Takes screenshots of selected elements | Design, FigJam, Slides | No |
| `get_variable_defs` | Returns variables and styles used in the selection | Figma Design | No |
| `search_design_system` | Searches across all connected design libraries | Figma Design | Yes |
| `send_code_connect_mappings` | Confirms Code Connect mappings after suggestions | Figma Design | No |
| `upload_assets` | Uploads PNG, JPG, GIF, WebP assets (max 10 MB) | Design, FigJam, Slides | Yes |
| `use_figma` | General-purpose tool for creating/editing Figma objects | Design, FigJam, Slides | Yes |
| `whoami` | Returns authenticated user identity and plan info | None | Yes |

### Example Prompts

**Code generation from design:**

```
"Generate my Figma selection in Vue"
"Implement the selected frame using Chakra UI components"
"Generate iOS SwiftUI code from the selected Figma frame"
```

**File operations:**

```
"Create a new Figma file called 'Homepage Redesign'"
"Add a new frame to my Figma file"
```

**Diagram creation (FigJam):**

```
"Create a flowchart for the user authentication flow"
"Generate a Gantt chart for the project timeline"
```

**Design system & tokens:**

```
"Search for a button component in my design system"
"Get the variable names and values used in this frame"
"Create a color variable collection from design tokens"
```

## Notes

- Tools marked **Remote Only** are unavailable when using the desktop server (`http://127.0.0.1:3845/mcp`)
- `get_design_context` outputs React + Tailwind by default; specify another framework in your prompt to override
- `use_figma` is the general write tool; prefer explicit prompt phrasing over relying on automatic tool selection (see [Trigger Specific Tools](./trigger-specific-tools.md))
- `upload_assets` has a 10 MB per-file limit

## Related

- [Remote Server Installation](./remote-server-installation.md)
- [Trigger Specific Tools](./trigger-specific-tools.md)
- [Code Connect Integration](./code-connect-integration.md)
