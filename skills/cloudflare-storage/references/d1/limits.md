---
source: https://developers.cloudflare.com/d1/platform/limits/
---

# Limits

D1 account and database limits for storage, queries, row sizes, and SQL statements, plus guidance on throughput.

## Signature / Usage

Batch many statements in a single round trip to avoid the per-invocation query limit and the per-request overhead:

```ts
const stmt = env.DB.prepare(`SELECT * FROM Customers WHERE CompanyName = ?`);
const batchResult = await env.DB.batch([
	stmt.bind("Bs Beverages"),
	stmt.bind("Around the Horn")
]);
```

## Options / Props

| Feature | Limit |
| --- | --- |
| Databases per account | Workers Paid: 1,000,000. The first 100,000 databases are included. Each database above 100,000 costs $0.10 per month. Free: 10. |
| Maximum database size | 10 GB (Workers Paid) / 500 MB (Free) |
| Maximum storage per account | 1 TB (Workers Paid) <sup>1</sup> / 5 GB (Free) |
| Time Travel duration (point-in-time recovery) | 30 days (Workers Paid) / 7 days (Free) |
| Maximum Time Travel restore operations | 10 restores per 10 minutes (per database) |
| Queries per Worker invocation (subrequest limits) | 1000 (Workers Paid) / 50 (Free) |
| Maximum number of columns per table | 100 |
| Maximum number of rows per table | Unlimited (excluding per-database storage limits) |
| Maximum string, `BLOB` or table row size | 2,000,000 bytes (2 MB) |
| Maximum SQL statement length | 100,000 bytes (100 KB) |
| Maximum bound parameters per query | 100 |
| Maximum arguments per SQL function | 32 |
| Maximum characters (bytes) in a `LIKE` or `GLOB` pattern | 50 bytes |
| Maximum bindings per Workers script | Approximately 5,000 <sup>2</sup> |
| Maximum SQL query duration | 30 seconds <sup>3</sup> |
| Maximum file import (`d1 execute`) size | 5 GB <sup>4</sup> |
| Maximum query result size | 50 MB <sup>5</sup> |

Footnotes:

1. The maximum storage per account can be increased by request on Workers Paid and Enterprise plans.
2. A single Worker script can have up to 1 MB of script metadata; each resource binding is approximately 150 bytes (environment variables and secrets depend on value size). Excluding environment variables, you can bind up to ~5,000 D1 databases to a single Worker script.
3. Requests to the Cloudflare API must resolve in 30 seconds, so this also applies to the entire batch call.
4. The imported file is uploaded to R2 (R2 upload limit).
5. This limit takes effect on 2026-11-04. Queries returning a result larger than 50 MB fail with an error. REST API import and export operations are not subject to this limit.

## Notes

- Batch limits: per-query limits apply to each statement inside `db.batch()` (e.g. 100 KB statement length per statement). A `db.batch()` call counts as a single query against the queries-per-invocation limit; 2,000 individual queries in one invocation fail with `Too many API requests by single Worker invocation`.
- The 10 GB per-database limit cannot be increased. D1 is designed for horizontal scale-out across many smaller (10 GB) databases (per-user, per-tenant, per-entity).
- Each database is single-threaded and processes queries one at a time: at 1 ms per query at most 1,000 queries/sec; at 100 ms at most 10/sec. There is also per-request overhead not included in reported timings. To raise throughput, reduce the number of requests (use `batch()`). When the queue is full the database returns an "overloaded" error.
- Each database is backed by a single Durable Object; with read replication each replica is a separate Durable Object and the guidelines apply independently.
- Read queries with an appropriate index take under a millisecond; writes can take several milliseconds. Large `UPDATE` / `DELETE` migrations over many rows must run in chunks (e.g. 1,000 rows at a time).
- CPU and memory limits are the Workers platform limits (cloudflare-workers skill).
- A Worker can open up to six simultaneous connections to D1 per invocation.
- Request limit increases through the Limit Increase Request Form.

## Related

- [Pricing](./pricing.md)
- [Debug D1](./debug-d1.md)
- [Use indexes](./use-indexes.md)
- [FAQs](./faq.md)
- [Time Travel and backups](./time-travel.md)
