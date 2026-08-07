<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools / last verified: 2026-08-07 -->

# Define tools

Specify tool schemas, write effective descriptions, and control when Claude calls your tools via `tool_choice`.

## Signature / Usage

```json
{
  "name": "get_weather",
  "description": "Get the current weather in a given location",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {"type": "string", "description": "The city and state, e.g. San Francisco, CA"},
      "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
    },
    "required": ["location"]
  },
  "input_examples": [
    {"location": "San Francisco, CA", "unit": "fahrenheit"}
  ]
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| name | string | Tool name; must match `^[a-zA-Z0-9_-]{1,64}$` |
| description | string | Detailed plaintext description of what the tool does, when to use it, and how it behaves |
| input_schema | object | JSON Schema defining expected parameters |
| input_examples | array (optional) | Example input objects, schema-validated; not supported for server tools; adds ~20-200 tokens each |
| tool_choice.type: auto | — | Default when `tools` provided; Claude decides whether to call a tool |
| tool_choice.type: any | — | Claude must use one of the provided tools, no particular one forced |
| tool_choice.type: tool | — | Forces a specific named tool |
| tool_choice.type: none | — | Prevents any tool use; default when no `tools` provided |

## Notes

- Best practices: write extremely detailed descriptions (3-4+ sentences), consolidate related operations into fewer tools with an `action` parameter instead of many narrow tools, use service-prefixed names (`github_list_prs`) for namespacing, and return only high-signal, stable identifiers in tool responses.
- With `tool_choice: any` or `tool`, the API prefills the assistant turn, so Claude emits no natural-language text before the `tool_use` block, even if asked to explain.
- Changing `tool_choice` invalidates cached message blocks (prompt caching); tool definitions and system prompt remain cached.
- Manual extended thinking (`thinking: {type: "enabled"}`) is incompatible with `tool_choice: any` or `tool` (auto/none only); adaptive thinking supports forced tool use. Claude Mythos Preview does not support forced tool use at all.
- Combine `tool_choice: any` with `strict: true` (Strict tool use) to guarantee both a tool call and schema-conforming input.
- For the full set of optional tool-definition properties (`cache_control`, `strict`, `defer_loading`, `allowed_callers`), see Tool reference.

## Related

- [handle-tool-calls](./handle-tool-calls.md)
- [tool-runner](./tool-runner.md)
- [tool-reference](./tool-reference.md)
- [strict-tool-use](./strict-tool-use.md)
