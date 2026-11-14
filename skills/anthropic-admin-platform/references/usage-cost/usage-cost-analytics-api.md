<!-- source: https://platform.claude.com/docs/en/manage-claude/usage-cost-analytics-api / last verified: 2026-11-14 -->

# Usage and Cost Analytics API

Reports historical token usage and cost (USD) for a Claude Console or Claude Enterprise organization, broken down by the dimensions you choose (model, workspace, API key, actor, and more). Two endpoints: `GET /v1/organizations/analytics/usage` (token counts and request counts) and `GET /v1/organizations/analytics/cost` (cost in USD). Beta: send `anthropic-beta: analytics-usage-cost-2026-08-24` and an `anthropic-version` header on every request. The SDK and the `ant` CLI send both headers and fetch the remaining pages as you read results, so `limit` sets only the page size.

## Signature / Usage

```bash
curl --globoff "https://api.anthropic.com/v1/organizations/analytics/usage?\
starting_at=2026-09-01T00:00:00Z&\
ending_at=2026-09-08T00:00:00Z&\
time_bucket_width=1d&\
group_by[]=model&\
limit=10" \
  -H "anthropic-version: 2026-10-21" \
  -H "anthropic-beta: analytics-usage-cost-2026-08-24" \
  -H "x-api-key: $ANTHROPIC_API_KEY"
```

```bash
ant beta:organization:analytics:usage list \
  --starting-at 2026-09-01T00:00:00Z \
  --ending-at 2026-09-08T00:00:00Z \
  --time-bucket-width 1d \
  --group-by model \
  --limit 10
```

One usage response row:

```json
{
  "data": [
    {
      "starting_at": "2026-09-03T00:00:00Z",
      "ending_at": "2026-09-04T00:00:00Z",
      "group": {
        "product": null,
        "model": "claude-sonnet-5",
        "context_window": null,
        "inference_geo": null,
        "speed": null,
        "slack_channel_id": null,
        "claude_tag_category": null,
        "claude_tag_user_id": null,
        "rbac_group_id": null,
        "workspace_id": null,
        "service_tier": null,
        "user_profile_id": null,
        "agent_id": null,
        "environment_id": null,
        "deployment_id": null,
        "session_id": null,
        "actor": null,
        "actor_type": null,
        "api_key_id": null
      },
      "usage": {
        "uncached_input_tokens": 1284500,
        "cache_creation": {
          "ephemeral_1h_input_tokens": 0,
          "ephemeral_5m_input_tokens": 215300
        },
        "cache_read_input_tokens": 3200000,
        "output_tokens": 891000,
        "total_tokens": 5590800,
        "server_tool_use": {
          "web_search_requests": 12
        },
        "requests": 4210
      }
    }
  ],
  "has_more": true,
  "next_page": "page_V2mQ4dkt9HcbX3pLr...",
  "data_refreshed_at": "2026-09-18T16:02:11Z"
}
```

Cost by model, cost type and token type for a month:

```bash
curl --globoff "https://api.anthropic.com/v1/organizations/analytics/cost?\
starting_at=2026-09-01T00:00:00Z&\
ending_at=2026-10-01T00:00:00Z&\
group_by[]=model&\
group_by[]=cost_type&\
group_by[]=token_type" \
  -H "anthropic-version: 2026-10-21" \
  -H "anthropic-beta: analytics-usage-cost-2026-08-24" \
  -H "x-api-key: $ANTHROPIC_API_KEY"
```

One cost row (`group` abbreviated in the source):

```json
{
  "starting_at": "2026-09-01T00:00:00Z",
  "ending_at": "2026-10-01T00:00:00Z",
  "group": {
    "model": "claude-opus-5",
    ...,
    "cost_type": "tokens",
    "token_type": "cache_read_input_tokens"
  },
  "cost": {
    "currency": "USD",
    "amount": "41280.000000",
    "list_amount": "51600.000000",
    "requests": null
  }
}
```

Top consumers by requests:

```bash
curl --globoff "https://api.anthropic.com/v1/organizations/analytics/usage?\
starting_at=2026-09-01T00:00:00Z&\
ending_at=2026-10-01T00:00:00Z&\
group_by[]=actor&\
order_by=requests&\
limit=25" \
  -H "anthropic-version: 2026-10-21" \
  -H "anthropic-beta: analytics-usage-cost-2026-08-24" \
  -H "x-api-key: $ANTHROPIC_API_KEY"
```

## Options / Props

### Endpoints

| Endpoint | Metrics | `order_by` values |
|----------|---------|-------------------|
| `GET /v1/organizations/analytics/usage` | token counts by type, `requests` | `total_tokens` (default), `output_tokens`, `uncached_input_tokens`, `requests`, `time` |
| `GET /v1/organizations/analytics/cost` | `cost` object | `amount` (default), `list_amount`, `time` |

### Parameters named in the guide

