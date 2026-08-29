---
source: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
---

# Shared Schemas and $ref

The `addSchema` API allows adding multiple schemas to the Fastify instance for reuse throughout the application. This API is encapsulated — schemas registered on an instance are visible to that instance and its children only. Shared schemas are referenced with JSON Schema `$ref`.

## Signature / Usage

```js
fastify.addSchema({
  $id: 'commonSchema',
  type: 'object',
  properties: {
    hello: { type: 'string' }
  }
})

fastify.post('/', {
  handler () {},
  schema: {
    body: { $ref: 'commonSchema#' },
    headers: { $ref: 'commonSchema#' }
  }
})
```

## Options / Props

| `$ref` form | Resolves to |
| --- | --- |
| `{ $ref: '#foo' }` | `$id: '#foo'` in the current schema |
| `{ $ref: '#/definitions/foo' }` | `definitions.foo` in the current schema |
| `{ $ref: 'http://url.com/sh.json#' }` | Shared schema with `$id: 'http://url.com/sh.json'` |
| `{ $ref: 'http://url.com/sh.json#/definitions/foo' }` | `definitions.foo` inside that shared schema |
| `{ $ref: 'http://url.com/sh.json#foo' }` | `$id: '#foo'` inside that shared schema |

## Retrieving shared schemas

```js
fastify.addSchema({ $id: 'schemaId', type: 'object', properties: { hello: { type: 'string' } } })

const mySchemas = fastify.getSchemas()
const mySchema = fastify.getSchema('schemaId')
```

`getSchemas()` is encapsulated and returns only schemas visible in the current scope (including parent scopes):

```js
fastify.addSchema({ $id: 'one', my: 'hello' })
// will return only `one` schema
fastify.get('/', (request, reply) => { reply.send(fastify.getSchemas()) })

fastify.register((instance, opts, done) => {
  instance.addSchema({ $id: 'two', my: 'ciao' })
  // will return `one` and `two` schemas
  instance.get('/sub', (request, reply) => { reply.send(instance.getSchemas()) })
  done()
})
```

## JSON Schema support matrix

| Use Case | Validator | Serializer |
| --- | --- | --- |
| `$ref` to `$id` | Yes | Yes |
| `$ref` to `/definitions` | Yes | Yes |
| `$ref` to shared schema `$id` | Yes | Yes |
| `$ref` to shared schema `/definitions` | Yes | Yes |

## Notes

- If the validator and serializer are customized (via `setValidatorCompiler` / `setSerializerCompiler`), `.addSchema` is no longer useful since Fastify no longer controls them; use `.getSchemas()` to access the raw schema map.
- External shared schemas can also be referenced via `$id` or `/definitions` using a full URL, as shown by `fastify.addSchema({ $id: 'http://foo/common.json', ... })` combined with `{ $ref: 'http://foo/common.json#address' }`.

## Related

- [Schema Basics](./schema-basics.md)
- [Fluent Schema](./fluent-schema.md)
