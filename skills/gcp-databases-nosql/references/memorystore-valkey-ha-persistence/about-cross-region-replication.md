---
source: https://docs.cloud.google.com/memorystore/docs/valkey/about-cross-region-replication
---

# About cross-region replication

Cross-region replication creates read-only secondary instances (asynchronously replicated) from a primary instance in other regions, for disaster recovery, geographically distributed reads and read-traffic load balancing.

## Signature / Usage

Create a secondary instance (details in [create-manage-cross-region-replication.md](./create-manage-cross-region-replication.md)).

```bash
gcloud memorystore instances create INSTANCE_ID \
--project=PROJECT_ID \
--location=REGION_ID \
--cross-instance-replication-config-role=secondary \
--psc-auto-connections=network=NETWORK,projectId=PROJECT_ID \
--primary-instance=PRIMARY_INSTANCE_PATH
```

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/create-manage-cross-region-replication.

## Options / Props

### Key concepts

| Term | Meaning |
|------|---------|
| Primary instance | Read-write instance in a single region. |
| Secondary instance | Read-only instance replicating asynchronously from the primary. |
| Replicator node | Node in the primary's shard (primary or replica) replicating to a follower. |
| Follower nodes | Nodes in the secondary; only primary nodes of the secondary can be followers. |
| Shards | Primary and secondary have the same shard count and slot assignments. |

### Settings

| Category | Settings |
|----------|----------|
| Required to create a secondary | project (same as primary), region, Private Service Connect configuration, primary instance (any instance that is not a secondary) |
| Copied from primary | shard count, IAM authentication mode, in-transit encryption mode, instance configurations, Valkey version, node type, persistence mode, cluster mode |
| Can override at creation | zone distribution, replica count, maintenance windows, deletion protection, automated backups |
| Change on primary only (synced) | shard count, instance configurations, persistence mode, Valkey version, node type |
| Local settings | deletion protection, replica count, maintenance windows, instance endpoints, automated backups |

## Notes

- Up to two secondary instances, in the same or different regions; an existing instance cannot be converted, only new instances can be secondaries. No cascading replicas.
- Scaling capacity on the primary scales secondaries automatically. Replica count is local per instance. ACL policies are not propagated; manage them on each instance independently.
- Switchover can promote a secondary even if the primary is unavailable; the old primary becomes a secondary when the outage ends. Detach turns secondaries into independent read-write instances; if not fully caught up, some data loss might occur.
- Creating a secondary may trigger a maintenance update on the primary and adds some latency. Secondaries are billed like primaries, plus cross-region networking charges.
- Switchover best practice: stop writes to the primary; pick the secondary (consider proximity, most caught-up data, closest settings); perform the switchover; wait for completion; send writes to the new primary.
- Switchover and detach change roles of production instances; try them on disposable instances first.
- Memorystore for Valkey is managed Valkey on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- `--psc-auto-connections` is marked "Deprecated: Use the endpoints.connections.psc_auto_connection value instead." in the gcloud help (SDK 593.0.0); the source still uses it for secondaries.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/about-cross-region-replication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-manage-cross-region-replication.md](./create-manage-cross-region-replication.md)
- [scale-replica-count.md](./scale-replica-count.md)
- [scale-instance-capacity.md](./scale-instance-capacity.md)
