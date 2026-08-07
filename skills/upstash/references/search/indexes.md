# Indexes

An index groups documents within a Search database; used to organize data or implement multi-tenancy.

## Signature / Usage

```ts
// Indexes are created implicitly on first upsert — no separate create step
const index = client.index("movies")
await index.upsert([ /* ... */ ])

// List all indexes in the database
await client.listIndexes()

// Delete an index
await client.index("foo").deleteIndex()
```

```python
index = client.index("foo")
index.upsert(documents=[ ... ])

client.list_indexes()
client.delete_index("foo")
```

## Notes

- No dedicated create-index endpoint exists; an index is generated automatically the first time documents are upserted into it
- Use a single index when all documents share one search space; use one index per tenant/user for isolated, per-tenant search

## Related

- [getting-started.md](./getting-started.md)
- [upsert.md](./upsert.md)
- [info.md](./info.md)
