<!-- source: https://platform.claude.com/docs/en/build-with-claude/structured-outputs / last verified: 2026-08-07 -->

# Structured outputs

Get validated JSON results from agent workflows. Two complementary features: JSON outputs (`output_config.format`) constrain Claude's response to a schema; strict tool use (`strict: true`) guarantees schema-valid tool inputs. Usable independently or together.

## Signature / Usage

```python
response = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Extract the key info..."}],
    output_config={
        "format": {
            "type": "json_schema",
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "email": {"type": "string"},
                },
                "required": ["name", "email"],
                "additionalProperties": False,
            },
        }
    },
)
```

SDK helpers wrap the raw schema: Python `client.messages.parse(output_format=PydanticModel)`, TypeScript `client.messages.parse({ output_config: { format: zodOutputFormat(ZodSchema) } })` (or `jsonSchemaOutputFormat()`), Java `outputConfig(Class<T>)`, Ruby `output_config: {format: Anthropic::BaseModel subclass}`, PHP classes implementing `StructuredOutputModel`, C# `Create<T>()` generic overload, Go struct reflection (beta) or raw `output_config`. Parsed results are exposed via `response.parsed_output` (Python/TS/Ruby) or `parsedOutput()` (PHP).

Combine with strict tool use by adding `"strict": true` and `additionalProperties: false` on a tool's `input_schema`; Claude may then call the tool with guaranteed-valid parameters and/or return schema-valid JSON text.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `output_config.format.type` | `"json_schema"` | JSON output format type |
| `output_config.format.schema` | object | JSON Schema (subset — see Notes) |
| `tools[].strict` | boolean | Enable strict schema validation for a tool's `input_schema` |

## Notes

- Migrating from beta: `output_format` parameter moved to `output_config.format`; beta headers no longer required (old beta header `structured-outputs-2025-11-13` and `output_format` still work during a transition period).
- Supported models: claude-fable-5, claude-mythos-5, claude-mythos-preview, claude-opus-5, claude-opus-4-8/4-7/4-6, claude-sonnet-5/4-6/4-5, claude-opus-4-5, claude-haiku-4-5. Platforms: Claude API, Claude Platform on AWS, Amazon Bedrock (partial), Google Cloud, Microsoft Foundry (Hosted on Anthropic only).
- ZDR eligible, excluding Covered Models; only JSON schemas are cached (up to 24h), prompts/outputs are not stored.
- **Supported JSON Schema subset:** all basic types; `enum` (primitives only, case-sensitive); `const`; `anyOf`/`allOf` (no `allOf` with `$ref`); `$ref`/`$def`/`definitions` (no external `$ref`); `default`; `required`; `additionalProperties: false` (objects, mandatory); string formats `date-time`, `time`, `date`, `duration`, `email`, `hostname`, `uri`, `ipv4`, `ipv6`, `uuid`; array `minItems` (0 or 1 only); regex `pattern` (no lookaround, named groups, backreferences, recursion).
- **Not supported:** recursive schemas, complex enum types, external `$ref`, numeric/string length constraints (`minimum`, `maximum`, `minLength`, `maxLength`), `additionalProperties` other than `false`. Unsupported features return a 400 error.
- SDK auto-transformation (Python/TS/Ruby/PHP, and C#/Go when using native-type derivation): strips unsupported constraints, appends them to the field description instead, forces `additionalProperties: false`, filters string formats, and validates the response client-side against the original (untransformed) schema.
- Grammar compilation is cached 24h from last use; cache invalidates on schema or tool-set changes (not on `name`/`description`-only edits). First request with a new schema has extra latency.
- Claude receives an injected system prompt describing the expected format, adding input tokens; changing `output_config.format` invalidates prompt caching for that thread.
- Invalid-output handling: error if schema too restrictive, optional fields are skipped if not producible, internal retry when possible.

## Related

- [Working with messages](./working-with-messages.md)
- [Handling stop reasons](./handling-stop-reasons.md)

Tool use・Agent Skills・MCP の詳細は anthropic-api-tools-mcp スキルを参照（strict tool use の詳細ページを含む）。
