---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/parse-chunk-documents
---

# Parse and chunk documents

How to configure parsing and chunking for unstructured data stores in Agent Search (formerly Vertex AI Search): the digital parser, OCR parser for PDFs and layout parser, parser overrides per file type, excluding HTML content, bringing your own parsed documents or chunks (Preview), turning on document chunking for RAG, listing chunks, and returning chunks in search requests. Parsing and chunking are configured with `documentProcessingConfig` when the data store is created.

## Signature / Usage

### Default parser: OCR (data store creation)

Adapted (not in the official docs): `"useNativeText": "false"` is written as the JSON boolean `false`, because `useNativeText` is a boolean field in the Discovery document. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: exampleproject" \
"https://discoveryengine.googleapis.com/v1/projects/exampleproject/locations/global/collections/default_collection/dataStores?dataStoreId=datastore123" \
-d '{
  "displayName": "exampledatastore",
  "industryVertical": "GENERIC",
  "solutionTypes": ["SOLUTION_TYPE_SEARCH"],
  "contentConfig": "CONTENT_REQUIRED",
  "documentProcessingConfig": {
    "defaultParsingConfig": {
      "ocrParsingConfig": {
        "useNativeText": false
      }
    }
  }
}' )
```

### Parser overrides per file type

`parsingConfigOverrides` keys are `pdf`, `html`, `docx`, `pptx`, `xlsm`, `xlsx`; each value is `ocrParsingConfig`, `layoutParsingConfig` (`{}`) or `digitalParsingConfig` (`{}`). Files of other types use the default parser (digital if none is set).

Adapted (not in the official docs): the trailing comma after the closing brace of `ocrParsingConfig` inside the `pdf` object is removed, because it makes the JSON request body invalid, and `"useNativeText": "false"` is written as the JSON boolean `false` (a boolean field in the Discovery document). `"chunkingConfig": {"layoutBasedChunkingConfig": {}}` is added to `documentProcessingConfig`, because the `html` override uses the layout parser, which needs document chunking, and chunking can't be turned on after the data store is created. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: exampleproject" \
"https://discoveryengine.googleapis.com/v1/projects/exampleproject/locations/global/collections/default_collection/dataStores?dataStoreId=datastore123" \
-d '{
  "displayName": "exampledatastore",
  "industryVertical": "GENERIC",
  "solutionTypes": ["SOLUTION_TYPE_SEARCH"],
  "contentConfig": "CONTENT_REQUIRED",
  "documentProcessingConfig": {
    "chunkingConfig": {
      "layoutBasedChunkingConfig": {}
    },
    "parsingConfigOverrides": {
      "pdf": {
        "ocrParsingConfig": {
            "useNativeText": false
          }
      },
      "html": {
         "layoutParsingConfig": {}
      }
    }
  }
}' )
```

### Layout parser: exclude HTML content, with layout-based chunking

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: exampleproject" \
"https://discoveryengine.googleapis.com/v1/projects/exampleproject/locations/global/collections/default_collection/dataStores?dataStoreId=datastore123&createAdvancedSiteSearch=true" \
-d '{
  "displayName": "exampledatastore",
  "industryVertical": "GENERIC",
  "contentConfig": "PUBLIC_WEBSITE",
  "documentProcessingConfig": {
    "chunkingConfig": {
      "layoutBasedChunkingConfig": {}
    },
    "defaultParsingConfig": {
      "layoutParsingConfig": {
       "excludeHtmlElements": ["header", "footer", "nav", "aside"],
       "excludeHtmlClasses": ["overlays", "screenreader"],
       "excludeHtmlIds": ["cookie-banner"]
      }
    }
  }
}' )
```

### Turn on document chunking (fragment of the creation request)

Adapted (not in the official docs): the trailing comma after `"includeAncestorHeadings": HEADINGS_BOOLEAN` is removed, because JSON does not allow a comma before a closing brace.

```text
 "documentProcessingConfig": {
   "chunkingConfig": {
       "layoutBasedChunkingConfig": {
           "chunkSize": CHUNK_SIZE_LIMIT,
           "includeAncestorHeadings": HEADINGS_BOOLEAN
       }
   },
   "defaultParsingConfig": {
     "layoutParsingConfig": {}
   }
 }
```

### Get a parsed document as JSON (v1alpha)

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X GET \
    -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
    "https://discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/global/collections/default_collection/dataStores/DATA_STORE_ID/branches/0/documents/DOCUMENT_ID:getProcessedDocument?processed_document_type=PARSED_DOCUMENT" )
```

