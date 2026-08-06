# Tool Search

Hosted `tool_search` tool: lets the model dynamically discover and load tool definitions at runtime instead of loading all definitions upfront, reducing token usage and cost. Only `gpt-5.4` and later models support `tool_search`.

## Signature / Usage

```json
{
    "tools": [
      {
        "type": "namespace",
        "name": "crm",
        "description": "CRM tools for customer lookup and order management.",
        "tools": [
          {
            "type": "function",
            "name": "list_open_orders",
            "description": "List open orders for a customer ID.",
            "defer_loading": true,
            "parameters": {
              "type": "object",
              "properties": {
                "customer_id": { "type": "string" }
              },
              "required": ["customer_id"],
              "additionalProperties": false
            }
          }
        ]
      },
      {
        "type": "tool_search"
      }
    ]
  }
```

Client-executed discovery output items:

```json
[
  {
    "type": "tool_search_call",
    "execution": "server",
    "call_id": null,
    "status": "completed",
    "arguments": { "paths": ["crm"] }
  },
  {
    "type": "tool_search_output",
    "execution": "server",
    "call_id": null,
    "status": "completed",
    "tools": [ { "type": "namespace", "name": "crm", "...": "..." } ]
  },
  {
    "type": "function_call",
    "name": "list_open_orders",
    "namespace": "crm",
    "call_id": "call_abc123",
    "arguments": "{\"customer_id\":\"CUST-12345\"}"
  }
]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type: "namespace"` | object | Groups related tools under a named, described namespace searched as a unit |
| `defer_loading` | boolean | Marks an individual tool definition as deferred (not loaded upfront) |
| `type: "tool_search"` | tool entry | Added to the `tools` array alongside deferred tools/namespaces to enable discovery |

## Two Approaches

- **Hosted tool search**: OpenAI searches your pre-declared tool inventory and returns matches. Use when all available tools are known upfront.
- **Client-executed tool search**: your application controls discovery via a `tool_search_call` and returns matches through `tool_search_output`. Use when tool availability depends on dynamic system state.

## Notes

- Prefer namespaces or MCP servers over many individual deferred functions — models are primarily trained to search those surfaces, and token savings are more material there.
- Keep namespaces focused (fewer than 10 functions) with clear namespace descriptions; put rich detail in the per-function descriptions that load on demand.
- Tools load at the end of the context window in both modes, preserving prompt cache across requests.

## Related

- [Function Tools](./function-tools.md)
- [Programmatic Tool Calling](./programmatic-tool-calling.md)
