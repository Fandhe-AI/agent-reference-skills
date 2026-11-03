---
source: https://developers.cloudflare.com/hyperdrive/observability/metrics/
---

# Metrics and analytics

Query volume, latency, cache status, and pool size metrics for each Hyperdrive configuration, via dashboard or the GraphQL Analytics API.

## Signature / Usage

```graphql
query HyperdriveQueries(
	$accountTag: string!
	$configId: string!
	$datetimeStart: Time!
	$datetimeEnd: Time!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			hyperdriveQueriesAdaptiveGroups(
				limit: 10000
				filter: {
					configId: $configId
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
				}
			) {
				count
				dimensions {
					cacheStatus
				}
			}
		}
	}
}
```

Average latencies (successful queries only):

```graphql
query AverageHyperdriveLatencies(
	$accountTag: string!
	$configId: string!
	$datetimeStart: Time!
	$datetimeEnd: Time!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			hyperdriveQueriesAdaptiveGroups(
				limit: 10000
				filter: {
					configId: $configId
					eventStatus: "complete"
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
				}
			) {
				avg {
					connectionLatency
					queryLatency
				}
			}
		}
	}
}
```

Total query and result bytes:

Adapted (not in the official docs): `$datetimeStart` / `$datetimeEnd` declared as `Time!` (the type of `datetime_geq` / `datetime_leq`, as in the other queries) instead of `Date!`; see Notes.

```graphql
query HyperdriveQueryAndResultBytesForSuccessfulQueries(
	$accountTag: string!
	$configId: string!
	$datetimeStart: Time!
	$datetimeEnd: Time!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			hyperdriveQueriesAdaptiveGroups(
				limit: 10000
				filter: {
					configId: $configId
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
				}
			) {
				sum {
					queryBytes
					resultBytes
				}
			}
		}
	}
}
```

Pool sizes:

```graphql
query HyperdrivePoolSizes(
	$accountTag: string!
	$configId: string!
	$datetimeStart: Time!
	$datetimeEnd: Time!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			hyperdrivePoolSizesAdaptiveGroups(
				limit: 10000
				filter: {
					configId: $configId
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
				}
			) {
				avg {
					currentPoolSize
					availablePoolSlots
					waitingClients
				}
				max {
					maxPoolSize
					currentPoolSize
					waitingClients
				}
				dimensions {
					coloCode
				}
			}
		}
	}
}
```

## Options / Props

`hyperdriveQueriesAdaptiveGroups`:

| Metric | GraphQL Field Name | Description |
| --- | --- | --- |
| Queries | `count` | The number of queries issued against your Hyperdrive in the given time period. |
| Cache Status | `cacheStatus` | Whether the query was cached or not. Can be one of `disabled`, `hit`, `miss`, `uncacheable`, `multiplestatements`, `notaquery`, `oversizedquery`, `oversizedresult`, `parseerror`, `transaction`, and `volatile`. |
| Query Bytes | `queryBytes` | The size of your queries, in bytes. |
| Result Bytes | `resultBytes` | The size of your query *results*, in bytes. |
| Connection Latency | `connectionLatency` | The time (in milliseconds) required to establish new connections from Hyperdrive to your database, as measured from your Hyperdrive connection pool(s). |
| Query Latency | `queryLatency` | The time (in milliseconds) required to query (and receive results) from your database, as measured from your Hyperdrive connection pool(s). |
| Event Status | `eventStatus` | Whether a query responded successfully (`complete`) or failed (`error`). |

`hyperdrivePoolSizesAdaptiveGroups`:

| Metric | GraphQL Field Name | Description |
| --- | --- | --- |
| Avg. open connections | `avg.currentPoolSize` | Average number of connections currently open in the pool. |
| Avg. available slots | `avg.availablePoolSlots` | Average number of pool connections available for checkout. |
| Avg. waiting clients | `avg.waitingClients` | Average number of clients waiting for a connection from the pool. |
| Pool size maximum | `max.maxPoolSize` | Configured maximum size of the connection pool. |
| Peak open connections | `max.currentPoolSize` | Peak number of connections open in the pool. |
| Peak waiting clients | `max.waitingClients` | Peak number of clients waiting for a connection from the pool. |

## Notes

- The `volatile` cache status means the query contains a PostgreSQL `STABLE` or `VOLATILE` function (for example `NOW()`, `RANDOM()`).
- Connection contention shows as spikes in waiting clients or open connections approaching the pool maximum; consider increasing the connection limit.
- Metrics are queryable and retained for the past 31 days. Dashboard: Hyperdrive > configuration > **Metrics** tab (default last 24 hours; location selector on the **Pool connections** chart).
- Corrected from the official docs: the official "total query and result bytes" query declares `$datetimeStart` / `$datetimeEnd` as `Date!`, while the filter fields `datetime_geq` / `datetime_leq` take `Time!` as in the other three queries; the variable types were changed to `Time!`. That query also lacks the `eventStatus: "complete"` filter used by the latency query, despite its "successful queries" operation name.
- GraphQL datasets require an `accountTag` filter with your account ID and support introspection. GraphQL Analytics API in general: see Cloudflare Analytics documentation.

## Related

- [Query caching](./query-caching.md)
- [Tune connection pooling](./tune-connection-pool.md)
- [Troubleshoot and debug](./troubleshooting.md)
