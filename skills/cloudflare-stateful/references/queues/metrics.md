---
source: https://developers.cloudflare.com/queues/observability/metrics/
---

# Metrics

Queue backlog, consumer concurrency and message-operation metrics via the GraphQL Analytics API, plus realtime backlog via REST and the JavaScript binding.

## Signature / Usage

Adapted (not in the official docs): the official third query declares `$datetimeStart` / `$datetimeEnd` as `Date!` while filtering the `datetime` field, unlike the other two queries which use `Time!`; changed to `Time!`. Dataset and filter names are kept as in the official queries; see Notes.

```graphql
query QueueMessageOperationsByMinute(
	$accountTag: string!
	$queueId: string!
	$datetimeStart: Time!
	$datetimeEnd: Time!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			queueMessageOperationsAdaptiveGroups(
				limit: 10000
				filter: {
					queueId: $queueId
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
				}
				orderBy: [datetimeMinute_DESC]
			) {
				count
				sum {
					bytes
				}
				dimensions {
					datetimeMinute
				}
			}
		}
	}
}
```

Backlog:

```graphql
query QueueBacklog(
	$accountTag: string!
	$queueId: string!
	$datetimeStart: Time!
	$datetimeEnd: Time!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			queueBacklogAdaptiveGroups(
				limit: 10000
				filter: {
					queueId: $queueId
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
				}
			) {
				avg {
					messages
					bytes
				}
			}
		}
	}
}
```

## Options / Props

### Backlog (`queuesBacklogAdaptiveGroups` in the page text)

| Metric | GraphQL field | Description |
| --- | --- | --- |
| Backlog bytes | `bytes` | Average backlog size in bytes |
| Backlog messages | `messages` | Average backlog size in messages |

Dimensions: `queueID`, `datetime`, `date`, `datetimeHour`, `datetimeMinute`.

### Consumer concurrency (`queueConsumerMetricsAdaptiveGroups`)

| Metric | GraphQL field | Description |
| --- | --- | --- |
| Avg. Consumer Concurrency | `concurrency` | Average concurrent consumers over the period |

Dimensions: `queueID`, `datetime`, `date`, `datetimeHour`, `datetimeMinute`.

### Message operations (`queueMessageOperationsAdaptiveGroups`)

| Metric | GraphQL field | Description |
| --- | --- | --- |
| Total billable operations | `billableOperations` | Sum of writes, reads and deletes |
| Total Bytes | `bytes` | Sum of bytes read, written and deleted |
| Lag | `lagTime` | Average ms between write and the consume operation |
| Retries | `retryCount` | Average retries per message |
| Message Size | `messageSize` | Maximum message size in the period |

Dimensions: `queueID`, `actionType` (`WriteMessage`, `ReadMessage`, `DeleteMessage`), `consumerType` (`worker`, `http`; only for read/delete), `outcome` (`success`, `dlq`, `fail`; only for delete), `datetime`, `date`, `datetimeHour`, `datetimeMinute`.

### Realtime backlog (REST and JavaScript)

| Metric | Field | Description |
| --- | --- | --- |
| Backlog count | `backlog_count` | Messages currently in the queue |
| Backlog bytes | `backlog_bytes` | Total size of messages in bytes |
| Oldest message timestamp | `oldest_message_timestamp_ms` | Timestamp (ms) of the oldest message |

## Notes

- REST endpoint: `/accounts/{account_id}/queues/{queue_id}/metrics`. The same values appear in `metadata.metrics` on `send()`, `sendBatch()` and `metrics()` (camelCase there: `backlogCount`, `backlogBytes`, `oldestMessageTimestamp`).
- Doc inconsistencies: prose names the dataset `queuesBacklogAdaptiveGroups` but the example queries use `queueBacklogAdaptiveGroups`; the dimension list says `queueID` while the filters use `queueId`. Verify with GraphQL introspection before relying on either spelling.
- The `string!` variable type spelling is the one used by the official examples.
- The dashboard queries the same GraphQL Analytics API (https://developers.cloudflare.com/analytics/graphql-api/).
- Corrected from the official docs: the third example's `Date!` variable types (see above).

## Related

- [Producer API](./producer-api.md)
- [Consumer concurrency](./consumer-concurrency.md)
- [Pricing](./pricing.md)
