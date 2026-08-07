# Vector Stores (Retrieval API)

The Retrieval API performs semantic search over your data — surfacing semantically similar results even with few or no matching keywords. Vector stores are the knowledge bases the `file_search` tool searches against.

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

Setting file attributes:

```python
client.vector_stores.files.create(
    vector_store_id="<vector_store_id>",
    file_id="file_123",
    attributes={
        "region": "US",
        "category": "Marketing",
        "date": 1672531200
    }
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `max_chunk_size_tokens` | `number` | Default `800`; must be between 100 and 4096 inclusive |
| `chunk_overlap_tokens` | `number` | Default `400`; must be non-negative and should not exceed `max_chunk_size_tokens / 2` |
| `attributes` | object | Per-file metadata for filtering; at most 16 keys, 256 characters each |

## Notes

- Vector stores back the `file_search` built-in tool — see [File Search](./file-search.md) for the tool-invocation shape (`vector_store_ids`, `filters`).

## Related

- [File Search](./file-search.md)
