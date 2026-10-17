---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/websocket-chat-transport
---

# WebSocketChatTransport

A `ChatTransport` implementation that sends chat requests and receives `UIMessageChunk` streams over one persistent WebSocket connection.

## Signature / Usage

```tsx
import { useChat } from '@ai-sdk/react';
import { WebSocketChatTransport } from 'ai';
import { useMemo } from 'react';

export default function Chat() {
  const transport = useMemo(
    () => new WebSocketChatTransport({ url: '/api/chat' }),
    [],
  );

  const { messages, sendMessage, stop } = useChat({ transport });

  // ... render the chat
}
```

Import: `import { WebSocketChatTransport } from "ai"`.

## Options / Props

Constructor:

| Name | Type | Description |
| --- | --- | --- |
| url | `string` (required) | The WebSocket endpoint. Relative URLs are resolved against the browser location. HTTP and HTTPS URLs are converted to WS and WSS. |
| protocols | `string \| string[]` | Optional. WebSocket subprotocols sent during the handshake. |
| params | `Resolvable<Record<string, string>>` | Optional. Query parameters resolved and appended whenever a new connection is opened. |
| headers | `Resolvable<Record<string, string> \| Headers>` | Optional. Headers included inside each application-level send or resume frame. Not WebSocket handshake headers. |
| body | `Resolvable<object>` | Optional. Additional application data merged with per-request body data and included in send and resume frames. |
| webSocket | `WebSocketConstructor` | Optional. A custom WebSocket constructor (Node.js implementations or tests). Defaults to `globalThis.WebSocket`. |
| prepareSendMessagesRequest | `PrepareWebSocketChatTransportSendMessagesRequest` | Optional. Transforms the messages, headers, or body before a send frame is transmitted. |
| prepareReconnectToStreamRequest | `PrepareWebSocketChatTransportReconnectToStreamRequest` | Optional. Transforms the headers or body before a resume frame is transmitted. |

`headers` supplied to `sendMessage`, `regenerate`, or an automatic tool follow-up override transport-level headers with the same lower-cased name. Per-request `body` properties override transport-level body properties. Preparation callbacks receive the merged values; values they return replace the corresponding merged value.

### Methods

- `sendMessages()`: opens the socket when necessary, sends a `send` frame, and returns the correlated `ReadableStream<UIMessageChunk>`. Multiple requests can share the connection and are routed by `requestId`.
- `reconnectToStream()`: sends a `resume` frame. `start`, the first `chunk`, or `end` resolves to a readable stream; `no-active` resolves to `null`; `error`, cancellation, or a connection failure rejects if no stream has been returned yet.
- `close()`: closes the current socket and errors active streams. A later send or resume opens a new connection.

### Wire Protocol

Each frame is a JSON object with a `type` and a correlated `requestId`.

Client-to-server frames (type with `WebSocketChatTransportRequest<UI_MESSAGE>`, `WebSocketChatTransportSendRequest`, `WebSocketChatTransportResumeRequest`, `WebSocketChatTransportAbortRequest`):

| Type | Purpose |
| --- | --- |
| `send` | Starts a new or regenerated turn and includes `id`, `messages`, `trigger`, `messageId`, request `headers`, `body`, and `metadata`. |
| `resume` | Requests the retained response for a chat `id`, with request `headers`, `body`, and `metadata`. `lastSequence` is omitted to request a complete replay. |
| `abort` | Cancels the operation identified by `requestId`. |

Server-to-client frames (type with `WebSocketChatTransportResponse`):

| Type | Purpose |
| --- | --- |
| `start` | Confirms that a resume request has an active stream. |
| `chunk` | Carries a monotonic `sequence` and one valid `UIMessageChunk` in `chunk`. |
| `end` | Closes the correlated response stream. |
| `error` | Errors the correlated stream with the optional `errorText`. |
| `no-active` | Resolves a resume request to `null`; for a send request it closes the stream. |

Validate every untrusted client frame:

```ts
const validated = await safeValidateWebSocketChatTransportRequest({
  value: parsed.value,
});

if (!validated.success) {
  socket.close(1008, 'Invalid frame');
  return;
}

const frame = validated.data;
```

## Notes

- Responses for unknown or completed request IDs are ignored. Malformed frames, unknown response types, and invalid UI message chunks are protocol errors: the connection is closed and all active streams are errored.
- Resume: servers should send `start` as soon as they confirm a resumable stream is active, then replay the retained response from sequence zero. The transport omits `lastSequence` because Chat starts a fresh parser on resume. Retain and replay the original UI `start` chunk with a stable `messageId` so Chat replaces the partial assistant message. The transport rejects gaps and ignores duplicate sequence numbers within each response stream, including the replay.
- Lifecycle: the creator owns the transport. React and Vue `useChat` do not close caller-supplied transports. Call `transport.close()` after the final consumer is gone; if a directly managed `Chat` exclusively owns it, call `await chat.dispose()`.
- The server owns authentication, authorization, message validation, model execution, resumable stream storage, and cancellation. The official Node.js outline (using `ws`) validates frames with `safeValidateWebSocketChatTransportRequest`, validates messages with `validateUIMessages`, and forwards `toUIMessageStream({ stream: result.stream, originalMessages: messages, generateMessageId: generateId })` chunks as `chunk` frames with increasing `sequence`; it retains chunks in memory for replay (production should expire completed streams and use durable storage when reconnects can reach another process) and removes a failed response from retained state so a later resume returns `no-active`.
- Authentication and deployment: use WSS in production; browser WebSockets cannot set arbitrary handshake headers (prefer secure cookies, short-lived query tokens, or subprotocols); validate the handshake origin, authorize chat IDs, validate every frame and UI message, limit frame sizes, rate-limit connections; do not depend on process memory for reconnection; no automatic replay of interrupted `send` requests (replay can duplicate model output or tool side effects).
- `WebSocketChatTransport` is separate from the experimental Realtime APIs. Realtime transports implement provider realtime sessions; this transport carries the provider-independent AI SDK UI message protocol used by `useChat`.
- Client-side tool follow-ups: when `sendAutomaticallyWhen` triggers after client-side tool output is added, the next turn reuses the same WebSocket, but the `ChatTransport` contract remains turn-based; the tool output is not injected into a model generation that is still active.

## Related

- [Transport](./transport.md)
- [useChat](./use-chat.md)
- [validateUIMessages](./validate-ui-messages.md)
- [useRealtime](./use-realtime.md)
