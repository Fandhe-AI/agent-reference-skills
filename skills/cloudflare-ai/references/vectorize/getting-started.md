---
source: https://developers.cloudflare.com/vectorize/get-started/intro/
---

# Introduction to Vectorize

Create a Vectorize index, bind it to a Worker, insert vectors, and run a similarity query.

## Signature / Usage

```sh
npm create cloudflare@latest -- vectorize-tutorial
cd vectorize-tutorial
npx wrangler vectorize create tutorial-index --dimensions=32 --metric=euclidean
npx wrangler vectorize create-metadata-index tutorial-index --property-name=url --type=string
```

Binding:

```jsonc
{
	"vectorize": [
		{
			"binding": "VECTORIZE", // available in your Worker on env.VECTORIZE
			"index_name": "tutorial-index"
		}
	]
}
```

```toml
[[vectorize]]
binding = "VECTORIZE"
index_name = "tutorial-index"
```

Adapted (not in the official docs): `/insert` now requires a bearer secret (`INSERT_TOKEN`) and fails closed when it is unset, because the official handler exposes an unauthenticated write endpoint on a public URL; the sample vectors are shortened to the first two (the source has five, ids 1-5); see Notes.

```typescript
export interface Env {
	// This makes your vector index methods available on env.VECTORIZE.*
	// For example, env.VECTORIZE.insert() or query()
	VECTORIZE: Vectorize;
	INSERT_TOKEN: string;
}

// Sample vectors: 32 dimensions wide.
//
// Vectors from popular machine-learning models are typically ~100 to 1536 dimensions
// wide (or wider still).
const sampleVectors: Array<VectorizeVector> = [
	{
		id: "1",
		values: [
			0.12, 0.45, 0.67, 0.89, 0.23, 0.56, 0.34, 0.78, 0.12, 0.9, 0.24, 0.67,
			0.89, 0.35, 0.48, 0.7, 0.22, 0.58, 0.74, 0.33, 0.88, 0.66, 0.45, 0.27,
			0.81, 0.54, 0.39, 0.76, 0.41, 0.29, 0.83, 0.55,
		],
		metadata: { url: "/products/sku/13913913" },
	},
	{
		id: "4",
		values: [
			0.17, 0.29, 0.42, 0.57, 0.64, 0.38, 0.51, 0.72, 0.22, 0.85, 0.39, 0.66,
			0.74, 0.32, 0.53, 0.48, 0.21, 0.69, 0.77, 0.34, 0.8, 0.55, 0.41, 0.29,
			0.7, 0.62, 0.35, 0.68, 0.53, 0.3, 0.79, 0.49,
		],
		metadata: { url: "/products/sku/418313" },
	},
];

export default {
	async fetch(request, env, ctx): Promise<Response> {
		let path = new URL(request.url).pathname;
		if (path.startsWith("/favicon")) {
			return new Response("", { status: 404 });
		}

		// You only need to insert vectors into your index once
		if (path.startsWith("/insert")) {
			// Fail closed: reject when the secret is unset or the header does not match
			if (
				!env.INSERT_TOKEN ||
				request.headers.get("Authorization") !== `Bearer ${env.INSERT_TOKEN}`
			) {
				return new Response("Unauthorized", { status: 401 });
			}
			const inserted = await env.VECTORIZE.insert(sampleVectors);

			// Return the mutation identifier for this insert operation
			return Response.json(inserted);
		}

		// In this example, you will construct a vector that should
		// match vector id #4
		const queryVector: Array<number> = [
			0.13, 0.25, 0.44, 0.53, 0.62, 0.41, 0.59, 0.68, 0.29, 0.82, 0.37, 0.5,
			0.74, 0.46, 0.57, 0.64, 0.28, 0.61, 0.73, 0.35, 0.78, 0.58, 0.42, 0.32,
			0.77, 0.65, 0.49, 0.54, 0.31, 0.29, 0.71, 0.57,
		]; // vector of dimensions 32

		// By default, vector values are not returned.
		const matches = await env.VECTORIZE.query(queryVector, {
			topK: 3,
			returnValues: true,
			returnMetadata: "all",
		});

		return Response.json({
			matches: matches,
		});
	},
} satisfies ExportedHandler<Env>;
```

Deploy and verify:

```sh
npx wrangler login
npx wrangler deploy
npx wrangler vectorize info tutorial-index
```

## Notes

- Adapted from the official docs: added the `INSERT_TOKEN` guard (store it with `npx wrangler secret put INSERT_TOKEN`; for local dev put it in `.dev.vars` and add that file to `.gitignore`), and shortened the sample list. Call `/insert` with `Authorization: Bearer <token>`. The official tutorial's step 5 and step 6 snippets contain the same handler with all five vectors (ids 1-5).
- The source's example query vector is built to match vector id 4; with the full five vectors, id 4 has score `0.46348256` under `euclidean` (closer to `0.0` is closer). Scores with only the two vectors above are not given in the source.
- Index name guidance: lowercase/numeric ASCII, shorter than 32 characters, starts with a letter, dashes instead of spaces; descriptive of use case and environment. Dimensions and metric cannot change later.
- Metadata indexes must be created before vectors are inserted (right after index creation is recommended); `--type` accepts `string`, `number`, `boolean`. Metadata indexing is asynchronous (a few seconds).
- `mutationId` returned by insert identifies an asynchronous operation; `vectorize info` shows `processedUpToMutation`. Re-inserting an existing ID returns a mutation ID but does not change the vector count; use upsert to overwrite.
- Vectorize is available on Workers Free and Paid.
- The source's step text mentions a `"vectorise"` key; the actual config key is `vectorize`.
- Vectorize V2 requires wrangler 3.71.0 or later.
- Wrangler flags: see cloudflare-wrangler (commands/vectorize.md).

## Related

- [Workers AI embeddings tutorial](./workers-ai-embeddings.md)
- [Binding API](./binding-api.md)
- [Create indexes](./create-indexes.md)
- [Metadata filtering](./metadata-filtering.md)
