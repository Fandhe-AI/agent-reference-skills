<!-- source: https://code.claude.com/docs/en/agent-sdk/mcp / last verified: 2026-10-16 -->

# Connect to External Tools with MCP

Configure MCP (Model Context Protocol) servers to extend the Agent SDK with external tools: databases, APIs like Slack and GitHub, or other services, without writing custom tool implementations.

## Signature / Usage

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "List files in my project",
  options: {
    mcpServers: {
      filesystem: {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/projects"]
      }
    },
    allowedTools: ["mcp__filesystem__*"]
  }
})) {
  if (message.type === "result" && message.subtype === "success") console.log(message.result);
}
```

MCP servers can also be declared in a `.mcp.json` file at the project root, loaded when the `project` setting source is enabled.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type: "http" \| "sse"` | server config | Remote server via HTTP or SSE, with optional `headers` for auth |
| `command` / `args` / `env` | server config | stdio server: local process communicating via stdin/stdout |
| `alwaysLoad` | boolean | Exempts a server's tools from tool-search deferral; waits for it at startup (capped by `MCP_CONNECT_TIMEOUT_MS`) |
| `allowedTools` | string[] | MCP tools follow `mcp__<server-name>__<tool-name>`; wildcards like `mcp__github__*` allowed |

## Notes

- Prefer `allowedTools` over `permissionMode: "bypassPermissions"` for MCP access; `acceptEdits` does not auto-approve MCP tools.
- Server connection status appears in the `system`/`init` message as `pending`, `connected`, `failed`, `needs-auth`, or `disabled`; treat only `failed`/`needs-auth` as unusable.
- The SDK doesn't run an interactive OAuth flow; complete OAuth in your own app and pass the resulting token via `headers`.
- Tool output over 25,000 tokens (default `MAX_MCP_OUTPUT_TOKENS`) is persisted to a file and replaced with an error naming the path.
- First-turn wait: set `CLAUDE_CODE_MCP_STARTUP_WAIT_MS` in the `env` option (e.g. `"5000"`) to make the first turn wait up to that many milliseconds for every pending server, whether or not tool search is available. The deadline also replaces the `MCP_TIMEOUT` first-turn wait for stdio, HTTP, and SSE servers in `options.mcpServers`. `0` skips the wait. A `permissionPromptToolName` server keeps its own `MCP_TIMEOUT` wait. Requires Claude Code v2.1.274 or later.
- To block startup itself on the whole connection batch, set `MCP_CONNECTION_NONBLOCKING=0`; Claude Code caps that wait at 5 seconds by default, adjustable with `MCP_CONNECT_TIMEOUT_MS` (milliseconds). Servers still pending keep connecting in the background.
- TypeScript: when a tool's input schema on a `createSdkMcpServer()` server can't be converted to JSON Schema, that tool is left out of the server's tool list and a warning is emitted (under Node.js a process warning with code `CLAUDE_SDK_MCP_TOOL_SCHEMA_UNCONVERTIBLE`). Before TypeScript Agent SDK v0.3.286, one unconvertible schema made the whole tool listing fail without a warning.
- This is Claude Agent SDK (library) MCP configuration — connecting the SDK application to external MCP servers. The Claude Code CLI's own MCP configuration (installation scopes, `/mcp` commands) is documented under anthropic-claude-code-extend. The Claude API (Messages API) MCP connector for server-side tool use is documented under anthropic-api-tools-mcp. Building your own in-process MCP server is covered by custom tools (Agent SDK only, distinct from all three).

## Related

- [Custom Tools](./custom-tools.md)
- [Tool Search](./tool-search.md)
