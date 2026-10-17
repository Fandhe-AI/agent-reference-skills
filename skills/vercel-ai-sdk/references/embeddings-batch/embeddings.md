---
source: https://ai-sdk.dev/docs/ai-sdk-core/embeddings
---

# Embeddings

Embeddings represent words, phrases, or images as vectors in a high-dimensional space; similar values are close to each other, and distance measures similarity. The AI SDK provides `embed`, `embedMany`, and `cosineSimilarity`.

## Signature / Usage

```ts
import { embed } from 'ai';

// 'embedding' is a single embedding object (number[])
const { embedding } = await embed({
  model: 'openai/text-embedding-3-small',
  value: 'sunny day at the beach',
});
```

Embed many values (for example when preparing a data store for retrieval-augmented generation) with `embedMany`; the result `embeddings` (`number[][]`) is sorted in the same order as the input values:

```ts
import { embedMany } from 'ai';

const { embeddings } = await embedMany({
  model: 'openai/text-embedding-3-small',
  values: [
    'sunny day at the beach',
    'rainy afternoon in the city',
    'snowy night in the mountains',
  ],
});
```

Compare embeddings with `cosineSimilarity`:

```ts
import { cosineSimilarity, embedMany } from 'ai';

const { embeddings } = await embedMany({
  model: 'openai/text-embedding-3-small',
  values: ['sunny day at the beach', 'rainy afternoon in the city'],
});

console.log(
  `cosine similarity: ${cosineSimilarity(embeddings[0], embeddings[1])}`,
);
```

## Options / Props

Both `embed` and `embedMany` accept the following settings.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `dimensions` | number | — | Optional output vector size; must be a positive integer. When omitted, the model's existing behavior is unchanged. For `embedMany` the same value is forwarded to every batch. |
| `providerOptions` | ProviderOptions | — | Provider-specific parameters, for example `providerOptions: { openai: { dimensions: 512 } }`. |
| `maxParallelCalls` | number | — | `embedMany` only. Limits parallel requests. |
| `maxRetries` | number | 2 | Maximum number of retries (3 attempts in total); `0` disables retries. |
| `abortSignal` | AbortSignal | — | Abort the embedding process or set a timeout, e.g. `AbortSignal.timeout(1000)`. |
| `headers` | Record<string, string> | — | Custom headers for the embedding request. |

```ts
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';

const { embedding } = await embed({
  model: openai.embedding('text-embedding-3-small'),
  value: 'sunny day at the beach',
  dimensions: 512,
});
```

Result information: `usage` (for example `{ tokens: 10 }`) and `response` (raw provider response) are returned by both functions.

### Embedding middleware

Enhance embedding models (for example to set default values) with `wrapEmbeddingModel` and `EmbeddingModelMiddleware`. Example with the built-in `defaultEmbeddingSettingsMiddleware`:

```ts
import {
  defaultEmbeddingSettingsMiddleware,
  embed,
  wrapEmbeddingModel,
  gateway,
} from 'ai';

const embeddingModelWithDefaults = wrapEmbeddingModel({
  model: gateway.embeddingModel('google/gemini-embedding-001'),
  middleware: defaultEmbeddingSettingsMiddleware({
    settings: {
      providerOptions: {
        google: {
          outputDimensionality: 256,
          taskType: 'CLASSIFICATION',
        },
      },
    },
  }),
});
```

## Notes

### Embedding providers and models

| Provider | Model | Embedding Dimensions | Multimodal |
| --- | --- | --- | --- |
| OpenAI | `text-embedding-3-large` | 3072 | No |
| OpenAI | `text-embedding-3-small` | 1536 | No |
| OpenAI | `text-embedding-ada-002` | 1536 | No |
| Google | `gemini-embedding-001` | 3072 | No |
| Google | `gemini-embedding-2` | 3072 | Yes |
| Google | `gemini-embedding-2-preview` | 3072 | Yes |
| Mistral | `mistral-embed` | 1024 | No |
| Cohere | `embed-english-v3.0` | 1024 | No |
| Cohere | `embed-multilingual-v3.0` | 1024 | No |
| Cohere | `embed-english-light-v3.0` | 384 | No |
| Cohere | `embed-multilingual-light-v3.0` | 384 | No |
| Cohere | `embed-english-v2.0` | 4096 | No |
| Cohere | `embed-english-light-v2.0` | 1024 | No |
| Cohere | `embed-multilingual-v2.0` | 768 | No |
| Amazon Bedrock | `amazon.titan-embed-text-v1` | 1536 | No |
| Amazon Bedrock | `amazon.titan-embed-text-v2:0` | 1024 | No |

### General notes

- Providers map `dimensions` to their native output dimension setting. An explicit dimension setting in `providerOptions` takes precedence over `dimensions`; other provider options can be combined with the top-level setting.
- Support and allowed dimension values depend on the model. The SDK forwards the requested size to the provider API without truncating or resizing the returned embeddings. AI Gateway forwards `dimensions` and `providerOptions` for resolution by the selected provider.
- Google's `gemini-embedding-2` model (also `gemini-embedding-2-preview`) supports multimodal embedding content through `providerOptions.google.content`. Each entry corresponds to the value at the same index and can contain `{ text: string }`, `{ inlineData: { mimeType: string; data: string } }`, or `{ fileData: { fileUri: string; mimeType: string } }` parts. `fileUri` can reference remote content such as HTTP URLs or Google Cloud Storage URIs (`gs://...`).
- Many providers charge based on the number of tokens used; check `usage`.
- Scope vs other skills: the AI SDK produces embedding vectors and similarity; it does not include a vector store or index. Vector storage and search are covered by upstash (Upstash Vector) and fandhe-db (vector query DB), not by this skill.

## Related

- [embed](./embed.md)
- [embedMany](./embed-many.md)
- [cosineSimilarity](./cosine-similarity.md)
- [Reranking](./reranking.md)
