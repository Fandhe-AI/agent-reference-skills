<!-- source: https://platform.claude.com/docs/en/api/compliance/apps/code/artifacts/list, https://platform.claude.com/docs/en/api/compliance/apps/code/artifacts/retrieve_version, https://platform.claude.com/docs/en/api/compliance/apps/code/artifacts/download, https://platform.claude.com/docs/en/api/compliance/apps/code/artifacts/delete / last verified: 2026-10-16 -->

# Code Artifacts Compliance API

Compliance access to Claude Code Artifacts (persistent, potentially publicly-shared code/app artifacts distinct from chat Artifacts) owned by organizations under the parent organization.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/compliance/apps/code/artifacts` | List Code Artifacts, sorted by identifier (not creation time) |
| GET | `/v1/compliance/apps/code/artifacts/{artifact_id}/versions/{version_id}` | Stream one version's content as the response body |
| GET | `/v1/compliance/apps/code/artifacts/{artifact_id}/content` | Download: stream the Artifact's current content as the response body (latest version; for a Claude Doc, a ZIP of Word files, one per text tab) |
| DELETE | `/v1/compliance/apps/code/artifacts/{artifact_id}` | Permanently delete a Code Artifact and all its versions |

```bash
curl https://api.anthropic.com/v1/compliance/apps/code/artifacts \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `limit` | query, number | Max results (default 20, max 100) |
| `organization_ids[]` | query, array\<string\> | Filter by org ID/UUID (up to 500) |
| `user_ids[]` | query, array\<string\> | Filter by owner user ID (up to 200) |
| `updated_at.gt` / `gte` / `lt` / `lte` | query, string (RFC 3339) | Filter by update time; matches an **eventually-consistent index** — omit for compliance-complete enumeration, use overlap margin + dedupe by `id` for incremental export |
| `page` | query, string | Opaque pagination token from `next_page` |
| `artifact_id` | path, string | Tagged ID, e.g. `cart_abc123` |
| `version_id` | path, string | Opaque version identifier from the Artifact's `versions[]` list |
| `multi_file_format` | query, string (Download) | `zip` (its only value). Required to download a Claude Doc; for other Artifacts, a latest version with more than one file comes back as a ZIP with an index `files.json` |
| `x-api-key` | header, string | API key |
| **Returns (list)** `data[].id` | string | Artifact ID |
| `data[].organization_uuid` | string | Owning organization |
| `data[].owner_user_id` | string | Owner's user ID (always set, survives account deletion) |
| `data[].published_version_id` | string | Version a non-owner viewer would render |
| `data[].read_mode` | `"org"` \| `"owner"` \| `"public"` \| `"users"` | Who can view the artifact |
| `data[].versions[]` | array\<object\> | Up to ~20 most recent versions: `id`, `created_at`, `name` (metadata only) |
| `has_more` / `next_page` | boolean / string | Pagination |
| **Returns (delete)** `id` / `type` | string | `"code_artifact_deleted"` |

## Notes

- Path uses `/v1/compliance/apps/code/artifacts`; the docs URL slug is now `/api/compliance/apps/code/artifacts/...` (previously `/api/compliance/code/artifacts`).
- Download returns 404 for missing or unreadable Artifacts, 400 with `error.details.error_code` `cmek_key_disabled` when the organization's customer-managed key can't be used, and 503 when content can't be produced now (wait `Retry-After` seconds, or back off). For a Claude Doc, 422 `error_code` is `multi_file_unavailable` (no `multi_file_format=zip`), `document_unavailable` (no text to export), `document_too_large` (export over 16 MiB) or `cmek_org_unsupported`.
- Pages may be short or empty while `next_page` is still set — continue until `next_page` is absent.
- Version retrieval can 404 if the version was rotated out of retained history (re-list), or 503 while content upload is still in flight (retry with backoff).
- Delete is a destructive, irreversible operation; a 200 means deletion is initiated, content removal completes asynchronously. Repeated delete on an already-deleted artifact returns 404.

## Related

- [apps-artifacts.md](./apps-artifacts.md) — chat Artifacts (distinct resource from Code Artifacts)
