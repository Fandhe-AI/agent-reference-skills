---
source: https://docs.cloud.google.com/memorystore/docs/cluster/supported-instance-configurations
---

# Supported instance configurations

Maxmemory policies and the Redis configuration parameters that can be modified when creating or updating a Memorystore for Redis Cluster instance.

## Signature / Usage

### Create a cluster (configuration parameters are set at create or update time)

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

### Maxmemory policies

Default is `volatile-lru`.

| Policy | Behavior |
|---|---|
| `noeviction` | Returns an error when the instance reaches maxmemory. Does not overwrite or evict any data. |
| `allkeys-lfu` | Evicts the least frequently used keys from the entire keyset. |
| `allkeys-lru` | Evicts the least recently used keys from the entire keyset. |
| `volatile-lfu` | Evicts the least-frequently-used keys that have a TTL. |
| `volatile-lru` | Evicts the least recently used keys that have a TTL. |
| `allkeys-random` | Evicts random keys from the entire keyspace. |
| `volatile-random` | Evicts random keys from among those with a TTL. |
| `volatile-ttl` | Evicts the keys with the shortest TTL from among those with a TTL. |

### Modifiable configuration parameters

| Parameter | Description | Acceptable values |
|---|---|---|
| maxmemory-clients | Redis 7.0 or later. Maximum memory usage of normal/pubsub clients in total; if hit, the client with the most memory usage is evicted. | Integer percent between `0%` and `100%` of instance maxmemory. Default depends on the node type. |
| maxmemory | Adjustable limit at which the eviction policy takes effect. Set at node level, applies to all nodes (e.g. 58 GB `redis-highmem-xlarge` at 90% means `maxmemory` 52.2 GB). | Units: `b` (default) `k` `kb` `m` `mb` `g` `gb` |
| maxmemory-policy | Behavior when data reaches `maxmemory`. | `noeviction` `allkeys-lru` `volatile-lru` (default) `allkeys-random` `volatile-random` `volatile-ttl` `volatile-lfu` `allkeys-lfu` |
| notify-keyspace-events | Subscribe to notifications on keyspace events. | `""` no event (default); `K` keyspace events (`__keyspace@<db>__` prefix); `E` keyevent events (`__keyevent@<db>__` prefix); `g` generic commands (DEL, EXPIRE, RENAME); `$` string; `l` list; `s` set; `h` hash; `z` sorted set; `x` expired events; `e` evicted events; `A` alias for `g$lshzxe` ("AKE" = all events) |
| slowlog-log-slower-than | Slow log threshold in microseconds. | Default 10000. `0` logs every command; `-1` disables the slow log; other negatives rejected. |
| maxclients | Max client connections. | Default depends on the node type. |

### Unmodifiable configuration parameters

| Parameter | Value |
|---|---|
| proto-bulk-max-len | 256 MB (can't be changed) |

## Notes

- To modify these configurations, see the Configure a cluster page: https://docs.cloud.google.com/memorystore/docs/cluster/configure-instances
- The twin lists `volatile-lfu` / `allkeys-lfu` as "Redis version 4.0 and higher" in the table; the cluster is based on Redis 7.x.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/cluster/create-instances (this page has no code).
- Source: https://docs.cloud.google.com/memorystore/docs/cluster/supported-instance-configurations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-node-specification.md](./cluster-node-specification.md)
- [quotas.md](./quotas.md)
