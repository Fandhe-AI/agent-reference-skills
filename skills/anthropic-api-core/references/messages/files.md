<!-- source: https://platform.claude.com/docs/en/build-with-claude/files / last verified: 2026-08-07 -->

# Files API

Upload files once, reference them by `file_id` in Messages requests, and download outputs created by skills or the code execution tool.

## Signature / Usage

```python
# Upload
uploaded = client.files.upload(
    file=("document.pdf", open("/path/to/document.pdf", "rb"), "application/pdf"),
)
file_id = uploaded.id

# Reference in a message
response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Please summarize this document for me."},
            {"type": "document", "source": {"type": "file", "file_id": file_id}},
        ],
    }],
)
```

The Files API is out of beta: no beta header is needed. Use `client.files` (not `client.beta.files`). Optional `expires_in_seconds` form field on upload (integer, 3,600 to 7,776,000 seconds) sets automatic expiration; every file response then carries `expires_at` (RFC 3339, `null` without expiration). Expiration is set once at upload and can't be changed.

## Options / Props

| File type | MIME type | Content block type | Use case |
|-----------|-----------|---------------------|----------|
| PDF | `application/pdf` | `document` | Text analysis, document processing |
| Plain text | `text/plain` | `document` | Text analysis, processing |
| Images | `image/jpeg`, `image/png`, `image/gif`, `image/webp` | `image` | Image analysis |
| Datasets, others | Varies | `container_upload` | Code execution tool analysis/visualization |

```json
{"type": "document", "source": {"type": "file", "file_id": "file_011..."}, "title": "Document Title", "context": "Context about the document", "citations": {"enabled": true}}
```

```json
{"type": "image", "source": {"type": "file", "file_id": "file_011..."}}
```

```json
{"type": "container_upload", "file_id": "file_011..."}
```

## Notes

- GA (out of beta; see the ZDR table in API and data retention for eligibility). Platforms: Claude API, Claude Platform on AWS, Microsoft Foundry (Hosted on Anthropic deployments only) — not on Amazon Bedrock or Google Cloud.
- **Migrate from `files-api-2025-04-14`** (optional): requests that still send the header keep working and keep the beta response shapes. Without the header: list response is `{data, next_page}` (pass `next_page` back as `page`, or up to 100 `ids[]`; `before_id` / `after_id` return 400) instead of `{data, has_more, first_id, last_id}`; `expires_at` is always present on file objects; `Content-Type` on the uploaded file part is optional (detected when omitted) instead of required. Steps: drop the header, call `client.files`, update pagination, read `expires_at`.
- SDK beta namespace: from Python 1.2.0 / TypeScript 0.122.0 / Go 1.68.0 / Java 2.59.0 / Ruby 1.67.0 / C# 12.44.0, `client.beta.files` no longer sends `files-api-2025-04-14` and returns the same shapes as `client.files` (with `Beta`-prefixed type names); it accepts `betas` for features still in beta (e.g. `scope_id` filtering under a Managed Agents beta header). Earlier releases send the header from `client.beta.files` even with no `betas` argument. Requests with `managed-agents-2026-04-01` (without `files-api-2025-04-14`) still accept `before_id` / `after_id` on `GET /v1/files` and also return `has_more`, `first_id`, `last_id` alongside `next_page`.
- **Security:** uploaded files are workspace-scoped, not user/session-scoped — any API key in the same workspace can access any file. Never accept `file_id` from end users/untrusted sources; keep the user↔file mapping in your own application.
- Operations: upload, list (paginated: pass the response's `next_page` back as `page`; `limit` default 20, max 1,000; or up to 100 `ids[]`. `before_id`/`after_id` only with the `files-api-2025-04-14` beta header or the `managed-agents-2026-04-01` compatibility path), retrieve metadata, delete, download. Upload/list/metadata/delete are free; downloaded/uploaded file content used in a Messages request is billed as input tokens.
- Only files created by skills or the code execution tool are downloadable (`"downloadable": true`); files you upload return 400 on download attempts.
- Files cannot be modified/renamed after upload — upload a new file and delete the old one instead.
- Limits: 500MB per file, 1TB total per organization; filename 1-255 chars, forbidden chars `< > : " | ? * \ /` and Unicode 0-31.
- Files persist until explicitly deleted or until their `expires_at`; deletion is irreversible and files may remain briefly accessible in in-flight Messages calls. After expiry, content is no longer retrievable, metadata stays readable (and listed) for up to 30 days.
- Rate limit: file-related API calls are limited to approximately 500 requests per minute (contact sales for a higher limit).
- For unsupported formats (.docx, .xlsx), convert to plain text or PDF first; .docx with images should convert to PDF to retain PDF-based citations.
- Errors: 404 not found, 400 invalid file type / not downloadable / exceeds context window / invalid filename, 413 file too large, 400 storage limit exceeded.

## Related

- [PDF support](./pdf-support.md)
- [Vision](./vision.md)
- [Citations](./citations.md)

Tool use・Agent Skills・MCP の詳細は anthropic-api-tools-mcp スキルを参照（code execution tool との連携を含む）。
