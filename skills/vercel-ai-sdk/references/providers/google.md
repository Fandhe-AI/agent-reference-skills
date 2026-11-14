---
source: https://ai-sdk.dev/providers/ai-sdk-providers/google
---

# Google

Use Google Gemini models through AI Gateway (recommended, plain model strings) or directly through the `@ai-sdk/google` provider (Generative AI API, Interactions API, Live realtime, embeddings, image, speech, decision models).

## Signature / Usage

```bash
npm i ai @ai-sdk/google
export GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text } = await generateText({
  model: google('gemini-4-argon'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

Customized instance: `import { createGoogle } from '@ai-sdk/google'; const google = createGoogle({ /* custom settings */ });`. Factories: `google(id)`, `google.interactions(id | { agent } | { managedAgent })`, `google.embedding(id)`, `google.image(id)`, `google.speech(id)`, `google.translation(id)`, `google.experimental_realtime(id)`, `google.decisionModel(id)`, `google.extractionModel(id)`, `google.tools.*`.

Via AI Gateway, pass a model string such as `'google/gemini-4-argon'`; Google model options go through `providerOptions.google`, and support depends on the model and serving provider. AI Gateway does not expose every API of `@ai-sdk/google` (for example `google.interactions(...)`).

## Options / Props

`createGoogle` settings (all optional):

| Name | Type | Description |
| --- | --- | --- |
| batchResultDownloads | object | Settings for file-based JSON Lines batch results (`maxLineBytes`, default 64 MiB). |
| baseURL | string | URL prefix. Default `https://generativelanguage.googleapis.com/v1beta`. |
| apiKey | `string \| PromiseLike<string> \| (() => string \| PromiseLike<string>)` | Sent in the `x-goog-api-key` header. Defaults to `GOOGLE_GENERATIVE_AI_API_KEY`. Pass a function to resolve credentials before each request, including when keys rotate; it can return a string or a promise, and credential caching and refresh are managed by the function. |
| headers | `Record<string,string>` | Custom headers. |
| fetch | `(input: RequestInfo, init?: RequestInit) => Promise<Response>` | Custom fetch implementation. |
| generateId | `() => string` | Function to generate unique IDs. |
| name | string | Custom provider name. Defaults to `'google.generative-ai'`. |

Provider options (`providerOptions.google`, validate with `GoogleLanguageModelOptions`):

| Name | Type | Description |
| --- | --- | --- |
| cachedContent | string | Name of cached content (`cachedContents/{cachedContent}`). |
| structuredOutputs | boolean | Enable structured output. Default `true`. When `false` Google still receives the JSON MIME type but not the schema. |
| safetySettings | `Array<{ category, threshold }>` | Categories `HARM_CATEGORY_UNSPECIFIED`, `_HATE_SPEECH`, `_DANGEROUS_CONTENT`, `_HARASSMENT`, `_SEXUALLY_EXPLICIT`, `_CIVIC_INTEGRITY`; thresholds `HARM_BLOCK_THRESHOLD_UNSPECIFIED`, `BLOCK_LOW_AND_ABOVE`, `BLOCK_MEDIUM_AND_ABOVE`, `BLOCK_ONLY_HIGH`, `BLOCK_NONE`, `OFF`. |
| responseModalities | string[] | `TEXT`, `IMAGE`, `AUDIO`; support is model-dependent. Text only by default. |
| thinkingConfig | `{ thinkingLevel?: 'minimal' \| 'low' \| 'medium' \| 'high' \| 'xhigh'; thinkingBudget?: number; includeThoughts?: boolean }` | `thinkingLevel` for Gemini 3 and later (3.1 Pro: low / medium / high; 3 Pro: low / high; 3 Flash: minimal / low / medium / high; Gemini 4 Hydrogen: low / medium / high / xhigh, `xhigh` only on Hydrogen); `thinkingBudget` for Gemini 2.5 (0 disables thinking if supported); `includeThoughts` returns thought summaries. |
| imageConfig | `{ aspectRatio?: string, imageSize?: string }` | Aspect ratios 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9; `imageSize` 1K (default), 2K, 4K. |
| audioTimestamp | boolean | Timestamp understanding for audio-only files. |
| mediaResolution | string | `MEDIA_RESOLUTION_UNSPECIFIED`, `_LOW`, `_MEDIUM`, `_HIGH`. |
| labels | `Record<string, string>` | Billing report labels. Vertex AI only. |
| serviceTier | `'standard' \| 'flex' \| 'priority'` | `'flex'` 50% cheaper at higher latency; `'priority'` ultra-low latency at a 75-100% premium; actual tier on `result.providerMetadata.google.serviceTier`. |
| continuationToken | string | Resumes a response that used up its `maxOutputTokens` budget (Gemini 4 long decode). |
| threshold | string | Standalone threshold setting, same values as the `safetySettings` threshold. |

