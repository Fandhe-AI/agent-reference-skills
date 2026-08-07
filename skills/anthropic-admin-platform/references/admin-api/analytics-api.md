<!-- source: https://platform.claude.com/docs/en/manage-claude/analytics-api / last verified: 2026-08-07 -->

# Analytics APIs

Understand which analytics API and API key your organization needs, then provision access to Claude Code productivity metrics or Claude Enterprise engagement and adoption data.

## Signature / Usage

```bash
curl "https://api.anthropic.com/v1/organizations/usage_report/claude_code?starting_at=2025-09-08" \
  --header "anthropic-version: 2023-06-01" \
  --header "x-api-key: $ADMIN_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Claude Code Analytics API | API | Admin API key (`sk-ant-admin01-...`); daily Claude Code metrics per user (sessions, LOC, commits, PRs, tool acceptance, cost by model) |
| Claude Enterprise Analytics API | API | Analytics API key created in claude.ai; org-wide engagement, adoption, cost/usage across products |
| `read:analytics` | scope | Required on the Analytics API key |
| `products[]` / `group_by[]` / `order_by` | param | Bracket-notation list params on cost/usage endpoints |

## Notes

- Key types are not interchangeable: an Admin API key cannot call the Claude Enterprise Analytics API and vice versa
- Claude Enterprise Analytics API data available from 2026-01-01 onward
- Engagement/adoption endpoints: ~1-day lag, aggregated at 10UTC the following day; requesting an unavailable date returns 400 naming the most recent available day
- Cost/usage endpoints: typically available within 4 hours (up to 24h); values can be revised for up to 30 days; use `data_refreshed_at` for stable repeated queries
- Active user definition: sent a chat message, had a Claude Code session with tool use/git activity, or had a Cowork session with tool use/message activity
- Amount fields are decimal strings in cents (e.g. `"41280.000000"` = $412.80); avoid binary floating-point parsing
- Rate limit: 60 requests/minute per organization across all endpoints
- Claude Code usage through Amazon Bedrock is not returned by the Claude Enterprise Analytics API

## Related

- [claude-code-analytics-api](./claude-code-analytics-api.md)
- [usage-cost-api](../usage-cost/usage-cost-api.md)
- [admin-api-keys](./admin-api-keys.md)
