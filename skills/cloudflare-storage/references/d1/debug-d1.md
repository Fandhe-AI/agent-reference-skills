---
source: https://developers.cloudflare.com/d1/observability/debug-d1/
---

# Debug D1

D1's `stmt.` and `db.` methods throw an `Error` object on failure. Log `e.message` to capture exceptions; use the same tools as debugging Workers (`wrangler tail`, dashboard logs).

## Signature / Usage

```ts
try {
    // This is an intentional misspelling
    await db.exec("INSERTZ INTO my_table (name, employees) VALUES ()");
} catch (e: any) {
    console.error({
        message: e.message
    });
}
```

```json
{
	"message": "D1_EXEC_ERROR: Error in line 1: INSERTZ INTO my_table (name, employees) VALUES (): sql error: near \"INSERTZ\": syntax error in INSERTZ INTO my_table (name, employees) VALUES () at offset 0"
}
```

Bound the wait on a D1 call (the binding has no timeout option or `AbortSignal`):

```js
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('D1 call timed out')), 5000)
);
const result = await Promise.race([
  db.prepare('SELECT 1').first(),
  timeout,
]);
```

## Options / Props

Error constants (in addition to the extended message):

| Error message | Description | Recommended action |
| --- | --- | --- |
| `D1_ERROR` | Prefix of a specific D1 error. | See the list below. |
| `D1_EXEC_ERROR` | Exec error in line x: y error. | |
| `D1_TYPE_ERROR` | Type mismatch between a column and a value. A common cause is supplying an `undefined` variable (unsupported) instead of `null`. | Ensure the type of the value and the column match. |
| `D1_COLUMN_NOTFOUND` | Column not found. | Ensure you have selected a column which exists in the database. |

Specific `D1_ERROR` types:

| `D1_ERROR` type | Description | Recommended action |
| --- | --- | --- |
| `No SQL statements detected.` | The input query does not contain any SQL statements. | App action: Ensure the query contains at least one valid SQL statement. |
| `Your account has exceeded D1's maximum account storage limit, please contact Cloudflare to raise your limit` | Total storage across all D1 databases exceeded the account storage limit. | App action: Delete unused databases, or upgrade to a paid plan. |
| `Exceeded maximum DB size.` | The database exceeded its storage limit. | App action: Delete data rows, or shard your data into multiple databases. |
| `Your account has exceeded D1's free tier daily row read limit. Upgrade to a paid plan or wait until tomorrow (midnight UTC) to continue. See https://developers.cloudflare.com/d1/platform/limits/ for more details.` | Daily Free tier row read limit reached. | App action: Wait until midnight UTC, or upgrade to a paid plan. |
| `Your account has exceeded D1's free tier daily row write limit. Upgrade to a paid plan or wait until tomorrow (midnight UTC) to continue. See https://developers.cloudflare.com/d1/platform/limits/ for more details.` | Daily Free tier row write limit reached. | App action: Wait until midnight UTC, or upgrade to a paid plan. |
| `D1 DB reset because its code was updated.` | Cloudflare updated D1 (or the underlying Durable Object) and it is restarting. | Retry the operation. |
| `Internal error while starting up D1 DB storage caused object to be reset.` | The Durable Object containing the database is failing to start. | Retry the operation. |
| `Network connection lost.` | Network error affecting the specific D1 database instance (each database is its own Durable Object; one disruption does not affect others). D1 automatically retries read-only queries up to two additional times; write queries are not retried automatically. | Retry. For writes, use idempotent application-level retry logic. |
| `Replica disconnected from primary.` | Network error between the read replica and its primary. | Retry (see the retry note). |
| `Internal error in D1 DB storage caused object to be reset.` | An error caused the database to restart. | Retry the operation. |
| `Cannot resolve D1 DB due to transient issue on remote node.` | The query cannot reach the Durable Object containing the database. | Retry (see the retry note). |
| `Can't read from request stream because client disconnected.` | The connection was closed before the query was fully executed. | App action: Retry and keep the connection open. |
| `D1 DB storage operation exceeded timeout which caused object to be reset.` | A query is writing a large amount of data (e.g. GBs) and taking too long. | App action: Optimize queries, spread load over time, or shard. |
| `D1 DB is overloaded. Requests queued for too long.` | Requests queued too long (too many, or slow ones). | App action: Optimize queries, spread load over time, or shard. |
| `D1 DB is overloaded. Too many requests queued.` | The request queue is too long. | App action: Optimize queries, spread load over time, or shard. |
| `D1 DB is overloaded. Too many resources consumed within a 10 second window` | D1 rate limited the database after it consumed excessive CPU and memory resources over a ten-second period. Very large responses, frequent table scans over many rows, and slow queries can cause excessive resource consumption. | App action: Find and remediate slow and expensive queries. Refer to Find expensive queries (`find-expensive-queries.md`). |
| `D1 DB's isolate exceeded its memory limit and was reset.` | A query loaded too much into memory. | App action: Optimize queries, spread load over time, or shard. |
| `D1 DB exceeded its CPU time limit and was reset.` | A query used a lot of CPU time (e.g. scanning a 9 GB table, large import/export). | App action: Split the query into smaller shards. |
| `D1 query result exceeded the maximum response size limit of 50 MB` | Result larger than the maximum query result size of 50 MB. This limit is enforced from 2026-11-04. | App action: Select only the needed columns instead of `SELECT *`, or paginate with `LIMIT` and `OFFSET`. |

