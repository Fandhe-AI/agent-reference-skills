<!-- source: https://platform.claude.com/docs/en/manage-claude/plugins-api / last verified: 2026-10-17 -->

# Plugins API (Claude Enterprise plugin inventory, beta)

Inventory and manage the plugins in your Claude Enterprise organization: upload plugins and versions, choose the version members are served, control who can use each plugin, download plugin files for review, and validate a marketplace before you connect it.

## Signature / Usage

```bash
curl "https://api.anthropic.com/v1/organizations/plugins?owner_type=organization&limit=20" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: ce-plugins-2026-09-01"
```

CLI equivalent: `ant beta:organization:plugins list --owner-type organization --limit 20`. SDKs expose the endpoints under `client.beta.organization` (Python / TypeScript) and send the beta headers for you.

## Options / Props

Endpoints (18, five resources). Every request needs `x-api-key`, `anthropic-version: 2023-06-01`, `anthropic-beta: ce-plugins-2026-09-01`.

| Resource | Method / Path | Purpose |
|----------|---------------|---------|
| Plugins | `GET /v1/organizations/plugins` | List plugins (filters: `owner_type`, `owner_user_id`, `marketplace_id`, `created_at[gte\|gt\|lte\|lt]`) |
| Plugins | `POST /v1/organizations/plugins` | Create an organization-owned plugin + first version (`multipart/form-data`: `files[]`, optional `marketplace_id`, `release_notes`) |
| Plugins | `GET /v1/organizations/plugins/{plugin_id}` | Get one plugin |
| Plugins | `POST /v1/organizations/plugins/{plugin_id}` | Change the served version (only field: `served_version_id`, required; pins the plugin) |
| Plugins | `DELETE /v1/organizations/plugins/{plugin_id}` | Permanently delete a plugin and all versions (`manual` marketplaces only) |
| Plugin versions | `GET /v1/organizations/plugins/{plugin_id}/versions` | List versions (`limit` 1-1,000) |
| Plugin versions | `POST /v1/organizations/plugins/{plugin_id}/versions` | Upload a new version (manifest `name` must equal the plugin's `name`) |
| Plugin versions | `GET /v1/organizations/plugins/{plugin_id}/versions/{version}` | Get a version (`{version}` = version ID or `latest`) |
| Plugin versions | `GET /v1/organizations/plugins/{plugin_id}/versions/{version}/content` | Download the stored `.zip` (`{version}` must be an ID, not `latest`) |
| Installation settings | `GET /v1/organizations/plugins/{plugin_id}/installation_settings` | List settings (filter `target_type`: `organization` / `rbac_group`) |
| Installation settings | `POST /v1/organizations/plugins/{plugin_id}/installation_settings/{target}` | Set a target's setting (body: `installation_preference`) |
| Installation settings | `DELETE /v1/organizations/plugins/{plugin_id}/installation_settings/{target}` | Remove a target's setting |
| Shares | `GET /v1/organizations/plugins/{plugin_id}/shares` | List shares of a member-owned plugin (read-only) |
| Plugin marketplaces | `GET /v1/organizations/plugin_marketplaces` | List marketplaces (filters: `owner_type`, `source`; `limit` 1-1,000) |
| Plugin marketplaces | `GET /v1/organizations/plugin_marketplaces/{marketplace_id}` | Get a marketplace |
| Plugin marketplaces | `POST /v1/organizations/plugin_marketplaces/{marketplace_id}` | Set default installation setting (`default_installation_preference`, required) |
| Plugin marketplaces | `POST /v1/organizations/plugin_marketplaces/validate_repository` | Validate a public GitHub repo (JSON: `repository_url`, optional `ref`) |
| Plugin marketplaces | `POST /v1/organizations/plugin_marketplaces/validate_archive` | Validate an uploaded `.zip` (`multipart/form-data`, one `archive` part, max 32 MB) |

Scopes:

| Scope | Grants |
|-------|--------|
| `read:plugins` | Every `GET` endpoint (including archive downloads) plus marketplace validation |
| `write:plugins` | Every `POST` / `DELETE` endpoint plus marketplace validation; no reads |
| `read:org_audit` | Every `GET` endpoint plus user-management / Compliance API reads; no validation, no writes |
| `read:compliance_org_data` | Every `GET` endpoint, as `read:org_audit`; no validation, no writes |

Installation setting values (`installation_preference`, `organization_installation_preference`, `default_installation_preference`):

| Value | Members see |
|-------|-------------|
| `required` | Installed and cannot be removed |
| `auto_install` | Installed and can be removed |
| `available` | Can be installed on request |
| `not_available` | Hidden |

Plugin object fields: `id` (`plugin_`), `name`, `display_name`, `description`, `served_version_id` / `latest_version_id` (`pluginver_`), `served_version_pinned`, `manifest_version`, `owner` (`{"type": "organization"}` or `{"type": "user", "user_id"}`), `marketplace_id` (`marketplace_`), `created_by`, `organization_installation_preference`, `organization_installation_preference_inherited`, `content_scan` (`status`: `processing` / `completed` / `errored`; `assessment`: `pass` / `warn` / `fail` / `unknown`; `reason`), `components` (`type`: `skill` / `mcp_server` / `command` / `agent` / `hook` / `cli`), `reach`, `created_at`, `updated_at`. `display_name`, `description`, `manifest_version`, `content_scan`, `components`, `reach` describe the served version.

`reach` values: `remote` (declares an MCP server or CLI), `privileged` (no MCP server / CLI, but hook, monitor, LSP server, app settings, or `allowed-tools` frontmatter), `contained` (none of those). `null` means unclassified.

Marketplace object fields: `id`, `name`, `owner`, `source` (`manual` / `github` / `gitlab` / `public_git`), `sync_status` (`success` / `in_progress` / `failed_content` / `failed_transient` / `failed_auth` / `failed_limits`), `last_sync_ended_at`, `last_sync_read_sha`, `default_installation_preference`, `created_at`.

Upload requirements (same as claude.ai): one `.zip` / `.plugin` archive or individual files; exactly one `.claude-plugin/plugin.json` declaring `name` (lowercase letters / digits / hyphens, up to 64 chars); `displayName` up to 64, `description` up to 500; request body and uncompressed archive each at most 200 MB; at most 5,000 files, path depth 12; no top-level `bin/`; no nested `.zip`; ZIP must be DEFLATE or STORE, not encrypted, no symlinks; marketplace holds at most 500 items.

Limits: reads 300 req/min per organization; writes 60 req/min; marketplace validation counts as a read and is additionally limited to 10/min across both validate endpoints (may take up to 120 seconds). `limit` defaults to 20; maximum 100 for plugins / installation settings / shares, 1,000 for versions / marketplaces.

## Notes

- Beta, Claude Enterprise organizations only; not available to Claude Platform (Claude Console) organizations or organizations with HIPAA readiness enabled. Requests without `anthropic-beta: ce-plugins-2026-09-01` return `404`.
- Requires a scoped Admin API key (see the admin-api-keys page); `read:plugins` / `write:plugins` keys act only on the organization they were created in. `read:org_audit` / `read:compliance_org_data` keys created for all linked organizations can pass `organization_id` on `GET` endpoints to read another organization under the same parent; writes do not accept it.
- Standalone skills and Anthropic-published plugins are not inventoried. Marketplaces are created, connected, and deleted in claude.ai only. Plugin usage reporting belongs to the Analytics APIs, not this API.
- This is the Claude Enterprise plugin inventory (Admin API). It is distinct from Claude Code plugins authored and installed on the Claude Code side (`anthropic-claude-code-extend`) and from Agent Skills via the Skills API (`anthropic-api-tools-mcp`).
- Versions are immutable. By default the served version follows the newest one; `POST /v1/organizations/plugins/{plugin_id}` pins it (`served_version_pinned: true`), and a pinned plugin cannot currently be unpinned, here or in claude.ai. To roll back, set `served_version_id` to an earlier version.
- Content scanning: while on, members are served a plugin only when its served version's scan is `completed` with `pass` or `warn`. Changing the served version to one still scanning returns `409 scan_pending`; to a failed one, `400 scan_failed`. A version uploaded through this API never waits for its scan, so pin first if members should keep the current version.
- Organization-owned plugins in a Git-synchronized marketplace (`github` / `gitlab` / `public_git`) cannot receive uploads or be deleted via this API. Member-owned plugins: uploading versions and changing the served version return `403`; delete is allowed in `manual` marketplaces.
- Installation setting resolution: a plugin's own organization-wide setting, else its marketplace default, else `not_available`. A group's setting replaces (does not add to) the organization-wide value for its members; members in several groups get the most permissive. Setting the `organization` target stops inheritance of the marketplace default; removing it restores it. `{target}` is `organization` or an `rbac_group_` ID. Send installation-setting writes for one plugin one at a time (concurrent writes can return `503` with `x-should-retry: true`).
- No `Idempotency-Key`. Retrying a lost create returns `409 plugin_name_taken` with `details.plugin_id`; retrying a lost version create stores a second identical version (compare `latest_version_id` first). `503 registration_pending` means files were stored but skills were not yet registered: re-upload the same files as a version.
- Error codes in `error.details.error_code`: `plugin_name_taken` (409), `skill_name_taken` (409), `registration_pending` (503), `scan_pending` (409), `scan_failed` (400), `cmek_key_disabled` / `cmek_key_network_blocked` (400). Statuses: 400, 401, 403, 404, 409, 413 (200 MB upload / 32 MB validation), 429 (honor `retry-after`), 500, 503.
- With customer-managed encryption keys unavailable, reads succeed with `description` / `release_notes` / `components` as `null`; archive downloads, creates, version creates, and served-version changes return `400`.
- Writes are recorded on the Compliance API Activity Feed as `api_actor` events (`claude_plugin_created`, `claude_plugin_version_created`, `claude_plugin_updated`, `claude_plugin_served_version_updated`, `claude_plugin_deleted`, `plugin_installation_preference_updated`, `marketplace_updated`, ...). Downloading a member-owned plugin's archive emits `claude_plugin_archive_accessed`; org-owned downloads are not recorded. Deletions emit no list-visible event, so re-list periodically.
- All string enums (component types, `reach`, scan fields, marketplace `source`, error codes) may gain values; treat unknown values as unknown strings.

## Related

- [admin-api-keys](./admin-api-keys.md)
- [user-management](./user-management.md)
- [analytics-api](./analytics-api.md)
