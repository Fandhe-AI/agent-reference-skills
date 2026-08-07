<!-- source: https://platform.claude.com/docs/en/api/admin/organizations, https://platform.claude.com/docs/en/api/admin/organizations/me / last verified: 2026-08-07 -->

# Organizations Admin API

Retrieve information about the organization associated with the authenticated key.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/me` | Get Current Organization |

```http
curl https://api.anthropic.com/v1/organizations/me \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN"
```

## Options / Props

### Organization object

| Name | Type | Description |
|------|------|-------------|
| id | string | ID of the Organization |
| name | string | Name of the Organization |
| type | `"organization"` | Object type |

## Notes

- Requires an Admin API key (`sk-ant-admin...`).

## Related

- [workspaces.md](./workspaces.md)
- [users.md](./users.md)
