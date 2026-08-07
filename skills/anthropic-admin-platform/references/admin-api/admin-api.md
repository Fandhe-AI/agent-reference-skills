<!-- source: https://platform.claude.com/docs/en/manage-claude/admin-api / last verified: 2026-08-07 -->

# Admin API

Manage organization members, workspaces, invites, and API keys programmatically with the Admin API, using an Admin API key or an `org:admin` OAuth token.

## Signature / Usage

```bash
# Accessing organization info
curl "https://api.anthropic.com/v1/organizations/me" \
  --header "anthropic-version: 2023-06-01" \
  --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

```json
{
  "id": "12345678-1234-5678-1234-567812345678",
  "type": "organization",
  "name": "Organization Name"
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Admin API key | credential | `sk-ant-admin...`, sent in `x-api-key`. Only members with the admin role can provision one |
| OAuth bearer token | credential | `org:admin` scope, sent in `authorization: Bearer`. Only admin/owner/primary owner roles can obtain one; required for service-account, federation-issuer, and federation-rule endpoints |

## Notes

- Unavailable for individual accounts; requires an organization set up in Console → Settings → Organization
- Claude Enterprise (claude.ai) organizations use the Admin API too, with a scoped API key created in claude.ai; only members/invites (beta) plus groups/custom-role reads (beta) and spend limits are available to them
- Claude Platform on AWS: only workspace create/get/list/update/archive endpoints are available; members, invites, API keys, usage/cost reports, and rate limit reports are not
- Five organization roles: `user`, `claude_code_user`, `developer`, `billing`, `admin` (owners/primary owners have all admin permissions plus can manage admins)
- New API keys can only be created through the Claude Console, not the Admin API
- Organization invites expire after 21 days with no way to modify the expiration period
- Members holding the admin role cannot be removed through the API

## Related

- [admin-api-keys](./admin-api-keys.md)
- [user-management](./user-management.md)
- [workspaces](./workspaces.md)
- [usage-cost-api](../usage-cost/usage-cost-api.md)
- [rate-limits-api](../usage-cost/rate-limits-api.md)
