---
source: https://docs.cloud.google.com/firestore/native/docs/query-data/multiple-range-fields
---

# Query with range and inequality filters on multiple fields overview

Firestore supports range and inequality filters on multiple fields in a single query, so post-filtering logic can be delegated to Firestore. Index field order determines how many index entries are scanned.

## Signature / Usage

Cities with population above 1,000,000 and density below 10,000:

Adapted (not in the official docs): the official Node.js sample has a stray comma between chained calls (`.where(...),`) which is a syntax error; the comma is removed.

```javascript
db.collection("cities")
  .where('population', '>', 1000000)
  .where('density', '<', 10000)
```

Employees with salary above 100000 and experience above 0, where salary is the more selective constraint, so `salary` is ordered first (index `(salary [...], experience [...])`):

```javascript
db.collection("employees")
  .where("salary", ">", 100000)
  .where("experience", ">", 0)
  .orderBy("salary")
  .orderBy("experience");
```

A different requirement from the source: to find employees whose salary is more than 100000 and order them by years of experience, when only a small number of employees are expected to match the salary filter, order by the selective field only and reorder client-side (there is no `experience` filter in this query):

```javascript
const querySnapshot = await db.collection('employees')
                              .where("salary", ">", 100000)
                              .orderBy("salary")
                              .get();

// Order results by `experience`
```

## Options / Props

### Limitations

| Limitation | Details |
|---|---|
| Range / inequality fields per query | At most 10 |
| Range or inequality on document fields with only equality on the document key `(__name__)` | Not supported |

### Best practices

| Practice | Details |
|---|---|
| Order index fields by equalities, then the most selective range or inequality field | Firestore uses the leftmost index fields to satisfy equality constraints and the range/inequality on the first `orderBy()` field, which reduce scanned entries. Remaining fields only filter out documents and do not reduce scanned entries. |
| Order fields in decreasing selectivity | Specify an `orderBy()` that orders fields by decreasing selectivity of the constraint; Firestore prefers an index whose fields prefix-match the `orderBy` clause. |

## Notes

- The `ORDER BY` clause determines which indexes serve the query: `ORDER BY a ASC, b ASC` requires a composite index on `a ASC, b ASC`.
- The source says: "If `experience` were added to the order by clause, then Firestore will select the `(experience [...], salary [...])` index" and read all `employees` index entries before applying the `salary` filter. Editorial interpretation, not stated in the source: given the best-practice row above (Firestore prefers an index whose fields prefix-match the `orderBy` clause), this describes ordering by `experience` first; the earlier `.orderBy("salary").orderBy("experience")` example uses the `(salary [...], experience [...])` index.
- Pricing: billed on documents read and index entries read.
- Corrected from the official docs: Node.js sample `.where('population', '>', 1000000),` had a trailing comma after the first call; the Python sample in the source places `.where(...)` lines without line continuation and is omitted. Samples for Web, Swift, Objective-C, Java, Kotlin, Go, PHP, C#, Ruby, C++, Unity and Dart are also omitted. The source cross-references use unresolved reference-style links.
- Firestore pages here describe Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility), distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/native/docs/query-data/multiple-range-fields (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [multiple-range-optimize-indexes.md](./multiple-range-optimize-indexes.md)
- [standard-index-overview.md](./standard-index-overview.md)
- [query-explain.md](./query-explain.md)
