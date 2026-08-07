# Usage and Costs API

Programmatic access to an organization's API activity and spending data, for building dashboards or scheduled reports. The Usage API returns per-endpoint activity metrics (tokens, requests); the Costs API returns a daily spend breakdown that reconciles to the billing invoice.

## Signature / Usage

```bash
curl "https://api.openai.com/v1/organization/usage/completions" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

```bash
curl "https://api.openai.com/v1/organization/costs" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| group_by | string[] | Dimensions to group by: `project_id`, `user_id`, `api_key_id`, `model`, `batch`, `service_tier`, or a combination |

## Notes

- Requires an Admin API key.
- Confirmed endpoints: `GET /v1/organization/usage/completions` (per-endpoint activity, aggregated over configurable time buckets) and `GET /v1/organization/costs` (daily spend breakdown). The Usage API also exposes further per-modality endpoints under `/v1/organization/usage/*`, but their exact paths, parameter names, and enum values could not be confirmed here — the Administration API reference's per-resource pages (`developers.openai.com/api/reference/resources/organization/subresources/...`) are rendered client-side by Stainless and return only a stub placeholder when fetched as Markdown. Confirm exact parameter names/types against the live reference or SDK types before relying on them.
- If `group_by` is not specified, fields such as `project_id` and `model` return as `null` — specify grouping for meaningful analysis.
- For financial reconciliation, prefer the Costs endpoint (or the Costs tab in the Usage Dashboard) over the Usage endpoints, since Costs reconciles to the billing invoice.
- Worked example (Python, pandas, chart visualizations): [Completions Usage API cookbook](https://developers.openai.com/cookbook/examples/completions_usage_api).
- Distinct from the `rate-limits` topic (covered in the `openai-api-core` skill) — usage/costs is billing/activity reporting, not request throttling.

## Related

- [Spend Limits and Alerts](./spend-limits-and-alerts.md)
- [Audit Logs](./audit-logs.md)
