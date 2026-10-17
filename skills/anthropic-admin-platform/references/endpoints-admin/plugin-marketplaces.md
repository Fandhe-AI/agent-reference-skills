<!-- source: https://platform.claude.com/docs/en/api/beta/organization/plugin_marketplaces / last verified: 2026-10-17 -->

# Plugin Marketplaces Admin API (Beta)

List and read the plugin marketplaces Plugins live in (the organization's own and members' personal ones), set an organization marketplace's default installation setting, and validate marketplace content without storing it.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/organizations/plugin_marketplaces` | List Plugin Marketplaces (newest first) |
| GET | `/v1/organizations/plugin_marketplaces/{marketplace_id}` | Get Plugin Marketplace |
| POST | `/v1/organizations/plugin_marketplaces/{marketplace_id}` | Update Plugin Marketplace (default installation setting) |
| POST | `/v1/organizations/plugin_marketplaces/validate_repository` | Validate Plugin Marketplace Repository |
| POST | `/v1/organizations/plugin_marketplaces/validate_archive` | Validate Plugin Marketplace Archive |

```bash
curl "https://api.anthropic.com/v1/organizations/plugin_marketplaces/${MARKETPLACE_ID}" \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: ce-plugins-2026-09-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "default_installation_preference": "available"
        }'
```

## Options / Props

### Header (required for all endpoints)

| Name | Type | Description |
|------|------|-------------|
| anthropic-beta | array containing `"ce-plugins-2026-09-01"` | Required. A request without it returns 404, as if the endpoint did not exist |

### Accepted credentials

| Endpoint | Credential |
|----------|-----------|
| List / Get | Admin API key with `read:plugins` or `read:org_audit`, or Compliance Access Key with `read:compliance_org_data` |
| Update | Admin API key with `write:plugins` |
| Validate repository / archive | Admin API key with `read:plugins` or `write:plugins` (`read:org_audit` and `read:compliance_org_data` do not grant it) |

### Query Parameters (List)

| Name | Type | Description |
|------|------|-------------|
| limit | optional number | Default 20, 1 to 1000 |
| page | optional string | `next_page` token (max 2048 chars) |
| owner_type | optional `"organization"` or `"user"` | Organization's marketplaces or members' personal ones |
| source | optional `"directory"` / `"github"` / `"gitlab"` / `"manual"` / `"public_git"` | Filter by source. `directory` (Anthropic's catalog) is never listed here |
| organization_id | optional string | For a `read:org_audit` / `read:compliance_org_data` key created for all of a parent organization's linked organizations: a child organization (UUID or `org_`-prefixed ID) to read instead. Other keys may pass only their own organization's ID |

`organization_id` is also accepted on Get.

### Body Parameters (Update)

| Name | Type | Description |
|------|------|-------------|
| default_installation_preference | `"auto_install"` / `"available"` / `"not_available"` / `"required"` | Organization-wide setting every Plugin in the marketplace without its own gets, including Plugins added later. Once set it can be changed but not removed |

### Body Parameters (Validate)

| Name | Type | Description |
|------|------|-------------|
| repository_url | string | `https://` URL of a public github.com repository holding the marketplace. Other host, credentials in the URL, or a non-repository URL is a 400 (`validate_repository`) |
| ref | optional string or null | Branch whose tip to validate, or a full 40-character SHA. Omitted: the branch a synchronization would read |
| archive | binary (form-data) | `.zip` of the marketplace directory (contents at the root, or wrapped in one folder), sent as a file part with a filename; DEFLATE or STORE, at most 32 MB; larger is a 413 (`validate_archive`, `multipart/form-data`) |

### BetaPluginMarketplace object

| Name | Type | Description |
|------|------|-------------|
| type | `"plugin_marketplace"` | Object type |
| id | string | Prefixed `marketplace_` |
| created_at | string | RFC 3339 |
| default_installation_preference | `"auto_install"` / `"available"` / `"not_available"` / `"required"` / null | Null for a member's personal marketplace |
| last_sync_ended_at | string or null | When the most recent sync attempt finished; null for a marketplace not synchronized from a repository |
| last_sync_read_sha | string or null | Commit the last sync attempt that reached the repository read |
| name | string | Fixed for the marketplace's lifetime |
| owner | `{ type: "organization" }` or `{ type: "user", user_id }` | Organization, or the member whose personal marketplace it is |
| source | `"directory"` / `"github"` / `"gitlab"` / `"manual"` / `"public_git"` | `manual`: uploaded; `github` / `gitlab` / `public_git`: synchronized from a Git repository (nothing can be uploaded) |
| sync_status | `"success"` / `"in_progress"` / `"failed_content"` / `"failed_transient"` / `"failed_auth"` / `"failed_limits"` / null | Null until a sync is first attempted, so always for `manual` |

### BetaPluginMarketplaceValidationReport object

| Name | Type | Description |
|------|------|-------------|
| type | `"plugin_marketplace_validation_report"` | Object type |
| valid | boolean | True when marketplace.json is well-formed and no plugin would be skipped; warnings never make it false |
| total_plugin_count | number | Plugins marketplace.json declares; 0 when unreadable |
| commit_sha | string or null | Validated commit |
| ref | string or null | Branch read by name |
| manifest_error / manifest_error_code | string or null | Set when nothing could be validated |
| plugin_errors | array of `{ error, error_code, name }` | Plugins a sync would skip entirely |
| plugin_warnings | array of `{ name, warnings: [{ error_code, message }] }` | Plugins that would sync with some content left out |

## Notes

- Beta, available to Claude Enterprise organizations only. Not available to Claude Platform (Claude Console) organizations or to organizations with HIPAA readiness enabled.
- Marketplaces are created, connected to a repository and deleted in claude.ai, not through this API. The organization's library marketplace (the organization-owned `manual` marketplace that uploads go to when none is named) is created the first time something is put in it and is listed from then on.
- A member's personal marketplace cannot be updated here (403).
- Validation endpoints return a report with `valid: false` for a missing, private, or unreadable source rather than refusing. Plugin sources outside the marketplace are fetched anonymously from GitHub (a private one is reported as not found); sources on any other host are not fetched, and the report notes they will be checked at actual synchronization. Nothing is recorded on the Compliance API activity feed.
- A `default_installation_preference` value this API does not yet name is returned as stored.

## Related

- [plugins.md](./plugins.md)
- [rbac-groups.md](./rbac-groups.md)
