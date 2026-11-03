---
source: https://developers.cloudflare.com/vectorize/get-started/embeddings/
---

# Vectorize and Workers AI

Generate 768-dimension embeddings with Workers AI `@cf/baai/bge-base-en-v1.5`, upsert them into Vectorize, and query them.

## Signature / Usage

```sh
npx wrangler vectorize create embeddings-index --dimensions=768 --metric=cosine
```

```jsonc
{
	"vectorize": [
		{
			"binding": "VECTORIZE",
			"index_name": "embeddings-index"
		}
	],
	"ai": {
		"binding": "AI" // available in your Worker on env.AI
	}
}
```

```toml
[[vectorize]]
binding = "VECTORIZE"
index_name = "embeddings-index"

[ai]
binding = "AI"
```

Adapted (not in the official docs): `/insert` requires a bearer secret (`INSERT_TOKEN`) and fails closed when unset, since the official handler lets anyone on the public URL spend Workers AI quota and write to the index; see Notes.

```typescript
export interface Env {
	VECTORIZE: Vectorize;
	AI: Ai;
	INSERT_TOKEN: string;
}
interface EmbeddingResponse {
	shape: number[];
	data: number[][];
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		let path = new URL(request.url).pathname;
		if (path.startsWith("/favicon")) {
			return new Response("", { status: 404 });
		}

		// You only need to generate vector embeddings once (or as
		// data changes), not on every request
		if (path === "/insert") {
			// Fail closed: reject when the secret is unset or the header does not match
			if (
				!env.INSERT_TOKEN ||
				request.headers.get("Authorization") !== `Bearer ${env.INSERT_TOKEN}`
			) {
				return new Response("Unauthorized", { status: 401 });
			}
			const stories = [
				"This is a story about an orange cloud",
				"This is a story about a llama",
				"This is a story about a hugging emoji",
			];
			const modelResp: EmbeddingResponse = await env.AI.run(
				"@cf/baai/bge-base-en-v1.5",
				{
					text: stories,
				},
			);

			// Each vector needs an ID, a value (the vector) and optional metadata.
			let vectors: VectorizeVector[] = [];
			let id = 1;
			modelResp.data.forEach((vector) => {
				vectors.push({ id: `${id}`, values: vector });
				id++;
			});

			let inserted = await env.VECTORIZE.upsert(vectors);
			return Response.json(inserted);
		}

		// Your query: expect this to match vector ID. 1 in this example
		let userQuery = "orange cloud";
		const queryVector: EmbeddingResponse = await env.AI.run(
			"@cf/baai/bge-base-en-v1.5",
			{
				text: [userQuery],
			},
		);

		let matches = await env.VECTORIZE.query(queryVector.data[0], {
			topK: 1,
		});
		return Response.json({
			matches: matches,
		});
	},
} satisfies ExportedHandler<Env>;
```

Expected response from `/`:

```json
{
	"matches": {
		"count": 1,
		"matches": [
			{
				"id": "1",
				"score": 0.89693683
			}
		]
	}
}
```

## Notes

- Adapted from the official docs: added the `INSERT_TOKEN` guard (set with `npx wrangler secret put INSERT_TOKEN`; locally use `.dev.vars` and gitignore it). Call `/insert` with `Authorization: Bearer <token>`. Original comments in the handler were shortened.
- `dimensions` must be 768 because the model outputs 768-dimension vectors; the `cosine` metric makes scores closer to one more similar.
- Workers AI returns `{ shape, data }`; pass `data[0]` to `query()`, not the wrapper.
- Upsert is used so re-running `/insert` overwrites rather than being ignored.
- Mutations are asynchronous; wait a few seconds after `/insert` before querying.
- Workers AI models and the `env.AI.run()` API are documented in [bindings-and-run.md](../workers-ai/bindings-and-run.md).
- Suggested extensions in the source: more inputs, a query parameter via `URL.searchParams`, and a different metric.

## Related

- [Getting started](./getting-started.md)
- [Query vectors](./query-vectors.md)
- [Distance metrics](./distance-metrics.md)
