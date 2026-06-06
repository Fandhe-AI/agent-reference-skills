# Projects

Endpoints for listing team projects, files within a project, and lightweight project metadata.

## Signature / Usage

```http
GET /v1/teams/:team_id/projects
X-Figma-Token: <token>
```

## Options / Props

### GET Team Projects

`GET /v1/teams/:team_id/projects` — Lists all projects in a team visible to the authenticated user.

| Parameter | Type | Description |
|-----------|------|-------------|
| `team_id` | String (path) | ID of the team |

**Scope:** `projects:read` | **Rate Limit:** Tier 2

**Error Codes:** 400 (request error), 403 (invalid/expired token)

---

### GET Project Files

`GET /v1/projects/:project_id/files` — Lists all files in a project.

| Parameter | Type | Description |
|-----------|------|-------------|
| `project_id` | String (path) | ID of the project |
| `branch_data` | Boolean (query) | Include branch metadata for files with branches (default: `false`) |

**Scope:** `projects:read` | **Rate Limit:** Tier 2

**Error Codes:** 400 (request error), 403 (invalid/expired token)

---

### GET Project Metadata

`GET /v1/projects/:project_id/meta` — Returns lightweight project metadata without file content.

| Parameter | Type | Description |
|-----------|------|-------------|
| `project_id` | String (path) | Unique project identifier (from Figma project URL) |

**Response fields:** `id`, `name`, `thumbnail_url`, `file_count`, `updated_at`, `created_at`  
**Scope:** `project_metadata:read` or `projects:read` | **Rate Limit:** Tier 3

**Error Codes:** 403 (invalid token or missing scope), 404 (project not found), 429 (rate limited)

## Notes

- A `Project` object has: `id` (Number), `name` (String)
- Project IDs can be found in Figma project URLs

## Related

- [Files](./files.md)
- [Rate Limits](./rate-limits.md)
