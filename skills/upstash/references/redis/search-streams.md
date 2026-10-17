# Redis Search — Searchable Streams

Index and search individual Redis stream entries: each entry becomes a separate search document whose ID is the stream entry ID.

## Signature / Usage

```ts
import { Redis, s } from "@upstash/redis";

const redis = Redis.fromEnv();

const index = await redis.search.createIndex({
  name: "event-search",
  dataType: "stream",
  stream: "events", // exact stream key, in place of `prefix`
  schema: s.object({
    message: s.string(),
    service: s.keyword(),
    severity: s.number("U64"),
    occurredAt: s.date().fast(),
  }),
});

await redis.xadd("events", "1-0", {
  message: "Payment authorization failed",
  service: "checkout",
  severity: 4,
  occurredAt: "2026-08-24T09:30:00Z",
});

await index.waitIndexing();

const results = await index.query({
  filter: { message: "authorization", severity: { $gte: 3 } },
  select: { message: true, service: true, severity: true },
});
// [{ key: "1-0", score, data: { message, service, severity } }]
```

```bash
SEARCH.CREATE event-search ON STREAM events SCHEMA message TEXT service KEYWORD severity U64 FAST occurredAt DATE FAST
SEARCH.CREATE event-search SKIPINITIALSCAN ON STREAM events SCHEMA message TEXT severity U64 FAST
SEARCH.CREATE event-search ON STREAM events SCHEMA description TEXT FROM message severity U64 FAST
```

## Options / Props

Schema value conversion (stream values are stored as strings):

| Field type | Required value format |
|------------|-----------------------|
| `U64`, `I64`, `F64` | Corresponding numeric format |
| `BOOL` | `true` or `false` |
| `DATE` | RFC 3339 timestamp, e.g. `2026-08-24T09:30:00Z` |
| `TEXT`, `KEYWORD`, `FACET` | String |

Stream change to index change:

| Stream change | Search index change |
|---------------|---------------------|
| `XADD` | Adds a document for the new entry. Entries removed by an `XADD` trim are removed too. |
| `XDEL`, `XDELEX`, `XACKDEL` | Removes the documents for deleted entries. |
| `XTRIM` | Removes the documents for trimmed entries. |
| `DEL`, `UNLINK`, or expiration of the stream key | Removes all documents but keeps the index definition. |

## Notes

- A stream index is bound to one exact stream key; `PREFIX` is not supported. Only one search index can be bound to a stream at a time; drop the existing index with `SEARCH.DROP` to bind a different one.
- The stream does not need to exist at index creation; later entries are indexed automatically. Creating an index scans existing entries unless `SKIPINITIALSCAN` is given.
- Stream payloads are flat field-value pairs, so schema fields refer to stream fields, not nested paths. Only schema fields are searchable.
- Missing fields, empty values, and unconvertible values are omitted from the indexed document; an entry with no valid schema fields is not added to the index.
- `TEXT`, `KEYWORD`, `U64`, `I64`, `F64`, and `DATE` accept JSON-encoded arrays (e.g. `service '["checkout","payments"]'`); the returned value is the original JSON-encoded string. `BOOL` and `FACET` do not support arrays.
- With `FROM`, queries use the schema name (`description`) while `SELECT` and returned content use the stream field name (`message`).
- Raw responses return field values as strings. The TypeScript SDK deserializes numeric values (`severity` is `4`); the Python SDK keeps `"4"`. Use `XRANGE events 1-0 1-0` to read the original entry.
- Index updates are asynchronous; use `SEARCH.WAITINDEXING` when a query must include preceding writes.
- The search document limit applies to stream entries: at the limit, `XADD` can return an error instead of adding the entry. Delete or trim entries first.
- `RENAME`, `RENAMENX`, and `COPY` are not supported for stream keys. Consumer-group operations that do not change entry data (e.g. `XACK`) do not change the index.
- Filtering, highlighting, sorting, pagination, and score functions work with stream indexes.
- Source: https://upstash.com/docs/redis/search/streams (fetched 2026-10; no version pin on the site).

## Related

- [Redis Search: Index Management](./search-index-management.md)
- [Redis Search: Schema Definition](./search-schema-definition.md)
- [Redis Search: Querying](./search-querying.md)
- [Redis Search: Aggregations](./search-aggregations.md)
