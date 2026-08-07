# upsert

Adds new documents to an index or updates existing ones by ID.

## Signature / Usage

```ts
// Single document
await index.upsert([
  {
    id: "star-wars",
    content: { title: "Star Wars", genre: "sci-fi" },
    metadata: { director: "George Lucas" },
  },
])

// Multiple documents
await index.upsert([
  { id: "star-wars", content: { title: "Star Wars" } },
  { id: "inception", content: { title: "Inception" } },
])
```

```python
index.upsert(
    documents=[
        {
            "id": "movie-0",
            "content": {"title": "Star Wars", "genre": "sci-fi"},
            "metadata": {"poster": "https://poster.link/starwars.jpg"},
        },
    ],
)
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string \| number` | Yes | Document identifier |
| `content` | `object` | No | Searchable, filterable fields |
| `metadata` | `object` | No | Non-indexed reference fields |

## Notes

- Returns `'Success'` on completion
- Documents must match the structure defined for the index; upserting with an existing ID overwrites that document
- Updating a document is done by upserting again with the same `id`
- This is Upstash **Search** (document `content`/`metadata`), distinct from `vector/upsert.md` (Upstash **Vector**, dense/sparse vector arrays) in this skill

## Related

- [content-and-metadata.md](./content-and-metadata.md)
- [fetch.md](./fetch.md)
- [delete.md](./delete.md)
- [search.md](./search.md)
