---
source: https://ai-sdk.dev/docs/ai-sdk-core/reranking
---

# Reranking

Reranking improves search relevance by reordering a set of documents based on their relevance to a query. Unlike embedding-based similarity search, reranking models are trained to understand the relationship between queries and documents, often producing more accurate relevance scores.

## Signature / Usage

```tsx
import { rerank } from 'ai';
import { cohere } from '@ai-sdk/cohere';

const documents = [
  'sunny day at the beach',
  'rainy afternoon in the city',
  'snowy night in the mountains',
];

const { ranking } = await rerank({
  model: cohere.reranking('rerank-v4.0-pro'),
  documents,
  query: 'talk about rain',
  topN: 2, // Return top 2 most relevant documents
});

console.log(ranking);
// [
//   { originalIndex: 1, score: 0.9, document: 'rainy afternoon in the city' },
//   { originalIndex: 0, score: 0.3, document: 'sunny day at the beach' }
// ]
```

Object documents (JSON objects) are supported:

```tsx
const { ranking, rerankedDocuments } = await rerank({
  model: cohere.reranking('rerank-v4.0-pro'),
  documents,
  query: 'Which pricing did we get from Oracle?',
  topN: 1,
});

console.log(rerankedDocuments[0]);
// { from: 'John McGill', subject: 'Missing Info', text: '...' }
```

## Result

`rerank` returns `ranking`, `rerankedDocuments`, `originalDocuments`:

- `ranking`: sorted array of `{ originalIndex, score, document }`
- `rerankedDocuments`: documents sorted by relevance (convenience property)
- `originalDocuments`: original documents array

Each `ranking` item contains `originalIndex` (position in the original documents array), `score` (relevance score, typically 0-1, higher is more relevant), and `document` (the original document).

## Settings

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `topN` | number | — | Limit the number of results returned. |
| `providerOptions` | ProviderOptions | — | Provider-specific parameters, for example `{ cohere: { maxTokensPerDoc: 1000 } }`. |
| `maxRetries` | number | 2 | Maximum retries (3 attempts in total); `0` disables retries. |
| `abortSignal` | AbortSignal | — | Abort the reranking process or set a timeout, e.g. `AbortSignal.timeout(5000)`. |
| `headers` | Record<string, string> | — | Custom headers for the reranking request. |

Response information (raw provider response) is available as `response`: `{ id, timestamp, modelId, headers, body }`.

```ts
const { ranking, response } = await rerank({
  model: cohere.reranking('rerank-v4.0-pro'),
  documents: ['sunny day at the beach', 'rainy afternoon in the city'],
  query: 'talk about rain',
});

console.log(response); // { id, timestamp, modelId, headers, body }
```

## Reranking providers and models

| Provider | Model |
| --- | --- |
| Cohere | `rerank-v4.0-pro` |
| Cohere | `rerank-v4.0-fast` |
| Cohere | `rerank-v3.5` |
| Cohere | `rerank-english-v3.0` |
| Cohere | `rerank-multilingual-v3.0` |
| Amazon Bedrock | `amazon.rerank-v1:0` |
| Amazon Bedrock | `cohere.rerank-v3-5:0` |
| Together.ai | `Salesforce/Llama-Rank-v1` |
| Together.ai | `mixedbread-ai/Mxbai-Rerank-Large-V2` |

## Related

- [rerank](./rerank.md)
- [Embeddings](./embeddings.md)
