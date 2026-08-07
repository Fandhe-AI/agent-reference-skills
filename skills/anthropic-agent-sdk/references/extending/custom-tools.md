<!-- source: https://code.claude.com/docs/en/agent-sdk/custom-tools / last verified: 2026-08-07 -->

# Custom Tools

Define custom tools with the Agent SDK's in-process MCP server so Claude can call your functions, hit your APIs, and perform domain-specific operations.

## Signature / Usage

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

A tool is defined by name, description, input schema (Zod in TypeScript, dict or JSON Schema in Python), and an async handler that returns `content` (required), `structuredContent` (optional), `isError` (optional). Wrap tools with `createSdkMcpServer`/`create_sdk_mcp_server` and pass to `mcpServers`; the tool's fully qualified name becomes `mcp__{server_name}__{tool_name}`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `readOnlyHint` | boolean | Tool does not modify its environment; allows parallel calls with other read-only tools |
| `destructiveHint` | boolean | Tool may perform destructive updates (informational) |
| `idempotentHint` | boolean | Repeated calls with same args have no additional effect (informational) |
| `openWorldHint` | boolean | Tool reaches systems outside the process (informational) |
| `structuredContent` | object | JSON object with machine-readable result, alongside `content` |
| `isError` | boolean | Marks handler result as a failed call so Claude can react |

## Notes

- Tool search (on by default) defers SDK MCP tool schemas until needed; pass `alwaysLoad: true` (TypeScript) to keep a tool's schema in the initial prompt.
- The `content` array accepts `text`, `image`, `audio`, `resource`, `resource_link` blocks; image data is base64 with no `data:` prefix.
- Python's `@tool` decorator forwards only `content` and `is_error`; return `structuredContent` by running a standalone MCP server instead.
- A handler's uncaught exception becomes an error result with the raw message; catching it and returning `isError: true` lets you compose the message Claude reads.
- This is Claude Agent SDK (library) functionality. The Claude Code CLI itself does not have a separate "custom tools" surface distinct from MCP; see MCP below. The Claude API (Messages API) tool-use / MCP connector equivalent is documented under anthropic-api-tools-mcp.

## Related

- [MCP](./mcp.md)
- [Tool Search](./tool-search.md)
