---
source: https://docs.cloud.google.com/memorystore/docs/redis/redis-tiers
---

# Redis tiers

Memorystore for Redis supports Basic and Standard Tiers. Basic Tier suits caches that can withstand a cold restart and full cache flush; Standard Tier provides high availability using replication, read replicas and automatic failover.

## Signature / Usage

Select the tier at creation time (Basic is the default):

```bash
gcloud redis instances create myinstance --size=5 --region=us-central1 --tier=standard 
```

## Options / Props

| Specifications | Basic Tier | Standard Tier (read replicas disabled) | Standard Tier (read replicas enabled) |
|---|---|---|---|
| Description | Cache with no replication | Redundancy and availability using replication | Replication to back up data, plus multiple read replicas to increase read throughput |
| Max Redis primary size | 300 GB | 300 GB | 300 GB |
| Max network bandwidth | 16 Gbps | 16 Gbps | 16 Gbps total for writes; 16 Gbps per node for reads |
| I/O threads | Yes | Yes | Yes |
| Scale primary size | Yes | Yes | Yes |
| Scale number of read replicas | No | No | Yes |
| Cross-zone replication | No | Yes | Yes |
| Automatic failover | No | Yes | Yes |
| Read replicas | No | No | Yes |
| In-transit encryption | Yes | Yes | Yes |
| Maintenance window | Yes | Yes | Yes |
| Cloud Monitoring | Yes | Yes | Yes |

## Notes

- You cannot upgrade from Basic to Standard Tier or the reverse. To move data from a Basic Tier instance to a new Standard Tier instance, use import and export.
- Architecture: Basic is one Redis node with an ephemeral cache. Standard fails over to a replica if the primary fails. Standard with read replicas adds distributed reads.
- I/O threads are only available on M3 instances or higher running Redis version 6.x. Read throughput depends on the number of nodes (1 primary + 2 read replicas = 48 Gbps total read throughput); maximum write throughput is 16 Gbps.
- RDB snapshots are enabled by default when an instance is created in the Google Cloud console.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/redis/create-manage-instances
- Source: https://docs.cloud.google.com/memorystore/docs/redis/redis-tiers (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [high-availability-for-memorystore-for-redis.md](./high-availability-for-memorystore-for-redis.md)
- [about-read-replicas.md](./about-read-replicas.md)
- [create-manage-instances.md](./create-manage-instances.md)
