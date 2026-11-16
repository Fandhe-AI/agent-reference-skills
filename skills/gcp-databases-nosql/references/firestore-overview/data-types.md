---
source: https://docs.cloud.google.com/firestore/native/docs/concepts/data-types
---

# Supported data types

Lists the data types Firestore supports, the sort order used when comparing values of the same type, the cross-type ordering for mixed-type fields, and numeric ordering rules.

## Signature / Usage

The page has no code. Maps in ascending sort order, quoted verbatim from the source's Map row (one inline example per line):

```text
{a: "aaa", b: "baz"}
{a: "foo", b: "bar"}
{a: "foo", b: "bar", c: "qux"}
{a: "foo", b: "baz"}
{b: "aaa", c: "baz"}
{c: "aaa"}
```

## Options / Props

### Data types

Types marked (Enterprise) are supported only in Enterprise edition.

| Data type | Sort order | Notes |
|---|---|---|
| 32-bit integer (Enterprise) | Numeric | 32-bit, signed |
| 64-bit integer | Numeric | 64-bit, signed |
| Array | By element values | Standard edition: an array cannot contain another array as an element. Enterprise: it can. Element positions are kept. Arrays compare element by element; a shorter array that is equal up to that point sorts first. For example, `[1, 2, 3] < [1, 2, 3, 1] < [2]`. |
| Boolean | `false` \< `true` | --- |
| BSON timestamp (Enterprise) | Chronological | 64-bit value of Unix seconds and an increment counter |
| Bytes | Byte order | Standard: must not exceed 1,048,487 bytes (1 MiB - 89 bytes) and only the first 1,500 bytes are considered by queries. Enterprise: no limit other than document and index entry size limits; the full value is considered by queries. |
| Bytes with subtype (Enterprise) | Byte order (subtype, then value) | Binary byte sequence with a BSON subtype indicator |
| Date and time | Chronological | Precise only to microseconds; additional precision is rounded down |
| Decimal128 (Enterprise) | Numeric | 128-bit decimal floating-point number |
| Floating-point number | Numeric | 64-bit double precision per IEEE 754, including (normalized) `NaN` \& `+/-Infinity` |
| Geographical point | By latitude, then longitude | For distance search see https://docs.cloud.google.com/firestore/native/docs/geospatial-search |
| Map | By keys, then by value | Embedded object; subfields can be queried when indexed. Excluding a map from indexing excludes all subfields. Keys are always sorted: `{c: "foo", a: "bar", b: "qux"}` is saved as `{a: "bar", b: "qux", c: "foo"}`. Compared by key-value pairs, then by length. |
| Max key (Enterprise) | None | Compares higher than all other values |
| Min key (Enterprise) | None | Compares lower than all other values (except null) |
| Null | None | --- |
| ObjectId (Enterprise) | Byte order | 12-byte object identifier |
| Reference | By path elements | For example `projects/[PROJECT_ID]/databases/[DATABASE_ID]/documents/[DOCUMENT_PATH]` |
| Regular expression (Enterprise) | By pattern, then by options | Pattern and options |
| Text string | UTF-8 encoded byte order | Same size and query-consideration limits as Bytes (Standard 1,048,487 bytes, first 1,500 bytes queried; Enterprise no limit) |
| Vector | By dimension, then element values | Max supported embedding dimension is 2048; use dimensionality reduction for larger vectors |

### Value type ordering (mixed-type fields)

1. Null
2. Min key (Enterprise only)
3. Boolean
4. 64-bit integer and floating-point, in numerical order (Enterprise: also 32-bit integer and Decimal128)
5. Date
6. Text string
7. Bytes (Enterprise: also bytes with subtype)
8. Firestore references
9. ObjectId (Enterprise only)
10. Geographical point
11. Regular expression (Enterprise only)
12. Array
13. Vector embeddings
14. Map
15. Max key (Enterprise only)

## Notes

- Numeric ordering: all numeric values (integer and floating point) are sorted interleaved. Floating-point comparison follows the IEEE 754 total ordering, except that Firestore normalizes all `NaN` values and considers `NaN` less than `-Infinity`.
- Source: https://docs.cloud.google.com/firestore/native/docs/concepts/data-types (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- The `text` block lists the inline map examples from the source's Map row ("the following maps are in ascending order"), one per line; no other change.

## Related

- [data-model.md](./data-model.md)
- [quotas.md](./quotas.md)
- [editions-overview.md](./editions-overview.md)
