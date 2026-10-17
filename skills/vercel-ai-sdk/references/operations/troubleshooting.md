---
source: https://ai-sdk.dev/docs/troubleshooting
---

# Troubleshooting (aggregated)

Common issues with the AI SDK, aggregated from the official troubleshooting section (31 pages) into Issue / Cause (or Background) / Solution tables. Each row corresponds to `https://ai-sdk.dev/docs/troubleshooting/<slug>`; the slug is given in the first column.

## Signature / Usage

Most representative fix: `streamText` reports errors as stream parts instead of throwing, so log them with `onError`:

```tsx
import { streamText } from 'ai';

const result = streamText({
  model,
  prompt: 'Invent a new holiday and describe its traditions.',
  onError({ error }) {
    console.error(error); // your error logging logic here
  },
});
```

## Streaming and deployment

| Slug / Issue | Cause / Background | Solution |
| --- | --- | --- |
| `stream-text-not-working`: `streamText` does not work, throws no errors, and the stream only contains error parts | `streamText` immediately starts streaming; errors become part of the stream and are not thrown, to prevent e.g. servers from crashing | Provide an `onError` callback (see snippet above) |
| `streaming-not-working-when-deployed`: streaming works locally but a deployed app returns only the full response after a while | Varied, depends on the deployment environment | Add `'Transfer-Encoding': 'chunked'` and/or `Connection: 'keep-alive'` headers to `createUIMessageStreamResponse({ stream: toUIMessageStream({ stream: result.stream }), headers: {...} })` |
| `streaming-not-working-when-proxied`: streaming does not work locally or in some proxy environments; only the full response is returned | Proxy middleware; if configured to compress the response, streaming fails | Add the `'Content-Encoding': 'none'` header to the streaming response (only affects the streaming API) |
| `timeout-on-vercel`: longer responses are chopped off, Vercel timeouts, or `Uncaught (in promise) Error: Connection closed` | (none stated) With Vercel Fluid Compute the default function duration is 5 minutes (300 seconds) across all plans | Raise `maxDuration`: Next.js `export const maxDuration = 600;`; other frameworks `vercel.json` `functions.<path>.maxDuration`. Above 300 seconds requires a Pro or Enterprise plan. Limits stated: Hobby up to 300 s, Pro up to 800 s, Enterprise up to 800 s |
| `azure-stream-slow`: OpenAI on Azure streams slowly and in big chunks | A Microsoft Azure issue; reported fix: in Azure AI Studio, "Shared resources" > "Content filters", create a content filter and set "Streaming mode (Preview)" under "Output filter" from "Default" to "Asynchronous Filter" | Use `smoothStream()` to stream each word individually: `streamText({ model, prompt, experimental_transform: smoothStream() })` |
| `strange-stream-output`: `useChat` / `useCompletion` stream output shows `0: "Je"` ... instead of text (SDK `3.0.20` or newer, custom client code with `StreamingTextResponse`) | The SDK switched to the stream data protocol in `3.0.20`; you see the raw stream data protocol response | Send a raw text stream with `createTextStreamResponse({ stream: toTextStream({ stream: result.stream }) })`, or pin the SDK to `3.0.19` |
| `use-chat-failed-to-parse-stream`: `"Failed to parse stream string. Invalid code"` (SDK `3.0.20` or newer) | `useChat` / `useCompletion` expect stream data protocol parts; caused by an older SDK in the backend, a text stream from a custom provider, or a raw LangChain stream result | Switch to raw text stream processing: `useChat({ streamProtocol: 'text' })` |
| `use-chat-an-error-occurred`: `useChat` shows "An error occurred" | Error messages from `streamText` are masked by default when using `toUIMessageStream` (secure-by-default) | Pass an `onError` function to `toUIMessageStream` (or to `createUIMessageStream`) that returns the message to forward, e.g. `error instanceof Error ? error.message : JSON.stringify(error)` |
| `streaming-status-delay`: `useChat` status is `"streaming"` immediately but no text appears for seconds | The status changes to `"streaming"` as soon as the connection is established, including metadata streaming | Custom loading state: `status === 'streaming' && lastMessage?.role === 'assistant' && lastMessage?.parts?.length === 0` (or check for a specific part type) |
| `react-maximum-update-depth-exceeded`: React error `Maximum update depth exceeded` while AI responses stream in | By default the UI re-renders on every chunk; this can overload rendering | Use the `throttle` option: `useChat({ throttle: 50 })` / `useCompletion({ throttle: 50 })` |
| `unclosed-streams`: the streamable UI is slow to update | A streamable UI created with `createStreamableUI` was not closed | Call `.done()` on the stream (`stream.done('4')`) |
| `stream-abort-handling`: `onEnd` is not called when the stream is aborted with `toUIMessageStream` | The abort handler immediately terminates the response, so `onEnd` has no chance to run | Add `consumeSseStream: consumeStream` to `createUIMessageStreamResponse` |
| `abort-breaks-resumable-streams`: with `useChat({ resume: true })`, client aborts (closing a tab, refreshing, navigating away, `stop()`) are treated as disconnects and request-signal forwarding can cancel work that resumption expects to keep running | Stream resumption needs the server to keep the stream producer running even when no client is connected; explicit cancellation needs a separate server-side signal | Use `resume: true` for reconnecting and add a dedicated stop endpoint (load chat and active stream ID, persist the latest partial assistant message, cancel the producing work, clear the active stream reference only if it still points to the same stream); on the client POST to your stop endpoint (e.g. `/api/chat/<chatId>/stop`) before calling `chat.stop()`. Do not call the stop endpoint from route cleanup, page unload, or unmount. Without resumption, set `resume: false` and use `stop()` |

