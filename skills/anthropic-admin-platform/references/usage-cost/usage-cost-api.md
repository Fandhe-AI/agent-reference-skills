<!-- source: https://platform.claude.com/docs/en/manage-claude/usage-cost-api / last verified: 2026-11-14 -->

# Usage and Cost API

Legacy Admin API usage and cost report endpoints (`/v1/organizations/usage_report/messages` and `/v1/organizations/cost_report`) for Claude Console organizations: programmatic access to historical API usage and cost data, similar to the Usage and Cost pages in the Claude Console. For new integrations use the Usage and Cost Analytics API.

## Signature / Usage

```bash
curl "https://api.anthropic.com/v1/organizations/usage_report/messages?\
starting_at=2025-01-08T00:00:00Z&\
ending_at=2025-01-15T00:00:00Z&\
bucket_width=1d" \
  -H "anthropic-version: 2026-10-21" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

Cost report grouped by workspace and description:

Adapted (not in the official docs): `--globoff` added so curl does not treat `[]` in `group_by[]` as a glob range.

```bash
curl --globoff "https://api.anthropic.com/v1/organizations/cost_report?\
starting_at=2025-01-01T00:00:00Z&\
ending_at=2025-01-31T00:00:00Z&\
group_by[]=workspace_id&\
group_by[]=description" \
  -H "anthropic-version: 2026-10-21" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

Pagination (`has_more` true, then pass `next_page` as `page`):

```bash
# First request
curl "https://api.anthropic.com/v1/organizations/usage_report/messages?\
starting_at=2025-01-01T00:00:00Z&\
ending_at=2025-01-31T00:00:00Z&\
limit=7" \
  -H "anthropic-version: 2026-10-21" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"

# Response includes: "has_more": true, "next_page": "page_xyz..."

# Next request with pagination
curl "https://api.anthropic.com/v1/organizations/usage_report/messages?\
starting_at=2025-01-01T00:00:00Z&\
ending_at=2025-01-31T00:00:00Z&\
limit=7&\
page=page_xyz..." \
  -H "anthropic-version: 2026-10-21" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `/v1/organizations/usage_report/messages` | endpoint | Token consumption by model, workspace, service tier; `bucket_width` of `1m` / `1h` / `1d` |
| `/v1/organizations/cost_report` | endpoint | Service-level USD cost breakdown (decimal strings in cents); `1d` granularity only; group by workspace or description (grouping by `description` adds parsed fields such as `model` and `inference_geo`) |
| `group_by[]` | param | Usage: `model`, `workspace_id`, `service_tier`, `context_window`, `inference_geo`, `speed`, `api_key_id`; cost: `workspace_id`, `description` |
| `models[]`, `service_tiers[]`, `context_window[]` | param | Usage filters (example values: `claude-opus-5-5`, `batch`, `0-200k`) |
| `api_key_ids[]`, `workspace_ids[]` | param | Usage filters; IDs from List API Keys / List Workspaces |
| `inference_geos[]` | param | `global`, `us`, `not_available` |
| `speeds[]` | param | `standard`, `fast` |
| `limit`, `page` | param | Page size; cursor from `next_page` |

Time granularity limits (usage):

| Granularity | Default limit | Maximum limit | Use case |
|-------------|---------------|---------------|----------|
| `1m` | 60 buckets | 1,440 buckets | Real-time monitoring |
| `1h` | 24 buckets | 168 buckets | Daily patterns |
| `1d` | 7 buckets | 31 buckets | Weekly/monthly reports |

Which API (Claude product):

| Your organization | API | Key type |
|-------------------|-----|----------|
| Claude Console (Claude Platform) | Usage and Cost Analytics API (recommended), or this legacy API | Admin API key (`sk-ant-admin01-...`) or another Admin API credential |
| Claude Enterprise (claude.ai) | Usage and Cost Analytics API (recommended), or the Claude Enterprise Analytics API cost and usage endpoints (legacy) | Analytics API key |

## Notes

- Adapted from the official docs: the cost report example adds `--globoff` so curl does not interpret `group_by[]` as a glob.
### Legacy

- "The Usage and Cost API (`/v1/organizations/usage_report/messages` and `/v1/organizations/cost_report`) is a legacy API and remains supported. For new integrations, use the Usage and Cost Analytics API, which reports usage and cost with more grouping and filtering dimensions."
- Migration steps are in the Usage and Cost Analytics API page, section "Migrate from the Usage and Cost API".

### Availability and credentials

- The Admin API isn't available to organizations on the claude.ai Team plan or to individual Console accounts.
- Credentials: an Admin API key, an OAuth token with the `org:admin` scope, or a personal or service account key that isn't scoped to a workspace; workspace API keys don't work.
- Claude Enterprise organizations use an Analytics API key with a different API instead; Enterprise parent organizations carry no Admin API keys, so the Analytics API key is their only path to this data.
- Claude Platform on AWS: these endpoints are not available; use the Usage and Cost Analytics API.
- Claude Models on Google Cloud (Anthropic managed): only the usage endpoint is available, via the organization-level base URL with Google Cloud credentials; the only predefined IAM role that allows the call is `roles/claude.admin`. For cost data use the Usage and Cost Analytics API or the Cost page in the Claude Console.

### Behavior

- Priority Tier costs use a different billing model and are not included in the cost endpoint; filter or group by `service_tier` on the usage endpoint and look for `priority`.
- Data typically appears within 5 minutes of request completion (occasionally longer). Polling once per minute is supported for sustained use; more frequent polling is acceptable for short bursts; cache results for dashboards.
- Code execution costs appear only in the cost endpoint, grouped under `Code Execution Usage` in the description field; code execution is not included in the usage endpoint.
- Playground usage in the Claude Console (and the legacy Anthropic Workbench) has `api_key_id: null`, even when grouping by that dimension. Default workspace usage and costs have `workspace_id: null`.
- Usage from some Claude Managed Agents sessions is reported under an Anthropic-managed service account (`svac_...`) that isn't listed with service accounts you create.
- Models released before February 2026 (prior to Claude Opus 4.6 and Claude Sonnet 4.6) don't support the `inference_geo` request parameter, so reports return `"not_available"`; use `not_available` in `inference_geos[]` to target them.
- Per-user Claude Code cost: call the cost endpoint of the Usage and Cost Analytics API with `products[]=claude_code&group_by[]=actor` (group by `api_key_id` for cost by API key).
- Integrations should set a User-Agent header such as `User-Agent: YourApp/1.0.0 (https://yourapp.com)`.
- The official page also lists observability partner integrations and Claude Cookbook use cases (daily usage reports, cost attribution, cache efficiency, budget monitoring, CSV export).
- Source: https://platform.claude.com/docs/en/manage-claude/usage-cost-api (retrieved 2026-11-14)

## Related

- [usage-cost-analytics-api.md](./usage-cost-analytics-api.md)
- [rate-limits-api](./rate-limits-api.md)
- [spend-limits-api](./spend-limits-api.md)
- [analytics-api](../admin-api/analytics-api.md)
- [claude-code-analytics-api](../admin-api/claude-code-analytics-api.md)
