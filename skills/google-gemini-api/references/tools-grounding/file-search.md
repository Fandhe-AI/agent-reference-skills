---
source: https://ai.google.dev/gemini-api/docs/file-search
---

# File search

The File Search tool provides Retrieval Augmented Generation (RAG): it imports, chunks, and indexes your data, then retrieves relevant chunks as context for the model. Text embeddings use `gemini-embedding-001`; image/multimodal embeddings use `gemini-embedding-2`. Audio and video formats are not currently supported.

## Signature / Usage

Create a store, upload directly, then query with the `file_search` tool:

```python
from google import genai
from google.genai import types
import time

client = genai.Client()

file_search_store = client.file_search_stores.create(
    config={
        'display_name': 'your-fileSearchStore-name',
        'embedding_model': 'models/gemini-embedding-2'
    }
)

operation = client.file_search_stores.upload_to_file_search_store(
  file='sample.txt',
  file_search_store_name=file_search_store.name,
  config={
      'display_name' : 'display-file-name',
  }
)

while not operation.done:
    time.sleep(5)
    operation = client.operations.get(operation)

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Can you tell me about [insert question]",
    tools=[{
        "type": "file_search",
        "file_search_store_names": [file_search_store.name]
    }]
)

for step in interaction.steps:
    if step.type == "model_output":
        for content_block in step.content:
            if content_block.type == "text":
                print(content_block.text)
                if content_block.annotations:
                    print("\nSources:")
                    for annotation in content_block.annotations:
                        if annotation.type == "file_citation":
                            print(f"  - {annotation.file_name}: {annotation.source}")
```

Importing an existing Files API file:

```python
sample_file = client.files.upload(file='sample.txt', config={'display_name': 'display_file_name'})

operation = client.file_search_stores.import_file(
    file_search_store_name=file_search_store.name,
    file_name=sample_file.name
)

while not operation.done:
    time.sleep(5)
    operation = client.operations.get(operation)
```

Chunking configuration:

```python
operation = client.file_search_stores.upload_to_file_search_store(
    file_search_store_name=file_search_store.name,
    file='sample.txt',
    config={
        'chunking_config': {
          'white_space_config': {
            'max_tokens_per_chunk': 200,
            'max_overlap_tokens': 20
          }
        }
    }
)
```

REST: create store, resumable upload, query:

```bash
# 1. Create a File Search store
curl -X POST "https://generativelanguage.googleapis.com/v1beta/fileSearchStores" \
    -H "x-goog-api-key: ${GEMINI_API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{
      "displayName": "your-file-search-store-name",
      "embeddingModel": "models/gemini-embedding-2"
    }' > store_res.json

FILE_SEARCH_STORE_NAME=$(jq -r ".name" store_res.json)

# 2. Upload directly to File Search store using resumable upload
NUM_BYTES=$(wc -c < "sample.txt")
curl "https://generativelanguage.googleapis.com/upload/v1beta/fileSearchStores/${FILE_SEARCH_STORE_NAME}:uploadToFileSearchStore" \
    -H "x-goog-api-key: ${GEMINI_API_KEY}" \
    -D upload-header.tmp \
    -H "X-Goog-Upload-Protocol: resumable" \
    -H "X-Goog-Upload-Command: start" \
    -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
    -H "X-Goog-Upload-Header-Content-Type: text/plain" \
    -H "Content-Type: application/json" \
    -d '{"displayName": "sample.txt"}' 2> /dev/null

upload_url=$(grep -i "x-goog-upload-url: " upload-header.tmp | cut -d" " -f2 | tr -d "\r")
rm upload-header.tmp

curl "${upload_url}" \
    -H "Content-Length: ${NUM_BYTES}" \
    -H "X-Goog-Upload-Offset: 0" \
    -H "X-Goog-Upload-Command: upload, finalize" \
    --data-binary "@sample.txt" 2> /dev/null > upload_response.json

# 3. Query using the File Search store
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: ${GEMINI_API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "gemini-3.8-flash",
      "input": "Can you tell me about [insert question]",
      "tools": [{
        "type": "file_search",
        "file_search_store_names": ["'"${FILE_SEARCH_STORE_NAME}"'"]
      }]
    }'
```

