---
source: https://ui.shadcn.com/docs/helpers/ai-sdk
---

# AI SDK (@shadcn/helpers)

`@shadcn/helpers/ai-sdk` lets you write an AI conversation in code and stream it through the AI SDK `useChat`, with no model, API route, network request, or API key. The conversation streams through the real `useChat` lifecycle, so components behave as in production. It supports every AI SDK part type (reasoning, tools, data, files, sources, custom parts); tool calls can also pause for real user input, including approvals.

## Signature / Usage

```bash
npm install @shadcn/helpers
```

It works alongside your existing AI SDK setup (`ai` and `@ai-sdk/react`).

```ts
import { createChat } from "@shadcn/helpers/ai-sdk"

const chat = createChat()
  .user("What changed in this release?")
  .assistant("The release adds keyboard shortcuts and faster search.")
  .user("Can you show me the shortcuts?")
  .assistant("Press ⌘K to search and ⌘Enter to submit.")
```

Pass initial messages and the local transport to `useChat`, then send each predefined user message with `next()`:

```tsx
"use client"

import { useChat } from "@ai-sdk/react"
import { createChat } from "@shadcn/helpers/ai-sdk"

const chat = createChat()
  .user("What changed in this release?")
  .assistant("The release adds keyboard shortcuts and faster search.")

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

`get(0)` starts with no messages. `sendMessage(nextMessage)` sends the next predefined user message; the transport then streams its assistant response.

Assistant messages: a string creates one text part; an array of AI SDK parts is also accepted; use the writer callback for more than plain text.

```ts
chat.assistant(({ writer }) => {
  writer.reasoning("I should summarize the release.")
  writer.text("The release adds keyboard shortcuts and faster search.")
})
```

Tool calls (finish with `output()`, `error()`, or `denied()`):

```ts
chat.assistant(({ writer }) => {
  writer
    .tool("getWeather", {
      title: "Checking weather",
      input: { city: "San Francisco" },
    })
    .sleep(900)
    .output({ city: "San Francisco", temperature: 18, condition: "Breezy" })

  writer.text("It is 18°C and breezy in San Francisco.")
})
```

Typing: pass your message type to `createChat` (same type parameter as `useChat`):

```ts
import type { UIMessage } from "ai"

type Tools = {
  getWeather: {
    input: { city: string }
    output: { city: string; temperature: number; condition: string }
  }
}

type ChatMessage = UIMessage<unknown, Record<string, never>, Tools>

const chat = createChat<ChatMessage>()
```

Human in the loop: leave a tool call unresolved to pause (the part stays `input-available` until the client supplies output with `addToolOutput`); pass `needsApproval: true` to pause behind the user's decision (`output` then means "stream this after approval"; denial streams `tool-output-denied` automatically).

```ts
chat.assistant(({ writer }) => {
  writer.text("That will archive 3 drafts. I need your approval.")
  writer.tool("archiveDrafts", {
    input: { count: 3 },
    needsApproval: true,
    output: { archived: 3 },
  })
})
```

Continuations: a callback turn scripted right after a paused turn runs when the follow-up request arrives, with `toolCall` in its context.

```ts
chat
  .assistant(({ writer }) => {
    writer.tool("askQuestions", { input: { questions } })
  })
  .assistant(({ writer, toolCall }) => {
    writer.text(
      toolCall?.name === "askQuestions" && toolCall.output
        ? `Starting with ${toolCall.output.answers.direction}.`
        : "Starting now."
    )
  })
```

Client wiring uses the AI SDK as-is:

```tsx
import {
  lastAssistantMessageIsCompleteWithApprovalResponses,
  lastAssistantMessageIsCompleteWithToolCalls,
} from "ai"

const { messages, addToolOutput, addToolApprovalResponse } = useChat({
  messages: chat.get(0),
  transport: chat.transport(),
  sendAutomaticallyWhen: (options) =>
    lastAssistantMessageIsCompleteWithToolCalls(options) ||
    lastAssistantMessageIsCompleteWithApprovalResponses(options),
})

addToolOutput({ tool: "askQuestions", toolCallId: part.toolCallId, output: { answers } })
addToolApprovalResponse({ id: part.approval.id, approved: true })
```

Other writer parts:

```ts
// data (same type + id updates in place; transient: true is not kept in the final message)
writer.data({ type: "data-weather", id: "weather-sf", data: { city: "San Francisco", status: "loading" } })

