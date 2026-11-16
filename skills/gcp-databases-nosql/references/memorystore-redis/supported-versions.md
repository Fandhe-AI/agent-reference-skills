---
source: https://docs.cloud.google.com/memorystore/docs/redis/supported-versions
---

# Supported Redis versions

Memorystore for Redis is backed by open source Redis and supports versions 3.2, 4.0, 5.0, 6.x, 7.0 and 7.2. The default version is 7.2 according to this page.

## Signature / Usage

Choose a version at creation with `--redis-version` (values from the create page: `redis_7_2`, `redis_7_0`, `redis_6_x`, `redis_5_0`, `redis_4_0`, `redis_3_2`):

Adapted (not in the official docs): `--redis-version=redis_6_X` changed to `redis_6_x`, the value gcloud accepts (it rejects `redis_6_X` as an invalid choice).

```bash
gcloud redis instances create myinstance --size=5 --region=us-central1 \
    --zone=us-central1-a --redis-version=redis_6_x
```

## Options / Props

### Current versions

| Redis major version | Patch level | Last update |
|---|---|---|
| 7.2 | 7.2.0 | February 29, 2024 |
| 7.0 | 7.0.12 | July 17, 2023 |
| 6.x | 6.2.14 | November 14, 2023 |
| 5.0 | 5.0.14 | May 09, 2022 |
| 4.0 | 4.0.14 | June 17, 2019 |
| 3.2 | 3.2.13 | June 21, 2018 |

### Feature support

| Version | Feature | Supported |
|---|---|---|
| 7.2 | Vector search (LangChain integration) | Yes |
| 7.0 | Redis functions | Yes |
| 7.0 | Client eviction | Yes |
| 7.0 | ACL improvements | No |
| 7.0 | Sharded Pub/Sub | No |
| 7.0 | Multi-part AOF persistence | No |
| 7.0 | Redis modules | No |
| 6.x | Threaded I/O (optimal threads per capacity tier; additional threads from M3) | Yes |
| 6.x | LCS command | Yes |
| 6.x | RDB diskless load for replicas | Yes |
| 6.x | Built-in traffic encryption (use Memorystore in-transit encryption instead) | No |
| 6.x | ACLs | No |
| 5.0 | Streams | Yes, via `stream-node-max-bytes` and `stream-node-max-entries` |
| 5.0 | Sorted set commands `ZPOPMAX`, `ZPOPMIN`, `BZPOPMAX`, `BZPOPMIN` | Yes |
| 4.0 | LFU eviction | Yes, via `allkeys-lfu` and `volatile-lfu` maxmemory policies |
| 4.0 | Active defragmentation | Yes, via the `activedefrag` parameter |

## Notes

- One patch version per major OSS Redis version is supported and kept up to date during maintenance; critical security patches are rolled out outside the regular maintenance period.
- You can upgrade an instance to any newer version (for example 3.2 to 7.2). Instances running 7.0 with in-transit encryption see improved performance.
- Source inconsistency: this page states the default version is 7.2, while the create page marks `redis_7_0` as default and the Console as `7.0 (recommended)`.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/redis/create-manage-instances (the supported-versions page has no commands).
- Corrected from the official docs: the create page lists `redis_6_X` among the `--redis-version` values and its example ends with `--redis-version=redis_6_X`, which gcloud rejects (`Invalid choice: 'redis_6_X'. Did you mean 'redis_6_x'?`); the `--redis-version` choices in the gcloud reference are lower case (`redis_3_2`, `redis_4_0`, `redis_5_0`, `redis_6_x`, `redis_7_0`, `redis_7_2`).
- Source: https://docs.cloud.google.com/memorystore/docs/redis/supported-versions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-manage-instances.md](./create-manage-instances.md)
- [memorystore-for-redis-overview.md](./memorystore-for-redis-overview.md)
