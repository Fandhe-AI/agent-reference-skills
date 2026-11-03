---
source: https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/
---

# TransformStream

A transform stream consists of a writable side and a readable side. Writes to the writable side result in new data being available for reading from the readable side.

## Signature / Usage

```js
let { readable, writable } = new TransformStream();
```

`IdentityTransformStream`:

```js
let { readable, writable } = new IdentityTransformStream();
```

`FixedLengthStream`:

```js
let { readable, writable } = new FixedLengthStream(1000);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TransformStream(transformer?)` | TransformStream | With compatibility date 2022-11-30 or later (`transformstream_enable_standard_constructor`), a standard-compliant `TransformStream` that accepts a `transformer` with `transform(chunk, controller)`. Under the legacy behaviour (earlier dates, or `transformstream_disable_standard_constructor`), returns a new identity transform stream. |
| `readable` | ReadableStream | An instance of a `ReadableStream`. |
| `writable` | WritableStream | An instance of a `WritableStream`. |
| `IdentityTransformStream()` | IdentityTransformStream | Returns a new identity transform stream (same `readable` / `writable` properties). |
| `FixedLengthStream(length)` | FixedLengthStream | Returns a new identity transform stream limited to `length` bytes. `length` may be a `number` or `bigint` with a maximum value of `2^53 - 1`. |

## Notes

- Legacy behaviour (source text): the `TransformStream` constructor only implements an identity transform stream, which forwards all chunks written to its writable side to its readable side without changes, and is not compliant with the Streams Standard. In preparation for conforming, `IdentityTransformStream` was introduced with behavior identical to that legacy `TransformStream`. It forwards all chunks of byte data (as `TypedArray`s) unchanged, and its readable side supports BYOB reads.
- Corrected from the official docs: the identity-only statement applies only to the legacy constructor. Per the compatibility-flags page, `transformstream_enable_standard_constructor` is default as of compatibility date 2022-11-30 (disable with `transformstream_disable_standard_constructor`), and it must be used in combination with `streams_enable_constructors` (also default as of 2022-11-30). With these, `new TransformStream({ transform(chunk, controller) { ... } })` is a standard transform stream, as in the Streams overview example. Legacy (pre-2022-11-30) Workers keep the identity behaviour unless the flags are set.
- A standard `TransformStream`'s readable side does not support BYOB readers; only the readable sides of `IdentityTransformStream` and `FixedLengthStream` do.
- `FixedLengthStream` is a specialization of `IdentityTransformStream` limiting the total bytes passed through. When used to produce a `Response` or `Request`, the fixed length is used as the `Content-Length` header value instead of chunked encoding. An error occurs if too many or too few bytes are written.

## Related

- [Streams](./streams.md)
- [ReadableStream](./readablestream.md)
- [WritableStream](./writablestream.md)
- [Request](./request.md)
- [Response](./response.md)
