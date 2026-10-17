---
source: https://ai-sdk.dev/docs/migration-guides/migration-guide-5-0
---

# Migrate AI SDK 4.x to 5.0

Breaking-change guide, codemods and before/after snippets for upgrading from AI SDK 4.x to 5.0 (message model, tools, useChat transport, streaming protocol, providers).

## Signature / Usage

Recommended process: back up the project, upgrade to AI SDK 5.0, migrate automatically (AI SDK 5 Migration MCP server or codemods), follow the breaking changes, verify, commit.

```sh
npm install ai @ai-sdk/react @ai-sdk/openai zod@^4.1.8
npx @ai-sdk/codemod upgrade
npx @ai-sdk/codemod v5
npx @ai-sdk/codemod v5/rename-format-stream-part src/
```

MCP-assisted migration (`.cursor/mcp.json`, designed for Cursor, works with MCP-capable coding agents):

```json
{
  "mcpServers": {
    "ai-sdk-5-migration": {
      "url": "https://ai-sdk-5-migration-mcp-server.vercel.app/api/mcp"
    }
  }
}
```

Prompt: `Please migrate this project to AI SDK 5 using the ai-sdk-5-migration mcp server. Start by creating a checklist.`

Typical v5 chat setup (transport, manual input state, `sendMessage`):

```tsx
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const handleSubmit = e => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}
```

## Options / Props

Package versions: `ai` `5.0.0`; `@ai-sdk/provider` `2.0.0`; `@ai-sdk/provider-utils` `3.0.0`; other `@ai-sdk/*` `2.0.0`; peer dependency `zod` `4.1.8` or later (recommended to avoid TypeScript performance issues; if the problem persists set `moduleResolution: "nodenext"` in `tsconfig.json`).

### Core: generateText / streamText

| AI SDK 4.0 | AI SDK 5.0 |
| --- | --- |
| `maxTokens` | `maxOutputTokens` |
| `providerMetadata` (input) | `providerOptions` (returned metadata is still `providerMetadata`) |
| `maxSteps: 5` | `stopWhen: isStepCount(5)` / `hasToolCall('finalizeTask')` / arrays / custom `({ steps }) => ...`; `stopWhen` is only evaluated when the last step contains tool results |
| `result.usage` (total across steps) | `usage` = final step only; `totalUsage` = all steps |
| `step.reasoning` (string) | `step.reasoningText`; in `generateText` / `streamText` results `reasoning` -> `reasoningText`, `reasoningDetails` -> `reasoning` |
| `experimental_continueSteps` | removed (use models with higher output token limits) |
| `stepType` on step results | removed (derive from step index / `toolResults`) |
| Temperature default `0` | no longer set by default; set `temperature: 0` explicitly |
| `experimental_activeTools` | `activeTools` |
| `experimental_prepareStep` | `prepareStep` (`{ steps, stepNumber, model }`; can return `model`, `activeTools`, `toolChoice`, `system`) |
| `experimental_wrapLanguageModel` | `wrapLanguageModel` |
| `experimental_generateMessageId` on `streamText` | `generateMessageId` on `toUIMessageStreamResponse` |
| `toolCallStreaming` option | removed; tool call streaming always enabled |

### Messages and types

| AI SDK 4.0 | AI SDK 5.0 |
| --- | --- |
| `CoreMessage` | `ModelMessage` |
| `Message`, `CreateMessage` | `UIMessage`, `CreateUIMessage` |
| `convertToCoreMessages` | `convertToModelMessages` |
| `message.content` | `message.parts` array (`{ type: 'text', text }`) |
| `role: 'data'` | removed; use data parts via `createUIMessageStream` (`writer.write({ type: 'data-custom', id, data })`) |
| `message.reasoning` | `{ type: 'reasoning', text }` part; part property `reasoning` -> `text` |
| file part `data` / `mimeType` | `url` / `mediaType` (`mimeType` -> `mediaType` in model messages too) |
| `experimental_attachments` | file parts in `parts` (text files: send as a text part for models that do not support text file parts) |
| `StreamData`, `writeMessageAnnotation`, `writeData`, `createDataStreamResponse` | removed; use `createUIMessageStream` + `createUIMessageStreamResponse` with data parts |
| `rawResponse` | `response` |
| `IDGenerator` | `IdGenerator`; `createIdGenerator` now requires a `size` argument (`createIdGenerator({ prefix: 'msg', size: 16 })`) |
| `RequestOptions` | `CompletionRequestOptions` |
| `@ai-sdk/ui-utils` | removed; exports moved to `ai` (`processDataStream` removed entirely; use `readUIMessageStream`) |

