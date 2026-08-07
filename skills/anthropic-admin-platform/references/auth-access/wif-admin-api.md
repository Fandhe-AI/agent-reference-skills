<!-- source: https://platform.claude.com/docs/en/manage-claude/wif-admin-api / last verified: 2026-08-07 -->

# Manage WIF with the Admin API

Create and manage Workload Identity Federation service accounts, issuers, and rules programmatically for infrastructure-as-code and CI workflows, under `/v1/organizations`.

## Signature / Usage

```bash
# Create a service account
curl --fail-with-body -sS "https://api.anthropic.com/v1/organizations/service_accounts" \
  -H "anthropic-version: 2023-06-01" \
  -H "authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
  -H "content-type: application/json" \
  -d '{"name": "inference-worker", "organization_role": "developer"}'

# Register an issuer
curl --fail-with-body -sS "https://api.anthropic.com/v1/organizations/federation_issuers" \
  -H "anthropic-version: 2023-06-01" \
  -H "authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
  -H "content-type: application/json" \
  -d '{"name": "github-actions", "issuer_url": "https://token.actions.githubusercontent.com", "jwks": {"type": "discovery"}}'

# Create a federation rule
curl --fail-with-body -sS "https://api.anthropic.com/v1/organizations/federation_rules" \
  -H "anthropic-version: 2023-06-01" \
  -H "authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
  -H "content-type: application/json" \
  -d '{
    "name": "gha-deploy",
    "issuer_id": "fdis_...",
    "match": {"subject_prefix": "repo:my-org/my-repo:ref:refs/heads/main"},
    "target": {"type": "service_account", "service_account_id": "svac_..."},
    "workspace_id": "wrkspc_...",
    "oauth_scope": "workspace:developer",
    "token_lifetime_seconds": 600
  }'
```

## Options / Props

| Endpoint group | Operations |
|-----------------|------------|
| `/v1/organizations/service_accounts` | Create, list, `GET`/`POST` single, archive (`POST .../archive`); `/{id}/workspaces` sub-resource for membership |
| `/v1/organizations/federation_issuers` | Create, list, `GET`/`POST` single, archive; `jwks` discriminated union: `discovery` / `explicit_url` / `inline` |
| `/v1/organizations/federation_rules` | Create, list (filter by `issuer_id`), `GET`/`POST` single, archive; `/{id}/workspaces` sub-resource |

## Notes

- Claude API WIF resource management (`svac_`/`fdis_`/`fdrl_` IDs under `/v1/organizations`); distinct from OpenAI's WIF admin surface in `openai-platform-ops`.
- Every request needs an OAuth bearer token with `org:admin` scope (admin/owner/primary owner role only); Admin API keys are not accepted on these endpoints.
- Two ways to get a token: interactive via `ant auth login --profile admin --scope "org:admin"`, or a workload federation rule with `oauth_scope: org:admin` targeting a service account with `organization_role: admin` (must be created in the Console, not bootstrapped by automation).
- OAuth-authenticated callers can only create/modify rules with `oauth_scope` of `workspace:developer` or `workspace:inference`; other scopes (e.g. `org:admin`, `workspace:manage_tunnels`) require the Console. Same restriction applies to updating an issuer that backs a non-workspace-scoped rule.
- Resource `name` must match `^[a-z0-9-]+$`, 1–255 chars, unique per resource type within an org.
- List endpoints accept `limit` (1–100, default 20) and a `page` cursor; pass `include_archived=true` to include archived resources.
- Archiving is a soft delete and idempotent; archiving an issuer/service account still referenced by a live rule returns `400`.

## Related

- [workload-identity-federation.md](./workload-identity-federation.md)
- [wif-reference.md](./wif-reference.md)
