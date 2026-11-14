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

Factories: `openai(id)` / `openai.responses(id)` (Responses API, the default since AI SDK 5), `openai.chat(id)`, `openai.completion(id)` (only `gpt-3.5-turbo-instruct`), `openai.embedding(id)`, `openai.image(id)`, `openai.transcription(id)`, `openai.translation(id)`, `openai.speech(id)`, `openai.experimental_realtime(id)`, `openai.decisionModel(id)`, `openai.extractionModel(id)`, `openai.files()` and `openai.tools.*`.

## Options / Props

`createOpenAI` settings (all optional):

| Name | Type | Description |
| --- | --- | --- |
| batchResultDownloads | object | Settings for downloading JSON Lines batch results (`maxLineBytes`: default 64 MiB). Oversized rows throw `DownloadError`. |
| baseURL | string | URL prefix for API calls (proxies). Defaults to `OPENAI_BASE_URL`, then `https://api.openai.com/v1`. `openai('id')` uses the Responses API; for Chat Completions-only endpoints use `openai.chat('id')` or the OpenAI-compatible provider. |
| apiKey | `string \| PromiseLike<string> \| (() => string \| PromiseLike<string>)` | Sent in the `Authorization` header. Defaults to `OPENAI_API_KEY`. A function is called before each request and may return a promise; use it to supply refreshed credentials (a promise value resolves to the same key each time). |
| name | string | Provider name; defaults to `openai`. |
| organization | string | OpenAI Organization. |
| project | string | OpenAI project. |
| headers | `Record<string,string>` | Custom headers. |
| fetch | `(input: RequestInfo, init?: RequestInit) => Promise<Response>` | Custom fetch (defaults to global `fetch`). Also used to download remote input images and masks before uploading them to OpenAI; for untrusted URLs on Node.js pass a `guarded-fetch` transport. |

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
| textFormat | object | Overrides the request-level `text.format` while keeping `Output` parsing and validation unchanged: `{ type: 'text' }` or `{ type: 'json_schema', name, schema, description?, strict? }`. Keep the original format unchanged when replaying message-level `textFormatUpdate` controls. |
| serviceTier | `'auto' \| 'flex' \| 'priority' \| 'fast' \| 'ultrafast' \| 'default'` | Service tier. Defaults to `'auto'`. `'flex'` 50% cheaper at higher latency; `'fast'` is the newer name for `'priority'`; `'ultrafast'` access-controlled (gpt-5.6-sol only). |
| textVerbosity | `'low' \| 'medium' \| 'high'` | Response verbosity. Defaults to `'medium'`. |
| include | `Array<string>` | Extra content: `['file_search_call.results']`, `['message.output_text.logprobs']`, `['reasoning.encrypted_content']`. |
| truncation | string | `auto` drops items from the start when over context; `disabled` (default) fails with 400. |
| promptCacheKey | string | Cache key for manual prompt caching control. |
| promptCacheOptions | object | GPT-5.6+: `mode` `'implicit'` or `'explicit'`; `ttl` minimum cache lifetime `'30m'` (default) or `'12h'` (12-hour writes are billed at a higher rate; Chat models only support `'30m'`); `prewarm: true` writes the prompt to the cache without generating output; `comparisonResponseId` (a recent completed response ID from the same organization) requests cache diagnostics. |
| promptCacheRetention | `'in_memory' \| '24h'` | Legacy retention for models before GPT-5.6. |
| safetyIdentifier | string | Stable per-user identifier for policy-violation detection. |
| systemMessageMode | `'system' \| 'developer' \| 'remove'` | Role of the system message. Reasoning models convert `system` to `developer` by default. |
| forceReasoning | boolean | Treat the model as a reasoning model (for "stealth" reasoning models via a custom baseURL). |
| contextManagement | `Array<object>` | Server-side compaction: `{ type: 'compaction', compactThreshold: number }`. |
| compactionTrigger | boolean | Explicit server-side compaction; appends `{ type: 'compaction_trigger' }` to the Responses input. |
| allowedTools | `{ toolNames: string[], mode?: 'auto' \| 'required' }` | Restrict which declared tools the model may call while keeping the full tool list byte-identical (preserves prompt cache); Responses API only; overrides request-level `toolChoice`. |

