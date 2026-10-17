---
source: https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams
---

# Chatbot Resume Streams

Resume an in-flight chat stream after a page reload using `useChat({ resume })`, `consumeSseStream`, and the `resumable-stream` package.

```tsx
// app/chat/[chatId]/chat.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';

export function Chat({
  chatData,
  resume = false,
}: {
  chatData: { id: string; messages: UIMessage[] };
  resume?: boolean;
}) {
  const { messages, sendMessage, status } = useChat({
    id: chatData.id,
    messages: chatData.messages,
    resume, // Enable automatic stream resumption
    transport: new DefaultChatTransport({
      // You must send the id of the chat
      prepareSendMessagesRequest: ({ id, messages }) => {
        return {
          body: {
            id,
            message: messages[messages.length - 1],
          },
        };
      },
    }),
  });

  return <div>{/* Your chat UI */}</div>;
}
```

```ts
// app/api/chat/route.ts
import { readChat, saveChat } from '@util/chat-store';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  generateId,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai';
import { after } from 'next/server';
import { createResumableStreamContext } from 'resumable-stream';

export async function POST(req: Request) {
  const {
    message,
    id,
  }: {
    message: UIMessage | undefined;
    id: string;
  } = await req.json();

  const chat = await readChat(id);
  let messages = chat.messages;

  messages = [...messages, message!];

  // Clear any previous active stream and save the user message
  await saveChat({ id, messages, activeStreamId: null });

  const result = streamText({
    model: 'openai/gpt-6-luna',
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages,
      generateMessageId: generateId,
      onEnd: async ({ messages }) => {
        // Clear the active stream when finished
        await saveChat({ id, messages, activeStreamId: null });
      },
    }),
    async consumeSseStream({ stream }) {
      const streamId = generateId();

      // Create a resumable stream from the SSE stream
      const streamContext = createResumableStreamContext({ waitUntil: after });
      await streamContext.createNewResumableStream(streamId, () => stream);

      // Update the chat with the active stream ID
      await saveChat({ id, activeStreamId: streamId });
    },
  });
}
```

```ts
// app/api/chat/[id]/stream/route.ts
import { readChat } from '@util/chat-store';
import { UI_MESSAGE_STREAM_HEADERS } from 'ai';
import { after } from 'next/server';
import { createResumableStreamContext } from 'resumable-stream';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const chat = await readChat(id);

  if (chat.activeStreamId == null) {
    // no content response when there is no active stream
    return new Response(null, { status: 204 });
  }

  const streamContext = createResumableStreamContext({
    waitUntil: after,
  });

  return new Response(
    await streamContext.resumeExistingStream(chat.activeStreamId),
    { headers: UI_MESSAGE_STREAM_HEADERS },
  );
}
```

## Notes

- You build the storage: a Redis instance for the stream, `resumable-stream`, and a persistence layer that records `activeStreamId` per chat. The SDK supplies the `resume` option, the `consumeSseStream` callback, and the automatic GET request to `/api/chat/[id]/stream` (customizable via `prepareReconnectToStreamRequest`). The `readChat` / `saveChat` store is not defined on the page.
- The official example does not await `saveChat`; it is awaited here so completion is awaited and failures are not swallowed.
- Official warning: in a resumable setup, client-side aborts (closing the tab, refresh, `stop()`) are treated as disconnects and do not cancel generation. Add a dedicated stop endpoint (persist the partial assistant message, cancel the work, clear `activeStreamId` only if it still matches).
- `DefaultChatTransport` treats resumed streams as full replays; set `resumeStreamIsReplay: false` if your endpoint sends only remaining chunks. Clear `activeStreamId` when starting a new stream to avoid resuming outdated streams, and authenticate both create and resume endpoints.
