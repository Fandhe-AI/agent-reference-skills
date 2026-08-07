<!-- source: https://platform.claude.com/docs/en/api/compliance/apps/artifacts/retrieve, https://platform.claude.com/docs/en/api/compliance/apps/artifacts/download / last verified: 2026-08-07 -->

# Apps Artifacts Compliance API

Read-only access to claude.ai chat Artifact versions (documents/code generated in a chat) for compliance/DLP purposes.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/compliance/apps/artifacts/{artifact_version_id}` | Get artifact version metadata (no content body) |
| GET | `/v1/compliance/apps/artifacts/{artifact_version_id}/content` | Download the full text content of an artifact version |

```bash
curl https://api.anthropic.com/v1/compliance/apps/artifacts/$ARTIFACT_VERSION_ID \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"

curl https://api.anthropic.com/v1/compliance/apps/artifacts/$ARTIFACT_VERSION_ID/content \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `artifact_version_id` | path, string | Tagged artifact version ID, e.g. `claude_artifact_version_abc123` |
| `x-api-key` | header, string | API key |
| **Returns (metadata)** `id` | string | Artifact ID, e.g. `claude_artifact_abc123` |
| `artifact_type` | string | MIME-like type, e.g. `application/vnd.ant.code` |
| `claude_chat_id` | string | Chat this artifact belongs to |
| `created_at` | string | Version creation timestamp |
| `md5` | string | Lowercase hex MD5 over the UTF-8 encoded content (matches `/content`) |
| `size_bytes` | number | Size in bytes of UTF-8 content |
| `title` | string | Artifact title |
| `version_id` | string | Artifact version ID |

## Notes

- The `/content` endpoint returns raw text, not JSON; use the sibling metadata endpoint to hash/dedupe without downloading every artifact.
- Artifact metadata (`id`, `artifact_type`, `title`, `version_id`) is also embedded in `chat_messages[].artifacts[]` when listing chat messages — see apps-chats.md.

## Related

- [apps-chats.md](./apps-chats.md) — chat messages reference artifacts by `version_id`
