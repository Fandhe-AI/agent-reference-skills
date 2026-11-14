---
source: https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway
---

# AI Gateway

The AI Gateway provider (part of the `ai` package; `gateway` / `createGateway`) connects to models from multiple AI providers through a single interface, with model strings in `creator/model-name` format.

## Signature / Usage

```ts
// use plain model string with global provider
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-6-astra',
  prompt: 'Hello world',
});
```

```ts
// use provider instance (requires version 5.0.36 or later)
import { generateText, gateway } from 'ai';

const { text } = await generateText({
  model: gateway('openai/gpt-6-astra'),
  prompt: 'Hello world',
});
```

Custom provider instance:

```ts
import { createGateway } from 'ai';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
});
```

Features: access models from multiple providers without installing extra provider modules; same code across providers; automatic authentication when deployed on Vercel; pricing information; observability through the Vercel dashboard. The AI SDK automatically uses the AI Gateway when a model string in `creator/model-name` format is passed.

## Options / Props

`createGateway` settings (all optional):

| Name | Type | Description |
| --- | --- | --- |
| batchResultDownloads | object | Settings for downloading JSON Lines batch results. `maxLineBytes` (number): maximum UTF-8 bytes per row excluding the LF delimiter; defaults to 64 MiB (67,108,864 bytes); must be a positive safe integer; oversized rows throw a `DownloadError` and cancel the download. |
| baseURL | string | URL prefix for API calls. Default `https://ai-gateway.vercel.sh/v4/ai`. |
| apiKey | `string \| PromiseLike<string> \| (() => string \| PromiseLike<string>)` | API key or Vercel access token sent in the `Authorization` header. Defaults to the `AI_GATEWAY_API_KEY` environment variable. Supports AI Gateway API keys, Vercel personal access tokens, and Vercel app access tokens. Pass a callback to resolve the API key before each request; it can return a string or a promise, and token caching and renewal are handled by the caller. A callback or promise selects API key authentication and must resolve to a non-empty string; lookup failures do not switch authentication methods. |
| teamIdOrSlug | string | Vercel team ID or slug used to scope model requests with multi-team Vercel access tokens. |
| headers | `Record<string,string>` | Custom headers. |
| fetch | `(input: RequestInfo, init?: RequestInit) => Promise<Response>` | Custom fetch implementation. Defaults to global `fetch`. |
| metadataCacheRefreshMillis | number | How frequently to refresh the metadata cache. Defaults to 5 minutes (300,000ms). |

`providerOptions.gateway` (`GatewayProviderOptions`, exported from `@ai-sdk/gateway`):

| Name | Type | Description |
| --- | --- | --- |
| order | string[] | Sequence of providers to attempt; moves to the next if one fails or is unavailable. Without any routing options, AI Gateway picks providers based on recent uptime and latency and falls back to other providers that serve the same model. |
| only | string[] | Restricts routing to only the specified providers. Because unlisted providers are never tried, the request fails instead of falling back when the listed providers are unavailable; when the requirement is about data handling or a model capability, `zeroDataRetention`, `disallowPromptTraining`, or `has` filter by that requirement while keeping every qualifying provider eligible. |
| sort | `'cost' \| 'ttft' \| 'tps'` | Sorts available providers before routing: lowest cost first, lowest time-to-first-token first, highest tokens-per-second first. When combined with `order`, user-specified providers are promoted to the front. When active, `providerMetadata.gateway.routing.sort` holds the sort used, the execution order, per-provider metrics, and deprioritized providers. |
| models | `string[] \| [GatewayModelFallback, ...string[]]` | Fallback models in attempt order. Decision requests can start the list with one conditional `{ model, when }` entry (only first entry, only one allowed; rejected on non-decision requests). |
| user | string | End-user identifier for spend tracking and attribution. |
| tags | string[] | Tags for categorizing and filtering usage in reports. |
| byok | `Record<string, Array<Record<string, unknown>>>` | Request-scoped BYOK credentials; cached gateway BYOK credentials are not considered; may still fall back to system credentials. Credentials may include `modelMappings`. |
| zeroDataRetention | boolean | Restricts routing to providers with zero data retention agreements with Vercel. BYOK credentials skipped by default. Request fails if no ZDR-eligible credentials. Request-level ZDR only for Vercel Pro and Enterprise plans. |
| disallowPromptTraining | boolean | Restricts routing to providers with agreements not to train on prompts. Not applied with BYOK; request fails if no provider available. |
| headquarters | string[] | Restricts routing to providers whose parent company is headquartered in the listed countries, given as ISO 3166-1 alpha-2 codes (for example `['US', 'DE']`). To exclude countries instead, prefix every code with `!`, as in `['!US']`; a list can't mix allowed and excluded countries. Applies to both BYOK and system credentials. Providers without a recorded headquarters country are always excluded; the request fails if no provider for the model is headquartered in an allowed country. |
| quotaEntityId | string | Entity against which quota is tracked and enforced. |
| has | Array of `'implicit-caching' \| 'reasoning' \| 'structured-output' \| 'tool-use' \| 'vision' \| `quantization:${string}` \| `!quantization:${string}`` | Restricts routing to provider models with all capabilities. Applies to BYOK and system credentials. Request fails if none satisfy. |
| providerTimeouts | object | Per-provider timeouts for BYOK credentials in ms, e.g. `providerTimeouts: { byok: { openai: 5000, anthropic: 2000 } }`. |
| serviceTier | `'flex' \| 'priority'` | Unified service tier intent translated to each provider's option; overrides any tier set in per-provider options. Leave unset for provider default. |

