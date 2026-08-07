<!-- source: https://platform.claude.com/docs/en/api/admin/analytics, https://platform.claude.com/docs/en/api/admin/analytics/artifacts/list, https://platform.claude.com/docs/en/api/admin/analytics/chat_projects/list, https://platform.claude.com/docs/en/api/admin/analytics/connectors/list, https://platform.claude.com/docs/en/api/admin/analytics/cost/list, https://platform.claude.com/docs/en/api/admin/analytics/cost/list_by_user, https://platform.claude.com/docs/en/api/admin/analytics/plugins/list, https://platform.claude.com/docs/en/api/admin/analytics/retrieve_summaries, https://platform.claude.com/docs/en/api/admin/analytics/skills/list, https://platform.claude.com/docs/en/api/admin/analytics/usage/list, https://platform.claude.com/docs/en/api/admin/analytics/usage/list_by_user, https://platform.claude.com/docs/en/api/admin/analytics/users/list / last verified: 2026-08-07 -->

# Analytics Admin API

Organization-wide activity, cost, and usage analytics across claude.ai, Claude Code, Cowork, Office Agent, and Claude Design. Most endpoints available only to organizations on a Claude Enterprise plan and require an API key with the `read:analytics` scope. Data is typically available with a ~1-day lag and no earlier than 2026-01-01; late-arriving events mean values may be revised by a few percent for several days, and cost/usage bucket endpoints are not final until ~30 days after the usage date.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/analytics/artifacts` | Get Artifact Activity (by day, artifact_type × is_shared cube) |
| GET | `/v1/organizations/analytics/apps/chat/projects` | Get Chat Project Usage |
| GET | `/v1/organizations/analytics/connectors` | Get Connector Usage |
| GET | `/v1/organizations/analytics/cost_report` | Get Cost Over Time (bucketed) |
| GET | `/v1/organizations/analytics/user_cost_report` | Get Per-User Cost |
| GET | `/v1/organizations/analytics/plugins` | Get Plugin Usage |
| GET | `/v1/organizations/analytics/summaries` | Get Activity Summaries (org-wide DAU/WAU/MAU) |
| GET | `/v1/organizations/analytics/skills` | Get Skill Usage |
| GET | `/v1/organizations/analytics/usage_report` | Get Token Usage Over Time (bucketed) |
| GET | `/v1/organizations/analytics/user_usage_report` | Get Per-User Token Usage |
| GET | `/v1/organizations/analytics/users` | List User Activity |

```http
curl "https://api.anthropic.com/v1/organizations/analytics/usage_report?starting_at=2026-08-01T00:00:00Z" \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_API_KEY"
```

## Options / Props

### Common query parameter patterns

Two families of endpoints:

- **Day-cube endpoints** (`artifacts`, `apps/chat/projects`, `connectors`, `plugins`, `skills`, `users`): `date` (single UTC day, `YYYY-MM-DD`) OR `starting_date`/`ending_date` (range-rollup mode, ≤366 days, one row per entity over the window). `group_by[]` breaks rows out by dimensions (`user_id`, `rbac_group_id`, `product`, ...; each endpoint supports a subset). `filter[]` scopes as `dimension:value` (repeat for OR within a dimension, across dimensions for AND; unsupported dimension → 400; ≤100 entries). `order`/`order_by`, `limit` (1-1000, default 100), `page` cursor.
- **Time-bucket endpoints** (`cost_report`, `user_cost_report`, `usage_report`, `user_usage_report`): `starting_at`/`ending_at` (RFC 3339, ≤31 day span, ≤365 days back, no earlier than 2026-01-01T00:00:00Z), `bucket_width` (`"1d"`\|`"1h"`\|`"1m"`, limit caps vary), `group_by[]` (`product`, `model`, `context_window`, `inference_geo`, `speed`, `rbac_group_id`, `slack_channel_id`, plus `cost_type`/`token_type` on cost endpoints), `models`/`products`/`rbac_group_ids`/`slack_channel_ids`/`speeds`/`user_ids`/`inference_geos`/`context_windows` filters, `page`.

`rbac_group_id` uses any-membership, time-of-usage attribution: a user counts toward every group they held during the covered UTC day, so grouped rows can overlap and sum above org totals; a null/unassigned row represents users in no group.

### Per-endpoint response shape (abbreviated)

| Endpoint | Key response fields |
|----------|---------------------|
| artifacts | `data[]`: `artifact_type`, `artifacts_created_count`, `distinct_user_count`, `is_shared`, `published_artifacts_created_count` + optional `product`/`rbac_group_id`/`user_id` when grouped. `next_page` null unless grouped |
| apps/chat/projects | `data[]`: `project_id`, `project_name`, `distinct_user_count`, `message_count`, `created_at`, `created_by`, `distinct_conversation_count` + optional group dims |
| connectors | `data[]`: `connector_name`, `distinct_user_count`, `chat_metrics`/`claude_code_metrics`/`cowork_metrics`/`office_metrics` (per-surface session/conversation counts), `read_call_count`/`write_call_count`/`unclassified_call_count` (MCP tool-call read/write classification, forward-only per surface from 2026-05/06) |
| cost_report | `data[]`: `{ starting_at, ending_at, results[] }`; `results[]`: `amount`/`list_amount` (fractional cents), `currency`, `cost_type`, `context_window`, `inference_geo`, `model`, `product`, `rbac_group_id`, `requests`, `slack_channel_id`, `speed`, `token_type`. Plus `data_refreshed_at`, `organization_id` |
| user_cost_report | Same result shape as `cost_report` but per-`actor` (`AnalyticsUserActor`: `deleted`, `email`, `name`, `user_id`); `order_by` = `"amount"`\|`"list_amount"` |
| plugins | `data[]`: `plugin_name`, `plugin_id`, `install_count`, `invocation_count`, `distinct_user_count`, `claude_code_metrics`/`cowork_metrics`. `plugin_name: "third-party"` is an aggregate bucket for unnamed activity |
| summaries | `summaries[]`: `starting_at`/`ending_at`, `assigned_seat_count`, `pending_invite_count`, `daily`/`weekly`/`monthly_active_user_count` + `*_adoption_rate`, plus optional per-product breakdowns (`chat_*`, `claude_code_*`, `cowork_*`, `claude_design_*`, `office_agent_*`, `science_*`) omitted when not enabled for the org |
| skills | `data[]`: `skill_name`, `skill_display_name`, `invocation_count`, `enable_count`, `distinct_user_count`, `share_status`, `estimated_overage_spend`, `attributed_list_price`, `chat_metrics`/`claude_code_metrics`/`cowork_metrics`/`office_metrics`. A skill counts as "used" only on explicit activation (slash command or model invocation), not mere install |
| usage_report | `data[]`: `{ starting_at, ending_at, results[] }`; `results[]`: `cache_creation`, `cache_read_input_tokens`, `uncached_input_tokens`, `output_tokens`, `context_window`, `inference_geo`, `model`, `product`, `rbac_group_id`, `requests`, `server_tool_use`, `slack_channel_id`, `speed`. Plus `data_refreshed_at`, `organization_id` |
| user_usage_report | Same result shape as `usage_report` but per-`actor`; adds `total_tokens`; `order_by` defaults to `"total_tokens"` |
| users | `data[]`: per-user `chat_metrics`/`claude_code_metrics`/`cowork_metrics`/`design_metrics`/`office_metrics`/`science_metrics`, `web_search_count`, `last_activity_date`, `user` (`AnalyticsUser`), optional `distinct_user_count`/`rbac_group_id` when grouped |

## Notes

- Requires an API key with the `read:analytics` scope (not necessarily the full Admin API key).
- Most endpoints (all except `artifacts`) require a Claude Enterprise plan.
- `product` values include `"chat"`, `"claude_code"`, `"cowork"`, `"office_agent"`, `"claude_in_chrome"`, `"claude_design"`, `"claude-in-slack"` (Claude Tag; a legacy underscore-spelled value identifies the retiring v1 Slack bot).
- `cost_report`/`user_cost_report` report post-discount, pre-credit `amount` plus pre-discount `list_amount`; neither is final until ~30 days after the usage date (`data_refreshed_at` marks the export watermark).
- This is distinct from `cost-report.md` (`/v1/organizations/cost_report`) and `usage-report.md` (`/v1/organizations/usage_report/*`), which are the plain Admin API cost/usage endpoints without the per-day/per-entity analytics cube, group_by/filter dimensions, or Enterprise gating.

## Related

- cost-report.md
- usage-report.md
- rbac-groups.md
- workspaces.md
