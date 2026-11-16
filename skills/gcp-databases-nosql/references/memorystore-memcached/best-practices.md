---
source: https://docs.cloud.google.com/memorystore/docs/memcached/best-practices
---

# Best practices

Guidance for using Memorystore for Memcached: handling cache misses, node connections, Auto Discovery, `max-item-size`, rebalancing, and monitoring.

## Signature / Usage

### Change `max-item-size` (stage, then apply)

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances update INSTANCE_ID --region=REGION --parameters=PARAMETER=VALUE,PARAMETER=VALUE
```

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances apply-parameters INSTANCE_ID --region=REGION --node-ids=NODE_1_ID,NODE_2_ID
```

## Options / Props

### `max-item-size`

| Property | Open source Memcached | Memorystore |
|---|---|---|
| Minimum | 1 KiB | 512 KiB |
| Maximum | 1 GiB | 128 MiB |
| Default | 1 MiB | 1 MiB |

Values must be evenly divisible by 512 KiB.

### Metrics to watch

| Metric | Address |
|---|---|
| Memory usage | `memcache.googleapis.com/node/cache_memory` |
| CPU usage percent | `memcache.googleapis.com/node/cpu/utilization` |

## Notes

- Design the app so cache misses and temporary downtime do not stop it from reading the underlying database; on keyspace unavailability retry with exponential backoff and a time limit.
- Send `set` / `get` / `delete` to node IP addresses directly; running them on the Auto Discovery endpoint reduces performance. Use Auto Discovery to track node IPs.
- Caching an entry larger than `max-item-size` fails (returns false) and can cause high latency; surface the error from the client. Setting `max-item-size` to the maximum is not recommended in production because slab-based memory management allocates inefficiently. Set it slightly above the biggest item and validate item size in the application.
- Unbalanced cluster: in rare cases nodes are unevenly spread across zones when a zone is unavailable during provisioning, and the cluster does not auto-rebalance. Rebalance by temporarily increasing the node count, then scaling back to the original count.
- Alert when memory and CPU usage reach 80%; sustained growth above 80% suggests increasing instance size early, and low usage suggests shrinking the cluster.
- Applying parameters flushes the cache on each node (see configure-memcached).
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/memcached/configure-memcached (the best practices page has no code).
- Adapted from the official docs: the borrowed blocks use lower-case placeholders in the source (`instance-id`, `region`, `parameter=value,parameter=value`, `node-1-id,node-2-id`); they are upper-cased here, as on configure-memcached.md.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/best-practices (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-memcached.md](./configure-memcached.md)
- [supported-memcached-configurations.md](./supported-memcached-configurations.md)
- [memory-management-best-practices.md](./memory-management-best-practices.md)
- [scale-instances.md](./scale-instances.md)
- [monitor-instances.md](./monitor-instances.md)
