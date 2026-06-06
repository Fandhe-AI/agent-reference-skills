# Global Replication

Multi-region Upstash Redis that automatically replicates data across selected AWS regions. Read commands are routed to the nearest replica; writes go to the primary region.

## Signature / Usage

```ts
// No SDK change required — global routing is transparent
import { Redis } from "@upstash/redis"
const redis = Redis.fromEnv()

// Reads are automatically served from the nearest replica
const value = await redis.get("key")

// Writes route to the primary and propagate to all read replicas
await redis.set("key", "value")
```

## Options / Props

| Setting | Description |
|---------|-------------|
| Primary Region | AWS region that handles all write operations |
| Read Regions | Additional AWS regions that receive replicated data and serve reads |

## Notes

- Supports 12+ AWS regions across North America, Europe, Asia-Pacific, and South America
- Read replicas can be added or removed with zero downtime
- Sub-millisecond read latency achievable when client and replica are in the same AWS region
- Write latency is determined by the primary region — choose the region closest to write-heavy workloads
- Global databases are required for SOC-2, HIPAA compliance features, and VPC Peering
- ACL users are **not** migrated automatically when moving from regional to global — redefine them after migration
- Migrating from regional to global: create a backup on the regional DB, restore to the global DB; this flushes the destination first

## Related

- [Replication](./replication.md)
- [Connection & Authentication](./connection-auth.md)
