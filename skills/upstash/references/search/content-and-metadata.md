# Content and Metadata

`content` holds the searchable, filterable fields of a document; `metadata` holds extra context that is not indexed for search.

## Signature / Usage

```ts
await index.upsert([
  {
    id: "star-wars",
    // searchable and filterable
    content: { title: "Star Wars", genre: "sci-fi", category: "classic" },
    // not searchable, for reference only
    metadata: { director: "George Lucas" },
  },
])
```

```python
index.upsert(
    documents=[
        {
            "id": "star-wars",
            "content": {"text": "Star Wars is a sci-fi space opera."},
            "metadata": {"genre": "sci-fi"},
        }
    ]
)
```

## Options / Props

| Field | Required | Format | Indexed for search | Filterable |
|-------|----------|--------|---------------------|------------|
| `content` | Yes | JSON object | Yes | Yes |
| `metadata` | No | JSON object | No | No |

## Notes

- Use `content` for fields users need to search or filter by (title, description, tags)
- Use `metadata` for display/reference-only data not meant to be searched (SKU, internal IDs, warehouse location)

## Related

- [upsert.md](./upsert.md)
- [filtering.md](./filtering.md)
