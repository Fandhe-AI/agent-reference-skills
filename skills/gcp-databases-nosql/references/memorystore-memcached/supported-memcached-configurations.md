---
source: https://docs.cloud.google.com/memorystore/docs/memcached/supported-memcached-configurations
---

# Supported Memcached configurations

Modifiable and unmodifiable Memcached configuration parameters with defaults. Updating a node's configuration flushes that node's cache, so stage changes and apply them node by node.

## Signature / Usage

### Set parameters

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances update INSTANCE_ID --region=REGION --parameters=PARAMETER=VALUE,PARAMETER=VALUE
```

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances apply-parameters INSTANCE_ID --region=REGION --node-ids=NODE_1_ID,NODE_2_ID
```

## Options / Props

### Modifiable parameters

| Parameter | Acceptable values | Default | Description |
|---|---|---|---|
| listen-backlog (-b) | 1-10000 | 1024 | Length of the connection backlog queue. |
| disable-flush-all (-F) | true, false | false | `true` disables `flush-all`. Modifying it increments `cmd_flush` but no flush occurs. |
| disable-watch (-W) | true, false | false | Memcached 1.6.15 or later. `true` disables watch commands. |
| max-item-size (-I) | 524288-134217728 (bytes) | 1048576 | Max item size. Must be >= slab_chunk_max (524288 bytes, not changeable), evenly divisible by 524288, and no more than half the cache size (`-m`). |
| slab-min-size (-n) | 1-1024 (bytes) | 48 | Minimum item size / smallest slab. |
| slab-growth-factor (-f) | 1.01-100.00 | 1.25 | Multiplier for slab chunk sizes. |
| protocol (-B) | auto, ascii | auto | Binding protocol; auto supports binary and ascii. |
| disable-cas (-C) | true, false | false | `true` disables CAS; saves 8 bytes per item. |
| disable-evictions (-M) | true, false | false | `true`: when out of memory return an error instead of evicting; writes rejected until memory is available. |
| max-reqs-per-event (-R) | 1-1000 | 20 | Max requests per event per client connection. |
| reserved-memory-percent | 0.0-50.0 | 10.0 | Reserved Memory percentage; reduces cache memory by the same percentage. Instances created before October 25, 2021 default to 0. |

### Supported extended options

| Parameter | Acceptable values | Default | Description |
|---|---|---|---|
| track_sizes | true, false | false | Enables `stats sizes`. Not recommended in production. |
| watcher_logbuf_size | 0-2097151 (KiB) | 262144 | Write buffer per active watcher. |
| worker_logbuf_size | 48-524288 (KiB) | 65536 | Buffer per active worker. |
| lru_crawler | true, false | true | Background process removing LRU items from slabs. |
| idle_timeout | 0-86400 seconds | 0 (disabled) | Client idle time before disconnect. |
| lru_maintainer | true, false | true | Background process sorting items by recency. |
| maxconns_fast | true, false | false | `false` queues connections over the limit; `true` drops them with an error. |
| hash_algorithm | jenkins, murmur3, xxh3 | murmur3 | `xxh3` requires Memcached 1.6.15 or higher. |

### Unmodifiable parameters

| Parameter | Value |
|---|---|
| port (-p) | 11211 |
| memory-limit (-m) | Set to the node memory; add Reserved Memory instead. |
| threads (-t) | Matches the CPU count of each node. |
| conn-limit (-c) | 65000 per node |
| verbose (-v) | true |
| slab_automove, slab_reassign | true (enabled) |
| enable-largepages (-L), lock-memory (-k) | false (disabled) |
| expirezero-does-not-evict | Not supported (deprecated in 1.4.35). |
| slab_chunk_max | 524288 bytes |
| modern | true (enabled) |

## Notes

- `disable-evictions=true` combined with a full cache makes writes fail; `disable-flush-all` removes the `flush-all` command, which is a destructive command.
- Adapted from the official docs: the borrowed blocks use lower-case placeholders in the source (`instance-id`, `region`, `parameter=value,parameter=value`, `node-1-id,node-2-id`); they are upper-cased here, as on configure-memcached.md.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/supported-memcached-configurations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/memcached/configure-memcached (the parameter list page has no code).

## Related

- [configure-memcached.md](./configure-memcached.md)
- [memory-management-best-practices.md](./memory-management-best-practices.md)
- [best-practices.md](./best-practices.md)
