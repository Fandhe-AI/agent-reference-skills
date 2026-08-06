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

Supported tool types for programmatic calling: functions, custom tools, MCP, shell, code interpreter.

## Notes

- Generated programs run in isolated V8 runtimes without Node.js, direct network access, or persistent state. Programs interact only with enabled tools and output results via `text()` or `image()` functions.
- Best suited for: results that code can filter/join/rank/dedupe/aggregate/validate; dependent calls with predictable data flow; tasks returning smaller structured results. Prefer direct tool calling for single lookups, adaptive semantic searches, approval-sensitive operations, or final validation/citation preservation.
- Applications must handle the response loop: execute returned client-owned function calls, return results with preserved `caller` metadata, and continue until a final message. With `store: false`, replay all output items; with stored responses, use `previous_response_id`.
- Design tools to return structured, compact data with a clear `output_schema`; maintain application-level validation and approval gates regardless of caller type.

## Related

- [Tool Search](./tool-search.md)
- [Function Tools](./function-tools.md)
