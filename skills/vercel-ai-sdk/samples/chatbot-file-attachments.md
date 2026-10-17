---
source: https://ai-sdk.dev/docs/ai-sdk-ui/chatbot
---

# Chatbot File Attachments

Send images or other files with a `useChat` message, from a file input (`FileList`) or as `FileUIPart` objects.

```tsx
// app/page.tsx (FileList)
'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useState } from 'react';

export default function Page() {
  const { messages, sendMessage, status } = useChat();

  const [input, setInput] = useState('');
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div>
        {messages.map(message => (
          <div key={message.id}>
            <div>{`${message.role}: `}</div>

            <div>
              {message.parts.map((part, index) => {
                if (part.type === 'text') {
                  return <span key={index}>{part.text}</span>;
                }

                if (
                  part.type === 'file' &&
                  part.mediaType?.startsWith('image/')
                ) {
                  return <img key={index} src={part.url} alt={part.filename} />;
                }

                return null;
              })}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={event => {
          event.preventDefault();
          if (input.trim()) {
            sendMessage({
              text: input,
              files,
            });
            setInput('');
            setFiles(undefined);

            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }
        }}
      >
        <input
          type="file"
          onChange={event => {
            if (event.target.files) {
              setFiles(event.target.files);
            }
          }}
          multiple
          ref={fileInputRef}
        />
        <input
          value={input}
          placeholder="Send message..."
          onChange={e => setInput(e.target.value)}
          disabled={status !== 'ready'}
        />
      </form>
    </div>
  );
}
```

```tsx
// app/page.tsx (file objects)
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { FileUIPart } from 'ai';

export default function Page() {
  const { messages, sendMessage, status } = useChat();

  const [input, setInput] = useState('');
  const [files] = useState<FileUIPart[]>([
    {
      type: 'file',
      filename: 'earth.png',
      mediaType: 'image/png',
      url: 'https://example.com/earth.png',
    },
    {
      type: 'file',
      filename: 'moon.png',
      mediaType: 'image/png',
      url: 'data:image/png;base64,iVBORw0KGgo...',
    },
  ]);

  return (
    <div>
      <div>
        {messages.map(message => (
          <div key={message.id}>
            <div>{`${message.role}: `}</div>

            <div>
              {message.parts.map((part, index) => {
                if (part.type === 'text') {
                  return <span key={index}>{part.text}</span>;
                }

                if (
                  part.type === 'file' &&
                  part.mediaType?.startsWith('image/')
                ) {
                  return <img key={index} src={part.url} alt={part.filename} />;
                }

                return null;
              })}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={event => {
          event.preventDefault();
          if (input.trim()) {
            sendMessage({
              text: input,
              files,
            });
            setInput('');
          }
        }}
      >
        <input
          value={input}
          placeholder="Send message..."
          onChange={e => setInput(e.target.value)}
          disabled={status !== 'ready'}
        />
      </form>
    </div>
  );
}
```

## Notes

- With `FileList`, `useChat` converts files to data URLs automatically; only `image/*` and `text/*` content types are converted into multi-modal content parts automatically, other types must be handled manually.
- `url` may be a remote URL or a data URL (the base64 value in the second block is truncated on the official page).
- Files generated as part of model reasoning arrive as `reasoning-file` parts (`ReasoningFileUIPart`) with the same `mediaType` and `url`.
