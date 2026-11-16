---
source: https://docs.cloud.google.com/memorystore/docs/memcached/memory-management-best-practices
---

# Memory management best practices

Explains instance capacity, cache memory, memory overhead, Reserved Memory, System Memory Utilization, eviction, and what to do under memory pressure. If memory usage exceeds total system memory, an out of memory (OOM) condition can cause a full cache flush.

## Signature / Usage

### Adjust Reserved Memory (stage then apply)

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances update INSTANCE_ID --region=REGION --parameters=PARAMETER=VALUE,PARAMETER=VALUE
```

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances apply-parameters INSTANCE_ID --region=REGION --node-ids=NODE_1_ID,NODE_2_ID
```

## Options / Props

### Concepts

| Concept | Description |
|---|---|
| Instance capacity | Memory you provision (and are billed for). By default equal to cache memory. |
| Cache memory limit | Memory available as cache; equals instance capacity unless Reserved Memory is raised. Once full, Memcached evicts items. Reported cache memory counts only item space, not slab fragmentation. |
| Memory overhead | Memory used by Memcached processes (connection buffers, hash table); scales with connections, item count and size, and is theoretically unbounded. Memorystore adds hidden extra memory for it. |
| Reserved Memory | Configuration that increases space for overhead and reduces cache memory by the same percentage. Instances created after October 25, 2021 default to 10%. Decreasing it significantly increases OOM likelihood. |
| System Memory Utilization | Used memory (items plus overhead) as a percentage of system memory (instance capacity plus hidden overhead space). |
| Eviction policy | Optimized LRU. If evictions are disabled and the cache is full, sets can fail. |

### Metrics

| Metric | Address |
|---|---|
| Cache Memory | `memcache.googleapis.com/node/cache_memory` |
| System Memory Utilization | `memcache.googleapis.com/node/memory/utilization` |
| Cache-hit Ratio | `memcache.googleapis.com/node/hit_ratio` |
| Evictions | `memcache.googleapis.com/node/eviction_count` |

## Notes

- Set an alert when System Memory Utilization exceeds 90%; increase Reserved Memory if it exceeds 90%.
- Verify an OOM: an instance restart is the first signal; if System Memory Utilization was over 90% before Uptime dropped to zero, the restart was likely OOM.
- Remedies in order: verify OOM, increase Reserved Memory (reduces cache memory, so eviction starts sooner and hit ratio may drop), scale up the node count, set TTLs on volatile keys, manually delete keys (OSS Memcached does not free allocated memory, so this only reduces OOM chance), then contact Support.
- Record the cache-hit ratio before changing Reserved Memory, TTLs, or scaling, then compare afterwards.
- With many evictions, scaling up the instance may raise the cache hit ratio. Items removed by TTL expiry are not counted in the evictions metric.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/memcached/configure-memcached (this page has no code).
- Adapted from the official docs: the borrowed blocks use lower-case placeholders in the source (`instance-id`, `region`, `parameter=value,parameter=value`, `node-1-id,node-2-id`); they are upper-cased here, as on configure-memcached.md.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/memory-management-best-practices (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-memcached-configurations.md](./supported-memcached-configurations.md)
- [configure-memcached.md](./configure-memcached.md)
- [scale-instances.md](./scale-instances.md)
- [monitor-instances.md](./monitor-instances.md)
