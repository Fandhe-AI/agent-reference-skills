---
source: https://ui.shadcn.com/docs/helpers/tanstack-ai
---

# TanStack AI (@shadcn/helpers)

`@shadcn/helpers/tanstack-ai` lets you write an AI conversation in code and stream it through TanStack AI's `useChat`, with no model, API route, network request, or API key. It creates native TanStack `UIMessage[]` values and replays each assistant response through a local connection adapter as real AG-UI events: text and reasoning stream word by word, and tool calls move from input to result.

## Signature / Usage

```bash
npm install @shadcn/helpers
```

```ts
import { createChat } from "@shadcn/helpers/tanstack-ai"

const chat = createChat()
  .user("What changed in this release?")
  .assistant("The release adds keyboard shortcuts and faster search.")
  .user("Can you show me the shortcuts?")
  .assistant("Press ⌘K to search and ⌘Enter to submit.")
```

Pass initial messages and the local connection to `useChat`, then replay each predefined user message with `append()`:

```tsx
"use client"

import { createChat } from "@shadcn/helpers/tanstack-ai"
import { useChat } from "@tanstack/ai-react"

const chat = createChat()
  .user("What changed in this release?")
  .assistant("The release adds keyboard shortcuts and faster search.")

const initialMessages = chat.get(0)
const connection = chat.transport()

export function Chat() {
  const { messages, append, status } = useChat({
    initialMessages,
    connection,
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
            void append(nextMessage)
          }
        }}
      >
        Send
      </button>
    </div>
  )
}
```

`get(0)` starts with no messages. `append(nextMessage)` adds the next predefined user message; the connection then streams its assistant response as AG-UI events.

Assistant messages: a string creates one text part; an array of TanStack message parts is also accepted; use the writer callback to stream in smaller steps.

```ts
chat.assistant([
  { type: "thinking", content: "I should summarize the release." },
  { type: "text", content: "The release adds keyboard shortcuts." },
])

chat.assistant(({ writer }) => {
  writer.reasoning("I should summarize the release.")
  writer.text("The release adds keyboard shortcuts and faster search.")
})
```

Tool calls (finish with `output()` or `error()`); the completed message contains a `tool-call` part and a sibling `tool-result` part:

```ts
chat.assistant(({ writer }) => {
  writer
    .tool("getWeather", {
      input: { city: "San Francisco" },
    })
    .sleep(900)
    .output({
      city: "San Francisco",
      temperature: 18,
      condition: "Breezy",
    })

  writer.text("It is 18°C and breezy in San Francisco.")
})
```

Typing with the app's client-tool tuple:

```ts
import { clientTools } from "@tanstack/ai-client"

import { getWeatherTool } from "@/lib/tools"

const tools = clientTools(getWeatherTool.client())
const chat = createChat<typeof tools>()
```

User files are converted to TanStack media parts by media type:

```ts
chat.user("Describe this image.", {
  files: [
    {
      mediaType: "image/png",
      url: "https://example.com/screenshot.png",
    },
  ],
})
```

| Media type | TanStack part |
| --- | --- |
| `image/*` | `image` |
| `audio/*` | `audio` |
| `video/*` | `video` |
| Other | `document` |

Reading, seeding, timing, errors, metadata:

```ts
chat.get() // Every message.
chat.get(2) // The first two messages.
chat.get(0) // An empty initial conversation.

const nextMessage = chat.next(chat.get(2))

const seeded = createChat({ messages: savedMessages })

createChat().user("Load the report.").error("The report could not be loaded.")

createChat().user("Hello", {
  metadata: { createdAt: "2026-01-01T10:00:00.000Z" },
})
```

Transport (replay with `append`, or ordinary input with `sendMessage`):

```ts
const connection = chat.transport({
  delayMs: 25,
  fallback: ({ writer, messages }) => {
    writer.text(`This example already has ${messages.length} messages.`, {
      mode: "instant",
    })
  },
})

const { messages, append, sendMessage } = useChat({
  initialMessages: chat.get(0),
  connection,
})

void sendMessage("Tell me more.")
```

AG-UI event sequence for a response:

```txt
RUN_STARTED
REASONING_MESSAGE_START → REASONING_MESSAGE_CONTENT → REASONING_MESSAGE_END
TOOL_CALL_START → TOOL_CALL_ARGS → TOOL_CALL_END → TOOL_CALL_RESULT
TEXT_MESSAGE_START → TEXT_MESSAGE_CONTENT → TEXT_MESSAGE_END
RUN_FINISHED
```

Predefined errors emit `RUN_ERROR`. TanStack supplies the `threadId` and `runId` used by each run.

## Options / Props

### createChat()

```ts
function createChat<
  TOOLS extends ReadonlyArray<AnyClientTool> = AnyClientTool[],
  DATA = unknown,
>(options?: CreateChatOptions<TOOLS, DATA>): TanStackChat<TOOLS, DATA>
```

| Type parameter | Description |
| --- | --- |
| `TOOLS` | The client-tool tuple used to type tool names, inputs, and outputs. |
| `DATA` | The payload type of `structured-output` parts in existing TanStack messages. The writer does not create such parts; `DATA` preserves their type when a chat starts from existing messages. |

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `messages` | `UIMessage<TOOLS, DATA>[]` | `[]` | Start from an existing transcript. Messages are cloned. |
| `messageIdPrefix` | `string` | `"msg"` | Prefix for generated message IDs. |
| `toolCallIdPrefix` | `string` | `"call"` | Prefix for generated tool call IDs. |
| `now` | `Date \| string` | `"2026-01-01T00:00:00.000Z"` | Fixed time used for generated `createdAt` values. |

