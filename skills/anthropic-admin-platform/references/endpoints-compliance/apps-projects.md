<!-- source: https://platform.claude.com/docs/en/api/compliance/apps/projects/list, https://platform.claude.com/docs/en/api/compliance/apps/projects/retrieve, https://platform.claude.com/docs/en/api/compliance/apps/projects/delete, https://platform.claude.com/docs/en/api/compliance/apps/projects/attachments/list, https://platform.claude.com/docs/en/api/compliance/apps/projects/collaborators/list, https://platform.claude.com/docs/en/api/compliance/apps/projects/documents/retrieve, https://platform.claude.com/docs/en/api/compliance/apps/projects/documents/metadata, https://platform.claude.com/docs/en/api/compliance/apps/projects/documents/delete / last verified: 2026-08-07 -->

# Apps Projects Compliance API

Compliance Access Key endpoints for claude.ai Projects: metadata listing/retrieval/deletion, attached files/documents, project collaborators (RBAC role assignments), and project document content.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/compliance/apps/projects` | List project metadata, sorted by `created_at` ascending |
| GET | `/v1/compliance/apps/projects/{project_id}` | Get detailed project info |
| DELETE | `/v1/compliance/apps/projects/{project_id}` | Hard-delete a project and all its data (documents, roles, knowledge base, sync sources) |
| GET | `/v1/compliance/apps/projects/{project_id}/attachments` | List files and project documents attached to a project |
| GET | `/v1/compliance/apps/projects/{project_id}/collaborators` | List users/groups/org-wide role assignments on a project |
| GET | `/v1/compliance/apps/projects/documents/{document_id}` | Get project document text content |
| GET | `/v1/compliance/apps/projects/documents/{document_id}/metadata` | Get project document metadata (no content body) |
| DELETE | `/v1/compliance/apps/projects/documents/{document_id}` | Hard-delete a project document |

```bash
curl https://api.anthropic.com/v1/compliance/apps/projects \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `created_at.gt/gte/lt/lte` / `updated_at.gt/gte/lt/lte` | query, string (RFC 3339) | Time filters (list only) |
| `limit` | query, number | Max results (projects/attachments/collaborators: default 20, max 100) |
| `organization_ids[]` / `user_ids[]` | query, array\<string\> | Filter projects by org/creator |
| `page` | query, string | Opaque pagination token from `next_page` |
| `project_id` | path, string | Tagged ID, e.g. `claude_proj_abc123` |
| `document_id` | path, string | Tagged ID, e.g. `claude_proj_doc_abc123` |
| `x-api-key` | header, string | API key |
| **Returns (list)** `data[].id` / `name` / `is_private` | string/boolean | Project identity and visibility |
| `data[].created_at` / `updated_at` / `deleted_at` | string | Timestamps |
| `data[].organization_id` / `organization_uuid` / `user` | string/object | Owning org and creator (`{ id, email_address }`) |
| **Returns (retrieve)** adds `attachments_count` / `chats_count` / `description` / `instructions` | number/string | Extra detail fields beyond the list view |
| **Returns (attachments)** `data[]` | union | `ComplianceProjectFileReference` (`type: "project_file"`: `id`, `filename`, `mime_type`, `size_bytes`, `md5`) or `ComplianceProjectDocReference` (`type: "project_doc"`: `id`, `filename`, `mime_type: "text/plain"`) |
| **Returns (collaborators)** `data[]` | union on `type` | `user` (`user_id`), `group` (`group_id`), `organization` (`organization_uuid`), `organization_role` (`organization_role`) — each carries `granted_at` and `role` (`admin`\|`editor`\|`owner`\|`viewer`) |
| **Returns (document)** `id` / `content` / `filename` / `created_at` / `user` | string | Document text and identity |
| **Returns (document metadata)** `id` / `claude_project_id` / `filename` / `md5` / `size_bytes` / `mime_type: "text/plain"` | string/number | Hash/size without content |
| `has_more` / `next_page` | boolean / string | Pagination (page-token style, not cursor style) |
| **Returns (delete)** `id` / `type` | string | `"claude_project_deleted"` or `"claude_project_document_deleted"` |

## Notes

- `DELETE /apps/projects/{project_id}` is a **destructive, irreversible operation**; it returns **409** if the project still has attached chats — delete chats first via apps-chats.md.
- `DELETE /apps/projects/documents/{document_id}` is a **destructive, irreversible operation**.
- Project file attachments are downloaded via `GET /v1/compliance/apps/chats/files/{claude_file_id}/content` (see apps-chats.md), not an endpoint in this file.
- This resource uses `page`/`next_page` token-style pagination, unlike apps-chats.md's `after_id`/`before_id` cursor style.

## Related

- [apps-chats.md](./apps-chats.md) — chats belonging to a project, and file content download
- [organizations.md](./organizations.md) — `organization_ids` filter and role names referenced by collaborators
