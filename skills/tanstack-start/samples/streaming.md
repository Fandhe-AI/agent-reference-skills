---
source: https://tanstack.com/start/latest/docs/framework/react/guide/streaming-data-from-server-functions
---

# Streaming Data from a Server Function

Stream typed chunks from a server function to the client using an async generator, consumed with `for await...of`.

```ts
// src/server/chat.ts
import { createServerFn } from '@tanstack/react-start'

type Message = { content: string }

export const streamMessagesFn = createServerFn().handler(async function* () {
  const messages: Message[] = generateMessages()
  for (const msg of messages) {
    await sleep(500)
    yield msg
  }
})
```

```tsx
// src/routes/chat.tsx
import { useCallback, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { streamMessagesFn } from '../server/chat'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})

function ChatPage() {
  const [messages, setMessages] = useState('')

  const start = useCallback(async () => {
    for await (const msg of await streamMessagesFn()) {
      setMessages((prev) => prev + msg.content)
    }
  }, [])

  return <button onClick={start}>Start streaming</button>
}
```

## Notes

- A handler defined as `async function*` streams typed chunks; the client consumes it with `for await...of`, preserving the chunk type (`Message`).
- Alternatively, return a typed `ReadableStream<T>` from `.handler()` and consume it with `response.getReader()` on the client — chunk typing is preserved either way.
- Streaming server functions are still called like normal server functions (`await streamMessagesFn()`); the difference is in what the returned value is iterated/read with.
