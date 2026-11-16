---
source: https://docs.cloud.google.com/bigtable/docs/writes
---

# Writes

Types of Bigtable write requests (simple, increment/aggregate, append, conditional, batch), when to use or avoid each, authorized view writes, replication behavior and conflict resolution. Some features require the Enterprise Plus edition.

## Signature / Usage

### Mutation components

Every write request includes the table name, an app profile ID, and one or more mutations. Each mutation has a column family name, column qualifier, timestamp and value. An increment (`AddToCell`) with the `cbt` CLI:

Adapted (not in the official docs): the template is joined into one command line (the source breaks it without `\`) and the placeholder typo `COLUMN_QUALIFER` is corrected to `COLUMN_QUALIFIER`.

```bash
cbt addtocell TABLE_ID ROW_KEY FAMILY_NAME:COLUMN_QUALIFIER=VALUE@TIMESTAMP
```

## Options / Props

| Write type | API request | Key facts |
|---|---|---|
| Simple write | `MutateRow` | One row, up to 100,000 mutations; atomic. Use for multiple mutations to one row. |
| Increment / aggregate | `MutateRow` with `AddToCell` / `MergeToCell` (or a deletion mutation) | Works on aggregate cells: Sum, Minimum, Maximum, HyperLogLog (HLL). |
| Append | `ReadModifyWriteRow` | Rules applied in order, atomic, never retried. Increment only for 64-bit big-endian signed integers; empty or missing value counts as zero. |
| Conditional write | `CheckAndMutateRow` | Row key + row filter; up to 100,000 true mutations and 100,000 false mutations, at least one required. Atomic. |
| Batch write | `MutateRows` | Up to 100,000 entries and up to 100,000 mutations across all entries. Each entry is atomic; the request as a whole is not. |

| Topic | Limit / rule |
|---|---|
| Default timestamp | Current time since the Unix epoch. |
| Timestamp precision | Microsecond value with at most millisecond precision by default. Values with microsecond precision (such as `3023483279876543`) are rejected unless the table has microsecond timestamp granularity (Enterprise Plus only). |
| Mutation timestamps | All mutations in one request share a timestamp unless overridden. |
| Conditional write permissions | `bigtable.tables.readRows` and `bigtable.tables.mutateRows` on the table, or `bigtable.authorizedViews.readRows` and `bigtable.authorizedViews.mutateRows` on an authorized view. |
| Authorized view writes | Only via gcloud CLI or the Bigtable client for Java. Supply the authorized view ID with the table ID. Writes or condition checks outside the view definition return `PERMISSION_DENIED`. |

### When not to use

- Simple writes: contiguous row keys (use batch) or high throughput without low-latency need (batch is faster).
- `ReadModifyWriteRow`: use `AddToCell` instead for counters; avoid with multi-cluster routing, with multiple single-cluster app profiles that may conflict on the same row and column, when relying on smart retries, and for large write volumes.
- Conditional writes: not usable with multi-cluster routing or conflicting multiple single-cluster app profiles; slower than simple writes at scale.
- Batch writes: rows not close to each other (use `MutateRow`), and multiple mutations to the same row (use one simple write).

## Notes

- Smart retries: client libraries retry simple and batch writes automatically until committed or the deadline is reached, for single-cluster and replicated instances. `ReadModifyWriteRow` is not retried.
- Batch write flow control: available in the Bigtable Beam connector (`BigtableIO`), Bigtable client library for Java, HBase Beam connector (`CloudBigtableIO`) and HBase client for Java. It rate-limits traffic and triggers autoscaling; it requires an app profile with single-cluster routing. Autoscaling is optional.
- Replication: each `MutateRows` request is committed atomically on the receiving cluster and replicated atomically; partial mutations are never received. Single-cluster instances are immediately readable; multi-cluster instances are eventually consistent. Read-your-writes is achieved by routing to the same cluster, or by a consistency token with `CheckConsistency` in `StandardReadRemoteWrites` mode (first use can take up to a few minutes).
- Conflict resolution: a cell is identified by (row key, column family, column qualifier, timestamp). Identical four-tuples written to different clusters resolve with deterministic last-write-wins on server-side time.
- Corrected from the official docs: the writing-data page shows `cbt addtocell TABLE_ID ROW_KEY` / `FAMILY_NAME:COLUMN_QUALIFER=VALUE@TIMESTAMP` on two lines without a continuation, with the placeholder misspelled `COLUMN_QUALIFER`.
- Bigtable is a wide-column NoSQL database, not a relational database; see `gcp-databases-relational` for Cloud SQL / Spanner.
- Snippet taken from https://docs.cloud.google.com/bigtable/docs/writing-data (the writes page has no code block).
- Source: https://docs.cloud.google.com/bigtable/docs/writes (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [writing-data.md](./writing-data.md)
- [reads.md](./reads.md)