Conditional fallback conditions: `{ question, confidenceBelow }` (Choice / Score), `{ question, probabilityBetween: [min, max] }` (Boolean, P(true), inclusive bounds within `[0, 1]`), combined with `{ any }`, `{ all }`, `{ atLeast: { count, conditions } }`; 1 to 20 conditions per list, nesting up to 5 levels, question IDs 1 to 256 characters.

### Authentication

- API key: `AI_GATEWAY_API_KEY` environment variable, or `createGateway({ apiKey })`.
- Vercel access token for model requests: pass a personal / app access token as `apiKey`, plus `teamIdOrSlug` for multi-team tokens. `apiKey` takes precedence over `AI_GATEWAY_API_KEY` and OIDC.
- OIDC (Vercel deployments): handled automatically in production / preview. Locally, run `vercel env pull` (or use `vercel dev` for automatic refresh); OIDC tokens expire after 12 hours.
- Bring Your Own Key (BYOK): add provider credentials in the Vercel team's AI Gateway settings; no code changes needed. Model mappings map gateway slugs to your deployment names (for example Azure).

### Capabilities

```ts
import { rerank } from 'ai';
import { gateway } from '@ai-sdk/gateway';

const { ranking } = await rerank({
  model: gateway.rerankingModel('cohere/rerank-v3.5'),
  query: 'What is the capital of France?',
  documents: [
    'Paris is the capital of France.',
    'Berlin is the capital of Germany.',
    'Madrid is the capital of Spain.',
  ],
  topN: 2,
});
```

Dynamic model discovery, credits, generation lookup, spend reports:

```ts
import { gateway } from 'ai';

const availableModels = await gateway.getAvailableModels();
const credits = await gateway.getCredits(); // { balance, total_used }
const generation = await gateway.getGenerationInfo({ id: generationId }); // id format: gen_<ulid>
const report = await gateway.getSpendReport({
  startDate: '2026-03-01',
  endDate: '2026-03-25',
  groupBy: 'model',
});
```

- Generation IDs are in `providerMetadata.gateway.generationId` (for `streamText`, injected on the first content chunk; also available through `onLanguageModelCallEnd({ providerMetadata })`). `GatewayGenerationInfo` fields: id, totalCost, marketCost (optional, market cost in USD excluding surcharges), surchargeCost (optional, total surcharges in USD), gatewayCost (optional, total amount debited in USD), upstreamInferenceCost, usage, createdAt, model, isByok, providerName, streamed, finishReason, latency (time to first token, ms), generationTime (ms), promptTokens, completionTokens, reasoningTokens, cachedTokens, cacheCreationTokens, billableWebSearchCalls. The optional cost breakdown fields contain the values reported by AI Gateway; fields that are missing or `null` in the API response are omitted from the result, so unavailable costs remain distinct from a reported cost of zero. The SDK does not calculate these fields from other costs.
- `getSpendReport` parameters: `startDate` / `endDate` (`YYYY-MM-DD`, required), `groupBy` (`'day'` default, `'user'`, `'model'`, `'tag'`, `'provider'`, `'credential_type'`), `datePart` (`'day'` or `'hour'`), `userId`, `model`, `provider`, `credentialType` (`'byok'` or `'system'`), `tags`. Row metrics: totalCost, marketCost, inputTokens, outputTokens, cachedInputTokens, cacheCreationInputTokens, reasoningTokens, requestCount. Reporting API only for Vercel Pro and Enterprise plans.