Manage stores and documents:

```python
file_search_store = client.file_search_stores.create(
    config={
        'display_name': 'myfilesearchstore123',
        'embedding_model': 'models/gemini-embedding-2'
    }
)

for store in client.file_search_stores.list():
    print(store)

my_file_search_store = client.file_search_stores.get(name=file_search_store.name)

client.file_search_stores.delete(name=file_search_store.name, config={'force': True})
```

Documents in a store:

```python
for document_in_store in client.file_search_stores.documents.list(parent='fileSearchStores/myfilesearchstore123'):
  print(document_in_store)

file_search_document = client.file_search_stores.documents.get(name='fileSearchStores/myfilesearchstore123/documents/sampletxt123')

client.file_search_stores.documents.delete(name='fileSearchStores/myfilesearchstore123/documents/sampletxt123', config={'force': True})
```

```javascript
const fileSearchStore = await ai.fileSearchStores.create({
  config: {
    displayName: 'myfilesearchstore123',
    embeddingModel: 'models/gemini-embedding-2'
  }
});

const fileSearchStores = await ai.fileSearchStores.list();
for await (const store of fileSearchStores) {
  console.log(store);
}

await ai.fileSearchStores.delete({
  name: fileSearchStore.name,
  config: { force: true }
});
```

Custom metadata and filtering:

```python
op = client.file_search_stores.import_file(
    file_search_store_name=file_search_store.name,
    file_name=sample_file.name,
    config={
        'custom_metadata': [
            {"key": "author", "string_value": "Robert Graves"},
            {"key": "year", "numeric_value": 1934}
        ]
    }
)
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: ${GEMINI_API_KEY}" \
    -H 'Content-Type: application/json' \
    -X POST \
    -d '{
            "model": "gemini-3.8-flash",
            "input": [{"type": "text", "text": "Tell me about the book I, Claudius"}],
            "tools": [{
                "type": "file_search",
                "file_search_store_names": ["'"${FILE_SEARCH_STORE_NAME}"'"],
                "metadata_filter": "author = \"Robert Graves\""
            }]
        }' 2> /dev/null > response.json
```

Citation shapes (`file_citation` annotation; `page_number` for paged documents; `media_id` for image chunks):

```json
{
  "steps": [
    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "...",
          "annotations": [
            {
              "type": "file_citation",
              "file_name": "document.pdf",
              "page_number": 1,
              "source": "..."
            }
          ]
        }
      ]
    }
  ]
}
```

```python
for step in interaction.steps:
    if step.type == "model_output":
        for content in step.content:
            if content.type == "text" and content.annotations:
                for annotation in content.annotations:
                    if annotation.type == "file_citation" and annotation.media_id:
                        print(f"Cited Media ID: {annotation.media_id}")
                        blob_content = client.file_search_stores.download_media(
                            media_id=annotation.media_id
                        )
```

Structured output with File Search (Gemini 3 and later):

