---
source: https://developers.cloudflare.com/workers-ai/models/bge-base-en-v1.5/, https://developers.cloudflare.com/workers-ai/models/bge-large-en-v1.5/, https://developers.cloudflare.com/workers-ai/models/bge-small-en-v1.5/, https://developers.cloudflare.com/workers-ai/models/bge-m3/, https://developers.cloudflare.com/workers-ai/models/embeddinggemma-2/, https://developers.cloudflare.com/workers-ai/models/embeddinggemma-300m/, https://developers.cloudflare.com/workers-ai/models/plamo-embedding-1b/, https://developers.cloudflare.com/workers-ai/models/qwen3-embedding-0.6b/
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
| `@cf/google/embeddinggemma-2` | Google | 8,192 tokens | — / 768 (128, 256, 512 via `dimensions`) | Multimodal (text, image, video, audio) | $0.0017 per M input tokens |
| `@cf/google/embeddinggemma-300m` | Google | — | — / — | Beta, Zero data retention; Planned deprecation 2026-11-20 | — |
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

### EmbeddingGemma 2 (`@cf/google/embeddinggemma-2`)

Open multimodal embedding model from Google DeepMind that maps text (including code), images, video, and audio, and combinations of them, into one 768-dimensional vector space. Its request shape differs from the models above: it takes `input` (text) or `messages` (multimodal), not `text`. Fields as stated in its schema:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| input | string \| array | — | Text variant, required. Each string, or each array of token IDs, produces one embedding. Prefix text with a task instruction for best results, for example `task: search result \| query: ...` for queries and `title: none \| text: ...` for documents. |
| dimensions | integer | 768 | Text variant. enum: 128, 256, 512, 768. Smaller sizes use Matryoshka truncation to reduce storage with a small quality cost. Queries and documents must use the same size. |
| encoding_format | string | float | Text variant. enum: float, base64. Return each embedding as an array of floats, or as a base64-encoded string of little-endian float32 values. |
| messages | array | — | Multimodal variant, required. A conversation that produces one embedding, or an array of conversations that produces one embedding each. Content parts are `text`, `image_url` (base64 data URI), `video_url` (base64 data URI, sampled at one frame per second), and `input_audio` (`data` base64, `format` such as wav or mp3; mono 16 kHz recommended). Every input shares an 8,192 token context window. |

Output (OpenAI-style): `object` (`list`), `data` (one `{ object: "embedding", index, embedding }` per input, in request order; `embedding` is a float array, or a base64 string when `encoding_format` is `base64`), `usage` (`prompt_tokens`, `total_tokens`), plus `id`, `created`, `model`.

Snippet taken from the EmbeddingGemma 2 usage example (text variant) in the docs repository's `src/components/models/code/EmbeddingGemma2Code.astro` at the pinned SHA, with the model ID substituted for the template variable:

```ts
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		// Prefix queries and documents with task instructions for better retrieval quality.
		const response = await env.AI.run("@cf/google/embeddinggemma-2", {
			input: [
				"task: search result | query: waterproof shoes for trail running",
				"title: Trail Runner X | text: Waterproof running shoes with a breathable mesh upper.",
				"title: City Sneaker | text: Lightweight canvas sneakers for everyday wear.",
			],
		});

		// response.data[i].embedding is a 768-dimensional vector
		return Response.json(response);
	},
} satisfies ExportedHandler<Env>;
```

Output of the other models: `shape` (array) and `data` (array of embeddings, one per input). On plamo-embedding-1b, `shape` is `[number_of_embeddings, embedding_dimension]` (minItems 2, maxItems 2). bge-base/large/small also return `pooling`.

## Notes

- `@cf/baai/bge-m3` input: the docs page's Parameters section expands only the `query` / `contexts` variant, while its usage example sends `text`. `@cloudflare/workers-types` 5.20261103.1 (`Ai_Cf_Baai_Bge_M3_Input` in `index.d.ts`) types the input as a union of `{ query?: string; contexts: { text?: string }[]; truncate_inputs?: boolean }`, `{ text: string | string[]; truncate_inputs?: boolean }`, and `{ requests: (...)[] }`, so both the `text` example and the `contexts` form are valid.
- `@cf/qwen/qwen3-embedding-0.6b` lists `queries`/`documents`/`text` as `one of` alternatives in its Parameters section and its example sends `text`; the bge-base snippet's `{ text }` shape therefore applies to it, but the `queries`/`documents` item shapes are not expanded in the source.
- The bge-base snippet keeps a stray `]` in the comment `// Can be a string or array of strings]` exactly as the official page prints it.
- Pages note that Workers AI also supports an OpenAI-compatible `/v1/embeddings` endpoint: [openai-compatibility.md](../workers-ai/openai-compatibility.md).
- `@cf/google/embeddinggemma-2` is a different model from `@cf/google/embeddinggemma-300m`: it is multimodal, uses the `input` / `messages` request shape, and returns an OpenAI-style `data[].embedding` list rather than `shape` / `data` arrays of vectors. Pricing $0.0017 per M input tokens (154 neurons per M). Source: https://developers.cloudflare.com/workers-ai/models/embeddinggemma-2/ (pin 34d908a / fetched 2026-11-14).
- `@cf/google/embeddinggemma-300m` (Beta) is flagged for planned deprecation on 2026-11-20; after that date requests fail with HTTP `410` / error code `5028` (see [errors.md](../workers-ai/errors.md)). `@cf/google/embeddinggemma-2` is the newer EmbeddingGemma model. Source: https://developers.cloudflare.com/changelog/post/2026-11-05-planned-model-deprecations/ (pin 34d908a / fetched 2026-11-14).
- For relevance scoring of query/passage pairs rather than embeddings, see the reranker in [text-classification.md](./text-classification.md).

## Related

- [text-classification.md](./text-classification.md)
- [text-generation.md](./text-generation.md)