Batch (experimental): `experimental_startBatch`, `experimental_getBatchStatus`, `experimental_getBatchResults`, `experimental_cancelBatch`. All text requests in a batch must use the same model. `webhookUrl` (publicly reachable HTTPS) delivers `batch.completed` / `batch.failed` / `batch.cancelled`; the signature header `x-ai-gateway-signature` has the form `t=<unix seconds>,v1=<hex digest>` (HMAC-SHA256 of `"<t>.<raw body>"`); the signing secret is returned only in the start response (`providerMetadata.gateway.asyncJob.webhookSigningSecret`); a 2xx response is expected within 10 seconds, redirects are not followed, retries carry the same `x-ai-gateway-idempotency-key` (`<jobId>-<status>`).

```ts
import { gateway } from '@ai-sdk/gateway';
import { experimental_cancelBatch as cancelBatch } from 'ai';

await cancelBatch({ provider: gateway, batch });
```

Realtime (experimental): `gateway.experimental_realtime('openai/gpt-realtime-2')`; mint a short-lived client secret server-side with `gateway.experimental_realtime.getToken({ model, expiresAfterSeconds })` and use it in the browser through `experimental_useRealtime` from `@ai-sdk/react`. For a trusted server-owned connection, `getServerWebSocketConfig()` reuses Gateway HTTP authentication, protocol, team and custom headers; only the conversation intent is supported. The identity codec passes through normalized usage only when the Gateway route includes it in its events; credentials in connection settings remain on your server.

```ts
import { gateway } from 'ai';

export async function POST() {
  const token = await gateway.experimental_realtime.getToken({
    model: 'openai/gpt-realtime-2',
    expiresAfterSeconds: 60 * 10,
  });

  return Response.json(token);
}
```

Image models: AI Gateway supports image generation through `generateImage`. To reduce peak memory when receiving large images, opt in to streaming base64 decoding (experimental, defaults to `false`):

```ts
import { generateImage } from 'ai';
import type { GatewayProviderOptions } from '@ai-sdk/gateway';

const { image } = await generateImage({
  model: 'bfl/flux-kontext-pro',
  prompt: 'A mountain lake at sunrise',
  providerOptions: {
    gateway: {
      experimental_streamingImageDecoding: true,
    } satisfies GatewayProviderOptions,
  },
});

console.log(image.uint8Array.byteLength);
```

When enabled, canonical base64 images of at least 64 KiB are decoded while the response arrives. The model returns these images as `Uint8Array`; if a response mixes extracted bytes with smaller images, all images in that result become bytes. Images that cannot be extracted retain the regular decoding path. This option changes what image-model middleware sees in `result.images`: `GeneratedFile` still provides both `uint8Array` and `base64`, but reading `base64` can require re-encoding, and validation errors contain short placeholders for extracted data. The option is handled by the client and is not sent to the Gateway service.

Streaming speech (experimental; the API may change in patch releases): speech models that support streaming can be used with `experimental_streamSpeech`. The gateway provider connects to AI Gateway over a WebSocket, forwards text deltas as they arrive, and streams audio chunks back; Gateway WebSocket auth is carried in the subprotocols, so no header-capable WebSocket implementation is needed. It works only with models that the AI Gateway model catalog lists with streaming speech support (the model ID below is illustrative).

```ts
import { experimental_streamSpeech as streamSpeech } from 'ai';

const result = streamSpeech({
  model: 'elevenlabs/eleven-flash-v2.5',
  text: textStream, // a string, or an array or stream of strings and/or text parts
  outputFormat: { type: 'audio/pcm', rate: 24000 },
});

for await (const chunk of result.audioStream) {
  // Uint8Array audio bytes
}

console.log(await result.usage); // { inputCharacters: ... }
```

