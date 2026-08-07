# Advanced Settings

Tuning parameters for the `search` query beyond `query` and `limit`.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `reranking` | `boolean` | `false` | Enables AI-powered result reranking; billed separately at $1 per 1K operations |
| `semanticWeight` | `number` | `0.75` | Ratio of semantic vs. full-text search, `0`–`1`. Higher (0.7–1.0) favors conceptual search; lower (0.0–0.4) favors exact keyword matching |
| `inputEnrichment` | `boolean` | `true` | Expands the query with an LLM before searching; disabling improves latency but can reduce result quality |
| `keepOriginalQueryAfterEnrichment` | `boolean` | `false` | With `inputEnrichment` on, keeps the original query alongside the enriched one to preserve exact keyword matches |
| `filter` | `string` | — | SQL-like filter expression restricting results by content/metadata fields |

## Related

- [search.md](./search.md)
- [algorithm.md](./algorithm.md)
- [reranking.md](./reranking.md)
- [filtering.md](./filtering.md)