Chat provider options (`OpenAILanguageModelChatOptions`): `logitBias`, `logprobs`, `parallelToolCalls`, `user`, `reasoningEffort`, `maxCompletionTokens`, `store`, `metadata`, `prediction`, `serviceTier`, `strictJsonSchema` (default `true`), `textVerbosity`, `promptCacheKey`, `promptCacheOptions`, `promptCacheRetention`, `safetyIdentifier`, `systemMessageMode`, `forceReasoning`. Completion options (`OpenAILanguageModelCompletionOptions`): `echo`, `logitBias`, `logprobs`, `suffix`, `user`. Embedding options (`OpenAIEmbeddingModelOptions`): `dimensions`, `user`. Speech options (`OpenAISpeechModelOptions`): `instructions` (not for `tts-1` / `tts-1-hd`), `speed` (0.25 to 4.0, default 1.0). Transcription options (`OpenAITranscriptionModelOptions`): `timestampGranularities` (`['word']`, `['segment']` default, or both), `language` (ISO-639-1), `prompt`, `temperature` (default 0), `include`, `responseFormat` (`'json' \| 'verbose_json' \| 'diarized_json'`), `chunkingStrategy` (`'auto'` or `{ type: 'server_vad', threshold, prefixPaddingMs, silenceDurationMs }`), `streaming` (`delay`, `include`; for `experimental_streamTranscribe`).

Responses metadata (`OpenaiResponsesProviderMetadata`): `responseId`, `logprobs`, `serviceTier`, `reasoningContext`, `promptCacheDiagnostics` (optional cache comparison result with `type` and, when supplied by OpenAI, `reason`, `cache_missed_tokens`, `comparison_reusable_tokens`; available on generation, streaming and batch results). Chat message provider options (`OpenAIChatMessageProviderOptions`): `name`.

### Built-in tools (Responses API)

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
| `openai.tools.webSearch` | `openai.tools.webSearchPreview()` is deprecated; use `webSearch()` (the `searchContextSize` and `userLocation` options are supported by both). Options: `externalWebAccess` (default `true`), `searchContextSize` (`'low' \| 'medium' \| 'high'`), `userLocation` (`type: 'approximate'`, country, city, region, timezone), `filters.allowedDomains` / `blockedDomains` (up to 100 each, no HTTP/HTTPS prefix). `result.sources` exposes URLs; inline citations on `text.citations`. |
| `openai.tools.fileSearch` | `vectorStoreIds`, `maxNumResults`, `filters` (comparison `eq/ne/gt/gte/lt/lte/in/nin`, compound `and`/`or`), `ranking` (`ranker`, `scoreThreshold`); `include: ['file_search_call.results']`. |
| `openai.tools.imageGeneration` | e.g. `{ outputFormat: 'webp', quality: 'low' }`; `store: false` makes earlier generated images inaccessible. `gpt-image-2.5-flare` / `gpt-image-2.5-sunburst` needed for `xhigh` / `max` quality. |
| `openai.tools.codeInterpreter` | `container`: a container ID string to reuse an existing container, or a configuration object to create a new one: `fileIds` (string[]), `memoryLimit` (`'1g' \| '4g' \| '16g' \| '64g'`), `networkPolicy` (`{ type: 'disabled' }` or `{ type: 'allowlist', allowedDomains, domainSecrets? }`). The organization's hosted tool settings must permit the requested network policy; an allowlist request cannot enable networking when the organization disables it. |
| `openai.tools.mcp` | `serverLabel` (required), exactly one of `serverUrl`, `connectorId` or `tunnelId` (configured OpenAI Secure MCP tunnel; cannot be combined with the others), `serverDescription`, `allowedTools` (names array or `{ readOnly, toolNames }`), `authorization`, `headers`, `requireApproval` (`'always' \| 'never' \| { never: { toolNames } }`). |
| `openai.tools.computer` | `execute({ actions, pendingSafetyChecks, status })` returns `{ output: { type: 'computer_screenshot', imageUrl \| fileId, detail }, acknowledgedSafetyChecks }`; actions: click, double_click, drag, keypress, move, screenshot, scroll, type, wait. |
| `openai.tools.localShell` | For Codex models; `execute({ action })` returns `{ output }`. |
| `openai.tools.shell` | Environments: local (default, `execute` returns stdout / stderr / outcome), `containerAuto` (`fileIds`, `memoryLimit` `'1g' \| '4g' \| '16g' \| '64g'`, `networkPolicy` disabled / allowlist with `domainSecrets`, `skills`), `containerReference` (`containerId`). |
| `openai.tools.applyPatch` | For GPT-5.1 models; `execute({ callId, operation })` returns `{ status: 'completed' \| 'failed', output? }`. |
| `openai.tools.toolSearch` | Hosted (no args; mark tools with `providerOptions.openai.deferLoading: true`) or client (`execution: 'client'`, `description`, `parameters`, `execute`). Namespaces via `providerOptions.openai.namespace` (same `name` and `description` within a namespace). Tools discovered by your own search function can be loaded with `providerOptions.openai.additionalTools` (see below). |
| `openai.tools.customTool` | Returns a raw string optionally constrained by `format: { type: 'grammar', syntax: 'regex' \| 'lark', definition }` or `{ type: 'text' }`; optional `execute`. |
| `openai.tools.programmaticToolCalling` | Hosted JavaScript coordinating client-side function tools; opt functions in with `providerOptions.openai.allowedCallers` (`['direct']`, `['programmatic']`, both) and optional `outputSchema`. |

