---
source: https://docs.cloud.google.com/memorystore/docs/redis/quotas
---

# Memorystore for Redis quotas and limits

Current resource capacity limits and per-second API request quotas for Memorystore for Redis.

## Signature / Usage

Create requests count against the per-project create quota:

```bash
gcloud redis instances create INSTANCE_ID --size=SIZE --region=REGION_ID
```

## Options / Props

### Instance limits

| Limit | Value |
|---|---|
| Databases per instance | 16 |
| Connected clients per instance for Basic Tier | 65,000 |
| Connected clients per instance for Standard Tier | 65,000 |
| Connected clients per instance for Standard Tier with read replicas | 65,000 for each node including the primary and read replicas |

### Regional capacity quota

| Quota | Value |
|---|---|
| Data provisioned per region | 1 TB |

### API requests quota (subject to change)

| API Requests Quota | Value |
|---|---|
| Create Redis instance requests per project per minute | 30 |
| API Requests per minute | 3,000 |

## Notes

- For instances using both in-transit encryption and Redis 6.x or earlier, connection limits can be lower.
- Example: three 300 GB instances in `us-central1` consume 900 GB of the 1 TB quota, leaving 100 GB.
- You cannot request a quota increase for Memorystore for Redis API operations (create, update, export). There is no limit on the number of Redis commands such as `SET`, `GET` and `DEL`. Use exponential backoff on errors.
- Counted operations: get (`describe`), list, create, delete, import and export, update, upgrade and failover. The quota applies to redis.googleapis.com requests, not Redis protocol commands, and is shared across all applications and IP addresses of a project.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/redis/create-manage-instances
- Source: https://docs.cloud.google.com/memorystore/docs/redis/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-manage-instances.md](./create-manage-instances.md)
- [instances.md](./instances.md)