Embedding options (`GoogleEmbeddingModelOptions`): `outputDimensionality` (number), `taskType` (`SEMANTIC_SIMILARITY`, `CLASSIFICATION`, `CLUSTERING`, `RETRIEVAL_DOCUMENT`, `RETRIEVAL_QUERY`, `QUESTION_ANSWERING`, `FACT_VERIFICATION`, `CODE_RETRIEVAL_QUERY`), `content` (per-value multimodal parts; `null` for text-only entries; length must match the values). Embedding models: `gemini-embedding-001` (3072 default dims, not multimodal), `gemini-embedding-2` and `gemini-embedding-2-preview` (multimodal).

Interactions options (`GoogleLanguageModelInteractionsOptions`): `previousInteractionId`, `store` (default `true`), `labels` (`Record<string, string>` sent in the top-level `labels` field, e.g. `{ safety_identifier: 'opaque_user_123' }`; Vertex AI Interactions models also read labels from `providerOptions.google`, not `providerOptions.googleVertex` or `providerOptions.vertex`), `agent`, `agentConfig` (`{ type: 'dynamic' }` or `{ type: 'deep-research', ... }`), `thinkingLevel` (`'minimal' \| 'low' \| 'medium' \| 'high' \| 'xhigh'`; overrides the top-level `reasoning` option; `xhigh` only on Gemini 4 Hydrogen), `thinkingSummaries` (`'auto' | 'none'`), `responseFormat` (array of text / image / audio / video entries), `imageConfig` (deprecated), `mediaResolution` (`'low' | 'medium' | 'high' | 'ultra_high'`), `serviceTier`, `systemInstruction`, `background`, `environment` (managed agents sandbox), `pollingTimeoutMs` (default 30 minutes).

### Tools and features

```ts
const { text, sources, providerMetadata } = await generateText({
  model: google('gemini-4-argon'),
  tools: {
    google_search: google.tools.googleSearch({}),
  },
  prompt: 'List the top 5 San Francisco news from the past week.',
});
```

