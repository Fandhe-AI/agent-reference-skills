# Reranking

Optional AI-powered reordering of search results for higher relevancy, combining semantic and full-text outcomes.

## Signature / Usage

```ts
const searchResults = await index.search({
  query: "space opera",
  limit: 2,
  reranking: true,
})
```

```python
scores = index.search(
    query="space opera",
    limit=2,
    reranking=True,
)
```

## Notes

- Opt-in and billed separately at $1 per 1K re-ranked documents due to computational cost
- Disabled by default (`reranking: false`)

## Related

- [search.md](./search.md)
- [algorithm.md](./algorithm.md)
- [advanced-settings.md](./advanced-settings.md)
