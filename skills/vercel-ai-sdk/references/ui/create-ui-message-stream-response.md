---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/create-ui-message-stream-response
---

# createUIMessageStreamResponse

Creates a `Response` object that streams UI messages to the client.

## Signature / Usage

```tsx
import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';

const response = createUIMessageStreamResponse({
  status: 200,
  statusText: 'OK',
  headers: {
    'Custom-Header': 'value',
  },
  stream: createUIMessageStream({
    execute({ writer }) {
      // The outer stream owns the assistant message lifecycle.
      writer.write({ type: 'start' });

      // Write custom data (type must be 'data-<name>')
      writer.write({
        type: 'data-message',
        data: { content: 'Hello' },
      });

      // Merge with LLM stream
      const result = streamText({
        model,
        prompt: 'Say hello',
      });

      writer.merge(
        toUIMessageStream({ stream: result.stream, sendStart: false }),
      );
    },
  }),
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| stream | `ReadableStream<UIMessageChunk>` | The UI message stream to send to the client. |
| status | `number` | Optional. The status code for the response. Defaults to 200. |
| statusText | `string` | Optional. The status text for the response. |
| headers | `Headers \| Record<string, string>` | Optional. Additional headers for the response. |
| keepAliveMs | `number` | Optional. Interval in milliseconds for sending SSE keep-alive comments. When set, an opening comment is sent immediately and additional comments are sent after the stream has been idle for the configured interval. |
| consumeSseStream | `(options: { stream: ReadableStream<string> }) => PromiseLike<void> \| void` | Optional. Callback to consume the Server-Sent Events stream. |

## Notes

- Returns a Web-standard `Response`; it can be returned directly from route handlers in frameworks that use the Fetch API (such as Next.js route handlers). Server-framework routing and middleware are covered by hono, fastify, nextjs-app, and tanstack-start; this page only documents the AI SDK helper. For Node.js `ServerResponse`, see `pipeUIMessageStreamToResponse`.

## Related

- [createUIMessageStream](./create-ui-message-stream.md)
- [pipeUIMessageStreamToResponse](./pipe-ui-message-stream-to-response.md)
- [Stream Protocols](./stream-protocol.md)