- Provider-defined tools: `google.tools.googleSearch` (options `searchTypes` with `webSearch` / `imageSearch`, `timeRangeFilter` with `startTime` and `endTime` in ISO 8601; grounding metadata in `providerMetadata.google.groundingMetadata` with `webSearchQueries`, `searchEntryPoint`, `groundingSupports`), `google.tools.codeExecution({})`, `google.tools.fileSearch`, `google.tools.urlContext`, `google.tools.googleMaps`, plus Enterprise Web Search and RAG Engine Grounding sections (see the official page).
- Thinking: Gemini 3+ use `thinkingConfig.thinkingLevel`; Gemini 2.5 uses `thinkingConfig.thinkingBudget`. For `gemini-4-hydrogen` (including `gemini-4-hydrogen-eap`) use `reasoning: 'xhigh'` or `thinkingConfig: { thinkingLevel: 'xhigh' }` for maximum reasoning depth; Hydrogen defaults to `high` when the thinking level is unset. Following the November 11, 2026 update, `xhigh` matches the previous `high`, `high` matches the previous `medium`, and `medium` sits between `low` and the new `high`; `low` is unchanged. Re-run prompts tuned before that update to check reasoning quality.
- Long decode (Gemini 4 models such as `gemini-4-argon`): up to the shared 1M token context window; a single request generates at most 32,768 tokens without streaming and 65,536 with streaming; `maxOutputTokens` is a cumulative budget across requests and the provider continues automatically with a continuation token. `usage` is the sum over requests; use `providerMetadata.google.initialPromptTokenCount` for context window checks. Resume after `finishReason === 'length'` by resending the original request with `providerOptions.google.continuationToken` and a higher `maxOutputTokens`. With the Interactions API the AI SDK currently requires `background: true` for long decode (the server runs every request itself, `usage` covers all requests; set an explicit `maxOutputTokens` above 65,536 and keep `store` enabled); foreground client-side continuation is not yet supported. If `maxOutputTokens` is unset, `generateText` defaults to 32,768 tokens and `streamText` to 65,536 tokens for Interactions; reaching the limit finishes with `length`. The budget includes both thinking and output tokens; to retain the previous 64K budget for a non-streaming call set `maxOutputTokens: 65_536` explicitly. Long decode is not available with the Vertex AI Interactions API. When a response is continued automatically, `providerMetadata.google.groundingMetadataPerRequest` holds the grounding metadata from each request in order (`null` for a request without grounding metadata), keeping citation indices scoped to their original request; the existing `groundingMetadata` field keeps its behavior.
- File inputs: PDFs via `type: 'file'` parts; YouTube URLs (one per request, public or unlisted) are supported directly; pass `videoMetadata` through `providerOptions.google` on a video file part (also works with inline video data and uploaded file references) to clip a segment or control the frame rate: `startOffset` (string duration, e.g. `'60s'` or `'3.5s'`), `endOffset` (same format), `fps` (number in `(0, 24]`, default `1`); the AI SDK downloads other URLs unless they are `https://generativelanguage.googleapis.com/v1beta/files/` URLs.
- Caching: implicit caching (minimum 4096 tokens for Gemini 3 series, 2048 for Gemini 2.5 series) and explicit caching for Gemini 2.5 and 3 series; Gemini 4 Argon supports implicit caching only.
- Image outputs: Gemini image models (for example `gemini-3.1-flash-image-preview`) return images in `result.files`, or use `generateImage({ model: google.image('gemini-3.1-flash-image-preview') })` (calls the language model API with `responseModalities: ['IMAGE']`).
- Batch (experimental): every text request in a batch must use the same model; optional `webhookUrl` (the application verifies Google's dynamic webhook signature); creation bodies of 20 MB or more are uploaded as a JSONL file through the Gemini Files API.
- Realtime (experimental): `google.experimental_realtime('gemini-3.1-flash-live-preview')`; for a trusted server-owned connection `getServerWebSocketConfig()` uses the unconstrained Gemini Live endpoint with resolved API-key headers (use `createServerEventParser()` once per socket; completion-frame usage is attached to `response-done`, independently delivered usage uses `custom` events with `rawType: 'usageMetadata'` and typed `usage`, and gross totals never substitute for missing modality counts); short-lived token with `google.experimental_realtime.getToken({ model, sessionConfig })`; Live Translation with `gemini-3.5-live-translate-preview` and `providerOptions.google.translationConfig` (`targetLanguageCode` BCP-47, default `en`; `echoTargetLanguage`); `gemini-3.8-live` and `gemini-3.8-live-extended-thinking` are audio-only.
- Translation (experimental): `google.translation('gemini-3.5-live-translate-preview')` with `experimental_streamTranslate`; source language auto-detected; 24kHz 16-bit PCM output.
- Interactions API: `google.interactions('gemini-4-argon')` targets `POST /v1beta/interactions` (server-side state, built-in tools, agent presets, managed agents). Use `google(...)` for `:generateContent` / `:streamGenerateContent` and `google.interactions(...)` for the Interactions endpoint; pick one per model instance. Metadata `providerMetadata.google.interactionId` chains turns via `previousInteractionId`.
- Gemma models (`gemma-3-27b-it`, `gemma-3-12b-it`): system instructions are prepended to the first user message.
- Interactions reasoning: use the top-level `reasoning` option with `generateText` / `streamText` on Interactions models that support thinking levels; the provider maps it to `generation_config.thinking_level` using the model's supported levels (`xhigh` only on Gemini 4 Hydrogen; unsupported levels fall back to a supported level with a compatibility warning; `none` maps to the lowest supported level; models without thinking-level support and agent calls warn and omit the setting; omitting it or `'provider-default'` preserves the API default; an explicit `providerOptions.google.thinkingLevel` takes precedence).

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text } = await generateText({
  model: google.interactions('gemini-4-hydrogen'),
  reasoning: 'xhigh',
  prompt: 'What is AGI?',
});
```

- Speech: set `language` to a supported BCP-47 code such as `en-US` or `de-DE`; the provider forwards explicit codes unchanged as `speechConfig.languageCode` for single- and multi-speaker requests; omit it or set `'auto'` to let Gemini detect the language. Gemini TTS models do not support `speed` (passing it adds a warning to `result.warnings`).
- Decision models (experimental): `google.decisionModel('gemini-decision-1')` with `experimental_decide` calls the Gemini Decisions API directly (requires `v1beta`; not available on Vertex AI). Choice and Score answers include native probability distributions (Scores are probability-weighted positions on the zero-based ordered rubric); Boolean questions map to Google's `noul` type and expose calibrated P(true) as `probability` (between `0.01` and `0.99` during EAP). Confidence is at `result.providerMetadata.google.confidence` keyed by question ID, Score legends at `result.providerMetadata.google.legend`, usage modality details at `result.providerMetadata.google.usage`; token usage includes input tokens and zero output tokens; a safety-blocked request produces refusals surfaced as `Experimental_DecisionRefusalError`. State can contain text, JSON, images, audio, video and PDFs; every question requires instructions (a Boolean question may add `criteria: { true, false }`); Choice questions require 2-255 options, Score questions 2-255 non-empty level descriptions; question IDs 1-64 ASCII letters, digits, underscores or hyphens; Choice option IDs 1-128 characters without leading or trailing whitespace (Google sorts Choice IDs alphabetically and breaks exact probability ties in that order). `maxOutputTokens`, `reasoning` and `providerOptions.google.thinkingConfig` are unsupported and produce warnings; decisions do not use structured output or fall back to `generateContent`; the deprecated `evaluationModel` factory and `doEvaluate` method remain aliases.
- Extraction models (experimental): `google.extractionModel('gemini-4-hydrogen')` with `experimental_extract` wraps a Google language model and uses the Gemini API's structured output to extract typed fields in one call; returns `null` when the state has no value for a field and does not return `pNull`, `confidence`, `guess` or `source`; image and PDF files are passed to the language model, which must support them; requests `reasoning: 'none'` by default and forwards `providerOptions.google`.

```ts
import { google } from '@ai-sdk/google';
import { experimental_extract } from 'ai';

