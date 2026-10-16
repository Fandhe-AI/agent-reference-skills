<!-- source: https://platform.claude.com/docs/en/api/files/retrieve_metadata / last verified: 2026-10-17 -->

# Get File Metadata

Retrieve metadata for a previously uploaded file.

## Signature / Usage

```
GET /v1/files/{file_id}
```

```bash
curl https://api.anthropic.com/v1/files/$FILE_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

### Path parameters

| Name | Type | Description |
|------|------|-------------|
| `file_id` | string | ID of the File |

### Header parameters

| Name | Type | Description |
|------|------|-------------|
| `anthropic-version` | optional string | The version of the Claude API you want to use |
| `anthropic-workspace-id` | optional string | Selects the Workspace for this request; only needed for credentials that can act on more than one Workspace |

### Returns

Returns a `FileMetadata` object — same shape as [files-upload.md](./files-upload.md) Returns, including `expires_at` (RFC 3339, or null if the file does not expire).

## Notes

- The Files API is GA: no `anthropic-beta` header is needed. The previous path `api/beta/files/*` with the `files-api-2025-04-14` header is deprecated but still works and keeps the beta shapes (no `expires_at`).
- Metadata of an expired file stays readable for up to 30 days, with `expires_at` in the past.

## Related

- [files-upload.md](./files-upload.md)
- [files-download.md](./files-download.md)
- [files-delete.md](./files-delete.md)
