---
source: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
---

# Schema Error Handling

When schema validation fails, Fastify automatically returns a `400` response with the validator's result in the payload. Error formatting, capture, and localization can all be customized.

## Signature / Usage

```js
const schema = {
  body: {
    type: 'object',
    properties: { name: { type: 'string' } },
    required: ['name']
  }
}
```

Default failure payload:

```js
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "body should have required property 'name'"
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `attachValidation` | `boolean` | Route option; when `true`, validation errors are attached to `request.validationError` instead of being sent automatically |
| `schemaErrorFormatter` | `(errors, dataVar) => Error` | Fastify factory option / `setSchemaErrorFormatter` — builds the human-readable error message |

## `attachValidation`

```js
fastify.post('/', { schema, attachValidation: true }, function (req, reply) {
  if (req.validationError) {
    // `req.validationError.message` is the formatted message
    // `req.validationError.validation` contains the raw validation result
    reply.code(400).send(req.validationError)
  }
})
```

`request.validationError` carries:

- `message` — the formatted message (produced by `schemaErrorFormatter`)
- `validation` — the raw validation result, as returned by the validator
- `validationContext` — the part of the request that failed (`body`, `params`, `querystring`, `headers`)
- `code` — `FST_ERR_VALIDATION`
- `statusCode` — `400`

## `schemaErrorFormatter`

```js
const fastify = Fastify({
  schemaErrorFormatter: (errors, dataVar) => {
    // ... my formatting logic
    return new Error(myErrorMessage)
  }
})

// or
fastify.setSchemaErrorFormatter(function (errors, dataVar) {
  this.log.error({ err: errors }, 'Validation failed')
  return new Error(myErrorMessage)
})
```

## Notes

- Security: by default, validation error details from the schema are included in the response payload; use `setErrorHandler()` if error messages need to be sanitized before being sent to clients.
- `ajv-errors` enables custom per-property error messages via an `errorMessage` keyword in the schema. Fastify v5 uses AJV v8 and requires an `ajv-errors` version compatible with AJV v8 (v3 required `ajv-errors@1.0.1` for AJV v6) — see the [AJV compiler versions table](https://github.com/fastify/ajv-compiler/#versions).
- Security: enabling `allErrors: true` (needed by `ajv-errors`) can be a DoS vector; see [CVE-2020-8192](https://www.cvedetails.com/cve/CVE-2020-8192/).
- `ajv-i18n` can localize error messages by running `localize.<locale>(error.validation)` inside a custom `errorHandler`.

## Related

- [Validator / Serializer Compiler](./validator-serializer-compiler.md)
- [Schema Basics](./schema-basics.md)
