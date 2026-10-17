---
source: https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-message-persistence
---

# Chatbot Message Persistence

Store and load chat messages: a file-based chat store, `onEnd` saving, `validateUIMessages` on load, sending only the last message, and `consumeStream` for client disconnects.

```tsx
// app/chat/page.tsx
import { redirect } from 'next/navigation';
import { createChat } from '@util/chat-store';

export default async function Page() {
  const id = await createChat(); // create a new chat
  redirect(`/chat/${id}`); // redirect to chat page, see below
}
```

```tsx
// util/chat-store.ts
import { generateId } from 'ai';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';

// Treat chat IDs as opaque tokens before using them in file paths.
const chatIdRegex = /^[A-Za-z0-9_-]+$/;

export async function createChat(): Promise<string> {
  const id = generateId(); // generate a unique chat ID
  await writeFile(getChatFile(id), '[]'); // create an empty chat file
  return id;
}

function getChatFile(id: string): string {
  if (!chatIdRegex.test(id)) {
    throw new Error('Invalid chat ID');
  }

  const chatDir = path.resolve(process.cwd(), '.chats');
  const chatFile = path.resolve(chatDir, `${id}.json`);

  // Defense in depth: keep the resolved file inside the chat directory.
  if (!chatFile.startsWith(`${chatDir}${path.sep}`)) {
    throw new Error('Invalid chat ID');
  }

  if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
  return chatFile;
}
```

```tsx
// util/chat-store.ts (loading)
import { UIMessage } from 'ai';
import { readFile } from 'fs/promises';

export async function loadChat(id: string): Promise<UIMessage[]> {
  return JSON.parse(await readFile(getChatFile(id), 'utf8'));
}

// ... rest of the file
```

```tsx
// util/chat-store.ts (saving)
import { UIMessage } from 'ai';
import { writeFile } from 'fs/promises';

export async function saveChat({
  chatId,
  messages,
}: {
  chatId: string;
  messages: UIMessage[];
}): Promise<void> {
  const content = JSON.stringify(messages, null, 2);
  await writeFile(getChatFile(chatId), content);
}

// ... rest of the file
```

```tsx
// app/chat/[id]/page.tsx
import { loadChat } from '@util/chat-store';
import Chat from '@ui/chat';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const messages = await loadChat(id);
  return <Chat id={id} initialMessages={messages} />;
}
```

```tsx
// ui/chat.tsx
'use client';

import { UIMessage, useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Chat({
  id,
  initialMessages,
}: { id?: string | undefined; initialMessages?: UIMessage[] } = {}) {
  const [input, setInput] = useState('');
  const { sendMessage, messages } = useChat({
    id, // use the provided chat ID
    messages: initialMessages, // load initial messages
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  // simplified rendering code, extend as needed:
  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.parts
            .map(part => (part.type === 'text' ? part.text : ''))
            .join('')}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

```tsx
// app/api/chat/route.ts (store messages in onEnd)
import { openai } from '@ai-sdk/openai';
import { saveChat } from '@util/chat-store';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from 'ai';

export async function POST(req: Request) {
  // DefaultChatTransport sends the chat ID as `id`
  const { messages, id }: { messages: UIMessage[]; id: string } =
    await req.json();

  const result = streamText({
    model: 'openai/gpt-6-luna',
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages,
      onEnd: async ({ messages }) => {
        await saveChat({ chatId: id, messages });
      },
    }),
  });
}
```

```tsx
// ui/chat.tsx (send only the last message)
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

const {
  // ...
} = useChat({
  // ...
  transport: new DefaultChatTransport({
    api: '/api/chat',
    // only send the last message to the server:
    prepareSendMessagesRequest({ messages, id }) {
      return { body: { message: messages[messages.length - 1], id } };
    },
  }),
});
```

```tsx
// app/api/chat/route.ts (load previous messages and validate)
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
  UIMessage,
  validateUIMessages,
} from 'ai';
// import your tools and schemas

export async function POST(req: Request) {
  // get the last message from the client:
  const { message, id } = await req.json();

  // load the previous messages from the server:
  const previousMessages = await loadChat(id);

  // validate messages if they contain tools, metadata, or data parts:
  const validatedMessages = await validateUIMessages({
    // append the new message to the previous messages:
    messages: [...previousMessages, message],
    tools, // if using tools
    metadataSchema, // if using custom metadata
    dataSchemas, // if using custom data parts
  });

  const result = streamText({
    // ...
    messages: await convertToModelMessages(validatedMessages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: validatedMessages,
      onEnd: async ({ messages }) => {
        await saveChat({ chatId: id, messages });
      },
    }),
  });
}
```

```tsx
// app/api/chat/route.ts (consume the stream so saving survives a client disconnect)
import {
  consumeStream,
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from 'ai';
import { saveChat } from '@util/chat-store';

export async function POST(req: Request) {
  const { messages, id }: { messages: UIMessage[]; id: string } =
    await req.json();

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages,
      onEnd: async ({ messages }) => {
        await saveChat({ chatId: id, messages });
      },
    }),
    // consume the UI message stream to completion so onEnd (saving) runs
    // even when the client response is aborted:
    consumeSseStream: consumeStream,
  });
}
```

## Notes

- The official guide does not cover authorization or error handling; the file store is illustrative (use a database in production). Validate chat IDs as opaque tokens before using them in file paths. `@util/chat-store` is a path alias from the page.
- Modified from the official example: the page's routes read `chatId` from the request body, but the default `DefaultChatTransport` sends the chat ID as `id` (as the `prepareSendMessagesRequest` example on the same page also uses). This version reads `id` and calls `saveChat({ chatId: id, messages })`.
- Modified from the official example: the page uses `result.consumeStream()`, but `onEnd` runs on the UI message stream, so this version passes `consumeSseStream: consumeStream` to `createUIMessageStreamResponse`, following `references/operations/troubleshooting.md` (stream-abort-handling) and `references/operations/stopping-streams.md`.
- The official examples do not await `saveChat` in `onEnd`; it is awaited here so completion is awaited and failures are not swallowed.
- Store messages in the `UIMessage` (`useChat`) format, not `ModelMessage`; saving happens in the `onEnd` callback of `toUIMessageStream`. On load, validate with `validateUIMessages` and handle `TypeValidationError` for stale schemas.
- Server-side assistant message IDs: `generateMessageId: createIdGenerator({ prefix: 'msg', size: 16 })` in `toUIMessageStream`, or write a `start` part with `messageId` via `createUIMessageStream`.
- Streaming tool input persists `rawInput` while in `input-streaming`; legacy `rawInput` on `output-error` tool parts is deprecated (store arguments in `input`). Resumable streams are in `chatbot-resume-streams.md`.
