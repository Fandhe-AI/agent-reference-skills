# Files

Endpoints for reading Figma file content, nodes, rendered images, image fills, and file metadata.

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

## Notes

- File keys can be found in the Figma file URL: `figma.com/file/:key/...`
- Branch keys are obtainable via `GET /v1/files/:key?branch_data=true`
- Very large files may return 400 or 500 errors; reduce `depth` or request fewer node IDs

## Related

- [File Versions](./file-versions.md)
- [Components](./components.md)
- [Variables](./variables.md)
- [Rate Limits](./rate-limits.md)
