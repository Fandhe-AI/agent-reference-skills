<!-- source: https://platform.claude.com/docs/en/manage-claude/spend-limits-api, https://platform.claude.com/docs/en/api/beta/organization/spend_limits/list, https://platform.claude.com/docs/en/api/beta/organization/spend_limits/set / last verified: 2026-10-16 -->

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
| `GET /v1/organizations/spend_limits` | endpoint | List configured spend limits (API reference only; Claude Enterprise only; beta header `spend-limit-reads-2026-09-26`; filter `scope_type[]`) |
| `POST /v1/organizations/spend_limits` | endpoint | Upsert a spend limit keyed on `(scope, period)`. Claude Enterprise: `scope.type: "user"` per-user override. Claude Console: `organization` / `workspace` monthly limit (early access preview, per the API reference) |
| `DELETE /v1/organizations/spend_limits/{id}` | endpoint | Remove a per-user override; falls back to inherited limit |
| `GET /v1/organizations/spend_limit_increase_requests` | endpoint | List requests; filter `status[]` (`pending`/`approved`/`denied`), `actor_ids[]` |
| `POST .../{id}/approve` | endpoint | Approve a pending request with admin-supplied `amount` |
| `POST .../{id}/deny` | endpoint | Deny a pending request; idempotent on `denied` |
| `source` | field | `user`, `seat_tier`, `rbac_group`, or `organization` — where the effective limit resolved from |

## Notes

- The guide states Claude Enterprise organizations only, not Claude Platform (Claude Console) organizations. The Set Spend Limit API reference additionally describes Claude Console `organization` / `workspace` limits (monthly, always carry an amount) as an early access preview (contact the Anthropic account team); any other scope/org-type combination returns 400. The guide's "eight endpoints" and "`scope.type: user` only" wording predates this
- `GET /v1/organizations/spend_limits` (List Spend Limits) is documented in the API reference only and is Claude Enterprise only
- Requires Admin API key with `read:spend_limits` / `write:spend_limits` scope; usage credits must be turned on
- Amounts are decimal strings in minor units (cents); `amount: null` on an effective row means unlimited, `"0"` means included-usage-only
- The guide states only `monthly` period is currently supported (treat `period` as an open set); the API reference schema also lists `daily` / `weekly`. Monthly spend resets at 00UTC on the first of each calendar month
- A group spend limit is a per-member default, not a pooled group budget
- Setting a spend limit directly does not resolve a pending increase request; use the approve endpoint to do both
- Rate limit: 60 requests/minute shared across the spend limit endpoints (the guide says "all eight endpoints", written before List Spend Limits was added); pagination cursors are bound to the query that issued them

## Related

- [analytics-api](../admin-api/analytics-api.md)
- [admin-api-keys](../admin-api/admin-api-keys.md)
- [usage-cost-api](./usage-cost-api.md)
