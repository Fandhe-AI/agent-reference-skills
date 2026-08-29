---
source: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
---

# Response Serialization

Fastify uses [fast-json-stringify](https://www.npmjs.com/package/fast-json-stringify) to serialize a response as JSON when an output `response` schema is provided. This can drastically increase throughput and helps prevent accidental disclosure of sensitive information.

## Signature / Usage

```js
const schema = {
  response: {
    200: {
      type: 'object',
      properties: {
        value: { type: 'string' },
        otherValue: { type: 'boolean' }
      }
    }
  }
}

fastify.post('/the/url', { schema }, handler)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `response[statusCode]` | object (JSON Schema) | Schema for a specific status code |
| `response['2xx']` | object (JSON Schema) | Shared schema for any status in the `2xx` range |
| `response.default` | object (JSON Schema) | Fallback schema for status codes without a specific entry |
| `response[statusCode].content` | object | Per-content-type response schema, keyed by MIME type (`*/*` matches any) |

## Per-content-type response schema

```js
const schema = {
  response: {
    200: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: { name: { type: 'string' } }
          }
        },
        'application/vnd.v1+json': {
          schema: { type: 'array', items: { $ref: 'test' } }
        }
      }
    },
    default: {
      content: {
        // */* is match-all content-type
        '*/*': {
          schema: { type: 'object', properties: { desc: { type: 'string' } } }
        }
      }
    }
  }
}

fastify.post('/url', { schema }, handler)
```

## Notes

- The Validation-and-Serialization reference page shows a `201` "contract syntax" that lists properties directly (without `type`/`properties` wrapping) as shorthand. However, per `Guides/Migration-Guide-V5.md`, Fastify v5 requires a **full JSON Schema** (`type: 'object'` + `properties`) for response schemas as well as for `querystring`/`params`/`body` — see [Schema Basics](./schema-basics.md). Treat the bare-properties shorthand as legacy/unsupported under v5 and prefer the full-schema form shown above.
- To set a custom serializer for a specific part of the code, use `reply.serializer(...)` (see the Reply reference).

## Related

- [Schema Basics](./schema-basics.md)
- [Validator / Serializer Compiler](./validator-serializer-compiler.md)