### Tools

| AI SDK 4.0 | AI SDK 5.0 |
| --- | --- |
| `parameters` | `inputSchema` |
| `experimental_toToolResultContent` | `toModelOutput` (no longer experimental) |
| tool call `args` / `result` | `input` / `output` |
| `ToolExecutionError` | removed; failures appear as `tool-error` content parts in result steps (and `tool-error` parts in streams) |
| `tool-invocation` UI part (`toolInvocation.toolName`) | typed parts `tool-${toolName}`; catch-all via `isToolUIPart(part)` + `getToolName(part)` |
| states `partial-call` / `call` / `result` | `input-streaming` / `input-available` / `output-available`; new `output-error` (`part.errorText`) |
| (new) dynamic tools | `dynamicTool({ description, inputSchema, execute })` with `unknown` input/output; MCP tools without schemas treated as dynamic; UI part `dynamic-tool`; check `toolCall.dynamic` first for type narrowing when iterating `toolCalls` / `toolResults` |
| `CoreToolCall`, `CoreToolResult`, `CoreToolResultUnion`, `CoreToolCallUnion`, `CoreToolChoice` (`@ai-sdk/provider-utils`) | `ToolCall`, `ToolResult`, `TypedToolResult`, `TypedToolCall`, `ToolChoice` |

### useChat and UI packages

| AI SDK 4.0 | AI SDK 5.0 |
| --- | --- |
| `ai/react` | `@ai-sdk/react` |
| `ai/rsc` | `@ai-sdk/rsc` (separate package) |
| `maxSteps` in `useChat` | removed; server-side `stopWhen`; client-side `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls` |
| `initialMessages` | `messages` |
| shared state via same `id` | pass a shared `Chat` instance (`useChat({ chat })`) |
| `api`, `credentials`, `headers` | `transport: new DefaultChatTransport({ api, credentials, headers })` |
| managed `input`, `handleInputChange`, `handleSubmit` | removed; manage input state yourself |
| `append` | `sendMessage({ text })` / `sendMessage({ parts })` |
| `reload` | `regenerate()` / `regenerate({ messageId })` |
| `onResponse` | removed (`useChat`, `useCompletion`) |
| `sendExtraMessageFields` | removed; now default |
| `keepLastMessageOnError` | removed |
| `ChatRequestOptions` `data`, `allowEmptySubmit` | removed; put data in `body` |
| `addToolResult({ toolCallId, result })` | `addToolOutput({ tool, toolCallId, output })` (`addToolResult` deprecated, removed in version 6) |
| `onToolCall` returning a value | must call `addToolOutput`; do not `await` it inside `onToolCall` when using `sendAutomaticallyWhen` (deadlock risk) |
| `isLoading` | removed; use `status` |
| `experimental_resume` | `resumeStream` |
| dynamic `body` | captured at first render; pass per-request via `sendMessage(msg, { body })` or use a function `body: () => ...` with a ref |
| `onFinish(message, { usage })` | usage via `messageMetadata` on `toUIMessageStreamResponse` (`part.type === 'finish'` -> `part.totalUsage`), read as `m.metadata?.totalUsage` |
| `experimental_prepareRequestBody` | `prepareSendMessagesRequest` on the transport |
| `useCompletion` `data` | removed |
| `useAssistant` | removed; use `useChat` (the hook was specific to the OpenAI Assistants API) |
| `@ai-sdk/vue` `useChat` composable | `Chat` class with `transport` (replaced; messages use `parts`). Note: 7.0 re-introduces a `useChat` composable and deprecates `Chat` |
| `@ai-sdk/svelte` `Chat({ api })` | `Chat(() => ({ transport }))`; properties readonly (use `setMessages`); managed input removed |
| `LangChainAdapter`, `LlamaIndexAdapter` (in `ai`) | `@ai-sdk/langchain`, `@ai-sdk/llamaindex` (`toUIMessageStream` + `createUIMessageStreamResponse`) |

