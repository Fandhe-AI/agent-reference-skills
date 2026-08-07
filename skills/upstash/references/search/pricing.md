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
- All tiers support the REST API plus TypeScript and Python SDKs

## Related

- [overview.md](./overview.md)
