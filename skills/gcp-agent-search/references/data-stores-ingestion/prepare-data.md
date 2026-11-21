---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/prepare-data
---

# Prepare data for ingesting into Agent Search

How to prepare website, unstructured, structured, structured media and healthcare FHIR data before importing it into an Agent Search (formerly Vertex AI Search) data store. It covers URL pattern limits, `robots.txt` crawler access, file formats and size limits, the Cloud Storage metadata (JSON Lines / NDJSON) format and the BigQuery schemas.

## Signature / Usage

### Website data: allow the crawler in `robots.txt`

Agent Search crawls pages with `Google-CloudVertexBot`. User-Agent in HTTP requests:

```text
Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.7559.132 Mobile Safari/537.36 (compatible; Google-CloudVertexBot; +https://cloud.google.com/enterprise-search)
```

Example `robots.txt` group (user agent token `Google-CloudVertexBot`):

```text
user-agent: Google-CloudVertexBot
allow: /
```

### Unstructured data in Cloud Storage: NDJSON metadata file

Each row points to a document with `content.uri`. The first two lines use `jsonData`, the second two use `structData`:

```text
{"id":"doc-0","jsonData":"{\"title\":\"test_doc_0\",\"uri\":\"https://test_doc_0.html\",\"description\":\"This document uses a blue color theme\",\"color_theme\":\"blue\"}","content":{"mimeType":"application/pdf","uri":"gs://test-bucket-12345678/test_doc_0.pdf"}}
{"id":"doc-1","jsonData":"{\"title\":\"test_doc_1\",\"uri\":\"https://test_doc_1.html\",\"description\":\"This document uses a green color theme\",\"color_theme\":\"green\"}","content":{"mimeType":"application/pdf","uri":"gs://test-bucket-12345678/test_doc_1.pdf"}}
{"id":"doc-2","structData":{"title":"test_doc_2","uri":"https://test_doc_2.html", "description":"This document uses a red color theme","color_theme":"red"},"content":{"mimeType":"application/pdf","uri":"gs://test-bucket-12345678/test_doc_3.pdf"}}
{"id":"doc-3","structData":{"title":"test_doc_3","uri":"https://test_doc_3.html","description":"This is document uses a yellow color theme","color_theme":"yellow"},"content":{"mimeType":"application/pdf","uri":"gs://test-bucket-12345678/test_doc_4.pdf"}}
```

### Unstructured data in BigQuery: metadata table schema

```json
[
  {
    "name": "id",
    "mode": "REQUIRED",
    "type": "STRING",
    "fields": []
  },
  {
    "name": "jsonData",
    "type": "STRING",
    "fields": []
  },
  {
    "name": "content",
    "type": "RECORD",
    "mode": "NULLABLE",
    "fields": [
      {
        "name": "mimeType",
        "type": "STRING",
        "mode": "NULLABLE"
      },
      {
        "name": "uri",
        "type": "STRING",
        "mode": "NULLABLE"
      }
    ]
  }
]
```

### Structured data with metadata in BigQuery: table schema

```json
[
  {
    "name": "id",
    "mode": "REQUIRED",
    "type": "STRING",
    "fields": []
  },
  {
    "name": "jsonData",
    "mode": "NULLABLE",
    "type": "STRING",
    "fields": []
  }
]
```

### Structured data in Cloud Storage: NDJSON file

```text
{"id": 10001, "title": "Hotel 1", "location": {"address": "1600 Amphitheatre Parkway, Mountain View, CA 94043"}, "available_date": "2024-02-10", "non_smoking": true, "rating": 3.7, "room_types": ["Deluxe", "Single", "Suite"]}
{"id": 10002, "title": "Hotel 2", "location": {"address": "Manhattan, New York, NY 10001"}, "available_date": "2023-07-10", "non_smoking": false, "rating": 5.0, "room_types": ["Deluxe", "Double", "Suite"]}
{"id": 10003, "title": "Hotel 3", "location": {"address": "Moffett Park, Sunnyvale, CA 94089"}, "available_date": "2023-06-24", "non_smoking": true, "rating": 2.5, "room_types": ["Double", "Penthouse", "Suite"]}
```

## Options / Props

### Website URL pattern limits

| Indexing type | Included sites | Excluded sites |
|---|---|---|
| Basic website search | Maximum of 50 URL patterns | Maximum of 50 URL patterns |
| Advanced website indexing | Maximum of 500 URL patterns | Maximum of 500 URL patterns |

### Common URL patterns to exclude

