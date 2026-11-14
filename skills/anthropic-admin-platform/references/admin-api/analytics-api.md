<!-- source: https://platform.claude.com/docs/en/manage-claude/analytics-api / last verified: 2026-11-14 -->

# Analytics APIs

Two product analytics APIs exist; which one you use depends on which Claude product your organization manages. The Claude Code Analytics API reports daily Claude Code productivity metrics for Claude Platform organizations (part of the Admin API, Admin API key). The Claude Enterprise Analytics API reports organization-wide engagement, adoption and cost data for Claude Enterprise organizations (Analytics API key created in claude.ai).

## Signature / Usage

```bash
curl "https://api.anthropic.com/v1/organizations/usage_report/claude_code?starting_at=2025-09-08" \
  -H "anthropic-version: 2026-10-21" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

## Options / Props

| API | Key type | Created in | Who can create it | What it covers |
|-----|----------|------------|-------------------|----------------|
| Claude Code Analytics API | Admin API key | Admin keys page in the Claude Console | Organization admin | Daily Claude Code metrics for each user: sessions, lines of code, commits, pull requests, tool acceptance, estimated cost by model |
| Claude Enterprise Analytics API | Analytics API key (scope `read:analytics`) | claude.ai > Organization settings > API | Primary owner | Organization-wide engagement and adoption (user activity, active-user summaries, project, skill and connector usage), plus cost and usage reports |

Claude Enterprise Analytics API provides: user activity (per-user daily metrics across chat, Claude Code, Chat and Cowork unified and other products), activity summaries (daily / weekly / monthly active users, seat counts, pending invites), project / skill / connector usage, and cost and usage reports (usage-based Enterprise plans).

Request conventions: list parameters use bracket notation (`products[]=chat&products[]=claude_code`); include the `anthropic-version` header on every request; Enterprise endpoints live under `https://api.anthropic.com/v1/organizations/analytics/`; pass the key in `x-api-key`.

## Notes

- The key types are not interchangeable: an Admin API key cannot call the Claude Enterprise Analytics API and an Analytics API key cannot call the Admin API. The one exception is the Usage and Cost Analytics API, which Claude Enterprise organizations call with their Analytics API key.
- The Claude Code Analytics API is available to every organization with Admin API access and is free to use.
- The Claude Enterprise Analytics API: engagement and adoption data is available on all Enterprise plans; cost and usage endpoints apply to usage-based Enterprise plans (seat-based plans reflect usage credits only). Only the primary owner can enable API access and create keys. Data is available for dates on or after January 1, 2026.

### Legacy

- "The cost and usage report endpoints under `/v1/organizations/analytics/` (`usage_report`, `cost_report`, `user_usage_report`, and `user_cost_report`) are legacy and remain supported. For new integrations, use the Usage and Cost Analytics API." The other Claude Enterprise Analytics API endpoints are not legacy.

### Data freshness

- Engagement and adoption endpoints (user activity, summaries, projects, skills, connectors): per-day snapshot, typically available about 13:00-13:30 UTC the following day (1-day lag); until then the most recent available day is usually 2 days before the current UTC date. Requesting an unavailable date returns a 400 naming the most recent available day.
- Cost and usage endpoints: typically within 4 hours, up to 24 hours. Values can be revised until about 7 days after the end of the calendar month (October 1 values can change until about November 7); for invoicing-grade totals query only months that ended at least 7 days ago.
- Cost and usage responses include `data_refreshed_at`. If `ending_at` is omitted it defaults to 31 days after `starting_at` or the current time, whichever is earlier, which can run past `data_refreshed_at`; for stable repeated calls set `ending_at` at or before a previously returned `data_refreshed_at`.

### Metric definitions

- Active user for a day: sent at least one chat message; or had at least one Claude Code session (local or remote) tied to the organization with tool use or git activity; or had at least one Cowork session with tool use or message activity.
- Chat and Cowork unified: most activity is reported under the `chat_cowork_unified` product value, not `chat` or `cowork`. It appears in the `chat_cowork_unified_metrics` object (user activity, skill / connector / plugin usage) and in `chat_cowork_unified_daily_active_user_count`, `chat_cowork_unified_weekly_active_user_count`, `chat_cowork_unified_monthly_active_user_count` (summaries). Cost and usage reports filtered by product leave it out unless `products[]` includes `chat_cowork_unified`. Some activity (such as voice mode) can still be reported under chat or Cowork, and a user can appear in both counts.
- Filtering user activity by project: a day's project activity is counted in `chat_cowork_unified_metrics.chat` if the user sent a chat message in Chat and Cowork unified that day, otherwise in `chat_metrics`.
- Per-product metric blocks are always present (zero counts, not `null`), except Chat and Cowork unified, whose fields are left out on deployments that don't offer it. Individual fields can be `null` (for example `distinct_skills_used_count` in `chat_metrics` when filtering by project).
- Connector names are normalized across sources (for example `Atlassian MCP server`, `mcp-atlassian`, `atlassian_MCP` all appear as `atlassian`).

### Working with the API

- Pagination cursors are bound to the issuing query: changing `products[]`, `group_by[]`, `order_by`, the date range or any filter with an old cursor returns 400 on cost and usage endpoints; restart without a cursor.
- Amount fields are decimal strings in cents (for example `"41280.000000"` is $412.80 USD); parse as a decimal and divide by 100; avoid binary floating point.
- Rate limit: organization-level, default 60 requests per minute across all endpoints in this API; contact your Anthropic account team to adjust.

### Known limitations

- Claude Code through Amazon Bedrock: the Claude Enterprise Analytics API does not return that Claude Code activity.
- With customer-managed encryption keys, `claude_code_metrics.core_metrics` `lines_of_code` and `commit_count` can be zero, `pull_request_count` can be lower than real, and skills started by slash command (such as `/skill-name`) are not counted; skills Claude invokes without a slash command are still counted.
- For product analytics in the product rather than programmatically, use the Analytics dashboard in claude.ai; for governance and auditing, see the Compliance API.
- Source: https://platform.claude.com/docs/en/manage-claude/analytics-api (retrieved 2026-11-14)

## Related

- [claude-code-analytics-api](./claude-code-analytics-api.md)
- [usage-cost-api](../usage-cost/usage-cost-api.md)
- [usage-cost-analytics-api](../usage-cost/usage-cost-analytics-api.md)
- [admin-api-keys](./admin-api-keys.md)
