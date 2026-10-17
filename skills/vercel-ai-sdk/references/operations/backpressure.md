---
source: https://ai-sdk.dev/docs/advanced/backpressure
---

# Backpressure

Explains back-pressure and cancellation with streams: why the SDK streams lazily (`pull`) instead of eagerly pushing into a `ReadableStream`. Background reading; not required to use the AI SDK.

## Signature / Usage

Eager (does not respect back-pressure; keeps enqueuing even after the consumer stops reading):

```jsx
function createStream(iterator) {
  return new ReadableStream({
    async start(controller) {
      for await (const v of iterator) {
        controller.enqueue(v);
      }
      controller.close();
    },
  });
}
```

Lazy (uses `pull` and manual iteration; production tied to consumer demand):

```jsx
function createStream(iterator) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}
```

## Notes

- With the eager `for await` loop inside `start`, the producer runs as fast as possible (the example's generator yields about 10 values per read), so the stream's internal queue grows without bound.
- `pull` is called every time the consumer attempts to read more data (if nothing is already queued). With lazy production the internal buffer holds about 1 item and "yield" / "read" logs are paired.
- Cancellation is the same problem: with the eager loop the generator keeps yielding after the reader has stopped (memory grows until exhausted); with `pull` the producer stops when reads stop. Back-pressure and cancellation are two facets of one issue: push values lazily.
- Applied to AI responses: when a user navigates away, an eager server loop keeps requesting data from the model provider (until memory runs out); the lazy approach lets the aborted fetch connection free the response, the `ReadableStream` is garbage collected, and the provider connection is released.

## Related

- [Stopping Streams](./stopping-streams.md)
- [Streaming](../foundations/streaming.md)
