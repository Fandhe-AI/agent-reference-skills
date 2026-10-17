---
source: https://ai-sdk.dev/providers/ai-sdk-providers/openai
---

# OpenAI

The `@ai-sdk/openai` provider: language models for the OpenAI Responses, Chat and Completion APIs, plus embedding, image, transcription, translation, speech, realtime and decision models.

## Signature / Usage

```bash
npm i @ai-sdk/openai
```

```ts
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: openai('gpt-6-astra'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

Customized instance:

```ts
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  // custom settings, e.g.
  headers: {
    'header-name': 'header-value',
  },
});
```

Factories: `openai(id)` / `openai.responses(id)` (Responses API, the default since AI SDK 5), `openai.chat(id)`, `openai.completion(id)` (only `gpt-3.5-turbo-instruct`), `openai.embedding(id)`, `openai.image(id)`, `openai.transcription(id)`, `openai.translation(id)`, `openai.speech(id)`, `openai.experimental_realtime(id)`, `openai.decisionModel(id)`, `openai.files()` and `openai.tools.*`.

## Options / Props

`createOpenAI` settings (all optional):

| Name | Type | Description |
| --- | --- | --- |
| batchResultDownloads | object | Settings for downloading JSON Lines batch results (`maxLineBytes`: default 64 MiB). Oversized rows throw `DownloadError`. |
| baseURL | string | URL prefix for API calls (proxies). Defaults to `OPENAI_BASE_URL`, then `https://api.openai.com/v1`. `openai('id')` uses the Responses API; for Chat Completions-only endpoints use `openai.chat('id')` or the OpenAI-compatible provider. |
| apiKey | string | Sent in the `Authorization` header. Defaults to `OPENAI_API_KEY`. |
| name | string | Provider name; defaults to `openai`. |
| organization | string | OpenAI Organization. |
| project | string | OpenAI project. |
| headers | `Record<string,string>` | Custom headers. |
| fetch | `(input: RequestInfo, init?: RequestInit) => Promise<Response>` | Custom fetch (defaults to global `fetch`). |

Responses provider options (`providerOptions.openai`, validate with `OpenAILanguageModelResponsesOptions`):

| Name | Type | Description |
| --- | --- | --- |
| parallelToolCalls | boolean | Parallel tool calls. Defaults to `true`. |
| store | boolean | Store the generation. Defaults to `true`. |
| passThroughUnsupportedFiles | boolean | Pass non-image file types as generic input files. Defaults to `false` (inline files restricted to images and PDFs). |
| maxToolCalls | integer | Max total calls to built-in tools in a response (across all built-in tools). |
| metadata | `Record<string, string>` | Metadata to store with the generation. |
| conversation | string | ID of an OpenAI Conversation to continue (create it first via the OpenAI API). Cannot be used with `previousResponseId`. |
| previousResponseId | string | ID of the previous response to continue a conversation. |
| instructions | string | Instructions for the model; can change the system/developer message when using `previousResponseId`. |
| logprobs | `boolean \| number` | Log probabilities (number 1-20 = top n). Increases response size. |
| user | string | End-user identifier for abuse monitoring. |
| reasoningEffort | `'none' \| 'minimal' \| 'low' \| 'medium' \| 'high' \| 'xhigh' \| 'max'` | Reasoning effort. Defaults to `medium`. Supported values vary by model. |
| reasoningEffortUpdate | `'none' \| 'low' \| 'medium' \| 'high' \| 'xhigh' \| 'max'` | GPT-6 and later: update reasoning effort starting with the current response, preserving the prompt prefix for caching. Requires standard single-agent mode; cannot be combined with automatic compaction or automatic truncation. |
| reasoningMode | `'standard' \| 'pro'` | GPT-5.6: how much model work is performed before the final answer. Default `'standard'`. |
| reasoningContext | `'auto' \| 'current_turn' \| 'all_turns'` | GPT-5.6: which reasoning items can be reused; effective value returned as `providerMetadata.openai.reasoningContext`. |
| reasoningSummary | `'auto' \| 'detailed' \| null` | Whether the model returns its reasoning. Defaults to `'detailed'` when `reasoningEffort` is not `'none'`; `null` omits summaries. |
| strictJsonSchema | boolean | Strict JSON schema validation. Defaults to `true`. |
| serviceTier | `'auto' \| 'flex' \| 'priority' \| 'fast' \| 'ultrafast' \| 'default'` | Service tier. Defaults to `'auto'`. `'flex'` 50% cheaper at higher latency; `'fast'` is the newer name for `'priority'`; `'ultrafast'` access-controlled (gpt-5.6-sol only). |
| textVerbosity | `'low' \| 'medium' \| 'high'` | Response verbosity. Defaults to `'medium'`. |
| include | `Array<string>` | Extra content: `['file_search_call.results']`, `['message.output_text.logprobs']`, `['reasoning.encrypted_content']`. |
| truncation | string | `auto` drops items from the start when over context; `disabled` (default) fails with 400. |
| promptCacheKey | string | Cache key for manual prompt caching control. |
| promptCacheOptions | object | GPT-5.6+: `mode` `'implicit'` or `'explicit'`, `ttl` only `'30m'`. |
| promptCacheRetention | `'in_memory' \| '24h'` | Legacy retention for models before GPT-5.6. |
| safetyIdentifier | string | Stable per-user identifier for policy-violation detection. |
| systemMessageMode | `'system' \| 'developer' \| 'remove'` | Role of the system message. Reasoning models convert `system` to `developer` by default. |
| forceReasoning | boolean | Treat the model as a reasoning model (for "stealth" reasoning models via a custom baseURL). |
| contextManagement | `Array<object>` | Server-side compaction: `{ type: 'compaction', compactThreshold: number }`. |
| compactionTrigger | boolean | Explicit server-side compaction; appends `{ type: 'compaction_trigger' }` to the Responses input. |
| allowedTools | `{ toolNames: string[], mode?: 'auto' \| 'required' }` | Restrict which declared tools the model may call while keeping the full tool list byte-identical (preserves prompt cache); Responses API only; overrides request-level `toolChoice`. |

