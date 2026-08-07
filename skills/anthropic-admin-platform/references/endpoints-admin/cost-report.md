<!-- source: https://platform.claude.com/docs/en/api/admin/cost_report, https://platform.claude.com/docs/en/api/admin/cost_report/retrieve / last verified: 2026-08-07 -->

# Cost Report Admin API

Retrieve time-bucketed cost data for an organization, optionally grouped by description or workspace.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/cost_report` | Get Cost Report |

```http
curl "https://api.anthropic.com/v1/organizations/cost_report?starting_at=2025-08-01T00:00:00Z" \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN"
```

## Options / Props

### Query Parameters

| Name | Type | Description |
|------|------|-------------|
| starting_at | string | RFC 3339 timestamp; buckets starting on/after this are returned, snapped to minute/hour/day UTC |
| bucket_width | optional `"1d"` | Time granularity |
| ending_at | optional string | RFC 3339 timestamp; buckets ending before this are returned |
| group_by | optional array of `"description"` \| `"workspace_id"` | Grouping dimensions |
| limit | optional number | Max time buckets to return |
| page | optional string | `next_page` token from previous response |

### Returns (CostReport)

| Name | Type | Description |
|------|------|-------------|
| data | array of `{ ending_at, results, starting_at }` | Time buckets |
| data[].results | array of cost item | `amount` (decimal string, lowest currency units), `context_window` (`"0-200k"`\|`"200k-1M"`), `cost_type` (`"code_execution"`\|`"session_usage"`\|`"tokens"`\|`"web_search"`), `currency` (always `"USD"`), `description`, `inference_geo` (`"global"`\|`"not_available"`\|`"us"`), `model`, `service_tier` (`"batch"`\|`"standard"`), `token_type`, `workspace_id` |
| has_more | boolean | More results available |
| next_page | string | Token for next page |

## Notes

- Requires an Admin API key (`sk-ant-admin...`).
- Fields marked "`null` if not grouping by description/workspace" only populate when the corresponding `group_by` value is set.

## Related

- usage-report.md
- workspaces.md