| Name | Description |
|------|-------------|
| `starting_at` | RFC 3339 with UTC offset; inclusive; on or after January 1, 2026 and within the last 365 days |
| `ending_at` | Exclusive; defaults to 31 days after `starting_at` or the current time, whichever is earlier; required when `time_bucket_width` is set |
| `time_bucket_width` | `1m`, `1h`, or `1d`; optional, no default. `1m` spans at most 24 hours per request |
| `group_by[]` | Up to five dimensions; each dimension in `group` is `null` unless listed |
| `order_by`, `order` | Rank metric; `order=asc` reverses the default largest-first. For a time series set `time_bucket_width` and `order_by=time` (newest bucket first by default; within a bucket largest rows first) |
| `limit` | Rows per page, 1 to 1,000, default 20 |
| `page` | Cursor from `next_page` |
| Filters (bracket notation) | Repeat to pass several values, up to 100; same filter OR, different filters AND. Named in the guide: `models[]`, `workspace_ids[]`, `api_key_ids[]`, `actor_ids[]`, `actor_types[]`, `products[]`, `context_windows[]`, `inference_geos[]` |

The usage and cost API reference pages list every dimension, filter and value.

### Row fields

| Field | Description |
|-------|-------------|
| `starting_at`, `ending_at` | Period the row covers (the bucket bounds when `time_bucket_width` is set) |
| `group` | All dimensions: `product`, `model`, `context_window`, `inference_geo`, `speed`, `slack_channel_id`, `claude_tag_category`, `claude_tag_user_id`, `rbac_group_id`, `workspace_id`, `service_tier`, `user_profile_id`, `agent_id`, `environment_id`, `deployment_id`, `session_id`, `actor`, `actor_type`, `api_key_id`; cost adds `cost_type` and `token_type` |
| `usage` (usage endpoint) | `uncached_input_tokens`, `cache_creation` (`ephemeral_1h_input_tokens`, `ephemeral_5m_input_tokens`), `cache_read_input_tokens`, `output_tokens`, `total_tokens`, `server_tool_use` (`web_search_requests`), `requests` |
| `cost` (cost endpoint) | `amount` (after discounts, before credits), `list_amount` (list prices), `currency` (always `"USD"`), `requests` |
| Top level | `data`, `has_more`, `next_page`, `data_refreshed_at` |

### Cost-only dimensions

| Dimension | Effect |
|-----------|--------|
| `group_by[]=cost_type` | One row per cost type (`tokens`, `web_search`, `code_execution`, `session_usage` appear in the example) |
| `group_by[]=token_type` | One row per token type for token cost |

Neither counts toward the five-dimension limit, and `limit` doesn't apply to them (a page can hold more than `limit` rows). With either set, `requests` is `null` on every row.

### Actors

`actor` is who a request is attributed to: a user, a service account, a federated cloud identity (AWS or Google Cloud principal), or the API key itself when none of those is behind the request. Grouped rows carry an object whose `type` says which kind; unattributable usage has `actor: null`.

| Case | `actor` / `api_key_id` |
|------|------------------------|
| Personal keys and service account keys | `actor` is the linked user / service account; key in `api_key_id` |
| Legacy workspace keys | The key is both the `actor` and the `api_key_id` |
| No API key (Claude Console, Workload Identity Federation token) | `api_key_id: null`; with WIF the `actor` is the service account the token acts as |
| Claude Code sign-in | `actor` is the member; `api_key_id` is the key Claude Code created (in the Claude Code workspace), or `null` after a sign-in without an API key |
| Some Claude Managed Agents sessions | Attributed to an Anthropic-managed service account (`svac_...`); `api_key_id` is `null` |

### Migration from the legacy Usage and Cost API (Console)

| Legacy | Analytics API |
|--------|---------------|
| No beta header | `anthropic-beta: analytics-usage-cost-2026-08-24` on every request |
| Data within about 5 minutes | Typically within 4 hours, up to 24 hours |
| `data` = time buckets (oldest first, empty included) with `results` | `data` = rows ranked by `order_by`, with `group` and `usage` / `cost` |
| `bucket_width`, default `1d` | `time_bucket_width`, no default |
| `limit` counts buckets | `limit` counts rows (1 to 1,000, default 20) |
| Any date range | 31 days max per request; `ending_at` required with `time_bucket_width` |
| `account_ids[]`, `service_account_ids[]`, `group_by[]=account_id`, `group_by[]=service_account_id` | `actor_ids[]` with the same tagged IDs; `group_by[]=actor` or `actor_type` (read `actor.user_id` / `actor.service_account_id`) |
| `context_window[]` | `context_windows[]` |
| `group_by[]=description` (cost) | No `description`; use `model`, `cost_type`, `token_type`, `context_window`, `service_tier`, `inference_geo`, `speed` |
| Unknown API key / workspace ID errors | Matches nothing (including a misspelled `models[]` name); each list up to 100 values |
| `workspace_id: null` for the default workspace | Real default `workspace_id` |
| `inference_geo: "not_available"`, `service_tier: "standard"` when absent | `null` for both; `inference_geos[]=not_available` still matches rows with no geo |
| Cost `service_tier` `standard` or `batch`; `amount` like `"123.45"` | Actual tier; `amount` with six decimals (`"123.450000"`) plus `list_amount` |
| Code execution absent from usage; no request counts | Code execution as usage rows with `model: null`; adds `requests` and usage `total_tokens` |