### Import a pre-parsed document: metadata row (JSON Lines, `structData`)

The source says: "Each row of the metadata file must follow the structData format:". In the JSON Lines metadata file, each document's object is one line (one JSON object per line):

Adapted (not in the official docs): the source shows this row as a multi-line object; it is written on one line here, as a JSON Lines row must be.

```json
{"id": "DOCUMENT_ID", "structData": {"category": "CATEGORY", "updated": "YYYY-MM-DD"}, "content": {"mimeType": "application/json", "uri": "gs://PARSED_DOC_FILE"}}
```

### Bring your own chunks: file schema (Preview)

```text
{
  "documentMetadata": {
    "title": "DOCUMENT_TITLE",
    "uri": "gs://ORIGINAL_DOC_FILE"
  },
  "chunks": [
    {
      "id": "CHUNK_ID",
      "content": "CHUNK_CONTENT",
      "pageSpan": {
        "pageStart": PAGE_START,
        "pageEnd": PAGE_END
      }
    }
  ]
}
```

### List a document's chunks (v1alpha)

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X GET \
    -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
    "https://discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/global/collections/default_collection/dataStores/DATA_STORE_ID/branches/0/documents/DOCUMENT_ID/chunks" )
```

### Return chunks in a search request

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: exampleproject" \
"https://discoveryengine.googleapis.com/v1/projects/exampleproject/locations/global/collections/default_collection/dataStores/datastore123/servingConfigs/default_search:search" \
-d '{
  "query": "animal",
  "pageSize": 1,
  "contentSearchSpec": {
    "searchResultMode": "CHUNKS",
    "chunkSpec": {
           "numPreviousChunks": 1,
           "numNextChunks": 1
       }
  }
}' )
```

## Options / Props

### Parser availability by file type

| File type | Digital parser | OCR parser for PDFs | Layout parser |
|---|---|---|---|
| HTML | Detects paragraph elements | Not applicable | Detects paragraph, table, image, list, title, and heading elements |
| PDF | Detects paragraph (digital text) elements | Detects paragraph elements | Detects paragraph, table, image, title, and heading elements |
| DOCX | Detects paragraph elements | Not applicable | Detects paragraph, table, image, list, title, heading elements |
| PPTX | Detects paragraph elements | Not applicable | Detects paragraph, table, image, list, title, heading elements |
| TXT | Detects paragraph elements | Not applicable | Not applicable |
| XLSX | Detects paragraph elements | Not applicable | Detects paragraph, table, title, heading elements |
| XLSM | Detects paragraph elements | Not applicable | Detects paragraph, table, title, heading elements |

### Chunking and retrieval parameters

| Parameter | Description |
|---|---|
| `CHUNK_SIZE_LIMIT` | Optional. Token size limit for each chunk. Default 500; supported values 100-500 (inclusive). |
| `HEADINGS_BOOLEAN` | Optional (`includeAncestorHeadings`). Include headings in each chunk. Default `false`. |
| `searchResultMode` | `documents` or `chunks` (REST enum values `DOCUMENTS` / `CHUNKS`). To get chunks the data store must have chunking turned on; default is `chunks` when it is. |
| `numPreviousChunks` / `numNextChunks` | Chunks before / after the relevant chunk. The source states a maximum of 5 (see Notes). |

### Parsed document JSON fields

| Field | Type | Description |
|---|---|---|
| `title` | String | The title of the content file. |
| `description` | String | Optional: Description of the document. |
| `uri` | String | The Cloud Storage URI for the content. |
| `name` | String | Optional: Full resource name path of the document. |
| `blocks` | Array | An ordered list of layout blocks representing the document structure. |

## Notes

- Parser characteristics:
  - Digital: On by default; offered without charge; extracts machine-readable text blocks, not tables, lists or headings. Also used when the specified parser doesn't support a file type (for example TXT with the layout parser).
  - OCR for PDFs: For scanned PDFs or text inside images; only PDFs are processed, other types use the digital parser; parses the first 500 pages of a PDF, later pages aren't processed. `useNativeText` (boolean, optional, default `false`) merges machine-readable text with OCR output. Priced through Document AI feature pricing.
  - Layout: For HTML, PDF, DOCX, PPTX, XLSX, XLSM; recommended for complex non-searchable PDFs instead of OCR; available only when document chunking is turned on; priced through Document AI feature pricing.
