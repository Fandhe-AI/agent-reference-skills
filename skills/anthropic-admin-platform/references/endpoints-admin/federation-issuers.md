<!-- source: https://platform.claude.com/docs/en/api/admin/federation_issuers, https://platform.claude.com/docs/en/api/admin/federation_issuers/create, https://platform.claude.com/docs/en/api/admin/federation_issuers/list, https://platform.claude.com/docs/en/api/admin/federation_issuers/retrieve, https://platform.claude.com/docs/en/api/admin/federation_issuers/update, https://platform.claude.com/docs/en/api/admin/federation_issuers/archive / last verified: 2026-08-07 -->

# Federation Issuers Admin API

Register OIDC issuers Anthropic trusts for workload identity federation (RFC 7523 jwt-bearer grant). See also `federation-rules.md` for the rules that bind an issuer's tokens to a service account.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/organizations/federation_issuers` | Create Federation Issuer |
| GET | `/v1/organizations/federation_issuers` | List Federation Issuers |
| GET | `/v1/organizations/federation_issuers/{federation_issuer_id}` | Get Federation Issuer |
| POST | `/v1/organizations/federation_issuers/{federation_issuer_id}` | Update Federation Issuer |
| POST | `/v1/organizations/federation_issuers/{federation_issuer_id}/archive` | Archive Federation Issuer |

```http
curl https://api.anthropic.com/v1/organizations/federation_issuers \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "Authorization: Bearer $ANTHROPIC_OAUTH_TOKEN" \
    -d '{"issuer_url": "https://token.actions.githubusercontent.com", "name": "github-actions"}'
```

## Options / Props

### Body Parameters (Create)

| Name | Type | Description |
|------|------|-------------|
| issuer_url | string | `iss` claim value to match against |
| name | string | Slug identifier (lowercase, digits, hyphens), unique within org (409 on duplicate) |
| check_jti | optional boolean | Enforce JTI single-use replay protection. Default `true` |
| jwks | optional object (discriminated by `type`) | Discovery: `{ type: "discovery", ca_cert_pem?, discovery_base? }`. ExplicitURL: `{ type: "explicit_url", url, ca_cert_pem? }`. Inline: `{ type: "inline", keys }`. Defaults to discovery |
| max_jwt_lifetime_seconds | optional number | Max iat→exp spread, 1-176400s (49h). Default `3600` |

Update: same fields, all optional, `issuer_url` replaces (JWKS source repoints for discovery-mode). `jwks_polling_disabled` accepts only `false` (re-enable after auto-pause).

### Query Parameters (List)

| Name | Type | Description |
|------|------|-------------|
| include_archived | optional boolean | Default `false` |
| limit | optional number | Results per page |
| page | optional string | `next_page` cursor |

### FederationIssuer object

| Name | Type | Description |
|------|------|-------------|
| id | string | `fdis_...` tagged ID |
| archived_at | string | If set, all rules referencing this issuer reject token exchange |
| archived_by_actor_id / created_by_actor_id / updated_by_actor_id | string | Tagged actor IDs (`user_`/`svac_`) |
| check_jti | boolean | JTI single-use enforcement |
| created_at / updated_at | string | RFC 3339 timestamps |
| issuer_url | string | Must match JWT `iss` claim exactly |
| jwks | object | Discovery / ExplicitURL / Inline shape |
| jwks_polling_disabled_at | string | Set when poller paused after repeated fetch failures |
| max_jwt_lifetime_seconds | number | Max iat→exp spread |
| name | string | Admin-chosen slug |
| poll_status | object `{ consecutive_failures, last_fetched_at, next_poll_at }` | JWKS polling health |
| type | `"federation_issuer"` | Object type |

## Notes

- Create/Update/Archive require an OAuth bearer or Console session; Admin API keys are not accepted.
- Archive is idempotent but rejected (400) if any live rule still references the issuer.
- Well-known shared issuers (GitHub Actions, GitLab, Buildkite, Terraform Cloud, Google) require tenant-identity-constraining match rules on the federation rule side (see `federation-rules.md`).

## Related

- [federation-rules.md](./federation-rules.md)
- [service-accounts.md](./service-accounts.md)
