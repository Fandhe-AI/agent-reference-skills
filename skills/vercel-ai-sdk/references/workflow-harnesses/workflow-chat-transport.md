---
source: https://ai-sdk.dev/docs/reference/ai-sdk-workflow/workflow-chat-transport
---

# WorkflowChatTransport

A `ChatTransport` implementation for `useChat` that enables automatic stream reconnection for workflow-based chat apps. It posts messages to a chat endpoint, extracts the `x-workflow-run-id` response header, and reconnects to a `/{runId}/stream` endpoint on interruption (network failures, page refreshes, function timeouts).

## Signature / Usage

```tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { WorkflowChatTransport } from '@ai-sdk/workflow/client';

export default function Chat() {
  const { messages, sendMessage } = useChat({
    transport: new WorkflowChatTransport({
      api: '/api/chat',
      maxConsecutiveErrors: 5,
    }),
  });

  // ... render chat UI
}
```

Import: `import { WorkflowChatTransport } from "@ai-sdk/workflow/client"`

## Options / Props

Constructor parameters (all optional):

| Name | Type | Description |
| --- | --- | --- |
| api | string | API endpoint for chat requests; the reconnection endpoint is derived as `{api}/{runId}/stream`. Default: `'/api/chat'`. |
| fetch | typeof fetch | Custom fetch implementation. Default: global fetch. |
| maxConsecutiveErrors | number | Max consecutive errors during reconnection before giving up. Streams that end without any UI message chunks count as errors. Default: 3. |
| initialStartIndex | number | Default chunk index to start from when reconnecting. Negative values read from the end of a durable `UIMessageChunk` stream (e.g. `-50` fetches the last 50 chunks). Raw `ModelCallStreamPart` streams do not support negative UI chunk indexes. Overridable per call. Default: 0. |
| onChatSendMessage | (response: Response, options: SendMessagesOptions) => void \| Promise<void> | Invoked after the initial POST succeeds; e.g. inspect `x-workflow-run-id`. |
| onChatEnd | ({ chatId, chunkIndex }) => void \| Promise<void> | Invoked when the stream ends (finish chunk received). |
| prepareSendMessagesRequest | PrepareSendMessagesRequest | Customize the POST (endpoint, headers, credentials, body). |
| prepareReconnectToStreamRequest | PrepareReconnectToStreamRequest | Customize the reconnection GET (endpoint, headers, credentials). |

`sendMessages()` options: `chatId` (string), `trigger` (`'submit-message' | 'regenerate-message'`), `messageId` (string | undefined), `messages` (UIMessage[]), `abortSignal` (AbortSignal | undefined, propagated to POST and reconnection GETs). Returns `Promise<ReadableStream<UIMessageChunk>>`.

`reconnectToStream()` options: `chatId` (string), `abortSignal`, `startIndex` (number, optional; negative values read from the end when the server's durable stream and tail-index header use the same `UIMessageChunk` index space; falls back to `initialStartIndex`). Returns `Promise<ReadableStream<UIMessageChunk> | null>`.

```ts
const stream = await transport.reconnectToStream({
  chatId: 'chat-123',
  startIndex: -50, // Optional: fetch last 50 chunks
});
```

## Notes

- Reconnection flow: POST to `{api}` (response must include `x-workflow-run-id`); stream SSE while counting chunks; if the stream closes without a `finish` event, GET `{api}/{runId}/stream?startIndex={chunkIndex}`; retry from the updated chunk index (stream parsing errors and streams without chunks count toward `maxConsecutiveErrors`; a parsed stream that receives chunks resets the count); on `finish`, call `onChatEnd` and close.
- Negative start index: sent as-is in the first reconnection request; the server should resolve it to an absolute position and return the `x-workflow-stream-tail-index` response header. If the header is missing or invalid, the transport falls back to `startIndex=0`. Negative indexes require a durable server stream whose stored objects are already `UIMessageChunk` objects; the raw `WorkflowAgent` conversion supports non-negative indexes only.
- Server requirements: POST `{api}` accepts messages as JSON, returns an SSE stream of `UIMessageChunk` events and an `x-workflow-run-id` header. GET `{api}/{runId}/stream` accepts a `startIndex` query parameter and returns the SSE stream from that index (for negative values, resolve to the tail and include `x-workflow-stream-tail-index`).
- The `WorkflowAgent` endpoint example replays raw `ModelCallStreamPart` objects from index `0`, then applies the transport's non-negative cursor via `createModelCallToUIChunkTransform({ uiStartIndex })`.
- Unlike `DefaultChatTransport`, which assumes the full response arrives in a single HTTP request, this transport is built for the Workflow SDK where function timeouts can interrupt the stream.
- Distance: HTTP framework route handlers (hono, fastify, nextjs-app, tanstack-start) are covered by those skills; this page only covers the AI SDK client transport.

## Related

- [WorkflowAgent guide](./workflow-agent-guide.md)
- [WorkflowAgent](./workflow-agent.md)
- [useChat](../ui/use-chat.md)
- [Transport](../ui/transport.md)
