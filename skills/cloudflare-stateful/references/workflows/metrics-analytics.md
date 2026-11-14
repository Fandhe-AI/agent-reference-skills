---
source: https://developers.cloudflare.com/workflows/observability/metrics-analytics/
---

# Metrics and analytics

Workflows execution metrics, event-type labels, and GraphQL Analytics API queries over the `workflowsAdaptiveGroups` dataset.

## Signature / Usage

Count and total `wallTime` for a Workflow grouped by hour:

```graphql
query WorkflowInvocationsExample(
	$accountTag: string!
	$datetimeStart: Time
	$datetimeEnd: Time
	$workflowName: string
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			wallTime: workflowsAdaptiveGroups(
				limit: 10000
				filter: {
					datetimeHour_geq: $datetimeStart
					datetimeHour_leq: $datetimeEnd
					workflowName: $workflowName
				}
				orderBy: [count_DESC]
			) {
				count
				sum {
					wallTime
				}
				dimensions {
					date: datetimeHour
				}
			}
		}
	}
}
```

Raw data for one instance from `workflowsAdaptive`:

```graphql
query WorkflowsAdaptiveExample(
	$accountTag: string!
	$datetimeStart: Time
	$datetimeEnd: Time
	$instanceId: string
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			workflowsAdaptive(
				limit: 100
				filter: {
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
					instanceId: $instanceId
				}
				orderBy: [datetime_ASC]
			) {
				datetime
				eventType
				workflowName
				instanceId
				stepCount
				wallTime
			}
		}
	}
}
```

Example query variables:

```json
{
	"accountTag": "fedfa729a5b0ecfd623bca1f9000f0a22",
	"datetimeStart": "2024-10-20T00:00:00Z",
	"datetimeEnd": "2024-10-29T00:00:00Z",
	"workflowName": "shoppingCart",
	"instanceId": "ecc48200-11c4-22a3-b05f-88a3c1c1db81"
}
```

## Options / Props

Dimensions of `workflowsAdaptiveGroups`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| workflowName | dimension | — | Workflow name, for example `my-workflow` |
| instanceId | dimension | — | Instance ID |
| stepName | dimension | — | Step name |
| eventType | dimension | — | Last observed status (values below) |
| stepCount | dimension | — | Step number within an instance |
| date | dimension | — | Date the Workflow was triggered |
| datetimeFifteenMinutes / datetimeFiveMinutes / datetimeHour / datetimeMinute | dimension | — | Date and time truncated to 15 minutes / 5 minutes / hour / minute |

`eventType` values, Workflow level:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| WORKFLOW_QUEUED | label | — | Queued, not running (for example when the account or the Workflow is at its concurrency limit) |
| WORKFLOW_START | label | — | Started and running |
| WORKFLOW_SUCCESS | label | — | Finished without errors |
| WORKFLOW_FAILURE | label | — | Failed (exhausted retries, errors thrown, etc.) |
| WORKFLOW_TERMINATED | label | — | Explicitly terminated |
| ROLLBACK_START | label | — | Began running registered rollback handlers |
| ROLLBACK_COMPLETE | label | — | All rollback handlers that ran completed successfully |
| ROLLBACK_FAILED | label | — | A rollback handler failed and rollback did not finish cleanly |

`eventType` values, step level:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| STEP_START / STEP_SUCCESS / STEP_FAILURE | label | — | Step started / finished without errors / failed |
| SLEEP_START / SLEEP_COMPLETE | label | — | Step is sleeping / last finished sleeping |
| ATTEMPT_START / ATTEMPT_SUCCESS / ATTEMPT_FAILURE | label | — | A retry started / succeeded / failed |
| ROLLBACK_STEP_START / ROLLBACK_STEP_SUCCESS / ROLLBACK_STEP_FAILURE | label | — | A rollback handler started / finished / failed |
| ROLLBACK_ATTEMPT_START / ROLLBACK_ATTEMPT_SUCCESS / ROLLBACK_ATTEMPT_FAILURE | label | — | A rollback retry attempt started / succeeded / failed |

## Notes

- Metrics are queried (and retained) for the past 31 days. The dashboard defaults to the last 24 hours; open a Workflow on the Workflows page of the Cloudflare dashboard.
- Workflows GraphQL datasets require an `accountTag` filter with your account ID. GraphQL introspection is supported: https://developers.cloudflare.com/analytics/graphql-api/ .
- The official metrics table lists a single metric, `readQueries` ("Read Queries (qps)... read queries issued against a database"), which reads like text carried over from a database product; the official example queries use `count`, `sum { wallTime }`, and `eventType`-filtered counts instead.
- The variable types `string!` / `string` are the lowercase scalar spelling used by the official examples (the same spelling as the Queues and KV analytics queries). The second official example (`WorkflowInvocationsExample2`) defines `stepCount` with the same `WORKFLOW_START` filter as `instanceRuns`, so it does not count steps; it is omitted here.
- Rollback event types let you tell forward failures from compensation failures.
- Source: https://developers.cloudflare.com/workflows/observability/metrics-analytics/index.md (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [concurrency-limits.md](./concurrency-limits.md)
- [subscribe-instance-events.md](./subscribe-instance-events.md)
- [rollback.md](./rollback.md)
- [limits.md](./limits.md)
