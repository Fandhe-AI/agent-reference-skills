---
source: https://docs.cloud.google.com/bigtable/docs/routing
---

# Routing options

An app profile's routing policy controls which clusters receive requests and how failovers are handled in a replicated instance. This page covers single-cluster, multi-cluster (any cluster, cluster group, row-affinity) routing, routing with SQL and single-row transactions. Some features are Enterprise Plus only.

## Signature / Usage

### Multi-cluster routing with row-affinity

Create an app profile with row-affinity routing enabled (example from the gcloud reference):

```bash
gcloud bigtable app-profiles create my-app-profile-id \
    --instance=my-instance-id --route-any --row-affinity
```

### Single-cluster routing with single-row transactions

Update an app profile to route all requests to one cluster and allow transactional writes (example from the gcloud reference):

```bash
gcloud bigtable app-profiles update my-app-profile-id \
    --instance=my-instance-id --route-to=my-cluster-id \
    --transactional-writes
```

## Options / Props

| Policy | Behavior | Single-row transactions | Failover |
|--------|----------|-------------------------|----------|
| Single-cluster | All requests to one cluster. Used by Data Boost and in-memory tier (Preview) profiles | Only policy that allows them | Manual |
| Multi-cluster, any cluster | Nearest cluster; every cluster available for failover | Not allowed | Automatic (speed depends on request deadline) |
| Multi-cluster, cluster group | Restricts to a subset of clusters; reserves a cluster for another workload | Not allowed | Automatic within the group |
| Multi-cluster, row-affinity (sticky) | Single-row reads and writes routed by row key; mapping not configurable | Not allowed | Next cluster in failover order |

Row-affinity supported requests: `ReadRows` with one key, `MutateRow`, `MutateRows` with one key, `BulkMutateRow` with one key. Not supported: a one-row range in `ReadRows`; multiple updates to the same row in `BulkMutateRow`. Enable it with gcloud CLI, Google Cloud console, Java client library or Terraform.

## Notes

- Single-cluster routing can give read-your-writes consistency in a replicated instance when reads and writes go to the same cluster; other workloads can use other clusters. Routing policies do not affect replication.
- Multi-cluster routing gives eventual consistency; use it for HA.
- Row-affinity does not guarantee read-your-writes (cluster unavailable, network issues, overload). Adding or removing a cluster can change row key assignment; use cluster groups via the `--restrict-to` flag to keep failover order stable. With cluster groups, a cluster cannot be deleted while used by an app profile, and new clusters get no requests until added to the group.
- Routing with SQL: the `--row-affinity` flag is accepted but not enforced for `ExecuteQuery`.
- Single-row transactions (read-modify-write incl. increments/appends, check-and-mutate) are atomic only at row level. Bigtable does not support atomic multi-row transactions. Bigtable requires each app profile to say whether it allows them, prevents enabling them with multi-cluster routing, and warns when enabled in two single-cluster profiles pointing at different clusters; in that case avoid conflicting writes (data loss).
- Aggregates (https://docs.cloud.google.com/bigtable/docs/aggregates) can avoid counter conflicts: an add to an aggregate field merges with the existing value.
- Wide-column NoSQL database; not a relational database (see `gcp-databases-relational`).
- Source: https://docs.cloud.google.com/bigtable/docs/routing (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/app-profiles/create (the routing page has no code block). Cluster groups use `--route-any --restrict-to=CLUSTER_ID,...`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/app-profiles/update

## Related

- [app-profiles.md](./app-profiles.md)
- [replication-overview.md](./replication-overview.md)
- [replication-settings.md](./replication-settings.md)
- [googlesql-overview.md](./googlesql-overview.md)
