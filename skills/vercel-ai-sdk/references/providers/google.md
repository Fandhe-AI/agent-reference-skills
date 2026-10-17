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

Customized instance: `import { createGoogle } from '@ai-sdk/google'; const google = createGoogle({ /* custom settings */ });`. Factories: `google(id)`, `google.interactions(id | { agent } | { managedAgent })`, `google.embedding(id)`, `google.image(id)`, `google.speech(id)`, `google.translation(id)`, `google.experimental_realtime(id)`, `google.decisionModel(id)`, `google.tools.*`.

Via AI Gateway, pass a model string such as `'google/gemini-4-argon'`; Google model options go through `providerOptions.google`, and support depends on the model and serving provider. AI Gateway does not expose every API of `@ai-sdk/google` (for example `google.interactions(...)`).

## Options / Props

`createGoogle` settings (all optional):

| Name | Type | Description |
| --- | --- | --- |
| batchResultDownloads | object | Settings for file-based JSON Lines batch results (`maxLineBytes`, default 64 MiB). |
| baseURL | string | URL prefix. Default `https://generativelanguage.googleapis.com/v1beta`. |
| apiKey | string | Sent in the `x-goog-api-key` header. Defaults to `GOOGLE_GENERATIVE_AI_API_KEY`. |
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
| responseModalities | string[] | `TEXT`, `IMAGE`. Text only by default. |
| thinkingConfig | `{ thinkingLevel?: 'minimal' \| 'low' \| 'medium' \| 'high'; thinkingBudget?: number; includeThoughts?: boolean }` | `thinkingLevel` for Gemini 3 and later (3.1 Pro: low / medium / high; 3 Pro: low / high; 3 Flash: all four); `thinkingBudget` for Gemini 2.5 (0 disables thinking if supported); `includeThoughts` returns thought summaries. |
| imageConfig | `{ aspectRatio?: string, imageSize?: string }` | Aspect ratios 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9; `imageSize` 1K (default), 2K, 4K. |
| audioTimestamp | boolean | Timestamp understanding for audio-only files. |
| mediaResolution | string | `MEDIA_RESOLUTION_UNSPECIFIED`, `_LOW`, `_MEDIUM`, `_HIGH`. |
| labels | `Record<string, string>` | Billing report labels. Vertex AI only. |
| serviceTier | `'standard' \| 'flex' \| 'priority'` | `'flex'` 50% cheaper at higher latency; `'priority'` ultra-low latency at a 75-100% premium; actual tier on `result.providerMetadata.google.serviceTier`. |
| continuationToken | string | Resumes a response that used up its `maxOutputTokens` budget (Gemini 4 long decode). |
| threshold | string | Standalone threshold setting, same values as the `safetySettings` threshold. |

Embedding options (`GoogleEmbeddingModelOptions`): `outputDimensionality` (number), `taskType` (`SEMANTIC_SIMILARITY`, `CLASSIFICATION`, `CLUSTERING`, `RETRIEVAL_DOCUMENT`, `RETRIEVAL_QUERY`, `QUESTION_ANSWERING`, `FACT_VERIFICATION`, `CODE_RETRIEVAL_QUERY`), `content` (per-value multimodal parts; `null` for text-only entries; length must match the values). Embedding models: `gemini-embedding-001` (3072 default dims, not multimodal), `gemini-embedding-2` and `gemini-embedding-2-preview` (multimodal).

