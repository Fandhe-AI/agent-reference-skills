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
| apiKey | string | API key or Vercel access token sent in the `Authorization` header. Defaults to the `AI_GATEWAY_API_KEY` environment variable. Supports AI Gateway API keys, Vercel personal access tokens, and Vercel app access tokens. |
| teamIdOrSlug | string | Vercel team ID or slug used to scope model requests with multi-team Vercel access tokens. |
| headers | `Record<string,string>` | Custom headers. |
| fetch | `(input: RequestInfo, init?: RequestInit) => Promise<Response>` | Custom fetch implementation. Defaults to global `fetch`. |
| metadataCacheRefreshMillis | number | How frequently to refresh the metadata cache. Defaults to 5 minutes (300,000ms). |

`providerOptions.gateway` (`GatewayProviderOptions`, exported from `@ai-sdk/gateway`):

| Name | Type | Description |
| --- | --- | --- |
| order | string[] | Sequence of providers to attempt; moves to the next if one fails or is unavailable. |
| only | string[] | Restricts routing to only the specified providers. |
| sort | `'cost' \| 'ttft' \| 'tps'` | Sorts available providers before routing: lowest cost first, lowest time-to-first-token first, highest tokens-per-second first. When combined with `order`, user-specified providers are promoted to the front. When active, `providerMetadata.gateway.routing.sort` holds the sort used, the execution order, per-provider metrics, and deprioritized providers. |
| models | `string[] \| [GatewayModelFallback, ...string[]]` | Fallback models in attempt order. Decision requests can start the list with one conditional `{ model, when }` entry (only first entry, only one allowed; rejected on non-decision requests). |
| user | string | End-user identifier for spend tracking and attribution. |
| tags | string[] | Tags for categorizing and filtering usage in reports. |
| byok | `Record<string, Array<Record<string, unknown>>>` | Request-scoped BYOK credentials; cached gateway BYOK credentials are not considered; may still fall back to system credentials. Credentials may include `modelMappings`. |
| zeroDataRetention | boolean | Restricts routing to providers with zero data retention agreements with Vercel. BYOK credentials skipped by default. Request fails if no ZDR-eligible credentials. Request-level ZDR only for Vercel Pro and Enterprise plans. |
| disallowPromptTraining | boolean | Restricts routing to providers with agreements not to train on prompts. Not applied with BYOK; request fails if no provider available. |
| quotaEntityId | string | Entity against which quota is tracked and enforced. |
| has | Array of `'implicit-caching' \| 'reasoning' \| 'structured-output' \| 'tool-use' \| 'vision' \| `quantization:${string}` \| `!quantization:${string}`` | Restricts routing to provider models with all capabilities. Applies to BYOK and system credentials. Request fails if none satisfy. |
| providerTimeouts | object | Per-provider timeouts for BYOK credentials in ms, e.g. `providerTimeouts: { byok: { openai: 5000, anthropic: 2000 } }`. |
| serviceTier | `'flex' \| 'priority'` | Unified service tier intent translated to each provider's option; overrides any tier set in per-provider options. Leave unset for provider default. |

Conditional fallback conditions: `{ question, confidenceBelow }` (Choice / Score), `{ question, probabilityBetween: [min, max] }` (Boolean, P(true), inclusive bounds within `[0, 1]`), combined with `{ any }`, `{ all }`, `{ atLeast: { count, conditions } }`; 1 to 20 conditions per list, nesting up to 5 levels, question IDs 1 to 256 characters.

## Authentication

- API key: `AI_GATEWAY_API_KEY` environment variable, or `createGateway({ apiKey })`.
- Vercel access token for model requests: pass a personal / app access token as `apiKey`, plus `teamIdOrSlug` for multi-team tokens. `apiKey` takes precedence over `AI_GATEWAY_API_KEY` and OIDC.
- OIDC (Vercel deployments): handled automatically in production / preview. Locally, run `vercel env pull` (or use `vercel dev` for automatic refresh); OIDC tokens expire after 12 hours.
- Bring Your Own Key (BYOK): add provider credentials in the Vercel team's AI Gateway settings; no code changes needed. Model mappings map gateway slugs to your deployment names (for example Azure).

## Capabilities

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

- Generation IDs are in `providerMetadata.gateway.generationId` (for `streamText`, injected on the first content chunk; also available through `onLanguageModelCallEnd({ providerMetadata })`). `GatewayGenerationInfo` fields: id, totalCost, upstreamInferenceCost, usage, createdAt, model, isByok, providerName, streamed, finishReason, latency (time to first token, ms), generationTime (ms), promptTokens, completionTokens, reasoningTokens, cachedTokens, cacheCreationTokens, billableWebSearchCalls.
- `getSpendReport` parameters: `startDate` / `endDate` (`YYYY-MM-DD`, required), `groupBy` (`'day'` default, `'user'`, `'model'`, `'tag'`, `'provider'`, `'credential_type'`), `datePart` (`'day'` or `'hour'`), `userId`, `model`, `provider`, `credentialType` (`'byok'` or `'system'`), `tags`. Row metrics: totalCost, marketCost, inputTokens, outputTokens, cachedInputTokens, cacheCreationInputTokens, reasoningTokens, requestCount. Reporting API only for Vercel Pro and Enterprise plans.

Batch (experimental): `experimental_startBatch`, `experimental_getBatchStatus`, `experimental_getBatchResults`, `experimental_cancelBatch`. All text requests in a batch must use the same model. `webhookUrl` (publicly reachable HTTPS) delivers `batch.completed` / `batch.failed` / `batch.cancelled`; the signature header `x-ai-gateway-signature` has the form `t=<unix seconds>,v1=<hex digest>` (HMAC-SHA256 of `"<t>.<raw body>"`); the signing secret is returned only in the start response (`providerMetadata.gateway.asyncJob.webhookSigningSecret`); a 2xx response is expected within 10 seconds, redirects are not followed, retries carry the same `x-ai-gateway-idempotency-key` (`<jobId>-<status>`).

```ts
import { gateway } from '@ai-sdk/gateway';
import { experimental_cancelBatch as cancelBatch } from 'ai';

await cancelBatch({ provider: gateway, batch });
```

Realtime (experimental): `gateway.experimental_realtime('openai/gpt-realtime-2')`; mint a short-lived client secret server-side with `gateway.experimental_realtime.getToken({ model, expiresAfterSeconds })` and use it in the browser through `experimental_useRealtime` from `@ai-sdk/react`.

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

Provider-executed tools can be used through the Gateway by importing the provider's tool definitions (for example `openai.tools.webSearch({})`). Gateway-executed tools are available under `gateway.tools` (for example `gateway.tools.perplexitySearch()` with options such as `maxResults`, `searchLanguageFilter`, `country`, `searchDomainFilter`); the official page also documents Exa Search, Browserbase Search / Fetch, Tako Search and Parallel Search tools (see the official page for their options).

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
- Package version at the pinned tag: `@ai-sdk/gateway` 4.0.115.

## Related

- [Provider & Model Management](./provider-management.md)
- [createProviderRegistry](./provider-registry.md)
- [Language Model Middleware](./middleware.md)
- [AI SDK Providers](./ai-sdk-providers.md)
