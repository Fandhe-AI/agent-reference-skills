---
source: https://docs.cloud.google.com/bigtable/docs/overview
---

# Bigtable overview

Bigtable is a sparsely populated, sorted key-value table that scales to billions of rows and thousands of columns (terabytes to petabytes) with low latency and high read/write throughput. It is exposed through multiple client libraries, including an extension of the Apache HBase library for Java. This page covers the storage model, architecture, load balancing, compute options, memory and disk usage, durability, consistency, security, backups, change streams and app-profile routing.

## Signature / Usage

### Storage model

A table is a sorted key-value map. Rows typically describe one entity; a single value per row is indexed (the row key). Related columns are grouped into a column family; a column is identified by column family plus column qualifier (unique within the family). Each row/column intersection can hold multiple cells, each a unique timestamped version. Tables are sparse: an unused column takes no space in a row.

### Row key design for even write distribution

Distribute writes evenly across nodes with row keys that do not follow a predictable order, while grouping related rows next to each other. The source example for weather data (location followed by timestamp):

```text
WashingtonDC#201803061617
```

### Architecture

- All client requests go through a frontend server before reaching a Bigtable node (called "tablet server" in the original paper). Nodes are organized into a cluster, which belongs to an instance (a container for clusters).
- A table is sharded into blocks of contiguous rows called tablets (similar to HBase regions), stored on Colossus in SSTable format. Writes are also stored in Colossus's shared log once acknowledged.
- Data is never stored in the nodes themselves; each node has pointers to tablets. Rebalancing and node-failure recovery are therefore fast (only metadata moves) and no data is lost when a node fails.

### Compute options

- Default: cluster nodes provide both storage and compute.
- Data Boost: serverless compute for high-throughput read jobs while the core application keeps using cluster nodes. Enterprise Plus adds SQL support and access to HDD and tiered storage data.
- In-memory tier (Preview): sub-millisecond point-read latency.

### App profile types

- Standard app profiles use provisioned nodes. Routing policies: single-cluster routing, or multi-cluster routing to any cluster (nearest available cluster, among all clusters or a specified cluster group). The in-memory tier can be enabled only for app profiles with single-cluster routing.
- Data Boost app profiles use serverless compute and are restricted to single-cluster routing.

## Options / Props

| Topic | Fact stated in the source |
|-------|---------------------------|
| Typical value size | Key-value data where each value is typically no larger than 10 MB |
| Data types | All data is raw byte strings; only increment operations require a 64-bit integer encoded as an 8-byte big-endian value |
| Compaction | No configuration settings; automatic. On average a compaction takes a week to complete tasks such as data deletion or moving data to tiered storage |
| Compression | Automatic, not configurable. Values up to 1 MiB are compressed; compress larger values before writing |
| Free trial | 10 days (extendable to 90 days); up to 500 GB SSD and a 1-node cluster |
| Editions | Enterprise and Enterprise Plus |
| Consistency | Single-cluster instances: strong consistency. Multi-cluster: eventual by default; read-your-writes or strong consistency possible depending on workload and app profile settings |
| Security levels | Project, instance, table or authorized view; no row-level, column-level or cell-level security |
| Encryption | Encrypted at rest by default; customer-managed encryption keys (CMEK) optional |
| Backups | Save table schema and data; restore to a new table in any region or project where you have an instance |
| Change streams | Change data capture; readable with a service such as Dataflow |

## Notes

- Bigtable is a wide-column NoSQL database, not a relational database; its SQL (GoogleSQL for Bigtable) is not Cloud SQL / Spanner (`gcp-databases-relational`).
- The source suggests Firestore for highly structured document objects with ACID transactions and SQL-like queries, Firebase Realtime Database for real-time sync between users, and BigQuery for interactive OLAP querying.
- Mutations and deletions take extra storage until the table is compacted; column qualifiers take space in each row that uses them, so using qualifiers as data is often efficient.
- Tiered storage and the in-memory tier are Preview features.
- The source contains no code samples; the fenced block reproduces the row-key example from the page verbatim.
- Source: https://docs.cloud.google.com/bigtable/docs/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instances-clusters-nodes.md](./instances-clusters-nodes.md)
- [editions-overview.md](./editions-overview.md)
- [tiered-storage.md](./tiered-storage.md)
- [in-memory-overview.md](./in-memory-overview.md)
- [performance.md](./performance.md)
- [scaling.md](./scaling.md)
- [quotas.md](./quotas.md)
