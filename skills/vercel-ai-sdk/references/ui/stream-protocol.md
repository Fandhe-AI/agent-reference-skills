---
source: https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol
---

# Stream Protocols

AI SDK UI functions such as `useChat` and `useCompletion` support text streams and data streams. The protocol defines how data is streamed to the frontend over HTTP, so custom backends (for example in Python) can provide compatible endpoints.

## Signature / Usage

Backend producing a UI message stream (data stream protocol):

```ts
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

### Text Stream Protocol

Chunks of plain text appended together to form the response. Supported by `useChat`, `useCompletion`, and `useObject`. Enable with `TextStreamChatTransport` in `useChat`, or `streamProtocol: 'text'` in `useCompletion`. On the backend, pass the result's `stream` to `toTextStream` and return it with `createTextStreamResponse`. Text streams only support basic text; use data streams for tool calls etc.

```ts
import {
  convertToModelMessages,
  createTextStreamResponse,
  streamText,
  toTextStream,
  UIMessage,
} from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
  });

  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}
```

Client side:

```tsx
import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';

const { messages, sendMessage } = useChat({
  transport: new TextStreamChatTransport({ api: '/api/chat' }),
});
```

### Data Stream Protocol

Uses Server-Sent Events (SSE) format. Custom backends must set the `x-vercel-ai-ui-message-stream` header to `v1`. Supported by `useChat` and `useCompletion` (used by default); `useCompletion` only supports the `text` and `data` stream parts. Each part is sent as `data: <JSON>` followed by a blank line.

| Part | Example |
| --- | --- |
| Message start | `data: {"type":"start","messageId":"..."}` |
| Text start | `data: {"type":"text-start","id":"msg_68679a454370819ca74c8eb3d04379630dd1afb72306ca5d"}` |
| Text delta | `data: {"type":"text-delta","id":"msg_68679a454370819ca74c8eb3d04379630dd1afb72306ca5d","delta":"Hello"}` |
| Text end | `data: {"type":"text-end","id":"msg_68679a454370819ca74c8eb3d04379630dd1afb72306ca5d"}` |
| Reasoning start | `data: {"type":"reasoning-start","id":"reasoning_123"}` |
| Reasoning delta | `data: {"type":"reasoning-delta","id":"reasoning_123","delta":"This is some reasoning"}` |
| Reasoning end | `data: {"type":"reasoning-end","id":"reasoning_123"}` |
| Reasoning file | `data: {"type":"reasoning-file","url":"data:image/png;base64,iVBOR...","mediaType":"image/png"}` |
| Source URL | `data: {"type":"source-url","sourceId":"https://example.com","url":"https://example.com"}` |
| Source document | `data: {"type":"source-document","sourceId":"https://example.com","mediaType":"file","title":"Title"}` |
| File | `data: {"type":"file","url":"https://example.com/file.png","mediaType":"image/png"}` |
| Custom | `data: {"type":"custom","kind":"openai.compaction","providerMetadata":{"openai":{"itemId":"cmp_123"}}}` |
| Data (`data-*`) | `data: {"type":"data-weather","data":{"location":"SF","temperature":100}}` |
| Error | `data: {"type":"error","errorText":"error message"}` |
| Tool input start | `data: {"type":"tool-input-start","toolCallId":"call_fJdQDqnXeGxTmr4E3YPSR7Ar","toolName":"getWeatherInformation"}` |
| Tool input delta | `data: {"type":"tool-input-delta","toolCallId":"call_fJdQDqnXeGxTmr4E3YPSR7Ar","inputTextDelta":"San Francisco"}` |
| Tool input available | `data: {"type":"tool-input-available","toolCallId":"call_fJdQDqnXeGxTmr4E3YPSR7Ar","toolName":"getWeatherInformation","input":{"city":"San Francisco"}}` |
| Tool approval request | `data: {"type":"tool-approval-request","toolCallId":"call_fJdQDqnXeGxTmr4E3YPSR7Ar","approvalId":"approval_123","approvalDescriptor":{"scope":"account:delete"},"reason":"Requires operator review"}` |
| Tool approval response | `data: {"type":"tool-approval-response","approvalId":"approval_123","approved":false,"reason":"User denied the request"}` |
| Tool output available | `data: {"type":"tool-output-available","toolCallId":"call_fJdQDqnXeGxTmr4E3YPSR7Ar","output":{"city":"San Francisco","weather":"sunny"}}` |
| Tool output denied | `data: {"type":"tool-output-denied","toolCallId":"call_fJdQDqnXeGxTmr4E3YPSR7Ar"}` |
| Start step | `data: {"type":"start-step"}` |
| Finish step | `data: {"type":"finish-step"}` |
| Reset step | `data: {"type":"reset-step"}` |
| Finish message | `data: {"type":"finish"}` |
| Abort | `data: {"type":"abort","reason":"user cancelled"}` |
| Termination | `data: [DONE]` |

## Notes

- Custom data parts use the `data-*` type pattern so the frontend can handle them by type.
- Custom parts: the `kind` field identifies provider-specific content in the format `{provider}.{provider-type}`.
- `tool-input-start` has an optional `inputEncoding`: omitted or `'json'` parses accumulated text as partial JSON; `'text'` uses the accumulated text directly as the string input (for raw custom-tool input such as code or HTML). The encoding is retained on persisted `input-streaming` tool parts.
- `tool-approval-request`: when `isAutomatic` is omitted the request expects an explicit approval response from the client. `reason` is optional; `approvalDescriptor` is optional opaque metadata, available as `part.approval.descriptor` after processing into UI messages. For provider-executed tools the approval response can include `providerExecuted: true`.
- `finish-step` marks one LLM API call in the backend; it is needed to process stitched assistant calls correctly (backend tools plus multi-step `useChat`).
- `reset-step` removes all message parts received since the most recent `start-step` (or all parts of the current message if no step boundary), to invalidate partial output of a retried step.
- Distinct from the HTTP frameworks: this is the wire format of the AI SDK UI message stream. Serving it from hono, fastify, nextjs-app, or tanstack-start is covered by those skills; this page only defines the protocol and the `createUIMessageStreamResponse` / `createTextStreamResponse` helpers.

## Related

- [createUIMessageStreamResponse](./create-ui-message-stream-response.md)
- [pipeUIMessageStreamToResponse](./pipe-ui-message-stream-to-response.md)
- [Transport](./transport.md)
- [useChat](./use-chat.md)
- [useCompletion](./use-completion.md)
