---
source: https://docs.cloud.google.com/memorystore/docs/valkey/general-best-practices
---

# General best practices

Guidance for memory, CPU, scaling thresholds, client configuration (cluster-aware clients, discovery, timeouts), persistence, single-zone instances, capacity planning and TLS on Memorystore for Valkey.

## Signature / Usage

### Find slow commands and measure latency

Resource-intensive commands are found with `SLOWLOG` (https://valkey.io/commands/slowlog/); real-time node data with `INFO memory` and `INFO cpu` (https://valkey.io/commands/info/).

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/troubleshoot-issues (run from a Compute Engine VM in the same region and VPC network; append `--tls` and specify CAs if the instance uses in-transit encryption):

```bash
redis-cli --latency -h ENDPOINT_ADDRESS -p PORT
```

### Resource-intensive commands and alternatives

| Category | Resource-intensive command | Resource-efficient alternative |
|---|---|---|
| Entire keyspace | `KEYS` | `SCAN` |
| Variable-length keyset | `LRANGE` | Limit the size of the range you use for a query |
| Variable-length keyset | `ZRANGE` | Limit the size of the range you use for a query |
| Variable-length keyset | `HGETALL` | `HSCAN` |
| Variable-length keyset | `SMEMBERS` | `SSCAN` |
| Blocks script running | `EVAL` | Ensure the script doesn't run indefinitely |
| Blocks script running | `EVALSHA` | Ensure the script doesn't run indefinitely |
| Remove keys | `DEL` | `UNLINK` |
| Publish and subscribe | `PUBLISH` | `SPUBLISH` |
| Publish and subscribe | `SUBSCRIBE` | `SSUBSCRIBE` |

These commands can cause high latency and client timeouts, memory pressure, data loss during node replication and synchronization (main thread blocked), and starved health checks, observability and replication.

## Options / Props

### Memory

| Item | Value |
|---|---|
| Eviction policy | `volatile-lru` (the default `maxmemory-policy`; configurable, see `memorystore-valkey-overview/supported-instance-configurations.md`); set key expirations with commands such as `EXPIRE` |
| Metric to watch | `/instance/memory/maximum_utilization`; at about 80% and growing, scale up the node type, or lower `maxmemory` |
| Scale-in target (no key loss) | New shard count must allow at least 1.5 times the memory used by data (`/instance/memory/total_used_memory`) |
| Scale shards | During periods of low writes (replication / slot migration overhead causes memory pressure) |
| RDB snapshots and adding replicas | Keep `maxmemory` at 80% of node capacity (20% overhead); memory can grow up to double the data size (copy-on-write) |
| Adding a replica above 80% of max memory | Operation fails with an error; reduce memory below 80% or scale the node type, then add again |

### CPU

| Replicas per node | `/instance/cpu/maximum_utilization` target |
|---|---|
| 1 | 0.5 seconds primary, 0.5 seconds replica |
| 2 or more | 0.9 seconds primary, 0.5 seconds each replica |

Up to five replicas per shard. If exceeded, scale up shards or (below five) replicas. High CPU or exhausted resources (for example too many connections) can make external metrics go missing.

### Scaling thresholds (memory and CPU use the same numbers)

| Action | Condition |
|---|---|
| Scale out | Average utilization above 70%; or maximum above 80% and average above 50% |
| Scale in | Average below 50%; or maximum below 60% and average below 40% |

Metrics: `/instance/memory/average_utilization`, `/instance/memory/maximum_utilization`, `/instance/cpu/average_utilization`, `/instance/cpu/maximum_utilization`. A maximum much higher than the average indicates a hotspot; scale out. If the workload relies on key eviction, Google doesn't recommend scaling in for CPU or memory.

### Client connections

| Topic | Recommendation |
|---|---|
| Pool size | Start with one connection per Valkey node, then benchmark |
| Retries | Exponential backoff with jitter |
| TCP keepalive | Set `TCP keepalive time`, `TCP keepalive interval`, `TCP keepalive probes` (for example 30 s, 10 s, 3 resets idle unresponsive connections within a minute) |
| TCP user timeout | For example 15 seconds resets unresponsive connections with outstanding requests |
| Cluster Mode Enabled | Cluster-aware client with a slot-to-node map; refresh mapping on init, `MOVED`, `CLUSTERDOWN`, persistent timeouts, `READONLY`, and periodically (close stale connections) |
| Discovery | Prefer `CLUSTER SHARDS` (replaces deprecated `SLOTS`); one discovery request per client at a time, cached, with exponential backoff; use the discovery endpoint (highly available, load balanced, routes to nodes with the most up-to-date topology) |
| Cluster Mode Disabled | Writes and latest reads on the primary endpoint; reads from replicas on the reader endpoint; no topology refresh; retry with exponential backoff |

## Notes

- Cluster Mode Disabled: if you see `READONLY You can't write against a read only replica.` (create-before-destroy), stop the connection and recreate it.
- Stale snapshots can cause performance issues on recovery; you can disable RDB persistence and a snapshot is taken at the next interval after re-enabling. RDB snapshots can raise latency: schedule during low traffic (for example start 3 AM with 24 hours interval when traffic is low 1 AM to 4 AM). Adding a replica requires an RDB snapshot.
- Single-zone instance (no replicas) is recommended for lowest cost and peak performance for same-region clients; zonal outage exposure drops from 100% to 33% and recovery is by provisioning a new instance in a functioning zone.
- Capacity planning: deploy across multiple locations (another zone or region on resource constraints), use cross-region access, and use cross-region replication switchover to promote a secondary instance for disaster recovery.
- TLS: provides IAM authentication protection against server spoofing, application-layer end-to-end in-transit encryption and protection of authentication tokens. Cost: CPU for encryption and decryption and connection setup; enable TLS resumption to reduce handshake overhead (a sudden client scale-out may cause brief disruption from full handshakes). Some client libraries lack built-in TLS controls; custom code can add them. The source recommends evaluating your security policies against these benefits and drawbacks.
- The `redis-cli` latency check requires a Compute Engine VM in the same region and VPC; the source installs `valkey-tools` for `valkey-cli` but shows `redis-cli` in the command.
- Memorystore for Valkey on Google Cloud: managed Valkey, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source inconsistency: the general best-practices page gives `/instance/cpu/maximum_utilization` targets of 0.5 seconds for the primary with 1 replica and 0.9 seconds with 2 or more replicas (0.5 seconds per replica), while the supported-monitoring-metrics page says to keep it at most 0.8 seconds for the primary and 0.5 seconds per read replica. Kept as written on each page.
- Source inconsistency: this page recommends `SLOWLOG` for finding resource-intensive commands, but the supported-commands page lists `SLOWLOG GET`, `SLOWLOG LEN` and `SLOWLOG RESET` as blocked (`NOPERM`); see `supported-commands.md`.
- Corrected from the official docs: the blocking-commands table has the row "Remove files and links | `DELETE` | `UNLINK`". Valkey has no `DELETE` command; the synchronous key-deletion command is `DEL`, and `UNLINK` removes keys and reclaims memory asynchronously (both are listed on `supported-commands.md`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/general-best-practices (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-monitoring-metrics.md](./supported-monitoring-metrics.md)
- [troubleshoot-issues.md](./troubleshoot-issues.md)
- [about-maintenance.md](./about-maintenance.md)
