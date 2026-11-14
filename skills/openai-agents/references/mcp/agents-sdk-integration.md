# MCP Integration into the Agents SDK

The Agents SDK supports two primary approaches for integrating Model Context Protocol (MCP) servers: hosted MCP tools and local/private MCP servers.

## Signature / Usage

Attach a hosted MCP server:

```typescript
import { Agent, hostedMcpTool } from "@openai/agents";

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
from agents import Agent, HostedMCPTool

agent = Agent(
    name="MCP assistant",
    instructions="Use the MCP tools to answer questions.",
    tools=[
        HostedMCPTool(
            tool_config={
                "type": "mcp",
                "server_label": "gitmcp",
                "server_url": "https://gitmcp.io/openai/codex",
                "require_approval": "never",
            }
        )
    ],
)
```

Connect a local MCP server:

```typescript
import { Agent, MCPServerStdio, run } from "@openai/agents";

const server = new MCPServerStdio({
  name: "Filesystem MCP Server",
  fullCommand:
    "npx -y @modelcontextprotocol/server-filesystem fixtures/sample_files",
});

await server.connect();

try {
  const agent = new Agent({
    name: "Filesystem assistant",
    instructions: "Read files with the MCP tools before answering.",
    mcpServers: [server],
  });

  const result = await run(agent, "Read the files and list them.");
  console.log(result.finalOutput);
} finally {
  await server.close();
}
```

```python
import asyncio

from agents import Agent, Runner
from agents.mcp import MCPServerStdio


async def main() -> None:
    async with MCPServerStdio(
        name="Filesystem MCP Server",
        params={
            "command": "npx",
            "args": [
                "-y",
                "@modelcontextprotocol/server-filesystem",
                "./sample_files",
            ],
        },
    ) as server:
        agent = Agent(
            name="Filesystem assistant",
            instructions="Read files with the MCP tools before answering.",
            mcp_servers=[server],
        )
        result = await Runner.run(agent, "Read the files and list them.")
        print(result.final_output)


if __name__ == "__main__":
    asyncio.run(main())
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `hostedMcpTool` / `HostedMCPTool` | tool factory | For public, remotely-hosted servers where the model calls the remote MCP server through the hosted surface (server-side, no local runtime involvement). |
| `MCPServerStdio` | class | For local/private MCP servers your runtime launches over stdio and manages connectivity/approvals for. |
| `mcpServers` / `mcp_servers` | Agent option | Attaches one or more local MCP server connections to an `Agent`. |

### Choose what lives in the SDK

| Need | Start with | Why |
|------|-----------|-----|
| Give an agent access to public, remotely hosted MCP tools | Hosted MCP tools in the SDK | The model can call the remote MCP server through the hosted surface |
| Connect local or private MCP servers from your runtime | SDK-managed MCP servers over stdio or streamable HTTP | Your runtime owns the connection, approvals, and network boundaries |
| Debug prompts, tools, handoffs, or approvals | Built-in tracing | Traces show the end-to-end record before you formalize evals |

## Notes

- Source: https://developers.openai.com/api/docs/guides/agents/integrations-observability (fetched 2026-11-14).
- Tool capability semantics live in Using tools (`/api/docs/guides/tools`); for the platform-wide MCP concept, trust model, and product support story, the canonical reference is MCP servers (`/api/docs/guides/tools-connectors-mcp`).
- Choose hosted MCP for public remote servers that fit the platform's trust model; choose local transports (stdio/HTTP) when the server is private or needs runtime-managed connectivity and approvals.
- Tracing is enabled by default and captures model calls, tool invocations/results, handoffs, and guardrails, including MCP tool calls. Group multiple runs into one trace with `withTrace()` (TypeScript) or the `trace()` context manager (Python).

## Related

- [MCP and Connectors](./mcp-and-connectors.md)
- [MCP in Realtime Sessions](./realtime-sessions.md)