Chat provider options (`OpenAILanguageModelChatOptions`): `logitBias`, `logprobs`, `parallelToolCalls`, `user`, `reasoningEffort`, `maxCompletionTokens`, `store`, `metadata`, `prediction`, `serviceTier`, `strictJsonSchema` (default `true`), `textVerbosity`, `promptCacheKey`, `promptCacheOptions`, `promptCacheRetention`, `safetyIdentifier`, `systemMessageMode`, `forceReasoning`. Completion options (`OpenAILanguageModelCompletionOptions`): `echo`, `logitBias`, `logprobs`, `suffix`, `user`. Embedding options (`OpenAIEmbeddingModelOptions`): `dimensions`, `user`. Speech options (`OpenAISpeechModelOptions`): `instructions` (not for `tts-1` / `tts-1-hd`), `speed` (0.25 to 4.0, default 1.0). Transcription options (`OpenAITranscriptionModelOptions`): `timestampGranularities` (`['word']`, `['segment']` default, or both), `language` (ISO-639-1), `prompt`, `temperature` (default 0), `include`, `responseFormat` (`'json' \| 'verbose_json' \| 'diarized_json'`), `chunkingStrategy` (`'auto'` or `{ type: 'server_vad', threshold, prefixPaddingMs, silenceDurationMs }`), `streaming` (`delay`, `include`; for `experimental_streamTranscribe`).

Responses metadata (`OpenaiResponsesProviderMetadata`): `responseId`, `logprobs`, `serviceTier`, `reasoningContext`.

## Built-in tools (Responses API)

```ts
const result = await generateText({
  model: openai('gpt-6-astra'),
  prompt: 'What happened in San Francisco last week?',
  tools: {
    web_search: openai.tools.webSearch({
      searchContextSize: 'high',
      filters: {
        allowedDomains: ['sfchronicle.com', 'sfgate.com'],
      },
    }),
  },
  // Force web search tool (optional):
  toolChoice: { type: 'tool', toolName: 'web_search' },
});
```

