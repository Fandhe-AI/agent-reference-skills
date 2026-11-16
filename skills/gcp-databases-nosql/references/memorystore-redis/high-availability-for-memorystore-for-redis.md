---
source: https://docs.cloud.google.com/memorystore/docs/redis/high-availability-for-memorystore-for-redis
---

# High availability for Memorystore for Redis

Standard Tier replicates data asynchronously to one or more replicas and fails over automatically to a replica when the primary fails.

## Signature / Usage

Create a Standard Tier instance:

```bash
gcloud redis instances create myinstance --size=5 --region=us-central1 --tier=standard 
```

Check replication status from a client with the `INFO` command (the source names the command but shows no code block).

## Options / Props

| Item | Value |
|---|---|
| Replicas with `readReplicaMode` deactivated | primary plus one replica |
| Replicas with `readReplicaMode` enabled | primary plus 1 to 5 read replicas |
| Average unavailability on failover | about 30 seconds during automated repairs; 15 seconds for maintenance events |

## Notes

- Replication is asynchronous: replicas can lag, and acknowledged writes might be lost during a failover. Applications must tolerate losing acknowledged writes.
- With multiple replicas, failover goes to a healthy replica with the least replication lag.
- Failover drops all connections to the primary endpoint and, for read endpoint, connections to the promoted replica; other replicas keep serving. The same connection string or IP address is redirected to the new primary; no application change is needed. Retry with exponential backoff and test with a manual failover. The manual failover API is not supported when read replicas are enabled.
- Failover is triggered by scaling, version upgrade, manual failover and maintenance updates.
- HA does not guarantee full durability (for example during temporary regional failures). RDB snapshots are enabled by default when created in the Console. There is no cross-region replication; for disaster recovery or maximum durability the source recommends Memorystore for Valkey (cross-region replication, daily backups, AOF persistence).
- Monitor HA metrics with Cloud Monitoring.
- Manual failover is disruptive; try it on a disposable instance first.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/redis/create-manage-instances
- Source: https://docs.cloud.google.com/memorystore/docs/redis/high-availability-for-memorystore-for-redis (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [redis-tiers.md](./redis-tiers.md)
- [about-read-replicas.md](./about-read-replicas.md)
- [about-rdb-snapshots.md](./about-rdb-snapshots.md)
