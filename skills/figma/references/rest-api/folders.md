# Folders

Endpoints for listing team folders, subfolders, files within a folder, lightweight folder metadata, and (Enterprise, private OAuth apps) creating a top-level team folder.

## Signature / Usage

```http
GET /v2/teams/:team_id/folders
X-Figma-Token: <token>
```

## Options / Props

### GET team folders

`GET /v2/teams/:team_id/folders` — Lists the top-level folders within the specified team. Returns only folders visible to the authenticated user or owner of the token, accounting for direct roles, inherited access, sharing audience controls, and user groups. Each returned folder has a null `parent_folder_id`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `team_id` | String (path) | ID of the team to list folders from |

**Scope:** `folders:read` | **Rate Limit:** Tier 2

**Error Codes:** 400 (request error; see `message`), 403 (token invalid/expired or no access to the team), 404 (team not found)

---

### GET folder subfolders

`GET /v2/folders/:folder_id/folders` — Lists direct subfolders of a folder (folders whose `parent_folder_id` equals the requested folder's ID). Returns only folders visible to the authenticated user or owner of the token.

| Parameter | Type | Description |
|-----------|------|-------------|
| `folder_id` | String (path) | ID of the parent folder to list subfolders from |

**Scope:** `folders:read` | **Rate Limit:** Tier 2

**Error Codes:** 400, 403 (token invalid/expired or no access to the folder), 404 (folder not found)

---

### GET folder files

`GET /v2/folders/:folder_id/files` — Lists the files directly within a folder. Returns only files visible to the authenticated user or owner of the token.

| Parameter | Type | Description |
|-----------|------|-------------|
| `folder_id` | String (path) | ID of the folder to list files from |
| `branch_data` | Boolean (query) | Returns branch metadata for each main file with a branch inside the folder (default: `false`) |

**Scope:** `folders:read` | **Rate Limit:** Tier 2

**Error Codes:** 400, 403, 404

---

### GET folder metadata

`GET /v2/folders/:folder_id/meta` — Returns basic metadata about a folder (name, thumbnail, file count, timestamps) without enumerating its files. Suited to lightweight previews such as link unfurling or search results.

| Parameter | Type | Description |
|-----------|------|-------------|
| `folder_id` | String (path) | ID of the folder to get metadata for |

**Return value:**

```json
{
  "id": String,
  "name": String,
  "thumbnail_url": String,
  "file_count": Number,
  "updated_at": String,
  "created_at": String
}
```

**Scope:** `folder_metadata:read` | **Rate Limit:** Tier 3

**Error Codes:** 403, 404, 429 (rate-limited)

---

### POST team folder

`POST /v1/teams/:team_id/folders` — Creates a top-level folder in a team. The team must belong to the Enterprise plan associated with the private OAuth app, and the authenticated user must be allowed to create a folder in the team.

| Parameter | Type | Description |
|-----------|------|-------------|
| `team_id` | String (path) | The ID of the team in which to create the folder |
| `name` | String (body) | The name of the folder |
| `sharing_audience_control` | String (body) | The audience that can access the folder: `plan_view`, `plan_edit`, `invite_only`, `workspace_view`, or `workspace_edit`. Workspace audiences require the specified team to belong to a workspace |

**Scope:** `folders:write` | **Rate Limit:** Tier 2. Available only to private OAuth apps associated with an Enterprise plan.

**Return value:** the created Folder, including `sharing_audience_control` and `created_at`.

**Error Codes:** 400, 401, 403 (no permission to create the folder), 404, 429, 500

### Folder type

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | The ID of the folder |
| `name` | String | The name of the folder |
| `parent_folder_id` | String | The ID of the parent folder, or null for a top-level folder in the team |
| `sharing_audience_control` | String | `plan_view`, `plan_edit`, `invite_only`, `workspace_view`, or `workspace_edit` |
| `created_at` | String | The UTC ISO 8601 timestamp at which the folder was created |

## Notes

- Endpoints requiring the `folders:read` scope cannot be used with public OAuth apps. GET folder metadata (`folder_metadata:read`) is available to all OAuth apps.
- Team IDs cannot be obtained programmatically. Open the team page in the Figma file browser; the ID follows `team` in the URL (e.g. `https://www.figma.com/files/181033233908053158/team/1535685101263221741` -> `1535685101263221741`).
- Use GET folder subfolders to traverse below the top-level folders returned by GET team folders.
- GET folder metadata is the v2 replacement for the project metadata endpoint. `thumbnail_url` may be null if the folder has no files.
- Paths use `/v2/`, unlike the `/v1/` Projects endpoints.
- `POST /v1/teams/:team_id/folders` uses `/v1/` and was added 2026-10-22; the list/metadata endpoints above use `/v2/`.
- Source: https://developers.figma.com/docs/rest-api/folders-endpoints/ (fetched 2026-11-14)
- Source: https://developers.figma.com/docs/rest-api/folders-types/ (fetched 2026-11-14)

## Related

- [Projects](./projects.md)
- [Teams](./teams.md)
- [Files](./files.md)
- [Scopes](./scopes.md)
- [Rate Limits](./rate-limits.md)
