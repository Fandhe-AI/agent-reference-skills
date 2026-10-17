---
source: https://ai-sdk.dev/docs/getting-started/nextjs-pages-router
---

# Quickstart: Next.js Pages Router

Chat page for the Pages Router (`pages/index.tsx`) backed by an App Router route handler at `/api/chat`.

```bash
pnpm create next-app@latest my-ai-app
cd my-ai-app
npm i ai @ai-sdk/react zod
```

```tsx
// app/api/chat/route.ts
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-5.5',
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

```tsx
// pages/index.tsx
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
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

- On Next.js 13+ the official page recommends Route Handlers (App Router) alongside the Pages Router for Web API signatures and better streaming support; answer "no" to the App Router prompt of `create-next-app`.
- Tools and `stopWhen: isStepCount(5)` are added to the route handler exactly as in the App Router quickstart (`quickstart-nextjs-app-router.md`); only the page file path differs.
- Server framework behavior itself belongs to the nextjs-app skill; this sample covers only the AI SDK calls.
