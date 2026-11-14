---
source: https://ai-sdk.dev/docs/ai-sdk-ui/transport
---

# Transport

The `useChat` transport system controls how messages are sent to your API endpoints and how responses are processed. Useful for WebSockets, custom authentication patterns, or specialized backend integrations.

## Signature / Usage

By default, `useChat` uses HTTP POST requests to `/api/chat`. This default is equivalent to:

```tsx
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

const { messages, sendMessage } = useChat({
  transport: new DefaultChatTransport({
    api: '/api/chat',
  }),
});
```

### Dynamic configuration

`headers`, `body`, and `credentials` can be functions (for example for refreshed auth tokens):

```tsx
const { messages, sendMessage } = useChat({
  transport: new DefaultChatTransport({
    api: '/api/chat',
    headers: () => ({
      Authorization: `Bearer ${getAuthToken()}`,
      'X-User-ID': getCurrentUserId(),
    }),
    body: () => ({
      sessionId: getCurrentSessionId(),
      preferences: getUserPreferences(),
    }),
    credentials: () => 'include',
  }),
});
```

### Request transformation

```tsx
const { messages, sendMessage } = useChat({
  transport: new DefaultChatTransport({
    api: '/api/chat',
    prepareSendMessagesRequest: ({ id, messages, trigger, messageId }) => {
      return {
        headers: {
          'X-Session-ID': id,
        },
        body: {
          messages: messages.slice(-10), // Only send last 10 messages
          trigger,
          messageId,
        },
      };
    },
  }),
});
```

### WebSocket Transport

`WebSocketChatTransport` shares a persistent WebSocket connection across chat turns instead of one HTTP request per turn.

```tsx
import { useChat } from '@ai-sdk/react';
import { WebSocketChatTransport } from 'ai';
import { useMemo } from 'react';

export default function Chat() {
  const transport = useMemo(
    () =>
      new WebSocketChatTransport({
        url: '/api/chat',
        params: () => ({ token: getShortLivedToken() }),
      }),
    [],
  );

  const { messages, sendMessage } = useChat({ transport });

  // ... render the chat
}
```

- The transport multiplexes requests by `requestId`, validates incoming `UIMessageChunk` values, forwards aborts to the server, and reuses the open socket for later turns. HTTP and HTTPS URLs are automatically converted to WS and WSS URLs.
- The code that creates a transport owns its lifecycle. React and Vue chat hooks do not close caller-supplied transports when options change or components are disposed. Call `transport.close()` after its last consumer is gone. If a directly managed `Chat` instance exclusively owns the transport, call `chat.dispose()`.
- The WebSocket server must implement the `WebSocketChatTransport` protocol. The exported `WebSocketChatTransportRequest` and `WebSocketChatTransportResponse` types type server frames; use `safeValidateWebSocketChatTransportRequest` before handling an untrusted client frame.
- `sendAutomaticallyWhen` still starts a new chat turn after the preceding UI message stream finishes; it does not send tool results into an active model generation.
- If the socket closes during a response, the active stream errors and a later send opens a new connection. No automatic replay of requests. `reconnectToStream` requests a complete replay of the retained response from sequence zero; the replay must include all earlier chunks and the original `start` chunk's `messageId`. Duplicate sequence numbers are ignored within each response stream.

### Direct Agent Transport

`DirectChatTransport` invokes an Agent's `stream()` method directly in-process (server-side rendering, testing, single-process apps).

```tsx
import { useChat } from '@ai-sdk/react';
import { DirectChatTransport, ToolLoopAgent } from 'ai';

const agent = new ToolLoopAgent({
  model,
  instructions: 'You are a helpful assistant.',
  tools: {
    weather: weatherTool,
  },
});

const { messages, sendMessage } = useChat({
  transport: new DirectChatTransport({ agent }),
});
```

It validates incoming UI messages, converts them with `convertToModelMessages`, calls the agent's `stream()` method, and returns the result via `toUIMessageStream()`. Options: `options`, `sendReasoning`, `sendSources`.

### Workflow Transport

`WorkflowChatTransport` from `@ai-sdk/workflow/client` provides automatic stream reconnection for chat apps built on the Workflow SDK.

```tsx
import { useChat } from '@ai-sdk/react';
import { WorkflowChatTransport } from '@ai-sdk/workflow/client';
import { useMemo } from 'react';

export default function Chat() {
  const transport = useMemo(
    () =>
      new WorkflowChatTransport({
        api: '/api/chat',
        maxConsecutiveErrors: 5,
        onChatEnd: ({ chatId, chunkIndex }) => {
          console.log(`Chat complete: ${chunkIndex} chunks`);
        },
      }),
    [],
  );

  const { messages, sendMessage } = useChat({ transport });

  // ... render chat UI
}
```

