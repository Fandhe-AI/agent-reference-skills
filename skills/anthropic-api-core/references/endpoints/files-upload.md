<!-- source: https://platform.claude.com/docs/en/api/files/upload / last verified: 2026-10-17 -->

# Upload File

Upload a file for later reference in Messages API requests (e.g. as a document or image source, or code execution input).

## Signature / Usage

```
POST /v1/files
```

```bash
curl https://api.anthropic.com/v1/files \
    -H 'Content-Type: multipart/form-data' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -F 'file=@/path/to/file'
```

## Options / Props

### Header parameters

| Name | Type | Description |
|------|------|-------------|
| `anthropic-version` | optional string | The version of the Claude API you want to use |
| `anthropic-workspace-id` | optional string | Selects the Workspace for this request (a Workspace ID, e.g. `wrkspc_011CZkZaBF1tNoB5wlCeusgy`). Only needed for credentials that can act on more than one Workspace; a credential that belongs to a specific Workspace may omit it, and if sent it must match that Workspace |

### Body parameters (form-data)

| Name | Type | Description |
|------|------|-------------|
| `file` | binary | The file to upload (`-F 'file=@/path/to/file'`). Only the final path component of the part's `filename` is kept; an absent or empty `filename` is replaced with `unnamed` plus the extension for the file's stored `mime_type`, when known |
| `expires_in_seconds` | optional number | Seconds from upload until the file expires and its bytes become permanently unavailable. Between 3600 (one hour) and 7776000 (ninety days) |

### Returns — `FileMetadata` object

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique object identifier |
| `created_at` | string | RFC 3339 creation timestamp |
| `filename` | string | Original filename (1-500 chars) |
| `mime_type` | string | MIME type |
| `size_bytes` | number | File size in bytes |
| `type` | `"file"` | Always `"file"` |
| `downloadable` | optional boolean | Whether the file can be downloaded (default `false`) |
| `expires_at` | optional string or null | RFC 3339 time the file expires and becomes unavailable for download; `null` if it does not expire. For files uploaded with `expires_in_seconds`, upload time plus that value |

## Notes

- The Files API is GA: no `anthropic-beta` header is needed. The previous path `api/beta/files/*` with the `files-api-2025-04-14` header is deprecated but still works and keeps returning the beta response shapes (no `expires_at`).
- The `scope` field (`{ id, type: "session" }`) belongs to the beta / Managed Agents shape and is not part of the GA response documented here.

## Related

- [files-list.md](./files-list.md)
- [files-retrieve_metadata.md](./files-retrieve_metadata.md)
- [files-download.md](./files-download.md)
- [files-delete.md](./files-delete.md)
