<!-- source: https://platform.claude.com/docs/en/api/beta/files/list.md / last verified: 2026-08-07 -->

# List Files

List files previously uploaded via the Files API.

## Signature / Usage

```
GET /v1/files
```

```bash
curl https://api.anthropic.com/v1/files \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: files-api-2025-04-14' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Options / Props

### Query parameters

| Name | Type | Description |
|------|------|-------------|
| `after_id` | optional string | Cursor: page after this object ID |
| `before_id` | optional string | Cursor: page before this object ID |
| `limit` | optional number | Items per page. Default `20`, range `1`–`1000` |
| `scope_id` | optional string | Filter by scope ID (e.g. a session ID) |

### Header parameters

| Name | Type | Description |
|------|------|-------------|
| `anthropic-beta` | optional array of `AnthropicBeta` | Must include `files-api-2025-04-14`; same beta flag list as [models-list.md](./models-list.md) |

### Returns

| Name | Type | Description |
|------|------|-------------|
| `data` | array of `FileMetadata` | Same shape as [files-upload.md](./files-upload.md) Returns |
| `first_id` | optional string | ID of first file in this page |
| `has_more` | optional boolean | Whether more results are available |
| `last_id` | optional string | ID of last file in this page |

## Notes

- Files API is in **beta**; requests require the `files-api-2025-04-14` beta header.

## Related

- [files-upload.md](./files-upload.md)
- [files-retrieve_metadata.md](./files-retrieve_metadata.md)
