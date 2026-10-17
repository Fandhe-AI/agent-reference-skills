---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/pipe-ui-message-stream-to-response
---

# pipeUIMessageStreamToResponse

Pipes streaming UI message data to a Node.js `ServerResponse` object. Returns a `Promise<void>` that resolves when the stream has been written to the response and rejects when reading or writing the stream fails.

## Signature / Usage

```tsx
import { pipeUIMessageStreamToResponse } from 'ai';

await pipeUIMessageStreamToResponse({
  response: serverResponse,
  status: 200,
  statusText: 'OK',
  headers: {
    'Custom-Header': 'value',
  },
  stream: myUIMessageStream,
  consumeSseStream: ({ stream }) => {
    // Optional: consume the SSE stream independently
    console.log('Consuming SSE stream:', stream);
  },
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| response | `ServerResponse` | The Node.js ServerResponse object to pipe the data to. |
| stream | `ReadableStream<UIMessageChunk>` | The UI message stream to pipe to the response. |
| status | `number` | Optional. The status code for the response. |
| statusText | `string` | Optional. The status text for the response. |
| headers | `Headers \| Record<string, string>` | Optional. Additional headers for the response. |
| keepAliveMs | `number` | Optional. Interval in milliseconds for sending SSE keep-alive comments. When set, an opening comment is sent immediately and additional comments are sent after the stream has been idle for the configured interval. |
| consumeSseStream | `({ stream }: { stream: ReadableStream<string> }) => PromiseLike<void> \| void` | Optional. Consumes the SSE stream independently. The stream is teed and this function receives a copy. |

## Notes

- Targets Node.js `ServerResponse` (for example Express-style or fastify raw responses). Framework-specific wiring belongs to hono, fastify, nextjs-app, and tanstack-start; this page only documents the AI SDK helper. Web-standard handlers use `createUIMessageStreamResponse`.

## Related

- [createUIMessageStreamResponse](./create-ui-message-stream-response.md)
- [createUIMessageStream](./create-ui-message-stream.md)
- [Stream Protocols](./stream-protocol.md)
