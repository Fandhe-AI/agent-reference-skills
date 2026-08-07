<!-- source: https://platform.claude.com/docs/en/build-with-claude/citations / last verified: 2026-08-07 -->

# Citations

Ground Claude's responses in source documents. Citations return the exact passages that support each claim, so you can verify answers and surface sources to users.

## Signature / Usage

```json
{
  "type": "document",
  "source": {"type": "text", "media_type": "text/plain", "data": "The grass is green. The sky is blue."},
  "title": "My Document",
  "context": "This is a trustworthy document.",
  "citations": {"enabled": true}
}
```

Set `citations.enabled=true` on documents (all or none within a request — mixing is not allowed). Claude's response then contains multiple `text` blocks, each optionally carrying a `citations` array pointing back to source locations. Only text citations are supported (no image citations).

```python
# Example response text block with a citation
{
    "type": "text",
    "text": "the grass is green",
    "citations": [{
        "type": "char_location",
        "cited_text": "The grass is green.",
        "document_index": 0,
        "document_title": "Example Document",
        "start_char_index": 0,
        "end_char_index": 20,
    }],
}
```

## Options / Props

| Document type | Best for | Chunking | Citation format |
|---|---|---|---|
| Plain text (`source.type: "text"`) | Simple prose | Sentence | `char_location`, character indices (0-indexed, exclusive end) |
| PDF (`source.type: "base64"/"url"/"file"`, `media_type: application/pdf`) | PDFs with extractable text | Sentence | `page_location`, page numbers (1-indexed, exclusive end) |
| Custom content (`source.type: "content"`, array of blocks) | Lists, transcripts, granular control | None (as provided) | `content_block_location`, block indices (0-indexed, exclusive end) |

| Field | Description |
|---|---|
| `title` | Optional, passed to model, not cited from, length-limited |
| `context` | Optional, passed to model, not cited from, use for metadata/stringified JSON |
| `citations.enabled` | `true`/`false`, must be uniform across all documents in a request |

## Notes

- Document indices are 0-indexed across all documents in the request (all messages combined).
- Scanned PDFs without extractable text are not citable (no image citations yet).
- Token cost: `cited_text` does not count toward output tokens (or input tokens when passed back in later turns); enabling citations adds a small input-token overhead from system prompt additions and chunking.
- **Incompatible with structured outputs:** enabling citations on any `document`/`search_result` block together with `output_config.format` (or deprecated `output_format`) returns a 400 error — citation blocks interleave with text, conflicting with strict JSON schema output.
- Compatible with prompt caching (apply `cache_control: {"type": "ephemeral"}` on the document block itself — citation blocks in the response can't be cached, but the source document can), token counting, and batch processing.
- Streaming: citations arrive as `citations_delta` inside `content_block_delta` events, one citation per delta, appended to the current text block's `citations` list.
- Files API document sources for citations are beta (`anthropic-beta: files-api-2025-04-14`).

## Related

- [Streaming](./streaming.md)
- [Search results](./search-results.md)
- [PDF support](./pdf-support.md)
- [Files](./files.md)
- [Structured outputs](./structured-outputs.md)