| Tool | Notes |
| --- | --- |
| `openai.tools.webSearch` | Options: `externalWebAccess` (default `true`), `searchContextSize` (`'low' \| 'medium' \| 'high'`), `userLocation` (`type: 'approximate'`, country, city, region, timezone), `filters.allowedDomains` / `blockedDomains` (up to 100 each, no HTTP/HTTPS prefix). `result.sources` exposes URLs; inline citations on `text.citations`. |
| `openai.tools.fileSearch` | `vectorStoreIds`, `maxNumResults`, `filters` (comparison `eq/ne/gt/gte/lt/lte/in/nin`, compound `and`/`or`), `ranking` (`ranker`, `scoreThreshold`); `include: ['file_search_call.results']`. |
| `openai.tools.imageGeneration` | e.g. `{ outputFormat: 'webp', quality: 'low' }`; `store: false` makes earlier generated images inaccessible. `gpt-image-2.5-flare` / `gpt-image-2.5-sunburst` needed for `xhigh` / `max` quality. |
| `openai.tools.codeInterpreter` | `container`: container ID string or `{ fileIds }`. |
| `openai.tools.mcp` | `serverLabel` (required), `serverUrl` or `connectorId`, `serverDescription`, `allowedTools` (names array or `{ readOnly, toolNames }`), `authorization`, `headers`, `requireApproval` (`'always' \| 'never' \| { never: { toolNames } }`). |
| `openai.tools.computer` | `execute({ actions, pendingSafetyChecks, status })` returns `{ output: { type: 'computer_screenshot', imageUrl \| fileId, detail }, acknowledgedSafetyChecks }`; actions: click, double_click, drag, keypress, move, screenshot, scroll, type, wait. |
| `openai.tools.localShell` | For Codex models; `execute({ action })` returns `{ output }`. |
| `openai.tools.shell` | Environments: local (default, `execute` returns stdout / stderr / outcome), `containerAuto` (`fileIds`, `memoryLimit` `'1g' \| '4g' \| '16g' \| '64g'`, `networkPolicy` disabled / allowlist with `domainSecrets`, `skills`), `containerReference` (`containerId`). |
| `openai.tools.applyPatch` | For GPT-5.1 models; `execute({ callId, operation })` returns `{ status: 'completed' \| 'failed', output? }`. |
| `openai.tools.toolSearch` | Hosted (no args; mark tools with `providerOptions.openai.deferLoading: true`) or client (`execution: 'client'`, `description`, `parameters`, `execute`). Namespaces via `providerOptions.openai.namespace` (same `name` and `description` within a namespace). |
| `openai.tools.customTool` | Returns a raw string optionally constrained by `format: { type: 'grammar', syntax: 'regex' \| 'lark', definition }` or `{ type: 'text' }`; optional `execute`. |
| `openai.tools.programmaticToolCalling` | Hosted JavaScript coordinating client-side function tools; opt functions in with `providerOptions.openai.allowedCallers` (`['direct']`, `['programmatic']`, both) and optional `outputSchema`. |

## Reasoning, caching and compaction

```ts
import {
  openai,
  type OpenAILanguageModelResponsesOptions,
} from '@ai-sdk/openai';
import { generateText } from 'ai';

const result = await generateText({
  model: openai.responses('gpt-6-astra'),
  messages: conversationHistory,
  providerOptions: {
    openai: {
      store: false,
      contextManagement: [{ type: 'compaction', compactThreshold: 50000 }],
    } satisfies OpenAILanguageModelResponsesOptions,
  },
});
```

- Mid-conversation effort changes: send an empty system message (`content: ''`) with `providerOptions.openai.reasoningEffortUpdate` and set `allowSystemInMessages: true`; keep request-level `reasoning` unchanged. Supported on GPT-6-family models with `reasoningMode: 'standard'`, no `contextManagement`, `truncation: 'disabled'`; updates cannot be consecutive; incompatible with automatic compaction (use `compactionTrigger`).
- Prompt caching: automatic for prompts of 1024 tokens or longer; `usage.inputTokenDetails.cacheReadTokens` (and `cacheWriteTokens` for GPT-5.6+); explicit breakpoints with `providerOptions.openai.promptCacheBreakpoint: { mode: 'explicit' }` on content blocks plus `promptCacheKey` and `promptCacheOptions`.
- Async tool calling (GPT-6 Astra and later): `providerOptions.openai.async: true` on a function tool (`OpenAIToolOptions`); the result is sent in a later request with the original `toolCallId`.
- WebSocket transport: `createWebSocketFetch()` from `ai-sdk-openai-websocket-fetch` passed as `createOpenAI({ fetch })`; only streaming `POST /responses` goes over the WebSocket.
- Image detail: `providerOptions.openai.imageDetail` (`'low' \| 'high' \| 'auto' \| 'original'`) on a file part.

