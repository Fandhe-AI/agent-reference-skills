---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/read-ui-message-stream
---

# readUIMessageStream

Transforms a stream of `UIMessageChunk`s into an `AsyncIterableStream` of `UIMessage`s. Useful outside Chat use cases, e.g. terminal UIs, custom stream consumption on the client, or RSC.

## Signature / Usage

```tsx
import { readUIMessageStream } from 'ai';
```

Returns an `AsyncIterableStream` of `UIMessage`s. Each stream part represents a different state of the same message as it is being completed.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| message | `UIMessage` | Optional. The last assistant message to use as a starting point when the conversation is resumed. Otherwise undefined. |
| stream | `ReadableStream<UIMessageChunk>` | The stream of UIMessageChunk objects to read. |
| onError | `(error: unknown) => void` | Optional. Called when an error occurs during stream processing. |
| terminateOnError | `boolean` | Optional. Whether to terminate the stream if an error occurs. Defaults to false. |

## Related

- [Reading UI Message Streams](./reading-ui-message-streams.md)
- [UIMessage](./ui-message.md)