- Detects interrupted streams (no `finish` event) and reconnects via GET to `{api}/{runId}/stream`.
- `initialStartIndex` controls where the initial reconnection begins (page refresh recovery). Negative values can fetch only the tail when the durable server stream already stores `UIMessageChunk` objects; for raw `WorkflowAgent` streams, use a non-negative cursor.
- `maxConsecutiveErrors` controls how many consecutive reconnection failures to tolerate; `onChatSendMessage` and `onChatEnd` are lifecycle callbacks.

### Chat SDK Web Adapter

The Chat SDK (chat-sdk.dev) Web adapter (`@chat-adapter/web`) serves a `useChat` endpoint from a Chat SDK bot. It speaks the UI message stream protocol, so the default transport works without changes. Use it when the same bot also runs on Slack, Microsoft Teams, Discord, or other chat platforms, and you want one set of handlers for all of them.

Install: `ai @ai-sdk/react chat @chat-adapter/web @chat-adapter/state-redis`

On the server, register the Web adapter and handle messages with `onDirectMessage`. Each browser conversation is a direct message thread:

```ts filename="lib/bot.ts"
import { Chat } from 'chat';
import { toAiMessages } from 'chat/ai';
import { createWebAdapter } from '@chat-adapter/web';
import { createRedisState } from '@chat-adapter/state-redis';
import { ToolLoopAgent } from 'ai';
import { getSession } from './session'; // your app's auth

const agent = new ToolLoopAgent({
  model: 'anthropic/claude-sonnet-5.5',
  instructions: 'You are a helpful assistant.',
});

export const bot = new Chat({
  userName: 'mybot',
  adapters: {
    web: createWebAdapter({
      userName: 'mybot',
      // Identify the caller from your app's session. Returning null responds with 401.
      getUser: async () => {
        const session = await getSession();
        return session ? { id: session.userId } : null;
      },
    }),
  },
  state: createRedisState(),
});

bot.onDirectMessage(async thread => {
  const { messages } = await bot.history.thread.list(thread.id, {
    limit: 20,
  });

  const result = await agent.stream({
    messages: await toAiMessages(messages),
    abortSignal: thread.signal,
  });

  await thread.post(result.fullStream);
});
```

```ts filename="app/api/chat/route.ts"
import { after } from 'next/server';
import { bot } from '@/lib/bot';

export async function POST(request: Request): Promise<Response> {
  return bot.webhooks.web(request, {
    waitUntil: task => after(() => task),
  });
}
```

On the client, point the default transport at the route:

```tsx filename="app/page.tsx"
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export default function Chat() {
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  // ... render chat UI
}
```

Things to know:

- **Authentication**: browser requests have no platform signature, so `getUser` is the security boundary. Resolve the user from your app's session and return `null` to reject the request.
- **Conversation history**: the adapter ignores the message history in the request body. It stores each conversation's messages in the state adapter, and `bot.history.thread.list()` reads them back. The chat `id` from `useChat` identifies the conversation.
- **Stopping**: the adapter honors the request's abort signal, so calling `stop()` in `useChat` stops the handler's stream.

For all options, including the `ag-ui` protocol and `useChat` wrappers for React, Vue, and Svelte, see the Web adapter docs at https://chat-sdk.dev/adapters/official/web.

## Notes

- Source: https://ai-sdk.dev/docs/ai-sdk-ui/transport (ai@7.0.173)
- Browser WebSocket APIs cannot set arbitrary handshake headers. The `headers` option is included inside each application-level request frame. Authenticate the handshake with secure cookies, a short-lived query parameter, or a subprotocol, and validate the connection origin and every frame on the server.
- `DirectChatTransport` does not support stream reconnection; `reconnectToStream()` always returns `null`.
- To build a custom transport, see the sources `packages/ai/src/ui/default-chat-transport.ts`, `http-chat-transport.ts`, and the `ChatTransport` interface in `chat-transport.ts` in `vercel/ai`.

## Related

- [useChat](./use-chat.md)
- [DirectChatTransport](./direct-chat-transport.md)
- [WebSocketChatTransport](./websocket-chat-transport.md)
- [WorkflowChatTransport](../workflow-harnesses/workflow-chat-transport.md)
- [Stream Protocols](./stream-protocol.md)
