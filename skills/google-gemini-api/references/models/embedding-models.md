---
source: https://ai.google.dev/gemini-api/docs/models/gemini-embedding-2
---

# Embedding model cards

Aggregated model cards for Gemini Embedding 2, Gemini Embedding 2 Preview and Gemini Embedding (`gemini-embedding-001`). One section per source page.

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
| `gemini-embedding-2-preview` | Text, image, video, audio, PDF / Text embeddings | 8,192 | Flexible, supports 128 - 3072; recommended 768, 1536, 3072 | Preview | March 2026 |
| `gemini-embedding-001` | Text / Text embeddings | 2,048 | Flexible, supports 128 - 3072; recommended 768, 1536, 3072 | Stable | June 2025 |

## Notes

- Source pages (one per section): https://ai.google.dev/gemini-api/docs/models/gemini-embedding-2, https://ai.google.dev/gemini-api/docs/models/gemini-embedding-2-preview, https://ai.google.dev/gemini-api/docs/models/gemini-embedding-001
- The deprecations page lists `embedding-2-preview` (released March 10, 2026) with shutdown August 10, 2026 and replacement `gemini-embedding-2`; the ID spelling differs from the card and the preview card carries no warning, so prefer `gemini-embedding-2` for new work.
- Gemini Embedding 2 is described as the first multimodal embedding model, mapping text, images, video, audio and PDFs into a single unified embedding space; best for cross-modal semantic search, document retrieval and recommendation systems.
- `gemini-embedding-001` is described as an engine for high-dimensional vector representation of text and images (the card's Supported data types row lists text input only).
- The catalog page lists "Gemini Embedding 2" with endpoint `gemini-embedding-2-preview`, while the `gemini-embedding-2` card lists the stable `gemini-embedding-2`; both cards exist as of 2026-10-16.
- Full coverage of features is on the Embeddings guide (`multimodal-input/embeddings.md`); REST shape is in `rest-reference/embeddings.md`.
- Docs fetched 2026-10-16.
- Distance: these are Gemini embedding endpoints, not a vector database; vector storage and search products are covered by upstash (Vector) and fandhe-db.

## Related

- [Models](./models-catalog.md)
- [Lyria model cards](./music-models.md)
- [Antigravity / Deep Research agent model cards](./agent-models.md)
