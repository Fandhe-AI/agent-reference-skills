<!-- source: https://platform.claude.com/docs/en/api/admin/rbac_roles, https://platform.claude.com/docs/en/api/admin/rbac_roles/list, https://platform.claude.com/docs/en/api/admin/rbac_roles/retrieve, https://platform.claude.com/docs/en/api/admin/rbac_roles/permissions/list / last verified: 2026-08-07 -->

# RBAC Roles Admin API

Read-only listing of RBAC Roles and the permissions each grants. Beta, Claude Enterprise only. Roles are attached to `rbac-groups.md` via the admin settings (not this API).

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/rbac_roles` | List RBAC Roles |
| GET | `/v1/organizations/rbac_roles/{role_id}` | Get RBAC Role |
| GET | `/v1/organizations/rbac_roles/{role_id}/permissions` | List RBAC Role Permissions |

```http
curl https://api.anthropic.com/v1/organizations/rbac_roles \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: ce-user-management-2026-07-13' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN"
```

## Options / Props

### Header (required)

| Name | Type | Description |
|------|------|-------------|
| anthropic-beta | `ce-user-management-2026-07-13` | Required for all RBAC Roles endpoints |

### Query Parameters (List / List Permissions)

| Name | Type | Description |
|------|------|-------------|
| limit | optional number | Default `20`, range `1`-`1000` |
| page | optional string | `next_page` token |

### RbacRole object

| Name | Type | Description |
|------|------|-------------|
| id | string | ID of the RBAC Role |
| created_at / updated_at | string | RFC 3339 timestamps |
| name | string | Role name |
| type | `"rbac_role"` | Object type |

### RbacRolePermission object

| Name | Type | Description |
|------|------|-------------|
| action | string | Permission action; vocabulary depends on `resource.type` — feature entitlement / `permission_*` / blanket `capability_access_all` / `capability_access_all_ga` for `organization`; `use`/`always_allow` for `connector_tool`; `grant` for `connector_scope`; tool-access/scope/`interactive`/`managed` for `connector`/`all_connectors` |
| resource | discriminated union by `type` | `Organization { organization_id, type: "organization" }`, `ConnectorTool { connector_id, tool_name, type: "connector_tool" }`, `ConnectorScope { connector_id, scope, type: "connector_scope" }`, `Connector { connector_id, type: "connector" }`, `AllConnectors { type: "all_connectors" }` |
| type | `"rbac_role_permission"` | Object type |

## Notes

- Requires the `ce-user-management-2026-07-13` beta header; available only to Claude Enterprise organizations.
- A blanket `capability_access_all` / `capability_access_all_ga` action row grants every covered product-feature entitlement; consumers must expand it rather than treat it as a single entitlement, or under-report effective access. Neither blanket mode grants model-access entitlements.
- `tool_name` and `scope` values containing characters outside `[a-zA-Z0-9_-]` are server-encoded into a stable `{prefix}_{32-hex}` form; the original value is not recoverable from it.

## Related

- [rbac-groups.md](./rbac-groups.md)