### Reasoning, caching and compaction

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
- Preserving reasoning across turns: OpenAI may drop reasoning items after edits to the context that precedes them, which can increase reasoning token usage and reduce output quality. Preserve the original request settings and history and append changes where possible: use positioned configuration updates (`reasoningEffortUpdate`, `textFormatUpdate`); keep tool definitions stable (use `allowedTools` or `toolChoice` to restrict calls; `activeTools` changes the request's tool definitions); append trusted system messages with `allowSystemInMessages: true` instead of replacing earlier instructions; truncate tool results and downsize images or files before first sending them; prefer OpenAI compaction (with custom compaction place summary items as late as possible).
- Changing response formats mid-conversation: append an empty system message with `providerOptions.openai.textFormatUpdate` (same shape as `textFormat`); it emits a `configuration_update` input item. Keep the original request-level `textFormat` on every call and use `Output.object` with the current schema to parse and validate. Replay all earlier update messages in their original positions; to return to plain text append `textFormatUpdate: { type: 'text' }` and omit `Output.object` on that call. `textFormat` must agree with the effective format after all updates. Works with `streamText` and `previousResponseId`; shares the `reasoningEffortUpdate` restrictions. Combine `textFormatUpdate` and `reasoningEffortUpdate` in one empty system message (consecutive configuration updates are rejected, and request-level `reasoningEffortUpdate` should be omitted when using message-level format updates). After explicit compaction append a fresh update with the desired format and effort. For an existing conversation that began without `textFormat`, match the originally emitted `text.format` exactly (schema, normalization, name default `'response'`, strictness default `true`, description).

```ts
import {
  openai,
  type OpenAIResponsesSystemMessageOptions,
} from '@ai-sdk/openai';
import { generateText, Output, zodSchema, type ModelMessage } from 'ai';
import type { JSONValue } from '@ai-sdk/provider';
import { z } from 'zod/v4';

const model = openai.responses('gpt-6-astra');
const providerOptions = {
  openai: { store: false, textFormat: { type: 'text' as const } },
};
const messages: ModelMessage[] = [
  { role: 'user', content: 'Summarize 17 red crates and 26 blue crates.' },
];
const first = await generateText({ model, messages, providerOptions });
const schema = z.object({ totalCrates: z.number().int() });

messages.push(
  ...first.responseMessages,
  {
    role: 'system',
    content: '',
    providerOptions: {
      openai: {
        textFormatUpdate: {
          type: 'json_schema',
          name: 'crate_count',
          strict: true,
          schema: (await zodSchema(schema).jsonSchema) as Record<
            string,
            JSONValue
          >,
        },
      } satisfies OpenAIResponsesSystemMessageOptions,
    },
  },
  { role: 'user', content: 'How many crates are there altogether?' },
);

const second = await generateText({
  model,
  messages,
  allowSystemInMessages: true,
  providerOptions,
  output: Output.object({ schema }),
});
console.log(second.output);
messages.push(...second.responseMessages);
```

- Cache diagnostics: set `providerOptions.openai.promptCacheOptions.comparisonResponseId` to compare the current request with an earlier response; this requests a comparison, it does not load the earlier conversation or change caching. For streams, await `result.providerMetadata` after consuming the stream. Diagnostic types include `cache_hit`, `cache_miss`, `comparison_response_not_found`, and `unavailable`; diagnostics are best effort and missing or unavailable diagnostics do not fail the generation. A `cache_hit` means no miss was detected for that comparison; it does not prove reasoning retention or that all input tokens were cached (use `result.usage.inputTokenDetails.cacheReadTokens`).

```ts
const result = await generateText({
  model: openai.responses('gpt-6-astra'),
  messages,
  providerOptions: {
    openai: {
      promptCacheOptions: { comparisonResponseId: previousResponse.id },
    },
  },
});
console.log(result.providerMetadata?.openai?.promptCacheDiagnostics);
```

- Loading tools after an ordinary tool result: attach `providerOptions.openai.additionalTools` (`OpenAIResponsesToolResultOptions`) to your own search function's tool-result part; the Responses provider preserves the ordinary result and emits an `additional_tools` item immediately after it, and replaying the same messages preserves that insertion point. To add tools elsewhere, add an empty system message with `providerOptions.openai.additionalTools` at that point (requires `allowSystemInMessages: true`; can be combined with `reasoningEffortUpdate` or `textFormatUpdate` on the same message, the configuration update coming first). `additionalTools` accepts `type: 'function'` (`name`, `parameters`, optional `description`, `strict`, `defer_loading`), `type: 'custom'` (`name`, optional `description`, `format`) and `type: 'namespace'` (`name`, `description`, non-empty `tools` list of function definitions); an empty array emits no item. Mark the matching SDK tool with `providerOptions.openai.omitFromRequestTools: true` (`OpenAIToolOptions`) to omit only its top-level Responses tool definition; keep it in `tools` and `activeTools`, and use automatic tool choice for these functions (OpenAI cannot force or allow-list a tool absent from the top-level list). Supported for `generateText` and `streamText` (for streaming append `await result.responseMessages` when replaying); direct `@ai-sdk/openai` Responses requests only, AI Gateway support is not guaranteed.

```ts
import {
  openai,
  type OpenAIResponsesSystemMessageOptions,
} from '@ai-sdk/openai';

messages.push(
  {
    role: 'system',
    content: '',
    providerOptions: {
      openai: {
        additionalTools: [
          {
            type: 'function',
            name: 'get_weather',
            description: 'Get the weather for a city.',
            parameters: {
              type: 'object',
              properties: { city: { type: 'string' } },
              required: ['city'],
              additionalProperties: false,
            },
          },
        ],
      } satisfies OpenAIResponsesSystemMessageOptions,
    },
  },
  { role: 'user', content: 'What is the weather in Rome?' },
);

await generateText({
  model: openai.responses('gpt-5.4'),
  tools, // includes get_weather with omitFromRequestTools: true
  messages,
  allowSystemInMessages: true,
});
```

- Async tool calling (GPT-6 Astra and later): `providerOptions.openai.async: true` on a function tool (`OpenAIToolOptions`); the result is sent in a later request with the original `toolCallId`.
- WebSocket transport: `createWebSocketFetch()` from `ai-sdk-openai-websocket-fetch` passed as `createOpenAI({ fetch })`; only streaming `POST /responses` goes over the WebSocket.
- Prompt cache breakpoints on Responses models can set their own `ttl` (for example `{ mode: 'explicit', ttl: '12h' }`) to override the request-level `promptCacheOptions.ttl`.
- Image detail: `providerOptions.openai.imageDetail` (`'low' \| 'high' \| 'auto' \| 'original'`) on a file part.

### Other model types

- Batch (experimental): pass the OpenAI provider to the Batch API; every text request must use the same model; the OpenAI Batch API does not support per-batch webhooks (an unsupported warning is returned when `webhookUrl` is given).
- Realtime (experimental): `openai.experimental_realtime('gpt-realtime')` or `'gpt-live-1'` (`gpt-live-1`: continuous conversation, websocket and webrtc transports; `gpt-realtime`: turn-based, websocket); trusted server-owned connections via `getServerWebSocketConfig({ intent })` with conversation and transcription intents and normalized completion usage (use the same intent for connection setup and event serialization; OpenAI Live retains its conversation-only server connection API and duration snapshots); for Live, `await liveModel.getServerWebSocketConfig()` because connection settings resolve asynchronously when using an asynchronous API key supplier; `api: 'live' | 'realtime'` overrides model-ID selection; Realtime tokens via `openai.experimental_realtime.getToken({ model })`; Live does not use client-secret minting (calling `getToken` for Live rejects) and authenticates on a trusted server (browser WSS through an application-owned relay, or WebRTC SDP exchange via `liveModel.doCreateWebRTCSession`). Live options via `sessionConfig.providerOptions.openai` (`Experimental_OpenAIRealtimeModelLiveOptions`: `delegation`, `input`, `voice`, `store`, `client.dataChannel`).
- Embeddings: `openai.embedding('text-embedding-3-large')` (3072 default dimensions), `text-embedding-3-small` (1536), `text-embedding-ada-002` (1536, no custom dimensions).
- Images: `openai.image('gpt-image-2.5-sunburst')` (also `gpt-image-2.6-flare` and `gpt-image-2.6-sunburst`, which add `complexity` (`'low' \| 'medium' \| 'high'`, API default `high`), `outputFormat: 'gif'` for generation with `frameCount` (2-64, API default 9) and `frameDurationMs` (20-2000, API default 200), and `markup` for editing: a transparent PNG (HTTPS URL or base64 data URL) overlaid on the first input image; supported by `gpt-image-2.5-*` and `gpt-image-2.6-*`, cannot be combined with `mask`); GPT Image models accept `moderation` (`auto` default, `low` less restrictive) on edits as well as generations; all image options also accept `safetyIdentifier` (max 128 characters); editing with `prompt: { text, images, mask }`; `gpt-image-*` models accept up to 16 input images (png / webp / jpg under 50MB). Metadata under `providerMetadata.openai.images`. Option types: `OpenAIImageModelGenerationOptions`, `OpenAIImageModelEditOptions`.
- Transcription: `gpt-4o-transcribe`, `whisper-1` (defaults to `verbose_json`), `gpt-4o-transcribe-diarize` (defaults to `diarized_json`), `gpt-transcribe` (transcription and streaming; use `languages` and `keywords` for REST transcription, sent as repeated `languages[]` and `keywords[]` multipart fields; use `languages` instead of `language`, not both; both options currently apply to REST transcription only and produce unsupported-option warnings with `experimental_streamTranscribe`), `gpt-live-transcribe` (streaming only; `language` is sent as a single-entry `languages` list), `gpt-realtime-whisper` (streaming only). The shared `timestampGranularities: ['word', 'segment']` setting of `transcribe` works with `verbose_json` models such as Whisper; `providerOptions.openai.timestampGranularities` takes precedence, and if neither is set `verbose_json` defaults to segment timings. `timestamp_granularities` is sent only for `verbose_json`; `diarized_json` provides segment timings but no word timings; if the response has words but no segments, `segments` also contains those words.
- Translation (experimental): `openai.translation('gpt-realtime-translate')` with `experimental_streamTranslate`; source language is auto-detected; 24kHz 16-bit PCM in and out.
- Speech: `openai.speech('gpt-4o-mini-tts')` with voices `alloy`, `ash`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, `shimmer`.
- Decision models (experimental): `openai.decisionModel('gpt-6-luna')` with `experimental_decide` (Choice, Score, Boolean questions); `OpenAIDecisionModelOptions` supports `safetyIdentifier` (up to 128 characters) and `promptCacheKey` (partitions prompt cache reuse across requests sharing `state`); JSON state parts holding an object or an array of objects are sent as native `input_json` parts when they fit its limits (32 container levels, 10,000 values, 256 KiB of compact UTF-8 JSON); refusals throw `InvalidResponseDataError`.
- Extraction models (experimental): `openai.extractionModel('gpt-6.1-sol')` with `experimental_extract`; wraps an OpenAI language model and uses the Responses API's structured output to extract typed fields in one call. It returns `null` when the state has no value for a field and does not return `pNull`, `confidence`, `guess` or `source`; image and PDF files are passed to the language model, which must support them; it requests `reasoning: 'none'` by default (models without `'none'` use their lowest reasoning effort and return a compatibility warning) and forwards `providerOptions.openai`.

```ts
import { openai } from '@ai-sdk/openai';
import { experimental_extract } from 'ai';

const { answers } = await experimental_extract({
  model: openai.extractionModel('gpt-6.1-sol'),
  referenceDate: '2026-11-11',
  state: 'Invoice INV-2041. Total due $1,250.00 by March 3.',
  fields: {
    invoiceNumber: { type: 'text', instructions: 'The invoice number' },
    total: { type: 'number', instructions: 'Total due', decimals: 2 },
    dueDate: { type: 'date', instructions: 'Payment due date' },
  },
});
```

## Notes

- Since AI SDK 5 the Responses API is called by default (unless `openai.chat` is used).
- GPT-6 and later models do not support `temperature`, `topP`, `logprobs`, or the legacy `promptCacheRetention`; the provider removes them and returns a warning. Use the Responses API for GPT-6 tool calling.
- OpenAI structured outputs have limitations (for example optional schema properties are not supported); change Zod `.nullish()` / `.optional()` to `.nullable()`.
- When `requireApproval` is not set on `openai.tools.mcp`, tool calls are approved by default; connect only to trusted MCP servers. This built-in provider-defined MCP tool differs from the general MCP client (`createMCPClient`).
- Computer use and shell tools: run in an isolated environment and sandbox command execution (warnings on the official page). Treat generated programs and tool arguments of programmatic tool calling as untrusted.
- Some tools cannot be allow-listed through `allowedTools`: the tool search tool, tools marked `deferLoading` or `omitFromRequestTools`, and tools grouped into a namespace.
- Reasoning models with `openai.chat`: `maxOutputTokens` is mapped to `max_completion_tokens`; system messages are converted to developer messages when supported.
- Predicted outputs (`prediction`) are for `gpt-4o` / `gpt-4o-mini`, without tool calling support. `gpt-4o-audio-preview` accepts audio input (preview).
- `UIMessage` does not support `providerOptions`; use `convertToModelMessages` first when you need file-part `providerOptions` such as `imageDetail`.
- Reasoning effort support: GPT-5.6, GPT-6 Sol, GPT-6 Luna and GPT-6.1 Terra support `'none'`, `'low'`, `'medium'`, `'high'`, `'xhigh'` and `'max'`; GPT-6 Astra and GPT-6.1 Sol do not support `'none'`. Temperature and top P are conditional (only when reasoning effort is none) for the GPT-5.1+ / GPT-6 Luna / Sol / Terra / GPT-5.6 families and unsupported for GPT-6 Astra, GPT-6.1 Sol and `gpt-5` / `gpt-5-mini` / `gpt-5-nano` / `gpt-5-pro` / `gpt-5-codex` (per the official request capabilities table; this differs from the older prose above for the GPT-6 Luna / Sol models, where the official text was left as written).
- Structured-output refusals: the Responses API can answer with a `refusal` content part; the provider surfaces the explanation as text and reports a `content-filter` finish reason in `generateText` and `streamText` (`tool-calls` when the response also contains a client-side function call, so the tools still run). With structured output (`Output.object`), a refusal means no object can be generated and `generateText` throws `NoObjectGeneratedError` with the refusal text on `error.text` and `error.finishReason` of `'content-filter'`. Without structured output a plain-text decline arrives as ordinary text with a `stop` finish reason. The same applies to `openai.chat`; with logprobs requested, `providerMetadata.openai.logprobs` holds the content logprobs followed by the refusal logprobs.
- With non-streaming JSON output from `generateText`, when a response contains messages marked `phase: 'final_answer'`, only the last such message is parsed into `result.output` (`text`, `content`, response messages and usage still include the complete response).
- Chat Completions message names: set `providerOptions.openai.name` on a system, developer, user or assistant message (not on content parts or call-level options); non-string values are rejected, tool messages do not support names (omitted with an `unsupported` warning), and the default Responses model does not support them. Use pseudonyms rather than personal identifiers.
- Realtime, translation, decision models and batch are experimental and may change in patch releases.
- Model IDs and capability tables are copied as written in the source (not exhaustive; any provider model ID string is accepted). Package version at the pinned tag: `@ai-sdk/openai` 4.0.118.
- Speech `instructions` are supported by `gpt-4o-mini-tts` only; the official capability table now marks `tts-1` and `tts-1-hd` as not supporting `instructions`.
- The AI SDK uses AI Gateway by default for model strings (`AI_GATEWAY_API_KEY`); AI Gateway does not expose every API in `@ai-sdk/openai`, so use the direct provider for provider-specific APIs or custom connection settings. Gateway feature and provider-option support depends on the model and the provider serving the request.
- Source: https://ai-sdk.dev/providers/ai-sdk-providers/openai (ai@7.0.173)
- This is the AI SDK provider package; the raw OpenAI APIs are covered by openai-api-core, openai-realtime-audio and openai-images-video.

## Related

- [OpenAI Compatible Providers](./openai-compatible-providers.md)
- [AI SDK Providers](./ai-sdk-providers.md)
- [AI Gateway](./ai-gateway.md)
- [Provider & Model Management](./provider-management.md)
