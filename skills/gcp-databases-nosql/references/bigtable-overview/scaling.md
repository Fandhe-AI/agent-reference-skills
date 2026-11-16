---
source: https://docs.cloud.google.com/bigtable/docs/scaling
---

# Scaling

Scaling adds or removes nodes in response to workload or storage changes. Horizontal scaling is either autoscaling (recommended in most cases) or manual node allocation; the in-memory tier (Preview) adds vertical scaling of throughput, and clusters can be created with a 2x node scaling factor.

## Signature / Usage

### 2x node scaling

A cluster with the 2x node scaling factor treats two standard nodes as one larger compute node and always scales in increments of two nodes. It can be created from the Google Cloud console or the gcloud CLI, with autoscaling or manual allocation. Benefits: improved throughput and tail latency stability, greater ability to absorb hotspots.

### Plan for rebalance delay

- Manual node allocation: change the number of nodes before the load increases.
- Autoscaling: change the minimum number of nodes before the load increases.
- After traffic returns to normal, change your node settings back.

Change the node count of a cluster with manual node allocation (example from the gcloud reference):

```bash
gcloud bigtable clusters update my-cluster-id \
    --instance=my-instance-id --num-nodes=10
```

## Options / Props

| Topic | Fact |
|-------|------|
| Rebalance delay | Up to 20 minutes under load after adding nodes before performance improves significantly |
| Scale-down rate | Do not reduce cluster size by more than 10% in a 10-minute period |
| Small clusters and 2x scaling | 1-node cluster costs twice as much; 3-node cluster costs 33% more; effect is small for large clusters (for example 50 nodes) |
| 2x conversion | Standard cluster can't be converted to 2x; create a new cluster with 2x enabled |
| 2x on HDD | Not supported |
| 2x and Enterprise Plus | Required to access the 64 TB per node tiered storage limit (Preview) |
| In-memory vertical scaling | SSD clusters in Enterprise Plus only; when a node's vertical limit is reached, autoscaling adds nodes within the maximum node configuration |

## Notes

- Node quotas apply to both manual allocation and autoscaling; node availability is not guaranteed.
- If the schema concentrates reads or writes on a single row, adding nodes does not improve performance.
- The in-memory tier handles short traffic spikes with almost instant vertical scaling and manages in-memory sharding automatically when autoscaling adds nodes.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/clusters/update (the scaling page has no code block). The same command takes `--autoscaling-min-nodes`, `--autoscaling-max-nodes`, `--autoscaling-cpu-target` and `--autoscaling-storage-target` for autoscaling clusters, or `--num-nodes` with `--disable-autoscaling` to switch to manual allocation.
- Source: https://docs.cloud.google.com/bigtable/docs/scaling (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [performance.md](./performance.md)
- [in-memory-overview.md](./in-memory-overview.md)
- [quotas.md](./quotas.md)
- [instances-clusters-nodes.md](./instances-clusters-nodes.md)