### Streaming architecture

| AI SDK 4.0 | AI SDK 5.0 |
| --- | --- |
| single `text-delta` chunk with `textDelta` | `text-start` / `text-delta` (`delta`, with `id`) / `text-end` |
| `reasoning` single chunk | `reasoning-start` / `reasoning-delta` / `reasoning-end` |
| (new) tool input streaming | `tool-input-start` / `tool-input-delta` / `tool-input-end`, then `tool-call` |
| `file` chunk `chunk.file.mediaType` / `chunk.file.data` | flattened `chunk.mediaType` / `chunk.data` |
| `source` chunk `part.source.*` | flattened `part.sourceType`, `part.id`, `part.title`, `part.url` |
| `step-finish`, `finish.usage` | `finish-step`, `finish.totalUsage` |
| proprietary data stream protocol (`createDataStream`, `formatDataStreamPart`) | Server-Sent Events via `createUIMessageStream` |
| `pipeDataStreamToResponse`, `toDataStreamResponse` | `pipeUIMessageStreamToResponse`, `toUIMessageStreamResponse` |
| `DataStreamToSSETransformStream` | `JsonToSseTransformStream` |
| `getErrorMessage` | `onError` on `toUIMessageStreamResponse` (error messages are NOT sent to the client by default) |
| `appendClientMessage`, `appendResponseMessages` | `toUIMessageStreamResponse({ originalMessages, generateMessageId, onFinish: ({ messages, responseMessage }) => ... })`; always pass both `originalMessages` and `generateMessageId` to avoid duplicated assistant messages |

### Provider and model changes

| Provider | AI SDK 4.0 | AI SDK 5.0 |
| --- | --- | --- |
| Providers (language model interface) | `LanguageModelV3` / `LanguageModelV1Middleware` imported from `ai`; `usage: { promptTokens, completionTokens }`; `rawResponse` | import from `@ai-sdk/provider` (`LanguageModelV3`, `LanguageModelV3Middleware`); `usage: { inputTokens, outputTokens, totalTokens }` (`totalTokens` required); `response`; expanded `LanguageModelV3StreamPart` with start/delta/end and ids |
| OpenAI | default instance used Chat Completions | default instance uses the Responses API; `openai.chat(...)` / `openai.responses(...)` select explicitly |
| OpenAI | `strictSchemas` (default true) | `strictJsonSchema` (defaults to false; also on Chat Completions) |
| OpenAI | `openai('gpt-4.1', { structuredOutputs: true })` | `providerOptions.openai.structuredOutputs` (typed with `OpenAIChatLanguageModelOptions`) |
| OpenAI | `compatibility`, `useLegacyFunctionCalls` | removed (strict compatibility default) |
| OpenAI | `simulateStreaming` model option | `wrapLanguageModel({ model, middleware: simulateStreamingMiddleware() })` |
| Image models | model settings (`maxImagesPerCall`, `pollIntervalMillis`) | `maxImagesPerCall` top-level; provider-specific settings in `providerOptions` |
| Embeddings | `openai('text-embedding-3-small', { dimensions })` | `providerOptions.openai.dimensions`; `embedMany` makes parallel requests with `maxParallelCalls` |
| Google | `useSearchGrounding: true` | provider defined tool `google.tools.googleSearch({})` |
| Amazon Bedrock | snake_case options (`reasoning_config`) | camelCase (`reasoningConfig`) |

### Codemods

