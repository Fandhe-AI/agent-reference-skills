---
source: https://developers.cloudflare.com/workers/runtime-apis/streams/readablestreambyobreader/
---

# ReadableStream BYOBReader

`BYOB` is an abbreviation of bring your own buffer. A `ReadableStreamBYOBReader` allows reading into a developer-supplied buffer, minimizing copies.

## Signature / Usage

A `ReadableStreamBYOBReader` is not instantiated via its constructor; it is retrieved from a `ReadableStream`:

Adapted (not in the official docs): `new TransformStream()` replaced with `new IdentityTransformStream()`; see Notes.

```js
const { readable, writable } = new IdentityTransformStream();
const reader = readable.getReader({ mode: 'byob' });
```

## Options / Props

### Methods

| Name | Returns | Description |
|------|---------|-------------|
| `read(bufferArrayBufferView)` | Promise\<ReadableStreamBYOBReadResult> | The next available chunk of data read into a passed-in buffer. |
| `readAtLeast(minElements, bufferArrayBufferView)` | Promise\<ReadableStreamBYOBReadResult> | Like `read`, but the promise does not resolve until at least `minElements` elements have been read. Element size is determined by the buffer view (for example 4 bytes per element for a `Uint32Array`). |

`readAtLeast` behavior:

- If `minElements` or more elements are available, resolves with `{ value: <buffer view sized to bytes read>, done: false }`.
- If the stream ends after some data has been read but fewer than `minElements` elements, resolves with the partial data: `{ value: <buffer view sized to bytes actually read>, done: false }`. The next call to `read` or `readAtLeast` returns `{ value: undefined, done: true }`.
- If the stream ends with zero bytes available (already at EOF), resolves with `{ value: <zero-length view>, done: true }`.
- If the stream errors, the promise rejects.
- `minElements` must be at least 1, and `minElements * elementSize` must not exceed the byte length of the buffer view, or the promise rejects with a `TypeError`. For a `Uint8Array`, `minElements` is effectively a byte count.

## Notes

- Corrected from the official docs: the official snippet uses `new TransformStream()`, which was an identity stream (with BYOB support) only under the legacy constructor. With the standard `TransformStream` (default as of compatibility date 2022-11-30), its readable side cannot provide a BYOB reader; use `IdentityTransformStream` or `FixedLengthStream` (as in the snippet above) for a BYOB-capable readable.
- Functionally identical to `ReadableStreamDefaultReader` except for the `read` method.
- `read` provides no control over the minimum number of bytes read into the buffer. Even with a 1 MiB buffer, the kernel may fulfill the read with a single byte. In practice `read` typically fills only 1% of the provided buffer.
- `readAtLeast` is a non-standard extension to the Streams API.

## Related

- [ReadableStream](./readablestream.md)
- [ReadableStream DefaultReader](./readablestream-default-reader.md)
- [Streams](./streams.md)
