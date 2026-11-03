---
source: https://developers.cloudflare.com/vectorize/best-practices/query-vectors/
---

# Query vectors

Search an index by passing a query vector (or an existing vector's ID), optionally with metadata filters or a namespace.

## Signature / Usage

Adapted (not in the official docs): the source's `...` elisions (invalid in a JS array / JSON) are replaced by complete 3-dimension arrays, so these examples assume a 3-dimension index; see Notes.

```ts
// query vector dimensions must match the Vectorize index dimension being queried
let queryVector = [54.8, 5.5, 3.1];
// topK defaults to 5; returnValues defaults to false; returnMetadata defaults to "none"
let matches = await env.YOUR_INDEX.query(queryVector, {
	topK: 1,
	returnValues: true,
	returnMetadata: "all",
});
```

Example response (`cosine`; the third value completes the elided array):

```json
{
	"count": 1,
	"matches": [
		{
			"score": 0.999909486,
			"id": "5",
			"values": [58.79999923706055, 6.699999809265137, 3.4000000953674316],
			"metadata": { "url": "/products/sku/55519183" }
		}
	]
}
```

Query by an existing vector ID:

```ts
// the query operation would yield results if a vector with id `some-vector-id` is already present in the index.
let matches = await env.YOUR_INDEX.queryById("some-vector-id");
```

Workers AI embeddings (pass the inner vector, not the response wrapper). Adapted (not in the official docs): the `EmbeddingResponse` interface the source assumes is defined inline.

```ts
interface EmbeddingResponse {
	shape: number[];
	data: number[][];
}

let userQuery = "a query from a user or service";
const queryVector: EmbeddingResponse = await env.AI.run(
	"@cf/baai/bge-base-en-v1.5",
	{
		text: [userQuery],
	},
);

let matches = await env.TEXT_EMBEDDINGS.query(queryVector.data[0], { topK: 1 });
```

OpenAI embeddings. Adapted (not in the official docs): the openai-node response nests the vector under `data[0].embedding`, and the `openai` import is added; see Notes.

```ts
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: env.YOUR_OPENAPI_KEY });

let userQuery = "a query from a user or service";

let embeddingResponse = await openai.embeddings.create({
	input: userQuery,
	model: "text-embedding-ada-002",
});

let matches = await env.TEXT_EMBEDDINGS.query(embeddingResponse.data[0].embedding, {
	topK: 1,
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| query vector | `number[]` / `Float32Array` / `Float64Array` | — | Needs no ID or metadata; dimensions must match the index. |
| topK | number | 5 | Number of results. |
| returnValues | boolean | false | Return vector values; also enables high-precision scoring. |
| returnMetadata | `none` / `indexed` / `all` | `none` | Which metadata to return. |
| namespace | string | — | Restrict to a namespace. |
| filter | object | — | Metadata filter. |

## Notes

- Corrected from the official docs: the OpenAI example used `embeddingResponse.embedding[0]`, which does not exist on the openai-node response (the embedding is at `data[0].embedding`). `env.YOUR_OPENAPI_KEY` is a placeholder for a Worker secret; do not hard-code the key.
- Corrected from the official docs: the source's `[54.8, 5.5, 3.1, ...]` and response `values: [..., ...]` elisions are not valid JavaScript / JSON; the snippets use complete 3-dimension arrays. Real query vectors must have the index's full dimension count.
- `queryById()` is described as combining a get-by-ID and a query; the binding method for the get is `getByIds`.
- Scoring: approximate scoring is the default (a trade-off of accuracy and latency); `returnValues: true` uses the original vectors for exact scores and more accurate results at higher latency.
- With Workers AI, passing `queryVector` or `queryVector.data` instead of `queryVector.data[0]` makes `query()` return an error.
- `topK` max 100; 50 with values or `all` metadata.
- The `EmbeddingResponse` interface (`shape: number[]`, `data: number[][]`) mirrors the one in the Workers AI tutorial.

## Related

- [Binding API](./binding-api.md)
- [Metadata filtering](./metadata-filtering.md)
- [Distance metrics](./distance-metrics.md)
- [Workers AI embeddings tutorial](./workers-ai-embeddings.md)