| Pattern type | Example pattern | Reason to exclude |
|---|---|---|
| Highlighted views | `example.com/*/highlight/true` | Alternate view of an existing post. |
| Topic versus message paths | `example.com/*/td-p/*` | Alternate canonical path for the same message. |
| Attachment permutations | `example.com/*?attachment-id=*` | Pages centered on attachments rather than content. |
| User profiles | `example.com/*/user/*` | Low-value metadata pages that increase doc count. |
| Dynamic search | `example.com/search?*` | All such unique, dynamic search URLs that follow this pattern are indexed. This results in diluted search quality, a bloated index, and increased index storage costs. |

## Notes

- Data type limits and requirements:
  - Unstructured (Item: Formats; Value: TXT, JSON, Markdown, PDF, HTML, DOCX, PPTX, XLSX, and XLSM)
  - Unstructured (Item: Maximum file size; Value: 200 MB)
  - Unstructured (Item: Files per import; Value: Up to 100,000 files at a time)
  - Unstructured (Item: Sources; Value: Cloud Storage, BigQuery (metadata), Google Drive (custom search; requires Google Identity as the identity provider))
  - Structured (Cloud Storage) (Item: Format; Value: JSON Lines or NDJSON)
  - Structured (Cloud Storage) (Item: File and row size; Value: Each file less than 2 GB, each row less than 1 MB)
  - Structured (Cloud Storage) (Item: Files per import request; Value: Up to 1,000 files)
  - Structured (BigQuery) (Item: Not imported; Value: Tables with external data sources; columns with flexible column names)
  - Healthcare FHIR (deprecated) (Item: Source location; Value: Cloud Healthcare API dataset in `us-central1`, `us`, or `eu`)
  - Healthcare FHIR (deprecated) (Item: FHIR store type; Value: R4)
  - Healthcare FHIR (deprecated) (Item: Import quota; Value: Fewer than 1 million FHIR resources; the import stops at the limit)
  - Healthcare FHIR (deprecated) (Item: Relative references; Value: Format `Resource/resourceId`, for example `subject.reference` = `Patient/034AB16`)
  - Healthcare FHIR (deprecated) (Item: `DocumentReference` files; Value: PDF, RTF, or image files in Cloud Storage, linked in `content[].attachment.url` as `gs://BUCKET_NAME/PATH_TO_REFERENCED_FILE`; up to 100,000 files at a time)
- Use multiple smaller data stores and search apps instead of one large data store: search latency increases with data store size.
- Excluding dynamic URLs and duplicate URL variants: Agent Search treats each unique URL as a separate document and bills each stored variant. If you forget to exclude them, edit **Sites to exclude** as soon as possible; Google Cloud doesn't issue refunds or billing credits for excess indexing charges.
- Sitemaps are fetched with `Googlebot`, pages are crawled with `Google-CloudVertexBot`: if `robots.txt`, a CDN or a firewall blocks `Googlebot`, pages are still crawled but the sitemap's URLs aren't indexed or refreshed. Upstream proxy servers must also allow the search requests.
- Advanced website indexing requires domain verification for the URL patterns.
- Cloud Storage import is recursive. Documents can be in the same bucket as the metadata file or in a different one. Public test folders: `gs://cloud-samples-data/gen-app-builder/search/alphabet-investor-pdfs`, `gs://cloud-samples-data/gen-app-builder/search/CUAD_v1`, `gs://cloud-samples-data/gen-app-builder/search/kaiser-health-surveys`, `gs://cloud-samples-data/gen-app-builder/search/stanford-cs-224` (PDFs); `gs://cloud-samples-data/gen-app-builder/search/kaggle_movies`, `gs://cloud-samples-data/gen-app-builder/search/austin_311` (structured NDJSON).
- For non-searchable PDFs turn on the layout parser at data store creation; for RAG turn on document chunking. A schema for structured BigQuery / JSON imports is auto-detected unless provided via the API.
- Deprecated: "Agent Search for healthcare is deprecated and won't be available after May 15, 2027." (https://docs.cloud.google.com/generative-ai-app-builder/docs/prepare-data, retrieved 2026-11-21).
- The source's file-size limit table for `DocumentReference` files (by file type and parser configuration) is cut off in the retrieved copy and is not reproduced. The source also shows Console steps and Colab notebook links, which are omitted.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/prepare-data (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-datastore-ingest.md](./create-datastore-ingest.md)
- [provide-schema.md](./provide-schema.md)
- [parse-chunk-documents.md](./parse-chunk-documents.md)
- [domain-verification.md](./domain-verification.md)
