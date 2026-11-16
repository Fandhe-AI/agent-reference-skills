---
source: https://docs.cloud.google.com/memorystore/docs/valkey/supported-versions
---

# Supported versions

Memorystore for Valkey is backed by open-source Valkey and supports versions 7.2, 8.0, 9.0 and 9.1. The default version is 9.1. You can upgrade an instance to any newer version (for example 7.2 to 9.1) but cannot downgrade afterwards.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/create-instances (`--engine-version` accepts `VALKEY_7_2`, `VALKEY_8_0`, `VALKEY_9_0`, `VALKEY_9_1`; default `VALKEY_9_1`)

```bash
gcloud memorystore instances create INSTANCE \
--location=REGION_ID \
--endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/PROJECT_ID/global/networks/NETWORK_ID", "projectId": "PROJECT_ID"}}]}]' \
--replica-count=REPLICA_COUNT \
--node-type=NODE_TYPE \
--engine-version=ENGINE_VERSION \
--shard-count=SHARD_COUNT \
--acl-policy=ACL_POLICY_NAME \
--mode=MODE
```

## Options / Props

| Valkey major version | Last update |
|---|---|
| 9.1 | July 27, 2026 |
| 9.0 | March 11, 2026 |
| 8.0 | October 2, 2024 |
| 7.2 | August 30, 2024 |

### Valkey 9.1 (throughput, database-level ACLs, new commands)

| Feature | Description |
|---|---|
| Throughput gains | I/O threading and string handling optimizations: up to 17% more overall throughput (up to 30% for `GET`). |
| Database-level access control | ACLs can restrict user access at the database level. |
| New commands | `HGETDEL` (return a hash field value and delete it atomically), `MSETNX` (set multiple keys with a shared expiration time), `CLUSTERSCAN` (scan keys across all nodes). `HSETEX` supports `NX` and `XX`. |

### Valkey 9.0

| Feature | Description |
|---|---|
| Hash field expiration | Per-field expiration instead of only the whole hash key. |
| Memory prefetching | Prefetch for pipelined commands; up to 40% more throughput. |
| Zero-copy responses | No data copying for large requests; up to 20% more throughput. |
| `COMMANDLOG` command | Container command for logs of resource-intensive commands (slow-running, large-request, large-reply); diagnoses latency that `SLOWLOG` misses. |
| SIMD optimizations | Accelerates `BITCOUNT` and `hyperloglog`; up to 200% more throughput. |
| By-polygon geospatial | Polygons in geospatial index queries. |

### Valkey 8.0

| Feature | Description |
|---|---|
| Asynchronous I/O threading | Parallel processing between main thread and I/O threads. |
| Reliable cluster scaling | Better re-sharding reliability when slot migration fails; prevents data loss and inconsistency. |
| Key embedding in main dictionary | Lower memory overhead, better performance on large datasets. |
| Lightweight cluster messages for Pub/Sub | Less overhead for Pub/Sub propagation within a cluster. |

### Valkey 7.2

| Feature | Description |
|---|---|
| New command | `WAITAOF` blocks the client until a specified number of Redises have synced all previous writes to the AOF on disk. |
| Memory optimization | Less memory for small list and set keys; better cluster bus link and RDB page cache handling. |
| Performance optimization | Faster `ZRANGE` replies and double replies; more efficient multi-key commands in cluster mode. |

## Notes

- After you upgrade the version of an instance, you cannot downgrade it to an earlier version.
- Check an instance's version with the view-instance-information page; release history is in the product release notes.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/supported-versions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-instances.md](./create-instances.md)
- [product-overview.md](./product-overview.md)
