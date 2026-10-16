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

Layer 1 — `next-devtools-mcp` tools (connect the agent client to the dev server):

| Name | Type | Description |
|------|------|-------------|
| `nextjs_index` | MCP tool | Discovers running Next.js dev servers and lists the runtime tools each one exposes |
| `nextjs_call` | MCP tool | Calls a runtime tool on a discovered dev server (e.g. `nextjs_call` with `port: 3000, toolName: "get_errors"`) |
| `nextjs_docs` | MCP tool | Points the agent at the version-matched docs bundled in `node_modules/next/dist/docs/` (does not do the work itself) |
| `browser_eval` | MCP tool | Points the agent at the `agent-browser` CLI for verifying pages in a real browser (does not do the work itself) |

Layer 2 — runtime tools exposed by the dev server at `/_next/mcp`, called through `nextjs_call`:

| Name | Type | Description |
|------|------|-------------|
| `get_errors` | runtime tool | Current error state, including Next.js global errors such as `next.config` validation, browser runtime errors, and build errors with source-mapped stack traces |
| `get_logs` | runtime tool | Path to the dev log file containing browser console logs and server output |
| `get_page_metadata` | runtime tool | Runtime metadata about what contributes to the current page render; requires the page to be open in a browser |
| `get_project_metadata` | runtime tool | Project path and dev server URL |
| `get_routes` | runtime tool | All routes that will become entry points by scanning the filesystem, grouped by router type (`appRouter`, `pagesRouter`); dynamic segments as `[param]` / `[...slug]` |
| `get_server_action_by_id` | runtime tool | Look up a Server Action by ID to find its source file and export name |
| `get_compilation_issues` | runtime tool | Builds the module graph for all routes and returns compilation issues (resolve errors, missing modules, transform errors); no browser session needed; Turbopack only |
| `compile_route` | runtime tool | Compiles a route without an HTTP request, via `routeSpecifier` (e.g. `/blog/[slug]`) or `path` (e.g. `/blog/hello-world`); returns compilation issues; Turbopack only |
| `get_request_insights` | runtime tool | Recent App Router request timelines, server fetches and cache behavior captured by the local span recorder; requires `experimental.requestInsights` |

## Notes

- Requires Next.js 16 or above.
- `next-devtools-mcp` auto-discovers and connects to the running `next dev` instance; no manual wiring beyond `.mcp.json`. Alternatively install it for the agents on your machine with `npx add-mcp next-devtools-mcp@latest`. Skills such as `next-dev-loop` call `/_next/mcp` directly, so they work without this setup.
- Tools such as `get_errors` and `get_page_metadata` read from active browser sessions, so open the pages you are working on in a browser.
- The `/_next/mcp` endpoint is enabled by default; set `experimental.mcpServer` to `false` in `next.config` to disable it (check this when the MCP server is not connecting).
- Also acts as a documentation gateway, pointing agents at the version-matched docs bundled at `node_modules/next/dist/docs/`.
- Integrates with [Playwright MCP](https://github.com/microsoft/playwright-mcp) for browser-based verification.
- Can connect to multiple Next.js instances running on different ports.

## Related

- [AI Coding Agents](./ai-agents.md)
