# Structured Outputs

Ensures model responses adhere to a supplied JSON Schema. Guarantees reliable type-safety (no need to validate or retry malformed responses), explicit refusals surfaced as a distinct content type, and simpler prompting (no need for strongly worded formatting instructions).

## Signature / Usage

```javascript
const response = await openai.responses.parse({
  model: "gpt-5.6",
  input: [
    { role: "system", content: "Extract event information." },
    { role: "user", content: "Alice and Bob attend a science fair Friday." }
  ],
  text: {
    format: zodTextFormat(CalendarEvent, "event")
  }
});
```

Raw form (without an SDK helper), on a Responses API request:

```json
"text": {
  "format": {
    "type": "json_schema",
    "name": "math_response",
    "schema": {
      "type": "object",
      "properties": { },
      "required": [ ],
      "additionalProperties": false
    },
    "strict": true
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `text.format.type` | string | Must be `"json_schema"` to enable Structured Outputs |
| `text.format.name` | string | Required name identifying the schema (e.g. `"math_response"`) |
| `text.format.schema` | object | The JSON Schema the output must conform to |
| `text.format.strict` | boolean | Enables strict schema enforcement (required for the type-safety guarantees) |

## Notes

- Requirements when `strict: true`: every field in `properties` must be listed in `required`, and `additionalProperties` must be `false` for every object in the schema; the root schema must be an object type (not `anyOf`).
- Supported schema features: strings (`pattern`, `format`), numbers (`multipleOf`, min/max), arrays (`minItems`, `maxItems`), `enum`, `anyOf`, nested objects, recursion.
- Unsupported schema features: `allOf`, `not`, `dependentRequired`, `if`/`then`/`else` compositions.
- Available starting with GPT-4o; for new projects start with the current default model. Differs from legacy JSON mode, which guarantees valid JSON but not schema adherence.
- Safety-based refusals appear as `type: "refusal"` content, making them programmatically detectable instead of silently malformed JSON.
- Works with streaming — partial JSON arrives via `response.output_text.delta` events before the response completes.
- This is an OpenAI API (developers.openai.com) guide; it documents the `text.format` field on the Responses API, not an Agents SDK output-type feature.

## Related

- [Function Calling](./function-calling.md)
- [Streaming API Responses](./streaming-responses.md)
