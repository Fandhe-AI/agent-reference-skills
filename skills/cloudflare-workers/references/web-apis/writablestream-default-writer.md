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
| `writer.desiredSize` | int | The size needed to fill the stream's internal queue. Always returns 1, 0 (if the stream is closed), or `null` (if the stream has errors). |
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

## Related

- [WritableStream](./writablestream.md)
- [ReadableStream](./readablestream.md)
- [Streams](./streams.md)
