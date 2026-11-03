---
source: https://developers.cloudflare.com/workers/runtime-apis/streams/readablestreamdefaultreader/
---

# ReadableStream DefaultReader

A reader is used when you want to read from a `ReadableStream`, rather than piping its output to a `WritableStream`.

## Signature / Usage

A `ReadableStreamDefaultReader` is not instantiated via its constructor; it is retrieved from a `ReadableStream`:

```js
const { readable, writable } = new TransformStream();
const reader = readable.getReader();
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `reader.closed` | Promise\<void> | Indicates if the reader is closed. Fulfilled when the reader stream closes and rejected if there is an error in the stream. |

### Methods

| Name | Returns | Description |
|------|---------|-------------|
| `read()` | Promise\<{ value: any, done: boolean }> | The next available chunk of data being passed through the reader queue; `done` is `true` (and `value` is `undefined`) once the stream is closed. |
| `cancel(reasonstringoptional)` | Promise\<void> | Cancels the stream. `reason` is an optional human-readable string passed to the underlying source's cancel algorithm; if this readable stream is one side of a `TransformStream`, its cancel algorithm causes the transform's writable side to become errored with `reason`. Any data not yet read is lost. |
| `releaseLock()` | void | Releases the lock on the readable stream. A lock cannot be released if the reader has pending read operations; a `TypeError` is thrown and the reader remains locked. |

## Related

- [ReadableStream](./readablestream.md)
- [ReadableStream BYOBReader](./readablestream-byob-reader.md)
- [Streams](./streams.md)
