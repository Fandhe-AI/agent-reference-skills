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
- If a read replica fails, the database stays operational and reads are served by the primary replicas, with higher latency; primary replicas are highly available with multiple replicas in all plans
- With Prod Pack, replicas (including read replicas) are deployed across multiple availability zones, so a replica or zone failure is covered by another zone in the same region without extra latency
- For read-your-writes consistency see the Read Your Writes how-to (https://upstash.com/docs/redis/howto/readyourwrites, not mirrored here)
- Consistency: writes are processed by the key's leader and propagated asynchronously, so the model gives **Eventual Consistency**; **Causal Consistency** (Read-Your-Writes, Monotonic-Reads, Monotonic-Writes, Writes-Follow-Reads) is available within a single Redis connection (a TCP connection is a session). During a leader election, write requests can be blocked briefly; after cluster-wide failures such as split brain, anti-entropy jobs resolve conflicts with Last-Writer-Wins
- `Strong Consistency` mode for single-region databases was deprecated because of its latency impact; Upstash is moving toward CRDT-based data structures that provide Strong Eventual Consistency
- Source: https://upstash.com/docs/redis/features/consistency (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/redis/features/replication (fetched 2026-11-14; no version pin on the site)

## Related

- [Global Replication](./global-replication.md)
- [Durability](./durability.md)
