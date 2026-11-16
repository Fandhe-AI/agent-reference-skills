---
source: https://docs.cloud.google.com/sql/docs/sqlserver/high-availability
---

# Overview of high availability for Cloud SQL for SQL Server

An HA instance (a regional instance) has a primary and a standby in two zones of one region. All writes are synchronously replicated to the persistent disks of both zones before a transaction is committed; on failure the standby becomes primary and clients are rerouted (failover).

## Signature / Usage

### Failover behaviour

When the primary instance or zone fails: each second, the heartbeat system detects whether the primary instance is healthy; if multiple heartbeats aren't detected, failover is initiated. The standby then serves data upon reconnection. From the source: "When a failover occurs, you can expect the instance to be unavailable for about sixty seconds."

### Initiate a failover

To see the effect on an application, manually initiate failover: https://docs.cloud.google.com/sql/docs/sqlserver/configure-ha#test (failback uses the same procedure). Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/configure-ha (PostgreSQL page):

```bash
gcloud sql instances failover PRIMARY_INSTANCE_NAME
```

## Options / Props

| Topic | Detail |
|-------|--------|
| Cost | An HA instance costs twice as much as a standalone instance (CPU, RAM and storage) |
| SLA | Full SLA coverage for regional persistent disk HA with at least one dedicated CPU |
| Failover prerequisites | Primary in a normal state (not stopped, in maintenance or running a long operation such as a backup); secondary zone and standby healthy. If both are unresponsive failover isn't allowed |
| After failover | The new primary stays primary; the original is destroyed, recreated and becomes the standby |
| Connections | Same connection string or IP after failover; existing connections to the primary and read replicas are closed and reestablish in about 60 seconds |
| Read replicas | Don't change zones during a failover |
| Standalone recovery (no HA) | Not automatic. Option 1: PITR to a new instance (PITR enabled beforehand, logs in Cloud Storage; RPO typically 5 minutes or less). Option 2: promote a read replica in another zone (RPO depends on replication lag). Clients must be reconfigured: new IP address and connection name |
| Maintenance | Primary instances see brief downtime like other instances |

## Notes

- Source: https://docs.cloud.google.com/sql/docs/sqlserver/high-availability (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- SQL Server variant of the HA overview; PostgreSQL counterpart: https://docs.cloud.google.com/sql/docs/postgres/high-availability.
- Managed Cloud SQL HA; distinct from the Node.js client `mssql` skill (client code only) and from Supabase Postgres (`supabase`).
- Moving an instance to a different zone causes downtime that scales with disk size.
- Cloud SQL may restart instead of failing over (for example when memory is exhausted); this shows as a Restart operation.
- Failover, failback and promote-replica are disruptive; try them on a disposable instance first.
- Automated backups are highly recommended with HA.
- The HA overview page has no code block. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/configure-ha (PostgreSQL page; the SQL Server configure-ha page was not retrieved). `gcloud sql instances failover INSTANCE` "causes a high-availability Cloud SQL instance to failover" (gcloud help) with no engine restriction.
- Source: https://docs.cloud.google.com/sql/docs/postgres/configure-ha (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [replication.md](./replication.md)
- [editions-intro.md](./editions-intro.md)
