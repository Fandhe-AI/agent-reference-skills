---
source: https://docs.cloud.google.com/bigtable/docs/in-memory-overview
---

# In-memory tier overview

Preview, Enterprise Plus only. The in-memory tier is a cluster-level setting using specialized hybrid storage nodes that add a RAM tier (accessed with RDMA) to Bigtable for sub-millisecond point reads, hotspot mitigation and high throughput through the same API.

## Signature / Usage

### Enterprise Plus instance (prerequisite)

The in-memory tier is available only with the Enterprise Plus edition. Create an Enterprise Plus instance (example from the gcloud reference):

```bash
gcloud bigtable instances create my-enterprise-plus-instance \
    --display-name="Enterprise Plus Instance" \
    --edition=ENTERPRISE_PLUS \
    --cluster-config=id=my-cluster-id,zone=us-east1-c,nodes=1
```

### How it behaves

- Getting data in: read-through caching; a row enters the memory tier via reads through an app profile configured for the in-memory tier. A write from any app profile updates the memory tier if the row is already there.
- Eviction: Least Recently Used (LRU) at row level, with a TTL invalidation policy.
- Negative caching: remembers missing resources for a period of time.
- Security: encryption at rest and in transit (TLS).

### When to use

- Sub-millisecond read latency needs (instead of a self-managed cache).
- High-throughput point reads on specific data subsets.
- Hotspot mitigation for traffic spikes on particular row keys.
- Cost optimization by offloading high read volumes to reduce node count.

## Options / Props

| Item | Value |
|------|-------|
| Provisioning time | Up to 30 minutes; traffic is served from persistent storage meanwhile |
| Base capacity | 40,000 reads per second per node |
| Vertical scaling | Increments of 40,000 reads per second up to 120,000 per node |
| Max nodes | 10 per cluster |
| Max row size | 1 MiB per row key (larger rows are read from persistent storage) |
| Storage | SSD required |
| Routing | App profiles with single-cluster routing only |
| Operations | Single-row point reads only; no scans, no SQL |
| Java client | 2.77.0 or later (BOM 26.80.0 or later) |
| Go client | 1.52.0 or later |
| Other clients | Not supported |
| CMEK | Clusters with customer-managed encryption keys don't support it |

## Notes

- Only the latest timestamped version of a row is in the memory tier; requests for earlier versions (historical cells) bypass it.
- Read-your-writes consistency is retained at the cluster level. In multi-cluster instances memory tiers are not in sync; writes eventually update all memory tiers where the row is present (eventual consistency).
- Vertical scaling works with or without cluster autoscaling and integrates with it: when all nodes reach maximum in-memory capacity, autoscaling adds nodes. Scaling beyond the 40,000 base is billed with a multiplier on the node's hourly cost.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/create (the in-memory overview has no code block; the in-memory tier itself is enabled per cluster and app profile, which this snippet does not show).
- Source: https://docs.cloud.google.com/bigtable/docs/in-memory-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [scaling.md](./scaling.md)
- [performance.md](./performance.md)
- [editions-overview.md](./editions-overview.md)
- [quotas.md](./quotas.md)
