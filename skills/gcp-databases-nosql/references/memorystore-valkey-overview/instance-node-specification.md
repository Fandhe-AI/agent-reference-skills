---
source: https://docs.cloud.google.com/memorystore/docs/valkey/instance-node-specification
---

# Instance and node specification

Node types, keyspace capacity, client connection limits, scaling, writable capacity and the endpoints of Memorystore for Valkey instances. All nodes of an instance use the same node type.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/configure-instances

```bash
gcloud memorystore instances create my-instance --location=us-east1 --project=my-project --node-type=highmem-medium --shard-count=3 --engine-configs=maxmemory-policy=allkeys-lru
```

### Choosing a node type

- `shared-core-nano`: small workloads, variable performance, no SLA; use only for development or testing.
- `custom-pico`, `custom-micro`, `custom-mini`: node sizes of 1 GB to 3 GB with an SLA (for example when migrating from Memorystore for Redis). Committed use discounts (CUDs) do not apply. Custom node types are supported for Cluster Mode Disabled instances only; moving to a clustered configuration needs a full redeployment.
- `standard-small`: small instances and smaller growth increments; better price performance than `highmem-medium` if capacity suffices.
- `highcpu-medium`: higher processing power relative to memory.
- `standard-large`, `highmem-xlarge`, `highmem-2xlarge`: more capacity than `highmem-medium`. Scaling up may not scale performance linearly; scale out (more nodes) for better price performance.

### Scaling

- Horizontal: change the shard count (scale out / in).
- Vertical: change the node type (scale up / down).

## Options / Props

### Keyspace capacity and reserved overhead

| Node type | Default writable keyspace capacity | Total node capacity |
|---|---|---|
| shared-core-nano | 1.12 GB | 1.4 GB |
| custom-pico | 1.08 GB | 1.25 GB |
| custom-micro | 2 GB | 2.5 GB |
| custom-mini | 3 GB | 3.75 GB |
| standard-small | 5.2 GB | 6.5 GB |
| highmem-medium | 10.4 GB | 13 GB |
| highcpu-medium | 10.4 GB | 13 GB |
| standard-large | 20.8 GB | 26 GB |
| highmem-xlarge | 46.4 GB | 58 GB |
| highmem-2xlarge | 88 GB | 110 GB |

### Node characteristics

| Node type | vCPU count | SLA offered | Default client connections | Maximum client connections | maxmemory-clients |
|---|---|---|---|---|---|
| shared-core-nano | 0.5 | No | 5,000 | 5,000 | 12% |
| custom-pico | 2 | Yes | 16,000 | 32,000 | 12% |
| custom-micro | 2 | Yes | 16,000 | 32,000 | 12% |
| custom-mini | 2 | Yes | 16,000 | 32,000 | 12% |
| standard-small | 2 | Yes | 16,000 | 32,000 | 7% |
| highmem-medium | 2 | Yes | 32,000 | 64,000 | 7% |
| highcpu-medium | 8 | Yes | 32,000 | 64,000 | 7% |
| standard-large | 8 | Yes | 32,000 | 64,000 | 7% |
| highmem-xlarge | 8 | Yes | 64,000 | 64,000 | 4% |
| highmem-2xlarge | 16 | Yes | 64,000 | 64,000 | 4% |

### Maximum writable capacity, Cluster Mode Enabled (node type and size; shape = primary nodes x replicas per node)

| Node type | 250 x 0 | 125 x 1 | 83 x 2 | 62 x 3 | 50 x 4 | 41 x 5 |
|---|---|---|---|---|---|---|
| shared-core-nano - 1.4 GB (hard limit 1.12 GB writable) | 280 GB | 140 GB | 92.96 GB | 69.44 GB | 56 GB | 45.92 GB |
| standard-small - 6.5 GB | 1,625 GB | 812.5 GB | 539.5 GB | 403 GB | 325 GB | 266.5 GB |
| highmem-medium - 13 GB | 3,250 GB | 1,625 GB | 1,079 GB | 806 GB | 650 GB | 533 GB |
| highcpu-medium - 13 GB | 3,250 GB | 1,625 GB | 1,079 GB | 806 GB | 650 GB | 533 GB |
| standard-large - 26 GB | 6,500 GB | 3,250 GB | 2,158 GB | 1,612 GB | 1,300 GB | 1,066 GB |
| highmem-xlarge - 58 GB | 14,500 GB | 7,250 GB | 4,814 GB | 3,596 GB | 2,900 GB | 2,378 GB |
| highmem-2xlarge - 110 GB | 27,500 GB | 13,750 GB | 9,130 GB | 6,820 GB | 5,500 GB | 4,510 GB |

### Maximum writable capacity, Cluster Mode Disabled

Equal to the default writable keyspace capacity in the first table (for example `highmem-xlarge` 46.4 GB, `highmem-2xlarge` 88 GB). Minimum writable capacity is one node (1.25 GB to 110 GB depending on node type) and is not affected by replica count.

## Notes

- `maxmemory` can adjust reserved storage; setting it to 100% reaches total node capacity, but values above the default are not recommended. `shared-core-nano` has a hard limit of 1.12 GB that `maxmemory` cannot change.
- Benchmark (memtier, `us-central1`): 120,000 - 130,000 operations per second per 2 vCPU node (`standard-small`, `highmem-medium`) at 1 KiB data size. Benchmark your own workload and size with headroom.
- Cluster Mode Enabled endpoints: the discovery endpoint (IP and port) stays unchanged for the instance lifetime and is highly available; node endpoints can change and be recycled, so use a client that handles topology refresh and redirections. The data endpoint is reserved for Memorystore; do not connect to it directly.
- Cluster Mode Disabled endpoints: the primary endpoint IP stays unchanged across failover; clients should retry connections with exponential backoff. The reader endpoint load-balances across replicas, accepts read queries only, is provisioned even with 0 replicas, and drops connections (it never routes to the primary) when no replica is available. With 1 replica the primary endpoint has higher availability than the reader endpoint; with 2 replicas both are highly available. Replication is asynchronous, so replicas can lag a few seconds; use the primary endpoint for read-your-write consistency (stale reads are still possible after failover).
- The source also lists a per-shard-shape matrix only for Cluster Mode Enabled; custom node types are absent from it.
- Source inconsistency: the cluster-mode page says instance size can be changed "only when you create it", while this page and the scaling pages describe changing shard count and node type after creation (see `cluster-mode-enabled-and-disabled.md`). Kept as written on each page.
- Corrected from the official docs: the source's Cluster Mode Enabled maximum-writable-capacity table computes the `shared-core-nano` row from the 1.4 GB total node capacity (250 x 0 = 350 GB, 125 x 1 = 175 GB, 83 x 2 = 116.2 GB, 62 x 3 = 86.8 GB, 50 x 4 = 70 GB, 41 x 5 = 57.4 GB), but the same page says nano has a hard limit of 1.12 GB that `maxmemory` cannot change; the row now uses 1.12 GB per primary. The other rows use total node capacity, which is reachable only by raising `maxmemory` above the default (not recommended).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/instance-node-specification (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-instance-configurations.md](./supported-instance-configurations.md)
- [quotas.md](./quotas.md)
- [exponential-backoff.md](./exponential-backoff.md)
- [connect-instance.md](./connect-instance.md)
