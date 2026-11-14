# Redis Search — Hybrid Search

Combine full-text and semantic search: `HYBRID` fields store an embedding next to the text, `$ann` searches them by meaning, and `$rrf` merges several result lists into one.

## Signature / Usage

```ts
import { Redis, s } from "@upstash/redis";

const redis = Redis.fromEnv();

const index = await redis.search.createIndex({
  name: "products",
  dataType: "json",
  prefix: "product:",
  schema: s.object({
    name: s.string(),
    description: s.hybrid(),
    category: s.keyword(),
    price: s.number("F64"),
  }),
});
```

```ts
await index.query({
  filter: { $ann: { field: "description", query: "block noise on a flight" } },
});

// Search by meaning within one category
await index.query({
  filter: {
    $ann: { field: "description", query: "headphones for running", filter: { category: "sports" } },
  },
});
```

```ts
await index.query({
  filter: {
    $rrf: {
      retrievers: [
        { description: "noise cancelling" },
        { $ann: { field: "description", query: "noise cancelling" } },
      ],
    },
  },
});
```

```ts
await index.query({
  filter: {
    $rrf: {
      retrievers: [
        { $standard: { query: { description: "noise cancelling" }, weight: 2 } },
        { $ann: { field: "description", query: "noise cancelling" } },
      ],
    },
  },
});
```

```bash
SEARCH.CREATE products ON JSON PREFIX 1 product: SCHEMA name TEXT description HYBRID category KEYWORD price F64 FAST
SEARCH.QUERY products '{"$ann": {"field": "description", "query": "block noise on a flight"}}'
SEARCH.QUERY products '{"$rrf": {"retrievers": [{"description": "noise cancelling"}, {"$ann": {"field": "description", "query": "noise cancelling"}}]}}'
```

## Options / Props

| Part | Description |
|------|-------------|
| `HYBRID` field (`s.hybrid()`) | A `TEXT` field that also stores a vector embedding; full-text queries work as on `TEXT`, `$ann` searches the embeddings |
| `$ann` | Semantic search retriever on a `HYBRID` field |
| `$rrf` | Merges 2 to 10 retrievers with Reciprocal Rank Fusion |
| `$standard` | Wraps one query so it can take a `weight` inside `$rrf` |

## Notes

- Since `@upstash/redis` 1.41.0 (hybrid search): `s.hybrid()` defines the field and `query()` accepts `$ann`, `$rrf` and `$standard`; `count()` and `aggregate()` accept `$rrf` / `$standard` without `$ann` (release notes). The feature was announced in the October 2026 changelog
- An index can have several `HYBRID` fields. If a document's text cannot be embedded it is still searchable by text. `HYBRID` fields work with JSON, hash, string and stream indexes
- You do not create vectors yourself and need no embedding provider, API key or separate vector database: on write, Search sends the text of `HYBRID` fields to an OpenAI embedding model (`text-embedding-3-small` or `text-embedding-3-large`) in the background and stores the vectors; `$ann` embeds the query text with the same model
- Privacy: the text of `HYBRID` fields and of `$ann` queries is sent to OpenAI. Use `TEXT` instead of `HYBRID` for content that must not go to a third party
- Pricing: hybrid search has no extra cost, embeddings are included, and commands are billed like all other Redis commands
- After writes, call `await index.waitIndexing()` (`SEARCH.WAITINDEXING`); it waits for both the embeddings and the full-text index
- This is a Redis Search feature on `HYBRID` text fields, separate from the Vector commands (`VECTOR.*`, see Commands: Vector) and from the Upstash Vector product
- Source: https://upstash.com/docs/redis/search/hybrid-search (fetched 2026-11-14; no version pin on the site)
- Source: https://github.com/upstash/redis-js/releases (1.41.0 release notes, checked 2026-11-14)

## Related

- [Redis Search: Retrievers](./search-retrievers.md)
- [Redis Search: Schema Definition](./search-schema-definition.md)
- [Redis Search: Querying](./search-querying.md)
- [Commands: Vector](./commands-vector.md)
