---
source: https://docs.cloud.google.com/memorystore/docs/valkey/supported-instance-configurations
---

# Supported instance configurations

Maxmemory policies and the Valkey configuration parameters you can modify (or not) on a Memorystore for Valkey instance.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/configure-instances

```bash
gcloud memorystore instances update my-instance --location=us-east1 --project=my-project --update-engine-configs=maxmemory-policy=allkeys-lru
```

## Options / Props

### Maxmemory policies

When memory is full and a write arrives, Valkey evicts keys per the maxmemory policy. Default: `volatile-lru`.

| Policy | Behavior |
|---|---|
| `noeviction` | Returns an error when the instance reaches maxmemory. Does not overwrite or evict any data. |
| `allkeys-lfu` | Evicts the least frequently used (LFU) keys from the entire keyset. |
| `allkeys-lru` | Evicts the least recently used (LRU) keys from the entire keyset. |
| `volatile-lfu` | Evicts the least-frequently-used keys that are set with TTL expirations. |
| `volatile-lru` | Evicts the least recently used (LRU) keys that are set with TTL expirations. |
| `allkeys-random` | Evicts random keys from the entire keyspace. |
| `volatile-random` | Evicts random keys from among those set with TTL expirations. |
| `volatile-ttl` | Evicts the keys with the shortest TTL from among those set with TTL expirations. |

### Modifiable configuration parameters

Modifiable when creating or updating an instance.

| Parameter | Description | Acceptable values |
|---|---|---|
| `maxmemory-clients` | Maximum memory usage of normal/pubsub clients in total. If the limit is hit, the client with the most memory usage is evicted. | Integer percent `0%` to `100%` of instance maxmemory. Default depends on node type. |
| `maxmemory` | Adjustable limit at which the eviction policy takes effect. Set at node level, applies to all nodes. Example: 58 GB `highmem-xlarge` nodes, 90% of capacity means `maxmemory` 52.2 GB. | Units: `b` (default) `k` `kb` `m` `mb` `g` `gb` |
| `maxmemory-policy` | Behavior when data reaches `maxmemory`. | `noeviction` `allkeys-lru` `volatile-lru` (default) `allkeys-random` `volatile-random` `volatile-ttl` `volatile-lfu` `allkeys-lfu` |
| `notify-keyspace-events` | Lets clients subscribe to notifications on keyspace events. | `""` none (default); `K` keyspace events (`__keyspace@<db>__` prefix); `E` keyevent events (`__keyevent@<db>__` prefix); `g` generic commands (DEL, EXPIRE, RENAME); `$` string; `l` list; `s` set; `h` hash; `z` sorted set; `x` expired events; `e` evicted events; `A` alias for `g$lshzxe` ("AKE" = all events) |
| `slowlog-log-slower-than` | Slow log threshold in microseconds. | Default 10000. `0` logs every command; `-1` disables the slow log; other negative values are rejected. |
| `maxclients` | Max clients for the instance. | Default depends on node type (see the node specification page). |
| `databases` | Number of databases; Cluster Mode Disabled instances only. Settable only at instance creation. | Default 16; up to 100. |
| `cluster-databases` | Number of databases, version 9.0 and later; Cluster Mode Enabled instances only. Settable only at instance creation. | Default 1; up to 100. |

### Unmodifiable configuration parameters

- `proto-bulk-max-len` is set to 256 MB and cannot be changed.

## Notes

- To modify these parameters see the configure-instances page; changes do not restart or interrupt the instance.
- Source inconsistency: the quotas page says "Databases per instance: 1"; the cluster-mode page gives 1 for Cluster Mode Enabled and 16 (configurable up to 100) for Cluster Mode Disabled; and the supported-configurations page describes `cluster-databases` for Cluster Mode Enabled instances (version 9.0 and later) with default 1 and up to 100. Kept as written on each page; check the value for your mode and engine version.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/supported-instance-configurations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-instances.md](./configure-instances.md)
- [instance-node-specification.md](./instance-node-specification.md)
- [quotas.md](./quotas.md)
