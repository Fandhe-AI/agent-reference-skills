<!-- source: https://platform.claude.com/docs/en/build-with-claude/pdf-support / last verified: 2026-08-07 -->

# PDF support

Process PDFs with Claude: extract text, analyze charts, and understand visual content from documents, using `document` content blocks.

## Signature / Usage

```json
{
  "role": "user",
  "content": [
    {"type": "document", "source": {"type": "url", "url": "https://example.com/doc.pdf"}},
    {"type": "text", "text": "What are the key findings in this document?"}
  ]
}
```

```json
{"type": "document", "source": {"type": "base64", "media_type": "application/pdf", "data": "<BASE64>"}}
```

```json
{"type": "document", "source": {"type": "file", "file_id": "file_abc123"}}
```

Three ways to provide a PDF: `url`, `base64`, or Files API `file_id`. On Amazon Bedrock and Google Cloud, only `base64` is supported; on Microsoft Foundry, the Files API is unsupported for Hosted-on-Azure deployments. Add `"cache_control": {"type": "ephemeral"}` on the document block to enable prompt caching for repeated queries against the same PDF.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `source.type` | `"url"` \| `"base64"` \| `"file"` | Document source |
| `source.media_type` | `"application/pdf"` | Required for `base64` |
| `source.file_id` | string | Files API upload reference |
| `cache_control.type` | `"ephemeral"` | Enables prompt caching on this document block |

## Notes

- Requirements: max request size 32MB (varies by platform), max 600 pages/request (100 pages if context window < 1M tokens); standard, unencrypted PDF only. Both limits apply to the whole request payload, not just the PDF.
- Plain text (.txt/.csv/.md) can be uploaded to the Files API as `text/plain` and referenced by `file_id` in document blocks; binary formats (.xlsx/.docx) must be converted to text or PDF first.
- **How it works:** each page is converted to an image, and per-page extracted text is provided alongside the image, so Claude analyzes both text and visuals (charts, diagrams).
- **Cost:** ~1,500–3,000 text tokens per page (density-dependent) plus per-page image tokens (same calculation as Vision); use token counting to estimate exact cost.
- **Performance tips:** place PDFs before text in the request; use standard/legible fonts; upright page orientation; reference pages by logical (PDF viewer) page numbers; split very large PDFs into chunks; enable prompt caching for repeated analysis.
- Dense PDFs (small fonts, complex tables/graphics) can exhaust the context window before hitting the page limit, and can fail even via the Files API — split the document or downsample embedded images.
- Subject to the same vision limitations (see Vision) since PDF support relies on vision capabilities.
- Use the Message Batches API to process many PDFs asynchronously in one request.
- **Amazon Bedrock Converse API (Claude on Bedrock, Opus 4.6 and earlier) only:** full visual PDF understanding requires citations enabled; without citations, falls back to basic text-extraction-only mode (~1,000 tokens/3-page PDF vs ~7,000 tokens/3-page PDF with visual mode). InvokeModel API allows visual analysis without forcing citations.

## Related

- [Vision](./vision.md)
- [Vision coordinates](./vision-coordinates.md)
- [Files](./files.md)
- [Citations](./citations.md)
- [Batch processing](./batch-processing.md)
- [Token counting](./token-counting.md)
