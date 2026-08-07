# search

Retrieves the most relevant documents for a query using Upstash Search's hybrid semantic + full-text ranking. Scores are normalized between 0 and 1, where 1 is the highest relevance.

## Signature / Usage

```ts
// Basic search
const searchResults = await index.search({
  query: "space opera",
  limit: 2,
})

// With reranking
const rerankedResults = await index.search({
  query: "space opera",
  limit: 2,
  reranking: true,
})

// With a content filter
const filteredResults = await index.search({
  query: "space",
  limit: 2,
  filter: "category = 'classic'",
})
```

```python
scores = index.search(
    query="space opera",
    limit=2,
    reranking=True,
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `query` | `string` | Required. The search string |
| `limit` | `number` | Required. Maximum results to return. Default: `5` (TypeScript SDK), `10` (Python SDK) |
| `reranking` | `boolean` | Enables AI-powered result reranking. Default: `false` |
| `filter` | `string` | SQL-like filter expression over `content` (and `@metadata.*`) fields |
| `semanticWeight` | `number` | Balance between semantic and keyword matching, `0`–`1`. Default: `0.75` |
| `inputEnrichment` | `boolean` | Expands the query with an LLM before searching. Default: `true` |
| `keepOriginalQueryAfterEnrichment` | `boolean` | Keeps the original query alongside the enriched one. Default: `false` |

## Notes

- Response is a `SearchResult` with a `results` array of matching documents plus normalized `score` values (0–1)
- `reranking: true` is billed separately from standard search/upsert requests
- Higher `semanticWeight` (0.7–1.0) favors conceptual/semantic matches; lower values (0.0–0.4) favor exact keyword matches
- This is Upstash **Search** (`@upstash/search` client, standalone AI-powered search product), distinct from Upstash **Redis Search** (`references/redis/search-*.md` in this skill), the Tantivy-based full-text extension built into Redis

## Related

- [reranking.md](./reranking.md)
- [filtering.md](./filtering.md)
- [algorithm.md](./algorithm.md)
- [advanced-settings.md](./advanced-settings.md)
