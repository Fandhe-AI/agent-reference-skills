---
source: https://docs.cloud.google.com/sql/docs/sqlserver/known-issues
---

# Known issues for Cloud SQL for SQL Server

Known issues with connections, administration, import/export, transaction logs and monitoring, with ways to avoid or recover from them.

## Signature / Usage

### Instance creation error

If creation fails with the following message, try to create the instance again:

```text
Failed to create subnetwork. Router status is temporarily unavailable. Please try again later. Help Token: [token-ID]
```

## Options / Props

| Area | Issue | Mitigation |
|------|-------|------------|
| Connections | Expired SSL/TLS certificate | Check Connections > Security in the console; add a new certificate and rotate |
| Connections | Outdated Auth Proxy | Use the most recent version |
| Connections | Nonexistent instance in project | Error only says you are not authorized |
| Export | Large export can hurt availability | Keep at least 25 percent of the database size free before starting |
| Express edition | Flags at creation fail creation | Flags can't be set on an existing Express instance |
| Operations | Import/export can't be cancelled | Only one operation at a time; cancelling needs an instance restart |
| Import | Cancelled BAK import leaves a partial database | Drop the database (only the partially imported one; its incomplete data is removed) |
| Import | Cancelled SQL file import leaves partial data | Clean up manually |
| Import | BAK from a read-only or single-user database | May cause an error; don't create such BAK files |
| Import/export | Databases of 500 GB or more are slow; backups are unavailable during the operation | Consider restoring a previous backup with `gcloud` or the API (restoring to the same instance overwrites its current data; see Notes) |
| Bulk insert | SQL Server 2022 only; `RAW` codepage only; not on read replicas; only into tables | None |
| Export size | Fails only if the compressed file exceeds 5 TiB | Break into smaller segments or use striped export |
| Logs | Transaction logs purged once daily | Set number of backups to at least one more than days of log retention |
| Monitoring | `us-central1` shown as `us-central`, `europe-west1` as `europe`, `asia-east1` as `asia` | Use the system metadata label `region` in Alerting and Metrics Explorer |

## Notes

- Source: https://docs.cloud.google.com/sql/docs/sqlserver/known-issues (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- SQL Server variant of the known-issues page; PostgreSQL counterpart: https://docs.cloud.google.com/sql/docs/postgres/known-issues.
- Managed Cloud SQL service issues; distinct from the Node.js client `mssql` skill (client code only).
- Log retention example: 7 days of log retention with 7 backups keeps between six and seven days of logs.
- Standard export typically creates a single file; striped export creates multiple files and fails if any table's compressed export exceeds 5 TiB.
- The source has no code block; the error text above is quoted from its prose (line breaks joined).
- Restoring a backup: the PostgreSQL restoring page warns that restoring to the same instance "overwrites all of the current data on the instance, including previous point-in-time recovery (PITR) logs" (previous backups are retained); it also offers restoring to a new or existing instance in the same or another project (https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/restoring, retrieved 2026-11-16; the SQL Server restoring page was not retrieved). An instance with replicas can't be restored until they are promoted or deleted (see `replication.md`).
- Not from the source: dropping the database after a cancelled BAK import removes only that partially imported database; check the name before dropping it, then rerun the import.

## Related

- [features.md](./features.md)
- [replication.md](./replication.md)
