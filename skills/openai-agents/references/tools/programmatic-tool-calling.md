# Programmatic Tool Calling

Hosted `programmatic_tool_calling` tool: the model writes and executes JavaScript that orchestrates multiple tools within a single request, enabling parallel tool invocation, conditional logic, and intermediate result processing.

## Signature / Usage

```json
[
  {
    "type": "function",
    "name": "get_inventory",
    "description": "Return an object with sku (string) and available_units (number).",
    "parameters": {
      "type": "object",
      "properties": {
        "sku": { "type": "string" }
      },
      "required": ["sku"],
      "additionalProperties": false
    },
    "output_schema": {
      "type": "object",
      "properties": {
        "sku": { "type": "string" },
        "available_units": { "type": "number" }
      },
      "required": ["sku", "available_units"],
      "additionalProperties": false
    },
    "allowed_callers": ["programmatic"]
  },
  {
    "type": "function",
    "name": "get_demand",
    "description": "Return an object with sku (string) and requested_units (number).",
    "parameters": {
      "type": "object",
      "properties": {
        "sku": { "type": "string" }
      },
      "required": ["sku"],
      "additionalProperties": false
    },
    "output_schema": {
      "type": "object",
      "properties": {
        "sku": { "type": "string" },
        "requested_units": { "type": "number" }
      },
      "required": ["sku", "requested_units"],
      "additionalProperties": false
    },
    "allowed_callers": ["programmatic"]
  },
  {
    "type": "programmatic_tool_calling"
  }
]
```

Generated program calling multiple tools and returning a result via `text()`:

```javascript
const [stock, demand] = await Promise.all([tools.get_inventory({ sku: 'sku_123' }), tools.get_demand({ sku: 'sku_123' })]);
text(JSON.stringify({ sku: stock.sku, available_units: stock.available_units, requested_units: demand.requested_units, shortage_units: Math.max(demand.requested_units - stock.available_units, 0) }));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `allowed_callers` | omitted / `["direct"]` \| `["programmatic"]` \| `["direct", "programmatic"]` | Whether a tool can be called directly by the model, only by generated code, or either |

Tool types supporting `allowed_callers: ["programmatic"]`: `function` and `custom`, `mcp`, `apply_patch`, local and hosted `shell`, `code_interpreter`. For MCP tools, the `require_approval` policy can pause the program until you approve the call.

Program response items (separate top-level items in `response.output`; `caller` records the relationship):

```json
{
  "type": "program_output",
  "id": "prog_out_123",
  "call_id": "call_prog_123",
  "result": "{\"sku\":\"sku_123\",\"available_units\":42,\"requested_units\":31,\"shortage_units\":0}",
  "status": "completed"
}
```

- `program`: generated JavaScript (`code`), a `call_id`, and an opaque `fingerprint` used to resume or replay the program.
- `function_call` made by the program: has its own `call_id`; `caller.caller_id` matches the program's `call_id`. Return the result as `function_call_output`, copying `caller` unchanged.
- `program_output`: final `result` and `status` (`completed` or `incomplete`); its `call_id` matches the program's.

## Notes

- Check the model page before enabling Programmatic Tool Calling.
- Generated programs run in a fresh isolated V8 runtime (JavaScript with top-level `await`) without Node.js, package installation, direct network access, a general-purpose filesystem, subprocess execution, a console, or persistent state. Programs interact only with enabled tools and output results via `text(...)` or `image(...)`. OpenAI runs the generated JavaScript; your application only executes client-owned function calls.
- Responses API requests support ZDR workflows without a persistent code-execution container; ZDR must be enabled for the organization or project (`store: false` alone enables stateless continuation but not ZDR).
- Tool search runs as a top-level tool, not inside a program. `defer_loading: true` function, custom, and MCP tools are not initially available to a program; the model must load them before a program that needs them starts.
- Loop: send the request, run every returned client-owned function call, return each result with original `call_id` and `caller`, handle an incomplete response, continue (replay output items with `store: false`, or `previous_response_id`) until a final `message` item. For stateless reasoning-model requests replay every returned reasoning item.
- Tool design: structured compact output with `output_schema`, idempotent calls, per-call argument and permission checks in your application, application-level approval before high-impact actions. Evaluate against a direct-calling baseline.
- Source: https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling (fetched 2026-11-14).
- Best suited for: results that code can filter/join/rank/dedupe/aggregate/validate; dependent calls with predictable data flow; tasks returning smaller structured results. Prefer direct tool calling for single lookups, adaptive semantic searches, approval-sensitive operations, or final validation/citation preservation.
- Applications must handle the response loop: execute returned client-owned function calls, return results with preserved `caller` metadata, and continue until a final message. With `store: false`, replay all output items; with stored responses, use `previous_response_id`.
- Design tools to return structured, compact data with a clear `output_schema`; maintain application-level validation and approval gates regardless of caller type.

### Agents API

In the Agents API, Programmatic Tool Calling runs in the OpenAI-managed agent harness and is enabled by default. The harness gives the agent an `exec` tool and makes its existing tools available inside generated JavaScript, so you do not need to wrap them as command-line programs or install them in the sandbox. To disable it, include this entry in `agent.tools`:

```json
{
  "type": "programmatic_tool_calling",
  "enabled": false
}
```

- Omitting the entry or its `enabled` field, or a type-only entry `{ "type": "programmatic_tool_calling" }`, leaves it enabled.
- It also works in conversation-only sessions with `environment.type` set to `none`. Bash (shell), executor MCPs, and other tools that run in a sandbox still require an execution environment.
- The `allowed_callers` configuration and Responses continuation loop above describe the Responses API integration only.
- Orchestrating a tool in JavaScript doesn't change where it runs: shell commands run in the sandbox, executor MCPs still use the sandbox, and function tools still call your application server.

## Related

- [Tool Search](./tool-search.md)
- [Function Tools](./function-tools.md)
