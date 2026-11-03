---
source: https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/
---

# ReadableStream

A `ReadableStream` is returned by the `readable` property inside `TransformStream`.

## Signature / Usage

```js
let reader = readable.getReader({ mode: 'byob' });
```

Async iteration:

```js
for await (const chunk of readable) {
	console.log(chunk);
}
```

Static `from`:

```js
const stream = ReadableStream.from(
	(async function* () {
		yield "hello ";
		yield "world";
	})(),
);
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `locked` | boolean | Whether the readable stream is locked to a reader. |

### Methods

| Name | Returns | Description |
|------|---------|-------------|
| `pipeTo(destinationWritableStream, optionsPipeToOptions)` | Promise\<void> | Pipes the readable stream to a given writable stream `destination`; fulfilled when the `write` operation succeeds, rejected if it fails. |
| `pipeThrough(transformStream, optionsPipeToOptions)` | ReadableStream | Pipes the readable stream to the writable side of a given `TransformStream` and returns the transform's readable side, so calls can be chained. `options` accepts the same values as `pipeTo()`. |
| `getReader(optionsObject)` | ReadableStreamDefaultReader \| ReadableStreamBYOBReader | Gets a `ReadableStreamDefaultReader` and locks the stream to it. The only supported option is `mode`, which can be set to `byob` to get a `ReadableStreamBYOBReader` instead (only for byte-capable streams such as the readable side of `IdentityTransformStream`). |
| `cancel(reasonstringoptional)` | Promise\<void> | Cancels the stream. `reason` is an optional human-readable string passed to the underlying source's cancel algorithm. Any data not yet read is lost. |
| `tee()` | \[ReadableStream, ReadableStream] | Locks the stream and returns two new `ReadableStream` instances that each read the same data. Per the WHATWG Streams standard, the source is read at the pace of the faster branch and chunks not yet read by the slower branch are buffered, so a slow or unconsumed branch can grow memory without bound. Consume both branches concurrently. See Notes for the Workers-specific claim in the official docs. |
| `values(optionsObject)` | AsyncIterableIterator | Returns an async iterator that reads and consumes the chunks of the stream. The only supported option is `preventCancel`; when `true`, the stream is not canceled when the iterator exits early (for example, from a `break`). A `ReadableStream` is also async iterable directly. |

### Static methods

| Name | Returns | Description |
|------|---------|-------------|
| `ReadableStream.from(asyncIterable)` | ReadableStream | Creates a new `ReadableStream` whose chunks are the values yielded by `asyncIterable`, which may be any iterable or async iterable, including an async generator. |

### `PipeToOptions`

| Name | Type | Description |
|------|------|-------------|
| `preventClose` | bool | When `true`, closure of the source `ReadableStream` will not cause the destination `WritableStream` to be closed. |
| `preventAbort` | bool | When `true`, errors in the source `ReadableStream` will no longer abort the destination `WritableStream`. `pipeTo` returns a rejected promise with the error from the source or any error that occurred while aborting the destination. |

## Notes

- Corrected from the official docs: the official `tee()` entry says backpressure to the underlying source follows the branch with the most unread data, avoiding unbounded buffering when one branch is slower, as long as the source responds to backpressure (it links to the workerd streams README, "tee behavior", for implementation details). That is a runtime-specific claim that is not part of the WHATWG standard, and this page does not rely on it: the standard `tee()` reads ahead at the pace of the faster branch and queues unread chunks for the slower one, with no bound. For large bodies (for example a `Response` body teed for caching and for the client), read both branches at the same time (for example `ctx.waitUntil()` for one and return the other) and do not leave a branch unread, to stay within the Worker memory limit.

## Related

- [Streams](./streams.md)
- [ReadableStream DefaultReader](./readablestream-default-reader.md)
- [ReadableStream BYOBReader](./readablestream-byob-reader.md)
- [TransformStream](./transformstream.md)
- [WritableStream](./writablestream.md)
