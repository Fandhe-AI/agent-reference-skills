# Files

Endpoints for reading Figma file content, nodes, rendered images, image fills, file metadata, and (Enterprise, private OAuth apps) file duplication.

## Signature / Usage

```http
GET /v1/files/:key
X-Figma-Token: <token>
```

## Options / Props

### GET File

`GET /v1/files/:key` — Returns the full document tree for a file.

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | String (path) | File or branch key |
| `version` | String (query) | Specific version ID |
| `ids` | String (query) | Comma-separated node IDs to return |
| `depth` | Number (query) | Depth of document tree traversal |
| `geometry` | String (query) | Set to `paths` to export vector geometry |
| `plugin_data` | String (query) | Comma-separated plugin IDs to include plugin data |
| `branch_data` | Boolean (query) | Include branch metadata for files with branches |

**Scope:** `file_content:read` | **Rate Limit:** Tier 1

---

### GET File Nodes

`GET /v1/files/:key/nodes` — Returns specified nodes within a file.

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | String (path) | File or branch key |
| `ids` | String (query, required) | Comma-separated node IDs |
| `version` | String (query) | Specific version ID |
| `depth` | Number (query) | Tree traversal depth |
| `geometry` | String (query) | Set to `paths` for vector geometry |
| `plugin_data` | String (query) | Plugin IDs to include |

**Scope:** `file_content:read` | **Rate Limit:** Tier 1

---

### GET Image

`GET /v1/images/:key` — Renders nodes as images and returns download URLs.

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | String (path) | File or branch key |
| `ids` | String (query) | Comma-separated node IDs to render |
| `scale` | Number (query) | Export scale (0.01–4) |
| `format` | String (query) | `jpg`, `png`, `svg`, or `pdf` |
| `svg_outline_text` | Boolean (query) | Outline text in SVG exports |
| `svg_include_id` | Boolean (query) | Include node IDs in SVG |
| `svg_simplify_stroke` | Boolean (query) | Simplify inside/outside strokes in SVG |
| `contents_only` | Boolean (query) | Export only cropped node contents |
| `use_absolute_bounds` | Boolean (query) | Use absolute bounds for export |
| `version` | String (query) | Specific version ID |

**Scope:** `file_content:read` | **Rate Limit:** Tier 1  
**Note:** Image URLs expire after 30 days.

---

### GET Image Fills

`GET /v1/files/:key/images` — Returns download URLs for all image fills in a file.

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | String (path) | File or branch key |

**Scope:** `file_content:read` | **Rate Limit:** Tier 2  
**Note:** Image fill URLs expire within 14 days.

---

### GET File Metadata

`GET /v1/files/:key/meta` — Returns lightweight file metadata without document content.

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | String (path) | File or branch key |

**Response fields:** `creator`, `last_touched_by`, `thumbnail_url`, sharing access level  
**Scope:** `file_metadata:read` | **Rate Limit:** Tier 3

### POST duplicate file

`POST /v1/files/:file_key/duplicate` — Duplicates a main file or branch into a folder as a new standalone file. The source file and destination folder must belong to the Enterprise plan associated with the private OAuth app. The authenticated user must be able to export the source file, edit the destination folder, and create files of the source editor type. The copy uses the source file's latest saved checkpoint and may not include recent unsaved changes. Supports Figma Design, FigJam, Figma Slides, Figma Buzz, and Figma Make files.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_key` | String (path) | The key of the main file or branch to duplicate |
| `folder_id` | String (body) | The ID of the folder in which to create the duplicated file |

**Scope:** `file_duplicate:write` | **Rate Limit:** Tier 2. Available only to private OAuth apps associated with an Enterprise plan.

**Return value:** `editor_type` is one of `figma`, `figjam`, `slides`, `buzz`, or `make`; `created_at` is a UTC ISO 8601 timestamp.

```json
{
  "file_key": String,
  "name": String,
  "folder_id": String,
  "editor_type": String,
  "created_at": String
}
```

**Error Codes:** 400 (invalid body, or this file type cannot be duplicated), 401, 403, 404 (source file or destination folder not found, or endpoint not enabled), 429, 500

## Notes

- File keys can be found in the Figma file URL: `figma.com/file/:key/...`
- Branch keys are obtainable via `GET /v1/files/:key?branch_data=true`
- Very large files may return 400 or 500 errors; reduce `depth` or request fewer node IDs
- `POST /v1/files/:file_key/duplicate` was added 2026-10-22.
- Source: https://developers.figma.com/docs/rest-api/file-endpoints/ (duplicate section fetched 2026-11-14)

## Related

- [File Versions](./file-versions.md)
- [Components](./components.md)
- [Variables](./variables.md)
- [Teams](./teams.md)
- [Rate Limits](./rate-limits.md)
