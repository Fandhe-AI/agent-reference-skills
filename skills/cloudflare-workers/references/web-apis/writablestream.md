---
source: https://developers.cloudflare.com/workers/runtime-apis/streams/writablestream/
---

# WritableStream

A `WritableStream` is the `writable` property of a `TransformStream`. In the legacy behaviour described by the official page, `WritableStream` cannot be directly created using the `WritableStream` constructor (see Notes for the current default).

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

## Notes

- Corrected from the official docs: the "cannot be directly created" statement is the legacy behaviour. Per the compatibility-flags page, `streams_enable_constructors` is default as of compatibility date 2022-11-30 (disable with `streams_disable_constructors`) and adds the `new ReadableStream()` and `new WritableStream()` constructors backed by JavaScript underlying sources and sinks. Workers with an earlier compatibility date and no flag still cannot construct a `WritableStream` directly.

## Related

- [WritableStream DefaultWriter](./writablestream-default-writer.md)
- [ReadableStream](./readablestream.md)
- [TransformStream](./transformstream.md)
- [Streams](./streams.md)
