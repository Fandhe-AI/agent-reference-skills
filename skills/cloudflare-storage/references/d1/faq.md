---
source: https://developers.cloudflare.com/d1/reference/faq/
---

# FAQs

Frequently asked questions about D1 pricing and limits. The answers duplicate the Pricing and Limits pages; this page is a condensed index of them.

## Signature / Usage

Estimate cost from each query's `meta`:

```json
"meta": {
  "duration": 0.20472300052642825,
  "size_after": 45137920,
  "rows_read": 5000,
  "rows_written": 0
}
```

## Notes

Pricing:

- Free plan: always available for prototyping. Exceeding Free daily read/write limits returns errors until reset; at the storage limit delete data before inserting, altering tables, or creating indexes and triggers. Upgrading to Workers Paid removes limits, typically within minutes.
- Paid overage is billed per the pricing metrics. No egress charges. D1 does not charge for compute; Workers compute is billed under Workers pricing.
- Dashboard / Wrangler queries are billable (reads or writes).
- Indexes reduce rows read; each write to an indexed column adds at least one written row, usually offset by fewer reads.
- Empty database about 12 KB; empty table at least a few KB.
- Additional databases cost $0.10/month each beyond 100,000 included (e.g. 100,020 databases = $2.00).

Limits:

- Designed for horizontal scale-out across many 10 GB databases (the 10 GB limit cannot be increased).
- Each database is single-threaded: 1 ms avg query = at most 1,000 qps; 100 ms = 10 qps; per-request overhead applies. Use `batch()` to reduce requests. A full queue returns an "overloaded" error. Each database (and each replica) is backed by one Durable Object.
- Index reads are under a millisecond; writes take several ms; chunk large `UPDATE` / `DELETE` migrations (e.g. 1,000 rows at a time).
- CPU and memory follow the Workers platform limits.
- Up to six simultaneous connections to D1 per Worker invocation.

## Related

- [Pricing](./pricing.md)
- [Limits](./limits.md)
- [Use indexes](./use-indexes.md)
- [Debug D1](./debug-d1.md)
