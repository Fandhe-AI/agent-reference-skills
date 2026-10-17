---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text
---

# streamText

Streams text generations from a language model. Use it for interactive use cases such as chat bots and other real-time applications. You can also generate UI components with tools.

## Signature / Usage

```ts
import { streamText } from 'ai';

const { textStream } = streamText({
  model,
  prompt: 'Invent a new holiday and describe its traditions.',
});

for await (const textPart of textStream) {
  process.stdout.write(textPart);
}
```

## Options / Props

`streamText` accepts the same parameters as `generateText` (see [generateText](./generate-text.md) for `model`, `instructions`, `prompt`, `messages`, `allowSystemInMessages`, `tools`, `toolChoice`, `maxOutputTokens`, `temperature`, `topP`, `topK`, `presencePenalty`, `frequencyPenalty`, `stopSequences`, `seed`, `reasoning`, `maxRetries`, `headers`, `telemetry`, `providerOptions`, `activeTools`, `toolOrder`, `toolCallConcurrency`, `toolApproval`, `experimental_toolCallers`, `experimental_refineToolInput`, `stopWhen`, `prepareStep`, `runtimeContext`, `toolsContext`, `experimental_sandbox`, `experimental_download`, `repairToolCall`, `output`, lifecycle callbacks) with the differences and additions below.

| Name | Type | Description |
| --- | --- | --- |
| streamRetries | `number` (Optional) | Maximum number of automatic retries for provider error events received after response streaming begins. Retries rerun only the current model step and preserve completed earlier steps and their tool results. Tool-related output and client-side tool work from failed attempts are discarded; other output already emitted cannot be retracted, but is excluded from the recovered step result, structured output parsing, response messages, and subsequent model steps. Provider-executed tool work cannot be undone and may repeat. `onStepStart` runs once for the logical step, `onLanguageModelCallStart` runs for each attempt. Set to 0 to disable automatic retries while allowing `onError` to request one callback-directed retry; `onError` can request at most one additional retry after automatic retries are exhausted (total recovery calls bounded to `streamRetries + 1`). Omit to disable all stream retry behavior and preserve incremental tool streaming for existing `onError` observers. Default: 0. |
| abortSignal | `AbortSignal` (Optional) | Cancel the call. When it fires during streaming, pending result promises such as `text` and `steps` reject with the abort reason without waiting for `onAbort` or provider cancellation. Completed steps are available through `onAbort`. |
| timeout | `number \| { totalMs?; stepMs?; firstChunkMs?; chunkMs?; toolMs?; tools? }` (Optional) | As in `generateText`, plus `firstChunkMs` (timeout until the first content-bearing output in each step) and `chunkMs` (limits gaps between subsequent meaningful model output chunks, starting at first meaningful output). Both output timers stop when the model response finishes and start fresh for each retry or later model call. Local tool results, including preliminary results, do not reset them; local tool execution is outside their scope. |
| experimental_transform | `StreamTextTransform \| Array<StreamTextTransform>` (Optional) | Stream transformations, applied in the order provided. They must maintain the stream structure for `streamText` to work correctly. A transform is `(options: { stopStream: () => void; tools: TOOLS }) => TransformStream<TextStreamPart<TOOLS>, TextStreamPart<TOOLS>>`. |
| includeRawChunks | `boolean` (Optional) | Deprecated. Use `include.rawChunks`. Defaults to false. |
| include | `{ requestBody?: boolean; requestMessages?: boolean; rawChunks?: boolean }` (Optional) | Request body and request messages in step results, and raw provider chunks in the stream (`type: "raw"`), are excluded by default to reduce memory usage. |
| onChunk | `(event: OnChunkResult) => Promise<void> \| void` (Optional) | Called for each stream part; stream processing pauses until the callback promise is resolved. `chunk` is a `TextStreamPart<TOOLS>` (same union as `stream`: `start`, `start-step`, `text-start`, `text-delta`, `text-end`, `reasoning-start`, `reasoning-delta`, `reasoning-end`, `custom`, `source`, `file`, `reasoning-file`, `tool-call`, `tool-input-start`, `tool-input-delta`, `tool-input-end`, `tool-result`, `tool-error`, `tool-output-denied`, `tool-approval-request`, `tool-approval-response`, `finish-step`, `finish`, `abort`, `error`, `raw`). |
| onError | `StreamTextOnErrorCallback \| StreamTextOnErrorRetryCallback` (Optional) | Called when an error occurs during streaming. Receives `{ error: unknown }`. Well-formed mid-stream provider error events are exposed as `StreamProviderError` instances (use `StreamProviderError.isInstance`). When `streamRetries` is explicitly configured, return `{ retry: true }` to request one callback-directed retry for the current model step after automatic retries are exhausted. |
| onAbort | `(event: OnAbortResult) => Promise<void> \| void` (Optional) | Called when a stream is aborted via `AbortSignal`. Receives `callId`, `steps` (previously finished steps), `reason?` (raw abort reason), and the final runtime context state. |
| onEnd | `(result: OnEndResult) => Promise<void> \| void` (Optional) | Called when the stream finishes. |
| onFinish | `(result: OnEndResult) => Promise<void> \| void` (Optional) | Deprecated alias for `onEnd`. |
| onStepEnd / onStepFinish | callback (Optional) | Called when a step ends (`onStepFinish` is deprecated; use `onStepEnd`). |
| onStart, onStepStart, onLanguageModelCallStart, onLanguageModelCallEnd, onToolExecutionStart, onToolExecutionEnd | callbacks (Optional) | As in `generateText` (see Lifecycle Callbacks). `experimental_onToolCallStart` / `experimental_onToolCallFinish` are deprecated aliases. |
| output | `Output` (Optional) | Specification for parsing structured outputs; see Output. |

