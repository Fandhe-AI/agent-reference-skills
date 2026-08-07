# Next.js MCP Server

Next.js 16+ ships a built-in MCP endpoint at `/_next/mcp` on the dev server, exposed to coding agents via the `next-devtools-mcp` package for real-time application state, errors, and route metadata.

## Signature / Usage

```json filename=".mcp.json"
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    }
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `get_errors` | MCP tool | Retrieve current build errors, runtime errors, and type errors from the dev server |
| `get_logs` | MCP tool | Get the path to the dev log file containing browser console logs and server output |
| `get_page_metadata` | MCP tool | Get metadata about specific pages: routes, components, rendering information |
| `get_project_metadata` | MCP tool | Retrieve project structure, configuration, and dev server URL |
| `get_routes` | MCP tool | Get all routes by scanning the filesystem, grouped by router type (`appRouter`, `pagesRouter`) |
| `get_server_action_by_id` | MCP tool | Look up Server Actions by ID to find source file and function name |
| `get_compilation_issues` | MCP tool | Retrieve compilation warnings/errors for the whole project (Turbopack only) |
| `compile_route` | MCP tool | Trigger on-demand compilation of a route via `routeSpecifier` or `path` without an HTTP request (Turbopack only) |

## Notes

- Requires Next.js 16 or above.
- `next-devtools-mcp` auto-discovers and connects to the running `next dev` instance; no manual wiring beyond `.mcp.json`.
- Also acts as a documentation gateway, pointing agents at the version-matched docs bundled at `node_modules/next/dist/docs/`.
- Integrates with [Playwright MCP](https://github.com/microsoft/playwright-mcp) for browser-based verification.
- Can connect to multiple Next.js instances running on different ports.

## Related

- [AI Coding Agents](./ai-agents.md)
