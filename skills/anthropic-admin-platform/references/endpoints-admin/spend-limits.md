<!-- source: https://platform.claude.com/docs/en/api/admin/spend_limits, https://platform.claude.com/docs/en/api/admin/spend_limits/create, https://platform.claude.com/docs/en/api/admin/spend_limits/delete, https://platform.claude.com/docs/en/api/admin/spend_limits/retrieve, https://platform.claude.com/docs/en/api/admin/spend_limits/list_effective, https://platform.claude.com/docs/en/api/admin/spend_limits/increase_requests/approve, https://platform.claude.com/docs/en/api/admin/spend_limits/increase_requests/deny, https://platform.claude.com/docs/en/api/admin/spend_limits/increase_requests/list, https://platform.claude.com/docs/en/api/admin/spend_limits/increase_requests/retrieve / last verified: 2026-08-07 -->

# Spend Limits Admin API

Set/inspect per-user spend limit overrides, list effective limits per member, and manage member-submitted spend limit increase requests.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/organizations/spend_limits` | Set Spend Limit (upsert) |
| GET | `/v1/organizations/spend_limits/{spend_limit_id}` | Get Spend Limit |
| DELETE | `/v1/organizations/spend_limits/{spend_limit_id}` | Delete Spend Limit |
| GET | `/v1/organizations/spend_limits/effective` | List Effective Spend Limits |
| GET | `/v1/organizations/spend_limit_increase_requests` | List Spend Limit Increase Requests |
| GET | `/v1/organizations/spend_limit_increase_requests/{id}` | Get Spend Limit Increase Request |
| POST | `/v1/organizations/spend_limit_increase_requests/{id}/approve` | Approve Increase Request |
| POST | `/v1/organizations/spend_limit_increase_requests/{id}/deny` | Deny Increase Request |

```http
curl https://api.anthropic.com/v1/organizations/spend_limits \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
    -d '{"amount": "50000", "scope": {"type": "user", "user_id": "user_id"}, "period": "monthly"}'
```

## Options / Props

### Body Parameters (Set Spend Limit)

| Name | Type | Description |
|------|------|-------------|
| amount | string | Non-negative integer decimal string, minor currency units |
| scope | object `{ type: "user", user_id }` | Only `"user"` scope accepted; seat-tier/group/org defaults configured in claude.ai |
| period | optional `"daily"` \| `"monthly"` \| `"weekly"` | Upsert keyed on (scope, period) |

### Query Parameters (List Effective)

| Name | Type | Description |
|------|------|-------------|
| limit / page | optional | Pagination, paginates by member |
| period | optional array of string | Filter |
| user_ids | optional array of string | Filter |

### SpendLimit object

| Name | Type | Description |
|------|------|-------------|
| id | string | ID |
| amount | string | Minor-unit decimal string |
| created_at / updated_at | string | RFC 3339 |
| currency | string | e.g. `"USD"` |
| period | `"daily"` \| `"monthly"` \| `"weekly"` | Period |
| scope | discriminated union | `User { type, user_id }`, `SeatTier { seat_tier, type }`, `RbacGroup { rbac_group_id, type }`, `OrganizationService { service, type }`, `Organization { type }` |
| type | `"spend_limit"` | Object type |

### SpendSummary object (effective limits, per member/period)

| Name | Type | Description |
|------|------|-------------|
| actor | `{ deleted, email_address, name, type: "user_actor", user_id }` | `name`/`email_address` null if unavailable/deleted |
| amount / currency / period | — | Effective limit values |
| period_to_date_spend | string | Spend so far this period |
| scope | `{ type: "user", user_id }` | The member |
| source | discriminated union (same shapes as SpendLimit.scope) | Where the limit was inherited from |
| spend_limit_id | string | Underlying SpendLimit ID |

### Spend Limit Increase Requests

Query Parameters (List): `actor_ids` (optional array), `limit`/`page`, `status` (optional array of `"approved"`\|`"denied"`\|`"pending"`).

Body Parameters (Approve): `amount` (string, required), `period` (optional, defaults to the blocked period), `suppress_notification` (optional boolean).

Body Parameters (Deny): `suppress_notification` (optional boolean).

SpendLimitIncreaseRequest object: `{ id, actor, created_at, period, resolved_at, resolved_by (UserActor | ScopedAPIKeyActor), spend_summary, status: "approved"|"denied"|"pending", type: "spend_limit_increase_request" }`. Approve response additionally includes `spend_limit`.

## Notes

- Requires an Admin API key (`sk-ant-admin...`) — org-level org defaults are set via claude.ai instead.
- Delete only removes per-user override rows; seat-tier/group/org-level rows cannot be deleted via this endpoint (falls back to inherited limit).
- Deny is idempotent when already `denied`; denying an already-`approved` request returns 400.
- Anthropic emails the requester on approve/deny unless `suppress_notification` is set.

## Related

- [workspaces.md](./workspaces.md)
- [rate-limits.md](./rate-limits.md)
- [usage-report.md](./usage-report.md)
