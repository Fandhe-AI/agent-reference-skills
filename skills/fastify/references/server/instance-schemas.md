---
source: https://fastify.dev/docs/latest/Reference/Server/
---

# Instance Schema Methods

Methods for registering shared JSON schemas and customizing the validator/serializer compilers used across routes.

## Signature / Usage

```js
fastify.addSchema({ $id: 'user', type: 'object', properties: { name: { type: 'string' } } })
const userSchema = fastify.getSchema('user')

fastify.setReplySerializer(function (payload, statusCode) {
  return `my serialized ${statusCode} content: ${payload}`
})
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `addSchema` | `.addSchema(schemaObj)` | Adds a JSON schema reusable app-wide via `$ref`. |
| `getSchemas` | `.getSchemas()` | Returns a hash of all schemas added via `addSchema`, keyed by `$id`. |
| `getSchema` | `.getSchema(id)` | Returns the schema matching `id`, or `undefined`. |
| `setReplySerializer` | `.setReplySerializer(fn(payload, statusCode))` | Sets the default reply serializer for all routes (used only for `2xx`); encapsulated per-plugin. |
| `setValidatorCompiler` | `.setValidatorCompiler(fn)` | Sets the schema validator compiler for all routes. |
| `setSchemaErrorFormatter` | `.setSchemaErrorFormatter(fn)` | Sets the formatter for schema validation errors. |
| `setSerializerCompiler` | `.setSerializerCompiler(fn)` | Sets the schema serializer compiler for all routes. `setReplySerializer` takes priority if both are set. |
| `validatorCompiler` | `.validatorCompiler` | Getter for the current validator; `null` until server start, then `({ schema, method, url, httpPart }) => compiledValidator`. |
| `serializerCompiler` | `.serializerCompiler` | Getter for the current serializer; same signature shape as `validatorCompiler`. |
| `schemaErrorFormatter` | `.schemaErrorFormatter` | Getter/setter for the schema error formatter function. |
| `schemaController` | `.schemaController` (factory option) | Fully controls schema storage (`bucket`) and compiler construction (`compilersFactory.buildValidator`/`buildSerializer`); useful for Ajv JTD/Standalone modes via `@fastify/ajv-compiler`. |

## Notes

- v4 → v5: schemas passed to `addSchema`/route `schema` must be complete, valid JSON Schema; partial/loosely-typed schemas that worked in v4 may now be rejected.

## Related

- [Validation and Serialization](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/) (`validation-serialization` category)
- [Instance Handlers](./instance-handlers.md)
