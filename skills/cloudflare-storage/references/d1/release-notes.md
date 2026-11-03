---
source: https://developers.cloudflare.com/d1/platform/release-notes/
---

# Release notes

Chronological D1 feature updates, bug fixes and breaking changes (2023-05 to 2025-11), condensed by date (newest first).

## Signature / Usage

Read-only-query automatic retries expose attempts in the result `meta`:

```ts
// retrieve bookmark from previous session stored in HTTP header
const bookmark = request.headers.get("x-d1-bookmark") ?? "first-unconstrained";

const session = env.DB.withSession(bookmark);
const result = await session
  .prepare(`SELECT * FROM Customers WHERE CompanyName = 'Bs Beverages'`)
  .run();
// store bookmark for a future session
response.headers.set("x-d1-bookmark", session.getBookmark() ?? "");
```

## Options / Props

| Date | Change |
| --- | --- |
| 2025-11-05 | Set a jurisdiction when creating a D1 database to guarantee where it runs and stores data. |
| 2025-09-11 | D1 automatically retries read-only queries (`SELECT`, `EXPLAIN`, `WITH` only) up to two times; attempts exposed as `total_attempts` in the response metadata. Retries are rolled back if any write occurred. Keep application-level retries for idempotent writes. |
| 2025-07-01 | Maximum D1 storage per account on Workers Paid increased from 250 GB to 1 TB. |
| 2025-07-01 | D1 alpha database backup access (`wrangler d1 backup`, wrangler v3) removed. |
| 2025-05-30 | 50-500 ms faster D1 REST API requests (authentication at the nearest data center). |
| 2025-05-02 | HTTP API permissions bug fixed: `D1:Edit` permission is required for any database writes via HTTP API. |
| 2025-04-10 | D1 read replication public beta with the Sessions API (`withSession`, bookmarks). |
| 2025-02-19 | `PRAGMA optimize` supported; run after schema changes. |
| 2025-02-04 | Fixed bug: read-only UI roles / read-only API tokens could run modifying queries via the `Tables` tab and `/query` REST API. Write queries with read-only access now fail. |
| 2025-01-13 | Free tier limits enforced from 2025-02-10 (errors until reset at 00:00 UTC); Workers Paid minimum $5/month. |
| 2025-01-07 | D1 Worker API request latency decreased 40-60% (redundant round trips removed). |
| 2024-08-23 | D1 alpha databases stopped accepting SQL queries (HTTP 400 with migration pointer). |
| 2024-07-26 | `run()` TypeScript typing fixed in `@cloudflare/workers-types` 4.20240725.0: `stmt.run<T>(): D1Result` (previously incorrect `D1Response`). |
| 2024-06-17 | HTTP API returns 429 (not 500) for overloaded databases; Workers API unaffected. |
| 2024-04-30 | Alpha databases to stop accepting live SQL queries on August 15, 2024 (later stated as 2024-08-23). |
| 2024-04-12 | HTTP API returns 400 (not 500) for invalid queries; Workers API unaffected. |
| 2024-04-05 | D1 alpha databases deprecated. |
| 2024-04-01 | D1 generally available. Workers Paid: 10 GB per-database limit (up from 2 GB); Free retains 500 MB and 10 databases; databases can be exported as SQL. |
| 2024-03-12 | As of `wrangler@3.33.0`, `wrangler d1 execute` and `wrangler d1 migrations apply` default to a local database; `--local` / `--remote` select explicitly. |
| 2024-03-05 | D1 billing begins counting usage. |
| 2024-02-16 | The 2024-02-13 `run()` change was reverted; `run()` returns `D1Result` with rows. A future change to `D1ExecResult` will be gated behind a compatibility date. |
| 2024-02-13 | `raw()` returns an array of arrays (use `raw({columnNames: true})` for names); `all()` returns array of objects. Potentially breaking for code expecting objects from `raw()`. |
| 2024-01-18 | `LIMIT` supported on `UPDATE` and `DELETE`. |
| 2023-12-18 | Legacy alpha automated hourly backups disabled. |
| 2023-10-03 | Up to 50,000 databases per account on Workers Paid; 50 GB total storage. |
| 2023-09-28 | D1 public beta; 2 GB per database on Paid (new storage subsystem). |
| 2023-08-19 | `rows_read` / `rows_written` returned per query in `meta`. |
| 2023-08-09 | Bind D1 from the dashboard; wrangler 3.5.0+ recommended; remove legacy `__D1_BETA__` binding prefix. |
| 2023-08-01 | Per-database limit 500 MB. |
| 2023-07-27 | New default storage subsystem (6-20x faster); Time Travel available. `wrangler d1 info` `version` field distinguishes alpha from the new backend. |
| 2023-06-28 | Per-database metrics in dashboard and GraphQL Analytics API. |
| 2023-06-16 | Generated columns documentation. |
| 2023-06-12 | Detailed errors move to `Error.message` (wrangler v3.1.1); `Error.cause` deprecated. |
| 2023-05-19 | Experimental backend (`--experimental-backend`); location hints. |
| 2023-05-17 | Query JSON documentation. |

## Notes

- Release notes are historical; limits and behaviors stated here (for example per-database size, database counts, `run()` return type) may differ from current Limits and API pages, which take precedence.
- The 2024-04-30 entry says alpha databases stop accepting queries on August 15, 2024, while the 2024-08-23 entry and the migration guide state they stopped on August 22/23, 2024; the pages disagree on the exact date.
- The 2023-07-27 entry says `version: beta` marks the new backend, while Time Travel / Backups pages say `version: production`.
- The source includes the RSS feed link `https://developers.cloudflare.com/d1/platform/release-notes/index.xml`.

## Related

- [Alpha database migration guide](./alpha-migration.md)
- [Limits](./limits.md)
- [Global read replication](./read-replication.md)
- [Return objects](./return-objects.md)
