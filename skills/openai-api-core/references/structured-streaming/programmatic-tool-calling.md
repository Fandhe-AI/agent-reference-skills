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

### Supported tools

`allowed_callers: ["programmatic"]` is supported on: `function` and `custom`, `mcp` (its `require_approval` policy can pause the program until approved), `apply_patch`, local and hosted `shell`, and `code_interpreter`.

### Response items

| Item | Fields |
|------|--------|
| `program` | `code` (generated JavaScript), `call_id`, opaque `fingerprint` used to resume or replay the program |
| `function_call` made by the program | Its own `call_id`; `caller.caller_id` matches the program's `call_id` |
| `program_output` | `call_id` matching the program's `call_id`; `result`; `status` of `completed` or `incomplete` |

## Notes

- Runtime environment: each generated program runs in a fresh, isolated V8 runtime. Top-level `await` works; there is no Node.js, package installation, direct network access, general-purpose filesystem, subprocess execution, console, or persistent state between executions. Programs reach external systems only through tools enabled in the request and emit output with `text(...)` or `image(...)`.
- ZDR: Responses API Programmatic Tool Calling supports Zero Data Retention workflows without a persistent code-execution container. ZDR must be enabled for the organization or project; `store: false` enables stateless continuation but does not enable ZDR by itself.
- Tool search: it runs as a top-level Responses tool, not from inside generated JavaScript. Tools with `defer_loading: true` are not initially available to a program; the model must load them before starting a program that needs them, and an already-running program cannot invoke tool search.
- Your application executes returned client-owned function calls and copies `caller` unchanged into the `function_call_output`; it never executes the generated JavaScript.
- Agents API: Programmatic Tool Calling is enabled by default there; include `{"type": "programmatic_tool_calling", "enabled": false}` in `agent.tools` to disable it. The Agents API is covered by the openai-agents skill; `allowed_callers` and the continuation loop here describe the Responses API integration.
- A program can pause more than once as it reaches client-owned (non-`programmatic`-only) tools; each pause returns the pending function call(s) for the caller to execute.
- To resume, execute every returned client-owned function call and send back each result with the original `call_id`, preserving the `caller` field so the runtime can resume the correct program; continue until a final message is returned.
- Builds directly on the basic function-calling loop — see Function Calling for the underlying request/response cycle.
- This is an OpenAI API (developers.openai.com) guide describing a Responses API request-level hosted tool, not an Agents SDK orchestration construct.

## Related

- [Function Calling](./function-calling.md)
