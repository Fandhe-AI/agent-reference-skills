<!-- source: https://platform.claude.com/docs/en/api/compliance/apps/chats/list, https://platform.claude.com/docs/en/api/compliance/apps/chats/delete, https://platform.claude.com/docs/en/api/compliance/apps/chats/messages/list, https://platform.claude.com/docs/en/api/compliance/apps/chats/files/retrieve, https://platform.claude.com/docs/en/api/compliance/apps/chats/files/download, https://platform.claude.com/docs/en/api/compliance/apps/chats/files/delete, https://platform.claude.com/docs/en/api/compliance/apps/chats/generated_files/retrieve, https://platform.claude.com/docs/en/api/compliance/apps/chats/generated_files/download / last verified: 2026-08-07 -->

# Apps Chats Compliance API

Compliance Access Key endpoints for claude.ai chats: metadata listing, deletion, message history, and the files/generated-files attached to or produced within a chat.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/compliance/apps/chats` | List chat metadata (org-wide or per-user), sorted chronologically |
| DELETE | `/v1/compliance/apps/chats/{claude_chat_id}` | Permanently delete a chat and all associated messages/files |
| GET | `/v1/compliance/apps/chats/{claude_chat_id}/messages` | Retrieve message history and file/artifact metadata for a chat |
| GET | `/v1/compliance/apps/chats/files/{claude_file_id}` | Get metadata for a user-uploaded file |
| GET | `/v1/compliance/apps/chats/files/{claude_file_id}/content` | Download a user-uploaded file's binary content |
| DELETE | `/v1/compliance/apps/chats/files/{claude_file_id}` | Permanently delete a file |
| GET | `/v1/compliance/apps/chats/generated-files/{claude_gen_file_id}` | Get metadata for an assistant-generated file |
| GET | `/v1/compliance/apps/chats/generated-files/{claude_gen_file_id}/content` | Download an assistant-generated file's binary content |

```bash
curl https://api.anthropic.com/v1/compliance/apps/chats \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `after_id` / `before_id` | query, string | Pagination cursors (`last_id`/`first_id`) |
| `created_at.gt/gte/lt/lte` | query, string (RFC 3339) | Filter by creation time |
| `updated_at.gt/gte/lt/lte` | query, string (RFC 3339) | Filter by update time (org-wide queries require `order_by=updated_at`) |
| `limit` | query, number | Max results (default 100, max 1000) |
| `order_by` | query, `"created_at"` \| `"updated_at"` | Sort key; `updated_at` only for org-wide queries |
| `organization_ids[]` | query, array\<string\> | Filter by org ID/UUID |
| `project_ids[]` | query, array\<string\> | Filter by project ID; requires `user_ids[]`, not supported org-wide |
| `user_ids[]` | query, array\<string\> | Filter to specific users (max 10/request); omit for org-wide query |
| `claude_chat_id` | path, string | Tagged ID, e.g. `claude_chat_abc123` |
| `claude_file_id` | path, string | Tagged ID, e.g. `claude_file_abc123` |
| `claude_gen_file_id` | path, string | Opaque ID, e.g. `claude_gen_file_abc123`, from `chat_messages[].generated_files[].id` |
| `tool_result_max_chars` / `tool_use_input_max_chars` | query (messages), number | Truncation limit per block; pass `-1` to disable |
| `x-api-key` | header, string | API key |
| **Returns (list)** `data[].id` / `name` / `model` / `href` | string | Chat identity and claude.ai deep link |
| `data[].created_at` / `updated_at` / `deleted_at` | string | Timestamps |
| `data[].organization_id` / `organization_uuid` / `project_id` | string | Owning org/project |
| `data[].user` | object `{ id, email_address }` | Creator |
| `has_more` / `first_id` / `last_id` | boolean / string | Pagination (backward pagination only for per-user queries) |
| **Returns (messages)** `chat_messages[]` | array\<object\> | `id`, `role` (`user`/`assistant`), `created_at`, `content[]` (union of `text`/`tool_use`/`tool_result` blocks, each may set `truncated`), `files[]`, `generated_files[]`, `artifacts[]` |
| **Returns (file metadata)** `id` / `filename` / `mime_type` / `size_bytes` / `md5` | string/number | File identity and hash |
| `claude_chat_ids[]` / `message_ids[]` | array\<string\> | Chats/messages referencing this file |
| **Returns (generated-file metadata)** `id` / `claude_chat_id` / `filename` / `mime_type` / `size_bytes` / `md5` | string/number | Generated file identity |
| **Returns (delete)** `id` / `type` | string | `"claude_chat_deleted"` or `"claude_file_deleted"` |

## Notes

- `DELETE` on a chat or file is a **destructive, irreversible operation** — it hard-deletes the chat and all associated messages/files (or the single file).
- `generated-files` uses a hyphen in the path (`generated-files`), unlike other `snake_case` segments.
- Artifacts referenced in `chat_messages[].artifacts[]` are downloaded via the separate apps-artifacts.md endpoints, not this file's endpoints.
- Content endpoints (`/content`) return raw binary/text, not JSON.

## Related

- [apps-artifacts.md](./apps-artifacts.md) — artifact versions referenced by chat messages
- [apps-projects.md](./apps-projects.md) — projects that group chats
