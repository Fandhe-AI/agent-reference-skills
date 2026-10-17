---
source: https://ai-sdk.dev/docs/migration-guides/migration-guide-7-0
---

# Migrate AI SDK 6.x to 7.0

Breaking-change guide, codemod list and before/after snippets for upgrading from AI SDK 6.x to 7.0.

## Signature / Usage

Recommended process: back up the project (commit previous versions), upgrade to AI SDK 7.0, follow the breaking changes below, verify, commit.

```sh
pnpm install ai @ai-sdk/react @ai-sdk/openai @ai-sdk/otel
npx @ai-sdk/codemod v7
npx @ai-sdk/codemod v7/rename-system-to-instructions src/
```

An agent-driven path is also offered by the page:

```bash
npx skills add vercel/ai --skill migrate-ai-sdk-v6-to-v7
```

Highlights (AI SDK 6 -> AI SDK 7):

```tsx
// system -> instructions
const result = await generateText({
  model: yourModel,
  instructions: 'You are a helpful assistant.',
  prompt: 'Hello!',
});

// onFinish -> onEnd, onStepFinish -> onStepEnd, experimental_onStart -> onStart
const r2 = await generateText({
  model: yourModel,
  prompt: 'Hello!',
  onEnd: ({ text }) => {
    console.log(text);
  },
});

// fullStream -> stream (StreamTextResult returned by streamText)
const streamResult = streamText({
  model: yourModel,
  prompt: 'Hello!',
});

for await (const part of streamResult.stream) {
  console.log(part);
}

// OpenTelemetry moved to @ai-sdk/otel
import { registerTelemetry } from 'ai';
import { OpenTelemetry } from '@ai-sdk/otel';

registerTelemetry(new OpenTelemetry());
```

## Options / Props

### All packages

| Change | Detail |
| --- | --- |
| Minimum Node.js | Node.js 22 or later (tested on 22, 24, 26). Node.js 18 and 20 no longer supported. Node.js 22 reached end-of-maintenance on April 30, 2026; prefer Node.js 24 (LTS) or 26 for production. Update `engines` (`"node": ">=22"`). |
| ESM only | All packages are ESM-only; `require()` no longer supported. Switch to `import`, add `"type": "module"` or use `.mjs`. |

### Codemods (`npx @ai-sdk/codemod v7` runs all; `npx @ai-sdk/codemod <name> <path>` runs one)

| Codemod | Description |
| --- | --- |
| `remove-experimental-custom-provider` | `experimental_customProvider` -> `customProvider` |
| `remove-experimental-generate-image` | `experimental_generateImage` / `Experimental_GenerateImageResult` -> stable names |
| `replace-experimental-output-with-output` | `experimental_output` options and result access -> `output` |
| `remove-experimental-prepare-step` | `experimental_prepareStep` -> `prepareStep` |
| `replace-cached-input-tokens` | `usage.cachedInputTokens` -> `usage.inputTokenDetails.cacheReadTokens` |
| `replace-reasoning-tokens` | `usage.reasoningTokens` -> `usage.outputTokenDetails.reasoningTokens` |
| `remove-experimental-active-tools` | `experimental_activeTools` -> `activeTools` |
| `remove-tool-call-options-type` | removed `ToolCallOptions` -> `ToolExecutionOptions` |
| `remove-is-tool-or-dynamic-tool-uipart` | `isToolOrDynamicToolUIPart` -> `isToolUIPart` |
| `remove-media-content-part-type` | tool result content parts `type: 'media'` -> `type: 'file-data'` |
| `replace-anthropic-cache-creation-input-tokens` | Anthropic `cacheCreationInputTokens` metadata access -> standard usage fields |
| `rename-experimental-transcribe` | `experimental_transcribe` / `Experimental_TranscriptionResult` -> stable names |
| `rename-experimental-generate-speech` | `experimental_generateSpeech` / `Experimental_SpeechResult` -> stable names |
| `rename-call-settings-type` | `CallSettings` -> `LanguageModelCallOptions & Omit<RequestOptions, 'timeout'>` |
| `rename-step-count-is` | `stepCountIs` -> `isStepCount` |
| `rename-system-to-instructions` | `system` prompt options, lifecycle fields, repair-tool-call fields -> `instructions` |
| `rename-experimental-on-start-to-on-start` | `experimental_onStart` -> `onStart` |
| `rename-experimental-on-step-start-to-on-step-start` | `experimental_onStepStart` -> `onStepStart` |
| `rename-on-finish-to-on-end` | `onFinish` callbacks -> `onEnd` |
| `rename-on-step-finish-to-on-step-end` | `onStepFinish` callbacks -> `onStepEnd` |
| `rename-experimental-on-finish-to-on-end` | `experimental_onFinish` callbacks -> `onEnd` |
| `rename-experimental-telemetry-to-telemetry` | `experimental_telemetry` -> `telemetry` |
| `rename-on-rerank-finish-to-on-rerank-end` | telemetry `onRerankFinish` -> `onRerankEnd` |
| `rename-on-embed-finish-to-on-embed-end` | telemetry `onEmbedFinish` -> `onEmbedEnd` |
| `rename-full-stream-to-stream` | `streamText` result `fullStream` -> `stream` |
| `move-include-raw-chunks-to-include` | `includeRawChunks` -> `include.rawChunks` |
| `rename-experimental-include-to-include` | `experimental_include` -> `include` |
| `rename-experimental-on-tool-call-start-to-on-tool-execution-start` | `experimental_onToolCallStart` -> `onToolExecutionStart` |
| `rename-experimental-on-tool-call-finish-to-on-tool-execution-end` | `experimental_onToolCallFinish` -> `onToolExecutionEnd` |
| `rename-experimental-context-to-context` | tool callback `experimental_context` -> `context` |
| `rename-google-generative-ai-to-google` | Google provider names containing `GoogleGenerativeAI` -> `Google` |
| `replace-image-message-part-with-file` | image message parts -> file parts with `mediaType: 'image'` |

