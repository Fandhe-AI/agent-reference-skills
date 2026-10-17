---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/create-ui-message-stream
---

# createUIMessageStream

Creates a readable stream for UI messages with message merging, error handling, and finish callbacks. Returns `ReadableStream<UIMessageChunk>`.

## Signature / Usage

```tsx
import { createUIMessageStream } from 'ai';

const stream = createUIMessageStream({
  async execute({ writer }) {
    // The outer stream owns the assistant message lifecycle.
    writer.write({ type: 'start' });

    // The id must be consistent across text-start, text-delta, and text-end
    writer.write({ type: 'text-start', id: 'example-text' });
    writer.write({ type: 'text-delta', id: 'example-text', delta: 'Hello' });
    writer.write({ type: 'text-end', id: 'example-text' });

    // Merge another stream from streamText
    const result = streamText({
      model,
      prompt: 'Write a haiku about AI',
    });

    writer.merge(
      toUIMessageStream({
        stream: result.stream,
        sendStart: false,
        onEnd: ({ outcome }) => {
          // The composer decides that the model stream outcome is also the
          // aggregate stream outcome.
          writer.setOutcome(outcome);
        },
      }),
    );
  },
  onError: error =>
    `Custom error: ${error instanceof Error ? error.message : String(error)}`,
  originalMessages: existingMessages,
  onEnd: ({ messages, isContinuation, outcome, responseMessage }) => {
    console.log('Stream outcome:', outcome.status);
  },
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| execute | `(options: { writer: UIMessageStreamWriterWithOutcome }) => Promise<void> \| void` | Receives a writer and writes UI message chunks to the stream. |
| execute.writer.write | `(part: UIMessageChunk) => void` | Writes a UI message chunk to the stream. |
| execute.writer.merge | `(stream: ReadableStream<UIMessageChunk>) => void` | Merges the contents of another UI message stream into this stream. |
| execute.writer.setOutcome | `(outcome: UIMessageStreamOutcome) => void` | Declares the operation-level outcome of the composed stream. The first declared outcome is retained, while fatal execution, merge, error-handling, or downstream processing failures override declarations. Statuses: 'completed', 'failed', 'aborted', 'unknown'. Does not write a chunk or close the stream. |
| execute.writer.onError | `(error: unknown) => string` | Error handler used by the stream writer for errors in merged streams. |
| onError | `(error: unknown) => string` | Handles errors and returns an error message string. By default returns `"An error occurred."` so server-side error details are not sent to the client. |
| originalMessages | `UIMessage[] \| undefined` | The original messages. If provided, persistence mode is assumed and a message ID is provided for the response message. |
| onEnd | `(options: { messages: UIMessage[]; isContinuation: boolean; isAborted: boolean; isCancelled?: true; outcome: UIMessageStreamOutcome; responseMessage: UIMessage; finishReason?: FinishReason }) => PromiseLike<void> \| void` | Called when the stream ends. `messages`: updated list; `isContinuation`: whether the response continues the last original message or a new one was created; `isAborted`; `isCancelled`: present and true when the consumer cancelled before an outcome was declared (e.g. client disconnected); `outcome`: `{ status: 'completed' } \| { status: 'failed'; error?: unknown } \| { status: 'aborted' } \| { status: 'unknown' }`; `responseMessage`; `finishReason`: 'stop', 'length', 'content-filter', 'tool-calls', 'error', or 'other'. |
| onFinish | same as `onEnd` | Deprecated alias for `onEnd`. |
| generateId | `IdGenerator \| undefined` | Generates unique IDs for messages. Uses the default ID generator if not provided. |

## Notes

- `setOutcome` records the composer's policy without writing a chunk or closing the stream. Individual `error` chunks do not change the outcome by themselves. When merging multiple child streams, aggregate their outcomes and call `setOutcome` once.
- `outcome` is separate from model finish reasons and individual error chunks. It remains 'unknown' when the consumer cancels before an outcome is declared; check `isCancelled` to distinguish.
- `onFinish` is deprecated; use `onEnd`.

## Related

- [createUIMessageStreamResponse](./create-ui-message-stream-response.md)
- [pipeUIMessageStreamToResponse](./pipe-ui-message-stream-to-response.md)
- [Stream Protocols](./stream-protocol.md)
- [UIMessage](./ui-message.md)
