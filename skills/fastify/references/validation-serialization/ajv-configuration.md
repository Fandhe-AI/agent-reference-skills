---
source: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
---

# Ajv Configuration

Fastify validates requests using [Ajv v8](https://www.npmjs.com/package/ajv) with a baseline configuration tuned for performance and safety. The configuration can be customized via `ajv.customOptions`, a fully custom Ajv instance, or Ajv plugins.

## Signature / Usage

```js
{
  coerceTypes: 'array', // change data type of data to match type keyword
  useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
  removeAdditional: true, // remove additional properties if additionalProperties is set to false
  uriResolver: require('fast-uri'),
  addUsedSchema: false,
  // Explicitly set allErrors to `false`.
  // When set to `true`, a DoS attack is possible.
  allErrors: false
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `coerceTypes` | `boolean` \| `'array'` | `'array'` | Coerces data to match the `type` keyword |
| `useDefaults` | `boolean` | `true` | Fills in missing properties/items with `default` values |
| `removeAdditional` | `boolean` \| `'all'` | `true` | Removes additional properties when `additionalProperties: false` |
| `allErrors` | `boolean` | `false` | Collects all validation errors instead of stopping at the first; enabling it is a DoS vector |
| `ajv.plugins` | `array` | — | Ajv plugins to register on the default instance (must match the bundled Ajv version) |

## Custom Ajv instance

```js
const fastify = require('fastify')()
const Ajv = require('ajv')
const ajv = new Ajv({
  removeAdditional: 'all',
  useDefaults: true,
  coerceTypes: 'array'
})
fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema)
})
```

## Per-httpPart Ajv instances

```js
const schemaCompilers = {
  body: new Ajv({ removeAdditional: false, coerceTypes: false, allErrors: true }),
  params: new Ajv({ removeAdditional: false, coerceTypes: true, allErrors: true }),
  querystring: new Ajv({ removeAdditional: false, coerceTypes: true, allErrors: true }),
  headers: new Ajv({ removeAdditional: false, coerceTypes: true, allErrors: true })
}

server.setValidatorCompiler(req => {
  if (!req.httpPart) {
    throw new Error('Missing httpPart')
  }
  const compiler = schemaCompilers[req.httpPart]
  if (!compiler) {
    throw new Error(`Missing compiler for ${req.httpPart}`)
  }
  return compiler.compile(req.schema)
})
```

## Ajv Plugins

```js
const fastify = require('fastify')({
  ajv: {
    plugins: [
      require('ajv-merge-patch')
    ]
  }
})
```

## Notes

- Ajv will [coerce](https://ajv.js.org/coercion.html) values to the types specified in the schema `type` keywords, both to pass validation and to use correctly typed data afterward.
- When type coercion is enabled, using `anyOf` with nullable primitive types can produce unexpected results (e.g. `0` or `false` coerced to `null`, because Ajv evaluates `anyOf` branches in order). Prefer `{ type: 'number', nullable: true }` over `anyOf: [{ type: 'null' }, { type: 'number' }]`.
- When using a custom validator instance, add schemas to that instance rather than to Fastify — `fastify.addSchema` will not be recognized by a custom validator.
- Ajv plugins must be compatible with the Ajv version bundled in Fastify; see [`ajv-compiler`](https://github.com/fastify/ajv-compiler?tab=readme-ov-file#ajv-configuration).

## Related

- [Schema Basics](./schema-basics.md)
- [Validator / Serializer Compiler](./validator-serializer-compiler.md)
