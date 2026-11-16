---
source: https://docs.cloud.google.com/bigtable/docs/data-types
---

# Data type enforcement in Bigtable

Bigtable stores data of any type, but enforces types for aggregate column families, timestamps, continuous materialized views and structured row keys. Everything else is bytes with unknown encoding that your application encodes and decodes. Parts of this page apply only to the Enterprise Plus edition.

## Signature / Usage

Cells written without type information are stored as bytes with unknown encoding:

```bash
cbt set my-table r1 cf1:c1=test-value1
  cbt set my-table r1 cf1:c1=test-value2
```

```bash
cbt read my-table
```

## Options / Props

### Aggregate types

| Aggregate type | Input type | Encoding |
|----------------|-----------|----------|
| Sum | Int64 | `google.bigtable.v2.Type.Int64.Encoding.BigEndianBytes` |
| Min | Int64 | `google.bigtable.v2.Type.Int64.Encoding.BigEndianBytes` |
| Max | Int64 | `google.bigtable.v2.Type.Int64.Encoding.BigEndianBytes` |
| HLL | Bytes | Zetasketch HLL++ |

### Continuous materialized view value encodings

| Type | Encoding |
|------|----------|
| BOOL | 1 byte value, 1 = true, 0 = false |
| BYTES | No encoding |
| INT64 (or INT, SMALLINT, INTEGER, BIGINT, TINYINT, BYTEINT) | 64-bit big-endian |
| FLOAT64 | 64-bit IEEE 754, excluding NaN and +/-inf |
| STRING | UTF-8 |
| TIME/TIMESTAMP | 64-bit integer, microseconds since the Unix epoch (consistent with GoogleSQL) |

### Timestamp granularity

| Granularity | Behavior |
|-------------|----------|
| Millisecond (default) | Microsecond value with at most millisecond precision, such as `3023483279876000`; user-specified microsecond-precision timestamps are rejected; Bigtable-generated ones are truncated |
| Microsecond | Full microsecond precision such as `3023483279876543`; accepted for user-specified and Bigtable-generated timestamps |

## Notes

- Aggregate: you must specify an aggregation type when creating an aggregate column family. SQL applies types automatically; `ReadRows` returns bytes you must decode. A non-aggregate column family cannot be converted to aggregate; aggregate and standard families cannot mix cell kinds.
- Timestamps are `Int64` microseconds since `1970-01-01 00:00:00 UTC`. Origin is user-specified or Bigtable-generated (client library using the local clock, or server time). Granularity is set when you create the table.
- Microsecond granularity limitations: only the Java client library 2.82.0 or later supports it (other clients fail); Enterprise Plus only; cannot be changed after table creation; no continuous materialized views or logical views on such tables; cannot downgrade Enterprise Plus to Enterprise while such tables exist (delete them first); backups restore only to Enterprise Plus instances.
- Continuous materialized views are read-only; with `ReadRows` you must know each column's type and decode it yourself.
- Structured row keys (Preview): a row key schema defines types and encoding; used by GoogleSQL for Bigtable only (not `ReadRows`); a continuous materialized view has a row key schema by default.
- Unenforced types: use `CAST` in GoogleSQL for Bigtable at query time. `ReadModifyWriteRow` increments assume a 64-bit big-endian signed integer; `TO_VECTOR64` expects concatenated big-endian 64-bit floats; `TO_VECTOR32` expects concatenated big-endian 32-bit floats.
- Bigtable: wide-column NoSQL database, not a relational database; its SQL (GoogleSQL for Bigtable) is not Cloud SQL / Spanner (`gcp-databases-relational`).
- Snippet taken from https://docs.cloud.google.com/bigtable/docs/create-instance-write-data-cbt-cli (the data types page has no code block).
- Source: https://docs.cloud.google.com/bigtable/docs/data-types (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [schema-design.md](./schema-design.md)
- [tables-and-views.md](./tables-and-views.md)
- [garbage-collection.md](./garbage-collection.md)
