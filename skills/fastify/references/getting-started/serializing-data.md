---
source: https://fastify.dev/docs/latest/Guides/Getting-Started/
---

# Serialize Your Data

Fastify has first-class, highly optimized support for JSON serialization. Declaring a `response` schema speeds up serialization and limits data leakage.

## Signature / Usage

```js
const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}

fastify.get('/', opts, async (request, reply) => {
  return { hello: 'world' }
})
```

## Notes

- Specifying a `response` schema can speed up serialization by a factor of 2-3.
- Fastify serializes only the data present in the response schema, which also helps protect against leaking sensitive fields.
- Full details are in the validation-serialization category (`validation-serialization/`).

## Related

- [validate-data.md](./validate-data.md)
- [request-payload.md](./request-payload.md)
