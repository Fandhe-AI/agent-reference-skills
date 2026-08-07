<!-- source: https://platform.claude.com/docs/en/api/beta/files/upload.md / last verified: 2026-08-07 -->

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
    -H 'anthropic-beta: files-api-2025-04-14' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -F 'file=@/path/to/file'
```

## Options / Props

### Header parameters

| Name | Type | Description |
|------|------|-------------|
| `anthropic-beta` | optional array of `AnthropicBeta` | Must include `files-api-2025-04-14` to use the Files API; same beta flag list as [models-list.md](./models-list.md) |

### Body parameters

| Name | Type | Description |
|------|------|-------------|
| `file` | multipart form field | The file to upload (`-F 'file=@/path/to/file'`) |

### Returns — `FileMetadata` object

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique object identifier |
| `created_at` | string | RFC 3339 creation timestamp |
| `filename` | string | Original filename |
| `mime_type` | string | MIME type |
| `size_bytes` | number | File size in bytes |
| `type` | `"file"` | Always `"file"` |
| `downloadable` | optional boolean | Whether the file can be downloaded |
| `scope` | optional `BetaFileScope` | `{ id, type: "session" }` — context (e.g. session) the file was created in |

## Notes

- Files API is in **beta**; requests require the `files-api-2025-04-14` beta header (`anthropic-beta`).

## Related

- [files-list.md](./files-list.md)
- [files-retrieve_metadata.md](./files-retrieve_metadata.md)
- [files-download.md](./files-download.md)
- [files-delete.md](./files-delete.md)
