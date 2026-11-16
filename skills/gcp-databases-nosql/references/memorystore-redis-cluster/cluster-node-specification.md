---
source: https://docs.cloud.google.com/memorystore/docs/cluster/cluster-node-specification
---

# Cluster and node specification

Node types, per-node capacity and client limits, scaling directions, maximum cluster capacity and the two cluster endpoints (discovery and data) for Memorystore for Redis Cluster. "Node" and "shard" are used interchangeably on the source page.

## Signature / Usage

### Create a cluster with a chosen node type

```bash
gcloud redis clusters create INSTANCE_ID \
--region=REGION_ID \
--network=NETWORK \
--replica-count=REPLICA_COUNT \
--node-type=NODE_TYPE \
--shard-count=SHARD_COUNT \
--acl-policy=ACL_POLICY_NAME
```

## Options / Props

### Keyspace capacity and reserved overhead

| Node type | Default writable keyspace capacity | Total node capacity |
|---|---|---|
| redis-shared-core-nano | 1.12 GB | 1.4 GB |
| redis-standard-small | 5.2 GB | 6.5 GB |
| redis-highmem-medium | 10.4 GB | 13 GB |
| redis-highcpu-medium | 10.4 GB | 13 GB |
| redis-standard-large | 20.8 GB | 26 GB |
| redis-highmem-xlarge | 46.4 GB | 58 GB |
| redis-highmem-2xlarge | 88 GB | 110 GB |

### Node characteristics

| Node type | vCPU count | SLA offered | Default client connections | Maximum client connections | maxmemory-clients |
|---|---|---|---|---|---|
| redis-shared-core-nano | 0.5 | No | 5,000 | 5,000 | 12% |
| redis-standard-small | 2 | Yes | 16,000 | 32,000 | 7% |
| redis-highmem-medium | 2 | Yes | 32,000 | 64,000 | 7% |
| redis-highcpu-medium | 8 | Yes | 32,000 | 64,000 | 7% |
| redis-standard-large | 8 | Yes | 32,000 | 64,000 | 7% |
| redis-highmem-xlarge | 8 | Yes | 64,000 | 64,000 | 4% |
| redis-highmem-2xlarge | 16 | Yes | 64,000 | 64,000 | 4% |

### Maximum writable capacity (by cluster shape: primaries x replicas per node)

| Node type and size | 250 x 0 | 125 x 1 | 83 x 2 | 62 x 3 | 50 x 4 | 41 x 5 |
|---|---|---|---|---|---|---|
| redis-shared-core-nano - 1.4 GB (hard limit 1.12 GB writable) | 280 GB | 140 GB | 92.96 GB | 69.44 GB | 56 GB | 45.92 GB |
| redis-standard-small - 6.5 GB | 1,625 GB | 812.5 GB | 539.5 GB | 403 GB | 325 GB | 266.5 GB |
| redis-highmem-medium - 13 GB | 3,250 GB | 1,625 GB | 1,079 GB | 806 GB | 650 GB | 533 GB |
| redis-highcpu-medium - 13 GB | 3,250 GB | 1,625 GB | 1,079 GB | 806 GB | 650 GB | 533 GB |
| redis-standard-large - 26 GB | 6,500 GB | 3,250 GB | 2,158 GB | 1,612 GB | 1,300 GB | 1,066 GB |
| redis-highmem-xlarge - 58 GB | 14,500 GB | 7,250 GB | 4,814 GB | 3,596 GB | 2,900 GB | 2,378 GB |
| redis-highmem-2xlarge - 110 GB | 27,500 GB | 13,750 GB | 9,130 GB | 6,820 GB | 5,500 GB | 4,510 GB |

## Notes

- `redis-shared-core-nano`: variable performance, no SLA; use only for development or testing, not production. It has a hard limit of 1.12 GB that can't be changed with `maxmemory`.
- `redis-standard-small` allows small clusters and smaller growth increments; better price-performance than `redis-highmem-medium` if the total keyspace capacity is enough. Choose `redis-highcpu-medium` for a higher processing-to-memory ratio; for more capacity use `redis-standard-large`, `redis-highmem-xlarge` or `redis-highmem-2xlarge`. Redis performance might not scale linearly with vCPUs, so scale out (add nodes) for better price-performance.
- Memorystore reserves part of capacity to prevent OOM errors. `maxmemory` can adjust the reserved amount; setting it to 100% gives the *Total node capacity*, but values above the default are not recommended.
- Scaling: horizontal = change shard count (scale out / in); vertical = change node type (scale up / down).
- Minimum writable capacity equals one node and is not affected by replica count. The source gives 1.4 GB to 110 GB depending on node type; for `redis-shared-core-nano` the writable amount is capped at its 1.12 GB hard limit.
- Performance: memtier benchmark in `us-central1` gave 120,000 - 130,000 operations per second per 2 vCPU node (`redis-standard-small`, `redis-highmem-medium`) at 1KiB data size. Benchmark your own workload and size with headroom.
- Discovery endpoint: IP address + port; used by clients to fetch cluster topology; it is highly available (multi-zone) and unchanged for the cluster lifecycle (maintenance, scaling, replica count changes). Node endpoints can change and be recycled, so use a Redis cluster client that handles topology refreshes and redirections; don't assume node endpoints are stable.
- Data endpoint: reserved for Memorystore to connect your client to nodes. Don't connect to it directly.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/cluster/create-instances
- Corrected from the official docs: the source's maximum-writable-capacity table computes the `redis-shared-core-nano` row from the 1.4 GB total node capacity (250 x 0 = 350 GB, 125 x 1 = 175 GB, 83 x 2 = 116.2 GB, 62 x 3 = 86.8 GB, 50 x 4 = 70 GB, 41 x 5 = 57.4 GB), but the same page says nano "has a hard limit of 1.12 GB, and can't" be changed with `maxmemory`; the row now uses 1.12 GB per primary. The other rows use total node capacity, which is reachable only by raising `maxmemory` above the default (not recommended); with default settings the writable capacity is the *Default writable keyspace capacity* per primary.
- Source: https://docs.cloud.google.com/memorystore/docs/cluster/cluster-node-specification (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-instance-configurations.md](./supported-instance-configurations.md)
- [quotas.md](./quotas.md)
- [create-instances.md](./create-instances.md)
- [connect-cluster-instance.md](./connect-cluster-instance.md)
