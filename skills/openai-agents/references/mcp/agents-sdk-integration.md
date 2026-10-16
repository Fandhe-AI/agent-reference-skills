# MCP Integration into the Agents SDK

The Agents SDK supports two primary approaches for integrating Model Context Protocol (MCP) servers: hosted MCP tools and local/private MCP servers.

## Signature / Usage

```typescript
// Hosted MCP tool (TypeScript)
const agent = new Agent({
  name: "MCP assistant",
  instructions: "Use the MCP tools to answer questions.",
  tools: [
    hostedMcpTool({
      serverLabel: "gitmcp",
      serverUrl: "https://gitmcp.io/openai/codex",
    }),
  ],
});
```

```python
# Hosted MCP tool (Python)
tools=[
    HostedMCPTool(
        tool_config={
            "type": "mcp",
            "server_label": "gitmcp",
            "server_url": "https://gitmcp.io/openai/codex",
            "require_approval": "never",
        }
    )
]
```

```typescript
// Local MCP server over stdio (TypeScript)
const server = new MCPServerStdio({
  name: "Filesystem MCP Server",
  fullCommand: "npx -y @modelcontextprotocol/server-filesystem fixtures/sample_files",
});

await server.connect();
const agent = new Agent({ mcpServers: [server] });
```

```python
# Local MCP server over stdio (Python)
async with MCPServerStdio(
    name="Filesystem MCP Server",
    params={"command": "npx", "args": [...]}
) as server:
    agent = Agent(mcp_servers=[server])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `hostedMcpTool` / `HostedMCPTool` | tool factory | For public, remotely-hosted servers where the model calls the remote MCP server through the hosted surface (server-side, no local runtime involvement). |
| `MCPServerStdio` | class | For local/private MCP servers your runtime launches over stdio and manages connectivity/approvals for. |
| `mcpServers` / `mcp_servers` | Agent option | Attaches one or more local MCP server connections to an `Agent`. |

## Choose what lives in the SDK

| Need | Start with | Why |
|------|-----------|-----|
| Give an agent access to public, remotely hosted MCP tools | Hosted MCP tools in the SDK | The model can call the remote MCP server through the hosted surface |
| Connect local or private MCP servers from your runtime | SDK-managed MCP servers over stdio or streamable HTTP | Your runtime owns the connection, approvals, and network boundaries |
| Debug prompts, tools, handoffs, or approvals | Built-in tracing | Traces show the end-to-end record before you formalize evals |

## Notes

- Choose hosted MCP for public remote servers that fit the platform's trust model; choose local transports (stdio/HTTP) when the server is private or needs runtime-managed connectivity and approvals.
- Tracing is enabled by default and captures model calls, tool invocations/results, handoffs, and guardrails, including MCP tool calls. Group multiple runs into one trace with `withTrace()` (TypeScript) or the `trace()` context manager (Python).

## Related

- [MCP and Connectors](./mcp-and-connectors.md)
- [MCP in Realtime Sessions](./realtime-sessions.md)