### Core API renames and removals

| AI SDK 6 | AI SDK 7 | Status of old name |
| --- | --- | --- |
| `experimental_customProvider` | `customProvider` | removed |
| `experimental_generateImage`, `Experimental_GenerateImageResult` | `generateImage`, `GenerateImageResult` | removed |
| `experimental_transcribe`, `Experimental_TranscriptionResult` | `transcribe`, `TranscriptionResult` | deprecated alias, removed in a future major |
| `experimental_generateSpeech`, `Experimental_SpeechResult` | `generateSpeech`, `SpeechResult` | deprecated alias, removed in a future major |
| `experimental_output` option and `result.experimental_output` | `output` / `result.output` | removed (deprecated since 6) |
| `CallSettings` | `LanguageModelCallOptions & Omit<RequestOptions, 'timeout'>` (`CallSettings` never included `timeout`) | deprecated type remains available |
| `stepCountIs` | `isStepCount` | renamed |
| `experimental_prepareStep` | `prepareStep` | removed (deprecated since 5) |
| `experimental_activeTools` | `activeTools` | removed (deprecated since 5) |
| `ToolCallOptions` | `ToolExecutionOptions` | removed |
| `isToolOrDynamicToolUIPart` | `isToolUIPart` | removed |
| `{ type: 'media' }` tool result content part | `{ type: 'file', mediaType, data: { type: 'data', data } }` | removed |
| `LanguageModelUsage.cachedInputTokens` / `reasoningTokens` | `inputTokenDetails.cacheReadTokens` / `outputTokenDetails.reasoningTokens` | removed |

### Prompts and step preparation

| Change | Detail |
| --- | --- |
| `system` -> `instructions` | Applies to functions accepting `prompt` or `messages` (`generateText`, `streamText`, `generateObject`, `streamObject`, `streamUI`), to `prepareStep` results, to `experimental_repairToolCall` options and to lifecycle events. `system` still accepted as deprecated fallback; `instructions` wins when both are given. |
| `prepareStep` instructions carry forward | Instructions returned from `prepareStep` are used in later steps until another `instructions` / `system` override is returned (in 6 they applied to the current step only). `prepareStep` receives `instructions` and `initialInstructions`. |
| `prepareStep` messages carry forward | Returned `messages` become the base for subsequent steps (plus previous step response messages). To keep the 6 behaviour rebuild from `initialMessages` + `responseMessages`. |
| System messages rejected | `role: 'system'` messages in `prompt` / `messages` are rejected by default. Move them to `instructions`, or opt in with `allowSystemInMessages: true` (trusted messages only). |

### Lifecycle events

| AI SDK 6 | AI SDK 7 | Notes |
| --- | --- | --- |
| `experimental_onStart` | `onStart` | `generateText`, `streamText`, agents |
| `experimental_onStepStart` | `onStepStart` | |
| `onFinish` | `onEnd` | also `Agent.generate()`, `Agent.stream()`, `ToolLoopAgent` settings; `onFinish` kept as deprecated alias; `onEnd` wins |
| `onStepFinish` | `onStepEnd` | also `generateObject`, `streamObject`, agents, workflow agents, UI message stream helpers; telemetry integrations should implement `onStepEnd`; `onStepFinish` kept as deprecated alias |
| `embed` / `embedMany` `experimental_onFinish` | `onEnd` | |
| `rerank` `experimental_onFinish` | `onEnd` | |
| `experimental_onToolCallStart` / `experimental_onToolCallFinish` | `onToolExecutionStart` / `onToolExecutionEnd` | old names deprecated aliases, fallback only when new names absent |

### Result shape changes

