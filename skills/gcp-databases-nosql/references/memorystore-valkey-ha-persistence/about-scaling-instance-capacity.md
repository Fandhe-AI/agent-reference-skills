---
source: https://docs.cloud.google.com/memorystore/docs/valkey/about-scaling-instance-capacity
---

# About scaling instance capacity

How a Memorystore for Valkey instance behaves while scaling horizontally (shard count: scale out / scale in) or vertically (node type: scale up / scale down), and common failure scenarios.

## Signature / Usage

Diagnose a node that lacks free memory when updating the shard count (instance details from `gcloud memorystore instances describe`; use the instance IP address and port).

```bash
valkey-cli -h IP_ADDRESS -p PORT_NUMBER cluster nodes
```

```bash
valkey-cli -h IP_ADDRESS -p PORT_NUMBER
```

At the prompt run `info memory`; compare `used_memory` to `maxmemory` (ratio greater than 98% means the node is too full). Free space by deleting keys with the Valkey `DEL` command, re-check `info memory`, and repeat for other nodes.

## Options / Props

| Scenario | Resolution |
|----------|------------|
| Shard count update lacks free memory on `shared-core-nano` | Scale the node type up or free memory (steps above). |
| Scaled to a shard count too small for the keys | Scale to a larger shard count. |
| Scaled to a node type too small for the data | Memorystore recommends a node type to scale down to. |
| Overridden default settings invalid for the new node type | Modify the settings manually to be valid for the new node type. |
| Scaling during high write pressure (e.g. load testing) | Scale during low traffic. |
| Large key slot migration lacks memory on target node | Reduce key size to less than 128 MB and retry. |
| Slot number of a node unknown (only range known) | Reduce key size and retry. |
| Scale-out to a smaller shard count lacks memory (as written in the source) | Scale back in to the original, larger shard count. |

## Notes

- Availability is not affected during scaling, but changing the shard count rebalances the keyspace and may raise latency. Vertical scaling behaves like a maintenance operation.
- Cluster Mode Disabled instances run on a single shard, so horizontal scaling does not apply.
- Scaling the node type down changes default settings to the scaled node type's defaults if they were not overridden.
- Deleting keys is destructive; only delete keys you can afford to lose and prefer a disposable instance for rehearsal. The `valkey-cli` examples are shown without TLS or AUTH options; if the instance requires them, add the TLS flags from https://docs.cloud.google.com/memorystore/docs/valkey/connect-instance; for token authentication, https://docs.cloud.google.com/memorystore/docs/valkey/manage-basic-auth documents the `AUTH USERNAME TOKEN` command, which keeps the token off the shell command line.
- Caution kept from the source: use `shared-core-nano` only for development or testing (no SLA).
- Best practices: scale during low traffic; retry later if a temporary resource constraint blocks scaling.
- Source inconsistency: the last failure scenario says "scaling out to a smaller shard count"; kept as written.
- Memorystore for Valkey is managed Valkey on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/about-scaling-instance-capacity (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [scale-instance-capacity.md](./scale-instance-capacity.md)
- [scale-replica-count.md](./scale-replica-count.md)
