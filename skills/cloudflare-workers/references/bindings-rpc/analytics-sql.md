---
source: https://developers.cloudflare.com/workers/runtime-apis/bindings/analytics-sql/
---

# Analytics SQL binding

Query analytics datasets from a Worker with the Analytics SQL binding.

## Signature / Usage

Requires Wrangler 4.145.0 or later for the `analytics` key.

```jsonc
{
	"analytics": {
		"binding": "ANALYTICS_SQL"
	}
}
```

```ts
interface Env {
	ANALYTICS_SQL: AnalyticsSQLBinding;
}

type CountRow = {
	requests: number;
};

export default {
	async fetch(_request, env): Promise<Response> {
		const start = new Date(Date.now() - 60 * 60 * 1000).toISOString();
		const result = await env.ANALYTICS_SQL.query<CountRow>({
			query: "SELECT COUNT(*) AS requests FROM events.httpRequests WHERE timestamp >= $start",
			params: { start },
		});

		return Response.json(result);
	},
} satisfies ExportedHandler<Env>;
```

`query()` executes one SQL `SELECT` statement:

```ts
query<T extends Record<string, unknown> = Record<string, unknown>>(
	request: AnalyticsSQLQuery,
): Promise<AnalyticsSQLResult<T>>;
```

## Options / Props

`AnalyticsSQLQuery`:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `query` | `string` | Yes | SQL statement to execute. Use `$1` for positional parameters or `$name` for named parameters. |
| `params` | array or object | No | Values for the placeholders in `query`. |

An `AnalyticsSQLParameter` can be a `string`, `number`, `boolean`, or `null`.

`AnalyticsSQLResult<T>`:

| Property | Type | Description |
|----------|------|-------------|
| `data` | `T[]` | Query result rows keyed by selected column names. |
| `rows` | `number` | Number of rows in `data`. |
| `statistics` | `AnalyticsSQLStatistics` | Execution statistics for the query. |

## Notes

- The binding derives account scope from the Worker; it does not accept `scope` or `time_range` request properties.
- `statistics` contains `elapsed_ms`, `rows_read`, and `bytes_read` (see https://developers.cloudflare.com/analytics/sql-api/query-api/#response-formats).
- The promise rejects on query failure. The thrown error has a boolean `retryable` property; retry with bounded exponential backoff only when it is `true`. The binding does not retry automatically. Errors: https://developers.cloudflare.com/analytics/sql-api/errors/
- Datasets and SQL syntax: https://developers.cloudflare.com/analytics/sql-api/

## Related

- [bindings-overview.md](./bindings-overview.md)
- [version-metadata.md](./version-metadata.md)