- Layout parser add-ons (selected at data store creation):
  - Image annotation (Console option under **Document processing options** > **Layout parser settings**: **Enable image annotation**; Details: Description and image are assigned to a chunk; detects BMP, GIF, JPEG, PNG, TIFF.)
  - Table annotation (Console option under **Document processing options** > **Layout parser settings**: **Enable table annotation**; Details: Description and table are assigned to a chunk.)
  - Gemini layout parsing (Public Preview) (Console option under **Document processing options** > **Layout parser settings**: **Enable Gemini enhancement**; Details: Gemini does layout analysis and extraction on PDF files (better table recognition, reading order, text recognition); can be used with table annotation.)
  - Exclude HTML content (Console option under **Document processing options** > **Layout parser settings**: `layoutParsingConfig` fields; Details: `excludeHtmlElements` (tags), `excludeHtmlClasses` (class attributes), `excludeHtmlIds` (ID attributes).)
- Without `documentProcessingConfig.defaultParsingConfig` the digital parser is used. Changing parser settings on an existing data store applies only to newly imported documents (existing ones aren't re-parsed); document chunking can't be changed, and without it the layout parser can't be chosen.
- Document chunking can't be turned on or off after data store creation. Data stores with chunking turned on aren't optimized for returning documents; documents are returned by aggregating chunks. Chunking and OCR features are available for custom search apps with unstructured data stores.
- Bring your own parsed document and bring your own chunks are Preview. A JSON file identified by an `application/json` MIME type or a JSON file extension in the metadata lines file is treated as a parsed document or pre-chunked document; there is no explicit toggle. `PAGE_START` / `PAGE_END` are 1-based page numbers.
- `getProcessedDocument` and `Chunks.list` / `Chunks.get` are shown on `v1alpha`; `processed_document_type` also accepts `CHUNKED_DOCUMENT` (chunking must be enabled). The source also shows a `Chunks.get` curl (`.../documents/DOCUMENT_ID/chunks/CHUNK_ID`), a `CHUNKED_DOCUMENT` curl, a full layout payload example for parsed documents, a chunked payload example, the search response example, and the Console steps; these are omitted.
- Source inconsistency: the text says the maximum for `numPreviousChunks` / `numNextChunks` is 5, while the `v1` Discovery document for `ChunkSpec` says "The maximum allowed value is 3". Confirm against the live API reference before relying on a value above 3.
- Corrected from the official docs: both OCR examples pass `"useNativeText": "false"` (a JSON string); `useNativeText` is `boolean` in the `discoveryengine` Discovery documents (`v1`, `v1beta`, `v1alpha`), and the source itself says to set it "to true" and that the default is `false`, so the examples here use `false`.
- The chunking fragment above is a request fragment with placeholders, so it is tagged `text`; replace the placeholders in a real request.
- Corrected from the official docs: the source's chunking fragment writes `"includeAncestorHeadings": HEADINGS_BOOLEAN,` with a trailing comma before the closing `}` of `layoutBasedChunkingConfig`; JSON does not allow trailing commas, so the comma is removed.
- Corrected from the official docs: the pre-parsed document metadata row was shown as a multi-line object (`{` / `"id": "DOCUMENT_ID",` / `"structData": {...}` / `"content": {...}` / `}` on separate lines); JSON Lines requires one complete object per line, so the row is written on one line with the same keys and values.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Corrected from the official docs: the source's parser-overrides example sets `"html": {"layoutParsingConfig": {}}` without chunking, but the same page says "The layout parser is available only when using document chunking for RAG." and "Document chunking can't be turned on or off after data store creation." The example adds the `chunkingConfig` block exactly as the source's exclude-HTML example writes it (`"chunkingConfig": {` / `"layoutBasedChunkingConfig": {}` / `}`). In the `discoveryengine` `v1` Discovery document, `chunkingConfig` ("Whether chunking mode is enabled.") and `parsingConfigOverrides` are both fields of `DocumentProcessingConfig`, and `layoutBasedChunkingConfig` is a field of `ChunkingConfig`.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/parse-chunk-documents (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the example "Specify parser overrides for file types" had a trailing comma after the `ocrParsingConfig` object inside `pdf` (the source reads `"useNativeText": "false"` then `},` then `},`); the comma after the inner brace was removed.
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [prepare-data.md](./prepare-data.md)
- [create-datastore-ingest.md](./create-datastore-ingest.md)
- [provide-schema.md](./provide-schema.md)
