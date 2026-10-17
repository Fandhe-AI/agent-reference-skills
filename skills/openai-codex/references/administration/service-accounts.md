# Service accounts

Non-human ChatGPT workspace identities for running headless Codex workflows (CI runners, scheduled jobs, shared integrations) with the same groups, roles, access controls, and auditability as people.

## Signature / Usage

Requires Codex CLI `0.142.0` or later.

```bash
export CODEX_ACCESS_TOKEN="<service-account-access-token>"
codex exec --json "Inspect this repository and summarize its current state."
```

Save a login on a trusted machine:

```bash
printf '%s' "$CODEX_ACCESS_TOKEN" | codex login --with-access-token
codex exec "Summarize the changes in the current branch."
```

Create a token through the Admin API (`ttl` in seconds; finite lifetime must be under one year):

```json
{
  "name": "production-release-runner",
  "ttl": 2592000,
  "scopes": ["chatgpt.workspace.feature.allow-codex-local-access.access"]
}
```

SCIM provisioning (`userType` set to `ServiceAccount`):

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "userName": "svc-codex-release@company.example",
  "displayName": "Codex release automation",
  "active": true,
  "userType": "ServiceAccount"
}
```

## Options / Props

Shared-account roles (for people managing the account):

| Role | Configure account and plugins | Create service-account access tokens |
|------|-------------------------------|--------------------------------------|
| User | No | Yes |
| Configure | Yes | No |
| Manager | Yes | Yes |

Admin API accounts:

| Operation | Method | What it does |
|-----------|--------|--------------|
| List accounts | `GET` | Returns workspace service accounts |
| Create an account | `POST` | Creates a named service account (`POST /v1/manage/workspaces/{workspace_id}/service-accounts`) |
| Get an account | `GET` | Returns one service account |
| Enable or disable an account | `PATCH` | Updates only `enabled` |
| Delete an account | `DELETE` | Removes the account and revokes its tokens |

Admin API tokens:

| Operation | Method | What it does |
|-----------|--------|--------------|
| List tokens | `GET` | Returns token metadata |
| Create a token | `POST` | Creates a scoped access token |
| Revoke a token | `DELETE` | Permanently revokes one token |

## Notes

- Available only on pay-as-you-go plans. Only workspace owners and admins can create, delete, or share service accounts.
- Create via Workspace settings > Service accounts (`https://chatgpt.com/admin/service-accounts`). The account does not inherit the creator's plugins, connected apps, or permissions; configure plugins and assign roles/groups directly. The **User** role cannot set up plugins.
- A service account token represents the service account; a personal access token represents the member who creates it. API Platform project service accounts and API keys use separate project access and billing.
- The full token is shown only once; store it in a secret manager. Workspace policies control available expirations.
- Admin API: read operations need `chatgpt.enterprise.service_account.read`, changes need `chatgpt.enterprise.service_account.write`. A service-account token cannot authenticate Admin API requests. Shared-account role values are `manager`, `configurer`, `user`.
- SCIM-managed accounts cannot be renamed or deleted in ChatGPT; the identity provider manages name, group membership, and lifecycle.
- Disabling or deleting an account revokes all active tokens. Disabled accounts can be re-enabled with new tokens; deletion cannot be undone.
- On shared or temporary runners use `CODEX_ACCESS_TOKEN` without saving a login.
- Source: https://learn.chatgpt.com/docs/enterprise/service-accounts (retrieved 2026-10).

## Related

- [Access tokens](./access-tokens.md)
- [Authentication](./authentication.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Groups and provisioning](./groups-and-provisioning.md)
- [Governance](./governance.md)
- [Compliance API](./compliance-api.md)
