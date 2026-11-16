---
source: https://docs.cloud.google.com/sql/docs/postgres/about-read-pools
---

# About read pools (Cloud SQL for PostgreSQL)

A read pool is a collection of read replica instances (read pool nodes) that distributes large read workloads behind a single read endpoint with an immutable IP address, reducing load on the primary.

## Signature / Usage

### Create a read pool (gcloud)

The source page has no code. It states read pools use the instance API: `gcloud sql instances create` to create, `gcloud sql instances describe` to check the node count. This block is from the create-read-pool page. Replace `READ_POOL_NAME`, `TIER` (machine type for each node, such as `db-perf-optimized-N-4`), `NODE_COUNT` (`1` to `20`) and `PRIMARY_INSTANCE_NAME`.

```bash
gcloud sql instances create READ_POOL_NAME \
--tier=TIER --edition=ENTERPRISE_PLUS \
--instance-type=READ_POOL_INSTANCE --node-count=NODE_COUNT \
--master-instance-name=PRIMARY_INSTANCE_NAME --no-assign-ip
```

## Options / Props

### Characteristics

| Topic | Detail |
|---|---|
| Nodes per pool | 1 to 20 read pool nodes. |
| Scale in / out | Change the number of nodes. |
| Scale up / down | Change the machine type; applied uniformly to all nodes. |
| Settings | Storage, connectivity and flag changes apply uniformly to all nodes. |
| Endpoint | One read endpoint with immutable IP; each node also has its own IP (for troubleshooting only). |
| SLA | A pool with two or more nodes is covered by the SLA. |
| Placement | Nodes are in one region; zones are alternated. |
| Pools per primary | One or more. |
| Sub-second downtime | Scaling in/out, scaling up/down, converting a zonal read replica to a read pool. |
| Maintenance | Before the primary, within the primary's maintenance window. |
| Naming | Describe output lists the pool name, not node names. |
| More than 10 replicas total | Reset `max_wal_senders` and `max_replication_slots` on the primary to at least the replica count (for example 22 for two replicas plus two pools of ten); on PostgreSQL 18 also set `max_active_replication_origins` to 22 or greater. |

### Limitations

| Limitation | Detail |
|---|---|
| Edition | Enterprise Plus edition instances on the new network architecture only; the primary must be Enterprise Plus. |
| Traffic routing | Served by health, regardless of replication lag; a session may hit nodes at different LSNs, so state can appear to go back in time. |
| Unsupported updates | Major version upgrade; starting or stopping nodes. |
| Unsupported operations | Enable/disable replication, promote replica, restart, import, export, failover, re-encrypt, clone (plus anything unsupported on read replicas). |
| Certificates | Shared CA or customer-managed CA certificates cannot be used. |
| Topology | Cannot replicate to another instance; must replicate directly from the primary (not cascading). |
| Conversion | Only a zonal replica in the same region as the primary can be converted; convert a regional replica to zonal first. |
| Concurrency | Wait for earlier create / scale operations (also on other pools of the same primary); concurrent requests can fail with `Operation failed because another operation was already in progress.` |
| Dedicated replica | Use a normal read replica if the app must reach a specific replica (for example for its secondary indexes). |

## Notes

- Read pools have no unique Cloud SQL API; use the instance API. Autoscaling is covered at https://docs.cloud.google.com/sql/docs/postgres/read-pool-autoscaling.
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`) and the Node.js client `mssql` / ORM `drizzle` (those cover client code, not the managed service).
- Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-read-pool (leading indentation and the trailing blank line of the rendered block were normalized).
- Source: https://docs.cloud.google.com/sql/docs/postgres/about-read-pools (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-read-pool (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-replica.md](./create-replica.md)
- [replication.md](./replication.md)
- Create and manage read pools: https://docs.cloud.google.com/sql/docs/postgres/create-read-pool
