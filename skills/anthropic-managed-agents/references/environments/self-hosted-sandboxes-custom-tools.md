<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes-custom-tools / last verified: 2026-10-17 -->

# Custom tools in self-hosted sandboxes

Serve custom tools from a self-hosted sandbox worker, and wrap an MCP server inside your network as custom tools without running a tunnel. The environment key authorizes posting custom tool results, so your Claude API key stays off the worker host.

## Signature / Usage

Declare the tool on the agent, then register the implementation with the SDK worker's `tools` (go: `ToolsFunc`) factory alongside the built-in toolset.

```json
{
  "type": "custom",
  "name": "get_order_status",
  "description": "Look up an order in the internal fulfillment system by order ID.",
  "input_schema": {
    "type": "object",
    "properties": {
      "order_id": { "type": "string", "description": "The order ID" }
    },
    "required": ["order_id"]
  }
}
```

```python
@beta_async_tool
async def get_order_status(order_id: str) -> str:
    """Look up an order in the internal fulfillment system by order ID."""
    # Runs on the worker host: call anything the sandbox can reach.
    return f"Order {order_id}: shipped"

await EnvironmentWorker(
    client,
    environment_id=environment_id,
    environment_key=environment_key,
    workdir="/workspace",
    tools=lambda env: [*beta_agent_toolset_20260401(env), get_order_status],
).run()
```

## Options / Props

Declaration limits for wrapped MCP tools (Managed Agents API):

| Field | Rule |
|-------|------|
| `name` | Unique per agent. Letters, digits, underscores, hyphens, 1-128 characters. Cannot match a built-in agent tool such as `bash` or `read`, or use the reserved `mcp__` or `ant__` prefix |
| `description` | Required and non-empty |
| `input_schema` | Accepts keywords such as `additionalProperties` and `title`. Rejects reference keywords such as `$ref` anywhere, and top-level `oneOf`, `anyOf`, `allOf`. Property names use letters, digits, underscores, dots, hyphens, 1-64 characters |
| The agent's `tools` array | At most 256 entries. Each wrapped tool is one entry, and the built-in toolset is one more |

## Notes

- Serving custom tools requires the SDK worker; the `ant` CLI worker cannot register a custom tool implementation. In the sandbox-per-session pattern, run the SDK worker inside the sandbox. C#, Java, PHP, Ruby have no `EnvironmentWorker`; answer custom tool calls by sending each result on the session's event stream.
- The worker answers only the tools registered with it. A tool declared on the agent but served by no worker or client pauses the session with a `requires_action` stop reason until something posts the result.
- Wrap an MCP server: the MCP connector connects from Anthropic's side (needs an endpoint Anthropic can reach, directly or via an MCP tunnel). To use a server only your network can reach, make the worker the MCP client and declare the server's tools as `custom` tools (MCP `name`, `description`, `inputSchema` map one to one). Flow: the agent emits `agent.custom_tool_use`, the worker forwards the call over its open MCP session, then posts `user.custom_tool_result`.
- Install an MCP SDK alongside the Anthropic SDK: `pip install "anthropic[mcp]" "mcp>=1.24"` (typescript: `npm install @modelcontextprotocol/sdk`; go: `go get github.com/modelcontextprotocol/go-sdk`). In the worker, convert tools with `async_mcp_tool` (typescript: `mcpTools`; go: `mcp.NewBetaTools`) and keep one MCP session open for the life of the worker.
- Declare tools wherever you create agents (uses your Claude API key), not on the worker host.
- Tools are declared, not discovered at runtime: the worker lists the server's tools once at startup. When the server's tools change, declare them again (on the agent or on an idle session) and restart the worker. If the server paginates its tool list, declare every page.
- Two servers exposing the same tool name: define the wrapper yourself under a prefixed name. Schemas factored into `$defs` (e.g. by pydantic) must be inlined.
- MCP tool errors, and MCP content with no tool result equivalent (audio blocks, resource links), surface as error tool results. Set a timeout on the MCP client (the Python example uses `read_timeout_seconds`).
- Wrap only servers you operate or trust: names, descriptions, and results enter the model's context and can influence other tools, including `bash` on the worker host.
- Permission policies do not apply to wrapped tools; the worker executes every call, so put any approval step in your own tool code.
- The 256 limit is counted differently across sources: the API reference says "256 tools across all toolsets", while this guide says 256 entries in the `tools` array with the built-in toolset counting as one entry. Not settled by the sources; near the limit, stay within 256 under the stricter reading (total tools after expansion). See `../endpoints/agents.md`.
- Status: beta (`managed-agents-2026-04-01`).

## Related

- [Deploy self-hosted workers](./self-hosted-sandboxes-workers.md)
- [Self-hosted worker reference](./self-hosted-sandboxes-reference.md)
- [Monitor and troubleshoot self-hosted workers](./self-hosted-sandboxes-operations.md)
