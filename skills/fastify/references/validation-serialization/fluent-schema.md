---
source: https://fastify.dev/docs/latest/Guides/Fluent-Schema/
---

# Fluent Schema

[`fluent-json-schema`](https://github.com/fastify/fluent-json-schema) provides a fluent builder API for JSON Schema, simplifying schema construction and allowing reuse of constants, as an alternative to writing raw JSON Schema objects.

## Signature / Usage

```js
const S = require('fluent-json-schema')

const bodyJsonSchema = S.object()
  .prop('someKey', S.string())
  .prop('someOtherKey', S.number())
  .prop('requiredKey', S.array().maxItems(3).items(S.integer()).required())

const schema = {
  body: bodyJsonSchema
}

fastify.post('/the/url', { schema }, handler)
```

## Reuse (`$ref-way`)

```js
const addressSchema = S.object()
  .id('#address')
  .prop('line1').required()
  .prop('country').required()
  .prop('city').required()
  .prop('zipcode').required()

const commonSchemas = S.object()
  .id('https://fastify/demo')
  .definition('addressSchema', addressSchema)

fastify.addSchema(commonSchemas)

const bodyJsonSchema = S.object()
  .prop('residence', S.ref('https://fastify/demo#address')).required()
  .prop('office', S.ref('https://fastify/demo#/definitions/addressSchema')).required()

fastify.post('/the/url', { schema: { body: bodyJsonSchema } }, handler)
```

## Reuse (`replace-way`)

```js
const sharedAddressSchema = {
  $id: 'sharedAddress',
  type: 'object',
  required: ['line1', 'country', 'city', 'zipcode'],
  properties: {
    line1: { type: 'string' },
    country: { type: 'string' },
    city: { type: 'string' },
    zipcode: { type: 'string' }
  }
}
fastify.addSchema(sharedAddressSchema)

const bodyJsonSchema = {
  type: 'object',
  properties: {
    vacation: 'sharedAddress#'
  }
}

fastify.post('/the/url', { schema: { body: bodyJsonSchema } }, handler)
```

## Notes

- There is no need to call `.valueOf()` on a fluent-json-schema builder when passing it as a route `schema`.
- `$ref-way` and `replace-way` can be mixed when using `fastify.addSchema`.

## Related

- [Shared Schemas and $ref](./schema-refs-shared.md)
- [Schema Basics](./schema-basics.md)
