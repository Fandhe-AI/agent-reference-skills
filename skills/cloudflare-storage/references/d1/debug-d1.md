---
source: https://developers.cloudflare.com/d1/observability/debug-d1/
---

# Debug D1

D1's `stmt.` and `db.` methods throw an `Error` object on failure. Log `e.message` to capture exceptions; use the same tools as debugging Workers (`wrangler tail`, dashboard logs).

## Signature / Usage

```js
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
| `D1 DB's isolate exceeded its memory limit and was reset.` | A query loaded too much into memory. | App action: Optimize queries, spread load over time, or shard. |
| `D1 DB exceeded its CPU time limit and was reset.` | A query used a lot of CPU time (e.g. scanning a 9 GB table, large import/export). | App action: Split the query into smaller shards. |
| `D1 query result exceeded the maximum response size limit of 50 MB` | Result larger than the maximum query result size of 50 MB. This limit is enforced from 2026-11-04. | App action: Select only the needed columns instead of `SELECT *`, or paginate with `LIMIT` and `OFFSET`. |

## Notes

- Retrying is only safe if the query is idempotent (read-only queries, `CREATE TABLE IF NOT EXISTS`); consider application-level checks.
- Automatic retries: D1 retries read-only queries (only those containing `SELECT`, `EXPLAIN`, `WITH`) up to two times on retryable errors. Any retry that causes a write is rolled back, so retries are free of side effects.
- Before `wrangler` 3.1.1, D1 JavaScript errors used the `cause` property; on older versions log `error?.cause?.message`.
- Binding calls (`run()`, `all()`, `first()`, `batch()`) do not accept timeouts; a call blocks until completion, an internal limit, or Worker termination. `Promise.race` only bounds the wait and does not cancel the query: a write that loses the race may still commit, so confirm the outcome before retrying.
- When reporting issues include the database ID (`wrangler d1 list`), the query (redact PII), the Worker code with `bind()` calls, and the full error text including `error.cause.message`.

## Related

- [Retry queries](./retry-queries.md)
- [Limits](./limits.md)
- [Local development](./local-development.md)
- [D1Database](./d1-database.md)
