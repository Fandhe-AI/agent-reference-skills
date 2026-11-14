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

- Supported regions: 14 AWS regions (`us-east-1`, `us-east-2`, `us-west-1`, `us-west-2`, `ca-central-1`, `sa-east-1`, `eu-west-1`, `eu-west-2`, `eu-central-1`, `ap-south-1`, `ap-southeast-1`, `ap-northeast-1`, `ap-southeast-2`, `af-south-1`) and 4 Google Cloud regions (`us-central1`, `us-east4`, `europe-west1`, `asia-northeast1`)
- Internal 99th-percentile latencies: read from the same region under 1 ms, write from the same region under 5 ms, read/write from the same continent under 50 ms
- Consistency: eventually consistent. A write returns after the primary processes it and is replicated to read regions asynchronously, so a read may return a stale value; periodic anti-entropy jobs resolve conflicts (LWW) after cluster-wide failures such as split brain
- Architecture: single-leader per key at the primary region; if the primary fails, read replicas elect a new leader, the only window where requests can block briefly. A region failure routes requests to another region
- A global database with a primary and no read regions is practically a regional database; regions can be added or removed on a running database
- Not a good fit for write-heavy workloads (it optimizes read latency)
- Pricing: \$0.2 per 100K commands; writes are replicated to every read region and each replication counts as a command (1 primary + 1 read region: 100K writes cost \$0.4). Free tier allows at most one read region
- Auto-upgrade from regional to global is not supported (the docs describe exporting from the old database and importing into the global one)
- Source: https://upstash.com/docs/redis/features/globaldatabase (fetched 2026-11-14; no version pin on the site)
- Read replicas can be added or removed with zero downtime
- Sub-millisecond read latency achievable when client and replica are in the same AWS region
- Write latency is determined by the primary region — choose the region closest to write-heavy workloads
- Global databases are required for SOC-2, HIPAA compliance features, and VPC Peering
- ACL users are **not** migrated automatically when moving from regional to global — redefine them after migration
- Migrating from regional to global: create a backup on the regional DB, restore to the global DB; this flushes the destination first

## Related

- [Replication](./replication.md)
- [Connection & Authentication](./connection-auth.md)
