---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/simulate-readable-stream
---

# simulateReadableStream

`simulateReadableStream` creates a `ReadableStream` that emits provided values sequentially with configurable delays. Useful for testing streaming functionality or simulating time-delayed data streams.

## Signature / Usage

```ts
import { simulateReadableStream } from 'ai';

const stream = simulateReadableStream({
  chunks: ['Hello', ' ', 'World'],
  initialDelayInMs: 100,
  chunkDelayInMs: 50,
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| chunks | `T[]` | Array of values to be emitted by the stream. |
| initialDelayInMs | `number \| null` (Optional) | Initial delay in milliseconds before emitting the first value. Defaults to 0. Set to `null` to skip the initial delay entirely. |
| chunkDelayInMs | `number \| null` (Optional) | Delay in milliseconds between emitting each value. Defaults to 0. Set to `null` to skip delays between chunks. |

Returns a `ReadableStream<T>` that emits each value from `chunks` sequentially, waits for `initialDelayInMs` before the first value (if not `null`), waits for `chunkDelayInMs` between subsequent values (if not `null`), and closes automatically after all chunks have been emitted. Type parameter `T` is the type of values in the chunks array.

Without delays:

```ts
const stream = simulateReadableStream({
  chunks: ['Hello', ' ', 'World'],
  initialDelayInMs: null, // No initial delay
  chunkDelayInMs: null, // No delay between chunks
});
```

## Related

- [streamText](./stream-text.md)
