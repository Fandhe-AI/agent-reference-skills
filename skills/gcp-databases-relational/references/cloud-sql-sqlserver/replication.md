---
source: https://docs.cloud.google.com/sql/docs/sqlserver/replication
---

# About replication in Cloud SQL for SQL Server

Replication copies a Cloud SQL instance and offloads work to the copies. Cloud SQL for SQL Server supports read replicas, cross-region read replicas and cascading read replicas, implemented with SQL Server Read Scale Availability Groups (cascading uses distributed availability groups).

## Signature / Usage

### Replica creation requirements

The primary must not contain databases in single-user mode, `OFFLINE`, read-only mode or with auto-close enabled; must not be a distribution database, have push transactional replication enabled or be a database snapshot. Otherwise creation fails with:

```text
Instance is not eligible for replica creation...
```

The source has no other code block. To copy logins created after replica creation, use the `sp_help_revlogin` stored procedure (https://docs.cloud.google.com/sql/docs/sqlserver/export-logins).

## Options / Props

| Topic | Detail |
|-------|--------|
| Read replicas | Asynchronous, read-only; up to 8 per primary |
| First replica | Primary set to the full recovery model for all databases; a temporary disk holds a full backup (normal storage billing); switching to simple recovery during creation fails the creation |
| New databases | Added to the availability groups automatically and seeded by auto-seeding |
| Cross-region | Created like in-region replicas; assumed same virtual network or public IP |
| Cascading | Enterprise Plus only; not creatable from the console; up to four levels including the primary; can't delete a replica that has replicas (delete from leaves up); no circular region dependency; cascadable replicas must be in a different region than the primary |
| Versions | SQL Server 2017, 2019, 2022 Enterprise |
| Connector enforcement | Can't create replicas on an instance with it enabled, and can't enable it with replicas (not applicable with private services access) |
| Backups | Can't be configured on a replica |
| Stop | Can't `stop` a replica; can restart or delete |
| Delete replicated database | Use console or `gcloud`; propagates to replicas; T-SQL deletion isn't possible |
| Failover | Only to a cascadable replica; plain read replicas can't fail over |
| Maintenance | Shared with primary; replicas updated first |
| Restore primary | Promote or delete all replicas before restoring from a backup or performing PITR on the primary. Promoting leaves each replica as a standalone instance that no longer replicates; deleting removes the replica and its data |
| Multiple replicas | Up to 8 read replicas per primary; a replica can officially have up to eight siblings |
| Load balancing | Cloud SQL provides none between replicas |
| Settings | Primary settings propagate to the replica, including user access data |
| Upgrades | Read replicas can experience a disruptive upgrade at any time |
| Deleting the primary | Promote all read replicas to standalone instances or delete them first |
| Deleting a replica | No impact on the primary's status |
| Storage resize | Resizing the primary resizes replicas as needed so they have at least as much storage |
| Machine type | Replicas can have different vCPUs and memory; undersized replicas risk frequent OOM events |
| User changes | None on the replica; all user changes go on the primary |
| Logins | Logins that exist at replica creation are copied; later ones aren't propagated (use `sp_help_revlogin`) |
| External replication | Replication can't be configured on an instance with external replication; Cloud SQL doesn't support replication between two external servers |
| Billing | Same rate as a standard instance, no charge for replication; cross-region adds data transfer charges |

## Notes

- Source: https://docs.cloud.google.com/sql/docs/sqlserver/replication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- SQL Server variant of the replication page; PostgreSQL counterpart: https://docs.cloud.google.com/sql/docs/postgres/replication.
- Managed Cloud SQL replication; distinct from the Node.js client `mssql` skill (client code only) and from Supabase Postgres (`supabase`).
- Don't use a replica as a source for Datastream or Kafka: an unhealthy replica is recreated and downstream systems must be re-initialized.
- Cloud SQL doesn't support replication between two external servers, nor advanced DR replicas in the same region.
- Monitor replicas with T-SQL and/or SSMS; close database connections before deleting a database.
- Deleting replicas and promote-replica are destructive or disruptive; try on a disposable instance first.
- Restoring the primary from a backup: the PostgreSQL restoring page warns that restoring to the same instance overwrites all of its current data, including previous PITR logs (https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/restoring, retrieved 2026-11-16; the SQL Server restoring page was not retrieved). Not from the source: what promote and delete leave behind (standalone instance vs. no replica) follows from the promote and delete operations themselves.

## Related

- [high-availability.md](./high-availability.md)
- [enable-cdc.md](./enable-cdc.md)
- [editions-intro.md](./editions-intro.md)
