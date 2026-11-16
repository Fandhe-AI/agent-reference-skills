---
source: https://docs.cloud.google.com/bigtable/docs/replication-overview
---

# Replication overview

Bigtable replication copies data across multiple zones or regions to increase availability and durability, and lets you isolate workloads by routing request types to different clusters. This page also covers the consistency model, conflict resolution, routing policy names and failovers (merged from the "Failovers" page).

## Signature / Usage

### Add a cluster to start replication

Adding a second cluster to an instance starts replication. Add a cluster in zone `us-east1-c` (example from the gcloud reference):

```bash
gcloud bigtable clusters create my-cluster-id \
    --instance=my-instance-id --zone=us-east1-c
```

## Options / Props

| Item | Value |
|------|-------|
| Max regions per instance | 8 |
| Clusters per zone | 1 (e.g. 8 regions x 3 zones = up to 24 clusters) |
| Routing policies | Single-cluster; multi-cluster (any cluster, cluster group, row-affinity) |
| Consistency, replicated instance, same cluster | Reads and writes consistent |
| Consistency, across clusters | Eventual (typically seconds or minutes, not hours) |
| Consistency, non-replicated instance | Strong |

Replicated changes: data updates, new and deleted tables, added and removed column families, column family garbage collection policy changes.

| Consistency model | How to get it |
|-------------------|---------------|
| Read-your-writes | Single-cluster routing, with all app profiles routed to the same cluster |
| High rate of read-your-writes | Multi-cluster routing with row-affinity routing, or each cluster in a different region |
| Strong | Single-cluster routing, and do not use the other clusters except to fail over |

## Notes

- Use cases: isolate serving from batch reads (single-cluster app profiles per workload), improve availability, near-real-time backup (single-cluster routing, manual failover), global presence (clusters in US, Europe, Asia; route to the nearest).
- Every cluster is a primary: reads and writes work on each. Create replication by creating an instance with more than one cluster or adding clusters to an existing instance; adding a cluster copies existing data then synchronizes changes.
- Conflict resolution: two writes to the same (row key, column family, column qualifier, timestamp) on different clusters are resolved deterministically by an internal last-write-wins algorithm based on server-side time.
- Row-affinity routing: consistency is not guaranteed because requests can still fail over (unhealthy cluster, network issues, too many requests). You cannot set the row key to cluster mapping.
- Bigtable reverts to eventual consistency after a failover; writes not yet replicated to the target cluster can cause stale reads until replication finishes.
- Failovers, manual: with single-cluster routing you decide when to fail over. Signals from the source: many transient system errors, many request timeouts, unacceptable average latency. Failover is not guaranteed to resolve the issue; monitor before and after.
- Failovers, automatic: multi-cluster routing fails over to the nearest available cluster, even for very brief unavailability. With a request deadline, Bigtable reroutes to the next closest cluster as the deadline approaches; a shorter deadline triggers earlier failover. Make the deadline long enough for the failover request to finish, especially cross-region. Locate clients in or near more than one Google Cloud region for HA. The "Automatic Failovers" graph is under System insights in the Google Cloud console.
- Dropping a row range (Admin API `DropRowRange`) is significantly slower and less efficient when replication is enabled, and raises CPU usage; avoid it if possible.
- Replicated clusters often need more nodes; cross-region replication latency is typically higher than same-region. Cross-region replication is billed.
- Garbage collection policy changes on replicated tables have restrictions; see https://docs.cloud.google.com/bigtable/docs/garbage-collection#replication.
- Wide-column NoSQL database; not a relational database (see `gcp-databases-relational`).
- Source: https://docs.cloud.google.com/bigtable/docs/replication-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/bigtable/docs/failovers (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/clusters/create (the replication overview and failovers pages have no code block).

## Related

- [app-profiles.md](./app-profiles.md)
- [routing.md](./routing.md)
- [replication-settings.md](./replication-settings.md)
- [autoscaling.md](./autoscaling.md)
