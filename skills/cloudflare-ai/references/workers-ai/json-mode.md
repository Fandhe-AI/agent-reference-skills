---
source: https://developers.cloudflare.com/workers-ai/features/json-mode/
---

# JSON Mode

Request structured output from text generation models with `response_format` and a JSON Schema.

## Signature / Usage

Request body passed as the input to `env.AI.run()` or the REST API:

```json
{
  "messages": [
    {
      "role": "system",
      "content": "Extract data about a country."
    },
    {
      "role": "user",
      "content": "Tell me about India."
    }
  ],
  "response_format": {
    "type": "json_schema",
    "json_schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "capital": {
          "type": "string"
        },
        "languages": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "name",
        "capital",
        "languages"
      ]
    }
  }
}
```

Response (truncated list of languages):

```json
{
  "response": {
    "name": "India",
    "capital": "New Delhi",
    "languages": [
      "Hindi",
      "English",
      "Bengali"
    ]
  }
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| response_format.type | string | — | `json_object` or `json_schema`. |
| response_format.json_schema | object | — | A valid JSON Schema declaration. |

## Notes

- Compatible with OpenAI's implementation.
- The source's schema illustration (a `title: "JSON Mode"` object with unquoted keys) is pseudo-notation and not valid JSON; only the valid request and response examples are shown. The response above keeps the first three languages of the official example for brevity.
- Models listed as supporting JSON Mode: `@cf/meta/llama-3.3-70b-instruct-fp8-fast`, `@cf/meta/llama-3-8b-instruct`, `@cf/meta/llama-3.1-8b-instruct`, `@hf/nousresearch/hermes-2-pro-mistral-7b`, `@hf/thebloke/deepseek-coder-6.7b-instruct-awq`, `@cf/deepseek-ai/deepseek-r1-distill-qwen-32b`. The list is extended over time; check the model catalog.
- Workers AI cannot guarantee that the model responds according to the schema. In extreme cases the error `JSON Mode couldn't be met` is returned and must be handled.
- JSON Mode currently does not support streaming.
- Schema validation libraries (zod) belong to zod; the AI SDK `Output.object` route is on the ai-sdk page.

## Related

- [Binding and env.AI.run()](./bindings-and-run.md)
- [Function calling](./function-calling.md)
- [AI SDK](./ai-sdk.md)
- [Streaming](./streaming.md)