## Notes

- Retrying is only safe if the query is idempotent (read-only queries, `CREATE TABLE IF NOT EXISTS`); consider application-level checks.
- Automatic retries: D1 retries read-only queries (only those containing `SELECT`, `EXPLAIN`, `WITH`) up to two times on retryable errors. Any retry that causes a write is rolled back, so retries are free of side effects.
- Before `wrangler` 3.1.1, D1 JavaScript errors used the `cause` property; on older versions log `error?.cause?.message`.
- Binding calls (`run()`, `all()`, `first()`, `batch()`) do not accept timeouts; a call blocks until completion, an internal limit, or Worker termination. `Promise.race` only bounds the wait and does not cancel the query: a write that loses the race may still commit, so confirm the outcome before retrying.
- When reporting issues include the database ID (`wrangler d1 list`), the query (redact PII), the Worker code with `bind()` calls, and the full error text including `error.cause.message`.
- Source: https://developers.cloudflare.com/d1/observability/debug-d1/ (production `34d908a`, fetched 2026-11-14)

### API error codes

In addition to the `D1_ERROR` constants in the error list above, D1 returns numeric error codes on certain failures. Use the following table to identify the cause and recommended action.

| Code | Name | Common cause | Recommended action |
| --- | --- | --- | --- |
| 7403 | Service authorization failure | The API token or Wrangler OAuth session does not have sufficient scope for the operation. | Verify the token has the required permission for the endpoint. Run `wrangler login` to refresh the Wrangler OAuth session. |
| 7404 | Database not found | The database UUID does not exist in the account, or the binding is misconfigured. | Confirm the `database_id` in your `wrangler.toml` matches the database UUID shown in the Cloudflare dashboard. |
| 7406 | Limit exceeded | The account has reached the maximum number of D1 databases allowed on its plan. | Review your current limits (`limits.md`). Enterprise accounts with a custom database limit should contact Cloudflare support if the limit is not reflected. |
| 7429 | DB overloaded | Too many concurrent requests are queued, or queued requests are taking too long to complete. | Retry with exponential backoff and jitter. If the error recurs while SQL execution time (`queryBatchTimeMs`) is fast and your workload is low, check the [Cloudflare System Status](https://www.cloudflarestatus.com/) page. |
| 7500 | Internal error | A platform-side storage event made the database temporarily unavailable. | Check the [Cloudflare System Status](https://www.cloudflarestatus.com/) page. Retry with exponential backoff. If the database remains unavailable after the incident resolves, contact Cloudflare support. |
| 10000 | Authentication error | The API token does not have the required scope for the endpoint. | Check the required permission for the endpoint in the D1 API reference and create a token with the correct scope. Refer to "Error 10000 and token permissions" below. |

#### Error 7429 and analytics

If you receive error 7429 while your analytics show fast SQL execution times, the error may originate from a server-side platform event rather than your application's workload. The `queryBatchTimeMs` metric measures only SQL execution time inside the database, not the total time a request spends waiting to reach SQL. Check the Cloudflare System Status page before reducing application concurrency. If the error recurs and you suspect slow or expensive queries are contributing, refer to Find slow and expensive queries (`find-expensive-queries.md`) to identify the databases and queries using the most resources.

#### Error 10000 and token permissions

Error 10000 is an authentication error that occurs when the API token does not have the required permission for the endpoint. It is not specific to the export endpoint.

The most common cause for error 10000 during export is using a **D1 Read** token instead of a **D1 Write** token. The export operation requires D1 Write permission because it locks the database until the export completes; it is not a read-only operation.

To resolve this:

1. Go to **API Tokens** in your Cloudflare dashboard (`/profile/api-tokens`).
2. Create a new token with D1 Write permission, or check the D1 API reference for the required permission for the specific endpoint you are calling.
3. Use that token for the request.

## Related

- [Retry queries](./retry-queries.md)
- [Limits](./limits.md)
- [Local development](./local-development.md)
- [D1Database](./d1-database.md)