// files / sources / step boundaries / custom
chat.user("Summarize this report.", {
  files: [{ filename: "report.pdf", mediaType: "application/pdf", url: "https://example.com/report.pdf" }],
})
writer.file({ filename: "summary.md", mediaType: "text/markdown", url: "https://example.com/summary.md" })
writer.sourceUrl({ sourceId: "source-1", title: "Release notes", url: "https://example.com/releases" })
writer.stepStart()
writer.custom("app.approval")
```

Reading, seeding, timing, errors:

```ts
chat.get() // Every message.
chat.get(2) // The first two messages.
chat.get(0) // An empty initial conversation.

const nextMessage = chat.next(chat.get(2)) // next predefined user message or null

const seeded = createChat({ messages: savedMessages }) // IDs, metadata, parts preserved

createChat().user("Give me a project update.").sleep(800).assistant("...")
createChat().user("Load the report.").error("The report could not be loaded.")
```

Transport with fallback:

```ts
const transport = chat.transport({
  delayMs: 25,
  fallback: ({ writer, messages }) => {
    writer.text(`This example already has ${messages.length} messages.`, {
      mode: "instant",
    })
  },
})
```

## Options / Props

### createChat()

```ts
function createChat<UI_MESSAGE extends UIMessage = UIMessage>(
  options?: CreateChatOptions<UI_MESSAGE>
): AiSdkChat<UI_MESSAGE>
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `messages` | `UIMessage[]` | `[]` | Start from an existing transcript. Messages are cloned. |
| `messageIdPrefix` | `string` | `"msg"` | Prefix for generated message IDs. |
| `toolCallIdPrefix` | `string` | `"call"` | Prefix for generated tool call IDs. |
| `sourceIdPrefix` | `string` | `"source"` | Prefix for generated source IDs. |
| `now` | `Date \| string` | `"2026-01-01T00:00:00.000Z"` | Fixed time used for generated `createdAt` metadata. |

### AiSdkChat

Every method that adds content returns the same chat (chainable).

| Method | Returns | Description |
| --- | --- | --- |
| `user(text?, options?)` | `AiSdkChat` | Add a user message with text and optional files. |
| `assistant(input?, options?)` | `AiSdkChat` | Add an assistant message from text, parts, or a writer callback. |
| `sleep(delayMs)` | `AiSdkChat` | Wait before the next assistant response starts. |
| `error(errorText?)` | `AiSdkChat` | Add an assistant response that emits an error. |
| `get(count?)` | `UIMessage[]` | Return cloned messages from the start of the conversation. |
| `next(messages)` | `UIMessage \| null` | Return the next predefined user message after a transcript. |
| `transport(options?)` | `ChatTransport` | Create the transport used by `useChat`. |

`user()` / `assistant()` without content uses `"Summarize the uploaded receipt."`; `error()` without a message uses `"An error occurred."`; `get(count)` throws when `count` is negative or not an integer.

`user()` options:

| Option | Type | Description |
| --- | --- | --- |
| `id` | `string` | Use a specific message ID. |
| `metadata` | `METADATA` | Set metadata for this message. |
| `files` | `FilePayload[]` | Append file parts after the user text part. |

```ts
type FilePayload = {
  type?: "file"
  mediaType: string
  url: string
  filename?: string
  providerMetadata?: Record<string, unknown>
}
```

`assistant()` input: `string` (one text part streamed word by word), `UIMessagePart[]` (static parts in existing order), or `({ writer }) => void` (synchronous callback; after a paused turn it becomes a continuation and receives `toolCall`, `toolCalls`, and `messages`). `assistant()` options: `id` (`string`), `metadata` (`METADATA`).

`transport()` options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `delayMs` | `number` | `50` | Delay between text and reasoning deltas. Use `0` or `undefined` to remove it. |
| `fallback` | `string \| UIMessagePart[] \| ({ writer, messages }) => void` | None | Response used when no predefined assistant response remains. |

### Writer

Available inside `assistant(({ writer }) => {})` and fallback callbacks.

