# Replication

Upstash Redis automatically replicates data across multiple instances within a region for high availability and read scalability. Available on all paid plans.

## Signature / Usage

No configuration required in application code — replication is managed by Upstash.

```ts
// Reads distribute across replicas automatically
const redis = Redis.fromEnv()
const value = await redis.get("key")
```

## Notes

- Uses **single-leader replication**: each key has one leader replica that handles writes; backup replicas receive propagated updates
- Read requests are distributed across replicas using round-robin
- Primary replicas handle reads and writes; read replicas handle reads only
- If a replica becomes unavailable, other replicas continue serving traffic
- During a leader failure, a brief election may temporarily block requests until a new leader is selected
- **Prod Pack** (add-on) extends replication across multiple availability zones within a region for zone-level fault tolerance
- Additional replicas can be provisioned to scale read throughput without downtime

## Related

- [Global Replication](./global-replication.md)
- [Durability](./durability.md)
