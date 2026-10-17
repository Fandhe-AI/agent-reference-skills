---
source: https://ai-sdk.dev/docs/getting-started/tanstack-start
---

# Quickstart: TanStack Start

Server route (`/api/chat`) with `streamText` and a `useChat` page in a TanStack Start app, with a weather tool and `stopWhen`.

```bash
pnpm create @tanstack/start@latest my-ai-app
cd my-ai-app
npm i ai @ai-sdk/react zod
```

```tsx
// src/routes/api/chat.ts
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  isStepCount,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages }: { messages: UIMessage[] } = await request.json();

        const result = streamText({
          model: 'anthropic/claude-sonnet-5.5',
          messages: await convertToModelMessages(messages),
          stopWhen: isStepCount(5),
          tools: {
            weather: tool({
              description: 'Get the weather in a location (fahrenheit)',
              inputSchema: z.object({
                location: z
                  .string()
                  .describe('The location to get the weather for'),
              }),
              execute: async ({ location }) => {
                const temperature = Math.round(Math.random() * (90 - 32) + 32);
                return {
                  location,
                  temperature,
                };
              },
            }),
          },
        });

        return createUIMessageStreamResponse({
          stream: toUIMessageStream({ stream: result.stream }),
        });
      },
    },
  },
});
```

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: Chat,
});

function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
              case 'tool-weather':
                return (
                  <pre key={`${message.id}-${i}`}>
                    {JSON.stringify(part, null, 2)}
                  </pre>
                );
            }
          })}
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
```

## Notes

- The official page builds the route in three stages (plain chat, weather tool, `stopWhen: isStepCount(5)` plus a second `convertFahrenheitToCelsius` tool); this file shows the weather + `stopWhen` stage.
- The `server.handlers` route API belongs to TanStack Start; see the tanstack-start skill for routing details. This sample covers only the AI SDK calls.
- `AI_GATEWAY_API_KEY` goes in `.env` for this framework; the string model id uses the default AI Gateway provider.
