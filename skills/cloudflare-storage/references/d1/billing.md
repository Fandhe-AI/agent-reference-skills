---
source: https://developers.cloudflare.com/d1/observability/billing/
---

# Billing

D1 exposes analytics for billing metrics (rows read, rows written, total storage) across all databases in an account. Dashboard values come from the GraphQL Analytics API.

## Signature / Usage

Dashboard path: Billing > Billable Usage (daily or month-to-date charts). Programmatic access uses the GraphQL Analytics API (see Metrics and analytics).

Adapted (not in the official docs): the query below is adapted from https://developers.cloudflare.com/d1/observability/metrics-analytics/ by selecting the billing fields `rowsRead` and `rowsWritten`; the Billing page itself shows no code.

```graphql
query D1ObservabilitySampleQuery3(
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
			) {
				sum {
					rowsRead
					rowsWritten
				}
			}
		}
	}
}
```

## Notes

- Billable usage history is stored for a maximum of 30 days.
- Usage-based billing notifications are available in the dashboard for Rows Read and Rows Written.
- The GraphQL snippet above is adapted from the Metrics and analytics page's example by selecting the billing fields (`rowsRead`, `rowsWritten`); the Billing page itself shows no code.

## Related

- [Metrics and analytics](./metrics-analytics.md)
- [Pricing](./pricing.md)