### Returns

Result values on the result object (promises resolve when the stream finishes; most properties automatically consume the stream).

| Name | Type | Description |
| --- | --- | --- |
| content | `Promise<Array<ContentPart<TOOLS>>>` | Content generated in all steps. Text parts can include optional `citations`. Automatically consumes the stream. |
| text | `Promise<string>` | Generated text from the final step. |
| finishReason | `PromiseLike<'stop' \| 'length' \| 'content-filter' \| 'tool-calls' \| 'error' \| 'other'>` | Why the generation finished. Automatically consumes the stream. |
| rawFinishReason | `PromiseLike<string \| undefined>` | Raw finish reason from the provider. |
| usage | `Promise<LanguageModelUsage>` | Total token usage across all steps. Automatically consumes the stream. |
| totalUsage | `Promise<LanguageModelUsage>` | Deprecated. Use `usage`. |
| providerMetadata | `Record<string,JSONObject> \| undefined` | Optional provider metadata. |
| reasoning / reasoningText | promises | Reasoning generated by the model. |
| sources, files | promises | Sources and files generated in all steps. |
| toolCalls, toolResults, staticToolCalls, dynamicToolCalls, staticToolResults, dynamicToolResults | promises | Tool calls / results in all steps, split into static and dynamic. |
| request, response, warnings, responseMessages | promises | Request / response metadata, provider warnings, accumulated response messages. |
| steps | promise | Details for all steps. |
| finalStep | `Promise<StepResult>` | The final step; shortcut for `steps.at(-1)`. Automatically consumes the stream. |
| textStream | `AsyncIterableStream<string>` | Text deltas only; usable as an AsyncIterable or a ReadableStream. Error parts are not surfaced here. Use `onError` or `stream` to observe them. |
| stream | `AsyncIterable<TextStreamPart<TOOLS>> & ReadableStream<TextStreamPart<TOOLS>>` | All events: text deltas, tool calls, tool results, errors. Well-formed mid-stream provider failures are emitted in `error` parts as `StreamProviderError` instances. Only errors that stop the stream, such as network errors, are thrown. `text-end` parts carry `id`, optional `citations: Array<Citation>`, and optional `providerMetadata`. |
| fullStream | same as `stream` | Deprecated. Use `stream`. |
| partialOutputStream | `AsyncIterableStream<PARTIAL_OUTPUT>` | Stream of partial parsed outputs per the `output` specification. |
| elementStream | `AsyncIterableStream<ELEMENT_OUTPUT>` | Individual array elements as they complete. Only with `output: Output.array()`. Each element is complete and validated; when `maxItems` is set, the stream errors before emitting the first excess element. |
| output | `Promise<COMPLETE_OUTPUT>` | The complete parsed output per the `output` specification. |
| consumeStream | `(options?: { onError?: (error: unknown) => void }) => Promise<void>` | Consumes the stream without processing the parts, forcing it to finish. Errors are passed to the optional `onError`. |
| toUIMessageStream | `(options?: UIMessageStreamOptions) => AsyncIterableStream<UIMessageChunk>` | Converts the result to a UI message stream (includes tool approval request and response chunks). |
| pipeUIMessageStreamToResponse | `(response: ServerResponse, options?: ResponseInit & UIMessageStreamOptions) => Promise<void>` | Writes UI message stream output to a Node.js response-like object. |
| pipeTextStreamToResponse | `(response: ServerResponse, init?: ResponseInit) => Promise<void>` | Writes text deltas to a Node.js response-like object with `Content-Type: text/plain; charset=utf-8`, one chunk per delta. |
| toUIMessageStreamResponse | `(options?: ResponseInit & UIMessageStreamOptions) => Response` | Converts the result to a streamed Response with a UI message stream. |
| toTextStreamResponse | `(init?: ResponseInit) => Response` | Simple text stream Response; each text delta is UTF-8 encoded and sent as a separate chunk; non-text-delta events are ignored. |

