<!-- source: https://code.claude.com/docs/en/agent-sdk/structured-outputs.md / last verified: 2026-08-07 -->

# Enforce a JSON Schema on Agent Output

Pass a JSON Schema (from a raw object, Zod, or Pydantic) via `outputFormat`/`output_format`; the SDK validates the agent's output and re-prompts on mismatch.

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

## Notes

- `schema` must be JSON Schema draft-07; generate it from Zod with `z.toJSONSchema(schema, { target: "draft-7" })` or from Pydantic with `.model_json_schema()`.
- Check `message.structured_output` on the result message — a `success` run can still complete with no structured output present.
- Result subtype `error_max_structured_output_retries` means no valid output remained after retries; check the `errors` list to distinguish a validation failure from a model-fallback retraction.
- Streaming: the structured JSON only appears in the final `ResultMessage.structured_output`, never as streaming deltas. For single-turn requests without tool use, the Messages API's own `output_config.format` (a single call, no agent loop) is covered separately by anthropic-api-core, not here.
