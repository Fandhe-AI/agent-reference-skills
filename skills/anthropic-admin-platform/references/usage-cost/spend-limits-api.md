<!-- source: https://platform.claude.com/docs/en/manage-claude/spend-limits-api / last verified: 2026-08-07 -->

# Spend Limits API

Set a spend limit on each Claude Enterprise member, see where each member's spend limit is inherited from, and review or act on members' requests for a higher limit.

## Signature / Usage

```bash
curl "https://api.anthropic.com/v1/organizations/spend_limits/effective?limit=20" \
  --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GET /v1/organizations/spend_limits/effective` | endpoint | One row per member: resolved limit, `source`, `period_to_date_spend` |
| `GET /v1/organizations/spend_limits/{id}` | endpoint | Get one configured spend limit |
| `POST /v1/organizations/spend_limits` | endpoint | Upsert a per-user override (`scope.type: "user"` only), keyed on `(scope, period)` |
| `DELETE /v1/organizations/spend_limits/{id}` | endpoint | Remove a per-user override; falls back to inherited limit |
| `GET /v1/organizations/spend_limit_increase_requests` | endpoint | List requests; filter `status[]` (`pending`/`approved`/`denied`), `actor_ids[]` |
| `POST .../{id}/approve` | endpoint | Approve a pending request with admin-supplied `amount` |
| `POST .../{id}/deny` | endpoint | Deny a pending request; idempotent on `denied` |
| `source` | field | `user`, `seat_tier`, `rbac_group`, or `organization` — where the effective limit resolved from |

## Notes

- Claude Enterprise organizations only, not available to Claude Platform (Claude Console) organizations
- Requires Admin API key with `read:spend_limits` / `write:spend_limits` scope; usage credits must be turned on
- Amounts are decimal strings in minor units (cents); `amount: null` on an effective row means unlimited, `"0"` means included-usage-only
- Only `monthly` period is currently supported; monthly spend resets at 00UTC on the first of each calendar month
- A group spend limit is a per-member default, not a pooled group budget
- Setting a spend limit directly does not resolve a pending increase request; use the approve endpoint to do both
- Rate limit: 60 requests/minute shared across all 8 endpoints; pagination cursors are bound to the query that issued them

## Related

- [analytics-api](../admin-api/analytics-api.md)
- [admin-api-keys](../admin-api/admin-api-keys.md)
- [usage-cost-api](./usage-cost-api.md)