#### UIMessageStreamOptions

| Name | Type | Description |
| --- | --- | --- |
| originalMessages | `UIMessage[]` (Optional) | The original messages. |
| onStepEnd | `(event: { messages: UIMessage[]; isContinuation: boolean; responseMessage: UIMessage }) => PromiseLike<void> \| void` (Optional) | Called after each step is converted to UI message parts; separate from the generation callback passed to `streamText`. `onStepFinish` is a deprecated alias. |
| onEnd | `(options: { messages; isContinuation; responseMessage; isAborted: boolean; isCancelled?: true; outcome: UIMessageStreamOutcome; finishReason?: FinishReason }) => PromiseLike<void> \| void` (Optional) | Called when the stream ends. `onFinish` is a deprecated alias. |
| messageMetadata | `(options: { part }) => unknown` (Optional) | Extracts message metadata sent to the client; called on start and finish events. |
| sendReasoning | `boolean` (Optional) | Send reasoning parts to the client. Defaults to false. |
| sendSources | `boolean` (Optional) | Send source parts to the client. Defaults to false. |
| sendFinish | `boolean` (Optional) | Send the finish event. Defaults to true. |
| sendStart | `boolean` (Optional) | Send the message start event; set false when using additional `streamText` calls and the start event has already been sent. Defaults to true. |
| onError | `(error: unknown) => string` (Optional) | Process an error and return the message to include in the data stream. Defaults to `() => "An error occurred."`. Tool execution errors marked `providerExecuted: true` bypass this callback (strings pass through unchanged, other values JSON-stringified). Stream errors and invalid tool calls still use it. |
| consumeSseStream | `(stream: ReadableStream) => Promise<void>` (Optional) | Consume the SSE stream. Required for proper abort handling in UI message streams; use the AI SDK `consumeStream` function. |

`ResponseInit` fields for the response helpers: `status`, `statusText`, `headers`.

### Types

```ts
type ActiveTools<TOOLS extends ToolSet> =
  | ReadonlyArray<keyof TOOLS & string>
  | undefined;
```

## Notes

- `streamText` starts streaming immediately; errors become part of the stream and are not thrown. Use `onError` to log them.
- Deprecated: `fullStream` (use `stream`), `includeRawChunks` (use `include.rawChunks`), `totalUsage`, `onFinish`, `onStepFinish`, `experimental_onToolCallStart`, `experimental_onToolCallFinish`.
- `experimental_*` options may change in incremental package releases.
- `result.toUIMessageStreamResponse` / `pipeUIMessageStreamToResponse` produce HTTP responses; this page covers the AI SDK helper. Server-framework specifics (Hono, Fastify, Next.js route handlers, TanStack Start) are covered by the hono, fastify, nextjs-app and tanstack-start skills.

## Related

- [generateText](./generate-text.md)
- [Generating Text](./generating-text.md)
- [Lifecycle Callbacks](./lifecycle-callbacks.md)
- [smoothStream](./smooth-stream.md)
- [Output](./output.md)
