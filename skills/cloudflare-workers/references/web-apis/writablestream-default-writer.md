---
source: https://developers.cloudflare.com/workers/runtime-apis/streams/writablestreamdefaultwriter/
---

# WritableStream DefaultWriter

A writer is used when you want to write directly to a `WritableStream`, rather than piping data to it from a `ReadableStream`.

## Signature / Usage

```js
function writeArrayToStream(array, writableStream) {
  const writer = writableStream.getWriter();
  array.forEach(chunk => writer.write(chunk).catch(() => {}));

  return writer.close();
}

writeArrayToStream([1, 2, 3, 4, 5], writableStream)
  .then(() => console.log('All done!'))
  .catch(e => console.error('Error with the stream: ' + e));
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `writer.desiredSize` | number \| null | The size needed to fill the stream's internal queue. For a standard `WritableStream` (constructor available since compatibility date 2022-11-30) this is the queuing strategy's `highWaterMark` minus the total size of queued chunks, so it can be greater than 1 or negative; it is 0 when the stream is closed and `null` when errored. Only for the legacy (pre-2022-11-30) implementation does it always return 1, 0 (if closed), or `null` (if errored). |
| `writer.closed` | Promise\<void> | Fulfilled when the writer stream is closed, rejected if there is an error in the stream. |

### Methods

| Name | Returns | Description |
|------|---------|-------------|
| `abort(reasonstringoptional)` | Promise\<void> | Aborts the stream; fulfills with `undefined`. `reason` is passed to the underlying sink's abort algorithm. If this writable stream is one side of a `TransformStream`, the transform's readable side becomes errored with `reason`. Any data not yet written is lost. |
| `close()` | Promise\<void> | Attempts to close the writer. Remaining writes finish processing before closing. Fulfilled with `undefined` on success, rejected on any error. |
| `releaseLock()` | void | Releases the writer's lock on the stream. Can be called before all pending `write(chunk)` calls are resolved, allowing you to queue a write, release the lock, and pipe from another source. |
| `write(chunkany)` | Promise\<void> | Writes a chunk of data and returns a promise that resolves if the operation succeeds. The underlying stream may accept fewer kinds of type than `any` and throws on an unexpected type. |

`releaseLock` example:

```js
let writer = writable.getWriter();
// Write a preamble.
writer.write(new TextEncoder().encode('foo bar'));
// While that’s still writing, pipe the rest of the body from somewhere else.
writer.releaseLock();
await someResponse.body.pipeTo(writable);
```

## Notes

- Corrected from the official docs: the official table says `desiredSize` always returns 1, 0, or `null`; that holds only for the legacy implementation, so standard behaviour (`highWaterMark` minus queued size) is stated and the fixed values are labelled legacy.

## Related

- [WritableStream](./writablestream.md)
- [ReadableStream](./readablestream.md)
- [Streams](./streams.md)
