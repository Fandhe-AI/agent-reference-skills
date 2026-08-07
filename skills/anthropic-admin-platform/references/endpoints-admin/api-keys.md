<!-- source: https://platform.claude.com/docs/en/api/admin/api_keys, https://platform.claude.com/docs/en/api/admin/api_keys/list, https://platform.claude.com/docs/en/api/admin/api_keys/retrieve, https://platform.claude.com/docs/en/api/admin/api_keys/update / last verified: 2026-08-07 -->

# API Keys Admin API

Manage regular API keys within an organization (list, view, update status). Never returns a key's secret value.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/api_keys` | List API Keys |
| GET | `/v1/organizations/api_keys/{api_key_id}` | Retrieve API Key |
| POST | `/v1/organizations/api_keys/{api_key_id}` | Update API Key |

```http
curl https://api.anthropic.com/v1/organizations/api_keys \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN"
```

## Options / Props

### Query Parameters (List API Keys)

| Name | Type | Description |
|------|------|-------------|
| after_id / before_id | optional string | Pagination cursors |
| created_by_user_id | optional string | Filter by creator User ID |
| limit | optional number | Default `20`, range `1`-`1000` |
| status | optional `"active"` \| `"archived"` \| `"expired"` \| `"inactive"` | Filter by status |
| workspace_id | optional string | Filter by Workspace ID |

### Body Parameters (Update API Key)

| Name | Type | Description |
|------|------|-------------|
| name | optional string | Name of the API key |
| status | optional `"active"` \| `"archived"` \| `"inactive"` | Status of the API key |

### APIKey object

| Name | Type | Description |
|------|------|-------------|
| id | string | ID of the API key |
| created_at | string | RFC 3339 datetime created |
| created_by | object `{ id, type }` | Actor that created the key |
| expires_at | string | RFC 3339 expiry datetime, or null if never |
| name | string | Name of the API key |
| partial_key_hint | string | Partially redacted key hint |
| principal | object `{ id, type: "service_account" \| "user" }` | Principal the key acts as, or null if unbound |
| status | `"active"` \| `"archived"` \| `"expired"` \| `"inactive"` | Status of the API key |
| type | `"api_key"` | Object type |
| workspace_id | string | Associated Workspace ID, or null for default Workspace |

## Notes

- Requires an Admin API key (`sk-ant-admin...`); intended for programmatic key management, never returns the secret value. To view/create your own keys use the Console (`platform.claude.com/settings/keys`).

## Related

- external-keys.md
- workspaces.md
