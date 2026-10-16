<!-- source: https://platform.claude.com/docs/en/api/files/delete / last verified: 2026-10-17 -->

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

### Returns — `DeletedFile` object

| Name | Type | Description |
|------|------|-------------|
| `id` | string | ID of the deleted file |
| `type` | optional `"file_deleted"` | Always `"file_deleted"` |

## Notes

- The Files API is GA: no `anthropic-beta` header is needed. The previous path `api/beta/files/*` with the `files-api-2025-04-14` header is deprecated but still works.

## Related

- [files-upload.md](./files-upload.md)
- [files-retrieve_metadata.md](./files-retrieve_metadata.md)
