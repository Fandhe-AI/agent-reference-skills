---
source: https://docs.cloud.google.com/firestore/native/docs/enterprise-index-overview
---

# Enterprise edition index overview

Firestore Enterprise edition does not create any indexes by default. Create indexes for your most common queries to reduce cost and improve performance; each index adds storage cost and write work on indexed fields.

## Signature / Usage

An index contains a collection ID, a list of fields in that collection, and an index mode (ascending, descending or array-contains) per field. It can also enable the sparse or unique option.

Query against an array-contains index, such as `users (tags[*], status ASC)`:

```javascript
// Query for users where 'tags' contains 'news' and 'status' is 'active'
const query = db.collection("users")
  .where("tags", "array-contains", "news")
  .where("status", "==", "active");

// Documents returned by the query:
// [
//   {
//     "id": "alice",
//     "tags": ["news", "tech"],
//     "status": "active"
//   }
// ]
```

Unique index on `tags` (array values): `doc1` is valid to insert, since duplicates within one array are permitted.

```json
{
  "tags": [ "news", "tech", "news", "music" ]
}
```

A second document with an overlapping element fails because `"music"` is already mapped in the index:

```json
{
  "tags": [ "sports", "music" ]
}
```

## Options / Props

### Index features

| Feature | Behavior |
|---|---|
| Ordering | Field order and sort direction uniquely define the index. `country ASC, population DESC` and `population DESC, country ASC` are distinct indexes. Include fields in the same order as the query. |
| Non-sparse (dense, default) | An entry is added for every document in the collection even if it has none of the indexed fields; missing fields are treated as `NULL`. |
| Sparse | Only documents with a value (including null) for at least one indexed field are indexed. Reduces storage cost and can improve performance. |
| Array-contains | At most one `array-contains` field per index. An entry exists only if the array field exists and is a non-empty array (missing, non-array or empty arrays are not indexed). |
| Unique | Rejects inserts and updates that create duplicate index entries; for multiple fields each combination must be unique. Index build fails if existing data has duplicates. |

### Index entries for `users (tags[*], status ASC)`

| Document | `NON-SPARSE` (`DENSE`) | `SPARSE` |
|---|---|---|
| `{ tags: ["news"], status: "active" }` | Indexed | Indexed |
| `{ tags: ["news", "sports"], status: "active" }` | Indexed: one entry per tag | Indexed: one entry per tag |
| `{ tags: ["news", "news"], status: "active" }` | Indexed once (deduplicated) | Indexed once (deduplicated) |
| `{ tags: [null], status: "active" }` | Indexed with `tags: null` | Indexed with `tags: null` |
| `{ tags: ["news"] }` | Indexed with `status: null` | Not indexed (missing `status`) |
| `{ tags: "news", status: "active" }` / `{ tags: null, ... }` | Not indexed (not an array) | Not indexed (not an array) |
| `{ status: "active" }` | Not indexed (missing `tags`) | Not indexed |
| `{ tags: [], status: "active" }` | Not indexed (empty array) | Not indexed |

## Notes

- For indexes with an `array-contains` field, density rules apply only to the remaining ordered indexed fields, and only if the non-empty array requirement is met.
- Unique indexes: a missing field is stored as `null` and the resulting entry must be unique (adding `{"abbreviation": "LA"}` then `{"abbreviation": "NYC"}` to a unique index on `name` fails the second write). A unique `array-contains` index prohibits overlapping elements across documents but does not enforce uniqueness within one array; enforce that in application logic.
- For unique array indexes, empty arrays, missing fields and standalone `null` generate no index keys, so multiple documents may have them. A `null` element inside an array (for example `["news", null]`) is indexed, so a later document with a `null` element fails with a duplicate key error.
- Index build errors happen when an index limit is reached (retry if no limit was reached) or when the unique option would create duplicate entries (remove duplicate value combinations first). Warning from the source: an ongoing index building error might impact creation of new indexes; resolve errors before creating indexes under the same collection.
- Firestore pages here describe Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility), distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/native/docs/enterprise-index-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [enterprise-indexing.md](./enterprise-indexing.md)
- [standard-index-overview.md](./standard-index-overview.md)
- [understanding-core-pipelines.md](./understanding-core-pipelines.md)
