---
source: https://docs.cloud.google.com/bigtable/docs/schema-design
---

# Schema design best practices

An effective Bigtable schema maximizes read and write throughput, prevents hotspots and scales storage efficiently. A Bigtable schema is defined by application logic rather than by a schema definition object: column families are added when you create or update a table, while columns and row key patterns are defined by the data you write. Design the schema for the queries you plan to use; row range reads (usually by row key prefix) are the fastest way to read.

## Signature / Usage

### Row key examples

Device type, device ID and day in the key allow one request for a device type, or for a device type plus device ID. A request for one day needs a full scan with a filter (the day is a suffix).

```text
phone#4c410523#20200501
phone#4c410523#20200502
tablet#a0b81f74#20200501
tablet#a0b81f74#20200502
```

Row keys that start with a common value and end with a granular value sort by low-cardinality values first (in production, use compact identifiers such as `AS` for Asia or `591` for Bolivia).

```text
asia#india#bangalore
asia#india#mumbai
asia#japan#osaka
asia#japan#sapporo
southamerica#bolivia#cochabamba
southamerica#bolivia#lapaz
southamerica#chile#santiago
southamerica#chile#temuco
```

### Multi-tenancy with row key prefixes

One table for all tenants is the most efficient layout. When a tenant leaves, drop the range of rows with its prefix (`DropRowRange`).

```text
altostrat#phone#4c410523#20190501
altostrat#phone#4c410523#20190502
altostrat#tablet#a0b41f74#20190501
examplepetstore#phone#4c410523#20190502
examplepetstore#tablet#a6b81f79#20190501
examplepetstore#tablet#a0b81f79#20190502
```

### Domain names

Reverse domain names group related rows (`com.google.drive`, `com.google.maps`, `org.wikipedia.en`) so they can be read as a range and compress better. If you store data for only one or a few domains, use other row key values to avoid hotspots.

### Frequently updated values

Do not update one row key repeatedly (for example `4c410523#memusage`). Write each reading to a new row:

```text
4c410523#memusage#1423523569918
```

## Options / Props

| Element | Recommendation / limit |
|---------|------------------------|
| Tables per instance | Limit 1,000; avoid creating many tables; store similar datasets in one table with a row key prefix per dataset |
| Column families per table | Up to about 100; more may degrade performance; use short names |
| Columns | Millions per table are fine (sparse), but avoid too many in a single row; column qualifier maximum size 16 KB |
| Row size | Keep all values in a row under 100 MB; row must not exceed 256 MB |
| Cell size | Do not store more than 10 MB in a single cell |
| Row key size | 4 KB or less; keep keys short |
| Garbage collection | Set per column family, not per column; separate columns with different retention needs into different families |
| Integers in row keys | Pad with leading zeroes so lexicographic order equals numeric order |
| Timestamps in row keys | Never alone or at the start (hotspot); precede with a high-cardinality value; reversed timestamp = max long value minus timestamp |

### Row keys to avoid

| Pattern | Problem |
|---------|---------|
| Key starting with a timestamp | Sequential writes go to a single node (hotspot) |
| Related data not grouped | Non-contiguous ranges are inefficient to read together |
| Sequential numeric IDs | Traffic concentrates on few nodes; use a reversed ID instead |
| Frequently updated identifiers | Overloads the tablet and can exceed row size limit |
| Hashed values | Loses sort order; hard to use with Key Visualizer |
| Raw bytes in keys | Use human-readable strings for troubleshooting |

## Notes

- Bigtable is a key/value store: no joins, and transactions only within a single row. All operations are atomic at the row level. Row keys sort lexicographically (big-endian byte order); column families have no stored order; columns sort lexicographically within a family.
- For a secondary index use a continuous materialized view (asynchronous secondary index).
- Structured row keys (Preview) let GoogleSQL for Bigtable decode multi-part keys through a row key schema; row key schemas are ignored by Data API `ReadRows`. Structured row keys are created automatically for continuous materialized views.
- Aggregate column families hold aggregate cells that merge new data into the cell.
- Avoid PII or user data in row keys or column family IDs unless required: both are customer data and service data and may be exposed through encryption or logging.
- To store many fields as one value, group them in a protobuf message in a single column (schema bundles enable server-side GoogleSQL querying; Avro schemas are Preview).
- The source diagrams and the `DropRowRange` RPC link are omitted; the source contains no gcloud or client library code.
- Bigtable: wide-column NoSQL database, not a relational database; its SQL (GoogleSQL for Bigtable) is not Cloud SQL / Spanner (`gcp-databases-relational`).
- Source: https://docs.cloud.google.com/bigtable/docs/schema-design (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [schema-design-steps.md](./schema-design-steps.md)
- [schema-design-time-series.md](./schema-design-time-series.md)
- [garbage-collection.md](./garbage-collection.md)
- [data-types.md](./data-types.md)
