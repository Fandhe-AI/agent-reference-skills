---
source: https://developers.cloudflare.com/d1/observability/metrics-analytics/
---

# Metrics and analytics

D1 exposes query volume, query latency, and storage size per database or account-wide, in the dashboard (Metrics tab) and via the GraphQL Analytics API. Metrics are retained and queryable for the past 31 days.

## Signature / Usage

```graphql
query D1ObservabilitySampleQuery(
	$accountTag: string!
	$start: Date
	$end: Date
	$databaseId: string
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			d1AnalyticsAdaptiveGroups(
				limit: 10000
				filter: { date_geq: $start, date_leq: $end, databaseId: $databaseId }
				orderBy: [date_DESC]
			) {
				sum {
					readQueries
					writeQueries
				}
				dimensions {
					date
					databaseId
				}
			}
		}
	}
}
```

Percentile latency:

```graphql
d1AnalyticsAdaptiveGroups(
	limit: 10000
	filter: { date_geq: $start, date_leq: $end, databaseId: $databaseId }
	orderBy: [date_DESC]
) {
	quantiles {
		queryBatchTimeMsP90
	}
	dimensions {
		date
		databaseId
	}
}
```

Insights via Wrangler:

```sh
# Top queries for one database
npx wrangler d1 insights <database_name_or_id>

# Top queries across every D1 database in the account
npx wrangler d1 insights

npx wrangler d1 insights --sort-type=sum --sort-by=count --limit=3 --json
npx wrangler d1 insights <database_name> --sort-type=avg --sort-by=time --limit=3
npx wrangler d1 insights --sort-type=sum --sort-by=writes --limit=3 --time-period=7d --json
```

## Options / Props

Metrics:

| Metric | GraphQL Field Name | Description |
| --- | --- | --- |
| Read Queries (qps) | `readQueries` | Number of read queries issued against a database. Raw count; not used for billing. |
| Write Queries (qps) | `writeQueries` | Number of write queries. Raw count; not used for billing. |
| Rows read (count) | `rowsRead` | Rows read (scanned) across your queries. |
| Rows written (count) | `rowsWritten` | Rows written across your queries. |
| Query Response (bytes) | `queryBatchResponseBytes` | Total serialized response size, including column names, rows and metadata. |
| Query Latency (ms) | `queryBatchTimeMs` | Total server-side query response time, including serialization. |
| Storage (Bytes) | `databaseSizeBytes` | Maximum size of a database. |

`wrangler d1 insights` options:

| Option | Description |
| --- | --- |
| `--time-period` | Fetch data from now to the period, e.g. `30m`, `12h`, `7d` (default `1d`, maximum `31d`). |
| `--sort-type` | `sum` or `avg` (default `sum`). |
| `--sort-by` | `time`, `reads`, `writes`, `count` (default `time`). |
| `--sort-direction` | `ASC` or `DESC` (default `DESC`). |
| `--json` | Return clean JSON (default false). |
| `--limit` | Maximum queries fetched; account-wide it applies across all databases (default 5). |

## Notes

- GraphQL datasets require an `accountTag` filter with your account ID: `d1AnalyticsAdaptiveGroups`, `d1StorageAdaptiveGroups`, `d1QueriesAdaptiveGroups`. GraphQL introspection is supported.
- Per-query row counts are returned in the Workers Binding API return object (`meta.rows_read`, `meta.rows_written`) and are precise.
- Insights capture query strings but not bound parameters. `queryEfficiency` = rows returned / rows read; aim for close to `1`.
- Account-wide insights include a `databaseId` per result; resolve the name with `npx wrangler d1 info <database_id>`.
- `wrangler d1 insights` is experimental (options and output may change); tokens need Account Analytics Read.
- Docs inconsistency: the second GraphQL example declares `$accountTag` but filters with `$accountId`, and its description mentions an average that the query does not select (only `queryBatchTimeMsP90`).

## Related

- [Billing](./billing.md)
- [Find slow and expensive queries](./find-expensive-queries.md)
- [Return objects](./return-objects.md)
- [Use indexes](./use-indexes.md)
