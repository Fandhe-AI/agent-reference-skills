# AI Usage

Endpoint for fetching per-user, per-day AI credit usage for an organization's plan. Enterprise plan required.

## Signature / Usage

```http
GET /v1/ai_usage/daily?start_date=2026-05-01&end_date=2026-05-31
X-Figma-Token: <plan access token>
```

## Options / Props

| Parameter | Type | Required | Description |
|-----------|------|----------|--------------|
| `start_date` | String | Yes | UTC calendar date (`YYYY-MM-DD`); must be ≥ 2025-12-01 and no more than 366 days in the past |
| `end_date` | String | Yes | UTC calendar date (`YYYY-MM-DD`); must be ≥ `start_date` and ≤ current UTC day |
| `user_email` | String | No | Filter results to a single user by email address |
| `limit` | Number | No | Rows per request (1-1000); defaults to 1000 |
| `cursor` | String | No | Opaque pagination cursor from a previous response |

**Response fields:** `plan_id`, `user_id`, `user_email`, `day`, `editor_type` (`design`, `figjam`, `slides`, `sites`, `buzz`, `make`, `not_applicable`), `seat_credits_sum`, `plan_credits_sum`, `workspace_id`, `workspace_name`, `team_id`, `team_name`, `license_group_id`, `license_group_name`, `metering_period_start`, `metering_period_end`, `next_cursor`, `has_next_page`

- **Scope:** `org:ai_metering_usage_read`
- **Rate Limit:** Tier 3
- **Plan:** Enterprise only
- **Token type:** Plan access token, created by organization administrators only

**Error Codes:** 400 (malformed/missing parameters, invalid date range), 401 (missing/invalid token or deleted plan), 403 (missing scope or resource-restricted token)

## Notes

- AI usage data is updated periodically and can lag real-time activity by up to 5-6 hours; the current day's usage may not yet be reflected
- Data is available only since 2025-12-01; date range cannot exceed 366 days
- Container name fields (`workspace_name`, `team_name`, `license_group_name`) show the most recent value if renamed during a day
- Intended for internal reporting and chargeback systems tying AI credit consumption to users, workspaces, teams, and license groups

## Related

- [Plan Access Tokens](./plan-access-tokens.md)
- [Library Analytics](./library-analytics.md)
