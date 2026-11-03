---
source: https://developers.cloudflare.com/workers-ai/models/distilbert-sst-2-int8/, https://developers.cloudflare.com/workers-ai/models/bge-reranker-base/
---

# Text Classification Models

Sentiment classification and query/passage reranking models.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/models/distilbert-sst-2-int8/.

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    const response = await env.AI.run(
      "@cf/huggingface/distilbert-sst-2-int8",
      {
        text: "This pizza is great!",
      }
    );

    return Response.json(response);
  },
} satisfies ExportedHandler<Env>;
```

Snippet taken from https://developers.cloudflare.com/workers-ai/models/bge-reranker-base/.

```ts
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		const query = 'Which one is cooler?'
		const contexts = [
			{
				text: 'a cyberpunk lizzard'
			},
			{
				text: 'a cyberpunk cat'
			}
		];

		const response = await env.AI.run('@cf/baai/bge-reranker-base', { query, contexts });

		return Response.json(response);
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

### Models

| Model ID | Provider | Properties as stated | Unit pricing |
|----------|----------|----------------------|--------------|
| `@cf/huggingface/distilbert-sst-2-int8` | HuggingFace | Distilled BERT fine-tuned on SST-2 for sentiment classification; Zero data retention | $0.0263 per M input tokens |
| `@cf/baai/bge-reranker-base` | BAAI | Reranker: takes a query and passages and outputs similarity directly instead of an embedding; Zero data retention | $0.00311 per M input tokens |

### Input parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| text | string | — | distilbert-sst-2-int8. Required, minLength 1. The text that you want to classify. |
| query | string | — | bge-reranker-base. Required, minLength 1. A query to perform against the provided contexts. |
| contexts | array | — | bge-reranker-base. Required. List of provided contexts (objects with a `text` field in the example); the index in this array matters, as the response refers to it. |
| top_k | integer | — | bge-reranker-base. Minimum 1. Number of returned results starting with the best score. |

Output: distilbert returns an array of classification results for the input text (item shape not expanded in the source); bge-reranker-base returns a `response` array.

## Notes

- The reranker page says the relevance score can be mapped to a float in [0,1] with a sigmoid function.
- Neither page documents deprecation or Beta status.

## Related

- [text-embeddings.md](./text-embeddings.md)
- [image-classification.md](./image-classification.md)
