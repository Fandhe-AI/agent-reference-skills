<!-- source: https://platform.claude.com/docs/en/api/beta/organization/plugins / last verified: 2026-10-17 -->

# Plugins Admin API (Beta)

Create and manage organization-owned Plugins and their versions, set installation settings, and read members' personal Plugins and their shares. Beta header: `ce-plugins-2026-09-01`.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/organizations/plugins` | Create Plugin (and first version, multipart upload) |
| GET | `/v1/organizations/plugins` | List Plugins (newest first) |
| GET | `/v1/organizations/plugins/{plugin_id}` | Get Plugin |
| POST | `/v1/organizations/plugins/{plugin_id}` | Update Plugin (pin served version) |
| DELETE | `/v1/organizations/plugins/{plugin_id}` | Delete Plugin (permanent) |
| POST | `/v1/organizations/plugins/{plugin_id}/versions` | Create Plugin Version (multipart upload) |
| GET | `/v1/organizations/plugins/{plugin_id}/versions` | List Plugin Versions (newest first) |
| GET | `/v1/organizations/plugins/{plugin_id}/versions/{version}` | Get Plugin Version |
| GET | `/v1/organizations/plugins/{plugin_id}/versions/{version}/content` | Download Plugin Version Archive (`application/zip`) |
| GET | `/v1/organizations/plugins/{plugin_id}/installation_settings` | List Plugin Installation Settings |
| POST | `/v1/organizations/plugins/{plugin_id}/installation_settings/{target}` | Set Plugin Installation Setting |
| DELETE | `/v1/organizations/plugins/{plugin_id}/installation_settings/{target}` | Remove Plugin Installation Setting |
| GET | `/v1/organizations/plugins/{plugin_id}/shares` | List Plugin Shares (member-owned Plugins, read-only) |

```bash
curl https://api.anthropic.com/v1/organizations/plugins \
    -H 'Content-Type: multipart/form-data' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: ce-plugins-2026-09-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -F 'files[]=@/path/to/file'
```

## Options / Props

### Header (required for all endpoints)

| Name | Type | Description |
|------|------|-------------|
| anthropic-beta | array containing `"ce-plugins-2026-09-01"` | Required. A request without it returns 404, as if the endpoint did not exist |

### Accepted credentials

| Endpoints | Credential |
|-----------|-----------|
| Create / Update / Delete Plugin; Create Version; Set / Remove Installation Setting | Admin API key with `write:plugins` |
| List / Get Plugin; List / Get Version; Download Archive; List Installation Settings; List Shares | Admin API key with `read:plugins` or `read:org_audit`, or Compliance Access Key with `read:compliance_org_data` |

### Body Parameters (Create Plugin / Create Version, multipart/form-data)

| Name | Type | Description |
|------|------|-------------|
| files | array (sent as `files[]`) | One part per file, the part filename being the path within the Plugin (e.g. `skills/review-pr/SKILL.md`), or a single `.zip` / `.plugin` archive. Must include the manifest `.claude-plugin/plugin.json`. A part named plain `files` is not read. cURL: `-F 'files[]=@SKILL.md;filename=skills/review-pr/SKILL.md'` |
| marketplace_id | optional string (Create Plugin only) | A `manual` organization-owned marketplace (`marketplace_` prefix). Omitted: the organization's library marketplace |
| release_notes | optional string | Stored with the version, up to 5,000 characters |

### Body Parameters (Update Plugin)

| Name | Type | Description |
|------|------|-------------|
| served_version_id | string | `pluginver_` ID to serve and pin to. `latest` is not accepted |

### Body Parameters (Set Installation Setting)

| Name | Type | Description |
|------|------|-------------|
| installation_preference | `"auto_install"` / `"available"` / `"not_available"` / `"required"` | Setting the target is to hold for this Plugin |

### Path Parameters

| Name | Type | Description |
|------|------|-------------|
| plugin_id | string | `plugin_` prefixed ID |
| version | string | `pluginver_` prefixed ID (`latest` is not accepted on Get Version / Download) |
| target | string | Literal `organization`, or an RBAC Group ID (`rbac_group_` prefix) |

### Query Parameters

| Name | Endpoint | Description |
|------|----------|-------------|
| created_at[gt] / [gte] / [lt] / [lte] | List Plugins | RFC 3339 bounds, combinable |
| limit | List Plugins / Installation Settings / Shares | Default 20, 1 to 100 |
| limit | List Versions | Default 20, 1 to 1000 |
| page | all lists | `next_page` token (max 2048 chars) |
| marketplace_id | List Plugins | Only Plugins in this marketplace |
| owner_type | List Plugins | `"organization"` or `"user"` |
| owner_user_id | List Plugins | Member's personal marketplaces (`user_` prefix); a removed member's ID is accepted |
| target_type | List Installation Settings | `"organization"` or `"rbac_group"` |
| target_type | List Shares | `"organization"`, `"organization_member"`, or `"rbac_group"` |
| organization_id | read endpoints | For a `read:org_audit` / `read:compliance_org_data` key created for all of a parent organization's linked organizations: a child organization (UUID or `org_` ID) to read instead. Other keys may pass only their own organization's ID |

