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
| `releaseLock()` | void | Releases the lock on the readable stream. Per the current WHATWG Streams standard, the lock is released even if the reader has pending `read()` calls; those pending promises reject with a `TypeError`, and the stream can then be locked by a new reader. See Notes for the older behaviour described by the official docs. |

## Notes

- Corrected from the official docs: the official table says a lock cannot be released while reads are pending and that `releaseLock()` throws a `TypeError` leaving the reader locked. That is the older (pre-2021) standard behaviour; the current WHATWG Streams standard releases the lock and rejects the pending `read()` promises with a `TypeError`. Treat the throwing behaviour as legacy, and await outstanding reads before `releaseLock()` if you need code that is correct under both.

## Related

- [ReadableStream](./readablestream.md)
- [ReadableStream BYOBReader](./readablestream-byob-reader.md)
- [Streams](./streams.md)
