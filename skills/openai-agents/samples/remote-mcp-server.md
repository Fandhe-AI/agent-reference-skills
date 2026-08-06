# Connecting an Agent to a Remote MCP Server

Give an Agent access to tools exposed by a remote MCP server, either via the hosted `HostedMCPTool` or a directly managed `MCPServerStreamableHttp` connection.

```python
import asyncio
from agents import Agent, HostedMCPTool, Runner

async def main() -> None:
    agent = Agent(
        name="Assistant",
        instructions="Use the hosted MCP server to answer questions.",
        tools=[
            HostedMCPTool(
                tool_config={
                    "type": "mcp",
                    "server_label": "deepwiki",
                    "server_url": "https://mcp.deepwiki.com/mcp",
                    "require_approval": "never",
                }
            )
        ],
    )

    result = await Runner.run(
        agent,
        "Which language is the repository openai/openai-agents-python written in?",
    )
    print(result.final_output)

asyncio.run(main())
```

```python
import asyncio
import os
from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHttp
from agents.model_settings import ModelSettings

async def main() -> None:
    token = os.environ["MCP_SERVER_TOKEN"]
    async with MCPServerStreamableHttp(
        name="Streamable HTTP Server",
        params={
            "url": "http://localhost:8000/mcp",
            "headers": {"Authorization": f"Bearer {token}"},
            "timeout": 10,
        },
        cache_tools_list=True,
    ) as server:
        agent = Agent(
            name="Assistant",
            instructions="Use the MCP tools to answer questions.",
            mcp_servers=[server],
            model_settings=ModelSettings(tool_choice="required"),
        )

        result = await Runner.run(agent, "Add 7 and 22.")
        print(result.final_output)

asyncio.run(main())
```

## Notes

- `HostedMCPTool` runs the MCP round-trip on OpenAI's infrastructure; `require_approval: "never"` skips manual tool-call approval.
- `MCPServerStreamableHttp` connects directly from the client process; use it (as an async context manager) when the server is self-hosted or on a private network.
- `cache_tools_list=True` avoids re-listing tools on every run; disable it if the server's tool set changes frequently.
- This is the OpenAI Agents SDK's MCP client usage — distinct from acting as an MCP server yourself.
