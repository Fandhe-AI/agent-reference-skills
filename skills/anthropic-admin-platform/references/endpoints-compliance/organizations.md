<!-- source: https://platform.claude.com/docs/en/api/compliance/organizations/list, https://platform.claude.com/docs/en/api/compliance/organizations/roles/list, https://platform.claude.com/docs/en/api/compliance/organizations/roles/retrieve, https://platform.claude.com/docs/en/api/compliance/organizations/roles/permissions/list, https://platform.claude.com/docs/en/api/compliance/organizations/settings/retrieve, https://platform.claude.com/docs/en/api/compliance/organizations/users/list / last verified: 2026-08-07 -->

# Organizations Compliance API

Directory endpoints covering linked organizations, their RBAC roles/permissions, effective settings, and user membership across a Claude Enterprise tenant.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/compliance/organizations` | List organizations under the parent organization |
| GET | `/v1/compliance/organizations/{org_uuid}/roles` | List Compliance Roles for an organization |
| GET | `/v1/compliance/organizations/{org_uuid}/roles/{role_id}` | Get a single Compliance Role |
| GET | `/v1/compliance/organizations/{org_uuid}/roles/{role_id}/permissions` | List a role's permissions |
| GET | `/v1/compliance/organizations/{organization_id}/settings` | Get effective (enforced) settings for an organization |
| GET | `/v1/compliance/organizations/{org_uuid}/users` | List current user members of an organization |

```bash
curl https://api.anthropic.com/v1/compliance/organizations \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `limit` | query, number | Max results (orgs: default/max 1000; roles/permissions/users: default 500, max 1000) |
| `page` | query, string | Opaque pagination token from `next_page` |
| `org_uuid` / `organization_id` | path, string | Organization UUID |
| `role_id` | path, string | Tagged ID, e.g. `rbac_role_abc123` |
| `x-api-key` | header, string | API key |
| **Returns (org list)** `data[].uuid` / `name` / `created_at` | string | Organization identity, sorted by creation ascending |
| **Returns (role)** `id` / `name` / `description` | string | Role identity |
| `created_at` / `updated_at` | string (ISO 8601) | Timestamps |
| **Returns (permissions)** `data[].action` / `resource_id` / `resource_type` | string | Permission grant on a role |
| **Returns (settings)** `api_keys[]` | array\<object\> | Compliance API keys for the org hierarchy (no secrets): `id`, `created_at`, `created_by_id`, `is_active`, `name`, `scopes[]`, `expires_at` |
| `settings[]` | array\<union\> | Enforced settings: `Boolean` (43+ named flags, e.g. `sso_enabled`, `claude_code_web_enabled`), `Integer` (`account_session_duration_seconds`), `String` (`claude_code_default_worker_environment_id`/`pool_id`), `StringList` (`allowed_invite_domains`, `ip_allowlist_ip_ranges`, `disabled_admin_request_types`), `ProvisioningMode` (`sso_provisioning_mode`), `DataRetention` (`data_retention_periods`, per-data-type `Fixed`/`Indefinite`) |
| **Returns (users)** `data[].id` / `email` / `full_name` | string | User identity |
| `data[].organization_role` | enum | `admin` \| `billing` \| `claude_code_user` \| `developer` \| `managed` \| `membership_admin` \| `owner` \| `primary_owner` \| `user` |
| `has_more` / `next_page` | boolean / string | Pagination |

## Notes

- Directory endpoints (organizations/roles/users/groups) return data from every linked organization when the key covers the parent organization.
- Settings endpoint returns the **enforced** state after all policies apply (may differ from admin console configuration); settings the org cannot change are omitted.
- Enumerate `org_uuid` via `GET /v1/compliance/organizations` before calling any per-organization sub-resource (roles, settings, users) or filtering activities/chats/projects by `organization_ids`.

## Related

- [groups.md](./groups.md) — RBAC group directory and membership
- [activities.md](./activities.md) — `organization_ids` filter uses the UUIDs listed here
