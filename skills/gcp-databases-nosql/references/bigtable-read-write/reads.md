---
source: https://docs.cloud.google.com/bigtable/docs/reads
---

# Reads

Types of Bigtable read requests (single-row, scans, reverse scans, filtered reads), reading from authorized views and continuous materialized views, performance guidance and large-row limits. All reads make the `ReadRows` API call.

## Signature / Usage

### Read a continuous materialized view while it is still populating

By default Bigtable rejects reads from a view that is being created with `FAILED_PRECONDITION` and the error `Materialized view is still creating.` Opt in to incomplete data with the statement-level hint (replace `VIEW_ID` with the view ID):

```sql
SELECT key_part FROM `VIEW_ID` @{allow_incomplete_view=true}
```

### Read a materialized view with ReadRows

For a view defined by the following query, use column family `default` and column qualifier `sum_clicks`:

Adapted (not in the official docs): `GROUP BY sum_clicks` is changed to `GROUP BY _key`; grouping by the alias of the `SUM` aggregate is not a valid grouping key, and `_key` is the only non-aggregated column.

```sql
SELECT
  _key,
  SUM(clicks) AS sum_clicks
FROM
  mytable
GROUP BY
  _key
```

## Options / Props

| Read type | Notes |
|---|---|
| Single-row (point read) | By row key; not compatible with Data Boost. Variations: single row, partial row by columns, multiple rows. |
| Scan | Row key prefix or begin/end row keys; one or many ranges. |
| Reverse scan | Set `ReadRowsRequest` field `reversed` to true (default false). Start point is the prefix, or the end row key for a range (HBase libraries: the start row key). Less efficient than forward; use for short scans (about 50 rows or fewer). Not usable with Data Boost. |
| Filtered read | Filters limit data returned; slower than unfiltered reads and add CPU, but reduce bandwidth. |

Reverse scan client library minimum versions: C++ 2.18.0, Go 1.21.0, Java 2.24.1, HBase client for Java 2.10.0.

Encoding of aggregated values in continuous materialized views:

| Type | Encoding |
|---|---|
| BOOL | 1 byte value, 1 = true, 0 = false |
| BYTES | No encoding |
| INT64 (or INT, SMALLINT, INTEGER, BIGINT, TINYINT, BYTEINT) | 64-bit big-endian |
| FLOAT64 | 64-bit IEEE 754, excluding NaN and +/-inf |
| STRING | UTF-8 |
| TIME/TIMESTAMP | 64-bit integer, microseconds since the Unix epoch (consistent with GoogleSQL) |

| Limit | Value |
|---|---|
| Maximum row size | 256 MB (paginate with `cells per row limit` and `cells per row offset` filters; a write between pages can break atomicity) |
| Maximum `ReadRows` API call size | 512 KB; exceeding it returns `INVALID_ARGUMENT` |
| Recommended row keys per `ReadRows` request | Up to 100 |

## Notes

- Reads are atomic per row: the whole row or none of it is returned unless a partial row is requested. Results stream back in key order.
- Authorized views: reading requires the gcloud CLI or the Bigtable client for Java; supply the authorized view ID with the table ID. Any method calling `ReadRows` or `SampleRowKeys` is supported.
- Data Boost: serverless compute for high-throughput scans without affecting serving traffic; not for single-row reads or reverse scans. Enterprise Plus adds SQL support and HDD / tiered storage access.
- Continuous materialized views are read-only; read with SQL (Bigtable Studio query editor or SQL-capable client libraries) or `ReadRows`. For `ReadRows`, check the defined `_key` column and `_timestamp` column and decode types yourself. Views created on an existing table go through an initial population step. With `allow_incomplete_view=true`, results may be incomplete and aggregates may reflect only some data.
- Performance: restrict the rowset first, then add basic filters (column set, version count), then complex filters. Conditions, interleaves and regex on large values can raise CPU without savings. Avoid hundreds of non-contiguous row keys or ranges in one request; prefer several concurrent requests.
- Corrected from the official docs: the materialized view query ends with `GROUP BY` / `sum_clicks` (the alias of `SUM(clicks)`); it is grouped by `_key` here.
- Garbage collection can take up to a week to remove expired data, so use a timestamp range filter to avoid reading expired cells.
- The source contains no client library samples on this page (they are on the reading-data page, not in this category).
- Bigtable is a wide-column NoSQL database; its SQL (GoogleSQL for Bigtable) is not Cloud SQL / Spanner (`gcp-databases-relational`).
- Source: https://docs.cloud.google.com/bigtable/docs/reads (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [writes.md](./writes.md)
- [writing-data.md](./writing-data.md)
