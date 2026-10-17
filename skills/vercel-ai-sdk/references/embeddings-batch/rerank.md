---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/rerank
---

# rerank

Rerank a set of documents based on their relevance to a query using a reranking model. Ideal for improving search relevance by reordering documents, emails, or other content based on semantic understanding of the query and documents.

## Signature / Usage

```ts
import { cohere } from '@ai-sdk/cohere';
import { rerank } from 'ai';

const { ranking } = await rerank({
  model: cohere.reranking('rerank-v4.0-pro'),
  documents: ['sunny day at the beach', 'rainy afternoon in the city'],
  query: 'talk about rain',
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `model` | RerankingModel | — | The reranking model to use. Example: `cohere.reranking('rerank-v4.0-pro')` |
| `documents` | Array<VALUE> | — | The documents to rerank. Can be an array of strings or JSON objects. |
| `query` | string | — | The search query to rank documents against. |
| `topN` | number (Optional) | — | Maximum number of top documents to return. If not specified, all documents are returned. |
| `maxRetries` | number (Optional) | 2 | Maximum number of retries. Set to 0 to disable retries. |
| `abortSignal` | AbortSignal (Optional) | — | An optional abort signal that can be used to cancel the call. |
| `headers` | Record<string, string> (Optional) | — | Additional HTTP headers to be sent with the request. Only applicable for HTTP-based providers. |
| `providerOptions` | ProviderOptions (Optional) | — | Provider-specific options for the reranking request. |
| `runtimeContext` | RUNTIME_CONTEXT (Optional) | — | User-defined runtime context passed to lifecycle callbacks. Defaults to an empty object. Telemetry integrations only receive top-level properties explicitly included with telemetry.includeRuntimeContext. |
| `telemetry` | TelemetryOptions<RUNTIME_CONTEXT> (Optional) | — | Telemetry configuration. |
| `telemetry.isEnabled` | boolean (Optional) | — | Enable or disable telemetry. Enabled by default. Set to `false` to opt out. |
| `telemetry.recordInputs` | boolean (Optional) | — | Enable or disable input recording. Enabled by default. |
| `telemetry.recordOutputs` | boolean (Optional) | — | Enable or disable output recording. Enabled by default. |
| `telemetry.functionId` | string (Optional) | — | Identifier for this function. Used to group telemetry data by function. |
| `telemetry.includeRuntimeContext` | { [KEY in keyof RUNTIME_CONTEXT]?: boolean } (Optional) | — | Top-level runtime context properties to include in telemetry. Only properties set to true are included. All properties are excluded by default. User callbacks still receive the full context. |
| `telemetry.integrations` | Telemetry \| Telemetry[] (Optional) | — | Per-call telemetry integrations that receive lifecycle events. When provided, these replace any globally registered integrations for this call. |
| `onStart` | (event: RerankStartEvent<RUNTIME_CONTEXT>) => void \| Promise<void> (Optional) | — | Called when the rerank operation begins, before the reranking model is called. The event includes the full, unfiltered runtimeContext. |
| `onEnd` | (event: RerankEndEvent<RUNTIME_CONTEXT>) => void \| Promise<void> (Optional) | — | Called when the rerank operation completes, after the reranking model returns. The event includes the full, unfiltered runtimeContext. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| `originalDocuments` | Array<VALUE> | The original documents array in their original order. |
| `rerankedDocuments` | Array<VALUE> | The documents sorted by relevance score (descending). |
| `ranking` | Array<RankingItem<VALUE>> | Array of ranking items with scores and indices. |
| `ranking[].originalIndex` | number | The index of the document in the original documents array. |
| `ranking[].score` | number | The relevance score for the document (typically 0-1, where higher is more relevant). |
| `ranking[].document` | VALUE | The document itself. |
| `response` | Response | Response data. |
| `response.id` | string (Optional) | The response ID from the provider. |
| `response.timestamp` | Date | The timestamp of the response. |
| `response.modelId` | string | The model ID used for reranking. |
| `response.headers` | Record<string, string> (Optional) | Response headers. |
| `response.body` | unknown (Optional) | The raw response body. |
| `providerMetadata` | ProviderMetadata \| undefined (Optional) | Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider. |

## Examples

```ts
const { ranking, rerankedDocuments } = await rerank({
  model: cohere.reranking('rerank-v4.0-pro'),
  documents: [
    'sunny day at the beach',
    'rainy afternoon in the city',
    'snowy night in the mountains',
  ],
  query: 'talk about rain',
  topN: 2,
});

console.log(rerankedDocuments);
// ['rainy afternoon in the city', 'sunny day at the beach']
```

Object documents:

```ts
const { ranking } = await rerank({
  model: cohere.reranking('rerank-v4.0-pro'),
  documents,
  query: 'Which pricing did we get from Oracle?',
  topN: 1,
});

console.log(ranking[0].document);
// { from: 'John McGill', subject: 'Missing Info', ... }
```

With provider options:

```ts
const { ranking } = await rerank({
  model: cohere.reranking('rerank-v4.0-pro'),
  documents: ['sunny day at the beach', 'rainy afternoon in the city'],
  query: 'talk about rain',
  providerOptions: {
    cohere: {
      maxTokensPerDoc: 1000,
    },
  },
});
```

## Related

- [Reranking](./reranking.md)
- [embed](./embed.md)
