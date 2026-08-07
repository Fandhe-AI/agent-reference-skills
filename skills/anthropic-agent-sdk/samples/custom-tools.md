<!-- source: https://code.claude.com/docs/en/agent-sdk/custom-tools.md / last verified: 2026-08-07 -->

# Custom Tools with In-Process MCP

Define a tool with `tool()`/`@tool`, wrap it in `createSdkMcpServer`/`create_sdk_mcp_server`, and expose it to the agent via `mcpServers`.

```typescript
import { tool, createSdkMcpServer, query } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

const getTemperature = tool(
  "get_temperature",
  "Get the current temperature at a location",
  { latitude: z.number(), longitude: z.number() },
  async (args) => {
    return { content: [{ type: "text", text: `Temperature: ...°F` }] };
  }
);

const weatherServer = createSdkMcpServer({
  name: "weather",
  version: "1.0.0",
  tools: [getTemperature]
});

for await (const message of query({
  prompt: "What's the temperature in San Francisco?",
  options: {
    mcpServers: { weather: weatherServer },
    allowedTools: ["mcp__weather__get_temperature"]
  }
})) {
  if (message.type === "result" && message.subtype === "success") console.log(message.result);
}
```

```python
from claude_agent_sdk import tool, create_sdk_mcp_server, query, ClaudeAgentOptions

@tool("get_temperature", "Get the current temperature at a location", {"latitude": float, "longitude": float})
async def get_temperature(args):
    return {"content": [{"type": "text", "text": "Temperature: ...°F"}]}

weather_server = create_sdk_mcp_server(name="weather", version="1.0.0", tools=[get_temperature])
```

## Notes

- A tool's fully qualified name becomes `mcp__{server_name}__{tool_name}` (here `mcp__weather__get_temperature`) — list it explicitly in `allowedTools`/`allowed_tools`.
- A handler returns `content` (required, array of `text`/`image`/`audio`/`resource`/`resource_link` blocks), plus optional `structuredContent` and `isError`.
- Tool search (on by default) defers SDK MCP tool schemas until needed; pass `alwaysLoad: true` (TypeScript) to keep a tool's schema in the initial prompt.
- This is Agent SDK (library) functionality for building an in-process MCP server. The Claude Code CLI's own tool/skill extension surface is documented under anthropic-claude-code-extend; the Claude API's (Messages API) tool-use / MCP connector is documented under anthropic-api-tools-mcp.
