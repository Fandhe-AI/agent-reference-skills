<!-- source: https://platform.claude.com/docs/en/api/files/download / last verified: 2026-10-17 -->

# Download File

Download the raw content of a previously uploaded file.

## Signature / Usage

```
GET /v1/files/{file_id}/content
```

```bash
curl https://api.anthropic.com/v1/files/$FILE_ID/content \
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

## Notes

- Response body is the raw file bytes (not JSON) with the original `mime_type` as `Content-Type`; not every file is `downloadable` (see [files-retrieve_metadata.md](./files-retrieve_metadata.md)).
- The Files API is GA: no `anthropic-beta` header is needed. The previous path `api/beta/files/*` with the `files-api-2025-04-14` header is deprecated but still works.

## Related

- [files-retrieve_metadata.md](./files-retrieve_metadata.md)
- [files-upload.md](./files-upload.md)
