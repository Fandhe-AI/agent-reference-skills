<!-- source: https://code.claude.com/docs/en/agent-sdk/mcp / last verified: 2026-11-14 -->

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
| `allowedTools` | string[] | MCP tools follow `mcp__<server-name>__<tool-name>`; wildcards like `mcp__github__*` allowed. `.` and spaces in the server name become `_` (`my.server` → `mcp__my_server__list_issues`); plugin-provided servers use a `plugin_`-prefixed name |
| `timeout` | number | TypeScript: tool-call limit for a single SDK MCP server, passed to `createSdkMcpServer()` |
| `CLAUDE_CODE_MCP_STARTUP_WAIT_MS` | env string | First-turn wait in milliseconds for pending settings-file and plugin servers (set in the `env` option); see Connection timing below |
| `MCP_CONNECTION_NONBLOCKING` | env string | `0` makes startup wait for the whole connection batch (5 s cap by default, change with `MCP_CONNECT_TIMEOUT_MS`) |
| `MCP_TIMEOUT` / `MCP_TOOL_TIMEOUT` / `MAX_MCP_OUTPUT_TOKENS` | env | Connection limit (30 s default, ms) / running tool-call limit / output token cap |

## Notes

- Prefer `allowedTools` over `permissionMode: "bypassPermissions"` for MCP access; `acceptEdits` does not auto-approve MCP tools.
- Server connection status appears in the `system`/`init` message as `pending`, `connected`, `failed`, `needs-auth`, or `disabled`; treat only `failed`/`needs-auth` as unusable.
- The SDK doesn't run an interactive OAuth flow; complete OAuth in your own app and pass the resulting token via `headers`.
- First-turn wait: set `CLAUDE_CODE_MCP_STARTUP_WAIT_MS` in the `env` option (e.g. `"5000"`) to make the first turn wait up to that many milliseconds for pending settings-file and plugin servers, whether or not tool search is on. The same limit replaces the `MCP_TIMEOUT` wait for stdio, HTTP, and SSE servers in `options.mcpServers`. `0` skips the wait for every other server. Three waits apply whatever the value (including `0`): a `permissionPromptToolName` server and an in-process SDK server (up to `MCP_TIMEOUT` each), and a still-connecting named server (at least 2 seconds). Requires Claude Code v2.1.274 or later.
- To block startup itself on the whole connection batch, set `MCP_CONNECTION_NONBLOCKING=0`; Claude Code caps that wait at 5 seconds by default, adjustable with `MCP_CONNECT_TIMEOUT_MS` (milliseconds). `alwaysLoad: true` on a server makes startup wait up to the same cap for that server's tools. Servers still pending keep connecting in the background.
- The init message reports each server's status as of the moment it is sent; `pending` is not a failure by itself (server not yet connected, tool list served from cache and connected on first use, or deadline expired). After a drop mid-session a connected remote server returns to `pending` while reconnecting; after five failed attempts it reports `failed` (or `needs-auth`), though HTTP/SSE servers may keep retrying in the background. Call `mcpServerStatus()` / `reconnectMcpServer()` (TypeScript) or `get_mcp_status()` / `reconnect_mcp_server()` (Python `ClaudeSDKClient`) to poll or retry manually.
- `needs-auth` means Claude Code found no usable sign-in; pass a token in `headers` or sign in from an interactive Claude Code session on the same machine first. A `failed` status whose `error` starts with `Couldn't read the stored credentials` or `A request to MCP server` means the credential store could not be read.
- For the streamable HTTP transport use `"type": "http"` in code; `"streamable-http"` is accepted only as an alias in JSON config files such as `.mcp.json`.
- Output limits: a successful result without images larger than 25,000 tokens (`MAX_MCP_OUTPUT_TOKENS`) is saved to a file; unless the tool declares `anthropic/maxResultSizeChars`, a text result over 50,000 characters is saved to a file regardless of the token limit. Connections time out after 30 seconds by default (`MCP_TIMEOUT`, ms).
- TypeScript: when a tool's input schema on a `createSdkMcpServer()` server can't be converted to JSON Schema, that tool is left out of the server's tool list and a warning is emitted (under Node.js a process warning with code `CLAUDE_SDK_MCP_TOOL_SCHEMA_UNCONVERTIBLE`). Before TypeScript Agent SDK v0.3.286, one unconvertible schema made the whole tool listing fail without a warning.
- This is Claude Agent SDK (library) MCP configuration — connecting the SDK application to external MCP servers. The Claude Code CLI's own MCP configuration (installation scopes, `/mcp` commands) is documented under anthropic-claude-code-extend. The Claude API (Messages API) MCP connector for server-side tool use is documented under anthropic-api-tools-mcp. Building your own in-process MCP server is covered by custom tools (Agent SDK only, distinct from all three).
- Source: https://code.claude.com/docs/en/agent-sdk/mcp (fetched 2026-11-14)

### Connection timing

Claude Code starts connecting MCP servers when the session starts and sends the init message once the first-turn wait, if any, ends. Wait for servers in `options.mcpServers`:

| Server type | Delays the first turn? | First-turn wait timeout |
| --- | --- | --- |
| stdio, or HTTP/SSE without a cached tool list | Yes, until it connects | `MCP_TIMEOUT` (30 s default); connection fails at the deadline |
| Remote server with a cached tool list from a previous connection | No; cached tools available from the first turn | None; connects on its first tool call |
| In-process SDK server | Yes, until it connects and lists tools | `MCP_TIMEOUT` per connect attempt |

Pending servers from settings files (`.mcp.json`) or plugins: the first turn waits up to `MCP_TIMEOUT` if `options.mcpServers` includes a stdio, HTTP, or SSE server. Otherwise it waits up to 2 seconds for every pending server when `ANTHROPIC_BASE_URL` points to a gateway with `ENABLE_TOOL_SEARCH` unset, or when tool search is off; with tool search on (default) it waits up to 2 seconds only for servers with `alwaysLoad: true` or named servers. A server is "named" by listing any of its tools in `allowedTools` or a `permissions.allow` rule in `settings` (before v2.1.284 naming had no effect).

## Related

- [Custom Tools](./custom-tools.md)
- [Tool Search](./tool-search.md)
