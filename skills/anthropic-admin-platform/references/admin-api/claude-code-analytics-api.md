<!-- source: https://platform.claude.com/docs/en/manage-claude/claude-code-analytics-api / last verified: 2026-08-07 -->

# Claude Code Analytics API

Programmatically access your organization's Claude Code usage analytics and productivity metrics with the Claude Code Analytics Admin API.

## Signature / Usage

```bash
curl "https://api.anthropic.com/v1/organizations/usage_report/claude_code?\
starting_at=2025-09-08&\
limit=20" \
  -H "anthropic-version: 2023-06-01" \
  -H "x-api-key: $ADMIN_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `starting_at` | string, required | UTC date `YYYY-MM-DD`; returns metrics for this single day only |
| `limit` | integer | Records per page (default 20, max 1000) |
| `page` | string | Opaque cursor from previous response's `next_page` |
| `core_metrics` | object | `num_sessions`, `lines_of_code.added/removed`, `commits_by_claude_code`, `pull_requests_by_claude_code` |
| `tool_actions` | object | `edit_tool` / `multi_edit_tool` / `write_tool` / `notebook_edit_tool`, each with `accepted`/`rejected` |
| `model_breakdown` | array | Per-model `tokens.input/output/cache_read/cache_creation` and `estimated_cost.amount/currency` |
| `actor` | object | `user_actor` (`email_address`) or `api_actor` (`api_key_name`) |

## Notes

- Requires an Admin API key; free to use for all organizations with Admin API access
- Not available on Claude Platform on AWS; Claude Enterprise (claude.ai) Claude Code activity is reported by the Claude Enterprise Analytics API instead
- Data typically available within 1 hour of activity; only data older than 1 hour is included in responses for pagination consistency
- Tool acceptance rate = `accepted / (accepted + rejected)`
- Only tracks Claude Code usage on the Claude API; excludes Amazon Bedrock, Microsoft Foundry, Google Cloud, and Claude Platform on AWS deployments
- For the Claude Code CLI product itself (not this analytics API), see the anthropic-claude-code skill

## Related

- [analytics-api](./analytics-api.md)
- [admin-api](./admin-api.md)
- [usage-cost-api](../usage-cost/usage-cost-api.md)
