<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-connector / last verified: 2026-08-07 -->

# MCP connector

Connect to remote Model Context Protocol (MCP) servers directly from the Messages API, without a separate MCP client. Beta feature, beta header `mcp-client-2025-11-20`.

## Signature / Usage

```json
{
  "model": "claude-opus-5",
  "max_tokens": 1000,
  "messages": [{"role": "user", "content": "What tools do you have available?"}],
  "mcp_servers": [
    {
      "type": "url",
      "url": "https://example-server.modelcontextprotocol.io/sse",
      "name": "example-mcp",
      "authorization_token": "YOUR_TOKEN"
    }
  ],
  "tools": [
    {"type": "mcp_toolset", "mcp_server_name": "example-mcp"}
  ]
}
```

## Options / Props

| Property (MCP server def) | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | string | Yes | Currently only `"url"` |
| `url` | string | Yes | Must start with `https://` |
| `name` | string | Yes | Unique identifier referenced by exactly one MCPToolset |
| `authorization_token` | string | No | OAuth Bearer token if required |

| Property (MCPToolset) | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | string | Yes | Must be `"mcp_toolset"` |
| `mcp_server_name` | string | Yes | Must match a server in `mcp_servers` |
| `default_config` | object | No | Default `{enabled, defer_loading}` for all tools in the set |
| `configs` | object | No | Per-tool overrides, keyed by tool name |
| `cache_control` | object | No | Prompt caching breakpoint for this toolset |

## Notes

- Only `tools` calls from the MCP spec are supported (no prompts/resources); server must be publicly exposed via Streamable HTTP or SSE (no local STDIO).
- Config precedence: tool-specific `configs` > set-level `default_config` > system defaults. Every server in `mcp_servers` must be referenced by exactly one MCPToolset.
- Not covered by Zero Data Retention (ZDR).
- Client-side MCP helpers (`mcpTools`, `mcpMessages`, `mcpResourceToContent`, `mcpResourceToFile`) exist for local/stdio servers, prompts, and resources when the `mcp_servers` API parameter is insufficient.
- The deprecated `mcp-client-2025-04-04` header used `tool_configuration` on the server definition instead of a separate MCPToolset; migrate per the in-page migration guide.
- This is the Claude API's consumption-side MCP connector (Claude connects out to remote MCP servers). Claude Code's own MCP server configuration is a separate topic — see `anthropic-claude-code-extend`.

## Related

- [remote-mcp-servers.md](./remote-mcp-servers.md)
