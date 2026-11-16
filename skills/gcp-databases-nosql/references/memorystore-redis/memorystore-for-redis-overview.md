---
source: https://docs.cloud.google.com/memorystore/docs/redis/memorystore-for-redis-overview
---

# Memorystore for Redis overview

Memorystore for Redis is a fully managed service powered by the Redis in-memory data store, for application caches with sub-millisecond data access. It is Redis protocol compliant, so applications that use open source Redis can move without code changes.

## Signature / Usage

### Connect from supported environments

Any standard Redis client works from App Engine flexible / standard, Compute Engine VMs, Cloud Run functions, Cloud Run and Google Kubernetes Engine clusters. The client must be on the same network as the instance. Create command (from the create and manage instances page):

```bash
gcloud redis instances create INSTANCE_ID --size=SIZE --region=REGION_ID
```

## Options / Props

### Tier capabilities

| Specifications | Basic Tier | Standard Tier (read replicas disabled) | Standard Tier (read replicas enabled) |
|---|---|---|---|
| Description | Cache with no replication | Redundancy and availability using replication | Replication plus multiple read replicas to increase read throughput |
| Max Redis primary size | 300 GB | 300 GB | 300 GB |
| Max network bandwidth | 16 Gbps | 16 Gbps | 16 Gbps total for writes; 16 Gbps per node for reads |
| I/O threads | Yes (M3 or higher, Redis 6.x) | Yes (M3 or higher, Redis 6.x) | Yes (M3 or higher, Redis 6.x) |
| Scale primary size | Yes | Yes | Yes |
| Scale number of read replicas | No | No | Yes |
| Cross-zone replication | No | Yes | Yes |
| Automatic failover | No | Yes | Yes |
| Read replicas | No | No | Yes |
| In-transit encryption | Yes | Yes | Yes |
| Maintenance window | Yes | Yes | Yes |
| Cloud Monitoring | Yes | Yes | Yes |

### Capacity tier performance

| Capacity Tier | Minimum Network Throughput | I/O threads in version 4 and 5 | Minimum I/O threads in version 6 and 7 |
|---|---|---|---|
| M1: 1 - 4 GB | 10 Gbps | N/A | 1 |
| M2: 5 - 10 GB | 10 Gbps | N/A | 1 |
| M3: 11 - 35 GB | 10 Gbps | N/A | 2 |
| M4: 36 - 100 GB | 16 Gbps | N/A | 6 |
| M5: 101 - 300 GB | 16 Gbps | N/A | 8 |

## Notes

- Read throughput depends on the number of nodes including the primary: 1 primary + 2 read replicas gives 48 Gbps total read throughput.
- Standard Tier provides a 99.9% availability SLA, up to five replicas across zones; scaling a Standard Tier instance causes less than a minute of downtime. Read queries can be scaled across five read replicas via the read endpoint.
- Supported versions: 7.2, 7.0, 6.x, 5.0, 4.0 and 3.2. Billing is hourly by provisioned GB.
- Differences from open source Redis: AOF persistence is not supported (only RDB snapshots and export); most parameters are preconfigured and cannot be changed; some commands that interfere with the managed service are blocked.
- RDB snapshots are enabled by default when an instance is created in the Google Cloud console.
- Some serverless environments need a Serverless VPC Access connector. If a CMEK instance cannot reach Cloud KMS during an outage, reconnecting may require a different IP address.
- Memorystore for Redis Cluster is a different product with separate documentation.
- Managed Valkey / Redis / Memcached on Google Cloud; distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/redis/create-manage-instances (the overview page has no commands).
- Source: https://docs.cloud.google.com/memorystore/docs/redis/memorystore-for-redis-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [redis-tiers.md](./redis-tiers.md)
- [instances.md](./instances.md)
- [create-manage-instances.md](./create-manage-instances.md)
- [connect-redis-instance.md](./connect-redis-instance.md)
