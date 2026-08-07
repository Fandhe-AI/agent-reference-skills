<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-content-data / last verified: 2026-08-07 -->

# Retrieve and delete chats, files, and projects

Access claude.ai chat content, file attachments, projects, project attachments, and remote Cowork session transcripts through the Compliance API. Available only to Claude Enterprise organizations. Required scope: `read:compliance_user_data` (delete endpoints also require `delete:compliance_user_data`); Compliance Access Key only, not Admin API keys.

## Signature / Usage

```bash
# List chats organization-wide, sorted by update time
curl --fail-with-body -sS -G \
  "https://api.anthropic.com/v1/compliance/apps/chats" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY" \
  --data-urlencode "order_by=updated_at" \
  --data-urlencode "updated_at.gte=2025-06-01T00:00:00Z"

# Get one chat's messages, files, generated files, artifacts
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/apps/chats/$chat_id/messages" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Options / Props

| You have | You want | Endpoint |
| --- | --- | --- |
| `claude_file_*` ID | Binary content / metadata | Download file content / Get file metadata |
| `claude_gen_file_*` ID | Tool-generated file content / metadata | Download generated file / Get generated-file metadata |
| `claude_artifact_version_*` ID | Artifact version text / metadata | Download artifact content / Get artifact metadata |
| `claude_proj_doc_*` ID | Project document text / metadata | Get project document content / metadata |

## Notes

- Chat list (organization-wide) defaults to `order_by=created_at`; `order_by=updated_at` recommended for keeping an export current. User-filtered queries (`user_ids[]`, 1-10 values) always sort by `created_at` and support `before_id`; `project_ids[]` filter is only available in user-filtered form.
- Soft-deleted (from claude.ai) chats remain visible with `deleted_at` populated; hard-deleted (via Compliance API or retention expiry) chats are not retrievable.
- Project attachments are one of two types: `project_file` (binary, `claude_file_*`) or `project_doc` (plain text, `claude_proj_doc_*`); branch on the `type` discriminator.
- Remote session endpoints (`GET /v1/compliance/apps/sessions/remote`, `.../messages`) are in beta; transcripts include user prompts, assistant responses, tool calls/results but not thinking blocks or images. Sessions retained 6 years.
- Delete endpoints (chat, file, project document, project) are permanent and immediate with no recovery window. A project cannot be deleted while chats remain attached (409 Conflict); detach or delete them first.

## Related

- [compliance-activity-feed.md](./compliance-activity-feed.md)
- [compliance-org-data.md](./compliance-org-data.md)
- [compliance-errors.md](./compliance-errors.md)
