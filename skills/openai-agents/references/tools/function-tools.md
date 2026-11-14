# Function Tools

Function calling (tool calling): defining `function` tools with JSON schemas and `custom` tools with free-form/grammar-constrained inputs, grouping tools in namespaces, plus `tool_choice` control, `strict` mode, and parallel tool call behavior in the Responses API. (For the basic request/response tool-calling API shape itself, see the `openai-api-core` skill's structured-streaming reference — this page covers practical tool definition, combination, and choice control.)

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

Tool calling flow (five steps): make a request with tools; receive a tool call; execute code on the application side with the tool call input; make a second request with the tool output; receive a final response (or more tool calls). The response `output` array contains `function_call` entries with `call_id`, `name`, and JSON-encoded `arguments`:

```json
[
    {
        "id": "fc_12345xyz",
        "call_id": "call_12345xyz",
        "type": "function_call",
        "name": "get_weather",
        "arguments": "{\"location\":\"Paris, France\"}"
    }
]
```

Namespaces group related tools by domain (for example `crm`, `billing`, `shipping`):

```json
{
  "type": "namespace",
  "name": "crm",
  "description": "CRM tools for customer lookup and order management.",
  "tools": [
    {
      "type": "function",
      "name": "get_customer_profile",
      "description": "Fetch a customer profile by customer ID.",
      "parameters": {
        "type": "object",
        "properties": {
          "customer_id": { "type": "string" }
        },
        "required": ["customer_id"],
        "additionalProperties": false
      }
    },
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
}
```

Custom tool (free-form text input) with a Lark grammar:

```javascript
const response = await client.responses.create({
  model: "gpt-6-astra",
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

Restricting callable tools with `allowed_tools`:

```json
"tool_choice": {
    "type": "allowed_tools",
    "mode": "auto",
    "tools": [
        { "type": "function", "name": "get_weather" },
        { "type": "function", "name": "search_docs" }
    ]
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `"function"` | Always `function` |
| `name` | string | The function's name (e.g. `get_weather`) |
| `description` | string | Details on when and how to use the function |
| `parameters` | JSON schema | Input arguments schema |
| `strict` | boolean | Whether to enforce strict mode for the function call |
| `defer_loading` | boolean | On a function inside a namespace, defers loading (used with tool search) |
| `tool_choice` | `"auto" \| "required" \| "none" \| {type:"function", name} \| {type:"allowed_tools", mode, tools}` | Auto (default): zero, one, or multiple calls. Required: one or more. Forced function: exactly one named function. Allowed tools: restrict to a subset without changing the passed tool list (keeps prompt caching savings). `"none"` imitates passing no functions |
| `parallel_tool_calls` | boolean | Set `false` to ensure exactly zero or one tool call per turn |

### Custom tools

Custom tools accept free-form text (the model passes an arbitrary string as input) instead of JSON, optionally constrained with a context-free grammar via the `grammar` format (`lark` or `regex`). The output contains a `custom_tool_call` item whose `input` is plain text:

```json
{
  "id": "ctc_6890e975e86c819c9338825b3e1994810694874912ae0ea6",
  "type": "custom_tool_call",
  "status": "completed",
  "call_id": "call_aGiFQkRWSWAIsMQ19fKqxUgb",
  "input": "print(\"hello world\")",
  "name": "code_exec"
}
```

- **Lark syntax**: model sampling constrained via LLGuidance. Unsupported: lookarounds in lexer regexes, lazy modifiers (`*?`, `+?`, `??`) in lexer regexes, priorities of terminals, templates, imports other than built-in `%import` common, `%declare`s.
- **Regex syntax**: Rust regex crate syntax (not Python `re`). Unsupported: lookarounds, lazy modifiers. The pattern must be on one line (use `\n`, not verbose/extended mode) and provided as a plain pattern string, not enclosed in `//`.
- Keep grammars small: the API may return an error for a too-complex grammar. Prefer one bounded terminal for free text between anchors, use rules to combine discrete tokens, avoid open-ended `%ignore`; if the model drifts, tighten the grammar, iterate on the prompt and tool description, or raise reasoning effort.

## Notes

- Function results go in a `function_call_output` message: typically a string (format is up to you); for images or files, pass an array of image or file objects. If there is no return value (for example `send_email`), return a string such as `"success"`. Assume zero, one, or multiple calls per response. With tool search you may also see `tool_search_call` and `tool_search_output` items before a `function_call`.
- Functions are usually declared in `tools` per request; with tool search, deferred functions can be loaded later. Use [Tool Search](./tool-search.md) for large tool ecosystems; `tool_search` is supported only by `gpt-5.4` and later models.
- Best practices: clear names, parameter descriptions, and system-prompt guidance on when to use each function; use enums and object structure to prevent invalid states; don't make the model fill arguments you already know; combine functions always called in sequence; aim for fewer than 20 functions at the start of a turn (soft suggestion). For deferred tools put detailed guidance in the function description and keep the namespace description concise. Examples may hurt performance for reasoning models.
- Token usage: callable function definitions count against context and are billed as input tokens.
- Strict mode (recommended): requires `additionalProperties: false` on every object in `parameters` and all `properties` marked `required`; mark optional fields with `null` as a type option (e.g. `"type": ["string", "null"]`). With `strict: true` and a non-compliant schema the request is rejected. If `strict` is omitted: Responses attempts to normalize the schema into strict mode and falls back to non-strict (response tool shows `strict: false`); Chat Completions stays non-strict. Set `strict: false` explicitly to opt out in Responses. For fine tuned models, schemas undergo extra processing on first request and are cached (not eligible for zero data retention).
- Parallel calls: on supported models beginning with GPT-5, functions can be called in parallel when built-in tools are also available; built-in tools cannot be included in a parallel function-call batch. For a fine tuned model calling multiple functions in one turn, strict mode is disabled for those calls. `gpt-4.1-nano-2025-04-14` can emit duplicate calls for the same tool; disable parallel calls for it.
- GPT-6 Astra and GPT-6.1 Sol require the Responses API for tool calling. For Agents API sessions the official guide points to its Functions page instead.
- Streaming: set `stream: true` to surface which function is called and its arguments as they are filled.
- Source: https://developers.openai.com/api/docs/guides/function-calling (fetched 2026-11-14).

## Related

- [Tool Search](./tool-search.md)
- [Programmatic Tool Calling](./programmatic-tool-calling.md)
- [Tools Overview](./tools-overview.md)
