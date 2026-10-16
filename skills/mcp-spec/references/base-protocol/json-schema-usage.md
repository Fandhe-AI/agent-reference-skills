---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic#json-schema-usage
---

# JSON Schema Usage

MCP uses JSON Schema for validation throughout the protocol. This page clarifies how JSON Schema is used within MCP messages.

## Signature / Usage

Default dialect (2020-12):

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer", "minimum": 0 }
  },
  "required": ["name"]
}
```

Explicit dialect (draft-07):

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer", "minimum": 0 }
  },
  "required": ["name"]
}
```

## Notes

- Schema dialect: without a `$schema` field the default is JSON Schema 2020-12; schemas MAY include `$schema` to specify a different dialect; implementations MUST support at least 2020-12 and SHOULD document which additional dialects they support; implementors are RECOMMENDED to use 2020-12.
- Clients and servers **MUST** support 2020-12 for schemas without an explicit `$schema`, **MUST** validate schemas according to their declared or default dialect, and **MUST** handle unsupported dialects gracefully by returning an appropriate error indicating the dialect is not supported. Schemas **MUST** be valid according to their declared or default dialect.
- `$ref`: implementations **MUST NOT** automatically dereference `$ref` values that resolve to a network URI. They **MAY** offer an opt-in mode that fetches non-local `$ref`s, but it **MUST** be disabled by default and **SHOULD** enforce an allowlist of hosts or at minimum reject loopback, link-local, and private network addresses, apply timeouts and size limits, and log dereferenced URIs. Schemas that fail to validate due to an unresolved external `$ref` **SHOULD** be rejected rather than silently treated as permissive.
- Composition keywords (`anyOf`, `oneOf`, `allOf`, `if`/`then`/`else`) and `$defs` can be expensive to validate; implementations **SHOULD** apply reasonable bounds (maximum schema depth, cap on total subschemas, or per-validation time budget) to prevent denial of service against the validator.
- The TypeScript schema (`schema.ts`) is the source of truth for protocol messages; the JSON Schema is generated from it.

## Related

- [Messages](./messages.md)
