---
source: https://docs.cloud.google.com/sql/docs/postgres/high-availability
---

# Overview of high availability (Cloud SQL for PostgreSQL)

An HA-configured Cloud SQL instance (a regional instance) has a primary instance and a standby instance in two zones of one region. Writes are replicated synchronously to the persistent disks of both zones before a transaction is reported as committed. If the primary instance or its zone fails, the standby becomes the new primary (a failover).

## Signature / Usage

### Configure an existing instance for HA (gcloud)

The source page has no code; this block is from the configure-HA page. `--availability-type` takes `REGIONAL` (HA) or `ZONAL` (default, no failover). Replace `INSTANCE_NAME` with the instance you're configuring.

```bash
gcloud sql instances patch INSTANCE_NAME \
--availability-type REGIONAL
```

## Options / Props

### Failover requirements

| Condition | Detail |
|---|---|
| Primary instance state | Normal operating state: not stopped, not under maintenance, not running a long-running operation such as a backup. |
| Secondary zone and standby | Both must be healthy. If the standby is unresponsive, failover is blocked until Cloud SQL repairs it. |
| Both unresponsive | If both primary and standby are unresponsive, Cloud SQL does not allow failover. |

### Behavior summary

| Topic | Detail |
|---|---|
| Failure detection | A heartbeat checks the primary every second; if multiple heartbeats are missed, failover is initiated. |
| Unavailability | About 60 seconds during failover (can differ by environment). |
| Connections | Existing connections to the primary and read replicas are closed; clients reconnect with the same connection string or IP (shared static IP). |
| After failover | The new primary stays primary; the old primary is destroyed and recreated as the new standby. A failback reverses the direction. |
| Cost | An HA instance costs twice as much as a standalone instance (CPU, RAM, storage). |
| SLA | Regional persistent disk HA with at least one dedicated CPU has full SLA coverage. |

### Recovery options for standalone (non-HA) instances

Cloud SQL does not recover standalone instances from a zonal outage automatically.

| Option | Requirement | RPO |
|---|---|---|
| Point-in-time recovery to a new instance | PITR enabled before the outage; transaction logs stored in Cloud Storage. | Typically five minutes or less. |
| Promote a read replica in a different zone | A replica in another zone exists. | Varies with workload and replication lag. |

After either option, reconfigure clients: the recovered instances have different IP addresses and connection names.

## Notes

- Moving an instance to a different zone causes downtime that scales with the instance's disk size (source warning).
- Cloud SQL sometimes issues a restart instead of a failover (for example when the instance runs out of memory); this appears as a Restart operation.
- Read replicas can have HA enabled; such a replica is already highly available when promoted. Place some read replicas in a third zone, and add client logic to read from the primary when replicas are unavailable. During a failover, read replicas outside the outage zone do not change zones.
- Manually initiated failover and failback, and promoting a replica, are destructive-class operations: they drop connections and can lose recent transactions. Try them on a disposable instance first.
- Automated backups are highly recommended for HA. Maintenance affects HA primaries like other instances (brief downtime).
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those cover client code, not the managed service).
- Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/configure-ha (the source page has no code; it shows diagrams only).
- Configuring HA restarts the instance and can't be stopped once started: "It typically takes only a few minutes ... if the instance has a large disk or load, then it might take up to an hour" (configure-ha page). Try it on a disposable instance first. The configure-ha REST flow also checks that automatic backups and point-in-time recovery are enabled, which it calls required for HA instances. Source inconsistency: the high-availability page itself only calls automated backups highly recommended.
- Source: https://docs.cloud.google.com/sql/docs/postgres/high-availability (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/configure-ha (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [replication.md](./replication.md)
- [cross-region-replicas.md](./cross-region-replicas.md)
- [intro-to-cloud-sql-disaster-recovery.md](./intro-to-cloud-sql-disaster-recovery.md)
- Enable and disable HA, initiate failover: https://docs.cloud.google.com/sql/docs/postgres/configure-ha
