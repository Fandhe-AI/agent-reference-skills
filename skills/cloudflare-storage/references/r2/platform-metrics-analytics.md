---
source: https://developers.cloudflare.com/r2/platform/metrics-analytics/
---

# Metrics and analytics

R2 exposes analytics for requests, storage, and bandwidth usage via the dashboard and the GraphQL Analytics API.

## Signature / Usage

```graphql
query R2VolumeExample(
	$accountTag: string!
	$startDate: Time
	$endDate: Time
	$bucketName: string
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			r2OperationsAdaptiveGroups(
				limit: 10000
				filter: {
					datetime_geq: $startDate
					datetime_leq: $endDate
					bucketName: $bucketName
				}
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

```graphql
query R2StorageExample(
	$accountTag: string!
	$startDate: Time
	$endDate: Time
	$bucketName: string
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			r2StorageAdaptiveGroups(
				limit: 10000
				filter: {
					datetime_geq: $startDate
					datetime_leq: $endDate
					bucketName: $bucketName
				}
				orderBy: [datetime_DESC]
			) {
				max {
					objectCount
					uploadCount
					payloadSize
					metadataSize
				}
				dimensions {
					datetime
				}
			}
		}
	}
}
```

```graphql
query R2BandwidthExample(
	$accountTag: string!
	$startDate: Time!
	$endDate: Time!
	$bucketName: string!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			r2BandwidthUsageAdaptiveGroups(
				limit: 1000
				filter: {
					datetime_geq: $startDate
					datetime_lt: $endDate
					bucketName: $bucketName
				}
				orderBy: [datetimeHour_ASC]
			) {
				sum {
					bytesUpload
					bytesDownload
				}
				dimensions {
					datetimeHour
				}
			}
		}
	}
}
```

## Options / Props

| Dataset | GraphQL Dataset Name | Description |
| --- | --- | --- |
| Operations | `r2OperationsAdaptiveGroups` | Operations taken on a bucket within an account. |
| Storage | `r2StorageAdaptiveGroups` | Storage of a bucket within an account. |
| Bandwidth | `r2BandwidthUsageAdaptiveGroups` | Uploaded and downloaded bytes for buckets within an account. |

Operations fields: `actionType`, `actionStatus` (`success`, `userError`, `internalError`), `bucketName`, `objectName`, `responseStatusCode`, `datetime`.

Storage fields: `bucketName`, `payloadSize`, `metadataSize`, `objectCount`, `uploadCount` (pending multipart uploads), `datetime`.

Bandwidth filter fields: `bucketName`, `date`, `datetimeHour`, `datetimeFifteenMinutes`, `datetimeFiveMinutes`, `datetimeMinute`, `datetime`. Summable fields: `bytesDownload`, `bytesUpload`.

## Notes

- Maximum query range is 31 days; all datasets require an `accountTag` filter with your account ID.
- For jurisdictional buckets prefix the bucket name with the jurisdiction and an underscore, e.g. `eu_bucket-name` (an account can hold same-named buckets with and without a jurisdiction).
- The bandwidth dataset excludes transfers smaller than 100 KiB (transfer size, not object size); results are byte totals, not rates.
- Dashboard: bucket **Metrics** tab (default window last 24 hours). Supports GraphQL introspection.

## Related

- [Data Access Logs](./buckets-data-access-logs.md)
- [Audit Logs](./platform-audit-logs.md)
- [Pricing](./pricing.md)
