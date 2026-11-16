---
source: https://docs.cloud.google.com/sql/docs/postgres/replication
---

# Replication in Cloud SQL (PostgreSQL)

Replication copies a Cloud SQL instance (or an on-premises database) and offloads work to the copies. Cloud SQL supports read replicas, cross-region read replicas, cascading read replicas and external read replicas, plus PostgreSQL logical replication that you manage yourself.

## Signature / Usage

### Create a read replica

The source page has no code; this is the basic command from the create-replica page.

```bash
gcloud sql instances create REPLICA_NAME \
--master-instance-name=MASTER_INSTANCE_NAME
```

## Options / Props

### Replica types

| Name | Primary | Replica | Use cases |
|---|---|---|---|
| Read replica | Cloud SQL instance | Cloud SQL instance | Additional read capacity, analytics target |
| Cross-region read replica | Cloud SQL instance | Cloud SQL instance | Read capacity, analytics, disaster recovery, lower read latency, region migration |
| External read replica | Cloud SQL standalone or primary | PostgreSQL outside Cloud SQL | Lower latency for external connections, analytics, migration path (uses logical replication, e.g. `pglogical`) |
| Logical replication | Any PostgreSQL standalone or primary | Any PostgreSQL instance or external consumer | Cross-version replication, row/column filtering, non-PostgreSQL destinations (CDC) |

### Quick reference for read replicas

| Topic | Discussion |
|---|---|
| Backups | You cannot configure backups on the replica. |
| Cores and memory | May differ from the primary. |
| Deleting the primary | Promote or delete all read replicas first. |
| Deleting the replica | No impact on the primary. |
| Disabling write-ahead logging | Promote or delete all read replicas first. |
| Failover | A primary can fail over to a replica only if it is a DR replica. Read replicas cannot fail over during an outage. |
| High availability | HA can be enabled on replicas. |
| Load balancing | Not provided between replicas; use your own or connection pooling. |
| Maintenance windows | Shared with the primary; replicas are updated first. |
| Multiple read replicas | Up to 10 direct replicas per primary (recommended limit), cascading up to four levels including the primary. |
| Private IP | The VPC private connection is inherited from the primary. |
| Restoring the primary | Not possible while replicas exist; promote or delete them first. |
| Settings | Primary settings propagate, including the `postgres` user password and user table changes. |
| Stopping a replica | Cannot `stop`; can `restart`, `delete`, or `disable replication`. |
| Upgrading a replica | Can experience a disruptive upgrade at any time. |
| User tables | No changes on the replica; make them on the primary. |

### Cascading replicas

| Rule | Detail |
|---|---|
| Levels | Up to four levels including the primary instance. |
| Siblings | A replica can officially have up to eight siblings. |
| Deletion | A replica with replicas under it cannot be deleted; delete from the leaves upward. |
| Region dependency | No circular region dependency; a replica of a cascading replica in the primary's region requires the cascading replica to be in that region too. |
| Promotion | Promoting any replica retains its cascading hierarchy. |

## Notes

- Asynchronous replication: read replicas are read-only copies; data changes are applied asynchronously.
- Limit direct read replicas to 10 or fewer; create long-running-transaction-free replicas under low traffic.
- Machine type: replicas may be smaller, but monitor CPU and memory to avoid OOM. If you do not set `max_connections`, a smaller replica can inherit a larger value from the primary; resize the replica, limit client connections, or set the flag on both.
- Storage on replicas is resized with the primary so that replicas have at least as much capacity.
- Do not use a replica as the source for Datastream or Kafka; a recreated replica forces re-initialization of downstream systems.
- Connector enforcement: you cannot create read replicas for an instance with connector enforcement enabled (and vice versa), unless private service access is configured.
- Source inconsistency: the connector-enforcement restriction on read replicas is scoped three ways. This page: any instance with connector enforcement, unless private service access is configured. https://docs.cloud.google.com/sql/docs/postgres/replication/create-replica: a primary with private IP (private service access) that accepts Language Connector connections only — exactly the case this page exempts. https://docs.cloud.google.com/sql/docs/postgres/connect-connectors: Private Service Connect-enabled instances with connector enforcement.
- Cloud SQL does not support replication between two external servers. Hash indexes are not propagated to replicas on PostgreSQL 9.6.
- Billing: replicas are charged like standard instances with no charge for replication; cross-region replicas add cross-region data transfer charges.
- Promoting a replica or deleting the primary is destructive. Try it on a disposable instance first.
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those cover client code, not the managed service).
- Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/replication/create-replica (the source page has no code).
- Source: https://docs.cloud.google.com/sql/docs/postgres/replication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-replica.md](./create-replica.md)
- [cross-region-replicas.md](./cross-region-replicas.md)
- [replication-lag.md](./replication-lag.md)
- [high-availability.md](./high-availability.md)
- [about-read-pools.md](./about-read-pools.md)
- Logical replication: https://docs.cloud.google.com/sql/docs/postgres/replication/configure-logical-replication
