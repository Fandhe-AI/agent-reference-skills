---
source: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
---

# Schema Basics

Fastify uses a schema-based approach with JSON Schema (Draft 7) to validate `body`, `querystring`/`query`, `params`, and `headers` on a route, and to serialize the response. Schemas are compiled into highly performant functions via Ajv (validation) and fast-json-stringify (serialization).

## Signature / Usage

```js
const schema = {
  body: bodyJsonSchema,
  querystring: queryStringJsonSchema,
  params: paramsJsonSchema,
  headers: headersJsonSchema
}

fastify.post('/the/url', { schema }, handler)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `schema.body` | object (JSON Schema) | Validates the request body for `POST`, `PUT`, or `PATCH` |
| `schema.querystring` / `schema.query` | object (JSON Schema) | Validates the query string |
| `schema.params` | object (JSON Schema) | Validates the route parameters |
| `schema.headers` | object (JSON Schema) | Validates the request headers |

## Body Content-Type Validation

The `body` schema can differentiate validation per content type by nesting schemas under a `content` property, matched against the request's `Content-Type` header (exact essence MIME type match).

```js
fastify.post('/the/url', {
  schema: {
    body: {
      content: {
        'application/json': {
          schema: { type: 'object' }
        },
        'text/plain': {
          schema: { type: 'string' }
        }
        // Other content types will not be validated
      }
    }
  }
}, handler)
```

## Notes

- Validation is only attempted if the content type is `application/json`, unless the body schema uses `content` to specify validation per content type.
- When using custom content type parsers, the parsed body is validated **only** when the request content type matches a key in the schema `content` map (exact essence MIME type match); a parser registered with a broader regular expression can accept content types the `content` map does not cover, and those requests are parsed but **not validated**.
- Security: treat schema definitions as application code — validation and serialization use `new Function()`, which is unsafe with user-provided schemas.
- Security: the `$async` Ajv feature should not be used for initial validation; accessing databases during validation may lead to Denial of Service attacks. Use hooks like `preHandler` for async tasks after validation.
- Custom validators used with async `preValidation` hooks **must return** `{ error }` objects instead of throwing, to avoid unhandled promise rejections crashing the application.
- **v4 → v5**: Fastify v5 requires a **full JSON Schema** (with `type: 'object'` and `properties`) for `querystring`, `params`, `body`, and response schemas — the v4 shorthand of listing properties directly (e.g. `querystring: { name: { type: 'string' } }`) is no longer valid and must become `querystring: { type: 'object', properties: { name: { type: 'string' } } }` (per `Guides/Migration-Guide-V5.md`).
- **v4 → v5**: the `time` and `date-time` string formats now enforce a timezone. For backward-compatible behavior without a mandatory timezone, use `iso-time` / `iso-date-time` instead (per `Guides/Migration-Guide-V5.md`).

## Related

- [Ajv Configuration](./ajv-configuration.md)
- [Response Serialization](./response-serialization.md)
- [Fluent Schema](./fluent-schema.md)
