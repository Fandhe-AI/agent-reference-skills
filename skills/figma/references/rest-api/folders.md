# Folders

Endpoints for listing team folders, subfolders, files within a folder, and lightweight folder metadata.

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

## Notes

- Endpoints requiring the `folders:read` scope cannot be used with public OAuth apps. GET folder metadata (`folder_metadata:read`) is available to all OAuth apps.
- Team IDs cannot be obtained programmatically. Open the team page in the Figma file browser; the ID follows `team` in the URL (e.g. `https://www.figma.com/files/181033233908053158/team/1535685101263221741` -> `1535685101263221741`).
- Use GET folder subfolders to traverse below the top-level folders returned by GET team folders.
- GET folder metadata is the v2 replacement for the project metadata endpoint. `thumbnail_url` may be null if the folder has no files.
- Paths use `/v2/`, unlike the `/v1/` Projects endpoints.
- Source: https://developers.figma.com/docs/rest-api/folders-endpoints/ (fetched 2026-10-17)

## Related

- [Projects](./projects.md)
- [Files](./files.md)
- [Scopes](./scopes.md)
- [Rate Limits](./rate-limits.md)
