---
source: https://fastify.dev/docs/latest/Reference/Reply/
---

# Reply Serialization

Methods for retrieving, compiling, and overriding the serialization functions used by `.send()`.

## Signature / Usage

```js
const serialize = reply.getSerializationFunction({
  type: 'object',
  properties: { foo: { type: 'string' } }
})
serialize({ foo: 'bar' }) // '{"foo":"bar"}'
```

## Options / Props

| Name | Description |
|------|-------------|
| `.serialize(payload)` | Serializes the specified payload using the default JSON serializer, or the custom serializer (if one is set), and returns the serialized payload. |
| `.getSerializationFunction(schema \| httpStatus, [contentType])` | Returns an existing serialization function for the specified `schema` or `httpStatus` (and optional `contentType`), if one exists. Returns `undefined` otherwise. Depends on `schema#responses` attached to the route or functions compiled via `compileSerializationSchema`. |
| `.compileSerializationSchema(schema, [httpStatus], [contentType])` | Compiles the specified schema and returns a serialization function using the (default or customized) `SerializerCompiler`. Cached via a `WeakMap` keyed by schema reference. |
| `.serializeInput(data, [schema \| httpStatus], [httpStatus], [contentType])` | Serializes `data` using the specified schema or HTTP status code (`httpStatus` takes precedence if both given). Compiles a new serialization function if none exists yet. |
| `.serializer(func)` | Sets a custom serializer for the payload. By default, `.send()` JSON-serializes any value that is not `Buffer`, `stream`, `string`, `undefined`, or `Error`. A custom `'Content-Type'` header must be set when using a custom serializer. |

```js
const serialize = reply.compileSerializationSchema({
  type: 'object',
  properties: { foo: { type: 'string' } }
}, 200)
serialize({ foo: 'bar' }) // '{"foo":"bar"}'
```

```js
reply.serializeInput({ foo: 'bar' }, 200) // '{"foo":"bar"}'
```

```js
reply
  .header('Content-Type', 'application/x-protobuf')
  .serializer(protoBuf.serialize)
```

## Notes

- Compiled serialization functions are cached based on the schema's object reference. If a schema is mutated after compiling, the cached function will not detect the change and the previously compiled function is reused. Create a new schema object (e.g. `Object.assign({}, schema1)`) instead of mutating in place to benefit from caching correctly.
- Buffers, streams, and strings (unless a serializer is set) are already considered serialized and do not need `.serializer()` applied inside a handler.

## Related

- [reply-send](./reply-send.md)
- [reply-methods](./reply-methods.md)