| Change | Detail |
| --- | --- |
| Usage on results | `usage` on `generateText` / `streamText` results is now total usage across all steps (formerly `totalUsage`, now deprecated). Use `finalStep.usage` for the previous final-step-only value. |
| Accumulated properties | `content`, `toolCalls`, `staticToolCalls`, `dynamicToolCalls`, `toolResults`, `staticToolResults`, `dynamicToolResults`, `files`, `sources`, `warnings` now accumulate across every step. Use `finalStep` for final-step-only values (for `streamText`, `await result.finalStep` first). |
| Final-step properties | Top-level `reasoning`, `reasoningText`, `request`, `response`, `providerMetadata` are deprecated; read them from `result.finalStep`. Aliases still work. |
| `onEnd` event | Follows the same changes (`usage` all steps, `finalStep` for final-step values). |
| `step.response.messages` | Now only contains the response messages of that step (no longer accumulated). Use `result.responseMessages` for the full history (also includes messages produced before the first model step, e.g. tool results of approved tool calls in the input messages). |
| Request / response bodies | `generateText` / `streamText` no longer include request bodies in step results by default; `generateText` also no longer includes response bodies. Opt in with `include: { requestBody: true, responseBody: true }` (`streamText`: `requestBody` only). |

### Streaming and include

| Change | Detail |
| --- | --- |
| `fullStream` -> `stream` | `StreamTextResult.fullStream` renamed `stream`; `fullStream` kept as deprecated alias. |
| `onChunk` | `streamText` now calls `onChunk` for every `TextStreamPart` (including `start`, `start-step`, `text-start`, `text-end`, `reasoning-start`, `reasoning-end`, `tool-input-end`, `finish-step`, `finish`, `abort`, `error`); guard chunk types you handle. |
| `includeRawChunks` | Deprecated; use `include.rawChunks`. |
| `experimental_include` | Stable as `include` (`generateText`, `streamText`, `ToolLoopAgent`); `include` wins when both given. |

### Telemetry

| Change | Detail |
| --- | --- |
| OpenTelemetry moved | Span collection is no longer built into `ai`. Install `@ai-sdk/otel` and call `registerTelemetry(new OpenTelemetry())` once at startup (Next.js: `instrumentation.ts`). |
| Opt-out by default | Once an integration (e.g. `OpenTelemetry`, `DevToolsTelemetry`) is registered, all calls emit telemetry. `experimental_telemetry: { isEnabled: true }` is redundant; `isEnabled: false` opts out per call; not registering any integration only stops delivery to globally registered integrations; per-call `telemetry.integrations` and Node.js tracing-channel subscribers still receive events, so pass `telemetry: { isEnabled: false }` on every call to disable telemetry events entirely (see operations/telemetry.md). Keep other fields like `functionId`. |
| `tracer` removed | Pass a custom OpenTelemetry `Tracer` to `new OpenTelemetry({ tracer })` instead. Default uses `trace.getTracer('ai')`. |
| `experimental_telemetry` -> `telemetry` | Old name works as deprecated alias; mixed usage supported during the deprecation window. Applies to `generateText`, `streamText`, `generateObject`, `streamObject`, `embed`, `embedMany`, `rerank`, `ToolLoopAgent`, `WorkflowAgent`. |
| `onRerankFinish` / `onEmbedFinish` | Renamed `onRerankEnd` / `onEmbedEnd` (telemetry integration callbacks and the `type` emitted on `AI_SDK_TELEMETRY_TRACING_CHANNEL`). |

### Tools

| Change | Detail |
| --- | --- |
| `experimental_context` -> `context` | Tool callbacks get a per-tool `context` typed from the tool's `contextSchema` and supplied through `toolsContext` (keyed by tool name). Shared generation/agent data flows through `runtimeContext` (rename shared top-level `context` and `prepareStep` `context` to `runtimeContext`). If any tool declares `contextSchema`, `toolsContext` becomes required. |
| `needsApproval` deprecated | On `tool()` / `dynamicTool()`; move to the `toolApproval` setting on `generateText` / `streamText` / `ToolLoopAgent`. `needsApproval: true` -> `toolApproval: { myTool: 'user-approval' }`; function form -> per-tool `SingleToolApprovalFunction` or generic `toolApproval` callback. |
| Tool result content | `image-*` and legacy `file-*` variants (`file-data`, `file-url`, `file-reference`, `image-data`, `image-url`, `image-file-reference`, `file-id`, `image-file-id`) deprecated in favor of one `file` variant with `mediaType` and tagged `data` (`{ type: 'data' \| 'url' \| 'reference', ... }`). Auto-migrated at runtime. `mediaType` accepts a full IANA type or a top-level segment (`'image'`, `'audio'`, `'video'`, `'text'`). |

### UI messages and message parts

