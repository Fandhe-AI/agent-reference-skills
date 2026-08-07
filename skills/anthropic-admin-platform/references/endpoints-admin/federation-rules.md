<!-- source: https://platform.claude.com/docs/en/api/admin/federation_rules, https://platform.claude.com/docs/en/api/admin/federation_rules/create, https://platform.claude.com/docs/en/api/admin/federation_rules/list, https://platform.claude.com/docs/en/api/admin/federation_rules/retrieve, https://platform.claude.com/docs/en/api/admin/federation_rules/update, https://platform.claude.com/docs/en/api/admin/federation_rules/archive, https://platform.claude.com/docs/en/api/admin/federation_rules/workspaces/create, https://platform.claude.com/docs/en/api/admin/federation_rules/workspaces/list, https://platform.claude.com/docs/en/api/admin/federation_rules/workspaces/delete / last verified: 2026-08-07 -->

# Federation Rules Admin API

Authorization rules that bind a `federation_issuers.md` issuer's verified JWTs to an Anthropic service account, plus the per-workspace enablement sub-resource.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/organizations/federation_rules` | Create Federation Rule |
| GET | `/v1/organizations/federation_rules` | List Federation Rules |
| GET | `/v1/organizations/federation_rules/{federation_rule_id}` | Get Federation Rule |
| POST | `/v1/organizations/federation_rules/{federation_rule_id}` | Update Federation Rule |
| POST | `/v1/organizations/federation_rules/{federation_rule_id}/archive` | Archive Federation Rule |
| POST | `/v1/organizations/federation_rules/{federation_rule_id}/workspaces` | Add Federation Rule Workspace |
| GET | `/v1/organizations/federation_rules/{federation_rule_id}/workspaces` | List Federation Rule Workspaces |
| DELETE | `/v1/organizations/federation_rules/{federation_rule_id}/workspaces/{workspace_id}` | Remove Federation Rule Workspace |

```http
curl https://api.anthropic.com/v1/organizations/federation_rules \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
    -d '{
          "issuer_id": "fdis_...",
          "match": {"subject_prefix": "repo:my-org/my-repo:ref:refs/heads/main"},
          "name": "prod-deploy-pipeline",
          "oauth_scope": "workspace:inference",
          "target": {"service_account_id": "svac_...", "type": "service_account"}
        }'
```

## Options / Props

### Body Parameters (Create Federation Rule)

| Name | Type | Description |
|------|------|-------------|
| issuer_id | string | Tagged ID of the federation issuer (immutable after create) |
| match | object | `audience?`, `claims?` (map[string], exact-match), `condition?` (CEL over `claims`), `subject_prefix?` (exact or `*`-suffix prefix match on `sub`). At least one of `subject_prefix`/`claims`/`condition` required |
| name | string | Slug identifier, unique within org (409 on duplicate) |
| oauth_scope | string | Space-separated scopes. OAuth callers limited to `workspace:developer` / `workspace:inference`; others need Console session |
| target | object `{ service_account_id, type: "service_account", service_account_name? }` | Identity tokens act as |
| applies_to_all_workspaces | optional boolean | Enable for every workspace incl. future ones |
| attributes | optional map[string] | CEL claim-extraction expressions — not yet supported, non-empty rejected |
| description | optional string | Free-text description |
| token_lifetime_seconds | optional number | 60-86400, default `3600`. Capped at `max(60, min(value, 2× remaining assertion validity))` |
| workspace_id | optional string | Workspace to enable for; required unless `applies_to_all_workspaces` is true |

### Query Parameters (List)

| Name | Type | Description |
|------|------|-------------|
| include_archived | optional boolean | Default `false` |
| issuer_id | optional string | Filter by issuer |
| limit / page | optional | Pagination |

### FederationRule object

| Name | Type | Description |
|------|------|-------------|
| id | string | `fdrl_...` tagged ID |
| applies_to_all_workspaces | boolean | Enabled for every workspace incl. future ones |
| archived_at | string | If set, rejects token exchange |
| issuer_id / issuer_name | string | Referenced issuer |
| match | object | Same shape as Create |
| oauth_scope | string | Scopes granted on minted token |
| target | object | Same shape as Create |
| token_lifetime_seconds | number | Effective lifetime |
| type | `"federation_rule"` | Object type |
| workspace_id | string | Legacy single-workspace binding (prefer `workspace_ids` / workspaces sub-resource) |
| workspace_ids | array of string | Workspaces this rule is enabled for; may be empty (legacy-only rules) |

### Federation Rule Workspaces sub-resource

Body (Add): `workspace_id` (string).

Returns: `{ created_at, created_by_actor_id, federation_rule_id, type: "federation_rule_workspace", workspace_id, workspace_name }`.

Delete response: `{ federation_rule_id, type: "federation_rule_workspace_deleted", workspace_id }`.

List `limit`/`page` are accepted but have no effect; only explicit per-workspace enablements are returned (check `applies_to_all_workspaces` / legacy `workspace_id` on the rule itself for those cases).

## Notes

- All rule/workspace-enablement writes require an OAuth bearer or Console session; Admin API keys are not accepted.
- Well-known shared issuers (GitHub Actions, GitLab, Buildkite, Terraform Cloud, Google) must have `match` constrain tenant identity (identity claim, tenant-pinning `subject_prefix`, or CEL `condition`); a constant-true `condition` is rejected.
- Token exchange resolves a single enabled workspace per call; the target service account must be a member of that workspace (implicitly a member of the default workspace) except for legacy `workspace_id`-only rules.
- Archive clears `workspace_id`/`workspace_ids`; already-minted tokens remain valid until expiry. All archive/enable/disable operations are idempotent.

## Related

- federation-issuers.md
- service-accounts.md
- workspaces.md
