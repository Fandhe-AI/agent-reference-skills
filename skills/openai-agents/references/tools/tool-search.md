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

Hosted tool search output items (`execution: "server"`, `call_id: null`):

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

Client-executed tool search: configure `execution: "client"` with a schema for the search arguments, then answer the model's `tool_search_call` with a `tool_search_output` that echoes its `call_id`:

```typescript
const firstResponse = await client.responses.create({
  model: "gpt-6-astra",
  input: "Find the shipping ETA tool first, then use it for order_42.",
  tools: [
    {
      type: "tool_search",
      execution: "client",
      description:
        "Find the project-specific tools needed to continue the task.",
      parameters: {
        type: "object",
        properties: {
          goal: { type: "string" },
        },
        required: ["goal"],
        additionalProperties: false,
      },
    },
  ],
  parallel_tool_calls: false,
});
```

Adding tools at a specific point in the input:

```json
{
    "type": "additional_tools",
    "role": "developer",
    "tools": [
      {
        "type": "function",
        "name": "get_customer",
        "description": "Look up a customer by ID.",
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
  }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type: "namespace"` | object | Groups related tools under a named, described namespace searched as a unit |
| `defer_loading` | boolean | Marks a function (or an MCP server tool definition) as deferred; for a namespace it applies to the functions inside, not the namespace object |
| `type: "tool_search"` | tool entry | Added to the `tools` array alongside deferred tools/namespaces to enable discovery |
| `execution` | `"client"` | On `tool_search`: client-executed tool search; `execution` is `client` and `call_id` is defined on the call/output items |
| `description` / `parameters` | string / JSON schema | On client-executed `tool_search`: describes the search and its argument schema |
| `additional_tools` input item | `{type, role: "developer", tools}` | Makes tools available from that position in the input onward |

### Two approaches

- **Hosted tool search**: OpenAI searches the deferred tools declared in the request and returns the loaded subset in the same response. Start here when candidate tools are known when you create the request.
- **Client-executed tool search**: the model emits a `tool_search_call`, your application performs the lookup, and you return a matching `tool_search_output`. Use when discovery depends on project state, tenant state, or another system you control.

## Notes

- Source: https://developers.openai.com/api/docs/guides/tools-tool-search (fetched 2026-11-14).
- Activation in the Responses API: add `tool_search` to `tools`; mark functions to defer with `defer_loading: true`, or set `defer_loading: true` on the MCP server tool definition. Namespaces can mix deferred and non-deferred tools (non-deferred are callable immediately).
- The model still sees the name and description of what is searchable; for an individual deferred function this mostly defers the parameter schema.
- `tool_search_output.tools` is the loaded tool set; the model can call those tools in later turns. Removing a loaded tool changes the set and breaks the cache from that point forward. Returning tools not present in the original request is an advanced pattern: validate returned schemas and expose only trusted definitions. Tools in an `additional_tools` item become available only after that item appears; preserve its position when round-tripping items.
- Agents API function loading strategy: eager (omit `defer_loading` or `false`; small sets) vs deferred (`defer_loading: true` plus `tool_search`; large catalogs, discovery adds a step).

- Agents API: function definitions are loaded eagerly by default. To defer selected functions, include `{ "type": "tool_search" }` in `agent.tools` and set `defer_loading: true` on each function you want discovered on demand; adding `tool_search` alone does not defer every function. Mixing eager and deferred functions in a session is supported but generally not recommended.
- Agents API, MCP and plugin tools: MCP tools use automatic discovery when the model and provider support tool search; the runtime defers MCP tools and adds tool search when searchable deferred tools are available (remote MCPs, executor MCPs, and MCP tools supplied by plugins). You do not need to add `tool_search` just for MCP tools or set a function-level `defer_loading` on an MCP server, and the Responses API configuration on this page does not apply to Agents API MCP servers.
- Prefer namespaces or MCP servers over many individual deferred functions — models are primarily trained to search those surfaces, and token savings are more material there.
- Keep namespaces focused (fewer than 10 functions) with clear namespace descriptions; put rich detail in the per-function descriptions that load on demand.
- Tools load at the end of the context window in both modes, preserving prompt cache across requests.

## Related

- [Function Tools](./function-tools.md)
- [Programmatic Tool Calling](./programmatic-tool-calling.md)
