<!-- source: https://platform.claude.com/docs/en/api/admin/usage_report, https://platform.claude.com/docs/en/api/admin/usage_report/retrieve_claude_code, https://platform.claude.com/docs/en/api/admin/usage_report/retrieve_messages / last verified: 2026-08-07 -->

# Usage Report Admin API

Retrieve aggregated usage metrics for Claude Code and the Messages API.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/usage_report/claude_code` | Get Claude Code Usage Report |
| GET | `/v1/organizations/usage_report/messages` | Get Messages Usage Report |

```http
curl "https://api.anthropic.com/v1/organizations/usage_report/messages?starting_at=2025-08-01T00:00:00Z" \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN"
```

## Options / Props

### Query Parameters (Claude Code Usage Report)

| Name | Type | Description |
|------|------|-------------|
| starting_at | string | UTC date `YYYY-MM-DD`, single day only |
| limit | optional number | Default `20`, max `1000` |
| page | optional string | `next_page` cursor |

### Claude Code usage record

| Name | Type | Description |
|------|------|-------------|
| actor | `UserActor { email_address, type }` \| `APIActor { api_key_name, type }` | Who performed the actions |
| core_metrics | `{ commits_by_claude_code, lines_of_code: {added, removed}, num_sessions, pull_requests_by_claude_code }` | Productivity metrics |
| customer_type | `"api"` \| `"subscription"` | Account type |
| date | string | RFC 3339 midnight UTC day |
| model_breakdown | array of `{ estimated_cost: {amount, currency}, model, tokens: {cache_creation, cache_read, input, output} }` | Per-model usage/cost |
| organization_id | string | Owning org |
| terminal_type | string | Environment used |
| tool_actions | map[`{ accepted, rejected }`] | Acceptance rate by tool |
| subscription_type | optional `"enterprise"` \| `"team"` | Null for API customers |

### Query Parameters (Messages Usage Report)

| Name | Type | Description |
|------|------|-------------|
| starting_at | string | RFC 3339, buckets snapped to minute/hour/day UTC |
| account_ids / api_key_ids / service_account_ids / workspace_ids | optional array of string | Restrict to specific IDs |
| bucket_width | optional `"1d"` \| `"1h"` \| `"1m"` | Granularity |
| context_window | optional array of `"0-200k"` \| `"200k-1M"` | Restrict |
| ending_at | optional string | RFC 3339 |
| group_by | optional array of `"account_id"` \| `"api_key_id"` \| `"context_window"` \| `"inference_geo"` \| `"model"` \| `"service_account_id"` \| `"service_tier"` \| `"speed"` \| `"workspace_id"` | `speed` requires `fast-mode-2026-02-01` beta header |
| inference_geos | optional array of `"global"` \| `"not_available"` \| `"us"` | Restrict |
| limit | optional number | Default/max depend on `bucket_width`: 1d → 7/31 days, 1h → 24/168 hours, 1m → 60/1440 minutes |
| models | optional array of string | Restrict |
| service_tiers | optional array of `"batch"` \| `"flex"` \| `"flex_discount"` \| `"priority"` \| `"priority_on_demand"` \| `"standard"` | Restrict |
| speeds | optional array of `"fast"` \| `"standard"` | Requires `fast-mode-2026-02-01` beta header |

### Messages usage result item

| Name | Type | Description |
|------|------|-------------|
| account_id / api_key_id / service_account_id / workspace_id | string | Null unless grouped by that dimension |
| cache_creation | `{ ephemeral_1h_input_tokens, ephemeral_5m_input_tokens }` | Cache-creation tokens |
| cache_read_input_tokens / uncached_input_tokens / output_tokens | number | Token counts |
| context_window / model / service_tier | string | Null unless grouped |
| inference_geo | `"global"` \| `"not_available"` \| `"us"` | Geo used |
| server_tool_use | `{ web_search_requests }` | Server-tool usage |

## Notes

- Requires an Admin API key (`sk-ant-admin...`).
- For cost (not usage volume) reporting, see `cost-report.md`.

## Related

- [cost-report.md](./cost-report.md)
- [rate-limits.md](./rate-limits.md)