Interactions options (`GoogleLanguageModelInteractionsOptions`): `previousInteractionId`, `store` (default `true`), `agent`, `agentConfig` (`{ type: 'dynamic' }` or `{ type: 'deep-research', ... }`), `thinkingLevel`, `thinkingSummaries` (`'auto' | 'none'`), `responseFormat` (array of text / image / audio / video entries), `imageConfig` (deprecated), `mediaResolution` (`'low' | 'medium' | 'high' | 'ultra_high'`), `serviceTier`, `systemInstruction`, `background`, `environment` (managed agents sandbox), `pollingTimeoutMs` (default 30 minutes).

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
- Thinking: Gemini 3+ use `thinkingConfig.thinkingLevel`; Gemini 2.5 uses `thinkingConfig.thinkingBudget`.
- Long decode (Gemini 4 models such as `gemini-4-argon`): up to the shared 1M token context window; a single request generates at most 32,768 tokens without streaming and 65,536 with streaming; `maxOutputTokens` is a cumulative budget across requests and the provider continues automatically with a continuation token. `usage` is the sum over requests; use `providerMetadata.google.initialPromptTokenCount` for context window checks. Resume after `finishReason === 'length'` by resending the original request with `providerOptions.google.continuationToken` and a higher `maxOutputTokens`. With the Interactions API long decode requires `background: true` (not available with the Vertex AI Interactions API).
- File inputs: PDFs via `type: 'file'` parts; YouTube URLs (one per request, public or unlisted) are supported directly; the AI SDK downloads other URLs unless they are `https://generativelanguage.googleapis.com/v1beta/files/` URLs.
- Caching: implicit caching (minimum 4096 tokens for Gemini 3 series, 2048 for Gemini 2.5 series) and explicit caching for Gemini 2.5 and 3 series; Gemini 4 Argon supports implicit caching only.
- Image outputs: Gemini image models (for example `gemini-3.1-flash-image-preview`) return images in `result.files`, or use `generateImage({ model: google.image('gemini-3.1-flash-image-preview') })` (calls the language model API with `responseModalities: ['IMAGE']`).
- Batch (experimental): every text request in a batch must use the same model; optional `webhookUrl` (the application verifies Google's dynamic webhook signature); creation bodies of 20 MB or more are uploaded as a JSONL file through the Gemini Files API.
- Realtime (experimental): `google.experimental_realtime('gemini-3.1-flash-live-preview')`; short-lived token with `google.experimental_realtime.getToken({ model, sessionConfig })`; Live Translation with `gemini-3.5-live-translate-preview` and `providerOptions.google.translationConfig` (`targetLanguageCode` BCP-47, default `en`; `echoTargetLanguage`); `gemini-3.8-live` and `gemini-3.8-live-extended-thinking` are audio-only.
- Translation (experimental): `google.translation('gemini-3.5-live-translate-preview')` with `experimental_streamTranslate`; source language auto-detected; 24kHz 16-bit PCM output.
- Interactions API: `google.interactions('gemini-4-argon')` targets `POST /v1beta/interactions` (server-side state, built-in tools, agent presets, managed agents). Use `google(...)` for `:generateContent` / `:streamGenerateContent` and `google.interactions(...)` for the Interactions endpoint; pick one per model instance. Metadata `providerMetadata.google.interactionId` chains turns via `previousInteractionId`.
- Gemma models (`gemma-3-27b-it`, `gemma-3-12b-it`): system instructions are prepended to the first user message.
- Decision models (experimental): `google.decisionModel('gemini-4-argon')` with `experimental_decide`; Choice and Score answers have no probability distributions; Boolean P(true) is a prompted estimate.

## Notes

- Schema limitations: the API supports a subset of JSON Schema; very large or deeply nested schemas may fail with the generic error `Request contains an invalid argument.`. Simplify the schema, use `jsonSchema` with custom validation, or set `structuredOutputs: false` and describe the schema in the prompt (the AI SDK still validates the response against `Output.object`).
- Forward compatibility: unrecognized `gemini-*` model IDs and `-latest` aliases are treated like the newest supported Gemini generation (Gemini 3 request behavior for provider-defined and mixed tools, `thinkingLevel`, multimodal function responses, thought signatures); the model must still support each feature in the Google API.
- Long decode: dropped streams are not resumed automatically; retry from the start. Complex requests can run for several minutes (allow HTTP read timeouts of at least 15 to 20 minutes). Provider metadata is per call; keep thought signatures unchanged.
- Batch, realtime and translation are experimental and may change in patch releases.
- Model IDs and capability tables are copied as written in the source (not exhaustive; any provider model ID string is accepted). Package version at the pinned tag: `@ai-sdk/google` 4.0.97.
- This is the AI SDK provider package; it is not a reference for the raw Gemini / Vertex APIs, and no dedicated Google API skill exists in this repository.

## Related

- [AI SDK Providers](./ai-sdk-providers.md)
- [AI Gateway](./ai-gateway.md)
- [Provider & Model Management](./provider-management.md)
