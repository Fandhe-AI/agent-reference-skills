<!-- source: https://platform.claude.com/docs/en/api/beta/files/delete.md / last verified: 2026-08-07 -->

# Delete File

Delete a previously uploaded file.

## Signature / Usage

```
DELETE /v1/files/{file_id}
```

```bash
curl https://api.anthropic.com/v1/files/$FILE_ID \
    -X DELETE \
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

### Returns — `DeletedFile` object

| Name | Type | Description |
|------|------|-------------|
| `id` | string | ID of the deleted file |
| `type` | optional `"file_deleted"` | Always `"file_deleted"` |

## Notes

- Files API is in **beta**; requests require the `files-api-2025-04-14` beta header.

## Related

- [files-upload.md](./files-upload.md)
- [files-retrieve_metadata.md](./files-retrieve_metadata.md)
