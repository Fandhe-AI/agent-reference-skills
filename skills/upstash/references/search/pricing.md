# Pricing & Limits

Upstash Search billing tiers and per-database limits.

## Options / Props

| Plan | Price | Monthly Queries | Max Records | Databases |
|------|-------|------------------|--------------|-----------|
| Free | $0 | 20K | 200K | 1 |
| Pay as You Go | $0.05 / 1K requests | Unlimited | 2M | 100 |
| Pro | Coming soon | Unlimited | Unlimited | Unlimited |

## Notes

- Search and upsert requests are billed as standard requests; reranking requests are billed separately at $1 per 1K requests
- Bandwidth is included in query-based pricing
- Maximum document size: 4096 characters; maximum metadata size: 48KB per document
- Pay as You Go tier supports up to 50GB total data
- Free trials are available for Pro and Enterprise plans
- The FAQ states a different per-document limit (up to 1,500 characters per document), a 50GB cap per database, up to 10,000 indexes per database, and that storage is billed by number of documents stored; searches and document updates count as requests, and a multi-document query is one request. Reranking is billed per 100-document unit (99 documents = 1 unit, 101 = 2 units). The 4096-character figure above could not be re-verified: the official `search/overall/pricing` page now serves a generic Upstash pricing page without Search tiers. See faq.md
- All tiers support the REST API plus TypeScript and Python SDKs

## Related

- [overview.md](./overview.md)
