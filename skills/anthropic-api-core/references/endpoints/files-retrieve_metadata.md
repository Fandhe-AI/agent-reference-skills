<!-- source: https://platform.claude.com/docs/en/api/beta/files/retrieve_metadata.md / last verified: 2026-08-07 -->

# Get File Metadata

Retrieve metadata for a previously uploaded file.

## Signature / Usage

```
GET /v1/files/{file_id}
```

```bash
curl https://api.anthropic.com/v1/files/$FILE_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: files-api-2025-04-14' \
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
| `anthropic-beta` | optional array of `AnthropicBeta` | Must include `files-api-2025-04-14`; same beta flag list as [models-list.md](./models-list.md) |

### Returns

Returns a `FileMetadata` object — same shape as [files-upload.md](./files-upload.md) Returns.

## Notes

- Files API is in **beta**; requests require the `files-api-2025-04-14` beta header.

## Related

- [files-upload.md](./files-upload.md)
- [files-download.md](./files-download.md)
- [files-delete.md](./files-delete.md)
