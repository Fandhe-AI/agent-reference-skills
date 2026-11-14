---
source: https://ai-sdk.dev/docs/ai-sdk-ui/chatbot
---

# Chatbot with useChat: Status, Stop and Retry

Basic `useChat` chat page and `streamText` route, then `status`-driven Stop and error Retry variants.

```tsx
// app/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Page() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');

  return (
    <>
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, index) =>
            part.type === 'text' ? <span key={index}>{part.text}</span> : null,
          )}
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Say something..."
        />
        <button type="submit" disabled={status !== 'ready'}>
          Submit
        </button>
      </form>
    </>
  );
}
```

```ts
// app/api/chat/route.ts
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from 'ai';
__PROVIDER_IMPORT__;

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: __MODEL__,
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

```tsx
// app/page.tsx (status: spinner and Stop button)
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Page() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');

  return (
    <>
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, index) =>
            part.type === 'text' ? <span key={index}>{part.text}</span> : null,
          )}
        </div>
      ))}

      {(status === 'submitted' || status === 'streaming') && (
        <div>
          {status === 'submitted' && <Spinner />}
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Say something..."
        />
        <button type="submit" disabled={status !== 'ready'}>
          Submit
        </button>
      </form>
    </>
  );
}
```

```tsx
// app/page.tsx (error state with Retry)
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Chat() {
  const { messages, sendMessage, error, regenerate } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          {m.role}:{' '}
          {m.parts.map((part, index) =>
            part.type === 'text' ? <span key={index}>{part.text}</span> : null,
          )}
        </div>
      ))}

      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => regenerate()}>
            Retry
          </button>
        </>
      )}

      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={error != null}
        />
      </form>
    </div>
  );
}
```

## Notes

- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders on the official page; replace them with your provider import and model (a plain model id string also works through AI Gateway).
- `status` is one of `submitted`, `streaming`, `ready`, `error`. `Spinner` is a placeholder component, not part of the SDK. Render messages through `parts`, not `content`.
- Show a generic error message (such as "Something went wrong.") to avoid leaking server information. Other controls on the page: `setMessages` (state/setState pair for deleting messages) and `throttle: 50` to throttle reactive updates in React and Vue.
- Error masking (ai@7.0.173): the default masked message ("An error occurred.") applies to stream errors; failed tool calls now send the model's error text to the client (see `chatbot-tool-usage.md`, Tool errors). A custom `onError` that returns `error.message` in the official page now returns `error.toString()`.

### Queueing messages (experimental)

- Source: https://ai-sdk.dev/docs/ai-sdk-ui/chatbot (ai@7.0.173). Message queueing is experimental.
- By default the input is disabled while a response is in progress. With `experimental_queue`, messages sent meanwhile wait in `experimental_queuedMessages` and are sent one at a time after each response finishes, in order.
- The queue also waits while the assistant waits for the user (tool approval or client-side tool result); automatic follow-ups from `sendAutomaticallyWhen` go first, and an answered approval reaches the model before the next queued message.
- Stopping, an error or an interrupted response pauses the queue; it resumes on the next sent message or `experimental_sendQueuedMessageNow`. Editing a message or regenerating clears the queue. To edit a queued message, remove it and send new text. The queue lives in memory and is lost on reload. `sendMessage` resolves once the message is queued. To add to the response in progress, use steering on the server (`references/agents/loop-control.md`).

```tsx
const {
  messages,
  experimental_queuedMessages,
  sendMessage,
  experimental_removeQueuedMessage,
  experimental_sendQueuedMessageNow,
} = useChat({
  experimental_queue: true,
});

return (
  <>
    {/* messages */}

    {experimental_queuedMessages.map(message => (
      <div key={message.id}>
        {message.parts.map(part => (part.type === 'text' ? part.text : ''))}
        <button onClick={() => experimental_sendQueuedMessageNow(message.id)}>
          Send now
        </button>
        <button onClick={() => experimental_removeQueuedMessage(message.id)}>
          Remove
        </button>
      </div>
    ))}

    <form
      onSubmit={e => {
        e.preventDefault();
        sendMessage({ text: input });
        setInput('');
      }}
    >
      {/* the input stays enabled while a response is in progress */}
      <input value={input} onChange={e => setInput(e.target.value)} />
    </form>
  </>
);
```