| Change | Codemod |
| --- | --- |
| Flatten streamText file properties | `v5/flatten-streamtext-file-properties` |
| ID generation size argument | `v5/require-createIdGenerator-size-argument` |
| IDGenerator -> IdGenerator | `v5/rename-IDGenerator-to-IdGenerator` |
| Import LanguageModelV3 from provider package | `v5/import-LanguageModelV3-from-provider-package` |
| Migrate to data stream protocol v2 | `v5/migrate-to-data-stream-protocol-v2` |
| Move image model maxImagesPerCall | `v5/move-image-model-maxImagesPerCall` |
| Move LangChain adapter | `v5/move-langchain-adapter` |
| Move maxSteps to stopWhen | `v5/move-maxsteps-to-stopwhen` |
| Move provider options | `v5/move-provider-options` |
| Move React to AI SDK | `v5/move-react-to-ai-sdk` |
| Move UI utils to AI | `v5/move-ui-utils-to-ai` |
| Remove experimental wrap language model / activeTools / prepareStep / continueSteps / temperature / truncate | `v5/remove-experimental-wrap-language-model`, `v5/remove-experimental-activetools`, `v5/remove-experimental-preparestep`, `v5/remove-experimental-continuesteps`, `v5/remove-experimental-temperature`, `v5/remove-experimental-truncate` |
| Remove experimental OpenAI options | `v5/remove-experimental-openai-compatibility`, `-legacy-function-calls`, `-structured-outputs`, `-store`, `-user`, `-parallel-tool-calls`, `-response-format`, `-logit-bias`, `-logprobs`, `-seed`, `-service-tier`, `-top-logprobs`, `-transform`, `-stream-options`, `-prediction` (each prefixed `v5/remove-experimental-openai`) |
| Remove experimental Anthropic options | `v5/remove-experimental-anthropic-caching`, `-computer-use`, `-pdf-support`, `-prompt-caching` |
| Remove experimental Google options | `v5/remove-experimental-google-search-grounding`, `-code-execution`, `-cached-content`, `-custom-headers` |
| Rename format / parse stream part | `v5/rename-format-stream-part`, `v5/rename-parse-stream-part` |
| Replace image type with file type | `v5/replace-image-type-with-file-type` |
| Replace LlamaIndex adapter | `v5/replace-llamaindex-adapter` |
| Replace onCompletion with onFinal | `v5/replace-oncompletion-with-onfinal` |
| Replace provider metadata with provider options | `v5/replace-provider-metadata-with-provider-options` |
| Replace rawResponse with response | `v5/replace-rawresponse-with-response` |
| Replace redacted reasoning type | `v5/replace-redacted-reasoning-type` |
| Replace simulate streaming | `v5/replace-simulate-streaming` |
| Replace textDelta with text | `v5/replace-textdelta-with-text` |
| Replace usage token properties | `v5/replace-usage-token-properties` |
| Restructure file / source stream parts | `v5/restructure-file-stream-parts`, `v5/restructure-source-stream-parts` |
| RSC package | `v5/rsc-package` |

## Notes

- Codemods may not cover all changes; manual edits may still be needed.
- The published page at tag `ai@7.0.142` shows some names in its 5.0 snippets that were later renamed (for example `isStepCount` in `stopWhen` examples, `LanguageModelV3` / `LanguageModelV3Middleware` in the provider-interface section); the 7.0 guide states `stepCountIs` -> `isStepCount` is a 7.0 rename. Treat those names as the page's text, not as 5.x export names. Placeholders `__MODEL__` / `__PROVIDER_IMPORT__` also appear in the snippets.
- If you have persisted messages in a database, also read `migration-guide-5-0-data.md`.
- Beta-only change documented on the page: between 5.0 betas, `fullStream` chunk types changed from `text` / `reasoning` to `text-delta` / `reasoning-delta` (beta.26 and later use `reasoning-delta`).
- `addToolResult` is deprecated in 5.0 and removed in version 6.
- Removed/renamed here that later majors changed again: `useChat` composable for Vue (re-introduced in 7.0), `experimental_prepareStep` / `experimental_activeTools` (deprecated in 5, removed in 7).
- The AI SDK 5 Migration MCP Server is a migration aid an agent connects to; it is unrelated to the MCP client APIs of the AI SDK itself (see tools-mcp category). For other MCP consumers see anthropic-api-tools-mcp, anthropic-claude-code-extend and openai-agents.

## Related

- [Migrate Your Data to AI SDK 5.0](./migration-guide-5-0-data.md)
- [Migrate AI SDK 5.x to 6.0](./migration-guide-6-0.md)
- [Versioning](./versioning.md)