## Other model types

- Batch (experimental): pass the OpenAI provider to the Batch API; every text request must use the same model; the OpenAI Batch API does not support per-batch webhooks (an unsupported warning is returned when `webhookUrl` is given).
- Realtime (experimental): `openai.experimental_realtime('gpt-realtime')` or `'gpt-live-1'`; `api: 'live' | 'realtime'` overrides model-ID selection; Realtime tokens via `openai.experimental_realtime.getToken({ model })`; Live does not use client-secret minting (calling `getToken` for Live rejects) and authenticates on a trusted server (browser WSS through an application-owned relay, or WebRTC SDP exchange via `liveModel.doCreateWebRTCSession`). Live options via `sessionConfig.providerOptions.openai` (`Experimental_OpenAIRealtimeModelLiveOptions`: `delegation`, `input`, `voice`, `store`, `client.dataChannel`).
- Embeddings: `openai.embedding('text-embedding-3-large')` (3072 default dimensions), `text-embedding-3-small` (1536), `text-embedding-ada-002` (1536, no custom dimensions).
- Images: `openai.image('gpt-image-2.5-sunburst')`; editing with `prompt: { text, images, mask }`; `gpt-image-*` models accept up to 16 input images (png / webp / jpg under 50MB). Metadata under `providerMetadata.openai.images`. Option types: `OpenAIImageModelGenerationOptions`, `OpenAIImageModelEditOptions`.
- Transcription: `gpt-4o-transcribe`, `whisper-1`, `gpt-4o-transcribe-diarize` (defaults to `diarized_json`), `gpt-realtime-whisper` (streaming only).
- Translation (experimental): `openai.translation('gpt-realtime-translate')` with `experimental_streamTranslate`; source language is auto-detected; 24kHz 16-bit PCM in and out.
- Speech: `openai.speech('gpt-4o-mini-tts')` with voices `alloy`, `ash`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, `shimmer`.
- Decision models (experimental): `openai.decisionModel('gpt-6-luna')` with `experimental_decide` (Choice, Score, Boolean questions); `OpenAIDecisionModelOptions` supports `safetyIdentifier` (up to 128 characters); refusals throw `InvalidResponseDataError`.

## Notes

- Since AI SDK 5 the Responses API is called by default (unless `openai.chat` is used).
- GPT-6 and later models do not support `temperature`, `topP`, `logprobs`, or the legacy `promptCacheRetention`; the provider removes them and returns a warning. Use the Responses API for GPT-6 tool calling.
- OpenAI structured outputs have limitations (for example optional schema properties are not supported); change Zod `.nullish()` / `.optional()` to `.nullable()`.
- When `requireApproval` is not set on `openai.tools.mcp`, tool calls are approved by default; connect only to trusted MCP servers. This built-in provider-defined MCP tool differs from the general MCP client (`createMCPClient`).
- Computer use and shell tools: run in an isolated environment and sandbox command execution (warnings on the official page). Treat generated programs and tool arguments of programmatic tool calling as untrusted.
- Three kinds of tools cannot be allow-listed through `allowedTools`: the tool search tool, tools marked `deferLoading`, and tools grouped into a namespace.
- Reasoning models with `openai.chat`: `maxOutputTokens` is mapped to `max_completion_tokens`; system messages are converted to developer messages when supported.
- Predicted outputs (`prediction`) are for `gpt-4o` / `gpt-4o-mini`, without tool calling support. `gpt-4o-audio-preview` accepts audio input (preview).
- `UIMessage` does not support `providerOptions`; use `convertToModelMessages` first when you need file-part `providerOptions` such as `imageDetail`.
- Realtime, translation, decision models and batch are experimental and may change in patch releases.
- Model IDs and capability tables are copied as written in the source (not exhaustive; any provider model ID string is accepted). Package version at the pinned tag: `@ai-sdk/openai` 4.0.95.
- This is the AI SDK provider package; the raw OpenAI APIs are covered by openai-api-core, openai-realtime-audio and openai-images-video.

## Related

- [OpenAI Compatible Providers](./openai-compatible-providers.md)
- [AI SDK Providers](./ai-sdk-providers.md)
- [AI Gateway](./ai-gateway.md)
- [Provider & Model Management](./provider-management.md)
