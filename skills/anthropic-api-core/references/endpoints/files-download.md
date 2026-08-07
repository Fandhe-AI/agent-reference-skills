<!-- source: https://platform.claude.com/docs/en/api/beta/files/download.md / last verified: 2026-08-07 -->

# Download File

Download the raw content of a previously uploaded file.

## Signature / Usage

```
GET /v1/files/{file_id}/content
```

```bash
curl https://api.anthropic.com/v1/files/$FILE_ID/content \
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

## Notes

- Response body is the raw file bytes (not JSON) with the original `mime_type` as `Content-Type`; not every file is `downloadable` (see [files-retrieve_metadata.md](./files-retrieve_metadata.md)).
- Files API is in **beta**; requests require the `files-api-2025-04-14` beta header.

## Related

- [files-retrieve_metadata.md](./files-retrieve_metadata.md)
- [files-upload.md](./files-upload.md)
