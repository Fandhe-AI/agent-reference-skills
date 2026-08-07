<!-- source: https://platform.claude.com/docs/en/api/admin/service_accounts, https://platform.claude.com/docs/en/api/admin/service_accounts/list, https://platform.claude.com/docs/en/api/admin/service_accounts/retrieve, https://platform.claude.com/docs/en/api/admin/service_accounts/create, https://platform.claude.com/docs/en/api/admin/service_accounts/update, https://platform.claude.com/docs/en/api/admin/service_accounts/archive, https://platform.claude.com/docs/en/api/admin/service_accounts/workspaces/create, https://platform.claude.com/docs/en/api/admin/service_accounts/workspaces/list, https://platform.claude.com/docs/en/api/admin/service_accounts/workspaces/delete / last verified: 2026-08-07 -->

# Service Accounts Admin API

Manage non-human workload identities (service accounts) and their workspace memberships. Federation rules (`federation-rules.md`) target service accounts to mint tokens.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/service_accounts` | List Service Accounts |
| GET | `/v1/organizations/service_accounts/{service_account_id}` | Get Service Account |
| POST | `/v1/organizations/service_accounts` | Create Service Account |
| POST | `/v1/organizations/service_accounts/{service_account_id}` | Update Service Account |
| POST | `/v1/organizations/service_accounts/{service_account_id}/archive` | Archive Service Account |
| POST | `/v1/organizations/service_accounts/{service_account_id}/workspaces` | Add Workspace To Service Account |
| GET | `/v1/organizations/service_accounts/{service_account_id}/workspaces` | List Workspaces For Service Account |
| DELETE | `/v1/organizations/service_accounts/{service_account_id}/workspaces/{workspace_id}` | Remove Workspace From Service Account |

```http
curl https://api.anthropic.com/v1/organizations/service_accounts \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
    -d '{"name": "ci-deploy-bot"}'
```

## Options / Props

### Query Parameters (List)

| Name | Type | Description |
|------|------|-------------|
| include_archived | optional boolean | Default `false` |
| limit / page | optional | Pagination |

### Body Parameters (Create)

| Name | Type | Description |
|------|------|-------------|
| name | string | Slug identifier, unique within org (409 on duplicate), immutable |
| description | optional string | Free-text description |
| organization_role | optional `"admin"` \| `"developer"` | Default `"developer"`. `admin` requires an interactive credential (user OAuth token or Console session); a workload identity may only create `developer` accounts |

### Body Parameters (Update)

| Name | Type | Description |
|------|------|-------------|
| description | optional string | Omit = unchanged; null = clear |
| organization_role | optional `"admin"` \| `"developer"` | Setting to `admin` (even unchanged) requires interactive credential |

### ServiceAccount object

| Name | Type | Description |
|------|------|-------------|
| id | string | `svac_...` ID |
| archived_at | string | Set if archived |
| archived_by_actor_id / created_by_actor_id / updated_by_actor_id | string | Tagged actor IDs |
| created_at / updated_at | string | RFC 3339 timestamps |
| description | string | Free-text description |
| name | string | Admin-chosen slug |
| organization_role | `"admin"` \| `"developer"` | Only `admin`-role accounts can be targeted by a federation rule granting `org:admin` scope |
| type | `"service_account"` | Object type |

### Service Account Workspace membership sub-resource

Body (Add): `workspace_id` (string), `workspace_role` (`"workspace_admin"` \| `"workspace_developer"` \| `"workspace_restricted_developer"` \| `"workspace_user"`, cannot be `"workspace_billing"`).

Returns: `{ created_by_actor_id, implicit, service_account_id, type: "service_account_workspace_member", workspace_id, workspace_role }`.

Delete response: `{ service_account_id, type: "service_account_workspace_member_deleted", workspace_id }`.

Mirrors `workspaces.md`'s `POST/GET/DELETE /workspaces/{workspace_id}/service_accounts[/{service_account_id}]` — same membership record, addressed from the service-account side.

## Notes

- Requires an OAuth bearer (user or WIF-minted service account token) or Console session for all write operations; Admin API keys are not accepted.
- Archive is idempotent but rejected (400) if any live federation rule still targets the account.
- With `limit=1` on List Workspaces, the response may return 2 entries (implicit + one explicit) so a pagination cursor can be derived; archived service accounts return an empty list.

## Related

- [workspaces.md](./workspaces.md)
- [federation-rules.md](./federation-rules.md)
- [federation-issuers.md](./federation-issuers.md)
