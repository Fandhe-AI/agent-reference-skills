<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling / last verified: 2026-08-07 -->

# Strict, Parallel, and Programmatic Tool Use

Guarantee schema-conforming tool input with `strict: true`, let Claude batch several tool calls in one turn, and let Claude call your tools from inside a code execution sandbox instead of round-tripping through the model each time.

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

```json
{"tool_choice": {"type": "auto", "disable_parallel_tool_use": true}}
```

```json
{
  "tools": [
    {"type": "code_execution_20260120", "name": "code_execution"},
    {
      "name": "query_database",
      "description": "Execute a SQL query against the sales database. Returns rows as JSON objects.",
      "input_schema": {"type": "object", "properties": {"sql": {"type": "string"}}, "required": ["sql"]},
      "allowed_callers": ["code_execution_20260120"]
    }
  ]
}
```

## Notes

- `strict: true` guarantees `input` conforms exactly to `input_schema` (correct types, all required fields) and that `name` is always valid — no need to validate and retry; combine with `tool_choice: {"type": "any"}` to also guarantee a call happens.
- By default Claude may return several `tool_use` blocks in one turn (Claude 4+ do this automatically when beneficial); set `tool_choice.disable_parallel_tool_use: true` to force at most one call. Always return all `tool_result` blocks together in the next user message, matched by `tool_use_id`.
- Programmatic tool calling requires `code_execution_20260120`+: Claude writes code that calls your tools as async functions inside the sandbox; the API pauses with `stop_reason: "tool_use"` and a `caller` field naming the code-execution run, and only the final code output (not intermediate results) enters Claude's context.
- `strict: true` tools cannot be set `allowed_callers: ["code_execution_20260120"]`, and `disable_parallel_tool_use: true` is incompatible with programmatic tool calling — the three features have mutual exclusions, not a single combined mode.
