---
source: https://ui.shadcn.com/docs/ai-elements/base/chat
---

# Chat UI with a Scripted AI SDK Conversation

Render a chat thread with Message Scroller and drive it through `useChat` with a scripted, model-free conversation from `@shadcn/helpers/ai-sdk`.

```bash
npx shadcn@latest add message-scroller message bubble input-group
npm install @shadcn/helpers
```

```tsx
// Chat thread structure
<MessageScrollerProvider autoScroll>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        <MessageScrollerItem messageId={id} scrollAnchor>
          <Message align="end">
            <MessageContent>
              <Bubble align="end" variant="muted">
                <BubbleContent>{text}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageScrollerItem>
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>
```

```ts
// Scripted conversation
const chat = createChat()
  .user("Add a dark mode toggle to the settings page.")
  .assistant(({ writer }) => {
    writer.reasoning("I need to know how themes are set up first.")
    writer
      .tool("runCommand", { input: { command: "rg -l ThemeProvider app" } })
      .output({ stdout: "app/layout.tsx" })
    writer.text("next-themes is already set up, so I added a ModeToggle.")
  })

const transport = chat.transport({
  fallback:
    "This demo only knows the scripted turns. Press reset to start over.",
})

const nextMessage = chat.next(messages)
```

```tsx
// Wiring to useChat (from the AI SDK helper docs)
"use client"

import { useChat } from "@ai-sdk/react"
import { createChat } from "@shadcn/helpers/ai-sdk"

const chat = createChat()
  .user("What changed in this release?")
  .assistant("The release adds keyboard shortcuts and faster search.")
  .user("Can you show me the shortcuts?")
  .assistant("Press ⌘K to search and ⌘Enter to submit.")

const initialMessages = chat.get(0)
const transport = chat.transport()

export function Chat() {
  const { messages, sendMessage, status } = useChat({
    messages: initialMessages,
    transport,
  })
  const nextMessage = chat.next(messages)
  const isBusy = status === "submitted" || status === "streaming"

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>{/* Render the message */}</div>
      ))}
      <button
        disabled={!nextMessage || isBusy}
        onClick={() => {
          if (nextMessage && !isBusy) {
            void sendMessage(nextMessage)
          }
        }}
      >
        Send
      </button>
    </div>
  )
}
```

## Notes

- `scrollAnchor` goes on the person's turn; `autoScroll` follows the reply while the reader stays at the live edge. See https://ui.shadcn.com/docs/helpers/ai-sdk for the `@shadcn/helpers/ai-sdk` API (second source of this sample).
- `createChat()` needs no model, API route or API key; `chat.next(messages)` returns the next scripted user message or `null`.
- These are UI patterns rendering AI SDK message parts, not an agent runtime; agent runtimes are in skills openai-agents and anthropic-agent-sdk. Same-named components differ: `components-chat` Message vs AI Elements Message, and `@shadcn/react` unstyled packages.
