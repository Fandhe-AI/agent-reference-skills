---
source: https://docs.cloud.google.com/memorystore/docs/redis/about-read-replicas
---

# About read replicas

Standard Tier instances can scale read queries across 1 to 5 read replicas through a read endpoint. Replication is asynchronous.

## Signature / Usage

Connect to the read endpoint (find its IP in the instance's read replica information):

Adapted (not in the official docs): the lower-case placeholder `read-endpoint-ip` was upper-cased to `READ_ENDPOINT_IP`.

```bash
telnet READ_ENDPOINT_IP 6379
```

## Options / Props

| Constraint | Value |
|---|---|
| Replicas per Standard Tier instance | 1 to 5 |
| Minimum node size | nodes >= 5 GB |
| Redis version | 5.0 or higher |
| IP range | `/28` or greater (`/27`, `/26` valid; `/29` not supported) |
| Enabling on existing instance | exclusive operation; needs a secondary `/28` CIDR range for node placement, which can be chosen or auto-selected |
| Disabling | not possible once enabled |

## Notes

- Not enabled by default on Standard Tier. The read endpoint load-balances connections evenly across available replicas (never the primary); a connection stays on the same replica for its lifetime. A replica in full sync is not available for reads; high-lag replicas keep serving.
- For "read your write" consistency use the primary endpoint; replicas can lag by a few seconds. TTLs on the primary keep expired keys from being read on replicas.
- Failover usually completes in under 30 seconds, connections to the primary endpoint are dropped, and the replica with the least lag in the same zone is preferred. Acknowledged writes can be lost and replicas may need a full sync (minutes up to an hour).
- Failure modes: unavailable replica (recovery waits for a zone to return after a zone failure); zone failure; network partition (quorum-based, minority-partition primary self-demotes; monitor `master_link_down_since_seconds` and `offset_diff`); full sync (higher CPU / memory on the primary); `-READONLY You can't write against a read only replica.` on the primary endpoint (recreate connections or restart the client, otherwise contact Support).
- Enabling does not change the read/write IP; the read endpoint IP is in the original range. Enabling on an existing instance with heavy writes may fail, so reduce write traffic first.
- Scaling: add or remove replicas during low traffic; adding a replica loads the primary during full sync, removing one closes its connections. Connections are not rebalanced, so close them periodically.
- Best practices: keep memory utilization under 50% during export / scaling; keep replica CPU under 50% as a starting point; if BGSAVE hits OOM the child is killed and the node stays available. Cross-zone transfer from the application VM is charged.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/redis/connect-redis-instance (the read replicas page has no commands).
- Adapted from the official docs: the source writes `telnet read-endpoint-ip 6379`.
- Source: https://docs.cloud.google.com/memorystore/docs/redis/about-read-replicas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [high-availability-for-memorystore-for-redis.md](./high-availability-for-memorystore-for-redis.md)
- [redis-tiers.md](./redis-tiers.md)
- [networking.md](./networking.md)
- [about-redis-auth.md](./about-redis-auth.md)
