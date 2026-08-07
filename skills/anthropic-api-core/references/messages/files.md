<!-- source: https://platform.claude.com/docs/en/build-with-claude/files / last verified: 2026-08-07 -->

# Files API

Upload files once, reference them by `file_id` in Messages requests, and download outputs created by skills or the code execution tool.

## Signature / Usage

```python
# Upload
uploaded = client.beta.files.upload(
    file=("document.pdf", open("/path/to/document.pdf", "rb"), "application/pdf"),
)
file_id = uploaded.id

# Reference in a message
response = client.beta.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Please summarize this document for me."},
            {"type": "document", "source": {"type": "file", "file_id": file_id}},
        ],
    }],
    betas=["files-api-2025-04-14"],
)
```

Requires beta header `anthropic-beta: files-api-2025-04-14` (SDKs add it automatically for `beta.files` calls; pass `betas=["files-api-2025-04-14"]` on Messages calls that reference a file).

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

- **Beta**, not ZDR eligible. Platforms: Claude API, Claude Platform on AWS, Microsoft Foundry (Hosted on Anthropic only) — not on Amazon Bedrock or Google Cloud.
- **Security:** uploaded files are workspace-scoped, not user/session-scoped — any API key in the same workspace can access any file. Never accept `file_id` from end users/untrusted sources; keep the user↔file mapping in your own application.
- Operations: upload, list (paginated, `before_id`/`after_id`, default limit 20), retrieve metadata, delete, download. Upload/list/metadata/delete are free; downloaded/uploaded file content used in a Messages request is billed as input tokens.
- Only files created by skills or the code execution tool are downloadable (`"downloadable": true`); files you upload return 400 on download attempts.
- Files cannot be modified/renamed after upload — upload a new file and delete the old one instead.
- Limits: 500MB per file, 500GB total per organization; filename 1-255 chars, forbidden chars `< > : " | ? * \ /` and Unicode 0-31.
- Files persist until explicitly deleted; deletion is irreversible and files may remain briefly accessible in in-flight Messages calls.
- Rate limit during beta: ~100 file-related requests/minute.
- For unsupported formats (.docx, .xlsx), convert to plain text or PDF first; .docx with images should convert to PDF to retain PDF-based citations.
- Errors: 404 not found, 400 invalid file type / not downloadable / exceeds context window / invalid filename, 413 file too large, 400 storage limit exceeded.

## Related

- [PDF support](./pdf-support.md)
- [Vision](./vision.md)
- [Citations](./citations.md)

Tool use・Agent Skills・MCP の詳細は anthropic-api-tools-mcp スキルを参照（code execution tool との連携を含む）。
