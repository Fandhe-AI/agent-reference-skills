---
source: https://developers.cloudflare.com/workers-ai/models/bge-base-en-v1.5/, https://developers.cloudflare.com/workers-ai/models/bge-large-en-v1.5/, https://developers.cloudflare.com/workers-ai/models/bge-small-en-v1.5/, https://developers.cloudflare.com/workers-ai/models/bge-m3/, https://developers.cloudflare.com/workers-ai/models/embeddinggemma-300m/, https://developers.cloudflare.com/workers-ai/models/plamo-embedding-1b/, https://developers.cloudflare.com/workers-ai/models/qwen3-embedding-0.6b/
---

# Text Embedding Models

Workers AI models that turn text into vectors, run with `env.AI.run(modelId, { text })`.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/models/bge-base-en-v1.5/.

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    // Can be a string or array of strings]
    const stories = [
      "This is a story about an orange cloud",
      "This is a story about a llama",
      "This is a story about a hugging emoji",
    ];

    const embeddings = await env.AI.run(
      "@cf/baai/bge-base-en-v1.5",
      {
        text: stories,
      }
    );

    return Response.json(embeddings);
  },
} satisfies ExportedHandler<Env>;
```

`@cf/baai/bge-m3` (the official example sends `text`; the `query` / `contexts` variant is listed under Options):

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    // Can be a string or array of strings]
    const stories = [
      "This is a story about an orange cloud",
      "This is a story about a llama",
      "This is a story about a hugging emoji",
    ];

    const embeddings = await env.AI.run(
      "@cf/baai/bge-m3",
      {
        text: stories,
      }
    );

    return Response.json(embeddings);
  },
} satisfies ExportedHandler<Env>;
```

## Options / Props

### Models

| Model ID | Provider | Context window | Max input tokens / output dimensions | Properties as stated | Unit pricing |
|----------|----------|----------------|--------------------------------------|----------------------|--------------|
| `@cf/baai/bge-base-en-v1.5` | BAAI | 153,600 tokens | 512 / 768 | Batch, Zero data retention | $0.0666 per M input tokens |
| `@cf/baai/bge-large-en-v1.5` | BAAI | — | 512 / 1,024 | Batch, Zero data retention | $0.204 per M input tokens |
| `@cf/baai/bge-small-en-v1.5` | BAAI | — | 512 / 384 | Batch, Zero data retention | $0.0202 per M input tokens |
| `@cf/baai/bge-m3` | BAAI | 60,000 tokens | — / — | Zero data retention | $0.0118 per M input tokens |
| `@cf/google/embeddinggemma-300m` | Google | — | — / — | Beta, Zero data retention | — |
| `@cf/pfnet/plamo-embedding-1b` | pfnet | — | — / — | Zero data retention (Japanese text embedding model) | $0.0186 per M input tokens |
| `@cf/qwen/qwen3-embedding-0.6b` | Qwen | 8,192 tokens | — / — | Zero data retention | $0.0118 per M input tokens |

### Input and output parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| text | one of (string or array of strings) | — | Required (bge-base/large/small, embeddinggemma, plamo, per their pages); also the field the qwen3-embedding-0.6b example sends. bge-m3 also accepts it (typed in `@cloudflare/workers-types`, see Notes). The text(s) to embed. |
| pooling | string | mean | bge-base/large/small only. enum: mean, cls. `cls` pooling generates more accurate embeddings on larger inputs but is not compatible with embeddings generated with `mean` pooling. |
| query | string | — | bge-m3 only (optional), minLength 1. A query to perform against the provided contexts. If no query is provided the model responds with embeddings for contexts. |
| contexts | array | — | bge-m3 only. Required in the `query` / `contexts` form. List of provided contexts; the index in this array matters, as the response refers to it. Item fields are not expanded on the docs page; `@cloudflare/workers-types` types each item as `{ text?: string }`. |
| truncate_inputs | boolean | false | bge-m3 only. When a context is too long, whether to error out or truncate it to fit. |
| queries | one of | — | qwen3-embedding-0.6b. Not expanded in the source. |
| documents | one of | — | qwen3-embedding-0.6b. Not expanded in the source. |
| instruction | string | Given a web search query, retrieve relevant passages that answer the query | qwen3-embedding-0.6b. Optional instruction for the task. |
| requests | array | — | Batch variant (bge-base/large/small, bge-m3). Required. Batch of embedding requests to run using async-queue. |
| request_id | string | — | bge-m3 batch/sync responses. The async request id that can be used to obtain the results. |

Output: `shape` (array) and `data` (array of embeddings, one per input). On plamo-embedding-1b, `shape` is `[number_of_embeddings, embedding_dimension]` (minItems 2, maxItems 2). bge-base/large/small also return `pooling`.

## Notes

- `@cf/baai/bge-m3` input: the docs page's Parameters section expands only the `query` / `contexts` variant, while its usage example sends `text`. `@cloudflare/workers-types` 5.20261103.1 (`Ai_Cf_Baai_Bge_M3_Input` in `index.d.ts`) types the input as a union of `{ query?: string; contexts: { text?: string }[]; truncate_inputs?: boolean }`, `{ text: string | string[]; truncate_inputs?: boolean }`, and `{ requests: (...)[] }`, so both the `text` example and the `contexts` form are valid.
- `@cf/qwen/qwen3-embedding-0.6b` lists `queries`/`documents`/`text` as `one of` alternatives in its Parameters section and its example sends `text`; the bge-base snippet's `{ text }` shape therefore applies to it, but the `queries`/`documents` item shapes are not expanded in the source.
- The bge-base snippet keeps a stray `]` in the comment `// Can be a string or array of strings]` exactly as the official page prints it.
- Pages note that Workers AI also supports an OpenAI-compatible `/v1/embeddings` endpoint: [openai-compatibility.md](../workers-ai/openai-compatibility.md).
- For relevance scoring of query/passage pairs rather than embeddings, see the reranker in [text-classification.md](./text-classification.md).

## Related

- [text-classification.md](./text-classification.md)
- [text-generation.md](./text-generation.md)
