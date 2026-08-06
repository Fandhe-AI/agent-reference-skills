# Function Tools

Defining `function` tools with JSON schemas and `custom` tools with free-form/grammar-constrained inputs, plus `tool_choice` control and parallel tool call behavior in the Responses API. (For the basic request/response tool-calling API shape itself, see the `openai-api-core` skill's structured-streaming reference — this page covers practical tool definition, combination, and choice control.)

## Signature / Usage

```json
{
  "type": "function",
  "name": "get_weather",
  "description": "Retrieves current weather for the given location.",
  "parameters": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "City and country e.g. Bogotá, Colombia"
      },
      "units": {
        "type": "string",
        "enum": ["celsius", "fahrenheit"],
        "description": "Units the temperature will be returned in."
      }
    },
    "required": ["location", "units"],
    "additionalProperties": false
  },
  "strict": true
}
```

Custom tool with a Lark grammar (free-form text constrained to a format):

```javascript
const response = await client.responses.create({
  model: "gpt-5.6",
  input: "Use the math_exp tool to add four plus four.",
  tools: [
    {
      type: "custom",
      name: "math_exp",
      description: "Creates valid mathematical expressions",
      format: {
        type: "grammar",
        syntax: "lark",
        definition: grammar,
      },
    },
  ],
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `"function"` | Always `"function"` |
| `name` | string | The function's name (e.g. `get_weather`) |
| `description` | string | Guidance on when and how to use the function |
| `parameters` | JSON schema | Input arguments schema |
| `strict` | boolean | Enforce strict schema compliance instead of best-effort matching |
| `tool_choice` | `"auto" \| "required" \| "none" \| {type:"function", name} \| {type:"allowed_tools", mode, tools}` | Controls invocation: zero-or-more (auto, default), one-or-more (required), exactly one named function (forced), a restricted allow-list, or none |
| `parallel_tool_calls` | boolean | Set `false` to force exactly zero or one tool call per turn |

## Custom Tools

Custom tools accept free-form text instead of JSON, optionally constrained with a context-free grammar:

- **Lark syntax**: model sampling constrained via LLGuidance. Unsupported: lookarounds in lexer regexes, lazy modifiers (`*?`, `+?`, `??`), terminal priorities, templates, imports other than built-in `%import common`.
- **Regex syntax**: uses the Rust regex crate syntax (not Python `re`). Unsupported: lookarounds, lazy modifiers.

## Notes

- Keep initially available functions minimal (fewer than ~20 per turn); write clear descriptions and explicit parameter guidance. For large tool ecosystems, use [Tool Search](./tool-search.md) to defer rarely-needed functions.
- On supported models beginning with GPT-5, functions can be called in parallel when built-in tools are also available.

## Related

- [Tool Search](./tool-search.md)
- [Programmatic Tool Calling](./programmatic-tool-calling.md)