## useChat and messages

| Slug / Issue | Cause / Background | Solution |
| --- | --- | --- |
| `use-chat-tools-no-response`: server logs show the tool call and tool result but the model does not respond | Incoming UI messages must be model messages | Convert with `messages: await convertToModelMessages(messages)` |
| `use-chat-custom-request-options`: custom `headers`, `body`, `credentials` set on `useChat` are not sent | `useChat` no longer supports `headers` / `body` / `credentials` directly on the hook | Request-level: `sendMessage({ text }, { headers, body })` (recommended for dynamic values); static: `new DefaultChatTransport({ api, headers, body, credentials })`; dynamic at hook level: resolvable functions (`headers: () => ({...})`, `body: () => ({...})`, `credentials: () => ...`). Request-level options take precedence over hook-level options. For changing component state prefer request-level, or `useRef` with `ref.current` |
| `use-chat-stale-body-data`: dynamic values passed in hook-level `body` stay at the initial render value | Hook-level body configuration is evaluated once at initial render | Pass dynamic values as the second argument of `sendMessage(..., { body: { temperature, userId } })`; or use `body: () => ({ temperature: temperatureRef.current })` with a ref. Server: destructure custom fields from `req.json()` |
| `repeated-assistant-messages`: assistant messages appear duplicated in the UI (tool calls or complex flows) | UI message streams generate new message IDs for each new message | Pass `originalMessages: messages` (and `generateMessageId`) to `toUIMessageStream` so existing IDs are reused |
| `ontoolcall-type-narrowing`: TypeScript error passing `toolCall.toolName` to `addToolOutput` inside `onToolCall` | Static tools have literal name types; dynamic tools have `toolName: string`, so TypeScript cannot narrow | Check `if (toolCall.dynamic) { return; }` first, then call `addToolOutput({ tool: toolCall.toolName, toolCallId, output })`. The deprecated `addToolResult` is handled the same way |
| `tool-invocation-missing-result`: error "ToolInvocation must have a result" when a tool without `execute` is called | A tool without `execute` whose result is not provided through other means (`useChat` `onToolCall` / `addToolOutput`); every tool call must have a result before the conversation can continue | Server-side: define `execute`. Client-side: omit `execute` and call `addToolOutput({ tool, toolCallId, output })` (with `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls`); do not await `addToolOutput` inside `onToolCall` to avoid deadlocks; use `state: 'output-error'` with `errorText` for failures |
| `missing-tool-results-error` (`AI_MissingToolResultsError`): "Tool results are missing for tool calls: ..." | A new message is sent while tool calls from a previous turn are unresolved. Core validation requires each `tool-call` to be resolved by a `tool-result` or, with tool approvals, a `tool-approval-response` | Add a `role: 'tool'` message containing the `tool-result` (or the `tool-approval-response` with `approvalId` and `approved`) before the next user message |
| `tool-calling-with-structured-outputs`: combining tool calling with structured output generation | With `output`, structured output generation counts as an additional step | Adjust `stopWhen` to at least your intended step count + 1, e.g. `stopWhen: isStepCount(3)` for tool call + tool result + structured output |
| `no-object-generated-content-filter`: `NoObjectGeneratedError` with finish reason `content-filter` using OpenAI structured outputs | OpenAI structured outputs require specific JSON Schema; Zod `.nullish()` and `.optional()` produce incompatible schemas (`.nullable()` is compatible) | Replace `.nullish()` / `.optional()` with `.nullable()` in the `Output.object` schema |
| `high-memory-usage-with-images`: memory grows when processing many images with `generateText` / `streamText` (especially `experimental_download` or base64 images) | With `include`, the SDK includes full request messages and request / response bodies in step results; base64 image data can be 1 MB+ per image and accumulates when results are retained | Control `include`: `requestBody`, `requestMessages` (both `generateText` and `streamText`), `rawChunks` (`streamText` only), `responseBody` (`generateText` only); all default `false`. Store only the data you need (e.g. `result.text`) |