To stream speech from browser code without exposing your Gateway credential, mint a short-lived client secret on your server with `gateway.experimental_speech.getToken()` and pass the token to the browser. The token is bound to the streaming speech surface and the requested model.

```ts
// Server
import { gateway } from '@ai-sdk/gateway';

const { token } = await gateway.experimental_speech.getToken({
  model: 'elevenlabs/eleven-flash-v2.5',
  expiresAfterSeconds: 60,
});
```

```ts
// Browser
import { createGateway } from '@ai-sdk/gateway';
import { experimental_streamSpeech as streamSpeech } from 'ai';

const gateway = createGateway({ apiKey: token });

const result = streamSpeech({
  model: gateway.experimental_speech('elevenlabs/eleven-flash-v2.5'),
  text: textStream,
});
```

Provider-executed tools can be used through the Gateway by importing the provider's tool definitions (for example `openai.tools.webSearch({})`). Gateway-executed tools are available under `gateway.tools` (for example `gateway.tools.perplexitySearch()` with options such as `maxResults`, `searchLanguageFilter`, `country`, `searchDomainFilter`); the official page also documents Exa Search, Browserbase Search / Fetch, Tako Search, Parallel Search and DeepSeek Search / Fetch tools (see the official page for their options; the changed options are listed under Notes).

Provider-specific options use the actual provider name as key next to `gateway`:

```ts
import type { AnthropicLanguageModelOptions } from '@ai-sdk/anthropic';
import type { GatewayProviderOptions } from '@ai-sdk/gateway';
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-4.6',
  prompt: 'Explain quantum computing',
  providerOptions: {
    gateway: {
      order: ['vertex', 'anthropic'],
    } satisfies GatewayProviderOptions,
    anthropic: {
      thinking: { type: 'enabled', budgetTokens: 12000 },
    } satisfies AnthropicLanguageModelOptions,
  },
});
```

## Notes

- Batch support and realtime support are experimental and the API may change in patch releases.
- Vercel access tokens with `teamIdOrSlug` are supported for model requests only; helper methods such as `getCredits`, `getSpendReport`, `getGenerationInfo` require an AI Gateway API key or OIDC authentication.
- If an API key or Vercel access token is present (passed directly or via environment), it is always used instead of OIDC, even if invalid.
- Some provider-executed tools requiring account-specific configuration (such as Claude Agent Skills) may not work through AI Gateway; use BYOK directly with the provider.
- After streaming starts, a well-formed upstream provider error surfaces as `StreamProviderError` (use its `type`, `code`, `statusCode`, `isRetryable`).
- Realtime WebSocket route sends the short-lived token via the versioned `Sec-WebSocket-Protocol` subprotocol and the model id via `?ai-model-id=`; keep that header under an 8 KiB safe budget. Routing knobs like `order` / `only` do not apply to realtime. Do not expose the Gateway API key or OIDC token to browser clients.
- Available models: OpenAI, Anthropic, Google, Meta, xAI, Mistral, DeepSeek, Amazon Bedrock, Cohere, Perplexity, Alibaba and others; 20+ providers. Model IDs in examples are copied as written.
- Platform configuration (AI Gateway dashboard, OIDC, BYOK, pricing, deployment) belongs to the vercel skill; this page covers the AI SDK `gateway` provider API only.
- Package version at the pinned tag: `@ai-sdk/gateway` 4.0.146.
- Source: https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway (ai@7.0.173)

### Gateway-executed tool changes (ai@7.0.173)

