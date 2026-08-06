# Programmatic Tool Calling

Lets a model write and run JavaScript that coordinates the tools available in a Responses API request, instead of calling one function at a time. Add the `programmatic_tool_calling` hosted tool to the request and set `allowed_callers` on each eligible function tool.

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
    "type": "programmatic_tool_calling"
  }
]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type: "programmatic_tool_calling"` | hosted tool | Added to the `tools` array to enable model-written JS coordination of other tools |
| `allowed_callers` | string[] | Per-function-tool field controlling who may invoke it: omitted/`["direct"]` (model calls directly), `["programmatic"]` (only callable from a program), `["direct", "programmatic"]` (both) |
| `output_schema` | object | Optional JSON Schema describing a function tool's return value, used by the program to reason about outputs |

## Notes

- A program can pause more than once as it reaches client-owned (non-`programmatic`-only) tools; each pause returns the pending function call(s) for the caller to execute.
- To resume, execute every returned client-owned function call and send back each result with the original `call_id`, preserving the `caller` field so the runtime can resume the correct program; continue until a final message is returned.
- Builds directly on the basic function-calling loop — see Function Calling for the underlying request/response cycle.
- This is an OpenAI API (developers.openai.com) guide describing a Responses API request-level hosted tool, not an Agents SDK orchestration construct.

## Related

- [Function Calling](./function-calling.md)
