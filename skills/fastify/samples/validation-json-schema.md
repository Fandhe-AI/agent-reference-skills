---
source: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
---

# Validation JSON Schema

Validate request body and querystring against JSON Schema definitions attached to a route's `schema` option (compiled with Ajv).

```js
const bodyJsonSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string' },
    age: { type: 'number' }
  }
}

const queryStringJsonSchema = {
  type: 'object',
  properties: {
    search: { type: 'string' },
    limit: { type: 'integer' }
  }
}

const schema = {
  body: bodyJsonSchema,
  querystring: queryStringJsonSchema
}

fastify.post('/users', { schema }, (request, reply) => {
  reply.send({ ok: true })
})
```

## Notes

- Fastify compiles schemas with Ajv by default and validates before the handler runs; invalid requests return a 400 automatically.
- v5 requires body/params/querystring schemas to be complete JSON Schema objects (partial schemas from v4 are no longer merged implicitly).
- For static typing from the same schema, see `type-provider-typebox.md`.
