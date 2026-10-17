---
source: https://ai-sdk.dev/docs/ai-sdk-rsc/migrating-to-ui
---

# Migrating from RSC to UI

Guide for migrating from AI SDK RSC to AI SDK UI: separate generation (`streamText` in a route handler) from rendering (`useChat` on the client).

## Signature / Usage

Before (RSC): `streamUI` inside a server action.

```tsx
import { openai } from '@ai-sdk/openai';
import { getMutableAIState, streamUI } from '@ai-sdk/rsc';

export async function sendMessage(message: string) {
  'use server';

  const messages = getMutableAIState('messages');

  messages.update([...messages.get(), { role: 'user', content: message }]);

  const { value: stream } = await streamUI({
    model: openai('gpt-6-astra'),
    instructions: 'you are a friendly assistant!',
    messages: messages.get(),
    text: async function* ({ content, done }) {
      // process text
    },
    tools: {
      // tool definitions
    },
  });

  return stream;
}
```

After (UI): `streamText` in a route handler plus `useChat` on the client.

```ts
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: __MODEL__,
    instructions: 'you are a friendly assistant!',
    messages: await convertToModelMessages(messages),
    tools: {
      // tool definitions
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

```tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <div>{message.role}</div>
          {message.parts.map((part, index) =>
            part.type === 'text' ? <div key={index}>{part.text}</div> : null,
          )}
        </div>
      ))}

      <form
        onSubmit={event => {
          event.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          type="text"
          value={input}
          onChange={event => {
            setInput(event.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

### Migration map

| RSC | UI replacement |
| --- | --- |
| `streamUI` in a server action | `streamText` in a route handler + `useChat` |
| Parallel tool calls (needs `streamText` + `createStreamableUI` + `createStreamableValue` in RSC) | Built into `useChat` |
| Multi-step tool calls (same workaround in RSC) | Built into `useChat`; set `stopWhen` in `streamText` |
| Tool `generate` yielding React nodes | Tool `execute` returns props; client renders components from tool invocations |
| `useActions` + `useUIState` to send follow-up messages | A shared `Chat` instance passed via the `chat` option (sharing by the same `id` was removed in AI SDK 5) |
| `initial` parameter of `streamUI` (loading UI) | Tool invocation `state` to show a loading indicator |
| `createAI` `onSetAIState` (save chat) | `onEnd` callback of `streamText` |
| `createAI` `onGetUIState` (restore chat) | Load messages server-side and pass them as the `messages` option of `useChat` (renamed from `initialMessages` in AI SDK 5) |
| `createStreamableValue` + `readStreamableValue` for object streaming | `useObject` + `streamText` with `Output`, `createTextStreamResponse` / `toTextStream` |

Saving chats (After):

```ts
const result = streamText({
  model: __MODEL__,
  instructions: 'you are a friendly assistant!',
  messages: coreMessages,
  onEnd: async ({ responseMessages }) => {
    try {
      await saveChat({
        id,
        messages: [...coreMessages, ...responseMessages],
      });
    } catch (error) {
      console.error('Failed to save chat');
    }
  },
});
```

Object streaming (After, route handler and client):

```ts
const result = streamText({
  model: __MODEL__,
  output: Output.object({ schema: notificationSchema }),
  prompt:
    `Generate 3 notifications for a messages app in this context:` + context,
});

return createTextStreamResponse({
  stream: toTextStream({ stream: result.stream }),
});
```

```tsx
const { object, submit } = useObject({
  api: '/api/object',
  schema: notificationSchema,
});
```

## Notes

- Limitations of AI SDK RSC listed in the guide: a stream cannot be aborted using server actions; components remount on `.done()` with `createStreamableUI` and `streamUI` (flicker); many suspense boundaries can lead to crashes; `createStreamableUI` can lead to quadratic data transfer (use `createStreamableValue` and render client-side instead); closed RSC streams cause update issues.
- Because of these limitations AI SDK RSC is marked experimental and not recommended for stable production environments.
- The guide's examples were written against the pre-v5 `useChat` API (`input`, `handleSubmit`, `message.content`, `initialMessages`, sharing by `id`, `message.toolInvocations`); the After snippets and migration map on this page are adapted to the current contract (`convertToModelMessages`, `sendMessage`, `message.parts`, shared `Chat` instance, `messages` option) per the AI SDK 5 migration guide. Check the AI SDK UI pages in this skill for the current `useChat` API.
- Distinction: this page is the AI SDK RSC to AI SDK UI move only. The nextjs-app skill covers Next.js route handlers and Server Actions.

## Related

- [AI SDK RSC Overview](./overview.md)
- [streamUI](./stream-ui.md)
- [createAI](./create-ai.md)
- [createStreamableValue](./create-streamable-value.md)