- Tako Search: the configured defaults (effort, source selection, localization) override values the model includes in a tool call; `variableCost`, `maxVariableCostUsd`, and `extraBody` are developer-only (the model can't see or set them). New options: `variableCost` (boolean, default `true`; serves data from sources priced per unit such as web traffic and SEO; set `false` to opt out, those cards then come back as placeholders; only searches that include the data index, `sources.data` set or `sources` omitted, return these cards), `maxVariableCostUsd` (number or `null`; default `0.25`, `null` removes the cap; a card whose maximum charge `content.export_pricing.variable_cost_max_usd` does not fit comes back as a placeholder with `reason: 'over_cap'`; `0` returns only cards whose charge the base price already covers; cannot be combined with `variableCost: false`), `extraBody` (`Record<string, unknown>`, snake_case Tako request fields deep-merged into the request body last; cannot set a field the tool already models, otherwise the gateway answers `invalid_input`; Tako rejects unknown keys with `api_error`; limited to 16,384 serialized characters). A placeholder card keeps its title and a description but carries no data; `placeholder.withheld_source` names the source and `placeholder.reason` is `'not_served'` or `'over_cap'`; `usage.variable_cost.cost_usd` reports the variable-cost charge for the call.

```ts
import { gateway, generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-5.4-nano',
  prompt: 'How much monthly web traffic does vercel.com get?',
  tools: {
    tako_search: gateway.tools.takoSearch({
      sources: { data: {}, web: {} },
      maxVariableCostUsd: 0.1,
    }),
  },
});

for (const toolResult of result.toolResults) {
  if (toolResult.dynamic || 'error' in toolResult.output) continue;
  for (const card of toolResult.output.cards ?? []) {
    if (card.placeholder) {
      const reason = card.placeholder.reason ?? 'not_served';
      console.log(`Withheld (${reason}):`, card.title);
    }
  }
}
```

- Parallel Search (breaking for old presets): `mode` is now `'turbo' | 'fast' | 'basic' | 'advanced'` (default `'basic'`; `'turbo'` supports English and Japanese only); `'one-shot'` and `'agentic'` are deprecated but still accepted (`'one-shot'` runs as `'basic'`, `'agentic'` runs as `'advanced'`). New `location` (ISO 3166-1 alpha-2 country code such as `'us'`; invalid codes are ignored with a warning) and top-level `maxCharsTotal` (`excerpts.maxCharsTotal` is deprecated). `sourcePolicy.includeDomains` / `excludeDomains` accept domains or domain/path prefixes (when `includeDomains` is set, `excludeDomains` is ignored; up to 200 entries combined) and `afterDate` is `YYYY-MM-DD`, inclusive. `fetchPolicy.maxAgeSeconds` has a minimum of 600 (lower values are raised to 600); new `fetchPolicy.timeoutSeconds` and `fetchPolicy.disableCacheFallback` (default `false`). Each tool result contains a `search_id` and `results` ordered by decreasing relevance, may include a `session_id` and `warnings`; each result has `url`, `title`, `publish_date` (`url`/`title`/`publish_date` may be `null`) and `excerpts` (markdown strings).
- DeepSeek Search and Fetch: `gateway.tools.deepseekSearch()` and `gateway.tools.deepseekFetch()` call DeepSeek's standalone Search/Fetch APIs from AI Gateway and work with supported tool-calling models from any provider; they are separate from a model's built-in web search and need no additional model provider package. Search options: `query` (pin the query; 1-128 Unicode characters), `count` (1-50, default 10), `needContent` (boolean, default false), `oriQuestion` (string or `null`, 1-128 characters), `localization` (IP address used to localize results; developer configuration only). The model-facing input uses `query`, `count`, `need_content`, and `ori_question`; queries support operators such as `site:`, `-site:`, `lang:`, `after:`, `before:` and quoted phrases. Search returns `{ results }` (an empty array is a successful search with no matches). Fetch accepts an HTTP(S) `url` up to 8,192 characters without username or password and returns `{ content, title? }` (Markdown); pin it with `deepseekFetch({ url })`. Tool failures appear as `tool-error` parts in `result.content` (`generateText`) or `result.stream` (`streamText`), not in `result.toolResults`.

```ts
import { gateway, generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-6-luna',
  prompt: 'Search for DeepSeek API documentation and fetch a relevant page.',
  tools: {
    deepseek_search: gateway.tools.deepseekSearch({
      count: 5,
      needContent: true,
    }),
    deepseek_fetch: gateway.tools.deepseekFetch(),
  },
});

console.log(result.text);
console.log(result.toolResults);
for (const part of result.content) {
  if (part.type === 'tool-error') console.error('Tool error:', part.error);
}
```

## Related

- [Provider & Model Management](./provider-management.md)
- [createProviderRegistry](./provider-registry.md)
- [Language Model Middleware](./middleware.md)
- [AI SDK Providers](./ai-sdk-providers.md)
