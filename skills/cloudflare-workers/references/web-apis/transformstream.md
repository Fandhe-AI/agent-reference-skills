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
| `TransformStream()` | TransformStream | Returns a new identity transform stream. |
| `readable` | ReadableStream | An instance of a `ReadableStream`. |
| `writable` | WritableStream | An instance of a `WritableStream`. |
| `IdentityTransformStream()` | IdentityTransformStream | Returns a new identity transform stream (same `readable` / `writable` properties). |
| `FixedLengthStream(length)` | FixedLengthStream | Returns a new identity transform stream limited to `length` bytes. `length` may be a `number` or `bigint` with a maximum value of `2^53 - 1`. |

## Notes

- Workers currently only implements an identity transform stream, which forwards all chunks written to its writable side to its readable side without changes.
- The `TransformStream` implementation is currently not compliant with the Streams Standard; changes to conform are planned. In preparation, `IdentityTransformStream` was introduced with behavior identical to the current `TransformStream`. It forwards all chunks of byte data (as `TypedArray`s) unchanged, and its readable side supports BYOB reads.
- `FixedLengthStream` is a specialization of `IdentityTransformStream` limiting the total bytes passed through. When used to produce a `Response` or `Request`, the fixed length is used as the `Content-Length` header value instead of chunked encoding. An error occurs if too many or too few bytes are written.
- Docs inconsistency: the Streams overview page shows `new TransformStream({ transform(chunk, controller) { ... } })`, which conflicts with the identity-only statement above.

## Related

- [Streams](./streams.md)
- [ReadableStream](./readablestream.md)
- [WritableStream](./writablestream.md)
- [Request](./request.md)
- [Response](./response.md)
