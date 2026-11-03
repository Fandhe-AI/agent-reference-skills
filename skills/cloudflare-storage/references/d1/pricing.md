---
source: https://developers.cloudflare.com/d1/platform/pricing/
---

# Pricing

D1 bills on usage (rows read, rows written), storage above the plan's included limits, and the number of databases. Scale-to-zero: no charge for hours or capacity units when idle.

## Signature / Usage

Each query's `meta` object reports rows read and written, which you can use to estimate your bill:

```json
"meta": {
  "duration": 0.20472300052642825,
  "size_after": 45137920,
  "rows_read": 5000,
  "rows_written": 0
}
```

## Options / Props

|  | Workers Free | Workers Paid |
| --- | --- | --- |
| Rows read | 5 million / day | First 25 billion / month included + $0.001 / million rows |
| Rows written | 100,000 / day | First 50 million / month included + $1.00 / million rows |
| Storage (per GB stored) | 5 GB (total) | First 5 GB included + $0.75 / GB-mo |
| Databases | 10 | First 100,000 included + $0.10 per additional database per month. |

## Notes

- You pay $0.10 per month for each database above the included amount, even when empty or idle. Example: 100,020 databases for a full month cost `(100,020 - 100,000) x $0.10 = $2.00`.
- Rows read = rows scanned regardless of row size (a full scan of a 5000-row table = 5,000 rows read). Filtering on an unindexed column still scans the table.
- Rows written: `INSERT`, `UPDATE`, `DELETE` (inserting 10 rows = 10 rows written). An index adds one extra written row per write touching the indexed column. DDL (`CREATE`, `ALTER`, `DROP`) may count as a mix of reads and writes.
- Row size and column count do not affect counting.
- Storage is the sum across all databases (tables and indexes). An empty database is about 12 KB; an empty table uses at least a few KB.
- Free daily limits reset at 00:00 UTC; monthly included usage resets on your subscription renewal date.
- No egress or bandwidth charges. Read replication adds no extra cost. D1 does not charge for compute; Workers compute is billed per Workers pricing.
- Dashboard and Wrangler queries are billable (including imports, table scans, index creation).
- Free plan exceeded: queries return errors until reset (or upgrade; typically minutes); at the storage limit you must delete data before inserting, altering tables, or creating indexes/triggers. Paid plan: overage is billed.
- Track usage with the `meta` object, the GraphQL Analytics API, or Dashboard > D1 database > Metrics > Row Metrics.
- Workers Free always includes the ability to prototype with D1.

## Related

- [Limits](./limits.md)
- [Use indexes](./use-indexes.md)
- [Billing](./billing.md)
- [Metrics and analytics](./metrics-analytics.md)
- [FAQs](./faq.md)