```python
from pydantic import BaseModel, Field

class Money(BaseModel):
    amount: str = Field(description="The numerical part of the amount.")
    currency: str = Field(description="The currency of amount.")

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="What is the minimum hourly wage in Tokyo right now?",
    tools=[{
        "type": "file_search",
        "file_search_store_names": [file_search_store.name]
    }],
    response_format={
        "type": "text",
        "mime_type": "application/json",
        "schema": Money.model_json_schema()
    },
)
result = Money.model_validate_json(interaction.output_text)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | string | `"file_search"` |
| `file_search_store_names` | array | Names of File Search stores to search |
| `metadata_filter` | string | List filter on custom metadata (syntax per `google.aip.dev/160`), e.g. `author = "Robert Graves"` |
| `chunking_config.white_space_config.max_tokens_per_chunk` | integer | Maximum tokens per chunk (example: 200) |
| `chunking_config.white_space_config.max_overlap_tokens` | integer | Maximum overlapping tokens (example: 20) |
| `embedding_model` (store config) | string | e.g. `models/gemini-embedding-2`; must be set to a multimodal model to embed images |
| `custom_metadata` | array | Key-value pairs: `{"key", "string_value"}` or `{"key", "numeric_value"}` |

Rate limits:

| Limit | Value |
|---|---|
| Maximum file size / per document | 100 MB |
| Total project File Search store size, Free | 1 GB |
| Tier 1 | 10 GB |
| Tier 2 | 100 GB |
| Tier 3 | 1 TB |
| Recommendation | Keep each store under 20 GB for optimal retrieval latency |

Supported models: Gemini 4 Argon, Gemini 3.8 Flash, Gemini 3.6 Flash, Gemini 3.5 Flash-Lite, Gemini 3.1 Pro Preview, Gemini 3.1 Flash-Lite, Gemini 3 Flash Preview.

## Notes

- How it works: semantic search over embeddings of imported chunks. Embeddings have no TTL (persist until manually deleted or the model is deprecated); `File` objects (Files API) are deleted after 48 hours, while data imported into the store persists indefinitely. File Search store names are globally scoped.
- The source File Search page phrases the combination limit as "Built-in grounding tools cannot be combined with one another"; the Google Search / URL context / Maps pages document combinations among those tools, so this restriction is read as applying to File Search.
- Two ingestion paths: `uploadToFileSearchStore` (direct, bypasses File storage) or upload with the Files API then import (`import_file`). The `FileSearchStore` API supports create, list, get, delete; the File Search Documents API supports list, get, delete by name.
- Multimodal File Search: create the store with `models/gemini-embedding-2` to embed text and images. Images must be at most 4K x 4K pixels; PNG and JPEG supported. Image citations carry a persistent `media_id` usable to download the exact chunk (`GET /v1/fileSearchStores/<store>/media/<BlobId>`).
- Citations are in `annotations` of the `model_output` step's content blocks; `file_citation` includes `file_name`, `source`, optionally `page_number` and `custom_metadata`.
- Limitations: not supported in the Live API; File Search cannot be combined with other built-in grounding tools (e.g. Google Search or URL Context) in the same request. Gemini 4 and Gemini 3 models can combine File Search with custom tools (function calling).
- Store size limit is computed on the backend from input plus stored embeddings, typically approximately 3 times the input size.
- Pricing: embeddings charged at indexing time (existing embeddings pricing); storage free; query-time embeddings free; retrieved document tokens charged as regular context tokens.
- Supported file types include application types (e.g. `application/pdf`, `application/json`, `application/msword`, `application/zip`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`) and a long list of `text/*` types (e.g. `text/plain`, `text/markdown`, `text/csv`, `text/html`, `text/x-python`); see the source page for the complete lists.
- Distinct from `upstash` (Vector / Search) and `fandhe-db` (vector query DB) which you operate yourself, and from `anthropic-api-tools-mcp` / `openai-agents` (OpenAI file search tool). The Gemini embedding model behind it is described in multimodal-input embeddings.
- REST example: variables are brace-quoted (`${FILE_SEARCH_STORE_NAME}`) unlike the source, because `$VAR:u...` is a zsh history modifier; the API key is sent as an `x-goog-api-key` header instead of `?key=`.
- The metadata_filter REST example uses the store variable from the create step (quoted) instead of the source's undefined, unquoted `$STORE_NAME`.
- The management snippet is split into stores and documents blocks; `fileSearchStores/myfilesearchstore123` / `documents/sampletxt123` in the documents block are placeholders from the source (store names get a generated suffix); use the generated `file_search_store.name` and document names. The import snippet's polling loop is added from the source's earlier example.
- API surface: Interactions API with v1beta store endpoints (`fileSearchStores`); generateContent version is under `generate-content/` (grounding-tools). Docs fetched 2026-10-16.

## Related

- [tools-overview](./tools-overview.md)
- [tool-combination](./tool-combination.md)