| Change | Detail |
| --- | --- |
| `{ type: 'image', image, mediaType? }` user content part | Deprecated; use `{ type: 'file', mediaType: 'image', data: bytes }`. |
| `reasoning-file` content type | Files returned in a reasoning trace are a distinct `reasoning-file` part; update exhaustive part handling. Files in reasoning no longer duplicate into `result.files` / `step.files`. |
| Reasoning configuration | New top-level `reasoning` option is provider-agnostic; remove overlapping reasoning settings from `providerOptions` (provider-specific settings take precedence and can silently bypass the top-level option). |

### Stream response helpers

The `streamText` result methods `toUIMessageStream`, `toUIMessageStreamResponse`, `pipeUIMessageStreamToResponse`, `toTextStreamResponse`, `pipeTextStreamToResponse` are deprecated (still work with deprecation warnings; removed in the next major). Use the stateless helpers exported from `'ai'`:

```tsx
import { createUIMessageStreamResponse, toUIMessageStream } from 'ai';

const uiStream = toUIMessageStream({
  stream: result.stream,
  generateMessageId,
  originalMessages,
  onFinish,
});

return createUIMessageStreamResponse({
  stream: uiStream,
});
```

| AI SDK 6 | AI SDK 7 |
| --- | --- |
| `result.toUIMessageStream(opts)` | `toUIMessageStream({ stream: result.stream, ... })` |
| `result.toUIMessageStreamResponse(opts)` | `createUIMessageStreamResponse({ stream: toUIMessageStream({...}) })` |
| `result.pipeUIMessageStreamToResponse(response, opts)` | `pipeUIMessageStreamToResponse({ stream: toUIMessageStream({...}), response })` |
| `result.toTextStreamResponse()` | `createTextStreamResponse({ stream: toTextStream({ stream: result.stream }) })` |
| `result.pipeTextStreamToResponse(response)` | `pipeTextStreamToResponse({ response, stream: toTextStream({ stream: result.stream }) })` |

### Provider packages

| Package | Change |
| --- | --- |
| `@ai-sdk/mcp` (MCP package) | `redirect` on `MCPTransportConfig` (HTTP and SSE) now defaults to `'error'` instead of `'follow'` (SSRF protection). Set `redirect: 'follow'` if your server relies on redirects. |
| `@ai-sdk/vue` | `Chat` class deprecated in favor of the new `useChat` composable (reactive `messages`, `status`, `error`; recreates the chat when its init object changes; pass a getter or ref to make the init reactive). `Chat` still works as deprecated export. |
| OpenAI (Responses) | Setting `reasoning` or `providerOptions.openai.reasoningEffort` to a value other than `'none'` now defaults `providerOptions.openai.reasoningSummary` to `'detailed'`. Set it to `null` to keep summaries disabled. |
| Anthropic | `providerMetadata.anthropic.cacheCreationInputTokens` removed (also in `@ai-sdk/google-vertex/anthropic`). Use `result.usage.inputTokenDetails.cacheWriteTokens` / `cacheReadTokens`. Raw payload still at `result.finalStep.providerMetadata?.anthropic?.usage`. |
| Google | Every type, class and function containing `GoogleGenerativeAI` renamed to `Google` (e.g. `createGoogleGenerativeAI` -> `createGoogle`, `GoogleGenerativeAIProvider` -> `GoogleProvider`). Old names work as deprecated aliases; the `google` constant is unchanged. |
| xAI | `xai(modelId)` / `xai.languageModel(modelId)` now use the xAI Responses API by default instead of Chat Completions. Use `xai.chat(modelId)` for Chat Completions. |

## Notes

- Page structure: Recommended Migration Process, Codemods, Codemod Table, All Packages, AI SDK Core (renames/removals, prompts and step preparation, lifecycle events, usage and result shape, telemetry, streaming and include, result messages, tools, UI messages, content parts, reasoning, multi-step result shape, stream response helpers), MCP Package, Vue Package, OpenAI / Anthropic / Google / xAI providers, Migration Skill.
- `experimental_context` removal has several potential breakages (split `runtimeContext` vs `toolsContext`, TypeScript errors for undeclared context fields, helper types must accept a generic `CONTEXT`); see the official page for the full list.
- Codemods are a help, not complete coverage; manual changes may still be needed.
- The `npx skills add vercel/ai --skill migrate-ai-sdk-v6-to-v7` skill is the official agent-facing distribution path and is separate from this skill (see the `coding-agents` page in foundations).
- Pinned `ai` 7.0.142: this guide describes the 6.x -> 7.0 changes as published at tag `ai@7.0.142`.

## Related

- [Migrate AI SDK 5.x to 6.0](./migration-guide-6-0.md)
- [Versioning](./versioning.md)
- [Migrate Your Data to AI SDK 5.0](./migration-guide-5-0-data.md)