### TanStackChat

Every method that adds content returns the same chat (chainable).

| Method | Returns | Description |
| --- | --- | --- |
| `user(text?, options?)` | `TanStackChat` | Add a user message with text and optional files. |
| `assistant(input?, options?)` | `TanStackChat` | Add an assistant message from text, parts, or a writer callback. |
| `sleep(delayMs)` | `TanStackChat` | Wait before the next assistant response starts. |
| `error(errorText?)` | `TanStackChat` | Add an assistant response that emits `RUN_ERROR`. |
| `get(count?)` | `UIMessage[]` | Return cloned messages from the start of the conversation. |
| `next(messages)` | `UIMessage \| null` | Return the next predefined user message after a transcript. |
| `transport(options?)` | `ConnectConnectionAdapter` | Create the connection used by `useChat`. |

`user()` / `assistant()` without content uses `"Summarize the uploaded receipt."`; `error()` without a message uses `"An error occurred."`; `get(count)` throws when `count` is negative or not an integer.

`user()` options: `id` (`string`), `metadata` (`TanStackMessageMetadata`, sets `createdAt`), `files` (`FilePayload[]`, appended as media parts after the user text part).

```ts
type FilePayload = {
  type?: "file"
  mediaType: string
  url: string
  filename?: string
  providerMetadata?: Record<string, unknown>
}
```

`assistant()` input: `string` (one text part streamed word by word), `MessagePart[]` (static TanStack parts), or `({ writer }) => void` (synchronous callback). `assistant()` options: `id` (`string`), `metadata` (`TanStackMessageMetadata`).

`transport()` options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `delayMs` | `number` | `50` | Delay between text and reasoning deltas. Use `0` or `undefined` to remove it. |
| `fallback` | `string \| MessagePart[] \| ({ writer, messages }) => void` | None | Response used when no predefined assistant response remains. |

### Writer

Available inside `assistant(({ writer }) => {})` and fallback callbacks.

| Method | Description |
| --- | --- |
| `text(text?, options?)` | Add streamed text. |
| `reasoning(text?, options?)` | Add streamed reasoning that becomes a `thinking` part. |
| `tool(name, options?)` | Add a typed tool call and return its lifecycle handle. |
| `sleep(delayMs)` | Pause before the next writer event. |
| `error(errorText?)` | Emit `RUN_ERROR` and end without a `RUN_FINISHED` event. |

Text and reasoning options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `delayMs` | `number` | Connection | Override the connection delay for this value. |
| `mode` | `"stream" \| "instant"` | `"stream"` | Stream word deltas or emit the whole value in one delta. |

Tool options:

| Option | Type | Description |
| --- | --- | --- |
| `toolCallId` | `string` | Use a specific tool call ID. |
| `input` | `TOOLS[NAME]["input"]` | Set the typed tool input. |
| `output` | `TOOLS[NAME]["output"]` | Immediately finish with a typed output. |
| `errorText` | `string` | Immediately finish with an error. |

`tool()` returns a handle with `sleep(delayMs)`, `output(value)`, and `error(errorText?)`. `tool.error()` without a message uses `"Tool call failed."`.

### Types

| Export | Description |
| --- | --- |
| `TanStackChat` | The typed fluent chat returned by `createChat()`. |
| `CreateChatOptions` | Options accepted by `createChat()`. |
| `TanStackMessageMetadata` | The supported `{ createdAt? }` message metadata. |
| `TanStackToolHandle` | The lifecycle handle returned by `writer.tool()`. |
| `TanStackWriter` | The writer available inside assistant and fallback callbacks. |

## Notes

- Adapter differences versus the AI SDK helper: only text, reasoning (becomes a `thinking` part), tool calls, timing, and errors round-trip through the AG-UI connection. Data and structured output have no writer method (existing parts remain available through `get()`); custom events have no writer method; sources, reasoning files, and step starts have no TanStack message or AG-UI equivalent; assistant files are available in `get()` but omitted from connection streams; `stop()` closes the stream (AG-UI has no separate abort event). Use the AI SDK helper when a preview needs the full AI SDK message-part model.
- Consecutive `text()` calls materialize as separate parts in `get()`, but TanStack's stream processor combines them into one text part during playback.
- Message metadata supports only `createdAt` (preserved through `get()` and `next()`, not streamed by the AG-UI connection). TanStack media parts preserve the URL and media type but not `filename` or `providerMetadata`.
- Use `append(nextMessage)` to replay a predefined user message (preserves its ID and media parts); use `sendMessage()` for ordinary input, which accepts a string or multimodal content rather than a complete `UIMessage`. The connection matches message IDs first, falling back to the role and text of the latest message.
- Without a `fallback`, the connection throws `"No assistant response found for this transcript."` when the conversation is exhausted. `stop()` from `useChat` closes the active connection stream.
- For fast tests use `chat.transport({ delayMs: 0 })` and instant text.
- This is an npm package (not copied into `components/ui/`), a UI preview/test helper replaying AG-UI events, not an agent runtime (agent runtimes: skills openai-agents / anthropic-agent-sdk). It is distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [AI SDK helper](./helpers-ai-sdk.md)
- [Message Scroller (@shadcn/react)](./react-message-scroller.md)
