# Metadata and Data

Per-vector context stored alongside vectors. Metadata is structured (JSON) and can be used to filter queries; data is unstructured (typically raw text) and can only be returned, not filtered on.

## Signature / Usage

```ts
import { Index } from "@upstash/vector"

const index = new Index({
  url: "UPSTASH_VECTOR_REST_URL",
  token: "UPSTASH_VECTOR_REST_TOKEN",
})

// Set metadata and/or data on upsert
await index.upsert([
  {
    id: "id-0",
    vector: [0.9215, 0.3897],
    metadata: { url: "https://imgur.com/z9AVZLb" },
    data: "data-0",
  },
  {
    id: "id-1",
    vector: [0.3897, 0.9215],
    data: "data-1",
  },
])

// Opt in to retrieve metadata, and filter on it
await index.query({
  vector: [0.9215, 0.3897],
  topK: 5,
  includeMetadata: true,
  filter: "url GLOB '*imgur.com*'",
})

// Raw text upsert: data is set to the raw text automatically
await index.upsert([
  { id: "id-2", data: "Upstash is a serverless data platform." },
])

// Opt in to retrieve data
const result = await index.query({
  data: "What is Upstash?",
  includeData: true,
  topK: 3,
})
```

REST equivalents (query with metadata, range with metadata, raw text upsert):

```shell
curl "${UPSTASH_VECTOR_REST_URL}/query" \
  -H "Authorization: Bearer ${UPSTASH_VECTOR_REST_TOKEN}" \
  -d '{
   "vector":[0.9215,0.3897],
   "topK" : 5,
   "includeMetadata": true
}'

curl "${UPSTASH_VECTOR_REST_URL}/range" \
  -H "Authorization: Bearer ${UPSTASH_VECTOR_REST_TOKEN}" \
  -d '{ "cursor" : "0",  "limit" : 3, "includeMetadata": true}'

curl "${UPSTASH_VECTOR_REST_URL}/upsert-data" \
  -X POST \
  -H "Authorization: Bearer ${UPSTASH_VECTOR_REST_TOKEN}" \
  -d '{
        "id": "id-0",
        "data": "Upstash is a serverless data platform."
      }'
```

Query response with `includeMetadata: true`:

```json
{
  "result": [
    { "id": "id-0", "score": 1, "metadata": { "url": "https://imgur.com/z9AVZLb" } },
    { "id": "id-3", "score": 0.99961007, "metadata": { "url": "https://imgur.com/zfOPmnI" } }
  ]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `metadata` | object | Structured context stored with the vector (upsert). Usable in `filter` |
| `data` | string | Unstructured context stored with the vector (upsert). Not filterable |
| `includeMetadata` / `include_metadata` | boolean | Return metadata in query, fetch, range responses |
| `includeData` / `include_data` | boolean | Return data in query, fetch, range responses |
| `filter` | string | Metadata filter expression, e.g. `url GLOB '*imgur.com*'` |

## Notes

- Metadata uses: keep the vector's source for use from the query response, and further filter query results.
- Data is not structured and can only be fetched, not used to filter queries; useful with raw text upserts to avoid a separate database for context.
- You can set both metadata and data, or only one of them, when upserting.
- Raw text upsert (`data` only): data is set to the raw text automatically.
- Python SDK uses `include_metadata=True` / `include_data=True` and `filter="..."`; Go uses `IncludeMetadata` / `Filter`; PHP uses `VectorQuery` / `DataQuery` / `DataUpsert` / `upsertData`.
- Source: fetched 2026-10 from https://upstash.com/docs/vector/features/metadata (no version pin; site is unversioned).

## Related

- [filtering.md](./filtering.md)
- [upsert.md](./upsert.md)
- [query.md](./query.md)
- [fetch.md](./fetch.md)
- [range.md](./range.md)
