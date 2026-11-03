---
source: https://developers.cloudflare.com/vectorize/
---

# Vectorize overview

Vectorize is Cloudflare's globally distributed vector database for storing and querying embeddings from Cloudflare Workers.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/vectorize/reference/client-api/

```jsonc
{
	"vectorize": [
		{
			"binding": "PROD_SEARCH", // the index will be available as env.PROD_SEARCH in your Worker
			"index_name": "production-doc-search",
		},
	],
}
```

## Notes

- Embeddings can come from Workers AI built-in models or from other providers such as OpenAI.
- Returned vectors can reference images in R2, documents in KV, or user profiles in D1, so a search result can be resolved to a concrete object inside the Workers platform.
- Vectorize is Generally Available.
- Distinct from Upstash Vector (covered by the upstash skill) and from fandhe-db; those are different products with their own APIs.
- The `wrangler vectorize` command flags are documented in the cloudflare-wrangler skill (commands/vectorize.md).
- Managed RAG that sets up Vectorize automatically is AI Search: [how-ai-search-works.md](../ai-search/how-ai-search-works.md)

## Related

- [Getting started](./getting-started.md)
- [Binding API](./binding-api.md)
- [Limits](./limits.md)
- [Pricing](./pricing.md)
- [What is a vector database](./what-is-a-vector-database.md)
