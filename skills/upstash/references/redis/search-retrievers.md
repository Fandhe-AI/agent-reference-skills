# Redis Search — Retrievers ($rrf, $ann, $standard)

A retriever runs one or more queries and returns the top documents. `$rrf` merges retrievers with Reciprocal Rank Fusion, `$ann` searches a `HYBRID` field by meaning, and `$standard` runs one query (used to set a weight inside `$rrf`).

## Signature / Usage

```json
{ "$ann": { "field": "description", "query": "something to block noise on a flight" } }
```

```json
{
  "$rrf": {
    "retrievers": [
      { "description": "noise cancelling headphones" },
      { "$ann": { "field": "description", "query": "noise cancelling headphones" } }
    ]
  }
}
```

```json
{ "$standard": { "query": { "name": "headphones" }, "weight": 2 } }
```

```ts
// Search by meaning within cheap sports products
await index.query({
  filter: {
    $ann: {
      field: "description",
      query: "headphones for running",
      filter: { category: "sports", price: { $lt: 100 } },
    },
  },
});

// Use the most accurate profile, and return keys and scores only
await index.query({
  filter: { $ann: { field: "description", query: "headphones for running", profile: "precise" } },
  select: {},
});
```

```ts
const filter = {
  $rrf: {
    retrievers: [
      { description: "headphones" },
      { $ann: { field: "description", query: "headphones" } },
    ],
    window: 100,
  },
};

// Page 1
await index.query({ filter, limit: 10 });

// Page 2
await index.query({ filter, limit: 10, offset: 10 });
```

```bash
SEARCH.QUERY products '{"$ann": {"field": "description", "query": "headphones for running", "profile": "precise"}}' NOCONTENT
```

## Options / Props

### `$ann`

| Parameter | Description | Default |
|-----------|-------------|---------|
| `field` | Required. The `HYBRID` field to search | |
| `query` | Required. The text to search for; cannot be empty | |
| `profile` | Accuracy and speed trade-off: `fast`, `balanced`, or `precise` | `balanced` |
| `filter` | A query object; only matching documents are returned (does not change scores) | No filter |
| `weight` | Number `>= 0`; scales its contribution to the `$rrf` score. Valid only inside `$rrf` | `1` |

### `$rrf`

| Parameter | Description | Default |
|-----------|-------------|---------|
| `retrievers` | Required. 2 to 10 retrievers; each entry is a query object, a `$standard`, or an `$ann` | |
| `rankConstant` | Integer `1` to `2147483647`; higher values give lower-ranked results more influence | `60` |
| `window` | Integer `1` to `11000`; results each retriever contributes and the maximum number of merged results | `LIMIT` |

### `$standard`

| Parameter | Description | Default |
|-----------|-------------|---------|
| `query` | Required. A query object | |
| `weight` | Number `>= 0`; scales its contribution to the `$rrf` score. Valid only inside `$rrf` | `1` |

### Query options with retrievers

| Option | With `$rrf` | With `$ann` at the root |
|--------|-------------|-------------------------|
| `ORDERBY` | Not supported | Not supported |
| `SCOREFUNC` | Supported; changes full-text scores before merging, not `$ann` results | Not supported |
| `HIGHLIGHT` | Supported | Not supported |

## Notes

- Since `@upstash/redis` 1.41.0 and the October 2026 Upstash Redis changelog; retrievers need `HYBRID` fields only for `$ann` (`$rrf` of plain full-text queries works without them)
- A retriever must be the only key of its object. Use it at the root of the query in `SEARCH.QUERY` / `SEARCH.COUNT` / `SEARCH.AGGREGATE`, or as an entry of `$rrf` `retrievers`. It cannot be used inside `$must` / `$should` / `$mustNot` or an `$ann` filter, and `$rrf` cannot nest inside `$rrf`
- `$rrf` scoring: each retriever that returns a document adds `weight / (rankConstant + rank)` (rank starts at `1`). Scores are small; compare only within one query. A weight of `0` keeps the documents but adds nothing to their score. Wrap a query object in `$standard` to weight it; `$ann` takes `weight` directly. A plain query object equals `$standard` without a weight
- `$ann` results are ordered by similarity with scores between `0` and `1` (higher is closer). There is no score threshold: it returns up to `LIMIT` documents even when they are not similar. The search is approximate, so `OFFSET` paging with `$ann` can overlap or miss documents. Embeddings are updated before the full-text index, so `$ann` can return a fresh document before text queries find it; `SEARCH.WAITINDEXING` waits for both
- Paging with `$rrf`: `window` sets the depth; without it `window` equals `LIMIT` (default `10`), `LIMIT` cannot exceed `window`, set `window` to use `OFFSET`, and a page starting at or after `window` is empty. Keep the same `window` on every page
- `SEARCH.COUNT` and `SEARCH.AGGREGATE` accept `$rrf` only without an `$ann` retriever; they use every document matching any of the queries (`window` and `weight` do not apply, so a count can exceed the number of `SEARCH.QUERY` results). They do not support `$ann`
- `$standard` at the root supports all query options, like a plain query
- Source: https://upstash.com/docs/redis/search/retrievers/overview, https://upstash.com/docs/redis/search/retrievers/ann, https://upstash.com/docs/redis/search/retrievers/rrf, https://upstash.com/docs/redis/search/retrievers/standard (fetched 2026-11-14; no version pin on the site)
- Source: https://github.com/upstash/redis-js/releases (1.41.0 release notes, checked 2026-11-14)

## Related

- [Redis Search: Hybrid Search](./search-hybrid-search.md)
- [Redis Search: Querying](./search-querying.md)
- [Redis Search: Query Operators](./search-query-operators.md)
- [Redis Search: Aggregations](./search-aggregations.md)
