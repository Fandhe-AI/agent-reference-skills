---
source: https://developers.cloudflare.com/d1/observability/find-expensive-queries/
---

# Find slow and expensive queries

Use `cf sql query` (SQL API) or `wrangler d1 insights` (GraphQL Analytics API) to find the databases and queries that read or write the most rows, then fix them with indexes, caching, or batching. API tokens need the Account Analytics Read permission; both commands return JSON.

## Signature / Usage

Most expensive databases (last 7 days):

```sh
npx cf sql query --scope-account <account_id> "
  SELECT
    databaseId,
    COUNT(*) AS numberOfTimesRun,
    SUM(rowsRead) AS totalRowsRead,
    SUM(rowsWritten) AS totalRowsWritten,
    AVG(queryDurationMs) AS avgDurationMs
  FROM events.d1Queries
  WHERE timestamp >= NOW() - INTERVAL '7' DAY
    AND error = ''
  GROUP BY databaseId
  ORDER BY totalRowsRead DESC
  LIMIT 10
"
```

```sh
npx wrangler d1 insights --sort-by=reads --time-period=7d --limit=20 --json
```

Queries that need an index:

```sh
npx cf sql query --scope-account <account_id> "
  SELECT
    databaseId,
    query,
    COUNT(*) AS numberOfTimesRun,
    SUM(rowsRead) AS totalRowsRead,
    AVG(rowsRead) AS avgRowsRead,
    if(SUM(rowsRead) = 0, 0.0,
       SUM(rowsReturned) / SUM(rowsRead)) AS queryEfficiency
  FROM events.d1Queries
  WHERE timestamp >= NOW() - INTERVAL '7' DAY
    AND error = ''
  GROUP BY databaseId, query
  ORDER BY totalRowsRead DESC
  LIMIT 5
"
```

Fix flow: if you use D1 migrations to manage your schema, create a migration, add the `CREATE INDEX`, apply it, then verify with `EXPLAIN QUERY PLAN`:

```sh
npx wrangler d1 migrations create <database_name> add_orderdetail_orderid_index
```

```sql
-- Migration number: 0001 	 2026-10-29T15:42:06.092Z
CREATE INDEX IF NOT EXISTS idx_orderdetail_orderid ON OrderDetail (OrderId);
```

```sh
npx wrangler d1 migrations apply <database_name> --remote
npx wrangler d1 execute <database_name> --remote --command="EXPLAIN QUERY PLAN <query>"
```

Queries to cache (read queries that run most often):

```sh
npx cf sql query --scope-account <account_id> "
  SELECT
    databaseId,
    query,
    COUNT(*) AS numberOfTimesRun,
    SUM(rowsRead) AS totalRowsRead,
    AVG(queryDurationMs) AS avgDurationMs
  FROM events.d1Queries
  WHERE timestamp >= NOW() - INTERVAL '1' DAY
    AND rowsWritten = 0
    AND error = ''
  GROUP BY databaseId, query
  ORDER BY numberOfTimesRun DESC
  LIMIT 5
"
```

Queries to batch:

```ts
// Before: one round trip to D1 for each order detail
for (const detail of details) {
	await env.DB.prepare(
		"INSERT INTO OrderDetail (Id, OrderId, ProductId, UnitPrice, Quantity, Discount) VALUES (?, ?, ?, ?, ?, ?)",
	)
		.bind(detail.id, orderId, detail.productId, detail.unitPrice, detail.quantity, detail.discount)
		.run();
}

// After: one round trip to D1 for all the order details
const insertDetail = env.DB.prepare(
	"INSERT INTO OrderDetail (Id, OrderId, ProductId, UnitPrice, Quantity, Discount) VALUES (?, ?, ?, ?, ?, ?)",
);
await env.DB.batch(
	details.map((detail) =>
		insertDetail.bind(detail.id, orderId, detail.productId, detail.unitPrice, detail.quantity, detail.discount),
	),
);
```

## Options / Props

`events.d1Queries` dataset columns (one row per D1 query):

| Name | Type | Description |
|------|------|-------------|
| `databaseId` | string | Database that ran the query |
| `query` | string | Query text (bound parameters are not captured) |
| `queryDurationMs` | number | Query duration |
| `rowsRead` | number | Rows read |
| `rowsReturned` | number | Rows returned |
| `rowsWritten` | number | Rows written |
| `error` | string | Empty string when the query succeeded |

## Notes

- A query is usually slow when it reads many more rows than it returns; many sequential small queries make a request slow (each is a round trip).
- `events.d1Queries` is sampled. The SQL API applies sample weights to `COUNT`, `SUM`, `AVG` automatically; do not multiply by `sampleInterval`. Pass `sampleInterval` only as a weight argument (for example `quantileWeighted(0.95, queryDurationMs, sampleInterval)`).
- `wrangler d1 insights` returns queries, not databases; each result has a `databaseId`. Sum `totalRowsRead` per `databaseId` to rank databases. Get a database name with `npx cf d1 get <database_id>` or `npx wrangler d1 info <database_id>`.
- To rank by writes use `ORDER BY totalRowsWritten`; for slowest use `avgDurationMs`. For writes use `--sort-by=writes`; for frequency `--sort-by=count`.
- Index step: look for a high `avgRowsRead` and a `queryEfficiency` (rows returned / rows read) much lower than `1`; a missing index on a `WHERE`, `JOIN` or `ORDER BY` column is the usual cause. `SCAN` should become `SEARCH ... USING INDEX`. After the fix, re-run with a shorter period (`INTERVAL '1' HOUR` / `--time-period=1h`) since older queries inflate longer windows. The `cf d1 migrations` / `cf d1 query` / `cf d1 get` variants appear in the source (the database must be in your Wrangler configuration for `cf d1 migrations create`).
- Cache step: store results in Workers KV or the Cache API with an expiration matching data volatility; do not cache queries that must always return the newest data.
- Batch step: statements in `batch()` run in one SQL transaction (all roll back if one fails); `batch()` reduces round trips, not rows read or written. Statements in a batch remain separate queries in analytics. `avgRowsWritten` includes index rows (one insert into a table with two indexes = 3).
- The `cf` CLI is Cloudflare's CLI; `wrangler d1 insights` is experimental.
- The migration steps are optional: the official page now begins the index fix with "If you use D1 migrations to manage your database schema, add the index with a migration" (earlier revision: unconditional "Create a migration"). Without migrations, create the index with another method (for example `wrangler d1 execute`), then verify with `EXPLAIN QUERY PLAN`.
- Source: https://developers.cloudflare.com/d1/observability/find-expensive-queries/ (production `34d908a`, fetched 2026-11-14)

## Related

- [Use indexes](./use-indexes.md)
- [Metrics and analytics](./metrics-analytics.md)
- [Migrations](./migrations.md)
- [Pricing](./pricing.md)
- [D1Database](./d1-database.md)
