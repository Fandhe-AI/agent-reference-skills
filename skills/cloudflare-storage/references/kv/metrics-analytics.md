---
source: https://developers.cloudflare.com/kv/observability/metrics-analytics/
---

# Metrics and analytics

KV exposes operations and storage analytics across all namespaces, queryable in the dashboard or through the GraphQL Analytics API.

## Signature / Usage

Operations per day and action type for a namespace:

```graphql
query KvOperationsSample(
	$accountTag: string!
	$namespaceId: string
	$start: Date
	$end: Date
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			kvOperationsAdaptiveGroups(
				filter: { namespaceId: $namespaceId, date_geq: $start, date_leq: $end }
				limit: 10000
				orderBy: [date_DESC]
			) {
				sum {
					requests
				}
				dimensions {
					date
					actionType
				}
			}
		}
	}
}
```

Read latency distribution:

```graphql
query KvOperationsSample2(
	$accountTag: string!
	$namespaceId: string
	$start: Date
	$end: Date
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			kvOperationsAdaptiveGroups(
				filter: {
					namespaceId: $namespaceId
					date_geq: $start
					date_leq: $end
					actionType: "read"
				}
				limit: 10000
			) {
				sum {
					requests
				}
				dimensions {
					actionType
				}
				quantiles {
					latencyMsP25
					latencyMsP50
					latencyMsP75
					latencyMsP90
					latencyMsP99
					latencyMsP999
				}
			}
		}
	}
}
```

Account-wide operations across all namespaces:

```graphql
query KvOperationsAllSample($accountTag: string!, $start: Date, $end: Date) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			kvOperationsAdaptiveGroups(
				filter: { date_geq: $start, date_leq: $end }
				limit: 10000
			) {
				sum {
					requests
				}
				dimensions {
					actionType
				}
			}
		}
	}
}
```

Daily storage (`keyCount`, `byteCount`):

```graphql
query Viewer(
	$accountTag: string!
	$namespaceId: string
	$start: Date
	$end: Date
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			kvStorageAdaptiveGroups(
				filter: { date_geq: $start, date_leq: $end, namespaceId: $namespaceId }
				limit: 10000
				orderBy: [date_DESC]
			) {
				max {
					keyCount
					byteCount
				}
				dimensions {
					date
				}
			}
		}
	}
}
```

Variables:

Adapted (not in the official docs): variable keys are `start` / `end` to match the `$start` / `$end` declarations in the query; see Notes.

```json
{
	"accountTag": "<YOUR_ACCOUNT_ID>",
	"namespaceId": "<YOUR_KV_NAMESPACE_ID>",
	"start": "2024-07-15",
	"end": "2024-07-30"
}
```

## Options / Props

| Dataset | GraphQL Dataset Name | Description |
|---------|----------------------|-------------|
| Operations | `kvOperationsAdaptiveGroups` | Operations made to your KV namespaces. |
| Storage | `kvStorageAdaptiveGroups` | Storage details of your KV namespaces. |

## Notes

- Metrics can be queried (and are retained) for the past 31 days.
- Per-namespace metrics in the dashboard: **Workers KV** > select a namespace > **Metrics** tab (defaults to the last 24 hours).
- Corrected from the official docs: the official variables JSON uses the keys `date_geq` / `date_leq`, but the query declares `$start` / `$end`; GraphQL variable names must match the declarations, so the keys are `start` / `end`.
- The `accountTag` filter with your Cloudflare Account ID is required. The GraphQL API supports introspection.

## Related

- [release-notes.md](./release-notes.md)
- [pricing.md](./pricing.md)