| Method | Description |
| --- | --- |
| `text(text?, options?)` | Add a text part. |
| `reasoning(text?, options?)` | Add a reasoning part. |
| `tool(name, options?)` | Add a typed or dynamic tool call and return its lifecycle handle. |
| `data(part)` | Add or update a typed data part. |
| `file(options?)` | Add a file part. |
| `reasoningFile(options?)` | Add a reasoning file part. |
| `sourceUrl(options?)` | Add a URL source part. |
| `sourceDocument(options?)` | Add a document source part. |
| `stepStart()` | Add an AI SDK step boundary. |
| `custom(kind?)` | Add a custom part with the given `kind`. |
| `sleep(delayMs)` | Pause before the next writer event. |
| `error(errorText?)` | Emit an error and end the response without a `finish` chunk. |

Text and reasoning options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | Generated | Use a stable part ID. |
| `delayMs` | `number` | Transport | Override the transport delay for this part. |
| `mode` | `"stream" \| "instant"` | `"stream"` | Stream word deltas or emit the whole part in one delta. |

Tool options:

| Option | Type | Description |
| --- | --- | --- |
| `toolCallId` | `string` | Use a specific tool call ID. |
| `title` | `string` | Add a display title to the tool part. |
| `toolMetadata` | `Record<string, unknown>` | Add provider or application metadata. |
| `providerExecuted` | `boolean` | Mark the call as executed by the provider. |
| `input` | `TOOLS[NAME]["input"]` | Set the typed tool input. |
| `output` | `TOOLS[NAME]["output"]` | Immediately finish with a typed output. With `needsApproval`, stream it after approval instead. |
| `errorText` | `string` | Immediately finish with an error. With `needsApproval`, stream it after approval instead. |
| `dynamic` | `boolean` | Emit a `dynamic-tool` part instead of `tool-<name>`. |
| `needsApproval` | `boolean` | Pause the turn behind the user's decision. |
| `approvalId` | `string` | Use a specific approval ID. |

`tool()` returns a handle with `sleep(delayMs)`, `output(value, { preliminary? })`, `error(errorText?)`, and `denied()`. `preliminary: true` streams the output without finishing the call. `tool.error()` without a message uses `"Tool call failed."`. The resolution methods throw on a `needsApproval` call.

File and source fields: `file()` / `reasoningFile()` take `mediaType?`, `url?`, `filename?`, `providerMetadata?`; `sourceUrl()` takes `sourceId?`, `url?`, `title?`, `providerMetadata?`; `sourceDocument()` takes `sourceId?`, `mediaType?`, `title?`, `filename?`, `providerMetadata?`. Omitted fields get sample defaults.

Continuation `toolCall` properties: `name`, `toolCallId`, `input`, `output` (user-submitted output, or gated output after approval), `approved` and `denied` (approval calls only).

Types exported: `AiSdkChat` (typed fluent chat returned by `createChat()`), `CreateChatOptions`.

## Notes

- Use cases: building components against realistic streaming output, reproducible previews/demos, documentation examples, and deterministic CI tests with no network calls or token spend.
- Transport matches the assistant message that follows the current transcript by message IDs first, falling back to the role and text of the latest message. Automatic sends after tool results and approval responses resolve the next continuation; only regeneration replays a turn by its message ID.
- Without a `fallback`, the transport throws `"No assistant response found for this transcript."` when the conversation is exhausted. `stop()` from `useChat` aborts the active stream; reconnecting is not supported (`reconnectToStream()` returns `null`).
- `get()` returns clones and stops before the first continuation turn; it throws when `count` reaches past one. `next()` accepts a message transcript, not an index.
- Continuations must stay pure; regenerating re-resolves them against the current transcript. In development the helper warns when a `needsApproval` call has no continuation turn after it, or when a continuation resolves without a pending tool call.
- For fast tests use `chat.transport({ delayMs: 0 })` and instant text. `chat.sleep(ms)`, `writer.sleep(ms)`, and `tool.sleep(ms)` reproduce response pacing.
- For the TanStack AI equivalent (fewer part types) see `helpers-tanstack-ai.md`.
- This is an npm package (not copied into `components/ui/`), a UI preview/test helper rendering AI SDK message parts, not an agent runtime (agent runtimes: skills openai-agents / anthropic-agent-sdk). It is distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [TanStack AI helper](./helpers-tanstack-ai.md)
- [Message Scroller (@shadcn/react)](./react-message-scroller.md)
