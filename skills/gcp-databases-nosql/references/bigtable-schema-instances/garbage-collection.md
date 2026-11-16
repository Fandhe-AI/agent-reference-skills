---
source: https://docs.cloud.google.com/bigtable/docs/garbage-collection
---

# Garbage collection overview

Garbage collection is the automatic, asynchronous background removal of expired and obsolete cells during compaction. A garbage collection policy is a set of rules, set per column family, stating when data is no longer needed. It limits row size and storage cost. Policies are set programmatically or with the `cbt` CLI.

## Signature / Usage

### Set an age-based policy when creating a table

Create a table whose column family lets data expire after 864,000 seconds, with initial splits on row keys `car` and `key` (example from the gcloud reference):

```bash
gcloud bigtable instances tables create my-table \
    --instance=my-instance \
    --column-families="my-family:maxage=864000s" --splits=car,key
```

### Default policy of a cbt column family

A column family created with `cbt` has no policy (`<never>`), so it keeps an infinite number of cells per column until you change the policy. Samples for setting policies with the client libraries are at https://docs.cloud.google.com/bigtable/docs/configuring-garbage-collection.

```bash
cbt createfamily my-table cf1
```

```bash
cbt ls my-table
```

```text
    Family Name     GC Policy
    ---     ---
    cf1             <never>
```

## Options / Props

| Policy type | Meaning |
|-------------|---------|
| Expiring values (age-based) | Delete cells whose timestamp is older than a TTL (for example 30 days) |
| Number of versions | Keep at most N cells per column in the family (for example `1` or `5`) |
| Intersection | Delete only when ALL rules match (for example older than 30 days but keep at least one version) |
| Union | Delete when ANY rule matches (for example keep at most two records and only if under 30 days old) |
| Nested | Combination of union and intersection rules |

| Creation tool | Default retention |
|---------------|-------------------|
| HBase client for Java / HBase shell | Only the most recent cell per column (HBase default) |
| Any other client library or tool (including `gcloud` and `cbt`) | Infinite number of cells; there is no default TTL |

## Notes

- Deletion can take up to a week (typically a few days) after data matches a rule; timing cannot be changed. Expired data appears in reads and is billed until compaction. Data you delete yourself stops appearing in reads immediately.
- Always apply a read filter that excludes the same values as your GC rules (cells per column limit or timestamp range).
- Garbage collection is retroactive: a new, more restrictive policy is applied over the next few days to all existing data.
- Timestamps are microseconds since the Unix epoch. By default a timestamp must have at most millisecond precision; microsecond precision is rejected unless the table uses microsecond granularity (Enterprise Plus only). Set a default timestamp on writes unless you need artificial timestamps (cell-level TTL simulation, sequence numbers). Artificial timestamps, including zeroes, prevent time-series use and can take up to a week to be collected.
- Row size: ideally never above 100 MB; limit 256 MB.
- Replication: version-based GC deletes are replicated and can raise CPU usage; age-based GC does not. Lowering versions or retention can take up to a week to reach all clusters. A retention increase on a replicated table is limited to a maximum of 90 days, and clusters can stay out of sync for longer than a week. An age-based policy can be deleted only if the instance does not use replication.
- Monitor table size in the Google Cloud console to check GC; a table that never shrinks may indicate a misconfigured policy, but GC is delayed.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/tables/create (age-based policy; the garbage collection overview has no code block).
- Snippet taken from https://docs.cloud.google.com/bigtable/docs/create-instance-write-data-cbt-cli (`cbt createfamily`, `cbt ls` and its output).
- Bigtable: wide-column NoSQL database, not a relational database; its SQL (GoogleSQL for Bigtable) is not Cloud SQL / Spanner (`gcp-databases-relational`).
- Source: https://docs.cloud.google.com/bigtable/docs/garbage-collection (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [schema-design.md](./schema-design.md)
- [schema-design-time-series.md](./schema-design-time-series.md)
- [data-types.md](./data-types.md)
