---
source: https://docs.cloud.google.com/bigtable/docs/instances-clusters-nodes
---

# Instances, clusters, and nodes

A Bigtable instance contains clusters that applications connect to; each cluster contains nodes, the compute units that manage data and perform maintenance. A table belongs to an instance, not to a cluster or node.

## Signature / Usage

### Zones and clusters (source example)

If an instance has a cluster in `us-east1-b`, you can add a cluster in another zone of the same region (such as `us-east1-c`) or in a different region (such as `europe-west2-a`). Add a cluster to an instance (example from the gcloud reference):

```bash
gcloud bigtable clusters create my-cluster-id \
    --instance=my-instance-id --zone=us-east1-c
```

### Replicated clusters and failover

- With multi-cluster routing in any app profile, automatic failover can occur when clusters are unavailable.
- The receiving cluster of a manual or automatic failover should ideally have enough capacity. Either always allocate enough nodes (costly) or rely on autoscaling (brief performance impact while scaling up).
- If all app profiles use single-cluster routing, each cluster can have a different node count, but each must always have enough nodes for its disk usage and for replicating writes between clusters. The only way to reserve nodes in advance is to add them to the cluster.

## Options / Props

| Property | Details |
|----------|---------|
| Edition | Enterprise or Enterprise Plus; chosen at creation, can be changed later and takes effect immediately |
| Storage type | SSD or HDD; the choice is permanent and every cluster in an instance must use the same type |
| App profiles | Control how applications connect to clusters; usable without replication to identify applications or functions |
| Clusters per instance | Clusters in up to 8 regions; each cluster is in a single zone; each zone in a region holds only one cluster |
| Max clusters example | 8 regions with 3 zones each = 24 clusters |
| Nodes per cluster | At least 1 |
| Node responsibilities | Track tablets on disk, handle reads and writes for its tablets, perform maintenance such as compactions |
| Replication | Starts automatically when a second cluster is added; a single-cluster instance does not replicate |
| 2x node scaling | Can be enabled at cluster creation: the cluster always scales in increments of two nodes |

## Notes

- Tables cannot be assigned to an individual cluster, per-cluster garbage collection policies are not possible, and clusters cannot store different data for the same table when replicating.
- The in-memory tier (Preview) is available only with Enterprise Plus; infrequent access storage (tiered storage, Preview) is available for SSD instances.
- In most cases, enable autoscaling so Bigtable adds and removes nodes as needed.
- Monitor CPU and disk usage and add nodes when metrics exceed the recommendations in the performance page; node availability in a zone is not guaranteed.
- Data Boost can serve high-throughput read jobs with serverless compute instead of cluster nodes.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/clusters/create (the instances, clusters, and nodes page has no code block). Adding a second cluster starts replication.
- Source: https://docs.cloud.google.com/bigtable/docs/instances-clusters-nodes (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [editions-overview.md](./editions-overview.md)
- [scaling.md](./scaling.md)
- [locations.md](./locations.md)
- [performance.md](./performance.md)
