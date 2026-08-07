<!-- source: https://platform.claude.com/docs/en/manage-claude/admin-api-keys / last verified: 2026-08-07 -->

# Create an Admin API key

Create an Admin API key for your Claude Console or Claude Enterprise organization.

## Signature / Usage

```text
# Claude Console: Settings > Admin keys
https://platform.claude.com/settings/admin-keys

# Claude Enterprise: Organization settings > API
https://claude.ai/admin-settings/api-access
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Claude Console key | `sk-ant-admin01-...` | Created by organization admins; full access to all endpoints accepting Admin API keys (excludes service-account/federation endpoints) |
| Claude Enterprise key | `sk-ant-api01-...` | Created by primary owner (all linked orgs) or organization owner (Compliance API scopes only, own org); scopes selected at creation |
| `read:members` / `write:members` | scope | Admin API user management: read/write members and invites |
| `read:rbac_groups` / `write:rbac_groups` | scope | Admin API user management: read/write groups |
| `read:spend_limits` / `write:spend_limits` | scope | Spend Limits API |
| `read:analytics` | scope | Claude Enterprise Analytics API |
| `read:compliance_activities` / `read:compliance_user_data` / `delete:compliance_user_data` / `read:compliance_org_data` / `read:org_audit` | scope | Compliance API |

## Notes

- A key created in one organization cannot manage a different organization; create one key per organization if using both Claude Console and Claude Enterprise
- Claude Console keys have no selectable scopes; Claude Enterprise keys choose scopes at creation and cannot add scopes later (create a new key instead)
- The full secret is shown only once at creation
- A call exceeding the key's scopes returns `403 Forbidden` listing the scopes the key has and needs

## Related

- [admin-api](./admin-api.md)
- [user-management](./user-management.md)
- [spend-limits-api](../usage-cost/spend-limits-api.md)