### Migration from the Claude Enterprise report endpoints

| Enterprise reports (`/v1/organizations/analytics/`) | Analytics API |
|------------------------------------------------------|---------------|
| `usage_report` / `cost_report`: buckets oldest first including empty, top 100 groups per bucket; `bucket_width` default `1d`; `limit` counts buckets | Rows for every combination with data, ranked by `order_by`; `time_bucket_width` optional; `limit` counts rows |
| `bucket_width` | `time_bucket_width` (same values) |
| `1m` buckets up to 31 days; `ending_at` optional | `ending_at` required with `time_bucket_width`; `1m` at most 24 hours |
| `user_usage_report`, `user_cost_report` (one row per user) | `group_by[]=actor&actor_types[]=user_actor`; without the filter non-user identities and an `actor: null` row also appear |
| Claude Tag `product: "claude-tag"` | `product: "claude_tag"`; `products[]` accepts either spelling |
| Unrecognized `models[]` returns 400 | Matches nothing |
| `user_ids[]` | `actor_ids[]` with the same tagged `user_...` IDs |
| `exclude_deleted_users` | Requires `group_by[]=actor` (else 400); drops only rows whose `actor` is a user with `deleted: true` |

## Notes

- Beta; the Admin API isn't available to organizations on the claude.ai Team plan or to individual Console accounts (set up an organization first).
- Authentication: Claude Console organizations use an Admin API key or another Admin API credential (for example an OAuth token with the `org:admin` scope, sent as `authorization: Bearer`, not `x-api-key`). Claude Enterprise organizations use a key with the `read:analytics` scope created in claude.ai by the primary owner after the Analytics API is enabled. Give the collecting service its own key in a secrets manager and rotate it (a key expiration enforces rotation); prefer a Workload Identity Federation rule with the `org:admin` scope for short-lived tokens.
- Claude Platform on AWS: both endpoints available via its base URL and authentication; AWS IAM authorizes through the `ListAccountUsage` and `ListAccountCost` actions; each request covers only workspaces in the AWS region of the endpoint called. `user_profile_id`, `claude_tag_category`, `claude_tag_user_id` and the Managed Agents dimensions (`agent_id`, `environment_id`, `deployment_id`, `session_id`) are `null` on every row.
- Claude Models on Google Cloud (Anthropic managed): use the organization-level base URL with Google Cloud credentials; `/usage` needs the `usageAnalytics.list` IAM permission and `/cost` needs `costAnalytics.list`.
- Row shape: with no `group_by[]` and no `time_bucket_width` the response is a single row totaling the range. Each combination appears exactly once across pages; buckets with no usage or cost produce no rows (fill with zeros). A grouped dimension is also `null` on rows with no value for it (such as `model` on code execution usage). A dimension not applicable to your organization is `null` and its filter matches nothing, except `rbac_group_id`, which errors when teams aren't available. `api_key_id` applies only to Console organizations and `slack_channel_id` only to Enterprise.
- Filters: `api_key_ids[]=apikey_...` matches every request the key authenticated; `actor_ids[]=apikey_...` matches only requests attributed to the key itself. Add an empty entry (`api_key_ids[]=`) to include usage with no API key.
- Amounts are decimal strings in cents with six decimal places: `"41280.000000"` is $412.80 USD.
- Priority Tier: requests served under a commitment show `service_tier: "priority"` on usage but contribute zero token cost to `amount` and `list_amount`; the commitment fee is billed separately and isn't in this data; web search on those requests is billed at the standard rate; requests beyond committed capacity are priced at the standard tier.
- Date ranges: both ends are rounded down to a UTC bucket boundary (to the hour when `time_bucket_width` isn't set), so with `1h` a `starting_at` of `2026-09-01T10:43:00Z` is treated as `2026-09-01T10:00:00Z`. A request spans at most 31 days.
- Data freshness: `data_refreshed_at` is on every response (`null` with empty `data` when no data is available yet). Typically refreshes within 4 hours, up to 24 hours; values can be revised until about 7 days after the end of the calendar month (October 1 values can change until about November 7). For stable repeated calls set `ending_at` at or before a seen `data_refreshed_at`; for final totals query only months that ended at least 7 days ago. All pages of a query read the same snapshot.
- Default workspace: it has its own `wrkspc_` ID like every other workspace; List Workspaces leaves it out unless `include_default=true`; Get Workspace returns `"name": "Default"` for it.
- Per-user Claude Code cost: call the cost endpoint with `products[]=claude_code&group_by[]=actor`. Console organizations can also use the Claude Code Analytics API.
- Integrations should set a User-Agent header such as `User-Agent: YourApp/1.0.0 (https://yourapp.com)`.
- The migration sections' before / after SDK snippets are omitted here; see the source page.
- Source: https://platform.claude.com/docs/en/manage-claude/usage-cost-analytics-api (retrieved 2026-11-14)

## Related

- [usage-cost-api.md](./usage-cost-api.md)
