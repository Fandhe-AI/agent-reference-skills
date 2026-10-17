---
source: https://ai-sdk.dev/docs/ai-sdk-ui/streaming-data
---

# Streaming Custom Data Parts

Send typed data parts, sources and transient notifications alongside model output with `createUIMessageStream` and read them with `onData`.

```tsx
// ai/types.ts
import { UIMessage } from 'ai';

// Define your custom message type with data part schemas
export type MyUIMessage = UIMessage<
  never, // metadata type
  {
    weather: {
      city: string;
      weather?: string;
      status: 'loading' | 'success';
    };
    notification: {
      message: string;
      level: 'info' | 'warning' | 'error';
    };
  } // data parts type
>;
```

```tsx
// route.ts
import { openai } from '@ai-sdk/openai';
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
__PROVIDER_IMPORT__;
import type { MyUIMessage } from '@/ai/types';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = createUIMessageStream<MyUIMessage>({
    execute: async ({ writer }) => {
      // 1. Start the assistant message before writing any message parts.
      writer.write({ type: 'start' });

      // 2. Send initial status (transient - won't be added to message history)
      writer.write({
        type: 'data-notification',
        data: { message: 'Processing your request...', level: 'info' },
        transient: true, // This part won't be added to message history
      });

      // 3. Send sources (useful for RAG use cases)
      writer.write({
        type: 'source-url',
        sourceId: 'source-1',
        url: 'https://weather.com',
        title: 'Weather Data Source',
      });

      // 4. Send data parts with loading state
      writer.write({
        type: 'data-weather',
        id: 'weather-1',
        data: { city: 'San Francisco', status: 'loading' },
      });

      const result = streamText({
        model: __MODEL__,
        messages: await convertToModelMessages(messages),
        onEnd() {
          // 5. Update the same data part (reconciliation)
          writer.write({
            type: 'data-weather',
            id: 'weather-1', // Same ID = update existing part
            data: {
              city: 'San Francisco',
              weather: 'sunny',
              status: 'success',
            },
          });

          // 6. Send completion notification (transient)
          writer.write({
            type: 'data-notification',
            data: { message: 'Request completed', level: 'info' },
            transient: true, // Won't be added to message history
          });
        },
      });

      writer.merge(
        toUIMessageStream({ stream: result.stream, sendStart: false }),
      );
    },
  });

  return createUIMessageStreamResponse({ stream });
}
```

```tsx
// page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import type { MyUIMessage } from '@/ai/types';

export default function Chat() {
  const [input, setInput] = useState('');

  const { messages, sendMessage } = useChat<MyUIMessage>({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    onData: dataPart => {
      // Handle transient notifications
      if (dataPart.type === 'data-notification') {
        console.log('Notification:', dataPart.data.message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <>
      {messages?.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}

          {/* Render weather data */}
          {message.parts
            .filter(part => part.type === 'data-weather')
            .map((part, index) => (
              <span key={index} className="weather-update">
                {part.data.status === 'loading' ? (
                  <>Getting weather for {part.data.city}...</>
                ) : (
                  <>
                    Weather in {part.data.city}: {part.data.weather}
                  </>
                )}
              </span>
            ))}

          {/* Render text content */}
          {message.parts
            .filter(part => part.type === 'text')
            .map((part, index) => (
              <div key={index}>{part.text}</div>
            ))}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about the weather..."
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
```

## Notes

- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders on the official page; replace them with your provider import and model.
- Data parts are persistent (in `message.parts`) and reconcile when written again with the same `id`; `transient: true` parts are only visible through the `onData` callback. Sources (`type: 'source-url'` / `'source-document'`) are useful for RAG.
- Modified from the official page: (1) `execute` is declared `async` (the official snippet uses `await` in a non-async `execute`); (2) the source chunk uses the current `{ type: 'source-url', sourceId, url, title }` shape (see `references/ui/stream-protocol.md`) instead of the older `{ type: 'source', value: {...} }`; (3) `api` is passed via `transport: new DefaultChatTransport({ api })` because `useChat` has no direct `api` option (`references/ui/use-chat.md`).
- Use message metadata (`messageMetadata` callback in `toUIMessageStream`) for message-level info such as model and token usage; use data parts for dynamic content. Custom backends can emit the same stream via the UI Message Stream Protocol (`references/ui/stream-protocol.md`); SSE response handling in hono / fastify / nextjs-app is covered by those skills.