const { answers } = await experimental_extract({
  model: google.extractionModel('gemini-4-hydrogen'),
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

- Schema limitations: the API supports a subset of JSON Schema; very large or deeply nested schemas may fail with the generic error `Request contains an invalid argument.`. Simplify the schema, use `jsonSchema` with custom validation, or set `structuredOutputs: false` and describe the schema in the prompt (the AI SDK still validates the response against `Output.object`).
- Forward compatibility: unrecognized `gemini-*` model IDs and `-latest` aliases are treated like the newest supported Gemini generation (Gemini 3 request behavior for provider-defined and mixed tools, `thinkingLevel`, multimodal function responses, thought signatures); the model must still support each feature in the Google API.
- Long decode: dropped streams are not resumed automatically; retry from the start. Complex requests can run for several minutes (allow HTTP read timeouts of at least 15 to 20 minutes). Provider metadata is per call; keep thought signatures unchanged.
- Batch, realtime and translation are experimental and may change in patch releases.
- Model IDs and capability tables are copied as written in the source (not exhaustive; any provider model ID string is accepted). Package version at the pinned tag: `@ai-sdk/google` 4.0.121. The capability table now also lists `gemini-4-carbon` and `gemini-4-hydrogen` (Image Input, Object Generation, Tool Usage, Tool Streaming, Google Search and URL Context supported).
- Source: https://ai-sdk.dev/providers/ai-sdk-providers/google (ai@7.0.173)
- This is the AI SDK provider package; it is not a reference for the raw Gemini / Vertex APIs, and no dedicated Google API skill exists in this repository.

## Related

- [AI SDK Providers](./ai-sdk-providers.md)
- [AI Gateway](./ai-gateway.md)
- [Provider & Model Management](./provider-management.md)
