---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/snippets
---

# Snippets, extractive answers and extractive segments

Agent Search can return snippets, extractive answers and extractive segments with each search response. A snippet is a brief preview extract with hit highlighting; an extractive answer is verbatim text from the document, shorter than an extractive segment; an extractive segment is more verbose verbatim text that can be shown as an answer or used as LLM input.

## Signature / Usage

### Get snippets

Send a search request with `ContentSearchSpec.SnippetSpec` and `returnSnippet` set to true. Snippets are returned in `derivedStructData.snippets`.

```text
"contentSearchSpec":
{
  "snippetSpec":
  {
    "returnSnippet": true
  }
}
```

```json
{
  "id": "54321",
  "document": {
    "name": "projects/123/locations/global/collections/default_collection/dataStores/example-datastore/branches/0/documents/54321",
    "id": "54321",
    "derivedStructData": {
      "link": "gs://cloud-samples-data/gen-app-builder/search/alphabet-investor-pdfs/2008_google_annual_report.pdf",
      "snippets": [
        {
          "snippet": "Google Chrome. Google Chrome is an open-source browser that combines a minimal design with technologies to make the web faster, safer, and easier to navigate.",
          "snippet_status": "SUCCESS"
        }
      ]
    }
  }
}
```

### Get extractive answers

Use `ContentSearchSpec.extractiveContentSpec` with `maxExtractiveAnswerCount`. Answers are returned in `extractive_answers`.

```text
"contentSearchSpec":
{
  "extractiveContentSpec": {
    "maxExtractiveAnswerCount": 1
  }
}
```

```json
{
  "id": "54321",
  "document": {
    "name": "projects/123/locations/global/collections/default_collection/dataStores/example-datastore/branches/0/documents/54321",
    "id": "54321",
    "derivedStructData": {
      "extractive_answers": [
        {
          "pageNumber": "2",
          "content": "Google saw growth throughout the year both in our domestic business and internationally, both on Google owned sites and on the Google Network. Specifically, revenues from Google owned sites increased 101% on a year over year basis, from $792 million to $1.6 billion."
        }
      ],
      "link": "gs://cloud-samples-data/gen-app-builder/search/alphabet-investor-pdfs/2004Q4_earnings_google.pdf"
    }
}
}
```

### Get extractive segments

The steps shown are for unstructured data; similar steps apply to website data. Segments are returned in `extractive_segments`.

```text
"contentSearchSpec":
{
  "extractiveContentSpec": {
    "maxExtractiveSegmentCount": 1
  }
}
```

## Options / Props

### extractiveContentSpec fields

| Field | Default | Maximum | Description |
|-------|---------|---------|-------------|
| `maxExtractiveAnswerCount` | 0 | 5 | Number of extractive answers per search result. |
| `maxExtractiveSegmentCount` | 0 | 10 | Number of extractive segments per search result. |
| `returnExtractiveSegmentScore` | — | — | Set to `true` to return a relevance score with each segment; scores range from -1.0 (less relevant) to 1.0 (more relevant). Can increase latency. |
| `numPreviousSegments` | 0 | 3 | Adjacent segments returned before the relevant segment. Can increase latency. |
| `numNextSegments` | 0 | 3 | Adjacent segments returned after the relevant segment. Can increase latency. |

### Response fields

| Field | Description |
|-------|-------------|
| `snippet` | Snippet generated for the result, with hit highlighting in bold HTML tags. |
| `snippet_status` | `SUCCESS` if a snippet is generated; `NO_SNIPPET_AVAILABLE` otherwise. |
| `pageNumber` | If page numbers can be extracted, where the answer or segment was extracted from. |
| `content` | The content of the extractive answer or segment. |

## Notes

- Availability: snippets are available for data stores with unstructured data and website data (both basic website search and advanced website indexing); extractive answers and extractive segments are available for data stores with unstructured data and with advanced website indexing.
- Prerequisites: for an unstructured app, snippets have no requirement, and extractive answers and extractive segments need Enterprise edition features. For a website app, snippets need Enterprise edition features, and extractive answers need Enterprise edition features and advanced website indexing. The source lists no separate website-app prerequisite for extractive segments.
- As of July 2023, snippets are briefer extracts of more uniform length and no longer provide page numbers. If you used snippets as direct answers or LLM inputs, Google recommends migrating to extractive answers (which provide page numbers where available) or extractive segments.
- Relevance scores are considered during ranking but don't solely determine the order of results.
- The get-search-summaries page states the `maxExtractiveAnswerCount` maximum as 1 ([get-search-summaries.md](./get-search-summaries.md)); this page and the `discoveryengine.v1` Discovery document say 5. Both are kept as written.
- Discovery marks `returnExtractiveSegmentScore` as available only for new or allowlisted data stores.
- The source links extractive answers from search summaries as "(Preview)". It also shows an example comparing the three kinds of output; it and the extractive segment response example are omitted.
- The JSON fragments are shown as `text` because they are partial request bodies.
- Former name: Agent Search was Vertex AI Search; the API is still Discovery Engine (`discoveryengine.googleapis.com`).
- Rendering safely (not in the official docs): snippets come from the indexed documents and carry hit highlighting as bold HTML tags (the source says they are for "rendering previews"), so treat them as untrusted HTML: escape them, or sanitize them with an allowlist-based HTML sanitizer that keeps only the highlighting tags, before inserting them into the DOM.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/snippets (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-search-summaries.md](./get-search-summaries.md)
