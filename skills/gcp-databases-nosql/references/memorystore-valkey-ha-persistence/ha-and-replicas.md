---
source: https://docs.cloud.google.com/memorystore/docs/valkey/ha-and-replicas
---

# High availability and replicas

How Memorystore for Valkey provides high availability (HA): clients connect directly to shard endpoints, a highly available instance is a regional resource with 0-5 replicas per shard spread across zones, and a replica is promoted automatically on planned maintenance or unexpected primary failure.

## Signature / Usage

### Read from replicas

- Cluster Mode Enabled: use the `READONLY` command to establish a connection that allows your client to read from replicas.
- Cluster Mode Disabled: connect to the reader endpoint to reach any of the available replicas.

### Add a replica (replica count)

To enable HA, provision at least 1 replica for every shard, either when creating the instance or by scaling the replica count (see [scale-replica-count.md](./scale-replica-count.md)).

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/scale-replica-count

```bash
gcloud memorystore instances update INSTANCE_ID \
  --location=REGION_ID \
  --replica-count=REPLICA_COUNT
```

## Options / Props

| Topic | Value stated in the source |
|-------|----------------------------|
| Replicas per shard | 0-5 |
| Recommended HA config | multi-zone instance with at least 1 replica per shard |
| No replicas | single-zone instance recommended |
| Average unavailability during automated repairs and maintenance failover | about 30 seconds |
| Unplanned failover | tens of seconds (detect failure, elect a replica) |
| Node repair | minutes (all primary and replica nodes; also a failed primary with no replicas) |
| `maxmemory` when adding a replica | keep or set at 80% of node capacity (20% reserved for overhead) |

### Keyspace impact of a single zone outage

| Instance | Effect |
|----------|--------|
| Multi-zone, HA | Entire keyspace available for reads and writes; read capacity reduced (some replicas unavailable). Over-provisioning is strongly recommended. Replicas are restored after the outage. |
| Multi-zone, non-HA (no replicas) | Keyspace portion in the affected zone is flushed and unavailable for reads and writes during the outage; primaries restored afterwards. |
| Single-zone, HA or non-HA | If the instance's zone has an outage, the cluster is unavailable and data is flushed. An outage in another zone does not affect it. |

## Notes

- Failover drops existing connections to the primary endpoint; the same connection string or IP address then redirects to the new primary automatically. Connections to the promoted replica on the read endpoint are dropped; connections to other replicas are not.
- After an unplanned failover, retry connections with exponential backoff to avoid overloading primary and replica nodes.
- Lost writes: acknowledged writes may be lost on failover from an unexpected failure because Valkey replication is asynchronous. Client applications can use the Valkey `WAIT` command to improve data safety.
- Adding a replica requires an RDB snapshot (fork + copy-on-write); memory can grow up to double the data size. If the instance uses more than 80% of the node's maximum memory, adding the replica fails with an error; lower memory usage below 80% or scale the node type, then add the replica again. Lower write traffic while adding replicas.
- Replicas increase read throughput at the cost of potential data staleness.
- Memorystore for Valkey is managed Valkey on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- The source also shows architecture diagrams, omitted here.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/ha-and-replicas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [scale-replica-count.md](./scale-replica-count.md)
- [persistence-overview.md](./persistence-overview.md)
- [about-cross-region-replication.md](./about-cross-region-replication.md)
