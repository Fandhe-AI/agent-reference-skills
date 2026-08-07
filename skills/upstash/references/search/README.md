# search

| Name | Description | Path |
|------|-------------|------|
| Advanced Settings | Tuning parameters for the `search` query beyond `query` and `limit`. | [advanced-settings.md](./advanced-settings.md) |
| Algorithm | The three-stage pipeline Upstash Search uses to rank results: input enrichment, hybrid vector search, and reranking. | [algorithm.md](./algorithm.md) |
| Content and Metadata | `content` holds the searchable, filterable fields of a document; `metadata` holds extra context that is not indexed for search. | [content-and-metadata.md](./content-and-metadata.md) |
| delete | Removes documents from an index by ID, ID prefix, or metadata/content filter. | [delete.md](./delete.md) |
| fetch | Retrieves documents by ID or by ID prefix, without running a search ranking pass. | [fetch.md](./fetch.md) |
| Filtering | SQL-like filter expressions to narrow `search` and `delete` results by `content` or `metadata` fields. | [filtering.md](./filtering.md) |
| Getting Started | Creating an Upstash Search database, adding documents, and running your first search. | [getting-started.md](./getting-started.md) |
| Indexes | An index groups documents within a Search database; used to organize data or implement multi-tenancy. | [indexes.md](./indexes.md) |
| info / reset | Index- and database-level statistics, and clearing all documents from an index. | [info-reset.md](./info-reset.md) |
| info | Returns index-level or database-level document counts and stats. | [info.md](./info.md) |
| What is Upstash Search? | Upstash Search is a standalone, AI-powered search product combining full-text and semantic search with intelligent ranking, serverless scaling, and no infrastructure management. | [overview.md](./overview.md) |
| Pricing & Limits | Upstash Search billing tiers and per-database limits. | [pricing.md](./pricing.md) |
| Python SDK (upstash-search) | HTTP-based Upstash Search client for Python. API mirrors the TypeScript SDK with Python naming conventions (snake_case). | [python-sdk.md](./python-sdk.md) |
| range | Retrieves documents in paginated, cursor-based chunks. Stateless — all parameters must be passed on every call. | [range.md](./range.md) |
| Reranking | Optional AI-powered reordering of search results for higher relevancy, combining semantic and full-text outcomes. | [reranking.md](./reranking.md) |
| reset | Clears all documents from an index. | [reset.md](./reset.md) |
| search | Retrieves the most relevant documents for a query using Upstash Search's hybrid semantic + full-text ranking. Scores are normalized between 0 and 1, where 1 is the highest relevance. | [search.md](./search.md) |
| @upstash/search TypeScript SDK | Serverless client for Upstash Search. Provides typed `search`, `upsert`, `fetch`, `delete`, `range`, `info`, and `reset` operations against a Search index. | [ts-sdk-overview.md](./ts-sdk-overview.md) |
| upsert | Adds new documents to an index or updates existing ones by ID. | [upsert.md](./upsert.md) |
