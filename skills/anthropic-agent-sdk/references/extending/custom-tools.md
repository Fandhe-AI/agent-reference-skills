<!-- source: https://code.claude.com/docs/en/agent-sdk/custom-tools / last verified: 2026-11-14 -->

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

A tool is defined by name, description, input schema (Zod in TypeScript, dict or JSON Schema in Python), and an async handler that returns `content` (required), `structuredContent` (optional), `isError` (optional). Wrap tools with `createSdkMcpServer`/`create_sdk_mcp_server` and pass to `mcpServers`; the tool's fully qualified name becomes `mcp__` + server name + `__` + tool name (for example, tool `get_temperature` on server `weather` is `mcp__weather__get_temperature`). With several tools on one server, list each in `allowedTools` or use the wildcard `mcp__weather__*`.

### Require approval for specific tools

Set a tool's `permission_policy` to `always_ask` and `allowedTools` stops approving that tool's calls, so they can reach `canUseTool`. `always_deny` denies calls to the tool. TypeScript only; requires Agent SDK v0.3.301 or later. Put the entry in a `tools` array on the config object `createSdkMcpServer()` returns, not in the `tools` option passed into that function.

Adapted (not in the official docs): the `canUseTool` callback checks the tool name against an allowlist instead of approving every request.

```typescript
options: {
  mcpServers: {
    weather: {
      ...weatherServer,
      tools: [{ name: "get_temperature", permission_policy: "always_ask" as const }]
    }
  },
  allowedTools: ["mcp__weather__get_temperature"],
  permissionMode: "default",
  canUseTool: async (toolName, input) => {
    console.log(`Approval requested for ${toolName}`);
    if (toolName !== "mcp__weather__get_temperature") {
      return { behavior: "deny", message: "Tool not approved" };
    }
    return { behavior: "allow", updatedInput: input };
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `readOnlyHint` | boolean | Default `false`. Tool does not modify its environment; controls whether the tool can be called in parallel with other read-only tools |
| `destructiveHint` | boolean | Default `true`. Tool may perform destructive updates (informational only) |
| `idempotentHint` | boolean | Default `false`. Repeated calls with same args have no additional effect (informational only) |
| `openWorldHint` | boolean | Default `true`. Tool reaches systems outside the process (informational only) |
| `permission_policy` | `"always_ask"` \| `"always_deny"` | TypeScript only (v0.3.301+). Per-tool entry in the `tools` array of the object `createSdkMcpServer()` returns |
| `tools` (option) | string[] | Availability layer: only the listed built-ins stay in Claude's context; `[]` removes all built-ins. MCP tools are unaffected |
| `allowedTools` / `disallowedTools` | string[] | Permission layer: allowed tools are pre-approved; a bare built-in name in `disallowedTools` also removes it from context, a scoped rule such as `"Bash(rm *)"` only denies matching calls |
| `structuredContent` | object | JSON object with machine-readable result, alongside `content` |
| `isError` | boolean | Marks handler result as a failed call so Claude can react |

## Notes

- Tool annotations (the four hint fields above) are passed as the fifth argument to `tool()` in TypeScript, e.g. `{ annotations: { readOnlyHint: true } }`, or via the `annotations` keyword argument of the `@tool` decorator in Python (`ToolAnnotations(...)`). All hint fields are Booleans. Annotations are metadata, not enforcement: a tool marked `readOnlyHint: true` can still write to disk if the handler does; keep the annotation accurate to the handler.
- Tool search (on by default) defers SDK MCP tool schemas until needed; in TypeScript pass `alwaysLoad: true` in the `extras` argument of `tool()` or in the options of `createSdkMcpServer()` to keep a tool's schema in the initial prompt.
- The `content` array accepts `text`, `image`, `audio`, `resource`, `resource_link` blocks; image data is base64 with no `data:` prefix and requires `mimeType`. TypeScript saves audio blocks to disk and Claude receives the file path; Python drops audio blocks and logs a warning. Python also drops binary `resource.blob` blocks.
- When a TypeScript handler sets `structuredContent`, Claude receives the JSON plus the image and resource blocks in `content`; text blocks in `content` do not reach Claude.
- Python's `@tool` decorator forwards only `content` and `is_error`; return `structuredContent` by running a standalone MCP server instead.
- Set `destructiveHint: true` explicitly on any tool marked `always_ask`. Under `auto` or `plan` permission mode an unset `destructiveHint` counts as `false` for `always_ask` calls, so the auto mode classifier may approve them without reaching `canUseTool`.
- If the server key in `mcpServers` contains characters such as `.` or spaces, replace them with `_` in the `mcp__{server_name}__{tool_name}` name.
- Source: https://code.claude.com/docs/en/agent-sdk/custom-tools (fetched 2026-11-14)
- A handler's uncaught exception becomes an error result with the raw message; catching it and returning `isError: true` lets you compose the message Claude reads.
- This is Claude Agent SDK (library) functionality. The Claude Code CLI itself does not have a separate "custom tools" surface distinct from MCP; see MCP below. The Claude API (Messages API) tool-use / MCP connector equivalent is documented under anthropic-api-tools-mcp.

## Related

- [MCP](./mcp.md)
- [Tool Search](./tool-search.md)
