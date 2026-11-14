# update

Updates the vector, data, or metadata of an existing vector by ID without re-sending the other fields.

## Signature / Usage

```typescript
await index.upsert({
	id: "1234",
	vector: [0.1, 0.2, 0.3, 0.4, 0.5],
	metadata: {
		title: "Redis"
	}
})

await index.update({
	id: "1234",
	metadata: {
		title: "QStash"
	}
})
```

```python
from upstash_vector import Index

index = Index.from_env()

updated = index.update(
    id="id1",
    metadata={"new": "metadata"},
    data="new-data",
)

print(updated)
```

Patch metadata in Python (JSON Merge Patch):

```python
from upstash_vector import Index
from upstash_vector.types import MetadataUpdateMode

index = Index.from_env()

updated = index.update(
    id="id2",
    metadata={
        "existing-field": "new-value",
        "existing-field-to-delete": None,
        "new-field": "new-value",
    },
    metadata_update_mode=MetadataUpdateMode.PATCH,
)

print(updated)
```

## Options / Props

REST: `POST https://{endpoint}/update/{namespace}` (default namespace when omitted).

| Name | Type | Description |
| --- | --- | --- |
| `id` | `string` | Required. ID of the vector |
| `vector` | `number[]` | Dense vector value (dense and hybrid indexes); must match the index dimension |
| `sparseVector` | `{ indices: number[]; values: number[] }` | Sparse vector value (sparse and hybrid indexes) |
| `data` | `string` | Raw text data; with an embedding-model index the data is embedded and the vector is updated too |
| `metadata` | `object` | Metadata to update to |
| `metadataUpdateMode` | `"OVERWRITE" \| "PATCH"` | `OVERWRITE` replaces the whole metadata; `PATCH` applies RFC 7396 JSON Merge Patch (insert, update or delete fields) |

## Notes

- For hybrid indexes either none or both of `vector` and `sparseVector` must be present; updating only one is not allowed
- Python SDK: `metadata_update_mode=MetadataUpdateMode.PATCH`; pass `namespace="ns"` to target a namespace
- Source: https://upstash.com/docs/vector/sdks/ts/commands/upsert , https://upstash.com/docs/vector/sdks/py/example_calls/update , https://upstash.com/docs/vector/api/endpoints/update (fetched 2026-11-14; no version pin on the site)

## Related

- [upsert.md](./upsert.md)
- [metadata.md](./metadata.md)
- [namespace.md](./namespace.md)
