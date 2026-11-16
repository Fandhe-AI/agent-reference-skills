---
source: https://docs.cloud.google.com/firestore/native/docs/standard-index-overview
---

# Standard edition index overview

Firestore Standard edition uses an index for every query, so query performance depends on the size of the result set and not on the number of items in the database. It maintains two kinds of indexes: automatic (single-field, built by default) and manual (composite, for queries automatic indexes cannot serve).

## Signature / Usage

### Queries served by automatic single-field indexes

```javascript
const stateQuery = citiesRef.where("state", "==", "CA");
const populationQuery = citiesRef.where("population", "<", 100000);
const nameQuery = citiesRef.where("name", ">=", "San Francisco");
```

```javascript
citiesRef.where('country', 'in', ["USA", "Japan", "China"])

// Compound equality queries
citiesRef.where("state", "==", "CO").where("name", "==", "Denver")
citiesRef.where("country", "==", "USA")
         .where("capital", "==", false)
         .where("state", "==", "CA")
         .where("population", "==", 860000)
```

```javascript
citiesRef.where("regions", "array-contains", "west_coast")
// array-contains-any and array-contains use the same indexes
citiesRef.where("regions", "array-contains-any", ["west_coast", "east_coast"])
```

### Queries that need a manual (composite) index

A compound query with a range comparison (`<`, `<=`, `>`, `>=`), or a sort on a different field, needs a manual index. Because the query uses an equality (`==` or `in`) on `country`, the index on `country, population` can use ascending or descending mode for `country`.

```javascript
citiesRef.where("country", "==", "USA").orderBy("population", "asc")
citiesRef.where("country", "==", "USA").where("population", "<", 3800000)
citiesRef.where("country", "==", "USA").where("population", ">", 690000)
// in and == clauses use the same index
citiesRef.where("country", "in", ["USA", "Japan", "China"])
         .where("population", ">", 690000)
```

The same queries with a descending sort (`orderBy("population", "desc")`) need an additional index with `population` descending. To avoid index merging cost, create an index combining `array-contains` / `array-contains-any` with other clauses:

```javascript
citiesRef.where("regions", "array-contains", "east_coast")
         .where("capital", "==", true)

// array-contains-any and array-contains use the same index
citiesRef.where("regions", "array-contains-any", ["west_coast", "east_coast"])
         .where("capital", "==", true)
```

### Collection group indexes

A collection group query that filters or orders results needs an index with collection group scope; one that neither filters nor orders needs none.

```javascript
var landmarksGroupRef = db.collectionGroup("landmarks");

landmarksGroupRef.where("category", "==", "park")
landmarksGroupRef.where("category", "in", ["park", "museum"])
```

### Index merging

For queries with multiple equality clauses and optionally an `orderBy`, Standard edition can merge indexes of simple equality filters. For queries on `category`, `city`, `editors_pick` always sorted by ascending `star_rating`, three indexes suffice: `(category, star_rating)`, `(city, star_rating)`, `(editors_pick, star_rating)`. They also support this additional query:

```javascript
db.collection("restaurants").where("editors_pick", "==", true)
                            .orderBy("star_rating")
```

## Options / Props

### Automatic index defaults

| Field type | Collection-scope indexes created |
|---|---|
| Non-array, non-map field | One ascending, one descending |
| Map field | Ascending and descending for each non-array, non-map subfield; ascending and descending for the whole map value; array-contains for each array subfield; map subfields are indexed recursively |
| Array field | Ascending and descending for the whole array value; one array-contains |
| Collection group scope | Not maintained by default |

### Index modes

| Index mode | Supports |
|---|---|
| Ascending | `<`, `<=`, `==`, `>=`, `>`, `!=`, `in`, `not-in` on the field; ascending sort |
| Descending | `<`, `<=`, `==`, `>=`, `>`, `!=`, `in`, `not-in` on the field; descending sort |
| Array-contains | `array-contains` and `array-contains-any` |
| Vector | `FindNearest` query clauses |

### Query scopes

| Scope | Description |
|---|---|
| Collection | Default. Supports queries returning results from a single collection. |
| Collection group | All collections with the same collection ID. Required for collection group queries that filter or order. |

### Indexing limits

| Limit | Details |
|---|---|
| Maximum number of composite indexes for a database | 200 without billing enabled; 1000 with billing enabled (contact support to request an increase) |
| Maximum number of single-field configurations for a database | 200 without billing enabled; 1000 with billing enabled. One field-level configuration can hold multiple configurations for the same field (for example an exemption and a TTL policy count as one). |
| Maximum number of index entries for each document | 40,000 (sum of single-field and composite index entries) |
| Maximum number of fields in a composite index | 100 |
| Maximum size of an index entry | 7.5 KiB |
| Maximum sum of the sizes of a document's index entries | 8 MiB |
| Maximum size of an indexed field value | 1500 bytes; larger values are truncated and queries involving truncated values may return inconsistent results |

### Exemption best practices

| Case | Description |
|---|---|
| Large string fields | Exempt long string fields you do not query to cut storage costs. |
| High write rates with sequential values | Indexing a sequentially increasing/decreasing field (such as a timestamp) caps the collection at 500 writes per second; exempt the field if you do not query it. |
| TTL fields | The TTL field must be a timestamp. Indexing on TTL fields is enabled by default and can affect performance at higher traffic; add exemptions. |
| Large array or map fields | Can approach the 40,000 index entries per document limit; exempt if not queried. |

## Notes

- An index is defined on a list of fields with an index mode for each field. A document appears in an index only if it has an indexed value set for every field used in the index.
- Automatic and manual indexes were previously called single-field and composite indexes.
- Exemptions override database-wide automatic index settings. Use field path `*` on a collection group to match all its fields (for example disable everything under `comments`, then add exemptions for the needed fields). Map subfields inherit a map's exemption unless they have their own; deleting a subfield exemption reverts to the parent's, or to database-wide settings. An exemption applies only to automatic indexes; an exempted field can still be part of a manual index.
- At most one array field per manual index.
- A missing index makes the query fail with an error that contains a link to create it.
- Indexes apply a final sort on `__name__` (full document path), in the same direction as the last sorted field. To sort by a non-default `__name__` direction you must create that index.
- Index entries count toward the document's 40,000 entry limit; indexes contribute to storage costs (see index entry size in the Firestore storage size docs).
- Source inconsistency: some index tables in the source render garbled (for example the `(or )` placeholders and a repeated field row in the single-field table); the array-contains table names `tags` while the example queries `regions`.
- Firestore pages here describe Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility), distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`). Firebase console and Firebase CLI usage is out of scope except what the source states.
- The source also shows Web samples only for these queries plus index-entry worked examples. Omitted here: its descending-sort query block and the unfiltered `db.collectionGroup("landmarks").get()` example (needs no index).
- Source: https://docs.cloud.google.com/firestore/native/docs/standard-index-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [standard-indexing.md](./standard-indexing.md)
- [enterprise-index-overview.md](./enterprise-index-overview.md)
- [multiple-range-fields.md](./multiple-range-fields.md)
- [query-explain.md](./query-explain.md)
