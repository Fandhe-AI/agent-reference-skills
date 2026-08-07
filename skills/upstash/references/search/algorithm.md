# Algorithm

The three-stage pipeline Upstash Search uses to rank results: input enrichment, hybrid vector search, and reranking.

## Notes

- **Stage 1 — Input Enrichment**: an LLM expands the query with related terms/context to better capture user intent. Enabled by default; can be disabled to reduce latency
- **Stage 2 — Hybrid Vector Search**: merges semantic (vector embedding) search with full-text keyword matching. Default weighting is 75% semantic / 25% full-text, adjustable via `semanticWeight`
- **Stage 3 — Reranking**: optionally reorders results with an AI model. Two tiers: Advanced Reranking (higher quality, $1 per 1K operations) and Standard Reranking (faster, no extra cost)
- Designed to work across content domains, balancing precision for technical/keyword queries with flexibility for conceptual/semantic queries

## Related

- [search.md](./search.md)
- [advanced-settings.md](./advanced-settings.md)
- [reranking.md](./reranking.md)