## TypeScript and tooling

| Slug / Issue | Cause / Background | Solution |
| --- | --- | --- |
| `model-is-not-assignable-to-type`: `Type 'SomeModel' is not assignable to type 'LanguageModelV1'` after updating the SDK (similar errors can occur with `EmbeddingModelV4`) | New features are added to the model specification, causing incompatibility with older provider versions | Update provider packages and the AI SDK to the latest version |
| `unsupported-model-version` (`AI_UnsupportedModelVersionError`): `Unsupported model version v1 for provider "ollama.chat"...` when migrating to AI SDK 5 | The provider package implements the older v1 specification; AI SDK 5 only supports specification version `v2` | Update `@ai-sdk/*` providers to `2.0.0` or later; for AI SDK 5: `ai` `5.0.0`+, `@ai-sdk/provider` `2.0.0`+, `zod` `4.1.8`+. Verify third-party / custom providers (peer dependency `@ai-sdk/provider` `2.0.0`+). `pnpm install ai@latest @ai-sdk/openai@latest @ai-sdk/anthropic@latest` |
| `typescript-performance-zod`: TypeScript server crashes or hangs, very slow type checking, "Type instantiation is excessively deep and possibly infinite" (AI SDK 5 with Zod) | With the standard `import { z } from 'zod'`, different module resolution settings caused TypeScript to load the same Zod declarations twice, leading to expensive structural comparisons | Upgrade to Zod `4.1.8` or later (`pnpm add zod@^4.1.8`), or set `"moduleResolution": "nodenext"` in `tsconfig.json` |
| `typescript-cannot-find-namespace-jsx`: `error TS2503: Cannot find namespace 'JSX'` in a project without React (e.g. a Hono server) | The AI SDK depends on `@types/react`, which defines the `JSX` namespace; to be removed in the next major version | `npm install @types/react` |
| `jest-cannot-find-module-ai-rsc`: `Cannot find module '@ai-sdk/rsc'` in Jest tests for RSC components | Jest module resolution | Add `"moduleNameMapper": { "^@ai-sdk/rsc$": "<rootDir>/node_modules/@ai-sdk/rsc/dist" }` to `jest.config.js` |

## RSC and Server Actions

| Slug / Issue | Cause / Background | Solution |
| --- | --- | --- |
| `server-actions-in-client-components`: inline `"use server"` Server Actions are not allowed in Client Components | Next.js restriction | Export them from a separate file with `"use server"` at the top, pass them down via props from a Server Component, or use `createAI` + `useActions` |
| `client-stream-error` ("Only plain objects can be passed from client components"): error when using `streamText` with Server Actions | `streamText` returns an object with methods or complex structures that cannot be serialized to the client | Return only serializable data; use `createStreamableValue` to pass streamed values to the client |
| `streamable-ui-errors`: `Variable Not Found`, `Cannot find div`, "`Component` refers to a value, but is being used as a type" | Streamable UI in server actions in a file ending in `.ts` instead of `.tsx` | Rename the file to `.tsx` |

## Notes

- Several rows reference removed or older APIs (for example the stream data protocol of SDK `3.0.20`, `LanguageModelV1`, `StreamingTextResponse`, `unsupported-model-version` for AI SDK 5); they are kept because the official page remains in the 7.0.142 documentation.
- Code in the originals uses placeholder `__MODEL__` / `__PROVIDER_IMPORT__`; snippets here use `model` as a stand-in.
- AI SDK RSC (`@ai-sdk/rsc`) rows apply to an experimental package.
- Vercel platform settings referenced in the timeout row (Fluid Compute, plan limits, `vercel.json`) are covered by the vercel skill; plan limits quoted here are as stated on the AI SDK page.

## Related

- [Error Handling](./error-handling.md)
- [AI SDK Errors](./errors.md)
- [Stopping Streams](./stopping-streams.md)
- [Vercel Deployment Guide](./vercel-deployment-guide.md)
