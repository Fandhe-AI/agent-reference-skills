---
source: https://developers.cloudflare.com/ai-search/how-to/chunk-citations/
---

# Show source citations with an AI-generated answer

Return the `chatCompletions()` answer together with one citation per source document, built from the returned chunks.

## Signature / Usage

Wrangler configuration (`wrangler.jsonc`; `main` points at the `src/index.ts` below):

Adapted (not in the official docs): `"remote": true` is added to the AI Search binding so `wrangler dev` proxies to the deployed instance, since AI Search does not run locally. See Notes.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "ai-search-citations",
  "main": "src/index.ts",
  "upload_source_maps": true,
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "default",
      "remote": true
    }
  ]
}
```

`src/index.ts` (set the secret with `npx wrangler secret put API_TOKEN`):

Adapted (not in the official docs): the official Worker is unauthenticated; this version rejects every request unless a bearer token matching the `API_TOKEN` secret is sent (fail closed), so the endpoint cannot be used to spend model usage anonymously. See Notes.

```ts
export interface Env {
	AI_SEARCH: AiSearchNamespace;
	API_TOKEN?: string;
}

function isAuthorized(request: Request, token: string | undefined): boolean {
	if (!token) return false; // fail closed when the secret is unset
	const enc = new TextEncoder();
	const given = enc.encode(request.headers.get("authorization") ?? "");
	const expected = enc.encode(`Bearer ${token}`);
	return (
		given.byteLength === expected.byteLength &&
		crypto.subtle.timingSafeEqual(given, expected)
	);
}

export default {
	async fetch(request, env): Promise<Response> {
		if (!isAuthorized(request, env.API_TOKEN)) {
			return new Response("Unauthorized", { status: 401 });
		}
		const url = new URL(request.url);
		const query = url.searchParams.get("query") ?? "What is Cloudflare?";

		// AI Search returns an answer and the source chunks used as context.
		const response = await env.AI_SEARCH.get("my-instance").chatCompletions({
			messages: [{ role: "user", content: query }],
		});

		// Show this model response to the user.
		const answer = response.choices[0]?.message?.content ?? "";

		// Group chunks by source document so each source appears once.
		const sourceMap = new Map<
			string,
			{ score: number; snippets: string[]; metadata?: Record<string, unknown> }
		>();

		for (const chunk of response.chunks) {
			// item.key is the source file path or URL.
			const key = chunk.item.key;
			const existing = sourceMap.get(key);

			if (existing) {
				// Keep the highest relevance score for each source.
				existing.score = Math.max(existing.score, chunk.score);
				existing.snippets.push(chunk.text.slice(0, 200));
			} else {
				sourceMap.set(key, {
					score: chunk.score,
					snippets: [chunk.text.slice(0, 200)],
					metadata: chunk.item.metadata,
				});
			}
		}

		const citations = [...sourceMap.entries()].map(
			([source, { score, snippets, metadata }], i) => ({
				index: i + 1,
				source,
				score,
				snippets,
				metadata,
			}),
		);

		return Response.json({ answer, citations });
	},
} satisfies ExportedHandler<Env>;
```

To rank or filter citations, each chunk also carries `scoring_details`:

```ts
const citations = response.chunks
	// Filter out lower-scoring chunks for stronger citations.
	.filter((chunk) => chunk.score > 0.5)
	// Expose scoring details if your UI shows confidence indicators.
	.map((chunk, index) => ({
		index: index + 1,
		source: chunk.item.key,
		score: chunk.score,
		vectorScore: chunk.scoring_details?.vector_score,
		keywordScore: chunk.scoring_details?.keyword_score,
		rerankingScore: chunk.scoring_details?.reranking_score,
		confidence: chunk.score > 0.8 ? "high" : "medium",
		snippet: chunk.text.slice(0, 200),
	}));
```

## Notes

- Adapted from the official docs: added the bearer-token gate and `"remote": true` on the binding (as in the other AI Search how-to guides, because AI Search does not run locally); the grouped-by-source version is shown (it supersedes the page's per-chunk version). For local development put `API_TOKEN` in `.dev.vars` and keep that file out of git.
- Each chunk has `id`, `type`, `score` (0 to 1), `text`, `item.key`, `item.timestamp`, `item.metadata`, and `scoring_details` (`vector_score`, `keyword_score`, `keyword_rank`, `vector_rank`, `reranking_score`, `fusion_method`). `keyword_*` and `fusion_method` appear with hybrid or keyword retrieval; `reranking_score` appears when reranking is enabled.
- `search()` returns the same `chunks` array, so the pattern also works for retrieval-only responses.
- Multi-instance searches tag each chunk with `instance_id`.

## Related

- [Chat completions](../references/ai-search/chat-completions.md)
- [Search](../references/ai-search/search.md)
- [Streaming citations](./search-streaming-citations.md)
