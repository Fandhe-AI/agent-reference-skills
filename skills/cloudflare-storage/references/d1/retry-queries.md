---
source: https://developers.cloudflare.com/d1/best-practices/retry-queries/
---

# Retry queries

Retry queries from your application on transient `D1_ERROR`s; use the Recommended action column of the error list to decide whether a query should be retried. Only retry writes that are idempotent.

## Signature / Usage

```ts
import { tryWhile } from "@cloudflare/actors";

function queryD1Example(d1: D1Database, sql: string) {
  return await tryWhile(async () => {
    return await d1.prepare(sql).run();
  }, shouldRetry);
}

function shouldRetry(err: unknown, nextAttempt: number) {
  const errMsg = String(err);
  const isRetryableError =
    errMsg.includes("Network connection lost") ||
    errMsg.includes("storage caused object to be reset") ||
    errMsg.includes("reset because its code was updated");
  if (nextAttempt <= 5 && isRetryableError) {
    return true;
  }
  return false;
}
```

## Notes

- D1 automatically retries read-only queries up to two more times on a retryable error.
- Adapted from the official docs: the official page recommends retrying write queries without qualification. Retrying is only safe if the query is idempotent (read-only queries, `CREATE TABLE IF NOT EXISTS`), as stated on the Debug D1 page: write queries are not retried automatically, and `Network connection lost` can occur after the write was already applied, so re-running `INSERT` or `SET count = count + 1` can apply it twice. For non-idempotent writes use an idempotency key / existence check or confirm the outcome before retrying. Pass only idempotent SQL to the example below.
- Apply an exponential backoff with jitter strategy; use `@cloudflare/actors` or copy its retry logic.
- Docs inconsistency: the example's `queryD1Example` uses `await` inside a non-`async` function; add `async` when copying.

## Related

- [Debug D1](./debug-d1.md)
- [D1Database](./d1-database.md)
