---
source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/prepare-data
---

# Prepare Data for Ingesting

How to prepare unstructured and structured data for Gemini Enterprise (formerly Agentspace) data stores, by source (Cloud Storage, BigQuery, Google Drive, local JSON): supported formats, size limits, metadata file formats and BigQuery schemas.

## Signature / Usage

### Unstructured data: metadata file row formats (Cloud Storage)

The metadata file must be a JSON Lines or NDJSON file. Each row must follow one of these formats.

Using `jsonData`:

```text
{ "id": "<your-id>", "jsonData": "<JSON string>", "content": { "mimeType": "<application/pdf or text/html>", "uri": "gs://<your-gcs-bucket>/directory/filename.pdf" } }
```

Using `structData`:

```text
{ "id": "<your-id>", "structData": { <JSON object> }, "content": { "mimeType": "<application/pdf or text/html>", "uri": "gs://<your-gcs-bucket>/directory/filename.pdf" } }
```

### Unstructured data: example NDJSON metadata file

The first two lines use `jsonData` and the second two lines use `structData`.

```text
{"id":"doc-0","jsonData":"{\"title\":\"test_doc_0\",\"uri\":\"https://test_doc_0.html\",\"description\":\"This document uses a blue color theme\",\"color_theme\":\"blue\"}","content":{"mimeType":"application/pdf","uri":"gs://test-bucket-12345678/test_doc_0.pdf"}}
{"id":"doc-1","jsonData":"{\"title\":\"test_doc_1\",\"uri\":\"https://test_doc_1.html\",\"description\":\"This document uses a green color theme\",\"color_theme\":\"green\"}","content":{"mimeType":"application/pdf","uri":"gs://test-bucket-12345678/test_doc_1.pdf"}}
{"id":"doc-2","structData":{"title":"test_doc_2","uri":"https://test_doc_2.html","description":"This document uses a red color theme","color_theme":"red"},"content":{"mimeType":"application/pdf","uri":"gs://test-bucket-12345678/test_doc_3.pdf"}}
{"id":"doc-3","structData":{"title":"test_doc_3","uri":"https://test_doc_3.html","description":"This is document uses a yellow color theme","color_theme":"yellow"},"content":{"mimeType":"application/pdf","uri":"gs://test-bucket-12345678/test_doc_4.pdf"}}
```

### Unstructured data: BigQuery metadata table schema

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

### Structured data with metadata: BigQuery schema

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

### Structured data: example NDJSON file (Cloud Storage)

Each line represents a document made up of a set of fields.

```text
{"id": 10001, "title": "Hotel 1", "location": {"address": "1600 Amphitheatre Parkway, Mountain View, CA 94043"}, "available_date": "2024-02-10", "non_smoking": true, "rating": 3.7, "room_types": ["Deluxe", "Single", "Suite"]}
{"id": 10002, "title": "Hotel 2", "location": {"address": "Manhattan, New York, NY 10001"}, "available_date": "2023-07-10", "non_smoking": false, "rating": 5.0, "room_types": ["Deluxe", "Double", "Suite"]}
{"id": 10003, "title": "Hotel 3", "location": {"address": "Moffett Park, Sunnyvale, CA 94089"}, "available_date": "2023-06-24", "non_smoking": true, "rating": 2.5, "room_types": ["Double", "Penthouse", "Suite"]}
```

### Limits, formats and public sample data

- Unstructured data: search over documents in TXT, PDF, HTML, DOCX, PPTX, XLSX and XLSM formats; you can import up to 100,000 files at a time (file size limits per type are in the table below). Sources: Cloud Storage, BigQuery, Google Drive.
- Structured data sources: BigQuery, Cloud Storage, local JSON data. Structured data in Cloud Storage must be JSON Lines or NDJSON; each file must be less than 2 GB and each row less than 1 MB; you can import up to 1,000 files in a single import request.
- Public Cloud Storage folders with PDFs for testing: `gs://cloud-samples-data/gen-app-builder/search/alphabet-investor-pdfs`, `gs://cloud-samples-data/gen-app-builder/search/CUAD_v1`, `gs://cloud-samples-data/gen-app-builder/search/kaiser-health-surveys`, `gs://cloud-samples-data/gen-app-builder/search/stanford-cs-224`.
- Public Cloud Storage folders with NDJSON structured data: `gs://cloud-samples-data/gen-app-builder/search/kaggle_movies`, `gs://cloud-samples-data/gen-app-builder/search/austin_311`.

## Options / Props

### Unstructured data file limits

| File type | Default import |
|---|---|
| Text-based files such as HTML, TXT, JSON, XHTML, and XML | \< 200 MB |
| PPTX, DOCX, XLSX, and XLSM | \< 200 MB |
| PDF | \< 200 MB |

## Notes

- Non-searchable PDFs (scanned PDFs or text inside images): turn on the layout parser during data store creation. Searchable PDFs with mostly machine-readable text and many tables: consider OCR processing with the option for machine-readable text enabled. For RAG, turn on document chunking when you create the data store.
- Cloud Storage import is recursive and can be done through the console, the `ImportDocuments` method, or streaming ingestion through CRUD methods (`DocumentService`, `documents` REST resource). Documents without metadata go directly into a bucket; the document ID is an example of metadata. With `structData` you don't need to escape quotation marks that appear within quotation marks.
- Google Drive: syncing is supported for search; Google Identity must be set up as the identity provider in Gemini Enterprise.
- Structured BigQuery import: the schema is auto-detected; after import Google recommends editing it to map key properties such as titles. With the API you can provide your own schema as a JSON object. Importing with metadata ("enhanced structured data") needs an `id` field and a `jsonData` field; without metadata the `id` is generated.
- You can't import from BigQuery tables that have external data sources. Columns with flexible column names aren't imported.
- For custom embeddings see "Use custom embeddings" in the Agent Search documentation (Agent Search was formerly Vertex AI Search).
- Local JSON data can be uploaded directly with the API; Google recommends providing your own schema as a JSON object for better results.
- Blended search limitations (several data stores connected to one app): see "About connecting multiple data stores".
- The source twin writes the JSON Lines examples as indented blocks; they are tagged `text` here because a JSON Lines file with several lines or placeholders is not one valid JSON document.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/prepare-data (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-cloud-storage.md](./connect-cloud-storage.md)
- [connect-bigquery.md](./connect-bigquery.md)
- [create-data-store.md](./create-data-store.md)
