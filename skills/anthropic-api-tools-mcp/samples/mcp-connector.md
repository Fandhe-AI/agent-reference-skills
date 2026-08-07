<!-- source: https://platform.claude.com/docs/en/agents-and-tools/mcp-connector / last verified: 2026-08-07 -->

# MCP Connector: Connect to a Remote MCP Server

Connect the Messages API directly to a remote Model Context Protocol server via `mcp_servers`, without running a separate MCP client.

```bash
curl https://api.anthropic.com/v1/messages \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: mcp-client-2025-11-20" \
  -d '{
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
      {
        "type": "mcp_toolset",
        "mcp_server_name": "example-mcp"
      }
    ]
  }'
```

```python
client = anthropic.Anthropic()

response = client.beta.messages.create(
    model="claude-opus-5",
    max_tokens=1000,
    messages=[{"role": "user", "content": "What tools do you have available?"}],
    mcp_servers=[
        {
            "type": "url",
            "url": "https://example-server.modelcontextprotocol.io/sse",
            "name": "example-mcp",
            "authorization_token": "YOUR_TOKEN",
        }
    ],
    tools=[{"type": "mcp_toolset", "mcp_server_name": "example-mcp"}],
    betas=["mcp-client-2025-11-20"],
)

print(response)
```

## Notes

- `mcp_servers` defines connection details (`type: "url"`, `url` must start with `https://`, `name`, optional `authorization_token`); `tools` carries an `MCPToolset` (`type: "mcp_toolset"`) per server, referenced by `mcp_server_name`.
- Every server in `mcp_servers` must be referenced by exactly one `MCPToolset`; allowlist/denylist individual tools via `default_config`/`configs` with `enabled`/`defer_loading`.
- Only `tools` calls from the MCP spec are supported (no prompts/resources); the server must be publicly exposed via Streamable HTTP or SSE — local STDIO servers need the client-side helpers instead.
- Requires beta header `mcp-client-2025-11-20`; not covered by Zero Data Retention (ZDR).
- This is the API's consumption-side MCP connector (Claude connects out to remote servers) — distinct from configuring Claude Code's own MCP servers, covered by `anthropic-claude-code-extend`.
