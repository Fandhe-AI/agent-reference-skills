---
source: https://developers.cloudflare.com/workers/runtime-apis/streams/writablestream/
---

# WritableStream

A `WritableStream` is the `writable` property of a `TransformStream`. On the Workers platform, `WritableStream` cannot be directly created using the `WritableStream` constructor.

## Signature / Usage

A typical way to write to a `WritableStream` is to pipe a `ReadableStream` to it.

```js
readableStream
  .pipeTo(writableStream)
  .then(() => console.log('All data successfully written!'))
  .catch(e => console.error('Something went wrong!', e));
```

To write directly, use its writer:

```js
const writer = writableStream.getWriter();
writer.write(data);
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `locked` | boolean | Whether the writable stream is locked to a writer. |

### Methods

| Name | Returns | Description |
|------|---------|-------------|
| `abort(reasonstringoptional)` | Promise\<void> | Aborts the stream; fulfills with `undefined`. `reason` is an optional human-readable string passed to the underlying sink's abort algorithm. If this writable stream is one side of a `TransformStream`, its abort algorithm causes the transform's readable side to become errored with `reason`. Any data not yet written is lost upon abort. |
| `getWriter()` | WritableStreamDefaultWriter | Gets a `WritableStreamDefaultWriter` and locks the `WritableStream` to that writer. |

## Related

- [WritableStream DefaultWriter](./writablestream-default-writer.md)
- [ReadableStream](./readablestream.md)
- [TransformStream](./transformstream.md)
- [Streams](./streams.md)
