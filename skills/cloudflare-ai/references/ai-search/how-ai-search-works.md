---
source: https://developers.cloudflare.com/ai-search/, https://developers.cloudflare.com/ai-search/concepts/how-ai-search-works/, https://developers.cloudflare.com/ai-search/concepts/search-modes/
---

# How AI Search works

AI Search is a managed search service: connect a website, an R2 bucket, or upload documents, and it indexes the content for natural language queries from a Workers binding, REST API, or MCP server.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/ai-search/concepts/namespaces/

```ts
const instance = env.AI_SEARCH.get("my-instance");
const results = await instance.search({
	messages: [{ role: "user", content: "How does caching work?" }],
});
```

### Indexing (asynchronous)

1. Data ingestion from the data source or the Items API.
2. Markdown conversion with Workers AI Markdown Conversion (text-only embedding models caption images first).
3. Chunking.
4. Embedding (multimodal models embed image pixels directly).
5. Keyword indexing (BM25) when keyword search is enabled.
6. Storage of vectors, keyword index, and content.

### Querying (synchronous)

1. Receive the query (Search or Chat Completions endpoint).
2. Optional query rewriting.
3. Query embedding.
4. Vector search.
5. Optional keyword (BM25) search, run in parallel when hybrid is on.
6. Optional fusion of vector and keyword results.
7. Optional reranking with a cross-encoder.
8. Content retrieval (the Search endpoint returns here).
9. Response generation (Chat Completions only).

### Search modes

| Mode | Behavior |
|------|----------|
| Vector | Embeds the query and finds chunks with similar meaning. |
| Keyword | BM25 full-text match on exact terms. |
| Hybrid | Runs both in parallel and merges with a fusion method. New instances use hybrid by default. |

## Notes

- Hybrid is the default; opt out with `index_method` set to `{ vector: true, keyword: false }`.
- Workers AI embedding and reranking calls run under AI Search: they do not appear in AI Gateway logs or count toward Workers AI usage. Query rewriting, generation, and external-provider calls still use the connected gateway.
- AI Search is built on Vectorize. Use Vectorize when you manage vectors yourself; use AI Search for managed chunking, embedding, sync, hybrid retrieval, reranking, and optional generation.
- The source describes the legacy AutoRAG REST endpoints and the `env.AI.autorag()` binding as the previous API for AI Search; see migration-from-autorag.md.

| Capability | AI Search | Vectorize |
|------------|-----------|-----------|
| Input | Files or a connected data source | Vectors you generate |
| Chunking and embeddings | Handled for you | You generate and insert |
| Indexing | Automatic, continuous sync | You upsert and manage |
| Generated answers | Optional, built in | Not included |

## Related

- [Namespaces](./namespaces.md)
- [Indexing methods](./indexing-methods.md)
- [Models](./models.md)
- [Vectorize (sibling category)](../vectorize/README.md)
- R2 data sources: see the cloudflare-storage skill.
