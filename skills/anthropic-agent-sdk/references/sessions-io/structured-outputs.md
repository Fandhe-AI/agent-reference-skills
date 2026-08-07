<!-- source: https://code.claude.com/docs/en/agent-sdk/structured-outputs.md / last verified: 2026-08-07 -->

# Get structured output from agents

Structured outputs let you define the exact shape of data you want back from an agent. Define a JSON Schema for the structure you need, and the SDK validates the output against it, re-prompting on mismatch. If validation does not succeed within the retry limit, the result is an error instead of structured data.

## Signature / Usage

```typescript
const schema = {
  type: "object",
  properties: {
    company_name: { type: "string" },
    founded_year: { type: "number" },
    headquarters: { type: "string" }
  },
  required: ["company_name"]
};

for await (const message of query({
  prompt: "Research Anthropic and provide key company information",
  options: { outputFormat: { type: "json_schema", schema } }
})) {
  if (message.type === "result" && message.subtype === "success" && message.structured_output) {
    console.log(message.structured_output);
  }
}
```

```typescript
// Zod: convert with target draft-7 (the SDK validates JSON Schema draft-07)
const schema = z.toJSONSchema(FeaturePlan, { target: "draft-7" });
```

```python
# Pydantic
options = ClaudeAgentOptions(
    output_format={"type": "json_schema", "schema": FeaturePlan.model_json_schema()}
)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `outputFormat` / `output_format` | `{ type: "json_schema", schema }` | `schema` is a JSON Schema (draft-07) object; generate from Zod with `z.toJSONSchema(schema, { target: "draft-7" })` or from Pydantic with `.model_json_schema()`. |
| `message.structured_output` | object | Present on the result message when validation succeeds. |

| Result subtype | Meaning |
| --- | --- |
| `success` | Output generated and validated (still check `structured_output` is present — a run can succeed with no structured output). |
| `error_max_structured_output_retries` | No valid output remained after retries (validation failures, or a model-fallback retraction with no successful retry). |

## Notes

- Supports standard JSON Schema features: basic types, `enum`, `const`, `required`, nested objects, `$ref` definitions. An invalid schema fails the run at startup with a naming error (before v2.1.205 it was silently ignored). The `format` keyword is accepted as an annotation only, not enforced.
- Check the `errors` list on the result message to distinguish a validation-retry failure from a model-fallback retraction.
- Streaming: the structured JSON result only appears in the final `ResultMessage.structured_output`, not as streaming deltas (see streaming-output).
- For single-turn requests without tool use, the Messages API's own `output_config.format` structured outputs (a single call, no agent loop) is documented separately in anthropic-api-core, not here.

## Related

- [streaming-output](./streaming-output.md)
- [todo-tracking](./todo-tracking.md)
