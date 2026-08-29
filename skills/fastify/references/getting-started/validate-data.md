---
source: https://fastify.dev/docs/latest/Guides/Getting-Started/
---

# Validate Your Data

Fastify uses JSON Schema to validate incoming requests. This is a core concept of the framework.

## Signature / Usage

```js
const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        someKey: { type: 'string' },
        someOtherKey: { type: 'number' }
      }
    }
  }
}

fastify.post('/', opts, async (request, reply) => {
  return { hello: 'world' }
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `schema.body` | object (JSON Schema) | Validates the request body |
| `schema.querystring` | object (JSON Schema) | Validates the query string |
| `schema.params` | object (JSON Schema) | Validates route params |
| `schema.headers` | object (JSON Schema) | Validates request headers |

## Notes

- Full details are in the validation-serialization category (`validation-serialization/`).

## Related

- [serializing-data.md](./serializing-data.md)
