# Vector Stores (Retrieval API)

The Retrieval API performs semantic search over your data — surfacing semantically similar results even with few or no matching keywords. Vector stores are the indices (containers) that power semantic search for the Retrieval API and the `file_search` tool; adding a file chunks, embeds, and indexes it automatically.

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()

vector_store = client.vector_stores.create(
    name="Support FAQ",
)

client.vector_stores.files.upload_and_poll(
    vector_store_id=vector_store.id,
    file=open("customer_policies.txt", "rb")
)
```

Semantic search with the `search` function and a natural-language `query` (returns results with relevant chunks, similarity scores, and file of origin):

```python
results = client.vector_stores.search(
    vector_store_id=vector_store.id,
    query="How many woodchucks are allowed per passenger?",
)
```

Setting file attributes:

```python
client.vector_stores.files.create(
    vector_store_id="<vector_store_id>",
    file_id="file_123",
    attributes={
        "region": "US",
        "category": "Marketing",
        "date": 1672531200      # Jan 1, 2023
    }
)
```

Comparison and compound filters (attribute filtering):

```json
{
  "type": "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "nin",  // comparison operators
  "key": "attributes_key",                           // attributes key
  "value": "target_value"                             // value to compare against
}
```

```json
{
  "type": "and" | "or",                                // logical operators
  "filters": [...]
}
```

Expiration policy:

```python
client.vector_stores.update(
    vector_store_id="vs_123",
    expires_after={
        "anchor": "last_active_at",
        "days": 7
    }
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `query` | string | Natural-language search query; `rewrite_query=true` rewrites it for better results (result's `search_query` field holds the rewrite) |
| `filters` | comparison / compound filter | Narrow results by file `attributes` before semantic search |
| `ranking_options.ranker` | `auto` \| `default-2024-08-21` | Ranker |
| `ranking_options.score_threshold` | `0.0`–`1.0` | Higher limits results to more relevant chunks, possibly excluding useful ones |
| `ranking_options.hybrid_search` | object | `embedding_weight` (`rrf_embedding_weight`) and `text_weight` (`rrf_text_weight`) tune reciprocal rank fusion between semantic embedding and sparse keyword matches; at least one weight must be greater than zero |
| `max_chunk_size_tokens` | `number` | Default `800`; must be between 100 and 4096 inclusive |
| `chunk_overlap_tokens` | `number` | Default `400`; must be non-negative and should not exceed `max_chunk_size_tokens / 2` |
| `attributes` | object | Per-file metadata on a `vector_store.file`; at most 16 keys, keys up to 64 characters, string values up to 512 characters |
| `expires_after` | `{anchor, days}` | Expiration policy on a vector store |

## Notes

- Vector stores back the `file_search` built-in tool — see [File Search](./file-search.md) for the tool-invocation shape (`vector_store_ids`, `filters`).
- Objects: `file` (uploaded via the Files API), `vector_store` (container for searchable files), `vector_store.file` (a `file` that has been chunked, embedded, and associated with a store; carries the `attributes` map).
- Operations covered by the official guide: create, retrieve, update, delete, list vector stores; create / upload-and-poll / retrieve / update / delete / list vector store files; file batches (create, retrieve, cancel, list files).
- Pricing: storage across all vector stores is free up to 1 GB, then $0.10/GB/day. Once a vector store expires, its `vector_store.file` objects are deleted and no longer charged.
- Limits: maximum file size 512 MB; each file no more than 5,000,000 tokens (computed on attach). Supported types (`text/` MIME types must be `utf-8`, `utf-16`, or `ascii`): `.c`, `.cpp`, `.cs`, `.css`, `.doc`, `.docx`, `.go`, `.html`, `.java`, `.js`, `.json`, `.md`, `.pdf`, `.php`, `.pptx`, `.py`, `.rb`, `.sh`, `.tex`, `.ts`, `.txt`.
- Ranking: `ranker` and `score_threshold` improve relevance when file search results are not relevant enough.
- The guide also shows synthesizing responses from search results by passing them to a model.
- Source: https://developers.openai.com/api/docs/guides/retrieval (fetched 2026-11-14).

## Related

- [File Search](./file-search.md)
