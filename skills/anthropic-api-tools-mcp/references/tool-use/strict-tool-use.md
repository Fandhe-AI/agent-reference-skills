<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use / last verified: 2026-08-07 -->

# Strict tool use

Set `strict: true` on a tool definition to guarantee Claude's tool inputs match your JSON Schema exactly, via grammar-constrained sampling.

## Signature / Usage

```json
{
  "name": "get_weather",
  "description": "Get the current weather in a given location",
  "strict": true,
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {"type": "string", "description": "The city and state, e.g. San Francisco, CA"},
      "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
    },
    "required": ["location"],
    "additionalProperties": false
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| strict | boolean | Top-level property alongside `name`/`description`/`input_schema`; enables schema-conforming sampling |

## Notes

- Guarantees: `input` strictly follows `input_schema` (correct types, all required fields present), and `name` is always a valid tool name.
- Without strict mode, Claude might return incompatible types (`"2"` instead of `2`) or omit required fields; with `strict: true` this cannot happen — no need to validate and retry.
- Combine with `tool_choice: {"type": "any"}` to also guarantee a tool call happens.
- Uses the same grammar compilation pipeline as structured outputs; supports the same JSON Schema subset (see Structured Outputs docs for limitations).
- Tool schemas compiled for strict mode are cached up to 24 hours since last use; prompts/responses are not retained beyond the API response. Strict tool use is HIPAA eligible, but PHI must not be included in `input_schema` property names, `enum`/`const` values, or `pattern` regexes — only in message content.
- Not supported together with programmatic tool calling (see programmatic-tool-calling.md).

## Related

- [define-tools](./define-tools.md)
- [tool-reference](./tool-reference.md)
- [programmatic-tool-calling](./programmatic-tool-calling.md)
