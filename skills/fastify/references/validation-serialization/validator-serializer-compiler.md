---
source: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
---

# Validator and Serializer Compilers

`setValidatorCompiler` and `setSerializerCompiler` let an application swap out the default Ajv / fast-json-stringify compilers for a custom implementation, or for a different validation library entirely (e.g. joi, yup).

## Signature / Usage

```js
fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema)
})

fastify.setSerializerCompiler(({ schema, method, url, httpStatus, contentType }) => {
  return data => JSON.stringify(data)
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `validatorCompiler({ schema, method, url, httpPart })` | function | Returns a validation function for the given schema/route part |
| `serializerCompiler({ schema, method, url, httpStatus, contentType })` | function | Returns a `data => string` serializer for the given schema/status/content type |

## Using other validation libraries (joi)

```js
const Joi = require('joi')

fastify.setValidatorCompiler(({ schema }) => {
  return (data) => {
    try {
      const { error, value } = schema.validate(data)
      if (error) {
        return { error } // Return the error, do not throw it
      }
      return { value }
    } catch (e) {
      return { error: e }
    }
  }
})

fastify.post('/the/url', {
  schema: {
    body: Joi.object().keys({
      hello: Joi.string().required()
    }).required()
  }
}, handler)
```

## Using other validation libraries (yup)

```js
const yup = require('yup')
const yupOptions = {
  strict: false,
  abortEarly: false,
  stripUnknown: true,
  recursive: true
}

fastify.post('/the/url', {
  schema: {
    body: yup.object({
      age: yup.number().integer().required()
    })
  },
  validatorCompiler: ({ schema, method, url, httpPart }) => {
    return function (data) {
      try {
        const result = schema.validateSync(data, yupOptions)
        return { value: result }
      } catch (e) {
        return { error: e }
      }
    }
  }
}, handler)
```

## Notes

- Custom validators **must return** `{ value }` on success or `{ error }` on failure — never throw — so they work correctly with both sync and async `preValidation` hooks and avoid unhandled promise rejections.
- All validation errors have a `.statusCode` property set to `400`, which the default error handler uses to set the response status.
- Fastify's error messages (via `schemaErrorFormatter`) are tuned for `ajv`; using a different validation library may produce odd or incomplete messages unless the compiler's errors mimic `ajv`'s shape, or a custom `errorHandler` is used (see Schema Error Handling).
- For per-`httpPart` Ajv customization (`schemaController` / bucket), see [Ajv Configuration](./ajv-configuration.md) and the Server reference's schema controller section (same skill, `server` category).
- Community plugins integrating alternative JSON Schema validators are listed on the official [Ecosystem](https://fastify.dev/docs/latest/Guides/Ecosystem/) page.

## Related

- [Ajv Configuration](./ajv-configuration.md)
- [Schema Error Handling](./schema-error-handling.md)
- [Response Serialization](./response-serialization.md)
