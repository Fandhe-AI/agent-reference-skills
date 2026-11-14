---
source: https://ai.google.dev/gemini-api/docs/models/gemini-embedding-2
---

# Embedding model cards

Aggregated model cards for Gemini Embedding 2, Gemini Embedding 2 Preview (deprecated) and Gemini Embedding (`gemini-embedding-001`). One section per source page.

## Signature / Usage

The cards contain no code; model codes as listed on the pages:

```text
gemini-embedding-2
gemini-embedding-2-preview
gemini-embedding-001
```

## Options / Props

| Model code | Inputs / Output | Input token limit | Output dimension size | Status | Latest update |
| --- | --- | --- | --- | --- | --- |
| `gemini-embedding-2` | Text, image, video, audio, PDF / Text embeddings | 8,192 | Flexible, supports 128 - 3072; recommended 768, 1536, 3072 | Stable | April 2026 |
| `gemini-embedding-2-preview` | Text, image, video, audio, PDF / Text embeddings | 8,192 | Flexible, supports 128 - 3072; recommended 768, 1536, 3072 | Deprecated (effective November 6, 2026, requests route to `gemini-embedding-2`) | March 2026 |
| `gemini-embedding-001` | Text / Text embeddings | 2,048 | Flexible, supports 128 - 3072; recommended 768, 1536, 3072 | Stable | June 2025 |

## Notes

- Source pages (one per section; fetched via https://aistudio.google.com/docs/models/<model>): https://ai.google.dev/gemini-api/docs/models/gemini-embedding-2, https://ai.google.dev/gemini-api/docs/models/gemini-embedding-2-preview, https://ai.google.dev/gemini-api/docs/models/gemini-embedding-001
- Deprecation: the `gemini-embedding-2-preview` card is marked deprecated. Effective November 6, 2026, API requests to `gemini-embedding-2-preview` route to `gemini-embedding-2` at Gemini Embedding 2 rates; update the model string to `gemini-embedding-2`. Per the card and changelog (2026-11-06), `gemini-embedding-2` uses the same API schema, pricing, and embedding space, so no other code changes or vector re-indexing are needed. The deprecations page lists `gemini-embedding-2-preview` (released March 10, 2026) with shutdown date November 6, 2026 and replacement `gemini-embedding-2`.
- Gemini Embedding 2 is described as the first multimodal embedding model, mapping text, images, video, audio and PDFs into a single unified embedding space; best for cross-modal semantic search, document retrieval and recommendation systems.
- `gemini-embedding-001` is described as an engine for high-dimensional vector representation of text and images (the card's Supported data types row lists text input only).
- The catalog page (fetched 2026-11-14) now lists "Gemini Embedding 2" with endpoint `gemini-embedding-2`.
- Full coverage of features is on the Embeddings guide (`multimodal-input/embeddings.md`); REST shape is in `rest-reference/embeddings.md`.
- Docs fetched 2026-11-14 (all three cards re-checked; token limits, dimensions and latest-update months unchanged).
- Distance: these are Gemini embedding endpoints, not a vector database; vector storage and search products are covered by upstash (Vector) and fandhe-db.

## Related

- [Models](./models-catalog.md)
- [Lyria model cards](./music-models.md)
- [Antigravity / Deep Research agent model cards](./agent-models.md)
