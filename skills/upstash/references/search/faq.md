# Upstash Search FAQ

Limits, storage and billing answers, and the difference between Upstash Search and Upstash Redis Search.

## Signature / Usage

```text
Upload: upsert documents in batches of 100.
Remove a field: upsert the same document without that field.
```

Adapted (not in the official docs): the block above condenses two FAQ answers; the FAQ itself contains no code.

## Options / Props

| Topic | Answer |
| --- | --- |
| Large uploads | Write a script that upserts documents in batches of 100 |
| Max documents | Unlimited, but the whole database is capped at 50GB; each document up to 1,500 characters |
| Storage billing | Charged by number of documents stored, not by storage size |
| Full-text search | Supported through sparse indexes (special embedding models simulating full-text search in vector space) |
| Max indexes | Up to 10,000 indexes per database |
| Removing fields | Upsert the same document without the fields; empty indexes are removed automatically |
| Billing without searches | Stored documents are charged even if never searched |
| Searches and updates | Both counted as requests, charged at the same rate as document creation |
| Multi-document query | A query returning several documents is one request; reranking is billed per 100-document unit (99 documents = 1 unit, 101 = 2 units) |

## Notes

- Upstash Search is not Upstash Redis Search: Redis Search is a full-text extension built into Upstash Redis (based on Tantivy). Upstash Search is simpler and better for semantic search; Redis Search suits a fixed set of full-text operators, offers counting, aggregations and more filters, and tracks writes automatically for data already in Redis
- The 1,500-character document limit differs from the 4096 figure in pricing.md; both are kept as published and the FAQ is the newer page
- Source: https://upstash.com/docs/search/help/faq (fetched 2026-11-14; no version pin on the site)

## Related

- [pricing.md](./pricing.md)
- [overview.md](./overview.md)
- [upsert.md](./upsert.md)
- Redis Search: [search-introduction.md](../redis/search-introduction.md)
