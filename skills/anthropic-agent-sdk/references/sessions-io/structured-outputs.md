<!-- source: https://code.claude.com/docs/en/agent-sdk/structured-outputs.md / last verified: 2026-11-14 -->

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
| `success` | The run ended without an error subtype. Not proof of an answer: treat the result as a failure when `is_error` is `true` (for example the final request ended in an API error or a refusal) or `structured_output` is absent. |
| `error_max_structured_output_retries` | No valid output remained after retries (validation failures, or a model-fallback retraction with no successful retry). |

## Notes

- Supports standard JSON Schema features: basic types, `enum`, `const`, `required`, nested objects, `$ref` definitions. An invalid schema fails the run at startup with a naming error (before v2.1.205 it was silently ignored). The `format` keyword is accepted as an annotation only, not enforced.
- Check the `errors` list on the result message to distinguish a validation-retry failure from a model-fallback retraction (a model fallback can retract an already-completed output mid-stream; if no retry replaces it the run ends with `error_max_structured_output_retries`).
- Error handling: check `subtype === "success" && !is_error && structured_output` before using the data; handle `error_max_structured_output_retries` separately. A single-shot `query()` throws after yielding the error result. If `structured_output` is absent on a `success` result, see the Troubleshooting page ("structured_output is None but the result says success"). The first examples use `message.structured_output` after the same `!message.is_error` check.
- The SDK validates with JSON Schema draft-07, so schemas declaring a newer version are rejected; Zod targets draft 2020-12 by default, so pass `target: "draft-7"`. Before v2.1.205 any schema containing `format` was treated as invalid.
- `StructuredOutput` tool call: the stream carries a tool call named `StructuredOutput` that you never defined (Claude Code adds it; the init message lists it in `tools`). Each call is a `tool_use` block (input = the object produced) plus a `tool_result` reading `Structured output provided successfully`; on schema mismatch the `tool_result` has `is_error: true` and the agent calls it again, so one query can hold several calls. Read the data from `structured_output` on the result, not from a `tool_use` block. If you display or log tool calls, skip `StructuredOutput` and match `tool_result` blocks to skipped calls by `tool_use_id`.
- Tips to avoid errors: keep schemas focused (deep nesting with many required fields is harder to satisfy), make fields optional when the task may not have the information, and use clear prompts.
- Source: https://code.claude.com/docs/en/agent-sdk/structured-outputs.md (fetched 2026-11-14)
- Streaming: with partial messages enabled the JSON streams as unvalidated `input_json_delta` chunks; only the validated result is in `ResultMessage.structured_output` (see streaming-output).
- For single-turn requests without tool use, the Messages API's own `output_config.format` structured outputs (a single call, no agent loop) is documented separately in anthropic-api-core, not here.

## Related

- [streaming-output](./streaming-output.md)
- [todo-tracking](./todo-tracking.md)
