---
source: https://ai-sdk.dev/cookbook/next/use-shared-chat-context
---

# Share useChat State Across Components

Share one `Chat` instance through React context so messages, input and a "clear chat" reset live in different components.

```tsx
// app/chat-context.tsx
'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Chat } from '@ai-sdk/react';
import { DefaultChatTransport, UIMessage } from 'ai';

interface ChatContextValue {
  // replace with your custom message type
  chat: Chat<UIMessage>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

function createChat() {
  return new Chat<UIMessage>({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chat, setChat] = useState(() => createChat());

  const clearChat = () => {
    setChat(createChat());
  };

  return (
    <ChatContext.Provider
      value={{
        chat,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useSharedChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useSharedChatContext must be used within a ChatProvider');
  }
  return context;
}
```

```tsx
// app/layout.tsx
import { ChatProvider } from './chat-context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ChatProvider>{children}</ChatProvider>;
}
```

```tsx
// app/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useSharedChatContext } from './chat-context';
import ChatInput from './chat-input';

export default function Chat() {
  const { chat, clearChat } = useSharedChatContext();
  const { messages } = useChat({
    chat,
  });

  return (
    <div>
      <button onClick={clearChat} disabled={messages.length === 0}>
        Clear Chat
      </button>

      {messages?.map(message => (
        <div key={message.id}>
          <strong>{`${message.role}: `}</strong>
          {message.parts.map((part, index) => {
            if (part.type === 'text') {
              return <div key={index}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      <ChatInput />
    </div>
  );
}
```

```tsx
// app/chat-input.tsx
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { useSharedChatContext } from './chat-context';

export default function ChatInput() {
  const { chat } = useSharedChatContext();
  const [text, setText] = useState('');
  const { status, stop, sendMessage } = useChat({ chat });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (text.trim() === '') return;
        sendMessage({ text });
        setText('');
      }}
    >
      <input
        placeholder="Say something..."
        disabled={status !== 'ready'}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      {stop && (status === 'streaming' || status === 'submitted') && (
        <button type="button" onClick={stop}>
          Stop
        </button>
      )}
    </form>
  );
}
```

## Notes

- Pass the shared `Chat` instance to `useChat({ chat })` in every component; resetting is done by replacing the instance (`setChat(createChat())`). Replace `UIMessage` with your custom message type.
- The Stop button uses `type="button"` (the official cookbook uses `type="submit"`, which would also trigger the form `onSubmit` and send any draft text).
- The server route is the standard `streamText` + `createUIMessageStreamResponse` handler shown in `quickstart-nextjs-app-router.md`.
- Send-only-the-last-message customization (`prepareSendMessagesRequest` on `DefaultChatTransport`) is covered in `chatbot-message-persistence.md`; the standalone cookbook recipe is merged there.