### BetaPlugin object

| Name | Type | Description |
|------|------|-------------|
| type | `"plugin"` | Object type |
| id | string | Plugin ID |
| name | string | Lowercase identifier, unique within its marketplace |
| display_name / description / manifest_version | string or null | From the served version's manifest |
| marketplace_id | string | Marketplace the Plugin lives in |
| owner | `{ type: "organization" }` or `{ type: "user", user_id }` | Owner |
| components | array or null | `{ type: "agent" / "cli" / "command" / "hook" / "mcp_server" / "skill", name, description }` of the served version |
| content_scan | object or null | `{ status: "completed" / "errored" / "processing", assessment: "pass" / "warn" / "fail" / "unknown" / null, reason }` |
| reach | `"contained"` / `"privileged"` / `"remote"` / null | `remote`: declares an MCP server or CLI; `privileged`: a hook, monitor, language server or settings but nothing remote; `contained` otherwise |
| latest_version_id | string | Newest version |
| served_version_id | string | Version claude.ai serves to members |
| served_version_pinned | boolean | False while the served version follows each new version |
| organization_installation_preference | `"auto_install"` / `"available"` / `"not_available"` / `"required"` / null | Null for a member-owned Plugin (which has shares) |
| organization_installation_preference_inherited | boolean or null | True while it has no setting of its own and uses its marketplace's default |
| created_by | `{ type: "user_actor", user_id, email_address }` or `{ type: "api_actor", api_key_id }` or null | Creator |
| created_at / updated_at | string | RFC 3339 |

Plugin Version object (`type: "plugin_version"`): `id`, `plugin_id`, `components`, `content_scan`, `created_at`, `created_by`, `description`, `display_name`, `manifest_version`, `reach`, `release_notes`.

Installation setting object (`type: "plugin_installation_setting"`): `plugin_id`, `installation_preference`, `target` (`{ type: "organization" }` / `{ type: "rbac_group", rbac_group_id }`), `created_at`, `updated_at`. Remove returns `{ type: "plugin_installation_setting_deleted", plugin_id, target }`.

Share object (`type: "plugin_share"`): `plugin_id`, `target` (`organization` / `rbac_group` / `organization_member` with `user_id`), `granted_at`.

Delete returns `{ type: "plugin_deleted", id }`.

## Notes

- Beta, available to Claude Enterprise organizations only. Not available to Claude Platform (Claude Console) organizations or to organizations with HIPAA readiness enabled.
- `name`: lowercase letters (any alphabet), digits and hyphens, up to 64 characters. A taken name returns 409 `plugin_name_taken` (with `details.plugin_id` when a Plugin holds it). In the organization's library marketplace, a skill named like an organization skill returns 409 `skill_name_taken` (`details.skill_name`).
- 503 `registration_pending` on create: the Plugin and version were stored (IDs in `details`) but are not yet usable. Do not retry the create (it would return `plugin_name_taken`); create a version on the stored Plugin instead, which completes it.
- Create Version: the uploaded manifest `name` must equal the Plugin's `name`. Only Plugins in a `manual` marketplace take uploads; a Plugin synchronized from a repository gets versions from the repository. It becomes the served version unless the served version has been pinned.
- Update Plugin pins the served version; pinning cannot currently be undone, here or in claude.ai. With content scanning enabled, a version whose scan is running returns 409 `scan_pending`; one whose scan failed, errored or has no verdict returns 400 `scan_failed` (a `warn` is accepted). Member-owned Plugins cannot be updated here (403). Installation settings are not written by this endpoint.
- Delete is permanent (the Plugin and every version), for organization-owned or member-owned Plugins. To take an organization-owned Plugin out of use reversibly, set its organization-wide setting to `not_available` (and remove or change group settings, which override it). Only a Plugin in a `manual` marketplace can be deleted here; a repository-synchronized one returns 400.
- Download Archive: each download of a Plugin from a member's personal marketplace by a read key records a `claude_plugin_archive_accessed` event on the Compliance API activity feed (organization-owned downloads are not recorded). Name saved files from the IDs in the path, since the attachment filename is not unique.
- Installation settings and shares are mutually exclusive: installation-setting paths return 404 for a member-owned Plugin, and the shares path returns 404 for an organization-owned one. Shares are read-only here.
- Writing the `organization` target stops the Plugin inheriting its marketplace's default even when the value equals it; removing it returns the Plugin to that default and leaves group settings in place. Send a Plugin's installation-setting writes (set / remove) one at a time: concurrent writes can get 503 with `x-should-retry: true` and are safe to repeat after a second or two. Removing a setting that is not held returns 404.

## Related

- [plugin-marketplaces.md](./plugin-marketplaces.md)
- [rbac-groups.md](./rbac-groups.md)
