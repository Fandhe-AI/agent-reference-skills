<!-- source: https://platform.claude.com/docs/en/manage-claude/usage-cost-api / last verified: 2026-08-07 -->

# Usage and Cost API

Programmatically access your organization's API usage and cost data with the Usage & Cost Admin API.

## Signature / Usage

```bash
curl "https://api.anthropic.com/v1/organizations/usage_report/messages?\
starting_at=2025-01-08T00:00:00Z&\
ending_at=2025-01-15T00:00:00Z&\
bucket_width=1d" \
  -H "anthropic-version: 2023-06-01" \
  -H "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `/v1/organizations/usage_report/messages` | endpoint | Token consumption by model, workspace, service tier; `bucket_width` of `1m`/`1h`/`1d` |
| `/v1/organizations/cost_report` | endpoint | Service-level USD cost breakdown; `1d` granularity only, `group_by[]` of `workspace_id`/`description` |
| `group_by[]` | param | `model`, `workspace_id`, `service_tier`, `context_window`, `inference_geo`, `speed` (beta) |
| `inference_geos[]` | param | `global`, `us`, `not_available` |
| `speeds[]` | param | `standard`, `fast` (requires `anthropic-beta: fast-mode-2026-02-01` header) |

## Notes

- Claude Enterprise organizations use the Claude Enterprise Analytics API cost/usage endpoints with an Analytics API key instead, not this API
- Not available on Claude Platform on AWS; view Usage/Cost pages in Claude Console instead
- Time granularity limits: `1m` default 60 / max 1440 buckets, `1h` default 24 / max 168, `1d` default 7 / max 31
- Priority Tier costs use a different billing model and are excluded from the cost endpoint; track via the usage endpoint's `service_tier: priority`
- Data typically appears within 5 minutes; polling once per minute is supported for sustained use
- Workbench usage has `api_key_id: null`; Default Workspace usage/costs have `workspace_id: null`
- Code execution costs appear only in the cost endpoint under `Code Execution Usage`, not in the usage endpoint
- Models released before Claude Opus 4.6 / Sonnet 4.6 (Feb 2026) return `"not_available"` for `inference_geo`

## Related

- [rate-limits-api](./rate-limits-api.md)
- [spend-limits-api](./spend-limits-api.md)
- [analytics-api](../admin-api/analytics-api.md)
- [claude-code-analytics-api](../admin-api/claude-code-analytics-api.md)
