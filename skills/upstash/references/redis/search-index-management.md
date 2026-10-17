# Redis Search — Index Management

Create, describe, list, and drop indexes; manage aliases; count matches; wait for indexing; and how document writes keep the index in sync.

## Signature / Usage

```ts
import { Redis, s } from "@upstash/redis";

const redis = Redis.fromEnv();

// Create once (e.g. in a setup script)
const users = await redis.search.createIndex({
  name: "users",
  dataType: "json",
  prefix: "user:",
  schema: s.object({ name: s.string(), email: s.string(), age: s.number() }),
});

// Client for an existing index (no Redis call)
const idx = redis.search.index({ name: "users" });

await idx.describe();      // IndexDescription | null
await idx.waitIndexing();  // 1 | 0
await idx.count({ filter: { age: { $lt: 30 } } });
await idx.drop();          // 1 | 0

// Aliases
await redis.search.alias.add({ indexName: "products-v2", alias: "products" });
await redis.search.alias.delete({ alias: "products" });
await redis.search.alias.list(); // { "products": "products-v2" }
```

```bash
SEARCH.CREATE users ON JSON PREFIX 1 user: SCHEMA name TEXT email TEXT age u64
SEARCH.DESCRIBE users
SEARCH.LISTINDEXES MATCH 'product*' LIMIT 10 OFFSET 0
SEARCH.WAITINDEXING users
SEARCH.COUNT products '{"category": "electronics"}'
SEARCH.ALIASADD products products-v2
SEARCH.ALIASDEL products
SEARCH.LISTALIASES
SEARCH.DROP users
```

## Options / Props

`createIndex` options:

| Option (TS / CLI) | Description |
|-------------------|-------------|
| `name` | Unique index name (a unique key in Redis) |
| `dataType` / `ON` | `json`, `hash`, `string`, or `stream` |
| `prefix` / `PREFIX n ...` | One prefix or an array of prefixes (not for stream) |
| `stream` / `ON STREAM <key>` | Exact stream key (stream indexes only) |
| `schema` / `SCHEMA` | Field definitions |
| `skipInitialScan` / `SKIPINITIALSCAN` | Do not index existing keys at creation |
| `language` / `LANGUAGE` | Tokenizer / stemmer language, default `english` |
| `existsOk` / `EXISTSOK` | Create only if the index does not already exist |

`SEARCH.DESCRIBE` response fields:

| Field | Description |
|-------|-------------|
| `name` | Index name |
| `type` | `STRING`, `HASH`, `JSON`, or `STREAM` |
| `prefixes` | Tracked key prefixes, or the bound key for a stream index |
| `language` | Stemming language |
| `schema` | Field definitions with types and options |

Supported languages: `english`, `arabic`, `danish`, `dutch`, `finnish`, `french`, `german`, `greek`, `hungarian`, `italian`, `norwegian`, `portuguese`, `romanian`, `russian`, `spanish`, `swedish`, `tamil`, `turkish`.

Return values: `ALIASADD` returns `1` (created) or `2` (existing alias updated); `ALIASDEL` returns `1` or `0` (not found); `DROP` and `WAITINDEXING` return `1` or `0` (index not found).

## Notes

- Create an index once (for example in a one-off script), not at runtime inside a serverless function.
- JSON indexes allow nested fields; hash indexes only top-level fields; string indexes require valid JSON strings and allow nesting; stream indexes treat each entry as a document with flat fields.
- Multiple prefixes: no duplicates, and no prefix may cover another (`user:` with `user:admin:` is not allowed); distinct prefixes such as `article:` and `blog:` are fine.
- `redis.search.index()` only builds a client (no Redis call); its `schema` argument gives TypeScript type safety only and is not validated against the server-side schema. `createIndex()` makes a Redis call and errors if the index exists unless `existsOk` is set.
- Dropping an index removes only the search index; underlying Redis keys are untouched.
- Index updates are batched; recent writes may not be visible immediately. `SEARCH.WAITINDEXING` blocks until pending updates are visible. Do not call it after every write; use it mainly in tests and CI.
- Aliases support zero-downtime reindexing: create `products-v2`, `waitIndexing()`, swap the alias with `alias.add`, then drop the old index. The index method form is `index.addAlias({ alias: "products" })`.
- Document updates: there is no separate update command. Any write that changes indexed data updates the index: `JSON.SET` / `JSON.MERGE`, `HSET` / `HINCRBY`, `SET` / `SETEX`, `XADD` / `XDEL` / `XTRIM`, `DEL` / `EXPIRE` / `PEXPIRE`, and so on. Deleted, expired, or evicted keys are removed from the index. For stream indexes, deleting or expiring the whole stream clears its documents but keeps the index definition.
- Python equivalents: `redis.search.create_index(name=..., data_type=..., prefix=..., schema=schema, skip_initial_scan=True, exists_ok=True)`, `index.wait_indexing()`, `index.add_alias(alias=...)`, `redis.search.alias.add(index_name=..., alias=...)`.
- Source: https://upstash.com/docs/redis/search/index-management, /aliases, /counting, /document-updates (fetched 2026-10; no version pin on the site).

## Related

- [Redis Search: Schema Definition](./search-schema-definition.md)
- [Redis Search: Querying](./search-querying.md)
- [Redis Search: Searchable Streams](./search-streams.md)
- [Redis Search: Getting Started](./search-getting-started.md)
